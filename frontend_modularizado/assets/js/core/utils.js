// 🛠️ Utilitários
const Utils = {
  // Formatação
  formatDate(date) {
    return new Date(date).toLocaleDateString('pt-BR');
  },
  
  formatNumber(num, decimals = 1) {
    return Number(num).toFixed(decimals);
  },
  
  // DOM
  $(selector) {
    return document.querySelector(selector);
  },
  
  $$(selector) {
    return document.querySelectorAll(selector);
  },
  
  createElement(tag, className, content) {
    const el = document.createElement(tag);
    if (className) el.className = className;
    if (content) el.innerHTML = content;
    return el;
  },
  
  // Storage
  storage: {
    set(key, value) {
      localStorage.setItem(`ekko_${key}`, JSON.stringify(value));
    },
    
    get(key) {
      const item = localStorage.getItem(`ekko_${key}`);
      return item ? JSON.parse(item) : null;
    },
    
    remove(key) {
      localStorage.removeItem(`ekko_${key}`);
    }
  },
  
  // Debounce
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }
};

// Export global
window.Utils = Utils;