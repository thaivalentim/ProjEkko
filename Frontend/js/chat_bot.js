/**
 * EKKO CHATBOT - LÓGICA DO FRONTEND (CLIENT-SIDE)
 * Versão Definitiva: Agente com Gestão de Sessões, Títulos de IA, Geolocalização e Confirmação de Exclusão.
 */

document.addEventListener('DOMContentLoaded', () => {

    const chatSection = document.getElementById('chatbot-section');
    if (!chatSection) {
        console.log("Módulo do Chatbot Ekko não ativo nesta página.");
        return;
    }
    console.log("Módulo do Chatbot Ekko inicializado.");

    // --- ELEMENTOS DA INTERFACE (DOM) ---
    const historyList = document.getElementById('history-list');
    const newSessionBtn = document.getElementById('new-session-btn');
    const chatBox = document.getElementById('ekko-chat-box');
    const userInput = document.getElementById('ekko-user-input');
    const sendBtn = document.getElementById('ekko-send-btn');
    const locationBtn = document.getElementById('ekko-location-btn');
    
    // --- CONFIGURAÇÃO ---
    const unityId = localStorage.getItem("unity_id") || "default_user"; 
    const API_URL_CHAT = `http://127.0.0.1:8002/api/chat/${unityId}`;
    const API_URL_TITLE = `http://127.0.0.1:8002/api/generate_title`;

    // --- ESTADO DA APLICAÇÃO ---
    let userCoordinates = null;
    let isLoading = false;
    let sessions = {};
    let activeSessionId = null;

    // --- LÓGICA DE GESTÃO DE SESSÕES ---

    function loadSessions() {
        const storedSessions = localStorage.getItem('ekkoChatSessions');
        sessions = storedSessions ? JSON.parse(storedSessions) : {};
        activeSessionId = localStorage.getItem('ekkoActiveSessionId');

        if (Object.keys(sessions).length === 0 || !sessions[activeSessionId]) {
            createNewSession();
        } else {
            renderHistorySidebar();
            loadSession(activeSessionId);
        }
    }

    function saveSessions() {
        localStorage.setItem('ekkoChatSessions', JSON.stringify(sessions));
        localStorage.setItem('ekkoActiveSessionId', activeSessionId);
    }

    function renderHistorySidebar() {
        historyList.innerHTML = '';
        // Ordena as sessões pela data de criação (ID), da mais recente para a mais antiga
        const sortedSessionIds = Object.keys(sessions).sort((a, b) => b.localeCompare(a));

        sortedSessionIds.forEach(sessionId => {
            const session = sessions[sessionId];
            const item = document.createElement('li');
            item.className = 'history-item';
            item.textContent = session.title;
            item.dataset.sessionId = sessionId;
            if (sessionId === activeSessionId) {
                item.classList.add('active');
            }
            
            const deleteBtn = document.createElement('span');
            deleteBtn.className = 'delete-session-btn';
            deleteBtn.innerHTML = '&times;';
            deleteBtn.title = "Apagar conversa";
            deleteBtn.onclick = (e) => {
                e.stopPropagation(); // Impede que o clique na cruz mude de aba
                deleteSession(sessionId); // Chama a nossa nova função com confirmação
            };
            item.appendChild(deleteBtn);

            item.addEventListener('click', () => {
                if(activeSessionId !== sessionId) loadSession(sessionId);
            });
            historyList.appendChild(item);
        });
    }

    function loadSession(sessionId) {
        if (!sessions[sessionId]) return;
        activeSessionId = sessionId;
        chatBox.innerHTML = sessions[sessionId].history;
        renderHistorySidebar();
        saveSessions();
        smoothScrollToBottom();
    }

    function createNewSession() {
        const newSessionId = `session_${new Date().getTime()}`;
        const sessionNumber = Object.keys(sessions).length + 1;
        sessions[newSessionId] = {
            title: `Nova Conversa ${sessionNumber}`,
            history: '<div class="message bot-message">Olá! Sou o Ekko. Como posso ajudar nesta nova conversa?</div>'
        };
        loadSession(newSessionId);
    }

    // FUNÇÃO ATUALIZADA COM O POPUP DE CONFIRMAÇÃO
    function deleteSession(sessionIdToDelete) {
        if (Object.keys(sessions).length <= 1) {
            alert("Não é possível apagar a única conversa existente.");
            return;
        }
        
        const sessionTitle = sessions[sessionIdToDelete].title;
        
        // Abre o popup de confirmação nativo do navegador
        const isConfirmed = confirm(`Tem a certeza de que quer apagar a conversa "${sessionTitle}"?\n\nEsta ação não pode ser desfeita.`);

        // O código só continua se o utilizador clicar em "OK"
        if (isConfirmed) {
            console.log(`Sessão "${sessionTitle}" apagada.`);
            delete sessions[sessionIdToDelete];
            if (activeSessionId === sessionIdToDelete) {
                // Ativa a sessão mais recente se a ativa for apagada
                activeSessionId = Object.keys(sessions).sort((a, b) => b.localeCompare(a))[0];
            }
            loadSession(activeSessionId); // Carrega a nova sessão ativa
        } else {
            console.log("Exclusão da sessão cancelada pelo utilizador.");
            // Se o utilizador clicar em "Cancelar", não fazemos nada.
        }
    }
    
    // --- LÓGICA DO CHAT (FUNÇÕES DE UI E COMUNICAÇÃO) ---
    
    function smoothScrollToBottom() {
        chatBox.scrollTo({ top: chatBox.scrollHeight, behavior: 'smooth' });
    }

    function removeStatusMessage() {
        const statusElement = document.getElementById('status-message');
        if (statusElement) statusElement.remove();
    }

    function showStatusMessage(message) {
        removeStatusMessage();
        const statusElement = document.createElement('div');
        statusElement.id = 'status-message';
        statusElement.className = 'message status-message';
        statusElement.textContent = `⚙️ ${message}`;
        chatBox.appendChild(statusElement);
        smoothScrollToBottom();
    }
    
    function addUserMessage(message) {
        const userMsgHtml = `<div class="message user-message">${message}</div>`;
        sessions[activeSessionId].history += userMsgHtml;
        chatBox.innerHTML = sessions[activeSessionId].history;
        smoothScrollToBottom();
    }
    
    function createBotMessageElement() {
        // Cria um placeholder temporário para saber onde a nova mensagem do bot vai entrar
        const placeholderId = `bot-msg-${new Date().getTime()}`;
        const botMsgHtml = `<div class="message bot-message" id="${placeholderId}"></div>`;
        sessions[activeSessionId].history += botMsgHtml;
        chatBox.innerHTML = sessions[activeSessionId].history;
        smoothScrollToBottom();
        return document.getElementById(placeholderId);
    }

    function updateBotMessage(element, newTextChunk) {
        if(!element) return;
        const fullText = (element.dataset.fullText || '') + newTextChunk;
        element.dataset.fullText = fullText;
        element.innerHTML = marked.parse(fullText);
        // Atualiza o histórico com o conteúdo renderizado final a cada chunk
        sessions[activeSessionId].history = chatBox.innerHTML;
        smoothScrollToBottom();
    }

    async function sendMessage() {
        const question = userInput.value.trim();
        if (question === '' || isLoading) return;

        isLoading = true;
        addUserMessage(question);
        userInput.value = '';
        userInput.focus();
        showStatusMessage("A processar...");
        
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = sessions[activeSessionId].history;
        const chatHistoryText = Array.from(tempDiv.querySelectorAll('.message')).map(m => m.innerText).slice(-8);

        try {
            const response = await fetch(API_URL_CHAT, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: question, history: chatHistoryText, coordinates: userCoordinates }),
            });
            
            removeStatusMessage();
            if (!response.ok) throw new Error(`Erro na API: ${response.statusText}`);

            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let botMessageElement = createBotMessageElement();

            while (true) {
                const { value, done } = await reader.read();
                if (done) {
                    saveSessions(); // Salva o estado final da conversa
                    generateSessionTitle(activeSessionId); // Tenta gerar um título
                    break;
                }

                const chunk = decoder.decode(value, { stream: true });
                const lines = chunk.split('\n\n');
                for (const line of lines) {
                    if (line.startsWith('data: ')) {
                        try {
                            const jsonData = JSON.parse(line.substring(6));
                            if (jsonData.type === 'status') {
                                showStatusMessage(jsonData.message);
                            } else if (jsonData.type === 'chunk') {
                                removeStatusMessage();
                                updateBotMessage(botMessageElement, jsonData.message);
                            }
                        } catch (e) { /* Ignora erros de parsing */ }
                    }
                }
            }
        } catch (error) {
            removeStatusMessage();
            const botMsg = createBotMessageElement();
            updateBotMessage(botMsg, "Ops! Tive um problema de comunicação com o servidor.");
            console.error('Erro ao enviar mensagem:', error);
        } finally {
            isLoading = false;
        }
    }

    async function generateSessionTitle(sessionId) {
        const session = sessions[sessionId];
        const messageCount = (session.history.match(/class="message/g) || []).length;
        
        if (!session.title.startsWith('Nova Conversa') || messageCount < 4) {
            return;
        }

        console.log(`A gerar título para a sessão ${sessionId}...`);
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = session.history;
        const historyText = tempDiv.innerText;

        try {
            const response = await fetch(API_URL_TITLE, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ history_text: historyText })
            });
            const data = await response.json();
            if (data.title) {
                sessions[sessionId].title = data.title;
                saveSessions();
                renderHistorySidebar();
            }
        } catch (error) {
            console.error("Erro ao gerar título:", error);
        }
    }

    function getLocation() {
        if (isLoading) return;
        if (navigator.geolocation) {
            showStatusMessage("A obter coordenadas...");
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    removeStatusMessage();
                    userCoordinates = {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    };
                    const botMsg = createBotMessageElement();
                    updateBotMessage(botMsg, "Localização ativada! Agora posso fornecer previsões do tempo precisas.");
                    saveSessions();
                    locationBtn.querySelector('svg').style.fill = '#27ae60';
                },
                (error) => {
                    removeStatusMessage();
                    const botMsg = createBotMessageElement();
                    updateBotMessage(botMsg, "Não foi possível obter a sua localização. Verifique as permissões do navegador.");
                    saveSessions();
                    console.error("Erro de Geolocalização:", error.message);
                }
            );
        } else {
             const botMsg = createBotMessageElement();
             updateBotMessage(botMsg, "Geolocalização não é suportada por este navegador.");
             saveSessions();
        }
    }

    // --- INICIALIZAÇÃO E EVENT LISTENERS ---
    
    newSessionBtn.addEventListener('click', createNewSession);
    sendBtn.addEventListener('click', sendMessage);
    userInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            sendMessage();
        }
    });
    locationBtn.addEventListener('click', getLocation);
    
    loadSessions(); // Inicia todo o sistema
});