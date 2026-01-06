# Решение: Логи не появляются вообще

## Проблема

Логи не появляются ни в `logs/nodejs/`, ни в Error Log. Это означает, что приложение **не запускается** или **падает сразу при старте**.

## ✅ Решение: Проверить статус и найти причину

### Шаг 1: Проверить статус приложения

1. Откройте **Setup Node.js App** в cPanel
2. Найдите ваше приложение `demo.rokets.delivery`
3. **Проверьте статус:**
   - **Running** (зелёный) = приложение должно работать
   - **Stopped** (красный) = приложение не запущено

**Что происходит при нажатии Start?**
- Становится **Running** и сразу **Stopped**? = приложение падает при запуске
- Остаётся **Stopped**? = приложение не может запуститься

### Шаг 2: Проверить файлы

В **File Manager** проверьте наличие:

1. `public_html/rokets-classifieds/server-simple.js` ✅
2. `public_html/rokets-classifieds/.next/` ✅ (скрытая папка)
3. `public_html/rokets-classifieds/node_modules/` ✅

**Если папки `.next/` нет:**
1. Обновите репозиторий через **Git Version Control**
2. Убедитесь, что папка `.next/` скачалась

**Если папки `node_modules/` нет:**
1. В **Setup Node.js App** нажмите **Run NPM Install**
2. Дождитесь завершения

### Шаг 3: Проверить конфигурацию

В **Setup Node.js App** проверьте:

- **Application Root**: `public_html/rokets-classifieds`
  - ✅ Должен быть правильный путь
  - ❌ Не должен быть `repositories/rokets-classifieds`

- **Application Startup File**: `server-simple.js`
  - ✅ Должен быть `server-simple.js` (для диагностики)

- **Node.js Version**: `20.x` (минимум 18+)

### Шаг 4: Проверить другие места для логов

Логи могут быть в других местах:

**Вариант A: В корневой папке**
1. **File Manager** → корневая папка
2. Найдите файл `error_log` или `error_log-YYYY-MM-DD`

**Вариант B: В папке приложения**
1. **File Manager** → `public_html/rokets-classifieds/`
2. Найдите файл `error.log` или `server.log`

**Вариант C: В домашней папке**
1. **File Manager** → нажмите **Home** (домик)
2. Найдите файл `error_log`

### Шаг 5: Создать простейший тест

Если `server-simple.js` тоже не работает, создайте ещё более простой файл:

1. **File Manager** → `public_html/rokets-classifieds/`
2. Создайте файл `test.js` с содержимым:

```javascript
console.log('Test script started');
console.log('Node.js version:', process.version);
console.log('Current directory:', __dirname);
console.log('Environment:', process.env.NODE_ENV);

const http = require('http');
const port = process.env.PORT || 3001;

const server = http.createServer((req, res) => {
  console.log('Request received:', req.url);
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Test server is working!');
});

server.listen(port, () => {
  console.log(`Test server running on port ${port}`);
});
```

3. В **Setup Node.js App** измените **Application Startup File** на `test.js`
4. Нажмите **Save** и **Restart**
5. Откройте `https://demo.rokets.delivery`

**Если видите "Test server is working!"** - значит Node.js работает, проблема в Next.js.

**Если всё ещё 503** - проблема в конфигурации cPanel или reverse proxy.

### Шаг 6: Проверить через Error Log в cPanel

1. В cPanel найдите раздел **Logs**
2. Откройте **Error Log**
3. Проверьте последние ошибки
4. Ищите ошибки, связанные с Node.js или вашим приложением

## Если приложение падает сразу при старте

### Возможные причины:

1. **Отсутствует папка .next**
   - Решение: Обновите репозиторий через Git

2. **Отсутствуют зависимости**
   - Решение: Запустите Run NPM Install

3. **Ошибка в server.js**
   - Решение: Используйте server-simple.js для диагностики

4. **Неправильная версия Node.js**
   - Решение: Установите Node.js 20.x

5. **Неправильный путь к файлам**
   - Решение: Проверьте Application Root

## Полная переустановка

Если ничего не помогает:

### Шаг 1: Удалить старое приложение

1. В **Setup Node.js App** нажмите **Stop**
2. Нажмите **Delete**

### Шаг 2: Проверить файлы

1. В **File Manager** убедитесь, что все файлы на месте
2. Проверьте наличие `.next/` (скрытая папка)

### Шаг 3: Создать новое приложение

1. В **Setup Node.js App** нажмите **Create Application**
2. Заполните:
   - **Node.js Version**: `20.x`
   - **Application Mode**: `Production`
   - **Application Root**: `public_html/rokets-classifieds`
   - **Application URL**: `demo.rokets.delivery`
   - **Application Startup File**: `test.js` (для начала)
3. Нажмите **Create**

### Шаг 4: Проверить тестовый сервер

1. Откройте `https://demo.rokets.delivery`
2. Должно показать "Test server is working!"

### Шаг 5: Переключиться на server-simple.js

1. В **Setup Node.js App** измените **Application Startup File** на `server-simple.js`
2. Нажмите **Save** и **Restart**
3. Проверьте логи

### Шаг 6: Установить зависимости

1. Нажмите **Run NPM Install**
2. Дождитесь завершения

### Шаг 7: Переключиться на server.js

1. Измените **Application Startup File** на `server.js`
2. Нажмите **Save** и **Restart**

## Диагностические вопросы

Ответьте на эти вопросы:

1. ✅ Какой статус приложения в Setup Node.js App? (Running/Stopped)
2. ✅ Что происходит при нажатии Start? (Становится Running или остаётся Stopped?)
3. ✅ Есть ли папка `.next/` в File Manager? (включите показ скрытых файлов)
4. ✅ Есть ли папка `node_modules/` в File Manager?
5. ✅ Запускался ли Run NPM Install? (Были ли ошибки?)
6. ✅ Есть ли файл `error_log` в корневой папке?

