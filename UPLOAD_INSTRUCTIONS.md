# Инструкция по загрузке на GitHub

## Что загрузить

Откройте https://github.com/greshs/psihologia и нажмите "uploading an existing file"

Загрузите следующие папки и файлы:

### Папки:
- ✅ `backend/` - весь бэкенд (Node.js API + админка)
- ✅ `my/` - React приложение (фронтенд)

### Файлы из корня:
- ✅ `.gitignore`
- ✅ `DEPLOY.md`
- ✅ `DEPLOY_STEPS.md`

### НЕ загружайте:
- ❌ `node_modules/` (будут созданы автоматически)
- ❌ `backend/data/` (создастся при первом запуске)
- ❌ `my/build/` (будет создан при сборке)
- ❌ `wordpress-plugin/` (можно оставить, но не обязательно)

---

## После загрузки

1. Перейдите на https://render.com
2. Создайте Web Service
3. Подключите репозиторий `greshs/psihologia`
4. Укажите Root Directory: `backend`
5. Build Command: `npm install`
6. Start Command: `npm start`

