document.addEventListener('DOMContentLoaded', () => {

    const chatBox = document.getElementById('chat-box');
    const userInput = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');
    const locationBtn = document.getElementById('location-btn');
    const API_URL = 'http://127.0.0.1:5000/chat';

    let userCoordinates = null;
    let chatHistory = [];

    function saveChatHistory() {
        localStorage.setItem('ekkoChatHistory', chatBox.innerHTML);
    }

    function loadChatHistory() {
        const history = localStorage.getItem('ekkoChatHistory');
        if (history) {
            chatBox.innerHTML = history;
        } else {
            // Adiciona a mensagem de boas-vindas apenas se não houver histórico
            addBotMessage("Olá! Sou Ekko. Para previsões do tempo, clique no ícone de alvo e permita o acesso à sua localização.", false);
        }
        smoothScrollToBottom();
    }
    
    // --- FUNÇÕES DE INTERFACE ---
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
        statusElement.classList.add('message', 'status-message');
        statusElement.textContent = `⚙️ ${message}`;
        chatBox.appendChild(statusElement);
        smoothScrollToBottom();
    }

    function createBotMessageElement() {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', 'bot-message');
        chatBox.appendChild(messageElement);
        return messageElement;
    }

    function updateBotMessage(element, newTextChunk) {
        const fullText = (element.dataset.fullText || '') + newTextChunk;
        element.dataset.fullText = fullText;
        element.innerHTML = marked.parse(fullText);
        smoothScrollToBottom();
    }

    function addUserMessage(message) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', 'user-message');
        messageElement.textContent = message;
        chatBox.appendChild(messageElement);
        smoothScrollToBottom();
    }
    
    function addBotMessage(message, save = true) {
        const element = createBotMessageElement();
        updateBotMessage(element, message);
        if(save) saveChatHistory();
    }

    // --- FUNÇÕES DE LÓGICA PRINCIPAL ---
    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    userCoordinates = {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    };
                    addBotMessage("Localização ativada! Agora posso fornecer previsões do tempo precisas.");
                    locationBtn.querySelector('svg').style.fill = '#27ae60';
                },
                (error) => {
                    addBotMessage("Não foi possível obter sua localização. Verifique as permissões do seu navegador.");
                }
            );
        } else {
            addBotMessage("Geolocalização não é suportada por este navegador.");
        }
    }

    async function sendMessage() {
        const question = userInput.value.trim();
        if (question === '') return;

        addUserMessage(question);
        userInput.value = '';
        userInput.focus();
        showStatusMessage("Planejando...");

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: question, coordinates: userCoordinates }),
            });

            if (!response.ok) throw new Error(`Erro na API: ${response.statusText}`);

            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let botMessageElement = null;

            while (true) {
                const { value, done } = await reader.read();
                if (done) {
                    saveChatHistory(); 
                    break;
                }

                const eventLines = decoder.decode(value, { stream: true }).split('\n\n');
                for (const line of eventLines) {
                    if (line.startsWith('data: ')) {
                        const jsonData = JSON.parse(line.substring(6));
                        
                        if (jsonData.type === 'status') {
                            showStatusMessage(jsonData.message);
                        } else if (jsonData.type === 'chunk') {
                            removeStatusMessage();
                            if (!botMessageElement) botMessageElement = createBotMessageElement();
                            updateBotMessage(botMessageElement, jsonData.message);
                        }
                    }
                }
            }
        } catch (error) {
            removeStatusMessage();
            console.error('Erro ao enviar mensagem:', error);
            addBotMessage('Ops! Tive um problema de comunicação com o servidor.');
        }
    }
    
    // --- INICIALIZAÇÃO ---
    sendBtn.addEventListener('click', sendMessage);
    userInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            sendMessage();
        }
    });
    locationBtn.addEventListener('click', getLocation);

    loadChatHistory();
    userInput.focus();
});