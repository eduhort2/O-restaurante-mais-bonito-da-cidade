const WHATSAPP_NUMBER = '';

const loader = document.querySelector('.loader');
window.addEventListener('load', () => setTimeout(() => loader?.classList.add('hide'), 650));

const header = document.querySelector('.site-header');
window.addEventListener('scroll', () => header?.classList.toggle('scrolled', window.scrollY > 45));

const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
menuButton?.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
});
nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuButton?.setAttribute('aria-expanded', 'false');
}));

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.13 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const lightbox = document.querySelector('.lightbox');
const lightboxImg = lightbox?.querySelector('img');
const lightboxTitle = lightbox?.querySelector('p');
document.querySelectorAll('.gallery-item').forEach(item => {
  item.addEventListener('click', () => {
    if (!lightbox || !lightboxImg || !lightboxTitle) return;
    lightboxImg.src = item.dataset.image || '';
    lightboxImg.alt = item.dataset.title || 'Imagem ampliada';
    lightboxTitle.textContent = item.dataset.title || '';
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
  });
});
const closeLightbox = () => {
  lightbox?.classList.remove('open');
  lightbox?.setAttribute('aria-hidden', 'true');
};
lightbox?.querySelector('.lightbox-close')?.addEventListener('click', closeLightbox);
lightbox?.addEventListener('click', event => { if (event.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeLightbox(); });

const whatsappButton = document.querySelector('.whatsapp-placeholder');
whatsappButton?.addEventListener('click', () => {
  if (!WHATSAPP_NUMBER) {
    alert('O WhatsApp oficial ainda precisa ser preenchido no arquivo assets/js/script.js.');
    return;
  }
  const message = encodeURIComponent('Olá! Gostaria de informações e de fazer uma reserva.');
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank', 'noopener');
});

window.addEventListener('scroll', () => {
  const heroBg = document.querySelector('.hero-bg');
  if (heroBg && window.innerWidth > 800) heroBg.style.translate = `0 ${window.scrollY * 0.12}px`;
});
