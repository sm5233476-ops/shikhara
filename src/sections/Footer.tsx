// src/sections/Footer.tsx
import React from 'react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      style={{
        position: 'relative',
        width: '100vw',
        backgroundColor: '#050607',
        borderTop: '1px solid rgba(212, 175, 55, 0.15)',
        padding: '100px 6vw 48px',
      }}
    >
      {/* Centered Luxury Wrapper (Matches All Sections Perfectly) */}
      <div style={{ maxWidth: '1380px', margin: '0 auto', width: '100%' }}>
        {/* Main Footer Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: '48px',
            paddingBottom: '80px',
            borderBottom: '1px solid rgba(212, 175, 55, 0.12)',
          }}
        >
          {/* Brand Column (Cols 1 to 5) */}
          <div style={{ gridColumn: 'span 5', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <span
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.8rem',
                letterSpacing: '0.22em',
                color: 'var(--color-stone)',
                fontWeight: 300,
                lineHeight: 1,
              }}
            >
              SHIKHARA
            </span>
            <span
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.68rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--color-champagne)',
                fontWeight: 600,
              }}
            >
              SKY RESIDENCES · MUMBAI SEA FRONT
            </span>
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.92rem',
                lineHeight: 1.7,
                color: 'var(--color-mist)',
                maxWidth: '440px',
                fontWeight: 300,
                marginTop: '8px',
              }}
            >
              A landmark architectural acquisition on the Arabian promontory. 112
              limited-edition sky mansions designed for multi-generational permanence.
            </p>
          </div>

          {/* Coordinates & Location (Cols 6 to 8) */}
          <div style={{ gridColumn: 'span 3', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <span
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.7rem',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'var(--color-mist)',
                fontWeight: 600,
              }}
            >
              Site Coordinates
            </span>
            <div
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.25rem',
                color: 'var(--color-stone)',
                lineHeight: 1.5,
              }}
            >
              18° 55' 19.2" N <br />
              72° 50' 04.5" E
            </div>
            <span
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.78rem',
                color: 'var(--color-champagne)',
                marginTop: '4px',
              }}
            >
              Arabian Sea Promontory · Colaba Coast
            </span>
          </div>

          {/* Development Profile (Cols 9 to 12) */}
          <div style={{ gridColumn: 'span 4', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <span
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.7rem',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'var(--color-mist)',
                fontWeight: 600,
              }}
            >
              Development Profile
            </span>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.88rem',
                color: 'var(--color-mist)',
                fontWeight: 300,
              }}
            >
              <div>Structural Peak: <span style={{ color: 'var(--color-stone)' }}>212 Metres Elevation</span></div>
              <div>Habitable Floors: <span style={{ color: 'var(--color-stone)' }}>48 Levels</span></div>
              <div>Torque Rate: <span style={{ color: 'var(--color-stone)' }}>1.875° / Level (90° Total)</span></div>
              <div>Residences: <span style={{ color: 'var(--color-stone)' }}>112 Freehold Sky Estates</span></div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Legal Disclaimers & Smooth Back to Top */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: '36px',
            flexWrap: 'wrap',
            gap: '20px',
          }}
        >
          <div
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.72rem',
              color: 'var(--color-mist)',
              letterSpacing: '0.06em',
            }}
          >
            © 2026 SHIKHARA ARCHITECTURAL CONCEPT. ALL RIGHTS RESERVED. · MAHA-RERA REG. NO. P51900084920
          </div>

          <button
            onClick={scrollToTop}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              background: 'none',
              border: 'none',
              color: 'var(--color-champagne)',
              fontFamily: 'var(--font-sans)',
              fontSize: '0.74rem',
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              padding: '6px 0',
              borderBottom: '1px solid var(--color-champagne)',
            }}
          >
            Back to Summit ↑
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;