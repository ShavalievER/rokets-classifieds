# Решение: Тестовый сервер работает, но server.js нет

## ✅ Хорошая новость

Тестовый сервер работает! Это означает:
- ✅ Node.js работает правильно
- ✅ Конфигурация cPanel правильная
- ✅ Reverse proxy работает
- ✅ Порт и URL настроены правильно

## ❌ Проблема

Проблема в `server.js` или Next.js. Нужно проверить несколько вещей.

## ✅ Решение: Пошаговая диагностика

### Шаг 1: Вернуть server.js

1. В **Setup Node.js App** верните **Application Startup File** на `server.js`
2. Нажмите **Save**
3. Нажмите **Restart**
4. Подождите 15-20 секунд

### Шаг 2: Проверить папку .next

1. Откройте **File Manager**
2. Перейдите в `public_html/rokets-classifieds`
3. **Включите показ скрытых файлов** (Settings → Show Hidden Files)
4. Проверьте наличие папки `.next/`
5. Внутри должны быть папки:
   - `server/` - серверные файлы
   - `static/` - статические файлы

**Если папки `.next/` нет:**
1. Обновите репозиторий через **Git Version Control**
2. Нажмите **Pull or Deploy** → **Update from Remote**
3. Убедитесь, что папка `.next/` скачалась

### Шаг 3: Проверить зависимости

1. В **File Manager** проверьте наличие папки `node_modules/`
2. Если её нет:
   - В **Setup Node.js App** нажмите **Run NPM Install**
   - Дождитесь завершения
   - Нажмите **Restart**

### Шаг 4: Проверить переменные окружения

В **Setup Node.js App** проверьте, что установлены:

```
NEXT_PUBLIC_BASE_PATH=
NODE_ENV=production
```

**Важно:** `NEXT_PUBLIC_BASE_PATH` должен быть **пустым** (не `/demo`)

### Шаг 5: Обновить код из Git

1. Откройте **Git Version Control** в cPanel
2. Найдите репозиторий `rokets-classifieds`
3. Нажмите **Pull or Deploy**
4. Выберите ветку `main`
5. Нажмите **Update from Remote**

Это обновит `server.js` с улучшенной диагностикой.

### Шаг 6: Перезапустить приложение

1. В **Setup Node.js App** нажмите **Stop**
2. Подождите 10 секунд
3. Нажмите **Start**
4. Подождите 15-20 секунд
5. Проверьте статус - должно быть **Running**

### Шаг 7: Проверить логи (если появятся)

После обновления кода логи могут появиться. Проверьте:

1. **File Manager** → `logs/nodejs/demo.rokets.delivery.log`
2. Ищите строки:
   - `Starting Rokets classifieds...`
   - `✅ Next.js app prepared successfully` - успешная инициализация
   - `❌ Failed to prepare Next.js app` - ошибка инициализации
   - `❌ .next folder NOT found` - отсутствует папка .next

## Типичные проблемы

### Проблема 1: Папка .next отсутствует

**Симптом:** В логах `❌ .next folder NOT found`

**Решение:**
1. Обновите репозиторий через Git Version Control
2. Убедитесь, что папка `.next/` скачалась
3. Включите показ скрытых файлов в File Manager

### Проблема 2: Зависимости не установлены

**Симптом:** В логах `Cannot find module 'next'`

**Решение:**
1. В **Setup Node.js App** нажмите **Run NPM Install**
2. Дождитесь завершения
3. Нажмите **Restart**

### Проблема 3: Next.js не может найти production build

**Симптом:** В логах ошибки про `.next/server`

**Решение:**
1. Проверьте наличие папки `.next/server/`
2. Если её нет - обновите репозиторий
3. Или пересоберите build локально и загрузите

## Проверка работы

Откройте в браузере: `https://demo.rokets.delivery`

Должен открыться сайт.

## Если ошибка сохраняется

После обновления кода и перезапуска проверьте логи. Теперь они должны содержать более подробную информацию об ошибке.

**Что искать в логах:**
- `✅ Next.js app prepared successfully` - всё хорошо
- `❌ Failed to prepare Next.js app` - есть ошибка
- `❌ .next folder NOT found` - отсутствует build
- `Cannot find module` - отсутствуют зависимости













