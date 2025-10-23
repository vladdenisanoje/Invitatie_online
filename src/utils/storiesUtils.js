import { getPhotosByLocation } from './photoStorage';

// Get stories grouped by location
export function getStoriesByLocation() {
  const stories = [
    {
      id: 'primaria',
      title: 'Primăria',
      emoji: '🏛️',
      photos: getPhotosByLocation('primaria'),
      color: '#4A90E2'
    },
    {
      id: 'sala_regatului',
      title: 'Sala Regatului',
      emoji: '⛪',
      photos: getPhotosByLocation('sala_regatului'),
      color: '#7B68EE'
    },
    {
      id: 'ballroom',
      title: 'Ballroom',
      emoji: '🎉',
      photos: getPhotosByLocation('ballroom'),
      color: '#FF6B6B'
    },
    {
      id: 'general',
      title: 'General',
      emoji: '📸',
      photos: getPhotosByLocation('general'),
      color: '#4ECDC4'
    }
  ];

  // Filter out empty stories
  return stories.filter(story => story.photos.length > 0);
}

// Get all photos for a specific story
export function getStoryPhotos(storyId) {
  return getPhotosByLocation(storyId);
}

// Get story by ID
export function getStoryById(storyId) {
  const stories = getStoriesByLocation();
  return stories.find(story => story.id === storyId);
}
