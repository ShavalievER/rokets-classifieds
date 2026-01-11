# Решение: "Your local changes would be overwritten by merge"

## Проблема

При выполнении `git pull` на сервере возникает ошибка:

```
error: Your local changes to the following files would be overwritten by merge:
Please commit your changes or stash them before you merge.
```

Это означает, что на сервере есть локальные изменения, которые конфликтуют с кодом из GitHub.

## Решение: Откатить локальные изменения и получить свежий код

### Вариант 1: Откатить все локальные изменения (рекомендуется)

Если на сервере нет важных локальных изменений, которые нужно сохранить:

```bash
cd ~/public_html/rokets-classifieds

# Откатить все локальные изменения
git reset --hard origin/main

# Получить последние изменения
git pull origin main
```

⚠️ **Внимание:** Это удалит все локальные изменения на сервере!

### Вариант 2: Сохранить локальные изменения (если они важны)

Если на сервере есть важные локальные изменения:

```bash
cd ~/public_html/rokets-classifieds

# Сохранить локальные изменения
git stash

# Получить обновления
git pull origin main

# Применить сохранённые изменения (если нужно)
git stash pop
```

Если возникнут конфликты при `git stash pop`, разрешите их вручную.

### Вариант 3: Удалить неотслеживаемые файлы

Для файла `app/api/rockets/track/route.ts`:

```bash
cd ~/public_html/rokets-classifieds

# Удалить неотслеживаемый файл
rm app/api/rockets/track/route.ts

# Откатить изменения в отслеживаемых файлах
git reset --hard origin/main

# Получить обновления
git pull origin main
```

## Полная инструкция для Verpex

### Шаг 1: Подключитесь к серверу

Через Terminal в cPanel или SSH.

### Шаг 2: Перейдите в папку проекта

```bash
cd ~/public_html/rokets-classifieds
```

(Или ваш путь к проекту)

### Шаг 3: Проверьте статус

```bash
git status
```

Вы увидите список изменённых файлов.

### Шаг 4: Откатите изменения и обновите

```bash
# Откатить все локальные изменения
git reset --hard origin/main

# Удалить неотслеживаемые файлы (если нужно)
git clean -fd

# Получить последние изменения из GitHub
git pull origin main
```

### Шаг 5: Установите зависимости (если нужно)

```bash
npm install
```

### Шаг 6: Пересоберите проект

```bash
npm run build:verpex
```

### Шаг 7: Перезапустите приложение

В cPanel → **Setup Node.js App** → **Restart**

## Альтернатива: Полная переустановка

Если проблемы продолжаются, можно полностью переустановить проект:

```bash
# Создать резервную копию (на всякий случай)
cd ~/public_html
cp -r rokets-classifieds rokets-classifieds-backup-$(date +%Y%m%d)

# Удалить старую папку
rm -rf rokets-classifieds

# Клонировать свежий код
git clone https://github.com/ShavalievER/rokets-classifieds.git rokets-classifieds

# Перейти в папку
cd rokets-classifieds

# Установить зависимости
npm install

# Собрать проект
npm run build:verpex
```

Затем в cPanel → **Setup Node.js App**:
- Укажите правильный **Application Root**
- **Startup File**: `server.js`
- Нажмите **Restart**

## Проверка после обновления

```bash
cd ~/public_html/rokets-classifieds

# Проверить последний коммит
git log -1

# Проверить, что build:verpex исправлен
cat package.json | grep "build:verpex"
```

Должно быть:
```json
"build:verpex": "NODE_OPTIONS=--max-old-space-size=2048 next build"
```

## Почему это происходит?

Локальные изменения на сервере могли появиться из-за:
- Ручного редактирования файлов через File Manager
- Предыдущих попыток исправления ошибок
- Автоматических изменений при установке зависимостей

**Решение:** Всегда работайте с кодом локально, коммитьте в GitHub, и обновляйте сервер через `git pull`.

## Рекомендуемый workflow

1. ✅ Разработка локально → коммиты → push в GitHub
2. ✅ На сервере: `git reset --hard origin/main` → `git pull` → `npm run build:verpex`
3. ✅ Никогда не редактируйте код напрямую на сервере!













