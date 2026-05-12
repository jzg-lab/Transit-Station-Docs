const assert = require('node:assert/strict');
const { existsSync, readFileSync } = require('node:fs');
const test = require('node:test');

const expectedProducts = [
  'OpenClaw',
  'Claude Code',
  'OpenAI Codex CLI',
  'Factory Droid CLI',
  'CC Switch',
  'Cherry Studio',
  'AionUi',
  '流畅阅读',
  'LangBot',
  'AstrBot'
];

test('landing page carries the ciyuan.fast documentation hub content', () => {
  const html = readFileSync('index.html', 'utf8');
  assert.match(html, /词元\.fast/);
  assert.match(html, /https:\/\/ciyuan\.fast/);
  for (const product of expectedProducts) {
    assert.match(html, new RegExp(product.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
  }
});

test('old provider branding and endpoints are not shipped', () => {
  const files = ['index.html', ...[
    'docs/openclaw.html',
    'docs/claude-code.html',
    'docs/codex-cli.html',
    'docs/factory-droid-cli.html',
    'docs/cc-switch.html',
    'docs/cherry-studio.html',
    'docs/aionui.html',
    'docs/fluent-read.html',
    'docs/langbot.html',
    'docs/astrbot.html'
  ].filter(existsSync)];
  for (const file of files) {
    assert.doesNotMatch(readFileSync(file, 'utf8'), /木瓜AI|mooko\.ai|api\.mooko\.ai/i, `${file} should not ship old provider branding`);
  }
});

test('page exposes category navigation and grouped cards', () => {
  const html = readFileSync('index.html', 'utf8');
  for (const category of ['编程助手', '桌面客户端', '机器人平台', '阅读翻译', '部署中枢']) {
    assert.match(html, new RegExp(category));
  }
  assert.match(html, /class="product-card"/);
  assert.match(html, /category: 'coding'/);
});

test('layout separates entry discovery from focused reading', () => {
  const html = readFileSync('index.html', 'utf8');
  assert.match(html, /class="guide-layout"/);
  assert.match(html, /id="searchInput"/);
  assert.doesNotMatch(html, /id="readerPanel"/);
  assert.doesNotMatch(html, /id="doc"/);
});

test('product tutorials are published as independent pages', () => {
  const html = readFileSync('index.html', 'utf8');
  assert.match(html, /<a class="product-card" href="docs\/\$\{product\.id\}\.html"/);
  assert.match(html, /<a class="product-tab [\s\S]*?href="docs\/\$\{product\.id\}\.html"/);
  for (const page of [
    'docs/openclaw.html',
    'docs/claude-code.html',
    'docs/codex-cli.html',
    'docs/cherry-studio.html',
    'docs/astrbot.html'
  ]) {
    assert.ok(existsSync(page), `${page} should exist`);
    const pageHtml = readFileSync(page, 'utf8');
    assert.match(pageHtml, /返回应用地图/);
    assert.match(pageHtml, /class="doc-page"/);
    assert.match(pageHtml, /class="toc-list"/);
    assert.match(pageHtml, /词元\.fast/);
  }
});

test('tutorials include local screenshots and project resource links', () => {
  const html = readFileSync('scripts/build-doc-pages.js', 'utf8') + readFileSync('docs/codex-cli.html', 'utf8') + readFileSync('docs/cherry-studio.html', 'utf8') + readFileSync('docs/langbot.html', 'utf8') + readFileSync('docs/astrbot.html', 'utf8');
  assert.match(html, /class="resource-grid"/);
  assert.match(html, /官网/);
  assert.match(html, /GitHub/);
  assert.match(html, /下载/);
  assert.match(html, /renderScreenshots/);
  assert.match(html, /<img src="\.\.\/images\/codex-zh\/codex-client\.png"/);
  for (const image of [
    '../images/codex-zh/codex-client.png',
    '../images/codex-zh/codex-dir.png',
    '../images/cherry-studio/add_provider.webp',
    '../images/langbot/add_newapi_model.webp',
    '../images/astrbot/image-2.webp'
  ]) {
    assert.match(html, new RegExp(image.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
  }
});

test('tutorials are beginner friendly and support image zoom', () => {
  const html = readFileSync('scripts/build-doc-pages.js', 'utf8') + readFileSync('docs.js', 'utf8') + readFileSync('docs/claude-code.html', 'utf8') + readFileSync('docs/codex-cli.html', 'utf8');
  assert.match(html, /images\/ciyuan-api-key\.png/);
  assert.match(html, /密钥创建通用步骤/);
  assert.match(html, /补充步骤/);
  assert.match(html, /class="image-lightbox"/);
  assert.match(html, /function openLightbox/);
  assert.match(html, /data-full="\.\.\/images\/ciyuan-api-key\.png"/);
  assert.match(html, /class="tutorial-step"/);
  assert.match(html, /先打开词元\.fast 并登录/);
  assert.doesNotMatch(html, /看不清时点击图片放大查看/);
});

test('codex openclaw and async image docs follow the latest source material', () => {
  const html = readFileSync('docs/codex-cli.html', 'utf8') + readFileSync('docs/openclaw.html', 'utf8') + readFileSync('docs/async-image-api.html', 'utf8');
  assert.match(html, /gpt-5\.5/);
  assert.match(html, /auth\.json/);
  assert.match(html, /config\.toml/);
  assert.match(html, /CLI 和客户端都是这个流程/);
  assert.match(html, /\.\.\/images\/codex-zh\/codex-client\.png/);
  assert.match(html, /\.\.\/images\/codex-zh\/codex-dir\.png/);
  assert.match(html, /安装依赖/);
  assert.match(html, /OpenClaw 安装向导里填写 URL 时不要加 \/v1/);
  assert.match(html, /https:\/\/ciyuan\.fast，不是 https:\/\/ciyuan\.fast\/v1/);
  assert.match(html, /\.\.\/images\/openclaw-guide\/image/);
  assert.match(html, /异步生图接口/);
  assert.match(html, /https:\/\/img\.ciyuan\.fast/);
  assert.match(html, /可以直接丢给 AI 助手/);
});
