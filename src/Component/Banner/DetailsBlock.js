import React from 'react';
import './DetailsBlock.css';
import qrCode from '../../assec/qr.jpg';
import teacherPhoto from '../../assec/Вставленное изображение.png';

const DetailsBlock = () => {
  return (
    <section className="details-block">
      <div className="details-container">
        <div className="details-content">
          <div className="details-grid">
            <div className="program-section">
              <h2 className="section-header">ПРОГРАММА КУРСА</h2>
              <div className="program-items">
                <div className="program-item">
                  МАК как психологический инструмент, возможности работы с ним на онлайн платформах
                </div>
                <div className="program-item">
                  Виды и колоды МАК; этапы, технологии и приемы работы с МАК
                </div>
                <div className="program-item">
                  Варианты раскладки МАК на примере работы с Я-образом: техники личной эффективности
                </div>
                <div className="program-item">
                  Техники ресурсирования с использованием МАК
                </div>
                <div className="program-item">
                  МАК в работе с трудными жизненными ситуациями: техники осознания и поиска выхода из них
                </div>
              </div>
            </div>

            <div className="results-section">
              <h2 className="section-header">РЕЗУЛЬТАТ ОБУЧЕНИЯ</h2>
              <ul className="results-list">
                <li>узнаете, что такое МАК и как они работают;</li>
                <li>научитесь применять технологии работы с МАК;</li>
                <li>получите клиентский опыт онлайн работы с разными колодами МАК;</li>
                <li>освоите приемы ресурсирования себя;</li>
                <li>сможете взглянуть на себя и свою эффективность через призму МАК;</li>
                <li>узнаете как МАК способствует осознанию и поиску выхода из различных ситуаций;</li>
                <li>вдохновитесь легкостью использования МАК с различными запросами</li>
              </ul>
            </div>
          </div>

          <div className="details-banner">
            <h3 className="banner-text">ОТКРОЙ МИР МАК</h3>
          </div>

          <div className="info-sections">
            <div className="director-section">
              <div className="director-photo-wrapper">
                <img src={teacherPhoto} alt="Татьяна Валентиновна Эксакусто" />
              </div>
              <div className="director-info">
                <div className="director-label">Руководитель программы</div>
                <div className="director-name">Татьяна Валентиновна Эксакусто</div>
                <div className="director-credentials">
                  к.псх.н., доцент, сертифицированный специалист МАК, тренер, коуч
                </div>
              </div>
            </div>

            <div className="contact-section">
              <div className="contact-left">
                <div className="contact-info">
                  <div className="contact-label">Если остались вопросы:</div>
                  <div className="contact-phone">Telegram +7(918)5563905</div>
                </div>
                <div className="contact-actions">
                  <a 
                    href="https://clck.ru/36uhfT" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="registration-link"
                  >
                    <span>Записаться по ссылке</span>
                  </a>
                </div>
              </div>
              <div className="contact-qr-wrapper">
                <img src={qrCode} alt="QR код для записи" className="qr-code-large" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DetailsBlock;

