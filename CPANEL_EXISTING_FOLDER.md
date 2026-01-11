# Решение: Папка уже содержит файлы

## Проблема

При попытке создать Git репозиторий в cPanel появляется ошибка:
```
You cannot use the "/home/roketsde/public_html/rokets-classifieds" directory because it already contains files.
```

## ✅ Решение: Инициализировать Git в существующей папке

### Вариант 1: Через Git Version Control (если доступен)

1. Откройте **Git Version Control** в cPanel
2. Найдите репозиторий `rokets-classifieds` (если он уже создан)
3. Если репозитория нет, создайте его в **другой папке** (например, `public_html/rokets-classifieds-temp`)
4. Затем вручную переместите файлы

### Вариант 2: Использовать File Manager для инициализации Git

#### Шаг 1: Создать файл `.git/config` через File Manager

1. Откройте **File Manager** в cPanel
2. Перейдите в `public_html/rokets-classifieds`
3. Включите показ скрытых файлов (Settings → Show Hidden Files)
4. Если папки `.git` нет, создайте её:
   - Создайте папку `.git`
   - Внутри создайте файл `config`

#### Шаг 2: Заполнить `.git/config`

Содержимое файла `.git/config`:

```ini
[core]
	repositoryformatversion = 0
	filemode = true
	bare = false
	logallrefupdates = true
[remote "origin"]
	url = https://github.com/ShavalievER/rokets-classifieds.git
	fetch = +refs/heads/*:refs/remotes/origin/*
[branch "main"]
	remote = origin
	merge = refs/heads/main
```

#### Шаг 3: Создать файл `.git/HEAD`

Содержимое: `ref: refs/heads/main`

#### Шаг 4: Создать папку `.git/refs/heads/`

Создайте файл `.git/refs/heads/main` с хешем последнего коммита (можно оставить пустым или взять из GitHub)

### Вариант 3: Заменить содержимое папки (РЕКОМЕНДУЕТСЯ)

#### Шаг 1: Создать резервную копию

1. Откройте **File Manager** в cPanel
2. Перейдите в `public_html/`
3. Переименуйте папку `rokets-classifieds` в `rokets-classifieds-backup`

#### Шаг 2: Создать новую папку

1. Создайте новую папку `rokets-classifieds`
2. Войдите в неё

#### Шаг 3: Клонировать репозиторий через Git Version Control

1. В **Git Version Control** создайте новый репозиторий:
   - **Repository Name**: `rokets-classifieds`
   - **Repository Path**: `public_html/rokets-classifieds`
   - **Repository URL**: `https://github.com/ShavalievER/rokets-classifieds.git`
   - **Branch**: `main`
2. Нажмите **Create**

#### Шаг 4: Проверить файлы

1. В **File Manager** проверьте, что файлы загружены
2. Убедитесь, что есть папка `.next/`

#### Шаг 5: Удалить резервную копию (если всё работает)

После проверки можно удалить `rokets-classifieds-backup`

### Вариант 4: Использовать SSH (если есть доступ)

Если у вас есть SSH доступ:

```bash
ssh ваш_username@rokets.delivery
cd ~/public_html/rokets-classifieds

# Инициализировать Git (если ещё не инициализирован)
git init

# Добавить remote
git remote add origin https://github.com/ShavalievER/rokets-classifieds.git

# Получить код
git fetch origin
git checkout -b main origin/main
```

## Рекомендуемый порядок действий

1. ✅ **Вариант 3** (заменить содержимое) - самый простой и надёжный
2. ✅ Если не работает - попробуйте **Вариант 4** (SSH)
3. ✅ Если нет SSH - используйте **Вариант 2** (File Manager)

## После успешной настройки Git

### Установить зависимости

1. Откройте **Setup Node.js App** в cPanel
2. Найдите ваше приложение
3. Нажмите **Run NPM Install**

### Перезапустить приложение

В **Setup Node.js App** нажмите **Restart**

## Обновление в будущем

После настройки Git, для обновления:

1. В **Git Version Control** найдите `rokets-classifieds`
2. Нажмите **Pull or Deploy**
3. Выберите ветку `main`
4. Нажмите **Update from Remote**

Или через SSH:

```bash
cd ~/public_html/rokets-classifieds
git pull origin main
```

## Проверка работы

Откройте в браузере: `https://demo.rokets.delivery`

Должен открыться сайт.













