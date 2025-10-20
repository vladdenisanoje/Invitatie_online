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