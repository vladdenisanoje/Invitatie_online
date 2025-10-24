import { getAllPhotos } from './photoStorage';

export function getStoriesByHour() {
  const allPhotos = getAllPhotos();
  const hourGroups = {};
  
  allPhotos.forEach(photo => {
    const hour = new Date(photo.timestamp).getHours();
    if (!hourGroups[hour]) {
      hourGroups[hour] = [];
    }
    hourGroups[hour].push(photo);
  });
  
  return Object.keys(hourGroups).map(hour => ({
    id: `hour-${hour}`,
    hour: parseInt(hour),
    title: `${hour}:00 - ${hour}:59`,
    photos: hourGroups[hour].sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp)),
    lastPhoto: hourGroups[hour][hourGroups[hour].length - 1],
    hasNew: true // Logică de "viewed" mai târziu
  })).sort((a, b) => a.hour - b.hour);
}

export function getStoryPhotos(storyId) {
  const hour = parseInt(storyId.replace('hour-', ''));
  return getAllPhotos().filter(p => new Date(p.timestamp).getHours() === hour);
}




/*import { getPhotosByLocation } from './photoStorage';

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
}*/
