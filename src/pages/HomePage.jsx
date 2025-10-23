import React from 'react';
import Countdown from '../components/Countdown';

export default function HomePage() {
  return (
    <div className="page">
      {/* Stories placeholder - vom adăuga mai târziu */}
      <div className="stories-container">
        <div className="story-bubble">📍 Biserică</div>
        <div className="story-bubble">🍽️ Restaurant</div>
        <div className="story-bubble">🎉 Petrecere</div>
      </div>

      {/* Countdown */}
      <Countdown targetDate="2026-04-18T00:00:00" />

      {/* Postare principală (invitația) */}
      <div className="post-card">
        <div className="post-image-placeholder">
          <h2>Invitația Nunții</h2>
          <p>Nume & Nume</p>
          <p>18 Aprilie 2026</p>
          
          {/* Butoane locații */}
          <div className="location-buttons">
            <button className="location-btn">📍 Locația 1</button>
            <button className="location-btn">📍 Locația 2</button>
            <button className="location-btn">📍 Locația 3</button>
          </div>
        </div>

        {/* Butoane participare */}
        <div className="participation-buttons">
          <button className="participate-btn yes">✅ Vin!</button>
          <button className="participate-btn no">❌ Nu pot</button>
        </div>

        {/* Interacțiuni */}
        <div className="post-interactions">
          <button className="interaction-btn">❤️ 156</button>
          <button className="interaction-btn">💬 Comentarii</button>
          <button className="interaction-btn">📤 Share</button>
        </div>
      </div>

      {/* Feed poze invitați - placeholder */}
      <div className="feed-section">
        <p className="feed-placeholder">Pozele invitaților vor apărea aici...</p>
      </div>
    </div>
  );
}
