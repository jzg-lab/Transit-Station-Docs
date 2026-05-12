const { mkdirSync, readFileSync, writeFileSync } = require('node:fs');
const vm = require('node:vm');

const source = readFileSync('app.js', 'utf8');
const script = source.slice(0, source.lastIndexOf('renderAll();'))
  + 'globalThis.__EXPORT__ = { categories, products, productResources, productScreenshots, renderResources, renderScreenshots };';

const noopElement = () => ({
      innerHTML: '',
      hidden: false,
      dataset: {},
      style: {},
      classList: { add() {}, remove() {}, toggle() {} },
  querySelector: () => noopElement(),
  querySelectorAll: () => [],
  addEventListener() {},
  appendChild() {},
  insertAdjacentHTML() {},
  scrollIntoView() {},
  setAttribute() {},
  removeAttribute() {}
});

const sandbox = {
  console,
  document: {
    documentElement: noopElement(),
    body: noopElement(),
    querySelector: () => noopElement(),
    querySelectorAll: () => [],
    addEventListener() {}
  },
  localStorage: { getItem: () => null, setItem() {} },
  navigator: { clipboard: { writeText: async () => {} } },
  window: {
    location: { search: '' },
    URLSearchParams,
    matchMedia: () => ({ matches: false, addEventListener() {} }),
    addEventListener() {},
    clearTimeout() {}
  },
  URLSearchParams,
  Element: function Element() {},
  setTimeout
};
vm.createContext(sandbox);
vm.runInContext(script, sandbox);

const { categories, products, renderResources, renderScreenshots } = sandbox.__EXPORT__;
const categoryLabel = id => categories.find(category => category.id === id)?.label || '全部应用';
const prefixAssets = html => html
  .replaceAll('src="images/', 'src="../images/')
  .replaceAll('data-full="images/', 'data-full="../images/');
const escapeHtml = value => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;');

function pageFor(product) {
  const bodyWithResources = product.body.replace('</p>', `</p>${renderResources(product)}`);
  const extraSteps = product.body.includes('doc-shot') ? '' : renderScreenshots(product);
  const docHtml = prefixAssets(`${bodyWithResources}${extraSteps}`);
  return `<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(product.title)} 接入教程｜词元.fast</title>
  <meta name="description" content="${escapeHtml(product.title)} 词元.fast 接入教程，包含 API Key、Base URL、模型配置和图文步骤。">
  <link rel="stylesheet" href="../styles.css?v=20260512-theme">
</head>
<body class="doc-page">
  <div class="shell">
    <header class="topbar">
      <a class="brand" href="../index.html#docs" aria-label="返回词元.fast 文档首页"><span class="brand-mark">词</span><span>词元.fast文档</span></a>
      <nav class="top-links" aria-label="教程导航">
        <button class="pill theme-toggle" type="button" data-theme-toggle aria-label="切换深浅色主题">夜间模式</button>
        <a class="pill" href="../index.html#docs">返回应用地图</a>
        <a class="pill primary" href="https://ciyuan.fast/keys" target="_blank" rel="noreferrer">获取 API Key</a>
      </nav>
    </header>
    <main class="doc-layout">
      <article class="doc" id="doc">
        <p class="eyebrow">${escapeHtml(categoryLabel(product.category))}</p>
        <h1>${escapeHtml(product.title)} 接入教程</h1>
        <p class="lead">${escapeHtml(product.summary)}</p>
        <div class="tag-row">${product.tags.map(tag => `<span class="tag">${escapeHtml(tag)}</span>`).join('')}</div>
        ${docHtml}
      </article>
      <aside class="toc-panel">
        <p class="panel-title">当前目录</p>
        <nav class="toc-list" id="toc" aria-label="当前文档目录"></nav>
      </aside>
    </main>
    <p class="footer-note"><a href="../index.html#docs">返回应用地图</a> · 实际模型名称、额度和权限请以词元.fast 控制台为准。</p>
  </div>
  <div class="image-lightbox" id="imageLightbox" aria-hidden="true" role="dialog" aria-label="查看大图">
    <button class="lightbox-close" type="button" aria-label="关闭大图">×</button>
    <img alt="">
    <div class="lightbox-caption"></div>
  </div>
  <script src="../theme.js?v=20260512-theme"></script>
  <script src="../docs.js?v=20260512-theme"></script>
</body>
</html>
`;
}

mkdirSync('docs', { recursive: true });
for (const product of products) {
  writeFileSync(`docs/${product.id}.html`, pageFor(product));
}
