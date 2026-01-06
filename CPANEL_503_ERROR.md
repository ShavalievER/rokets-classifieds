# Решение: Ошибка 503 на demo.rokets.delivery

## Проблема

При открытии `https://demo.rokets.delivery` возвращается ошибка **503 Service Unavailable**.

## Возможные причины

1. ❌ Приложение не запущено
2. ❌ Неправильная конфигурация Node.js App
3. ❌ Ошибки в коде при запуске
4. ❌ Неправильный путь к файлам
5. ❌ Проблемы с портом

## ✅ Решение: Пошаговая диагностика

### Шаг 1: Проверить статус приложения

1. Откройте **Setup Node.js App** в cPanel
2. Найдите ваше приложение `demo.rokets.delivery`
3. Проверьте статус:
   - Должно быть **Running** (зелёный индикатор)
   - Если **Stopped** (красный) - нажмите **Start**

### Шаг 2: Проверить логи приложения

**Вариант A: Через File Manager**

1. Откройте **File Manager** в cPanel
2. Перейдите в папку `logs/` или `logs/nodejs/`
3. Найдите файл с именем вашего приложения (например, `demo.rokets.delivery.log`)
4. Откройте файл и проверьте последние строки

**Вариант B: Через cPanel Error Log**

1. В cPanel найдите **Metrics** → **Errors**
2. Или найдите **Error Log** в разделе **Logs**
3. Проверьте последние ошибки

**Вариант C: Если есть SSH доступ**

```bash
ssh ваш_username@rokets.delivery
tail -f ~/logs/nodejs/demo.rokets.delivery.log
```

**Вариант D: Проверить статус приложения**

1. В **Setup Node.js App** найдите ваше приложение
2. Проверьте статус (Running/Stopped)
3. Если есть кнопка **Restart** или **Reload** - нажмите её

**Типичные ошибки:**

#### Ошибка: "Cannot find module 'next'"
```
Error: Cannot find module 'next'
```

**Решение:**
1. В **Setup Node.js App** нажмите **Run NPM Install**
2. Дождитесь завершения
3. Нажмите **Restart**

#### Ошибка: "Cannot find module './server.js'"
```
Error: Cannot find module './server.js'
```

**Решение:**
1. Проверьте **Application Root** в **Setup Node.js App**
2. Должно быть: `public_html/rokets-classifieds`
3. Проверьте **Application Startup File**
4. Должно быть: `server.js`

#### Ошибка: ".next folder not found"
```
Error: Could not find a production build
```

**Решение:**
1. Проверьте наличие папки `.next/` в File Manager
2. Если её нет - обновите репозиторий через Git Version Control
3. Или загрузите файлы заново

### Шаг 3: Проверить конфигурацию Node.js App

В **Setup Node.js App** проверьте:

1. **Application Root**: `public_html/rokets-classifieds`
   - ✅ Должен быть правильный путь
   - ❌ Не должен быть `repositories/rokets-classifieds`

2. **Application Startup File**: `server.js`
   - ✅ Должен быть `server.js`
   - ❌ Не должен быть `index.js` или другой файл

3. **Node.js Version**: `20.x` (или последняя доступная)
   - ✅ Должна быть версия 18+

4. **Application URL**: `demo.rokets.delivery`
   - ✅ Должен быть правильный поддомен

### Шаг 4: Перезапустить приложение

1. В **Setup Node.js App** найдите ваше приложение
2. Нажмите **Stop** (если запущено)
3. Подождите 5 секунд
4. Нажмите **Start**
5. Подождите 10-15 секунд
6. Проверьте статус - должно быть **Running**

### Шаг 5: Проверить файлы

В **File Manager** проверьте:

1. **Папка существует**: `public_html/rokets-classifieds`
2. **Файл server.js существует**: `public_html/rokets-classifieds/server.js`
3. **Папка .next существует**: `public_html/rokets-classifieds/.next`
   - Включите показ скрытых файлов (Settings → Show Hidden Files)
4. **Файл package.json существует**: `public_html/rokets-classifieds/package.json`

### Шаг 6: Установить зависимости заново

Если зависимости не установлены:

1. В **Setup Node.js App** нажмите **Run NPM Install**
2. Дождитесь завершения (может занять 2-5 минут)
3. Проверьте, что нет ошибок
4. Нажмите **Restart**

## Полная переустановка (если ничего не помогает)

### Шаг 1: Удалить старое приложение

1. В **Setup Node.js App** найдите ваше приложение
2. Нажмите **Stop**
3. Нажмите **Delete** (или удалите вручную)

### Шаг 2: Проверить файлы

1. В **File Manager** перейдите в `public_html/rokets-classifieds`
2. Убедитесь, что есть:
   - `server.js`
   - `package.json`
   - `.next/` (скрытая папка)
   - `node_modules/` (должна появиться после npm install)

### Шаг 3: Создать новое приложение

1. В **Setup Node.js App** нажмите **Create Application**
2. Заполните:
   - **Node.js Version**: `20.x`
   - **Application Mode**: `Production`
   - **Application Root**: `public_html/rokets-classifieds`
   - **Application URL**: `demo.rokets.delivery`
   - **Application Startup File**: `server.js`
3. Нажмите **Create**

### Шаг 4: Установить зависимости

1. После создания приложения нажмите **Run NPM Install**
2. Дождитесь завершения

### Шаг 5: Запустить приложение

1. Нажмите **Start**
2. Подождите 10-15 секунд
3. Проверьте статус - должно быть **Running**

## Проверка работы

Откройте в браузере: `https://demo.rokets.delivery`

Должен открыться сайт.

## Если ошибка сохраняется

### Проверьте логи подробнее

В логах ищите:
- `Error:` - ошибки выполнения
- `Cannot find module` - отсутствующие модули
- `EADDRINUSE` - порт занят
- `ENOENT` - файл не найден

### Проверьте через SSH (если есть доступ)

```bash
ssh ваш_username@rokets.delivery
cd ~/public_html/rokets-classifieds

# Проверить, запущен ли процесс
ps aux | grep node

# Проверить логи
tail -f ~/logs/nodejs/demo.rokets.delivery.log

# Попробовать запустить вручную
node server.js
```

Если запускается вручную, но не через cPanel - проблема в конфигурации cPanel.

## Частые проблемы и решения

### Проблема 1: "Application root not found"

**Решение:** Проверьте путь в **Application Root** - должен быть `public_html/rokets-classifieds`

### Проблема 2: "Port already in use"

**Решение:** 
1. Остановите все Node.js приложения
2. Перезапустите нужное приложение
3. Или измените порт в настройках

### Проблема 3: "Module not found"

**Решение:**
1. Запустите **Run NPM Install**
2. Проверьте, что `node_modules/` существует
3. Перезапустите приложение

### Проблема 4: ".next folder not found"

**Решение:**
1. Обновите репозиторий через Git Version Control
2. Или загрузите файлы заново через File Manager

## Контакты для поддержки

Если проблема сохраняется:
1. Скопируйте логи из **View Logs**
2. Обратитесь в поддержку Verpex с описанием проблемы
3. Приложите логи ошибок

