const K = {
  USERS:       'itu__users',
  SESSION:     'itu__session',
  PROGRESS:    'itu__progress',
  LEADERBOARD: 'itu__leaderboard',
  SEARCH_IDX:  'itu__search_index',
};

function _read(key) {
  try { return JSON.parse(localStorage.getItem(key)); } catch { return null; }
}

function _write(key, val) {
  try {
    localStorage.setItem(key, JSON.stringify(val));
  } catch (e) {
    // QuotaExceededError or storage disabled in private browsing
    console.warn('ITU storage write failed:', e);
    if (typeof showToast === 'function') {
      showToast('Storage full — some progress may not be saved.', 'warning');
    }
  }
}

// Allowlisted portal IDs — validated before any fetch that uses portalId in the URL
const VALID_PORTALS = [
  'ultimate-it', 'devops-cloud', 'cybersecurity-vapt',
  'linux-administration', 'aws-learning', 'ai-prompt-engineering',
  'tools-ide', 'computer-basics',
];

const store = {
  VALID_PORTALS,

  /* ── Users ─────────────────────────────── */
  getUsers() { return _read(K.USERS) || []; },
  saveUser(user) {
    const users = store.getUsers().filter(u => u.id !== user.id);
    users.push(user);
    _write(K.USERS, users);
  },
  getUserById(id) { return store.getUsers().find(u => u.id === id) || null; },
  getUserByEmail(email) {
    if (!email) return null;
    return store.getUsers().find(u => u.email && u.email.toLowerCase() === email.toLowerCase()) || null;
  },
  deleteUser(id) { _write(K.USERS, store.getUsers().filter(u => u.id !== id)); },

  /* ── Session ────────────────────────────── */
  getSession() { return _read(K.SESSION); },
  setSession(userId) { _write(K.SESSION, userId); },
  clearSession() { try { localStorage.removeItem(K.SESSION); } catch { /* ignore */ } },
  currentUser() {
    const id = store.getSession();
    return id ? store.getUserById(id) : null;
  },

  /* ── Progress ───────────────────────────── */
  getProgress(userId) {
    const all = _read(K.PROGRESS) || {};
    return all[userId] || { lessons: {}, labs: {}, quizzes: {}, certs: {} };
  },
  updateProgress(userId, fn) {
    const all = _read(K.PROGRESS) || {};
    const p = all[userId] || { lessons: {}, labs: {}, quizzes: {}, certs: {} };
    fn(p);
    all[userId] = p;
    _write(K.PROGRESS, all);
  },

  /* ── Leaderboard ────────────────────────── */
  getLeaderboard() { return _read(K.LEADERBOARD) || []; },
  addScore(entry) {
    const board = store.getLeaderboard();
    board.push(entry);
    board.sort((a, b) => b.score - a.score);
    _write(K.LEADERBOARD, board.slice(0, 200));
  },
  getPortalLeaderboard(portal) {
    return store.getLeaderboard().filter(e => e.portal === portal).slice(0, 10);
  },

  /* ── Search Index ───────────────────────── */
  getSearchIndex() { return _read(K.SEARCH_IDX) || []; },
  setSearchIndex(idx) { _write(K.SEARCH_IDX, idx); },

  /* ── Seed ───────────────────────────────── */
  seed() {
    if (store.getUserByEmail('admin@itu.local')) return;
    // Pre-computed SHA-256 of "Admin123!" so seed is synchronous (meets new password policy)
    store.saveUser({
      id: 'admin-001',
      name: 'Admin',
      email: 'admin@itu.local',
      passwordHash: 'sha256:3eb3fe66b31e3b4d10fa70b5cad49c7112294af6ae4e476a1c405155d45aa121',
      isAdmin: true,
      createdAt: new Date().toISOString(),
    });
  },
};

store.seed();
window.store = store;
