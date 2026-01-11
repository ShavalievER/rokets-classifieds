# Решение проблемы: "virus found" при загрузке .next.zip

## Проблема

Антивирус cPanel определил папку `.next` как потенциально опасную. Это **ложное срабатывание** (false positive), но папку `.next` всё равно **не нужно загружать** на сервер.

## Решение: Создайте ZIP БЕЗ папки .next

Папка `.next` содержит скомпилированные файлы Next.js, которые:
- ✅ Создаются автоматически при сборке на сервере
- ❌ Не должны быть в архиве для загрузки
- ❌ Могут вызвать проблемы совместимости

## Правильная структура ZIP-архива

### ✅ ВКЛЮЧИТЬ в ZIP:
- `package.json`
- `server.js`
- `next.config.ts`
- `tsconfig.json`
- `postcss.config.mjs`
- Папка `app/`
- Папка `components/`
- Папка `lib/`
- Папка `public/`
- Папка `scripts/`
- Все `.md` файлы (опционально)

### ❌ НЕ ВКЛЮЧАТЬ в ZIP:
- Папка `.next/` ← НЕ НУЖНА!
- Папка `node_modules/` ← НЕ НУЖНА!
- Файл `.env` или `.env.local` ← НЕ НУЖЕН!
- Файл `pnpm-lock.yaml` ← опционально
- Папка `.git/` ← опционально

## Как создать правильный ZIP

### Вариант 1: Вручную (Windows)

1. Откройте папку `commerce` в проводнике
2. Выделите все файлы и папки
3. **Исключите** папки:
   - `.next`
   - `node_modules`
4. Правой кнопкой → **Отправить → Сжатая ZIP-папка**

### Вариант 2: Через PowerShell (Windows)

```powershell
# Перейдите в папку проекта
cd C:\Dev\CursorProjects\Rokets_clsfd\commerce

# Создайте ZIP без .next и node_modules
Compress-Archive -Path app,components,lib,public,scripts,*.json,*.ts,*.mjs,*.md,server.js -DestinationPath ../rokets-classifieds.zip -Force
```

### Вариант 3: Через Git (если есть .gitignore)

Если у вас настроен `.gitignore`, можно использовать Git:

```bash
# Создать архив только из файлов, отслеживаемых Git
git archive -o ../rokets-classifieds.zip HEAD
```

## Пошаговая инструкция создания ZIP

### Шаг 1: Откройте папку проекта

```
C:\Dev\CursorProjects\Rokets_clsfd\commerce
```

### Шаг 2: Выделите нужные файлы

**Выделите:**
- ✅ `package.json`
- ✅ `server.js`
- ✅ `next.config.ts`
- ✅ `tsconfig.json`
- ✅ `postcss.config.mjs`
- ✅ Папку `app`
- ✅ Папку `components`
- ✅ Папку `lib`
- ✅ Папку `public`
- ✅ Папку `scripts`

**НЕ выделяйте:**
- ❌ Папку `.next`
- ❌ Папку `node_modules`

### Шаг 3: Создайте ZIP

1. Правой кнопкой на выделенных файлах
2. **Отправить → Сжатая ZIP-папка**
3. Назовите файл: `rokets-classifieds.zip`

### Шаг 4: Проверьте размер

Правильный ZIP должен быть примерно **2-5 MB** (без `node_modules` и `.next`).

Если размер больше 50 MB, значит вы включили `node_modules` — это неправильно!

## Альтернатива: Используйте .gitignore

Если у вас есть `.gitignore`, создайте архив через Git:

```bash
cd C:\Dev\CursorProjects\Rokets_clsfd\commerce
git archive -o ../rokets-classifieds.zip HEAD
```

Это автоматически исключит все файлы из `.gitignore`.

## Что делать после загрузки

1. **Загрузите** правильный ZIP в cPanel
2. **Распакуйте** архив
3. **Установите зависимости**: `npm install`
4. **Соберите проект**: `npm run build` (это создаст папку `.next` на сервере)
5. **Запустите**: приложение будет работать

## Почему .next не нужна?

- Папка `.next` содержит скомпилированные файлы
- Она создаётся при выполнении `npm run build`
- Размер может быть большим (50-200 MB)
- Может содержать пути, специфичные для вашей машины
- Антивирусы могут её блокировать

**Вывод:** Всегда собирайте проект на сервере, а не загружайте `.next`!

## Проверка перед загрузкой

Перед загрузкой ZIP проверьте:

1. ✅ Размер ZIP: 2-5 MB (не больше!)
2. ✅ В ZIP есть `package.json`
3. ✅ В ZIP есть `server.js`
4. ✅ В ZIP НЕТ папки `.next`
5. ✅ В ZIP НЕТ папки `node_modules`

## Если антивирус всё равно блокирует

Если даже без `.next` антивирус блокирует:

1. **Используйте Git** для создания архива
2. Или **загрузите через SSH** (если есть доступ):
   ```bash
   # На сервере
   git clone <ваш-репозиторий>
   cd rokets-classifieds
   npm install
   npm run build
   ```

## Итоговая структура ZIP

```
rokets-classifieds.zip
├── package.json
├── server.js
├── next.config.ts
├── tsconfig.json
├── postcss.config.mjs
├── app/
├── components/
├── lib/
├── public/
└── scripts/
```

**БЕЗ:**
- `.next/`
- `node_modules/`
- `.env*`













