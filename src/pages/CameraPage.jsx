import React, { useState, useRef } from 'react';
import { uploadToImgBB } from '../config/imgbb';
import { addPhoto } from '../utils/photoStorage';
import { useNavigate } from 'react-router-dom';

export default function CameraPage() {
  const [selectedLocation, setSelectedLocation] = useState('general');
  const [isUploading, setIsUploading] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const locations = [
    { value: 'primaria', label: '🏛️ Primăria' },
    { value: 'sala_regatului', label: '⛪ Sala Regatului' },
    { value: 'ballroom', label: '🎉 Ballroom' },
    { value: 'general', label: '📸 General' }
  ];

  const handleCapture = () => {
    fileInputRef.current.click();
  };

  const handleFileSelect = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Show preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setCapturedImage(e.target.result);
    };
    reader.readAsDataURL(file);

    // Upload to ImgBB
    setIsUploading(true);
    
    try {
      const result = await uploadToImgBB(file);
      
      if (result.success) {
        // Save to localStorage
        const photo = addPhoto({
          url: result.url,
          thumb: result.thumb,
          location: selectedLocation
        });
        
        alert('✅ Poza a fost încărcată cu succes!');
        
        // Navigate to home to see the photo
        setTimeout(() => {
          navigate('/');
        }, 1500);
      } else {
        alert('❌ Eroare la încărcare. Încearcă din nou!');
      }
    } catch (error) {
      alert('❌ Eroare la încărcare. Verifică conexiunea!');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="page camera-page">
      <h2>📸 Încarcă o poză</h2>
      
      {/* Location selector */}
      <div className="location-selector">
        <label>Alege locația:</label>
        <select 
          value={selectedLocation} 
          onChange={(e) => setSelectedLocation(e.target.value)}
          className="location-dropdown"
        >
          {locations.map(loc => (
            <option key={loc.value} value={loc.value}>
              {loc.label}
            </option>
          ))}
        </select>
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleFileSelect}
        style={{ display: 'none' }}
      />

      {/* Preview */}
      {capturedImage && (
        <div className="image-preview">
          <img src={capturedImage} alt="Preview" />
        </div>
      )}

      {/* Capture button */}
      <button 
        className="camera-btn"
        onClick={handleCapture}
        disabled={isUploading}
      >
        {isUploading ? '⏳ Se încarcă...' : '📷 Fă o poză / Alege din galerie'}
      </button>

      <p className="camera-hint">
        {isUploading 
          ? 'Se încarcă poza...' 
          : 'Apasă butonul pentru a face o poză sau alege din galerie'}
      </p>
    </div>
  );
}
