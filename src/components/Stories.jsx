import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getStoriesByHour } from '../utils/storiesUtils';
import StoryViewer from './StoryViewer';

export default function Stories() {
  const [stories, setStories] = useState([]);
  const [selectedStory, setSelectedStory] = useState(null);

  useEffect(() => {
    loadStories();
  }, []);

  const loadStories = () => {
    setStories(getStoriesByHour());
  };

  return (
    <>
      <div className="stories-container">
        {/* Camera Button - FAB Style */}
        <Link to="/camera" className="story-bubble camera-fab" title="Fă o poză">
          <div className="camera-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
              <circle cx="12" cy="13" r="4"/>
            </svg>
          </div>
          <span className="story-label">Poza</span>
        </Link>

        {/* Stories */}
        {stories.map(story => (
          <div 
            key={story.id}
            className="story-bubble" 
            onClick={() => setSelectedStory(story.id)}
          >
            <div className="story-ring">
              <div className="story-preview">
                <img src={story.lastPhoto.thumb || story.lastPhoto.url} alt="Story preview" />
              </div>
            </div>
            <span className="story-label">{story.title}</span>
          </div>
        ))}

        {stories.length === 0 && (
          <p className="no-stories">📸 Pozele vor apărea aici...</p>
        )}
      </div>

      {selectedStory && (
        <StoryViewer storyId={selectedStory} onClose={() => setSelectedStory(null)} />
      )}
    </>
  );
}





/*
import React, { useState, useEffect } from 'react';
import { getStoriesByLocation } from '../utils/storiesUtils';
import StoryViewer from './StoryViewer';

export default function Stories() {
  const [stories, setStories] = useState([]);
  const [selectedStory, setSelectedStory] = useState(null);

  useEffect(() => {
    loadStories();
  }, []);

  const loadStories = () => {
    const storiesData = getStoriesByLocation();
    setStories(storiesData);
  };

  const openStory = (storyId) => {
    setSelectedStory(storyId);
  };

  const closeStory = () => {
    setSelectedStory(null);
  };

  return (
    <>
      <div className="stories-container">
        {stories.map(story => (
          <div 
            key={story.id}
            className="story-bubble"
            onClick={() => openStory(story.id)}
            style={{ '--story-color': story.color }}
          >
            <div className="story-avatar">
              <span className="story-emoji">{story.emoji}</span>
              <div className="story-ring" />
            </div>
            <div className="story-info">
              <span className="story-title">{story.title}</span>
              <span className="story-count">{story.photos.length}</span>
            </div>
          </div>
        ))}
        
        {stories.length === 0 && (
          <div className="no-stories">
            <span>📸 Pozele vor apărea aici...</span>
          </div>
        )}
      </div>

      {/* Story Viewer *-/}
      {selectedStory && (
        <StoryViewer 
          storyId={selectedStory}
          onClose={closeStory}
        />
      )}
    </>
  );
}
*/
