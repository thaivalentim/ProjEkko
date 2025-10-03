@echo off
echo ========================================
echo    EKKO - Reiniciar Servidor
echo ========================================

echo 1. Parando processos na porta 8002...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :8002 ^| findstr LISTENING') do (
    echo Matando processo %%a
    taskkill /F /PID %%a >nul 2>&1
)

echo 2. Aguardando 3 segundos...
ping 127.0.0.1 -n 4 >nul

echo 3. Iniciando servidor...
py main.py