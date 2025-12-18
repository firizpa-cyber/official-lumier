# ================================================
# Professional PHP Video Player v3.0
# Скрипт запуска сервера
# ================================================

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Professional Video Player v3.0" -ForegroundColor Yellow
Write-Host "  FFmpeg Edition - Запуск сервера" -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Проверка наличия PHP
Write-Host "[1/3] Проверка PHP..." -ForegroundColor Green
$phpPath = Get-Command php -ErrorAction SilentlyContinue

if (-not $phpPath) {
    Write-Host "❌ ОШИБКА: PHP не найден!" -ForegroundColor Red
    Write-Host "Пожалуйста, установите PHP 7.0+ и добавьте в PATH" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Нажмите любую клавишу для выхода..."
    $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
    exit 1
}

$phpVersion = php -v | Select-String -Pattern "PHP (\d+\.\d+\.\d+)" | ForEach-Object { $_.Matches.Groups[1].Value }
Write-Host "✅ PHP найден: версия $phpVersion" -ForegroundColor Green
Write-Host ""

# Проверка портов
Write-Host "[2/3] Проверка доступности порта 8000..." -ForegroundColor Green
$portInUse = Get-NetTCPConnection -LocalPort 8000 -ErrorAction SilentlyContinue

if ($portInUse) {
    Write-Host "⚠️  ПРЕДУПРЕЖДЕНИЕ: Порт 8000 уже занят" -ForegroundColor Yellow
    Write-Host "Попытка использовать порт 8001..." -ForegroundColor Yellow
    $port = 8001
}
else {
    Write-Host "✅ Порт 8000 свободен" -ForegroundColor Green
    $port = 8000
}
Write-Host ""

# Запуск сервера
Write-Host "[3/3] Запуск PHP сервера..." -ForegroundColor Green
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  🚀 СЕРВЕР ЗАПУЩЕН!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "  📺 Откройте в браузере:" -ForegroundColor Yellow
Write-Host "     http://localhost:$port" -ForegroundColor White
Write-Host ""
Write-Host "  ⚙️  Возможности:" -ForegroundColor Yellow
Write-Host "     - HLS/DASH потоки" -ForegroundColor White
Write-Host "     - FFmpeg обработка" -ForegroundColor White
Write-Host "     - 7-сек чанки с предзагрузкой" -ForegroundColor White
Write-Host "     - Аудио дорожки" -ForegroundColor White
Write-Host ""
Write-Host "  ⌨️  Нажмите Ctrl+C для остановки" -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Запуск PHP встроенного сервера
php -S localhost:$port

# Сообщение после остановки
Write-Host ""
Write-Host "========================================" -ForegroundColor Red
Write-Host "  Сервер остановлен" -ForegroundColor Red
Write-Host "========================================" -ForegroundColor Red
