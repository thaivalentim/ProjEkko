// 🔔 Sistema de Notificações
const Notifications = {
  container: null,
  
  init() {
    this.container = Utils.$('#notifications-container');
    if (!this.container) {
      this.container = Utils.createElement('div', 'notifications-container');
      this.container.id = 'notifications-container';
      document.body.appendChild(this.container);
    }
    
    // CSS inline para notificações
    this.injectCSS();
  },
  
  show(message, type = 'info', duration = 4000) {
    const notification = Utils.createElement('div', `notification notification-${type}`);
    
    const icon = this.getIcon(type);
    notification.innerHTML = `
      <div class="notification-content">
        <i class="${icon}"></i>
        <span>${message}</span>
      </div>
      <button class="notification-close">&times;</button>
    `;
    
    // Event listeners
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => this.remove(notification));
    
    // Auto remove
    if (duration > 0) {
      setTimeout(() => this.remove(notification), duration);
    }
    
    this.container.appendChild(notification);
    
    // Animate in
    setTimeout(() => notification.classList.add('show'), 10);
    
    return notification;
  },
  
  success(message, duration) {
    return this.show(message, 'success', duration);
  },
  
  error(message, duration) {
    return this.show(message, 'error', duration);
  },
  
  warning(message, duration) {
    return this.show(message, 'warning', duration);
  },
  
  remove(notification) {
    notification.classList.add('hide');
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300);
  },
  
  getIcon(type) {
    const icons = {
      success: 'lucide-check-circle',
      error: 'lucide-x-circle',
      warning: 'lucide-alert-triangle',
      info: 'lucide-info'
    };
    return icons[type] || icons.info;
  },
  
  injectCSS() {
    if (Utils.$('#notification-styles')) return;
    
    const style = Utils.createElement('style');
    style.id = 'notification-styles';
    style.textContent = `
      .notifications-container {
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 9999;
        display: flex;
        flex-direction: column;
        gap: 10px;
      }
      
      .notification {
        background: white;
        border-radius: var(--radius-md);
        box-shadow: var(--shadow-lg);
        padding: var(--space-md);
        display: flex;
        align-items: center;
        justify-content: space-between;
        min-width: 300px;
        transform: translateX(100%);
        opacity: 0;
        transition: var(--transition);
      }
      
      .notification.show {
        transform: translateX(0);
        opacity: 1;
      }
      
      .notification.hide {
        transform: translateX(100%);
        opacity: 0;
      }
      
      .notification-content {
        display: flex;
        align-items: center;
        gap: var(--space-sm);
      }
      
      .notification-success {
        border-left: 4px solid var(--primary-500);
      }
      
      .notification-error {
        border-left: 4px solid var(--red-500);
      }
      
      .notification-warning {
        border-left: 4px solid var(--orange-500);
      }
      
      .notification-close {
        background: none;
        border: none;
        font-size: 1.2rem;
        cursor: pointer;
        color: var(--gray-500);
      }
    `;
    
    document.head.appendChild(style);
  }
};

// Auto init
document.addEventListener('DOMContentLoaded', () => {
  Notifications.init();
});

window.Notifications = Notifications;