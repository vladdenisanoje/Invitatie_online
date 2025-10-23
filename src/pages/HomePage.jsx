import React, { useState, useEffect } from 'react';
import Countdown from '../components/Countdown';
import PhotoPost from '../components/PhotoPost';
import { getAllPhotos, getPinnedPhotos, updatePinnedPhotos } from '../utils/photoStorage';


import Stories from '../components/Stories'; // Add this import

// Replace the stories-container div with:
<Stories />




export default function HomePage() {
  const [photos, setPhotos] = useState([]);
  const [pinnedPhotos, setPinnedPhotos] = useState([]);

  useEffect(() => {
    loadPhotos();
    
    // Update pinned photos every second
    const interval = setInterval(() => {
      updatePinnedPhotos();
      loadPhotos();
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);

  const loadPhotos = () => {
    const allPhotos = getAllPhotos();
    const pinned = getPinnedPhotos();
    
    // Filter out ALL pinned photos from main feed
    const pinnedIds = pinned.map(p => p.id);
    const regularPhotos = allPhotos.filter(p => !pinnedIds.includes(p.id));
    
    setPhotos(regularPhotos);
    setPinnedPhotos(pinned);
  };

  const handleLocation = (locationName, mapsUrl) => {
    window.open(mapsUrl, '_blank');
  };

  const handleParticipation = (isAttending) => {
    const vladPhone = '+40763491494';
    
    let message;
    if (isAttending) {
      message = 'Bună! Ne-ar face multă plăcere să vă fim alături. Confirmăm participarea pentru __ persoane.';
    } else {
      message = 'Mulțumim mult pentru invitație, dar din păcate nu vom reuși să participăm!';
    }
    
    const whatsappUrl = `https://wa.me/${vladPhone.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
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
      alert('Link copiat!');
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
              onClick={() => handleLocation('Elegance Ballroom', 'https://maps.app.goo.gl/wsAfAJYf1GfEhTYF7')}
            >
              🎊 Elegance Ballroom Zalău
            </button>
          </div>
        </div>

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

        <div className="post-interactions">
          <button className="interaction-btn">❤️ 156</button>
          <button className="interaction-btn">💬 Comentarii</button>
          <button className="interaction-btn" onClick={handleShare}>
            📤 Share
          </button>
        </div>
      </div>

      {/* Pinned photos (if any) */}
      {pinnedPhotos.length > 0 && (
        <div className="pinned-section">
          <h3 className="section-title">
            📌 Poze Destacate ({pinnedPhotos.length})
          </h3>
          {pinnedPhotos.map(photo => (
            <PhotoPost key={`pinned-${photo.id}`} photo={photo} onUpdate={loadPhotos} />
          ))}
        </div>
      )}

      {/* Feed with guest photos */}
      <div className="feed-section">
        {photos.length === 0 ? (
          <p className="feed-placeholder">
            📸 Pozele invitaților vor apărea aici...<br/>
            Mergi la Camera și încarcă prima poză!
          </p>
        ) : (
          <>
            <h3 className="section-title">📸 Poze de la nuntă ({photos.length})</h3>
            {photos.map(photo => (
              <PhotoPost key={photo.id} photo={photo} onUpdate={loadPhotos} />
            ))}
          </>
        )}
      </div>
    </div>
  );
}
