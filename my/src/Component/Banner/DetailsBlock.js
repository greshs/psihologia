import React from 'react';
import './DetailsBlock.css';
import { useContent } from '../../context/ContentContext';
import qrCode from '../../assec/qr.jpg';
import teacherPhoto from '../../assec/Вставленное изображение.png';

const DetailsBlock = () => {
  const { content, loading } = useContent();
  
  // Используем данные из WordPress или fallback
  const programData = content?.program || {};
  const resultsData = content?.results || {};
  const bannerData = content?.banner || {};
  const directorData = content?.director || {};
  const contactData = content?.contact || {};

  if (loading) {
    return (
      <section className="details-block">
        <div className="details-container">
          <div style={{ textAlign: 'center', padding: '50px' }}>Загрузка...</div>
        </div>
      </section>
    );
  }

  return (
    <section className="details-block">
      <div className="details-container">
        <div className="details-content">
          <div className="details-grid">
            <div className="program-section">
              <h2 className="section-header">{programData.title || "ПРОГРАММА КУРСА"}</h2>
              <div className="program-items">
                {(programData.items || []).map((item, index) => (
                  <div key={index} className="program-item">
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="results-section">
              <h2 className="section-header">{resultsData.title || "РЕЗУЛЬТАТ ОБУЧЕНИЯ"}</h2>
              <ul className="results-list">
                {(resultsData.items || []).map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="details-banner">
            <h3 className="banner-text">{bannerData.text || "ОТКРОЙ МИР МАК"}</h3>
          </div>

          <div className="info-sections">
            <div className="director-section">
              <div className="director-photo-wrapper">
                <img src={teacherPhoto} alt={directorData.name || "Татьяна Валентиновна Эксакусто"} />
              </div>
              <div className="director-info">
                <div className="director-label">{directorData.label || "Руководитель программы"}</div>
                <div className="director-name">{directorData.name || "Татьяна Валентиновна Эксакусто"}</div>
                <div className="director-credentials">
                  {directorData.credentials || "к.псх.н., доцент, сертифицированный специалист МАК, тренер, коуч ICF"}
                </div>
                {directorData.link && (
                  <div className="director-link">
                    <a 
                      href={directorData.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="director-link-url"
                    >
                      {directorData.link}
                    </a>
                  </div>
                )}
              </div>
            </div>

            <div className="contact-section">
              <div className="contact-left">
                <div className="contact-info">
                  <div className="contact-label">{contactData.label || "Если остались вопросы:"}</div>
                  <div className="contact-phone">{contactData.phone || "Telegram +7(918)5563905"}</div>
                </div>
                <div className="contact-actions">
                  <a 
                    href={contactData.registrationLink || "https://clck.ru/36uhfT"} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="registration-link"
                  >
                    <span>Записаться по ссылке</span>
                  </a>
                  <a 
                    href={contactData.registrationLink || "https://clck.ru/36uhfT"} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="registration-link-url"
                  >
                    {contactData.registrationLink || "https://clck.ru/36uhfT"}
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

