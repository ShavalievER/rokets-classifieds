# Сохранение нестатичной версии в Git

## Цель

Сохранить нестатичную версию из бэкапа в Git и настроить синхронизацию изменений между статичной и нестатичной версиями.

## Шаг 1: Создать ветку для нестатичной версии

```bash
cd C:\Dev\CursorProjects\Rokets_clsfd\commerce

# Создать новую ветку из текущей
git checkout -b dynamic

# Или если хотите создать из main
git checkout main
git checkout -b dynamic
```

## Шаг 2: Скопировать файлы из бэкапа

### Вариант A: Вручную скопировать нужные файлы

Скопируйте из `C:\Dev\CursorProjects\Rokets_clsfd_backup\` в `C:\Dev\CursorProjects\Rokets_clsfd\commerce\`:

**Важные файлы для нестатичной версии:**
- `next.config.ts` (без `output: 'export'`)
- `server.js` (полноценный Next.js сервер)
- Все файлы из `app/`, `components/`, `lib/` (если есть изменения)

### Вариант B: Использовать PowerShell скрипт

Создайте скрипт для копирования:

```powershell
# copy-from-backup.ps1
$backupPath = "C:\Dev\CursorProjects\Rokets_clsfd_backup"
$targetPath = "C:\Dev\CursorProjects\Rokets_clsfd\commerce"

# Копировать файлы
Copy-Item "$backupPath\next.config.ts" -Destination "$targetPath\next.config.ts" -Force
Copy-Item "$backupPath\server.js" -Destination "$targetPath\server.js" -Force

# Копировать папки (если нужно)
# Copy-Item "$backupPath\app" -Destination "$targetPath\app" -Recurse -Force
# Copy-Item "$backupPath\components" -Destination "$targetPath\components" -Recurse -Force
```

## Шаг 3: Настроить next.config.ts для нестатичной версии

В ветке `dynamic` убедитесь, что в `next.config.ts` **НЕТ** строки:
```typescript
output: 'export',
```

Эта строка нужна только для статичной версии.

## Шаг 4: Проверить server.js

Убедитесь, что `server.js` в ветке `dynamic` - это полноценный Next.js сервер (как в текущей версии), а не тестовый сервер.

## Шаг 5: Закоммитить нестатичную версию

```bash
# Добавить изменения
git add .

# Закоммитить
git commit -m "Add dynamic version (non-static) from backup"

# Отправить в репозиторий
git push origin dynamic
```

## Шаг 6: Настроить синхронизацию

### Использование скриптов синхронизации

Созданы два скрипта:
- `sync-to-dynamic.ps1` - синхронизировать изменения из main в dynamic
- `sync-to-static.ps1` - синхронизировать изменения из dynamic в main

**Использование:**

```powershell
# Синхронизировать изменения из main в dynamic
.\sync-to-dynamic.ps1

# Синхронизировать изменения из dynamic в main
.\sync-to-static.ps1
```

### Ручная синхронизация

Если нужно синхронизировать вручную:

```bash
# Из main в dynamic
git checkout dynamic
git checkout main -- app/ components/ lib/
git add .
git commit -m "Sync: Update from main"
git checkout main

# Из dynamic в main
git checkout main
git checkout dynamic -- app/ components/ lib/
git add .
git commit -m "Sync: Update from dynamic"
git checkout dynamic
```

## Структура веток

- **main** - статичная версия (с `output: 'export'` в next.config.ts)
- **dynamic** - нестатичная версия (без `output: 'export'`)

## Рабочий процесс

### При изменении кода (app/, components/, lib/):

1. **Работайте в любой ветке** (main или dynamic)
2. **Внесите изменения**
3. **Синхронизируйте в другую ветку:**
   ```powershell
   # Если работали в main
   .\sync-to-dynamic.ps1
   
   # Если работали в dynamic
   .\sync-to-static.ps1
   ```

### При изменении конфигурации:

- **next.config.ts** - изменяйте в обеих ветках отдельно (разные настройки)
- **package.json** - синхронизируйте между ветками
- **server.js** - разные файлы в разных ветках

## Важные замечания

1. **Не синхронизируйте:**
   - `next.config.ts` (разные настройки)
   - `server.js` (разные версии)
   - `.next/` и `out/` (результаты сборки)

2. **Всегда синхронизируйте:**
   - `app/` - код страниц
   - `components/` - компоненты
   - `lib/` - библиотеки и утилиты
   - `public/` - статические файлы

3. **Перед синхронизацией:**
   - Закоммитьте все изменения в текущей ветке
   - Убедитесь, что нет незакоммиченных изменений

## Проверка

После настройки проверьте:

```bash
# Переключиться на dynamic
git checkout dynamic

# Проверить, что нет output: 'export'
grep -n "output.*export" next.config.ts || echo "✅ Правильно: нет output: export"

# Проверить server.js
head -5 server.js

# Вернуться на main
git checkout main

# Проверить, что есть output: 'export' (или нет, если не нужен для статики)
```










