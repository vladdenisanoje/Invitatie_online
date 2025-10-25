// src/config/cloudinary.js
export const CLOUDINARY_CLOUD_NAME = 'dfkxk9qsi'; // Ex: 'dxxxxxx'
export const CLOUDINARY_UPLOAD_PRESET = 'wedding_photos'; // Upload preset name
export const CLOUDINARY_FOLDER = 'nunta-vlad-denisa'; // Folder name

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
    const response = await fetch(
      `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/list/${CLOUDINARY_FOLDER}.json`
    );
    const data = await response.json();
    return data.resources.map(img => ({
      id: img.public_id,
      url: img.secure_url,
      thumb: img.secure_url.replace('/upload/', '/upload/w_400,h_400,c_fill/'),
      timestamp: img.created_at
    }));
  } catch (error) {
    console.error('Eroare la încărcarea imaginilor Cloudinary:', error);
    return [];
  }
}
