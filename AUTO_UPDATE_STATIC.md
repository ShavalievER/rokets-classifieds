# Автоматическое обновление статичной версии через Git

## 🎯 Цель

Настроить автоматическое обновление статичной версии на `demo.rokets.delivery` из Git репозитория.

## 📋 Настройка на Verpex

### Шаг 1: Создать скрипт для автоматического обновления

Выполните в Terminal в cPanel:

```bash
# Создать скрипт обновления
cat > ~/update-demo-static.sh << 'EOF'
#!/bin/bash
set -e

echo "=========================================="
echo "Updating static site from Git..."
echo "Date: $(date)"
echo "=========================================="

# Перейти в домашнюю директорию
cd ~

# Удалить старую временную папку (если есть)
rm -rf rokets-temp

# Клонировать репозиторий
echo "Cloning repository..."
git clone https://github.com/ShavalievER/rokets-classifieds.git rokets-temp

# Проверить, что папка out существует
if [ ! -d "rokets-temp/commerce/out" ]; then
    echo "❌ ERROR: out/ directory not found in repository"
    rm -rf rokets-temp
    exit 1
fi

# Создать папку для поддомена (если нет)
mkdir -p ~/public_html/demo

# Скопировать файлы
echo "Copying files..."
cp -r ~/rokets-temp/commerce/out/* ~/public_html/demo/
cp -r ~/rokets-temp/commerce/out/.* ~/public_html/demo/ 2>/dev/null || true

# Установить права доступа
echo "Setting permissions..."
chmod -R 755 ~/public_html/demo
find ~/public_html/demo -type f -exec chmod 644 {} \;

# Удалить временную папку
rm -rf ~/rokets-temp

echo "✅ Update completed successfully!"
echo "=========================================="
EOF

# Сделать скрипт исполняемым
chmod +x ~/update-demo-static.sh

echo "✅ Script created: ~/update-demo-static.sh"
```

### Шаг 2: Протестировать скрипт

```bash
# Запустить скрипт вручную
~/update-demo-static.sh
```

Проверьте, что файлы обновились:
```bash
ls -la ~/public_html/demo/ | head -10
```

### Шаг 3: Настроить автоматическое обновление

#### Вариант A: Через Cron Jobs (рекомендуется)

1. **cPanel → Cron Jobs**
2. **Add New Cron Job:**
   - **Minute**: `0` (или любое время)
   - **Hour**: `*` (каждый час) или конкретное время
   - **Day**: `*` (каждый день)
   - **Month**: `*` (каждый месяц)
   - **Weekday**: `*` (каждый день недели)
   - **Command**: 
     ```bash
     /home/roketsde/update-demo-static.sh >> /home/roketsde/logs/update-demo.log 2>&1
     ```
   - Нажмите **Add New Cron Job**

**Примеры расписания:**
- Каждый час: `0 * * * *`
- Каждый день в 3:00: `0 3 * * *`
- Каждые 6 часов: `0 */6 * * *`

#### Вариант B: Через Git Version Control (если доступен)

1. **cPanel → Git Version Control**
2. **Create** новый репозиторий:
   - **Repository URL**: `https://github.com/ShavalievER/rokets-classifieds.git`
   - **Repository Path**: `repositories/rokets-static`
   - **Repository Name**: `rokets-static`
   - **Branch**: `main`
3. После клонирования создайте скрипт:

```bash
cat > ~/update-from-git-control.sh << 'EOF'
#!/bin/bash
cd ~/repositories/rokets-static
git pull origin main
cp -r commerce/out/* ~/public_html/demo/
cp -r commerce/out/.* ~/public_html/demo/ 2>/dev/null || true
chmod -R 755 ~/public_html/demo
find ~/public_html/demo -type f -exec chmod 644 {} \;
EOF

chmod +x ~/update-from-git-control.sh
```

4. Настройте Cron Job для запуска этого скрипта

## 🔄 Ручное обновление

Если нужно обновить вручную:

```bash
~/update-demo-static.sh
```

Или через одну команду:

```bash
cd ~ && rm -rf rokets-temp && git clone https://github.com/ShavalievER/rokets-classifieds.git rokets-temp && cp -r rokets-temp/commerce/out/* ~/public_html/demo/ && cp -r rokets-temp/commerce/out/.* ~/public_html/demo/ 2>/dev/null || true && rm -rf rokets-temp && chmod -R 755 ~/public_html/demo && find ~/public_html/demo -type f -exec chmod 644 {} \;
```

## 📝 Логи обновлений

Скрипт можно настроить для логирования:

```bash
# Обновить скрипт для логирования
cat >> ~/update-demo-static.sh << 'EOF'

# Логирование
LOG_FILE=~/logs/update-demo-static.log
echo "[$(date)] Update completed" >> $LOG_FILE
EOF
```

Просмотр логов:
```bash
tail -50 ~/logs/update-demo-static.log
```

## 🔍 Проверка обновлений

После обновления проверьте:

```bash
# Проверить дату последнего изменения файлов
ls -lt ~/public_html/demo/index.html

# Проверить количество файлов
find ~/public_html/demo -type f | wc -l

# Проверить размер папки
du -sh ~/public_html/demo/
```

## ⚙️ Настройка через Webhook (продвинутый вариант)

Если хотите обновлять автоматически при каждом push в GitHub:

1. **Создайте PHP скрипт** для обработки webhook:

```bash
cat > ~/public_html/demo-webhook.php << 'EOF'
<?php
// GitHub Webhook для обновления статичного сайта
$secret = 'YOUR_SECRET_KEY'; // Установите секретный ключ
$hookSecret = $_SERVER['HTTP_X_HUB_SIGNATURE_256'] ?? '';

if ($hookSecret) {
    $payload = file_get_contents('php://input');
    $signature = 'sha256=' . hash_hmac('sha256', $payload, $secret);
    
    if (!hash_equals($signature, $hookSecret)) {
        http_response_code(401);
        die('Unauthorized');
    }
}

// Выполнить обновление
exec('/home/roketsde/update-demo-static.sh >> /home/roketsde/logs/webhook.log 2>&1 &');

http_response_code(200);
echo 'OK';
EOF
```

2. **Настройте Webhook в GitHub:**
   - Repository → Settings → Webhooks → Add webhook
   - **Payload URL**: `https://rokets.delivery/demo-webhook.php`
   - **Content type**: `application/json`
   - **Secret**: ваш секретный ключ
   - **Events**: Just the push event

## 📋 Адреса для настройки

**Git репозиторий:**
```
https://github.com/ShavalievER/rokets-classifieds.git
```

**Ветка для статичной версии:**
```
main
```

**Путь к файлам в репозитории:**
```
commerce/out/
```

**Путь на сервере:**
```
~/public_html/demo/
```

## ✅ Проверка работы

1. **Внесите изменения** в репозиторий (main branch)
2. **Подождите** (если настроен cron) или **запустите вручную**:
   ```bash
   ~/update-demo-static.sh
   ```
3. **Проверьте сайт**: `https://demo.rokets.delivery`
4. **Проверьте логи** (если настроены)

## 🛠️ Устранение проблем

### Ошибка: "Permission denied"

```bash
chmod +x ~/update-demo-static.sh
```

### Ошибка: "git: command not found"

Установите Git или используйте Git Version Control в cPanel.

### Файлы не обновляются

Проверьте:
```bash
# Проверить, что скрипт выполняется
bash -x ~/update-demo-static.sh

# Проверить права на папку
ls -la ~/public_html/demo/
```

## 💡 Рекомендации

1. **Настройте cron** на обновление раз в час или раз в день
2. **Проверяйте логи** регулярно
3. **Тестируйте обновления** локально перед push в main
4. **Используйте теги** в Git для версионирования релизов










