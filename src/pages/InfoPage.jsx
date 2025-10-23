import React from 'react';

export default function InfoPage() {
  return (
    <div className="page info-page">
      <h2>ℹ️ Detalii Nuntă</h2>
      
      <div className="info-section">
        <h3>📅 Data & Ora</h3>
        <p>18 Aprilie 2026, ora 14:00</p>
      </div>

      <div className="info-section">
        <h3>📍 Locații</h3>
        <ul>
          <li>🏛️ Biserică - 14:00</li>
          <li>🍽️ Restaurant - 17:00</li>
          <li>🎉 Petrecere - 20:00</li>
        </ul>
      </div>

      <div className="info-section">
        <h3>👔 Dress Code</h3>
        <p>Elegant</p>
      </div>

      <div className="info-section">
        <h3>📞 Contact</h3>
        <p>Nume Nași</p>
        <p>Telefon: +40754241346</p>
      </div>
    </div>
  );
}
