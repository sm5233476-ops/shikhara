// src/components/ui/DevPanel.tsx
import React, { useState, useEffect } from 'react';
import { useStore } from '../../store/useStore';
import type { QualityTier } from '../../store/useStore';

export const DevPanel: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const timeOfDay = useStore((state) => state.timeOfDay);
  const setTimeOfDay = useStore((state) => state.setTimeOfDay);
  const quality = useStore((state) => state.quality);
  const setQuality = useStore((state) => state.setQuality);
  const activeSection = useStore((state) => state.activeSection);
  const scrollProgress = useStore((state) => state.scrollProgress);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'd' || e.key === 'D') {
        if (
          document.activeElement?.tagName !== 'INPUT' &&
          document.activeElement?.tagName !== 'TEXTAREA'
        ) {
          setIsOpen((prev) => !prev);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      {/* Floating Toggle Pill */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        style={{
          position: 'fixed',
          bottom: '1.5rem',
          right: '1.5rem',
          zIndex: 80,
          background: 'rgba(11, 12, 14, 0.85)',
          border: '1px solid rgba(201, 169, 106, 0.3)',
          color: '#C9A96A',
          fontFamily: 'var(--font-sans)',
          fontSize: '0.7rem',
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          padding: '0.5rem 1rem',
          borderRadius: '999px',
          cursor: 'pointer',
          backdropFilter: 'blur(10px)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
        }}
      >
        <span
          style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            backgroundColor: isOpen ? '#68D391' : '#C9A96A',
          }}
        />
        {isOpen ? 'Close Dev' : 'Dev [D]'}
      </button>

      {/* Floating Overlay Modal */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            bottom: '4.5rem',
            right: '1.5rem',
            width: '320px',
            background: 'rgba(11, 12, 14, 0.94)',
            backdropFilter: 'blur(24px)',
            border: '1px solid rgba(201, 169, 106, 0.35)',
            borderRadius: '4px',
            padding: '1.5rem',
            zIndex: 90,
            boxShadow: '0 20px 40px rgba(0,0,0,0.7)',
            fontFamily: 'var(--font-sans)',
            color: '#E9E3D8',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottom: '1px solid rgba(233, 227, 216, 0.1)',
              paddingBottom: '0.75rem',
              marginBottom: '1.25rem',
            }}
          >
            <span style={{ fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C9A96A' }}>
              Engine Diagnostics
            </span>
            <span style={{ fontSize: '0.65rem', color: '#9BA3A8' }}>Press D to toggle</span>
          </div>

          {/* Time of Day Controller */}
          <div style={{ marginBottom: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '0.4rem' }}>
              <span style={{ color: '#9BA3A8' }}>Solar Cycle (Time)</span>
              <span style={{ fontVariantNumeric: 'tabular-nums', color: '#C9A96A' }}>
                {timeOfDay.toFixed(2)}
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={timeOfDay}
              onChange={(e) => setTimeOfDay(parseFloat(e.target.value))}
              style={{
                width: '100%',
                accentColor: '#C9A96A',
                cursor: 'pointer',
              }}
            />
          </div>

          {/* Quality Tier Selector */}
          <div style={{ marginBottom: '1.25rem' }}>
            <span style={{ display: 'block', fontSize: '0.75rem', color: '#9BA3A8', marginBottom: '0.4rem' }}>
              Render Quality
            </span>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.5rem' }}>
              {(['low', 'medium', 'high'] as QualityTier[]).map((tier) => (
                <button
                  key={tier}
                  onClick={() => setQuality(tier)}
                  style={{
                    padding: '0.4rem 0.2rem',
                    background: quality === tier ? '#C9A96A' : 'rgba(233, 227, 216, 0.05)',
                    color: quality === tier ? '#0B0C0E' : '#E9E3D8',
                    border: '1px solid',
                    borderColor: quality === tier ? '#C9A96A' : 'rgba(233, 227, 216, 0.12)',
                    fontSize: '0.68rem',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    borderRadius: '2px',
                    fontWeight: quality === tier ? 600 : 400,
                  }}
                >
                  {tier}
                </button>
              ))}
            </div>
          </div>

          {/* Diagnostics Readouts */}
          <div
            style={{
              paddingTop: '0.75rem',
              borderTop: '1px solid rgba(233, 227, 216, 0.1)',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.4rem',
              fontSize: '0.72rem',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#9BA3A8' }}>Active Section</span>
              <span style={{ color: '#E9E3D8' }}>Index {activeSection}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#9BA3A8' }}>Scroll Progress</span>
              <span style={{ fontVariantNumeric: 'tabular-nums', color: '#E9E3D8' }}>
                {(scrollProgress * 100).toFixed(1)}%
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};