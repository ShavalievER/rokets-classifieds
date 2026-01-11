# Решение: Out of Memory при сборке на сервере

## Проблема

При сборке Next.js на сервере Verpex возникает ошибка:

```
Out of memory error may be caused by hitting LVE limits
```

Это происходит потому, что сборка Next.js требует много памяти (обычно 2-4GB), а на shared hosting есть ограничения.

## ✅ Решение: Собрать локально и загрузить на сервер

Лучший способ - собрать проект на вашем компьютере (где достаточно памяти) и загрузить только папку `.next` на сервер.

### Шаг 1: Собрать проект локально

На вашем компьютере:

```bash
cd C:\Dev\CursorProjects\Rokets_clsfd\commerce

# Установить зависимости (если еще не установлены)
npm install

# Собрать проект
npm run build
```

После сборки появится папка `.next/` с готовыми файлами.

### Шаг 2: Создать архив папки .next

**Windows (PowerShell):**

```powershell
cd C:\Dev\CursorProjects\Rokets_clsfd\commerce
Compress-Archive -Path .next -DestinationPath .next.zip -Force
```

**Или через 7-Zip/WinRAR:**
- Выберите папку `.next`
- Создайте ZIP-архив `next.zip`

### Шаг 3: Загрузить архив на сервер

1. Откройте **File Manager** в cPanel
2. Перейдите в `public_html/rokets-classifieds/`
3. Загрузите файл `.next.zip`
4. Распакуйте архив (Extract)
5. Убедитесь, что папка `.next/` находится в корне проекта

### Шаг 4: Обновить код на сервере (без сборки)

На сервере:

```bash
cd ~/public_html/rokets-classifieds

# Обновить код из GitHub (без сборки)
git reset --hard origin/main
git clean -fd
git pull origin main

# Установить зависимости (если нужно)
npm install --legacy-peer-deps

# НЕ запускать npm run build:verpex!
# Папка .next уже загружена из локальной сборки
```

### Шаг 5: Перезапустить приложение

В cPanel → **Setup Node.js App** → **Restart**

## Альтернатива: Использовать скрипт для автоматизации

### Скрипт для Windows (build-and-upload.ps1)

Создайте файл `build-and-upload.ps1` в папке `commerce/`:

```powershell
# Собрать проект
Write-Host "Building project..." -ForegroundColor Green
npm run build

# Создать архив
Write-Host "Creating archive..." -ForegroundColor Green
Compress-Archive -Path .next -DestinationPath .next.zip -Force

Write-Host "Done! Upload .next.zip to server via File Manager" -ForegroundColor Green
Write-Host "Then extract it in public_html/rokets-classifieds/" -ForegroundColor Yellow
```

Запустите:

```powershell
cd C:\Dev\CursorProjects\Rokets_clsfd\commerce
.\build-and-upload.ps1
```

## Важно: Обновление .gitignore

Папка `.next/` уже в `.gitignore`, поэтому она не будет загружаться через Git. Это правильно - загружайте её вручную через File Manager.

## Когда нужно пересобирать

Пересобирайте проект локально и загружайте `.next/` когда:

- ✅ Изменили код (компоненты, страницы, стили)
- ✅ Обновили зависимости в `package.json`
- ✅ Изменили `next.config.ts`
- ✅ Добавили новые страницы или маршруты

**НЕ нужно пересобирать** когда:
- ❌ Изменили только данные в `lib/demo/` (если они не используются на этапе сборки)
- ❌ Изменили только конфигурацию сервера

## Проверка после загрузки

На сервере проверьте:

```bash
cd ~/public_html/rokets-classifieds

# Проверить наличие папки .next
ls -la .next

# Проверить структуру
ls -la .next/static
```

Должны быть папки:
- `.next/static/` - статические файлы
- `.next/server/` - серверные файлы
- `.next/BUILD_ID` - ID сборки

## Если сборка локально не работает

Если у вас тоже проблемы с памятью локально:

1. **Закройте другие программы** (браузер, IDE и т.д.)
2. **Увеличьте лимит памяти:**

```bash
# Windows PowerShell
$env:NODE_OPTIONS="--max-old-space-size=4096"
npm run build
```

3. **Используйте более легкую сборку:**

```bash
# Отключить оптимизацию изображений
NEXT_IMAGE_OPTIMIZATION=false npm run build
```

## Оптимизация для будущих сборок

Если хотите уменьшить потребление памяти при сборке:

1. **Уменьшите количество страниц** (используйте динамические маршруты)
2. **Отключите source maps** (уже сделано в `next.config.ts`)
3. **Используйте меньше изображений** или оптимизируйте их заранее
4. **Разбейте большие компоненты** на меньшие

## Резюме

**Рекомендуемый workflow:**

1. ✅ Разработка локально
2. ✅ `npm run build` локально
3. ✅ Создать `.next.zip`
4. ✅ Загрузить через File Manager на сервер
5. ✅ Распаковать в `public_html/rokets-classifieds/`
6. ✅ Обновить код через `git pull` (без сборки)
7. ✅ Перезапустить приложение

Это самый надежный способ для shared hosting с ограничениями памяти!













