/* 🌙 THEME MANAGER - Sistema de Temas */

class ThemeManager {
    constructor() {
        this.currentTheme = localStorage.getItem('ekko-theme') || 'light';
        this.init();
    }

    init() {
        // Aplicar tema salvo
        document.documentElement.setAttribute('data-theme', this.currentTheme);
        
        // Criar toggle se não existir
        this.createToggle();
        
        // Atualizar toggle visual
        this.updateToggle();
    }

    createToggle() {
        // Verificar se já existe
        if (document.querySelector('.theme-toggle')) return;

        const toggle = document.createElement('div');
        toggle.className = 'theme-toggle';
        toggle.innerHTML = `
            <div class="toggle-switch">
                <div class="toggle-slider">
                    <i class="fas fa-sun"></i>
                </div>
            </div>
            <span class="toggle-label">Modo Escuro</span>
        `;

        toggle.addEventListener('click', () => this.toggleTheme());

        // Adicionar ao sidebar se existir, senão ao header
        const sidebar = document.querySelector('.sidebar-header');
        const header = document.querySelector('.top-bar .user-info');
        
        if (sidebar) {
            sidebar.appendChild(toggle);
        } else if (header) {
            header.insertBefore(toggle, header.firstChild);
        }
    }

    toggleTheme() {
        this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', this.currentTheme);
        localStorage.setItem('ekko-theme', this.currentTheme);
        this.updateToggle();
        this.showToast(`Modo ${this.currentTheme === 'dark' ? 'escuro' : 'claro'} ativado`);
    }

    updateToggle() {
        const slider = document.querySelector('.toggle-slider i');
        const label = document.querySelector('.toggle-label');
        
        if (slider && label) {
            if (this.currentTheme === 'dark') {
                slider.className = 'fas fa-moon';
                label.textContent = 'Modo Claro';
            } else {
                slider.className = 'fas fa-sun';
                label.textContent = 'Modo Escuro';
            }
        }
    }

    showToast(message, type = 'info') {
        // Remover toast existente
        const existingToast = document.querySelector('.toast');
        if (existingToast) {
            existingToast.remove();
        }

        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.innerHTML = `
            <div style="display: flex; align-items: center; gap: 0.5rem;">
                <i class="fas fa-${type === 'error' ? 'exclamation-circle' : type === 'warning' ? 'exclamation-triangle' : 'check-circle'}"></i>
                <span>${message}</span>
            </div>
        `;

        document.body.appendChild(toast);

        // Remover após 3 segundos
        setTimeout(() => {
            toast.style.animation = 'fadeInUp 0.3s ease-out reverse';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }
}

// Inicializar tema
const themeManager = new ThemeManager();

// Exportar para uso global
window.themeManager = themeManager;