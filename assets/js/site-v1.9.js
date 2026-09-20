const drawer = document.querySelector('.mobile-drawer');
const menuButtons = [...document.querySelectorAll('.menu-toggle')];

function setMenu(open) {
  if (!drawer) return;
  drawer.classList.toggle('open', open);
  document.body.classList.toggle('menu-open', open);
  menuButtons.forEach((btn) => {
    btn.setAttribute('aria-expanded', String(open));
    btn.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    btn.textContent = open ? '×' : '☰';
  });
}


if (drawer && menuButtons.length) {
  menuButtons.forEach((btn) => {
    btn.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      setMenu(!drawer.classList.contains('open'));
    });
  });

  drawer.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => setMenu(false));
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') setMenu(false);
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 900) setMenu(false);
  });
}

const searchBtn = document.querySelector('[data-search]');
const searchPanel = document.querySelector('.search-panel');
const closeSearch = document.querySelector('.close-search');
if (searchBtn && searchPanel) {
  searchBtn.addEventListener('click', () => {
    setMenu(false);
    searchPanel.classList.add('open');
    setTimeout(() => searchPanel.querySelector('input')?.focus(), 50);
  });
  closeSearch?.addEventListener('click', () => searchPanel.classList.remove('open'));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') searchPanel.classList.remove('open');
  });
}

const lang = document.querySelector('[data-lang]');
if (lang) {
  lang.addEventListener('click', () => {
    const en = document.documentElement.dataset.lang === 'en';
    document.documentElement.dataset.lang = en ? 'pt' : 'en';
    lang.textContent = en ? 'EN' : 'PT';
    document.querySelectorAll('[data-pt]').forEach((el) => {
      el.textContent = en ? el.dataset.pt : (el.dataset.en || el.dataset.pt);
    });
  });
}

document.querySelectorAll('[data-filter]').forEach((btn) => btn.addEventListener('click', () => {
  document.querySelectorAll('[data-filter]').forEach((b) => b.classList.remove('active'));
  btn.classList.add('active');
  const filter = btn.dataset.filter;
  document.querySelectorAll('[data-look]').forEach((card) => {
    card.style.display = (filter === 'all' || card.dataset.look === filter) ? 'block' : 'none';
  });
}));


// ICENSO: photographs are visual-only; prevent accidental image navigation.
document.addEventListener('click', (event) => {
  const photo = event.target.closest('img');
  if (!photo || photo.closest('.brand')) return;

  const visualArea = photo.closest(
    '.hero, .home-strip, .collection-hero, .gallery, .story-hero, .story-image, .product-card'
  );
  if (!visualArea) return;

  event.preventDefault();
  event.stopPropagation();
}, true);
