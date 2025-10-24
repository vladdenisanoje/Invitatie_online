import React, { useState, useEffect, useRef } from 'react';
import { getStoryPhotos } from '../utils/storiesUtils';

export default function StoryViewer({ storyId, onClose }) {
  const [photos, setPhotos] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const containerRef = useRef(null);
  const touchStart = useRef(0);

  useEffect(() => {
    setPhotos(getStoryPhotos(storyId));
  }, [storyId]);

  useEffect(() => {
    if (photos.length === 0) return;
    const timer = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          if (currentIndex < photos.length - 1) {
            setCurrentIndex(i => i + 1);
            return 0;
          } else {
            onClose();
          }
        }
        return p + 2;
      });
    }, 50);
    return () => clearInterval(timer);
  }, [currentIndex, photos, onClose]);

  const handleTouchStart = (e) => {
    touchStart.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e) => {
    const touchEnd = e.changedTouches[0].clientY;
    const diff = touchStart.current - touchEnd;
    if (Math.abs(diff) > 100) {
      if (diff < 0) onClose(); // Swipe down
    }
  };

  const handleClick = (e) => {
    const width = e.currentTarget.offsetWidth;
    const clickX = e.clientX;
    if (clickX < width / 3 && currentIndex > 0) {
      setCurrentIndex(i => i - 1);
      setProgress(0);
    } else if (clickX > (2 * width) / 3) {
      if (currentIndex < photos.length - 1) {
        setCurrentIndex(i => i + 1);
        setProgress(0);
      } else {
        onClose();
      }
    }
  };

  if (photos.length === 0) return null;

  return (
    <div 
      className="story-viewer-fullscreen" 
      ref={containerRef}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onClick={handleClick}
    >
      <div className="story-progress-bars">
        {photos.map((_, i) => (
          <div key={i} className="progress-segment">
            <div 
              className="progress-fill" 
              style={{
                width: i === currentIndex ? `${progress}%` : i < currentIndex ? '100%' : '0%'
              }}
            />
          </div>
        ))}
      </div>

      <button className="story-close-btn" onClick={onClose}>✕</button>

      <div className="story-photo-container">
        <img src={photos[currentIndex].url} alt="Story" />
      </div>

      <div className="story-info-bottom">
        <p>{currentIndex + 1} / {photos.length}</p>
      </div>
    </div>
  );
}




/*
import React, { useState, useEffect } from 'react';
import { getStoryPhotos } from '../utils/storiesUtils';

export default function StoryViewer({ storyId, onClose }) {
  const [photos, setPhotos] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const storyPhotos = getStoryPhotos(storyId);
    setPhotos(storyPhotos);
  }, [storyId]);

  useEffect(() => {
    if (photos.length === 0) return;

    const duration = 3000; // 3 seconds per photo
    const interval = 100; // Update progress every 100ms
    const increment = (interval / duration) * 100;

    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          // Move to next photo
          setCurrentIndex(current => {
            if (current >= photos.length - 1) {
              onClose(); // Close when last photo is done
              return current;
            }
            return current + 1;
          });
          return 0;
        }
        return prev + increment;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [photos, currentIndex, onClose]);

  const handleNext = () => {
    if (currentIndex < photos.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setProgress(0);
    } else {
      onClose();
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setProgress(0);
    }
  };

  const getLocationTitle = (location) => {
    switch(location) {
      case 'primaria': return '🏛️ Primăria';
      case 'sala_regatului': return '⛪ Sala Regatului';
      case 'ballroom': return '🎉 Ballroom';
      default: return '📸 General';
    }
  };

  if (photos.length === 0) return null;

  const currentPhoto = photos[currentIndex];

  return (
    <div className="story-viewer">
      {/* Progress bars *--/}
      <div className="story-progress">
        {photos.map((_, index) => (
          <div key={index} className="progress-bar">
            <div 
              className="progress-fill"
              style={{
                width: index === currentIndex ? `${progress}%` : 
                       index < currentIndex ? '100%' : '0%'
              }}
            />
          </div>
        ))}
      </div>

      {/* Header *--/}
      <div className="story-header">
        <div className="story-info">
          <h3>{getLocationTitle(currentPhoto.location)}</h3>
          <span>{currentIndex + 1} / {photos.length}</span>
        </div>
        <button className="close-btn" onClick={onClose}>✕</button>
      </div>

      {/* Photo *--/}
      <div className="story-content">
        <img 
          src={currentPhoto.url} 
          alt="Story" 
          loading="eager"
          style={{ objectFit: 'contain' }}
        />

        
        {/* Navigation areas *--/}
        <div className="story-nav-prev" onClick={handlePrev} />
        <div className="story-nav-next" onClick={handleNext} />
      </div>

      {/* Footer *--/}
      <div className="story-footer">
        <p>❤️ {currentPhoto.likes} • 💬 {currentPhoto.comments.length}</p>
      </div>
    </div>
  );
}
*/
