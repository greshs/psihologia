import React, { useState, useEffect } from 'react';
import './CoverBlock.css';
import { useContent } from '../../context/ContentContext';
import qrCode from '../../assec/qr.jpg';
import image1 from '../../assec/1.png';
import image2 from '../../assec/2.png';
import image3 from '../../assec/3.png';
import image4 from '../../assec/4.png';

const CoverBlock = () => {
  const { content, loading } = useContent();
  const images = [image1, image2, image3, image4];
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Используем данные из WordPress или fallback
  const coverData = content?.cover || {};

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000); // Меняем изображение каждые 4 секунды

    return () => clearInterval(interval);
  }, [images.length]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  // Парсим title с поддержкой переноса строки
  const titleLines = coverData.title?.split('\n') || ["МЕТАФОРИЧЕСКИЕ АССОЦИАТИВНЫЕ КАРТЫ (МАК):", "просто о сложном..."];

  if (loading) {
    return (
      <section className="cover-block">
        <div className="cover-container">
          <div style={{ textAlign: 'center', padding: '50px' }}>Загрузка...</div>
        </div>
      </section>
    );
  }

  return (
    <section className="cover-block">
      <div className="cover-container">
        <div className="cover-content">
          <div className="cover-text-section">
            <p className="cover-subtitle">{coverData.subtitle || "Уникальный инструмент для работы с подсознанием"}</p>
            
            <h1 className="cover-title">
              {titleLines.map((line, index) => (
                <React.Fragment key={index}>
                  {line}
                  {index < titleLines.length - 1 && <br />}
                </React.Fragment>
              ))}
            </h1>

            <div className="cover-info">
              <div className="info-item">
                <span className="info-label">Сроки:</span>
                <span className="info-value">{coverData.dates || "28.01.26 - 04.03.26 (по средам)"}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Время:</span>
                <span className="info-value">{coverData.time || "18:30 - 21:15"}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Формат:</span>
                <span className="info-value">{coverData.format || "Онлайн (Яндекс Телемост)"}</span>
              </div>
              <div className="info-item price-item">
                <span className="info-label">Стоимость:</span>
                <span className="info-value">
                  Весь курс - {coverData.priceFull || "10000 руб."} / Отдельные занятия - {coverData.priceSingle || "2000 руб."}
                </span>
              </div>
            </div>

            <p className="cover-description">
              {coverData.description || "Если хочешь освоить уникальный инструмент работы с глубинными ассоциациями и бессознательными процессами, начни сейчас. Заполни форму и получи доступ к записи курса."}
            </p>

            <div className="cover-cta">
              <a 
                href={coverData.registrationLink || "https://clck.ru/36uhfT"} 
                target="_blank" 
                rel="noopener noreferrer"
                className="register-button"
              >
                <span>{coverData.registerButton || "Записаться на курс"}</span>
              </a>
              <div className="qr-section">
                <img src={qrCode} alt="QR код для записи" className="qr-code" />
              </div>
            </div>
          </div>

          <div className="cover-image-section">
            <div className="carousel-wrapper">
              <div className="carousel-container">
                {images.map((image, index) => (
                  <div
                    key={index}
                    className={`carousel-slide ${index === currentIndex ? 'active' : ''}`}
                    style={{
                      transform: `translateX(${(index - currentIndex) * 100}%)`,
                    }}
                  >
                    <img 
                      src={image} 
                      alt={`МАК карты ${index + 1}`} 
                      className="carousel-image" 
                    />
                  </div>
                ))}
              </div>
              <div className="carousel-dots">
                {images.map((_, index) => (
                  <button
                    key={index}
                    className={`carousel-dot ${index === currentIndex ? 'active' : ''}`}
                    onClick={() => goToSlide(index)}
                    aria-label={`Перейти к слайду ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoverBlock;

