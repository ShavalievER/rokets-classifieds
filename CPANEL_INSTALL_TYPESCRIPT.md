# Решение: Cannot find module 'typescript'

## Проблема

Next.js не может найти модуль `typescript`, который нужен для чтения `next.config.ts` даже в production режиме.

## ✅ Решение

### Шаг 1: Обновить код из Git

1. Откройте **Git Version Control** в cPanel
2. Найдите репозиторий `rokets-classifieds`
3. Нажмите **Pull or Deploy**
4. Выберите ветку `main`
5. Нажмите **Update from Remote**

Это обновит `package.json`, где `typescript` теперь в `dependencies`.

### Шаг 2: Установить зависимости

1. В **Setup Node.js App** нажмите **Run NPM Install**
2. Дождитесь завершения установки (может занять несколько минут)
3. Проверьте, что установка прошла успешно

### Шаг 3: Перезапустить приложение

1. В **Setup Node.js App** нажмите **Stop**
2. Подождите 10 секунд
3. Нажмите **Start**
4. Подождите 30 секунд
5. Откройте `https://demo.rokets.delivery` в браузере

### Шаг 4: Проверить результат

Если всё правильно:
- ✅ `typescript` будет установлен
- ✅ Next.js сможет прочитать `next.config.ts`
- ✅ `prepare()` завершится успешно
- ✅ Сайт откроется

### Если всё ещё ошибка

Если после установки всё ещё ошибка "Cannot find module 'typescript'":

1. Проверьте, что `typescript` установлен:
   - Откройте **File Manager**
   - Перейдите в `public_html/rokets-classifieds/node_modules/`
   - Проверьте, есть ли папка `typescript`

2. Если папки нет:
   - Запустите **Run NPM Install** ещё раз
   - Убедитесь, что установка завершилась без ошибок

3. Если папка есть, но ошибка остаётся:
   - Проверьте диагностику в `server-simple-diagnostic.js`
   - Скопируйте полную ошибку и отправьте













