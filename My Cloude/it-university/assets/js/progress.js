// Static lesson counts per portal — avoids querying DOM elements that don't exist
// on the dashboard page, which previously caused progress % to always show 100%.
const LESSON_COUNTS = {
  'ultimate-it':           35,
  'devops-cloud':          40,
  'cybersecurity-vapt':    19,
  'linux-administration':  18,
  'aws-learning':          20,
  'ai-prompt-engineering': 18,
  'tools-ide':             13,
  'computer-basics':       10,
};

const progress = {
  markComplete(type, key) {
    const user = store.currentUser();
    if (!user) { showToast('Login to track progress', 'warning'); return; }
    store.updateProgress(user.id, p => { p[type][key] = true; });
    showToast('Marked as complete!', 'success');
    progress.refreshBars();
  },

  isComplete(type, key) {
    const user = store.currentUser();
    if (!user) return false;
    return !!store.getProgress(user.id)[type][key];
  },

  getPortalProgress(portalId) {
    const user = store.currentUser();
    if (!user) return { done: 0, total: 1, pct: 0 };
    const p = store.getProgress(user.id);
    const done = Object.keys(p.lessons).filter(k => k.startsWith(portalId + ':')).length;
    const total = LESSON_COUNTS[portalId] || Math.max(done, 1);
    return { done, total, pct: Math.min(100, Math.round((done / total) * 100)) };
  },

  renderProgressBars(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    const user = store.currentUser();
    if (!user) {
      container.innerHTML = '<p style="color:var(--text-muted);font-size:var(--text-sm)">Login to track progress</p>';
      return;
    }
    const p = store.getProgress(user.id);

    const portals = [
      { id: 'ultimate-it',           label: 'IT Encyclopedia' },
      { id: 'devops-cloud',          label: 'DevOps & Cloud' },
      { id: 'cybersecurity-vapt',    label: 'Cybersecurity' },
      { id: 'linux-administration',  label: 'Linux Admin' },
      { id: 'aws-learning',          label: 'AWS' },
      { id: 'ai-prompt-engineering', label: 'AI & Prompting' },
      { id: 'tools-ide',             label: 'Online IDE & Tools' },
      { id: 'computer-basics',       label: 'Computer Basics' },
    ];

    container.innerHTML = portals.map(portal => {
      const done = Object.keys(p.lessons).filter(k => k.startsWith(portal.id + ':')).length;
      const total = LESSON_COUNTS[portal.id] || 1;
      const pct = Math.min(100, Math.round((done / total) * 100));
      return `
        <div class="progress-item">
          <div class="progress-item__label">
            <span class="progress-item__name">${escapeHtml(portal.label)}</span>
            <span class="progress-item__value">${pct}%</span>
          </div>
          <div class="progress-bar"><div class="progress-bar__fill" style="width:${pct}%"></div></div>
        </div>`;
    }).join('');

    // Cert readiness
    const certs = p.certs || {};
    if (Object.keys(certs).length) {
      container.innerHTML += '<hr style="border-color:var(--border);margin:var(--gap) 0"><p class="progress-panel__title">Certifications</p>';
      container.innerHTML += Object.entries(certs).map(([cert, val]) => {
        const pct = Math.min(100, Number(val) || 0);
        return `<div class="progress-item">
          <div class="progress-item__label">
            <span class="progress-item__name">${escapeHtml(cert.toUpperCase())}</span>
            <span class="progress-item__value">${pct}%</span>
          </div>
          <div class="progress-bar"><div class="progress-bar__fill" style="width:${pct}%"></div></div>
        </div>`;
      }).join('');
    }
  },

  refreshBars() {
    progress.renderProgressBars('portal-progress-bars');
    progress.renderProgressBars('dash-progress');
  },

  wireButtons() {
    document.querySelectorAll('[data-lesson]').forEach(btn => {
      const key = btn.dataset.lesson;
      if (progress.isComplete('lessons', key)) {
        btn.textContent = '✓ Completed';
        btn.classList.add('btn--ghost');
        btn.disabled = true;
      }
      btn.addEventListener('click', () => {
        progress.markComplete('lessons', key);
        btn.textContent = '✓ Completed';
        btn.classList.add('btn--ghost');
        btn.disabled = true;
      });
    });
  },
};

window.progress = progress;
