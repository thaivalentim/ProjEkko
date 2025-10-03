@echo off
echo ========================================
echo    EKKO - Fix Ollama
echo ========================================

echo 1. Verificando se Ollama ja esta rodando...
tasklist /FI "IMAGENAME eq ollama.exe" 2>NUL | find /I /N "ollama.exe">NUL
if "%ERRORLEVEL%"=="0" (
    echo ✅ Ollama ja esta rodando!
    goto test
) else (
    echo ❌ Ollama nao esta rodando, iniciando...
    start "Ollama Server" ollama serve
    timeout /t 3
)

:test
echo 2. Testando conexao...
curl -s http://localhost:11434/api/tags >nul
if %errorlevel% equ 0 (
    echo ✅ Ollama conectado!
) else (
    echo ❌ Ollama nao responde
    goto end
)

echo 3. Verificando modelo llama3.2...
ollama list | find "llama3.2" >nul
if %errorlevel% equ 0 (
    echo ✅ Modelo llama3.2 encontrado!
) else (
    echo ⬇️ Baixando modelo llama3.2...
    ollama pull llama3.2
)

echo 4. Teste rapido...
echo Ola, voce funciona? | ollama run llama3.2 --verbose

:end
echo ========================================
echo    Status: http://localhost:11434
echo ========================================
pause