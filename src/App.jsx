import React from 'react';
import ButtonGrid from './components/ButtonGrid';
import useConfig from './hooks/useConfig';

export default function App() {
  const config = useConfig('/buttons.json');

  return (
    <div className="app">
      <header className="topbar">PWA Mobile Demo</header>
      <main>
        {config ? <ButtonGrid groups={config.groups} /> : <p>Se încarcă...</p>}
      </main>
    </div>
  );
}