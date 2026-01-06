# Инструкция по деплою на Verpex через cPanel

## ✅ Build уже включен в Git

Production build (папка `.next/`) уже загружен в GitHub и будет автоматически скачан при `git pull`.

## ⚠️ ВАЖНО: Если нет Terminal в cPanel

Если в cPanel нет Terminal, используйте один из вариантов:

1. **Git Version Control** (если доступен) - но нужно настроить правильный путь
2. **File Manager** - загрузить файлы напрямую через ZIP
3. **SSH доступ** (если есть)

Подробные инструкции для каждого варианта см. в файле `CPANEL_NO_TERMINAL.md`.

## Шаг 1: Обновить код на сервере

### Через Terminal в cPanel (РЕКОМЕНДУЕТСЯ):

```bash
cd ~/public_html/rokets-classifieds

# Откатить локальные изменения (если есть)
git reset --hard origin/main
git clean -fd

# Получить последние изменения (включая .next/)
git pull origin main
```

### Или через Git в cPanel:

1. Откройте **Git Version Control** в cPanel
2. Найдите ваш репозиторий `rokets-classifieds`
3. Нажмите **Pull or Deploy**
4. Выберите ветку `main`
5. Нажмите **Update from Remote**

## Шаг 2: Установить зависимости

### Через Terminal:

```bash
cd ~/public_html/rokets-classifieds

# Установить зависимости
npm install --legacy-peer-deps
```

### Или через cPanel:

1. Откройте **Setup Node.js App**
2. Найдите ваше приложение
3. Нажмите **Run NPM Install**
4. Дождитесь завершения

## Шаг 3: Проверить наличие build

```bash
cd ~/public_html/rokets-classifieds

# Проверить наличие папки .next
ls -la .next

# Проверить структуру
ls -la .next/static
ls -la .next/server
```

Должны быть папки:
- `.next/static/` - статические файлы
- `.next/server/` - серверные файлы
- `.next/BUILD_ID` - ID сборки

## Шаг 4: Настроить Node.js App

1. Откройте **Setup Node.js App** в cPanel
2. Найдите ваше приложение или создайте новое:
   - **Application Root**: `public_html/rokets-classifieds`
   - **Application URL**: `demo.rokets.delivery` (или ваш поддомен)
   - **Application Startup File**: `server.js`
   - **Node.js Version**: `20.x` (или последняя доступная)

3. Нажмите **Create** или **Save**

## Шаг 5: Перезапустить приложение

1. В **Setup Node.js App** найдите ваше приложение
2. Нажмите **Restart**

## Шаг 6: Проверить работу

Откройте в браузере: `https://demo.rokets.delivery`

Должен открыться сайт.

## Если что-то не работает

### Проверка логов

```bash
cd ~/public_html/rokets-classifieds

# Проверить логи приложения
tail -f ~/logs/nodejs/demo.rokets.delivery.log

# Или через cPanel:
# Setup Node.js App → View Logs
```

### Проверка процесса

```bash
# Проверить, запущен ли процесс
ps aux | grep node

# Проверить порт
netstat -tulpn | grep node
```

### Переустановка зависимостей

```bash
cd ~/public_html/rokets-classifieds

# Удалить старые зависимости
rm -rf node_modules package-lock.json

# Установить заново
npm install --legacy-peer-deps
```

### Перезапуск через Terminal

```bash
# Остановить приложение
pkill -f "node.*server.js"

# Запустить вручную для проверки
cd ~/public_html/rokets-classifieds
node server.js
```

Если запускается без ошибок, остановите (Ctrl+C) и перезапустите через cPanel.

## Обновление в будущем

### Когда нужно обновить build:

1. **Локально** соберите новый build:
   ```bash
   cd C:\Dev\CursorProjects\Rokets_clsfd\commerce
   npm run build
   ```

2. **Добавьте .next в git** (временно убрав из .gitignore):
   ```bash
   # Временно раскомментируйте .next в .gitignore
   git add .next
   git commit -m "Update: New production build"
   git push origin main
   ```

3. **На сервере** обновите:
   ```bash
   cd ~/public_html/rokets-classifieds
   git pull origin main
   ```

4. **Перезапустите** приложение в cPanel

### Когда НЕ нужно обновлять build:

- Изменили только данные в `lib/demo/` (если они не используются на этапе сборки)
- Изменили только конфигурацию сервера
- Изменили только переменные окружения

## Структура файлов на сервере

После деплоя структура должна быть:

```
public_html/rokets-classifieds/
├── .next/              ← Production build (из Git)
├── node_modules/       ← Зависимости (устанавливаются на сервере)
├── app/                ← Исходный код
├── components/         ← Компоненты
├── lib/                ← Библиотеки
├── public/             ← Статические файлы
├── server.js           ← Серверный файл
├── package.json        ← Зависимости
└── next.config.ts      ← Конфигурация Next.js
```

## Важные замечания

⚠️ **Не запускайте `npm run build` на сервере!**

Build уже включен в Git и будет скачан при `git pull`. Сборка на сервере требует много памяти и может не работать из-за ограничений LVE.

✅ **Используйте только:**
- `git pull` - для обновления кода и build
- `npm install` - для установки зависимостей
- `Restart` в cPanel - для перезапуска приложения

## Troubleshooting

### Ошибка: "Cannot find module 'next'"

**Решение:**
```bash
npm install --legacy-peer-deps
```

### Ошибка: ".next folder not found"

**Решение:**
```bash
git pull origin main
# Убедитесь, что .next/ есть в репозитории
```

### Ошибка: "Port already in use"

**Решение:**
1. Проверьте, не запущено ли другое приложение на том же порту
2. В cPanel → Setup Node.js App измените порт приложения

### Ошибка: "Application root not found"

**Решение:**
1. Проверьте путь в cPanel → Setup Node.js App
2. Должно быть: `public_html/rokets-classifieds`
3. Убедитесь, что папка существует

## Контакты для поддержки

Если проблемы сохраняются:
1. Проверьте логи в cPanel
2. Обратитесь в поддержку Verpex с описанием проблемы
3. Приложите логи ошибок

