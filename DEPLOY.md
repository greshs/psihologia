# Инструкция по деплою на бесплатный хостинг

## Вариант 1: Render.com (Рекомендуется)

### Шаг 1: Подготовка

1. Убедитесь, что все изменения закоммичены в Git:
   ```bash
   git add .
   git commit -m "Prepare for deployment"
   ```

2. Закоммитьте проект в GitHub (если еще не сделано):
   ```bash
   git remote add origin https://github.com/ваш-юзернейм/psihologia.git
   git push -u origin main
   ```

### Шаг 2: Регистрация на Render

1. Перейдите на https://render.com
2. Нажмите "Get Started for Free"
3. Зарегистрируйтесь через GitHub (проще всего)

### Шаг 3: Создание Web Service

1. В Dashboard нажмите "New +" → "Web Service"
2. Подключите ваш репозиторий GitHub
3. Настройки:
   - **Name**: `mac-course-backend` (или любое другое)
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: `Free`

4. В разделе "Environment Variables" добавьте (если нужно):
   - `NODE_ENV`: `production`
   - `PORT`: Render автоматически устанавливает, но можно оставить пустым

5. Нажмите "Create Web Service"

### Шаг 4: Получение URL

После деплоя Render даст вам URL вида: `https://mac-course-backend.onrender.com`

Сохраните этот URL - он понадобится для React приложения.

### Шаг 5: Обновление React приложения

1. В папке `my` создайте файл `.env.production`:
   ```
   REACT_APP_API_URL=https://ваш-бэкенд.onrender.com/api
   ```

2. Или обновите `.env` файл с URL вашего бэкенда

3. Пересоберите React приложение:
   ```bash
   cd my
   npm run build
   ```

---

## Вариант 2: Railway.app

### Шаг 1: Регистрация

1. Перейдите на https://railway.app
2. Зарегистрируйтесь через GitHub

### Шаг 2: Создание проекта

1. Нажмите "New Project"
2. Выберите "Deploy from GitHub repo"
3. Выберите ваш репозиторий
4. Railway автоматически определит Node.js проект

### Шаг 3: Настройка

1. В настройках проекта выберите папку `backend` как Root Directory
2. Railway автоматически запустит `npm start`

### Шаг 4: Получение URL

Railway автоматически даст вам URL. Вы можете настроить кастомный домен в настройках.

---

## После деплоя

### Проверка работы API

Откройте в браузере:
- API: `https://ваш-бэкенд.onrender.com/api/content`
- Админка: `https://ваш-бэкенд.onrender.com/admin`

### Обновление React приложения

Обновите URL API в React приложении и задеплойте его на GitHub Pages или другой хостинг.

---

## Примечания

- На бесплатных планах сервисы могут "засыпать" после периода неактивности
- Первый запуск может занять до 1-2 минут
- Данные хранятся в файле `data/content.json` на сервере
- Для продакшена рекомендуется использовать базу данных вместо файла

