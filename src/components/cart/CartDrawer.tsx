// src/components/cart/CartDrawer.tsx
import React, { useState } from 'react';
import { useCartStore } from '../../store/useCartStore';

export const CartDrawer: React.FC = () => {
  const {
    items,
    isCartOpen,
    closeCart,
    openCheckout,
    removeItem,
    updateQuantity,
    applyPromo,
    removePromo,
    promoCode,
    getSubtotal,
    getShipping,
    getDiscount,
    getTotal,
    getFreeShippingProgress,
  } = useCartStore();

  const [inputCode, setInputCode] = useState('');
  const [promoError, setPromoError] = useState(false);

  if (!isCartOpen) return null;

  const subtotal = getSubtotal();
  const shipping = getShipping();
  const discount = getDiscount();
  const total = getTotal();
  const progress = getFreeShippingProgress();
  const awayForFree = Math.max(0, 250 - subtotal);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const success = applyPromo(inputCode);
    if (!success) {
      setPromoError(true);
      setTimeout(() => setPromoError(false), 2500);
    } else {
      setInputCode('');
      setPromoError(false);
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        display: 'flex',
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        backdropFilter: 'blur(12px)',
      }}
      onClick={closeCart}
    >
      {/* Slide-In Cart Panel */}
      <div
        style={{
          width: '100%',
          maxWidth: '480px',
          height: '100%',
          backgroundColor: '#0E0E0E',
          borderLeft: '1px solid var(--border-subtle)',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '-20px 0 60px rgba(0, 0, 0, 0.9)',
          animation: 'slideInRight 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div
          style={{
            padding: '24px 28px',
            borderBottom: '1px solid var(--border-subtle)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '1.2rem', fontWeight: 800, letterSpacing: '0.08em' }}>
              YOUR BAG
            </span>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                backgroundColor: 'var(--color-volt)',
                color: '#000',
                padding: '2px 8px',
                fontWeight: 700,
                borderRadius: '4px',
              }}
            >
              {items.reduce((s, i) => s + i.quantity, 0)} ITEMS
            </span>
          </div>

          <button
            onClick={closeCart}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--color-white)',
              fontFamily: 'var(--font-mono)',
              fontSize: '12px',
              cursor: 'pointer',
              letterSpacing: '0.1em',
              padding: '6px',
            }}
          >
            [ CLOSE ✕ ]
          </button>
        </div>

        {/* Free Shipping Progress Bar */}
        <div style={{ padding: '16px 28px', backgroundColor: '#141414', borderBottom: '1px solid var(--border-subtle)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span className="mono-label" style={{ fontSize: '10px', color: progress >= 100 ? 'var(--color-volt)' : 'var(--color-white)' }}>
              {progress >= 100 ? '⚡ COMPLIMENTARY EXPRESS COURIER UNLOCKED' : `ADD $${awayForFree} MORE FOR FREE GLOBAL SHIPPING`}
            </span>
            <span className="mono-label" style={{ color: 'var(--color-volt)' }}>
              {progress}%
            </span>
          </div>
          <div style={{ width: '100%', height: '4px', backgroundColor: 'rgba(255, 255, 255, 0.1)', borderRadius: '2px', overflow: 'hidden' }}>
            <div
              style={{
                height: '100%',
                width: `${progress}%`,
                backgroundColor: 'var(--color-volt)',
                transition: 'width 0.3s ease',
              }}
            />
          </div>
        </div>

        {/* Items Scroll List */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {items.length === 0 ? (
            <div style={{ margin: 'auto', textAlign: 'center', padding: '40px 0' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>👟</div>
              <div className="mono-label" style={{ color: 'var(--color-volt)' }}>
                BAG EMPTY // NO GRAILS DETECTED
              </div>
              <p style={{ color: 'var(--color-muted)', fontSize: '0.88rem', marginTop: '8px' }}>
                Explore the latest drops to secure your size before sold out.
              </p>
              <button onClick={closeCart} className="btn-volt" style={{ marginTop: '24px', width: '100%', padding: '14px' }}>
                EXPLORE DROPS
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '84px 1fr',
                  gap: '16px',
                  paddingBottom: '20px',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                }}
              >
                {/* Thumbnail */}
                <div
                  style={{
                    height: '84px',
                    backgroundColor: 'var(--bg-surface)',
                    borderRadius: '8px',
                    border: '1px solid var(--border-subtle)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                  }}
                >
                  <img src={item.image} alt={item.name} style={{ width: '90%', height: '90%', objectFit: 'contain' }} />
                </div>

                {/* Info & Quantity */}
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <h4 style={{ fontSize: '0.92rem', fontWeight: 800, letterSpacing: '0.04em' }}>{item.name}</h4>
                      <button
                        onClick={() => removeItem(item.id)}
                        style={{ background: 'none', border: 'none', color: 'var(--color-muted)', cursor: 'pointer', fontSize: '11px' }}
                      >
                        ✕
                      </button>
                    </div>

                    <div style={{ display: 'flex', gap: '10px', marginTop: '4px' }}>
                      <span className="mono-label" style={{ fontSize: '10px' }}>
                        {item.colorway}
                      </span>
                      <span className="mono-label" style={{ fontSize: '10px', color: 'var(--color-volt)' }}>
                        {item.size}
                      </span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px' }}>
                    {/* Quantity Selector */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: '4px',
                        overflow: 'hidden',
                      }}
                    >
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        style={{ padding: '4px 10px', background: 'none', border: 'none', color: '#fff', cursor: 'pointer', fontFamily: 'var(--font-mono)' }}
                      >
                        -
                      </button>
                      <span style={{ padding: '0 8px', fontSize: '12px', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        style={{ padding: '4px 10px', background: 'none', border: 'none', color: '#fff', cursor: 'pointer', fontFamily: 'var(--font-mono)' }}
                      >
                        +
                      </button>
                    </div>

                    <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 800, fontSize: '0.98rem' }}>
                      ${item.price * item.quantity}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer: Promo & Checkout (Only if items exist) */}
        {items.length > 0 && (
          <div style={{ padding: '24px 28px', borderTop: '1px solid var(--border-subtle)', backgroundColor: '#0A0A0A' }}>
            {/* Promo Code Input */}
            <form onSubmit={handleApplyPromo} style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
              <input
                type="text"
                placeholder="PROMO CODE (e.g. GRAIL10)"
                value={inputCode}
                onChange={(e) => setInputCode(e.target.value)}
                style={{
                  flex: 1,
                  padding: '10px 14px',
                  backgroundColor: 'var(--bg-surface)',
                  border: promoError ? '1px solid var(--color-crimson)' : '1px solid var(--border-subtle)',
                  borderRadius: '6px',
                  color: '#fff',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  outline: 'none',
                  textTransform: 'uppercase',
                }}
              />
              <button type="submit" className="btn-ghost-dark" style={{ padding: '10px 18px', fontSize: '11px' }}>
                APPLY
              </button>
            </form>

            {promoCode && (
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', backgroundColor: 'rgba(204, 255, 0, 0.08)', padding: '6px 12px', borderRadius: '4px' }}>
                <span className="mono-label" style={{ color: 'var(--color-volt)', fontSize: '10px' }}>
                  CODE [{promoCode}] APPLIED (-{Math.round(discount)} USD)
                </span>
                <button onClick={removePromo} style={{ background: 'none', border: 'none', color: 'var(--color-muted)', cursor: 'pointer', fontSize: '10px' }}>
                  REMOVE
                </button>
              </div>
            )}

            {/* Calculations Breakdown */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px', fontFamily: 'var(--font-mono)', fontSize: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-muted)' }}>
                <span>SUBTOTAL</span>
                <span>${subtotal}</span>
              </div>
              {discount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-volt)' }}>
                  <span>PROMO DISCOUNT</span>
                  <span>-${discount}</span>
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-muted)' }}>
                <span>GLOBAL COURIER</span>
                <span>{shipping === 0 ? 'FREE' : `$${shipping}`}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#fff', fontWeight: 800, fontSize: '1rem', borderTop: '1px solid var(--border-subtle)', paddingTop: '10px' }}>
                <span>TOTAL</span>
                <span style={{ color: 'var(--color-volt)' }}>${total}</span>
              </div>
            </div>

            {/* Checkout Action -> Opens the Luxury Checkout Modal */}
            <button
              onClick={openCheckout}
              className="btn-volt"
              style={{ width: '100%', padding: '18px', fontSize: '13px' }}
            >
              CHECKOUT NOW // ${total} →
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
