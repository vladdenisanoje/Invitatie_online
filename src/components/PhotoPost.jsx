import React, { useState, useRef } from 'react';
import { likePhoto, pinPhoto } from '../utils/photoStorage';

export default function PhotoPost({ photo, onUpdate, isFullscreen, onClose }) {
  const [showComments, setShowComments] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [showHeartAnim, setShowHeartAnim] = useState(false);
  const lastTap = useRef(0);
  const touchStart = useRef(0);

  const handleDoubleTap = () => {
    const now = Date.now();
    if (now - lastTap.current < 300) {
      handleLike();
      setShowHeartAnim(true);
      setTimeout(() => setShowHeartAnim(false), 800);
    }
    lastTap.current = now;
  };

  const handleLike = () => {
    if (!isLiked) {
      likePhoto(photo.id);
      setIsLiked(true);
      onUpdate();
    }
  };

  const handlePin = () => {
    const result = pinPhoto(photo.id);
    if (result?.error) {
      // Silent fail or toast
    } else {
      onUpdate();
    }
  };

  const handleTouchStart = (e) => {
    if (isFullscreen) touchStart.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e) => {
    if (isFullscreen) {
      const diff = touchStart.current - e.changedTouches[0].clientY;
      if (diff < -100) onClose?.();
    }
  };

  const getTimeAgo = (timestamp) => {
    const now = new Date();
    const posted = new Date(timestamp);
    const diffMs = now - posted;
    const diffMins = Math.floor(diffMs / 60000);
    if (diffMins < 1) return 'Acum';
    if (diffMins < 60) return `${diffMins} min`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays}z`;
  };

  const getPinTimer = (pinnedUntil) => {
    if (!pinnedUntil) return '';
    const now = new Date();
    const until = new Date(pinnedUntil);
    const diffMs = until - now;
    if (diffMs <= 0) return 'Expirat';
    const diffSeconds = Math.floor(diffMs / 1000);
    const minutes = Math.floor(diffSeconds / 60);
    const seconds = diffSeconds % 60;
    if (minutes > 0) {
      return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    } else {
      return `${seconds}s`;
    }
  };

  return (
    <div 
      className={`photo-post ${photo.isPinned ? 'pinned' : ''} ${isFullscreen ? 'fullscreen' : ''}`}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {!isFullscreen && (
        <div className="post-header">
          <span className="post-time">{getTimeAgo(photo.timestamp)}</span>
        </div>
      )}

      <div className="post-image" onClick={handleDoubleTap}>
        <img src={photo.url} alt="Photo" />
        {showHeartAnim && <div className="heart-burst">❤️</div>}
        {photo.isPinned && (
          <div className="pin-indicator">
            📌 {photo.pinCount || 1}/5
            {photo.pinnedUntil && (
              <div className="pin-timer">{getPinTimer(photo.pinnedUntil)}</div>
            )}
          </div>
        )}
      </div>

      <div className="post-actions">
        <button onClick={handleLike} className={isLiked ? 'liked' : ''}>
          {isLiked ? '❤️' : '🤍'} {photo.likes}
        </button>
        <button onClick={() => setShowComments(!showComments)}>
          💬 {photo.comments.length}
        </button>
        <button onClick={handlePin}>📌</button>
      </div>

      {showComments && (
        <div className="comments-section">
          {photo.comments.length === 0 ? (
            <p className="no-comments">Fii primul care comentează!</p>
          ) : (
            photo.comments.map(c => (
              <div key={c.id} className="comment">
                <p>{c.text}</p>
                <span className="comment-time">{getTimeAgo(c.timestamp)}</span>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}




/*
import React, { useState } from 'react';
import { likePhoto, pinPhoto } from '../utils/photoStorage';

export default function PhotoPost({ photo, onUpdate }) {
  const [showComments, setShowComments] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    if (!isLiked) {
      likePhoto(photo.id);
      setIsLiked(true);
      onUpdate();
    }
  };

  
  // În handlePin function, schimbă cu:
  const handlePin = () => {
    const result = pinPhoto(photo.id);
    if (result?.error) {
      alert(`⏱️ ${result.error}\nAșteaptă ca timpul să expire!`);
    } else {
      onUpdate();
      alert(`📌 +1 minut! (${result.pinCount}/5)`);
    }
  };

  /*const handlePin = () => {
    pinPhoto(photo.id);
    onUpdate();
    alert('📌 Poza a fost adăugată la destacate pentru +1 minut!');
  };*-/

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Poză de la nuntă',
          text: 'Uită-te la poza asta de la nuntă!',
          url: photo.url
        });
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      navigator.clipboard.writeText(photo.url);
      alert('✅ Link copiat!');
    }
  };

  const getLocationEmoji = (location) => {
    switch(location) {
      case 'primaria': return '🏛️';
      case 'sala_regatului': return '⛪';
      case 'ballroom': return '🎉';
      default: return '📸';
    }
  };

  const getTimeAgo = (timestamp) => {
    const now = new Date();
    const posted = new Date(timestamp);
    const diffMs = now - posted;
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return 'Acum';
    if (diffMins < 60) return `${diffMins} min`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays}z`;
  };

  const getPinTimer = (pinnedUntil) => {
    if (!pinnedUntil) return '';
    
    const now = new Date();
    const until = new Date(pinnedUntil);
    const diffMs = until - now;
    
    if (diffMs <= 0) return 'Expirat';
    
    const diffSeconds = Math.floor(diffMs / 1000);
    const minutes = Math.floor(diffSeconds / 60);
    const seconds = diffSeconds % 60;
    
    if (minutes > 0) {
      return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    } else {
      return `${seconds}s`;
    }
  };

  return (
    <div className={`photo-post ${photo.isPinned ? 'pinned' : ''}`}>
      {/* Header *-/}
      <div className="post-header">
        <span className="post-location">
          {getLocationEmoji(photo.location)}
        </span>
        <span className="post-time">{getTimeAgo(photo.timestamp)}</span>
      </div>

      {/* Photo *-/}
      <div className="post-image">
        <img src={photo.url} alt="Wedding photo" />
        {photo.isPinned && (
          <div className="pin-badge">
            📌 Destacat
            <div className="pin-timer">
              {getPinTimer(photo.pinnedUntil)}
            </div>
          </div>
        )}
      </div>

      {/* Actions *-/}
      <div className="post-actions">
        <button 
          className={`action-btn ${isLiked ? 'liked' : ''}`}
          onClick={handleLike}
        >
          {isLiked ? '❤️' : '🤍'} {photo.likes}
        </button>
        
        <button 
          className="action-btn"
          onClick={() => setShowComments(!showComments)}
        >
          💬 {photo.comments.length}
        </button>
        
        <button className="action-btn" onClick={handlePin}>
          📌 Destacă
        </button>
        
        <button className="action-btn" onClick={handleShare}>
          📤
        </button>
      </div>

      {/* Comments *-/}
      {showComments && (
        <div className="post-comments">
          {photo.comments.length === 0 ? (
            <p className="no-comments">Fii primul care comentează!</p>
          ) : (
            photo.comments.map(comment => (
              <div key={comment.id} className="comment">
                <p>{comment.text}</p>
                <span className="comment-time">{getTimeAgo(comment.timestamp)}</span>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
*/
