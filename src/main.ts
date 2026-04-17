import './style.css'

// 1. CACHED ELEMENTS (Performance: Select once, use many)
const body = document.body;
const progressBar = document.getElementById('progress-bar')!;
const progressBarParent = progressBar.parentElement!;
const navbar = document.getElementById('navbar')!;
const canvas = document.getElementById('bg-canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d', { alpha: true })!;
const fidgetTrigger = document.getElementById('fidget-trigger')!;
const fidgetModal = document.getElementById('fidget-modal')!;
const fidgetClose = document.getElementById('fidget-close')!;
const waterfall = document.getElementById('waterfall-container')!;

// Bento Skill Elements
const memBars = document.querySelectorAll('.mem-bar');
const sqlQuery = document.getElementById('sql-query');
const sigBars = document.querySelectorAll('.sig-bar.active');

// State Tracking
let isFocusMode = false;
const mouse = { x: -1000, y: -1000 };
let frameCount = 0;

// SQL Queries to cycle
const queries = [
  "SELECT * FROM architecture WHERE efficiency > 99;",
  "INSERT INTO skills (name, level) VALUES ('C++', 'Expert');",
  "UPDATE system SET performance = 'OPTIMIZED';",
  "DELETE FROM bugs WHERE existence = true;",
  "JOIN data_streams ON systems.id = streams.id;"
];
let currentQueryIndex = 0;

// Elements for flashlight effect
const flashlightElements = document.querySelectorAll('.card, .contact-card, .code-section, nav, .theme-toggle, .profile-pic-container');

// 2. THEME TOGGLE
const themeToggle = document.getElementById('theme-toggle-sidebar')!;
let isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
if (isDark) body.setAttribute('data-theme', 'dark');

themeToggle.addEventListener('click', () => {
  isDark = !isDark;
  isDark ? body.setAttribute('data-theme', 'dark') : body.removeAttribute('data-theme');
});

// 3. FLASHLIGHT EFFECT (Optimized: Decoupled mouse coordinates from DOM updates)
window.addEventListener('mousemove', (e) => { 
  mouse.x = e.clientX;
  mouse.y = e.clientY;
}, { passive: true });

function updateFlashlights() {
  for (let i = 0; i < flashlightElements.length; i++) {
    const el = flashlightElements[i] as HTMLElement;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--mouse-x', `${mouse.x - rect.left}px`);
    el.style.setProperty('--mouse-y', `${mouse.y - rect.top}px`);
  }
}

// 4. SCROLL PROGRESS
let lastScrollTop = 0;
let ticking = false;
window.addEventListener('scroll', () => {
  lastScrollTop = window.scrollY;
  if (!ticking) {
    window.requestAnimationFrame(() => {
      const docHeight = body.scrollHeight - window.innerHeight;
      const scrollPercent = lastScrollTop / docHeight;
      const maxTop = progressBarParent.clientHeight - progressBar.clientHeight;
      
      progressBar.style.top = `${scrollPercent * maxTop}px`;
      
      if (lastScrollTop > 50) navbar.classList.add('scrolled');
      else navbar.classList.remove('scrolled');
      
      ticking = false;
    });
    ticking = true;
  }
}, { passive: true });

// 5. CANVAS BACKGROUND (Optimized math)
let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;
const spacing = 50;

// Waterfall Orbs for mobile liquid gradient
interface Orb {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
}
const orbs: Orb[] = [];
const numOrbs = 5;
for (let i = 0; i < numOrbs; i++) {
  orbs.push({
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 1.5,
    vy: (Math.random() - 0.5) * 1.5,
    radius: Math.random() * 300 + 200
  });
}

window.addEventListener('resize', () => { 
  width = canvas.width = window.innerWidth; 
  height = canvas.height = window.innerHeight; 
}, { passive: true });

window.addEventListener('mousemove', (e) => { 
  mouse.x = e.clientX; 
  mouse.y = e.clientY; 
}, { passive: true });

function animate() {
  updateFlashlights();
  frameCount++;

  // Update Bento Skills every few frames
  if (frameCount % 60 === 0) {
    // Memory Allocator: Random scales
    memBars.forEach(bar => {
      const scale = Math.random() * 0.8 + 0.2;
      const opacity = Math.random() * 0.5 + 0.2;
      (bar as HTMLElement).style.transform = `scaleY(${scale})`;
      (bar as HTMLElement).style.opacity = opacity.toString();
    });

    // SQL Query: Cycle text
    if (sqlQuery) {
      currentQueryIndex = (currentQueryIndex + 1) % queries.length;
      sqlQuery.textContent = queries[currentQueryIndex];
    }
  }

  // Signal Jitter (more frequent)
  if (frameCount % 30 === 0) {
    sigBars.forEach(bar => {
      const scale = Math.random() * 0.4 + 0.8;
      (bar as HTMLElement).style.transform = `scaleY(${scale})`;
    });
  }
  
  if (width <= 768) {
    // Liquid Gradient Effect (Mobile)
    ctx.fillStyle = isFocusMode ? '#7d8c7d' : (isDark ? '#0c0d0c' : '#fdfdfc');
    ctx.fillRect(0, 0, width, height);

    orbs.forEach(orb => {
      // Move orbs
      orb.x += orb.vx;
      orb.y += orb.vy;

      // Bounce orbs
      if (orb.x < -orb.radius) orb.vx *= -1;
      if (orb.x > width + orb.radius) orb.vx *= -1;
      if (orb.y < -orb.radius) orb.vy *= -1;
      if (orb.y > height + orb.radius) orb.vy *= -1;

      // Draw liquid orb
      const gradient = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.radius);
      
      let color;
      let alpha;
      if (isFocusMode) {
        color = '255, 255, 255';
        alpha = 0.2;
      } else if (isDark) {
        color = '80, 80, 80';
        alpha = 0.15;
      } else {
        color = '180, 180, 180'; // soft gray for light mode
        alpha = 0.3;
      }
      
      gradient.addColorStop(0, `rgba(${color}, ${alpha})`);
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height); 
    });
  } else {
    // Interactive Dot Grid (Desktop) - Batch Optimized
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = isFocusMode 
      ? 'rgba(255, 255, 255, 0.4)' 
      : (isDark ? 'rgba(143, 160, 143, 0.35)' : 'rgba(125, 140, 125, 0.35)');
    
    ctx.beginPath();
    for (let x = 0; x < width + spacing; x += spacing) {
      for (let y = 0; y < height + spacing; y += spacing) {
        const dx = mouse.x - x;
        const dy = mouse.y - y;
        const distSq = dx * dx + dy * dy;
        
        let size = 1.2;
        if (distSq < 32400) {
          size = 1.2 + (180 - Math.sqrt(distSq)) / 20;
        }
        
        ctx.moveTo(x + size, y);
        ctx.arc(x, y, size, 0, 6.283);
      }
    }
    ctx.fill();
  }
  requestAnimationFrame(animate);
}
animate();

// 6. FIDGET & REVEAL
fidgetTrigger.addEventListener('click', () => fidgetModal.classList.add('active'));
fidgetClose.addEventListener('click', () => fidgetModal.classList.remove('active'));

// Pop bubble delegation
fidgetModal.addEventListener('click', (e) => {
  const bubble = (e.target as HTMLElement).closest('.pop-bubble');
  if (bubble) {
    bubble.classList.toggle('popped');
    setTimeout(() => bubble.classList.remove('popped'), 2000);
  }
});

window.addEventListener('keydown', (e) => { 
  if (e.key === 'Escape') fidgetModal.classList.remove('active'); 
});

// 7. FOCUS MODE & SCROLL OBSERVER
const observerOptions = { 
  threshold: [0, 0.2, 0.4, 0.6, 0.8, 1.0],
  rootMargin: "-20% 0px -20% 0px" // Focus on the center of the screen
};

const observer = new IntersectionObserver((entries) => {
  for (const entry of entries) {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      
      // Mobile Scroll Bouncy Effect: Trigger active class when in center
      if (window.innerWidth <= 1024 && entry.target.classList.contains('timeline-item')) {
        if (entry.intersectionRatio > 0.5) {
          entry.target.classList.add('scroll-active');
        } else {
          entry.target.classList.remove('scroll-active');
        }
      }
    }
    
    if (entry.target.id === 'code-section') {
      if (entry.intersectionRatio > 0.6) {
        entry.target.classList.add('focus-mode');
        body.classList.add('focus-mode');
        isFocusMode = true;
      } else {
        entry.target.classList.remove('focus-mode');
        body.classList.remove('focus-mode');
        isFocusMode = false;
      }
    }
  }
}, observerOptions);

// Observe sections, code blocks, and individual experience items
document.querySelectorAll('section, .code-section, .timeline-item').forEach(sec => observer.observe(sec));

// 8. CHAPTER JUMPS
document.querySelector('.code-chapters')?.addEventListener('click', (e) => {
  const link = (e.target as HTMLElement).closest('.chapter-link') as HTMLElement;
  if (link) {
    const jump = link.dataset.jump;
    waterfall.style.animation = 'none';
    waterfall.style.transform = `translateY(-${jump}px)`;
    // Force reflow to allow re-triggering animation if needed in future
    // waterfall.offsetHeight; 
  }
});

// 9. MOBILE MENU TOGGLE
const mobileMenuToggle = document.getElementById('mobile-menu-toggle')!;
const navLinks = document.querySelector('.nav-links')!;

mobileMenuToggle.addEventListener('click', (e) => {
  e.stopPropagation();
  navLinks.classList.toggle('active');
});

// Close menu when clicking outside or on a link
document.addEventListener('click', (e) => {
  const target = e.target as HTMLElement;
  if (!navLinks.contains(target) && !mobileMenuToggle.contains(target)) {
    navLinks.classList.remove('active');
  }
});

// 10. CONTACT NODE INTERACTIONS
const contactNodes = document.querySelectorAll('.contact-node');
contactNodes.forEach(node => {
  const label = node.querySelector('.node-label');
  if (!label) return;

  const originalText = label.textContent || '';
  let isScrambling = false;

  node.addEventListener('mouseenter', () => {
    if (isScrambling) return;
    isScrambling = true;

    // Temporary "Scanning" effect
    label.textContent = 'CONNECTING...';
    label.style.opacity = '0.5';
    
    setTimeout(() => {
      label.textContent = originalText;
      label.style.opacity = '1';
      isScrambling = false;
    }, 200);
  });
});

