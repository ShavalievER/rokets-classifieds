# Рабочий процесс синхронизации версий

## Структура веток

- **main** - статичная версия (с `output: 'export'` в next.config.ts, если нужно)
- **dynamic** - нестатичная версия (без `output: 'export'`)

## Быстрый старт

### 1. Настроить нестатичную версию (один раз)

```bash
cd C:\Dev\CursorProjects\Rokets_clsfd\commerce

# Переключиться на ветку dynamic
git checkout dynamic

# Убедиться, что next.config.ts не имеет output: 'export'
# (уже должно быть скопировано из бэкапа)

# Закоммитить изменения
git add next.config.ts
git commit -m "Setup dynamic version: non-static config"
git push origin dynamic
```

### 2. Рабочий процесс при изменениях

#### Вариант A: Работаете в main (статичная версия)

```bash
# 1. Работаете в main
git checkout main

# 2. Вносите изменения в app/, components/, lib/
# ... редактируете файлы ...

# 3. Коммитите изменения
git add .
git commit -m "Update: ..."
git push origin main

# 4. Синхронизируете в dynamic
git checkout dynamic
git checkout main -- app/ components/ lib/ public/ package.json
git add .
git commit -m "Sync: Update from main"
git push origin dynamic

# 5. Возвращаетесь в main
git checkout main
```

#### Вариант B: Работаете в dynamic (нестатичная версия)

```bash
# 1. Работаете в dynamic
git checkout dynamic

# 2. Вносите изменения в app/, components/, lib/
# ... редактируете файлы ...

# 3. Коммитите изменения
git add .
git commit -m "Update: ..."
git push origin dynamic

# 4. Синхронизируете в main
git checkout main
git checkout dynamic -- app/ components/ lib/ public/ package.json
git add .
git commit -m "Sync: Update from dynamic"
git push origin main

# 5. Возвращаетесь в dynamic
git checkout dynamic
```

## Что синхронизировать

### ✅ Всегда синхронизировать:
- `app/` - страницы и API routes
- `components/` - React компоненты
- `lib/` - библиотеки и утилиты
- `public/` - статические файлы
- `package.json` - зависимости (но проверяйте различия)
- `tsconfig.json` - настройки TypeScript

### ❌ НЕ синхронизировать:
- `next.config.ts` - разные настройки для статики и динамики
- `server.js` - разные версии серверов
- `.next/` - результаты сборки (в .gitignore)
- `out/` - статический экспорт (в .gitignore для dynamic)
- `node_modules/` - зависимости (в .gitignore)

## Упрощенный процесс (рекомендуется)

### Создать скрипты для синхронизации

**sync-to-dynamic.ps1** - синхронизировать из main в dynamic:
```powershell
git checkout dynamic
git checkout main -- app/ components/ lib/ public/ package.json tsconfig.json
git add .
git commit -m "Sync: Update from main"
git checkout main
```

**sync-to-static.ps1** - синхронизировать из dynamic в main:
```powershell
git checkout main
git checkout dynamic -- app/ components/ lib/ public/ package.json tsconfig.json
git add .
git commit -m "Sync: Update from dynamic"
git checkout dynamic
```

## Проверка различий

Перед синхронизацией проверьте различия:

```bash
# Проверить различия в next.config.ts
git diff main..dynamic -- next.config.ts

# Проверить различия в server.js
git diff main..dynamic -- server.js

# Проверить, что код синхронизирован
git diff main..dynamic -- app/ components/ lib/
```

## Важные замечания

1. **Всегда коммитьте изменения** перед синхронизацией
2. **Проверяйте конфликты** при синхронизации
3. **Не синхронизируйте конфигурационные файлы** (next.config.ts, server.js)
4. **Тестируйте обе версии** после синхронизации

## Автоматизация (опционально)

Можно настроить Git hooks для автоматической синхронизации, но это сложнее и может вызвать проблемы. Рекомендуется ручная синхронизация.










