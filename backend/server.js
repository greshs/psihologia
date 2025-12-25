const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const fs = require('fs-extra');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;
const DATA_FILE = path.join(__dirname, 'data', 'content.json');
const UPLOADS_DIR = path.join(__dirname, 'uploads');

// Создаем папку для загрузок, если её нет
fs.ensureDirSync(UPLOADS_DIR);

// Настройка multer для загрузки файлов
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOADS_DIR);
  },
  filename: (req, file, cb) => {
    // Сохраняем с оригинальным именем файла
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    const name = path.basename(file.originalname, ext);
    cb(null, name + '-' + uniqueSuffix + ext);
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB максимум
  fileFilter: (req, file, cb) => {
    // Разрешаем только изображения
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Только изображения разрешены (jpeg, jpg, png, gif, webp)'));
    }
  }
});

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Маршрут для админки (должен быть ДО статических файлов)
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

// Раздача статических файлов из папки public
app.use(express.static(path.join(__dirname, 'public')));

// Раздача загруженных изображений
app.use('/uploads', express.static(UPLOADS_DIR));

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
      registrationLink: "https://clck.ru/36uhfT",
      carouselImages: [
        "/default-images/1.png",
        "/default-images/2.png",
        "/default-images/3.png",
        "/default-images/4.png"
      ]
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

// POST - Загрузка изображения
app.post('/api/upload', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Файл не загружен' });
    }
    
    // Возвращаем URL для доступа к файлу
    const fileUrl = `/uploads/${req.file.filename}`;
    res.json({ 
      success: true, 
      url: fileUrl,
      filename: req.file.filename,
      originalname: req.file.originalname
    });
  } catch (error) {
    console.error('Ошибка загрузки файла:', error);
    res.status(500).json({ error: 'Ошибка загрузки файла: ' + error.message });
  }
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
  console.log(`API доступен по адресу: http://localhost:${PORT}/api/content`);
  console.log(`Админка: http://localhost:${PORT}/admin`);
});

