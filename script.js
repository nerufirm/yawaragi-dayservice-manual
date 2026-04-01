// Sidebar toggle (mobile)
const toggle = document.getElementById('menu-toggle');
const sidebar = document.getElementById('sidebar');
toggle.addEventListener('click', () => sidebar.classList.toggle('open'));

// Close sidebar on link click (mobile)
sidebar.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => sidebar.classList.remove('open'));
});

// Active nav highlight on scroll
const sections = document.querySelectorAll('.chapter, section[id]');
const navLinks = document.querySelectorAll('.nav-link');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navLinks.forEach(l => {
        l.classList.toggle('active', l.getAttribute('href') === '#' + id);
      });
    }
  });
}, { rootMargin: '-20% 0px -70% 0px' });

sections.forEach(s => { if (s.id) observer.observe(s); });

// Print specific section
function printSection(sectionId) {
  const target = document.getElementById(sectionId);
  document.body.classList.add('printing');
  target.classList.add('print-target');
  window.print();
  document.body.classList.remove('printing');
  target.classList.remove('print-target');
}

// Sakura petals animation
(function initSakura() {
  const container = document.getElementById('sakura-container');
  if (!container) return;

  const PETAL_COUNT = 25;
  const colors = ['#FADADD', '#F8B4C8', '#F4A0B5', '#FDEEF1', '#FFD1DC', '#FFC0CB'];

  function createPetalSVG(color) {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 30 30');
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');

    const petal = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    petal.setAttribute('d', 'M15 3 Q20 10 15 18 Q10 10 15 3 Z M15 3 Q22 8 18 16 Q14 8 15 3 Z');
    petal.setAttribute('fill', color);
    petal.setAttribute('opacity', '0.8');

    svg.appendChild(petal);
    return svg;
  }

  function spawnPetal() {
    const petal = document.createElement('div');
    const size = 12 + Math.random() * 18;
    const startX = Math.random() * 100;
    const drift = -30 + Math.random() * 60;
    const duration = 8 + Math.random() * 12;
    const delay = Math.random() * -20;
    const rotation = Math.random() * 360;
    const color = colors[Math.floor(Math.random() * colors.length)];

    Object.assign(petal.style, {
      position: 'absolute',
      top: '-30px',
      left: startX + '%',
      width: size + 'px',
      height: size + 'px',
      pointerEvents: 'none',
      animation: `sakuraFall ${duration}s linear ${delay}s infinite`,
      '--drift': drift + 'px',
      transform: `rotate(${rotation}deg)`,
      opacity: 0.4 + Math.random() * 0.4,
      filter: `blur(${Math.random() < 0.3 ? 1 : 0}px)`,
    });

    petal.appendChild(createPetalSVG(color));
    container.appendChild(petal);
  }

  // Inject keyframes
  const style = document.createElement('style');
  style.textContent = `
    @keyframes sakuraFall {
      0% {
        transform: translateY(0) translateX(0) rotate(0deg) scale(1);
        opacity: 0;
      }
      5% {
        opacity: 0.7;
      }
      25% {
        transform: translateY(25vh) translateX(calc(var(--drift) * 0.5)) rotate(120deg) scale(0.95);
      }
      50% {
        transform: translateY(50vh) translateX(var(--drift)) rotate(240deg) scale(0.9);
      }
      75% {
        transform: translateY(75vh) translateX(calc(var(--drift) * 0.6)) rotate(320deg) scale(0.85);
        opacity: 0.5;
      }
      100% {
        transform: translateY(105vh) translateX(calc(var(--drift) * 0.3)) rotate(400deg) scale(0.8);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);

  for (let i = 0; i < PETAL_COUNT; i++) {
    spawnPetal();
  }
})();
