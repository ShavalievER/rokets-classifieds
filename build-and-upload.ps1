# Скрипт для сборки проекта и создания архива .next для загрузки на сервер
# Использование: .\build-and-upload.ps1

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Rokets Classifieds - Build Script" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Проверить, что мы в правильной папке
if (-not (Test-Path "package.json")) {
    Write-Host "Error: package.json not found!" -ForegroundColor Red
    Write-Host "Please run this script from the commerce/ directory" -ForegroundColor Red
    exit 1
}

# Шаг 1: Собрать проект
Write-Host "[1/3] Building project..." -ForegroundColor Green
$env:NODE_OPTIONS = "--max-old-space-size=4096"
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "Error: Build failed!" -ForegroundColor Red
    exit 1
}

# Проверить, что папка .next создана
if (-not (Test-Path ".next")) {
    Write-Host "Error: .next folder not found after build!" -ForegroundColor Red
    exit 1
}

Write-Host "✓ Build completed successfully" -ForegroundColor Green
Write-Host ""

# Шаг 2: Создать архив
Write-Host "[2/3] Creating archive..." -ForegroundColor Green
$archiveName = ".next.zip"

# Удалить старый архив, если есть
if (Test-Path $archiveName) {
    Remove-Item $archiveName -Force
    Write-Host "  Removed old archive" -ForegroundColor Yellow
}

# Создать новый архив
Compress-Archive -Path .next -DestinationPath $archiveName -Force

if (-not (Test-Path $archiveName)) {
    Write-Host "Error: Failed to create archive!" -ForegroundColor Red
    exit 1
}

$archiveSize = (Get-Item $archiveName).Length / 1MB
Write-Host "✓ Archive created: $archiveName ($([math]::Round($archiveSize, 2)) MB)" -ForegroundColor Green
Write-Host ""

# Шаг 3: Инструкции
Write-Host "[3/3] Next steps:" -ForegroundColor Green
Write-Host ""
Write-Host "1. Open cPanel File Manager" -ForegroundColor Yellow
Write-Host "2. Navigate to: public_html/rokets-classifieds/" -ForegroundColor Yellow
Write-Host "3. Upload file: $archiveName" -ForegroundColor Yellow
Write-Host "4. Extract the archive (Extract button)" -ForegroundColor Yellow
Write-Host "5. Make sure .next/ folder is in the project root" -ForegroundColor Yellow
Write-Host "6. In Terminal, run: git pull origin main" -ForegroundColor Yellow
Write-Host "7. Restart the Node.js app in cPanel" -ForegroundColor Yellow
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Done! Archive ready for upload." -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan

