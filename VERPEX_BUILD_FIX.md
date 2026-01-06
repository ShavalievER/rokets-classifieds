# Решение: "cross-env: command not found" при сборке

## Проблема

При выполнении `npm run build:verpex` возникает ошибка:

```
sh: line 1: cross-env: command not found
```

## Причина

`cross-env` не установлен или не найден в PATH. Это может быть потому что:
- `cross-env` находится в `devDependencies`, но на сервере может не устанавливаться
- Или он просто не установился при `npm install`

## Решение 1: Использовать обновленный скрипт (уже исправлено)

Скрипт `build:verpex` уже обновлен и теперь работает без `cross-env`:

```json
"build:verpex": "NODE_OPTIONS=--max-old-space-size=2048 next build"
```

Это работает на Linux (Verpex) без дополнительных зависимостей.

**Просто используйте:**
```bash
npm run build:verpex
```

## Решение 2: Установить cross-env (если нужно)

Если всё равно нужен `cross-env`:

```bash
cd ~/public_html/rokets-classifieds
npm install --save-dev cross-env
```

Затем используйте:
```bash
npm run build:verpex
```

## Решение 3: Использовать Environment Variables (рекомендуется)

Вместо скрипта можно установить переменную окружения в cPanel:

1. В cPanel → **Setup Node.js App** → **Edit**
2. Перейдите в **Environment Variables**
3. Добавьте:
   ```
   NODE_OPTIONS=--max-old-space-size=2048
   ```
4. Сохраните
5. Затем используйте обычный `npm run build`

## Решение 4: Собрать через Terminal напрямую

Если у вас есть SSH доступ:

```bash
cd ~/public_html/rokets-classifieds
NODE_OPTIONS=--max-old-space-size=2048 npm run build
```

## Проверка

После исправления скрипта, проверьте:

1. Откройте `package.json`
2. Убедитесь, что скрипт выглядит так:
   ```json
   "build:verpex": "NODE_OPTIONS=--max-old-space-size=2048 next build"
   ```
3. (БЕЗ `cross-env` в начале)

## Итоговая инструкция для Verpex

### Шаг 1: Установите зависимости
```bash
npm install
```

### Шаг 2: Соберите проект
```bash
npm run build:verpex
```

Или если используете Environment Variables:
```bash
npm run build
```

### Шаг 3: Запустите
```bash
npm run serve
```

## Если проблема сохраняется

1. **Проверьте версию Node.js:**
   ```bash
   node -v  # Должно быть 18+
   ```

2. **Проверьте, что все зависимости установлены:**
   ```bash
   ls node_modules | grep next
   ```

3. **Попробуйте собрать с явным указанием пути:**
   ```bash
   /usr/local/bin/node --max-old-space-size=2048 node_modules/.bin/next build
   ```

4. **Обратитесь в поддержку Verpex**, если проблема не решается

