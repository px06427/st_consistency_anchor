/**
 * 一致性锚 (Consistency Anchor) v1.0.2
 * 修复：确保 UI 显示，兼容更广的 ST 版本
 */

(async function () {
    // 等待依赖就绪
    const { extension_settings, saveSettingsDebounced } = window;
    const { eventSource, event_types } = window;

    if (!extension_settings || !eventSource) {
        console.warn('[一致性锚] SillyTavern API 尚未就绪，500ms 后重试');
        return setTimeout(arguments.callee, 500);
    }

    // ---------- 工具函数 ----------
    function jaccardSimilarity(str1, str2) {
        const bigrams = s => {
            const set = new Set();
            for (let i = 0; i < s.length - 1; i++) set.add(s.substring(i, i + 2));
            return set;
        };
        const a = bigrams(str1), b = bigrams(str2);
        if (!a.size && !b.size) return 1;
        const inter = new Set([...a].filter(x => b.has(x)));
        const union = new Set([...a, ...b]);
        return inter.size / union.size;
    }

    function parseCharacterNorms(desc = '') {
        const norms = {
            person: '第三人称',
            dialogueWrap: '"',
            actionWrap: '*',
            innerThoughtWrap: ''
        };
        if (/我(的|是|想|觉得|知道|去|来|可以|需要)/.test(desc)) norms.person = '第一人称';
        else if (/(他|她|它)(的|是|想|觉得|知道|去|来)/.test(desc)) norms.person = '第三人称';
        else if (/(你)(的|是|想|觉得|知道|去|来)/.test(desc)) norms.person = '第二人称';
        if (/\*[^*]+\*/.test(desc)) norms.actionWrap = '*';
        if (/“[^”]+”/.test(desc)) norms.dialogueWrap = '“';
        else if (/"[^"]+"/.test(desc)) norms.dialogueWrap = '"';
        if (/\([^)]+\)/.test(desc)) norms.innerThoughtWrap = '()';
        else if (/（[^）]+）/.test(desc)) norms.innerThoughtWrap = '（）';
        else if (/『[^』]+』/.test(desc)) norms.innerThoughtWrap = '『』';
        return norms;
    }

    // ---------- 主扩展类 ----------
    class ConsistencyAnchor {
        constructor() {
            this.settings = {
                enabled: true,
                anchorFrequency: 3,
                memoryPoolMaxTokens: 200,
                repetitionCheckCount: 5,
                repetitionThreshold: 0.7,
                formatAutoFix: true,
                strictFormatCheck: true,
                thoughtLeakIntercept: true,
                debugMode: false
            };
            this.cachedNorms = null;
            this.aiReplyCache = [];
            this.messageCounter = 0;
            this.lastInjectionRound = -1;
            this.highPriorityEntries = [];
            this.repetitionTriggered = false;
            this.leakDetectedLastRound = false;
        }

        async init() {
            const ctx = window.SillyTavern.getContext();
            if (ctx.extensionSettings['consistency-anchor']) {
                Object.assign(this.settings, ctx.extensionSettings['consistency-anchor']);
            } else {
                ctx.extensionSettings['consistency-anchor'] = this.settings;
                saveSettingsDebounced();
            }

            if (!this.settings.enabled) return;

            eventSource.on(event_types.CHAT_CHANGED, this.onChatChanged.bind(this));
            eventSource.on(event_types.GENERATE_BEFORE, this.onGenerateBefore.bind(this));
            eventSource.on(event_types.GENERATE_AFTER, this.onGenerateAfter.bind(this));
            eventSource.on('message_received', this.onMessageReceived.bind(this));

            this.log('已初始化');
        }

        toggleEnabled(state) {
            this.settings.enabled = state;
            if (state) {
                eventSource.on(event_types.CHAT_CHANGED, this.onChatChanged.bind(this));
                eventSource.on(event_types.GENERATE_BEFORE, this.onGenerateBefore.bind(this));
                eventSource.on(event_types.GENERATE_AFTER, this.onGenerateAfter.bind(this));
                eventSource.on('message_received', this.onMessageReceived.bind(this));
            } else {
                eventSource.off(event_types.CHAT_CHANGED, this.onChatChanged);
                eventSource.off(event_types.GENERATE_BEFORE, this.onGenerateBefore);
                eventSource.off(event_types.GENERATE_AFTER, this.onGenerateAfter);
                eventSource.off('message_received', this.onMessageReceived);
            }
            saveSettingsDebounced();
        }

        onChatChanged() {
            this.cachedNorms = null;
            this.aiReplyCache = [];
            this.messageCounter = 0;
            this.lastInjectionRound = -1;
            this.leakDetectedLastRound = false;

            const ctx = window.SillyTavern.getContext();
            const char = ctx.characters[ctx.characterId];
            if (char) {
                const desc = char.data?.description || char.description || '';
                this.cachedNorms = parseCharacterNorms(desc);
                this.log('角色规范已解析', this.cachedNorms);
            }
            this.scanHighPriorityEntries();
        }

        scanHighPriorityEntries() {
            this.highPriorityEntries = [];
            try {
                const worldInfo = window.SillyTavern.getContext().worldInfo;
                if (worldInfo?.entries) {
                    for (const uid in worldInfo.entries) {
                        const e = worldInfo.entries[uid];
                        const isHigh = (e.priority && e.priority >= 100) ||
                                       (e.comment && /!/.test(e.comment)) ||
                                       (e.content && /^!/.test(e.content.trim()));
                        if (isHigh) {
                            this.highPriorityEntries.push({ keys: e.key, content: e.content });
                        }
                    }
                }
                this.log(`高优先级条目 ${this.highPriorityEntries.length} 条`);
            } catch (e) { this.warn(e); }
        }

        onGenerateBefore(event) {
            if (!this.settings.enabled) return;
            const payload = event.detail;
            this.messageCounter++;

            // 1. 锚点注入
            if ((this.messageCounter - this.lastInjectionRound) >= this.settings.anchorFrequency && this.cachedNorms) {
                this.inject(payload, this.buildAnchor(), 'system');
                this.lastInjectionRound = this.messageCounter;
            }

            // 2. 记忆池注入
            const entries = this.selectRelevantEntries();
            if (entries.length) {
                this.inject(payload, this.buildMemoryBlock(entries), 'system');
            }

            // 3. 反重复
            if (this.repetitionTriggered) {
                this.inject(payload, '\n[系统指令：严禁重复上一段回复的句式或词汇，请重新组织语言。]\n', 'system');
                if (payload.repetition_penalty !== undefined) {
                    payload.repetition_penalty = Math.min(payload.repetition_penalty + 0.1, 1.5);
                }
                this.repetitionTriggered = false;
            }

            // 4. 思维链防火墙
            if (this.settings.thoughtLeakIntercept) {
                this.inject(payload, '\n[绝对禁止输出“思考：”、“作为AI”、“内心想法：”等任何自我分析内容。]\n', 'system');
                if (payload.stop) {
                    const leakStops = ['思考：', '作为AI', '内心想法：', '（系统提示', '[分析'];
                    payload.stop = [...new Set([...payload.stop, ...leakStops])];
                }
            }
            if (this.leakDetectedLastRound) {
                this.inject(payload, '\n[紧急：上次回复泄露了思考内容，本次必须严格避免。]\n', 'system');
                this.leakDetectedLastRound = false;
            }
        }

        buildAnchor() {
            const n = this.cachedNorms;
            let block = `[SYSTEM_ANCHOR: 叙述使用${n.person}，对话用${n.dialogueWrap}包裹，动作用${n.actionWrap}包裹。`;
            if (n.innerThoughtWrap) block += ` 内心独白用${n.innerThoughtWrap}包裹。`;
            block += ' 请严格遵循。]';
            return block;
        }

        buildMemoryBlock(entries) {
            let block = '[关联设定记忆]\n';
            const maxChars = this.settings.memoryPoolMaxTokens * 3.5;
            let total = 0;
            for (const e of entries) {
                const line = `- ${e.content}\n`;
                if (total + line.length > maxChars) break;
                block += line;
                total += line.length;
            }
            return block;
        }

        selectRelevantEntries() {
            if (!this.highPriorityEntries.length) return [];
            const chat = window.SillyTavern.getContext().chat;
            if (!chat?.length) return this.highPriorityEntries.slice(0, 3);
            const recentText = chat.slice(-5).map(m => m.mes || '').join(' ');
            return this.highPriorityEntries.filter(e => {
                const keys = (e.keys || '').toLowerCase().split(',');
                return keys.some(k => recentText.toLowerCase().includes(k.trim()));
            });
        }

        inject(payload, text, role) {
            if (Array.isArray(payload.messages)) {
                payload.messages.splice(payload.messages.length - 1, 0, { role: 'system', content: text });
            } else if (typeof payload.prompt === 'string') {
                payload.prompt += '\n' + text;
            }
        }

        onGenerateAfter(event) {
            if (!this.settings.enabled) return;
            const text = event.detail?.message;
            if (!text) return;

            this.detectRepetition(text);

            if (this.settings.strictFormatCheck) {
                const fixed = this.fixFormat(text);
                if (fixed !== text) {
                    event.detail.message = fixed;
                    this.log('格式已自动修正');
                }
            }

            if (this.settings.thoughtLeakIntercept && this.leakCheck(text)) {
                event.detail.message = '';
                this.leakDetectedLastRound = true;
                this.log('思维链泄露已拦截');
            }
        }

        onMessageReceived(event) {
            const msg = event.detail?.message;
            if (msg?.role === 'assistant') {
                this.aiReplyCache.push(msg.content);
                if (this.aiReplyCache.length > this.settings.repetitionCheckCount) {
                    this.aiReplyCache.shift();
                }
            }
        }

        detectRepetition(newText) {
            for (const cached of this.aiReplyCache) {
                if (jaccardSimilarity(newText, cached) >= this.settings.repetitionThreshold) {
                    this.repetitionTriggered = true;
                    this.log('重复度超标');
                    break;
                }
            }
        }

        fixFormat(text) {
            if (!this.cachedNorms || !this.settings.formatAutoFix) return text;
            let modified = text;
            if (this.cachedNorms.dialogueWrap === '“' && modified.includes('"')) {
                modified = modified.replace(/"([^"]*)"/g, '“$1”');
            } else if (this.cachedNorms.dialogueWrap === '"' && modified.includes('“')) {
                modified = modified.replace(/“([^”]*)”/g, '"$1"');
            }
            return modified;
        }

        leakCheck(text) {
            const patterns = [/思考[：:]/, /作为AI/, /作为一个人工智能/, /内心想法[：:]/, /系统分析/];
            return patterns.some(p => p.test(text));
        }

        log(...args) { if (this.settings.debugMode) console.log('[一致性锚]', ...args); }
        warn(...args) { console.warn('[一致性锚]', ...args); }
    }

    // 启动
    const ext = new ConsistencyAnchor();
    window.consistencyAnchor = ext;
    await ext.init();
    console.log('[一致性锚] 扩展加载完成');
})();