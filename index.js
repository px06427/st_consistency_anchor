/**
 * 一致性锚 (Consistency Anchor) - 完美开源发版 (Open Source Ready)
 * 包含：稳定 setInterval 轮询、世界书状态栏、模块化UI、大触控区、防越界拖拽、响应式适配
 */

const extensionName = "consistency-anchor";
let extensionPath = '';

// =========================================================================
// 核心工具方法
// =========================================================================
function getSTContext() {
    return window.SillyTavern?.getContext?.() || null;
}

const ST_EVENTS = {
    get CHAT_CHANGED() {
        return window.event_types?.CHAT_CHANGED || window.EVENT_CHAT_CHANGED || 'chat_changed';
    },
    get GENERATE_BEFORE() {
        return window.event_types?.GENERATE_BEFORE || window.event_types?.TEXT_COMPLETION_BEFORE || window.EVENT_GENERATE_BEFORE || 'text_completion_before';
    },
    get MESSAGE_RECEIVED() {
        return window.event_types?.MESSAGE_RECEIVED || window.EVENT_MESSAGE_RECEIVED || 'message_received';
    }
};

// =========================================================================
// 核心业务逻辑 (Model & Controller)
// =========================================================================
window.ConsistencyAnchor = {
    settings: {},
    defaultSettings: {
        enabled: true,
        anchorFrequency: 3,
        memoryPoolMaxTokens: 200,
        repetitionCheckCount: 3,
        repetitionThreshold: 0.7,
        formatAutoFix: true,
        strictFormatCheck: true,
        thoughtLeakIntercept: true,
        debugMode: false,
        showFloatingBtn: true,
        btnPosLeft: '',
        btnPosTop: '',
        enableStatusBar: false, 
        statusBarPrompt: '【系统指令：请务必阅读并严格遵循世界书(Lorebook)中关于“状态栏/面板/附加设定”的格式规范。在完成正文描写后，必须在回复的最末尾换行并独立输出当前的状态栏，且各项数值与状态需根据当前剧情逻辑进行合理计算与更新。】',
        statusBarPosition: 'after'
    },
    cachedNorms: null,
    cachedCharacterId: null,
    aiReplyCache: [],
    messageCounter: 0,
    lastInjectionRound: -1,
    highPriorityMemories: '',
    leakDetected: false,
    _initialized: false,
    _destroyed: false,

    _boundOnChatChanged: null,
    _boundOnGenerateBefore: null,
    _boundOnMessageReceived: null,

    init: async function() {
        if (this._destroyed) return;
        const ctx = getSTContext();
        if (!ctx) return;

        if (ctx.extensionSettings[extensionName]) {
            this.settings = { ...this.defaultSettings, ...ctx.extensionSettings[extensionName] };
        } else {
            this.settings = { ...this.defaultSettings };
            ctx.extensionSettings[extensionName] = this.settings;
            if (typeof ctx.saveSettingsDebounced === 'function') ctx.saveSettingsDebounced();
            else if (typeof ctx.saveSettings === 'function') ctx.saveSettings();
        }

        if (!this.settings.enabled) return;

        this.destroy();
        this._destroyed = false;

        if (window.eventSource) {
            this._boundOnChatChanged = this.onChatChanged.bind(this);
            this._boundOnGenerateBefore = this.onGenerateBefore.bind(this);
            this._boundOnMessageReceived = this.onMessageReceived.bind(this);
            window.eventSource.on(ST_EVENTS.CHAT_CHANGED, this._boundOnChatChanged);
            window.eventSource.on(ST_EVENTS.GENERATE_BEFORE, this._boundOnGenerateBefore);
            window.eventSource.on(ST_EVENTS.MESSAGE_RECEIVED, this._boundOnMessageReceived);
        }

        await this.refreshCharacterNorms();
        await this.refreshHighPriorityMemories();
        this._initialized = true;
    },

    destroy: function() {
        if (this._destroyed) return;
        if (window.eventSource) {
            if (this._boundOnChatChanged) {
                window.eventSource.off(ST_EVENTS.CHAT_CHANGED, this._boundOnChatChanged);
                this._boundOnChatChanged = null;
            }
            if (this._boundOnGenerateBefore) {
                window.eventSource.off(ST_EVENTS.GENERATE_BEFORE, this._boundOnGenerateBefore);
                this._boundOnGenerateBefore = null;
            }
            if (this._boundOnMessageReceived) {
                window.eventSource.off(ST_EVENTS.MESSAGE_RECEIVED, this._boundOnMessageReceived);
                this._boundOnMessageReceived = null;
            }
        }
        
        this.aiReplyCache = [];
        this.cachedNorms = null;
        this.cachedCharacterId = null;
        this.highPriorityMemories = '';
        this.messageCounter = 0;
        this.lastInjectionRound = -1;

        this._initialized = false;
        this._destroyed = true;
    },

    refreshCharacterNorms: async function() {
        try {
            const ctx = getSTContext();
            const charId = ctx?.characterId || 'default';
            if (this.cachedCharacterId === charId && this.cachedNorms) return;
            const char = ctx?.characters?.[charId];
            const desc = char?.data?.description || char?.description || '';
            this.cachedNorms = this.parseCharacterNorms(desc);
            this.cachedCharacterId = charId;
        } catch (e) {
            this.cachedNorms = { person: '第三人称', dialogueWrap: '"', actionWrap: '*', innerThoughtWrap: '' };
        }
    },

    parseCharacterNorms: function(desc) {
        if (!desc) desc = '';
        const norms = { person: '第三人称', dialogueWrap: '"', actionWrap: '*', innerThoughtWrap: '' };
        if (/我(的|是|想|觉得|知道|去|来|可以|需要)/.test(desc)) norms.person = '第一人称';
        else if (/(你)(的|是|想|觉得|知道|去|来)/.test(desc)) norms.person = '第二人称';
        else if (/(他|她|它)(的|是|想|觉得|知道|去|来)/.test(desc)) norms.person = '第三人称';
        if (/\*[^*]+\*/.test(desc)) norms.actionWrap = '*';
        if (/“[^”]+”/.test(desc)) norms.dialogueWrap = '“';
        else if (/"[^"]+"/.test(desc)) norms.dialogueWrap = '"';
        if (/\([^)]+\)/.test(desc)) norms.innerThoughtWrap = '()';
        else if (/（[^）]+）/.test(desc)) norms.innerThoughtWrap = '（）';
        else if (/『[^』]+』/.test(desc)) norms.innerThoughtWrap = '『』';
        return norms;
    },

    refreshHighPriorityMemories: async function() {
        try {
            const ctx = getSTContext();
            const worldInfo = ctx?.worldInfo || window.worldInfo;
            let entries = [];
            if (worldInfo && typeof worldInfo.getEntries === 'function') entries = worldInfo.getEntries();
            else entries = window.worldInfo?.entries || [];
            this.highPriorityMemories = this.extractHighPriority(entries, this.settings.memoryPoolMaxTokens);
        } catch (e) {
            this.highPriorityMemories = '';
        }
    },

    extractHighPriority: function(entries, maxTokens) {
        if (!Array.isArray(entries)) return '';
        const high = entries.filter(e => e.priority === 'high' || e.key?.startsWith('!'));
        if (!high.length) return '';
        
        high.sort((a, b) => {
            const valA = a.priorityValue !== undefined ? Number(a.priorityValue) || 0 : 0;
            const valB = b.priorityValue !== undefined ? Number(b.priorityValue) || 0 : 0;
            return valB - valA;
        });

        let combined = '', tokens = 0;
        for (const e of high) {
            const content = e.content || e.text || '';
            const est = content.length * 0.6;
            if (tokens + est > maxTokens) break;
            combined += content + '\n';
            tokens += est;
        }
        return combined.trim();
    },

    onChatChanged: async function() {
        this.messageCounter = 0;
        this.lastInjectionRound = -1;
        this.aiReplyCache = [];
        this.leakDetected = false;
        await this.refreshCharacterNorms();
        await this.refreshHighPriorityMemories();
    },

    onGenerateBefore: async function(eventData) {
        if (!this.settings.enabled) return;
        if (!this.cachedNorms) await this.refreshCharacterNorms();
        this.messageCounter++;

        if ((this.messageCounter - this.lastInjectionRound) >= this.settings.anchorFrequency) {
            this.lastInjectionRound = this.messageCounter;
            this.injectConsistencyAnchor(eventData);
        }
        if (this.highPriorityMemories) this.injectMemoryPool(eventData);
        if (this.settings.thoughtLeakIntercept) this.injectAntiLeakDirective(eventData);

        if (this.settings.enableStatusBar && this.settings.statusBarPrompt) {
            const pos = this.settings.statusBarPosition || 'after';
            this.safeInject(this.settings.statusBarPrompt, eventData, pos);
        }
    },

    safeInject: function(text, eventData, position = 'before') {
        try {
            const ctx = getSTContext();
            if (ctx && typeof ctx.injectPrompt === 'function') {
                ctx.injectPrompt(text, position);
                return true;
            }
            if (eventData && typeof eventData.prompt === 'string') {
                eventData.prompt = position === 'before'
                    ? (text + '\n' + eventData.prompt)
                    : (eventData.prompt + '\n' + text);
                return true;
            }
        } catch (e) {}
        return false;
    },

    injectConsistencyAnchor: function(eventData) {
        const norms = this.cachedNorms;
        if (!norms) return;
        let anchor = `[SYSTEM_ANCHOR: 当前角色为「${norms.person}」人称。对话用${norms.dialogueWrap}，动作用${norms.actionWrap}。`;
        if (norms.innerThoughtWrap) anchor += `内心独白用${norms.innerThoughtWrap}。`;
        anchor += '严格遵循格式，禁止输出思考过程。]';
        this.safeInject(anchor, eventData, 'after');
    },

    injectMemoryPool: function(eventData) {
        if (this.highPriorityMemories) this.safeInject(`[重要设定记忆]\n${this.highPriorityMemories}`, eventData, 'before');
    },

    injectAntiLeakDirective: function(eventData) {
        this.safeInject('[系统指令: 严禁展示思考、推理、分析或内部决策，直接输出最终回答。]', eventData, 'before');
    },

    onMessageReceived: async function({ message }) {
        if (!this.settings.enabled || !message) return;

        const isUserMessage = message.is_user === true || message.role === 'user';
        if (isUserMessage) return;

        const aiText = message.text || message.content || '';
        if (!aiText || aiText.length < 5) return;

        if (this.aiReplyCache.length > 0) {
            const lastReply = this.aiReplyCache[this.aiReplyCache.length - 1];
            if (lastReply && lastReply.length > 10) {
                const sim = this.fastJaccardSimilarity(aiText, lastReply);
                if (sim > this.settings.repetitionThreshold) {
                    this.leakDetected = true;
                } else this.leakDetected = false;
            }
        }
        this.aiReplyCache.push(aiText);
        if (this.aiReplyCache.length > this.settings.repetitionCheckCount) this.aiReplyCache.shift();

        if (this.settings.formatAutoFix || this.settings.strictFormatCheck) {
            const fixed = this.validateAndFixFormat(aiText);
            if (fixed && fixed !== aiText && this.settings.formatAutoFix) {
                try {
                    const ctx = getSTContext();
                    if (ctx && typeof ctx.updateMessage === 'function') {
                        const oldMsg = typeof ctx.getMessageById === 'function' ? ctx.getMessageById(message.id) : message;
                        if (oldMsg) {
                            const newMsg = { ...oldMsg, text: fixed, content: fixed };
                            ctx.updateMessage(newMsg);
                        } else {
                            ctx.updateMessage({ ...message, text: fixed, content: fixed });
                        }
                    } else {
                        if (!this._formatFixToastShown) {
                            this._formatFixToastShown = true;
                            this.showToast('格式检测到偏差，请双击消息手动修正', 'warning');
                            setTimeout(() => { this._formatFixToastShown = false; }, 10000);
                        }
                    }
                } catch (e) {}
            }
        }

        if (this.cachedNorms) this.checkPersonConsistency(aiText);

        if (this.settings.thoughtLeakIntercept && this.detectThoughtLeak(aiText)) {
            this.leakDetected = true;
            this.showToast('检测到思维链泄露，建议重新生成。', 'warning');
        }
    },

    fastJaccardSimilarity: function(str1, str2, sampleLen = 150) {
        if (!str1 || !str2) return 0;
        if (str1 === str2) return 1;
        const sample = (s) => s.length <= sampleLen * 2 ? s : s.slice(0, sampleLen) + s.slice(-sampleLen);
        const getBigrams = (s) => {
            const set = new Set();
            for (let i = 0; i < s.length - 1; i++) set.add(s[i] + s[i + 1]);
            return set;
        };
        const a = getBigrams(sample(str1));
        const b = getBigrams(sample(str2));
        if (a.size === 0 && b.size === 0) return 1;
        const smaller = a.size < b.size ? a : b;
        const larger = a.size < b.size ? b : a;
        let intersection = 0;
        for (const item of smaller) { if (larger.has(item)) intersection++; }
        return intersection / (a.size + b.size - intersection);
    },

    validateAndFixFormat: function(text) {
        const norms = this.cachedNorms;
        if (!norms) return null;
        let fixed = text;
        if (norms.dialogueWrap === '“') fixed = fixed.replace(/"([^"]*)"/g, '“$1”');
        else if (norms.dialogueWrap === '"') fixed = fixed.replace(/“([^”]*)”/g, '"$1"');
        if (norms.actionWrap === '*') fixed = fixed.replace(/\*\*([^*]+)\*\*/g, '*$1*');
        
        if (norms.innerThoughtWrap === '()') fixed = fixed.replace(/（([^）]*)）/g, '($1)');
        else if (norms.innerThoughtWrap === '（）') fixed = fixed.replace(/\(([^)]*)\)/g, '（$1）');
        else if (norms.innerThoughtWrap === '『』') fixed = fixed.replace(/[\(（]([^)）]+)[\)）]/g, '『$1』');
        
        return fixed !== text ? fixed : null;
    },

    checkPersonConsistency: function(text) {
        const expected = this.cachedNorms?.person;
        if (!expected) return;
        let detected = '未知';
        if (/我(的|是|想|觉得|知道)/.test(text)) detected = '第一人称';
        else if (/你(的|是|想|觉得|知道)/.test(text)) detected = '第二人称';
        else if (/(他|她|它)(的|是|想|觉得|知道)/.test(text)) detected = '第三人称';
    },

    detectThoughtLeak: function(text) {
        const keywords = ['思考：', '推理：', '分析：', '步骤', '首先', '其次', '然后', '最后', '作为AI', '我的推理', '决策过程'];
        const sample = text.substring(0, 500).toLowerCase();
        return keywords.some(kw => sample.includes(kw.toLowerCase()));
    },

    showToast: function(message, type = 'info') {
        try {
            const toast = window.toastr || window.notify;
            if (!toast) return;
            const typeMap = { 'info': ['info', 'success'], 'warning': ['warning', 'warn', 'info'], 'error': ['error', 'danger', 'info'], 'success': ['success', 'info'] };
            const candidates = typeMap[type] || ['info'];
            let called = false;
            for (const method of candidates) {
                if (typeof toast[method] === 'function') {
                    toast[method](message, '一致性锚');
                    called = true;
                    break;
                }
            }
            if (!called && typeof toast.info === 'function') toast.info(message, '一致性锚');
        } catch (e) {}
    },

    saveSettings: function() {
        try {
            const ctx = getSTContext();
            if (!ctx) return;
            const idMap = {
                'enabled': 'ca-enabled', 'anchorFrequency': 'ca-anchorFrequency',
                'memoryPoolMaxTokens': 'ca-memoryPoolMaxTokens', 'repetitionCheckCount': 'ca-repetitionCheckCount',
                'repetitionThreshold': 'ca-repetitionThreshold', 'formatAutoFix': 'ca-formatAutoFix',
                'strictFormatCheck': 'ca-strictFormatCheck', 'thoughtLeakIntercept': 'ca-thoughtLeakIntercept',
                'debugMode': 'ca-debugMode', 'showFloatingBtn': 'ca-show-float',
                'enableStatusBar': 'ca-enableStatusBar', 'statusBarPrompt': 'ca-statusBarPrompt',
                'statusBarPosition': 'ca-statusBarPosition'
            };
            const settings = {};
            for (const [key, id] of Object.entries(idMap)) {
                const input = document.getElementById(id) || document.getElementById(key);
                if (!input) { settings[key] = this.settings[key]; continue; }
                if (input.type === 'checkbox') settings[key] = input.checked;
                else if (input.type === 'number') settings[key] = (key === 'repetitionThreshold') ? parseFloat(input.value) : parseInt(input.value, 10);
                else settings[key] = input.value;
            }
            this.settings = { ...this.defaultSettings, ...this.settings, ...settings };
            ctx.extensionSettings[extensionName] = this.settings;

            if (typeof ctx.saveSettingsDebounced === 'function') ctx.saveSettingsDebounced();
            else if (typeof ctx.saveSettings === 'function') ctx.saveSettings();

            if (this.settings.showFloatingBtn) $('#anchor-toggle-btn').css('display', 'flex');
            else $('#anchor-toggle-btn').hide();
            this.showToast('设置已保存', 'success');
        } catch (e) {
            this.showToast('保存失败，请查看控制台', 'error');
        }
    },

    loadSettingsToUI: function() {
        try {
            const idMap = {
                'enabled': 'ca-enabled', 'anchorFrequency': 'ca-anchorFrequency',
                'memoryPoolMaxTokens': 'ca-memoryPoolMaxTokens', 'repetitionCheckCount': 'ca-repetitionCheckCount',
                'repetitionThreshold': 'ca-repetitionThreshold', 'formatAutoFix': 'ca-formatAutoFix',
                'strictFormatCheck': 'ca-strictFormatCheck', 'thoughtLeakIntercept': 'ca-thoughtLeakIntercept',
                'debugMode': 'ca-debugMode', 'showFloatingBtn': 'ca-show-float',
                'enableStatusBar': 'ca-enableStatusBar', 'statusBarPrompt': 'ca-statusBarPrompt',
                'statusBarPosition': 'ca-statusBarPosition'
            };
            for (const [key, id] of Object.entries(idMap)) {
                const input = document.getElementById(id) || document.getElementById(key);
                if (!input) continue;
                if (input.type === 'checkbox') input.checked = !!this.settings[key];
                else input.value = this.settings[key];
            }
        } catch (e) {}
    }
};

// =========================================================================
// UI 视图层封装 (View & Event Binding)
// =========================================================================
const UIManager = {
    htmlCache: null,
    injectCSS: function() {
        $('#ca-style-link').remove();
        $('link[href$="/consistency-anchor/style.css"]').remove();
        const link = document.createElement('link');
        link.id = 'ca-style-link';
        link.rel = 'stylesheet';
        link.href = `${extensionPath}/style.css`;
        document.head.appendChild(link);
    },

    injectMenuButton: function() {
        $('#ca-bottom-menu-btn').remove();

        const tryInject = (attempts = 0) => {
            const extensionsMenu = $('#extensionsMenu');
            if (extensionsMenu.length > 0) {
                extensionsMenu.append(`
                    <div id="ca-bottom-menu-btn" class="list-group-item flex-container alignitemscenter gap5" title="一致性锚设置" style="cursor:pointer; padding: 10px 12px; color: var(--SmartThemeBodyColor, #dcdcdc); display: flex; align-items: center; gap: 8px; font-size: clamp(13px, 3.5vw, 15px);">
                        <i class="fa-solid fa-anchor fa-fw"></i>
                        <span>一致性锚设置</span>
                    </div>
                `);
                $('#ca-bottom-menu-btn').on('click', () => {
                    extensionsMenu.hide();
                    const panel = $('#consistency-anchor-panel');
                    if (panel.is(':visible')) panel.fadeOut();
                    else {
                        panel.fadeIn();
                        UIManager.loadContent();
                    }
                });
                console.log('[ConsistencyAnchor] 菜单按钮注入成功');
            } else {
                if (attempts < 20) {
                    setTimeout(() => tryInject(attempts + 1), 500);
                } else {
                    console.warn('[ConsistencyAnchor] extensionsMenu 未找到，尝试直接添加到侧边栏');
                    let parent = $('#extensionsMenu').parent();
                    if (!parent.length) parent = $('#right-click-panel');
                    if (parent.length) {
                        parent.append(`
                            <div id="ca-bottom-menu-btn" class="list-group-item" style="cursor:pointer; padding: 10px; color: var(--SmartThemeBodyColor);">
                                <i class="fa-solid fa-anchor"></i> 一致性锚设置
                            </div>
                        `);
                        $('#ca-bottom-menu-btn').on('click', () => {
                            const panel = $('#consistency-anchor-panel');
                            if (panel.is(':visible')) panel.fadeOut();
                            else {
                                panel.fadeIn();
                                UIManager.loadContent();
                            }
                        });
                    }
                }
            }
        };
        tryInject();
    },

    injectPanelAndFloatBtn: function() {
        try {
            $('#consistency-anchor-panel').remove();
            $('#anchor-toggle-btn').remove();

            let posStyle = '';
            const sPosLeft = window.ConsistencyAnchor.settings.btnPosLeft;
            const sPosTop = window.ConsistencyAnchor.settings.btnPosTop;
            if (sPosLeft && sPosTop) {
                posStyle = `left: ${sPosLeft}; top: ${sPosTop}; right: auto; bottom: auto;`;
            } else {
                posStyle = `right: 20px; bottom: 80px;`;
            }
            const isShowFloat = window.ConsistencyAnchor.settings.showFloatingBtn;

            const html = `
                <div id="consistency-anchor-panel" style="position: fixed; top: 5vh; left: 50%; transform: translateX(-50%); width: min(520px, 95vw); max-height: 85vh; background: #1a1a1a; border: 2px solid #b38b59; border-radius: 8px; z-index: 99998; display: none; flex-direction: column; overflow: hidden; box-shadow: 0 0 50px rgba(0,0,0,0.9);">
                    <div id="anchor-drag-handle" style="width: 100%; height: clamp(50px, 8vh, 70px); flex-shrink: 0; background: #242424; cursor: move; display: flex; justify-content: center; align-items: center; border-bottom: 1px solid #b38b59; color: #e0c5a1; font-weight: bold; position: relative; touch-action: none; user-select: none;">
                        <span style="font-size: clamp(16px, 4vw, 18px);">⚓ 一致性锚设置</span>
                        <span id="anchor-close-btn" style="position: absolute; right: 5px; cursor: pointer; font-size: clamp(20px, 6vw, 26px); padding: 10px 15px; line-height: 1;">✕</span>
                    </div>
                    <div id="anchor-content-area" style="flex-grow: 1; overflow-y: auto; padding: 15px; color: #dcdcdc; -webkit-overflow-scrolling: touch;">
                        <div style="text-align:center; padding:30px; color:#888;">加载中...</div>
                    </div>
                </div>
                <div id="anchor-toggle-btn" style="position: fixed; ${posStyle} z-index: 99999; width: clamp(40px, 12vw, 50px); height: clamp(40px, 12vw, 50px); background: #b38b59; border-radius: 50%; display: ${isShowFloat ? 'flex' : 'none'}; justify-content: center; align-items: center; cursor: grab; box-shadow: 0 4px 10px rgba(0,0,0,0.5); color: #fff; font-size: clamp(18px, 5vw, 24px); user-select: none; opacity: 0.7; transition: opacity 0.2s; touch-action: none;">
                    ⚓
                </div>
            `;
            $('body').append(html);
            console.log('[ConsistencyAnchor] 面板和浮动按钮注入成功');
        } catch (e) {
            console.error('[ConsistencyAnchor] UI注入失败:', e);
        }
    },

    setupDragAndInteractions: function() {
        const $floatBtn = $('#anchor-toggle-btn');
        let isDraggingBtn = false;
        let btnStartX, btnStartY, btnStartLeft, btnStartTop;

        function startBtnDrag(clientX, clientY) {
            isDraggingBtn = false;
            btnStartX = clientX;
            btnStartY = clientY;
            const rect = $floatBtn[0].getBoundingClientRect();
            btnStartLeft = rect.left;
            btnStartTop = rect.top;
            $floatBtn.css('cursor', 'grabbing');
        }

        function moveBtnDrag(clientX, clientY) {
            const dx = clientX - btnStartX;
            const dy = clientY - btnStartY;
            if (Math.abs(dx) > 3 || Math.abs(dy) > 3) isDraggingBtn = true;
            if (!isDraggingBtn) return;
            const rect = $floatBtn[0].getBoundingClientRect();
            let newLeft = Math.max(0, Math.min(btnStartLeft + dx, window.innerWidth - rect.width));
            let newTop = Math.max(0, Math.min(btnStartTop + dy, window.innerHeight - rect.height));
            $floatBtn.css({ left: newLeft + 'px', top: newTop + 'px', right: 'auto', bottom: 'auto' });
        }

        function endBtnDrag() {
            $(document).off('mousemove.caBtnDrag mouseup.caBtnDrag touchmove.caBtnDrag touchend.caBtnDrag touchcancel.caBtnDrag');
            $floatBtn.css('cursor', 'grab');
            if (isDraggingBtn) {
                window.ConsistencyAnchor.settings.btnPosLeft = $floatBtn.css('left');
                window.ConsistencyAnchor.settings.btnPosTop = $floatBtn.css('top');
                window.ConsistencyAnchor.saveSettings();
            }
        }

        $floatBtn.on('mousedown', function(e) {
            if (e.button !== 0) return;
            startBtnDrag(e.clientX, e.clientY);
            $(document).on('mousemove.caBtnDrag', (ev) => moveBtnDrag(ev.clientX, ev.clientY));
            $(document).on('mouseup.caBtnDrag', endBtnDrag);
        });

        $floatBtn.on('touchstart', function(e) {
            const touch = e.originalEvent?.touches?.[0] || e.touches?.[0];
            if (!touch) return;
            startBtnDrag(touch.clientX, touch.clientY);
            $(document).on('touchmove.caBtnDrag', (ev) => {
                const t = ev.originalEvent?.touches?.[0] || ev.touches?.[0];
                if (t) moveBtnDrag(t.clientX, t.clientY);
            });
            $(document).on('touchend.caBtnDrag touchcancel.caBtnDrag', endBtnDrag);
        });

        $floatBtn.on('click', function() {
            if (isDraggingBtn) return;
            const panel = $('#consistency-anchor-panel');
            if (panel.is(':visible')) panel.fadeOut();
            else {
                panel.fadeIn();
                UIManager.loadContent();
            }
        });

        const $panel = $('#consistency-anchor-panel');
        const $handle = $('#anchor-drag-handle');
        let isDraggingPanel = false;
        let panelStartX, panelStartY, panelStartLeft, panelStartTop;

        function startPanelDrag(clientX, clientY) {
            isDraggingPanel = true;
            panelStartX = clientX;
            panelStartY = clientY;
            const rect = $panel[0].getBoundingClientRect();
            panelStartLeft = rect.left;
            panelStartTop = rect.top;
            $panel.css({ transform: 'none', left: panelStartLeft + 'px', top: panelStartTop + 'px' });
        }

        function movePanelDrag(clientX, clientY) {
            if (!isDraggingPanel) return;
            let newLeft = panelStartLeft + (clientX - panelStartX);
            let newTop = panelStartTop + (clientY - panelStartY);
            
            const rect = $panel[0].getBoundingClientRect();
            newLeft = Math.max(-rect.width + 50, Math.min(newLeft, window.innerWidth - 50));
            newTop = Math.max(0, Math.min(newTop, window.innerHeight - 50));

            $panel.css({ left: newLeft + 'px', top: newTop + 'px' });
        }

        function endPanelDrag() {
            isDraggingPanel = false;
            $(document).off('mousemove.caPanelDrag mouseup.caPanelDrag touchmove.caPanelDrag touchend.caPanelDrag touchcancel.caPanelDrag');
        }

        $handle.on('mousedown', function(e) {
            if (e.button !== 0) return;
            startPanelDrag(e.clientX, e.clientY);
            $(document).on('mousemove.caPanelDrag', (ev) => movePanelDrag(ev.clientX, ev.clientY));
            $(document).on('mouseup.caPanelDrag', endPanelDrag);
        });

        $handle.on('touchstart', function(e) {
            if ($(e.target).closest('#anchor-close-btn').length > 0) return; 
            const touch = e.originalEvent?.touches?.[0] || e.touches?.[0];
            if (!touch) return;
            startPanelDrag(touch.clientX, touch.clientY);
            $(document).on('touchmove.caPanelDrag', (ev) => {
                const t = ev.originalEvent?.touches?.[0] || ev.touches?.[0];
                if (t) movePanelDrag(t.clientX, t.clientY);
            });
            $(document).on('touchend.caPanelDrag touchcancel.caPanelDrag', endPanelDrag);
        });

        $('#anchor-close-btn').on('click mousedown touchstart', function(e) {
            e.stopPropagation(); 
            if(e.type === 'click' || e.type === 'touchstart') {
                $('#consistency-anchor-panel').fadeOut();
            }
        });
    },

    bindFormEvents: function() {
        if ($('#ca-show-float').length === 0) {
            $('#anchor-content-area').prepend(`
                <label class="checkbox_label" style="display:flex; align-items:center; gap:8px; margin-bottom:15px; padding:10px; background:rgba(255,255,255,0.05); border-radius:6px; border:1px solid #b38b59; cursor:pointer;">
                    <input type="checkbox" id="ca-show-float">
                    <span style="color:#e0c5a1; font-weight:bold; font-size:14px;">开启自由拖拽悬浮图标 (关闭可通过底部魔法棒打开)</span>
                </label>
            `);
        }

        if ($('#ca-enableStatusBar').length === 0) {
            $('#anchor-content-area').append(`
                <hr style="border-color: var(--SmartThemeBorderColor); margin: 15px 0;">
                <label class="checkbox_label" style="display:flex; align-items:center; gap:8px; margin-bottom:8px; cursor:pointer;">
                    <input type="checkbox" id="ca-enableStatusBar">
                    <span style="color:#e0c5a1; font-weight:bold; font-size:14px;">开启世界书状态栏/附加数据强制输出 (每回合末尾)</span>
                </label>
                <div style="margin-bottom: 10px; width: 100%;">
                    <label style="display:block; margin-bottom:5px; color:var(--SmartThemeBodyColor); font-size:13px;">注入位置：</label>
                    <select id="ca-statusBarPosition" style="width:100%; background:var(--SmartThemeControlColor, #222); color:var(--SmartThemeBodyColor, #ddd); border:1px solid var(--SmartThemeBorderColor, #555); border-radius:4px; padding:6px; font-family:inherit;">
                        <option value="after">末尾 (推荐，注意力权重最高)</option>
                        <option value="before">开头 (前置提示词区)</option>
                        <option value="system">系统指令区 (深度嵌入)</option>
                    </select>
                </div>
                <div style="margin-bottom: 15px; width: 100%;">
                    <label style="display:block; margin-bottom:5px; color:var(--SmartThemeBodyColor); font-size:13px;">独立输出强制提醒提示词：</label>
                    <textarea id="ca-statusBarPrompt" rows="4" style="width:100%; background:var(--SmartThemeControlColor, #222); color:var(--SmartThemeBodyColor, #ddd); border:1px solid var(--SmartThemeBorderColor, #555); border-radius:4px; padding:8px; resize:vertical; font-family:inherit;"></textarea>
                </div>
            `);
        }

        window.ConsistencyAnchor.loadSettingsToUI();

        $('#anchor-content-area').off('change.caSettings', 'input, select').on('change.caSettings', 'input, select', () => {
            window.ConsistencyAnchor.saveSettings();
        });
        $('#anchor-content-area').off('blur.caSettings', 'textarea').on('blur.caSettings', 'textarea', () => {
            window.ConsistencyAnchor.saveSettings();
        });

        $('#anchor-content-area').off('click.caSave', 'button').on('click.caSave', 'button', function() {
            if ($(this).text().includes('保存')) {
                window.ConsistencyAnchor.saveSettings();
                const btn = $(this);
                const originalText = btn.text();
                const originalBg = btn.css('background-color');
                btn.text('✓ 已保存').css('background-color', '#4caf50');
                setTimeout(() => btn.text(originalText).css('background-color', originalBg), 1500);
            }
        });
    },

    loadContent: async function() {
        if (this.htmlCache) {
            $('#anchor-content-area').html(this.htmlCache);
            this.bindFormEvents();
            return;
        }

        try {
            const response = await fetch(`${extensionPath}/anchor.html`);
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            this.htmlCache = await response.text();
            $('#anchor-content-area').html(this.htmlCache);
            this.bindFormEvents();
            console.log('[ConsistencyAnchor] UI 加载完成，已缓存');
        } catch (e) {
            console.error('[ConsistencyAnchor] 加载 UI 失败:', e);
            $('#anchor-content-area').html(`
                <div style="padding:20px; color:#e57373; text-align:center;">
                    <h3>加载失败</h3>
                    <p>${e.message}</p>
                    <p style="font-size:12px; color:#888;">请检查插件路径：<br>${extensionPath}</p>
                </div>
            `);
        }
    }
};

// =========================================================================
// 初始化引导层 (统一 setInterval 轮询机制)
// =========================================================================
const MAX_RETRIES = 40; 
let initRetries = 0;

let initIntervalTimer = setInterval(async () => {
    const hasJQuery = typeof window.jQuery !== 'undefined' || typeof $ !== 'undefined';
    const stReady = window.SillyTavern && window.SillyTavern.getContext;

    if (stReady && hasJQuery && document.body) {
        clearInterval(initIntervalTimer);
        console.log('[ConsistencyAnchor] 环境就绪，开始注入...');
        
        try {
            if (typeof import.meta !== 'undefined' && import.meta.url) {
                extensionPath = new URL(import.meta.url).pathname.replace(/\/index\.js.*$/, '');
            } else if (document.currentScript) {
                const scriptSrc = document.currentScript.src;
                if (scriptSrc) extensionPath = scriptSrc.replace(/\/index\.js.*$/, '');
            } else {
                const scripts = document.querySelectorAll('script[src*="consistency-anchor"]');
                if (scripts.length > 0) extensionPath = scripts[0].src.replace(/\/index\.js.*$/, '');
            }
            if (!extensionPath) {
                console.warn('[ConsistencyAnchor] 无法自动解析路径，尝试 ST 1.13 标准后备路径');
                extensionPath = '../../data/default-user/extensions/consistency_anchor';
            }
        } catch (e) {
            console.warn('[ConsistencyAnchor] 路径检测引发异常，使用兜底路径', e);
            extensionPath = '../../data/default-user/extensions/consistency_anchor';
        }

        try {
            await window.ConsistencyAnchor.init();
            UIManager.injectCSS();
            UIManager.injectPanelAndFloatBtn();
            UIManager.injectMenuButton();
            UIManager.setupDragAndInteractions();
            console.log('[ConsistencyAnchor] 初始化完成');
        } catch (err) {
            console.error('[ConsistencyAnchor] 初始化失败:', err);
        }
    } else {
        initRetries++;
        if (initRetries >= MAX_RETRIES) {
            clearInterval(initIntervalTimer);
            console.error('[ConsistencyAnchor] 加载失败：SillyTavern 环境未就绪超时（已达20秒）。');
            window.toastr?.error?.('一致性锚插件加载超时，请刷新页面重试。', '启动错误');
        } else {
            console.log(`[ConsistencyAnchor] 等待环境... (${initRetries}/${MAX_RETRIES})`);
        }
    }
}, 500);
