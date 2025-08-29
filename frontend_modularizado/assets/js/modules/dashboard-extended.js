// 📊 DASHBOARD EXTENDED - Funcionalidades Avançadas do Dashboard

// Aguardar o DashboardManager estar disponível
document.addEventListener('DOMContentLoaded', () => {
    // Aguardar um pouco para garantir que o dashboard.js foi carregado
    setTimeout(() => {
        if (window.dashboardManager) {
            // Adicionar métodos à instância existente
            Object.assign(window.dashboardManager, {
        
        loadProfileContent(perfil) {
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
        },

        loadReadingsContent(perfil) {
            const leituras = perfil.leituras_solo || [];
            
            if (leituras.length === 0) {
                this.showEmpty('readings-content', 'Nenhuma leitura de solo encontrada para este usuário');
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
            
            if (leituras.length > 0) {
                leituras.forEach((leitura, index) => {
                    const data = new Date(leitura.data_leitura);
                    const npk = leitura.NPK || {};
                    const micro = leitura.micronutrientes || {};
                    const locSensor = leitura.localizacao_sensor || {};
                    
                    // Formatação de NPK
                    const npkStr = `N:${Number(npk.nitrogenio || 0).toFixed(0)} P:${Number(npk.fosforo || 0).toFixed(0)} K:${Number(npk.potassio || 0).toFixed(0)}`;
                    
                    // Formatação de micronutrientes
                    const microStr = `Ca:${Number(micro.calcio || 0).toFixed(0)} Mg:${Number(micro.magnesio || 0).toFixed(0)} S:${Number(micro.enxofre || 0).toFixed(0)}`;
                    
                    // Formatação do setor
                    const setorStr = `${locSensor.setor || 'N/A'} (${locSensor.profundidade_cm || 0}cm)`;
                    
                    // Cores alternadas para as linhas
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
            }
            
            tableHTML += '</tbody></table></div>';
            
            // Adicionar resumo estatístico
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
        },

        async loadAIContent(userId) {
            try {
                const controller = new AbortController();
                const timeoutId = setTimeout(() => controller.abort(), 10000);
                
                const response = await fetch(`${this.baseUrl}/diagnostico/${userId}`, {
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
                
                // Adicionar análise rápida
                try {
                    const rapidResponse = await fetch(`${this.baseUrl}/analise-rapida/${userId}`);
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
                
                this.showError('ai-content', errorMessage);
            }
        },

        loadHeatmapContent(perfil) {
            const leituras = perfil.leituras_solo || [];
            
            if (leituras.length === 0) {
                this.showEmpty('heatmap-content', 'Não há leituras suficientes para gerar mapas de calor');
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
            
            // Armazenar dados para os gráficos
            window.currentHeatmapData = leituras;
            
            // Inicializar gráficos e visualização
            setTimeout(() => {
                this.initializeCharts();
                this.updateHeatmapView();
            }, 200);
        },

        initializeCharts() {
            const heatmapCanvas = document.getElementById('heatmapChart');
            const timelineCanvas = document.getElementById('timelineChart');
            
            if (!heatmapCanvas || !timelineCanvas) return;
            
            // Destruir gráficos existentes
            if (this.heatmapChart) {
                this.heatmapChart.destroy();
                this.heatmapChart = null;
            }
            if (this.timelineChart) {
                this.timelineChart.destroy();
                this.timelineChart = null;
            }
            
            // Criar gráfico de dispersão para heatmap
            this.heatmapChart = new Chart(heatmapCanvas.getContext('2d'), {
                type: 'scatter',
                data: {
                    datasets: []
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        },
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
                            title: {
                                display: true,
                                text: 'Setores da Fazenda'
                            }
                        },
                        y: {
                            title: {
                                display: true,
                                text: 'Profundidade (cm)'
                            },
                            reverse: true
                        }
                    }
                }
            });
            
            // Criar gráfico de linha temporal
            this.timelineChart = new Chart(timelineCanvas.getContext('2d'), {
                type: 'line',
                data: {
                    datasets: []
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'top'
                        }
                    },
                    scales: {
                        x: {
                            type: 'time',
                            time: {
                                unit: 'day'
                            },
                            title: {
                                display: true,
                                text: 'Data'
                            }
                        },
                        y: {
                            title: {
                                display: true,
                                text: 'Valor'
                            }
                        }
                    }
                }
            });
        },

        updateHeatmapView() {
            if (!window.currentHeatmapData) return;
            
            const parametro = document.getElementById('heatmap-parameter')?.value || 'ph';
            const periodo = document.getElementById('heatmap-period')?.value || 'latest';
            
            // Atualizar título
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
            
            // Filtrar dados por período
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
            
            // Processar dados para heatmap
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
                
                // Dados para heatmap
                dadosHeatmap.push({
                    x: setor,
                    y: profundidade,
                    valor: valor,
                    setor: setor,
                    profundidade: profundidade
                });
                
                // Dados para timeline
                dadosTimeline.push({
                    x: new Date(leitura.data_leitura),
                    y: valor
                });
                
                // Dados para análise por setor
                if (!setorData[setor]) setorData[setor] = [];
                setorData[setor].push(valor);
            });
            
            // Atualizar gráfico heatmap
            if (this.heatmapChart && dadosHeatmap.length > 0) {
                const cores = dadosHeatmap.map(ponto => this.getColorByValue(ponto.valor, parametro));
                
                this.heatmapChart.data = {
                    datasets: [{
                        label: parametro.toUpperCase(),
                        data: dadosHeatmap,
                        backgroundColor: cores,
                        borderColor: cores,
                        pointRadius: 8,
                        pointHoverRadius: 12
                    }]
                };
                
                this.heatmapChart.update();
            }
            
            // Atualizar gráfico timeline
            if (this.timelineChart && dadosTimeline.length > 0) {
                const unidades = {
                    'ph': '',
                    'umidade': '%',
                    'temperatura': '°C',
                    'condutividade': 'mS/cm',
                    'salinidade': 'ppt',
                    'npk': 'ppm'
                };
                
                // Ordenar por data
                dadosTimeline.sort((a, b) => a.x - b.x);
                
                this.timelineChart.data = {
                    datasets: [{
                        label: `${parametro.toUpperCase()} ${unidades[parametro]}`,
                        data: dadosTimeline,
                        borderColor: 'rgb(46, 125, 50)',
                        backgroundColor: 'rgba(46, 125, 50, 0.1)',
                        tension: 0.4,
                        fill: true
                    }]
                };
                
                this.timelineChart.options.scales.y.title.text = `${parametro.toUpperCase()} (${unidades[parametro]})`;
                this.timelineChart.update();
            }
            
            // Gerar análise por setor
            let analysisHTML = '<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">';
            
            Object.keys(setorData).forEach(setor => {
                const valores = setorData[setor];
                const media = (valores.reduce((a, b) => a + b, 0) / valores.length).toFixed(2);
                const min = Math.min(...valores).toFixed(2);
                const max = Math.max(...valores).toFixed(2);
                
                // Determinar cor baseada no parâmetro
                const cor = this.getColorByValue(parseFloat(media), parametro);
                
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
        },

        getColorByValue(valor, parametro) {
            let cor = '#00aa00'; // Verde (ideal)
            
            switch(parametro) {
                case 'ph':
                    if (valor < 5.5 || valor > 7.5) cor = '#ff4444'; // Vermelho (crítico)
                    else if (valor < 6.0 || valor > 7.0) cor = '#ffaa00'; // Amarelo (atenção)
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
            });
        }
    }, 100);
});

// Funções globais para heatmap
function updateHeatmapView() {
    if (window.dashboardManager) {
        window.dashboardManager.updateHeatmapView();
    }
}