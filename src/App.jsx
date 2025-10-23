import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CameraPage from './pages/CameraPage';
import GalleryPage from './pages/GalleryPage';
import InfoPage from './pages/InfoPage';
import BottomNav from './components/BottomNav';
import ToastContainer from './components/ToastContainer';


export default function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/camera" element={<CameraPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/info" element={<InfoPage />} />
        </Routes>
        
        <BottomNav />
        
        <ToastContainer />
        
      </div>
    </BrowserRouter>
  );
}
