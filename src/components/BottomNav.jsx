import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function BottomNav() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="bottom-nav">
      <Link to="/" className={`nav-item ${isActive('/') ? 'active' : ''}`}>
        <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
          <polyline points="9 22 9 12 15 12 15 22"/>
        </svg>
        <span className="nav-label">Home</span>
      </Link>

      <Link to="/camera" className={`nav-item ${isActive('/camera') ? 'active' : ''}`}>
        <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
          <circle cx="12" cy="13" r="4"/>
        </svg>
        <span className="nav-label">Camera</span>
      </Link>

      <Link to="/gallery" className={`nav-item ${isActive('/gallery') ? 'active' : ''}`}>
        <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
          <circle cx="8.5" cy="8.5" r="1.5"/>
          <polyline points="21 15 16 10 5 21"/>
        </svg>
        <span className="nav-label">Galerie</span>
      </Link>

      <Link to="/info" className={`nav-item ${isActive('/info') ? 'active' : ''}`}>
        <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10"/>
          <line x1="12" y1="16" x2="12" y2="12"/>
          <line x1="12" y1="8" x2="12.01" y2="8"/>
        </svg>
        <span className="nav-label">Info</span>
      </Link>
    </div>
  );
}
