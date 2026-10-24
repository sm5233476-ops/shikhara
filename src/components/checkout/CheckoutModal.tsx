// src/components/checkout/CheckoutModal.tsx
import React, { useState, useEffect, useRef } from 'react';
import { useCartStore } from '../../store/useCartStore';

export const CheckoutModal: React.FC = () => {
  const { isCheckoutOpen, closeCheckout, getTotal, clearCart } = useCartStore();

  const [step, setStep] = useState<'details' | 'processing' | 'success'>('details');
  const [orderId, setOrderId] = useState('');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [formData, setFormData] = useState({
    name: 'Alexander Sterling',
    email: 'alexander@hypebeast.com',
    address: '424 Broadway St, Suite 800',
    city: 'New York',
    zip: '10013',
    cardNumber: '•••• •••• •••• 4242',
    expiry: '12/28',
    cvc: '892',
  });

  const total = getTotal();

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('processing');

    setTimeout(() => {
      const generatedId = `GL-${Math.floor(10000 + Math.random() * 90000)}`;
      setOrderId(generatedId);
      setStep('success');
      clearCart();
    }, 1600);
  };

  // High-Performance 60 FPS Canvas Confetti Cannon for Success State
  useEffect(() => {
    if (step !== 'success') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: { x: number; y: number; vx: number; vy: number; color: string; size: number }[] = [];
    const colors = ['#CCFF00', '#FFFFFF', '#FF2E00', '#8E8E93'];

    for (let i = 0; i < 90; i++) {
      particles.push({
        x: canvas.width / 2,
        y: canvas.height / 2,
        vx: (Math.random() - 0.5) * 16,
        vy: (Math.random() - 0.5) * 16 - 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 7 + 4,
      });
    }

    let animId: number;
    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.35; // Gravity
        ctx.fillStyle = p.color;
        ctx.fillRect(p.x, p.y, p.size, p.size);
      });
      animId = requestAnimationFrame(loop);
    };
    animId = requestAnimationFrame(loop);

    return () => cancelAnimationFrame(animId);
  }, [step]);

  if (!isCheckoutOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100000,
        backgroundColor: 'rgba(0, 0, 0, 0.88)',
        backdropFilter: 'blur(20px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      }}
      onClick={closeCheckout}
    >
      {/* Canvas Confetti Shower */}
      {step === 'success' && (
        <canvas
          ref={canvasRef}
          style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 100001 }}
        />
      )}

      <div
        style={{
          width: '100%',
          maxWidth: '680px',
          backgroundColor: '#0E0E0E',
          border: '1px solid var(--border-volt)',
          borderRadius: '24px',
          overflow: 'hidden',
          boxShadow: '0 40px 100px rgba(0,0,0,0.95)',
          position: 'relative',
          zIndex: 100002,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div
          style={{
            padding: '24px 32px',
            borderBottom: '1px solid var(--border-subtle)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ width: '8px', height: '8px', backgroundColor: 'var(--color-volt)', borderRadius: '50%' }} />
            <span className="mono-label" style={{ color: 'var(--color-volt)' }}>
              SECURE 256-BIT ENCRYPTED CHECKOUT
            </span>
          </div>
          <button
            onClick={closeCheckout}
            style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', fontFamily: 'var(--font-mono)' }}
          >
            [ CLOSE ✕ ]
          </button>
        </div>

        {/* STEP 1: FORM DETAILS */}
        {step === 'details' && (
          <form onSubmit={handlePay} style={{ padding: '32px' }}>
            {/* Express Apple Pay Banner */}
            <div
              style={{
                backgroundColor: '#ffffff',
                color: '#000000',
                padding: '16px',
                borderRadius: '8px',
                textAlign: 'center',
                fontFamily: 'var(--font-mono)',
                fontWeight: 800,
                fontSize: '13px',
                cursor: 'pointer',
                marginBottom: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
              }}
              onClick={handlePay}
            >
              <span>Pay</span>
              <span>EXPRESS 1-CLICK CHECKOUT</span>
            </div>

            <div style={{ textAlign: 'center', margin: '16px 0', position: 'relative' }}>
              <span className="mono-label" style={{ backgroundColor: '#0E0E0E', padding: '0 12px', zIndex: 1, position: 'relative' }}>
                OR PAY WITH CREDIT CARD //
              </span>
              <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: '1px', backgroundColor: 'var(--border-subtle)' }} />
            </div>

            {/* Inputs Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '20px' }}>
              <div style={{ gridColumn: 'span 2' }}>
                <label className="mono-label" style={{ display: 'block', marginBottom: '6px' }}>FULL NAME</label>
                <input
                  required
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={{ width: '100%', padding: '12px', backgroundColor: '#141414', border: '1px solid var(--border-subtle)', borderRadius: '6px', color: '#fff', fontFamily: 'var(--font-mono)', outline: 'none' }}
                />
              </div>

              <div>
                <label className="mono-label" style={{ display: 'block', marginBottom: '6px' }}>EMAIL ADDRESS</label>
                <input
                  required
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  style={{ width: '100%', padding: '12px', backgroundColor: '#141414', border: '1px solid var(--border-subtle)', borderRadius: '6px', color: '#fff', fontFamily: 'var(--font-mono)', outline: 'none' }}
                />
              </div>

              <div>
                <label className="mono-label" style={{ display: 'block', marginBottom: '6px' }}>SHIPPING ADDRESS</label>
                <input
                  required
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  style={{ width: '100%', padding: '12px', backgroundColor: '#141414', border: '1px solid var(--border-subtle)', borderRadius: '6px', color: '#fff', fontFamily: 'var(--font-mono)', outline: 'none' }}
                />
              </div>

              <div style={{ gridColumn: 'span 2' }}>
                <label className="mono-label" style={{ display: 'block', marginBottom: '6px' }}>CARD NUMBER</label>
                <input
                  required
                  type="text"
                  value={formData.cardNumber}
                  onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                  style={{ width: '100%', padding: '12px', backgroundColor: '#141414', border: '1px solid var(--border-subtle)', borderRadius: '6px', color: '#fff', fontFamily: 'var(--font-mono)', outline: 'none', letterSpacing: '2px' }}
                />
              </div>

              <div>
                <label className="mono-label" style={{ display: 'block', marginBottom: '6px' }}>EXPIRY</label>
                <input
                  required
                  type="text"
                  value={formData.expiry}
                  onChange={(e) => setFormData({ ...formData, expiry: e.target.value })}
                  style={{ width: '100%', padding: '12px', backgroundColor: '#141414', border: '1px solid var(--border-subtle)', borderRadius: '6px', color: '#fff', fontFamily: 'var(--font-mono)', outline: 'none' }}
                />
              </div>

              <div>
                <label className="mono-label" style={{ display: 'block', marginBottom: '6px' }}>CVC</label>
                <input
                  required
                  type="text"
                  value={formData.cvc}
                  onChange={(e) => setFormData({ ...formData, cvc: e.target.value })}
                  style={{ width: '100%', padding: '12px', backgroundColor: '#141414', border: '1px solid var(--border-subtle)', borderRadius: '6px', color: '#fff', fontFamily: 'var(--font-mono)', outline: 'none' }}
                />
              </div>
            </div>

            {/* Total Breakdown */}
            <div style={{ marginTop: '24px', padding: '16px', backgroundColor: '#141414', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <span className="mono-label" style={{ fontSize: '10px' }}>FINAL AUTHORIZATION AMOUNT</span>
                <div style={{ fontSize: '1.4rem', fontWeight: 900, color: 'var(--color-volt)' }}>${total} USD</div>
              </div>
              <span className="mono-label" style={{ color: '#2ECC71' }}>● INSTANT DISPATCH</span>
            </div>

            <button type="submit" className="btn-volt" style={{ width: '100%', marginTop: '20px', padding: '18px' }}>
              PAY NOW // ${total} USD →
            </button>
          </form>
        )}

        {/* STEP 2: PROCESSING */}
        {step === 'processing' && (
          <div style={{ padding: '80px 32px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
            <div
              style={{
                width: '48px',
                height: '48px',
                border: '3px solid var(--border-subtle)',
                borderTopColor: 'var(--color-volt)',
                borderRadius: '50%',
                animation: 'spin 0.8s linear infinite',
              }}
            />
            <span className="mono-label" style={{ color: 'var(--color-volt)', fontSize: '12px' }}>
              CONTACTING CARD NETWORK // VERIFYING FUNDS...
            </span>
            <p style={{ color: 'var(--color-muted)', fontSize: '0.88rem' }}>Please do not refresh or close this terminal.</p>
          </div>
        )}

        {/* STEP 3: SUCCESS ORDER DOCKET */}
        {step === 'success' && (
          <div style={{ padding: '48px 32px', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ fontSize: '3rem' }}>⚡</div>
            <div>
              <span className="mono-label" style={{ color: 'var(--color-volt)', fontSize: '12px' }}>
                ORDER VERIFIED // DOCKET #{orderId}
              </span>
              <h2 style={{ fontSize: '2.4rem', fontWeight: 900, marginTop: '8px' }}>YOUR GRAIL IS SECURED.</h2>
              <p style={{ color: 'var(--color-muted)', fontSize: '0.94rem', maxWidth: '440px', margin: '8px auto 0' }}>
                Confirmation receipt dispatched to <span style={{ color: '#fff' }}>{formData.email}</span>. Your pair has been locked and allocated at the logistics vault.
              </p>
            </div>

            {/* Digital Order Receipt Box */}
            <div style={{ backgroundColor: '#141414', border: '1px solid var(--border-subtle)', borderRadius: '12px', padding: '20px', textAlign: 'left', fontFamily: 'var(--font-mono)', fontSize: '11px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-muted)' }}>
                <span>ESTIMATED DELIVERY</span>
                <span style={{ color: '#fff' }}>3-5 BUSINESS DAYS (EXPRESS)</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-muted)' }}>
                <span>DISPATCH ORIGIN</span>
                <span style={{ color: '#fff' }}>MUNICH LOGISTICS HUB</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-muted)', borderTop: '1px solid var(--border-subtle)', paddingTop: '8px' }}>
                <span>PAID VIA</span>
                <span style={{ color: 'var(--color-volt)' }}>•••• 4242 (APPROVED)</span>
              </div>
            </div>

            <button
              onClick={() => {
                setStep('details');
                closeCheckout();
              }}
              className="btn-volt"
              style={{ width: '100%', padding: '16px' }}
            >
              RETURN TO ARCHIVE // CONTINUE SHOPPING →
            </button>
          </div>
        )}
      </div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default CheckoutModal;
