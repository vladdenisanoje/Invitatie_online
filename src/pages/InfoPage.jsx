import React from 'react';

export default function InfoPage() {
  const openWhatsApp = (phone, name) => {
    const message = `Bună ${name}! Am o întrebare despre nuntă...`;
    const whatsappUrl = `https://wa.me/${phone.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="page info-page">
      <h1 className="info-title">💑 Nunta Noastră</h1>
      
      <div className="info-card">
        <h2 className="info-heading">📅 18 Aprilie 2026</h2>
        <p className="info-text">O zi specială pentru noi și pentru voi!</p>
      </div>

      <div className="info-card">
        <h2 className="info-heading">⏰ Program Zi</h2>
        <div className="timeline">
          <div className="timeline-item">
            <span className="time">10:00</span>
            <div className="timeline-content">
              <p className="location">🏛️ Primăria din Creaca</p>
              <p className="description">Stare civilă</p>
            </div>
          </div>
          <div className="timeline-item">
            <span className="time">12:00</span>
            <div className="timeline-content">
              <p className="location">⛪ Sala Regatului Moigrad</p>
              <p className="description">Cuvântare</p>
            </div>
          </div>
          <div className="timeline-item">
            <span className="time">14:30</span>
            <div className="timeline-content">
              <p className="location">🎉 Elegance Ballroom Zalău</p>
              <p className="description">Petrecere</p>
            </div>
          </div>
        </div>
      </div>

      <div className="info-card">
        <h2 className="info-heading">📍 Locații</h2>
        <div className="locations-grid">
          <div className="location-box">
            <h3>🏛️ Primăria din Creaca</h3>
            <button 
              className="info-btn"
              onClick={() => window.open('https://maps.app.goo.gl/JNwbg2z7ttYm4GT89', '_blank')}
            >
              Deschide în Maps
            </button>
          </div>
          
          <div className="location-box">
            <h3>⛪ Sala Regatului Moigrad</h3>
            <button 
              className="info-btn"
              onClick={() => window.open('https://maps.app.goo.gl/qnV1v6gKZiM5vwUr7', '_blank')}
            >
              Deschide în Maps
            </button>
          </div>
          
          <div className="location-box">
            <h3>🎉 Elegance Ballroom Zalău</h3>
            <button 
              className="info-btn"
              onClick={() => window.open('https://maps.app.goo.gl/wsAfAJYf1GfEhTYF7', '_blank')}
            >
              Deschide în Maps
            </button>
          </div>
        </div>
      </div>

      <div className="info-card">
        <h2 className="info-heading">👔 Dress Code</h2>
        <p className="info-text">Elegant</p>
      </div>

      <div className="info-card">
        <h2 className="info-heading">📞 Contact Miri</h2>
        <div className="contacts-grid">
          <div className="contact-box">
            <h3>💙 Vlad</h3>
            <p className="phone">+40 763 491 494</p>
            <button 
              className="contact-btn"
              onClick={() => openWhatsApp('+40763491494', 'Vlad')}
            >
              💬 Trimite mesaj
            </button>
          </div>
          
          <div className="contact-box">
            <h3>💗 Denisa</h3>
            <p className="phone">+40 769 865 955</p>
            <button 
              className="contact-btn"
              onClick={() => openWhatsApp('+40769865955', 'Denisa')}
            >
              💬 Trimite mesaj
            </button>
          </div>
        </div>
      </div>

      <div className="info-card">
        <h2 className="info-heading">💝 Mulțumim!</h2>
        <p className="info-text">Prezenţa voastră este cel mai mare cadou pentru noi!</p>
      </div>
    </div>
  );
}

