// src/sections/Amenities.tsx
import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const CARDS_3D = [
  {
    id: 'pool',
    tag: '01 / AQUATIC SANCTUARY',
    title: 'The Sky Pool',
    copy: 'A 25-metre cantilevered acrylic glass infinity pool projecting into ocean crosswinds. Heated saline with uninterrupted sunset horizons.',
    image:
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=90',
    specs: '180m Elevation · Saline Heated',
  },
  {
    id: 'lounge',
    tag: '02 / MEMBERS SALON',
    title: 'The Summit Lounge',
    copy: 'Private sommelier service, rare single-malt vaults, and a double-height architectural reading galleria overlooking Nariman Point.',
    image:
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=90',
    specs: '6.8m Gallery · 1,200 Reserves',
  },
  {
    id: 'spa',
    tag: '03 / RECOVERY ATELIER',
    title: 'The Caldarium Spa',
    copy: 'Finnish dry cedar pods, Turkish heated marble hammams, and sub-zero Nordic plunge pools curated with global longevity experts.',
    image:
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=90',
    specs: 'Cryo Plunge · Onyx Hammams',
  },
  {
    id: 'cinema',
    tag: '04 / PRIVATE SCREENING',
    title: 'The Private Screen',
    copy: '18 bespoke leather reclining loungers with commercial DCI 4K laser projection and Dolby Atmos 128-channel spatial audio.',
    image:
      'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1200&q=90',
    specs: '4K DCI Laser · Spatial Atmos',
  },
];

export const Amenities: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const card0Ref = useRef<HTMLDivElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);

  // Pure 60-120 FPS GPU Motion (ZERO Blur, ZERO Lag)
  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          scrub: 1.1,
        },
      });

      // Smooth floating parallax without any heavy filters
      tl.fromTo(card0Ref.current, { y: 80, rotate: -2 }, { y: -60, rotate: 0, ease: 'none' }, 0);
      tl.fromTo(card1Ref.current, { y: 160, rotate: 2 }, { y: -100, rotate: -1, ease: 'none' }, 0);
      tl.fromTo(card2Ref.current, { y: 100, rotate: -1 }, { y: -80, rotate: 1, ease: 'none' }, 0);
      tl.fromTo(card3Ref.current, { y: 180, rotate: 2 }, { y: -120, rotate: 0, ease: 'none' }, 0);
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      id="amenities"
      style={{
        position: 'relative',
        width: '100vw',
        minHeight: '140vh',
        backgroundColor: 'var(--color-obsidian)',
        padding: '120px 6vw',
        overflow: 'hidden',
        borderTop: '1px solid rgba(212, 175, 55, 0.12)',
      }}
    >
      <div style={{ maxWidth: '1380px', margin: '0 auto', width: '100%', position: 'relative' }}>
        {/* Crisp Watermark Typography Behind Cards */}
        <div
          style={{
            textAlign: 'center',
            marginBottom: '40px',
            pointerEvents: 'none',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.74rem',
              letterSpacing: '0.24em',
              textTransform: 'uppercase',
              color: 'var(--color-champagne)',
              fontWeight: 600,
            }}
          >
            03 / SANCTUARY & HORIZONS
          </span>

          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(3.8rem, 8vw, 8rem)',
              fontWeight: 300,
              lineHeight: 0.95,
              letterSpacing: '-0.02em',
              color: 'var(--color-stone)',
              marginTop: '12px',
            }}
          >
            Curated sanctuaries.
          </h2>
        </div>

        {/* 4 Sharp Luxury Floating Cards (WithHoney Style - NO BLUR!) */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '60px 48px',
            position: 'relative',
            zIndex: 10,
            marginTop: '40px',
          }}
        >
          {/* Card 0 */}
          <div
            ref={card0Ref}
            style={{
              borderRadius: '28px',
              backgroundColor: '#101216', // Crisp solid dark surface (No heavy GPU blur)
              border: '1px solid rgba(212, 175, 55, 0.22)',
              boxShadow: '0 24px 60px rgba(0,0,0,0.6)',
              overflow: 'hidden',
              transition: 'border-color 0.4s ease',
            }}
          >
            <div style={{ width: '100%', height: '300px', overflow: 'hidden' }}>
              <img
                src={CARDS_3D[0].image}
                alt={CARDS_3D[0].title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <div style={{ padding: '32px' }}>
              <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.64rem', letterSpacing: '0.2em', color: 'var(--color-champagne)', fontWeight: 600 }}>
                {CARDS_3D[0].tag}
              </span>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', color: 'var(--color-stone)', marginTop: '8px', fontWeight: 300 }}>
                {CARDS_3D[0].title}
              </h3>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.92rem', lineHeight: 1.65, color: 'var(--color-mist)', marginTop: '12px', fontWeight: 300 }}>
                {CARDS_3D[0].copy}
              </p>
              <div style={{ marginTop: '20px', borderTop: '1px solid rgba(212, 175, 55, 0.15)', paddingTop: '16px', fontFamily: 'var(--font-sans)', fontSize: '0.72rem', letterSpacing: '0.14em', color: 'var(--color-champagne)', textTransform: 'uppercase' }}>
                {CARDS_3D[0].specs}
              </div>
            </div>
          </div>

          {/* Card 1 (Offset Higher) */}
          <div
            ref={card1Ref}
            style={{
              borderRadius: '28px',
              backgroundColor: '#101216',
              border: '1px solid rgba(212, 175, 55, 0.22)',
              boxShadow: '0 24px 60px rgba(0,0,0,0.6)',
              overflow: 'hidden',
              marginTop: '40px',
            }}
          >
            <div style={{ width: '100%', height: '300px', overflow: 'hidden' }}>
              <img
                src={CARDS_3D[1].image}
                alt={CARDS_3D[1].title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <div style={{ padding: '32px' }}>
              <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.64rem', letterSpacing: '0.2em', color: 'var(--color-champagne)', fontWeight: 600 }}>
                {CARDS_3D[1].tag}
              </span>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', color: 'var(--color-stone)', marginTop: '8px', fontWeight: 300 }}>
                {CARDS_3D[1].title}
              </h3>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.92rem', lineHeight: 1.65, color: 'var(--color-mist)', marginTop: '12px', fontWeight: 300 }}>
                {CARDS_3D[1].copy}
              </p>
              <div style={{ marginTop: '20px', borderTop: '1px solid rgba(212, 175, 55, 0.15)', paddingTop: '16px', fontFamily: 'var(--font-sans)', fontSize: '0.72rem', letterSpacing: '0.14em', color: 'var(--color-champagne)', textTransform: 'uppercase' }}>
                {CARDS_3D[1].specs}
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div
            ref={card2Ref}
            style={{
              borderRadius: '28px',
              backgroundColor: '#101216',
              border: '1px solid rgba(212, 175, 55, 0.22)',
              boxShadow: '0 24px 60px rgba(0,0,0,0.6)',
              overflow: 'hidden',
            }}
          >
            <div style={{ width: '100%', height: '300px', overflow: 'hidden' }}>
              <img
                src={CARDS_3D[2].image}
                alt={CARDS_3D[2].title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <div style={{ padding: '32px' }}>
              <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.64rem', letterSpacing: '0.2em', color: 'var(--color-champagne)', fontWeight: 600 }}>
                {CARDS_3D[2].tag}
              </span>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', color: 'var(--color-stone)', marginTop: '8px', fontWeight: 300 }}>
                {CARDS_3D[2].title}
              </h3>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.92rem', lineHeight: 1.65, color: 'var(--color-mist)', marginTop: '12px', fontWeight: 300 }}>
                {CARDS_3D[2].copy}
              </p>
              <div style={{ marginTop: '20px', borderTop: '1px solid rgba(212, 175, 55, 0.15)', paddingTop: '16px', fontFamily: 'var(--font-sans)', fontSize: '0.72rem', letterSpacing: '0.14em', color: 'var(--color-champagne)', textTransform: 'uppercase' }}>
                {CARDS_3D[2].specs}
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div
            ref={card3Ref}
            style={{
              borderRadius: '28px',
              backgroundColor: '#101216',
              border: '1px solid rgba(212, 175, 55, 0.22)',
              boxShadow: '0 24px 60px rgba(0,0,0,0.6)',
              overflow: 'hidden',
              marginTop: '40px',
            }}
          >
            <div style={{ width: '100%', height: '300px', overflow: 'hidden' }}>
              <img
                src={CARDS_3D[3].image}
                alt={CARDS_3D[3].title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <div style={{ padding: '32px' }}>
              <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.64rem', letterSpacing: '0.2em', color: 'var(--color-champagne)', fontWeight: 600 }}>
                {CARDS_3D[3].tag}
              </span>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', color: 'var(--color-stone)', marginTop: '8px', fontWeight: 300 }}>
                {CARDS_3D[3].title}
              </h3>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.92rem', lineHeight: 1.65, color: 'var(--color-mist)', marginTop: '12px', fontWeight: 300 }}>
                {CARDS_3D[3].copy}
              </p>
              <div style={{ marginTop: '20px', borderTop: '1px solid rgba(212, 175, 55, 0.15)', paddingTop: '16px', fontFamily: 'var(--font-sans)', fontSize: '0.72rem', letterSpacing: '0.14em', color: 'var(--color-champagne)', textTransform: 'uppercase' }}>
                {CARDS_3D[3].specs}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Amenities;