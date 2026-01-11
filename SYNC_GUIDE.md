# Простое руководство по синхронизации версий

## 🎯 Цель

Синхронизировать изменения кода (app/, components/, lib/) между статичной (main) и нестатичной (dynamic) версиями.

## 📋 Быстрая инструкция

### Когда вносите изменения в код

**Важно:** Изменения в `app/`, `components/`, `lib/` должны быть в обеих версиях!

### Процесс синхронизации

#### 1. Работаете в main (статичная версия)

```bash
# 1. Внесли изменения, закоммитили
git checkout main
# ... редактируете файлы ...
git add .
git commit -m "Update: ..."
git push origin main

# 2. Синхронизируете в dynamic
git checkout dynamic
git checkout main -- app/ components/ lib/ public/ package.json tsconfig.json
git add .
git commit -m "Sync: Update from main"
git push origin dynamic

# 3. Возвращаетесь в main
git checkout main
```

#### 2. Работаете в dynamic (нестатичная версия)

```bash
# 1. Внесли изменения, закоммитили
git checkout dynamic
# ... редактируете файлы ...
git add .
git commit -m "Update: ..."
git push origin dynamic

# 2. Синхронизируете в main
git checkout main
git checkout dynamic -- app/ components/ lib/ public/ package.json tsconfig.json
git add .
git commit -m "Sync: Update from dynamic"
git push origin main

# 3. Возвращаетесь в dynamic
git checkout dynamic
```

## 🔄 Использование скриптов (упрощенный вариант)

Созданы скрипты для автоматизации:

### sync-to-dynamic.ps1
Синхронизирует изменения из main в dynamic:
```powershell
.\sync-to-dynamic.ps1
```

### sync-to-static.ps1
Синхронизирует изменения из dynamic в main:
```powershell
.\sync-to-static.ps1
```

**Примечание:** Скрипты могут требовать доработки. Пока используйте ручную синхронизацию.

## ✅ Что синхронизировать

### Всегда:
- ✅ `app/` - страницы и API
- ✅ `components/` - компоненты
- ✅ `lib/` - библиотеки
- ✅ `public/` - статические файлы
- ✅ `package.json` - зависимости (проверяйте различия)
- ✅ `tsconfig.json` - настройки TypeScript

### Никогда:
- ❌ `next.config.ts` - разные настройки
- ❌ `server.js` - разные версии
- ❌ `.next/` - результаты сборки
- ❌ `out/` - статический экспорт

## 📝 Примеры

### Пример 1: Добавили новый компонент

```bash
# Работаете в main
git checkout main
# Создали components/new-feature.tsx
git add components/new-feature.tsx
git commit -m "Add new feature component"
git push origin main

# Синхронизируете в dynamic
git checkout dynamic
git checkout main -- components/new-feature.tsx
git add components/new-feature.tsx
git commit -m "Sync: Add new feature component from main"
git push origin dynamic
git checkout main
```

### Пример 2: Изменили страницу

```bash
# Работаете в dynamic
git checkout dynamic
# Отредактировали app/search/page.tsx
git add app/search/page.tsx
git commit -m "Update search page"
git push origin dynamic

# Синхронизируете в main
git checkout main
git checkout dynamic -- app/search/page.tsx
git add app/search/page.tsx
git commit -m "Sync: Update search page from dynamic"
git push origin main
git checkout dynamic
```

## ⚠️ Важно

1. **Всегда коммитьте** перед синхронизацией
2. **Проверяйте конфликты** - если файл изменен в обеих ветках
3. **Тестируйте обе версии** после синхронизации
4. **Не синхронизируйте конфиги** (next.config.ts, server.js)

## 🎯 Рекомендация

**Работайте в одной ветке** (например, main), а синхронизируйте в другую при необходимости. Это проще, чем переключаться между ветками.










