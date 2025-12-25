import { WORDPRESS_CONFIG } from '../config/wordpress';

// Локальные данные по умолчанию (fallback)
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

/**
 * Получает контент из нашего бэкенда API
 */
export const fetchContent = async () => {
  try {
    // URL бэкенда (можно задать через переменную окружения)
    const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';
    
    const response = await fetch(`${API_URL}/content`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error('API недоступен');
    }
  } catch (error) {
    console.warn('Ошибка загрузки из API, используем локальные данные:', error);
    
    if (WORDPRESS_CONFIG.USE_FALLBACK) {
      return defaultContent;
    }
    throw error;
  }
};

/**
 * Альтернативный метод: получение через ACF (Advanced Custom Fields)
 */
export const fetchContentACF = async () => {
  try {
    const response = await fetch(
      `${WORDPRESS_CONFIG.API_URL}/pages/${WORDPRESS_CONFIG.PAGE_ID}?_embed`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.ok) {
      const page = await response.json();
      // ACF поля обычно доступны через acf объект
      return page.acf || defaultContent;
    } else {
      throw new Error('WordPress API недоступен');
    }
  } catch (error) {
    console.warn('Ошибка загрузки из WordPress, используем локальные данные:', error);
    
    if (WORDPRESS_CONFIG.USE_FALLBACK) {
      return defaultContent;
    }
    throw error;
  }
};

