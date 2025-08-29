// 🏠 Landing Page Module
const Landing = {
  init() {
    this.setupScrollEffects();
    this.setupSmoothScroll();
    this.animateStats();
    
    console.log('🌱 Landing page carregada');
  },
  
  setupScrollEffects() {
    const header = Utils.$('#header');
    
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  },
  
  setupSmoothScroll() {
    Utils.$$('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const target = Utils.$(anchor.getAttribute('href'));
        
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  },
  
  animateStats() {
    const stats = Utils.$$('.stat-number[data-target]');
    
    const animateNumber = (element) => {
      const target = parseInt(element.dataset.target);
      const duration = 2000;
      const step = target / (duration / 16);
      let current = 0;
      
      const timer = setInterval(() => {
        current += step;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        
        element.textContent = Math.floor(current);
        if (element.textContent.includes('%')) {
          element.textContent += '%';
        } else if (element.textContent.includes('+')) {
          element.textContent = '+' + element.textContent + '%';
        }
      }, 16);
    };
    
    // Intersection Observer para animar quando visível
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateNumber(entry.target);
          observer.unobserve(entry.target);
        }
      });
    });
    
    stats.forEach(stat => observer.observe(stat));
  }
};

// Auto init
document.addEventListener('DOMContentLoaded', () => {
  Landing.init();
});

window.Landing = Landing;