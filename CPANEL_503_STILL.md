# Решение: Ошибка 503 сохраняется, логи не появляются

## Проблема

После всех шагов ошибка 503 сохраняется, и логи не появляются. Это означает, что приложение **не запускается вообще**.

## ✅ Решение: Использовать упрощённый server.js для диагностики

### Шаг 1: Обновить код из Git

1. Откройте **Git Version Control** в cPanel
2. Найдите репозиторий `rokets-classifieds`
3. Нажмите **Pull or Deploy**
4. Выберите ветку `main`
5. Нажмите **Update from Remote**

Это добавит файл `server-simple.js` с улучшенной диагностикой.

### Шаг 2: Временно использовать server-simple.js

1. В **Setup Node.js App** измените **Application Startup File** на `server-simple.js`
2. Нажмите **Save**
3. Нажмите **Stop**
4. Подождите 10 секунд
5. Нажмите **Start**
6. Подождите 15-20 секунд

### Шаг 3: Проверить логи

Теперь логи должны появиться. Проверьте:

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
3. Включите показ скрытых файлов в File Manager

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
- Есть ли папка `.next/`?
- Есть ли папка `node_modules/`?
- Установлены ли зависимости?

### Шаг 4: После диагностики вернуть server.js

1. В **Setup Node.js App** верните **Application Startup File** на `server.js`
2. Нажмите **Save**
3. Нажмите **Restart**

## Альтернатива: Проверить файлы вручную

### Шаг 1: Проверить наличие файлов

В **File Manager** проверьте:

1. `public_html/rokets-classifieds/server.js` ✅
2. `public_html/rokets-classifieds/server-simple.js` ✅ (после обновления)
3. `public_html/rokets-classifieds/package.json` ✅
4. `public_html/rokets-classifieds/.next/` ✅ (скрытая папка)
5. `public_html/rokets-classifieds/node_modules/` ✅

### Шаг 2: Если папки .next нет

1. Обновите репозиторий через **Git Version Control**
2. Убедитесь, что папка `.next/` скачалась
3. Включите показ скрытых файлов

### Шаг 3: Если папки node_modules нет

1. В **Setup Node.js App** нажмите **Run NPM Install**
2. Дождитесь завершения
3. Нажмите **Restart**

## Если логи всё ещё не появляются

### Проверьте статус приложения

1. В **Setup Node.js App** проверьте статус
2. Если **Stopped** - нажмите **Start**
3. Подождите 20 секунд
4. Проверьте статус снова

### Проверьте конфигурацию

В **Setup Node.js App** проверьте:

- **Application Root**: `public_html/rokets-classifieds`
- **Application Startup File**: `server-simple.js` (для диагностики)
- **Node.js Version**: `20.x` (минимум 18+)

## Полная переустановка

Если ничего не помогает:

1. Удалите старое приложение в **Setup Node.js App**
2. Создайте новое с правильными настройками
3. Используйте `server-simple.js` как **Application Startup File**
4. Установите зависимости (**Run NPM Install**)
5. Запустите приложение (**Start**)

## Проверка работы

Откройте в браузере: `https://demo.rokets.delivery`

Должен открыться сайт или появиться логи с диагностикой.













