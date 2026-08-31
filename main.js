// Nav scroll state
const nav = document.getElementById('nav');
addEventListener('scroll', () => nav.classList.toggle('scrolled', scrollY > 40), { passive: true });

// Hero canvas particles
const cvs = document.getElementById('cvs');
const cx = cvs.getContext('2d');
let W, H, pts;

function init() {
  W = cvs.width  = cvs.offsetWidth;
  H = cvs.height = cvs.offsetHeight;
  pts = Array.from({ length: 90 }, () => ({
    x: Math.random() * W,
    y: Math.random() * H,
    r: Math.random() * 1.4 + 0.4,
    vx: (Math.random() - 0.5) * 0.22,
    vy: (Math.random() - 0.5) * 0.22,
    col: Math.random() > 0.5 ? 0 : 1,
    a: Math.random() * 0.45 + 0.08
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
      ? `rgba(240,120,32,${p.a})`
      : `rgba(74,143,224,${p.a})`;
    cx.fill();
  }
  requestAnimationFrame(tick);
}

addEventListener('resize', init, { passive: true });
init();
tick();
