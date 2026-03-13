import './style.css'
import profilePicUrl from './assets/Thomas_Haiden.png'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div id="custom-cursor"></div>
  <canvas id="bg-canvas"></canvas>
  
  <aside class="sidebar">
    <button class="theme-toggle" id="theme-toggle-sidebar" aria-label="Toggle Theme">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
    </button>
    
    <span class="sidebar-label">00 — START</span>
    <div class="progress-container">
      <div id="progress-bar" class="progress-bar"></div>
    </div>
    <span class="sidebar-label">04 — END</span>
  </aside>

  <div class="main-content">
    <nav id="navbar">
      <div class="logo">BUILDING EFFICIENT DIGITAL SYSTEMS.</div>
      <div class="nav-links">
        <a href="#about">EXP</a>
        <a href="#skills">SKILLS</a>
        <a href="#contact">CONTACT</a>
      </div>
    </nav>

    <main>
      <section class="hero visible">
        <div class="hero-text">
          <h1>Thomas <br>Haiden</h1>
          <p class="hero-sub">Computer Science student at FH Wr. Neustadt. Born in Austria, focused on C, C++, and elegant system architecture.</p>
          <a href="#contact" class="contact-link" style="margin-top: 3rem; border-bottom: 2px solid var(--accent-color); padding-bottom: 0.5rem; display: inline-block;">Get in touch -></a>
        </div>
        <div class="profile-pic-container">
          <img src="${profilePicUrl}" alt="Thomas Haiden" class="profile-pic" />
        </div>
      </section>

      <section id="about">
        <span class="section-tag">01 / EXPERIENCE & EDUCATION</span>
        
        <div class="exp-container">
          <div class="card">
            <h2 style="margin-bottom: 4rem;">Education</h2>
            <div class="timeline-item">
              <span class="date">Sept 2025 — 2027</span>
              <p class="role">BSc Computer Science</p>
              <p class="company">University of Applied Sciences Wr. Neustadt</p>
            </div>
            <div class="timeline-item">
              <span class="date">2019 — 2024</span>
              <p class="role">Tourism Management</p>
              <p class="company">Tourism School Semmering — Focus on Event Management & Sales (Honors)</p>
            </div>
            <div class="timeline-item">
              <span class="date">2015 — 2019</span>
              <p class="role">Middle School</p>
              <p class="company">Focus: Notebook Class — NMS Schöllerstraße</p>
            </div>
          </div>

          <div class="card">
            <h2 style="margin-bottom: 4rem;">Professional Journey</h2>
            <div class="timeline-item">
              <span class="date">Oct 2024 — June 2025</span>
              <p class="role">Civil Service</p>
              <p class="company">Federal Office for Immigration and Asylum (Wr. Neustadt)</p>
            </div>
            <div class="timeline-item">
              <span class="date">Summer 2022 & 2023</span>
              <p class="role">Front Office Intern</p>
              <p class="company">Parkhotel Hirschwang</p>
            </div>
            <div class="timeline-item">
              <span class="date">Summer 2020 & 2021</span>
              <p class="role">Service Staff</p>
              <p class="company">Lake Restaurant Katamaran — 12-week placements</p>
            </div>
          </div>
        </div>
      </section>

      <section id="skills">
        <span class="section-tag">02 / AQUIRED SKILLS</span>
        <div class="skills-grid">
          <div class="card skill-box">
            <span class="skill-name">C / C++</span>
            <p style="font-size: 0.9rem; opacity: 0.6; margin-top: 1rem;">Core systems and memory-efficient programming.</p>
          </div>
          <div class="card skill-box">
            <span class="skill-name">SQL</span>
            <p style="font-size: 0.9rem; opacity: 0.6; margin-top: 1rem;">Database architecture and relational logic.</p>
          </div>
          <div class="card skill-box">
            <span class="skill-name">Hardware</span>
            <p style="font-size: 0.9rem; opacity: 0.6; margin-top: 1rem;">PC assembly, diagnostics, and component logic.</p>
          </div>
          <div class="card skill-box">
            <span class="skill-name">English</span>
            <p style="font-size: 0.9rem; opacity: 0.6; margin-top: 1rem;">C1/C2 Fluent — Negotiation level proficiency.</p>
          </div>
          <div class="card skill-box">
            <span class="skill-name">Spanish</span>
            <p style="font-size: 0.9rem; opacity: 0.6; margin-top: 1rem;">A2 Basic — Foundational language skills.</p>
          </div>
          <div class="card skill-box" style="border-style: dashed; opacity: 0.6;">
            <span class="skill-name" style="font-size: 1.1rem; letter-spacing: 2px;">MORE COMING SOON...</span>
          </div>
        </div>
      </section>

      <section id="contact">
        <div class="contact-card">
          <span class="section-tag">03 / CONTACT</span>
          <h1 style="margin: 2rem 0; font-family: var(--font-serif); font-weight: 400;">Ready for the next <br>extraordinary challenge.</h1>
          <div class="contact-links">
            <a href="mailto:thomashaiden17@gmail.com" class="contact-link">EMAIL: thomashaiden17@gmail.com</a>
            <a href="https://github.com/tomsliikee" target="_blank" class="contact-link">GITHUB: tomsliikee</a>
            <span class="contact-link" style="border:none; cursor: default;">LOCATION: Near Wr. Neustadt, Austria</span>
          </div>
        </div>

        <!-- DYNAMIC CODE SLIDESHOW -->
        <div class="code-section">
          <div id="code-container">
             <!-- Dynamic Content -->
          </div>
        </div>
      </section>
    </main>

    <footer>
      <p>
        &copy; 2026 Thomas Haiden. Born 17.02.2005.
        <span id="fidget-trigger" class="fidget-trigger">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/></svg>
        </span>
      </p>
    </footer>
  </div>

  <div id="fidget-modal" class="fidget-modal">
    <div class="fidget-grid" id="fidget-grid">
      ${Array(16).fill('<div class="pop-bubble"></div>').join('')}
    </div>
    <div id="fidget-close" class="fidget-close">CLOSE [ESC]</div>
  </div>
`

// 1. THEME TOGGLE
const themeToggle = document.getElementById('theme-toggle-sidebar')!;
let isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
if (isDark) document.body.setAttribute('data-theme', 'dark');
themeToggle.addEventListener('click', () => {
  isDark = !isDark;
  isDark ? document.body.setAttribute('data-theme', 'dark') : document.body.removeAttribute('data-theme');
});

// 2. SNAPPY BOUNCY CURSOR
const cursor = document.getElementById('custom-cursor')!;
let cursorX = 0, cursorY = 0;
let targetX = 0, targetY = 0;
const speed = 0.25; // Snappier follow

window.addEventListener('mousemove', (e) => {
  targetX = e.clientX;
  targetY = e.clientY;
});

window.addEventListener('mousedown', () => cursor.classList.add('clicking'));
window.addEventListener('mouseup', () => cursor.classList.remove('clicking'));

function updateCursor() {
  cursorX += (targetX - cursorX) * speed;
  cursorY += (targetY - cursorY) * speed;
  cursor.style.transform = `translate(${cursorX - 6}px, ${cursorY - 6}px)`;
  requestAnimationFrame(updateCursor);
}
updateCursor();

const interactables = document.querySelectorAll('a, button, .card, .pop-bubble, .skill-box');
interactables.forEach(el => {
  el.addEventListener('mouseenter', () => cursor.classList.add('hovering'));
  el.addEventListener('mouseleave', () => cursor.classList.remove('hovering'));
});

// 3. SCROLL PROGRESS
const progressBar = document.getElementById('progress-bar')!;
const navbar = document.getElementById('navbar')!;
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.body.scrollHeight - window.innerHeight;
  const scrollPercent = scrollTop / docHeight;
  const maxTop = progressBar.parentElement!.clientHeight - progressBar.clientHeight;
  progressBar.style.top = `${scrollPercent * maxTop}px`;
  scrollTop > 50 ? navbar.classList.add('scrolled') : navbar.classList.remove('scrolled');
});

// 4. CODE SLIDESHOW DATA
const snippets = [
  {
    title: "Binary Search Tree",
    file: "bst_search.c",
    code: `<span class="keyword">struct</span> <span class="type">Node</span>* <span class="keyword">search</span>(<span class="keyword">struct</span> <span class="type">Node</span>* root, <span class="type">int</span> key) {
    <span class="keyword">if</span> (root == <span class="keyword">NULL</span> || root->key == key) <span class="keyword">return</span> root;
    <span class="keyword">if</span> (root->key < key) <span class="keyword">return</span> search(root->right, key);
    <span class="keyword">return</span> search(root->left, key);
}`
  },
  {
    title: "Linked List Insertion",
    file: "linked_list.c",
    code: `<span class="type">void</span> <span class="keyword">push</span>(<span class="keyword">struct</span> <span class="type">Node</span>** head, <span class="type">int</span> val) {
    <span class="keyword">struct</span> <span class="type">Node</span>* new_node = malloc(<span class="keyword">sizeof</span>(<span class="keyword">struct</span> <span class="type">Node</span>));
    new_node->data = val;
    new_node->next = (*head);
    (*head) = new_node;
}`
  },
  {
    title: "Stack Implementation",
    file: "stack_pop.c",
    code: `<span class="type">int</span> <span class="keyword">pop</span>(<span class="keyword">struct</span> <span class="type">Stack</span>* stack) {
    <span class="keyword">if</span> (isEmpty(stack)) <span class="keyword">return</span> <span class="type">INT_MIN</span>;
    <span class="keyword">return</span> stack->array[stack->top--];
}`
  },
  {
    title: "Simple Hash Function",
    file: "hash_map.c",
    code: `<span class="type">unsigned int</span> <span class="keyword">hash</span>(<span class="type">char</span> *str) {
    <span class="type">unsigned int</span> h = 5381;
    <span class="type">int</span> c;
    <span class="keyword">while</span> ((c = *str++)) h = ((h << 5) + h) + c;
    <span class="keyword">return</span> h;
}`
  }
];

let snippetIndex = 0;
const codeContainer = document.getElementById('code-container')!;

function updateSnippet() {
  codeContainer.classList.add('fade');
  setTimeout(() => {
    const s = snippets[snippetIndex];
    codeContainer.innerHTML = `
      <div class="code-header">
        <span>${s.file}</span>
        <span>${s.title}</span>
      </div>
      <pre><code>${s.code}</code></pre>
    `;
    codeContainer.classList.remove('fade');
    snippetIndex = (snippetIndex + 1) % snippets.length;
  }, 400);
}

updateSnippet();
setInterval(updateSnippet, 4000);

// 5. CANVAS & FIDGET
const canvas = document.getElementById('bg-canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d')!;
let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;
const dots: {x: number, y: number}[] = [];
const spacing = 50;
const mouse = { x: -1000, y: -1000 };
for (let x = 0; x < width + spacing; x += spacing) {
  for (let y = 0; y < height + spacing; y += spacing) dots.push({ x, y });
}
window.addEventListener('mousemove', (e) => { mouse.x = e.clientX; mouse.y = e.clientY; });
function animate() {
  ctx.clearRect(0, 0, width, height);
  const isDarkTheme = document.body.getAttribute('data-theme') === 'dark';
  ctx.fillStyle = isDarkTheme ? 'rgba(255, 255, 255, 0.25)' : 'rgba(0, 0, 0, 0.25)';
  dots.forEach(dot => {
    const dx = mouse.x - dot.x;
    const dy = mouse.y - dot.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    let size = (dist < 180) ? 1.2 + (180 - dist) / 20 : 1.2;
    ctx.beginPath(); ctx.arc(dot.x, dot.y, size, 0, Math.PI * 2); ctx.fill();
  });
  requestAnimationFrame(animate);
}
animate();

const fidgetTrigger = document.getElementById('fidget-trigger')!;
const fidgetModal = document.getElementById('fidget-modal')!;
fidgetTrigger.addEventListener('click', () => fidgetModal.classList.toggle('active'));
document.getElementById('fidget-close')!.addEventListener('click', () => fidgetModal.classList.remove('active'));
document.querySelectorAll('.pop-bubble').forEach(b => b.addEventListener('click', () => {
  b.classList.toggle('popped');
  setTimeout(() => b.classList.remove('popped'), 2000);
}));
window.addEventListener('keydown', (e) => { if (e.key === 'Escape') fidgetModal.classList.remove('active'); });
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible'); });
}, { threshold: 0.1 });
document.querySelectorAll('section').forEach(sec => observer.observe(sec));
