// 🔐 AUTH - Sistema de autenticação

const Auth = {
    // Toggle de senha
    togglePassword(inputId, icon) {
        const input = document.getElementById(inputId);
        if (!input) return;
        
        if (input.type === 'password') {
            input.type = 'text';
            icon.classList.remove('fa-eye');
            icon.classList.add('fa-eye-slash');
        } else {
            input.type = 'password';
            icon.classList.remove('fa-eye-slash');
            icon.classList.add('fa-eye');
        }
    },

    // Navegação entre forms
    showLogin() {
        document.querySelectorAll('.toggle-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.toggle-btn')[0].classList.add('active');
        
        document.getElementById('loginForm').classList.remove('hidden');
        document.getElementById('registerForm').classList.add('hidden');
        document.getElementById('adminForm').classList.add('hidden');
    },

    showRegister() {
        document.querySelectorAll('.toggle-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.toggle-btn')[1].classList.add('active');
        
        document.getElementById('loginForm').classList.add('hidden');
        document.getElementById('registerForm').classList.remove('hidden');
        document.getElementById('adminForm').classList.add('hidden');
    },

    showAdminLogin() {
        document.querySelectorAll('.toggle-btn').forEach(btn => btn.classList.remove('active'));
        
        document.getElementById('loginForm').classList.add('hidden');
        document.getElementById('registerForm').classList.add('hidden');
        document.getElementById('adminForm').classList.remove('hidden');
    },

    // Login
    async handleLogin(event) {
        event.preventDefault();
        
        const email = Utils.sanitizeInput(document.getElementById('loginEmail').value);
        const password = Utils.sanitizeInput(document.getElementById('loginPassword').value);
        const btn = document.getElementById('loginBtn');
        
        if (!Utils.validateEmail(email)) {
            Utils.showMessage('Email inválido', 'error');
            return;
        }
        
        btn.disabled = true;
        btn.innerHTML = '<span class="loading"><i class="fas fa-spinner"></i> Entrando...</span>';
        
        try {
            const response = await fetch(`${Utils.config.baseUrl}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            
            const data = await response.json();
            
            if (response.ok) {
                Utils.showMessage('Login realizado com sucesso!', 'success');
                Utils.storage.set('userToken', data.token);
                Utils.storage.set('userId', data.user_id);
                
                setTimeout(() => {
                    window.location.href = 'dashboard.html';
                }, 1500);
            } else {
                Utils.showMessage(data.detail || 'Erro ao fazer login', 'error');
            }
        } catch (error) {
            Utils.showMessage('Erro de conexão com o servidor', 'error');
        } finally {
            btn.disabled = false;
            btn.innerHTML = 'Entrar';
        }
    },

    // Registro
    async handleRegister(event) {
        event.preventDefault();
        
        const name = Utils.sanitizeInput(document.getElementById('registerName').value);
        const email = Utils.sanitizeInput(document.getElementById('registerEmail').value);
        const password = Utils.sanitizeInput(document.getElementById('registerPassword').value);
        const farmName = Utils.sanitizeInput(document.getElementById('farmName').value);
        const btn = document.getElementById('registerBtn');
        
        if (!Utils.validateEmail(email)) {
            Utils.showMessage('Email inválido', 'error');
            return;
        }
        
        btn.disabled = true;
        btn.innerHTML = '<span class="loading"><i class="fas fa-spinner"></i> Criando conta...</span>';
        
        try {
            const response = await fetch(`${Utils.config.baseUrl}/auth/register`, {
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
                Utils.showMessage('Conta criada com sucesso! Faça login para continuar.', 'success');
                setTimeout(() => this.showLogin(), 2000);
            } else {
                Utils.showMessage(data.detail || 'Erro ao criar conta', 'error');
            }
        } catch (error) {
            Utils.showMessage('Erro de conexão com o servidor', 'error');
        } finally {
            btn.disabled = false;
            btn.innerHTML = 'Criar Conta';
        }
    },

    // Admin login
    async handleAdminLogin(event) {
        event.preventDefault();
        
        const userId = Utils.sanitizeInput(document.getElementById('adminId').value);
        const btn = document.getElementById('adminBtn');
        
        btn.disabled = true;
        btn.innerHTML = '<span class="loading"><i class="fas fa-spinner"></i> Verificando...</span>';
        
        try {
            const response = await fetch(`${Utils.config.baseUrl}/perfil/${userId}`);
            
            if (response.ok) {
                const userData = await response.json();
                Utils.showMessage(`Acesso autorizado para ${userData.nome}`, 'success');
                
                Utils.storage.set('adminAccess', true);
                Utils.storage.set('currentUserId', userId);
                
                setTimeout(() => {
                    window.location.href = `dashboard.html?userId=${userId}`;
                }, 1500);
            } else {
                Utils.showMessage('ID de usuário não encontrado', 'error');
            }
        } catch (error) {
            Utils.showMessage('Erro de conexão com o servidor', 'error');
        } finally {
            btn.disabled = false;
            btn.innerHTML = 'Acessar Dashboard';
        }
    },

    // Inicialização
    init() {
        // Auto-preencher ID admin para teste
        const adminIdField = document.getElementById('adminId');
        if (adminIdField) {
            adminIdField.value = '689b90f60e5b30bcc5577b43';
        }
    }
};

// Funções globais para compatibilidade
function togglePassword(inputId, icon) { Auth.togglePassword(inputId, icon); }
function showLogin() { Auth.showLogin(); }
function showRegister() { Auth.showRegister(); }
function showAdminLogin() { Auth.showAdminLogin(); }
function handleLogin(event) { Auth.handleLogin(event); }
function handleRegister(event) { Auth.handleRegister(event); }
function handleAdminLogin(event) { Auth.handleAdminLogin(event); }

// Auto-inicializar
document.addEventListener('DOMContentLoaded', () => {
    Auth.init();
});