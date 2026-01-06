# Решение: "next: command not found"

## Проблема

При выполнении `npm run build:verpex` возникает ошибка:

```
sh: line 1: next: command not found
```

## Причина

Команда `next` не найдена, что означает:
- ❌ Зависимости не установлены (`node_modules` отсутствует)
- ❌ Или `node_modules/.bin` не в PATH
- ❌ Или установка прошла с ошибками

## Решение: Установить зависимости

### Шаг 1: Проверьте наличие node_modules

В Terminal cPanel или SSH:

```bash
cd ~/public_html/rokets-classifieds
ls -la | grep node_modules
```

Если папки `node_modules` нет, нужно установить зависимости.

### Шаг 2: Установите зависимости

```bash
cd ~/public_html/rokets-classifieds

# Убедитесь, что вы в правильной папке
pwd
ls package.json  # Должен показать package.json

# Установите зависимости
npm install
```

**Если есть ошибки с peer dependencies:**

```bash
npm install --legacy-peer-deps
```

### Шаг 3: Проверьте установку

```bash
# Проверьте, что next установлен
ls node_modules/.bin/next

# Или проверьте через npm
npm list next
```

Должно показать версию Next.js.

### Шаг 4: Пересоберите проект

После установки зависимостей:

```bash
npm run build:verpex
```

## Альтернатива: Использовать npx

Если `next` всё равно не найден, используйте `npx`:

```bash
NODE_OPTIONS=--max-old-space-size=2048 npx next build
```

Или обновите скрипт в `package.json`:

```json
"build:verpex": "NODE_OPTIONS=--max-old-space-size=2048 npx next build"
```

## Полная последовательность команд

Выполните на сервере:

```bash
# 1. Перейти в папку проекта
cd ~/public_html/rokets-classifieds

# 2. Проверить, что package.json есть
ls package.json

# 3. Удалить старые зависимости (если есть проблемы)
rm -rf node_modules package-lock.json

# 4. Установить зависимости заново
npm install --legacy-peer-deps

# 5. Проверить установку
npm list next

# 6. Собрать проект
npm run build:verpex
```

## Если npm install не работает

### Проверьте версию Node.js

```bash
node -v  # Должно быть 18+
npm -v   # Должно быть 9+
```

### Проверьте путь к npm

```bash
which npm
# Должно показать что-то вроде: /usr/local/bin/npm
```

### Используйте полный путь

```bash
/usr/local/bin/npm install --legacy-peer-deps
```

## Проверка после установки

После `npm install` должна появиться папка `node_modules/`:

```bash
ls -la node_modules | head -20
```

И в ней должна быть папка `.bin/` с командой `next`:

```bash
ls node_modules/.bin/next
```

## Если проблема сохраняется

### Вариант 1: Установить через полный путь

```bash
cd ~/public_html/rokets-classifieds
NODE_OPTIONS=--max-old-space-size=2048 ./node_modules/.bin/next build
```

### Вариант 2: Обновить скрипт в package.json

Измените скрипт на использование полного пути:

```json
"build:verpex": "NODE_OPTIONS=--max-old-space-size=2048 ./node_modules/.bin/next build"
```

Или через npx:

```json
"build:verpex": "NODE_OPTIONS=--max-old-space-size=2048 npx next build"
```

### Вариант 3: Проверить через cPanel

В cPanel → **Setup Node.js App**:

1. Убедитесь, что **Node.js Version** выбрана правильно (20.x)
2. Нажмите **Run NPM Install** (не просто npm install в терминале)
3. Дождитесь завершения
4. Затем попробуйте **Run NPM Script** → `build:verpex`

## Диагностика проблемы

Выполните для диагностики:

```bash
cd ~/public_html/rokets-classifieds

# 1. Проверить наличие package.json
echo "=== package.json ==="
ls -la package.json

# 2. Проверить наличие node_modules
echo "=== node_modules ==="
ls -la node_modules 2>/dev/null || echo "node_modules НЕ НАЙДЕН!"

# 3. Проверить версию Node.js
echo "=== Node.js version ==="
node -v

# 4. Проверить версию npm
echo "=== npm version ==="
npm -v

# 5. Проверить, установлен ли next
echo "=== next installation ==="
npm list next 2>/dev/null || echo "next НЕ УСТАНОВЛЕН!"

# 6. Проверить путь к next
echo "=== next binary ==="
ls node_modules/.bin/next 2>/dev/null || echo "next binary НЕ НАЙДЕН!"
```

## Быстрое решение

Если нужно быстро исправить, выполните:

```bash
cd ~/public_html/rokets-classifieds
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
npm run build:verpex
```

