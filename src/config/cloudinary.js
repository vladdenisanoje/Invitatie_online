export const CLOUDINARY_CLOUD_NAME = 'dfkxk9qsi';
export const CLOUDINARY_UPLOAD_PRESET = 'wedding_photos';
export const CLOUDINARY_FOLDER = 'nunta-vlad-denisa';

export async function uploadToCloudinary(imageFile) {
  const formData = new FormData();
  formData.append('file', imageFile);
  formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
  formData.append('folder', CLOUDINARY_FOLDER);
  formData.append('tags', 'wedding');

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
      { method: 'POST', body: formData }
    );
    const data = await response.json();
    if (data.secure_url) {
      return {
        success: true,
        url: data.secure_url,
        thumb: data.secure_url.replace('/upload/', '/upload/w_400,h_400,c_fill/'),
        publicId: data.public_id
      };
    }
  } catch (error) {
    console.error('Upload error:', error);
  }
  return { success: false };
}

export async function fetchCloudinaryImages() {
  try {
    const response = await fetch(
      `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/list/wedding.json`
    );
    const data = await response.json();
    return (data.resources || []).map(img => ({
      id: img.public_id,
      url: img.secure_url,
      thumb: img.secure_url.replace('/upload/', '/upload/w_400,h_400,c_fill/'),
      timestamp: img.created_at
    }));
  } catch (error) {
    console.error('Fetch error:', error);
    return [];
  }
}
