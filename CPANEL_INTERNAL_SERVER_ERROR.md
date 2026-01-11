# Решение: Internal Server Error - ничего не показывает

## Проблема

Даже самый простой сервер показывает "Internal Server Error" и ничего не выводит. Это означает, что проблема **не в коде**, а в конфигурации cPanel или reverse proxy.

## ✅ Решения

### Вариант 1: Проверить настройки приложения

1. Откройте **Setup Node.js App** в cPanel
2. Найдите приложение для `demo.rokets.delivery`
3. Проверьте следующие настройки:

   **Application Root**: `public_html/rokets-classifieds`
   - ✅ Должен быть правильный путь
   
   **Application Startup File**: `server-error-catcher.js` (или `test-minimal.js`)
   - ✅ Должен быть правильный файл
   
   **Node.js Version**: `20.x` (минимум 18+)
   - ✅ Должна быть правильная версия
   
   **Application URL**: `demo.rokets.delivery`
   - ✅ Должен быть правильный поддомен
   
   **Application Mode**: `Production`
   - ✅ Должен быть Production

4. Нажмите **Save**

### Вариант 2: Проверить статус приложения

1. В **Setup Node.js App** проверьте статус приложения
2. Должно быть **Running** (зелёный)
3. Если **Stopped** (красный):
   - Нажмите **Start**
   - Подождите 20 секунд
   - Проверьте снова

### Вариант 3: Использовать test-minimal.js

1. В **Setup Node.js App** измените **Application Startup File** на `test-minimal.js`
2. Нажмите **Save**
3. Нажмите **Stop**
4. Подождите 10 секунд
5. Нажмите **Start**
6. Подождите 20 секунд
7. Откройте `https://demo.rokets.delivery`

**Если `test-minimal.js` работает** - значит проблема в других файлах.
**Если `test-minimal.js` тоже не работает** - проблема в конфигурации cPanel.

### Вариант 4: Проверить порт

1. В **Setup Node.js App** проверьте, какой порт указан
2. Должен быть порт **3001** (или другой, но не 80/443)
3. Если порт неправильный, измените его

### Вариант 5: Проверить reverse proxy

Если приложение в статусе **Running**, но сайт не работает:

1. Возможно, проблема в настройках reverse proxy
2. Обратитесь в поддержку Verpex
3. Скажите им:
   - Приложение в статусе **Running**
   - Порт: **3001** (или другой указанный)
   - URL: `demo.rokets.delivery`
   - Но сайт показывает "Internal Server Error"

### Вариант 6: Создать новое приложение

Если ничего не помогает:

1. В **Setup Node.js App** создайте **новое приложение**
2. Настройки:
   - **Node.js Version**: `20.x`
   - **Application Root**: `public_html/rokets-classifieds`
   - **Application Startup File**: `test-minimal.js`
   - **Application URL**: `demo.rokets.delivery` (или другой поддомен)
3. Нажмите **Create**
4. Проверьте работу

## Проверка

После каждого шага проверяйте:
- Статус приложения в **Setup Node.js App**
- Откройте `https://demo.rokets.delivery` в браузере
- Очистите кеш браузера (Ctrl+F5)

## Если ничего не помогает

Если даже `test-minimal.js` не работает, проблема точно в конфигурации cPanel или reverse proxy. Обратитесь в поддержку Verpex с информацией:
- Статус приложения: **Running** или **Stopped**
- Порт: **3001** (или другой)
- URL: `demo.rokets.delivery`
- Ошибка: "Internal Server Error"













