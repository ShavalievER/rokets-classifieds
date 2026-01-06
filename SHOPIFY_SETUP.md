# Настройка Shopify (Опционально)

Этот проект может работать с Shopify для получения данных о продуктах, но также поддерживает демо-режим с локальными данными.

## Требования Shopify (только если используете Shopify)

Если вы хотите использовать реальные данные из Shopify, вам необходимо настроить следующие переменные окружения:

### Обязательные переменные

1. **SHOPIFY_STORE_DOMAIN**
   - Домен вашего магазина Shopify
   - Формат: `your-store.myshopify.com` (без `https://`)
   - Пример: `demo-store.myshopify.com`

2. **SHOPIFY_STOREFRONT_ACCESS_TOKEN**
   - Storefront API access token
   - Получить можно в: Shopify Admin → Apps → Develop apps → Storefront API
   - Создайте приложение и скопируйте Storefront API access token

### Опциональные переменные

3. **SITE_NAME**
   - Название сайта для метаданных
   - По умолчанию: `Next.js Commerce`

4. **COMPANY_NAME**
   - Название компании для футера
   - Если не указано, используется `SITE_NAME`

5. **SHOPIFY_REVALIDATION_SECRET**
   - Секретный ключ для webhook'ов ревалидации
   - Используется для автоматического обновления кэша при изменении данных в Shopify

## Как получить Storefront API Access Token

1. Войдите в Shopify Admin
2. Перейдите в **Apps** → **Develop apps**
3. Нажмите **Create an app**
4. Дайте приложению имя (например, "Next.js Commerce")
5. В разделе **Configuration** → **Storefront API**:
   - Включите **Storefront API access**
   - Выберите необходимые scopes (обычно `unauthenticated_read_product_listings`)
   - Сохраните изменения
6. В разделе **API credentials** скопируйте **Storefront API access token**

## Настройка переменных окружения

Создайте файл `.env` в корне проекта `commerce/`:

```env
SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
SHOPIFY_STOREFRONT_ACCESS_TOKEN=your_access_token_here
SITE_NAME=Your Store Name
COMPANY_NAME=Your Company Name
SHOPIFY_REVALIDATION_SECRET=your_secret_here
```

## Демо-режим (без Shopify)

Если вы не хотите использовать Shopify, проект автоматически переключится на демо-режим с локальными данными из `lib/demo/`. В этом случае переменные окружения Shopify не требуются.

## Примечания

- Файл `.env` не должен быть закоммичен в git (уже добавлен в `.gitignore`)
- Для продакшена используйте переменные окружения на платформе развертывания (Vercel, etc.)
- Демо-режим использует данные из `lib/demo/products.ts` и `lib/demo/sellers.ts`
