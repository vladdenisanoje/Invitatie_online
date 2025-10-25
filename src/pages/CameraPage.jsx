import React, { useState, useRef } from 'react';
import { uploadToCloudinary } from '../config/cloudinary';
import { addPhoto } from '../utils/photoStorage';
import { showToast } from '../components/ToastContainer';

export default function CameraPage() {
  const [capturedImage, setCapturedImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const compressImage = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          let { width, height } = img;
          const maxSize = 1200;
          if (width > maxSize || height > maxSize) {
            if (width > height) {
              height = (height * maxSize) / width;
              width = maxSize;
            } else {
              width = (width * maxSize) / height;
              height = maxSize;
            }
          }
          canvas.width = width;
          canvas.height = height;
          ctx.drawImage(img, 0, 0, width, height);
          canvas.toBlob(
            (blob) => resolve(new File([blob], file.name, { type: 'image/jpeg' })),
            'image/jpeg',
            0.85
          );
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    });
  };

  const uploadInBackground = async (file) => {
    try {
      showToast('📤 Se încarcă...', 'info');
      setUploading(true);
      const compressed = await compressImage(file);
      const result = await uploadToCloudinary(compressed);
      if (result.success) {
        addPhoto({ url: result.url, thumb: result.thumb, location: 'general' });
        showToast('✅ Încărcată!', 'success');
        setCapturedImage(null);
      } else {
        showToast('❌ Eroare', 'error');
      }
    } catch (error) {
      showToast('❌ Eroare', 'error');
    } finally {
      setUploading(false);
    }
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => setCapturedImage(e.target.result);
    reader.readAsDataURL(file);
    uploadInBackground(file);
  };

  return (
    <div className="page camera-page">
      <h2>📷 Fă o Poză</h2>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleFileSelect}
        style={{ display: 'none' }}
      />
      <button onClick={() => fileInputRef.current?.click()} className="fab">
        📸
      </button>
      {capturedImage && <p>Poza se va încărca automat în fundal...</p>}
      {uploading && <p>⏳ Se încarcă...</p>}
    </div>
  );
}







/*import React, { useState, useRef } from 'react';
import { uploadToImgBB } from '../config/imgbb';
import { addPhoto } from '../utils/photoStorage';
import { useNavigate } from 'react-router-dom';
import { showToast } from '../components/ToastContainer';

export default function CameraPage() {
  const [selectedLocation, setSelectedLocation] = useState('general');
  const [capturedImage, setCapturedImage] = useState(null);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const locations = [
    { value: 'primaria', label: '🏛️ Primăria' },
    { value: 'sala_regatului', label: '⛪ Sala Regatului' },
    { value: 'ballroom', label: '🎉 Ballroom' },
    { value: 'general', label: '📸 General' }
  ];

  const compressImage = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          let { width, height } = img;
          const maxSize = 1200;
          if (width > height && width > maxSize) {
            height = (height * maxSize) / width;
            width = maxSize;
          } else if (height > maxSize) {
            width = (width * maxSize) / height;
            height = maxSize;
          }
          canvas.width = width;
          canvas.height = height;
          ctx.drawImage(img, 0, 0, width, height);
          canvas.toBlob((blob) => resolve(new File([blob], file.name, { type: 'image/jpeg' })), 'image/jpeg', 0.85);
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    });
  };

  const uploadInBackground = async (file, location) => {
    try {
      showToast('📤 Se încarcă poza...', 'info');
      const compressed = await compressImage(file);
      const result = await uploadToImgBB(compressed);
      if (result.success) {
        addPhoto({ url: result.url, thumb: result.thumb, location });
        showToast('✅ Poza încărcată!', 'success');
      } else {
        showToast('❌ Eroare', 'error');
      }
    } catch (error) {
      showToast('❌ Eroare', 'error');
    }
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => setCapturedImage(e.target.result);
    reader.readAsDataURL(file);
    uploadInBackground(file, selectedLocation);
    setTimeout(() => navigate('/'), 1000);
  };

  return (
    <div className="page camera-page">
      <h2>📸 Încarcă o poză</h2>
      <div className="location-selector">
        <label>Alege locația:</label>
        <select value={selectedLocation} onChange={(e) => setSelectedLocation(e.target.value)} className="location-dropdown">
          {locations.map(loc => <option key={loc.value} value={loc.value}>{loc.label}</option>)}
        </select>
      </div>
      <input ref={fileInputRef} type="file" accept="image/*" capture="environment" onChange={handleFileSelect} style={{ display: 'none' }} />
      {capturedImage && <div className="image-preview"><img src={capturedImage} alt="Preview" /></div>}
      <button className="camera-btn" onClick={() => fileInputRef.current.click()}>📷 Fă o poză</button>
      <p className="camera-hint">Poza se va încărca automat în fundal</p>
    </div>
  );
}

*/

/*
import React, { useState, useRef } from 'react';
import { uploadToImgBB } from '../config/imgbb';
import { addPhoto } from '../utils/photoStorage';
import { useNavigate } from 'react-router-dom';
import { showToast } from '../components/ToastContainer';

export default function CameraPage() {
  const [selectedLocation, setSelectedLocation] = useState('general');
  const [capturedImage, setCapturedImage] = useState(null);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const locations = [
    { value: 'primaria', label: '🏛️ Primăria' },
    { value: 'sala_regatului', label: '⛪ Sala Regatului' },
    { value: 'ballroom', label: '🎉 Ballroom' },
    { value: 'general', label: '📸 General' }
  ];

  // Compress image
  const compressImage = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        const img = new Image();
        
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          
          let width = img.width;
          let height = img.height;
          const maxSize = 1200;
          
          if (width > height && width > maxSize) {
            height = (height * maxSize) / width;
            width = maxSize;
          } else if (height > maxSize) {
            width = (width * maxSize) / height;
            height = maxSize;
          }
          
          canvas.width = width;
          canvas.height = height;
          ctx.drawImage(img, 0, 0, width, height);
          
          canvas.toBlob(
            (blob) => {
              const compressedFile = new File([blob], file.name, {
                type: 'image/jpeg',
                lastModified: Date.now()
              });
              resolve(compressedFile);
            },
            'image/jpeg',
            0.85
          );
        };
        
        img.src = e.target.result;
      };
      
      reader.readAsDataURL(file);
    });
  };

  // Background upload
  const uploadInBackground = async (file, location) => {
    try {
      showToast('📤 Se încarcă poza...', 'info');
      
      const compressedFile = await compressImage(file);
      const result = await uploadToImgBB(compressedFile);
      
      if (result.success) {
        addPhoto({
          url: result.url,
          thumb: result.thumb,
          location: location
        });
        
        showToast('✅ Poza a fost încărcată!', 'success');
      } else {
        showToast('❌ Eroare la încărcare', 'error');
      }
    } catch (error) {
      showToast('❌ Eroare la încărcare', 'error');
      console.error('Upload error:', error);
    }
  };

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

    // Start background upload (non-blocking!)
    uploadInBackground(file, selectedLocation);
    
    // Navigate immediately
    setTimeout(() => {
      navigate('/');
    }, 1000);
  };

  return (
    <div className="page camera-page">
      <h2>📸 Încarcă o poză</h2>
      
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

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleFileSelect}
        style={{ display: 'none' }}
      />

      {capturedImage && (
        <div className="image-preview">
          <img src={capturedImage} alt="Preview" />
        </div>
      )}

      <button 
        className="camera-btn"
        onClick={handleCapture}
      >
        📷 Fă o poză / Alege din galerie
      </button>

      <p className="camera-hint">
        Poza se va încărca automat în fundal
      </p>
    </div>
  );
}
*/
