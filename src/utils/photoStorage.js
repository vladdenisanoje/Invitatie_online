const STORAGE_KEY = 'wedding_photos';
const PIN_LIMIT_KEY = 'pin_limits';
const MAX_PINS_PER_PHOTO = 5;

export function getAllPhotos() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
}

export function addPhoto(data) {
  const photos = getAllPhotos();
  const newPhoto = {
    id: Date.now(),
    url: data.url,
    thumb: data.thumb,
    timestamp: new Date().toISOString(),
    location: data.location || 'general',
    likes: 0,
    comments: [],
    isPinned: false,
    pinnedUntil: null,
    pinCount: 0
  };
  photos.unshift(newPhoto);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(photos));
  return newPhoto;
}

export function pinPhoto(photoId) {
  const photos = getAllPhotos();
  const photo = photos.find(p => p.id === photoId);
  if (!photo) return null;
  
  if (photo.pinCount >= MAX_PINS_PER_PHOTO) {
    return { error: `Limită atinsă (${MAX_PINS_PER_PHOTO}/5 pin-uri)` };
  }
  
  const now = new Date();
  const until = photo.pinnedUntil ? new Date(photo.pinnedUntil) : now;
  until.setMinutes(until.getMinutes() + 1);
  
  photo.isPinned = true;
  photo.pinnedUntil = until.toISOString();
  photo.pinCount = (photo.pinCount || 0) + 1;
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(photos));
  return photo;
}

export function updatePinnedPhotos() {
  const photos = getAllPhotos();
  const now = new Date();
  photos.forEach(photo => {
    if (photo.isPinned && new Date(photo.pinnedUntil) < now) {
      photo.isPinned = false;
      photo.pinnedUntil = null;
      photo.pinCount = 0;
    }
  });
  localStorage.setItem(STORAGE_KEY, JSON.stringify(photos));
}

export function getPinnedPhotos() {
  updatePinnedPhotos();
  return getAllPhotos().filter(p => p.isPinned).sort((a, b) => new Date(b.pinnedUntil) - new Date(a.pinnedUntil));
}

export function getPhotosByLocation(location) {
  return getAllPhotos().filter(p => p.location === location);
}

export function likePhoto(photoId) {
  const photos = getAllPhotos();
  const photo = photos.find(p => p.id === photoId);
  if (photo) {
    photo.likes += 1;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(photos));
  }
  return photo;
}

export function addComment(photoId, text) {
  const photos = getAllPhotos();
  const photo = photos.find(p => p.id === photoId);
  if (photo) {
    photo.comments.push({ id: Date.now(), text, timestamp: new Date().toISOString() });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(photos));
  }
  return photo;
}





/*
// Photo storage management using localStorage

const STORAGE_KEY = 'wedding_photos';

// Get all photos
export function getAllPhotos() {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
}

// Add new photo
export function addPhoto(photoData) {
  const photos = getAllPhotos();
  const newPhoto = {
    id: Date.now(),
    url: photoData.url,
    thumb: photoData.thumb,
    timestamp: new Date().toISOString(),
    location: photoData.location || 'general',
    likes: 0,
    comments: [],
    isPinned: false,
    pinnedUntil: null
  };
  
  photos.unshift(newPhoto); // Add to beginning
  localStorage.setItem(STORAGE_KEY, JSON.stringify(photos));
  
  return newPhoto;
}

// Get photos by location
export function getPhotosByLocation(location) {
  const photos = getAllPhotos();
  return photos.filter(photo => photo.location === location);
}

// Pin a photo (add 1 minute)
export function pinPhoto(photoId) {
  const photos = getAllPhotos();
  const photo = photos.find(p => p.id === photoId);
  
  if (photo) {
    const currentTime = new Date();
    const pinnedUntil = photo.pinnedUntil ? new Date(photo.pinnedUntil) : currentTime;
    
    // Add 1 minute
    pinnedUntil.setMinutes(pinnedUntil.getMinutes() + 1);
    
    photo.isPinned = true;
    photo.pinnedUntil = pinnedUntil.toISOString();
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(photos));
  }
  
  return photo;
}

// Check and update pinned photos
export function updatePinnedPhotos() {
  const photos = getAllPhotos();
  const now = new Date();
  let updated = false;
  
  photos.forEach(photo => {
    if (photo.isPinned && photo.pinnedUntil) {
      if (now > new Date(photo.pinnedUntil)) {
        photo.isPinned = false;
        photo.pinnedUntil = null;
        updated = true;
      }
    }
  });
  
  if (updated) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(photos));
  }
  
  return photos;
}

// Get ALL pinned photos (not just one)
export function getPinnedPhotos() {
  updatePinnedPhotos();
  const photos = getAllPhotos();
  return photos.filter(photo => photo.isPinned).sort((a, b) => 
    new Date(b.pinnedUntil) - new Date(a.pinnedUntil) // Most recent pin first
  );
}

// Keep the old function for compatibility (returns first pinned photo)
export function getPinnedPhoto() {
  const pinnedPhotos = getPinnedPhotos();
  return pinnedPhotos.length > 0 ? pinnedPhotos[0] : null;
}

// Like a photo
export function likePhoto(photoId) {
  const photos = getAllPhotos();
  const photo = photos.find(p => p.id === photoId);
  
  if (photo) {
    photo.likes += 1;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(photos));
  }
  
  return photo;
}

// Add comment
export function addComment(photoId, commentText) {
  const photos = getAllPhotos();
  const photo = photos.find(p => p.id === photoId);
  
  if (photo) {
    photo.comments.push({
      id: Date.now(),
      text: commentText,
      timestamp: new Date().toISOString()
    });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(photos));
  }
  
  return photo;
}
*/
