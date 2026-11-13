// Mobile menu
(function () {
  var toggle = document.getElementById('menu-toggle');
  var panel = document.getElementById('menu-panel');
  var iconOpen = document.getElementById('icon-open');
  var iconClose = document.getElementById('icon-close');

  function setOpen(open) {
    panel.hidden = !open;
    iconOpen.hidden = open;
    iconClose.hidden = !open;
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
  }

  toggle.addEventListener('click', function () { setOpen(panel.hidden); });
  panel.addEventListener('click', function (e) {
    if (e.target.closest('a')) setOpen(false);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !panel.hidden) { setOpen(false); toggle.focus(); }
  });
  window.matchMedia('(min-width: 1024px)').addEventListener('change', function (e) {
    if (e.matches) setOpen(false);
  });
})();

// Meta Pixel: track a Lead when a WhatsApp link is opened
document.addEventListener('click', function (e) {
  var link = e.target.closest('a[href^="https://wa.me/"]');
  if (link && window.fbq) fbq('track', 'Lead');
});

// Sticky bar: solid background once the announcement bar scrolls out of view
(function () {
  var annc = document.getElementById('annc');
  var bar = document.getElementById('bar');
  if (!annc || !bar || typeof IntersectionObserver === 'undefined') return;
  new IntersectionObserver(function (en) {
    bar.classList.toggle('is-stuck', !en[0].isIntersecting);
  }).observe(annc);
})();
