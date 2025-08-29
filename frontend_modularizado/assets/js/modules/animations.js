/* ✨ ANIMATION MANAGER - Sistema de Animações */

class AnimationManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupIntersectionObserver();
        this.setupPageTransitions();
        this.setupLoadingStates();
    }

    // Observer para animações on scroll
    setupIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fade-in-up');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        // Observar elementos que devem animar
        document.querySelectorAll('.card, .stat-card, .content-section').forEach(el => {
            observer.observe(el);
        });
    }

    // Transições entre páginas/seções
    setupPageTransitions() {
        const sections = document.querySelectorAll('.content-section');
        sections.forEach(section => {
            section.classList.add('page-transition');
        });
    }

    // Estados de loading
    setupLoadingStates() {
        this.addButtonLoadingStates();
        this.addSkeletonLoading();
    }

    // Loading nos botões
    addButtonLoadingStates() {
        document.querySelectorAll('button[type="submit"], .btn-primary').forEach(btn => {
            btn.addEventListener('click', (e) => {
                if (!btn.disabled) {
                    this.showButtonLoading(btn);
                }
            });
        });
    }

    showButtonLoading(button) {
        const originalText = button.innerHTML;
        button.innerHTML = `
            <span class="loading-spinner"></span>
            <span style="margin-left: 0.5rem;">Carregando...</span>
        `;
        button.disabled = true;

        // Simular loading (remover em produção)
        setTimeout(() => {
            button.innerHTML = originalText;
            button.disabled = false;
        }, 2000);
    }

    // Skeleton loading para conteúdo
    addSkeletonLoading() {
        const contentAreas = document.querySelectorAll('#dashboard-content, #profile-content, #ai-content');
        contentAreas.forEach(area => {
            if (area.innerHTML.includes('Carregando')) {
                this.showSkeleton(area);
            }
        });
    }

    showSkeleton(container) {
        container.innerHTML = `
            <div style="display: grid; gap: 1.5rem;">
                <div class="skeleton" style="height: 120px; border-radius: 12px;"></div>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
                    <div class="skeleton" style="height: 80px; border-radius: 8px;"></div>
                    <div class="skeleton" style="height: 80px; border-radius: 8px;"></div>
                    <div class="skeleton" style="height: 80px; border-radius: 8px;"></div>
                </div>
                <div class="skeleton" style="height: 200px; border-radius: 12px;"></div>
            </div>
        `;
    }

    // Animar entrada de cards em sequência
    animateCardsSequence(selector = '.card') {
        const cards = document.querySelectorAll(selector);
        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }

    // Animar seção ativa
    animateActiveSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            section.classList.remove('page-transition');
            section.classList.add('page-transition', 'active');
            
            // Animar cards dentro da seção
            setTimeout(() => {
                this.animateCardsSequence(`#${sectionId} .card, #${sectionId} .stat-card`);
            }, 200);
        }
    }

    // Adicionar hover effects
    addHoverEffects() {
        document.querySelectorAll('.card, .stat-card, .nav-item').forEach(el => {
            el.classList.add('hover-lift');
        });

        document.querySelectorAll('.btn-primary, .btn-secondary').forEach(el => {
            el.classList.add('btn-animated');
        });
    }

    // Toast notifications
    showToast(message, type = 'info', duration = 3000) {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        
        const icons = {
            success: 'check-circle',
            error: 'exclamation-circle',
            warning: 'exclamation-triangle',
            info: 'info-circle'
        };

        toast.innerHTML = `
            <div style="display: flex; align-items: center; gap: 0.75rem;">
                <i class="fas fa-${icons[type] || 'info-circle'}" style="color: var(--${type === 'success' ? 'primary-green' : type === 'error' ? 'red' : type === 'warning' ? 'orange' : 'tech-blue'});"></i>
                <div>
                    <div style="font-weight: 600; margin-bottom: 0.25rem;">${this.getToastTitle(type)}</div>
                    <div style="font-size: 0.875rem; opacity: 0.8;">${message}</div>
                </div>
                <button onclick="this.parentElement.parentElement.remove()" style="background: none; border: none; color: inherit; cursor: pointer; padding: 0.25rem;">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;

        document.body.appendChild(toast);

        // Auto remove
        setTimeout(() => {
            if (toast.parentElement) {
                toast.style.animation = 'slideInDown 0.3s ease-out reverse';
                setTimeout(() => toast.remove(), 300);
            }
        }, duration);

        return toast;
    }

    getToastTitle(type) {
        const titles = {
            success: 'Sucesso!',
            error: 'Erro!',
            warning: 'Atenção!',
            info: 'Informação'
        };
        return titles[type] || 'Notificação';
    }

    // Inicializar animações quando DOM estiver pronto
    initializeAnimations() {
        // Adicionar classes de animação aos elementos existentes
        setTimeout(() => {
            this.addHoverEffects();
            this.animateCardsSequence('.card, .stat-card');
        }, 100);
    }
}

// Inicializar animações
const animationManager = new AnimationManager();

// Inicializar quando DOM estiver pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        animationManager.initializeAnimations();
    });
} else {
    animationManager.initializeAnimations();
}

// Exportar para uso global
window.animationManager = animationManager;