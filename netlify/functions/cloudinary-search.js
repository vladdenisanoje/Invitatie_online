// netlify/functions/cloudinary-search.js
exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST',
    'Content-Type': 'application/json'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers };
  }

  const CLOUD_NAME = 'dfkxk9qsi';
  const API_SECRET = process.env.CLOUDINARY_API_SECRET;

  try {
    const auth = Buffer.from(`${CLOUD_NAME}:${API_SECRET}`).toString('base64');
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/resources/search`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${auth}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          folder: 'nunta-vlad-denisa',
          max_results: 1000,
          resource_type: 'image'
        })
      }
    );

    const data = await response.json();
    const resources = (data.resources || []).map(img => ({
      id: img.public_id,
      url: img.secure_url,
      thumb: img.secure_url.replace('/upload/', '/upload/w_400,h_400,c_fill/'),
      timestamp: img.created_at
    }));

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(resources)
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify([])
    };
  }
};
