# Решение проблемы "Out of memory" при сборке на Verpex

## Проблема

При выполнении `npm run build` на Verpex возникает ошибка:

```
unhandledRejection [RangeError: WebAssembly.instantiate(): Out of memory: wasm memory]
Out of memory error may be caused by hitting LVE limits
```

Это происходит из-за ограничений памяти на shared hosting (CloudLinux LVE limits).

## Решение: Использовать скрипт build:verpex

В проекте уже есть специальный скрипт для сборки на Verpex с ограничением памяти.

### Вариант 1: Через cPanel Node.js App (рекомендуется)

1. В cPanel → **Setup Node.js App** → найдите ваше приложение
2. Нажмите **Edit** (карандаш)
3. Найдите поле **"Run NPM Script"** или **"Build Command"**
4. Вместо `build` выберите или введите: **`build:verpex`**
5. Нажмите **Run** или **Save**

### Вариант 2: Через Terminal (SSH)

Если у вас есть SSH доступ:

```bash
cd ~/public_html/rokets-classifieds  # ваш путь
npm run build:verpex
```

### Вариант 3: Установить переменную окружения

В cPanel → **Setup Node.js App** → **Environment Variables** добавьте:

```
NODE_OPTIONS=--max-old-space-size=2048
```

Затем используйте обычный `npm run build`.

## Что делает build:verpex?

Скрипт `build:verpex` в `package.json`:

```json
"build:verpex": "NODE_OPTIONS=--max-old-space-size=2048 next build"
```

Он устанавливает лимит памяти Node.js в 2GB (2048 MB), что обычно достаточно для сборки Next.js на shared hosting.

**Примечание:** Скрипт использует прямой синтаксис `NODE_OPTIONS=...` вместо `cross-env`, так как на Linux (Verpex) это работает без дополнительных зависимостей.

## Дополнительные оптимизации

### 1. Проверьте настройки next.config.ts

В `next.config.ts` уже отключены функции, потребляющие много памяти:

```typescript
experimental: {
  // ppr: true,  // Отключено для экономии памяти
  inlineCss: true,
  // useCache: true,  // Отключено
  cacheComponents: true,
}
```

### 2. Убедитесь, что cross-env установлен

Проверьте, что `cross-env` есть в `devDependencies`:

```json
"devDependencies": {
  "cross-env": "^7.0.3",
  ...
}
```

Если его нет, установите:
```bash
npm install --save-dev cross-env
```

## Пошаговая инструкция для Verpex

### Шаг 1: Загрузите проект (без .next)

Используйте архив, созданный скриптом `create-upload-zip.ps1` (без папки `.next`).

### Шаг 2: Распакуйте в правильную папку

```
public_html/rokets-classifieds/
```

### Шаг 3: Настройте Node.js App

- **Application Root**: `public_html/rokets-classifieds`
- **Startup File**: `server.js`
- **Node.js Version**: `20.19.4` (или 20.x)

### Шаг 4: Установите зависимости

1. Нажмите **Run NPM Install**
2. Дождитесь завершения

### Шаг 5: Соберите проект (ВАЖНО!)

**Используйте скрипт `build:verpex`:**

1. В Node.js App найдите **Run NPM Script**
2. Выберите или введите: **`build:verpex`**
3. Нажмите **Run**
4. Дождитесь завершения (может занять 5-10 минут)

**НЕ используйте обычный `build` - он может упасть с ошибкой памяти!**

### Шаг 6: Настройте Environment Variables

```
NODE_OPTIONS=--max-old-space-size=2048
NEXT_PUBLIC_BASE_PATH=/demo
SITE_NAME=Rokets
COMPANY_NAME=Rokets
NODE_ENV=production
```

### Шаг 7: Запустите приложение

1. Нажмите **Restart**
2. Проверьте логи на наличие ошибок

## Альтернативное решение: Сборка локально

Если сборка на сервере всё равно не работает, можно собрать локально и загрузить `.next`:

### ⚠️ ВНИМАНИЕ: Не рекомендуется!

1. Соберите локально:
   ```bash
   npm run build
   ```

2. Создайте ZIP с папкой `.next`:
   ```powershell
   # В PowerShell
   Compress-Archive -Path .next -DestinationPath .next.zip
   ```

3. Загрузите `.next.zip` в cPanel
4. Распакуйте в папку проекта

**Проблемы этого подхода:**
- ❌ Антивирус может заблокировать `.next`
- ❌ Могут быть проблемы совместимости
- ❌ Размер архива будет большим (50-200 MB)

**Лучше использовать `build:verpex` на сервере!**

## Если проблема сохраняется

### 1. Обратитесь в поддержку Verpex

Попросите увеличить LVE limits для вашего аккаунта:
- **Max resident set**: минимум 4GB
- **Max address space**: минимум 4GB

### 2. Попробуйте собрать по частям

Если сборка падает на конкретной странице, можно временно исключить её из сборки.

### 3. Используйте более легкую конфигурацию

Временно отключите некоторые функции в `next.config.ts`:

```typescript
experimental: {
  inlineCss: false,  // Отключить для экономии памяти
  cacheComponents: false,  // Отключить если не критично
}
```

## Проверка успешной сборки

После успешной сборки должна появиться папка `.next/`:

```
public_html/rokets-classifieds/
├── .next/              ← Должна появиться после сборки
├── node_modules/
├── package.json
├── server.js
└── ...
```

Размер папки `.next/` обычно 50-150 MB.

## Итоговая команда для сборки

**В cPanel Node.js App используйте:**

```
npm run build:verpex
```

**Или через Terminal:**

```bash
cd ~/public_html/rokets-classifieds
NODE_OPTIONS=--max-old-space-size=2048 npm run build
```

