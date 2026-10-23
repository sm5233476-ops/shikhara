// src/sections/Residences.tsx
import React, { useState } from 'react';

interface EstateData {
  id: string;
  category: string;
  name: string;
  subtitle: string;
  area: string;
  specs: string;
  description: string;
  highlights: string[];
  image: string;
  blueprint: string;
}

const ESTATES: EstateData[] = [
  {
    id: 'penthouse',
    category: 'THE ICONIC TRIPLEX',
    name: 'The Crown Penthouse',
    subtitle: 'Suspended Above The Arabian Sea',
    area: '7,800 SQ FT',
    specs: '5 Bedrooms · 6.5 Bathrooms · Private Helipad Access',
    description:
      'The definitive summit of Mumbai residential architecture. Featuring 24-foot double-volume ceilings framed in monolithic Roman travertine, a private 18-metre heated cantilevered sky plunge pool, and dedicated biometric express elevator direct to private foyer.',
    highlights: [
      'Private 18m Heated Cantilevered Plunge Pool',
      'Direct Rooftop Helipad & Sky Observatory Access',
      'Monolithic Roman Travertine & Fluted Architectural Bronze',
      'Uninterrupted 360-Degree Marine Ocean Horizon',
    ],
    image:
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1800&q=95',
    blueprint:
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1800&q=95',
  },
  {
    id: 'villa',
    category: 'FULL-FLOOR SKY MANSION',
    name: 'The Sunset Villa',
    subtitle: 'Curated For Seamless Entertaining',
    area: '3,400 SQ FT',
    specs: '4 Bedrooms · 4.5 Bathrooms · Wraparound Ocean Deck',
    description:
      'An expansive single-level sanctuary engineered to capture the golden setting sun. Features a 180-degree teakwood wraparound terrace, custom Poliform chef kitchen with honed Calacatta marble, and a freestanding sculpted soaking tub looking out over the bay.',
    highlights: [
      '11-Foot Finished Floor-to-Ceiling Acoustic Glazing',
      'Continuous Wraparound Teakwood Ocean Deck',
      'Custom Poliform Kitchen with Honed Calacatta Marble',
      'Separate Dedicated Staff Suites & Private Service Foyer',
    ],
    image:
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1800&q=95',
    blueprint:
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1800&q=95',
  },
  {
    id: 'home',
    category: 'CORNER PANORAMIC RESIDENCE',
    name: 'The Ocean Horizon',
    subtitle: 'Morning Light & Historic Harbor Panoramas',
    area: '2,150 SQ FT',
    specs: '3 Bedrooms · 3.5 Bathrooms · Deep Shaded Balconies',
    description:
      'A refined multi-aspect residence orienting living galleries toward both the open western sea and the historic South Mumbai colonial promontory. Finished with French white oak plank floors and smart architectural climate automation.',
    highlights: [
      'Multi-Aspect Living Gallery with High Natural Airflow',
      'Engineered French White Oak Flooring Throughout',
      'Marine-Grade Deep Bronze Shading Louvers',
      'Smart Integrated Climate & Acoustic Management',
    ],
    image:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=95',
    blueprint:
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1800&q=95',
  },
];

export const Residences: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [viewMode, setViewMode] = useState<'render' | 'blueprint'>('render');
  const activeEstate = ESTATES[activeIdx];

  return (
    <section
      id="residences"
      style={{
        position: 'relative',
        width: '100vw',
        minHeight: '120vh',
        backgroundColor: 'var(--color-obsidian)',
        padding: '140px 6vw',
        borderTop: '1px solid rgba(212, 175, 55, 0.12)',
        overflow: 'hidden',
      }}
    >
      <div style={{ maxWidth: '1380px', margin: '0 auto', width: '100%' }}>
        {/* Editorial Section Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            marginBottom: '64px',
            flexWrap: 'wrap',
            gap: '24px',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '14px' }}>
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
                04 / BESPOKE RESIDENTIAL PORTFOLIO
              </span>
            </div>

            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(3.4rem, 5.5vw, 5.8rem)',
                fontWeight: 300,
                lineHeight: 0.96,
                letterSpacing: '-0.025em',
                color: 'var(--color-stone)',
              }}
            >
              Sculpted for <br />
              <span style={{ fontStyle: 'italic', color: 'var(--color-champagne-light)' }}>
                permanence.
              </span>
            </h2>
          </div>

          {/* Interactive Navigation Switcher (Previous / Next / Estate Selector) */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            {ESTATES.map((est, i) => (
              <button
                key={est.id}
                onClick={() => {
                  setActiveIdx(i);
                  setViewMode('render');
                }}
                style={{
                  padding: '14px 22px',
                  backgroundColor: activeIdx === i ? 'var(--color-champagne)' : 'rgba(16, 18, 22, 0.75)',
                  color: activeIdx === i ? '#08090a' : 'var(--color-stone)',
                  border: activeIdx === i ? '1px solid var(--color-champagne)' : '1px solid rgba(212, 175, 55, 0.2)',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.72rem',
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                  cursor: 'pointer',
                  borderRadius: '100px', // Ultra-luxury pill buttons
                  transition: 'all 0.35s var(--ease-luxury)',
                }}
              >
                {est.name}
              </button>
            ))}
          </div>
        </div>

        {/* Master Showcase: Monumental 12-Column Cinematic Layout */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: '48px',
            backgroundColor: 'rgba(16, 18, 22, 0.75)',
            border: '1px solid rgba(212, 175, 55, 0.22)',
            borderRadius: '32px',
            padding: '56px',
            alignItems: 'center',
            boxShadow: '0 40px 100px rgba(0,0,0,0.8)',
          }}
        >
          {/* Left Narrative & Specs (Cols 1 to 5) */}
          <div style={{ gridColumn: 'span 5', display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <span
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.72rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'var(--color-champagne)',
                  fontWeight: 600,
                }}
              >
                {activeEstate.category}
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.4rem',
                  color: 'var(--color-stone)',
                }}
              >
                {activeEstate.area}
              </span>
            </div>

            <h3
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2.4rem, 3.8vw, 3.4rem)',
                color: 'var(--color-stone)',
                fontWeight: 300,
                lineHeight: 1.05,
              }}
            >
              {activeEstate.name}
            </h3>

            <div
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.15rem',
                fontStyle: 'italic',
                color: 'var(--color-champagne-light)',
              }}
            >
              {activeEstate.subtitle}
            </div>

            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.94rem',
                lineHeight: 1.7,
                color: 'var(--color-mist)',
                fontWeight: 300,
              }}
            >
              {activeEstate.description}
            </p>

            {/* Highlights List */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                borderTop: '1px solid rgba(212, 175, 55, 0.16)',
                paddingTop: '20px',
              }}
            >
              {activeEstate.highlights.map((h, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span
                    style={{
                      width: '5px',
                      height: '5px',
                      backgroundColor: 'var(--color-champagne)',
                      borderRadius: '50%',
                    }}
                  />
                  <span
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.86rem',
                      color: 'var(--color-stone)',
                      opacity: 0.9,
                    }}
                  >
                    {h}
                  </span>
                </div>
              ))}
            </div>

            <div style={{ marginTop: '16px' }}>
              <a href="#viewing" className="btn-luxury">
                Request Private Floor Dossier
              </a>
            </div>
          </div>

          {/* Right Cinema Photo / Technical Blueprint (Cols 6 to 12) */}
          <div
            style={{
              gridColumn: 'span 7',
              height: '580px',
              borderRadius: '24px',
              overflow: 'hidden',
              position: 'relative',
              border: '1px solid rgba(212, 175, 55, 0.25)',
            }}
          >
            {/* View Mode Toggle (Gallery vs Technical Blueprint) */}
            <div
              style={{
                position: 'absolute',
                top: '24px',
                right: '24px',
                zIndex: 10,
                display: 'flex',
                gap: '8px',
                backgroundColor: 'rgba(8, 9, 10, 0.85)',
                backdropFilter: 'blur(16px)',
                padding: '6px',
                borderRadius: '100px',
                border: '1px solid rgba(212, 175, 55, 0.25)',
              }}
            >
              <button
                onClick={() => setViewMode('render')}
                style={{
                  background: viewMode === 'render' ? 'var(--color-champagne)' : 'transparent',
                  color: viewMode === 'render' ? '#08090a' : 'var(--color-stone)',
                  border: 'none',
                  padding: '8px 18px',
                  borderRadius: '100px',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.68rem',
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                }}
              >
                Interior Render
              </button>
              <button
                onClick={() => setViewMode('blueprint')}
                style={{
                  background: viewMode === 'blueprint' ? 'var(--color-champagne)' : 'transparent',
                  color: viewMode === 'blueprint' ? '#08090a' : 'var(--color-stone)',
                  border: 'none',
                  padding: '8px 18px',
                  borderRadius: '100px',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.68rem',
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                }}
              >
                CAD Blueprint
              </button>
            </div>

            <img
              key={`${activeEstate.id}-${viewMode}`}
              src={viewMode === 'render' ? activeEstate.image : activeEstate.blueprint}
              alt={activeEstate.name}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                filter:
                  viewMode === 'blueprint'
                    ? 'contrast(1.3) grayscale(0.8) invert(0.15)'
                    : 'contrast(1.06) brightness(0.92)',
                transition: 'transform 1.2s var(--ease-luxury)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.04)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
              }}
            />

            {/* Bottom Specs Badge */}
            <div
              style={{
                position: 'absolute',
                bottom: '24px',
                left: '24px',
                right: '24px',
                padding: '14px 22px',
                backgroundColor: 'rgba(8, 9, 10, 0.82)',
                backdropFilter: 'blur(16px)',
                borderRadius: '16px',
                border: '1px solid rgba(212, 175, 55, 0.3)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.72rem',
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  color: 'var(--color-champagne)',
                  fontWeight: 600,
                }}
              >
                {activeEstate.specs}
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.7rem',
                  color: 'var(--color-mist)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                }}
              >
                {viewMode === 'render' ? 'Architectural V-Ray' : 'Official Maha-RERA CAD'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Residences;