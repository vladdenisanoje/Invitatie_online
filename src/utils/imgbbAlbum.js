// src/utils/imgbbAlbum.js
export async function fetchImgBBAlbumImages(albumUrl) {
  try {
    const res = await fetch(albumUrl);
    const html = await res.text();
    const imgUrls = [];
    // Regex pentru a extrage toate imaginile i.ibb.co din HTML
    const regex = /<img[^>]+src="(https:\/\/i\.ibb\.co\/[^"]+)"/g;
    let match;
    while ((match = regex.exec(html)) !== null) {
      imgUrls.push(match[1]);
    }
    // Elimină duplicate
    return [...new Set(imgUrls)];
  } catch (error) {
    console.error('Eroare la încărcarea albumului ImgBB:', error);
    return [];
  }
}
