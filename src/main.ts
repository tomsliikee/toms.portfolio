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

// 3. FLASHLIGHT EFFECT
window.addEventListener('mousemove', (e) => { 
  // Optimized Flashlight (using cached elements)
  const xPercent = e.clientX;
  const yPercent = e.clientY;
  
  for (let i = 0; i < flashlightElements.length; i++) {
    const el = flashlightElements[i] as HTMLElement;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--mouse-x', `${xPercent - rect.left}px`);
    el.style.setProperty('--mouse-y', `${yPercent - rect.top}px`);
  }
}, { passive: true });

// 4. SCROLL PROGRESS
let lastScrollTop = 0;
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = body.scrollHeight - window.innerHeight;
  const scrollPercent = scrollTop / docHeight;
  const maxTop = progressBarParent.clientHeight - progressBar.clientHeight;
  
  progressBar.style.top = `${scrollPercent * maxTop}px`;
  
  if (scrollTop > 50 && lastScrollTop <= 50) navbar.classList.add('scrolled');
  else if (scrollTop <= 50 && lastScrollTop > 50) navbar.classList.remove('scrolled');
  
  lastScrollTop = scrollTop;
}, { passive: true });

// 5. CANVAS BACKGROUND (Optimized math)
let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;
const spacing = 50;
const mouse = { x: -1000, y: -1000 };

window.addEventListener('resize', () => { 
  width = canvas.width = window.innerWidth; 
  height = canvas.height = window.innerHeight; 
}, { passive: true });

window.addEventListener('mousemove', (e) => { mouse.x = e.clientX; mouse.y = e.clientY; }, { passive: true });

function animate() {
  ctx.clearRect(0, 0, width, height);
  const isFocusMode = body.classList.contains('focus-mode');
  const isDarkTheme = body.getAttribute('data-theme') === 'dark';
  
  ctx.fillStyle = isFocusMode 
    ? 'rgba(255, 255, 255, 0.4)' 
    : (isDarkTheme ? 'rgba(143, 160, 143, 0.35)' : 'rgba(125, 140, 125, 0.35)');
  
  // Only draw what's visible (Performance: Simple distance check)
  for (let x = 0; x < width + spacing; x += spacing) {
    for (let y = 0; y < height + spacing; y += spacing) {
      const dx = mouse.x - x;
      const dy = mouse.y - y;
      const distSq = dx * dx + dy * dy; // Use squared distance to avoid Math.sqrt
      
      let size = 1.2;
      if (distSq < 32400) { // 180 * 180
        size = 1.2 + (180 - Math.sqrt(distSq)) / 20;
      }
      
      ctx.beginPath();
      ctx.arc(x, y, size, 0, 6.283); // Math.PI * 2 approximated
      ctx.fill();
    }
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

// 7. FOCUS MODE OBSERVER
const observerOptions = { threshold: [0, 0.2, 0.4, 0.6, 0.8, 1.0] };
const observer = new IntersectionObserver((entries) => {
  for (const entry of entries) {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
    
    if (entry.target.id === 'code-section') {
      if (entry.intersectionRatio > 0.6) {
        entry.target.classList.add('focus-mode');
        body.classList.add('focus-mode');
      } else {
        entry.target.classList.remove('focus-mode');
        body.classList.remove('focus-mode');
      }
    }
  }
}, observerOptions);

document.querySelectorAll('section, .code-section').forEach(sec => observer.observe(sec));

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

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
  });
});

