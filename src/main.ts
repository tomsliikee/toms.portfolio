import './style.css'
import profilePicUrl from './assets/Thomas_Haiden.png'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
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
        <button class="theme-toggle mobile-only" id="theme-toggle-nav" style="background:none; border:none; padding:0; cursor:pointer; color:var(--text-primary);">
           <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
        </button>
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

// THEME TOGGLE
const themeToggles = document.querySelectorAll('.theme-toggle');
let isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
if (isDark) document.body.setAttribute('data-theme', 'dark');

themeToggles.forEach(toggle => {
  toggle.addEventListener('click', () => {
    isDark = !isDark;
    isDark ? document.body.setAttribute('data-theme', 'dark') : document.body.removeAttribute('data-theme');
  });
});

// SCROLL INDICATORS
const progressBar = document.getElementById('progress-bar');
const navbar = document.getElementById('navbar')!;

window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.body.scrollHeight - window.innerHeight;
  
  if (progressBar) {
    const container = progressBar.parentElement!;
    const scrollPercent = scrollTop / docHeight;
    const maxTop = container.clientHeight - progressBar.clientHeight;
    progressBar.style.top = `${scrollPercent * maxTop}px`;
  }

  if (scrollTop > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// FIDGET GAME LOGIC
const fidgetTrigger = document.getElementById('fidget-trigger')!;
const fidgetModal = document.getElementById('fidget-modal')!;
const fidgetClose = document.getElementById('fidget-close')!;
const bubbles = document.querySelectorAll('.pop-bubble');

fidgetTrigger.addEventListener('click', () => fidgetModal.classList.toggle('active'));
fidgetClose.addEventListener('click', () => fidgetModal.classList.remove('active'));

bubbles.forEach(bubble => {
  bubble.addEventListener('click', () => {
    bubble.classList.toggle('popped');
    setTimeout(() => bubble.classList.remove('popped'), 2000);
  });
});

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') fidgetModal.classList.remove('active');
});

// CANVAS BACKGROUND
const canvas = document.getElementById('bg-canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d')!;
let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
});

const dots: {x: number, y: number}[] = [];
const spacing = 50;
const mouse = { x: -1000, y: -1000 };

for (let x = 0; x < width + spacing; x += spacing) {
  for (let y = 0; y < height + spacing; y += spacing) {
    dots.push({ x, y });
  }
}

window.addEventListener('mousemove', (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

window.addEventListener('touchmove', (e) => {
  mouse.x = e.touches[0].clientX;
  mouse.y = e.touches[0].clientY;
});

function animate() {
  ctx.clearRect(0, 0, width, height);
  const isDarkTheme = document.body.getAttribute('data-theme') === 'dark';
  ctx.fillStyle = isDarkTheme ? 'rgba(255, 255, 255, 0.25)' : 'rgba(0, 0, 0, 0.25)';

  dots.forEach(dot => {
    const dx = mouse.x - dot.x;
    const dy = mouse.y - dot.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const maxDist = 180;
    let size = 1.2;

    if (dist < maxDist) {
      size = 1.2 + (maxDist - dist) / 20;
    }

    ctx.beginPath();
    ctx.arc(dot.x, dot.y, size, 0, Math.PI * 2);
    ctx.fill();
  });
  requestAnimationFrame(animate);
}
animate();

// REVEAL
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.1 });
document.querySelectorAll('section').forEach(sec => observer.observe(sec));
