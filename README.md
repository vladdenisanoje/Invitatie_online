/src
  /assets         # SVG icons, logo, splash, etc
  /components
    BottomNav.jsx
    CameraFloatingButton.jsx
    Countdown.jsx
    GalleryGrid.jsx
    InfoSection.jsx
    PhotoPost.jsx
    Stories.jsx
    StoryViewer.jsx
    Toast.jsx
    ToastContainer.jsx
  /config
    imgbb.js
  /pages
    App.jsx
    CameraPage.jsx
    GalleryPage.jsx
    HomePage.jsx
    InfoPage.jsx
    main.jsx
  /styles
    styles.css
    dark-mode.css
  /utils
    photoStorage.js
    storiesUtils.js
    swipeNavigation.js (dacă folosești swipe)
  /icons   # SVG icon set, minimalist, outline (Tabler/Phosphor)
README.md
public/
  index.html
  Front.jpg



# Wedding App - Modern Instagram-Inspired PWA

## Descriere generală
Aplicație PWA pentru nuntă cu design "minimal, elegant, modern" inspirat de Instagram & Apple iOS, cu story-uri automate pe ore, galerie grid și uploading ultrarapid.

### Features

- Pagini principale: Home, Galerie, Cameră, Info (navigare swipe sau meniu jos)
- **Countdown** modern AMR (timp rămas, stil dinamic color)
- **Stories** automatizate pe oră, preview foto (rotund, edge-to-edge, inel “new”)
- **Viewer & Galerie:** edge-to-edge, swipe între poze, reacții like/double-tap+anim, comentarii vizibile jos, swipe down pentru exit
- **Floating Camera Button:** animat, efect “grow”, deschide camera page tip modal, nu face redirect după poză
- **Uploading background + toast feedback** (nu blochează pagina)
- **Pin Rate Limit:** Max 5/poza, feedback vizual mic, discret
- **Minimal SVG Icons:** Only outline, adaptate la fundal, inspirat Instagram/Apple HIG
- **Personalizare:** Dark/Light mode automat, toggle rapid
- **User Gallery:** opțional, filtrezi să vezi doar ce ai încărcat TU (deviceId)
- **All elements rounded:** corners 12-28px, nici un dropt shadow brusc
- **All text clarity:** Inter/SF Pro 400-600, whitespace generos
- **All toasts, popups, alert:** minimal, text mic, shadow, fără fundal pătrat

### Structura foldere:

/src/components/ - toate componentele principale  
/src/pages/ - fiecare pagină  
/src/assets/ - svg, poze, logo  
/src/styles/ - css/light & css/dark  
/src/utils/ - logică storage/local/user/swipe etc.  
README.md  
vite.config.js  
package.json

### Stacks & librării:
- React 18+
- Vite
- react-router
- imgBB API
- react-swipeable-views (navigation)
- minimalist icon set (Tabler/Phosphor)
- CSS custom props for theming

### 📸 Camera Usage
  - Poți face poze nelimitat, uploading în fundal
  - Poți adăuga reacții/like/comentarii pe fiecare (double tap like)
  - Preview/story - swipe între poze și între story-urile orare

### 🟡 Design
- White-space & light pastel (inspirat de Instagram/Apple)
- All corners rounded, buttons/text only, minimal SVG-only icons
- Dark mode on/off, accent pastel (gold/pink)
- Fără backgrounduri solide sub toast/informari
- Scris clar, modern (Inter/SF Pro), feedback subtil

### 🟢 Implementare rapidă:
- Clonează repo
- Rulează:  
   `npm i`  
   `npm run dev`
- Pentru build:  
   `npm run build`

---

# 📦 REZUMAT FINAL TOT CE S-AU FĂCUT

**Tot ce ai acoperit în acest proiect:**
- Story-uri edge-to-edge pe ore cu preview foto
- Viewer real, swipe left/right intra-story, up/down pentru exit
- Pinul pentru poze cu limitare per poză + feedback vizual fin
- Floating Camera Button animat, cu efect + modal slide
- Galerie grid 3x3 edge-to-edge + preview/like/comment
- Upload poze în fundal + toast minimal de feedback
- Double-tap like, reacții în thumbnail
- Stil Iconițe SVG outline only pe tot design-ul
- White-space peste tot, colors pastel/dark + toggle rapid
- Teme: dark/light, alegere din interfață
- Navigare swipe sau meniu bottom
- Toate animările subtile ca pe Instagram
- Responsive & mobile-first, layout fluid, fără margini dure
- README complet cu flow și structură + best practices modern
- Documentație la zi, ușor de continuat/dezvoltat, testabil ușor

---

### 📚 Design best practices & surse de inspirație:
- [Modern Minimal UI Style][2] | [Minimalist UI Principles][5] | [Dark mode best practices][9][12][15][18][21]
- [Instagram latest UX](https://app.assembo.ai/blogs/instagram-story-ui)[4], [UI Design Inspiration 2025][6]

---

**Dacă ai orice problemă la deploy/code, șterge orice comentarii "de ghid" rămase în cod, folosește doar componente JSX/React fără text de explicații!**

**Mult SUCCES! Ai o aplicație cu design ultra-modern, vândabilă, la nivel internațional! 🚀**













# Invitatie_online — PWA (demo)

Am adăugat în repository butoanele și logica pentru:
- trimitere mesaje WhatsApp predefinite (două butoane),
- deschidere link Google Maps (3 butoane, completează `mapsUrl` în `public/buttons.json`),
- adăugare eveniment în Google Calendar (buton pentru 18 aprilie 2026).

Ce trebuie să faci tu rapid:
1. Deschide `public/buttons.json` și înlocuiește `+40XXXXXXXXX` cu numărul tău în format internațional (ex: `+40712345678`). Același număr va fi folosit pentru ambele butoane WhatsApp.
2. Completează `mapsUrl` pentru `map1`, `map2`, `map3` cu link-urile Google Maps (ex: `https://goo.gl/maps/...` sau `https://www.google.com/maps/place/...`).
3. Dacă vrei alt titlu/descripție pentru evenimentul de calendar, modifică câmpurile `title` și `details` pentru butonul `calendar`.

Cum testezi local:
- npm install
- npm run dev

După ce actualizezi `public/buttons.json` cu numărul și link-urile, spune-mi și pot:
- completa eu fișierul cu valorile exacte (dacă mi le trimiți aici), sau
- te ghidez cum să adaugi direct în GitHub (prin edit web UI).

---

Commit: "Add WhatsApp, Maps and Calendar buttons + actions"
