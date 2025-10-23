import React, { useState } from 'react';
import { likePhoto, pinPhoto, getPinnedPhoto } from '../utils/photoStorage';

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

  const handlePin = () => {
    pinPhoto(photo.id);
    onUpdate();
    alert('📌 Poza a fost adăugată la destacate pentru +1 minut!');
  };

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

  return (
    <div className={`photo-post ${photo.isPinned ? 'pinned' : ''}`}>
      {/* Header */}
      <div className="post-header">
        <span className="post-location">
          {getLocationEmoji(photo.location)}
        </span>
        <span className="post-time">{getTimeAgo(photo.timestamp)}</span>
      </div>

      {/* Photo */}
      <div className="post-image">
        <img src={photo.url} alt="Wedding photo" />
        {photo.isPinned && (
          <div className="pin-badge">
            📌 Destacat
          </div>
        )}
      </div>

      {/* Actions */}
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

      {/* Comments (simplified for now) */}
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
