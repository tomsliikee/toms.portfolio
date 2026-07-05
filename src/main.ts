import './style.css'

// 1. MOBILE MENU TOGGLE
const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuToggle && navLinks) {
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
}

// 2. SCROLL-DRIVEN DEPTH-OF-FIELD (BLUR & TRANSLATION) EFFECT
function updateScrollDepthEffects() {
  const elements = document.querySelectorAll('section, .timeline-item, .features-grid, .contact-banner');
  const viewportHeight = window.innerHeight;
  const viewportCenter = viewportHeight / 2;

  elements.forEach(el => {
    const htmlEl = el as HTMLElement;
    const rect = htmlEl.getBoundingClientRect();
    
    // If the element is not yet loaded or hidden, skip
    if (rect.height === 0) return;

    const elementCenter = rect.top + rect.height / 2;
    
    // Distance from the center of the viewport
    const distanceFromCenter = Math.abs(elementCenter - viewportCenter);
    
    // Start blurring when the center of the element is further than 32% of viewport height from the center
    const threshold = viewportHeight * 0.32;
    
    if (distanceFromCenter > threshold) {
      const maxDistance = viewportHeight * 0.55; // fully out/blurred range
      const progress = Math.min((distanceFromCenter - threshold) / (maxDistance - threshold), 1);
      
      // Calculate depth transitions: blur (0px to 8px), scale (100% to 95%), opacity (100% to 5%)
      const blurVal = progress * 8;
      const scaleVal = 1 - progress * 0.05;
      const opacityVal = 1 - progress * 0.95;
      
      htmlEl.style.filter = `blur(${blurVal}px)`;
      htmlEl.style.transform = `scale(${scaleVal})`;
      htmlEl.style.opacity = `${opacityVal}`;
      htmlEl.style.transition = 'filter 0.15s ease-out, transform 0.15s ease-out, opacity 0.15s ease-out';
    } else {
      // In focus
      htmlEl.style.filter = 'none';
      htmlEl.style.transform = 'scale(1)';
      htmlEl.style.opacity = '1';
    }
  });
}

// Optimized scroll listener loop
let scrollTicking = false;
window.addEventListener('scroll', () => {
  if (!scrollTicking) {
    window.requestAnimationFrame(() => {
      updateScrollDepthEffects();
      scrollTicking = false;
    });
    scrollTicking = true;
  }
}, { passive: true });

window.addEventListener('resize', updateScrollDepthEffects, { passive: true });
// Run initially to capture elements in view
setTimeout(updateScrollDepthEffects, 100);

// 3. OPTIONAL STICKY HEADER SHADOW ON SCROLL
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });
}

// 4. FOOTER WAVES SCROLL REVEAL
const footerWaves = document.querySelector('.footer-waves') as HTMLElement;
if (footerWaves) {
  window.addEventListener('scroll', () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = window.scrollY;
    const clientHeight = window.innerHeight;
    const distanceToBottom = scrollHeight - (scrollTop + clientHeight);

    if (distanceToBottom < 450) {
      const progress = (450 - distanceToBottom) / 450; // Ranges 0 to 1
      footerWaves.style.transform = `translateY(${(1 - progress) * 60}px)`;
      footerWaves.style.opacity = `${progress * 0.95}`;
    } else {
      footerWaves.style.transform = 'translateY(60px)';
      footerWaves.style.opacity = '0';
    }
  }, { passive: true });
}
