const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

function debounce(fn, ms = 300) {
  let t;
  return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), ms); };
}

function generateId() {
  return Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
}

// Escape HTML special chars — apply to every user-supplied string before innerHTML injection
function escapeHtml(s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// SHA-256 via Web Crypto (async). New accounts use "sha256:<hex>" prefix.
async function _sha256hex(str) {
  const enc = new TextEncoder();
  const buf = await crypto.subtle.digest('SHA-256', enc.encode(str));
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
}

// Legacy btoa path kept only to support existing stored passwords during migration
function _legacyHash(str) {
  return btoa(encodeURIComponent(str));
}

async function hashString(str) {
  return 'sha256:' + await _sha256hex(str);
}

// Handles both legacy btoa hashes and new sha256: hashes for seamless migration
async function verifyHash(str, hash) {
  if (!hash) return false;
  if (hash.startsWith('sha256:')) {
    return ('sha256:' + await _sha256hex(str)) === hash;
  }
  return _legacyHash(str) === hash;
}

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

function depth() {
  return parseInt(document.documentElement.dataset.depth || '1', 10);
}

function assetPath(rel) {
  const prefix = '../'.repeat(depth());
  return prefix + rel;
}

function showToast(msg, type = 'info') {
  const existing = $('#itu-toast');
  if (existing) existing.remove();
  const el = document.createElement('div');
  el.id = 'itu-toast';
  el.className = `toast toast--${type}`;
  el.textContent = msg;
  document.body.appendChild(el);
  setTimeout(() => el.classList.add('toast--visible'), 10);
  setTimeout(() => { el.classList.remove('toast--visible'); setTimeout(() => el.remove(), 300); }, 3000);
}

function createElement(tag, attrs = {}, ...children) {
  const el = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (k === 'class') el.className = v;
    else if (k === 'html') el.innerHTML = v;
    else el.setAttribute(k, v);
  }
  children.forEach(c => el.appendChild(typeof c === 'string' ? document.createTextNode(c) : c));
  return el;
}

window.$ = $;
window.$$ = $$;
window.debounce = debounce;
window.generateId = generateId;
window.escapeHtml = escapeHtml;
window.hashString = hashString;
window.verifyHash = verifyHash;
window.formatDate = formatDate;
window.assetPath = assetPath;
window.showToast = showToast;
window.createElement = createElement;
