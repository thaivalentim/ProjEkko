// 🔐 AUTH MODULE - Sistema de Autenticação

class AuthManager {
    constructor() {
        this.baseUrl = "http://127.0.0.1:8000";
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupAdminDefault();
    }

    setupEventListeners() {
        // Header scroll effect
        window.addEventListener('scroll', () => {
            const header = document.querySelector('.header');
            if (header) {
                if (window.scrollY > 50) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
            }
        });
    }

    setupAdminDefault() {
        // Auto-preencher ID admin para teste
        document.addEventListener('DOMContentLoaded', () => {
            const adminIdField = document.getElementById('adminId');
            if (adminIdField) {
                adminIdField.value = '689b90f60e5b30bcc5577b43';
            }
        });
    }

    showMessage(text, type = 'success') {
        const container = document.getElementById('messageContainer');
        if (container) {
            container.innerHTML = `<div class="message ${type}">${text}</div>`;
            setTimeout(() => container.innerHTML = '', 5000);
        }
    }

    togglePassword(inputId, icon) {
        const input = document.getElementById(inputId);
        if (input.type === 'password') {
            input.type = 'text';
            icon.classList.remove('fa-eye');
            icon.classList.add('fa-eye-slash');
        } else {
            input.type = 'password';
            icon.classList.remove('fa-eye-slash');
            icon.classList.add('fa-eye');
        }
    }

    showLogin() {
        document.querySelectorAll('.toggle-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.toggle-btn')[0].classList.add('active');
        
        document.getElementById('loginForm').classList.remove('hidden');
        document.getElementById('registerForm').classList.add('hidden');
        document.getElementById('adminForm').classList.add('hidden');
    }

    showRegister() {
        document.querySelectorAll('.toggle-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.toggle-btn')[1].classList.add('active');
        
        document.getElementById('loginForm').classList.add('hidden');
        document.getElementById('registerForm').classList.remove('hidden');
        document.getElementById('adminForm').classList.add('hidden');
    }

    showAdminLogin() {
        document.querySelectorAll('.toggle-btn').forEach(btn => btn.classList.remove('active'));
        
        document.getElementById('loginForm').classList.add('hidden');
        document.getElementById('registerForm').classList.add('hidden');
        document.getElementById('adminForm').classList.remove('hidden');
    }

    async handleLogin(event) {
        event.preventDefault();
        
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        const btn = document.getElementById('loginBtn');
        
        btn.disabled = true;
        btn.innerHTML = '<span class="loading"><i class="fas fa-spinner"></i> Entrando...</span>';
        
        try {
            const response = await fetch(`${this.baseUrl}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            
            const data = await response.json();
            
            if (response.ok) {
                this.showMessage('Login realizado com sucesso!', 'success');
                localStorage.setItem('userToken', data.token);
                localStorage.setItem('userId', data.user_id);
                
                setTimeout(() => {
                    window.location.href = '../dashboard/overview.html';
                }, 1500);
            } else {
                this.showMessage(data.detail || 'Erro ao fazer login', 'error');
            }
        } catch (error) {
            this.showMessage('Erro de conexão com o servidor', 'error');
        } finally {
            btn.disabled = false;
            btn.innerHTML = 'Entrar';
        }
    }

    async handleRegister(event) {
        event.preventDefault();
        
        const name = document.getElementById('registerName').value;
        const email = document.getElementById('registerEmail').value;
        const password = document.getElementById('registerPassword').value;
        const farmName = document.getElementById('farmName').value;
        const btn = document.getElementById('registerBtn');
        
        btn.disabled = true;
        btn.innerHTML = '<span class="loading"><i class="fas fa-spinner"></i> Criando conta...</span>';
        
        try {
            const response = await fetch(`${this.baseUrl}/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    nome: name,
                    email: email,
                    senha: password,
                    nome_fazenda: farmName,
                    papel: 'agricultor'
                })
            });
            
            const data = await response.json();
            
            if (response.ok) {
                this.showMessage('Conta criada com sucesso! Faça login para continuar.', 'success');
                setTimeout(() => this.showLogin(), 2000);
            } else {
                this.showMessage(data.detail || 'Erro ao criar conta', 'error');
            }
        } catch (error) {
            this.showMessage('Erro de conexão com o servidor', 'error');
        } finally {
            btn.disabled = false;
            btn.innerHTML = 'Criar Conta';
        }
    }

    async handleAdminLogin(event) {
        event.preventDefault();
        
        const userId = document.getElementById('adminId').value;
        const btn = document.getElementById('adminBtn');
        
        btn.disabled = true;
        btn.innerHTML = '<span class="loading"><i class="fas fa-spinner"></i> Verificando...</span>';
        
        try {
            const response = await fetch(`${this.baseUrl}/perfil/${userId}`);
            
            if (response.ok) {
                const userData = await response.json();
                console.log('✅ Admin login successful:', userData);
                this.showMessage(`Acesso autorizado para ${userData.nome}`, 'success');
                
                localStorage.setItem('adminAccess', 'true');
                localStorage.setItem('currentUserId', userId);
                
                console.log('🔄 Redirecting to dashboard...');
                setTimeout(() => {
                    const redirectUrl = `../dashboard/overview.html?userId=${userId}`;
                    console.log('📍 Redirect URL:', redirectUrl);
                    window.location.href = redirectUrl;
                }, 1500);
            } else {
                console.error('❌ Admin login failed:', response.status, response.statusText);
                this.showMessage('ID de usuário não encontrado', 'error');
            }
        } catch (error) {
            this.showMessage('Erro de conexão com o servidor', 'error');
        } finally {
            btn.disabled = false;
            btn.innerHTML = 'Acessar Dashboard';
        }
    }
}

// Inicializar quando DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    window.authManager = new AuthManager();
});

// Funções globais para compatibilidade
function showLogin() { window.authManager.showLogin(); }
function showRegister() { window.authManager.showRegister(); }
function showAdminLogin() { window.authManager.showAdminLogin(); }
function togglePassword(inputId, icon) { window.authManager.togglePassword(inputId, icon); }
function handleLogin(event) { window.authManager.handleLogin(event); }
function handleRegister(event) { window.authManager.handleRegister(event); }
function handleAdminLogin(event) { window.authManager.handleAdminLogin(event); }