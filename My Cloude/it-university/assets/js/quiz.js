const quiz = {
  state: null,

  async init(portalId, containerId) {
    const el = document.getElementById(containerId);
    if (!el) return;

    const d = parseInt(document.documentElement.dataset.depth || '1', 10);
    const base = '../'.repeat(d - 1) || './';

    try {
      const r = await fetch(base + 'quizzes/' + portalId + '.json');
      if (!r.ok) throw new Error('Quiz not found');
      const data = await r.json();
      quiz.state = {
        portalId,
        containerId,
        title: data.title || 'Quiz',
        description: data.description || '',
        questions: data.questions,
        current: 0,
        answers: [],
        score: 0,
        timer: null,
        timeLeft: 0,
      };
      quiz.renderStart(quiz.state.title, quiz.state.description);
    } catch {
      el.innerHTML = `<p style="color:var(--text-muted);text-align:center;padding:var(--gap-lg)">Quiz not available yet. Check back soon!</p>`;
    }
  },

  renderStart(title, desc) {
    const el = document.getElementById(quiz.state.containerId);
    el.innerHTML = `
      <div class="quiz-container">
        <div class="quiz-header">
          <div>
            <div class="quiz-title">${escapeHtml(title)}</div>
            <p style="color:var(--text-muted);font-size:var(--text-sm);margin-top:4px">${escapeHtml(desc)}</p>
          </div>
          <span class="badge badge--accent">${quiz.state.questions.length} questions</span>
        </div>
        <div style="display:flex;gap:var(--gap);flex-wrap:wrap;margin-bottom:var(--gap-lg)">
          <div class="stat-card" style="flex:1;min-width:120px">
            <div class="stat-card__value">${quiz.state.questions.length}</div>
            <div class="stat-card__label">Questions</div>
          </div>
          <div class="stat-card" style="flex:1;min-width:120px">
            <div class="stat-card__value">30s</div>
            <div class="stat-card__label">Per question</div>
          </div>
        </div>
        <button class="btn btn--primary btn--lg" onclick="quiz.start()" style="width:100%;justify-content:center">Start Quiz →</button>
        <div id="leaderboard-section" style="margin-top:var(--gap-xl)"></div>
      </div>`;
    quiz.renderLeaderboard('leaderboard-section');
  },

  start() {
    quiz.state.current = 0;
    quiz.state.answers = [];
    quiz.state.score = 0;
    quiz.renderQuestion();
  },

  renderQuestion() {
    const s = quiz.state;
    const q = s.questions[s.current];
    const el = document.getElementById(s.containerId);
    const pct = Math.round((s.current / s.questions.length) * 100);

    el.innerHTML = `
      <div class="quiz-container">
        <div class="quiz-header">
          <div>
            <div class="quiz-title">Question ${s.current + 1} of ${s.questions.length}</div>
          </div>
          <div class="quiz-timer" id="quiz-timer">30</div>
        </div>
        <div class="quiz-progress">
          <div class="quiz-progress__label">${pct}% complete</div>
          <div class="progress-bar"><div class="progress-bar__fill" style="width:${pct}%"></div></div>
        </div>
        <div class="question-text">${escapeHtml(q.question)}</div>
        <div class="options-list" id="options-list">
          ${q.options.map((opt, i) => `
            <button class="option-btn" onclick="quiz.selectOption(${i})" data-index="${i}">
              <span class="option-key">${String.fromCharCode(65 + i)}</span>
              ${escapeHtml(opt)}
            </button>`).join('')}
        </div>
        <div class="quiz-controls">
          <button class="btn btn--primary" id="next-btn" onclick="quiz.next()" style="display:none">Next →</button>
        </div>
      </div>`;

    quiz.startTimer();
  },

  startTimer() {
    quiz.state.timeLeft = 30;
    clearInterval(quiz.state.timer);
    quiz.state.timer = setInterval(() => {
      quiz.state.timeLeft--;
      const el = document.getElementById('quiz-timer');
      if (el) {
        el.textContent = quiz.state.timeLeft;
        if (quiz.state.timeLeft <= 10) el.classList.add('warning');
      }
      if (quiz.state.timeLeft <= 0) {
        clearInterval(quiz.state.timer);
        quiz.lockOptions(-1);
        const nb = document.getElementById('next-btn');
        if (nb) nb.style.display = 'inline-flex';
      }
    }, 1000);
  },

  selectOption(index) {
    clearInterval(quiz.state.timer);
    const q = quiz.state.questions[quiz.state.current];
    quiz.state.answers.push(index);
    if (index === q.correct) quiz.state.score++;
    quiz.lockOptions(index);
    const nb = document.getElementById('next-btn');
    if (nb) nb.style.display = 'inline-flex';
  },

  lockOptions(selected) {
    const q = quiz.state.questions[quiz.state.current];
    document.querySelectorAll('.option-btn').forEach((btn, i) => {
      btn.disabled = true;
      if (i === q.correct) btn.classList.add('correct');
      else if (i === selected) btn.classList.add('wrong');
    });
  },

  next() {
    quiz.state.current++;
    if (quiz.state.current < quiz.state.questions.length) {
      quiz.renderQuestion();
    } else {
      quiz.renderResults();
    }
  },

  renderResults() {
    clearInterval(quiz.state.timer);
    const s = quiz.state;
    const pct = Math.round((s.score / s.questions.length) * 100);
    const el = document.getElementById(s.containerId);
    const grade = pct >= 80 ? '🏆 Excellent!' : pct >= 60 ? '👍 Good Job!' : '📚 Keep Studying!';

    el.innerHTML = `
      <div class="quiz-container">
        <div class="quiz-results">
          <h2>${grade}</h2>
          <div class="quiz-score-ring">${pct}%</div>
          <p style="margin-bottom:var(--gap-sm)">${s.score} out of ${s.questions.length} correct</p>
          <p style="color:var(--text-muted)">Portal: ${escapeHtml(s.portalId)}</p>
          <div style="display:flex;gap:var(--gap);justify-content:center;margin-top:var(--gap-lg);flex-wrap:wrap">
            <button class="btn btn--primary" onclick="quiz.start()">Retry Quiz</button>
            <button class="btn btn--outline" onclick="quiz.renderStart(quiz.state.title, quiz.state.description)">Back to Start</button>
          </div>
        </div>
        <div id="leaderboard-section" style="margin-top:var(--gap-xl)"></div>
      </div>`;

    // Save score
    const user = store.currentUser();
    const entry = {
      portal: s.portalId,
      userId: user ? user.id : 'guest',
      name: user ? user.name : 'Guest',
      score: pct,
      date: new Date().toISOString(),
    };
    store.addScore(entry);
    if (user) {
      store.updateProgress(user.id, p => {
        p.quizzes[s.portalId] = { score: pct, date: entry.date };
      });
    }
    quiz.renderLeaderboard('leaderboard-section');
  },

  renderLeaderboard(containerId) {
    const el = document.getElementById(containerId);
    if (!el || !quiz.state) return;
    const board = store.getPortalLeaderboard(quiz.state.portalId);
    if (!board.length) {
      el.innerHTML = '<p style="color:var(--text-muted);font-size:var(--text-sm);text-align:center">No scores yet — be the first!</p>';
      return;
    }
    el.innerHTML = `<h3 style="margin-bottom:var(--gap)">Leaderboard</h3>` +
      board.map((e, i) => `
        <div class="leaderboard-entry">
          <span class="leaderboard-entry__rank">${i + 1}</span>
          <span class="leaderboard-entry__name">${escapeHtml(e.name)}</span>
          <span style="color:var(--text-muted);font-size:var(--text-xs)">${formatDate(e.date)}</span>
          <span class="leaderboard-entry__score">${e.score}%</span>
        </div>`).join('');
  },
};

// Clear timer on page navigation to prevent callbacks on detached DOM
window.addEventListener('beforeunload', () => {
  if (quiz.state && quiz.state.timer) clearInterval(quiz.state.timer);
});

window.quiz = quiz;
