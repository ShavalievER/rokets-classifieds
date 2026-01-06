# Инструкция по обновлению проекта через Git на Verpex

## Обновление кода на сервере через Git

Вместо загрузки ZIP-архива через File Manager, можно обновлять проект через Git. Это более удобно и безопасно.

## Предварительные требования

1. ✅ Проект уже загружен на GitHub: `https://github.com/ShavalievER/rokets-classifieds.git`
2. ✅ На сервере Verpex есть SSH доступ (или Terminal в cPanel)
3. ✅ Проект уже был клонирован на сервер ранее

## Шаг 1: Закоммитить и запушить изменения локально

### На вашем компьютере:

```bash
cd C:\Dev\CursorProjects\Rokets_clsfd\commerce

# Проверить статус
git status

# Добавить все изменения
git add .

# Закоммитить
git commit -m "Fix: Remove cross-env from build:verpex script, fix TypeScript errors, add Suspense boundaries"

# Запушить в GitHub
git push origin main
```

## Шаг 2: Обновить код на сервере Verpex

### Вариант A: Через SSH (если есть доступ)

```bash
# Подключитесь к серверу через SSH
ssh ваш_username@rokets.delivery

# Перейдите в папку проекта
cd ~/public_html/rokets-classifieds

# Проверьте текущий статус
git status

# Получите последние изменения
git pull origin main

# Если есть конфликты, разрешите их или сделайте:
git reset --hard origin/main
```

### Вариант B: Через Terminal в cPanel

1. В cPanel найдите **Terminal** (или **SSH Access**)
2. Откройте терминал
3. Выполните команды:

```bash
cd ~/public_html/rokets-classifieds

# Если есть локальные изменения, откатите их
git reset --hard origin/main

# Получите последние изменения
git pull origin main
```

⚠️ **Важно:** `git reset --hard` удалит все локальные изменения на сервере. Это нормально, так как все изменения должны быть в GitHub.

### Вариант C: Если проект ещё не клонирован на сервере

Если проект был загружен через File Manager, а не через Git:

1. **Создайте резервную копию** (на всякий случай):
   ```bash
   cd ~/public_html
   cp -r rokets-classifieds rokets-classifieds-backup
   ```

2. **Удалите старую папку** (или переименуйте):
   ```bash
   mv rokets-classifieds rokets-classifieds-old
   ```

3. **Клонируйте репозиторий**:
   ```bash
   cd ~/public_html
   git clone https://github.com/ShavalievER/rokets-classifieds.git rokets-classifieds
   ```

4. **Скопируйте важные файлы** из старой папки (если нужно):
   ```bash
   # Если были локальные изменения
   cp rokets-classifieds-old/.env rokets-classifieds/.env 2>/dev/null || true
   ```

## Шаг 3: Установить зависимости (если нужно)

После обновления кода:

```bash
cd ~/public_html/rokets-classifieds
npm install
```

## Шаг 4: Пересобрать проект

```bash
npm run build:verpex
```

Или если используете Environment Variables:

```bash
npm run build
```

## Шаг 5: Перезапустить приложение

В cPanel → **Setup Node.js App** → нажмите **Restart**

## Автоматическое обновление через Webhook (опционально)

Можно настроить автоматическое обновление при каждом push в GitHub:

1. Создайте скрипт `webhook.php` в `public_html/`:
   ```php
   <?php
   $repo = '/home/ваш_username/public_html/rokets-classifieds';
   $output = shell_exec("cd $repo && git pull origin main 2>&1");
   echo $output;
   ?>
   ```

2. Настройте GitHub Webhook:
   - В GitHub → Settings → Webhooks → Add webhook
   - Payload URL: `https://rokets.delivery/webhook.php`
   - Content type: `application/json`
   - Events: `Just the push event`

## Быстрая команда для обновления

Создайте скрипт `update.sh` в папке проекта:

```bash
#!/bin/bash
cd ~/public_html/rokets-classifieds
git pull origin main
npm install
npm run build:verpex
echo "Update complete! Restart the app in cPanel."
```

Сделайте его исполняемым:
```bash
chmod +x update.sh
```

Затем просто запускайте:
```bash
./update.sh
```

## Проверка обновления

После обновления проверьте:

1. **Версия кода:**
   ```bash
   cd ~/public_html/rokets-classifieds
   git log -1
   ```

2. **Проверка файлов:**
   ```bash
   cat package.json | grep build:verpex
   ```
   Должно быть: `"build:verpex": "NODE_OPTIONS=--max-old-space-size=2048 next build"`

3. **Работа приложения:**
   - Откройте `https://demo.rokets.delivery`
   - Проверьте, что всё работает

## Если возникли проблемы

### Проблема: "fatal: not a git repository"

**Решение:**
```bash
cd ~/public_html/rokets-classifieds
git init
git remote add origin https://github.com/ShavalievER/rokets-classifieds.git
git fetch
git checkout -b main origin/main
```

### Проблема: Конфликты при pull

**Решение:**
```bash
# Сохранить локальные изменения
git stash

# Получить обновления
git pull origin main

# Применить сохранённые изменения (если нужно)
git stash pop
```

### Проблема: Локальные изменения мешают pull

**Решение:**
```bash
# Отменить все локальные изменения и получить свежий код
git reset --hard origin/main

# Удалить неотслеживаемые файлы (если нужно)
git clean -fd

# Получить обновления
git pull origin main
```

⚠️ **Внимание:** Это удалит все локальные изменения на сервере! Это нормально, так как все изменения должны быть в GitHub.

## Рекомендуемый workflow

1. **Разработка локально** → коммиты и push в GitHub
2. **На сервере:** `git pull` → `npm install` (если нужно) → `npm run build:verpex` → Restart
3. **Проверка** → всё работает ✅

## Преимущества Git подхода

- ✅ Не нужно загружать ZIP каждый раз
- ✅ Видна история изменений
- ✅ Легко откатить изменения
- ✅ Можно работать с ветками
- ✅ Автоматическое обновление через webhooks

