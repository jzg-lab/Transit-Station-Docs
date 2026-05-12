const themeStorageKey = 'ciyuan-docs-theme';
const themeMedia = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : { matches: false };

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

function openLightbox(src, alt) {
  const lightbox = document.querySelector('#imageLightbox');
  if (!lightbox || !src) return;
  const image = lightbox.querySelector('img');
  const caption = lightbox.querySelector('.lightbox-caption');
  image.src = src;
  image.alt = alt || '';
  caption.textContent = alt || '';
  lightbox.classList.add('open');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  const lightbox = document.querySelector('#imageLightbox');
  if (!lightbox) return;
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
  lightbox.querySelector('img').removeAttribute('src');
  document.body.style.overflow = '';
}

function addCopyButtons(root = document) {
  root.querySelectorAll('pre').forEach(pre => {
    if (pre.querySelector('.copy-btn')) return;
    const button = document.createElement('button');
    button.className = 'copy-btn';
    button.type = 'button';
    button.textContent = '复制';
    button.addEventListener('click', async () => {
      const text = pre.querySelector('code')?.innerText || '';
      try {
        await navigator.clipboard.writeText(text);
        button.textContent = '已复制';
      } catch (error) {
        button.textContent = '手动复制';
      }
      setTimeout(() => { button.textContent = '复制'; }, 1600);
    });
    pre.appendChild(button);
  });
}

function renderToc() {
  const doc = document.querySelector('#doc');
  const toc = document.querySelector('#toc');
  if (!doc || !toc) return;
  const headings = [...doc.querySelectorAll('h2, h3')];
  toc.replaceChildren(...headings.map((heading, index) => {
    const id = heading.id || `heading-${index}`;
    heading.id = id;
    const link = document.createElement('a');
    link.href = `#${id}`;
    link.className = `toc-${heading.tagName.toLowerCase()}`;
    link.textContent = heading.textContent;
    return link;
  }));
}

document.addEventListener('click', event => {
  const zoomImage = event.target.closest('.shot img');
  const lightboxClose = event.target.closest('.lightbox-close');
  if (zoomImage) openLightbox(zoomImage.dataset.full || zoomImage.src, zoomImage.alt);
  if (lightboxClose || event.target.id === 'imageLightbox') closeLightbox();
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape') closeLightbox();
});

addCopyButtons();
renderToc();
initTheme();
