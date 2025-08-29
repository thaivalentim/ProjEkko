// 🚀 App Principal
const App = {
  config: {
    apiUrl: 'http://127.0.0.1:8000',
    version: '2.0.0',
    theme: 'light'
  },
  
  init() {
    this.loadTheme();
    this.setupGlobalEventListeners();
    this.checkConnection();
    
    console.log(`🌱 EKKO v${this.config.version} - Frontend Modularizado`);
  },
  
  loadTheme() {
    const savedTheme = Utils.storage.get('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    this.config.theme = savedTheme;
  },
  
  setupGlobalEventListeners() {
    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
      // Ctrl/Cmd + K para busca
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        this.openSearch();
      }
      
      // Esc para fechar modais
      if (e.key === 'Escape') {
        this.closeModals();
      }
    });
    
    // Click outside para fechar dropdowns
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.dropdown')) {
        this.closeDropdowns();
      }
    });
  },
  
  async checkConnection() {
    try {
      const response = await fetch(`${this.config.apiUrl}/`, {
        method: 'GET',
        timeout: 3000
      });
      
      if (response.ok) {
        console.log('✅ API conectada');
        return true;
      }
    } catch (error) {
      console.warn('⚠️ API desconectada:', error);
      Notifications.warning('Conexão com servidor instável');
      return false;
    }
  },
  
  openSearch() {
    // Implementar busca global
    console.log('🔍 Busca global');
  },
  
  closeModals() {
    Utils.$$('.modal.active').forEach(modal => {
      modal.classList.remove('active');
    });
  },
  
  closeDropdowns() {
    Utils.$$('.dropdown.open').forEach(dropdown => {
      dropdown.classList.remove('open');
    });
  }
};

// Auto init
document.addEventListener('DOMContentLoaded', () => {
  App.init();
});

window.App = App;