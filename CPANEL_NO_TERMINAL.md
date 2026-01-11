# Решение: Нет Terminal в cPanel

## Вариант 1: Использовать SSH (если есть доступ)

Если у вас есть SSH доступ к серверу:

```bash
ssh ваш_username@rokets.delivery
cd ~/public_html/rokets-classifieds
git pull origin main
npm install --legacy-peer-deps
```

## Вариант 2: Использовать File Manager + Git через cPanel API

### Шаг 1: Проверить наличие Git Version Control

1. В cPanel найдите **Git Version Control**
2. Если он есть, но показывает ошибку, нужно удалить старый репозиторий и создать новый

### Шаг 2: Удалить старый репозиторий (если есть)

1. В **Git Version Control** найдите репозиторий `rokets-classifieds`
2. Удалите его (если он настроен на неправильный путь)

### Шаг 3: Создать новый репозиторий через File Manager

1. Откройте **File Manager** в cPanel
2. Перейдите в `public_html/`
3. Создайте папку `rokets-classifieds` (если её нет)
4. Войдите в папку `rokets-classifieds`

### Шаг 4: Клонировать репозиторий через Git Version Control

1. В cPanel найдите **Git Version Control**
2. Нажмите **Create**
3. Заполните:
   - **Repository Name**: `rokets-classifieds`
   - **Repository Path**: `public_html/rokets-classifieds` (или полный путь: `/home/roketsde/public_html/rokets-classifieds`)
   - **Repository URL**: `https://github.com/ShavalievER/rokets-classifieds.git`
   - **Branch**: `main`
4. Нажмите **Create**

### Шаг 5: Обновить код

1. В **Git Version Control** найдите `rokets-classifieds`
2. Нажмите **Pull or Deploy**
3. Выберите ветку `main`
4. Нажмите **Update from Remote**

## Вариант 3: Загрузить файлы через File Manager (если Git не работает)

Если Git не работает, можно загрузить файлы напрямую:

### Шаг 1: Скачать репозиторий локально

На вашем компьютере:

```bash
cd C:\Dev\CursorProjects\Rokets_clsfd\commerce
# Убедитесь, что build собран
npm run build
```

### Шаг 2: Создать ZIP архив

1. Выберите все файлы в папке `commerce/` (включая `.next/`)
2. Создайте ZIP архив

### Шаг 3: Загрузить через File Manager

1. Откройте **File Manager** в cPanel
2. Перейдите в `public_html/`
3. Если папка `rokets-classifieds` существует, удалите её или переименуйте в `rokets-classifieds-old`
4. Загрузите ZIP архив
5. Распакуйте архив (Extract)
6. Переименуйте распакованную папку в `rokets-classifieds` (если нужно)

### Шаг 4: Установить зависимости через Setup Node.js App

1. Откройте **Setup Node.js App** в cPanel
2. Найдите ваше приложение или создайте новое:
   - **Application Root**: `public_html/rokets-classifieds`
   - **Application URL**: `demo.rokets.delivery`
   - **Application Startup File**: `server.js`
   - **Node.js Version**: `20.x`
3. Нажмите **Run NPM Install**
4. Дождитесь завершения

### Шаг 5: Перезапустить приложение

В **Setup Node.js App** нажмите **Restart**

## Вариант 4: Использовать cPanel API (для продвинутых)

Если у вас есть доступ к cPanel API, можно использовать скрипт для автоматизации.

## Проверка: Есть ли Terminal под другим названием?

В cPanel Terminal может называться:
- **Terminal**
- **SSH Access**
- **Advanced** → **Terminal**
- **Developer Tools** → **Terminal**

Проверьте все разделы в cPanel.

## Рекомендуемый порядок действий

1. ✅ Попробуйте найти **Terminal** или **SSH Access** в cPanel
2. ✅ Если нет - используйте **Git Version Control** (с правильным путём)
3. ✅ Если Git не работает - используйте **File Manager** для загрузки файлов
4. ✅ Установите зависимости через **Setup Node.js App** → **Run NPM Install**
5. ✅ Перезапустите приложение

## Важно

⚠️ **Если используете File Manager:**
- Убедитесь, что папка `.next/` загружена (она может быть скрыта)
- В File Manager включите показ скрытых файлов (Settings → Show Hidden Files)

⚠️ **Если используете Git Version Control:**
- Убедитесь, что путь правильный: `public_html/rokets-classifieds`
- Не используйте путь `repositories/rokets-classifieds`

## После загрузки файлов

Независимо от способа загрузки, выполните:

1. **Setup Node.js App** → **Run NPM Install**
2. **Setup Node.js App** → **Restart**

## Проверка работы

Откройте в браузере: `https://demo.rokets.delivery`

Должен открыться сайт.













