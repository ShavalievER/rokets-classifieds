# Исправление: файлы не найдены при копировании

## Проблема: '/home/roketsde/rokets-temp/commerce/out/*': No such file or directory

Это означает, что структура репозитория может отличаться от ожидаемой. Нужно проверить, где именно находятся файлы.

## Шаг 1: Проверить структуру клонированного репозитория

Выполните в Terminal:

```bash
# Проверить, где находится репозиторий
ls -la ~/rokets-temp/

# Проверить структуру
ls -la ~/rokets-temp/commerce/ 2>/dev/null || echo "commerce/ не найдена"

# Проверить, есть ли папка out
find ~/rokets-temp -name "out" -type d
```

## Шаг 2: Найти правильный путь к папке out

```bash
# Найти папку out в репозитории
find ~/rokets-temp -type d -name "out" 2>/dev/null

# Или проверить все возможные пути
ls -la ~/rokets-temp/commerce/out/ 2>/dev/null || \
ls -la ~/rokets-temp/out/ 2>/dev/null || \
echo "Папка out не найдена"
```

## Шаг 3: Скопировать файлы с правильного пути

В зависимости от того, где находится папка `out/`, используйте один из вариантов:

### Вариант A: Если out/ находится в ~/rokets-temp/commerce/out/

```bash
# Проверить существование
test -d ~/rokets-temp/commerce/out && echo "✅ Найдено" || echo "❌ Не найдено"

# Скопировать
cp -r ~/rokets-temp/commerce/out/* ~/public_html/demo/
cp -r ~/rokets-temp/commerce/out/.* ~/public_html/demo/ 2>/dev/null || true
```

### Вариант B: Если out/ находится в ~/rokets-temp/out/

```bash
# Проверить существование
test -d ~/rokets-temp/out && echo "✅ Найдено" || echo "❌ Не найдено"

# Скопировать
cp -r ~/rokets-temp/out/* ~/public_html/demo/
cp -r ~/rokets-temp/out/.* ~/public_html/demo/ 2>/dev/null || true
```

### Вариант C: Если структура другая

```bash
# Найти все HTML файлы в репозитории
find ~/rokets-temp -name "index.html" -type f

# Это покажет, где находится index.html, и вы поймете структуру
```

## Шаг 4: Полная команда с проверкой

Выполните эту последовательность команд:

```bash
# 1. Убедиться, что репозиторий клонирован
cd ~
if [ ! -d "rokets-temp" ]; then
  git clone https://github.com/ShavalievER/rokets-classifieds.git rokets-temp
fi

# 2. Найти папку out
OUT_DIR=$(find ~/rokets-temp -type d -name "out" | head -1)

if [ -z "$OUT_DIR" ]; then
  echo "❌ Папка out не найдена в репозитории"
  echo "Проверяю структуру репозитория:"
  ls -la ~/rokets-temp/
  exit 1
fi

echo "✅ Найдена папка out: $OUT_DIR"

# 3. Скопировать файлы
cp -r "$OUT_DIR"/* ~/public_html/demo/
cp -r "$OUT_DIR"/.* ~/public_html/demo/ 2>/dev/null || true

# 4. Установить права
chmod -R 755 ~/public_html/demo
find ~/public_html/demo -type f -exec chmod 644 {} \;

# 5. Проверить результат
echo "Проверка файлов:"
ls -la ~/public_html/demo/ | head -10
test -f ~/public_html/demo/index.html && echo "✅ index.html скопирован" || echo "❌ index.html не найден"

# 6. Удалить временную папку
rm -rf ~/rokets-temp
```

## Альтернатива: Если репозиторий в другой структуре

Если репозиторий клонировался в другую структуру (например, если это монорепозиторий), проверьте:

```bash
# Проверить корень репозитория
ls -la ~/rokets-temp/

# Если видите папку commerce/ - используйте путь выше
# Если видите сразу out/ - используйте ~/rokets-temp/out/
# Если структура другая - сообщите, что видите
```

## Если ничего не помогает - используйте ZIP

1. **Локально** создайте ZIP:
   ```powershell
   cd C:\Dev\CursorProjects\Rokets_clsfd\commerce
   Compress-Archive -Path out -DestinationPath out.zip -Force
   ```

2. **В cPanel → File Manager**:
   - Загрузите `out.zip` в `public_html/demo/`
   - Распакуйте
   - Если файлы в `demo/out/`, переместите:
     ```bash
     mv ~/public_html/demo/out/* ~/public_html/demo/
     rmdir ~/public_html/demo/out
     ```

3. Установите права:
   ```bash
   chmod -R 755 ~/public_html/demo
   ```

## Что сообщить, если не работает

Выполните и сообщите результат:

```bash
# Проверить структуру репозитория
ls -la ~/rokets-temp/
echo "---"
find ~/rokets-temp -name "out" -type d
echo "---"
find ~/rokets-temp -name "index.html" -type f | head -5
```

Это поможет понять правильную структуру репозитория.










