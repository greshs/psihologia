import React from 'react';
import './CoverBlock.css';
import teacherPhoto from '../../assec/Вставленное изображение.png';
import qrCode from '../../assec/qr.jpg';

const CoverBlock = () => {
  return (
    <section className="cover-block">
      <div className="cover-container">
        <div className="cover-content">
          <div className="cover-text-section">
            <p className="cover-subtitle">Уникальный инструмент для работы с подсознанием</p>
            
            <h1 className="cover-title">
              МЕТАФОРИЧЕСКИЕ АССОЦИАТИВНЫЕ КАРТЫ (МАК):<br />
              просто о сложном...
            </h1>

            <div className="cover-info">
              <div className="info-item">
                <span className="info-label">Сроки:</span>
                <span className="info-value">28.01.26 - 04.03.26 (по средам)</span>
              </div>
              <div className="info-item">
                <span className="info-label">Время:</span>
                <span className="info-value">18:30 - 21:15</span>
              </div>
              <div className="info-item">
                <span className="info-label">Формат:</span>
                <span className="info-value">Онлайн (Яндекс Телемост // Teams)</span>
              </div>
              <div className="info-item price-item">
                <span className="info-label">Стоимость:</span>
                <span className="info-value">Весь курс - 10000 руб. / Отдельные занятия - 2000 руб.</span>
              </div>
            </div>

            <p className="cover-description">
              Если хочешь освоить уникальный инструмент работы с глубинными ассоциациями и бессознательными процессами, начни сейчас. Заполни форму и получи доступ к записи курса.
            </p>

            <div className="cover-cta">
              <a 
                href="https://clck.ru/36uhfT" 
                target="_blank" 
                rel="noopener noreferrer"
                className="register-button"
              >
                <span>Записаться на курс</span>
              </a>
              <div className="qr-section">
                <img src={qrCode} alt="QR код для записи" className="qr-code" />
              </div>
            </div>
          </div>

          <div className="cover-image-section">
            <div className="teacher-photo-wrapper">
              <img src={teacherPhoto} alt="Татьяна Валентиновна Эксакусто" className="teacher-photo" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoverBlock;

