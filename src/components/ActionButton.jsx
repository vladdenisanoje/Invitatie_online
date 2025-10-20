import React, { useState } from 'react';
import { doAction } from '../services/actions';

export default function ActionButton({ config }) {
  const [loading, setLoading] = useState(false);

  async function onClick() {
    setLoading(true);
    try {
      await doAction(config);
    } catch (e) {
      alert('Eroare: ' + (e.message || e));
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      className="action-btn"
      onClick={onClick}
      aria-label={config.label}
      disabled={loading}
    >
      <span>{config.label}</span>
      {loading && <span className="loader">…</span>}
    </button>
  );
}