// Particles Canvas
(function () {
  const canvas = document.getElementById('particles');
  const ctx = canvas.getContext('2d');
  let w = canvas.width = canvas.clientWidth;
  let h = canvas.height = canvas.clientHeight;
  const particles = [];
  const count = Math.round((w * h) / 7000);

  function rand(min, max) {
    return Math.random() * (max - min) + min;
  }

  function resize() {
    w = canvas.width = canvas.clientWidth;
    h = canvas.height = canvas.clientHeight;
    particles.length = 0;
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        r: rand(0.6, 2.4),
        vx: rand(-0.2, 0.2),
        vy: rand(-0.05, 0.05),
        hue: Math.random() > 0.6 ? 200 + Math.random() * 50 : 260 + Math.random() * 30,
        alpha: rand(0.06, 0.25)
      });
    }
  }

  window.addEventListener('resize', resize);
  resize();

  function draw() {
    ctx.clearRect(0, 0, w, h);
    const g = ctx.createRadialGradient(w * 0.5, h * 0.35, 10, w * 0.5, h * 0.35, Math.max(w, h));
    g.addColorStop(0, 'rgba(0,0,0,0)');
    g.addColorStop(1, 'rgba(0,0,0,0.25)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);

    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < -20) p.x = w + 20;
      if (p.x > w + 20) p.x = -20;
      if (p.y < -20) p.y = h + 20;
      if (p.y > h + 20) p.y = -20;

      ctx.beginPath();
      ctx.fillStyle = `hsla(${p.hue},90%,60%,${p.alpha})`;
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    }
    requestAnimationFrame(draw);
  }
  draw();
})();

// Date & Time Update
function updateDateTime() {
  const now = new Date();
  const timeEl = document.getElementById('time');
  const dateEl = document.getElementById('date');
  timeEl.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
  dateEl.textContent = now.toLocaleDateString([], { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' });
}
setInterval(updateDateTime, 500);
updateDateTime();

// Draggable Function
function makeDraggable(el) {
  let dragging = false, ox = 0, oy = 0;
  el.addEventListener('mousedown', (e) => {
    dragging = true;
    ox = e.clientX - el.offsetLeft;
    oy = e.clientY - el.offsetTop;
    el.style.transition = 'none';
    document.body.style.userSelect = 'none';
  });
  window.addEventListener('mousemove', (e) => {
    if (!dragging) return;
    el.style.left = (e.clientX - ox) + 'px';
    el.style.top = (e.clientY - oy) + 'px';
  });
  window.addEventListener('mouseup', () => {
    if (dragging) {
      dragging = false;
      el.style.transition = '';
      document.body.style.userSelect = '';
    }
  });
}

// Popup Controls
const appBtn = document.getElementById('appBtn');
const settingsBtn = document.getElementById('settingsBtn');
const appPopup = document.getElementById('appPopup');
const settingsPopup = document.getElementById('settingsPopup');

appBtn.addEventListener('click', () => {
  const isActive = appPopup.classList.toggle('active');
  if (isActive) {
    appPopup.style.display = 'block';
    settingsPopup.classList.remove('active');
    settingsPopup.style.display = 'none';
  } else {
    setTimeout(() => appPopup.style.display = 'none', 400);
  }
});

settingsBtn.addEventListener('click', () => {
  const isActive = settingsPopup.classList.toggle('active');
  if (isActive) {
    settingsPopup.style.display = 'block';
    appPopup.classList.remove('active');
    appPopup.style.display = 'none';
  } else {
    setTimeout(() => settingsPopup.style.display = 'none', 400);
  }
});

document.querySelectorAll('.close').forEach(btn => {
  btn.addEventListener('click', () => {
    const id = btn.dataset.close;
    if (id) {
      document.getElementById(id).classList.remove('active');
      setTimeout(() => document.getElementById(id).style.display = 'none', 400);
    }
  });
});

makeDraggable(appPopup);
makeDraggable(settingsPopup);

// Command Input
document.getElementById('cmd').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    const v = e.target.value.trim();
    if (!v) return;
    // Yahan aap apna backend ya function call kar sakte ho
    console.log('Command:', v);
    // Example: sendCommand(v);
    e.target.value = '';
  }
});

// Voice Button (demo)
document.getElementById('voiceBtn').addEventListener('click', () => {
  console.log('Voice mode toggled');
  // Yahan voice recognition add kar sakte ho
});