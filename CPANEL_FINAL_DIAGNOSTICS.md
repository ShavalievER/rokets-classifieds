# Финальная диагностика: Нет логов вообще

## Проблема

Нет логов нигде:
- ❌ `logs/nodejs/` не существует
- ❌ `error_log` в корневой папке нет
- ❌ Error Log в cPanel пустой

Это означает, что приложение **не запускается вообще** или **падает до записи логов**.

## ✅ Критическая проверка

### Шаг 1: Проверить статус приложения (ВАЖНО!)

1. Откройте **Setup Node.js App** в cPanel
2. Найдите ваше приложение `demo.rokets.delivery`
3. **Проверьте статус:**
   - **Running** (зелёный индикатор) = приложение должно работать
   - **Stopped** (красный индикатор) = приложение не запущено

**КРИТИЧЕСКИ ВАЖНО:** Что происходит при нажатии **Start**?
- ✅ Становится **Running** и остаётся? = приложение работает, но не отвечает
- ❌ Становится **Running** и сразу **Stopped**? = приложение падает при запуске
- ❌ Остаётся **Stopped**? = приложение не может запуститься

### Шаг 2: Проверить файлы (ОБЯЗАТЕЛЬНО!)

В **File Manager** проверьте наличие:

1. **`public_html/rokets-classifieds/server-simple.js`** ✅
   - Должен быть после обновления из Git
   - Если нет - обновите репозиторий

2. **`public_html/rokets-classifieds/.next/`** ✅ (СКРЫТАЯ ПАПКА!)
   - Включите показ скрытых файлов: **Settings → Show Hidden Files**
   - Должна быть папка `.next/`
   - Внутри должны быть папки `server/` и `static/`
   - **Если нет - это основная проблема!**

3. **`public_html/rokets-classifieds/node_modules/`** ✅
   - Должна появиться после **Run NPM Install**
   - **Если нет - нужно установить зависимости**

4. **`public_html/rokets-classifieds/package.json`** ✅
   - Должен быть

### Шаг 3: Проверить конфигурацию

В **Setup Node.js App** проверьте:

1. **Application Root**: `public_html/rokets-classifieds`
   - ✅ Должен быть правильный путь
   - ❌ НЕ должен быть `repositories/rokets-classifieds`

2. **Application Startup File**: `server-simple.js` (для диагностики)
   - ✅ Должен быть `server-simple.js`
   - ❌ НЕ должен быть `index.js` или другой файл

3. **Node.js Version**: `20.x` (минимум 18+)
   - ✅ Должна быть версия 18+

4. **Application URL**: `demo.rokets.delivery`
   - ✅ Должен быть правильный поддомен

### Шаг 4: Установить зависимости (если не установлены)

1. В **Setup Node.js App** нажмите **Run NPM Install**
2. Дождитесь завершения (2-5 минут)
3. Проверьте, что нет ошибок
4. Нажмите **Restart**

### Шаг 5: Обновить код из Git

1. Откройте **Git Version Control** в cPanel
2. Найдите репозиторий `rokets-classifieds`
3. Нажмите **Pull or Deploy**
4. Выберите ветку `main`
5. Нажмите **Update from Remote**

Это обновит файлы, включая `server-simple.js` и папку `.next/`.

### Шаг 6: Полностью перезапустить

1. В **Setup Node.js App** нажмите **Stop**
2. Подождите 10 секунд
3. Нажмите **Start**
4. Подождите 20 секунд
5. Проверьте статус - должно быть **Running**

## Если статус "Stopped" и не запускается

### Возможные причины:

1. **Отсутствует папка .next**
   - Решение: Обновите репозиторий через Git Version Control

2. **Отсутствуют зависимости (node_modules)**
   - Решение: Запустите **Run NPM Install**

3. **Неправильный Application Root**
   - Решение: Проверьте путь - должен быть `public_html/rokets-classifieds`

4. **Неправильный Application Startup File**
   - Решение: Должен быть `server-simple.js` (для диагностики)

5. **Неправильная версия Node.js**
   - Решение: Установите Node.js 20.x

## Если статус "Running", но сайт не работает

### Возможные причины:

1. **Приложение запускается, но падает при первом запросе**
   - Решение: Проверьте логи (если появятся)

2. **Проблема с reverse proxy**
   - Решение: Проверьте настройки в cPanel

3. **Проблема с портом**
   - Решение: Проверьте, какой порт использует приложение

## Полная переустановка (если ничего не помогает)

### Шаг 1: Удалить старое приложение

1. В **Setup Node.js App** нажмите **Stop**
2. Нажмите **Delete** (или удалите вручную)

### Шаг 2: Проверить файлы

1. В **File Manager** убедитесь, что все файлы на месте:
   - `server-simple.js` ✅
   - `package.json` ✅
   - `.next/` ✅ (скрытая папка!)
   - `node_modules/` ✅ (после npm install)

### Шаг 3: Создать новое приложение

1. В **Setup Node.js App** нажмите **Create Application**
2. Заполните:
   - **Node.js Version**: `20.x`
   - **Application Mode**: `Production`
   - **Application Root**: `public_html/rokets-classifieds`
   - **Application URL**: `demo.rokets.delivery`
   - **Application Startup File**: `server-simple.js`
3. В разделе **Environment Variables** добавьте:
   - `NEXT_PUBLIC_BASE_PATH` = (пустое значение)
   - `NODE_ENV` = `production`
4. Нажмите **Create**

### Шаг 4: Установить зависимости

1. Нажмите **Run NPM Install**
2. Дождитесь завершения

### Шаг 5: Запустить

1. Нажмите **Start**
2. Подождите 20 секунд
3. Проверьте статус - должно быть **Running**

## Проверка работы

Откройте в браузере: `https://demo.rokets.delivery`

Должен открыться сайт или появиться логи с диагностикой.

## ВАЖНО: Ответьте на эти вопросы

1. ✅ **Какой статус приложения в Setup Node.js App?** (Running/Stopped)
2. ✅ **Что происходит при нажатии Start?** (Становится Running или остаётся Stopped?)
3. ✅ **Есть ли папка `.next/` в File Manager?** (включите показ скрытых файлов!)
4. ✅ **Есть ли папка `node_modules/` в File Manager?**
5. ✅ **Запускался ли Run NPM Install?** (Были ли ошибки?)
6. ✅ **Правильный ли Application Root?** (`public_html/rokets-classifieds`)

Эти ответы помогут точно определить проблему!

