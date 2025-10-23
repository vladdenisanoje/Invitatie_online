import React, { useState, useEffect } from 'react';
import Toast from './Toast';

let toastId = 0;
const toastCallbacks = [];

export function showToast(message, type = 'info') {
  toastCallbacks.forEach(callback => callback(message, type));
}

export default function ToastContainer() {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    const callback = (message, type) => {
      const id = toastId++;
      setToasts(prev => [...prev, { id, message, type }]);
    };
    
    toastCallbacks.push(callback);
    
    return () => {
      const index = toastCallbacks.indexOf(callback);
      if (index > -1) toastCallbacks.splice(index, 1);
    };
  }, []);

  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  return (
    <div className="toast-container">
      {toasts.map(toast => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>
  );
}
