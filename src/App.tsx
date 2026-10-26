// src/App.tsx
import React, { useState } from 'react';
import { PRODUCTS, type Product } from './data/products';
import { useCartStore } from './store/useCartStore';
import { CartDrawer } from './components/cart/CartDrawer';
import { CheckoutModal } from './components/checkout/CheckoutModal';
import { HeroShowcase } from './components/home/HeroShowcase';
import { CollectionGrid } from './components/catalog/CollectionGrid';

export const App: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product>(PRODUCTS[0]);
  const openCart = useCartStore((s) => s.openCart);
  const itemCount = useCartStore((s) => s.getItemCount());
  const subtotal = useCartStore((s) => s.getSubtotal());

  const scrollToCollection = () => {
    const el = document.getElementById('collection');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-dark)', padding: '0 5vw' }}>
      {/* Slide-Out Shopping Cart Drawer */}
      <CartDrawer />

      {/* Stripe-Style Luxury Checkout Modal & Confetti Engine */}
      <CheckoutModal />

      {/* Top Banner Ticker */}
      <div
        style={{
          height: '40px',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ width: '6px', height: '6px', backgroundColor: 'var(--color-accent)', borderRadius: '50%' }} />
          <span className="mono-tag" style={{ color: 'var(--color-bone)' }}>
            STUDIO EDITION 004 // WORLDWIDE DISPATCH
          </span>
        </div>
        <span className="mono-tag">COMPLIMENTARY GLOBAL COURIER OVER $300</span>
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
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.9rem', letterSpacing: '0.14em', fontWeight: 300, lineHeight: 1 }}>
            VALENCE <span style={{ fontStyle: 'italic', color: 'var(--color-accent)' }}>STUDIO</span>
          </h1>
          <span className="mono-tag" style={{ fontSize: '9px', marginTop: '3px' }}>
            CIVITANOVA MARCHE & TOKYO ARCHIVE
          </span>
        </div>

        {/* Live Cart Button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <button
            onClick={openCart}
            className="btn-pill-ghost"
            style={{ display: 'flex', alignItems: 'center', gap: '10px' }}
          >
            <span>BAG [{itemCount}]</span>
            <span style={{ color: 'var(--color-accent)' }}>${subtotal}</span>
          </button>
        </div>
      </header>

      {/* Hero: Morpho Water Style 360° Rotating Centerpiece */}
      <HeroShowcase product={selectedProduct} onExploreCollection={scrollToCollection} />

      {/* Catalog: Almada Label Style 4:5 Uniform Portrait Grid */}
      <CollectionGrid onSelectProduct={(p) => setSelectedProduct(p)} />

      {/* Footer */}
      <footer style={{ borderTop: '1px solid var(--border-subtle)', padding: '48px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
        <span className="mono-tag">© 2026 VALENCE STUDIO LTD. SEASONLESS ARCHIVE.</span>
        <span className="mono-tag" style={{ color: 'var(--color-accent)' }}>
          MILITARY ENCRYPTION & GLOBAL DISPATCH
        </span>
      </footer>
    </div>
  );
};

export default App;
