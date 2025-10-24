// ImgBB API Configuration
export const IMGBB_API_KEY = '9a7fab5a7d0128768e26d2242c5810ca';
export const IMGBB_UPLOAD_URL = 'https://api.imgbb.com/1/upload';

// Upload function
export async function uploadToImgBB(imageFile) {
  const formData = new FormData();
  formData.append('image', imageFile);
  formData.append('album', 'r3HRXD'); // ← ID-ul albumului tău

  try {
    const response = await fetch(`${IMGBB_UPLOAD_URL}?key=${IMGBB_API_KEY}`, {
      method: 'POST',
      body: formData
    });
    const data = await response.json();
    if (data.success) {
      return {
        success: true,
        url: data.data.url,
        deleteUrl: data.data.delete_url,
        thumb: data.data.thumb.url
      };
    } else {
      throw new Error('Upload failed');
    }
  } catch (error) {
    console.error('ImgBB upload error:', error);
    return {
      success: false,
      error: error.message
    };
  }
}


/*
// ImgBB API Configuration
export const IMGBB_API_KEY = '9a7fab5a7d0128768e26d2242c5810ca';
export const IMGBB_UPLOAD_URL = 'https://api.imgbb.com/1/upload';

// Upload function
export async function uploadToImgBB(imageFile) {
  const formData = new FormData();
  formData.append('image', imageFile);
  
  try {
    const response = await fetch(`${IMGBB_UPLOAD_URL}?key=${IMGBB_API_KEY}`, {
      method: 'POST',
      body: formData
    });
    
    const data = await response.json();
    
    if (data.success) {
      return {
        success: true,
        url: data.data.url,
        deleteUrl: data.data.delete_url,
        thumb: data.data.thumb.url
      };
    } else {
      throw new Error('Upload failed');
    }
  } catch (error) {
    console.error('ImgBB upload error:', error);
    return {
      success: false,
      error: error.message
    };
  }
}
*/
