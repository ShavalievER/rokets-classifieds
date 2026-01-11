# Копирование файлов на Verpex

## Проблема: папка public_html/demo пустая

Файлы не были скопированы из репозитория. Выполните следующие команды в Terminal в cPanel.

## Пошаговая инструкция

### Шаг 1: Откройте Terminal в cPanel

**cPanel → Terminal** (или **SSH Access**)

### Шаг 2: Выполните команды для копирования файлов

```bash
# 1. Создать папку для поддомена (если нет)
mkdir -p ~/public_html/demo

# 2. Перейти в домашнюю директорию
cd ~

# 3. Клонировать репозиторий во временную папку
git clone https://github.com/ShavalievER/rokets-classifieds.git rokets-temp

# 4. Скопировать все файлы из out/ в папку поддомена
cp -r ~/rokets-temp/commerce/out/* ~/public_html/demo/

# 5. Скопировать скрытые файлы (если есть)
cp -r ~/rokets-temp/commerce/out/.* ~/public_html/demo/ 2>/dev/null || true

# 6. Удалить временную папку
rm -rf ~/rokets-temp

# 7. Установить правильные права доступа
chmod -R 755 ~/public_html/demo
find ~/public_html/demo -type f -exec chmod 644 {} \;
```

### Шаг 3: Проверить, что файлы скопированы

```bash
# Проверить наличие файлов
ls -la ~/public_html/demo/ | head -20

# Должны быть:
# - index.html
# - 404.html
# - _next/
# - account/
# - product/
# - search/
# и т.д.

# Проверить количество файлов
find ~/public_html/demo -type f | wc -l
# Должно быть много файлов (сотни или тысячи)
```

### Шаг 4: Проверить размер папки

```bash
du -sh ~/public_html/demo/
# Должно быть несколько мегабайт (зависит от размера билда)
```

### Шаг 5: Открыть сайт

Откройте в браузере: `https://demo.rokets.delivery`

Должна открыться главная страница классифайда!

## Если команда git clone не работает

### Вариант A: Использовать Git Version Control в cPanel

1. **cPanel → Git Version Control**
2. **Create** новый репозиторий:
   - **Repository URL**: `https://github.com/ShavalievER/rokets-classifieds.git`
   - **Repository Path**: `repositories/rokets-static`
   - **Repository Name**: `rokets-static`
3. После клонирования выполните в Terminal:

```bash
# Скопировать файлы из клонированного репозитория
cp -r ~/repositories/rokets-static/commerce/out/* ~/public_html/demo/
cp -r ~/repositories/rokets-static/commerce/out/.* ~/public_html/demo/ 2>/dev/null || true

# Установить права
chmod -R 755 ~/public_html/demo
find ~/public_html/demo -type f -exec chmod 644 {} \;
```

### Вариант B: Загрузить через File Manager (если Git не работает)

1. **Локально** создайте ZIP архив папки `out/`:
   ```powershell
   cd C:\Dev\CursorProjects\Rokets_clsfd\commerce
   Compress-Archive -Path out -DestinationPath out.zip -Force
   ```

2. **В cPanel → File Manager**:
   - Перейдите в `public_html/demo/`
   - Загрузите `out.zip`
   - Распакуйте архив (Extract)
   - **Важно:** После распаковки файлы должны быть напрямую в `demo/`, не в подпапке `out/`
   - Если файлы в `demo/out/`, переместите их:
     ```bash
     mv ~/public_html/demo/out/* ~/public_html/demo/
     rmdir ~/public_html/demo/out
     ```

3. Установите права:
   ```bash
   chmod -R 755 ~/public_html/demo
   find ~/public_html/demo -type f -exec chmod 644 {} \;
   ```

## Проверка после копирования

После выполнения команд проверьте:

```bash
# 1. Файл index.html существует
test -f ~/public_html/demo/index.html && echo "✅ index.html exists" || echo "❌ index.html NOT found"

# 2. Папка _next существует
test -d ~/public_html/demo/_next && echo "✅ _next/ exists" || echo "❌ _next/ NOT found"

# 3. Количество файлов
echo "Files count: $(find ~/public_html/demo -type f | wc -l)"
```

## Если все еще не работает

После копирования файлов, если сайт все еще не работает:

1. Проверьте логи ошибок: `tail -50 ~/logs/error_log`
2. Проверьте настройки поддомена в **cPanel → Subdomains**
3. Проверьте права доступа еще раз
4. Смотрите инструкцию: `DEBUG_VERPEX_STATIC.md`










