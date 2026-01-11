# Решение: Ошибка "No such file or directory" в cPanel Git

## Проблема

cPanel пытается найти репозиторий в `/home/roketsde/repositories/rokets-classifieds`, но этой папки не существует.

## ✅ Решение: Использовать Terminal напрямую

Не используйте Git Version Control в cPanel. Вместо этого используйте Terminal для работы с Git напрямую.

## Шаг 1: Открыть Terminal в cPanel

1. В cPanel найдите **Terminal** (или **SSH Access**)
2. Откройте терминал

## Шаг 2: Перейти в правильную папку

```bash
cd ~/public_html/rokets-classifieds
```

Если папки нет, создайте её:

```bash
mkdir -p ~/public_html/rokets-classifieds
cd ~/public_html/rokets-classifieds
```

## Шаг 3: Проверить, есть ли уже Git репозиторий

```bash
ls -la
```

Если видите папку `.git`, значит репозиторий уже инициализирован.

## Вариант A: Если репозиторий уже существует

```bash
cd ~/public_html/rokets-classifieds

# Откатить все локальные изменения
git reset --hard origin/main
git clean -fd

# Получить последние изменения из GitHub
git pull origin main
```

## Вариант B: Если репозитория нет (первая настройка)

```bash
cd ~/public_html/rokets-classifieds

# Клонировать репозиторий из GitHub
git clone https://github.com/ShavalievER/rokets-classifieds.git .

# Или если папка не пустая, клонировать в подпапку и переместить файлы
# git clone https://github.com/ShavalievER/rokets-classifieds.git temp
# mv temp/* .
# mv temp/.git .
# rmdir temp
```

## Шаг 4: Установить зависимости

```bash
cd ~/public_html/rokets-classifieds

# Установить зависимости
npm install --legacy-peer-deps
```

## Шаг 5: Проверить наличие build

```bash
# Проверить наличие папки .next
ls -la .next

# Проверить структуру
ls -la .next/static
ls -la .next/server
```

Должны быть папки с файлами.

## Шаг 6: Настроить Node.js App в cPanel

1. Откройте **Setup Node.js App** в cPanel
2. Найдите ваше приложение или создайте новое:
   - **Application Root**: `public_html/rokets-classifieds`
   - **Application URL**: `demo.rokets.delivery` (или ваш поддомен)
   - **Application Startup File**: `server.js`
   - **Node.js Version**: `20.x` (или последняя доступная)
3. Нажмите **Create** или **Save**

## Шаг 7: Перезапустить приложение

1. В **Setup Node.js App** найдите ваше приложение
2. Нажмите **Restart**

## Шаг 8: Проверить работу

Откройте в браузере: `https://demo.rokets.delivery`

## Обновление в будущем

Для обновления кода используйте Terminal:

```bash
cd ~/public_html/rokets-classifieds

# Откатить локальные изменения
git reset --hard origin/main
git clean -fd

# Получить обновления
git pull origin main

# Установить зависимости (если нужно)
npm install --legacy-peer-deps
```

Затем перезапустите приложение в cPanel → **Setup Node.js App** → **Restart**

## Если Terminal не работает

Если Terminal недоступен, используйте SSH:

```bash
ssh ваш_username@rokets.delivery
cd ~/public_html/rokets-classifieds
git pull origin main
```

## Важно

⚠️ **Не используйте Git Version Control в cPanel** - он настроен на неправильный путь.

✅ **Используйте Terminal** для работы с Git напрямую.

## Проверка пути

Убедитесь, что вы в правильной папке:

```bash
pwd
# Должно показать: /home/roketsde/public_html/rokets-classifieds

ls package.json
# Должен показать package.json
```

## Если папка не существует

Если папка `public_html/rokets-classifieds` не существует:

```bash
# Создать папку
mkdir -p ~/public_html/rokets-classifieds
cd ~/public_html/rokets-classifieds

# Клонировать репозиторий
git clone https://github.com/ShavalievER/rokets-classifieds.git .

# Установить зависимости
npm install --legacy-peer-deps
```

Затем настройте Node.js App в cPanel (Шаг 6).













