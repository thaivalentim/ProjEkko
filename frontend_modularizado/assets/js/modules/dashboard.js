// 📊 DASHBOARD MODULE - Sistema de Dashboard Completo

class DashboardManager {
    constructor() {
        this.baseUrl = "http://127.0.0.1:8000";
        this.currentUserData = null;
        this.heatmapChart = null;
        this.timelineChart = null;
        this.init();
    }

    init() {
        this.checkAPIConnection();
        this.checkAuthentication();
    }

    async checkAPIConnection() {
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 3000);
            
            const response = await fetch(`${this.baseUrl}/`, { 
                method: 'GET',
                signal: controller.signal
            });
            
            clearTimeout(timeoutId);
            
            if (response.ok) {
                console.log('[OK] API conectada');
                return true;
            }
            return false;
        } catch (error) {
            console.error('[ERRO] API desconectada:', error);
            return false;
        }
    }

    checkAuthentication() {
        const token = localStorage.getItem('userToken');
        const adminAccess = localStorage.getItem('adminAccess');
        const urlParams = new URLSearchParams(window.location.search);
        const userIdParam = urlParams.get('userId');
        
        console.log('🔍 Dashboard auth check:', { token: !!token, adminAccess, userIdParam });
        
        // Mostrar navegação imediatamente
        this.showNavigation();
        
        if (userIdParam && adminAccess) {
            console.log('👨‍💼 Admin access detected, loading profile for:', userIdParam);
            setTimeout(() => this.buscarPerfil(userIdParam), 500);
        } else if (token) {
            const userId = localStorage.getItem('userId');
            console.log('👤 User token found, loading profile for:', userId);
            if (userId) {
                setTimeout(() => this.buscarPerfil(userId), 500);
            }
        } else {
            console.log('❌ No authentication found, redirecting to login');
            window.location.href = '../auth/login.html';
        }
    }

    logout() {
        localStorage.removeItem('userToken');
        localStorage.removeItem('userId');
        localStorage.removeItem('adminAccess');
        localStorage.removeItem('currentUserId');
        window.location.href = '../auth/login.html';
    }

    showMessage(text, type = 'success', duration = 5000) {
        const messageDiv = document.getElementById("mensagem");
        if (messageDiv) {
            messageDiv.className = `message ${type}`;
            messageDiv.innerHTML = `<i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-triangle'}"></i> ${text}`;
            messageDiv.style.display = 'flex';
            
            if (duration > 0) {
                setTimeout(() => {
                    messageDiv.style.display = 'none';
                }, duration);
            }
        }
    }

    showLoading(elementId, text = 'Carregando...') {
        const element = document.getElementById(elementId);
        if (element) {
            element.innerHTML = `<div class="loading"><i class="fas fa-spinner"></i> ${text}</div>`;
        }
    }

    showError(elementId, message = 'Erro ao carregar dados') {
        const element = document.getElementById(elementId);
        if (element) {
            element.innerHTML = `
                <div class="error-state">
                    <i class="fas fa-exclamation-triangle" style="font-size: 2rem; margin-bottom: 1rem;"></i>
                    <h3 style="margin-bottom: 0.5rem;">Ops! Algo deu errado</h3>
                    <p>${message}</p>
                    <button class="btn-primary" onclick="location.reload()" style="margin-top: 1rem;">
                        <i class="fas fa-redo"></i> Tentar Novamente
                    </button>
                </div>
            `;
        }
    }

    showEmpty(elementId, message = 'Nenhum dado encontrado') {
        const element = document.getElementById(elementId);
        if (element) {
            element.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-inbox" style="font-size: 2rem; margin-bottom: 1rem; opacity: 0.5;"></i>
                    <h3 style="margin-bottom: 0.5rem; opacity: 0.7;">Sem dados</h3>
                    <p style="opacity: 0.6;">${message}</p>
                </div>
            `;
        }
    }

    showSection(sectionId, clickedElement = null) {
        // Esconder todas as seções
        document.querySelectorAll('.content-section').forEach(section => {
            section.classList.remove('active');
        });
        
        // Remover classe active de todos os nav-items
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });
        
        // Mostrar seção selecionada
        const targetSection = document.getElementById(sectionId + '-section');
        if (targetSection) {
            targetSection.classList.add('active');
        }
        
        // Ativar item de navegação clicado
        if (clickedElement) {
            clickedElement.classList.add('active');
        }
        
        // Atualizar título
        const titles = {
            'dashboard': 'Dashboard',
            'profile': 'Perfil',
            'ai': 'Diagnóstico IA',
            'heatmap': 'Mapa de Calor',
            'readings': 'Histórico'
        };
        
        if (titles[sectionId]) {
            document.getElementById('page-title').textContent = titles[sectionId];
            document.getElementById('breadcrumb').textContent = `Início > ${titles[sectionId]}`;
        }
    }

    showNavigation() {
        document.getElementById('nav-profile').style.display = 'block';
        document.getElementById('nav-ai').style.display = 'block';
        document.getElementById('nav-heatmap').style.display = 'block';
        document.getElementById('nav-readings').style.display = 'block';
    }

    async buscarPerfil(userId = null) {
        if (!userId) {
            console.error('ID do usuário não fornecido');
            return;
        }

        this.showLoading('dashboard-content', 'Carregando dados do usuário...');
        this.showLoading('profile-content', 'Carregando perfil...');
        this.showLoading('ai-content', 'Carregando análise de IA...');
        this.showLoading('heatmap-content', 'Carregando mapas de calor...');
        this.showLoading('readings-content', 'Carregando histórico...');
        
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 15000);
            
            const response = await fetch(`${this.baseUrl}/perfil/${userId}`, {
                signal: controller.signal,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            clearTimeout(timeoutId);
            
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({ detail: 'Erro desconhecido' }));
                this.showMessage(`Erro ao buscar perfil: ${errorData.detail}`, 'error');
                
                this.showError('dashboard-content', 'Não foi possível carregar os dados do usuário');
                this.showError('profile-content', 'Não foi possível carregar o perfil');
                this.showError('ai-content', 'Não foi possível carregar a análise de IA');
                this.showError('heatmap-content', 'Não foi possível carregar os mapas de calor');
                this.showError('readings-content', 'Não foi possível carregar o histórico');
                return;
            }
            
            const perfil = await response.json();
            
            if (!perfil || !perfil.nome) {
                this.showMessage('Dados do perfil incompletos ou inválidos', 'error');
                return;
            }
            
            this.showNavigation();
            this.currentUserData = perfil;
            
            try {
                this.loadDashboardContent(perfil);
            } catch (e) {
                this.showError('dashboard-content', 'Erro ao processar dados do dashboard');
            }
            
            try {
                this.loadProfileContent(perfil);
            } catch (e) {
                this.showError('profile-content', 'Erro ao processar dados do perfil');
            }
            
            try {
                this.loadReadingsContent(perfil);
            } catch (e) {
                this.showError('readings-content', 'Erro ao processar histórico de leituras');
            }
            
            // Carregar IA de forma assíncrona sem bloquear
            setTimeout(() => {
                this.loadAIContent(userId).catch(() => {
                    this.showError('ai-content', 'Sistema de IA temporariamente indisponível');
                });
            }, 100);
            
            try {
                this.loadHeatmapContent(perfil);
            } catch (e) {
                this.showError('heatmap-content', 'Erro ao gerar mapas de calor');
            }
            
            this.showSection('dashboard', document.getElementById('nav-dashboard'));
            this.showMessage(`Perfil de ${perfil.nome} carregado com sucesso!`, 'success', 3000);
            
        } catch (error) {
            console.error('Erro na busca:', error);
            let errorMsg = "Erro ao conectar com a API.";
            
            if (error.name === 'AbortError') {
                errorMsg = "Timeout: A requisição demorou muito para responder.";
            } else if (error.name === 'TypeError') {
                errorMsg = "Servidor não encontrado. Verifique se a API está rodando na porta 8000.";
            } else if (error.message.includes('Failed to fetch')) {
                errorMsg = "Falha na conexão. Verifique se a API está rodando.";
            }
            
            this.showMessage(errorMsg, 'error', 0);
            
            this.showError('dashboard-content', 'Falha na conexão com o servidor');
            this.showError('profile-content', 'Falha na conexão com o servidor');
            this.showError('ai-content', 'Falha na conexão com o servidor');
            this.showError('heatmap-content', 'Falha na conexão com o servidor');
            this.showError('readings-content', 'Falha na conexão com o servidor');
        }
    }

    loadDashboardContent(perfil) {
        const leituras = perfil.leituras_solo || [];
        const ultimaLeitura = leituras[0] || {};
        const npk = ultimaLeitura.NPK || {};
        const micro = ultimaLeitura.micronutrientes || {};
        
        document.getElementById('dashboard-content').innerHTML = `
            <!-- Métricas Principais -->
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.5rem; margin-bottom: 2rem;">
                <div style="background: white; padding: 1.5rem; border-radius: 16px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); border-left: 4px solid var(--primary-green); text-align: center;">
                    <div style="font-size: 2.5rem; font-weight: 700; color: var(--primary-green); margin-bottom: 0.5rem;">${Number(ultimaLeitura.pH || ultimaLeitura.ph || 0).toFixed(1)}</div>
                    <div style="font-size: 0.9rem; color: var(--gray-600); font-weight: 500;">pH do Solo</div>
                    <div style="font-size: 0.8rem; color: ${Number(ultimaLeitura.pH || ultimaLeitura.ph || 0) >= 6.0 && Number(ultimaLeitura.pH || ultimaLeitura.ph || 0) <= 7.0 ? 'var(--primary-green)' : 'var(--orange)'}; margin-top: 0.25rem;">${Number(ultimaLeitura.pH || ultimaLeitura.ph || 0) >= 6.0 && Number(ultimaLeitura.pH || ultimaLeitura.ph || 0) <= 7.0 ? '✓ Ideal' : '⚠ Atenção'}</div>
                </div>
                
                <div style="background: white; padding: 1.5rem; border-radius: 16px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); border-left: 4px solid var(--tech-blue); text-align: center;">
                    <div style="font-size: 2.5rem; font-weight: 700; color: var(--tech-blue); margin-bottom: 0.5rem;">${Number(ultimaLeitura.umidade || 0).toFixed(0)}%</div>
                    <div style="font-size: 0.9rem; color: var(--gray-600); font-weight: 500;">Umidade</div>
                    <div style="font-size: 0.8rem; color: ${Number(ultimaLeitura.umidade || 0) >= 60 && Number(ultimaLeitura.umidade || 0) <= 80 ? 'var(--primary-green)' : 'var(--orange)'}; margin-top: 0.25rem;">${Number(ultimaLeitura.umidade || 0) >= 60 && Number(ultimaLeitura.umidade || 0) <= 80 ? '✓ Ideal' : '⚠ Atenção'}</div>
                </div>
                
                <div style="background: white; padding: 1.5rem; border-radius: 16px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); border-left: 4px solid var(--orange); text-align: center;">
                    <div style="font-size: 2.5rem; font-weight: 700; color: var(--orange); margin-bottom: 0.5rem;">${Number(ultimaLeitura.temperatura || 0).toFixed(0)}°C</div>
                    <div style="font-size: 0.9rem; color: var(--gray-600); font-weight: 500;">Temperatura</div>
                    <div style="font-size: 0.8rem; color: ${Number(ultimaLeitura.temperatura || 0) >= 20 && Number(ultimaLeitura.temperatura || 0) <= 30 ? 'var(--primary-green)' : 'var(--orange)'}; margin-top: 0.25rem;">${Number(ultimaLeitura.temperatura || 0) >= 20 && Number(ultimaLeitura.temperatura || 0) <= 30 ? '✓ Ideal' : '⚠ Atenção'}</div>
                </div>
                
                <div style="background: white; padding: 1.5rem; border-radius: 16px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); border-left: 4px solid var(--purple); text-align: center;">
                    <div style="font-size: 2.5rem; font-weight: 700; color: var(--purple); margin-bottom: 0.5rem;">${leituras.length}</div>
                    <div style="font-size: 0.9rem; color: var(--gray-600); font-weight: 500;">Total Leituras</div>
                    <div style="font-size: 0.8rem; color: var(--gray-500); margin-top: 0.25rem;">Histórico completo</div>
                </div>
            </div>
            
            <!-- Informações Detalhadas -->
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin-bottom: 2rem;">
                <!-- Card Usuário e Propriedade -->
                <div style="background: white; padding: 2rem; border-radius: 16px; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
                    <!-- Header do Card -->
                    <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 2rem; padding-bottom: 1rem; border-bottom: 2px solid var(--gray-100);">
                        <div style="width: 56px; height: 56px; background: linear-gradient(135deg, var(--primary-green), var(--secondary-green)); border-radius: 16px; display: flex; align-items: center; justify-content: center; color: white; font-size: 1.4rem;">
                            <i class="fas fa-user-circle"></i>
                        </div>
                        <div>
                            <h3 style="font-family: 'Poppins', sans-serif; color: var(--gray-900); margin: 0; font-size: 1.4rem; font-weight: 600;">${perfil.nome}</h3>
                            <p style="color: var(--gray-600); margin: 0.25rem 0 0 0; font-size: 0.95rem; display: flex; align-items: center; gap: 0.5rem;"><i class="fas fa-tractor" style="color: var(--primary-green); font-size: 0.9rem;"></i> ${perfil.nome_fazenda || 'Fazenda não informada'}</p>
                        </div>
                    </div>
                    
                    <!-- Dados Pessoais -->
                    <div style="margin-bottom: 2rem;">
                        <h4 style="color: var(--gray-800); margin-bottom: 1rem; font-size: 1.1rem; font-weight: 600; display: flex; align-items: center; gap: 0.5rem;">
                            <i class="fas fa-address-card" style="color: var(--tech-blue); font-size: 1rem;"></i> Dados Pessoais
                        </h4>
                        <div style="display: grid; gap: 0.75rem;">
                            <div style="display: flex; align-items: center; gap: 0.75rem; padding: 0.75rem; background: var(--gray-50); border-radius: 8px;">
                                <i class="fas fa-envelope" style="color: var(--gray-500); width: 16px; text-align: center;"></i>
                                <span style="font-size: 0.9rem; color: var(--gray-700);"><strong>Email:</strong> ${perfil.email}</span>
                            </div>
                            <div style="display: flex; align-items: center; gap: 0.75rem; padding: 0.75rem; background: var(--gray-50); border-radius: 8px;">
                                <i class="fas fa-user-tag" style="color: var(--gray-500); width: 16px; text-align: center;"></i>
                                <span style="font-size: 0.9rem; color: var(--gray-700);"><strong>Papel:</strong> ${perfil.papel}</span>
                            </div>
                            <div style="display: flex; align-items: center; gap: 0.75rem; padding: 0.75rem; background: var(--gray-50); border-radius: 8px;">
                                <i class="fas fa-phone" style="color: var(--gray-500); width: 16px; text-align: center;"></i>
                                <span style="font-size: 0.9rem; color: var(--gray-700);"><strong>Telefone:</strong> ${perfil.telefone || 'N/A'}</span>
                            </div>
                            <div style="display: flex; align-items: center; gap: 0.75rem; padding: 0.75rem; background: var(--gray-50); border-radius: 8px;">
                                <i class="fas fa-map-marker-alt" style="color: var(--gray-500); width: 16px; text-align: center;"></i>
                                <span style="font-size: 0.9rem; color: var(--gray-700);"><strong>Localização:</strong> ${perfil.localizacao?.cidade || 'N/A'}, ${perfil.localizacao?.estado || 'N/A'}</span>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Dados da Propriedade -->
                    <div>
                        <h4 style="color: var(--gray-800); margin-bottom: 1rem; font-size: 1.1rem; font-weight: 600; display: flex; align-items: center; gap: 0.5rem;">
                            <i class="fas fa-home" style="color: var(--orange); font-size: 1rem;"></i> Propriedade
                        </h4>
                        <div style="display: grid; gap: 0.75rem;">
                            <div style="display: flex; align-items: center; gap: 0.75rem; padding: 0.75rem; background: var(--gray-50); border-radius: 8px;">
                                <i class="fas fa-expand-arrows-alt" style="color: var(--gray-500); width: 16px; text-align: center;"></i>
                                <span style="font-size: 0.9rem; color: var(--gray-700);"><strong>Área Total:</strong> ${perfil.propriedade?.area_total_hectares || 0} ha</span>
                            </div>
                            <div style="display: flex; align-items: center; gap: 0.75rem; padding: 0.75rem; background: var(--gray-50); border-radius: 8px;">
                                <i class="fas fa-seedling" style="color: var(--gray-500); width: 16px; text-align: center;"></i>
                                <span style="font-size: 0.9rem; color: var(--gray-700);"><strong>Área Cultivada:</strong> ${perfil.propriedade?.area_cultivada_hectares || 0} ha</span>
                            </div>
                            <div style="display: flex; align-items: center; gap: 0.75rem; padding: 0.75rem; background: var(--gray-50); border-radius: 8px;">
                                <i class="fas fa-leaf" style="color: var(--gray-500); width: 16px; text-align: center;"></i>
                                <span style="font-size: 0.9rem; color: var(--gray-700);"><strong>Cultivo Principal:</strong> ${perfil.propriedade?.cultivo_principal || 'N/A'}</span>
                            </div>
                            <div style="display: flex; align-items: center; gap: 0.75rem; padding: 0.75rem; background: var(--gray-50); border-radius: 8px;">
                                <i class="fas fa-mountain" style="color: var(--gray-500); width: 16px; text-align: center;"></i>
                                <span style="font-size: 0.9rem; color: var(--gray-700);"><strong>Tipo de Solo:</strong> ${perfil.propriedade?.tipo_solo || 'N/A'}</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Card NPK e Micronutrientes -->
                <div style="background: white; padding: 2rem; border-radius: 16px; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
                    <!-- Header do Card -->
                    <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 2rem; padding-bottom: 1rem; border-bottom: 2px solid var(--gray-100);">
                        <div style="width: 56px; height: 56px; background: linear-gradient(135deg, var(--primary-green), var(--secondary-green)); border-radius: 16px; display: flex; align-items: center; justify-content: center; color: white; font-size: 1.4rem;">
                            <i class="fas fa-leaf"></i>
                        </div>
                        <div>
                            <h3 style="font-family: 'Poppins', sans-serif; color: var(--gray-900); margin: 0; font-size: 1.4rem; font-weight: 600;">Nutrientes</h3>
                            <p style="color: var(--gray-600); margin: 0.25rem 0 0 0; font-size: 0.95rem;">NPK e Micronutrientes</p>
                        </div>
                    </div>
                    
                    <!-- NPK Principal -->
                    <div style="margin-bottom: 2rem;">
                        <h4 style="color: var(--gray-800); margin-bottom: 1rem; font-size: 1.1rem; font-weight: 600; display: flex; align-items: center; gap: 0.5rem;">
                            <i class="fas fa-flask" style="color: var(--primary-green); font-size: 1rem;"></i> NPK Principal
                        </h4>
                        <div style="display: grid; gap: 0.75rem;">
                            <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.75rem; background: linear-gradient(135deg, rgba(5, 150, 105, 0.05), rgba(5, 150, 105, 0.02)); border-radius: 8px; border-left: 3px solid var(--primary-green);">
                                <span style="display: flex; align-items: center; gap: 0.5rem; font-weight: 600; color: var(--gray-700);"><i class="fas fa-seedling" style="color: var(--primary-green); font-size: 0.9rem;"></i> Nitrogênio</span>
                                <span style="font-family: 'JetBrains Mono', monospace; font-weight: 600; color: var(--primary-green); font-size: 1rem;">${Number(npk.nitrogenio || 0).toFixed(1)} ppm</span>
                            </div>
                            <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.75rem; background: linear-gradient(135deg, rgba(59, 130, 246, 0.05), rgba(59, 130, 246, 0.02)); border-radius: 8px; border-left: 3px solid var(--tech-blue);">
                                <span style="display: flex; align-items: center; gap: 0.5rem; font-weight: 600; color: var(--gray-700);"><i class="fas fa-tree" style="color: var(--tech-blue); font-size: 0.9rem;"></i> Fósforo</span>
                                <span style="font-family: 'JetBrains Mono', monospace; font-weight: 600; color: var(--tech-blue); font-size: 1rem;">${Number(npk.fosforo || 0).toFixed(1)} ppm</span>
                            </div>
                            <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.75rem; background: linear-gradient(135deg, rgba(245, 158, 11, 0.05), rgba(245, 158, 11, 0.02)); border-radius: 8px; border-left: 3px solid var(--orange);">
                                <span style="display: flex; align-items: center; gap: 0.5rem; font-weight: 600; color: var(--gray-700);"><i class="fas fa-apple-alt" style="color: var(--orange); font-size: 0.9rem;"></i> Potássio</span>
                                <span style="font-family: 'JetBrains Mono', monospace; font-weight: 600; color: var(--orange); font-size: 1rem;">${Number(npk.potassio || 0).toFixed(1)} ppm</span>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Micronutrientes -->
                    <div>
                        <h4 style="color: var(--gray-800); margin-bottom: 1rem; font-size: 1.1rem; font-weight: 600; display: flex; align-items: center; gap: 0.5rem;">
                            <i class="fas fa-atom" style="color: var(--purple); font-size: 1rem;"></i> Micronutrientes
                        </h4>
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem;">
                            <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.75rem; background: var(--gray-50); border-radius: 8px;">
                                <span style="display: flex; align-items: center; gap: 0.5rem; font-weight: 600; color: var(--gray-700); font-size: 0.85rem;"><i class="fas fa-circle" style="color: var(--teal); font-size: 0.7rem;"></i> Cálcio</span>
                                <span style="font-family: 'JetBrains Mono', monospace; font-weight: 600; color: var(--gray-800); font-size: 0.9rem;">${Number(micro.calcio || 0).toFixed(0)}</span>
                            </div>
                            <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.75rem; background: var(--gray-50); border-radius: 8px;">
                                <span style="display: flex; align-items: center; gap: 0.5rem; font-weight: 600; color: var(--gray-700); font-size: 0.85rem;"><i class="fas fa-circle" style="color: var(--pink); font-size: 0.7rem;"></i> Magnésio</span>
                                <span style="font-family: 'JetBrains Mono', monospace; font-weight: 600; color: var(--gray-800); font-size: 0.9rem;">${Number(micro.magnesio || 0).toFixed(0)}</span>
                            </div>
                            <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.75rem; background: var(--gray-50); border-radius: 8px;">
                                <span style="display: flex; align-items: center; gap: 0.5rem; font-weight: 600; color: var(--gray-700); font-size: 0.85rem;"><i class="fas fa-circle" style="color: var(--amber); font-size: 0.7rem;"></i> Enxofre</span>
                                <span style="font-family: 'JetBrains Mono', monospace; font-weight: 600; color: var(--gray-800); font-size: 0.9rem;">${Number(micro.enxofre || 0).toFixed(0)}</span>
                            </div>
                            <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.75rem; background: var(--gray-50); border-radius: 8px;">
                                <span style="display: flex; align-items: center; gap: 0.5rem; font-weight: 600; color: var(--gray-700); font-size: 0.85rem;"><i class="fas fa-circle" style="color: var(--indigo); font-size: 0.7rem;"></i> M. Orgânica</span>
                                <span style="font-family: 'JetBrains Mono', monospace; font-weight: 600; color: var(--gray-800); font-size: 0.9rem;">${Number(ultimaLeitura.materia_organica_pct || 0).toFixed(1)}%</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            ${ultimaLeitura.dispositivo ? `
            <!-- Informações do Sensor -->
            <div style="background: linear-gradient(135deg, var(--gray-50), var(--white)); padding: 2rem; border-radius: 16px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); border: 1px solid var(--gray-200);">
                <h4 style="color: var(--gray-800); margin-bottom: 1.5rem; font-size: 1.2rem; font-weight: 600; display: flex; align-items: center; gap: 0.5rem;">
                    <i class="fas fa-satellite-dish" style="color: var(--cyan);"></i> Status do Sensor
                </h4>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 1.5rem;">
                    <div style="text-align: center; padding: 1rem; background: white; border-radius: 12px; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
                        <div style="font-size: 1.5rem; font-weight: 700; color: var(--cyan); margin-bottom: 0.5rem;">${ultimaLeitura.bateria_sensor_pct || 0}%</div>
                        <div style="font-size: 0.9rem; color: var(--gray-600);">Bateria</div>
                    </div>
                    <div style="text-align: center; padding: 1rem; background: white; border-radius: 12px; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
                        <div style="font-size: 1.2rem; font-weight: 600; color: var(--gray-800); margin-bottom: 0.5rem;">${ultimaLeitura.qualidade_sinal || 'N/A'}</div>
                        <div style="font-size: 0.9rem; color: var(--gray-600);">Sinal</div>
                    </div>
                    <div style="text-align: center; padding: 1rem; background: white; border-radius: 12px; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
                        <div style="font-size: 1.2rem; font-weight: 600; color: var(--gray-800); margin-bottom: 0.5rem;">${ultimaLeitura.localizacao_sensor?.setor || 'N/A'}</div>
                        <div style="font-size: 0.9rem; color: var(--gray-600);">Setor</div>
                    </div>
                    <div style="text-align: center; padding: 1rem; background: white; border-radius: 12px; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
                        <div style="font-size: 1.2rem; font-weight: 600; color: var(--gray-800); margin-bottom: 0.5rem;">${ultimaLeitura.localizacao_sensor?.profundidade_cm || 0} cm</div>
                        <div style="font-size: 0.9rem; color: var(--gray-600);">Profundidade</div>
                    </div>
                </div>
            </div>
            ` : ''}
        `;
    }

    loadProfileContent(perfil) {
        // Método será sobrescrito pelo dashboard-extended.js
        this.showLoading('profile-content', 'Carregando perfil...');
    }

    loadReadingsContent(perfil) {
        // Método será sobrescrito pelo dashboard-extended.js
        this.showLoading('readings-content', 'Carregando histórico...');
    }

    async loadAIContent(userId) {
        // Método será sobrescrito pelo dashboard-extended.js
        this.showLoading('ai-content', 'Carregando análise de IA...');
    }

    loadHeatmapContent(perfil) {
        // Método será sobrescrito pelo dashboard-extended.js
        this.showLoading('heatmap-content', 'Carregando mapas de calor...');
    }

    initializeCharts() {
        // Método será sobrescrito pelo dashboard-extended.js
    }

    updateHeatmapView() {
        // Método será sobrescrito pelo dashboard-extended.js
    }

    getColorByValue(valor, parametro) {
        // Método será sobrescrito pelo dashboard-extended.js
        return '#00aa00';
    }
}

// Inicializar quando DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    window.dashboardManager = new DashboardManager();
});

// Funções globais para compatibilidade
function showSection(sectionId, clickedElement) { window.dashboardManager.showSection(sectionId, clickedElement); }
function logout() { window.dashboardManager.logout(); }