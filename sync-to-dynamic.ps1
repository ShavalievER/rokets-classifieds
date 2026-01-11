# Скрипт для синхронизации изменений в нестатичную версию (dynamic branch)
# Использование: .\sync-to-dynamic.ps1

Write-Host "🔄 Синхронизация изменений в нестатичную версию..." -ForegroundColor Cyan

# Проверить, что мы в правильной директории
if (-not (Test-Path "package.json")) {
    Write-Host "❌ Ошибка: запустите скрипт из папки commerce" -ForegroundColor Red
    exit 1
}

# Список файлов/папок, которые нужно синхронизировать
$filesToSync = @(
    "app",
    "components",
    "lib",
    "public",
    "scripts",
    "package.json",
    "tsconfig.json",
    "postcss.config.mjs",
    "tailwind.config.ts"
)

# Проверить, существует ли ветка dynamic
$branchExists = git branch --list dynamic
if (-not $branchExists) {
    Write-Host "⚠️  Ветка dynamic не найдена. Создайте её сначала:" -ForegroundColor Yellow
    Write-Host "   git checkout -b dynamic" -ForegroundColor Yellow
    exit 1
}

# Сохранить текущую ветку
$currentBranch = git branch --show-current
Write-Host "📌 Текущая ветка: $currentBranch" -ForegroundColor Gray

# Переключиться на ветку dynamic
Write-Host "🔄 Переключение на ветку dynamic..." -ForegroundColor Cyan
git checkout dynamic

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Ошибка при переключении на ветку dynamic" -ForegroundColor Red
    exit 1
}

# Синхронизировать файлы из main
Write-Host "📦 Синхронизация файлов из ветки main..." -ForegroundColor Cyan
foreach ($file in $filesToSync) {
    if (Test-Path "../main/$file" -ErrorAction SilentlyContinue) {
        Write-Host "  → $file" -ForegroundColor Gray
        git checkout main -- $file 2>$null
    }
}

# Закоммитить изменения
Write-Host "💾 Коммит изменений..." -ForegroundColor Cyan
git add .
$hasChanges = git diff --cached --quiet
if (-not $hasChanges) {
    git commit -m "Sync: Update from main branch"
    Write-Host "✅ Изменения закоммичены" -ForegroundColor Green
} else {
    Write-Host "ℹ️  Нет изменений для коммита" -ForegroundColor Gray
}

# Вернуться на исходную ветку
Write-Host "🔄 Возврат на ветку $currentBranch..." -ForegroundColor Cyan
git checkout $currentBranch

Write-Host "✅ Синхронизация завершена!" -ForegroundColor Green










