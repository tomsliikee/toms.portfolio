import './style.css'
import profilePicUrl from './assets/Thomas_Haiden.png'

const codeSnippets = `
// --- BINARY SEARCH TREE ---
struct Node* search(struct Node* root, int key) {
    if (root == NULL || root->key == key) return root;
    if (root->key < key) return search(root->right, key);
    return search(root->left, key);
}

// --- LINKED LIST ---
void push(struct Node** head, int val) {
    struct Node* new_node = malloc(sizeof(struct Node));
    new_node->data = val;
    new_node->next = (*head);
    (*head) = new_node;
}

// --- STACK POP ---
int pop(struct Stack* stack) {
    if (isEmpty(stack)) return INT_MIN;
    return stack->array[stack->top--];
}

// --- HASH FUNCTION ---
unsigned int hash(char *str) {
    unsigned int h = 5381;
    int c;
    while ((c = *str++)) h = ((h << 5) + h) + c;
    return h;
}

// --- QUEUE ENQUEUE ---
void enqueue(struct Queue* q, int k) {
    struct QNode* temp = newNode(k);
    if (q->rear == NULL) {
        q->front = q->rear = temp;
        return;
    }
    q->rear->next = temp;
    q->rear = temp;
}

// --- REPEATING FOR WATERFALL EFFECT ---
struct Node* search(struct Node* root, int key) {
    if (root == NULL || root->key == key) return root;
    if (root->key < key) return search(root->right, key);
    return search(root->left, key);
}
`;

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

      <!-- EXPERIENCE SECTION - SPACEY -->
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
              <p class="company">Tourism School Semmering — Event Management & Sales (Honors)</p>
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

      <!-- SKILLS SECTION - 6 BOXES -->
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

      <!-- CONTACT SECTION - BOXED -->
      <section id="contact">
        <div class="contact-card">
          <span class="section-tag">03 / CONTACT</span>
          <h1 style="margin: 2rem 0; font-family: var(--font-serif); font-weight: 400;">Ready for the next <br>extraordinary challenge.</h1>
          <div class="contact-links">
            <a href="mailto:thomashaiden17@gmail.com" class="contact-link">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 1rem; vertical-align: middle;"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              EMAIL: thomashaiden17@gmail.com
            </a>
            <a href="https://github.com/tomsliikee" target="_blank" class="contact-link">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 1rem; vertical-align: middle;"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
              GITHUB: tomsliikee
            </a>
            <span class="contact-link" style="border:none; cursor: default;">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 1rem; vertical-align: middle;"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              LOCATION: Near Wr. Neustadt, Austria
            </span>
          </div>
        </div>

        <!-- WATERFALL CODE SECTION -->
        <div class="code-section" id="code-section">
          <div class="code-chapters">
            <div class="chapter-link" data-jump="0">BST [0]</div>
            <div class="chapter-link" data-jump="150">LINKED LIST [1]</div>
            <div class="chapter-link" data-jump="300">STACK [2]</div>
            <div class="chapter-link" data-jump="450">HASH [3]</div>
            <div class="chapter-link" data-jump="600">QUEUE [4]</div>
          </div>
          <div class="waterfall-container" id="waterfall-container">
            <pre><code>${codeSnippets.replace(/<span/g, '&lt;span').replace(/<\/span>/g, '&lt;/span&gt;').replace(/struct/g, '<span class="keyword">struct</span>').replace(/int/g, '<span class="type">int</span>').replace(/void/g, '<span class="type">void</span>').replace(/\/\/.*/g, (m) => `<span class="comment">${m}</span>`)}</code></pre>
            <pre><code>${codeSnippets.replace(/<span/g, '&lt;span').replace(/<\/span>/g, '&lt;/span&gt;').replace(/struct/g, '<span class="keyword">struct</span>').replace(/int/g, '<span class="type">int</span>').replace(/void/g, '<span class="type">void</span>').replace(/\/\/.*/g, (m) => `<span class="comment">${m}</span>`)}</code></pre>
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

// 2. BOUNCY CURSOR
const cursor = document.getElementById('custom-cursor')!;
let cursorX = 0, cursorY = 0;
let targetX = 0, targetY = 0;
const speed = 0.25;
window.addEventListener('mousemove', (e) => { targetX = e.clientX; targetY = e.clientY; });
window.addEventListener('mousedown', () => cursor.classList.add('clicking'));
window.addEventListener('mouseup', () => cursor.classList.remove('clicking'));
function updateCursor() {
  cursorX += (targetX - cursorX) * speed;
  cursorY += (targetY - cursorY) * speed;
  cursor.style.transform = `translate(${cursorX - 6}px, ${cursorY - 6}px)`;
  requestAnimationFrame(updateCursor);
}
updateCursor();
document.querySelectorAll('a, button, .card, .pop-bubble, .chapter-link').forEach(el => {
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

// 4. CANVAS BACKGROUND
const canvas = document.getElementById('bg-canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d')!;
let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;
window.addEventListener('resize', () => { width = canvas.width = window.innerWidth; height = canvas.height = window.innerHeight; });
const dots: {x: number, y: number}[] = [];
const spacing = 50;
const mouse = { x: -1000, y: -1000 };
for (let x = 0; x < width + spacing; x += spacing) {
  for (let y = 0; y < height + spacing; y += spacing) dots.push({ x, y });
}
window.addEventListener('mousemove', (e) => { mouse.x = e.clientX; mouse.y = e.clientY; });
window.addEventListener('touchmove', (e) => { mouse.x = e.touches[0].clientX; mouse.y = e.touches[0].clientY; });
function animate() {
  ctx.clearRect(0, 0, width, height);
  const isFocusMode = document.body.classList.contains('focus-mode');
  const isDarkTheme = document.body.getAttribute('data-theme') === 'dark';
  
  if (isFocusMode) {
    ctx.fillStyle = 'rgba(255, 255, 255, 0.4)'; // Brighter dots on sage
  } else {
    ctx.fillStyle = isDarkTheme ? 'rgba(143, 160, 143, 0.35)' : 'rgba(125, 140, 125, 0.35)';
  }
  
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

// 5. FIDGET & REVEAL
const fidgetTrigger = document.getElementById('fidget-trigger')!;
const fidgetModal = document.getElementById('fidget-modal')!;
fidgetTrigger.addEventListener('click', () => fidgetModal.classList.toggle('active'));
document.getElementById('fidget-close')!.addEventListener('click', () => fidgetModal.classList.remove('active'));
document.querySelectorAll('.pop-bubble').forEach(b => b.addEventListener('click', () => {
  b.classList.toggle('popped');
  setTimeout(() => b.classList.remove('popped'), 2000);
}));
window.addEventListener('keydown', (e) => { if (e.key === 'Escape') fidgetModal.classList.remove('active'); });

// --- FOCUS MODE OBSERVER ---
const codeSection = document.getElementById('code-section')!;
const waterfall = document.getElementById('waterfall-container')!;

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => { 
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
    
    // Detect if code section is taking over viewport
    if (entry.target.id === 'code-section') {
      if (entry.intersectionRatio > 0.6) {
        entry.target.classList.add('focus-mode');
        document.body.classList.add('focus-mode');
      } else {
        entry.target.classList.remove('focus-mode');
        document.body.classList.remove('focus-mode');
      }
    }
  });
}, { threshold: [0, 0.2, 0.4, 0.6, 0.8, 1.0] });

document.querySelectorAll('section, .code-section').forEach(sec => observer.observe(sec));

// --- CHAPTER JUMPS ---
document.querySelectorAll('.chapter-link').forEach(link => {
  link.addEventListener('click', (e) => {
    const jump = (e.target as HTMLElement).dataset.jump;
    waterfall.style.animation = 'none';
    waterfall.style.transform = `translateY(-${jump}px)`;
  });
});
