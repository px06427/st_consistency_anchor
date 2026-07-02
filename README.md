# 📚 Chat Log Manager – SillyTavern 聊天记录管理插件

一个为 **SillyTavern** 打造的强大聊天记录管理工具，帮你轻松浏览、搜索、导出和批量操作所有角色的聊天记录。

> 🎯 **特色**：一键跳转到历史消息原文位置，批量导入/导出，全局内容搜索，深色/浅色主题，移动端适配。

---

## ✨ 功能亮点

- 📂 **按角色分组**：所有聊天按角色名称折叠/展开，一目了然。
- 🔍 **全局内容搜索**：搜索所有聊天消息文本，高亮显示匹配片段。
- 📝 **消息预览**：点击会话即可在右侧预览消息列表（支持虚拟滚动，流畅查看超长对话）。
- 🎯 **一键跳转原文**：每条消息旁有定位按钮，自动切换到对应角色和聊天，并滚动到消息原始位置（支持动态渲染等待）。
- ☑️ **批量操作模式**：
  - 勾选多个会话，支持全选（可结合搜索结果筛选）。
  - 批量导出为 **Markdown / TXT / JSON** 格式。
  - 批量删除（含安全确认，自动避开正在使用的会话）。
- 📥 **导入聊天记录**：支持 `.json` / `.jsonl` 格式文件（可多选），自动识别角色并写入存储。
- 📤 **单会话导出**：支持 Markdown、TXT、官方 JSONL 格式。
- 🎨 **深色/浅色主题**：一键切换，适配个人喜好。
- 🖱️ **可拖拽浮动按钮**：位置自动记忆（保存在 localStorage），不遮挡操作。

---

## 🚀 安装方法

### 方式一：通过 SillyTavern 扩展面板一键安装（推荐）

1. 打开 SillyTavern，进入 **扩展（Extensions）** 面板。
2. 在 **“Install from URL”** 输入框中粘贴以下地址：
https://github.com/px06427/st_consistency_anchor
3. 点击 **Install**，等待下载完成。
4. 刷新页面（或重启 SillyTavern），浮动按钮 📚 将出现在屏幕右下角。

### 方式二：手动下载

1. 从 [Releases]https://github.com/px06427/st_consistency_anchor/releases) 下载最新版本的 ZIP 包。
2. 解压到 `SillyTavern/plugins/` 目录下（确保文件夹名为 `chat-log-manager`）。
3. 重启 SillyTavern 或刷新页面。

---

## 📖 使用说明

1. **打开面板**：点击浮动 📚 按钮（可拖拽位置）。
2. **浏览记录**：左侧按角色分组，点击角色名展开/折叠，点击会话预览消息。
3. **搜索**：顶部搜索框输入关键词，结果会高亮并显示匹配片段。
4. **批量模式**：点击 ☑️ **批量** 按钮，左侧会出现复选框，勾选后可在右侧进行批量导出或删除。
5. **导出单会话**：在右侧预览区，点击 **📤 导出 ▾** 下拉菜单选择格式。
6. **导入记录**：点击 **📥 导入** 按钮，选择本地 `.json` / `.jsonl` 文件（可多选）。
7. **跳转原文**：在消息预览中，点击消息右上角的 🎯 按钮，自动切换到对应聊天并滚动定位。

> 💡 **提示**：浮动按钮位置会自动保存，下次打开保持不变。

---

## 🛠️ 兼容性与要求

- **SillyTavern** 版本 ≥ 1.0.0（已测试最新正式版）。
- 现代浏览器（Chrome / Firefox / Edge 等）。
- 支持移动端触摸操作。

---

## 🤝 贡献与反馈

如果你遇到 Bug 或有功能建议，欢迎：
- [Issue]https://github.com/px06427/st_consistency_anchor/issues
- [Pull Request]https://github.com/px06427/st_consistency_anchorpulls

---

## 📄 许可证

本项目基于 **MIT License** 开源，详情见 [LICENSE](LICENSE) 文件。

---

## 🙏 致谢

- 感谢 [SillyTavern](https://github.com/SillyTavern/SillyTavern) 提供优秀的交互平台。
- 感谢为我开发独立前端时提供参考的RE老师授权（https://github.com/rikkahub/rikkahub）
- 感谢所有使用和反馈的朋友们 ❤️

---

**Enjoy your chat management!** 🎉