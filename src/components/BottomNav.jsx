import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function BottomNav() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="bottom-nav">
      <Link to="/" className={`nav-item ${isActive('/') ? 'active' : ''}`}>
        <img src="/icon-home.svg" alt="Home" className="nav-icon" />
        <span className="nav-label">Home</span>
      </Link>

      <Link to="/camera" className={`nav-item ${isActive('/camera') ? 'active' : ''}`}>
        <img src="/icon-camera.svg" alt="Camera" className="nav-icon" />
        <span className="nav-label">Camera</span>
      </Link>

      <Link to="/gallery" className={`nav-item ${isActive('/gallery') ? 'active' : ''}`}>
        <img src="/icon-galerie.svg" alt="Galerie" className="nav-icon" />
        <span className="nav-label">Galerie</span>
      </Link>

      <Link to="/info" className={`nav-item ${isActive('/info') ? 'active' : ''}`}>
        <img src="/icon-info.svg" alt="Info" className="nav-icon" />
        <span className="nav-label">Info</span>
      </Link>
    </div>
  );
}




/*import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function BottomNav() {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <nav className="bottom-nav">
      <Link to="/" className={`nav-item ${isActive('/')}`}>
        <span className="nav-icon">🏠</span>
        <span className="nav-label">Acasă</span>
      </Link>

      <Link to="/camera" className={`nav-item ${isActive('/camera')}`}>
        <span className="nav-icon">📸</span>
        <span className="nav-label">Camera</span>
      </Link>

      <Link to="/gallery" className={`nav-item ${isActive('/gallery')}`}>
        <span className="nav-icon">🖼️</span>
        <span className="nav-label">Galerie</span>
      </Link>

      <Link to="/info" className={`nav-item ${isActive('/info')}`}>
        <span className="nav-icon">ℹ️</span>
        <span className="nav-label">Info</span>
      </Link>
    </nav>
  );
}
*/
