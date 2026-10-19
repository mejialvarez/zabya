// Conversación animada de ejemplo (sin JS o con movimiento reducido, se ve completa)
(function () {
  var chat = document.getElementById('chat');
  if (!chat) return;
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var status = document.getElementById('chat-status');
  var slots = Array.prototype.slice.call(chat.querySelectorAll('.slot'));
  var bubbles = slots.map(function (s) { return s.querySelector('.b'); });
  var typing = document.createElement('span');
  typing.className = 'typing';
  typing.setAttribute('aria-hidden', 'true');
  typing.innerHTML = '<i></i><i></i><i></i>';
  var step = 0;

  function reset() {
    step = 0;
    bubbles.forEach(function (b) { b.className = b.className.replace(/ (shown|fade)/g, '') + ' wait'; });
  }

  function show(i) {
    bubbles[i].className = bubbles[i].className.replace(' wait', ' shown');
  }

  function setTyping(slot) {
    if (slot) slot.insertBefore(typing, slot.firstChild);
    else if (typing.parentNode) typing.parentNode.removeChild(typing);
    status.textContent = slot ? 'escribiendo…' : 'en línea';
  }

  function run() {
    if (step >= slots.length) {
      setTimeout(function () {
        bubbles.forEach(function (b) { b.className = b.className.replace(' shown', ' fade'); });
        setTimeout(function () { reset(); setTimeout(run, 700); }, 700);
      }, 5000);
      return;
    }
    var i = step;
    if (slots[i].classList.contains('s-out')) {
      setTyping(slots[i]);
      setTimeout(function () {
        setTyping(null);
        show(i);
        step = i + 1;
        setTimeout(run, 1300);
      }, 1400);
    } else {
      show(i);
      step = i + 1;
      setTimeout(run, 900);
    }
  }

  function start() { reset(); setTimeout(run, 700); }

  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      if (entries.some(function (en) { return en.isIntersecting; })) { io.disconnect(); start(); }
    }, { threshold: 0.01 });
    io.observe(chat);
  } else {
    start();
  }
})();
