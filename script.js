
// ===== PRELOADER =====
window.addEventListener('load', () => {
  setTimeout(() => document.getElementById('preloader').classList.add('hidden'), 2000);
});

// ===== NAVBAR =====
window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 30);
});

// ===== HAMBURGER =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  const [s1, s2, s3] = hamburger.querySelectorAll('span');
  if (navLinks.classList.contains('open')) {
    s1.style.transform = 'rotate(45deg) translate(5px,5px)';
    s2.style.opacity = '0';
    s3.style.transform = 'rotate(-45deg) translate(5px,-5px)';
  } else {
    [s1,s2,s3].forEach(s => { s.style.transform=''; s.style.opacity=''; });
  }
});
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  navLinks.classList.remove('open');
  hamburger.querySelectorAll('span').forEach(s => { s.style.transform=''; s.style.opacity=''; });
}));

// ===== PARTICLES =====
const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');
function resize() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
resize();
window.addEventListener('resize', resize);
const particles = Array.from({length: 70}, () => ({
  x: Math.random() * innerWidth, y: Math.random() * innerHeight,
  r: Math.random() * 1.4 + 0.4,
  vx: (Math.random()-.5)*.3, vy: (Math.random()-.5)*.3,
  o: Math.random()*.35+.08
}));
(function loop() {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  particles.forEach(p => {
    p.x+=p.vx; p.y+=p.vy;
    if(p.x<0||p.x>canvas.width) p.vx*=-1;
    if(p.y<0||p.y>canvas.height) p.vy*=-1;
    ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
    ctx.fillStyle=`rgba(200,16,46,${p.o})`; ctx.fill();
  });
  requestAnimationFrame(loop);
})();

// ===== AOS =====
const aosObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const d = parseInt(e.target.getAttribute('data-aos-delay')||0);
      setTimeout(() => e.target.classList.add('aos-visible'), d);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('[data-aos]').forEach(el => aosObs.observe(el));

// ===== COUNTER =====
const cntObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target, target = parseInt(el.dataset.target);
    if (isNaN(target)) return;
    let start = null;
    const dur = 1800;
    (function step(ts) {
      if (!start) start = ts;
      const p = Math.min((ts-start)/dur,1);
      el.textContent = Math.floor((1-Math.pow(1-p,3))*target);
      if (p<1) requestAnimationFrame(step); else el.textContent=target;
    })(performance.now());
    cntObs.unobserve(el);
  });
}, {threshold:.5});
document.querySelectorAll('.count-up').forEach(el => cntObs.observe(el));

// ===== BAR FILLS =====
const barObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.querySelectorAll('[data-width]').forEach(b => {
      setTimeout(() => b.style.width = b.dataset.width, 300);
    });
    barObs.unobserve(e.target);
  });
}, {threshold:.3});
document.querySelectorAll('.hero-dashboard, #resultados').forEach(el => barObs.observe(el));

// ===== FORM → WHATSAPP =====
document.getElementById('contact-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const nome = document.getElementById('nome').value.trim();
  const wa = document.getElementById('whatsapp').value.trim();
  const email = document.getElementById('email').value.trim();
  const cnpj = document.getElementById('cnpj').value.trim();
  const msg = document.getElementById('mensagem').value.trim();
  if (!nome || !wa || !msg) { alert('Preencha os campos obrigatórios.'); return; }
  let text = `*Diagnóstico Executivo — Na Tela Imports*\n\n*Nome:* ${nome}\n*WhatsApp:* ${wa}`;
  if (email) text += `\n*E-mail:* ${email}`;
  if (cnpj) text += `\n*CNPJ:* ${cnpj}`;
  text += `\n\n*Operação:*\n${msg}`;
  window.open(`https://wa.me/5511956655623?text=${encodeURIComponent(text)}`, '_blank');
});

// ===== MASKS =====
document.getElementById('cnpj').addEventListener('input', function() {
  let v = this.value.replace(/\D/g,'').substring(0,14);
  v = v.replace(/(\d{2})(\d)/,'$1.$2').replace(/(\d{3})(\d)/,'$1.$2')
       .replace(/(\d{3})(\d)/,'$1/$2').replace(/(\d{4})(\d)/,'$1-$2');
  this.value = v;
});
document.getElementById('whatsapp').addEventListener('input', function() {
  let v = this.value.replace(/\D/g,'').substring(0,11);
  v = v.replace(/(\d{2})(\d)/,'($1) $2').replace(/(\d{5})(\d)/,'$1-$2');
  this.value = v;
});

// ===== ACTIVE NAV =====
window.addEventListener('scroll', () => {
  const y = window.scrollY + 120;
  document.querySelectorAll('section[id]').forEach(sec => {
    const link = document.querySelector(`.nav-links a[href="#${sec.id}"]`);
    if (!link) return;
    link.style.color = (sec.offsetTop <= y && sec.offsetTop + sec.offsetHeight > y) ? '#C8102E' : '';
  });
});
