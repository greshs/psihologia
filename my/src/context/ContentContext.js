import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchContent } from '../services/wordpressAPI';

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
    const loadContent = async () => {
      try {
        setLoading(true);
        const data = await fetchContent();
        setContent(data);
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error('Ошибка загрузки контента:', err);
      } finally {
        setLoading(false);
      }
    };

    loadContent();
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

