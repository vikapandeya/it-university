// Mobile hamburger + sidebar backdrop wiring — runs after partials inject the header
function initMobileNav() {
  const hamburger = document.getElementById('hamburger');
  const sidebar   = document.querySelector('.sidebar');
  if (!hamburger || !sidebar) return;

  // Inject backdrop if missing
  let backdrop = document.querySelector('.sidebar-backdrop');
  if (!backdrop) {
    backdrop = document.createElement('div');
    backdrop.className = 'sidebar-backdrop';
    document.body.appendChild(backdrop);
  }

  function openSidebar() {
    sidebar.classList.add('open');
    backdrop.classList.add('open');
    hamburger.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }
  function closeSidebar() {
    sidebar.classList.remove('open');
    backdrop.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', () => {
    sidebar.classList.contains('open') ? closeSidebar() : openSidebar();
  });
  backdrop.addEventListener('click', closeSidebar);

  // Close sidebar when a link is tapped on mobile
  sidebar.querySelectorAll('.sidebar__link').forEach(a => {
    a.addEventListener('click', () => {
      if (window.innerWidth <= 768) closeSidebar();
    });
  });

  // Close on resize to desktop
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) closeSidebar();
  });
}

document.addEventListener('DOMContentLoaded', function() {
  // Init mobile nav after a tick so partials have injected the header
  setTimeout(initMobileNav, 100);
  // Sidebar active link via hash
  function setActiveLink() {
    const hash = location.hash || '';
    document.querySelectorAll('.sidebar__link').forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === hash);
    });
  }
  setActiveLink();
  window.addEventListener('hashchange', setActiveLink);

  // Scroll-spy via IntersectionObserver — suppressed during click-triggered smooth scroll
  // to prevent the active class flickering back to the old section while animating.
  let userScrolling = false;
  const sections = document.querySelectorAll('.content section[id]');
  const observer = new IntersectionObserver((entries) => {
    if (userScrolling) return;
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = '#' + entry.target.id;
        document.querySelectorAll('.sidebar__link').forEach(a => {
          a.classList.toggle('active', a.getAttribute('href') === id);
        });
      }
    });
  }, { rootMargin: '-20% 0px -60% 0px' });
  sections.forEach(s => observer.observe(s));

  // Suppress observer for ~400ms after a sidebar link click (smooth-scroll duration)
  document.querySelectorAll('.sidebar__link').forEach(a => {
    a.addEventListener('click', () => {
      userScrolling = true;
      setTimeout(() => { userScrolling = false; }, 450);
    });
  });

  // Wire progress buttons — ID is 'portal-progress-bars' (was incorrectly 'progress-bars')
  if (window.progress) {
    progress.wireButtons();
    progress.renderProgressBars('portal-progress-bars');
  }

  // Init quiz — validate portalId against allowlist before using it in a fetch URL
  const portalId = document.documentElement.dataset.portal;
  const quizContainer = document.getElementById('quiz-section');
  if (quizContainer && portalId && window.quiz) {
    const valid = window.store ? window.store.VALID_PORTALS : [];
    if (!valid.length || valid.includes(portalId)) {
      quiz.init(portalId, 'quiz-section');
    }
  }
});
