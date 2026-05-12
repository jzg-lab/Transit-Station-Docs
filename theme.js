const themeStorageKey = 'ciyuan-docs-theme';
const themeMedia = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : { matches: false };
let themeInitialized = false;

function themeQueryValue() {
  try {
    if (window.URLSearchParams) return new URLSearchParams(window.location.search).get('theme');
    const match = window.location.search.match(/[?&]theme=(dark|light)(?:&|$)/);
    return match ? match[1] : null;
  } catch (error) {
    return null;
  }
}

const themeQuery = themeQueryValue();

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
  document.body.classList.remove('theme-light', 'theme-dark');
  document.body.classList.add(`theme-${theme}`);
  document.querySelectorAll('[data-theme-toggle]').forEach(button => {
    button.textContent = theme === 'dark' ? '浅色模式' : '夜间模式';
    button.setAttribute('aria-pressed', String(theme === 'dark'));
  });
  if (persist) setStoredTheme(theme);
}

function closestThemeToggle(target) {
  let node = target;
  while (node && node !== document) {
    if (node.matches && node.matches('[data-theme-toggle]')) return node;
    node = node.parentElement;
  }
  return null;
}

function handleThemeMediaChange(event) {
  if (themeQuery || getStoredTheme()) return;
  applyTheme(event.matches ? 'dark' : 'light');
}

function initTheme() {
  if (themeInitialized) return;
  themeInitialized = true;
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
