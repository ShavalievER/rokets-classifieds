# Клонирование репозитория и копирование файлов

## Проблема: репозиторий не клонирован

Нужно сначала клонировать репозиторий, а потом скопировать файлы.

## Полная последовательность команд

Выполните в Terminal в cPanel **по порядку**:

```bash
# 1. Перейти в домашнюю директорию
cd ~

# 2. Клонировать репозиторий
git clone https://github.com/ShavalievER/rokets-classifieds.git rokets-temp

# 3. Дождаться завершения клонирования (может занять минуту)
# Проверить, что клонирование завершено
ls -la ~/rokets-temp/

# 4. Проверить структуру
ls -la ~/rokets-temp/commerce/

# 5. Проверить наличие папки out
ls -la ~/rokets-temp/commerce/out/ | head -10

# 6. Создать папку для поддомена (если нет)
mkdir -p ~/public_html/demo

# 7. Скопировать файлы из out/ в папку поддомена
cp -r ~/rokets-temp/commerce/out/* ~/public_html/demo/

# 8. Скопировать скрытые файлы (если есть)
cp -r ~/rokets-temp/commerce/out/.* ~/public_html/demo/ 2>/dev/null || true

# 9. Установить права доступа
chmod -R 755 ~/public_html/demo
find ~/public_html/demo -type f -exec chmod 644 {} \;

# 10. Проверить результат
echo "Проверка файлов:"
ls -la ~/public_html/demo/ | head -10
test -f ~/public_html/demo/index.html && echo "✅ index.html скопирован" || echo "❌ index.html не найден"
test -d ~/public_html/demo/_next && echo "✅ _next/ скопирован" || echo "❌ _next/ не найден"

# 11. Удалить временную папку
rm -rf ~/rokets-temp

echo "✅ Готово! Проверьте сайт: https://demo.rokets.delivery"
```

## Если git clone не работает

### Вариант A: Проверить доступность Git

```bash
# Проверить, установлен ли Git
which git

# Проверить версию
git --version
```

### Вариант B: Использовать Git Version Control в cPanel

1. **cPanel → Git Version Control**
2. **Create** новый репозиторий:
   - **Repository URL**: `https://github.com/ShavalievER/rokets-classifieds.git`
   - **Repository Path**: `repositories/rokets-static`
   - **Repository Name**: `rokets-static`
3. Нажмите **Create**
4. После клонирования выполните в Terminal:

```bash
# Проверить, что репозиторий клонирован
ls -la ~/repositories/rokets-static/

# Скопировать файлы
mkdir -p ~/public_html/demo
cp -r ~/repositories/rokets-static/commerce/out/* ~/public_html/demo/
cp -r ~/repositories/rokets-static/commerce/out/.* ~/public_html/demo/ 2>/dev/null || true

# Установить права
chmod -R 755 ~/public_html/demo
find ~/public_html/demo -type f -exec chmod 644 {} \;

# Проверить
ls -la ~/public_html/demo/ | head -10
```

### Вариант C: Загрузить через ZIP (самый надежный способ)

1. **Локально** создайте ZIP:
   ```powershell
   cd C:\Dev\CursorProjects\Rokets_clsfd\commerce
   Compress-Archive -Path out -DestinationPath out.zip -Force
   ```

2. **В cPanel → File Manager**:
   - Перейдите в `public_html/demo/`
   - Загрузите `out.zip`
   - Распакуйте архив (Extract)
   - **Важно:** После распаковки файлы должны быть напрямую в `demo/`, не в подпапке `out/`
   
3. **Если файлы в `demo/out/`**, выполните в Terminal:
   ```bash
   mv ~/public_html/demo/out/* ~/public_html/demo/
   rmdir ~/public_html/demo/out
   ```

4. Установите права:
   ```bash
   chmod -R 755 ~/public_html/demo
   find ~/public_html/demo -type f -exec chmod 644 {} \;
   ```

## Проверка после копирования

```bash
# Проверить наличие основных файлов
test -f ~/public_html/demo/index.html && echo "✅ index.html" || echo "❌ index.html"
test -f ~/public_html/demo/404.html && echo "✅ 404.html" || echo "❌ 404.html"
test -d ~/public_html/demo/_next && echo "✅ _next/" || echo "❌ _next/"

# Количество файлов
echo "Всего файлов: $(find ~/public_html/demo -type f | wc -l)"

# Размер папки
du -sh ~/public_html/demo/
```

## Если все еще проблемы

Сообщите результат выполнения:

```bash
# Проверить, что репозиторий клонирован
ls -la ~/rokets-temp/ 2>&1

# Или если использовали Git Version Control
ls -la ~/repositories/rokets-static/ 2>&1
```

Это поможет понять, где именно проблема.










