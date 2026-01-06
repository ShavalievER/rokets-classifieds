# Решение: Папка .next есть, но сайт не работает (503)

## Проблема

- ✅ Приложение в статусе **Running**
- ✅ Папка `.next/` существует и содержит файлы
- ✅ Папка `node_modules/` есть
- ❌ Но сайт показывает 503

Это означает, что Next.js build есть, но **не может обработать запросы**.

## ✅ Решение: Пошаговая диагностика

### Шаг 1: Обновить код из Git

1. Откройте **Git Version Control** в cPanel
2. Найдите репозиторий `rokets-classifieds`
3. Нажмите **Pull or Deploy**
4. Выберите ветку `main`
5. Нажмите **Update from Remote**

Это обновит `server.js` с исправлением для прослушивания на `0.0.0.0`.

### Шаг 2: Проверить переменные окружения

В **Setup Node.js App** проверьте, что установлены:

```
NEXT_PUBLIC_BASE_PATH=
NODE_ENV=production
```

**Важно:** `NEXT_PUBLIC_BASE_PATH` должен быть **пустым** (не `/demo` и не пробел)

### Шаг 3: Полностью перезапустить приложение

1. В **Setup Node.js App** нажмите **Stop**
2. Подождите 10 секунд
3. Нажмите **Start**
4. Подождите 20 секунд
5. Проверьте статус - должно быть **Running**

### Шаг 4: Проверить содержимое папки .next

В **File Manager** проверьте:

1. `.next/server/` - должна содержать файлы:
   - `app/` - папка с серверными файлами приложения
   - `chunks/` - папка с чанками
   - Различные manifest файлы

2. `.next/static/` - должна содержать файлы:
   - `chunks/` - статические чанки
   - Другие статические файлы

3. `.next/BUILD_ID` - должен быть файл с ID сборки

**Если папки пустые или содержат только старые файлы:**
- Обновите репозиторий через Git Version Control

### Шаг 5: Использовать server-simple.js для диагностики

1. В **Setup Node.js App** измените **Application Startup File** на `server-simple.js`
2. Нажмите **Save**
3. Нажмите **Stop**, подождите 10 секунд
4. Нажмите **Start**, подождите 20 секунд
5. Проверьте логи (если появятся)

**server-simple.js** выведет подробную диагностику о том, что именно не работает.

### Шаг 6: Проверить логи (если появятся)

После использования `server-simple.js` логи могут появиться. Проверьте:

1. **File Manager** → `logs/nodejs/demo.rokets.delivery.log`
2. Или **Error Log** в cPanel

**Что искать:**
- `✅ .next folder exists`
- `✅ .next/server folder exists`
- `✅ Next.js app prepared successfully`
- `❌ Failed to prepare Next.js app` - ошибка инициализации

## Альтернатива: Проверить конфигурацию приложения

В **Setup Node.js App** проверьте:

1. **Application Root**: `public_html/rokets-classifieds`
   - ✅ Должен быть правильный путь

2. **Application Startup File**: `server.js` или `server-simple.js`
   - ✅ Должен быть правильный файл

3. **Node.js Version**: `20.x` (минимум 18+)
   - ✅ Должна быть правильная версия

4. **Application URL**: `demo.rokets.delivery`
   - ✅ Должен быть правильный поддомен

## Если ничего не помогает: Полная переустановка

1. Удалите старое приложение в **Setup Node.js App**
2. Создайте новое с правильными настройками
3. Используйте `server-simple.js` как **Application Startup File**
4. Установите зависимости (**Run NPM Install**)
5. Запустите приложение (**Start**)

## Проверка работы

Откройте в браузере: `https://demo.rokets.delivery`

Должен открыться сайт.

