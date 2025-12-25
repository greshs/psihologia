# Инструкция по деплою фронтенда на Render

## Шаг 1: Создание Static Site на Render

1. Перейдите на https://render.com и войдите в аккаунт
2. В Dashboard нажмите **"New +"** → **"Static Site"**
3. Выберите репозиторий `greshs/psihologia`
4. Настройте параметры:
   - **Name**: `mac-course-frontend` (или любое другое имя)
   - **Branch**: `main`
   - **Root Directory**: `my` ⚠️ ВАЖНО!
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `build`
5. Нажмите **"Create Static Site"**

## Шаг 2: Ожидание деплоя

Render начнет сборку и деплой. Это займет 2-5 минут.

## Шаг 3: Получение URL

После успешного деплоя Render даст вам URL вида:
```
https://mac-course-frontend.onrender.com
```

## Готово! 🎉

Теперь у вас:
- ✅ Бэкенд API: https://mac-course-backend.onrender.com
- ✅ Админка: https://mac-course-backend.onrender.com/admin
- ✅ Фронтенд: https://mac-course-frontend.onrender.com

Фронтенд уже настроен на использование API с Render!

