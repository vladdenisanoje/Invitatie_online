import React from 'react';
import ActionButton from './ActionButton';

export default function ButtonGrid({ groups }) {
  return (
    <div className="container">
      {groups.map(g => (
        <section key={g.id}>
          <h3>{g.title}</h3>
          <div className="grid">
            {g.buttons.map(b => <ActionButton key={b.id} config={b} />)}
          </div>
        </section>
      ))}
    </div>
  );
}