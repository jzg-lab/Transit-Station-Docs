const categories = [
  { id: 'all', label: '全部', intro: '完整清单' },
  { id: 'coding', label: '编程', intro: '终端与代码' },
  { id: 'desktop', label: '桌面', intro: '本地工作台' },
  { id: 'bot', label: '机器人', intro: 'IM 与 Agent' },
  { id: 'reading', label: '阅读', intro: '翻译阅读' },
  { id: 'hub', label: '部署', intro: '托管与 API' }
];

const themeQuery = new URLSearchParams(window.location.search).get('theme');
const themeMedia = window.matchMedia('(prefers-color-scheme: dark)');
const themeStorageKey = 'ciyuan-docs-theme';

function getStoredTheme() {
  try {
    return localStorage.getItem(themeStorageKey);
  } catch (error) {
    return null;
  }
}

function setStoredTheme(theme) {
  try {
    localStorage.setItem(themeStorageKey, theme);
  } catch (error) {
  }
}

function preferredTheme() {
  if (themeQuery === 'dark' || themeQuery === 'light') return themeQuery;
  const storedTheme = getStoredTheme();
  if (storedTheme === 'dark' || storedTheme === 'light') return storedTheme;
  return themeMedia.matches ? 'dark' : 'light';
}

function applyTheme(theme, persist = false) {
  document.documentElement.dataset.theme = theme;
  document.querySelectorAll('[data-theme-toggle]').forEach(button => {
    button.textContent = theme === 'dark' ? '浅色模式' : '夜间模式';
    button.setAttribute('aria-pressed', String(theme === 'dark'));
  });
  if (persist) setStoredTheme(theme);
}

function closestThemeToggle(target) {
  let node = target;
  while (node && node !== document) {
    if (node.matches?.('[data-theme-toggle]')) return node;
    node = node.parentElement;
  }
  return null;
}

function handleThemeMediaChange(event) {
  if (themeQuery || getStoredTheme()) return;
  applyTheme(event.matches ? 'dark' : 'light');
}

function initTheme() {
  applyTheme(preferredTheme());
  document.addEventListener('click', event => {
    const button = closestThemeToggle(event.target);
    if (!button) return;
    const nextTheme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    applyTheme(nextTheme, true);
  });
  if (themeMedia.addEventListener) {
    themeMedia.addEventListener('change', handleThemeMediaChange);
  } else if (themeMedia.addListener) {
    themeMedia.addListener(handleThemeMediaChange);
  }
}

initTheme();

const commonSetup = `
  <div class="callout"><strong>词元.fast 通用配置</strong>在词元.fast 控制台创建 API Key。OpenAI 兼容应用通常填写 <code>https://ciyuan.fast/v1</code>；少数工具如果单独要求 Base URL、不自动拼接 <code>/v1</code>，则填写 <code>https://ciyuan.fast</code>。</div>
  <pre><code>API Key: 在 https://ciyuan.fast 控制台创建
OpenAI Compatible Base URL: https://ciyuan.fast/v1
模型名称: 选择控制台中已启用的模型 ID</code></pre>
`;

const apiKeyGuide = {
  title: '密钥创建通用步骤',
  detail: '先打开词元.fast 并登录，进入控制台的令牌管理/API Key 页面。点击添加令牌或创建密钥，名称可以写当前工具名。创建成功后立刻复制密钥，后面所有工具里的 API Key、Token、访问令牌都粘贴这一串内容。',
  src: 'images/ciyuan-api-key.png',
  alt: '词元.fast 创建和复制 API Key'
};

const productResources = {
  'openclaw': [
    { label: '官网', title: 'openclaw.ai', href: 'https://openclaw.ai' },
    { label: 'GitHub', title: 'openclaw/openclaw', href: 'https://github.com/openclaw/openclaw' },
    { label: '安装依赖', title: 'OpenClaw Install Docs', href: 'https://docs.openclaw.ai/install' }
  ],
  'claude-code': [
    { label: '官网', title: 'Anthropic Claude Code', href: 'https://www.anthropic.com/claude-code' },
    { label: '安装依赖', title: 'Node.js 下载', href: 'https://nodejs.org' },
    { label: 'Windows 依赖', title: 'Git for Windows', href: 'https://git-scm.com/download/win' }
  ],
  'factory-droid-cli': [
    { heading: /Windows|macOS|Linux|常见问题/, indexes: [0] }
  ],
  'cc-switch': [
    { heading: /词元\.fast 接入方法|Provider|安装方式/, indexes: [0] }
  ],
  'codex-cli': [
    { label: '官网', title: 'ChatGPT Codex', href: 'https://chatgpt.com/codex' },
    { label: 'GitHub', title: 'openai/codex', href: 'https://github.com/openai/codex' },
    { label: '安装依赖', title: 'Node.js 下载', href: 'https://nodejs.org' }
  ],
  'factory-droid-cli': [
    { label: '官网', title: 'Factory AI', href: 'https://factory.ai' },
    { label: '文档', title: 'Factory Docs', href: 'https://docs.factory.ai' },
    { label: '安装', title: 'Factory CLI', href: 'https://docs.factory.ai' }
  ],
  'cc-switch': [
    { label: 'GitHub', title: 'farion1231/cc-switch', href: 'https://github.com/farion1231/cc-switch' },
    { label: '下载', title: 'CC Switch Releases', href: 'https://github.com/farion1231/cc-switch/releases' },
    { label: '协议', title: 'ccswitch:// Deep Link', href: 'https://github.com/farion1231/cc-switch' }
  ],
  'aionui': [
    { heading: /词元\.fast 接入方法|配置步骤/, indexes: [0] }
  ],
  'cherry-studio': [
    { label: '官网', title: 'cherry-ai.com', href: 'https://cherry-ai.com' },
    { label: 'GitHub', title: 'CherryHQ/cherry-studio', href: 'https://github.com/CherryHQ/cherry-studio' },
    { label: '下载', title: 'Cherry Studio Releases', href: 'https://github.com/CherryHQ/cherry-studio/releases' }
  ],
  'aionui': [
    { label: 'GitHub', title: 'office-sec/AionUi', href: 'https://github.com/office-sec/AionUi' },
    { label: '官网', title: 'aionui.com', href: 'https://aionui.com' },
    { label: '下载', title: 'AionUi Releases', href: 'https://github.com/office-sec/AionUi/releases' }
  ],
  'fluent-read': [
    { label: 'GitHub', title: 'Bistutu/FluentRead', href: 'https://github.com/Bistutu/FluentRead' },
    { label: 'Chrome', title: 'Chrome Web Store', href: 'https://chromewebstore.google.com/detail/djnlaiohfaaifbibleebjggkghlmcpcj' },
    { label: 'Firefox', title: 'Firefox Add-ons', href: 'https://addons.mozilla.org/zh-CN/firefox/addon/%E6%B5%81%E7%95%85%E9%98%85%E8%AF%BB/' }
  ],
  'langbot': [
    { label: '官网', title: 'langbot.app', href: 'https://langbot.app' },
    { label: 'GitHub', title: 'langbot-app/LangBot', href: 'https://github.com/langbot-app/LangBot' },
    { label: '文档', title: 'docs.langbot.app', href: 'https://docs.langbot.app' }
  ],
  'astrbot': [
    { label: '官网', title: 'astrbot.app', href: 'https://astrbot.app' },
    { label: 'GitHub', title: 'astrbotdevs/astrbot', href: 'https://github.com/astrbotdevs/astrbot' },
    { label: '文档', title: 'docs.astrbot.app', href: 'https://docs.astrbot.app' }
  ],
  'async-image-api': [
    { label: '接口域名', title: 'img.ciyuan.fast', href: 'https://img.ciyuan.fast' },
    { label: '控制台', title: '词元.fast', href: 'https://ciyuan.fast' },
    { label: '说明', title: '可直接丢给 AI 助手', href: 'https://ciyuan.fast' }
  ]
};

const productScreenshots = {
  'openclaw': [
    { title: 'OpenClaw 图文步骤 1', detail: '打开安装向导，Windows 用户建议先进入 WSL2；Mac、Linux、WSL2 执行官方一键脚本。', src: 'images/openclaw-guide/image1.png', alt: 'OpenClaw 部署截图 1' },
    { title: 'OpenClaw 图文步骤 2', detail: '选择 yes 继续安装。', src: 'images/openclaw-guide/image2.png', alt: 'OpenClaw 部署截图 2' },
    { title: 'OpenClaw 图文步骤 3', detail: '选择快速开始。', src: 'images/openclaw-guide/image3.png', alt: 'OpenClaw 部署截图 3' },
    { title: 'OpenClaw 图文步骤 4', detail: '选择自定义提供商，把词元.fast 当作兼容模型网关接入。', src: 'images/openclaw-guide/image4.png', alt: 'OpenClaw 部署截图 4' },
    { title: 'OpenClaw 图文步骤 5', detail: '填写 URL：OpenClaw 这里填 https://ciyuan.fast，不要加 /v1。', src: 'images/openclaw-guide/image5.png', alt: 'OpenClaw 部署截图 5' },
    { title: 'OpenClaw 图文步骤 6', detail: '粘贴词元.fast API Key。', src: 'images/openclaw-guide/image6.png', alt: 'OpenClaw 部署截图 6' },
    { title: 'OpenClaw 图文步骤 7', detail: '选择 OpenAI 格式。', src: 'images/openclaw-guide/image7.png', alt: 'OpenClaw 部署截图 7' },
    { title: 'OpenClaw 图文步骤 8', detail: '填写模型名称，例如 gpt-5.3-codex 或控制台可用模型。', src: 'images/openclaw-guide/image8.png', alt: 'OpenClaw 部署截图 8' },
    { title: 'OpenClaw 图文步骤 9', detail: '连接 App 的步骤可以先跳过。', src: 'images/openclaw-guide/image9.png', alt: 'OpenClaw 部署截图 9' },
    { title: 'OpenClaw 图文步骤 10', detail: '选择官方技能，不确定时先选推荐技能。', src: 'images/openclaw-guide/image10.png', alt: 'OpenClaw 部署截图 10' },
    { title: 'OpenClaw 图文步骤 11', detail: '包管理器推荐 npm。', src: 'images/openclaw-guide/image11.png', alt: 'OpenClaw 部署截图 11' },
    { title: 'OpenClaw 图文步骤 12', detail: '额外 API 能力不确定时先选 no。', src: 'images/openclaw-guide/image12.png', alt: 'OpenClaw 部署截图 12' },
    { title: 'OpenClaw 图文步骤 13', detail: '如果已开通生图、笔记、语音等能力，可按需开启。', src: 'images/openclaw-guide/image13.png', alt: 'OpenClaw 部署截图 13' },
    { title: 'OpenClaw 图文步骤 14', detail: '确认配置并 restart。', src: 'images/openclaw-guide/image14.png', alt: 'OpenClaw 部署截图 14' },
    { title: 'OpenClaw 图文步骤 15', detail: '进入对话框后先测试一句简单消息。', src: 'images/openclaw-guide/image15.png', alt: 'OpenClaw 部署截图 15' },
    { title: 'OpenClaw 图文步骤 16', detail: '检查 dashboard 是否能正常打开。', src: 'images/openclaw-guide/image16.png', alt: 'OpenClaw 部署截图 16' },
    { title: 'OpenClaw 图文步骤 17', detail: '检查状态与网关连接。', src: 'images/openclaw-guide/image17.png', alt: 'OpenClaw 部署截图 17' },
    { title: 'OpenClaw 图文步骤 18', detail: '查看技能和应用连接状态。', src: 'images/openclaw-guide/image18.png', alt: 'OpenClaw 部署截图 18' },
    { title: 'OpenClaw 图文步骤 19', detail: '确认模型回复可用。', src: 'images/openclaw-guide/image19.png', alt: 'OpenClaw 部署截图 19' },
    { title: 'OpenClaw 图文步骤 20', detail: '完成部署后按日常命令维护。', src: 'images/openclaw-guide/image20.png', alt: 'OpenClaw 部署截图 20' }
  ],
  'claude-code': [
    { title: '效果演示', detail: 'Claude Code 在终端中理解项目、执行命令并生成修改建议。', src: 'images/claude-code/introduce-01.webp', alt: 'Claude Code 效果演示 1' },
    { title: '多文件编辑', detail: '适合处理跨文件改动、重构和问题修复。', src: 'images/claude-code/introduce-02.webp', alt: 'Claude Code 效果演示 2' },
    { title: 'Windows 安装 Node.js', detail: '下载并安装 Node.js LTS，安装后验证 node 与 npm。', src: 'images/claude-code/windows-img-01.webp', alt: 'Windows 安装 Node.js 1' },
    { title: 'Windows Node.js 向导', detail: '保持默认选项完成安装。', src: 'images/claude-code/windows-img-02.webp', alt: 'Windows 安装 Node.js 2' },
    { title: 'Windows Node.js 安装', detail: '按安装器提示继续。', src: 'images/claude-code/windows-img-03.webp', alt: 'Windows 安装 Node.js 3' },
    { title: 'Windows Node.js 完成', detail: '完成后重新打开终端。', src: 'images/claude-code/windows-img-04.webp', alt: 'Windows 安装 Node.js 4' },
    { title: 'Windows 验证环境', detail: '确认 node --version 与 npm --version 可输出版本。', src: 'images/claude-code/windows-img-05.webp', alt: 'Windows 验证 Node.js' },
    { title: '安装 Git Bash', detail: 'Windows 使用 Git Bash 完成 Claude Code 安装步骤更稳。', src: 'images/claude-code/windows-img-06.webp', alt: 'Windows 安装 Git Bash 1' },
    { title: 'Git Bash 向导', detail: 'Git for Windows 安装过程保持默认设置。', src: 'images/claude-code/windows-img-07.webp', alt: 'Windows 安装 Git Bash 2' },
    { title: '验证 Git Bash', detail: 'git --version 能输出版本即安装成功。', src: 'images/claude-code/windows-img-08.webp', alt: 'Windows 验证 Git Bash' },
    { title: '安装 Claude Code', detail: '通过 npm 全局安装 @anthropic-ai/claude-code。', src: 'images/claude-code/windows-img-09.webp', alt: 'Windows 安装 Claude Code' },
    { title: 'Windows 填写配置', detail: '把 Base URL 和 API Key 改成词元.fast 信息。', src: 'images/claude-code/windows_configure.webp', alt: 'Windows 配置 Claude Code' },
    { title: '启动 Claude Code', detail: '在项目目录运行 claude。', src: 'images/claude-code/windows-img-11.webp', alt: 'Windows 启动 Claude Code 1' },
    { title: '进入交互界面', detail: '首次启动按提示完成初始化。', src: 'images/claude-code/windows-img-12.webp', alt: 'Windows 启动 Claude Code 2' },
    { title: '授权并使用', detail: '确认终端中的授权和工作目录。', src: 'images/claude-code/windows-img-13.webp', alt: 'Windows 启动 Claude Code 3' },
    { title: '开始提问', detail: '让 Claude Code 读取项目或解释代码。', src: 'images/claude-code/windows-img-14.webp', alt: 'Windows 使用 Claude Code 1' },
    { title: '模型菜单', detail: '使用 /model 检查当前模型选择。', src: 'images/claude-code/windows-img-16.webp', alt: 'Windows 选择模型 1' },
    { title: '选择模型', detail: '通常保持默认模型即可。', src: 'images/claude-code/windows-img-17.webp', alt: 'Windows 选择模型 2' },
    { title: 'macOS 打开终端', detail: '从终端执行安装和配置命令。', src: 'images/claude-code/macos-img-01.webp', alt: 'macOS 打开终端' },
    { title: 'macOS 安装 CLI', detail: '通过 npm 安装 Claude Code。', src: 'images/claude-code/macos-img-02.webp', alt: 'macOS 安装 Claude Code' },
    { title: 'macOS 配置', detail: '写入 ANTHROPIC_BASE_URL 与 ANTHROPIC_AUTH_TOKEN。', src: 'images/claude-code/macos_configure.webp', alt: 'macOS 配置 Claude Code' },
    { title: 'Linux 安装', detail: 'Linux 同样先准备 Node.js，再安装 CLI。', src: 'images/claude-code/linux-img-01.webp', alt: 'Linux 安装 Claude Code 1' }
  ],
  'codex-cli': [
    { title: '打开 Codex 中文教程对应界面', detail: '以中文教程为准：CLI 和客户端都是这个流程。', src: 'images/codex-zh/codex-client.png', alt: 'Codex 中文教程客户端界面' },
    { title: '找到 .codex 配置目录', detail: 'Windows 通常是 C:\Users\你的用户名\.codex，macOS/Linux 通常是 ~/.codex。', src: 'images/codex-zh/codex-dir.png', alt: 'Codex 中文教程 .codex 目录' },
    { title: '在 auth.json 写入 API Key', detail: '按中文教程流程，在 auth.json 写入词元.fast API Key。', src: 'images/codex-cli/windows_configure.webp', alt: 'Codex auth.json 配置' },
    { title: '在 config.toml 写入模型配置', detail: 'provider 指向词元.fast，model 写 gpt-5.5 或控制台可用模型。', src: 'images/codex-cli/macos_configure.webp', alt: 'Codex config.toml 配置' }
  ],
  'factory-droid-cli': [
    { title: 'Windows 打开终端', detail: '在 PowerShell 或 Windows Terminal 中开始安装。', src: 'images/factory-droid-cli/windows_open_terminal.webp', alt: 'Windows 打开终端' },
    { title: 'Windows 安装 Droid', detail: '按 Factory 文档安装 Droid CLI。', src: 'images/factory-droid-cli/windows_install_droid.webp', alt: 'Windows 安装 Droid CLI' },
    { title: 'Windows 配置 Droid', detail: '将配置文件中的接口与 Key 改成词元.fast。', src: 'images/factory-droid-cli/factory_cli_setup_windows.webp', alt: 'Windows 配置 Droid CLI' },
    { title: 'macOS 安装 Droid', detail: '在终端执行安装命令。', src: 'images/factory-droid-cli/macos_install_droid.webp', alt: 'macOS 安装 Droid CLI 1' },
    { title: 'macOS 继续安装', detail: '根据提示完成安装。', src: 'images/factory-droid-cli/macos_install_droid_2.webp', alt: 'macOS 安装 Droid CLI 2' },
    { title: 'macOS 配置 Droid', detail: '写入词元.fast Base URL、API Key 与模型。', src: 'images/factory-droid-cli/macos_configure.webp', alt: 'macOS 配置 Droid CLI' },
    { title: 'Droid 运行示例', detail: '在项目目录启动 Droid 并让它规划任务。', src: 'images/factory-droid-cli/droid_example.webp', alt: 'Droid CLI 运行示例' }
  ],
  'cc-switch': [
    { title: '填写 CC Switch 对话框', detail: '选择 Provider 后粘贴词元.fast 地址、API Key 与模型名称。', src: 'images/cc-switch/fill_dialog.webp', alt: 'CC Switch Provider 配置' }
  ],
  'cherry-studio': [
    { title: '返回聊天页', detail: '打开 Cherry Studio 后进入设置或模型管理。', src: 'images/cherry-studio/back_to_chat.webp', alt: 'Cherry Studio 返回聊天页' },
    { title: '添加服务商', detail: '在模型服务里新增 OpenAI 兼容服务商。', src: 'images/cherry-studio/add_provider.webp', alt: 'Cherry Studio 添加服务商' },
    { title: '复制 API Key', detail: '从词元.fast 控制台复制密钥。', src: 'images/cherry-studio/copy_api_key.webp', alt: 'Cherry Studio 复制 API Key' },
    { title: '添加模型', detail: '填入模型 ID 并保存。', src: 'images/cherry-studio/add_models.webp', alt: 'Cherry Studio 添加模型' },
    { title: '切换模型', detail: '回到对话页选择刚创建的模型。', src: 'images/cherry-studio/switch_model.webp', alt: 'Cherry Studio 切换模型' },
    { title: '添加绘图模型', detail: '在绘图功能中配置可用的生图模型。', src: 'images/cherry-studio/add_paint_models.webp', alt: 'Cherry Studio 添加绘图模型' },
    { title: '使用绘图', detail: '选择绘图模型后输入提示词测试。', src: 'images/cherry-studio/paint.webp', alt: 'Cherry Studio 绘图' }
  ],
  'aionui': [
    { title: 'AionUi 入口', detail: 'AionUi 是桌面办公 Agent，先准备客户端或源码环境。', src: 'images/aionuilogo.webp', alt: 'AionUi 标识' },
    { title: '添加模型', detail: '在模型设置中新增 OpenAI 兼容模型。', src: 'images/add-model-1.webp', alt: 'AionUi 添加模型' },
    { title: '配置 NewAPI 服务商', detail: 'Base URL 使用 https://ciyuan.fast/v1，Key 使用词元.fast 令牌。', src: 'images/newapi_provider.webp', alt: 'AionUi NewAPI 服务商' },
    { title: '复制 API Key', detail: '从控制台复制 API Key 后粘贴到 AionUi。', src: 'images/copy_apikey.webp', alt: 'AionUi 复制 API Key' }
  ],
  'fluent-read': [
    { title: '控制台提示', detail: '安装插件后从词元.fast 控制台触发导入。', src: 'images/fluent-read/hint.webp', alt: 'FluentRead 导入提示' },
    { title: '确认导入', detail: '检查服务类型、Key、接口地址和模型。', src: 'images/fluent-read/confirm.webp', alt: 'FluentRead 确认导入' },
    { title: '配置结果', detail: '确认 NewAPI 配置已在 FluentRead 中启用。', src: 'images/fluent-read/fluentread.webp', alt: 'FluentRead 配置结果' },
    { title: '手动配置', detail: '也可在插件设置中手动填写 NewAPI 参数。', src: 'images/fluent-read/configuration.webp', alt: 'FluentRead 手动配置' }
  ],
  'langbot': [
    { title: '获取 API Key', detail: '从词元.fast 控制台复制 API Key。', src: 'images/langbot/get_api_key.webp', alt: 'LangBot 获取 API Key' },
    { title: '添加 NewAPI 模型', detail: '在 LangBot 中新增 NewAPI 供应商。', src: 'images/langbot/add_newapi_model.webp', alt: 'LangBot 添加 NewAPI 模型' },
    { title: '选择模型', detail: '在流水线中选择刚添加的模型。', src: 'images/langbot/select_model.webp', alt: 'LangBot 选择模型' },
    { title: '对话调试', detail: '通过调试窗口验证模型回复。', src: 'images/langbot/debug_chat.webp', alt: 'LangBot 对话调试' },
    { title: '配置微信', detail: '如需微信场景，在平台适配器里继续绑定。', src: 'images/langbot/wechat.webp', alt: 'LangBot 微信配置' },
    { title: '添加嵌入模型', detail: '知识库场景需要额外添加 embedding 模型。', src: 'images/langbot/add_embedding_model.webp', alt: 'LangBot 添加嵌入模型' },
    { title: '使用嵌入模型', detail: '新建知识库时选择该嵌入模型。', src: 'images/langbot/use_embedding_model.webp', alt: 'LangBot 使用嵌入模型' }
  ],
  'astrbot': [
    { title: '创建 API Key', detail: '在词元.fast 控制台创建密钥。', src: 'images/astrbot/image.webp', alt: 'AstrBot 创建 API Key' },
    { title: '复制 API Key', detail: '复制生成的密钥。', src: 'images/astrbot/image-1.webp', alt: 'AstrBot 复制 API Key' },
    { title: '配置提供商', detail: '在 AstrBot 中新增 OpenAI 提供商并填写 Base URL。', src: 'images/astrbot/image-2.webp', alt: 'AstrBot 提供商配置' },
    { title: '应用模型', detail: '在配置文件中切换默认聊天模型。', src: 'images/astrbot/image-3.webp', alt: 'AstrBot 应用模型' }
  ]
};

const products = [
  {
    id: 'openclaw', category: 'hub', title: 'OpenClaw', subtitle: '自托管 AI 智能助手平台', tags: ['自托管', '多渠道', 'Gateway'],
    summary: 'OpenClaw 图文部署详细指南：按上传 Word 文档从安装、模型配置、技能选择、安全审计到附录完整整理。',
    body: `
      <h2>OpenClaw部署详细指南（图文版）</h2>
      <p class="lead">项目地址：<a href="https://github.com/openclaw/openclaw" target="_blank" rel="noreferrer">https://github.com/openclaw/openclaw</a>。这部分按你上传的 Word 文档完整整理，保持当前卡片式排版和图文步骤。注意：你上传的文档写的是 <code>https://ciyuan.fast/v1</code>，但 OpenClaw 安装向导这里应填 <code>https://ciyuan.fast</code>，不要加 <code>/v1</code>。</p>
      <h3>一、推荐安装方式：官方一键脚本</h3>
      <p>Windows 系统建议在 WSL2 下运行 OpenClaw。Mac、Linux、WSL2 用户使用官方一键脚本最省事，脚本会自动检测环境、安装 Node.js（如果缺失）并启动初始配置引导。</p><pre><code># Mac / Linux / WSL2
curl -fsSL https://openclaw.ai/install.sh | bash</code></pre><p>如果 Mac 出现 <code>Homebrew not found</code>，先安装 Homebrew 并配置环境变量。</p><pre><code>/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> /Users/admin/.zprofile
eval "$(/opt/homebrew/bin/brew shellenv)"
brew --version</code></pre><p>Windows PowerShell 用户执行：</p><pre><code>iwr -useb https://openclaw.ai/install.ps1 | iex</code></pre><p>安装文档：<a href="https://docs.openclaw.ai/install" target="_blank" rel="noreferrer">https://docs.openclaw.ai/install</a>。</p>
      <h3>二、安装配置细节</h3>
      <ol><li>开始安装后选择 <strong>yes</strong>。</li><li>选择快速开始。</li><li>选择模型厂商：自定义提供商（ciyuan.fast）。</li><li>填入 URL：<strong>https://ciyuan.fast</strong>。OpenClaw 安装向导里填写 URL 时不要加 /v1，填写 https://ciyuan.fast，不是 https://ciyuan.fast/v1。</li><li>填入你的 API Key。</li><li>选择 OpenAI 格式。</li><li>填入模型名称，例如 <code>gpt-5.3-codex</code>；如按 Codex 教程则可用 <code>gpt-5.5</code>。</li><li>后面两个字段相当于代号，可以按向导提示填写。</li><li>连接 App 的步骤可以先跳过。</li><li>进入技能选择界面，不知道选什么时先按图选择推荐项。</li><li>包管理器推荐 npm。</li><li>生图、笔记、语音对话等额外 API，不确定时先全部选 no；开通后再选 yes。</li><li>最后选择 restart，进入对话框后先发一句简单消息测试。</li></ol>
      <h3>三、部署后的验证与日常命令</h3>
      <pre><code>openclaw doctor         # 检查配置问题
openclaw status         # 网关状态
openclaw dashboard      # 打开浏览器用户界面</code></pre><p>常用指令：<code>openclaw dashboard</code> 打开可视化面板，<code>openclaw onboard</code> 重新配置，<code>openclaw gateway restart</code> 重启，<code>openclaw update</code> 升级，<code>openclaw status</code> 检查状态，<code>openclaw doctor</code> 诊断配置健康度。</p>
      <h3>四、安全：先最小权限，再逐步扩大</h3>
      <p>定期运行安全审计，尤其是在更改配置或暴露网络接口后。它会标记网关身份验证暴露、浏览器控制暴露、提升的允许列表、文件系统权限等常见漏洞。</p><pre><code>openclaw security audit
openclaw security audit --deep
openclaw security audit --fix
openclaw security audit --json</code></pre><p>OpenClaw 既是一款产品，也是一项实验。不存在“绝对安全”的设置。你要先想清楚：谁可以和机器人对话？机器人被允许在哪里行动？机器人可以触摸哪些东西？</p><p>高危命令：赋予 OpenClaw 全部权限，慎重执行。</p><pre><code>openclaw config set tools.profile full
openclaw gateway restart</code></pre>
      <h3>五、其他扩展</h3>
      <ul><li><strong>Claw 与飞书集成</strong>：可在连接 App 阶段或 dashboard 中补充飞书凭证。</li><li><strong>自定义 skill</strong>：把你的脚本、工具、业务流程包装成 OpenClaw 可调用能力。</li></ul>
      <h3>附录 1：技能详情</h3>
      <p><strong>核心扩展与视觉自动化</strong>：<code>mcporter</code> 是 MCP 桥接器；<code>peekaboo</code> 是 Mac 视觉自动化工具；<code>clawhub</code> 是官方技能包中心；<code>model-usage</code> 用于监控 Token 和账单。</p><p><strong>凭证与系统操作</strong>：<code>1password</code> 安全提取密码和 API Key；<code>camsnap</code> 调用 Mac 摄像头。</p><p><strong>通讯与信息处理</strong>：<code>himalaya</code> 是终端邮件客户端；<code>imsg</code> / <code>wacli</code> 可绑定 iMessage 或 WhatsApp。</p><p><strong>效率笔记与日程监控</strong>：<code>obsidian</code>、<code>bear-notes</code>、<code>apple-notes</code> 读写笔记；<code>things-mac</code>、<code>apple-reminders</code> 管理任务；<code>blogwatcher</code> 监控博客和 RSS。</p><p><strong>多媒体与特定领域</strong>：<code>video-frames</code> 视频抽帧；<code>nano-pdf</code> 解析 PDF；<code>goplaces</code> 接 Google Places；<code>openai-whisper</code> 语音转文字；<code>gemini</code> 处理多模态或复杂推理。</p>
      <h3>附录 2：可能需要接入的其他 API Key</h3>
      <table><tr><th>能力</th><th>环境变量</th><th>场景</th></tr><tr><td>goplaces</td><td><code>GOOGLE_PLACES_API_KEY</code></td><td>地理位置、店铺信息、评分和路线规划。</td></tr><tr><td>nano-banana-pro</td><td><code>GEMINI_API_KEY</code></td><td>图像生成与编辑。</td></tr><tr><td>notion</td><td><code>NOTION_API_KEY</code></td><td>读写 Notion 工作区。</td></tr><tr><td>openai-image-gen</td><td><code>OPENAI_API_KEY</code></td><td>图像生成。</td></tr><tr><td>openai-whisper-api</td><td><code>OPENAI_API_KEY</code></td><td>语音识别。</td></tr><tr><td>sag</td><td><code>ELEVENLABS_API_KEY</code></td><td>拟真人声合成。</td></tr></table>
      <h3>附录 3：组成完整 Claw 大脑的脑区</h3>
      <p><strong>boot-md</strong> 类似启动脚本，每次网关启动读取并执行 <code>BOOT.md</code>。</p><p><strong>bootstrap-extra-files</strong> 用于上下文预加载，把项目代码或日志注入初始上下文。</p><p><strong>command-logger</strong> 集中记录 Agent 执行过的 Shell 命令，方便追溯。</p><p><strong>session-memory</strong> 把短期会话记忆沉淀为长期记忆。</p>
    `
  },
  {
    id: 'claude-code', category: 'coding', title: 'Claude Code', subtitle: 'Anthropic 终端编程助手', tags: ["终端","代码理解","IDE"],
    summary: '完整复刻源站 Claude Code 教程密度：效果演示、特性表、Windows/macOS/Linux 全流程、环境变量、启动和常见问题。',
    body: `
      <div class="callout"><strong>项目介绍</strong><p>直接在你的终端中释放 Claude 的强大能力。瞬间搜索百万行代码库。将耗时数小时的工作流程化为一条命令。你的工具，你的工作流，你的代码库，以思维速度进化。</p><ul><li>官方主页：<a href="https://www.anthropic.com/claude-code" target="_blank" rel="noreferrer">https://www.anthropic.com/claude-code</a></li></ul></div>
      <h2>效果演示</h2>
      <figure class="shot doc-shot"><img src="images/claude-code/introduce-01.webp" alt="introduce-01.webp" loading="lazy" data-full="images/claude-code/introduce-01.webp"><figcaption>introduce-01.webp</figcaption></figure>
      <figure class="shot doc-shot"><img src="images/claude-code/introduce-02.webp" alt="introduce-02.webp" loading="lazy" data-full="images/claude-code/introduce-02.webp"><figcaption>introduce-02.webp</figcaption></figure>
      <h3>特性</h3>
      <table><tr><th><strong>功能分类</strong></th><th><strong>特性</strong></th></tr><tr><td><strong>代码理解</strong></td><td>深度代码库分析，利用智能代理搜索理解项目结构和依赖</td></tr><tr><td></td><td>自动生成高层次代码概述，快速帮助用户理解代码库</td></tr><tr><td><strong>代码编辑</strong></td><td>支持多文件协同编辑，适用于复杂代码修改</td></tr><tr><td></td><td>提供符合项目模式和架构的实际可用代码建议</td></tr><tr><td><strong>集成能力</strong></td><td>支持在终端中直接运行，无需切换上下文</td></tr><tr><td></td><td>与VS Code和JetBrains IDE无缝集成，无需复制粘贴</td></tr><tr><td><strong>代码生成和优化</strong></td><td>自动生成代码、创建测试、修复错误，支持从概念到提交的完整流程</td></tr><tr><td></td><td>为代码生成和理解优化，结合Claude Opus 4等先进模型</td></tr><tr><td><strong>安全与灵活性</strong></td><td>改动需获得用户明确授权，文件和命令操作更安全</td></tr><tr><td></td><td>适应用户代码规范，支持自定义配置</td></tr><tr><td><strong>工具链整合</strong></td><td>支持与GitHub、GitLab等工具结合，实现自动化工作流程</td></tr><tr><td></td><td>与测试套件、构建系统集成，增强现有开发工具</td></tr><tr><td><strong>跨平台与扩展</strong></td><td>支持Windows、macOS、Linux操作系统</td></tr><tr><td></td><td>可配置运行在SDK或GitHub Actions中，灵活适配不同需求</td></tr><tr><td><strong>主要应用场景</strong></td><td>代码库入门和理解、新成员快速上手</td></tr><tr><td></td><td>代码问题修复与优化流程，从分析问题到提交PR</td></tr><tr><td></td><td>项目代码重构与新功能实现</td></tr><tr><td><strong>用户反馈亮点</strong></td><td>提升日常开发效率，省去例行任务消耗的时间</td></tr><tr><td></td><td>处理复杂多步骤任务表现优异，扩展开发可能性</td></tr></table>
      <h2>AI 模型配置方法</h2>
      <h3>Windows 端图文指引</h3>
      <h4>1.安装 Node.js 环境</h4>
      <p>Claude Code 需要 Node.js 环境才能运行。</p>
      <div class="callout"><strong>Node.js 环境安装步骤</strong><ul><li>打开浏览器访问 https://nodejs.org/</li><li>点击 "LTS"版本进行下载（推荐长期支持版本）</li><li>下载完成后双击 .msi 文件</li><li>按照安装向导完成安装，保持默认设置即可</li></ul></div>
      <div class="callout callout-warn"><strong>Windows 注意事项</strong><ul><li>建议使用 PowerShell 而不是 CMD</li><li>如果遇到权限问题，尝试以管理员身份运行</li><li>某些杀毒软件可能会误报，需要添加白名单</li></ul></div>
      <figure class="shot doc-shot"><img src="images/claude-code/windows-img-01.webp" alt="windows-img-01.webp" loading="lazy" data-full="images/claude-code/windows-img-01.webp"><figcaption>windows-img-01.webp</figcaption></figure>
      <figure class="shot doc-shot"><img src="images/claude-code/windows-img-02.webp" alt="windows-img-02.webp" loading="lazy" data-full="images/claude-code/windows-img-02.webp"><figcaption>windows-img-02.webp</figcaption></figure>
      <figure class="shot doc-shot"><img src="images/claude-code/windows-img-03.webp" alt="windows-img-03.webp" loading="lazy" data-full="images/claude-code/windows-img-03.webp"><figcaption>windows-img-03.webp</figcaption></figure>
      <figure class="shot doc-shot"><img src="images/claude-code/windows-img-04.webp" alt="windows-img-04.webp" loading="lazy" data-full="images/claude-code/windows-img-04.webp"><figcaption>windows-img-04.webp</figcaption></figure>
      <figure class="shot doc-shot"><img src="images/claude-code/windows-img-05.webp" alt="windows-img-05.webp" loading="lazy" data-full="images/claude-code/windows-img-05.webp"><figcaption>windows-img-05.webp</figcaption></figure>
      <div class="callout"><strong>验证安装是否成功</strong><p>安装完成后，打开 PowerShell 或 CMD，输入以下命令：</p><pre><code>node --version
      npm --version</code></pre><p>如果显示版本号，说明安装成功。</p></div>
      <h4>2.安装 Git Bash</h4>
      <div class="callout callout-warn"><strong>Windows 注意事项</strong><p>Windows 环境下需要使用 Git Bash 安装 Claude code。安装完成后，环境变量设置和使用 Claude Code 仍然在普通的 PowerShell 或 CMD 中进行。</p></div>
      <div class="callout"><strong>下载并安装 Git for Windows</strong><ul><li>访问 https://git-scm.com/downloads/win</li><li>点击 "Download for Windows" 下载安装包</li><li>运行下载的 .exe 安装文件</li><li>在安装过程中保持默认设置，直接点击 "Next" 完成安装</li></ul></div>
      <figure class="shot doc-shot"><img src="images/claude-code/windows-img-06.webp" alt="windows-img-06.webp" loading="lazy" data-full="images/claude-code/windows-img-06.webp"><figcaption>windows-img-06.webp</figcaption></figure>
      <figure class="shot doc-shot"><img src="images/claude-code/windows-img-07.webp" alt="windows-img-07.webp" loading="lazy" data-full="images/claude-code/windows-img-07.webp"><figcaption>windows-img-07.webp</figcaption></figure>
      <figure class="shot doc-shot"><img src="images/claude-code/windows-img-08.webp" alt="windows-img-08.webp" loading="lazy" data-full="images/claude-code/windows-img-08.webp"><figcaption>windows-img-08.webp</figcaption></figure>
      <div class="callout"><strong>验证 Git Bash 安装</strong><p>安装完成后，打开 Git Bash，输入以下命令验证：</p><pre><code>git --version</code></pre><p>如果显示版本号，说明安装成功。</p></div>
      <h4>3.安装 Claude Code</h4>
      <div class="callout"><strong>安装 Claude Code</strong><p>打开 PowerShell，运行以下命令：</p><pre><code>npm install -g @anthropic-ai/claude-code</code></pre><p>这个命令会从 npm 官方仓库下载并安装最新版本的 Claude Code。</p></div>
      <figure class="shot doc-shot"><img src="images/claude-code/windows-img-09.webp" alt="windows-img-09.webp" loading="lazy" data-full="images/claude-code/windows-img-09.webp"><figcaption>windows-img-09.webp</figcaption></figure>
      <div class="callout"><strong>将 ~/.local/bin 加入 PATH（仅当提示要求时）</strong><pre><code>[Environment]::SetEnvironmentVariable('Path', ([Environment]::GetEnvironmentVariable('Path','User') + ";$HOME\.local\bin"), 'User')</code></pre></div>
      <div class="callout"><strong>验证 Claude Code 安装</strong><p>安装完成后，输入以下命令检查是否安装成功：</p><pre><code>claude --version</code></pre><p>如果显示版本号，恭喜你！Claude Code 已经成功安装了。</p></div>
      <h4>4.设置环境变量</h4>
      <div class="callout"><strong>一键设置命令 (Windows 系统)</strong><p>为了让 Claude Code 连接到词元.fast API服务，需要设置多个环境变量：</p></div>
      <pre><code>iex (irm 'https://raw.githubusercontent.com/QuantumNous/new-api-docs/refs/heads/main/helper/claude-cli-setup.ps1')</code></pre>
      <figure class="shot doc-shot"><img src="images/claude-code/windows_configure.webp" alt="windows-configure" loading="lazy" data-full="images/claude-code/windows_configure.webp"><figcaption>windows-configure</figcaption></figure>
      <div class="callout"><strong>设置API地址和KEY秘钥</strong><p>将base_url设置为：https://ciyuan.fast API KEY秘钥设置成你在词元.fast 控制台创建的令牌</p></div>
      <h4>5.开始使用 Claude Code</h4>
      <p>现在你可以开始使用 Claude Code 了！</p>
      <div class="callout"><strong>启动 Claude Code</strong><p>打开 PowerShell，直接启动 Claude Code：</p><pre><code>claude</code></pre><p>在特定项目中使用：</p><pre><code># 进入你的项目目录
      cd C:\path\to\your\project
      
      # 启动 Claude Code
      claude</code></pre></div>
      <figure class="shot doc-shot"><img src="images/claude-code/windows-img-11.webp" alt="windows-img-11.webp" loading="lazy" data-full="images/claude-code/windows-img-11.webp"><figcaption>windows-img-11.webp</figcaption></figure>
      <figure class="shot doc-shot"><img src="images/claude-code/windows-img-12.webp" alt="windows-img-12.webp" loading="lazy" data-full="images/claude-code/windows-img-12.webp"><figcaption>windows-img-12.webp</figcaption></figure>
      <figure class="shot doc-shot"><img src="images/claude-code/windows-img-13.webp" alt="windows-img-13.webp" loading="lazy" data-full="images/claude-code/windows-img-13.webp"><figcaption>windows-img-13.webp</figcaption></figure>
      <figure class="shot doc-shot"><img src="images/claude-code/windows-img-14.webp" alt="windows-img-14.webp" loading="lazy" data-full="images/claude-code/windows-img-14.webp"><figcaption>windows-img-14.webp</figcaption></figure>
      <figure class="shot doc-shot"><img src="images/claude-code/windows-img-15.webp" alt="windows-img-15.webp" loading="lazy" data-full="images/claude-code/windows-img-15.webp"><figcaption>windows-img-15.webp</figcaption></figure>
      <div class="callout"><strong>选择模型</strong><p>输入命令：</p><pre><code>/model</code></pre><p>按 Enter 进入，选择模型，通常使用默认设置即可。</p></div>
      <figure class="shot doc-shot"><img src="images/claude-code/windows-img-16.webp" alt="windows-img-16.webp" loading="lazy" data-full="images/claude-code/windows-img-16.webp"><figcaption>windows-img-16.webp</figcaption></figure>
      <figure class="shot doc-shot"><img src="images/claude-code/windows-img-17.webp" alt="windows-img-17.webp" loading="lazy" data-full="images/claude-code/windows-img-17.webp"><figcaption>windows-img-17.webp</figcaption></figure>
      <blockquote>注意：设置环境变量修改后，使用所有模型（包括官方预设模型）均调用自定义接入点，而不使用官方账号额度。</blockquote>
      <h3>MacOS 端图文指引</h3>
      <h4>1.安装 Claude Code CLI</h4>
      <p>打开终端</p>
      <figure class="shot doc-shot"><img src="images/claude-code/macos-img-01.webp" alt="macos-img-01.webp" loading="lazy" data-full="images/claude-code/macos-img-01.webp"><figcaption>macos-img-01.webp</figcaption></figure>
      <div class="callout"><strong>安装 Claude Code</strong><p>打开终端，运行以下命令：</p><pre><code>curl -fsSL https://claude.ai/install.sh | bash</code></pre><p>可选项：出现提示后运行提供的命令</p><pre><code>echo 'export PATH="$HOME/.local/bin:$PATH"' &gt;&gt; ~/.bashrc &amp;&amp; source ~/.bashrc</code></pre></div>
      <figure class="shot doc-shot"><img src="images/claude-code/macos-img-02.webp" alt="macos-img-02.webp" loading="lazy" data-full="images/claude-code/macos-img-02.webp"><figcaption>macos-img-02.webp</figcaption></figure>
      <h4>2.设置环境变量</h4>
      <p>为了让 Claude Code 连接到词元.fast 服务，需要设置环境变量：</p>
      <div class="callout"><strong>一键设置 Claude Code 环境变量</strong><p>输入命令：</p><pre><code>curl -fsSL https://raw.githubusercontent.com/QuantumNous/new-api-docs/refs/heads/main/helper/claude-cli-setup.sh | bash</code></pre></div>
      <figure class="shot doc-shot"><img src="images/claude-code/macos_configure.webp" alt="macos-configure" loading="lazy" data-full="images/claude-code/macos_configure.webp"><figcaption>macos-configure</figcaption></figure>
      <div class="callout"><strong>设置API地址和KEY秘钥</strong><p>将base_url设置为：https://ciyuan.fast API KEY秘钥设置成你在词元.fast 控制台创建的令牌</p></div>
      <div class="callout"><strong>验证 Claude Code 安装</strong><p>安装完成后，输入以下命令检查是否安装成功：</p><pre><code>claude --version</code></pre><p>如果显示版本号，恭喜你！Claude Code 已经成功安装了。</p></div>
      <h4>3.开始使用 Claude Code</h4>
      <p>现在你可以开始使用 Claude Code 了！</p>
      <div class="callout"><strong>启动 Claude Code</strong><p>直接启动 Claude Code：</p><pre><code>claude</code></pre><p>在特定项目中使用：</p><pre><code># 进入你的项目目录
      cd /path/to/your/project
      
      # 启动 Claude Code
      claude</code></pre></div>
      <figure class="shot doc-shot"><img src="images/claude-code/macos-img-04.webp" alt="macos-img-04.webp" loading="lazy" data-full="images/claude-code/macos-img-04.webp"><figcaption>macos-img-04.webp</figcaption></figure>
      <figure class="shot doc-shot"><img src="images/claude-code/macos-img-05.webp" alt="macos-img-05.webp" loading="lazy" data-full="images/claude-code/macos-img-05.webp"><figcaption>macos-img-05.webp</figcaption></figure>
      <figure class="shot doc-shot"><img src="images/claude-code/macos-img-06.webp" alt="macos-img-06.webp" loading="lazy" data-full="images/claude-code/macos-img-06.webp"><figcaption>macos-img-06.webp</figcaption></figure>
      <figure class="shot doc-shot"><img src="images/claude-code/macos-img-07.webp" alt="macos-img-07.webp" loading="lazy" data-full="images/claude-code/macos-img-07.webp"><figcaption>macos-img-07.webp</figcaption></figure>
      <figure class="shot doc-shot"><img src="images/claude-code/macos-img-08.webp" alt="macos-img-08.webp" loading="lazy" data-full="images/claude-code/macos-img-08.webp"><figcaption>macos-img-08.webp</figcaption></figure>
      <div class="callout"><strong>选择模型 (可选)</strong><p>输入命令：</p><pre><code>/model</code></pre><p>按 Enter 进入，选择官方模型，通常使用默认模型即可。</p></div>
      <figure class="shot doc-shot"><img src="images/claude-code/macos-img-09.webp" alt="macos-img-09.webp" loading="lazy" data-full="images/claude-code/macos-img-09.webp"><figcaption>macos-img-09.webp</figcaption></figure>
      <figure class="shot doc-shot"><img src="images/claude-code/macos-img-10.webp" alt="macos-img-10.webp" loading="lazy" data-full="images/claude-code/macos-img-10.webp"><figcaption>macos-img-10.webp</figcaption></figure>
      <figure class="shot doc-shot"><img src="images/claude-code/macos-img-11.webp" alt="macos-img-11.webp" loading="lazy" data-full="images/claude-code/macos-img-11.webp"><figcaption>macos-img-11.webp</figcaption></figure>
      <blockquote>注意：设置环境变量修改 <code>ANTHROPIC_BASE_URL</code> 后，使用所有模型（包括官方预设模型）均调用自定义接入点，而不使用官方账号额度。</blockquote>
      <h4>4.macOS 常见问题解决</h4>
      <div class="callout"><strong>macOS 安全设置阻止运行</strong><p>如果系统阻止运行 Claude Code：</p><ul><li>打开"系统偏好设置" → "安全性与隐私"</li><li>点击"仍要打开"或"允许"</li><li>或者在 Terminal 中运行：<code>sudo spctl --master-disable</code></li></ul></div>
      <h3>Linux 端图文指引</h3>
      <h4>1.安装 Claude Code</h4>
      <figure class="shot doc-shot"><img src="images/claude-code/linux-img-01.webp" alt="linux-img-01.webp" loading="lazy" data-full="images/claude-code/linux-img-01.webp"><figcaption>linux-img-01.webp</figcaption></figure>
      <div class="callout"><strong>安装 Claude Code</strong><p>打开终端，运行以下命令：</p><pre><code>curl -fsSL https://claude.ai/install.sh | bash</code></pre><p>如果遇到权限问题，可以使用 sudo：</p><pre><code>sudo curl -fsSL https://claude.ai/install.sh | bash</code></pre></div>
      <figure class="shot doc-shot"><img src="images/claude-code/linux-img-03.webp" alt="linux-img-03.webp" loading="lazy" data-full="images/claude-code/linux-img-03.webp"><figcaption>linux-img-03.webp</figcaption></figure>
      <div class="callout"><strong>验证 Claude Code 安装</strong><p>安装完成后，输入以下命令检查是否安装成功：</p><pre><code>claude --version</code></pre><p>如果显示版本号，恭喜你！Claude Code 已经成功安装了。</p></div>
      <h4>2.设置环境变量</h4>
      <p>为了让 Claude Code 连接词元.fast 服务，需要设置两个环境变量：</p>
      <div class="callout"><strong>一键修改环境变量</strong><p>输入命令：</p><pre><code>curl -fsSL https://raw.githubusercontent.com/QuantumNous/new-api-docs/refs/heads/main/helper/claude-cli-setup.sh | bash</code></pre></div>
      <figure class="shot doc-shot"><img src="images/claude-code/macos_configure.webp" alt="macos-configure" loading="lazy" data-full="images/claude-code/macos_configure.webp"><figcaption>macos-configure</figcaption></figure>
      <div class="callout"><strong>设置API地址和KEY秘钥</strong><p>将base_url设置为：https://ciyuan.fast API KEY秘钥设置成你在词元.fast 控制台创建的令牌</p></div>
      <h4>3.开始使用 Claude Code</h4>
      <p>现在你可以开始使用 Claude Code 了！</p>
      <div class="callout"><strong>启动 Claude Code</strong><p>直接启动 Claude Code：</p><pre><code>claude</code></pre><p>在特定项目中使用：</p><pre><code># 进入你的项目目录
      cd /path/to/your/project
      
      # 启动 Claude Code
      claude</code></pre></div>
      <figure class="shot doc-shot"><img src="images/claude-code/linux-img-03.webp" alt="linux-img-03.webp" loading="lazy" data-full="images/claude-code/linux-img-03.webp"><figcaption>linux-img-03.webp</figcaption></figure>
      <figure class="shot doc-shot"><img src="images/claude-code/linux-img-04.webp" alt="linux-img-04.webp" loading="lazy" data-full="images/claude-code/linux-img-04.webp"><figcaption>linux-img-04.webp</figcaption></figure>
      <figure class="shot doc-shot"><img src="images/claude-code/linux-img-05.webp" alt="linux-img-05.webp" loading="lazy" data-full="images/claude-code/linux-img-05.webp"><figcaption>linux-img-05.webp</figcaption></figure>
      <div class="callout"><strong>选择模型</strong><p>输入命令：</p><pre><code>/model</code></pre><p>按 Enter 进入，选择官方模型，通常使用默认模型即可。</p></div>
      <figure class="shot doc-shot"><img src="images/claude-code/linux-img-06.webp" alt="linux-img-06.webp" loading="lazy" data-full="images/claude-code/linux-img-06.webp"><figcaption>linux-img-06.webp</figcaption></figure>
      <figure class="shot doc-shot"><img src="images/claude-code/linux-img-07.webp" alt="linux-img-07.webp" loading="lazy" data-full="images/claude-code/linux-img-07.webp"><figcaption>linux-img-07.webp</figcaption></figure>
      <figure class="shot doc-shot"><img src="images/claude-code/linux-img-08.webp" alt="linux-img-08.webp" loading="lazy" data-full="images/claude-code/linux-img-08.webp"><figcaption>linux-img-08.webp</figcaption></figure>
      <figure class="shot doc-shot"><img src="images/claude-code/linux-img-09.webp" alt="linux-img-09.webp" loading="lazy" data-full="images/claude-code/linux-img-09.webp"><figcaption>linux-img-09.webp</figcaption></figure>
      <blockquote>注意：设置环境变量修改 <code>ANTHROPIC_BASE_URL</code> 后，使用所有模型（包括官方预设模型）均调用自定义接入点，而不使用官方账号额度。</blockquote>
      <h4>4.Linux 常见问题解决</h4>
      <div class="callout"><strong>缺少依赖库</strong><p>某些 Linux 发行版需要安装额外依赖：</p><pre><code># Ubuntu/Debian
      sudo apt install build-essential
      
      # CentOS/RHEL
      sudo dnf groupinstall "Development Tools"</code></pre></div>
      <div class="callout"><strong>环境变量不生效</strong><p>检查以下几点：</p><ul><li>确认修改了正确的配置文件（<code>.bashrc</code> 或 <code>.zshrc</code>）</li><li>重新启动终端或运行 <code>source ~/.bashrc</code></li><li>验证设置：<code>echo $ANTHROPIC_BASE_URL</code></li></ul></div>
    `
  },
  {
    id: 'codex-cli', category: 'coding', title: 'OpenAI Codex CLI', subtitle: 'OpenAI 终端 AI 编程助手', tags: ['Codex', 'auth.json', 'config.toml'],
    summary: '按指定知乎教程整理：Codex CLI 和客户端共用 .codex、auth.json、config.toml，模型使用 gpt-5.5。',
    body: `
      <h2>OpenAI Codex CLI / Codex 客户端</h2>
      <p class="lead">这部分按你指定的知乎教程重写：Codex CLI 和 VS Code Codex 客户端都是这个流程，核心是用户目录下的 <code>.codex</code> 文件夹，共用 <code>auth.json</code> 和 <code>config.toml</code>。默认模型按来源写 <code>gpt-5.5</code>。</p>
      <h3>项目介绍</h3>
      <p>Codex CLI 是 OpenAI 的终端编码代理，可在本地项目中读代码、改文件、生成补丁并运行命令；Codex 客户端通过 VS Code 扩展提供图形化入口。两者接入词元.fast 时，统一检查 <code>.codex</code> 目录。</p>
      <h3>安装 Codex CLI</h3>
      <pre><code>npm install -g @openai/codex
codex --version</code></pre><p>Windows 建议在 WSL2 中安装和运行；macOS / Linux 直接在终端执行。若没有 Node.js，请先安装 Node.js LTS。</p>
      <h3>VS Code Codex 客户端</h3>
      <ol><li>打开 VS Code 扩展市场，搜索 Codex / OpenAI Codex。</li><li>安装后打开 Codex 面板。</li><li>客户端读取的仍是用户目录下 <code>.codex</code> 配置；CLI 和客户端都是这个流程。</li></ol>
      <h3>找到 .codex 配置目录</h3>
      <p>Windows 通常是 <code>C:\Users\你的用户名\.codex</code>；macOS / Linux 通常是 <code>~/.codex</code>。如果目录不存在，先运行一次 <code>codex</code> 或手动创建。</p>
      <h3>auth.json：写入 API Key</h3>
      <pre><code>{
  "OPENAI_API_KEY": "你的词元.fast API Key"
}</code></pre><p>把词元.fast 控制台创建的密钥写入 <code>auth.json</code>。密钥只放这一处，避免多个文件互相覆盖导致排错困难。</p>
      <h3>config.toml：写入模型和 Provider</h3>
      <pre><code>model = "gpt-5.5"
model_provider = "ciyuan-fast"

[model_providers.ciyuan-fast]
name = "词元.fast"
base_url = "https://ciyuan.fast/v1"
wire_api = "responses"
env_key = "OPENAI_API_KEY"</code></pre><p>如果你使用的 Codex 版本要求 Chat Completions，可把 <code>wire_api</code> 按版本提示调整；但先按教程使用 Responses 流程验证。</p>
      <h3>开始使用</h3>
      <pre><code>cd /path/to/your/project
codex

# 进入后可切换模型
/model</code></pre><p>启动后先问一句简单问题，再让它读取当前目录文件。确认模型、权限、沙箱策略都正常后，再交给它做真实修改。</p>
      <h3>常见问题</h3>
      <ul><li><strong>401</strong>：检查 <code>auth.json</code> 里的 API Key 是否复制完整。</li><li><strong>模型不存在</strong>：确认 <code>gpt-5.5</code> 在词元.fast 控制台可用；不可用时换成你实际开通的模型 ID。</li><li><strong>客户端和 CLI 表现不一致</strong>：优先检查它们是否读取同一个用户目录下的 <code>.codex</code>。</li><li><strong>旧教程脚本残留</strong>：不要再使用旧品牌脚本地址和 endpoint；统一用 <code>https://ciyuan.fast/v1</code>。</li></ul>
    `
  },
  {
    id: 'factory-droid-cli', category: 'coding', title: 'Factory Droid CLI', subtitle: 'Factory 终端 AI 编程助手', tags: ["Droid","工程代理","CLI"],
    summary: '完整复刻源站 Droid CLI 教程密度：效果演示、特性、Windows/macOS/Linux 安装配置、启动示例。',
    body: `
      <div class="callout"><strong>项目介绍</strong><p>Droid CLI 是由 Factory AI 开发的命令行工具，旨在作为 AI 软件工程代理运行。它允许用户通过终端与各种大型语言模型交互，构建、调试和重构代码，甚至创建完整的应用程序。</p><ul><li>官方主页：<a href="https://factory.ai/product/cli" target="_blank" rel="noreferrer">https://factory.ai/product/cli</a></li><li>官方文档：<a href="https://docs.factory.ai/cli/getting-started/quickstart" target="_blank" rel="noreferrer">https://docs.factory.ai/cli/getting-started/quickstart</a></li></ul></div>
      <h2>效果演示</h2>
      <figure class="shot doc-shot"><img src="images/factory-droid-cli/droid_example.webp" alt="droid.webp" loading="lazy" data-full="images/factory-droid-cli/droid_example.webp"><figcaption>droid.webp</figcaption></figure>
      <h3>特性</h3>
      <table><tr><th>类别</th><th>特性</th><th>价值/能力</th><th>示例/备注</th></tr><tr><td>快速上手与 CLI</td><td>30 秒安装；在项目目录中启动 droid 交互会话；支持 macOS/Linux 与 Windows</td><td>快速接入当前工程，无需新工具</td><td>Windows 安装：<code>irm https://app.factory.ai/cli/windows | iex</code>；启动：<code>droid</code></td></tr><tr><td>端到端特性开发</td><td>从规划到实现到测试的全流程自动化；透明的评审流程</td><td>提升交付速度，保持人类把控</td><td>原生 diff 查看与批准流程（见"透明与可控"）</td></tr><tr><td>代码库深度理解</td><td>融合组织在代码库、文档、Issue 追踪中的共享知识；上下文感知，效果随时间提升</td><td>更准确的建议与改动</td><td>持续利用跨仓库与文档的知识</td></tr><tr><td>工程系统集成</td><td>原生集成 Jira、Notion、Slack 等工具；开发工作与团队流程保持同步</td><td>减少工具切换与信息孤岛</td><td>"等"表示还有更多集成</td></tr><tr><td>生产级自动化</td><td>工作流可在本地与 CI/CD 复用；企业级安全与合规内建</td><td>一致性与可审计性</td><td>适配流水线与企业环境</td></tr><tr><td>企业级能力</td><td>私有部署选项、SOC-2 合规、空气隔离（air-gapped）环境</td><td>满足安全与合规要求</td><td>以安全与质量优先</td></tr><tr><td>现有工具增强</td><td>在终端、IDE 与既有开发环境中工作；无需切换编辑器或学习新界面</td><td>保持现有工作习惯、低迁移成本</td><td>与熟悉工具深度集成</td></tr><tr><td>透明与可控</td><td>每个决策可见且可审阅；对代码变更保持完全监督；原生 diff 查看与审批工作流</td><td>降低风险、提升可控性</td><td>审核友好、可追踪</td></tr><tr><td>模型灵活性</td><td>不锁定单一 AI 提供商；按任务选择最佳模型；组织级一致行为与记忆</td><td>在性能与成本间做最优选择</td><td>支持多模型路由</td></tr><tr><td>下一步与资源</td><td>Quickstart、Common Use Cases、IDE Integration、Configuration、AGENTS.md</td><td>便于落地与实践</td><td>见页面 "Next steps/Additional resources"</td></tr></table>
      <h2>AI 模型配置方法</h2>
      <h3>Windows 端图文指引</h3>
      <h4>1.打开终端</h4>
      <figure class="shot doc-shot"><img src="images/factory-droid-cli/windows_open_terminal.webp" alt="windows_open_terminal" loading="lazy" data-full="images/factory-droid-cli/windows_open_terminal.webp"><figcaption>windows_open_terminal</figcaption></figure>
      <h4>2.安装 Factory Droid CLI</h4>
      <p>官方一键安装命令：</p>
      <div class="callout"><strong>一键安装命令</strong><pre><code>irm https://app.factory.ai/cli/windows | iex</code></pre></div>
      <figure class="shot doc-shot"><img src="images/factory-droid-cli/windows_install_droid.webp" alt="windows-install" loading="lazy" data-full="images/factory-droid-cli/windows_install_droid.webp"><figcaption>windows-install</figcaption></figure>
      <h4>3.修改配置文件</h4>
      <p>Droid CLI 使用第三方 API 需要修改配置文件。</p>
      <figure class="shot doc-shot"><img src="images/factory-droid-cli/factory_cli_setup_windows.webp" alt="windows-configure.webp" loading="lazy" data-full="images/factory-droid-cli/factory_cli_setup_windows.webp"><figcaption>windows-configure.webp</figcaption></figure>
      <div class="callout"><strong>修改环境变量</strong><pre><code>iex (irm 'https://raw.githubusercontent.com/QuantumNous/new-api-docs/refs/heads/main/helper/factory-cli-setup.ps1')</code></pre></div>
      <div class="callout"><strong>设置API地址和KEY秘钥</strong><p>将base_url设置为：https://ciyuan.fast API KEY秘钥设置成你在词元.fast 控制台创建的令牌</p></div>
      <h4>4.开始使用 Droid CLI</h4>
      <p>现在你可以开始使用 Droid CLI 了！</p>
      <div class="callout"><strong>启动 Droid CLI</strong><p>直接启动 Droid CLI：</p><pre><code>droid</code></pre><p>在特定项目中使用：</p><pre><code># 进入你的项目目录
      cd C:\path\to\your\project
      
      # 启动 Droid CLI
      droid</code></pre><p>按 Enter 启动 Droid CLI。</p></div>
      <p>Droid CLI 要求用户登录官方账号（免费）后才能使用。</p>
      <h4>5.Windows 常见问题解决</h4>
      <div class="callout"><strong>安装时提示 permission denied 错误</strong><p>这通常是权限问题，尝试以下解决方法：</p><ul><li>以管理员身份运行 PowerShell</li><li>或者配置 <code>npm</code> 使用用户目录：<code>npm config set prefix %APPDATA%\npm</code></li></ul></div>
      <div class="callout"><strong>PowerShell 执行策略错误</strong><p>如果遇到执行策略限制，运行：</p><pre><code>Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser</code></pre></div>
      <h3>macOS/Linux 端图文指引</h3>
      <h4>1.安装 Droid CLI</h4>
      <div class="callout"><strong>安装 Droid CLI</strong><p>打开终端，运行以下命令：</p><pre><code>curl -fsSL https://app.factory.ai/cli | sh</code></pre></div>
      <figure class="shot doc-shot"><img src="images/factory-droid-cli/macos_install_droid.webp" alt="macos-open-terminal" loading="lazy" data-full="images/factory-droid-cli/macos_install_droid.webp"><figcaption>macos-open-terminal</figcaption></figure>
      <figure class="shot doc-shot"><img src="images/factory-droid-cli/macos_install_droid_2.webp" alt="macos-img-02.webp" loading="lazy" data-full="images/factory-droid-cli/macos_install_droid_2.webp"><figcaption>macos-img-02.webp</figcaption></figure>
      <p>按照安装提示修改环境变量（直接复制安装提示代码）：</p>
      <p>Linux 视情况选择 <code>~/.bashrc</code> 或 <code>~/.zshrc</code></p>
      <div class="callout"><strong>Droid CLI 环境变量 (仅作示例)</strong><pre><code>echo 'export PATH=/Users/修改此处/.local/bin:$PATH' &gt;&gt; ~/.zshrc
      source ~/.zshrc</code></pre></div>
      <h4>2.修改配置文件</h4>
      <p>Droid CLI 使用第三方 API 需要修改配置文件。</p>
      <div class="callout"><strong>一键修改配置文件</strong><pre><code>curl -fsSL https://raw.githubusercontent.com/QuantumNous/new-api-docs/refs/heads/main/helper/factory-cli-setup.sh | bash</code></pre></div>
      <figure class="shot doc-shot"><img src="images/factory-droid-cli/macos_configure.webp" alt="macos-img-03.webp" loading="lazy" data-full="images/factory-droid-cli/macos_configure.webp"><figcaption>macos-img-03.webp</figcaption></figure>
      <div class="callout"><strong>设置API地址和KEY秘钥</strong><p>将base_url设置为：https://ciyuan.fast API KEY秘钥设置成你在词元.fast 控制台创建的令牌</p></div>
      <h4>3.开始使用 Droid CLI</h4>
      <p>现在你可以开始使用 Droid CLI 了！</p>
      <div class="callout"><strong>启动 Droid CLI</strong><p>直接启动 Droid CLI：</p><pre><code>droid</code></pre><p>在特定项目中使用：</p><pre><code># 进入你的项目目录
      cd /path/to/your/project
      
      # 启动 Droid CLI
      droid</code></pre><p>按 Enter 启动 Droid CLI。</p></div>
      <blockquote>Droid CLI 要求用户登录官方账号（免费）后才能使用。</blockquote>
    `
  },
  {
    id: 'cc-switch', category: 'coding', title: 'CC Switch', subtitle: 'AI CLI 统一管理工具', tags: ["Provider","MCP","Prompts"],
    summary: '完整复刻源站 CC Switch 教程密度：核心特性、Provider/MCP/Prompts 管理、词元.fast 接入和三端安装方式。',
    body: `
      <div class="callout"><strong>项目介绍</strong><p>🔀 CC Switch 是一款开源、跨平台的 AI CLI 统一管理工具，支持 Claude Code、Codex 和 Gemini CLI 的 Provider 配置一键切换、MCP 服务器统一管理、系统提示词（Prompts）管理以及 Skills 扩展管理， 让你在多个 AI 编程助手之间自由切换，无需手动编辑配置文件。</p></div>
      <ul><li>GitHub 仓库：<a href="https://github.com/farion1231/cc-switch" target="_blank" rel="noreferrer">https://github.com/farion1231/cc-switch</a></li></ul>
      <ul><li>下载地址：<a href="https://github.com/farion1231/cc-switch/releases" target="_blank" rel="noreferrer">GitHub Releases</a></li></ul>
      <h2>核心特性</h2>
      <h3>🔌 Provider 管理</h3>
      <ul><li><strong>一键切换</strong> — 在 Claude Code、Codex、Gemini 的 API 配置之间一键切换，无需手动修改环境变量或配置文件</li></ul>
      <ul><li><strong>多端点支持</strong> — 每个 Provider 可配置多个端点，支持 API Key 管理与延迟测速</li></ul>
      <ul><li><strong>4 层模型配置</strong> — 支持 Haiku / Sonnet / Opus / Custom 四级模型粒度配置</li></ul>
      <h3>🛠️ MCP 服务器管理</h3>
      <ul><li><strong>跨应用统一管理</strong> — 单面板管理 Claude / Codex / Gemini 三端的 MCP 服务器</li></ul>
      <ul><li><strong>三种传输类型</strong> — 支持 stdio、HTTP、SSE（Server-Sent Events）</li></ul>
      <ul><li><strong>自动同步</strong> — 统一导入导出 + 双向同步</li></ul>
      <h3>💬 Prompts 管理</h3>
      <ul><li><strong>多预设系统提示词</strong> — 无限预设、快速切换</li></ul>
      <ul><li><strong>跨应用支持</strong> — Claude（<code>CLAUDE.md</code>）、Codex（<code>AGENTS.md</code>）、Gemini（<code>GEMINI.md</code>）</li></ul>
      <ul><li><strong>Markdown 编辑器</strong> — CodeMirror 6 + 实时预览</li></ul>
      <h3>🌐 多平台支持</h3>
      <ul><li><strong>桌面应用</strong> — Windows、macOS、Linux 原生安装包</li></ul>
      <ul><li><strong>Web 版本</strong> — 适用于无头服务器 / SSH 远程环境的浏览器访问方案</li></ul>
      <ul><li><strong>CLI 版本</strong> — 命令行交互模式与命令模式双支持</li></ul>
      <h2>词元.fast API 接入方法</h2>
      <p>CC Switch 支持 <code>ccswitch://</code> Deep Link 协议，可从 词元.fast 令牌管理页一键导入 Provider 配置。</p>
      <h3>配置步骤</h3>
      <p>1. <strong>在 词元.fast API 令牌管理页，点击对应令牌的下拉菜单</strong> 在菜单中选择 <strong>CC Switch</strong> 选项，系统会自动唤起 CC Switch 应用并弹出配置弹窗。</p>
      <p>2. <strong>在弹窗中完成配置</strong></p>
      <figure class="shot doc-shot"><img src="images/cc-switch/fill_dialog.webp" alt="填入 CC Switch 弹窗" loading="lazy" data-full="images/cc-switch/fill_dialog.webp"><figcaption>填入 CC Switch 弹窗</figcaption></figure>
      <p>弹窗各字段说明：</p>
      <ul><li><strong>应用</strong>：顶部切换应用类型 — <strong>Claude</strong> / <strong>Codex</strong> / <strong>Gemini</strong>，根据需要选择目标应用</li></ul>
      <ul><li><strong>名称</strong>：为该配置填写一个名称（例如 <code>My Claude</code>），方便后续在 CC Switch 中识别和切换</li></ul>
      <ul><li><strong>主模型</strong>（必填）— 默认使用的主力模型</li></ul>
      <ul><li><strong>Haiku 模型</strong> — 轻量快速模型</li></ul>
      <ul><li><strong>Sonnet 模型</strong> — 均衡模型</li></ul>
      <ul><li><strong>Opus 模型</strong> — 最强模型</li></ul>
      <p>所有模型均为下拉选择，未选择时显示「请选择模型」。</p>
      <p>3. <strong>完成配置</strong> 点击 <strong>「打开 CC Switch」</strong> 即可将配置导入 CC Switch 并开始使用；点击 <strong>「取消」</strong> 放弃本次操作。</p>
      <h2>安装方式</h2>
      <h3>macOS（推荐 Homebrew）</h3>
      <pre><code>brew tap farion1231/ccswitch
      brew install --cask cc-switch</code></pre>
      <h3>Windows</h3>
      <p>从 <a href="https://github.com/farion1231/cc-switch/releases" target="_blank" rel="noreferrer">Releases</a> 下载 <code>.msi</code> 安装包或便携版 <code>.zip</code>。</p>
      <h3>Linux</h3>
      <p>从 <a href="https://github.com/farion1231/cc-switch/releases" target="_blank" rel="noreferrer">Releases</a> 下载 <code>.deb</code> 包或 <code>.AppImage</code>。</p>
      <p>ArchLinux 用户：</p>
      <pre><code>paru -S cc-switch-bin</code></pre>
      <h3>Web 版本（无头 / SSH 服务器）</h3>
      <pre><code>wget https://github.com/farion1231/cc-switch/releases/latest/download/cc-switch-web-linux-x64.tar.gz
      tar -xzf cc-switch-web-linux-x64.tar.gz
      cd cc-switch-web/
      ./cc-switch-web</code></pre>
      <p>默认端口 <code>17666</code>，通过浏览器访问 <code>http://localhost:17666</code>。</p>
      <h2>相关链接</h2>
      <ul><li><a href="https://github.com/farion1231/cc-switch" target="_blank" rel="noreferrer">GitHub 仓库</a></li></ul>
      <ul><li><a href="https://github.com/farion1231/cc-switch/blob/main/CHANGELOG.md" target="_blank" rel="noreferrer">更新日志</a></li></ul>
      <ul><li><a href="https://github.com/cp-yu/cc-switch-web" target="_blank" rel="noreferrer">Web 版本仓库</a></li></ul>
      <ul><li><a href="https://github.com/thomas-jack/cc-switch-cli" target="_blank" rel="noreferrer">CLI 版本仓库</a></li></ul>
    `
  },
  {
    id: 'cherry-studio', category: 'desktop', title: 'Cherry Studio', subtitle: '桌面 AI 客户端', tags: ["桌面端","多助手","NewAPI"],
    summary: '完整复刻源站 Cherry Studio 教程密度：参数填写、图文指引、聊天模型和绘图模型配置。',
    body: `
      <div class="callout"><strong>项目介绍</strong><p>🍒 Cherry Studio 是一款功能强大的桌面 AI 客户端，专为专业用户设计，集成了 30+ 行业智能助手，能够满足各种工作场景的需求，显著提升工作效率。</p></div>
      <ul><li>官网地址：<a href="https://cherry-ai.com/" target="_blank" rel="noreferrer">https://cherry-ai.com</a></li></ul>
      <ul><li>下载地址：<a href="https://cherry-ai.com/download" target="_blank" rel="noreferrer">https://cherry-ai.com/download</a></li></ul>
      <ul><li>官方文档：<a href="https://docs.cherry-ai.com" target="_blank" rel="noreferrer">https://docs.cherry-ai.com</a></li></ul>
      <h2>词元.fast API 接入方法</h2>
      <h3>参数填写</h3>
      <p>提供商类型：词元.fast API 支持的类型 API 密钥：于 词元.fast API 获取 API 地址：https://ciyuan.fast</p>
      <h3>图文指引</h3>
      <p>1. 在 词元.fast API 中复制 API key</p>
      <figure class="shot doc-shot"><img src="images/cherry-studio/copy_api_key.webp" alt="复制 API 密钥" loading="lazy" data-full="images/cherry-studio/copy_api_key.webp"><figcaption>复制 API 密钥</figcaption></figure>
      <p>2. 添加提供商</p>
      <figure class="shot doc-shot"><img src="images/cherry-studio/add_provider.webp" alt="添加供应商" loading="lazy" data-full="images/cherry-studio/add_provider.webp"><figcaption>添加供应商</figcaption></figure>
      <p>3. 添加模型</p>
      <figure class="shot doc-shot"><img src="images/cherry-studio/add_models.webp" alt="添加模型" loading="lazy" data-full="images/cherry-studio/add_models.webp"><figcaption>添加模型</figcaption></figure>
      <p>4. 返回聊天页面</p>
      <figure class="shot doc-shot"><img src="images/cherry-studio/back_to_chat.webp" alt="切换聊天页面" loading="lazy" data-full="images/cherry-studio/back_to_chat.webp"><figcaption>切换聊天页面</figcaption></figure>
      <p>5. 切换 词元.fast API 模型</p>
      <figure class="shot doc-shot"><img src="images/cherry-studio/switch_model.webp" alt="切换模型" loading="lazy" data-full="images/cherry-studio/switch_model.webp"><figcaption>切换模型</figcaption></figure>
      <h2>在 Cherry Studio 中画图</h2>
      <p>1. 首先添加支持画图的模型</p>
      <figure class="shot doc-shot"><img src="images/cherry-studio/add_paint_models.webp" alt="画图模型" loading="lazy" data-full="images/cherry-studio/add_paint_models.webp"><figcaption>画图模型</figcaption></figure>
      <p>2. 画图</p>
      <figure class="shot doc-shot"><img src="images/cherry-studio/paint.webp" alt="画图" loading="lazy" data-full="images/cherry-studio/paint.webp"><figcaption>画图</figcaption></figure>
    `
  },
  {
    id: 'aionui', category: 'desktop', title: 'AionUi', subtitle: '开源桌面办公 Agent', tags: ["办公 Agent","多代理","桌面"],
    summary: '完整复刻源站 AionUi 教程密度：核心特性、多代理能力和词元.fast NewAPI 接入步骤。',
    body: `
      <div class="callout"><strong>项目介绍</strong><p>🚀 AionUi 是一款免费、本地、开源的Cowork，支持 Gemini CLI、Claude Code、Codex、OpenCode、Qwen Code、Goose CLI、Auggie 等多种 AI 代理。它提供了完整的 GUI 界面和 WebUI 远程访问功能，是 Cowork 的开源替代方案。</p></div>
      <ul><li>官网地址：<a href="https://www.aionui.com" target="_blank" rel="noreferrer">https://www.aionui.com</a></li></ul>
      <ul><li>GitHub 仓库：<a href="https://github.com/iOfficeAI/AionUi" target="_blank" rel="noreferrer">https://github.com/iOfficeAI/AionUi</a></li></ul>
      <ul><li>下载地址：<a href="https://github.com/iOfficeAI/AionUi/releases" target="_blank" rel="noreferrer">https://github.com/iOfficeAI/AionUi/releases</a></li></ul>
      <figure class="shot doc-shot"><img src="images/aionuilogo.webp" alt="AionUi Logo" loading="lazy" data-full="images/aionuilogo.webp"><figcaption>AionUi Logo</figcaption></figure>
      <h2>核心特性</h2>
      <h3>💬 多会话聊天</h3>
      <ul><li><strong>多会话 + 独立上下文</strong> - 可同时打开多个聊天会话，每个会话拥有独立的上下文记忆</li></ul>
      <ul><li><strong>本地存储</strong> - 所有对话数据保存在本地 SQLite 数据库中，不会丢失</li></ul>
      <h3>🤖 多模型支持</h3>
      <ul><li><strong>多平台支持</strong> - 支持 Gemini、OpenAI、Claude、Qwen 等主流模型，灵活切换</li></ul>
      <ul><li><strong>本地模型支持</strong> - 支持 Ollama、LM Studio 等本地模型部署</li></ul>
      <h3>🤝 多代理模式</h3>
      <ul><li><strong>同时运行多个 AI 代理</strong> - 可同时运行多个 AI 代理（如 Gemini CLI、Claude Code、Codex、OpenCode、Qwen Code、Goose CLI、Auggie 等）</li></ul>
      <ul><li><strong>MCP 统一管理</strong> - 通过 Model Context Protocol (MCP) 统一管理和配置所有代理，简化操作流程</li></ul>
      <ul><li><strong>Skills 配置</strong> - 支持为不同代理配置专属的 Skills，扩展代理能力</li></ul>
      <ul><li><strong>助手自定义</strong> - 支持自定义助手配置，打造个性化的 AI 工作流</li></ul>
      <ul><li><strong>独立配置</strong> - 每个代理可独立配置和使用，互不干扰</li></ul>
      <ul><li><strong>灵活切换</strong> - 在不同代理之间灵活切换，满足不同场景需求</li></ul>
      <h3>🗂️ 文件管理</h3>
      <ul><li><strong>文件树浏览 + 拖拽上传</strong> - 像文件夹一样浏览文件，支持拖拽文件或文件夹一键导入</li></ul>
      <ul><li><strong>智能整理</strong> - 可让 AI 帮助整理文件夹，自动分类</li></ul>
      <h3>📄 预览面板</h3>
      <ul><li><strong>9+ 格式预览</strong> - 支持 PDF、Word、Excel、PPT、代码、Markdown、图片等格式</li></ul>
      <ul><li><strong>实时跟踪 + 可编辑</strong> - 自动跟踪文件变化，支持实时编辑和调试 Markdown、代码、HTML</li></ul>
      <h3>🎨 AI 图像生成与编辑</h3>
      <ul><li><strong>智能图像生成</strong> - 支持 Gemini 2.5 Flash Image Preview、Nano、Banana 等多种图像生成模型</li></ul>
      <ul><li><strong>图像识别与编辑</strong> - AI 驱动的图像分析和编辑功能</li></ul>
      <h3>🌐 多渠道访问</h3>
      <ul><li><strong>WebUI 远程访问</strong> - 可通过浏览器从网络上的任何设备访问，支持移动设备</li></ul>
      <ul><li><strong>Telegram 集成</strong> - 支持通过 Telegram 机器人进行交互</li></ul>
      <ul><li><strong>飞书集成</strong> - 支持通过飞书进行访问和交互</li></ul>
      <ul><li><strong>本地数据安全</strong> - 所有数据存储在本地 SQLite 数据库中，适合服务器部署</li></ul>
      <h2>词元.fast API 接入方法</h2>
      <h3>参数填写</h3>
      <p>提供商类型：词元.fast API 支持的类型 API 密钥：于 词元.fast API 获取 API 地址：词元.fast API站点地址（例如：<code>https://ciyuan.fast/v1</code>）</p>
      <h3>配置步骤</h3>
      <p>1. <strong>在 词元.fast API 中复制 API key</strong></p>
      <figure class="shot doc-shot"><img src="images/copy_apikey.webp" alt="复制 API 密钥" loading="lazy" data-full="images/copy_apikey.webp"><figcaption>复制 API 密钥</figcaption></figure>
      <p>2. <strong>打开 AionUi 设置</strong></p>
      <ul><li>在 AionUi 中进入设置页面</li></ul>
      <ul><li>找到 模型配置 Tab</li></ul>
      <ul><li>点击"添加模型"</li></ul>
      <figure class="shot doc-shot"><img src="images/add-model-1.webp" alt="打开设置" loading="lazy" data-full="images/add-model-1.webp"><figcaption>打开设置</figcaption></figure>
      <p>3. <strong>添加新的提供商</strong></p>
      <ul><li>点击"添加模型"</li></ul>
      <ul><li>选择 NewAPI</li></ul>
      <figure class="shot doc-shot"><img src="images/newapi_provider.webp" alt="添加 NewAPI 提供商" loading="lazy" data-full="images/newapi_provider.webp"><figcaption>添加 NewAPI 提供商</figcaption></figure>
      <p>4. <strong>配置 API 信息</strong></p>
      <ul><li>API 地址：填写您的 词元.fast API 站点地址（格式：https://ciyuan.fast/v1\`）</li></ul>
      <ul><li>API 密钥：粘贴从 词元.fast API 控制台复制的 API Key</li></ul>
      <p>5. <strong>添加模型</strong></p>
      <ul><li>下拉选择需要添加的模型</li></ul>
      <ul><li>模型名称应与 词元.fast API 中配置的模型名称一致</li></ul>
      <ul><li>选择合适的请求协议</li></ul>
      <p>6. <strong>开始使用</strong></p>
      <ul><li>返回聊天页面</li></ul>
      <ul><li>选择已配置的 词元.fast API 模型开始对话</li></ul>
      <h2>相关链接</h2>
      <ul><li><a href="https://github.com/iOfficeAI/AionUi" target="_blank" rel="noreferrer">GitHub 仓库</a></li></ul>
      <ul><li><a href="https://github.com/iOfficeAI/AionUi#-detailed-usage-guide" target="_blank" rel="noreferrer">完整使用指南</a></li></ul>
      <ul><li><a href="https://github.com/iOfficeAI/AionUi#-support--help" target="_blank" rel="noreferrer">FAQ 常见问题</a></li></ul>
    `
  },
  {
    id: 'fluent-read', category: 'reading', title: '流畅阅读', subtitle: 'FluentRead 开源翻译插件', tags: ["浏览器插件","双语阅读","翻译"],
    summary: '完整复刻源站 FluentRead 教程密度：核心特性、安装方式、控制台导入和手动配置。',
    body: `
      <div class="callout"><strong>项目介绍</strong><p>🌊 流畅阅读（FluentRead）是一款开源浏览器翻译插件，致力于提供母语般的阅读体验。</p></div>
      <ul><li>项目地址：<a href="https://github.com/Bistutu/FluentRead" target="_blank" rel="noreferrer">https://github.com/Bistutu/FluentRead</a></li></ul>
      <h2>🌟 核心特性</h2>
      <h3>智能翻译引擎</h3>
      <ul><li><strong>多引擎支持</strong>：支持 20+ 种翻译引擎</li></ul>
      <ul><li><strong>传统翻译</strong>：微软翻译、谷歌翻译、DeepL翻译等</li></ul>
      <ul><li><strong>AI 大模型</strong>：OpenAI、DeepSeek、Kimi、Ollama等</li></ul>
      <ul><li><strong>自定义引擎</strong>：支持自定义翻译服务配置</li></ul>
      <h3>沉浸式阅读体验</h3>
      <ul><li><strong>双语对照</strong>：原文与译文并列显示，阅读更轻松</li></ul>
      <ul><li><strong>划词翻译</strong>：选中任意文本，即时获得翻译结果</li></ul>
      <ul><li><strong>一键复制</strong>：快速复制译文，提高阅读效率</li></ul>
      <ul><li><strong>全文翻译</strong>：悬浮球一键翻译整个网页，无需刷新页面</li></ul>
      <h3>隐私与定制</h3>
      <ul><li><strong>隐私保护</strong>：所有数据本地存储，代码开源透明</li></ul>
      <ul><li><strong>高度定制</strong>：丰富的自定义选项，满足不同场景需求</li></ul>
      <ul><li><strong>完全免费</strong>：开源免费，非商业化项目</li></ul>
      <h2>📦 安装方式</h2>
      <table><tr><th>浏览器</th><th>安装方式</th></tr><tr><td><strong>Chrome</strong></td><td><a href="https://chromewebstore.google.com/detail/%E6%B5%81%E7%95%85%E9%98%85%E8%AF%BB/djnlaiohfaaifbibleebjggkghlmcpcj?hl=zh-CN&authuser=0" target="_blank" rel="noreferrer">Chrome 应用商店</a> \</td><td><a href="https://www.crxsoso.com/webstore/detail/djnlaiohfaaifbibleebjggkghlmcpcj" target="_blank" rel="noreferrer">国内镜像</a></td></tr><tr><td><strong>Edge</strong></td><td><a href="https://microsoftedge.microsoft.com/addons/detail/%E6%B5%81%E7%95%85%E9%98%85%E8%AF%BB/kakgmllfpjldjhcnkghpplmlbnmcoflp?hl=zh-CN" target="_blank" rel="noreferrer">Edge 应用商店</a></td></tr><tr><td><strong>Firefox</strong></td><td><a href="https://addons.mozilla.org/zh-CN/firefox/addon/%E6%B5%81%E7%95%85%E9%98%85%E8%AF%BB/" target="_blank" rel="noreferrer">Firefox 附加组件商店</a></td></tr></table>
      <h2>🚀 配置方法</h2>
      <h3>从 词元.fast API 控制台导入配置（推荐）</h3>
      <p>当浏览器安装了流畅阅读插件后，打开 词元.fast API 控制台->令牌管理页面会弹出添加流畅阅读的提示</p>
      <figure class="shot doc-shot"><img src="images/fluent-read/hint.webp" alt="添加提示" loading="lazy" data-full="images/fluent-read/hint.webp"><figcaption>添加提示</figcaption></figure>
      <p>选择模型后点击一键填充到FluentRead，会弹出确认窗口，检查对应的信息是否正确</p>
      <figure class="shot doc-shot"><img src="images/fluent-read/confirm.webp" alt="确认" loading="lazy" data-full="images/fluent-read/confirm.webp"><figcaption>确认</figcaption></figure>
      <p>确认导入后在流畅阅读中的 NewAPI配置便会启用</p>
      <figure class="shot doc-shot"><img src="images/fluent-read/fluentread.webp" alt="配置结果" loading="lazy" data-full="images/fluent-read/fluentread.webp"><figcaption>配置结果</figcaption></figure>
      <h3>在流畅阅读中手动填写配置</h3>
      <figure class="shot doc-shot"><img src="images/fluent-read/configuration.webp" alt="手动配置" loading="lazy" data-full="images/fluent-read/configuration.webp"><figcaption>手动配置</figcaption></figure>
      <table><tr><th>配置项</th><th>内容</th></tr><tr><td>翻译服务</td><td>NewAPI</td></tr><tr><td>访问令牌</td><td>词元.fast的 密钥</td></tr><tr><td>NewAPI接口</td><td>https://ciyuan.fast</td></tr><tr><td>模型</td><td>列表中选择，或者自定义模型</td></tr><tr><td>自定义模型</td><td>模型名称</td></tr></table>
    `
  },
  {
    id: 'async-image-api', category: 'hub', title: '异步生图接口', subtitle: '文生图、图生图与任务轮询', tags: ['API', '生图', '可交给 AI'],
    summary: '词元.fast 异步生图接口文档。可以直接丢给 AI 助手，让它按接口说明帮你写接入代码。',
    body: `
      <h2>异步生图接口使用说明</h2>
      <p class="lead">服务地址：<code>https://img.ciyuan.fast</code>。这份接口说明可以直接丢给 AI 助手，让它根据你的语言和框架生成接入代码。接口是异步流程：先创建任务，拿到 <code>job_id</code>，再轮询任务状态，成功后读取图片 URL。</p>
      <h3>接口概览</h3>
      <table><tr><th>能力</th><th>接口</th><th>用途</th></tr><tr><td>文生图</td><td><code>POST /v1/images/generations</code></td><td>根据提示词创建生图任务</td></tr><tr><td>修改图片 / 图生图</td><td><code>POST /v1/images/edits</code></td><td>上传图片或传图片 URL 进行修改</td></tr><tr><td>查询任务</td><td><code>GET /v1/image-jobs/:jobId</code></td><td>查询 queued、running、succeeded、failed</td></tr></table>
      <h3>鉴权方式</h3>
      <pre><code>Authorization: Bearer &lt;你的API Key&gt;</code></pre><p>创建任务和查询任务必须使用同一个 API Key。</p>
      <h3>文生图最简示例</h3>
      <pre><code>curl -sS https://img.ciyuan.fast/v1/images/generations \
  -H "Authorization: Bearer &lt;你的API Key&gt;" \
  -H "Content-Type: application/json" \
  -d '{"model":"gpt-image-1","prompt":"a clean product photo of a white ceramic mug","size":"1024x1024","n":1}'</code></pre>
      <h3>查询任务</h3>
      <pre><code>curl -sS https://img.ciyuan.fast/v1/image-jobs/imgjob_xxx \
  -H "Authorization: Bearer &lt;同一个API Key&gt;"</code></pre>
      <h3>图生图 / 修改图片</h3>
      <pre><code>curl -sS https://img.ciyuan.fast/v1/images/edits \
  -H "Authorization: Bearer &lt;你的API Key&gt;" \
  -F "model=gpt-image-1" \
  -F "prompt=make the background white" \
  -F "size=1024x1024" \
  -F "image[]=@./input.png"</code></pre>
      <h3>轮询建议</h3>
      <p>建议每 2 到 5 秒查询一次任务状态，不要高频轮询。如果系统需要稳定保存图片，拿到 URL 后建议立即下载并转存。</p>
    `
  },
  {
    id: 'langbot', category: 'bot', title: 'LangBot', subtitle: '即时通信机器人开发平台', tags: ["飞书","钉钉","知识库"],
    summary: '完整复刻源站 LangBot 教程密度：NewAPI 接入、流水线调试、微信适配和知识库嵌入模型。',
    body: `
      <div class="callout"><strong>项目介绍</strong><p class="lead">LangBot 是一个开源的即时通信机器人开发平台，支持多种即时通信平台，如飞书、钉钉、微信、QQ、Telegram、Discord、Slack 等。接入全球主流的 AI 模型，支持知识库、Agent、MCP等多种 AI 应用能力，并完美适配 词元.fast API。</p></div>
      <ul><li>官网地址：<a href="https://langbot.app/" target="_blank" rel="noreferrer">https://langbot.app</a></li></ul>
      <ul><li>下载地址：<a href="https://github.com/langbot-app/LangBot/releases" target="_blank" rel="noreferrer">https://github.com/langbot-app/LangBot/releases</a></li></ul>
      <ul><li>官方文档：<a href="https://docs.langbot.app/" target="_blank" rel="noreferrer">https://docs.langbot.app</a></li></ul>
      <ul><li>开源地址：<a href="https://github.com/langbot-app/LangBot" target="_blank" rel="noreferrer">https://github.com/langbot-app/LangBot</a></li></ul>
      <h2>接入 词元.fast API</h2>
      <p>LangBot 支持接入词元.fast API 服务。</p>
      <h3>使用方式</h3>
      <p>1.  从 词元.fast API 中获取 API key</p>
      <figure class="shot doc-shot"><img src="images/langbot/get_api_key.webp" alt="获取 API key" loading="lazy" data-full="images/langbot/get_api_key.webp"><figcaption>获取 API key</figcaption></figure>
      <p>若使用 词元.fast API 服务，请配置API地址。注意，地址后需要添加<code>/v1</code>，如：https://ciyuan.fast/v1。</p>
      <p>2.  在 LangBot 中添加模型，选择使用 NewAPI 供应商，填写对应的 API key 和 API 地址</p>
      <figure class="shot doc-shot"><img src="images/langbot/add_newapi_model.webp" alt="添加 NewAPI 模型" loading="lazy" data-full="images/langbot/add_newapi_model.webp"><figcaption>添加 NewAPI 模型</figcaption></figure>
      <p>3.  在流水线中选择使用模型</p>
      <figure class="shot doc-shot"><img src="images/langbot/select_model.webp" alt="选择模型" loading="lazy" data-full="images/langbot/select_model.webp"><figcaption>选择模型</figcaption></figure>
      <p>4.  在对话调试中对话或与绑定至流水线的机器人对话即可使用</p>
      <figure class="shot doc-shot"><img src="images/langbot/debug_chat.webp" alt="对话" loading="lazy" data-full="images/langbot/debug_chat.webp"><figcaption>对话</figcaption></figure>
      <figure class="shot doc-shot"><img src="images/langbot/wechat.webp" alt="微信对话" loading="lazy" data-full="images/langbot/wechat.webp"><figcaption>微信对话</figcaption></figure>
      <p>部署配置机器人请参考<a href="https://docs.langbot.app/zh/deploy/platforms/readme.html" target="_blank" rel="noreferrer">部署机器人</a>。</p>
      <h3>使用 LangBot 知识库</h3>
      <p>LangBot 支持使用词元.fast API 的嵌入模型，并将其作为知识库的向量模型。</p>
      <p>1. 在 LangBot 中添加嵌入模型，选择使用 NewAPI 供应商</p>
      <figure class="shot doc-shot"><img src="images/langbot/add_embedding_model.webp" alt="添加嵌入模型" loading="lazy" data-full="images/langbot/add_embedding_model.webp"><figcaption>添加嵌入模型</figcaption></figure>
      <p>2. 在新建知识库时选用嵌入模型</p>
      <figure class="shot doc-shot"><img src="images/langbot/use_embedding_model.webp" alt="使用嵌入模型" loading="lazy" data-full="images/langbot/use_embedding_model.webp"><figcaption>使用嵌入模型</figcaption></figure>
      <p>更多使用方式请查看 LangBot 官方文档：<a href="https://docs.langbot.app/" target="_blank" rel="noreferrer">https://docs.langbot.app</a></p>
    `
  },
  {
    id: 'astrbot', category: 'bot', title: 'AstrBot', subtitle: 'Agent 聊天机器人', tags: ["QQ","企业微信","Agent"],
    summary: '完整复刻源站 AstrBot 教程密度：API Key、OpenAI 服务商、默认聊天模型和后台验证。',
    body: `
      <div class="callout"><strong>项目介绍</strong><p class="lead">AstrBot 是一个开源的一站式 Agent 聊天机器人平台，可将大模型能力无缝接入 QQ、飞书、钉钉、企业微信等主流即时通讯软件，为个人、开发者和团队打造可靠、可扩展的对话式智能基础设施。无论是个人 AI 伙伴、智能客服、自动化助手，还是企业知识库，AstrBot 都能在你的即时通讯软件平台的工作流中快速构建生产可用的 AI 应用。</p></div>
      <ul><li>官方网站：<a href="https://astrbot.app" target="_blank" rel="noreferrer">https://astrbot.app</a></li></ul>
      <ul><li>官方文档：<a href="https://docs.astrbot.app" target="_blank" rel="noreferrer">https://docs.astrbot.app</a></li></ul>
      <ul><li>项目主页：<a href="https://github.com/astrbotdevs/astrbot" target="_blank" rel="noreferrer">https://github.com/astrbotdevs/astrbot</a></li></ul>
      <h2>词元.fast API 接入方法</h2>
      <p>AstrBot 支持接入 词元.fast API 作为模型提供商，用户可以通过 词元.fast API来访问和使用各种 AI 模型服务。</p>
      <h3>配置步骤</h3>
      <h4>获取 词元.fast API API Key 密钥</h4>
      <p>在词元.fast API 注册并登录后，点击上方导航栏的「控制台」，点击「令牌管理」，然后点击「添加令牌」按钮，创建一个新的 API Key 密钥，选择适当的权限，然后点击「创建」。</p>
      <figure class="shot doc-shot"><img src="images/astrbot/image.webp" alt="create-api-key" loading="lazy" data-full="images/astrbot/image.webp"><figcaption>create-api-key</figcaption></figure>
      <p>创建成功后，点击复制密钥按钮，复制生成的 API Key 密钥。</p>
      <figure class="shot doc-shot"><img src="images/astrbot/image-1.webp" alt="copy-api-key" loading="lazy" data-full="images/astrbot/image-1.webp"><figcaption>copy-api-key</figcaption></figure>
      <h4>在 AstrBot 中配置 NewAPI 服务提供商</h4>
      <p>打开 AstrBot 管理面板，进入「模型提供商」页面，然后，点击「新增模型提供商」按钮。</p>
      <p>词元.fast API 完美地支持了 OpenAI Chat Completion 和 Responses 接口，我们点击 「OpenAI」，进入 OpenAI 提供商的配置页面。</p>
      <p>在弹出的对话框中，将 API Base URL 设置为 词元.fast API的接口地址，例如 <code>https://ciyuan.fast/v1</code>。</p>
      <p>然后，将 API Key 填入「API Key」字段中，点击「保存」按钮。</p>
      <figure class="shot doc-shot"><img src="images/astrbot/image-2.webp" alt="astrbot-provider-config" loading="lazy" data-full="images/astrbot/image-2.webp"><figcaption>astrbot-provider-config</figcaption></figure>
      <p>然后点击保存，完成 NewAPI 提供商的配置。</p>
      <h4>应用服务提供商</h4>
      <p>进入「配置文件」页面，找到模型一节，将「默认聊天模型」修改为刚刚创建的 NewAPI 提供商，点击「保存」按钮。</p>
      <figure class="shot doc-shot"><img src="images/astrbot/image-3.webp" alt="apply" loading="lazy" data-full="images/astrbot/image-3.webp"><figcaption>apply</figcaption></figure>
      <p>至此，您已经成功配置了 词元.fast API 作为 AstrBot 的模型提供商。现在，您可以通过 AstrBot 来访问和使用 词元.fast API 提供的各种 AI 模型服务了。</p>
    `
  }

];

let activeCategory = 'all';
let activeProduct = products[0].id;
let searchTerm = '';

const categoryTabs = document.querySelector('#categoryTabs');
const productList = document.querySelector('#productList');
const cards = document.querySelector('#cards');
const searchInput = document.querySelector('#searchInput');
const heroSearchInput = document.querySelector('#heroSearchInput');

function filteredProducts() {
  const byCategory = activeCategory === 'all' ? products : products.filter(product => product.category === activeCategory);
  if (!searchTerm) return byCategory;
  const query = searchTerm.toLowerCase();
  return byCategory.filter(product => [product.title, product.subtitle, product.summary, product.category, ...product.tags]
    .join(' ')
    .toLowerCase()
    .includes(query));
}

function categoryLabel(categoryId) {
  return categories.find(category => category.id === categoryId)?.label || '全部应用';
}

function categoryCount(categoryId) {
  return categoryId === 'all' ? products.length : products.filter(product => product.category === categoryId).length;
}

function renderCategories() {
  categoryTabs.innerHTML = categories.map(category => `
    <button class="category-tab ${category.id === activeCategory ? 'active' : ''}" data-category="${category.id}">
      <span>${category.label}</span><small>${categoryCount(category.id)}</small>
    </button>
  `).join('');
}

function renderProductList() {
  const visible = filteredProducts();
  productList.innerHTML = visible.map(product => `
    <a class="product-tab ${product.id === activeProduct ? 'active' : ''}" href="docs/${product.id}.html" data-product="${product.id}">
      <span><strong>${product.title}</strong><small>${product.subtitle}</small></span><em>→</em>
    </a>
  `).join('') || '<p class="empty-state">没有匹配的应用，换个关键词试试。</p>';
}

function renderCards() {
  const visible = filteredProducts();
  cards.innerHTML = visible.map((product, index) => `
    <a class="product-card" href="docs/${product.id}.html" data-category="${product.category}" data-product="${product.id}" style="--stagger: ${Math.min(index * 42, 260)}ms">
      <h3>${product.title}</h3>
      <p>${product.summary}</p>
      <div class="card-meta"><span>${categoryLabel(product.category)}</span><span>预计 5-15 分钟</span></div>
      <div class="tag-row">${product.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}</div>
    </a>
  `).join('') || '<p class="empty-state">没有找到匹配教程。建议清空搜索，或从左侧分类重新选择。</p>';
}

function renderResources(product) {
  const resources = productResources[product.id] || [];
  if (!resources.length) return '';
  return `
    <div class="resource-grid" aria-label="${product.title} 项目地址">
      ${resources.map(resource => `
        <a class="resource-link" href="${resource.href}" target="_blank" rel="noreferrer">
          <span>${resource.label}</span>
          <strong>${resource.title}</strong>
        </a>
      `).join('')}
    </div>
  `;
}

function renderStepCard(step, index, options = {}) {
  const kicker = options.kicker || `新手步骤 ${index + 1}`;
  const inline = options.inline ? 'true' : 'false';
  const compact = options.compact ? 'true' : 'false';
  return `
    <section class="tutorial-step" data-inline="${inline}" data-compact="${compact}">
      <div class="step-copy">
        <span class="step-kicker">${kicker}</span>
        <h4>${step.title}</h4>
        <p>${step.detail}</p>
      </div>
      <figure class="shot">
        <img src="${step.src}" alt="${step.alt}" loading="lazy" data-full="${step.src}">
        <figcaption>${step.alt}</figcaption>
      </figure>
    </section>
  `;
}

function renderScreenshots(product, usedIndexes = new Set()) {
  const steps = [apiKeyGuide, ...(productScreenshots[product.id] || [])];
  const remaining = steps.filter((_, index) => !usedIndexes.has(index));
  if (!remaining.length) return '';
  return `
    <h3>补充图文步骤</h3>
    <div class="screenshot-grid">
      ${remaining.map((step, index) => renderStepCard(step, index, { kicker: `补充步骤 ${index + 1}` })).join('')}
    </div>
  `;
}

const sectionStepMap = {
  'openclaw': [
    { heading: /安装配置细节/, indexes: [0, 1, 2, 3, 4, 5, 6, 7, 8] },
    { heading: /其他扩展/, indexes: [9, 10, 11, 12, 13, 14, 15] },
    { heading: /部署后的验证|日常命令/, indexes: [16, 17, 18, 19, 20] }
  ],
  'claude-code': [
    { heading: /核心特性/, indexes: [1, 2] },
    { heading: /AI 模型配置方法|macOS/, indexes: [0, 3] }
  ],
  'factory-droid-cli': [
    { heading: /Windows|macOS|Linux|常见问题/, indexes: [0] }
  ],
  'cc-switch': [
    { heading: /词元\.fast 接入方法|Provider|安装方式/, indexes: [0] }
  ],
  'codex-cli': [
    { heading: /VS Code/, indexes: [1] },
    { heading: /\.codex|配置目录/, indexes: [2] },
    { heading: /auth\.json/, indexes: [0, 3] },
    { heading: /config\.toml/, indexes: [4] }
  ],
  'aionui': [
    { heading: /词元\.fast 接入方法|配置步骤/, indexes: [0] }
  ],
  'cherry-studio': [
    { heading: /参数填写|图文指引/, indexes: [0, 1, 2, 3, 4] }
  ],
  'fluent-read': [
    { heading: /控制台导入配置/, indexes: [0, 1, 2, 3] },
    { heading: /手动填写配置/, indexes: [4] }
  ],
  'langbot': [
    { heading: /接入词元\.fast/, indexes: [0, 1, 2, 3, 4] },
    { heading: /知识库/, indexes: [5, 6] }
  ],
  'astrbot': [
    { heading: /获取 API Key/, indexes: [0, 1, 2] },
    { heading: /配置 NewAPI|服务提供商/, indexes: [3] },
    { heading: /应用服务提供商/, indexes: [4] }
  ]
};

function stepMatchScore(step, headingText, sectionText) {
  const source = `${headingText} ${sectionText}`;
  const titleWords = step.title.match(/[A-Za-z0-9.]+|[一-龥]{2,}/g) || [];
  const detailWords = step.detail.match(/[A-Za-z0-9.]+|[一-龥]{2,}/g) || [];
  const words = [...new Set([...titleWords, ...detailWords])].filter(word => word.length >= 2);
  return words.reduce((score, word) => score + (source.includes(word) ? 1 : 0), 0);
}

function insertStepGroup(heading, sectionNodes, matched, usedIndexes) {
  if (!matched.length) return;
  const wrapper = document.createElement('div');
  wrapper.className = 'screenshot-grid inline-screenshot-grid';
  wrapper.innerHTML = matched
    .map((item, localIndex) => {
      usedIndexes.add(item.index);
      return renderStepCard(item.step, item.index, {
        inline: true,
        compact: matched.length > 3,
        kicker: `配套图 ${localIndex + 1}`
      });
    })
    .join('');
  const insertAfter = sectionNodes.find(node => ['P', 'OL', 'UL', 'TABLE', 'PRE'].includes(node.tagName)) || heading;
  insertAfter.insertAdjacentElement('afterend', wrapper);
}

function injectInlineSteps(product) {
  const steps = [apiKeyGuide, ...(productScreenshots[product.id] || [])];
  const usedIndexes = new Set();
  if (!steps.length) return usedIndexes;

  const headings = [...doc.querySelectorAll('h3')];
  const mappedSections = sectionStepMap[product.id] || [];
  headings.forEach(heading => {
    const sectionNodes = [];
    let cursor = heading.nextElementSibling;
    while (cursor && cursor.tagName !== 'H3') {
      sectionNodes.push(cursor);
      cursor = cursor.nextElementSibling;
    }
    const headingText = heading.textContent || '';
    const mapped = mappedSections.find(section => section.heading.test(headingText));
    if (mapped) {
      const matched = mapped.indexes
        .filter(index => steps[index] && !usedIndexes.has(index))
        .map(index => ({ step: steps[index], index }));
      insertStepGroup(heading, sectionNodes, matched, usedIndexes);
      return;
    }

    if (mappedSections.length) return;
    const sectionText = sectionNodes.map(node => node.textContent || '').join(' ');
    const matched = steps
      .map((step, index) => ({ step, index, score: usedIndexes.has(index) ? -1 : stepMatchScore(step, headingText, sectionText) }))
      .filter(item => item.score >= 2)
      .sort((a, b) => b.score - a.score)
      .slice(0, 2);
    insertStepGroup(heading, sectionNodes, matched, usedIndexes);
  });
  return usedIndexes;
}

function setCategory(categoryId) {
  activeCategory = categoryId;
  const visible = filteredProducts();
  if (visible.length && !visible.some(product => product.id === activeProduct)) activeProduct = visible[0].id;
  renderAll();
}

function setSearchTerm(value) {
  searchTerm = value.trim();
  searchInput.value = searchTerm;
  heroSearchInput.value = searchTerm;
  renderProductList();
  renderCards();
}

function renderAll() {
  renderCategories();
  renderProductList();
  renderCards();
}

let currentLandingPage = 'intro';
let landingSwitchLocked = false;
const landingWheelThreshold = 360;
let wheelProgress = 0;
let wheelDirection = 0;
let wheelResetTimer;

function updateTopbarOffset() {
  const topbar = document.querySelector('.topbar');
  const topbarHeight = topbar ? topbar.getBoundingClientRect().height : 0;
  const stickyTop = topbar ? parseFloat(window.getComputedStyle(topbar).top) || 0 : 0;
  const topbarOffset = topbarHeight + stickyTop + 34;
  document.documentElement.style.setProperty('--topbar-offset', `${topbarOffset}px`);
  return topbarOffset;
}

function scrollToLandingPage(page, behavior = 'smooth') {
  const target = document.querySelector(page === 'map' ? '#docs' : '#top');
  if (!target) return;
  const topbarOffset = page === 'map' ? updateTopbarOffset() : 0;
  const targetTop = target.offsetTop - topbarOffset;
  window.scrollTo({ top: Math.max(0, targetTop), behavior });
}

function resetWheelProgress() {
  wheelProgress = 0;
  wheelDirection = 0;
  window.clearTimeout(wheelResetTimer);
}

function canScrollWithin(element, direction) {
  let node = element instanceof Element ? element : element?.parentElement;
  while (node && node !== document.body) {
    const style = window.getComputedStyle(node);
    const scrollable = /(auto|scroll)/.test(style.overflowY) && node.scrollHeight > node.clientHeight;
    if (scrollable) {
      const canScrollDown = direction > 0 && node.scrollTop + node.clientHeight < node.scrollHeight - 2;
      const canScrollUp = direction < 0 && node.scrollTop > 2;
      if (canScrollDown || canScrollUp) return true;
    }
    node = node.parentElement;
  }
  return false;
}

function landingPageBoundary(direction) {
  if (direction < 0 && currentLandingPage === 'map') {
    const mapTop = document.querySelector('#docs').offsetTop - updateTopbarOffset();
    return window.scrollY <= mapTop + 2;
  }
  if (direction < 0) return window.scrollY <= 2;
  return window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
}

function syncLandingPage(page) {
  currentLandingPage = page;
  document.body.classList.toggle('landing-intro', page === 'intro');
  document.body.classList.toggle('landing-map', page === 'map');
  document.body.classList.toggle('map-visible', page === 'map');
}

function switchLandingPage(page, options = {}) {
  if (landingSwitchLocked || page === currentLandingPage) return;
  if (options.category) setCategory(options.category);
  if (typeof options.search === 'string') setSearchTerm(options.search);

  landingSwitchLocked = true;
  document.body.classList.add('map-entering');
  syncLandingPage(page);
  scrollToLandingPage(page, options.instant ? 'auto' : 'smooth');
  resetWheelProgress();

  setTimeout(() => {
    document.body.classList.remove('map-entering');
    landingSwitchLocked = false;
  }, 720);
}

function handleLandingWheel(event) {
  if (Math.abs(event.deltaY) < 16 || event.ctrlKey) return;
  const direction = event.deltaY > 0 ? 1 : -1;
  if (currentLandingPage === 'map' && canScrollWithin(event.target, direction)) return;
  if (!landingPageBoundary(direction)) {
    resetWheelProgress();
    return;
  }
  const nextPage = direction > 0 ? 'map' : 'intro';
  if (nextPage === currentLandingPage) return;
  event.preventDefault();
  if (wheelDirection !== direction) {
    wheelProgress = 0;
    wheelDirection = direction;
  }
  wheelProgress += Math.abs(event.deltaY);
  window.clearTimeout(wheelResetTimer);
  wheelResetTimer = window.setTimeout(resetWheelProgress, 520);
  if (wheelProgress < landingWheelThreshold) return;
  switchLandingPage(nextPage);
}

document.addEventListener('click', event => {
  const categoryButton = event.target.closest('[data-category].category-tab');
  if (categoryButton) setCategory(categoryButton.dataset.category);
});

searchInput.addEventListener('input', event => {
  setSearchTerm(event.target.value);
});

function showMapTransition(options = {}) {
  switchLandingPage('map', options);
}

document.querySelectorAll('.page-jump[href="#docs"]').forEach(link => {
  link.addEventListener('click', event => {
    event.preventDefault();
    showMapTransition({
      category: link.dataset.heroCategory,
      search: link.closest('.hero-finder') ? heroSearchInput.value : undefined
    });
  });
});

heroSearchInput.addEventListener('keydown', event => {
  if (event.key !== 'Enter') return;
  showMapTransition({ search: heroSearchInput.value });
});

window.addEventListener('wheel', handleLandingWheel, { passive: false });
window.addEventListener('resize', updateTopbarOffset);

if ('IntersectionObserver' in window) {
  const mapObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) syncLandingPage('map');
    });
  }, { threshold: 0.22 });
  mapObserver.observe(document.querySelector('#docs'));
} else {
  syncLandingPage('intro');
}

document.addEventListener('keydown', event => {
  if (event.key !== 'Enter') return;
  const card = event.target.closest('.product-card');
  if (card) window.location.href = card.href;
});

renderAll();
updateTopbarOffset();
if (window.location.hash === '#docs') {
  syncLandingPage('map');
  scrollToLandingPage('map', 'auto');
} else {
  syncLandingPage('intro');
}
