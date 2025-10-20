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
      // Emulează click pe input (input e în App sau în layout)
      window.dispatchEvent(new CustomEvent('open-file-picker'));
      break;
    }
    case 'timer':
      window.dispatchEvent(new CustomEvent('toggle-timer'));
      break;
    default:
      console.warn('Tip acțiune necunoscut', btn.type);
  }
}