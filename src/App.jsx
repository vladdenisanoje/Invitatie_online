import React from 'react';
import ButtonGrid from './components/ButtonGrid';
import Countdown from './components/Countdown';
import useConfig from './hooks/useConfig';

export default function App() {
  const config = useConfig('/buttons.json');

  return (
    <div className="container">
      <div className="topbar">Invitație Online</div>
      
      {/* Countdown Timer */}
      <Countdown targetDate="2026-04-18T00:00:00" />
      
      {/* Butoane WhatsApp, Maps, Calendar */}
      {!config ? (
        <div>Se încarcă...</div>
      ) : (
        <ButtonGrid groups={config.groups} />
      )}
    </div>
  );
}
