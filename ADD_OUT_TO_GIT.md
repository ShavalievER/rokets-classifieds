# Добавление папки out/ в Git для статического деплоя

Эта инструкция поможет добавить папку `out/` в Git репозиторий для развертывания статической версии через Git.

## Шаг 1: Соберите проект (если еще не собрали)

```bash
cd C:\Dev\CursorProjects\Rokets_clsfd\commerce
npm run build
```

После сборки появится папка `out/` со статическими файлами.

## Шаг 2: Временно измените .gitignore

Откройте файл `.gitignore` и закомментируйте или удалите строку:

```
# /out/
```

Или замените на:

```
# /out/  # Временно разрешено для статического деплоя
```

## Шаг 3: Добавьте out/ в Git

```bash
# Добавить папку out/
git add out/

# Проверить, что файлы добавлены
git status

# Закоммитить
git commit -m "Add static export (out/) for Git-based deployment"

# Отправить в репозиторий
git push origin main
```

## Шаг 4: Верните .gitignore (опционально)

Если хотите, чтобы будущие сборки не добавлялись автоматически:

1. Раскомментируйте `/out/` в `.gitignore`
2. Закоммитьте изменение:
   ```bash
   git add .gitignore
   git commit -m "Restore .gitignore - out/ will be managed manually"
   git push origin main
   ```

После этого при обновлении статики нужно будет явно добавлять `out/`:

```bash
npm run build
git add out/
git commit -m "Update static export"
git push origin main
```

## Альтернатива: Отдельная ветка для статики

Если не хотите добавлять `out/` в основную ветку:

```bash
# Создать ветку для статики
git checkout -b static-deploy

# Убрать /out/ из .gitignore в этой ветке
# (отредактировать .gitignore)

# Собрать проект
npm run build

# Добавить out/
git add out/ .gitignore
git commit -m "Add static export for deployment"
git push origin static-deploy
```

На сервере клонируйте эту ветку:

```bash
git clone -b static-deploy https://github.com/YOUR_USERNAME/rokets-classifieds.git
```

## Проверка

После добавления проверьте:

```bash
git ls-files | grep "^out/"
```

Должны быть перечислены файлы из папки `out/`.

## Важно

- Папка `out/` может быть большой (несколько MB)
- После каждого обновления нужно пересобирать и коммитить `out/`
- Рассмотрите использование `.gitattributes` для управления большими файлами











