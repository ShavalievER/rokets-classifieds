# Быстрое обновление статичной версии через Git

## 🚀 Быстрый способ

### Создать скрипт обновления (один раз)

```bash
cat > ~/update-demo-static.sh << 'EOF'
#!/bin/bash
cd ~
rm -rf rokets-temp
git clone https://github.com/ShavalievER/rokets-classifieds.git rokets-temp
cp -r ~/rokets-temp/commerce/out/* ~/public_html/demo/
cp -r ~/rokets-temp/commerce/out/.* ~/public_html/demo/ 2>/dev/null || true
rm -rf ~/rokets-temp
chmod -R 755 ~/public_html/demo
find ~/public_html/demo -type f -exec chmod 644 {} \;
echo "✅ Updated!"
EOF

chmod +x ~/update-demo-static.sh
```

### Использование

**Ручное обновление:**
```bash
~/update-demo-static.sh
```

**Автоматическое обновление (Cron):**
- **cPanel → Cron Jobs**
- **Command**: `/home/roketsde/update-demo-static.sh`
- **Schedule**: например, `0 * * * *` (каждый час)

## 📋 Адреса

- **Repository**: `https://github.com/ShavalievER/rokets-classifieds.git`
- **Branch**: `main`
- **Path to files**: `commerce/out/`
- **Target on server**: `~/public_html/demo/`










