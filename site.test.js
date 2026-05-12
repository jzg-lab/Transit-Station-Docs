const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
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
  const html = readFileSync('index.html', 'utf8');
  assert.doesNotMatch(html, /木瓜AI|mooko\.ai|api\.mooko\.ai/i);
});

test('page exposes category navigation and grouped cards', () => {
  const html = readFileSync('index.html', 'utf8');
  for (const category of ['编程助手', '桌面客户端', '机器人平台', '阅读翻译', '部署中枢']) {
    assert.match(html, new RegExp(category));
  }
  assert.match(html, /class="product-card"/);
  assert.match(html, /category: 'coding'/);
});

test('tutorials include local screenshots and project resource links', () => {
  const html = readFileSync('index.html', 'utf8');
  assert.match(html, /class="resource-grid"/);
  assert.match(html, /官网/);
  assert.match(html, /GitHub/);
  assert.match(html, /下载/);
  assert.match(html, /function renderScreenshots/);
  assert.match(html, /<img src="\$\{shot\.src\}"/);
  for (const image of [
    'images/claude-code/introduce-01.webp',
    'images/codex-cli/introduce-01.webp',
    'images/cherry-studio/add_provider.webp',
    'images/langbot/add_newapi_model.webp',
    'images/astrbot/image-2.webp'
  ]) {
    assert.match(html, new RegExp(image.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
  }
});

test('tutorials are beginner friendly and support image zoom', () => {
  const html = readFileSync('index.html', 'utf8');
  assert.match(html, /images\/ciyuan-api-key\.png/);
  assert.match(html, /密钥创建通用步骤/);
  assert.match(html, /新手步骤/);
  assert.match(html, /class="image-lightbox"/);
  assert.match(html, /function openLightbox/);
  assert.match(html, /data-full="\$\{shot\.src\}"/);
});
