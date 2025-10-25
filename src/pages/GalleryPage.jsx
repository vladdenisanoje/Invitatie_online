import React, { useState, useEffect } from 'react';
import { fetchImgBBAlbumImages } from '../utils/imgbbAlbum';
import { getAllPhotos } from '../utils/photoStorage';

export default function GalleryPage() {
  const [photos, setPhotos] = useState([]);
  const [filter, setFilter] = useState('all');
  const albumUrl = 'https://ibb.co/album/r3HRXD'; // Albumul tău public

  useEffect(() => {
    if (filter === 'mine') {
      // Arată doar pozele locale ale utilizatorului
      const mine = getAllPhotos();
      setPhotos(mine);
    } else {
      // Arată TOATE pozele din albumul public ImgBB
      fetchImgBBAlbumImages(albumUrl).then(urls => {
        // Transformă URL-urile în format compatibil cu PhotoPost
        const formattedPhotos = urls.map((url, idx) => ({
          id: `imgbb-${idx}`,
          url: url,
          thumb: url,
          timestamp: new Date().toISOString(),
          likes: 0,
          comments: [],
          isPinned: false
        }));
        setPhotos(formattedPhotos);
      });
    }
  }, [filter, albumUrl]);

  return (
    <div className="page gallery-page">
      <div className="gallery-header">
        <h2>Galerie</h2>
        <select value={filter} onChange={e => setFilter(e.target.value)}>
          <option value="all">Toate pozele</option>
          <option value="mine">Ale mele</option>
        </select>
        <span>{photos.length} poze</span>
      </div>

      <div className="gallery-grid">
        {photos.length === 0 ? (
          <p style={{textAlign: 'center', padding: '20px'}}>
            📸 Nicio poză încă. Fă prima poză!
          </p>
        ) : (
          photos.map((photo, idx) => (
            <div key={photo.id || idx} className="gallery-item">
              <img src={photo.thumb || photo.url} alt="Poza de la nuntă" />
            </div>
          ))
        )}
      </div>
    </div>
  );
}




/*

import React, { useState, useEffect } from 'react';
import { getAllPhotos } from '../utils/photoStorage';
import PhotoPost from '../components/PhotoPost';

export default function GalleryPage() {
  const [photos, setPhotos] = useState([]);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    loadPhotos();
  }, [filter]);

  const loadPhotos = () => {
    const all = getAllPhotos();
    setPhotos(filter === 'mine' ? all.filter(p => p.deviceId === localStorage.getItem('deviceId')) : all);
  };

  return (
    <div className="page gallery-page">
      <div className="gallery-header">
        <h2>Galerie</h2>
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">Toate</option>
          <option value="mine">Doar ale mele</option>
        </select>
      </div>

      <div className="gallery-grid-edge">
        {photos.map(photo => (
          <div key={photo.id} className="gallery-item-edge" onClick={() => setSelectedPhoto(photo)}>
            <img src={photo.thumb || photo.url} alt="Gallery" />
            <div className="photo-stats">
              <span>❤️{photo.likes}</span>
              <span>💬{photo.comments.length}</span>
            </div>
          </div>
        ))}
      </div>

      {selectedPhoto && (
        <div className="photo-fullscreen-modal">
          <PhotoPost 
            photo={selectedPhoto} 
            onUpdate={loadPhotos} 
            isFullscreen 
            onClose={() => setSelectedPhoto(null)} 
          />
        </div>
      )}
    </div>
  );
}
*/


/*import React, { useState, useEffect } from 'react';
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
*/


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
