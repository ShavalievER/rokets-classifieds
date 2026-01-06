# Инструкция по загрузке проекта в cPanel

## Шаг 1: Загрузка ZIP-архива

1. Войдите в **cPanel → File Manager**
2. Перейдите в нужную директорию:
   - `public_html/` (если хотите в корне)
   - Или создайте папку `rokets-classifieds` в `public_html/`
3. Нажмите **Upload**
4. Выберите ваш ZIP-файл с проектом
5. Дождитесь завершения загрузки

## Шаг 2: Распаковка архива

1. В File Manager найдите загруженный ZIP-файл
2. Кликните правой кнопкой мыши на ZIP
3. Выберите **Extract** или **Extract Archive**
4. Укажите папку для распаковки (например, `rokets-classifieds`)
5. Нажмите **Extract Files**
6. **Удалите ZIP-файл** после успешной распаковки

## Шаг 3: Проверка структуры файлов

Убедитесь, что в папке проекта есть следующие файлы и папки:

```
rokets-classifieds/  (или ваша папка)
├── package.json      ← ДОЛЖЕН БЫТЬ!
├── server.js         ← ДОЛЖЕН БЫТЬ!
├── next.config.ts
├── app/
├── components/
├── lib/
├── public/
└── ... другие файлы
```

**Важно:** `package.json` и `server.js` должны быть в корне папки проекта!

## Шаг 4: Настройка Node.js App в cPanel

1. В cPanel найдите раздел **Setup Node.js App** (или **Node.js Selector**)
2. Нажмите **Create Application** (или **Edit** если приложение уже создано)
3. Заполните настройки:

   - **Node.js Version**: `20.19.4` (или последняя версия 20.x)
   - **Application Mode**: `Production`
   - **Application Root**: 
     ```
     public_html/rokets-classifieds
     ```
     (или просто `rokets-classifieds` если папка на уровне `public_html`)
   
   - **Application URL**: `demo.rokets.delivery` (ваш поддомен)
   - **Application Startup File**: `server.js`
   - **Application Port**: оставьте автоматический (Verpex назначит)

4. Нажмите **Create** (или **Save**)

## Шаг 5: Установка зависимостей

1. В настройках Node.js App найдите кнопку **Run NPM Install**
2. Нажмите на неё
3. Дождитесь завершения установки (может занять 3-5 минут)
4. Проверьте логи на наличие ошибок

**Если есть ошибки с peer dependencies:**
- В cPanel → Terminal выполните:
  ```bash
  cd ~/public_html/rokets-classifieds
  npm config set legacy-peer-deps true
  npm install
  ```

## Шаг 6: Сборка проекта (ВАЖНО!)

⚠️ **Используйте скрипт `build:verpex` вместо обычного `build`!**

Этот скрипт оптимизирован для shared hosting и предотвращает ошибки памяти.

1. В настройках Node.js App найдите **Run NPM Script**
2. **Выберите или введите скрипт: `build:verpex`** (не просто `build`!)
3. Нажмите **Run**
4. Дождитесь завершения сборки (может занять 5-10 минут)

**Альтернатива через Terminal:**
```bash
cd ~/public_html/rokets-classifieds
npm run build:verpex
```

**Если всё равно падает с ошибкой памяти:**
1. Добавьте в Environment Variables: `NODE_OPTIONS=--max-old-space-size=2048`
2. Затем используйте: `npm run build:verpex`

## Шаг 7: Настройка переменных окружения

В настройках Node.js App → **Environment Variables** добавьте:

```
NEXT_PUBLIC_BASE_PATH=/demo
SITE_NAME=Rokets
COMPANY_NAME=Rokets
NODE_ENV=production
```

Нажмите **Save**.

## Шаг 8: Запуск приложения

1. В настройках Node.js App нажмите **Restart**
2. Дождитесь перезапуска (обычно 10-30 секунд)
3. Проверьте статус приложения (должен быть **Running**)

## Шаг 9: Проверка работы

1. Откройте в браузере: `https://demo.rokets.delivery`
2. Если видите ошибку, проверьте логи в Node.js App → **View Logs**

## Возможные проблемы

### Проблема: "package.json file is required"

**Решение:**
- Проверьте, что `package.json` находится в папке, указанной в **Application Root**
- Убедитесь, что путь указан правильно (без лишних слешей)

### Проблема: "npm: command not found"

**Решение:**
- Убедитесь, что выбрана правильная версия Node.js (20.x)
- В некоторых случаях нужно использовать полный путь: `/usr/local/bin/npm`

### Проблема: Ошибка памяти при сборке

**Решение:**
- Используйте скрипт `build:verpex` из `package.json`
- Или установите переменную: `NODE_OPTIONS=--max-old-space-size=2048`

### Проблема: Приложение не запускается

**Решение:**
- Проверьте логи в Node.js App → **View Logs**
- Убедитесь, что `server.js` существует и находится в корне проекта
- Проверьте, что порт не занят другим приложением

## Структура после загрузки

После успешной загрузки структура должна быть такой:

```
~/public_html/rokets-classifieds/
├── package.json
├── server.js
├── next.config.ts
├── .next/              (создастся после сборки)
├── node_modules/       (создастся после npm install)
├── app/
├── components/
├── lib/
└── public/
```

## Полезные команды через Terminal

Если у вас есть SSH доступ:

```bash
# Перейти в папку проекта
cd ~/public_html/rokets-classifieds

# Проверить версию Node.js
node -v

# Проверить версию npm
npm -v

# Установить зависимости
npm install

# Собрать проект
npm run build

# Запустить вручную (для теста)
npm start
```

## Следующие шаги

После успешной загрузки и запуска:

1. Настройте домен/поддомен в cPanel → **Subdomains**
2. Настройте SSL сертификат в cPanel → **SSL/TLS**
3. Проверьте работу сайта: `https://demo.rokets.delivery`

