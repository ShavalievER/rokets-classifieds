# Детальная диагностика ошибки 404

## Если переменные окружения установлены, но 404 сохраняется

### Шаг 1: Обновить код из Git

1. Откройте **Git Version Control** в cPanel
2. Найдите репозиторий `rokets-classifieds`
3. Нажмите **Pull or Deploy**
4. Выберите ветку `main`
5. Нажмите **Update from Remote**

### Шаг 2: Проверить логи (если доступны)

Проверьте логи через **File Manager** → `logs/nodejs/demo.rokets.delivery.log`

Ищите строки:
- `Starting Rokets classifieds...`
- `Base path: (none)` или `Base path: /demo`
- `✅ Rokets classifieds ready`
- `GET /` или другие запросы

### Шаг 3: Проверить, что приложение запущено

1. В **Setup Node.js App** проверьте статус
2. Должно быть **Running** (зелёный)
3. Если **Stopped** - нажмите **Start**

### Шаг 4: Полностью перезапустить приложение

1. В **Setup Node.js App** нажмите **Stop**
2. Подождите 10 секунд
3. Нажмите **Start**
4. Подождите 15-20 секунд
5. Проверьте статус - должно быть **Running**

### Шаг 5: Проверить конфигурацию приложения

В **Setup Node.js App** проверьте:

1. **Application Root**: `public_html/rokets-classifieds`
   - ✅ Должен быть правильный путь
   - ❌ Не должен быть `repositories/rokets-classifieds`

2. **Application Startup File**: `server.js`
   - ✅ Должен быть `server.js`
   - ❌ Не должен быть `index.js` или другой файл

3. **Application URL**: `demo.rokets.delivery`
   - ✅ Должен быть правильный поддомен

4. **Node.js Version**: `20.x` (минимум 18+)

### Шаг 6: Проверить переменные окружения

В **Setup Node.js App** проверьте, что установлены:

```
NEXT_PUBLIC_BASE_PATH=
NODE_ENV=production
```

**Важно:** `NEXT_PUBLIC_BASE_PATH` должен быть **пустым** (не `/demo` и не пробел)

### Шаг 7: Проверить файлы

В **File Manager** проверьте наличие:

1. `public_html/rokets-classifieds/server.js` ✅
2. `public_html/rokets-classifieds/package.json` ✅
3. `public_html/rokets-classifieds/.next/` ✅ (скрытая папка)
4. `public_html/rokets-classifieds/.next/server/` ✅
5. `public_html/rokets-classifieds/.next/static/` ✅

### Шаг 8: Проверить, что папка .next содержит production build

В **File Manager** проверьте:

1. Перейдите в `public_html/rokets-classifieds/.next/`
2. Должны быть папки:
   - `server/` - серверные файлы
   - `static/` - статические файлы
   - `BUILD_ID` - файл с ID сборки

Если папки нет или она пустая:
1. Обновите репозиторий через Git Version Control
2. Или загрузите файлы заново

## Альтернативное решение: Проверить через прямой доступ к порту

Если есть доступ к логам, проверьте, на каком порту работает приложение.

В логах должна быть строка:
```
✅ Rokets classifieds ready on http://localhost:XXXX
```

Где `XXXX` - номер порта.

## Если ничего не помогает: Полная переустановка

### Шаг 1: Удалить старое приложение

1. В **Setup Node.js App** нажмите **Stop**
2. Нажмите **Delete** (или удалите вручную)

### Шаг 2: Проверить файлы

1. В **File Manager** проверьте, что все файлы на месте
2. Убедитесь, что есть папка `.next/`

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

Ответьте на эти вопросы для дальнейшей диагностики:

1. ✅ Какой статус приложения в Setup Node.js App? (Running/Stopped)
2. ✅ Какие переменные окружения установлены?
3. ✅ Есть ли папка `.next/` в File Manager?
4. ✅ Что показывают логи (если доступны)?
5. ✅ Правильный ли Application Root? (`public_html/rokets-classifieds`)













