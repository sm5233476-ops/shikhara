// src/components/home/HeroShowcase.tsx
import React, { useState, useEffect } from 'react';
import { type Product } from '../../data/products';
import { useCartStore } from '../../store/useCartStore';

interface HeroShowcaseProps {
  product: Product;
  onExploreCollection: () => void;
}

export const HeroShowcase: React.FC<HeroShowcaseProps> = ({ product, onExploreCollection }) => {
  const [activeColorIdx, setActiveColorIdx] = useState(0);
  const [activeSize, setActiveSize] = useState('EU 42');
  const [isRotating, setIsRotating] = useState(true);

  // Reset color index when product changes from bottom grid
  useEffect(() => {
    setActiveColorIdx(0);
  }, [product]);

  const addItem = useCartStore((s) => s.addItem);
  const currentColor = product.colorways[activeColorIdx] || product.colorways[0];

  const handleAdd = () => {
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: currentColor.image,
      colorway: currentColor.name,
      size: activeSize,
    });
  };

  return (
    <section
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '88vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '40px 0',
      }}
    >
      {/* Morpho Water Style Background Radial Halo */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '680px',
          height: '680px',
          background: 'radial-gradient(circle, rgba(197, 179, 154, 0.08) 0%, transparent 70%)',
          borderRadius: '50%',
          pointerEvents: 'none',
        }}
      />

      <div style={{ maxWidth: '1380px', margin: '0 auto', width: '100%', display: 'grid', gridTemplateColumns: '1fr 1.35fr 1fr', gap: '32px', alignItems: 'center' }}>
        {/* Left Column: Quiet Luxury Narrative */}
        <div className="float-reveal" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ width: '24px', height: '1px', backgroundColor: 'var(--color-accent)' }} />
            <span className="mono-tag" style={{ color: 'var(--color-accent)' }}>
              01 // THE APEX SILHOUETTE
            </span>
          </div>

          <h1
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2.8rem, 4.2vw, 4.6rem)',
              fontWeight: 300,
              lineHeight: 0.98,
              letterSpacing: '-0.02em',
              color: 'var(--color-bone)',
            }}
          >
            Form in <br />
            <span style={{ fontStyle: 'italic', color: 'var(--color-accent)' }}>
              perpetual orbit.
            </span>
          </h1>

          <p style={{ color: 'var(--color-bone-muted)', fontSize: '0.94rem', lineHeight: 1.7, maxWidth: '320px' }}>
            {product.description}
          </p>

          <div style={{ display: 'flex', gap: '8px', marginTop: '8px', flexWrap: 'wrap' }}>
            {product.specs.slice(0, 2).map((sp) => (
              <span
                key={sp}
                className="mono-tag"
                style={{
                  fontSize: '9px',
                  backgroundColor: 'rgba(244, 241, 234, 0.05)',
                  padding: '6px 12px',
                  borderRadius: '100px',
                  border: '1px solid var(--border-subtle)',
                }}
              >
                {sp}
              </span>
            ))}
          </div>
        </div>

        {/* Center: The Morpho 360° Circular Centerpiece */}
        <div
          style={{
            position: 'relative',
            height: '520px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onMouseEnter={() => setIsRotating(false)}
          onMouseLeave={() => setIsRotating(true)}
        >
          {/* Circular Orbit Track Rings */}
          <div
            style={{
              position: 'absolute',
              width: '420px',
              height: '420px',
              border: '1px dashed rgba(244, 241, 234, 0.15)',
              borderRadius: '50%',
              animation: isRotating ? 'spinOrbit 28s linear infinite' : 'none',
            }}
          />
          <div
            style={{
              position: 'absolute',
              width: '480px',
              height: '480px',
              border: '1px solid rgba(197, 179, 154, 0.12)',
              borderRadius: '50%',
            }}
          />

          {/* Floating Centerpiece Product Image */}
          <img
            key={`${product.id}-${currentColor.name}`}
            src={currentColor.image}
            alt={product.name}
            style={{
              maxHeight: '360px',
              maxWidth: '90%',
              objectFit: 'contain',
              filter: 'drop-shadow(0 30px 60px rgba(0,0,0,0.9))',
              transform: isRotating ? 'translateY(-10px) rotate(-4deg)' : 'translateY(0) rotate(0)',
              transition: 'transform 0.6s var(--ease-luxury)',
              zIndex: 10,
              cursor: 'grab',
            }}
          />

          {/* Floating Badge Tag */}
          <div
            style={{
              position: 'absolute',
              bottom: '20px',
              backgroundColor: 'rgba(17, 17, 17, 0.85)',
              backdropFilter: 'blur(16px)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '100px',
              padding: '8px 20px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <span style={{ width: '6px', height: '6px', backgroundColor: 'var(--color-accent)', borderRadius: '50%' }} />
            <span className="mono-tag" style={{ fontSize: '10px', color: 'var(--color-bone)' }}>
              ROTATION: {currentColor.name.toUpperCase()} // ${product.price} USD
            </span>
          </div>
        </div>

        {/* Right Column: Customizer & Quick Actions */}
        <div className="float-reveal" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div>
            <span className="mono-tag" style={{ color: 'var(--color-accent)' }}>
              SELECT MATERIAL COLORWAY //
            </span>
            <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
              {product.colorways.map((cw, idx) => {
                const isSelected = activeColorIdx === idx;
                return (
                  <button
                    key={cw.name}
                    onClick={() => setActiveColorIdx(idx)}
                    style={{
                      padding: '8px 16px',
                      backgroundColor: isSelected ? 'var(--color-bone)' : 'var(--bg-surface)',
                      color: isSelected ? '#080808' : 'var(--color-bone)',
                      border: isSelected ? '1px solid var(--color-bone)' : '1px solid var(--border-subtle)',
                      borderRadius: '100px',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '11px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      transition: 'all 0.25s ease',
                    }}
                  >
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: cw.hex }} />
                    {cw.name}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span className="mono-tag">SELECT SIZE (EU) //</span>
              <span className="mono-tag" style={{ cursor: 'pointer', color: 'var(--color-accent)' }}>
                FIT GUIDE
              </span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
              {product.sizes.map((s) => {
                const isSelected = activeSize === s.size;
                return (
                  <button
                    key={s.size}
                    disabled={!s.inStock}
                    onClick={() => setActiveSize(s.size)}
                    style={{
                      padding: '10px 0',
                      backgroundColor: isSelected ? 'var(--color-bone)' : 'var(--bg-surface)',
                      color: isSelected ? '#080808' : s.inStock ? 'var(--color-bone)' : 'rgba(244,241,234,0.2)',
                      border: isSelected ? '1px solid var(--color-bone)' : '1px solid var(--border-subtle)',
                      borderRadius: '8px',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '11px',
                      cursor: s.inStock ? 'pointer' : 'not-allowed',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    {s.size}
                  </button>
                );
              })}
            </div>
          </div>

          <button onClick={handleAdd} className="btn-luxury" style={{ width: '100%' }}>
            SECURE PAIR // ${product.price}
          </button>

          <button onClick={onExploreCollection} className="btn-pill-ghost" style={{ width: '100%' }}>
            Explore All 6 Studio Editions ↓
          </button>
        </div>
      </div>

      <style>{`
        @keyframes spinOrbit {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
};

export default HeroShowcase;
