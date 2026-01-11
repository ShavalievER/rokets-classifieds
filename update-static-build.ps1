# Скрипт для обновления статичного билда (out/) в Git
# Использование: .\update-static-build.ps1

Write-Host "🔨 Обновление статичного билда..." -ForegroundColor Cyan

# Проверить, что мы в правильной директории
if (-not (Test-Path "package.json")) {
    Write-Host "❌ Ошибка: запустите скрипт из папки commerce" -ForegroundColor Red
    exit 1
}

# Проверить, что мы в ветке main
$currentBranch = git branch --show-current
if ($currentBranch -ne "main") {
    Write-Host "⚠️  Вы не в ветке main. Текущая ветка: $currentBranch" -ForegroundColor Yellow
    Write-Host "💡 Переключитесь на main: git checkout main" -ForegroundColor Gray
    exit 1
}

# Проверить, что .gitignore разрешает out/
$gitignore = Get-Content .gitignore -Raw
if ($gitignore -match "^/out/") {
    Write-Host "⚠️  /out/ закомментирован в .gitignore" -ForegroundColor Yellow
    Write-Host "💡 Убедитесь, что /out/ разрешен в .gitignore" -ForegroundColor Gray
}

# Собрать проект
Write-Host "📦 Сборка проекта..." -ForegroundColor Cyan
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Ошибка при сборке проекта" -ForegroundColor Red
    exit 1
}

# Проверить, что папка out/ создана
if (-not (Test-Path "out")) {
    Write-Host "❌ Папка out/ не найдена после сборки" -ForegroundColor Red
    Write-Host "💡 Проверьте next.config.ts - должен быть output: 'export'" -ForegroundColor Gray
    exit 1
}

Write-Host "✅ Сборка завершена" -ForegroundColor Green

# Добавить out/ в Git
Write-Host "📝 Добавление out/ в Git..." -ForegroundColor Cyan
git add out/

# Проверить, есть ли изменения
$status = git status --short out/
if ([string]::IsNullOrWhiteSpace($status)) {
    Write-Host "ℹ️  Нет изменений в out/" -ForegroundColor Gray
} else {
    Write-Host "📊 Изменения:" -ForegroundColor Cyan
    git status --short out/ | Select-Object -First 10
    
    # Закоммитить
    Write-Host "💾 Коммит изменений..." -ForegroundColor Cyan
    git commit -m "Update: Rebuild static export (out/)"
    
    Write-Host "✅ Статичный билд обновлен в Git!" -ForegroundColor Green
    Write-Host "💡 Отправьте изменения: git push origin main" -ForegroundColor Gray
}

Write-Host "`n✅ Готово!" -ForegroundColor Green










