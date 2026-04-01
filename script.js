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
