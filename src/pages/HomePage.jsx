import React from 'react';
import Countdown from '../components/Countdown';

export default function HomePage() {
  // Funcții pentru butoane
  const handleLocation = (locationName, mapsUrl) => {
    window.open(mapsUrl, '_blank');
  };

  const handleParticipation = (isAttending) => {
    const vladPhone = '+40763491494';
    const denisaPhone = '+40769865955';
    
    let message;
    if (isAttending) {
      message = 'Bună! Ne-ar face multă plăcere să vă fim alături. Confirmăm participarea pentru __ persoane.';
    } else {
      message = 'Mulțumim mult pentru invitație, dar din păcate nu vom reuși să participăm!';
    }
    
    // Deschide WhatsApp cu Vlad (sau poți face să aleagă)
    const whatsappUrl = `https://wa.me/${vladPhone.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleComment = () => {
    alert('Funcția de comentarii va fi adăugată în următorul pas!');
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Invitație Nuntă Vlad & Denisa',
          text: 'Sunteți invitați la nunta noastră!',
          url: window.location.href
        });
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      // Fallback pentru desktop
      alert('Link copiat! Poți trimite invitația prietenilor.');
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <div className="page">
      {/* Stories placeholder */}
      <div className="stories-container">
        <div className="story-bubble">📍 Primăria</div>
        <div className="story-bubble">⛪ Sala Regatului</div>
        <div className="story-bubble">🎉 Petrecere</div>
      </div>

      {/* Countdown */}
      <Countdown targetDate="2026-04-18T10:00:00" />

      {/* Postare principală cu imaginea invitației */}
      <div className="post-card">
        <div className="post-image">
          <img 
            src="/Front.jpg" 
            alt="Invitație Nuntă Vlad & Denisa" 
            className="invitation-image"
          />
          
          {/* Overlay pentru butoane locații */}
          <div className="location-overlay">
            <button 
              className="location-btn"
              onClick={() => handleLocation('Primăria Creaca', 'https://maps.app.goo.gl/JNwbg2z7ttYm4GT89')}
            >
              📍 Primăria din Creaca
            </button>
            <button 
              className="location-btn"
              onClick={() => handleLocation('Sala Regatului', 'https://maps.app.goo.gl/qnV1v6gKZiM5vwUr7')}
            >
              ⛪ Sala Regatului Moigrad
            </button>
            <button 
              className="location-btn"
              onClick={() => handleLocation('Elegance Ballroom', 'https://maps.app.goo.gl/CCEhSWbqv6eLEuKx9')}
            >
              🎊 Elegance Ballroom Zalău
            </button>
          </div>
        </div>

        {/* Butoane participare */}
        <div className="participation-buttons">
          <button 
            className="participate-btn yes"
            onClick={() => handleParticipation(true)}
          >
            ✅ Vin!
          </button>
          <button 
            className="participate-btn no"
            onClick={() => handleParticipation(false)}
          >
            ❌ Nu pot veni
          </button>
        </div>

        {/* Interacțiuni */}
        <div className="post-interactions">
          <button className="interaction-btn">❤️ 156</button>
          <button className="interaction-btn" onClick={handleComment}>
            💬 Comentarii
          </button>
          <button className="interaction-btn" onClick={handleShare}>
            📤 Share
          </button>
        </div>
      </div>

      {/* Feed poze invitați */}
      <div className="feed-section">
        <p className="feed-placeholder">
          📸 Pozele invitaților vor apărea aici după ce încep să încarce poze...
        </p>
      </div>
    </div>
  );
}
