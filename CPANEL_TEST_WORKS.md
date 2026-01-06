# Решение: Тестовый сервер работает!

## ✅ Хорошая новость

Тестовый сервер работает! Это означает:
- ✅ Node.js работает правильно
- ✅ Конфигурация cPanel правильная
- ✅ Reverse proxy работает
- ✅ Порт и URL настроены правильно

## ❌ Проблема

Проблема в **Next.js** или в `server.js`. Нужно проверить Next.js.

## ✅ Решение: Диагностика Next.js

### Шаг 1: Переключиться на server-simple.js

1. В **Setup Node.js App** измените **Application Startup File** на `server-simple.js`
2. Нажмите **Save**
3. Нажмите **Stop**
4. Подождите 10 секунд
5. Нажмите **Start**
6. Подождите 20 секунд
7. Откройте `https://demo.rokets.delivery`

### Шаг 2: Проверить логи

После использования `server-simple.js` логи должны появиться. Проверьте:

1. **File Manager** → `logs/nodejs/demo.rokets.delivery.log`
2. Или **Error Log** в cPanel

**Что искать в логах:**

#### ✅ Если видите:
```
✅ .next folder exists
✅ .next/server folder exists
✅ node_modules folder exists
✅ next module found
✅ Next.js app prepared successfully
✅ Rokets classifieds ready!
```

**Значит всё в порядке!** Верните **Application Startup File** на `server.js`.

#### ❌ Если видите:
```
❌ .next folder NOT found
```

**Решение:**
1. Обновите репозиторий через Git Version Control
2. Убедитесь, что папка `.next/` скачалась

#### ❌ Если видите:
```
❌ node_modules folder NOT found
❌ next module NOT found
```

**Решение:**
1. В **Setup Node.js App** нажмите **Run NPM Install**
2. Дождитесь завершения
3. Нажмите **Restart**

#### ❌ Если видите:
```
❌ Failed to prepare Next.js app
```

**Проверьте:**
- Есть ли папка `.next/server/`?
- Есть ли папка `node_modules/next/`?
- Установлены ли зависимости?

### Шаг 3: Если server-simple.js работает

Если `server-simple.js` показывает сайт или логи показывают успешную инициализацию:

1. В **Setup Node.js App** измените **Application Startup File** на `server.js`
2. Нажмите **Save** и **Restart**
3. Проверьте работу сайта

### Шаг 4: Если server-simple.js НЕ работает

Если `server-simple.js` показывает ошибку или не работает:

1. Проверьте логи (должны появиться)
2. Найдите ошибку в логах
3. Исправьте проблему согласно ошибке

## Проверка работы

Откройте в браузере: `https://demo.rokets.delivery`

Должен открыться сайт.

