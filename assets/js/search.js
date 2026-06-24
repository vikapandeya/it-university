const search = {
  index: [
    // ── IT Encyclopedia ──────────────────────────────────────────────────────
    { title: 'OSI Model', portal: 'IT Encyclopedia', section: 'Networking', url: 'ultimate-it/index.html#networking', keywords: 'osi layers tcp ip model networking' },
    { title: 'TCP/IP Protocol Suite', portal: 'IT Encyclopedia', section: 'Networking', url: 'ultimate-it/index.html#networking', keywords: 'tcp ip protocol suite networking' },
    { title: 'DNS — Domain Name System', portal: 'IT Encyclopedia', section: 'Networking', url: 'ultimate-it/index.html#networking', keywords: 'dns domain name system resolution' },
    { title: 'DHCP — Dynamic Host Config', portal: 'IT Encyclopedia', section: 'Networking', url: 'ultimate-it/index.html#networking', keywords: 'dhcp dynamic host configuration protocol ip' },
    { title: 'VPN — Virtual Private Network', portal: 'IT Encyclopedia', section: 'Networking', url: 'ultimate-it/index.html#networking', keywords: 'vpn virtual private network tunnel' },
    { title: 'Linux Operating System', portal: 'IT Encyclopedia', section: 'Operating Systems', url: 'ultimate-it/index.html#os', keywords: 'linux os kernel operating system' },
    { title: 'Python Programming', portal: 'IT Encyclopedia', section: 'Programming', url: 'ultimate-it/index.html#programming', keywords: 'python programming language scripting' },
    { title: 'MySQL Database', portal: 'IT Encyclopedia', section: 'Databases', url: 'ultimate-it/index.html#databases', keywords: 'mysql relational database sql' },
    { title: 'MongoDB — Document Database', portal: 'IT Encyclopedia', section: 'Databases', url: 'ultimate-it/index.html#databases', keywords: 'mongodb nosql document database' },
    // ── DevOps & Cloud ───────────────────────────────────────────────────────
    { title: 'Docker Fundamentals', portal: 'DevOps & Cloud', section: 'Containers', url: 'devops-cloud/index.html#docker', keywords: 'docker container image build run devops' },
    { title: 'Kubernetes Cluster Setup', portal: 'DevOps & Cloud', section: 'Kubernetes', url: 'devops-cloud/index.html#kubernetes', keywords: 'kubernetes k8s cluster pods deployment' },
    { title: 'Terraform Infrastructure as Code', portal: 'DevOps & Cloud', section: 'IaC', url: 'devops-cloud/index.html#terraform', keywords: 'terraform iac infrastructure code aws cloud' },
    { title: 'CI/CD with GitHub Actions', portal: 'DevOps & Cloud', section: 'CI/CD', url: 'devops-cloud/index.html#cicd', keywords: 'cicd github actions pipeline automation' },
    { title: 'Jenkins Pipeline Setup', portal: 'DevOps & Cloud', section: 'CI/CD', url: 'devops-cloud/index.html#cicd', keywords: 'jenkins ci cd pipeline build deploy' },
    { title: 'Helm — Kubernetes Package Manager', portal: 'DevOps & Cloud', section: 'Kubernetes', url: 'devops-cloud/index.html#kubernetes', keywords: 'helm kubernetes charts package manager' },
    { title: 'ArgoCD — GitOps', portal: 'DevOps & Cloud', section: 'Advanced', url: 'devops-cloud/index.html#advanced', keywords: 'argocd gitops continuous delivery kubernetes' },
    // ── Cybersecurity ────────────────────────────────────────────────────────
    { title: 'SQL Injection Attack & Defense', portal: 'Cybersecurity & VAPT', section: 'Web Security', url: 'cybersecurity-vapt/index.html#web-security', keywords: 'sql injection sqli web security owasp' },
    { title: 'XSS — Cross-Site Scripting', portal: 'Cybersecurity & VAPT', section: 'Web Security', url: 'cybersecurity-vapt/index.html#web-security', keywords: 'xss cross site scripting web vulnerability' },
    { title: 'CSRF — Cross-Site Request Forgery', portal: 'Cybersecurity & VAPT', section: 'Web Security', url: 'cybersecurity-vapt/index.html#web-security', keywords: 'csrf cross site request forgery web' },
    { title: 'Nmap Network Scanner', portal: 'Cybersecurity & VAPT', section: 'Tools', url: 'cybersecurity-vapt/index.html#tools', keywords: 'nmap network scanner port scanning recon' },
    { title: 'Burp Suite Web Proxy', portal: 'Cybersecurity & VAPT', section: 'Tools', url: 'cybersecurity-vapt/index.html#tools', keywords: 'burp suite proxy web security testing' },
    { title: 'VAPT Methodology', portal: 'Cybersecurity & VAPT', section: 'VAPT', url: 'cybersecurity-vapt/index.html#vapt', keywords: 'vapt penetration testing methodology recon exploit' },
    // ── Linux ────────────────────────────────────────────────────────────────
    { title: 'Linux Command Line Basics', portal: 'Linux Admin', section: 'Basics', url: 'linux-administration/index.html#basics', keywords: 'linux commands cli bash terminal' },
    { title: 'LVM — Logical Volume Manager', portal: 'Linux Admin', section: 'Storage', url: 'linux-administration/index.html#storage', keywords: 'lvm logical volume manager disk storage linux' },
    { title: 'RAID — Disk Redundancy', portal: 'Linux Admin', section: 'Storage', url: 'linux-administration/index.html#storage', keywords: 'raid disk redundancy array storage' },
    { title: 'SSH Configuration', portal: 'Linux Admin', section: 'Networking', url: 'linux-administration/index.html#networking', keywords: 'ssh secure shell config key auth' },
    { title: 'Nginx Web Server Setup', portal: 'Linux Admin', section: 'Services', url: 'linux-administration/index.html#services', keywords: 'nginx web server reverse proxy linux' },
    { title: 'SELinux Security Module', portal: 'Linux Admin', section: 'Security', url: 'linux-administration/index.html#security', keywords: 'selinux security enforcing permissive linux' },
    // ── AWS ──────────────────────────────────────────────────────────────────
    { title: 'AWS IAM — Identity & Access', portal: 'AWS Learning', section: 'Core Services', url: 'aws-learning/index.html#iam', keywords: 'aws iam identity access management roles policies' },
    { title: 'AWS EC2 — Virtual Machines', portal: 'AWS Learning', section: 'Core Services', url: 'aws-learning/index.html#ec2', keywords: 'aws ec2 virtual machine instance compute' },
    { title: 'AWS VPC — Virtual Network', portal: 'AWS Learning', section: 'Networking', url: 'aws-learning/index.html#vpc', keywords: 'aws vpc virtual private cloud subnet networking' },
    { title: 'AWS S3 — Object Storage', portal: 'AWS Learning', section: 'Storage', url: 'aws-learning/index.html#s3', keywords: 'aws s3 object storage bucket files' },
    { title: 'AWS Lambda — Serverless', portal: 'AWS Learning', section: 'Serverless', url: 'aws-learning/index.html#lambda', keywords: 'aws lambda serverless functions faas' },
    { title: 'AWS EKS — Managed Kubernetes', portal: 'AWS Learning', section: 'Containers', url: 'aws-learning/index.html#containers', keywords: 'aws eks kubernetes managed containers' },
    // ── AI & Prompting ───────────────────────────────────────────────────────
    { title: 'Large Language Models (LLMs)', portal: 'AI & Prompting', section: 'Fundamentals', url: 'ai-prompt-engineering/index.html#llms', keywords: 'llm large language model gpt claude gemini' },
    { title: 'Prompt Engineering — Zero-Shot', portal: 'AI & Prompting', section: 'Prompting', url: 'ai-prompt-engineering/index.html#prompting', keywords: 'zero shot prompt engineering no examples' },
    { title: 'Few-Shot Prompting', portal: 'AI & Prompting', section: 'Prompting', url: 'ai-prompt-engineering/index.html#prompting', keywords: 'few shot prompting examples in context learning' },
    { title: 'Chain-of-Thought Prompting', portal: 'AI & Prompting', section: 'Prompting', url: 'ai-prompt-engineering/index.html#prompting', keywords: 'chain of thought cot reasoning step by step' },
    { title: 'RAG — Retrieval Augmented Generation', portal: 'AI & Prompting', section: 'Advanced', url: 'ai-prompt-engineering/index.html#rag', keywords: 'rag retrieval augmented generation vector db embedding' },
    { title: 'LangChain Framework', portal: 'AI & Prompting', section: 'Agents', url: 'ai-prompt-engineering/index.html#agents', keywords: 'langchain framework llm agents chains' },
    { title: 'Ollama — Self-Hosted AI', portal: 'AI & Prompting', section: 'Self-Hosted', url: 'ai-prompt-engineering/index.html#self-hosted', keywords: 'ollama self hosted llama local ai model' },
    // ── Online IDE & Dev Tools ───────────────────────────────────────────────
    { title: 'Online IDE — Run Code in Browser', portal: 'Online IDE & Tools', section: 'IDE', url: 'tools-ide/index.html#ide', keywords: 'online ide code editor python javascript run execute browser' },
    { title: 'Git — Version Control Deep Dive', portal: 'Online IDE & Tools', section: 'Git', url: 'tools-ide/index.html#git', keywords: 'git version control commit branch merge rebase workflow' },
    { title: 'Keyboard Shortcuts — Productivity', portal: 'Online IDE & Tools', section: 'Shortcuts', url: 'tools-ide/index.html#shortcuts', keywords: 'keyboard shortcuts hotkeys productivity vscode terminal' },
    { title: 'File Management & Filesystem', portal: 'Online IDE & Tools', section: 'File Management', url: 'tools-ide/index.html#file-management', keywords: 'file management filesystem permissions chmod find grep' },
    { title: 'Regex — Regular Expressions', portal: 'Online IDE & Tools', section: 'Regex', url: 'tools-ide/index.html#regex', keywords: 'regex regular expressions pattern matching search replace' },
    // ── Computer Basics & Office ─────────────────────────────────────────────
    { title: 'Computer Hardware Fundamentals', portal: 'Computer Basics', section: 'Hardware', url: 'computer-basics/index.html#hardware', keywords: 'computer hardware cpu ram motherboard storage hdd ssd' },
    { title: 'Operating System Concepts', portal: 'Computer Basics', section: 'OS', url: 'computer-basics/index.html#os-concepts', keywords: 'operating system os windows linux process memory management' },
    { title: 'Microsoft Office — Word Excel PowerPoint', portal: 'Computer Basics', section: 'MS Office', url: 'computer-basics/index.html#ms-office', keywords: 'microsoft office word excel powerpoint productivity suite' },
    { title: 'Internet & Web Fundamentals', portal: 'Computer Basics', section: 'Internet', url: 'computer-basics/index.html#internet', keywords: 'internet www http https browser email protocol web' },
    { title: 'Data Science Introduction', portal: 'Computer Basics', section: 'Data Science', url: 'computer-basics/index.html#data-science', keywords: 'data science python pandas numpy matplotlib analysis' },
    { title: 'IT Glossary A-Z', portal: 'Computer Basics', section: 'Glossary', url: 'computer-basics/index.html#glossary', keywords: 'glossary terminology it definitions dictionary' },
    // ── Hub pages ────────────────────────────────────────────────────────────
    { title: 'Interview Questions Hub', portal: 'Resources', section: 'Interview Prep', url: 'interview-questions/index.html', keywords: 'interview questions devops kubernetes docker aws linux security' },
    { title: 'Certification Roadmaps', portal: 'Resources', section: 'Roadmaps', url: 'roadmaps/index.html', keywords: 'certification roadmap ceh cissp aws cka rhcsa path guide' },
    { title: 'Hands-on Labs', portal: 'Resources', section: 'Labs', url: 'labs/index.html', keywords: 'hands on labs practice exercises docker kubernetes terraform linux' },
  ],

  query(q) {
    if (!q || q.trim().length < 2) return [];
    const terms = q.toLowerCase().trim().split(/\s+/);
    return search.index
      .filter(item => {
        const haystack = (item.title + ' ' + item.portal + ' ' + item.section + ' ' + item.keywords).toLowerCase();
        return terms.every(t => haystack.includes(t));
      })
      .slice(0, 12);
  },

  renderOverlay(results, overlayId, query) {
    const el = document.getElementById(overlayId);
    if (!el) return;
    // Escape query before injecting — prevents reflected XSS
    const safeQuery = typeof escapeHtml === 'function' ? escapeHtml(query) : query.replace(/</g, '&lt;');
    if (!results.length) {
      el.innerHTML = `<div style="padding:var(--gap);color:var(--text-muted);text-align:center">No results for "<strong>${safeQuery}</strong>"</div>`;
      el.classList.add('open');
      return;
    }

    const d = parseInt(document.documentElement.dataset.depth || '1', 10);
    const base = ('../'.repeat(d - 1) || './').replace(/\/$/, '') || '.';

    el.innerHTML = results.map(r => `
      <a class="search-result" href="${base}/${r.url}">
        <div class="search-result__title">${escapeHtml(r.title)}</div>
        <div class="search-result__meta"><span class="search-result__portal">${escapeHtml(r.portal)}</span> &middot; ${escapeHtml(r.section)}</div>
      </a>`).join('');
    el.classList.add('open');
  },

  _bound: false,

  init() {
    // Guard against double-registration (DOMContentLoaded + partials.js both call init)
    if (search._bound) return;
    const input = document.getElementById('global-search');
    const overlay = document.getElementById('search-overlay');
    if (!input || !overlay) return;
    search._bound = true;

    const doSearch = debounce(function() {
      const q = input.value;
      if (!q.trim()) { overlay.classList.remove('open'); return; }
      const results = search.query(q);
      search.renderOverlay(results, 'search-overlay', q);
    }, 250);

    input.addEventListener('input', doSearch);
    input.addEventListener('focus', doSearch);

    document.addEventListener('click', function(e) {
      if (!input.contains(e.target) && !overlay.contains(e.target)) {
        overlay.classList.remove('open');
      }
    });

    input.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') { overlay.classList.remove('open'); input.blur(); }
    });
  },
};

window.search = search;

// Primary registration; partials.js also calls search.init() after header injection.
// The _bound guard ensures only one listener set is ever registered.
document.addEventListener('DOMContentLoaded', () => search.init());
