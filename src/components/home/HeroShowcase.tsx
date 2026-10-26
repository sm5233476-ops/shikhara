// src/components/home/HeroShowcase.tsx
import React, { useState, useEffect, useRef } from 'react';
import { type Product } from '../../data/products';
import { useCartStore } from '../../store/useCartStore';

interface HeroShowcaseProps {
  product: Product;
  onExploreCollection: () => void;
}

export const HeroShowcase: React.FC<HeroShowcaseProps> = ({ product, onExploreCollection }) => {
  const [activeColorIdx, setActiveColorIdx] = useState(0);
  const [activeSize, setActiveSize] = useState('EU 42');

  // Interactive 3D Perspective Tilt on Mouse Movement
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const centerStageRef = useRef<HTMLDivElement>(null);

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

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = centerStageRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setTilt({
      x: -(y / (rect.height / 2)) * 14,
      y: (x / (rect.width / 2)) * 16,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
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
      {/* Morpho Water Style Background Soft Halo */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '780px',
          height: '780px',
          background: 'radial-gradient(circle, rgba(197, 179, 154, 0.08) 0%, transparent 68%)',
          borderRadius: '50%',
          pointerEvents: 'none',
        }}
      />

      <div style={{ maxWidth: '1380px', margin: '0 auto', width: '100%', display: 'grid', gridTemplateColumns: '1fr 1.4fr 1fr', gap: '32px', alignItems: 'center' }}>
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

        {/* Center: The Studio Gallery Pedestal Showcase (NO SQUARE BOX!) */}
        <div
          ref={centerStageRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            position: 'relative',
            height: '560px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            perspective: '1200px',
            cursor: 'grab',
          }}
        >
          {/* Circular Orbit Ring Tracks */}
          <div
            style={{
              position: 'absolute',
              width: '440px',
              height: '440px',
              border: '1px dashed rgba(244, 241, 234, 0.14)',
              borderRadius: '50%',
              animation: 'spinOrbit 36s linear infinite',
              pointerEvents: 'none',
            }}
          />
          <div
            style={{
              position: 'absolute',
              width: '520px',
              height: '520px',
              border: '1px solid rgba(197, 179, 154, 0.1)',
              borderRadius: '50%',
              pointerEvents: 'none',
            }}
          />

          {/* Luxury Gallery Pedestal Frame */}
          <div
            style={{
              width: '380px',
              height: '460px',
              borderRadius: '32px',
              backgroundColor: '#121212',
              border: '1px solid var(--border-subtle)',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              boxShadow: '0 32px 80px rgba(0,0,0,0.9)',
              transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
              transition: tilt.x === 0 ? 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)' : 'transform 0.1s ease-out',
              willChange: 'transform',
            }}
          >
            <img
              key={`${product.id}-${currentColor.name}`}
              src={currentColor.image}
              alt={product.name}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                filter: 'contrast(1.06) brightness(0.92)',
                transition: 'transform 0.4s ease',
              }}
            />

            {/* Inner Pedestal Lighting Vignette */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'radial-gradient(circle at center, transparent 40%, rgba(8,8,8,0.7) 100%)',
                pointerEvents: 'none',
              }}
            />
          </div>

          {/* Floating Minimalist Tag */}
          <div
            style={{
              position: 'absolute',
              bottom: '16px',
              backgroundColor: 'rgba(17, 17, 17, 0.85)',
              backdropFilter: 'blur(16px)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '100px',
              padding: '8px 20px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              zIndex: 20,
              pointerEvents: 'none',
            }}
          >
            <span style={{ width: '6px', height: '6px', backgroundColor: 'var(--color-accent)', borderRadius: '50%' }} />
            <span className="mono-tag" style={{ fontSize: '10px', color: 'var(--color-bone)' }}>
              ROTATION // {currentColor.name.toUpperCase()} · ${product.price} USD
            </span>
          </div>
        </div>

        {/* Right Column: Customizer & Action Controls */}
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
            Explore All Studio Editions ↓
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
