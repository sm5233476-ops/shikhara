// src/components/home/BrandManifesto.tsx
import React from 'react';

export const BrandManifesto: React.FC = () => {
  return (
    <div
      style={{
        margin: '100px 0 60px',
        padding: '60px 48px',
        backgroundColor: '#0E0E0E',
        borderRadius: '24px',
        border: '1px solid var(--border-subtle)',
        display: 'grid',
        gridTemplateColumns: '1.2fr 1fr',
        gap: '48px',
        alignItems: 'center',
      }}
    >
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
          <span style={{ width: '28px', height: '2px', backgroundColor: 'var(--color-volt)' }} />
          <span className="mono-label" style={{ color: 'var(--color-volt)' }}>
            LAB MANIFESTO // 004
          </span>
        </div>
        <h2 style={{ fontSize: 'clamp(2rem, 3.8vw, 3.4rem)', fontWeight: 900, lineHeight: 1.05, letterSpacing: '-0.02em' }}>
          ZERO COMPROMISE ON TECHNICAL FUNCTIONALITY.
        </h2>
        <p style={{ color: 'var(--color-muted)', fontSize: '1rem', lineHeight: 1.7, marginTop: '18px' }}>
          Every silhouette released under the Grail Lab imprint is manufactured with military-grade Cordura®, German Fidlock® magnetic hardware, and Italian Vibram® lug outsoles. Built for the architectural urban landscape.
        </p>
      </div>

      {/* Technical Metric Pillars */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        {[
          { metric: '100%', label: 'WEATHERPROOF', sub: 'Gore-Tex® Certified' },
          { metric: '184g', label: 'SPRING RUNNER', sub: '3K Carbon Plated' },
          { metric: '500 GSM', label: 'HEAVY FLEECE', sub: 'Custom Organic French Terry' },
          { metric: 'LIMITED', label: 'BATCH SIZE', sub: 'Zero Mass Restocks' },
        ].map((m) => (
          <div
            key={m.label}
            style={{
              padding: '20px',
              backgroundColor: 'var(--bg-surface)',
              borderRadius: '12px',
              border: '1px solid var(--border-subtle)',
            }}
          >
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.8rem', fontWeight: 900, color: 'var(--color-volt)' }}>
              {m.metric}
            </div>
            <div className="mono-label" style={{ marginTop: '6px', color: '#ffffff' }}>
              {m.label}
            </div>
            <div style={{ fontSize: '11px', color: 'var(--color-muted)', marginTop: '2px' }}>{m.sub}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrandManifesto;
