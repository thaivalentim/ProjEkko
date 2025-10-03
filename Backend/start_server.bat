@echo off
echo ========================================
echo    EKKO - Iniciando Servidor
echo ========================================

echo Verificando se a porta 8002 esta livre...
netstat -ano | findstr :8002 | findstr LISTENING >nul
if %errorlevel% equ 0 (
    echo Porta 8002 ocupada, finalizando processo...
    for /f "tokens=5" %%a in ('netstat -ano ^| findstr :8002 ^| findstr LISTENING') do taskkill /PID %%a /F >nul 2>&1
    timeout /t 2
)

echo Iniciando servidor EKKO...
py main.py