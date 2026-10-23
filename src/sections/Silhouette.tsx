// src/sections/Silhouette.tsx
import React from 'react';

export const Silhouette: React.FC = () => {
  return (
    <section
      id="architecture"
      style={{
        position: 'relative',
        width: '100vw',
        padding: '140px 6vw',
        backgroundColor: 'var(--color-obsidian)',
        borderTop: '1px solid rgba(212, 175, 55, 0.12)',
      }}
    >
      <div style={{ maxWidth: '1380px', margin: '0 auto', width: '100%' }}>
        {/* Section Header */}
        <div style={{ marginBottom: '80px', maxWidth: '820px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px' }}>
            <span style={{ width: '32px', height: '1px', backgroundColor: 'var(--color-champagne)' }} />
            <span
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.74rem',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: 'var(--color-champagne)',
                fontWeight: 600,
              }}
            >
              01 / ARCHITECTURAL MONOLITH
            </span>
          </div>

          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(3.2rem, 5.8vw, 5.8rem)',
              fontWeight: 300,
              lineHeight: 0.98,
              letterSpacing: '-0.025em',
              color: 'var(--color-stone)',
            }}
          >
            One turn. Ninety degrees. <br />
            <span style={{ fontStyle: 'italic', color: 'var(--color-champagne-light)' }}>
              Every residence owns a different horizon.
            </span>
          </h2>

          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '1.05rem',
              lineHeight: 1.8,
              color: 'var(--color-mist)',
              fontWeight: 300,
              marginTop: '24px',
            }}
          >
            Shikhara translates ancient geometry into fluid aerodynamic engineering.
            As the structural core ascends, floor plates shift continuously, sculpting
            a torque that gently diffuses marine gales while unlocking uninhibited
            360-degree panoramas of Mumbai harbor and the open Arabian Sea.
          </p>
        </div>

        {/* Asymmetric Dual Editorial Imagery (Belgrade Arbor / Loam House Style) */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: '40px',
            alignItems: 'center',
            marginBottom: '72px',
          }}
        >
          {/* Main Large Facade Photo (Cols 1 to 7) */}
          <div
            style={{
              gridColumn: 'span 7',
              height: '560px',
              borderRadius: '28px',
              overflow: 'hidden',
              position: 'relative',
              border: '1px solid rgba(212, 175, 55, 0.22)',
              boxShadow: '0 32px 80px rgba(0,0,0,0.7)',
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=90"
              alt="Shikhara Cantilevered Ocean Facade"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                filter: 'contrast(1.05) brightness(0.92)',
              }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: '24px',
                left: '24px',
                padding: '10px 18px',
                backgroundColor: 'rgba(8, 9, 10, 0.8)',
                backdropFilter: 'blur(16px)',
                border: '1px solid rgba(212, 175, 55, 0.25)',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.68rem',
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: 'var(--color-stone)',
              }}
            >
              Cantilevered Ocean Terraces · Marine Grade Facade
            </div>
          </div>

          {/* Secondary Editorial Detail Photo (Cols 8 to 12) */}
          <div
            style={{
              gridColumn: 'span 5',
              height: '480px',
              borderRadius: '28px',
              overflow: 'hidden',
              position: 'relative',
              border: '1px solid rgba(212, 175, 55, 0.22)',
              boxShadow: '0 32px 80px rgba(0,0,0,0.7)',
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=90"
              alt="Artisanal Travertine & Bronze Details"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                filter: 'contrast(1.06) brightness(0.9)',
              }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: '24px',
                left: '24px',
                padding: '10px 18px',
                backgroundColor: 'rgba(8, 9, 10, 0.8)',
                backdropFilter: 'blur(16px)',
                border: '1px solid rgba(212, 175, 55, 0.25)',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.68rem',
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: 'var(--color-stone)',
              }}
            >
              Honed Travertine · Fluted Bronze Accents
            </div>
          </div>
        </div>

        {/* 3 Materiality & Engineering Pillars (Pure Luxury - ZERO Cheap Numbers!) */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '36px',
            borderTop: '1px solid rgba(212, 175, 55, 0.16)',
            paddingTop: '48px',
          }}
        >
          {[
            {
              tag: 'STRUCTURAL ARTISTRY',
              title: 'Torque Engineering',
              desc: 'Each floor rotates precisely 1.875 degrees around a central reinforced core, creating a continuous organic spiral that naturally diffuses coastal wind shears.',
            },
            {
              tag: 'ARTISANAL FINISHES',
              title: 'Marine Travertine & Bronze',
              desc: 'Curated exterior slabs crafted from monolithic Roman travertine, accentuated by custom-extruded fluted bronze louvers resilient against saline sea air.',
            },
            {
              tag: 'ENVIRONMENTAL DESIGN',
              title: 'Floor-to-Ceiling Acoustic Glazing',
              desc: 'High-performance acoustic double-glazing with integrated thermal micro-shading, ensuring absolute acoustic stillness while framing panoramic marine horizons.',
            },
          ].map((pillar) => (
            <div key={pillar.title} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <span
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.66rem',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: 'var(--color-champagne)',
                  fontWeight: 600,
                }}
              >
                {pillar.tag}
              </span>
              <h3
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.65rem',
                  color: 'var(--color-stone)',
                  fontWeight: 300,
                  letterSpacing: '0.02em',
                }}
              >
                {pillar.title}
              </h3>
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.92rem',
                  lineHeight: 1.65,
                  color: 'var(--color-mist)',
                  fontWeight: 300,
                }}
              >
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Silhouette;