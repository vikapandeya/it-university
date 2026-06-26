(async function () {
  const d = parseInt(document.documentElement.dataset.depth || '1', 10);
  const base = '../'.repeat(d - 1) || './';

  async function loadPartial(id, file, fallbackFn) {
    const el = document.getElementById(id);
    if (!el) return;
    try {
      const r = await fetch(base + 'assets/partials/' + file);
      if (!r.ok) throw new Error();
      let html = await r.text();
      html = html.replace(/BASE_URL/g, base.replace(/\/$/, '') || '.');
      el.outerHTML = html;
    } catch {
      if (fallbackFn) el.outerHTML = fallbackFn(base);
    }
  }

  function buildFallbackHeader(base) {
    const b = base.replace(/\/$/, '') || '.';
    return `<header class="site-header" id="site-header">
      <a href="${b}/index.html" class="site-header__logo"><span style="color:var(--accent)">IT</span><span>University</span></a>
      <nav class="site-header__nav" aria-label="Main navigation">
        <a href="${b}/ultimate-it/index.html">🌐 IT Encyclopedia</a>
        <a href="${b}/devops-cloud/index.html">☁️ DevOps</a>
        <a href="${b}/cybersecurity-vapt/index.html">🛡️ CyberSec</a>
        <a href="${b}/linux-administration/index.html">🐧 Linux</a>
        <a href="${b}/aws-learning/index.html">🚀 AWS</a>
        <a href="${b}/ai-prompt-engineering/index.html">🤖 AI</a>
        <a href="${b}/tools-ide/index.html">⚡ IDE</a>
        <a href="${b}/computer-basics/index.html">🖥️ Basics</a>
      </nav>
      <div class="site-header__auth" id="auth-nav"></div>
      <button class="hamburger" id="hamburger" aria-label="Toggle navigation menu" aria-expanded="false">
        <span></span><span></span><span></span>
      </button>
    </header><div class="search-overlay" id="search-overlay"></div>`;
  }

  function buildFallbackFooter(base) {
    const b = base.replace(/\/$/, '') || '.';
    return `<footer class="site-footer">
      <p>
        <strong style="color:var(--accent)">IT University</strong> — Your complete IT learning platform.
        &nbsp;&middot;&nbsp;<a href="${b}/index.html">Home</a>
        &nbsp;&middot;&nbsp;<a href="${b}/ultimate-it/index.html">IT Encyclopedia</a>
        &nbsp;&middot;&nbsp;<a href="${b}/devops-cloud/index.html">DevOps</a>
        &nbsp;&middot;&nbsp;<a href="${b}/cybersecurity-vapt/index.html">CyberSec</a>
        &nbsp;&middot;&nbsp;<a href="${b}/linux-administration/index.html">Linux</a>
        &nbsp;&middot;&nbsp;<a href="${b}/aws-learning/index.html">AWS</a>
        &nbsp;&middot;&nbsp;<a href="${b}/ai-prompt-engineering/index.html">AI</a>
        &nbsp;&middot;&nbsp;<a href="${b}/tools-ide/index.html">IDE</a>
        &nbsp;&middot;&nbsp;<a href="${b}/computer-basics/index.html">Basics</a>
        &nbsp;&middot;&nbsp;<a href="${b}/interview-questions/index.html">Interview Hub</a>
        &nbsp;&middot;&nbsp;<a href="${b}/roadmaps/index.html">Roadmaps</a>
        &nbsp;&middot;&nbsp;<a href="${b}/labs/index.html">Labs</a>
      </p>
      <p style="margin-top:8px">&copy; IT University. All content for educational purposes.</p>
    </footer>`;
  }

  await Promise.all([
    loadPartial('header-placeholder', 'header.html', buildFallbackHeader),
    loadPartial('footer-placeholder', 'footer.html', buildFallbackFooter),
  ]);

  // Mark active nav link — match on portal folder name, avoid home false-matches
  const currentPath = location.pathname;
  const links = document.querySelectorAll('.site-header__nav a');
  links.forEach(a => {
    const href = a.getAttribute('href') || '';
    const segment = href.split('/').slice(-2, -1)[0]; // e.g. "devops-cloud"
    if (segment && segment !== 'index.html' && currentPath.includes('/' + segment + '/')) {
      a.classList.add('active');
    }
  });

  // Mobile sidebar — backdrop + hamburger X animation wired here because
  // partials.js is the earliest point the header is guaranteed in the DOM.
  const ham = document.getElementById('hamburger');
  const sidebar = document.querySelector('.sidebar');
  if (ham && sidebar) {
    // Inject backdrop once
    let backdrop = document.querySelector('.sidebar-backdrop');
    if (!backdrop) {
      backdrop = document.createElement('div');
      backdrop.className = 'sidebar-backdrop';
      document.body.appendChild(backdrop);
    }

    function openSidebar() {
      sidebar.classList.add('open');
      backdrop.classList.add('open');
      ham.classList.add('open');
      ham.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    }
    function closeSidebar() {
      sidebar.classList.remove('open');
      backdrop.classList.remove('open');
      ham.classList.remove('open');
      ham.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }

    ham.addEventListener('click', () => {
      sidebar.classList.contains('open') ? closeSidebar() : openSidebar();
    });
    backdrop.addEventListener('click', closeSidebar);

    // Close on sidebar link tap (mobile)
    sidebar.querySelectorAll('.sidebar__link').forEach(a => {
      a.addEventListener('click', () => { if (window.innerWidth <= 768) closeSidebar(); });
    });

    // Close on resize to desktop
    window.addEventListener('resize', () => { if (window.innerWidth > 768) closeSidebar(); });
  }

  renderAuthNav();

  // Init search after partials are in the DOM (replaces the double-init in search.js)
  if (window.search && typeof search.init === 'function') search.init();
})();

function renderAuthNav() {
  const el = document.getElementById('auth-nav');
  if (!el) return;
  const d = parseInt(document.documentElement.dataset.depth || '1', 10);
  const base = ('../'.repeat(d - 1) || './').replace(/\/$/, '') || '.';
  const user = window.store && window.store.currentUser();
  if (user) {
    // escapeHtml prevents stored XSS from malicious names in localStorage
    const safeName = typeof escapeHtml === 'function' ? escapeHtml(user.name) : String(user.name).replace(/</g, '&lt;').replace(/>/g, '&gt;');
    el.innerHTML = `
      <div style="display:flex;gap:8px;align-items:center">
        <a href="${base}/auth/dashboard.html" class="btn btn--outline btn--sm">👤 ${safeName}</a>
        ${user.isAdmin ? `<a href="${base}/auth/admin.html" class="btn btn--ghost btn--sm">Admin</a>` : ''}
        <button class="btn btn--ghost btn--sm" onclick="window.auth&&window.auth.logout()">Logout</button>
      </div>`;
  } else {
    el.innerHTML = `
      <div style="display:flex;gap:8px">
        <a href="${base}/auth/login.html" class="btn btn--ghost btn--sm">Login</a>
        <a href="${base}/auth/signup.html" class="btn btn--primary btn--sm">Sign Up</a>
      </div>`;
  }
}
