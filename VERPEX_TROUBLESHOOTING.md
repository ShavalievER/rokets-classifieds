# Решение проблем с установкой на Verpex

## Ошибка: "An error occured during installation of modules"

### Причина 1: Verpex использует npm, а проект на pnpm

**Решение:**

1. В cPanel → **Setup Node.js App** → **Edit** вашего приложения
2. Найдите поле **"Install Command"** или **"NPM Install Command"**
3. Измените на:
   ```
   npm install --legacy-peer-deps
   ```
   или просто:
   ```
   npm install
   ```

### Причина 2: Canary версия Next.js может быть нестабильной

Если ошибка сохраняется, попробуйте:

1. **Через SSH** (если есть доступ):
   ```bash
   cd ~/repositories/rokets-classifieds/commerce
   npm install --legacy-peer-deps
   npm run build
   ```

2. **Проверьте логи** в cPanel:
   - В разделе Node.js App должна быть кнопка **"View Logs"** или **"Error Logs"**
   - Посмотрите, какая именно ошибка при установке

### Причина 3: Недостаточно памяти или времени

**Решение:**

1. В настройках Node.js App увеличьте:
   - **Memory Limit** (если есть)
   - **Timeout** (если есть)

2. Или установите через SSH (если доступен):
   ```bash
   cd ~/repositories/rokets-classifieds/commerce
   npm install --legacy-peer-deps --verbose
   ```

### Причина 4: Отсутствуют необходимые файлы

**Проверьте в File Manager:**

1. Откройте `repositories/rokets-classifieds/commerce/`
2. Убедитесь, что есть:
   - ✅ `package.json`
   - ✅ `server.js`
   - ✅ `next.config.ts`
   - ✅ `tsconfig.json`
   - ✅ папка `app/`
   - ✅ папка `components/`
   - ✅ папка `lib/`

### Причина 5: Неправильный Application root

**Проверьте:**

1. В Node.js App → **Edit**
2. **Application root** должен быть: `repositories/rokets-classifieds/commerce`
3. (не просто `repositories/rokets-classifieds`)

### Пошаговое решение

1. **Удалите старое приложение** (если есть ошибки)
2. **Создайте новое** с правильными настройками:
   - Application root: `repositories/rokets-classifieds/commerce`
   - Startup file: `server.js`
   - Install command: `npm install --legacy-peer-deps`
   - Build command: `npm run build`
   - Start command: `npm run serve`
3. **Environment Variables**:
   ```
   NODE_ENV=production
   SITE_NAME=Rokets
   COMPANY_NAME=Rokets
   NEXT_PUBLIC_BASE_PATH=
   ```
4. **Попробуйте установить через SSH** (если доступен):
   ```bash
   cd ~/repositories/rokets-classifieds/commerce
   rm -rf node_modules package-lock.json
   npm install --legacy-peer-deps
   npm run build
   ```
5. Затем в cPanel просто **Restart** приложение

### Если ничего не помогает

**Обратитесь в поддержку Verpex** с информацией:
- Ошибка: "An error occured during installation of modules"
- Application root: `repositories/rokets-classifieds/commerce`
- Node.js version: (укажите, какая версия в настройках)
- Попросите их посмотреть логи установки

