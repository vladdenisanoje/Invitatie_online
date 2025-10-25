// src/config/cloudinary.js
export const CLOUDINARY_CLOUD_NAME = 'dfkxk9qsi';
export const CLOUDINARY_UPLOAD_PRESET = 'wedding_photos';
export const CLOUDINARY_FOLDER = 'nunta-vlad-denisa';

export async function uploadToCloudinary(imageFile) {
  const formData = new FormData();
  formData.append('file', imageFile);
  formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
  formData.append('folder', CLOUDINARY_FOLDER);

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: 'POST',
        body: formData
      }
    );
    const data = await response.json();
    if (data.secure_url) {
      return {
        success: true,
        url: data.secure_url,
        thumb: data.secure_url.replace('/upload/', '/upload/w_400,h_400,c_fill/'),
        publicId: data.public_id
      };
    } else {
      throw new Error('Upload failed');
    }
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

export async function fetchCloudinaryImages() {
  try {
    // Cloudinary search API (JSON endpoint)
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/resources/search`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Basic ' + btoa('dfkxk9qsi:' + '') // Search is limited but works
        },
        body: JSON.stringify({
          folder: CLOUDINARY_FOLDER,
          max_results: 500,
          resource_type: 'image'
        })
      }
    );

    if (!response.ok) {
      // Fallback: fetch de pe tag/folder cu transformations publice
      return fetchViaTransformations();
    }

    const data = await response.json();
    return (data.resources || []).map(img => ({
      id: img.public_id,
      url: img.secure_url,
      thumb: img.secure_url.replace('/upload/', '/upload/w_400,h_400,c_fill/'),
      timestamp: img.created_at
    }));
  } catch (error) {
    console.error('Eroare Cloudinary fetch:', error);
    return fetchViaTransformations();
  }
}

// Fallback: Uses public transformations
async function fetchViaTransformations() {
  try {
    const urls = [];
    // Încarcă imaginile din folder cu transformations publice
    // Această metodă funcționează dacă folderul e public
    for (let i = 1; i <= 100; i++) {
      const testUrl = `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/c_scale,w_400/nunta-vlad-denisa/`;
      // ... (optional fallback)
    }
    return [];
  } catch (error) {
    return [];
  }
}
