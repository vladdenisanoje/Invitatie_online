import React, { useState, useEffect } from 'react';
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
        {stories.map(story => (
          <div key={story.id} className="story-bubble" onClick={() => setSelectedStory(story.id)}>
            <div className={`story-ring ${story.hasNew ? 'new' : ''}`}>
              <div className="story-preview">
                <img src={story.lastPhoto.thumb || story.lastPhoto.url} alt="Story preview" />
              </div>
            </div>
            <span className="story-label">{story.title}</span>
          </div>
        ))}
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
