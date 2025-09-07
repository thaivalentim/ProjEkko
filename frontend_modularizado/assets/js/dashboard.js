// 📊 DASHBOARD - Funcionalidades completas do EKKO

const baseUrl = "http://127.0.0.1:8000";

// Variáveis globais para os gráficos
let heatmapChart = null;
let timelineChart = null;

// Verificar conectividade da API
async function checkAPIConnection() {
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 3000);
        
        const response = await fetch(`${baseUrl}/`, { 
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

function checkAuthentication() {
    const token = localStorage.getItem('userToken');
    const adminAccess = localStorage.getItem('adminAccess');
    const urlParams = new URLSearchParams(window.location.search);
    const userIdParam = urlParams.get('userId');
    
    if (userIdParam && adminAccess) {
        setTimeout(() => buscarPerfil(userIdParam), 500);
    } else if (token) {
        const userId = localStorage.getItem('userId');
        if (userId) {
            setTimeout(() => buscarPerfil(userId), 500);
        }
    } else {
        window.location.href = 'login.html';
    }
}

function logout() {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userId');
    localStorage.removeItem('adminAccess');
    localStorage.removeItem('currentUserId');
    window.location.href = 'login.html';
}

function showMessage(text, type = 'success', duration = 5000) {
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

function showLoading(elementId, text = 'Carregando...') {
    const element = document.getElementById(elementId);
    if (element) {
        element.innerHTML = `<div class="loading"><i class="fas fa-spinner"></i> ${text}</div>`;
    }
}

function showError(elementId, message = 'Erro ao carregar dados') {
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

function showEmpty(elementId, message = 'Nenhum dado encontrado') {
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

function showSection(sectionId, clickedElement = null) {
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });
    
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    
    const targetSection = document.getElementById(sectionId + '-section');
    if (targetSection) {
        targetSection.classList.add('active');
    }
    
    if (clickedElement) {
        clickedElement.classList.add('active');
    }
    
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

function showNavigation() {
    document.getElementById('nav-profile').style.display = 'block';
    document.getElementById('nav-ai').style.display = 'block';
    document.getElementById('nav-heatmap').style.display = 'block';
    document.getElementById('nav-readings').style.display = 'block';
}

async function buscarPerfil(userId = null) {
    if (!userId) {
        console.error('ID do usuário não fornecido');
        return;
    }

    showLoading('dashboard-content', 'Carregando dados do usuário...');
    showLoading('profile-content', 'Carregando perfil...');
    showLoading('ai-content', 'Carregando análise de IA...');
    showLoading('heatmap-content', 'Carregando mapas de calor...');
    showLoading('readings-content', 'Carregando histórico...');
    
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 15000);
        
        const response = await fetch(`${baseUrl}/perfil/${userId}`, {
            signal: controller.signal,
            headers: {
                'Accept': 'application/json'
            }
        });
        
        clearTimeout(timeoutId);
        
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ detail: 'Erro desconhecido' }));
            showMessage(`Erro ao buscar perfil: ${errorData.detail}`, 'error');
            
            showError('dashboard-content', 'Não foi possível carregar os dados do usuário');
            showError('profile-content', 'Não foi possível carregar o perfil');
            showError('ai-content', 'Não foi possível carregar a análise de IA');
            showError('heatmap-content', 'Não foi possível carregar os mapas de calor');
            showError('readings-content', 'Não foi possível carregar o histórico');
            return;
        }
        
        const perfil = await response.json();
        
        if (!perfil || !perfil.nome) {
            showMessage('Dados do perfil incompletos ou inválidos', 'error');
            return;
        }
        
        showNavigation();
        window.currentUserData = perfil;
        
        try {
            loadDashboardContent(perfil);
        } catch (e) {
            showError('dashboard-content', 'Erro ao processar dados do dashboard');
        }
        
        try {
            loadProfileContent(perfil);
        } catch (e) {
            showError('profile-content', 'Erro ao processar dados do perfil');
        }
        
        try {
            loadReadingsContent(perfil);
        } catch (e) {
            showError('readings-content', 'Erro ao processar histórico de leituras');
        }
        
        setTimeout(() => {
            loadAIContent(userId).catch(() => {
                showError('ai-content', 'Sistema de IA temporariamente indisponível');
            });
        }, 100);
        
        try {
            loadHeatmapContent(perfil);
        } catch (e) {
            showError('heatmap-content', 'Erro ao gerar mapas de calor');
        }
        
        showSection('dashboard', document.getElementById('nav-dashboard'));
        showMessage(`Perfil de ${perfil.nome} carregado com sucesso!`, 'success', 3000);
        
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
        
        showMessage(errorMsg, 'error', 0);
        
        showError('dashboard-content', 'Falha na conexão com o servidor');
        showError('profile-content', 'Falha na conexão com o servidor');
        showError('ai-content', 'Falha na conexão com o servidor');
        showError('heatmap-content', 'Falha na conexão com o servidor');
        showError('readings-content', 'Falha na conexão com o servidor');
    }
}

function loadDashboardContent(perfil) {
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

function loadProfileContent(perfil) {
    const loc = perfil.localizacao || {};
    const prop = perfil.propriedade || {};
    const tecnico = perfil.dados_tecnicos || {};
    const dataNascimento = perfil.data_nascimento ? new Date(perfil.data_nascimento).toLocaleDateString('pt-BR') : 'N/A';
    const dataCadastro = perfil.data_cadastro ? new Date(perfil.data_cadastro).toLocaleDateString('pt-BR') : 'N/A';
    
    document.getElementById('profile-content').innerHTML = `
        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1.5rem; margin-bottom: 2rem;">
            <!-- Dados Pessoais -->
            <div style="background: white; padding: 1.75rem; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); border-left: 4px solid var(--primary-green);">
                <h3 style="color: var(--primary-green); margin-bottom: 1.5rem; display: flex; align-items: center; gap: 0.5rem; font-size: 1.1rem;">
                    <i class="fas fa-user-circle"></i> Dados Pessoais
                </h3>
                <div style="space-y: 0.7rem;">
                    <p style="margin-bottom: 0.7rem; font-size: 0.9rem;"><i class="fas fa-user" style="width: 18px; color: #666;"></i> <strong>Nome:</strong> ${perfil.nome || 'N/A'}</p>
                    <p style="margin-bottom: 0.7rem; font-size: 0.9rem;"><i class="fas fa-envelope" style="width: 18px; color: #666;"></i> <strong>Email:</strong> ${perfil.email || 'N/A'}</p>
                    <p style="margin-bottom: 0.7rem; font-size: 0.9rem;"><i class="fas fa-id-card" style="width: 18px; color: #666;"></i> <strong>CPF:</strong> ${perfil.cpf || 'N/A'}</p>
                    <p style="margin-bottom: 0.7rem; font-size: 0.9rem;"><i class="fas fa-phone" style="width: 18px; color: #666;"></i> <strong>Telefone:</strong> ${perfil.telefone || 'N/A'}</p>
                    <p style="margin-bottom: 0.7rem; font-size: 0.9rem;"><i class="fas fa-birthday-cake" style="width: 18px; color: #666;"></i> <strong>Data Nascimento:</strong> ${dataNascimento}</p>
                    <p style="margin-bottom: 0.7rem; font-size: 0.9rem;"><i class="fas fa-user-tag" style="width: 18px; color: #666;"></i> <strong>Papel:</strong> ${perfil.papel || 'N/A'}</p>
                    <p style="margin-bottom: 0.7rem; font-size: 0.9rem;"><i class="fas fa-calendar-plus" style="width: 18px; color: #666;"></i> <strong>Data Cadastro:</strong> ${dataCadastro}</p>
                    <p style="margin-bottom: 0.7rem; font-size: 0.9rem;"><i class="fas fa-check-circle" style="width: 18px; color: #666;"></i> <strong>Status:</strong> ${perfil.status || 'ativo'}</p>
                </div>
            </div>
            
            <!-- Localização -->
            <div style="background: white; padding: 1.75rem; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); border-left: 4px solid #ff9800;">
                <h3 style="color: #ff9800; margin-bottom: 1.5rem; display: flex; align-items: center; gap: 0.5rem; font-size: 1.1rem;">
                    <i class="fas fa-map-marker-alt"></i> Localização
                </h3>
                <div style="space-y: 0.7rem;">
                    <p style="margin-bottom: 0.7rem; font-size: 0.9rem;"><i class="fas fa-road" style="width: 18px; color: #666;"></i> <strong>Endereço:</strong> ${loc.endereco || 'N/A'}</p>
                    <p style="margin-bottom: 0.7rem; font-size: 0.9rem;"><i class="fas fa-city" style="width: 18px; color: #666;"></i> <strong>Cidade:</strong> ${loc.cidade || 'N/A'}</p>
                    <p style="margin-bottom: 0.7rem; font-size: 0.9rem;"><i class="fas fa-flag" style="width: 18px; color: #666;"></i> <strong>Estado:</strong> ${loc.estado || 'N/A'}</p>
                    <p style="margin-bottom: 0.7rem; font-size: 0.9rem;"><i class="fas fa-globe-americas" style="width: 18px; color: #666;"></i> <strong>Região:</strong> ${loc.regiao || 'N/A'}</p>
                    <p style="margin-bottom: 0.7rem; font-size: 0.9rem;"><i class="fas fa-mail-bulk" style="width: 18px; color: #666;"></i> <strong>CEP:</strong> ${loc.cep || 'N/A'}</p>
                    <p style="margin-bottom: 0.7rem; font-size: 0.9rem;"><i class="fas fa-crosshairs" style="width: 18px; color: #666;"></i> <strong>Latitude:</strong> ${loc.coordenadas?.latitude ? Number(loc.coordenadas.latitude).toFixed(6) : 'N/A'}</p>
                    <p style="margin-bottom: 0.7rem; font-size: 0.9rem;"><i class="fas fa-crosshairs" style="width: 18px; color: #666;"></i> <strong>Longitude:</strong> ${loc.coordenadas?.longitude ? Number(loc.coordenadas.longitude).toFixed(6) : 'N/A'}</p>
                </div>
            </div>
            
            <!-- Propriedade -->
            <div style="background: white; padding: 1.75rem; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); border-left: 4px solid var(--tech-blue);">
                <h3 style="color: var(--tech-blue); margin-bottom: 1.5rem; display: flex; align-items: center; gap: 0.5rem; font-size: 1.1rem;">
                    <i class="fas fa-tractor"></i> Propriedade
                </h3>
                <div style="space-y: 0.7rem;">
                    <p style="margin-bottom: 0.7rem; font-size: 0.9rem;"><i class="fas fa-home" style="width: 18px; color: #666;"></i> <strong>Nome da Fazenda:</strong> ${perfil.nome_fazenda || 'N/A'}</p>
                    <p style="margin-bottom: 0.7rem; font-size: 0.9rem;"><i class="fas fa-expand-arrows-alt" style="width: 18px; color: #666;"></i> <strong>Área Total:</strong> ${prop.area_total_hectares || 0} hectares</p>
                    <p style="margin-bottom: 0.7rem; font-size: 0.9rem;"><i class="fas fa-seedling" style="width: 18px; color: #666;"></i> <strong>Área Cultivada:</strong> ${prop.area_cultivada_hectares || 0} hectares</p>
                    <p style="margin-bottom: 0.7rem; font-size: 0.9rem;"><i class="fas fa-leaf" style="width: 18px; color: #666;"></i> <strong>Cultivo Principal:</strong> ${prop.cultivo_principal || 'N/A'}</p>
                    <p style="margin-bottom: 0.7rem; font-size: 0.9rem;"><i class="fas fa-list" style="width: 18px; color: #666;"></i> <strong>Cultivos Secundários:</strong> ${Array.isArray(prop.cultivos_secundarios) ? prop.cultivos_secundarios.join(', ') || 'Nenhum' : 'Nenhum'}</p>
                    <p style="margin-bottom: 0.7rem; font-size: 0.9rem;"><i class="fas fa-mountain" style="width: 18px; color: #666;"></i> <strong>Tipo de Solo:</strong> ${prop.tipo_solo || 'N/A'}</p>
                    <p style="margin-bottom: 0.7rem; font-size: 0.9rem;"><i class="fas fa-tint" style="width: 18px; color: #666;"></i> <strong>Sistema de Irrigação:</strong> ${prop.sistema_irrigacao || 'N/A'}</p>
                </div>
            </div>
        </div>
        
        <!-- Dados Técnicos - Card largo -->
        <div style="background: white; padding: 2rem; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); border-left: 4px solid #4caf50;">
            <h3 style="color: #4caf50; margin-bottom: 1.5rem; display: flex; align-items: center; gap: 0.5rem;">
                <i class="fas fa-cogs"></i> Dados Técnicos
            </h3>
            <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 2rem; text-align: center;" id="technical-fields">
                <div>
                    <div style="font-weight: 500; color: var(--gray-600); font-size: 0.9rem; margin-bottom: 0.5rem;">Experiência</div>
                    <div style="font-family: 'Inter', sans-serif; font-weight: 600; font-size: 1.1rem; color: var(--gray-900);">${tecnico.experiencia_anos || 0} anos</div>
                </div>
                <div>
                    <div style="font-weight: 500; color: var(--gray-600); font-size: 0.9rem; margin-bottom: 0.5rem;">Nível Tecnológico</div>
                    <div style="font-family: 'Inter', sans-serif; font-weight: 600; font-size: 1.1rem; color: var(--gray-900);">${tecnico.nivel_tecnologia || 'N/A'}</div>
                </div>
                <div>
                    <div style="font-weight: 500; color: var(--gray-600); font-size: 0.9rem; margin-bottom: 0.5rem;">Certificações</div>
                    <div style="font-family: 'Inter', sans-serif; font-weight: 600; font-size: 1.1rem; color: var(--gray-900);">${Array.isArray(tecnico.certificacoes) ? tecnico.certificacoes.join(', ') || 'Nenhuma' : 'Nenhuma'}</div>
                </div>
            </div>
        </div>
    `;
}

function loadReadingsContent(perfil) {
    const leituras = perfil.leituras_solo || [];
    
    if (leituras.length === 0) {
        showEmpty('readings-content', 'Nenhuma leitura de solo encontrada para este usuário');
        return;
    }
    
    let tableHTML = `
        <div style="overflow-x: auto; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
            <table style="width: 100%; border-collapse: collapse; background: white; border-radius: 12px; overflow: hidden;">
                <thead>
                    <tr style="background: linear-gradient(135deg, var(--primary-green), var(--secondary-green)); color: white;">
                        <th style="padding: 1rem; text-align: left; font-weight: 600;"><i class="fas fa-calendar"></i> Data/Hora</th>
                        <th style="padding: 1rem; text-align: left; font-weight: 600;"><i class="fas fa-flask"></i> pH</th>
                        <th style="padding: 1rem; text-align: left; font-weight: 600;"><i class="fas fa-tint"></i> Umidade</th>
                        <th style="padding: 1rem; text-align: left; font-weight: 600;"><i class="fas fa-thermometer-half"></i> Temperatura</th>
                        <th style="padding: 1rem; text-align: left; font-weight: 600;"><i class="fas fa-bolt"></i> Condutividade</th>
                        <th style="padding: 1rem; text-align: left; font-weight: 600;"><i class="fas fa-water"></i> Salinidade</th>
                        <th style="padding: 1rem; text-align: left; font-weight: 600;"><i class="fas fa-leaf"></i> NPK</th>
                        <th style="padding: 1rem; text-align: left; font-weight: 600;"><i class="fas fa-seedling"></i> Micronutrientes</th>
                        <th style="padding: 1rem; text-align: left; font-weight: 600;"><i class="fas fa-percentage"></i> Mat. Orgânica</th>
                        <th style="padding: 1rem; text-align: left; font-weight: 600;"><i class="fas fa-weight"></i> Densidade</th>
                        <th style="padding: 1rem; text-align: left; font-weight: 600;"><i class="fas fa-satellite-dish"></i> Dispositivo</th>
                        <th style="padding: 1rem; text-align: left; font-weight: 600;"><i class="fas fa-map-marker"></i> Setor</th>
                        <th style="padding: 1rem; text-align: left; font-weight: 600;"><i class="fas fa-signal"></i> Sinal</th>
                        <th style="padding: 1rem; text-align: left; font-weight: 600;"><i class="fas fa-battery-half"></i> Bateria</th>
                    </tr>
                </thead>
                <tbody>
    `;
    
    leituras.forEach((leitura, index) => {
        const data = new Date(leitura.data_leitura);
        const npk = leitura.NPK || {};
        const micro = leitura.micronutrientes || {};
        const locSensor = leitura.localizacao_sensor || {};
        
        const npkStr = `N:${Number(npk.nitrogenio || 0).toFixed(0)} P:${Number(npk.fosforo || 0).toFixed(0)} K:${Number(npk.potassio || 0).toFixed(0)}`;
        const microStr = `Ca:${Number(micro.calcio || 0).toFixed(0)} Mg:${Number(micro.magnesio || 0).toFixed(0)} S:${Number(micro.enxofre || 0).toFixed(0)}`;
        const setorStr = `${locSensor.setor || 'N/A'} (${locSensor.profundidade_cm || 0}cm)`;
        const bgColor = index % 2 === 0 ? '#f8f9fa' : 'white';
        
        tableHTML += `
            <tr style="border-bottom: 1px solid #eee; background-color: ${bgColor};" onmouseover="this.style.backgroundColor='#e8f5e8'" onmouseout="this.style.backgroundColor='${bgColor}'">
                <td style="padding: 1rem; font-size: 0.9rem;">${data.toLocaleString('pt-BR')}</td>
                <td style="padding: 1rem; font-weight: 600; color: ${Number(leitura.ph || leitura.pH || 0) >= 6.0 && Number(leitura.ph || leitura.pH || 0) <= 7.0 ? '#4caf50' : '#ff9800'};">${Number(leitura.ph || leitura.pH || 0).toFixed(1)}</td>
                <td style="padding: 1rem; font-weight: 600; color: ${Number(leitura.umidade || 0) >= 60 && Number(leitura.umidade || 0) <= 80 ? '#4caf50' : '#ff9800'};">${Number(leitura.umidade || 0).toFixed(1)}%</td>
                <td style="padding: 1rem; font-weight: 600; color: ${Number(leitura.temperatura || 0) >= 20 && Number(leitura.temperatura || 0) <= 30 ? '#4caf50' : '#ff9800'};">${Number(leitura.temperatura || 0).toFixed(1)}°C</td>
                <td style="padding: 1rem;">${Number(leitura.condutividade_eletrica || 0).toFixed(2)} mS/cm</td>
                <td style="padding: 1rem;">${Number(leitura.salinidade || 0).toFixed(2)} ppt</td>
                <td style="padding: 1rem; font-size: 0.9rem; font-family: 'Inter', sans-serif;">${npkStr}</td>
                <td style="padding: 1rem; font-size: 0.9rem; font-family: 'Inter', sans-serif;">${microStr}</td>
                <td style="padding: 1rem;">${Number(leitura.materia_organica_pct || 0).toFixed(1)}%</td>
                <td style="padding: 1rem;">${Number(leitura.densidade_solo || 0).toFixed(2)} g/cm³</td>
                <td style="padding: 1rem; font-size: 0.85rem;">${leitura.dispositivo || 'N/A'}</td>
                <td style="padding: 1rem; font-size: 0.85rem;">${setorStr}</td>
                <td style="padding: 1rem;">
                    <span style="padding: 0.2rem 0.5rem; border-radius: 4px; font-size: 0.8rem; font-weight: 600; 
                        ${leitura.qualidade_sinal === 'Excelente' ? 'background: #e8f5e8; color: #2e7d32;' : 
                          leitura.qualidade_sinal === 'Boa' ? 'background: #fff3e0; color: #f57c00;' : 
                          'background: #ffebee; color: #c62828;'}">
                        ${leitura.qualidade_sinal || 'N/A'}
                    </span>
                </td>
                <td style="padding: 1rem;">
                    <div style="display: flex; align-items: center; gap: 0.5rem;">
                        <div style="width: 30px; height: 6px; background: #eee; border-radius: 3px; overflow: hidden;">
                            <div style="width: ${leitura.bateria_sensor_pct || 0}%; height: 100%; background: ${(leitura.bateria_sensor_pct || 0) > 50 ? '#4caf50' : (leitura.bateria_sensor_pct || 0) > 20 ? '#ff9800' : '#f44336'}; transition: width 0.3s ease;"></div>
                        </div>
                        <span style="font-size: 0.85rem; font-weight: 600;">${leitura.bateria_sensor_pct || 0}%</span>
                    </div>
                </td>
            </tr>
        `;
    });
    
    tableHTML += '</tbody></table></div>';
    
    if (leituras.length > 0) {
        const avgPh = (leituras.reduce((sum, l) => sum + Number(l.ph || l.pH || 0), 0) / leituras.length).toFixed(1);
        const avgUmidade = (leituras.reduce((sum, l) => sum + Number(l.umidade || 0), 0) / leituras.length).toFixed(1);
        const avgTemp = (leituras.reduce((sum, l) => sum + Number(l.temperatura || 0), 0) / leituras.length).toFixed(1);
        
        tableHTML += `
            <div style="margin-top: 2rem; padding: 1.5rem; background: linear-gradient(135deg, #f8f9fa, #e9ecef); border-radius: 12px; border-left: 4px solid var(--primary-green);">
                <h4 style="color: var(--primary-green); margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem;">
                    <i class="fas fa-chart-bar"></i> Resumo Estatístico (${leituras.length} leituras)
                </h4>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 1rem; font-size: 0.9rem;">
                    <p><strong>pH Médio:</strong> ${avgPh}</p>
                    <p><strong>Umidade Média:</strong> ${avgUmidade}%</p>
                    <p><strong>Temperatura Média:</strong> ${avgTemp}°C</p>
                    <p><strong>Primeira Leitura:</strong> ${new Date(leituras[leituras.length - 1].data_leitura).toLocaleDateString('pt-BR')}</p>
                    <p><strong>Última Leitura:</strong> ${new Date(leituras[0].data_leitura).toLocaleDateString('pt-BR')}</p>
                </div>
            </div>
        `;
    }
    
    document.getElementById('readings-content').innerHTML = tableHTML;
}

async function loadAIContent(userId) {
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000);
        
        const response = await fetch(`${baseUrl}/diagnostico/${userId}`, {
            signal: controller.signal,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        
        clearTimeout(timeoutId);
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        const diagnostico = await response.json();
        const analise = diagnostico.analise_atual || {};
        
        let aiHTML = `
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem;">
                <div style="background: linear-gradient(135deg, ${analise.cor_indicador === 'verde' ? '#e8f5e8, #c8e6c8' : analise.cor_indicador === 'amarelo' ? '#fff3e0, #ffe0b3' : '#ffebee, #ffcdd2'}); padding: 2rem; border-radius: 12px; border-left: 4px solid ${analise.cor_indicador === 'verde' ? '#4caf50' : analise.cor_indicador === 'amarelo' ? '#ff9800' : '#f44336'};">
                    <h3 style="color: ${analise.cor_indicador === 'verde' ? '#2e7d32' : analise.cor_indicador === 'amarelo' ? '#f57c00' : '#c62828'}; margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem;">
                        <i class="fas fa-${analise.cor_indicador === 'verde' ? 'check-circle' : analise.cor_indicador === 'amarelo' ? 'exclamation-triangle' : 'times-circle'}"></i>
                        Status Geral do Solo
                    </h3>
                    <div style="text-align: center; margin-bottom: 1rem;">
                        <div style="font-size: 3rem; font-weight: bold; color: ${analise.cor_indicador === 'verde' ? '#2e7d32' : analise.cor_indicador === 'amarelo' ? '#f57c00' : '#c62828'}; margin-bottom: 0.5rem;">
                            ${analise.score || 0}/100
                        </div>
                        <div style="font-size: 1.2rem; font-weight: 600; color: ${analise.cor_indicador === 'verde' ? '#2e7d32' : analise.cor_indicador === 'amarelo' ? '#f57c00' : '#c62828'};">
                            ${analise.status_geral || 'Analisando...'}
                        </div>
                    </div>
                </div>
        `;
        
        if (analise.diagnosticos && analise.diagnosticos.length > 0) {
            aiHTML += `
                <div style="background: white; padding: 2rem; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); border-left: 4px solid #ff9800;">
                    <h3 style="color: #f57c00; margin-bottom: 1.5rem; display: flex; align-items: center; gap: 0.5rem;">
                        <i class="fas fa-exclamation-triangle"></i> Diagnósticos Identificados
                    </h3>
                    <div style="space-y: 1rem;">
            `;
            analise.diagnosticos.forEach(diag => {
                aiHTML += `
                    <div style="padding: 1rem; background: #fff3e0; border-radius: 8px; border-left: 3px solid #ff9800; margin-bottom: 1rem;">
                        <i class="fas fa-warning" style="color: #f57c00; margin-right: 0.5rem;"></i>
                        ${diag}
                    </div>
                `;
            });
            aiHTML += '</div></div>';
        }
        
        if (analise.sugestoes && analise.sugestoes.length > 0) {
            aiHTML += `
                <div style="background: white; padding: 2rem; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); border-left: 4px solid #4caf50;">
                    <h3 style="color: #2e7d32; margin-bottom: 1.5rem; display: flex; align-items: center; gap: 0.5rem;">
                        <i class="fas fa-lightbulb"></i> Sugestões de Melhoria
                    </h3>
                    <div style="space-y: 1rem;">
            `;
            analise.sugestoes.forEach(sug => {
                aiHTML += `
                    <div style="padding: 1rem; background: #e8f5e8; border-radius: 8px; border-left: 3px solid #4caf50; margin-bottom: 1rem;">
                        <i class="fas fa-lightbulb" style="color: #2e7d32; margin-right: 0.5rem;"></i>
                        ${sug}
                    </div>
                `;
            });
            aiHTML += '</div></div>';
        }
        
        aiHTML += '</div>';
        
        try {
            const rapidResponse = await fetch(`${baseUrl}/analise-rapida/${userId}`);
            if (rapidResponse.ok) {
                const rapidData = await rapidResponse.json();
                aiHTML += `
                    <div style="margin-top: 2rem; background: linear-gradient(135deg, #e3f2fd, #bbdefb); padding: 2rem; border-radius: 12px; border-left: 4px solid #2196f3;">
                        <h3 style="color: #1976d2; margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem;">
                            <i class="fas fa-bolt"></i> Análise Rápida
                        </h3>
                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; font-size: 0.9rem;">
                            <p><strong>Fazenda:</strong> ${rapidData.fazenda || 'N/A'}</p>
                            <p><strong>Cultivo:</strong> ${rapidData.cultivo || 'N/A'}</p>
                            <p><strong>Data da Leitura:</strong> ${rapidData.leitura_data ? new Date(rapidData.leitura_data).toLocaleDateString('pt-BR') : 'N/A'}</p>
                        </div>
                    </div>
                `;
            }
        } catch (e) {
            // Ignorar erro da análise rápida
        }
        
        document.getElementById('ai-content').innerHTML = aiHTML;
        
    } catch (error) {
        console.error('Erro na IA:', error);
        let errorMessage = 'Sistema de diagnóstico temporariamente indisponível';
        
        if (error.name === 'AbortError') {
            errorMessage = 'Timeout na conexão com o sistema de IA';
        } else if (error.message.includes('HTTP')) {
            errorMessage = `Erro do servidor: ${error.message}`;
        }
        
        showError('ai-content', errorMessage);
    }
}

function loadHeatmapContent(perfil) {
    const leituras = perfil.leituras_solo || [];
    
    if (leituras.length === 0) {
        showEmpty('heatmap-content', 'Não há leituras suficientes para gerar mapas de calor');
        return;
    }
    
    if (leituras.length < 3) {
        document.getElementById('heatmap-content').innerHTML = `
            <div style="background: #fff3e0; padding: 2rem; border-radius: 12px; border-left: 4px solid #ff9800; text-align: center;">
                <i class="fas fa-info-circle" style="font-size: 2rem; color: #f57c00; margin-bottom: 1rem;"></i>
                <h3 style="color: #f57c00; margin-bottom: 0.5rem;">Dados Limitados</h3>
                <p style="color: #666;">Apenas ${leituras.length} leitura(s) disponível(is). Mapas de calor funcionam melhor com mais dados.</p>
            </div>
        `;
        return;
    }
    
    let heatmapHTML = `
        <div style="background: white; padding: 2rem; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); margin-bottom: 2rem;">
            <h3 style="color: var(--primary-green); margin-bottom: 1.5rem; display: flex; align-items: center; gap: 0.5rem;">
                <i class="fas fa-sliders-h"></i> Controles do Mapa de Calor
            </h3>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem; margin-bottom: 2rem;">
                <div style="background: rgba(255,255,255,0.8); padding: 1.5rem; border-radius: 16px; border: 1px solid var(--gray-200); box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
                    <label style="font-family: 'Poppins', sans-serif; font-weight: 600; color: var(--gray-800); display: block; margin-bottom: 0.75rem; font-size: 0.95rem;">Parâmetro de Análise</label>
                    <select id="heatmap-parameter" onchange="updateHeatmapView()" style="width: 100%; padding: 0.75rem 1rem; border: 2px solid var(--gray-200); border-radius: 12px; font-size: 1rem; font-family: 'Inter', sans-serif; background: white; transition: all 0.2s ease; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                        <option value="ph">pH do Solo</option>
                        <option value="umidade">Umidade (%)</option>
                        <option value="temperatura">Temperatura (°C)</option>
                        <option value="condutividade">Condutividade Elétrica</option>
                        <option value="salinidade">Salinidade</option>
                        <option value="npk">NPK Total</option>
                    </select>
                </div>
                <div style="background: rgba(255,255,255,0.8); padding: 1.5rem; border-radius: 16px; border: 1px solid var(--gray-200); box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
                    <label style="font-family: 'Poppins', sans-serif; font-weight: 600; color: var(--gray-800); display: block; margin-bottom: 0.75rem; font-size: 0.95rem;">Período de Tempo</label>
                    <select id="heatmap-period" onchange="updateHeatmapView()" style="width: 100%; padding: 0.75rem 1rem; border: 2px solid var(--gray-200); border-radius: 12px; font-size: 1rem; font-family: 'Inter', sans-serif; background: white; transition: all 0.2s ease; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                        <option value="latest">Última Leitura</option>
                        <option value="week">Última Semana</option>
                        <option value="month">Último Mês</option>
                        <option value="all">Todas as Leituras</option>
                    </select>
                </div>
            </div>
        </div>
        
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)); gap: 2rem;">
            <div style="background: white; padding: 2rem; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                <h4 style="color: var(--primary-green); margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem;">
                    <i class="fas fa-map"></i> <span id="heatmap-title-text">Mapa de pH por Setor</span>
                </h4>
                <div style="position: relative; height: 300px; margin-bottom: 1rem; background: #f8f9fa; border-radius: 8px; display: flex; align-items: center; justify-content: center;">
                    <canvas id="heatmapChart" style="max-width: 100%; max-height: 100%;"></canvas>
                </div>
                <div style="display: flex; justify-content: center; gap: 1rem; margin-top: 1rem;">
                    <div style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.9rem;">
                        <span style="width: 16px; height: 16px; border-radius: 3px; background: #ff4444;"></span>
                        <span>Crítico</span>
                    </div>
                    <div style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.9rem;">
                        <span style="width: 16px; height: 16px; border-radius: 3px; background: #ffaa00;"></span>
                        <span>Atenção</span>
                    </div>
                    <div style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.9rem;">
                        <span style="width: 16px; height: 16px; border-radius: 3px; background: #00aa00;"></span>
                        <span>Ideal</span>
                    </div>
                </div>
            </div>
            
            <div style="background: white; padding: 2rem; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                <h4 style="color: var(--primary-green); margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem;">
                    <i class="fas fa-chart-line"></i> Evolução Temporal
                </h4>
                <div style="position: relative; height: 300px; background: #f8f9fa; border-radius: 8px; display: flex; align-items: center; justify-content: center;">
                    <canvas id="timelineChart" style="max-width: 100%; max-height: 100%;"></canvas>
                </div>
            </div>
        </div>
        
        <div style="margin-top: 2rem; background: linear-gradient(135deg, #e8f5e8, #c8e6c8); padding: 2rem; border-radius: 12px; border-left: 4px solid var(--primary-green);">
            <h4 style="color: var(--primary-green); margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem;">
                <i class="fas fa-info-circle"></i> Análise dos Setores
            </h4>
            <div id="sector-analysis">
                <p style="color: #666; font-style: italic;">Selecione um parâmetro para ver a análise detalhada por setor.</p>
            </div>
        </div>
    `;
    
    document.getElementById('heatmap-content').innerHTML = heatmapHTML;
    window.currentHeatmapData = leituras;
    
    setTimeout(() => {
        initializeCharts();
        updateHeatmapView();
    }, 200);
}

function initializeCharts() {
    const heatmapCanvas = document.getElementById('heatmapChart');
    const timelineCanvas = document.getElementById('timelineChart');
    
    if (!heatmapCanvas || !timelineCanvas) return;
    
    if (heatmapChart) {
        heatmapChart.destroy();
        heatmapChart = null;
    }
    if (timelineChart) {
        timelineChart.destroy();
        timelineChart = null;
    }
    
    heatmapChart = new Chart(heatmapCanvas.getContext('2d'), {
        type: 'scatter',
        data: { datasets: [] },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        title: function(context) {
                            const point = context[0].raw;
                            return `${point.setor || 'Setor'}`;
                        },
                        label: function(context) {
                            const point = context.raw;
                            return [
                                `Valor: ${point.valor?.toFixed(2) || 'N/A'}`,
                                `Profundidade: ${point.profundidade || 0}cm`
                            ];
                        }
                    }
                }
            },
            scales: {
                x: {
                    type: 'category',
                    title: { display: true, text: 'Setores da Fazenda' }
                },
                y: {
                    title: { display: true, text: 'Profundidade (cm)' },
                    reverse: true
                }
            }
        }
    });
    
    timelineChart = new Chart(timelineCanvas.getContext('2d'), {
        type: 'line',
        data: { datasets: [] },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { position: 'top' } },
            scales: {
                x: {
                    type: 'time',
                    time: { unit: 'day' },
                    title: { display: true, text: 'Data' }
                },
                y: { title: { display: true, text: 'Valor' } }
            }
        }
    });
}

function updateHeatmapView() {
    if (!window.currentHeatmapData) return;
    
    const parametro = document.getElementById('heatmap-parameter')?.value || 'ph';
    const periodo = document.getElementById('heatmap-period')?.value || 'latest';
    
    const titulos = {
        'ph': 'Mapa de pH por Setor',
        'umidade': 'Mapa de Umidade por Setor',
        'temperatura': 'Mapa de Temperatura por Setor',
        'condutividade': 'Mapa de Condutividade por Setor',
        'salinidade': 'Mapa de Salinidade por Setor',
        'npk': 'Mapa de NPK por Setor'
    };
    
    const titleElement = document.getElementById('heatmap-title-text');
    if (titleElement) {
        titleElement.textContent = titulos[parametro] || 'Mapa de Calor';
    }
    
    let dadosFiltrados = window.currentHeatmapData;
    if (periodo !== 'all') {
        const agora = new Date();
        let dataLimite;
        
        switch(periodo) {
            case 'latest':
                dadosFiltrados = [window.currentHeatmapData[0]];
                break;
            case 'week':
                dataLimite = new Date(agora.getTime() - 7 * 24 * 60 * 60 * 1000);
                break;
            case 'month':
                dataLimite = new Date(agora.getTime() - 30 * 24 * 60 * 60 * 1000);
                break;
        }
        
        if (dataLimite) {
            dadosFiltrados = window.currentHeatmapData.filter(leitura => {
                const dataLeitura = new Date(leitura.data_leitura);
                return dataLeitura >= dataLimite;
            });
        }
    }
    
    const dadosHeatmap = [];
    const dadosTimeline = [];
    const setorData = {};
    
    dadosFiltrados.forEach(leitura => {
        const setor = leitura.localizacao_sensor?.setor || 'Setor N/A';
        const profundidade = leitura.localizacao_sensor?.profundidade_cm || 20;
        
        let valor = 0;
        switch(parametro) {
            case 'ph':
                valor = Number(leitura.pH || leitura.ph || 0);
                break;
            case 'umidade':
                valor = Number(leitura.umidade || 0);
                break;
            case 'temperatura':
                valor = Number(leitura.temperatura || 0);
                break;
            case 'condutividade':
                valor = Number(leitura.condutividade_eletrica || 0);
                break;
            case 'salinidade':
                valor = Number(leitura.salinidade || 0);
                break;
            case 'npk':
                const npk = leitura.NPK || {};
                valor = (npk.nitrogenio || 0) + (npk.fosforo || 0) + (npk.potassio || 0);
                break;
        }
        
        dadosHeatmap.push({
            x: setor,
            y: profundidade,
            valor: valor,
            setor: setor,
            profundidade: profundidade
        });
        
        dadosTimeline.push({
            x: new Date(leitura.data_leitura),
            y: valor
        });
        
        if (!setorData[setor]) setorData[setor] = [];
        setorData[setor].push(valor);
    });
    
    if (heatmapChart && dadosHeatmap.length > 0) {
        const cores = dadosHeatmap.map(ponto => getColorByValue(ponto.valor, parametro));
        
        heatmapChart.data = {
            datasets: [{
                label: parametro.toUpperCase(),
                data: dadosHeatmap,
                backgroundColor: cores,
                borderColor: cores,
                pointRadius: 8,
                pointHoverRadius: 12
            }]
        };
        
        heatmapChart.update();
    }
    
    if (timelineChart && dadosTimeline.length > 0) {
        const unidades = {
            'ph': '',
            'umidade': '%',
            'temperatura': '°C',
            'condutividade': 'mS/cm',
            'salinidade': 'ppt',
            'npk': 'ppm'
        };
        
        dadosTimeline.sort((a, b) => a.x - b.x);
        
        timelineChart.data = {
            datasets: [{
                label: `${parametro.toUpperCase()} ${unidades[parametro]}`,
                data: dadosTimeline,
                borderColor: 'rgb(46, 125, 50)',
                backgroundColor: 'rgba(46, 125, 50, 0.1)',
                tension: 0.4,
                fill: true
            }]
        };
        
        timelineChart.options.scales.y.title.text = `${parametro.toUpperCase()} (${unidades[parametro]})`;
        timelineChart.update();
    }
    
    let analysisHTML = '<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">';
    
    Object.keys(setorData).forEach(setor => {
        const valores = setorData[setor];
        const media = (valores.reduce((a, b) => a + b, 0) / valores.length).toFixed(2);
        const min = Math.min(...valores).toFixed(2);
        const max = Math.max(...valores).toFixed(2);
        const cor = getColorByValue(parseFloat(media), parametro);
        
        analysisHTML += `
            <div style="background: white; padding: 1rem; border-radius: 8px; border-left: 3px solid ${cor};">
                <h5 style="color: ${cor}; margin-bottom: 0.5rem;">${setor}</h5>
                <p style="font-size: 0.85rem; margin-bottom: 0.3rem;"><strong>Média:</strong> ${media}</p>
                <p style="font-size: 0.85rem; margin-bottom: 0.3rem;"><strong>Mín:</strong> ${min}</p>
                <p style="font-size: 0.85rem;"><strong>Máx:</strong> ${max}</p>
                <p style="font-size: 0.85rem;"><strong>Leituras:</strong> ${valores.length}</p>
            </div>
        `;
    });
    
    analysisHTML += '</div>';
    
    const analysisElement = document.getElementById('sector-analysis');
    if (analysisElement) {
        analysisElement.innerHTML = analysisHTML;
    }
}

function getColorByValue(valor, parametro) {
    let cor = '#00aa00';
    
    switch(parametro) {
        case 'ph':
            if (valor < 5.5 || valor > 7.5) cor = '#ff4444';
            else if (valor < 6.0 || valor > 7.0) cor = '#ffaa00';
            break;
        case 'umidade':
            if (valor < 40 || valor > 90) cor = '#ff4444';
            else if (valor < 60 || valor > 80) cor = '#ffaa00';
            break;
        case 'temperatura':
            if (valor < 15 || valor > 35) cor = '#ff4444';
            else if (valor < 20 || valor > 30) cor = '#ffaa00';
            break;
        case 'condutividade':
            if (valor > 2.0) cor = '#ff4444';
            else if (valor > 1.5) cor = '#ffaa00';
            break;
        case 'salinidade':
            if (valor > 0.5) cor = '#ff4444';
            else if (valor > 0.3) cor = '#ffaa00';
            break;
        case 'npk':
            if (valor < 100) cor = '#ff4444';
            else if (valor < 200) cor = '#ffaa00';
            break;
    }
    
    return cor;
}

// Auto-inicializar
document.addEventListener('DOMContentLoaded', function() {
    checkAPIConnection();
    checkAuthentication();
});