# Решение: Ошибка 404 на demo.rokets.delivery

## Проблема

При открытии `https://demo.rokets.delivery` возвращается ошибка **404 Not Found**.

## Причина

Приложение настроено на использование `basePath`, но для поддомена `demo.rokets.delivery` `basePath` должен быть **пустым** (не `/demo`).

## ✅ Решение: Настроить переменные окружения

### Шаг 1: Открыть настройки приложения

1. Откройте **Setup Node.js App** в cPanel
2. Найдите ваше приложение `demo.rokets.delivery`
3. Нажмите на приложение, чтобы открыть настройки

### Шаг 2: Добавить переменные окружения

В настройках приложения найдите раздел **Environment Variables** или **App Settings** и добавьте:

**Вариант A: Если приложение на поддомене (demo.rokets.delivery)**

```
NEXT_PUBLIC_BASE_PATH=
NODE_ENV=production
```

**Вариант B: Если приложение на пути (rokets.delivery/demo)**

```
NEXT_PUBLIC_BASE_PATH=/demo
NODE_ENV=production
```

### Шаг 3: Сохранить и перезапустить

1. Нажмите **Save** или **Update**
2. Нажмите **Restart**
3. Подождите 10-15 секунд

## Альтернатива: Если нет раздела Environment Variables

### Способ 1: Создать файл .env

1. Откройте **File Manager** в cPanel
2. Перейдите в `public_html/rokets-classifieds`
3. Создайте файл `.env` (или `.env.production`)
4. Добавьте содержимое:

**Для поддомена (demo.rokets.delivery):**
```
NEXT_PUBLIC_BASE_PATH=
NODE_ENV=production
```

**Для пути (rokets.delivery/demo):**
```
NEXT_PUBLIC_BASE_PATH=/demo
NODE_ENV=production
```

5. Сохраните файл
6. В **Setup Node.js App** нажмите **Restart**

### Способ 2: Изменить server.js

Если переменные окружения не работают, можно временно изменить `server.js`:

1. Откройте **File Manager**
2. Перейдите в `public_html/rokets-classifieds`
3. Откройте файл `server.js`
4. Найдите строку:
   ```javascript
   const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
   ```
5. Замените на:
   ```javascript
   const basePath = ''; // Для поддомена demo.rokets.delivery
   // или
   const basePath = '/demo'; // Для пути rokets.delivery/demo
   ```
6. Сохраните файл
7. В **Setup Node.js App** нажмите **Restart**

## Проверка

Откройте в браузере: `https://demo.rokets.delivery`

Должен открыться сайт.

## Диагностика

### Проверить, какой URL используется

- **Поддомен**: `https://demo.rokets.delivery` → `basePath` должен быть **пустым** (`''`)
- **Путь**: `https://rokets.delivery/demo` → `basePath` должен быть **`/demo`**

### Проверить логи (если доступны)

В логах ищите строку:
```
Base path: (none)
```
или
```
Base path: /demo
```

Это покажет, какой basePath используется.

## Если ошибка сохраняется

### Проверьте конфигурацию приложения

1. **Application Root**: `public_html/rokets-classifieds`
2. **Application Startup File**: `server.js`
3. **Node.js Version**: `20.x` (минимум 18+)

### Перезапустите приложение

1. Нажмите **Stop**
2. Подождите 5 секунд
3. Нажмите **Start**
4. Подождите 10-15 секунд

### Проверьте файлы

В **File Manager** убедитесь, что есть:
- `server.js`
- `package.json`
- `.next/` (скрытая папка)
- `.env` (если создали)

