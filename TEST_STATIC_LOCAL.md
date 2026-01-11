# Тестирование статического билда локально

Эта инструкция поможет проверить, что статический билд работает правильно перед развертыванием на Verpex.

## Быстрый способ

### Вариант 1: Использовать скрипт из package.json

```bash
cd C:\Dev\CursorProjects\Rokets_clsfd\commerce
npm run test:static
```

Или:

```bash
npm run serve:static
```

Сервер запустится на `http://localhost:3000`

### Вариант 2: Запустить напрямую

```bash
cd C:\Dev\CursorProjects\Rokets_clsfd\commerce
node test-static-local.js
```

### Вариант 3: Использовать npx serve (если установлен)

```bash
cd C:\Dev\CursorProjects\Rokets_clsfd\commerce
npx serve out
```

## Что проверить

1. **Главная страница**: Откройте `http://localhost:3000`
   - Должна открыться главная страница классифайда
   - Проверьте, что стили загружаются (страница не должна быть белой)

2. **Навигация**: Попробуйте перейти по ссылкам:
   - Категории (например, `/search/electronics`)
   - Товары (например, `/product/electronics-mobile-phones-1`)
   - Аккаунт (`/account`)
   - Заказы (`/orders`)

3. **Консоль браузера** (F12):
   - Откройте вкладку **Console**
   - Не должно быть ошибок загрузки ресурсов
   - Проверьте вкладку **Network** - все файлы должны загружаться с кодом 200

4. **Проверка путей**:
   - Если видите ошибки типа `/_next/static/...` - проблема с путями
   - Проверьте, какой `NEXT_PUBLIC_BASE_PATH` использовался при сборке

## Возможные проблемы

### Ошибка: "out/ directory not found"

**Решение:**
```bash
npm run build
```

### Страница белая (без стилей)

**Проблема:** Скорее всего проблема с `NEXT_PUBLIC_BASE_PATH`

**Проверка:**
1. Откройте консоль браузера (F12)
2. Посмотрите ошибки загрузки ресурсов
3. Если видите ошибки типа `/_next/static/...` - пути не совпадают

**Решение:**
- Проверьте, какой `NEXT_PUBLIC_BASE_PATH` использовался при сборке
- Если собирали с `NEXT_PUBLIC_BASE_PATH=/demo`, то локально нужно запускать с тем же путем
- Или пересоберите без `NEXT_PUBLIC_BASE_PATH` для локального тестирования

### Порт 3000 занят

**Решение:**
Измените порт в `test-static-local.js`:
```javascript
const port = 3001; // или другой свободный порт
```

### Файлы не найдены (404)

**Проверка:**
1. Убедитесь, что папка `out/` существует
2. Проверьте структуру: `ls out/` (Linux/Mac) или `dir out` (Windows)
3. Должны быть файлы: `index.html`, `404.html`, `_next/`, и т.д.

## После успешного тестирования

Если все работает локально, но на Verpex Internal Server Error:

1. **Проверьте права доступа на Verpex:**
   ```bash
   chmod -R 755 ~/public_html/demo
   chmod -R 644 ~/public_html/demo/*.html
   ```

2. **Проверьте структуру файлов на Verpex:**
   ```bash
   ls -la ~/public_html/demo/
   ```

3. **Проверьте логи ошибок в cPanel:**
   - cPanel → **Error Log** или **Metrics → Errors**

4. **Проверьте, что файлы действительно скопированы:**
   ```bash
   ls -la ~/public_html/demo/index.html
   ls -la ~/public_html/demo/_next/
   ```

## Альтернативный способ тестирования

Можно также использовать встроенный сервер Python (если установлен):

```bash
cd C:\Dev\CursorProjects\Rokets_clsfd\commerce\out
python -m http.server 3000
```

Или через PHP (если установлен):

```bash
cd C:\Dev\CursorProjects\Rokets_clsfd\commerce\out
php -S localhost:3000
```










