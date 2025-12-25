const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs-extra');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;
const DATA_FILE = path.join(__dirname, 'data', 'content.json');

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Маршрут для админки (должен быть ДО статических файлов)
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

// Раздача статических файлов из папки public
app.use(express.static(path.join(__dirname, 'public')));

// Создаем папку data если её нет
fs.ensureDirSync(path.dirname(DATA_FILE));

// Инициализируем файл с данными, если его нет
if (!fs.existsSync(DATA_FILE)) {
  const defaultContent = {
    cover: {
      subtitle: "Уникальный инструмент для работы с подсознанием",
      title: "МЕТАФОРИЧЕСКИЕ АССОЦИАТИВНЫЕ КАРТЫ (МАК):\nпросто о сложном...",
      dates: "28.01.26 - 04.03.26 (по средам)",
      time: "18:30 - 21:15",
      format: "Онлайн (Яндекс Телемост)",
      priceFull: "10000 руб.",
      priceSingle: "2000 руб.",
      description: "Если хочешь освоить уникальный инструмент работы с глубинными ассоциациями и бессознательными процессами, начни сейчас. Заполни форму и получи доступ к записи курса.",
      registerButton: "Записаться на курс",
      registrationLink: "https://clck.ru/36uhfT"
    },
    program: {
      title: "ПРОГРАММА КУРСА",
      items: [
        "МАК как психологический инструмент, возможности работы с ним на онлайн платформах",
        "Виды и колоды МАК; этапы, технологии и приемы работы с МАК",
        "Варианты раскладки МАК на примере работы с Я-образом: техники личной эффективности",
        "Техники ресурсирования с использованием МАК",
        "МАК в работе с трудными жизненными ситуациями: техники осознания и поиска выхода из них"
      ]
    },
    results: {
      title: "РЕЗУЛЬТАТ ОБУЧЕНИЯ",
      items: [
        "узнаете, что такое МАК и как они работают;",
        "научитесь применять технологии работы с МАК;",
        "получите клиентский опыт онлайн работы с разными колодами МАК;",
        "освоите приемы ресурсирования себя;",
        "сможете взглянуть на себя и свою эффективность через призму МАК;",
        "узнаете как МАК способствует осознанию и поиску выхода из различных ситуаций;",
        "вдохновитесь легкостью использования МАК с различными запросами"
      ]
    },
    banner: {
      text: "ОТКРОЙ МИР МАК"
    },
    director: {
      label: "Руководитель программы",
      name: "Татьяна Валентиновна Эксакусто",
      credentials: "к.псх.н., доцент, сертифицированный специалист МАК, тренер, коуч ICF",
      link: "https://taplink.cc/etv"
    },
    contact: {
      label: "Если остались вопросы:",
      phone: "Telegram +7(918)5563905",
      registrationLink: "https://clck.ru/36uhfT"
    }
  };
  fs.writeJsonSync(DATA_FILE, defaultContent, { spaces: 2 });
}

// GET - Получить весь контент
app.get('/api/content', async (req, res) => {
  try {
    const content = await fs.readJson(DATA_FILE);
    res.json(content);
  } catch (error) {
    console.error('Ошибка чтения данных:', error);
    res.status(500).json({ error: 'Ошибка чтения данных' });
  }
});

// PUT - Обновить весь контент
app.put('/api/content', async (req, res) => {
  try {
    const newContent = req.body;
    await fs.writeJson(DATA_FILE, newContent, { spaces: 2 });
    res.json({ success: true, message: 'Контент успешно обновлен' });
  } catch (error) {
    console.error('Ошибка записи данных:', error);
    res.status(500).json({ error: 'Ошибка записи данных' });
  }
});

// PATCH - Обновить часть контента
app.patch('/api/content', async (req, res) => {
  try {
    const currentContent = await fs.readJson(DATA_FILE);
    const updatedContent = { ...currentContent, ...req.body };
    await fs.writeJson(DATA_FILE, updatedContent, { spaces: 2 });
    res.json({ success: true, message: 'Контент успешно обновлен' });
  } catch (error) {
    console.error('Ошибка обновления данных:', error);
    res.status(500).json({ error: 'Ошибка обновления данных' });
  }
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
  console.log(`API доступен по адресу: http://localhost:${PORT}/api/content`);
  console.log(`Админка: http://localhost:${PORT}/admin`);
});

