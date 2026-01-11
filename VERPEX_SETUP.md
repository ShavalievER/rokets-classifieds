# Инструкция по настройке на Verpex

## Проблема: "package.json file is required"

Эта ошибка означает, что Verpex не может найти `package.json` в указанной папке `Application root`.

## Решение

### Шаг 1: Проверьте структуру файлов в File Manager

1. Зайдите в **cPanel → File Manager**
2. Найдите папку, куда вы залили проект
3. Убедитесь, что в этой папке есть файл `package.json`

**Важно:** `package.json` должен быть **на том же уровне**, что и папки `app/`, `components/`, `lib/` и файл `next.config.ts`.

### Шаг 2: Правильно укажите Application root

В cPanel → **Setup Node.js App**:

1. Найдите ваше приложение
2. Нажмите **Edit** (карандаш)
3. В поле **Application root** укажите **относительный путь** от домашней директории:

   **Варианты:**
   - Если вы залили файлы в `public_html/rokets-classifieds/`:
     ```
     public_html/rokets-classifieds
     ```
   
   - Если вы залили файлы в `rokets-classifieds/` (на уровне `public_html`):
     ```
     rokets-classifieds
     ```
   
   - Если вы залили файлы прямо в `public_html/`:
     ```
     public_html
     ```

4. **Важно:** Путь должен указывать на папку, где лежит `package.json`

### Шаг 3: Проверьте путь через SSH (если есть доступ)

Если у вас есть SSH доступ, можете проверить:

```bash
cd ~/public_html/rokets-classifieds  # или ваш путь
ls -la | grep package.json
```

Если файл найден, значит путь правильный.

### Шаг 4: Настройте Startup File

В настройках Node.js App:

- **Application startup file**: `server.js`
- **Application URL**: оставьте как есть (Verpex назначит порт автоматически)

### Шаг 5: Установите зависимости

После того, как `Application root` указан правильно:

1. В разделе Node.js App нажмите **Run npm install**
2. Дождитесь завершения установки
3. Затем нажмите **Run npm run build**
4. После сборки нажмите **Restart** приложения

### Шаг 6: Настройте Environment Variables

В настройках Node.js App → **Environment Variables**:

```
NEXT_PUBLIC_BASE_PATH=/demo
SITE_NAME=Rokets
COMPANY_NAME=Rokets
NODE_ENV=production
```

### Шаг 7: Проверьте структуру файлов

Убедитесь, что в папке `Application root` есть:

```
package.json          ← должен быть здесь!
server.js            ← должен быть здесь!
next.config.ts
app/
components/
lib/
public/
... и другие файлы
```

## Если проблема сохраняется

1. **Удалите Node.js App** в cPanel
2. **Проверьте через File Manager**, что все файлы залиты правильно
3. **Создайте приложение заново** с правильным `Application root`

## Альтернатива: Используйте SSH

Если у вас есть SSH доступ, можете установить зависимости вручную:

```bash
cd ~/public_html/rokets-classifieds  # ваш путь
npm install
npm run build
```

Затем в cPanel просто укажите правильный `Application root` и `Startup file: server.js`.













