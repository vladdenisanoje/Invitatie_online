import React from 'react';

export default function InfoPage() {
  const openWhatsApp = (phone, name) => {
    const message = `Bună ${name}! Am o întrebare despre nuntă...`;
    const whatsappUrl = `https://wa.me/${phone.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="page info-page">
      <h2>ℹ️ Detalii Nuntă</h2>
      
      <div className="info-section">
        <h3>💑 Miri</h3>
        <p>Vlad & Denisa</p>
      </div>

      <div className="info-section">
        <h3>📅 Data & Program</h3>
        <p><strong>18 Aprilie 2026</strong></p>
        <ul>
          <li>🏛️ <strong>10:00</strong> - Stare civilă (Primăria din Creaca)</li>
          <li>⛪ <strong>12:00</strong> - Cuvântare (Sala Regatului Moigrad)</li>
          <li>🎉 <strong>14:30</strong> - Petrecere (Elegance Ballroom Zalău)</li>
        </ul>
      </div>

      <div className="info-section">
        <h3>📍 Locații</h3>
        <div className="location-item">
          <p><strong>Primăria din Creaca</strong></p>
          <button 
            className="info-btn"
            onClick={() => window.open('https://maps.app.goo.gl/JNwbg2z7ttYm4GT89', '_blank')}
          >
            📍 Deschide în Maps
          </button>
        </div>
        
        <div className="location-item">
          <p><strong>Sala Regatului Moigrad</strong></p>
          <button 
            className="info-btn"
            onClick={() => window.open('https://maps.app.goo.gl/qnV1v6gKZiM5vwUr7', '_blank')}
          >
            📍 Deschide în Maps
          </button>
        </div>
        
        <div className="location-item">
          <p><strong>Elegance Ballroom Zalău</strong></p>
          <button 
            className="info-btn"
            onClick={() => window.open('https://maps.app.goo.gl/wsAfAJYf1GfEhTYF7', '_blank')}
          >
            📍 Deschide în Maps
          </button>
        </div>

      </div>

      <div className="info-section">
        <h3>👔 Dress Code</h3>
        <p>Elegant</p>
      </div>

      <div className="info-section">
        <h3>📞 Contact Miri</h3>
        <div className="contact-item">
          <p><strong>Vlad</strong></p>
          <button 
            className="contact-btn"
            onClick={() => openWhatsApp('+40763491494', 'Vlad')}
          >
            💬 Trimite mesaj
          </button>
        </div>
        
        <div className="contact-item">
          <p><strong>Denisa</strong></p>
          <button 
            className="contact-btn"
            onClick={() => openWhatsApp('+40769865955', 'Denisa')}
          >
            💬 Trimite mesaj
          </button>
        </div>
      </div>
    </div>
  );
}
