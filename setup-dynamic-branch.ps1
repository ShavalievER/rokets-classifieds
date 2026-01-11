# Скрипт для настройки ветки dynamic с нестатичной версией
# Использование: .\setup-dynamic-branch.ps1

Write-Host "🔧 Настройка ветки dynamic для нестатичной версии..." -ForegroundColor Cyan

$backupPath = "C:\Dev\CursorProjects\Rokets_clsfd_backup"
$currentPath = "C:\Dev\CursorProjects\Rokets_clsfd\commerce"

# Проверить, что мы в правильной ветке
$currentBranch = git branch --show-current
if ($currentBranch -ne "dynamic") {
    Write-Host "⚠️  Вы не в ветке dynamic. Переключитесь: git checkout dynamic" -ForegroundColor Yellow
    exit 1
}

# 1. Скопировать next.config.ts из бэкапа (без output: 'export')
Write-Host "📝 Копирование next.config.ts из бэкапа..." -ForegroundColor Cyan
if (Test-Path "$backupPath\next.config.ts") {
    Copy-Item "$backupPath\next.config.ts" -Destination "$currentPath\next.config.ts" -Force
    Write-Host "  ✅ next.config.ts скопирован" -ForegroundColor Green
} else {
    Write-Host "  ⚠️  next.config.ts не найден в бэкапе" -ForegroundColor Yellow
}

# 2. Проверить, что server.js - полноценный Next.js сервер (не копировать из бэкапа)
Write-Host "🔍 Проверка server.js..." -ForegroundColor Cyan
$serverContent = Get-Content "$currentPath\server.js" -Raw
if ($serverContent -match "next = require\('next'\)") {
    Write-Host "  ✅ server.js - полноценный Next.js сервер" -ForegroundColor Green
} else {
    Write-Host "  ⚠️  server.js не похож на Next.js сервер" -ForegroundColor Yellow
    Write-Host "  💡 Используйте текущий server.js из commerce" -ForegroundColor Gray
}

# 3. Проверить, что в next.config.ts нет output: 'export'
Write-Host "🔍 Проверка next.config.ts..." -ForegroundColor Cyan
$nextConfig = Get-Content "$currentPath\next.config.ts" -Raw
if ($nextConfig -match "output.*export") {
    Write-Host "  ⚠️  В next.config.ts найден output: 'export' - это для статичной версии!" -ForegroundColor Yellow
    Write-Host "  💡 Удалите эту строку для нестатичной версии" -ForegroundColor Gray
} else {
    Write-Host "  ✅ next.config.ts настроен для нестатичной версии" -ForegroundColor Green
}

# 4. Показать статус
Write-Host "`n📊 Статус:" -ForegroundColor Cyan
git status --short

Write-Host "`n✅ Настройка завершена!" -ForegroundColor Green
Write-Host "💡 Следующие шаги:" -ForegroundColor Cyan
Write-Host "   1. Проверьте изменения: git diff" -ForegroundColor Gray
Write-Host "   2. Добавьте файлы: git add ." -ForegroundColor Gray
Write-Host "   3. Закоммитьте: git commit -m 'Setup dynamic version (non-static)'" -ForegroundColor Gray
Write-Host "   4. Отправьте в репозиторий: git push origin dynamic" -ForegroundColor Gray










