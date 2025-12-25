// Конфигурация API бэкенда
export const API_CONFIG = {
  // URL нашего бэкенда API (задеплоен на Render)
  API_URL: process.env.REACT_APP_API_URL || 'https://mac-course-backend.onrender.com/api',
  
  // Включить fallback на локальные данные, если API недоступен
  USE_FALLBACK: process.env.REACT_APP_USE_FALLBACK !== 'false',
};

// Получить базовый URL бэкенда (без /api)
export const getBaseUrl = () => {
  const apiUrl = API_CONFIG.API_URL;
  return apiUrl.replace('/api', '');
};

// Построить полный URL для изображения
export const getImageUrl = (imagePath) => {
  if (!imagePath) return null;
  // Если уже полный URL, возвращаем как есть
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  // Иначе добавляем базовый URL бэкенда
  return getBaseUrl() + imagePath;
};

