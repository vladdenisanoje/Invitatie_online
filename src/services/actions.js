export async function doAction(btn) {
  switch (btn.type) {
    case 'api': {
      const res = await fetch(btn.action);
      if (!res.ok) throw new Error('API error');
      const data = await res.json();
      alert('Răspuns: ' + JSON.stringify(data));
      break;
    }
    case 'modal':
      window.dispatchEvent(new CustomEvent('open-modal', { detail: btn.action }));
      break;
    case 'toggle':
      document.body.classList.toggle('dark');
      break;
    case 'clipboard':
      await navigator.clipboard.writeText(btn.action || '');
      alert('Text copiat!');
      break;
    case 'file': {
      window.dispatchEvent(new CustomEvent('open-file-picker'));
      break;
    }
    case 'timer':
      window.dispatchEvent(new CustomEvent('toggle-timer'));
      break;
    case 'whatsapp': {
      // phone expected in international format, e.g. +407XXXXXXXX
      const phoneRaw = btn.phone || btn.action || '';
      const phone = phoneRaw.replace(/\D/g, '');
      const text = encodeURIComponent(btn.message || '');
      if (!phone) {
        alert('Numar de telefon WhatsApp necompletat. Editeaza public/buttons.json pentru a adauga un numar.');
        return;
      }
      const url = `https://wa.me/${phone}?text=${text}`;
      window.open(url, '_blank');
      break;
    }
    case 'maps': {
      const url = btn.mapsUrl || btn.action || ''; 
      if (!url) {
        alert('Link Google Maps necompletat. Editeaza public/buttons.json pentru a adauga mapsUrl.');
        return;
      }
      // Open maps link in new tab (mobile will open app if available)
      window.open(url, '_blank');
      break;
    }
    case 'calendar': {
      // Create Google Calendar create event url. For all-day events we use YYYYMMDD/YYYYMMDD (end must be next day)
      const title = encodeURIComponent(btn.title || 'Eveniment');
      const details = encodeURIComponent(btn.details || '');
      const location = encodeURIComponent(btn.location || '');
      // parse start/end
      function toGoogleDate(d) {
        // input 'YYYY-MM-DD' -> 'YYYYMMDD'
        return d.replace(/-/g, '');
      }
      const start = btn.start || '';
      const end = btn.end || btn.start || '';
      if (!start) {
        alert('Data evenimentului nu este setata. Editeaza public/buttons.json');
        return;
      }
      // For all-day, end must be next day. Compute next day if start==end
      const s = new Date(start + 'T00:00:00');
      let e = new Date(end + 'T00:00:00');
      if (s.getTime() === e.getTime()) {
        e = new Date(e.getTime() + 24 * 60 * 60 * 1000);
      }
      const startStr = s.toISOString().slice(0,10).replace(/-/g,'');
      const endStr = e.toISOString().slice(0,10).replace(/-/g,'');
      const dates = `${startStr}/${endStr}`;
      const url = `https://www.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}&sf=true&output=xml`;
      window.open(url, '_blank');
      break;
    }
    default:
      console.warn('Tip acțiune necunoscut', btn.type);
  }
}