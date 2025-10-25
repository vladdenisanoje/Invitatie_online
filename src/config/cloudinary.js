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
        thumb: data.secure_url.replace('/upload/', '/upload/w_400,h_300,c_fill/'),
      };
    }
  } catch (error) {
    console.error('Upload error:', error);
  }
  return { success: false };
}

// Mock gallery - retur ultimele 10 poze din Cloudinary folder (via URL preview)
export async function fetchCloudinaryImages() {
  return [];
}
