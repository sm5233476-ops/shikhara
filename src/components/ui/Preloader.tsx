// src/components/ui/Preloader.tsx
import React, { useEffect, useState } from 'react';

export const Preloader: React.FC = () => {
  const [percent, setPercent] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setPercent((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setIsFinished(true), 400);
          return 100;
        }
        return prev + 2;
      });
    }, 25);

    return () => clearInterval(timer);
  }, []);

  if (isFinished) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: '#08090A',
        zIndex: 99999,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '60px 6vw',
        transition: 'opacity 0.8s var(--ease-luxury), transform 0.8s var(--ease-luxury)',
        opacity: percent === 100 ? 0 : 1,
        pointerEvents: percent === 100 ? 'none' : 'auto',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '1.4rem',
            letterSpacing: '0.24em',
            color: 'var(--color-stone)',
          }}
        >
          SHIKHARA
        </span>
        <span
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.72rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'var(--color-champagne)',
          }}
        >
          Mumbai Sea Front
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <span
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '4.5rem',
              color: 'var(--color-stone)',
              fontWeight: 300,
              fontVariantNumeric: 'tabular-nums',
            }}
          >
            {percent}%
          </span>
          <span
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.74rem',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'var(--color-mist)',
            }}
          >
            Synthesizing Horizons
          </span>
        </div>

        {/* Thin Champagne Hairline Line Drawing 0 to 100% */}
        <div style={{ width: '100%', height: '1px', backgroundColor: 'rgba(212, 175, 55, 0.2)' }}>
          <div
            style={{
              width: `${percent}%`,
              height: '100%',
              backgroundColor: 'var(--color-champagne)',
              transition: 'width 0.05s linear',
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Preloader;