# Решение: server-simple.js не выводит диагностику

## Проблема

- ✅ Приложение в статусе **Running**
- ✅ Используется `server-simple.js`
- ❌ Диагностика не выводится (нет логов)
- ❌ Всё ещё ошибка 503

Это означает, что приложение **падает до того, как успевает записать логи**, или логи сохраняются в недоступном месте.

## ✅ Решение: Использовать минимальный тест

### Шаг 1: Обновить код из Git

1. Откройте **Git Version Control** в cPanel
2. Найдите репозиторий `rokets-classifieds`
3. Нажмите **Pull or Deploy**
4. Выберите ветку `main`
5. Нажмите **Update from Remote**

Это добавит файл `test-minimal.js` - максимально простой тест.

### Шаг 2: Использовать test-minimal.js

1. В **Setup Node.js App** измените **Application Startup File** на `test-minimal.js`
2. Нажмите **Save**
3. Нажмите **Stop**
4. Подождите 10 секунд
5. Нажмите **Start**
6. Подождите 20 секунд
7. Откройте `https://demo.rokets.delivery`

**Если видите "✅ Test server is working!"** - значит Node.js работает, проблема в Next.js.

**Если всё ещё 503** - проблема в конфигурации cPanel или reverse proxy.

### Шаг 3: Проверить логи (если появятся)

После использования `test-minimal.js` логи могут появиться. Проверьте:

1. **File Manager** → `logs/nodejs/demo.rokets.delivery.log`
2. Или **Error Log** в cPanel

**Что искать:**
- `MINIMAL TEST SERVER STARTED`
- `✅ TEST SERVER RUNNING`
- Информацию о файлах (.next, node_modules)

### Шаг 4: Если test-minimal.js работает

Если `test-minimal.js` показывает "Test server is working!":

1. В **Setup Node.js App** измените **Application Startup File** на `server-simple.js`
2. Нажмите **Save** и **Restart**
3. Проверьте логи

### Шаг 5: Если test-minimal.js НЕ работает

Если `test-minimal.js` тоже показывает 503:

1. Проблема в конфигурации cPanel или reverse proxy
2. Проверьте настройки приложения в **Setup Node.js App**
3. Возможно, нужно обратиться в поддержку Verpex

## Альтернатива: Проверить настройки приложения

В **Setup Node.js App** проверьте:

1. **Application Root**: `public_html/rokets-classifieds`
   - ✅ Должен быть правильный путь

2. **Application Startup File**: `test-minimal.js` (для теста)
   - ✅ Должен быть правильный файл

3. **Node.js Version**: `20.x` (минимум 18+)
   - ✅ Должна быть правильная версия

4. **Application URL**: `demo.rokets.delivery`
   - ✅ Должен быть правильный поддомен

## Если test-minimal.js работает, но server-simple.js нет

Это означает, что проблема в Next.js. Проверьте:

1. Есть ли папка `.next/server/`?
2. Есть ли папка `node_modules/next/`?
3. Установлены ли зависимости? (Run NPM Install)

## Проверка работы

Откройте в браузере: `https://demo.rokets.delivery`

После использования `test-minimal.js` должно показать "✅ Test server is working!" или остаться 503.

