// src/sections/Ascend.tsx
import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const CASCADING_CARDS = [
  {
    id: 'ocean-terrace',
    tag: 'THE RESIDENTIAL EXPERIENCE',
    title: 'Marine Cantilevers',
    copy: 'Floor-to-ceiling acoustic glass walls dissolving into 180-degree private sunset decks. Designed for effortless indoor-outdoor living above the Mumbai shoreline.',
    image:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=90',
  },
  {
    id: 'penthouse-duplex',
    tag: 'BESPOKE HORIZONS',
    title: 'Double-Volume Salons',
    copy: '24-foot cathedral ceilings wrapped in Italian travertine marble and fluted architectural bronze, framing unobstructed ocean expanses.',
    image:
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1400&q=90',
  },
  {
    id: 'private-haven',
    tag: 'TIMELESS REPOSE',
    title: 'Primary Sanctuary',
    copy: 'Freestanding sculpted soaking tubs positioned along the western facade, capturing golden hour marine reflections.',
    image:
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1400&q=90',
  },
];

export const Ascend: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);

  // Belgrade Arbor Staircase / Parallax Stacking Motion
  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          end: 'bottom 20%',
          scrub: 1.2,
        },
      });

      // Staggered cascading parallax (Cards float and slide like a deck of cards!)
      tl.fromTo(card1Ref.current, { y: 60, rotate: -2 }, { y: -40, rotate: 0, ease: 'none' }, 0);
      tl.fromTo(card2Ref.current, { y: 140, rotate: 2 }, { y: -80, rotate: -1, ease: 'none' }, 0);
      tl.fromTo(card3Ref.current, { y: 220, rotate: -1 }, { y: -120, rotate: 1, ease: 'none' }, 0);
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="residences"
      style={{
        position: 'relative',
        width: '100vw',
        minHeight: '130vh',
        padding: '140px 6vw',
        backgroundColor: 'var(--color-obsidian)',
        borderTop: '1px solid rgba(212, 175, 55, 0.12)',
        overflow: 'hidden',
      }}
    >
      <div style={{ maxWidth: '1380px', margin: '0 auto', width: '100%' }}>
        {/* Giant Belgrade Arbor Style Background Typography */}
        <div style={{ marginBottom: '60px' }}>
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
            THE LIVING ATMOSPHERE
          </span>

          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(3.8rem, 7.5vw, 7.5rem)',
              fontWeight: 300,
              lineHeight: 0.94,
              letterSpacing: '-0.025em',
              color: 'var(--color-stone)',
              marginTop: '16px',
            }}
          >
            Crafted for pure <br />
            <span style={{ fontStyle: 'italic', color: 'var(--color-champagne-light)' }}>
              permanence.
            </span>
          </h2>
        </div>

        {/* 3 Belgrade Arbor Cascading Floating Cards (No boring tabs!) */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '36px',
            alignItems: 'start',
            marginTop: '80px',
          }}
        >
          {/* Card 1 */}
          <div
            ref={card1Ref}
            style={{
              display: 'flex',
              flexDirection: 'column',
              borderRadius: '36px', // Signature Curved Corner
              overflow: 'hidden',
              backgroundColor: 'rgba(16, 18, 22, 0.75)',
              border: '1px solid rgba(212, 175, 55, 0.22)',
              boxShadow: '0 32px 80px rgba(0,0,0,0.7)',
              transition: 'border-color 0.4s ease',
            }}
          >
            <div style={{ width: '100%', height: '360px', overflow: 'hidden' }}>
              <img
                src={CASCADING_CARDS[0].image}
                alt={CASCADING_CARDS[0].title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <div style={{ padding: '32px' }}>
              <span
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.64rem',
                  letterSpacing: '0.18em',
                  color: 'var(--color-champagne)',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                }}
              >
                {CASCADING_CARDS[0].tag}
              </span>
              <h3
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.8rem',
                  color: 'var(--color-stone)',
                  marginTop: '8px',
                  fontWeight: 300,
                }}
              >
                {CASCADING_CARDS[0].title}
              </h3>
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.9rem',
                  lineHeight: 1.65,
                  color: 'var(--color-mist)',
                  marginTop: '12px',
                  fontWeight: 300,
                }}
              >
                {CASCADING_CARDS[0].copy}
              </p>
            </div>
          </div>

          {/* Card 2 (Elevated Center Card) */}
          <div
            ref={card2Ref}
            style={{
              display: 'flex',
              flexDirection: 'column',
              borderRadius: '36px',
              overflow: 'hidden',
              backgroundColor: 'rgba(16, 18, 22, 0.75)',
              border: '1px solid rgba(212, 175, 55, 0.3)',
              boxShadow: '0 40px 96px rgba(0,0,0,0.8)',
              marginTop: '40px',
            }}
          >
            <div style={{ width: '100%', height: '420px', overflow: 'hidden' }}>
              <img
                src={CASCADING_CARDS[1].image}
                alt={CASCADING_CARDS[1].title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <div style={{ padding: '36px' }}>
              <span
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.64rem',
                  letterSpacing: '0.18em',
                  color: 'var(--color-champagne)',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                }}
              >
                {CASCADING_CARDS[1].tag}
              </span>
              <h3
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '2rem',
                  color: 'var(--color-stone)',
                  marginTop: '8px',
                  fontWeight: 300,
                }}
              >
                {CASCADING_CARDS[1].title}
              </h3>
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.92rem',
                  lineHeight: 1.65,
                  color: 'var(--color-mist)',
                  marginTop: '12px',
                  fontWeight: 300,
                }}
              >
                {CASCADING_CARDS[1].copy}
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div
            ref={card3Ref}
            style={{
              display: 'flex',
              flexDirection: 'column',
              borderRadius: '36px',
              overflow: 'hidden',
              backgroundColor: 'rgba(16, 18, 22, 0.75)',
              border: '1px solid rgba(212, 175, 55, 0.22)',
              boxShadow: '0 32px 80px rgba(0,0,0,0.7)',
              marginTop: '80px',
            }}
          >
            <div style={{ width: '100%', height: '360px', overflow: 'hidden' }}>
              <img
                src={CASCADING_CARDS[2].image}
                alt={CASCADING_CARDS[2].title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <div style={{ padding: '32px' }}>
              <span
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.64rem',
                  letterSpacing: '0.18em',
                  color: 'var(--color-champagne)',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                }}
              >
                {CASCADING_CARDS[2].tag}
              </span>
              <h3
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.8rem',
                  color: 'var(--color-stone)',
                  marginTop: '8px',
                  fontWeight: 300,
                }}
              >
                {CASCADING_CARDS[2].title}
              </h3>
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.9rem',
                  lineHeight: 1.65,
                  color: 'var(--color-mist)',
                  marginTop: '12px',
                  fontWeight: 300,
                }}
              >
                {CASCADING_CARDS[2].copy}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Ascend;