// src/components/ui/Header.tsx
import React, { useState, useEffect } from 'react';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '92px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 6vw',
        zIndex: 100,
        transition: 'all 0.5s var(--ease-luxury)',
        backgroundColor: isScrolled
          ? 'rgba(8, 9, 10, 0.82)'
          : 'transparent',
        backdropFilter: isScrolled ? 'blur(20px)' : 'none',
        borderBottom: isScrolled
          ? '1px solid rgba(212, 175, 55, 0.12)'
          : '1px solid transparent',
      }}
    >
      {/* Brand Identity */}
      <div
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        style={{ display: 'flex', flexDirection: 'column', cursor: 'pointer' }}
      >
        <span
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '1.5rem',
            letterSpacing: '0.22em',
            color: 'var(--color-stone)',
            fontWeight: 400,
            lineHeight: 1,
          }}
        >
          SHIKHARA
        </span>
        <span
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.6rem',
            letterSpacing: '0.24em',
            textTransform: 'uppercase',
            color: 'var(--color-mist)',
            marginTop: '5px',
          }}
        >
          MUMBAI SEA FRONT
        </span>
      </div>

      {/* Navigation Links with Smooth Scroll */}
      <nav
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '40px',
        }}
        className="desktop-only"
      >
        {[
          { label: 'Architecture', id: 'architecture' },
          { label: 'Atmosphere', id: 'residences' },
          { label: 'Sanctuaries', id: 'amenities' },
          { label: 'Private Acquisition', id: 'viewing' },
        ].map((item) => (
          <button
            key={item.label}
            onClick={() => scrollTo(item.id)}
            style={{
              background: 'none',
              border: 'none',
              fontFamily: 'var(--font-sans)',
              fontSize: '0.74rem',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--color-stone)',
              opacity: 0.75,
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              padding: '6px 0',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = '1';
              e.currentTarget.style.color = 'var(--color-champagne)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = '0.75';
              e.currentTarget.style.color = 'var(--color-stone)';
            }}
          >
            {item.label}
          </button>
        ))}
      </nav>

      {/* Action CTA */}
      <div>
        <button
          onClick={() => scrollTo('viewing')}
          className="btn-ghost"
        >
          Private Viewing
        </button>
      </div>
    </header>
  );
};

export default Header;