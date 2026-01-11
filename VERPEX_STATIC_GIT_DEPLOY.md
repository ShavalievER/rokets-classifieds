# Развертывание статической версии через Git на Verpex

Эта инструкция описывает, как развернуть статическую версию классифайда на Verpex используя Git, без ZIP архивов.

## Преимущества Git-деплоя

- ✅ Автоматическое обновление через `git pull`
- ✅ Версионирование статических файлов
- ✅ Легкое откатывание изменений
- ✅ Не нужно загружать ZIP архивы

## Шаг 1: Подготовка репозитория

### Вариант A: Добавить папку `out/` в Git (рекомендуется для статики)

1. **Временно измените `.gitignore`**:

```bash
cd C:\Dev\CursorProjects\Rokets_clsfd\commerce
```

Откройте `.gitignore` и закомментируйте или удалите строку:
```
# /out/
```

2. **Соберите проект локально** (если еще не собрали):

```bash
npm run build
```

3. **Добавьте папку `out/` в Git**:

```bash
git add out/
git commit -m "Add static export (out/) for static deployment"
git push origin main
```

4. **Верните `.gitignore`** (опционально, если хотите игнорировать будущие сборки):

```bash
# Раскомментируйте /out/ в .gitignore обратно
git add .gitignore
git commit -m "Restore .gitignore - out/ will be managed separately"
git push origin main
```

**Примечание:** После этого новые сборки не будут автоматически добавляться в Git. Нужно будет явно добавлять `out/` при обновлении.

### Вариант B: Создать отдельную ветку для статики

```bash
# Создать ветку для статики
git checkout -b static-deploy

# Убрать /out/ из .gitignore в этой ветке
# Собрать проект
npm run build

# Добавить out/
git add out/ .gitignore
git commit -m "Add static export for deployment"
git push origin static-deploy
```

## Шаг 2: Настройка на Verpex

### Вариант A: Клонирование в папку поддомена (для demo.rokets.delivery)

1. **Откройте Terminal в cPanel**

2. **Создайте папку для поддомена** (если нет):

```bash
mkdir -p ~/public_html/demo
cd ~/public_html/demo
```

3. **Клонируйте репозиторий**:

```bash
# Если используете Вариант A (out/ в main)
git clone https://github.com/YOUR_USERNAME/rokets-classifieds.git temp

# Если используете Вариант B (отдельная ветка)
git clone -b static-deploy https://github.com/YOUR_USERNAME/rokets-classifieds.git temp
```

4. **Скопируйте содержимое `out/` в корень поддомена**:

```bash
# Перейти в клонированный репозиторий
cd temp/commerce

# Скопировать все файлы из out/ в папку поддомена
cp -r out/* ~/public_html/demo/
cp -r out/.* ~/public_html/demo/ 2>/dev/null || true  # Скрытые файлы (если есть)

# Вернуться и удалить временную папку
cd ~/public_html/demo
rm -rf ~/temp
```

### Вариант B: Использование Git в папке поддомена с post-receive hook

1. **Создайте папку и инициализируйте Git**:

```bash
mkdir -p ~/public_html/demo
cd ~/public_html/demo
git init
git remote add origin https://github.com/YOUR_USERNAME/rokets-classifieds.git
```

2. **Создайте скрипт для автоматического копирования**:

```bash
# Создать скрипт деплоя
cat > ~/deploy-static.sh << 'EOF'
#!/bin/bash
cd ~/public_html/demo
git pull origin main  # или static-deploy для Варианта B
cd commerce
if [ -d "out" ]; then
  cp -r out/* ~/public_html/demo/
  cp -r out/.* ~/public_html/demo/ 2>/dev/null || true
  echo "Static files deployed successfully"
else
  echo "Error: out/ directory not found"
  exit 1
fi
EOF

chmod +x ~/deploy-static.sh
```

3. **Запустите деплой**:

```bash
~/deploy-static.sh
```

### Вариант C: Простое клонирование с символической ссылкой

1. **Клонируйте репозиторий в отдельную папку**:

```bash
cd ~
git clone https://github.com/YOUR_USERNAME/rokets-classifieds.git rokets-repo
cd rokets-repo/commerce
```

2. **Создайте символическую ссылку на out/**:

```bash
# Для поддомена
ln -s ~/rokets-repo/commerce/out ~/public_html/demo

# Или скопируйте файлы
cp -r out/* ~/public_html/demo/
```

## Шаг 3: Настройка поддомена в cPanel

1. **cPanel → Subdomains**
2. Убедитесь, что поддомен `demo` указывает на `public_html/demo`
3. Если поддомена нет - создайте его

## Шаг 4: Автоматическое обновление

### Создайте скрипт для обновления

```bash
cat > ~/update-static.sh << 'EOF'
#!/bin/bash
echo "Updating static site..."

# Обновить репозиторий
cd ~/rokets-repo
git pull origin main  # или static-deploy

# Скопировать новые файлы
cd commerce
if [ -d "out" ]; then
  cp -r out/* ~/public_html/demo/
  cp -r out/.* ~/public_html/demo/ 2>/dev/null || true
  echo "✅ Static site updated successfully"
else
  echo "❌ Error: out/ directory not found"
  exit 1
fi
EOF

chmod +x ~/update-static.sh
```

### Использование скрипта

```bash
~/update-static.sh
```

## Шаг 5: Настройка через cPanel Git Version Control (альтернатива)

Если в cPanel есть **Git Version Control**:

1. **cPanel → Git Version Control**
2. **Create** новый репозиторий:
   - **Repository URL**: `https://github.com/YOUR_USERNAME/rokets-classifieds.git`
   - **Repository Path**: `repositories/rokets-static`
   - **Repository Name**: `rokets-static`
3. После клонирования:
   - Перейдите в `repositories/rokets-static/commerce/out/`
   - Скопируйте все файлы в `public_html/demo/`

## Обновление статической версии

### Локально:

1. **Соберите проект**:
   ```bash
   cd C:\Dev\CursorProjects\Rokets_clsfd\commerce
   npm run build
   ```

2. **Добавьте обновленную папку `out/`**:
   ```bash
   git add out/
   git commit -m "Update static export"
   git push origin main  # или static-deploy
   ```

### На сервере:

```bash
# Вариант 1: Через скрипт
~/update-static.sh

# Вариант 2: Вручную
cd ~/rokets-repo
git pull origin main
cd commerce
cp -r out/* ~/public_html/demo/
```

## Структура на сервере

После настройки структура должна быть:

```
~/public_html/demo/          ← Папка поддомена (файлы здесь)
├── index.html
├── 404.html
├── _next/
├── account/
├── product/
└── ...

~/rokets-repo/               ← Git репозиторий (опционально)
└── commerce/
    └── out/                 ← Исходные файлы из Git
```

## Устранение проблем

### Ошибка: "out/ directory not found"

**Решение:**
1. Проверьте, что папка `out/` добавлена в Git
2. Выполните `git pull` на сервере
3. Проверьте путь: `ls -la ~/rokets-repo/commerce/out/`

### Файлы не обновляются

**Решение:**
1. Убедитесь, что выполнили `git pull` на сервере
2. Проверьте, что скопировали файлы из `out/` в `public_html/demo/`
3. Очистите кеш браузера (Ctrl+F5)

### Права доступа

**Решение:**
```bash
# Установить правильные права
chmod -R 755 ~/public_html/demo
chmod -R 644 ~/public_html/demo/*.html
```

## Рекомендации

1. **Используйте отдельную ветку** для статики (`static-deploy`) - так проще управлять
2. **Создайте скрипт обновления** - упростит деплой
3. **Настройте автоматический деплой** через webhook (если доступен)
4. **Не коммитьте `out/` в основную ветку** - используйте отдельную ветку или `.gitattributes` для управления

## Следующие шаги

После успешного развертывания:
1. Проверьте работу сайта
2. Настройте автоматическое обновление (если нужно)
3. Сохраните нестатическую версию в Git (как планировали)











