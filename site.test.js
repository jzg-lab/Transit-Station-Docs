const assert = require('node:assert/strict');
const { existsSync, readFileSync } = require('node:fs');
const test = require('node:test');
const vm = require('node:vm');

const expectedProducts = [
  'OpenClaw',
  'Claude Code',
  'OpenAI Codex',
  'Cursor',
  'Factory Droid CLI',
  'CC Switch',
  'Cherry Studio',
  'AionUi',
  '流畅阅读',
  '异步生图接口',
  'LangBot',
  'AstrBot'
];

test('landing page carries the ciyuan.fast documentation hub content', () => {
  const html = readFileSync('index.html', 'utf8');
  const app = readFileSync('app.js', 'utf8');
  assert.match(html, /<title>词元\.fast文档<\/title>/);
  assert.match(html, />词元\.fast文档<\/span>/);
  assert.match(html, /AI 工具接入，一页找到答案。/);
  assert.match(html, /选择应用，复制配置，快速接入词元\.fast。/);
  assert.match(html, /class="hero-finder"/);
  assert.match(html, /id="heroSearchInput"/);
  assert.match(html, /class="pill theme-toggle"/);
  assert.match(html, /data-theme-toggle/);
  assert.match(html, /你要接入哪个工具？/);
  assert.match(html, /应用接入地图/);
  assert.match(html, /按场景筛选，打开对应教程页。/);
  assert.match(html, /<div class="metric"><strong>12<\/strong><span>常用 AI 应用接入教程<\/span><\/div>/);
  assert.match(html, /<div class="metric"><strong>6<\/strong><span>按使用场景快速筛选<\/span><\/div>/);
  assert.doesNotMatch(html, /把好用的 AI 工具，接到同一个词元\.fast 中转站。/);
  assert.doesNotMatch(html, /你要把哪个工具接入词元\.fast？/);
  assert.match(html, /词元\.fast/);
  assert.match(html, /https:\/\/ciyuan\.fast/);
  assert.match(html, /<link rel="stylesheet" href="styles\.css\?v=20260526-codex-clean">/);
  assert.match(html, /<script src="theme\.js\?v=20260526-codex-clean"><\/script>/);
  assert.match(html, /<script src="app\.js\?v=20260526-codex-clean"><\/script>/);
  for (const product of expectedProducts) {
    assert.match(html + app, new RegExp(product.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
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
    assert.doesNotMatch(readFileSync(file, 'utf8'), /词元\.fast AI 应用部署中转站/, `${file} should not ship stale docs branding`);
  }
});

test('api key entry points go directly to the keys page', () => {
  const files = ['index.html', 'scripts/build-doc-pages.js', ...[
    'docs/openclaw.html',
    'docs/claude-code.html',
    'docs/codex-cli.html',
    'docs/factory-droid-cli.html',
    'docs/cc-switch.html',
    'docs/cherry-studio.html',
    'docs/aionui.html',
    'docs/fluent-read.html',
    'docs/langbot.html',
    'docs/astrbot.html',
    'docs/async-image-api.html'
  ].filter(existsSync)];
  for (const file of files) {
    const html = readFileSync(file, 'utf8');
    assert.match(html, /href="https:\/\/ciyuan\.fast\/keys"[^>]*>获取 API Key<\/a>/, `${file} should link API key CTA to /keys`);
    assert.doesNotMatch(html, /href="https:\/\/ciyuan\.fast"[^>]*>获取 API Key<\/a>/, `${file} should not send API key CTA to the site root`);
  }
});

test('page exposes category navigation and grouped cards', () => {
  const html = readFileSync('index.html', 'utf8') + readFileSync('app.js', 'utf8');
  for (const category of ['编程', '桌面', '机器人', '阅读', '接口']) {
    assert.match(html, new RegExp(category));
  }
  assert.match(html, /product-card/);
  assert.match(html, /category: 'coding'/);
  assert.match(html, /id: 'openclaw', category: 'bot'/);
  assert.match(html, /id: 'async-image-api', category: 'hub'/);
});

test('layout separates entry discovery from focused reading', () => {
  const html = readFileSync('index.html', 'utf8');
  assert.match(html, /class="guide-layout"/);
  assert.match(html, /class="route-steps hero-route"/);
  assert.match(html, /class="selector-head"/);
  assert.match(html, /class="search-box nav-search"/);
  assert.match(html, /id="searchInput"/);
  assert.doesNotMatch(html, /id="readerPanel"/);
  assert.doesNotMatch(html, /id="doc"/);
});

test('left selector uses compact categories with counts', () => {
  const html = readFileSync('index.html', 'utf8') + readFileSync('app.js', 'utf8');
  const css = readFileSync('styles.css', 'utf8');
  assert.match(html, /function categoryCount/);
  assert.match(html, /<span>\$\{category\.label\}<\/span><small>\$\{categoryCount\(category\.id\)\}<\/small>/);
  assert.match(html, /<span><strong>\$\{product\.title\}<\/strong><small>\$\{product\.subtitle\}<\/small><\/span><em>→<\/em>/);
  assert.match(css, /\.category-tabs[\s\S]*grid-template-columns: repeat\(3, minmax\(0, 1fr\)\)/);
  assert.match(css, /\.product-list[\s\S]*max-height: 500px/);
  assert.match(css, /\.product-tab em/);
});

test('landing page includes gentle interaction polish', () => {
  const html = readFileSync('index.html', 'utf8') + readFileSync('app.js', 'utf8');
  const css = readFileSync('styles.css', 'utf8');
  assert.doesNotMatch(css, /@keyframes riseIn/);
  assert.doesNotMatch(html, /--stagger/);
  assert.match(css, /prefers-reduced-motion/);
  assert.match(css, /\.route-step/);
  assert.match(css, /\.product-card::after/);
  assert.match(css, /\.content-panel::before/);
  assert.match(css, /body\.map-entering:not\(\.landing-intro\) \.hero/);
  assert.doesNotMatch(css, /body\.landing-switching \.product-card/);
  assert.match(css, /body\.intro-entering \.workspace/);
  assert.match(css, /body\.js-landing-ready\.map-visible \.workspace/);
  assert.doesNotMatch(css, /body\.landing-intro \.workspace\s*\{[\s\S]*?opacity: 0/);
  assert.match(css, /\.hero-finder/);
  assert.match(css, /\.hero-chip/);
  assert.match(html, /function showMapTransition/);
  assert.match(html, /heroSearchInput\.addEventListener/);
  assert.match(html, /function handleLandingScroll/);
});

test('site supports dark theme and embedded theme control', () => {
  const html = readFileSync('index.html', 'utf8') + readFileSync('scripts/build-doc-pages.js', 'utf8');
  const theme = readFileSync('theme.js', 'utf8');
  const css = readFileSync('styles.css', 'utf8');
  assert.match(html, /data-theme-toggle/);
  assert.match(theme, /function themeQueryValue/);
  assert.match(theme, /window\.URLSearchParams/);
  assert.match(theme, /window\.matchMedia \? window\.matchMedia\('\(prefers-color-scheme: dark\)'\)/);
  assert.match(theme, /function getStoredTheme/);
  assert.match(theme, /localStorage\.getItem\(themeStorageKey\)/);
  assert.match(theme, /function setStoredTheme/);
  assert.match(theme, /document\.documentElement\.dataset\.theme = theme/);
  assert.match(theme, /document\.body\.classList\.add\(`theme-\$\{theme\}`\)/);
  assert.match(theme, /function closestThemeToggle/);
  assert.match(theme, /let themeInitialized = false/);
  assert.match(theme, /if \(themeInitialized\) return/);
  assert.match(theme, /if \(themeMedia\.addEventListener\)/);
  assert.match(theme, /themeMedia\.addListener/);
  assert.match(css, /:root\[data-theme="dark"\]/);
  assert.match(css, /body\.theme-dark/);
  assert.match(html, /styles\.css\?v=20260526-codex-clean/);
  assert.match(css, /color-scheme: dark/);
  assert.match(css, /\.theme-toggle/);
});

test('theme toggle runs in legacy embedded browsers', () => {
  const themeScript = readFileSync('theme.js', 'utf8');
  const classes = new Set();
  let clickHandler;
  const button = {
    textContent: '夜间模式',
    parentElement: null,
    attributes: {},
    matches(selector) { return selector === '[data-theme-toggle]'; },
    setAttribute(name, value) { this.attributes[name] = value; }
  };
  const child = {
    parentElement: button,
    matches() { return false; }
  };
  const sandbox = {
    document: {
      documentElement: { dataset: {} },
      body: {
        classList: {
          add(name) { classes.add(name); },
          remove(...names) { names.forEach(name => classes.delete(name)); }
        }
      },
      querySelectorAll(selector) { return selector === '[data-theme-toggle]' ? [button] : []; },
      addEventListener(type, handler) { if (type === 'click') clickHandler = handler; }
    },
    window: {
      location: { search: '?theme=dark' },
      URLSearchParams: undefined,
      matchMedia: undefined
    },
    localStorage: {
      value: null,
      getItem() { return this.value; },
      setItem(name, value) { this.value = value; }
    }
  };
  vm.createContext(sandbox);
  vm.runInContext(themeScript, sandbox);
  assert.equal(sandbox.document.documentElement.dataset.theme, 'dark');
  assert.equal(classes.has('theme-dark'), true);
  assert.equal(button.textContent, '浅色模式');
  assert.equal(button.attributes['aria-pressed'], 'true');
  clickHandler({ target: child });
  assert.equal(sandbox.document.documentElement.dataset.theme, 'light');
  assert.equal(classes.has('theme-light'), true);
  assert.equal(classes.has('theme-dark'), false);
  assert.equal(button.textContent, '夜间模式');
  assert.equal(button.attributes['aria-pressed'], 'false');
});

test('theme init is idempotent and avoids duplicate click listeners', () => {
  const themeScript = readFileSync('theme.js', 'utf8');
  const clickHandlers = [];
  const sandbox = {
    document: {
      documentElement: { dataset: {} },
      body: {
        classList: {
          add() {},
          remove() {}
        }
      },
      querySelectorAll() { return []; },
      addEventListener(type, handler) {
        if (type === 'click') clickHandlers.push(handler);
      }
    },
    window: {
      location: { search: '' },
      URLSearchParams,
      matchMedia: () => ({ matches: false, addEventListener() {} })
    },
    localStorage: {
      getItem() { return null; },
      setItem() {}
    }
  };
  vm.createContext(sandbox);
  vm.runInContext(themeScript, sandbox);
  sandbox.initTheme();
  assert.equal(clickHandlers.length, 1);
});

test('product resources do not keep overwritten duplicate keys', () => {
  const app = readFileSync('app.js', 'utf8');
  const productResourcesBlock = app.match(/const productResources = \{[\s\S]*?\n\};/);
  assert.ok(productResourcesBlock, 'productResources block should exist');
  const block = productResourcesBlock[0];
  for (const key of ['factory-droid-cli', 'cc-switch', 'aionui']) {
    const matches = block.match(new RegExp(`'${key}':`, 'g')) || [];
    assert.equal(matches.length, 1, `${key} should appear only once in productResources`);
  }
});

test('landing page supports wheel-driven full-page switching', () => {
  const html = readFileSync('index.html', 'utf8') + readFileSync('app.js', 'utf8');
  const css = readFileSync('styles.css', 'utf8');
  assert.match(html, /data-page="intro"/);
  assert.match(html, /data-page="map"/);
  assert.match(html, /let currentLandingPage = 'intro'/);
  assert.match(html, /const landingWheelThreshold = 220/);
  assert.match(html, /const landingWheelMaxStep = 90/);
  assert.match(html, /function normalizedWheelStep/);
  assert.match(html, /function landingPageBoundary/);
  assert.match(html, /window\.scrollY <= 2/);
  assert.match(html, /const landingBoundaryTolerance = 12/);
  assert.match(html, /return window\.scrollY <= mapTop \+ landingBoundaryTolerance/);
  assert.match(html, /if \(currentLandingPage === 'intro'\) return window\.scrollY \+ window\.innerHeight >= document\.querySelector\('#docs'\)\.offsetTop - landingBoundaryTolerance/);
  assert.match(html, /window\.innerHeight \+ window\.scrollY >= document\.documentElement\.scrollHeight - landingBoundaryTolerance/);
  assert.match(html, /if \(!landingPageBoundary\(direction\)\) \{[\s\S]*?resetWheelProgress\(\);[\s\S]*?return;[\s\S]*?\}/);
  assert.match(html, /const wheelStep = normalizedWheelStep\(event\)/);
  assert.match(html, /wheelProgress \+= wheelStep/);
  assert.match(html, /if \(wheelProgress < landingWheelThreshold\) return/);
  assert.match(html, /function scrollToLandingPage/);
  assert.match(html, /function mapLandingTop/);
  assert.match(html, /topbar\.getBoundingClientRect\(\)\.height/);
  assert.match(html, /window\.getComputedStyle\(topbar\)\.top/);
  assert.match(html, /docs\.offsetTop - updateTopbarOffset\(\)/);
  assert.match(html, /window\.location\.hash === '#docs'/);
  assert.match(html, /function switchLandingPage/);
  assert.match(html, /document\.body\.classList\.add\('js-landing-ready'\)/);
  assert.doesNotMatch(html, /document\.body\.classList\.add\('landing-switching'\)/);
  assert.match(html, /window\.requestAnimationFrame/);
  assert.doesNotMatch(html, /document\.body\.offsetHeight/);
  assert.match(html, /handleLandingWheel/);
  assert.match(html, /function handleLandingScroll/);
  assert.match(html, /event\.deltaY > 0/);
  assert.match(html, /function canScrollWithin/);
  assert.match(html, /window\.addEventListener\('wheel', handleLandingWheel, \{ passive: false \}\)/);
  assert.match(html, /window\.addEventListener\('scroll', handleLandingScroll, \{ passive: true \}\)/);
  assert.doesNotMatch(css, /body\.js-landing-ready\.landing-map:not\(\.map-entering\) \.hero[\s\S]*?display: none/);
  assert.match(css, /body\.js-landing-ready\.landing-map \.workspace/);
  assert.doesNotMatch(css, /body\.js-landing-ready \.workspace\s*\{[\s\S]*?pointer-events: none/);
  assert.match(css, /--topbar-offset/);
  assert.match(css, /scroll-behavior: auto/);
});

test('wheel switching uses normalized intent instead of raw delta spikes', () => {
  const app = readFileSync('app.js', 'utf8');
  assert.match(app, /Math\.min\(Math\.abs\(deltaY\), landingWheelMaxStep\)/);
  assert.doesNotMatch(app, /wheelProgress \+= Math\.abs\(event\.deltaY\)/);
});

test('landing map switch slides without scaling the layout', () => {
  const html = readFileSync('app.js', 'utf8');
  const css = readFileSync('styles.css', 'utf8');
  assert.match(html, /const landingTransitionMs = 460/);
  assert.match(html, /setTimeout\(\(\) => \{[\s\S]*?\}, landingTransitionMs\)/);
  assert.match(html, /scrollToLandingPage\(page, options\.instant \? 'auto' : 'smooth'\)/);
  assert.doesNotMatch(html, /scrollToLandingPage\(page, 'auto'\)/);
  assert.match(css, /\.hero[\s\S]*?transition: opacity 0\.46s var\(--page-ease\), transform 0\.46s var\(--page-ease\)/);
  assert.match(css, /\.workspace[\s\S]*?transition: opacity 0\.46s var\(--page-ease\), transform 0\.46s var\(--page-ease\)/);
  assert.doesNotMatch(css, /body\.map-preparing \.workspace/);
  assert.match(css, /body\.map-entering:not\(\.landing-intro\) \.hero[\s\S]*?transform: translate3d\(0, -34px, 0\)/);
  assert.doesNotMatch(css, /body\.(?:map-preparing|intro-entering|landing-map|map-entering)[\s\S]{0,180}scale\(/);
  assert.doesNotMatch(css, /\.product-card[\s\S]*?animation: riseIn/);
  assert.doesNotMatch(css, /body\.landing-switching \.product-card[\s\S]*?animation: none/);
});

test('scroll sync does not hide the intro before the map is aligned', () => {
  const app = readFileSync('app.js', 'utf8');
  const bodyClasses = new Set();
  const rootStyle = new Map();
  const categoryTabs = { innerHTML: '' };
  const productList = { innerHTML: '' };
  const cards = { innerHTML: '' };
  const searchInput = { value: '', addEventListener() {} };
  const heroSearchInput = { value: '', addEventListener() {} };
  const docsElement = { offsetTop: 780, parentElement: null };
  const topElement = { offsetTop: 0, parentElement: null };
  const topbar = {
    getBoundingClientRect: () => ({ height: 68 }),
    parentElement: null
  };
  const windowListeners = {};
  const body = {
    classList: {
      add: (...classes) => classes.forEach(className => bodyClasses.add(className)),
      remove: (...classes) => classes.forEach(className => bodyClasses.delete(className)),
      toggle: (className, force) => force ? bodyClasses.add(className) : bodyClasses.delete(className)
    }
  };
  const context = {
    document: {
      body,
      documentElement: {
        scrollHeight: 1600,
        style: {
          setProperty: (name, value) => rootStyle.set(name, value)
        }
      },
      querySelector(selector) {
        return {
          '#categoryTabs': categoryTabs,
          '#productList': productList,
          '#cards': cards,
          '#searchInput': searchInput,
          '#heroSearchInput': heroSearchInput,
          '#docs': docsElement,
          '#top': topElement,
          '.topbar': topbar
        }[selector] || null;
      },
      querySelectorAll() {
        return [];
      },
      addEventListener() {}
    },
    window: {
      innerHeight: 900,
      scrollY: 0,
      location: { hash: '' },
      addEventListener(type, handler) {
        windowListeners[type] = handler;
      },
      clearTimeout() {},
      setTimeout() {},
      requestAnimationFrame(handler) {
        handler();
      },
      scrollTo() {},
      getComputedStyle: () => ({
        top: '16px',
        overflowY: 'visible'
      })
    },
    Element: function Element() {},
    setTimeout() {}
  };

  vm.runInNewContext(app, context);
  windowListeners.scroll();
  assert.equal(bodyClasses.has('landing-map'), false);

  context.window.scrollY = 662;
  windowListeners.scroll();
  assert.equal(bodyClasses.has('landing-map'), true);
});

test('map jump clicks scroll smoothly without rebuilding stable cards', () => {
  const app = readFileSync('app.js', 'utf8');
  const trackedHtmlElement = () => ({
    writes: 0,
    value: '',
    get innerHTML() {
      return this.value;
    },
    set innerHTML(value) {
      this.writes += 1;
      this.value = value;
    }
  });
  const listeners = {};
  const bodyClasses = new Set();
  const rootStyle = new Map();
  const windowListeners = {};
  const timeouts = [];
  const scrollCalls = [];
  const categoryTabs = trackedHtmlElement();
  const productList = trackedHtmlElement();
  const cards = trackedHtmlElement();
  const searchInput = { value: '', addEventListener(type, handler) { listeners.search = { type, handler }; } };
  const heroSearchInput = { value: '', addEventListener(type, handler) { listeners.heroKey = { type, handler }; } };
  const docsElement = { offsetTop: 780, parentElement: null };
  const topElement = { offsetTop: 0, parentElement: null };
  const topbar = {
    getBoundingClientRect: () => ({ height: 68 }),
    parentElement: null
  };
  const pageJump = {
    dataset: {},
    closest: selector => selector === '.hero-finder' ? { tagName: 'DIV' } : null,
    addEventListener(type, handler) { listeners.pageJump = { type, handler }; }
  };
  const body = {
    classList: {
      add: (...classes) => classes.forEach(className => bodyClasses.add(className)),
      remove: (...classes) => classes.forEach(className => bodyClasses.delete(className)),
      toggle: (className, force) => force ? bodyClasses.add(className) : bodyClasses.delete(className)
    }
  };
  const documentStub = {
    body,
    documentElement: {
      scrollHeight: 1600,
      style: {
        setProperty: (name, value) => rootStyle.set(name, value)
      }
    },
    querySelector(selector) {
      return {
        '#categoryTabs': categoryTabs,
        '#productList': productList,
        '#cards': cards,
        '#searchInput': searchInput,
        '#heroSearchInput': heroSearchInput,
        '#docs': docsElement,
        '#top': topElement,
        '.topbar': topbar
      }[selector] || null;
    },
    querySelectorAll(selector) {
      return selector === '.page-jump[href="#docs"]' ? [pageJump] : [];
    },
    addEventListener(type, handler) {
      listeners[type] = handler;
    }
  };
  const context = {
    document: documentStub,
    window: {
      innerHeight: 900,
      scrollY: 0,
      location: { hash: '' },
      addEventListener(type, handler) {
        windowListeners[type] = handler;
      },
      clearTimeout() {},
      setTimeout(handler, delay) {
        timeouts.push({ handler, delay });
        return timeouts.length;
      },
      requestAnimationFrame(handler) {
        handler();
      },
      scrollTo(options) {
        scrollCalls.push(options);
      },
      getComputedStyle: () => ({
        top: '16px',
        overflowY: 'visible'
      })
    },
    Element: function Element() {},
    IntersectionObserver: function IntersectionObserver() {
      return { observe() {} };
    },
    setTimeout(handler, delay) {
      timeouts.push({ handler, delay });
      return timeouts.length;
    }
  };
  vm.runInNewContext(app, context);

  const productListWrites = productList.writes;
  const cardWrites = cards.writes;
  listeners.pageJump.handler({ preventDefault() {} });

  assert.equal(scrollCalls.at(-1).behavior, 'smooth');
  assert.equal(scrollCalls.at(-1).top, 662);
  assert.equal(timeouts.at(-1).delay, 460);
  let lockedWheelPrevented = false;
  windowListeners.wheel({
    ctrlKey: false,
    deltaMode: 0,
    deltaY: 80,
    target: body,
    preventDefault() {
      lockedWheelPrevented = true;
    }
  });
  assert.equal(lockedWheelPrevented, true);
  assert.equal(productList.writes, productListWrites);
  assert.equal(cards.writes, cardWrites);
  assert.equal(bodyClasses.has('map-entering'), true);
  timeouts.at(-1).handler();
  assert.equal(bodyClasses.has('map-entering'), false);
});

test('rendering skips unchanged landing lists and cards', () => {
  const app = readFileSync('app.js', 'utf8');
  const trackedHtmlElement = () => ({
    writes: 0,
    value: '',
    get innerHTML() {
      return this.value;
    },
    set innerHTML(value) {
      this.writes += 1;
      this.value = value;
    }
  });
  const categoryTabs = trackedHtmlElement();
  const productList = trackedHtmlElement();
  const cards = trackedHtmlElement();
  const searchInput = { value: '', addEventListener() {} };
  const heroSearchInput = { value: '', addEventListener() {} };
  const docsElement = { offsetTop: 780, parentElement: null };
  const topElement = { offsetTop: 0, parentElement: null };
  const topbar = {
    getBoundingClientRect: () => ({ height: 68 }),
    parentElement: null
  };
  const documentStub = {
    body: {
      classList: {
        add() {},
        remove() {},
        toggle() {}
      }
    },
    documentElement: {
      scrollHeight: 1600,
      style: { setProperty() {} }
    },
    querySelector(selector) {
      return {
        '#categoryTabs': categoryTabs,
        '#productList': productList,
        '#cards': cards,
        '#searchInput': searchInput,
        '#heroSearchInput': heroSearchInput,
        '#docs': docsElement,
        '#top': topElement,
        '.topbar': topbar
      }[selector] || null;
    },
    querySelectorAll(selector) {
      return selector === '.page-jump[href="#docs"]' ? [{ addEventListener() {} }] : [];
    },
    addEventListener() {}
  };
  const context = {
    document: documentStub,
    window: {
      innerHeight: 900,
      scrollY: 0,
      location: { hash: '' },
      addEventListener() {},
      clearTimeout() {},
      setTimeout() {},
      requestAnimationFrame(handler) { handler(); },
      scrollTo() {},
      getComputedStyle: () => ({ top: '16px', overflowY: 'visible' })
    },
    Element: function Element() {},
    IntersectionObserver: function IntersectionObserver() {
      return { observe() {} };
    },
    setTimeout() {}
  };
  vm.runInNewContext(app, context);

  const firstWrites = {
    categoryTabs: categoryTabs.writes,
    productList: productList.writes,
    cards: cards.writes
  };
  context.renderAll();

  assert.deepEqual({
    categoryTabs: categoryTabs.writes,
    productList: productList.writes,
    cards: cards.writes
  }, firstWrites);
});

test('product tutorials are published as independent pages', () => {
  const html = readFileSync('index.html', 'utf8') + readFileSync('app.js', 'utf8');
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

test('codex landing card keeps product name clean and beginner wording direct', () => {
  const app = readFileSync('app.js', 'utf8');
  assert.match(app, /title: 'OpenAI Codex'/);
  assert.doesNotMatch(app, /title: 'OpenAI Codex CLI'/);
  assert.doesNotMatch(app, /指定知乎教程整理/);
  assert.doesNotMatch(app, /Codex CLI 和 VS Code 客户端入口不同，但共用/);
  assert.match(app, /终端和 VS Code 两个入口共用 \.codex、auth\.json、config\.toml/);
  assert.match(app, /\{ heading: \/VS Code\/, indexes: \[2\] \}/);
  assert.match(app, /\{ heading: \/\\.codex\|配置目录\/, indexes: \[1\] \}/);
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

test('client scripts avoid unsafe toc html injection and non-element wheel targets', () => {
  const docsScript = readFileSync('docs.js', 'utf8');
  const indexHtml = readFileSync('index.html', 'utf8') + readFileSync('app.js', 'utf8');
  assert.match(docsScript, /toc\.replaceChildren/);
  assert.match(docsScript, /document\.createElement\('a'\)/);
  assert.match(docsScript, /link\.textContent = heading\.textContent/);
  assert.doesNotMatch(docsScript, /toc\.innerHTML = headings\.map/);
  assert.match(indexHtml, /element instanceof Element \? element : element && element\.parentElement/);
  assert.doesNotMatch(readFileSync('app.js', 'utf8') + readFileSync('docs.js', 'utf8'), /\?\./);
});

test('codex openclaw and async image docs follow the latest source material', () => {
  const codexHtml = readFileSync('docs/codex-cli.html', 'utf8');
  const openclawHtml = readFileSync('docs/openclaw.html', 'utf8');
  const asyncImageHtml = readFileSync('docs/async-image-api.html', 'utf8');

  assert.match(codexHtml, /gpt-5\.5/);
  assert.match(codexHtml, /auth\.json/);
  assert.match(codexHtml, /config\.toml/);
  assert.match(codexHtml, /Codex CLI 是终端入口/);
  assert.match(codexHtml, /VS Code Codex 客户端是图形入口/);
  assert.match(codexHtml, /文件扩展名/);
  assert.match(codexHtml, /auth\.json\.txt/);
  assert.match(codexHtml, /auth\.json 只负责 API Key/);
  assert.match(codexHtml, /config\.toml 负责模型和接口地址/);
  assert.match(codexHtml, /\.\.\/images\/codex-zh\/codex-client\.png/);
  assert.match(codexHtml, /\.\.\/images\/codex-zh\/codex-dir\.png/);
  assert.match(codexHtml, /安装依赖/);
  assert.doesNotMatch(codexHtml, /\.\.\/images\/openclaw-guide\/image1\.png/);

  assert.match(openclawHtml, /OpenClaw 安装向导里填写 URL 时不要加 \/v1/);
  assert.match(openclawHtml, /https:\/\/ciyuan\.fast，不是 https:\/\/ciyuan\.fast\/v1/);
  assert.doesNotMatch(openclawHtml, /\.\.\/images\/openclaw-guide\/image1\.png/);
  assert.match(openclawHtml, /\.\.\/images\/openclaw-guide\/image2\.png/);

  assert.match(asyncImageHtml, /异步生图接口/);
  assert.match(asyncImageHtml, /https:\/\/img\.ciyuan\.fast/);
  assert.match(asyncImageHtml, /可以直接丢给 AI 助手/);
  assert.doesNotMatch(asyncImageHtml, /\.\.\/images\/openclaw-guide\/image1\.png/);
});

test('cursor doc starts from relay api setup and uses ciyuan platform assets', () => {
  const app = readFileSync('app.js', 'utf8');
  const cursorHtml = readFileSync('docs/cursor.html', 'utf8');

  assert.match(app, /id: 'cursor', category: 'coding'/);
  assert.match(cursorHtml, /Cursor 中转 API 配置/);
  assert.match(cursorHtml, /https:\/\/ciyuan\.fast\/v1/);
  assert.match(cursorHtml, /\.\.\/images\/ciyuan-api-key\.png/);
  assert.match(cursorHtml, /\.\.\/images\/cursor\/openai-api-config\.png/);
  assert.match(cursorHtml, /\.\.\/images\/cursor\/model-add\.png/);
  assert.match(cursorHtml, /\.\.\/images\/cursor\/model-select\.png/);
  assert.match(cursorHtml, /\.\.\/images\/cursor\/claude-sonnet-verify\.png/);
  assert.match(cursorHtml, /cursor-3-5-sonnet-20240620/);
  assert.match(cursorHtml, /Cursor Docs/);
  assert.doesNotMatch(cursorHtml, /blog\.csdn\.net\/xianyu120/);
  assert.doesNotMatch(cursorHtml, /apipro\.maynor1024\.live/);
  assert.doesNotMatch(cursorHtml, /cursor是什么|cursor的下载|常用快捷键/);
  assert.equal((cursorHtml.match(/class="shot/g) || []).length, 5);
  assert.ok(cursorHtml.indexOf('一、填写中转 API 地址') < cursorHtml.indexOf('二、创建并复制词元.fast API Key'));
  assert.ok(cursorHtml.indexOf('二、创建并复制词元.fast API Key') < cursorHtml.indexOf('三、Verify 验证并打开开关'));
  assert.ok(cursorHtml.indexOf('三、Verify 验证并打开开关') < cursorHtml.indexOf('四、添加 Cursor 专属模型'));
  assert.ok(cursorHtml.indexOf('四、添加 Cursor 专属模型') < cursorHtml.indexOf('五、选择模型并开始使用'));
  assert.ok(cursorHtml.indexOf('五、选择模型并开始使用') < cursorHtml.indexOf('六、验证是否为 Claude Sonnet 3.5'));
});

test('cc switch doc follows provider setup with local and remote screenshots', () => {
  const ccSwitchHtml = readFileSync('docs/cc-switch.html', 'utf8');

  assert.match(ccSwitchHtml, /通过 cc-Switch 调用词元\.fast 模型/);
  assert.match(ccSwitchHtml, /ANTHROPIC_BASE_URL/);
  assert.match(ccSwitchHtml, /ANTHROPIC_API_KEY/);
  assert.match(ccSwitchHtml, /https:\/\/ciyuan\.fast/);
  assert.match(ccSwitchHtml, /模型名称/);
  assert.match(ccSwitchHtml, /本地环境配置指南/);
  assert.match(ccSwitchHtml, /远程环境（Remote - SSH）配置指南/);
  assert.match(ccSwitchHtml, /RemoteForward/);
  assert.match(ccSwitchHtml, /\.\.\/images\/ciyuan-api-key\.png/);
  assert.match(ccSwitchHtml, /\.\.\/images\/cc-switch\/claude-code-tutorial-17\.png/);
  assert.match(ccSwitchHtml, /\.\.\/images\/cc-switch\/claude-code-tutorial-26\.png/);
  assert.match(ccSwitchHtml, /\.\.\/images\/cc-switch\/claude-code-tutorial-111\.png/);
  assert.doesNotMatch(ccSwitchHtml, /ccswitch:\/\/|Deep Link|一键导入 Provider/);
});
