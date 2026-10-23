// src/sections/Hero.tsx
import React from 'react';

export const Hero: React.FC = () => {
  return (
    <section
      style={{
        position: 'relative',
        width: '100vw',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        padding: '0 6vw',
        overflow: 'hidden',
        backgroundColor: 'var(--color-obsidian)',
      }}
    >
      {/* Background Architectural Canvas (High-Res Luxury Mumbai Seafront Tower) */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '62vw',
          height: '100%',
          zIndex: 1,
        }}
      >
        <img
          src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=2400&q=95"
          alt="SHIKHARA Sky Residences Architecture"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center 35%',
            filter: 'contrast(1.08) brightness(0.85)',
          }}
        />

        {/* Cinematic Vignette Gradients */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(to right, #08090a 8%, rgba(8,9,10,0.65) 45%, transparent 85%), linear-gradient(to top, #08090a 5%, transparent 40%)',
          }}
        />
      </div>

      {/* Hero Content (Grid Columns 1-6) */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          maxWidth: '640px',
          display: 'flex',
          flexDirection: 'column',
          gap: '28px',
          marginTop: '60px',
        }}
      >
        {/* Eyebrow Label */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <span
            style={{
              width: '36px',
              height: '1px',
              backgroundColor: 'var(--color-champagne)',
            }}
          />
          <span
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.74rem',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'var(--color-champagne)',
              fontWeight: 500,
            }}
          >
            MUMBAI SEA FRONT · AN ICON REIMAGINED
          </span>
        </div>

        {/* Headline */}
        <h1
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(3.8rem, 7vw, 7.6rem)',
            fontWeight: 300,
            lineHeight: 0.94,
            letterSpacing: '-0.025em',
            color: 'var(--color-stone)',
          }}
        >
          Live above <br />
          <span
            style={{
              fontStyle: 'italic',
              fontWeight: 300,
              color: 'var(--color-champagne-light)',
            }}
          >
            everything.
          </span>
        </h1>

        {/* Editorial Subcopy */}
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'clamp(1rem, 1.25vw, 1.2rem)',
            lineHeight: 1.7,
            color: 'var(--color-mist)',
            maxWidth: '480px',
            fontWeight: 300,
          }}
        >
          A twisting monolith of 112 bespoke sky residences, rising 212 metres
          above the Arabian Sea. Where marine horizons meet timeless architecture.
        </p>

        {/* CTA & Architectural Specs */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '36px',
            marginTop: '16px',
            flexWrap: 'wrap',
          }}
        >
          <a href="#viewing" className="btn-luxury">
            Request Private Viewing
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </a>

          <div
            style={{
              display: 'flex',
              gap: '32px',
              borderLeft: '1px solid var(--color-hairline)',
              paddingLeft: '28px',
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '2rem',
                  color: 'var(--color-stone)',
                  lineHeight: 1,
                  fontWeight: 300,
                }}
              >
                90°
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.64rem',
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  color: 'var(--color-mist)',
                  marginTop: '5px',
                }}
              >
                Torque Twist
              </div>
            </div>

            <div>
              <div
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '2rem',
                  color: 'var(--color-stone)',
                  lineHeight: 1,
                  fontWeight: 300,
                }}
              >
                212<span style={{ fontSize: '1.2rem' }}>m</span>
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.64rem',
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  color: 'var(--color-mist)',
                  marginTop: '5px',
                }}
              >
                Arabian Peak
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Architectural Badge (Bottom Right) */}
      <div
        style={{
          position: 'absolute',
          bottom: '40px',
          right: '6vw',
          zIndex: 10,
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          padding: '12px 20px',
          backgroundColor: 'rgba(16, 18, 22, 0.65)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(212, 175, 55, 0.2)',
        }}
        className="desktop-only"
      >
        <span
          style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            backgroundColor: '#2ecc71',
            boxShadow: '0 0 12px #2ecc71',
          }}
        />
        <span
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.7rem',
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: 'var(--color-stone)',
          }}
        >
          Private Viewings Open · Q4 2026
        </span>
      </div>
    </section>
  );
};

export default Hero;