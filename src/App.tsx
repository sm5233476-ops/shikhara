// src/App.tsx
import React, { useState } from 'react';
import { PRODUCTS, type Product } from './data/products';
import { useCartStore } from './store/useCartStore';

export const App: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product>(PRODUCTS[0]);
  const [selectedColor, setSelectedColor] = useState(PRODUCTS[0].colorways[0].name);
  const [selectedSize, setSelectedSize] = useState('US 9');

  const addItem = useCartStore((s) => s.addItem);
  const itemCount = useCartStore((s) => s.getItemCount());
  const subtotal = useCartStore((s) => s.getSubtotal());

  const activeColorway = selectedProduct.colorways.find((c) => c.name === selectedColor) || selectedProduct.colorways[0];

  const handleAddToCart = () => {
    addItem({
      productId: selectedProduct.id,
      name: selectedProduct.name,
      price: selectedProduct.price,
      image: activeColorway.image,
      colorway: activeColorway.name,
      size: selectedSize,
    });
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-dark)', padding: '0 5vw' }}>
      {/* Top Banner Ticker */}
      <div
        style={{
          height: '42px',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ width: '8px', height: '8px', backgroundColor: 'var(--color-volt)', borderRadius: '50%' }} />
          <span className="mono-label" style={{ color: 'var(--color-volt)' }}>
            DROP 004 // LIVE WORLDWIDE
          </span>
        </div>
        <span className="mono-label">COMPLIMENTARY GLOBAL COURIER OVER $250</span>
      </div>

      {/* Main Header */}
      <header
        style={{
          height: '84px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid var(--border-subtle)',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <h1 style={{ fontSize: '1.6rem', fontWeight: 900, letterSpacing: '0.12em', lineHeight: 1 }}>
            GRAIL <span style={{ color: 'var(--color-volt)' }}>//</span> LAB
          </h1>
          <span className="mono-label" style={{ fontSize: '9px', marginTop: '4px' }}>
            EXPERIMENTAL FOOTWEAR ARCHIVE
          </span>
        </div>

        {/* Live Cart Counter Button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div className="btn-ghost-dark" style={{ border: '1px solid var(--border-volt)' }}>
            <span>BAG [{itemCount}]</span>
            <span style={{ color: 'var(--color-volt)' }}>${subtotal}</span>
          </div>
        </div>
      </header>

      {/* Product Interactive Stage */}
      <main style={{ padding: '60px 0', maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '64px', alignItems: 'center' }}>
          {/* Left: 4K Sneaker Visual Stage */}
          <div
            style={{
              position: 'relative',
              height: '620px',
              backgroundColor: 'var(--bg-surface)',
              borderRadius: '24px',
              border: '1px solid var(--border-subtle)',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '40px',
            }}
          >
            <span
              className="mono-label"
              style={{
                position: 'absolute',
                top: '24px',
                left: '24px',
                color: 'var(--color-volt)',
                fontSize: '11px',
              }}
            >
              [ {selectedProduct.code} ] // {selectedProduct.stockLeft} PAIRS REMAINING
            </span>

            <img
              key={`${selectedProduct.id}-${activeColorway.name}`}
              src={activeColorway.image}
              alt={selectedProduct.name}
              style={{
                width: '100%',
                maxHeight: '440px',
                objectFit: 'contain',
                filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.8))',
                transition: 'transform 0.4s ease',
              }}
            />

            {/* Bottom specs bar */}
            <div
              style={{
                position: 'absolute',
                bottom: '24px',
                left: '24px',
                right: '24px',
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <span className="mono-label">COLORWAY: {activeColorway.name.toUpperCase()}</span>
              <span className="mono-label">VERIFIED AUTHENTIC</span>
            </div>
          </div>

          {/* Right: Sneaker Specs & Customizer Panel */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
            <div>
              <span className="mono-label" style={{ color: 'var(--color-volt)' }}>
                LIMITED DROP // {selectedProduct.category.toUpperCase()}
              </span>
              <h2 style={{ fontSize: '2.8rem', fontWeight: 900, letterSpacing: '-0.02em', marginTop: '8px' }}>
                {selectedProduct.name}
              </h2>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '16px', marginTop: '12px' }}>
                <span style={{ fontSize: '2rem', fontWeight: 800, fontFamily: 'var(--font-mono)' }}>
                  ${selectedProduct.price}
                </span>
                {selectedProduct.originalPrice && (
                  <span style={{ fontSize: '1.2rem', color: 'var(--color-muted)', textDecoration: 'line-through' }}>
                    ${selectedProduct.originalPrice}
                  </span>
                )}
                <span className="mono-label" style={{ color: '#2ECC71' }}>
                  IN STOCK · SHIPS TODAY
                </span>
              </div>
            </div>

            <p style={{ color: 'var(--color-muted)', fontSize: '1rem', lineHeight: 1.6 }}>
              {selectedProduct.description}
            </p>

            {/* 1. Colorway Selector */}
            <div>
              <span className="mono-label" style={{ display: 'block', marginBottom: '10px' }}>
                SELECT COLORWAY //
              </span>
              <div style={{ display: 'flex', gap: '12px' }}>
                {selectedProduct.colorways.map((cw) => {
                  const isChosen = activeColorway.name === cw.name;
                  return (
                    <button
                      key={cw.name}
                      onClick={() => setSelectedColor(cw.name)}
                      style={{
                        padding: '10px 18px',
                        backgroundColor: isChosen ? 'var(--color-volt)' : 'var(--bg-surface)',
                        color: isChosen ? '#000000' : 'var(--color-white)',
                        border: isChosen ? '1px solid var(--color-volt)' : '1px solid var(--border-subtle)',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '11px',
                        fontWeight: 700,
                      }}
                    >
                      <span
                        style={{
                          width: '12px',
                          height: '12px',
                          borderRadius: '50%',
                          backgroundColor: cw.hex,
                          border: '1px solid rgba(255,255,255,0.2)',
                        }}
                      />
                      {cw.name}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Size Selector */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <span className="mono-label">SELECT SIZE (US MEN) //</span>
                <span className="mono-label" style={{ textDecoration: 'underline', cursor: 'pointer' }}>
                  SIZE GUIDE
                </span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '10px' }}>
                {selectedProduct.sizes.map((s) => {
                  const isSelected = selectedSize === s.size;
                  return (
                    <button
                      key={s.size}
                      disabled={!s.inStock}
                      onClick={() => setSelectedSize(s.size)}
                      style={{
                        padding: '12px 0',
                        backgroundColor: isSelected ? '#ffffff' : 'var(--bg-surface)',
                        color: isSelected ? '#000000' : s.inStock ? 'var(--color-white)' : 'rgba(255,255,255,0.2)',
                        border: isSelected ? '1px solid #ffffff' : '1px solid var(--border-subtle)',
                        borderRadius: '6px',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '12px',
                        fontWeight: 700,
                        cursor: s.inStock ? 'pointer' : 'not-allowed',
                        position: 'relative',
                      }}
                    >
                      {s.size}
                      {s.lowStock && (
                        <span
                          style={{
                            position: 'absolute',
                            top: '-4px',
                            right: '-4px',
                            width: '6px',
                            height: '6px',
                            backgroundColor: 'var(--color-crimson)',
                            borderRadius: '50%',
                          }}
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Action Add To Bag */}
            <div style={{ display: 'flex', gap: '16px', marginTop: '12px' }}>
              <button onClick={handleAddToCart} className="btn-volt" style={{ flex: 1, padding: '20px' }}>
                ADD TO BAG // ${selectedProduct.price}
              </button>
            </div>
          </div>
        </div>

        {/* Drop Switcher (Switch Between Other Drops) */}
        <div style={{ marginTop: '90px' }}>
          <span className="mono-label" style={{ color: 'var(--color-volt)', display: 'block', marginBottom: '16px' }}>
            ARCHIVE RELEASES // SELECT DROP TO INSPECT
          </span>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
            {PRODUCTS.slice(0, 4).map((p) => {
              const isCurrent = p.id === selectedProduct.id;
              return (
                <div
                  key={p.id}
                  onClick={() => {
                    setSelectedProduct(p);
                    setSelectedColor(p.colorways[0].name);
                  }}
                  style={{
                    backgroundColor: 'var(--bg-surface)',
                    border: isCurrent ? '1px solid var(--color-volt)' : '1px solid var(--border-subtle)',
                    borderRadius: '16px',
                    padding: '20px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <img src={p.colorways[0].image} alt={p.name} style={{ width: '100%', height: '140px', objectFit: 'contain' }} />
                  <div style={{ marginTop: '14px' }}>
                    <div className="mono-label" style={{ color: 'var(--color-volt)' }}>
                      ${p.price}
                    </div>
                    <div style={{ fontWeight: 800, fontSize: '1rem', marginTop: '4px' }}>{p.name}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
