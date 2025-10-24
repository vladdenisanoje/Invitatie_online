import React, { useState, useEffect } from 'react';

export default function Countdown({ targetDate }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const target = new Date(targetDate).getTime();
      const now = new Date().getTime();
      const difference = target - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="countdown">
      <h2 className="countdown-title">💑 Ne Vedem în</h2>
      
      <div className="countdown-container">
        <div className="countdown-unit">
          <div className="countdown-value">{String(timeLeft.days).padStart(2, '0')}</div>
          <div className="countdown-label">Zile</div>
        </div>

        <div className="countdown-separator">:</div>

        <div className="countdown-unit">
          <div className="countdown-value">{String(timeLeft.hours).padStart(2, '0')}</div>
          <div className="countdown-label">Ore</div>
        </div>

        <div className="countdown-separator">:</div>

        <div className="countdown-unit">
          <div className="countdown-value">{String(timeLeft.minutes).padStart(2, '0')}</div>
          <div className="countdown-label">Min</div>
        </div>

        <div className="countdown-separator">:</div>

        <div className="countdown-unit">
          <div className="countdown-value seconds-unit">{String(timeLeft.seconds).padStart(2, '0')}</div>
          <div className="countdown-label">Sec</div>
        </div>
      </div>

      <p className="countdown-subtitle">18 Aprilie 2026</p>
    </div>
  );
}
