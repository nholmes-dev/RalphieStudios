// Nav scroll + hamburger
const nav = document.getElementById('nav');
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
const heroContent = document.querySelector('.hero-content');
const hero = document.querySelector('.hero');

navToggle.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(open));
});
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  navLinks.classList.remove('open');
  navToggle.setAttribute('aria-expanded', 'false');
}));

addEventListener('scroll', () => {
  const y = scrollY;

  // Nav solid background
  nav.classList.toggle('scrolled', y > 40);

  // Hero scroll fade + drift up
  const heroH = hero.offsetHeight;
  const progress = Math.max(0, Math.min(y / (heroH * 0.55), 1));
  heroContent.style.opacity = 1 - progress;
  heroContent.style.transform = `translateY(${y * 0.28}px)`;
}, { passive: true });

// Canvas particles — full hero coverage
const cvs = document.getElementById('cvs');
const cx = cvs.getContext('2d');
let W, H, pts;

function init() {
  W = cvs.width  = hero.offsetWidth;
  H = cvs.height = hero.offsetHeight;
  pts = Array.from({ length: 180 }, () => ({
    x: Math.random() * W,
    y: Math.random() * H,
    r: Math.random() * 1.6 + 0.3,
    vx: (Math.random() - 0.5) * 0.2,
    vy: (Math.random() - 0.5) * 0.2,
    col: Math.random() > 0.5 ? 0 : 1,
    a: Math.random() * 0.5 + 0.07
  }));
}

function tick() {
  cx.clearRect(0, 0, W, H);
  for (const p of pts) {
    p.x = (p.x + p.vx + W) % W;
    p.y = (p.y + p.vy + H) % H;
    cx.beginPath();
    cx.arc(p.x, p.y, p.r, 0, 6.283);
    cx.fillStyle = p.col
      ? `rgba(253,142,55,${p.a})`
      : `rgba(106,163,232,${p.a})`;
    cx.fill();
  }
  requestAnimationFrame(tick);
}

addEventListener('resize', init, { passive: true });
init();
tick();
