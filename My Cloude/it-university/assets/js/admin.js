const admin = {
  renderUserTable(containerId) {
    // Guard: only admins may render this table
    const me = store.currentUser();
    if (!me || !me.isAdmin) { showToast('Unauthorized', 'warning'); return; }

    const el = document.getElementById(containerId);
    if (!el) return;
    const users = store.getUsers();
    if (!users.length) { el.innerHTML = '<p style="color:var(--text-muted)">No users yet.</p>'; return; }

    el.innerHTML = `
      <div class="table-wrap">
        <table>
          <thead><tr>
            <th>Name</th><th>Email</th><th>Admin</th><th>Joined</th><th>Action</th>
          </tr></thead>
          <tbody>
            ${users.map(u => {
              // Escape all user-supplied strings before injecting into innerHTML
              const safeName  = escapeHtml(u.name);
              const safeEmail = escapeHtml(u.email);
              const safeId    = escapeHtml(u.id);
              const isRoot    = u.email === 'admin@itu.local';
              return `
              <tr>
                <td>${safeName}</td>
                <td style="font-family:var(--font-mono);font-size:var(--text-xs)">${safeEmail}</td>
                <td>${u.isAdmin ? '<span class="badge badge--accent">Admin</span>' : '<span class="badge">User</span>'}</td>
                <td style="color:var(--text-muted);font-size:var(--text-xs)">${formatDate(u.createdAt)}</td>
                <td>${isRoot ? '—' : `<button class="btn btn--danger btn--sm" data-uid="${safeId}">Delete</button>`}</td>
              </tr>`;
            }).join('')}
          </tbody>
        </table>
      </div>`;

    // Wire delete buttons via data attribute — avoids onclick attribute injection
    el.querySelectorAll('button[data-uid]').forEach(btn => {
      btn.addEventListener('click', () => admin.deleteUser(btn.dataset.uid));
    });
  },

  deleteUser(id) {
    // Guard: only admins may delete users
    const me = store.currentUser();
    if (!me || !me.isAdmin) { showToast('Unauthorized', 'warning'); return; }
    if (!confirm('Delete this user? This cannot be undone.')) return;
    store.deleteUser(id);
    showToast('User deleted', 'success');
    admin.renderUserTable('users-table');
  },

  renderScoreTable(containerId) {
    const me = store.currentUser();
    if (!me || !me.isAdmin) { showToast('Unauthorized', 'warning'); return; }

    const el = document.getElementById(containerId);
    if (!el) return;
    const board = store.getLeaderboard();
    if (!board.length) { el.innerHTML = '<p style="color:var(--text-muted)">No quiz scores yet.</p>'; return; }
    el.innerHTML = `
      <div class="table-wrap">
        <table>
          <thead><tr><th>#</th><th>Name</th><th>Portal</th><th>Score</th><th>Date</th></tr></thead>
          <tbody>
            ${board.map((e, i) => `
              <tr>
                <td style="font-family:var(--font-mono);color:var(--text-muted)">${i + 1}</td>
                <td>${escapeHtml(e.name)}</td>
                <td><span class="badge">${escapeHtml(e.portal)}</span></td>
                <td style="color:var(--accent);font-weight:700;font-family:var(--font-mono)">${e.score}%</td>
                <td style="color:var(--text-muted);font-size:var(--text-xs)">${formatDate(e.date)}</td>
              </tr>`).join('')}
          </tbody>
        </table>
      </div>`;
  },

  renderStats(containerId) {
    const el = document.getElementById(containerId);
    if (!el) return;
    const users = store.getUsers();
    const board = store.getLeaderboard();
    el.innerHTML = `
      <div class="grid-4">
        <div class="stat-card"><div class="stat-card__value">${users.length}</div><div class="stat-card__label">Total Users</div></div>
        <div class="stat-card"><div class="stat-card__value">${board.length}</div><div class="stat-card__label">Quiz Attempts</div></div>
        <div class="stat-card"><div class="stat-card__value">${users.filter(u=>u.isAdmin).length}</div><div class="stat-card__label">Admins</div></div>
        <div class="stat-card"><div class="stat-card__value">${board.length ? Math.round(board.reduce((s,e)=>s+e.score,0)/board.length) : 0}%</div><div class="stat-card__label">Avg Quiz Score</div></div>
      </div>`;
  },
};

window.admin = admin;
