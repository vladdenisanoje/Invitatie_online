import { useEffect, useState } from 'react';

export default function useConfig(url) {
  const [cfg, setCfg] = useState(null);
  useEffect(() => {
    let mounted = true;
    fetch(url)
      .then(r => r.json())
      .then(j => { if (mounted) setCfg(j); })
      .catch(() => { if (mounted) setCfg(null); });
    return () => { mounted = false; };
  }, [url]);
  return cfg;
}