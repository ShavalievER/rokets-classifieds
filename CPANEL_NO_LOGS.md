# Решение: Логи не найдены - приложение не запускается

## Проблема

Логи Node.js не найдены, что означает, что приложение, скорее всего, **не запускается** или **не может запуститься**.

## ✅ Решение: Проверить статус и диагностировать

### Шаг 1: Проверить статус приложения

1. Откройте **Setup Node.js App** в cPanel
2. Найдите ваше приложение `demo.rokets.delivery`
3. **Проверьте статус:**
   - **Running** (зелёный) = приложение должно работать
   - **Stopped** (красный) = приложение не запущено

### Шаг 2: Если статус "Stopped"

1. Нажмите **Start**
2. Подождите 15-20 секунд
3. Проверьте статус снова
4. Если остаётся **Stopped** - есть ошибка при запуске

### Шаг 3: Проверить конфигурацию

В **Setup Node.js App** проверьте:

1. **Application Root**: `public_html/rokets-classifieds`
   - ✅ Должен быть правильный путь
   - ❌ Не должен быть `repositories/rokets-classifieds`

2. **Application Startup File**: `server.js`
   - ✅ Должен быть `server.js`
   - ❌ Не должен быть `index.js` или другой файл

3. **Node.js Version**: `20.x` (минимум 18+)
   - ✅ Должна быть версия 18+

4. **Application URL**: `demo.rokets.delivery`

### Шаг 4: Проверить файлы

В **File Manager** проверьте наличие:

1. `public_html/rokets-classifieds/server.js` ✅
2. `public_html/rokets-classifieds/package.json` ✅
3. `public_html/rokets-classifieds/.next/` ✅ (скрытая папка)
4. `public_html/rokets-classifieds/node_modules/` ✅ (должна появиться после npm install)

### Шаг 5: Установить зависимости

1. В **Setup Node.js App** нажмите **Run NPM Install**
2. Дождитесь завершения (2-5 минут)
3. Проверьте, что нет ошибок
4. Нажмите **Restart**

### Шаг 6: Проверить переменные окружения

В **Setup Node.js App** проверьте, что установлены:

```
NEXT_PUBLIC_BASE_PATH=
NODE_ENV=production
```

**Важно:** `NEXT_PUBLIC_BASE_PATH` должен быть **пустым** (не `/demo`)

## Альтернативная диагностика: Создать тестовый файл

### Шаг 1: Создать простой тестовый сервер

1. Откройте **File Manager**
2. Перейдите в `public_html/rokets-classifieds`
3. Создайте файл `test-server.js` с содержимым:

```javascript
const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Test server is working!');
});

const port = process.env.PORT || 3001;
server.listen(port, () => {
  console.log(`Test server running on port ${port}`);
});
```

### Шаг 2: Временно изменить Startup File

1. В **Setup Node.js App** измените **Application Startup File** на `test-server.js`
2. Нажмите **Save**
3. Нажмите **Restart**
4. Подождите 10 секунд
5. Откройте `https://demo.rokets.delivery`

**Если видите "Test server is working!"** - значит Node.js работает, проблема в `server.js` или Next.js.

**Если всё ещё 404/503** - проблема в конфигурации cPanel или reverse proxy.

### Шаг 3: Вернуть server.js

1. В **Setup Node.js App** верните **Application Startup File** на `server.js`
2. Нажмите **Save**
3. Нажмите **Restart**

## Если тестовый сервер работает, но server.js нет

### Проблема 1: Отсутствуют зависимости

**Решение:**
1. В **Setup Node.js App** нажмите **Run NPM Install**
2. Дождитесь завершения
3. Нажмите **Restart**

### Проблема 2: Отсутствует папка .next

**Решение:**
1. Обновите репозиторий через **Git Version Control**
2. Убедитесь, что папка `.next/` скачалась
3. Включите показ скрытых файлов в File Manager

### Проблема 3: Ошибка в server.js

**Решение:**
1. Проверьте файл `server.js` в File Manager
2. Убедитесь, что он не повреждён
3. Обновите код из Git

## Полная переустановка

Если ничего не помогает:

### Шаг 1: Удалить старое приложение

1. В **Setup Node.js App** нажмите **Stop**
2. Нажмите **Delete** (или удалите вручную)

### Шаг 2: Проверить файлы

1. В **File Manager** убедитесь, что все файлы на месте
2. Проверьте наличие `.next/`

### Шаг 3: Создать новое приложение

1. В **Setup Node.js App** нажмите **Create Application**
2. Заполните:
   - **Node.js Version**: `20.x`
   - **Application Mode**: `Production`
   - **Application Root**: `public_html/rokets-classifieds`
   - **Application URL**: `demo.rokets.delivery`
   - **Application Startup File**: `server.js`
3. В разделе **Environment Variables** добавьте:
   - `NEXT_PUBLIC_BASE_PATH` = (пустое значение)
   - `NODE_ENV` = `production`
4. Нажмите **Create**

### Шаг 4: Установить зависимости

1. Нажмите **Run NPM Install**
2. Дождитесь завершения

### Шаг 5: Запустить

1. Нажмите **Start**
2. Подождите 15-20 секунд
3. Проверьте статус - должно быть **Running**

## Проверка работы

Откройте в браузере: `https://demo.rokets.delivery`

Должен открыться сайт.

## Диагностические вопросы

Ответьте на эти вопросы:

1. ✅ Какой статус приложения в Setup Node.js App? (Running/Stopped)
2. ✅ Что происходит при нажатии Start? (Остаётся Stopped или становится Running?)
3. ✅ Есть ли папка `.next/` в File Manager?
4. ✅ Есть ли папка `node_modules/` в File Manager?
5. ✅ Запускался ли Run NPM Install? (Были ли ошибки?)













