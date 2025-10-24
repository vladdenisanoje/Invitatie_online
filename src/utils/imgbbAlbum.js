// src/utils/imgbbAlbum.js
export async function fetchImgBBAlbumImages(albumUrl) {
  const res = await fetch(albumUrl);
  const html = await res.text();
  const imgUrls = [];
  const regex = /<img[^>]+src="(https:\/\/i\.ibb\.co\/[^"]+)"/g;
  let match;
  while ((match = regex.exec(html)) !== null) {
    imgUrls.push(match[1]);
  }
  return [...new Set(imgUrls)];
}
