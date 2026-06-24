const auth = {
  async login(email, password) {
    const user = store.getUserByEmail(email);
    if (!user) return { ok: false, msg: 'No account found with that email.' };
    const valid = await verifyHash(password, user.passwordHash);
    if (!valid) return { ok: false, msg: 'Incorrect password.' };

    // Migrate legacy btoa hash to SHA-256 on first successful login
    if (!user.passwordHash.startsWith('sha256:')) {
      user.passwordHash = await hashString(password);
      store.saveUser(user);
    }

    store.setSession(user.id);
    return { ok: true, user };
  },

  async signup(name, email, password, confirmPassword) {
    if (!name || !email || !password) return { ok: false, msg: 'All fields are required.' };

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      return { ok: false, msg: 'Please enter a valid email address.' };
    }

    if (password.length < 8) return { ok: false, msg: 'Password must be at least 8 characters.' };
    if (!/[A-Z]/.test(password)) return { ok: false, msg: 'Password must include at least one uppercase letter.' };
    if (!/[0-9]/.test(password)) return { ok: false, msg: 'Password must include at least one number.' };

    if (confirmPassword !== undefined && password !== confirmPassword) {
      return { ok: false, msg: 'Passwords do not match.' };
    }

    if (store.getUserByEmail(email)) return { ok: false, msg: 'An account with that email already exists.' };

    const user = {
      id: generateId(),
      name: name.trim(),
      email: email.toLowerCase().trim(),
      passwordHash: await hashString(password),
      isAdmin: false,
      createdAt: new Date().toISOString(),
    };
    store.saveUser(user);
    store.setSession(user.id);
    return { ok: true, user };
  },

  logout() {
    store.clearSession();
    const d = parseInt(document.documentElement.dataset.depth || '1', 10);
    const base = ('../'.repeat(d - 1) || './').replace(/\/$/, '') || '.';
    window.location.href = base + '/auth/login.html';
  },

  requireAuth() {
    if (!store.currentUser()) {
      const d = parseInt(document.documentElement.dataset.depth || '1', 10);
      const base = ('../'.repeat(d - 1) || './').replace(/\/$/, '') || '.';
      window.location.href = base + '/auth/login.html';
      return false;
    }
    return true;
  },

  requireAdmin() {
    const user = store.currentUser();
    const d = parseInt(document.documentElement.dataset.depth || '1', 10);
    const base = ('../'.repeat(d - 1) || './').replace(/\/$/, '') || '.';
    if (!user) {
      // Not logged in → go to login page
      window.location.href = base + '/auth/login.html';
      return false;
    }
    if (!user.isAdmin) {
      // Logged in but not admin → redirect to dashboard, not login (prevents redirect loop)
      window.location.href = base + '/auth/dashboard.html?err=admin';
      return false;
    }
    return true;
  },
};

window.auth = auth;
