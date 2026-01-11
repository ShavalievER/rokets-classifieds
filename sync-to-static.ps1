# Скрипт для синхронизации изменений в статичную версию (main branch)
# Использование: .\sync-to-static.ps1

Write-Host "🔄 Синхронизация изменений в статичную версию..." -ForegroundColor Cyan

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

# Сохранить текущую ветку
$currentBranch = git branch --show-current
Write-Host "📌 Текущая ветка: $currentBranch" -ForegroundColor Gray

# Переключиться на ветку main
Write-Host "🔄 Переключение на ветку main..." -ForegroundColor Cyan
git checkout main

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Ошибка при переключении на ветку main" -ForegroundColor Red
    exit 1
}

# Синхронизировать файлы из dynamic
Write-Host "📦 Синхронизация файлов из ветки dynamic..." -ForegroundColor Cyan
foreach ($file in $filesToSync) {
    if (Test-Path "../dynamic/$file" -ErrorAction SilentlyContinue) {
        Write-Host "  → $file" -ForegroundColor Gray
        git checkout dynamic -- $file 2>$null
    }
}

# Закоммитить изменения
Write-Host "💾 Коммит изменений..." -ForegroundColor Cyan
git add .
$hasChanges = git diff --cached --quiet
if (-not $hasChanges) {
    git commit -m "Sync: Update from dynamic branch"
    Write-Host "✅ Изменения закоммичены" -ForegroundColor Green
} else {
    Write-Host "ℹ️  Нет изменений для коммита" -ForegroundColor Gray
}

# Вернуться на исходную ветку
Write-Host "🔄 Возврат на ветку $currentBranch..." -ForegroundColor Cyan
git checkout $currentBranch

Write-Host "✅ Синхронизация завершена!" -ForegroundColor Green










