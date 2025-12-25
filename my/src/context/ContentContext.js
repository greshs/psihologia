import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchContent } from '../services/contentAPI';

const ContentContext = createContext();

export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useContent должен использоваться внутри ContentProvider');
  }
  return context;
};

export const ContentProvider = ({ children }) => {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadContent = async (showLoading = false) => {
      try {
        if (showLoading) {
          setLoading(true);
        }
        const data = await fetchContent();
        setContent(data);
        setError(null);
      } catch (err) {
        // При автоматическом обновлении не показываем ошибку в UI
        if (showLoading) {
          setError(err.message);
        }
        console.error('Ошибка загрузки контента:', err);
      } finally {
        if (showLoading) {
          setLoading(false);
        }
      }
    };

    // Загружаем данные сразу с индикатором загрузки
    loadContent(true);

    // Обновляем данные каждые 30 секунд в фоне (без индикатора загрузки)
    const interval = setInterval(() => {
      loadContent(false);
    }, 30000); // 30 секунд

    return () => clearInterval(interval);
  }, []);

  const value = {
    content,
    loading,
    error,
    refreshContent: async () => {
      try {
        setLoading(true);
        const data = await fetchContent();
        setContent(data);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <ContentContext.Provider value={value}>
      {children}
    </ContentContext.Provider>
  );
};

