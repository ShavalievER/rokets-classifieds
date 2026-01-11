# Быстрое решение Internal Server Error на demo.rokets.delivery

## 🚀 Быстрый фикс (попробуйте сначала)

### 1. Переустановить права доступа

```bash
chmod -R 755 ~/public_html/demo
find ~/public_html/demo -type f -exec chmod 644 {} \;
```

### 2. Перекопировать файлы заново

```bash
# Удалить старые файлы
rm -rf ~/public_html/demo/*

# Клонировать и скопировать заново
cd ~
rm -rf rokets-temp
git clone https://github.com/ShavalievER/rokets-classifieds.git rokets-temp
cp -r ~/rokets-temp/commerce/out/* ~/public_html/demo/
cp -r ~/rokets-temp/commerce/out/.* ~/public_html/demo/ 2>/dev/null || true
rm -rf ~/rokets-temp

# Установить права
chmod -R 755 ~/public_html/demo
find ~/public_html/demo -type f -exec chmod 644 {} \;
```

### 3. Проверить настройки поддомена

**cPanel → Subdomains:**
- Document Root должен быть: `public_html/demo`

### 4. Проверить логи

```bash
tail -50 ~/logs/error_log
```

## 🔍 Если не помогло - смотрите DEBUG_VERPEX_STATIC.md










