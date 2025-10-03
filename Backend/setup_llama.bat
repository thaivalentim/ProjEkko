@echo off
echo ========================================
echo    EKKO - Setup Llama 3.2
echo ========================================

echo 1. Verificando se Ollama esta instalado...
ollama --version
if %errorlevel% neq 0 (
    echo ERRO: Ollama nao encontrado!
    echo Baixe em: https://ollama.ai/download/windows
    pause
    exit /b 1
)

echo 2. Baixando modelo Llama 3.2 (3.2GB)...
ollama pull llama3.2

echo 3. Testando modelo...
echo "Ola, voce esta funcionando?" | ollama run llama3.2

echo 4. Iniciando servidor Ollama...
start "Ollama Server" ollama serve

echo ========================================
echo    Setup concluido!
echo    Servidor: http://localhost:11434
echo ========================================
pause