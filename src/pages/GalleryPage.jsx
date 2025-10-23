import React, { useState, useEffect } from 'react';
import { getAllPhotos, getPhotosByLocation } from '../utils/photoStorage';

export default function GalleryPage() {
  const [photos, setPhotos] = useState([]);
  const [filter, setFilter] = useState('all');
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  useEffect(() => {
    loadPhotos();
  }, [filter]);

  const loadPhotos = () => {
    const allPhotos = filter === 'all' ? getAllPhotos() : getPhotosByLocation(filter);
    setPhotos(allPhotos);
  };

  return (
    <div className="page gallery-page">
      <div className="gallery-header">
        <h2>🖼️ Galerie</h2>
        <p className="photo-count">{photos.length} poze</p>
      </div>
      
      <select className="filter-dropdown" value={filter} onChange={(e) => setFilter(e.target.value)}>
        <option value="all">Toate pozele</option>
        <option value="primaria">🏛️ Primăria</option>
        <option value="sala_regatului">⛪ Sala Regatului</option>
        <option value="ballroom">🎉 Ballroom</option>
        <option value="general">📸 General</option>
      </select>

      <div className="gallery-grid">
        {photos.map(photo => (
          <div key={photo.id} className="gallery-item" onClick={() => setSelectedPhoto(photo)}>
            <img src={photo.thumb || photo.url} alt="Gallery" />
          </div>
        ))}
      </div>

      {selectedPhoto && (
        <div className="photo-modal" onClick={() => setSelectedPhoto(null)}>
          <img src={selectedPhoto.url} alt="Full" />
          <button className="modal-close">✕</button>
        </div>
      )}
    </div>
  );
}



/*
import React from 'react';

export default function GalleryPage() {
  return (
    <div className="page gallery-page">
      <h2>🖼️ Galerie</h2>
      <p className="gallery-count">0 poze încărcate</p>
      
      <div className="gallery-grid">
        {/* Grid 3x3 - placeholder *-/}
        <div className="gallery-placeholder">
          <p>Pozele vor apărea aici în grid 3x3</p>
        </div>
      </div>
    </div>
  );
}*/
