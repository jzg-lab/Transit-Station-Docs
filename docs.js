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
      const code = pre.querySelector('code');
      const text = code ? code.innerText : '';
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

function closestMatch(target, selector) {
  let node = target;
  while (node && node !== document) {
    if (node.matches && node.matches(selector)) return node;
    node = node.parentElement;
  }
  return null;
}

document.addEventListener('click', event => {
  const zoomImage = closestMatch(event.target, '.shot img');
  const lightboxClose = closestMatch(event.target, '.lightbox-close');
  if (zoomImage) openLightbox(zoomImage.dataset.full || zoomImage.src, zoomImage.alt);
  if (lightboxClose || event.target.id === 'imageLightbox') closeLightbox();
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape') closeLightbox();
});

addCopyButtons();
renderToc();
