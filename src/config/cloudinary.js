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
    const response = await fetch('/.netlify/functions/cloudinary-search', {
      method: 'POST'
    });
    return await response.json();
  } catch (error) {
    console.error('Fetch error:', error);
    return [];
  }
}
