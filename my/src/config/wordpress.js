// Конфигурация API
export const WORDPRESS_CONFIG = {
  // URL нашего бэкенда API (задеплоен на Render)
  API_URL: process.env.REACT_APP_API_URL || 'https://mac-course-backend.onrender.com/api',
  
  // Включить fallback на локальные данные, если API недоступен
  USE_FALLBACK: process.env.REACT_APP_USE_FALLBACK !== 'false',
};

