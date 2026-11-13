// Hero chat demo: reveals the messages one by one, with a typing indicator
// before each reply. Starts when the chat scrolls into view.
(function () {
  var chat = document.getElementById('chat');
  var status = document.getElementById('chat-status');
  if (!chat) return;
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var slots = Array.prototype.slice.call(chat.querySelectorAll('.slot'));
  var bubbles = slots.map(function (s) { return s.querySelector('.b'); });

  // Hide every message first; the markup ships fully visible for no-JS and reduced motion
  bubbles.forEach(function (b) { b.classList.remove('shown'); b.classList.add('wait'); });

  function show(i) {
    bubbles[i].classList.remove('wait');
    bubbles[i].classList.add('shown');
  }

  function run(i) {
    if (i >= slots.length) return;
    if (slots[i].classList.contains('s-out')) {
      var dots = document.createElement('span');
      dots.className = 'typing';
      dots.setAttribute('aria-hidden', 'true');
      dots.innerHTML = '<i></i><i></i><i></i>';
      slots[i].insertBefore(dots, bubbles[i]);
      status.textContent = 'escribiendo…';
      setTimeout(function () {
        dots.remove();
        status.textContent = 'en línea';
        show(i);
        setTimeout(function () { run(i + 1); }, 1300);
      }, 1300);
    } else {
      show(i);
      setTimeout(function () { run(i + 1); }, 900);
    }
  }

  var started = false;
  function start() {
    if (started) return;
    started = true;
    setTimeout(function () { run(0); }, 600);
  }

  if (typeof IntersectionObserver === 'undefined') { start(); return; }
  var io = new IntersectionObserver(function (entries) {
    if (entries.some(function (e) { return e.isIntersecting; })) { start(); io.disconnect(); }
  }, { threshold: 0.01 });
  io.observe(chat);
})();
