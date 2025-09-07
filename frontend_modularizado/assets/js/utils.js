// 🛠️ UTILS - Funções utilitárias reutilizáveis

const Utils = {
    // Configurações
    config: {
        baseUrl: "http://127.0.0.1:8000"
    },

    // Sanitização e validação
    sanitizeHTML(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    },

    sanitizeInput(str) {
        return str.trim().replace(/[<>"'&]/g, '');
    },

    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    },

    // Mensagens
    showMessage(text, type = 'success', containerId = 'messageContainer') {
        const container = document.getElementById(containerId);
        if (container) {
            const sanitizedText = this.sanitizeHTML(text);
            const sanitizedType = this.sanitizeHTML(type);
            container.innerHTML = `<div class="message ${sanitizedType}">${sanitizedText}</div>`;
            setTimeout(() => container.innerHTML = '', 5000);
        }
    },

    // Armazenamento seguro
    storage: {
        set(key, value) {
            sessionStorage.setItem(key, JSON.stringify(value));
        },
        
        get(key) {
            const item = sessionStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        },
        
        remove(key) {
            sessionStorage.removeItem(key);
        },
        
        clear() {
            sessionStorage.clear();
        }
    },

    // Efeitos visuais
    effects: {
        // Header scroll effect
        initScrollHeader() {
            window.addEventListener('scroll', () => {
                const header = document.querySelector('header, .header');
                if (header) {
                    if (window.scrollY > 50) {
                        header.classList.add('scrolled');
                    } else {
                        header.classList.remove('scrolled');
                    }
                }
            });
        },

        // Smooth scroll
        initSmoothScroll() {
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    const target = document.querySelector(this.getAttribute('href'));
                    if (target) {
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                });
            });
        }
    },

    // Inicialização comum
    init() {
        this.effects.initScrollHeader();
        this.effects.initSmoothScroll();
    }
};

// Auto-inicializar quando DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    Utils.init();
});