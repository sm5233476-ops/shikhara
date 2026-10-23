// src/sections/Viewing.tsx
import React, { useState } from 'react';

export const Viewing: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    estate: 'Crown Penthouse',
    timing: 'Golden Hour Sunset',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section
      id="viewing"
      style={{
        position: 'relative',
        width: '100vw',
        padding: '140px 6vw',
        backgroundColor: 'var(--color-obsidian)',
        borderTop: '1px solid rgba(212, 175, 55, 0.12)',
        overflow: 'hidden',
      }}
    >
      <div style={{ maxWidth: '1380px', margin: '0 auto', width: '100%' }}>
        {/* Main 12-Column Private Suite Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: '64px',
            alignItems: 'start',
          }}
        >
          {/* Left Column: Brand Narrative & Location Promontory (Cols 1 to 5) */}
          <div style={{ gridColumn: 'span 5', display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px' }}>
                <span style={{ width: '32px', height: '1px', backgroundColor: 'var(--color-champagne)' }} />
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
                  05 / PRIVATE ACQUISITION
                </span>
              </div>

              <h2
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(3.4rem, 5.5vw, 5.6rem)',
                  fontWeight: 300,
                  lineHeight: 0.96,
                  letterSpacing: '-0.025em',
                  color: 'var(--color-stone)',
                }}
              >
                Begin your <br />
                <span style={{ fontStyle: 'italic', color: 'var(--color-champagne-light)' }}>
                  ascent.
                </span>
              </h2>

              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '1.02rem',
                  lineHeight: 1.75,
                  color: 'var(--color-mist)',
                  fontWeight: 300,
                  marginTop: '20px',
                }}
              >
                Private residential viewings are conducted strictly by personal invitation
                at the Shikhara Marine Pavilion, Colaba. A dedicated client director will
                curate your private estate tour, material dossier, and custom architectural configuration.
              </p>
            </div>

            {/* Location & Marine Gallery Details Card */}
            <div
              style={{
                backgroundColor: 'rgba(16, 18, 22, 0.75)',
                border: '1px solid rgba(212, 175, 55, 0.2)',
                borderRadius: '24px',
                padding: '32px',
                display: 'flex',
                flexDirection: 'column',
                gap: '18px',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.68rem',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: 'var(--color-champagne)',
                  fontWeight: 600,
                }}
              >
                Shikhara Marine Pavilion · Colaba Promontory
              </span>

              <div
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.25rem',
                  color: 'var(--color-stone)',
                  lineHeight: 1.5,
                }}
              >
                18° 55' 19.2" N &nbsp;·&nbsp; 72° 50' 04.5" E
              </div>

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.86rem',
                  color: 'var(--color-mist)',
                  fontWeight: 300,
                }}
              >
                <div>Private Porte-Cochère & Valet Arrival</div>
                <div>Yacht Tender & Marine Transfer Available</div>
              </div>

              {/* Direct VIP WhatsApp Concierge */}
              <div style={{ marginTop: '8px' }}>
                <a
                  href="https://wa.me/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '12px',
                    width: '100%',
                    justifyContent: 'center',
                    borderRadius: '100px',
                  }}
                >
                  <span
                    style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      backgroundColor: '#2ecc71',
                      boxShadow: '0 0 10px #2ecc71',
                    }}
                  />
                  Direct VIP WhatsApp Concierge · Online
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Glassmorphism Appointment Suite (Cols 6 to 12) */}
          <div
            style={{
              gridColumn: 'span 7',
              backgroundColor: 'rgba(16, 18, 22, 0.8)',
              backdropFilter: 'blur(28px)',
              border: '1px solid rgba(212, 175, 55, 0.25)',
              borderRadius: '32px',
              padding: '56px',
              boxShadow: '0 40px 100px rgba(0,0,0,0.85)',
            }}
          >
            {submitted ? (
              <div style={{ padding: '64px 0', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '18px' }}>
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
                  ACQUISITION DOSSIER INITIATED
                </span>
                <h3
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: 'clamp(2.4rem, 4vw, 3.2rem)',
                    color: 'var(--color-stone)',
                    fontWeight: 300,
                    lineHeight: 1.1,
                  }}
                >
                  Invitation Dispatched.
                </h3>
                <p
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '1rem',
                    color: 'var(--color-mist)',
                    lineHeight: 1.7,
                    maxWidth: '480px',
                    margin: '0 auto',
                    fontWeight: 300,
                  }}
                >
                  A senior client director has been personally allocated to your reservation for {formData.estate}. Your private invitation and arrival coordinates are being delivered via secure dispatch.
                </p>
                <div style={{ marginTop: '20px' }}>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="btn-ghost"
                    style={{ borderRadius: '100px' }}
                  >
                    Modify Request
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                <div>
                  <label
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.72rem',
                      letterSpacing: '0.16em',
                      textTransform: 'uppercase',
                      color: 'var(--color-mist)',
                      display: 'block',
                      marginBottom: '10px',
                    }}
                  >
                    Honorific & Full Name
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. Lord / Lady / Mr. / Dr. Alexander Sterling"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '16px 0',
                      backgroundColor: 'transparent',
                      border: 'none',
                      borderBottom: '1px solid rgba(212, 175, 55, 0.25)',
                      color: 'var(--color-stone)',
                      fontFamily: 'var(--font-sans)',
                      fontSize: '1.05rem',
                      outline: 'none',
                      transition: 'border-color 0.3s ease',
                    }}
                    onFocus={(e) => (e.target.style.borderBottomColor = 'var(--color-champagne)')}
                    onBlur={(e) => (e.target.style.borderBottomColor = 'rgba(212, 175, 55, 0.25)')}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
                  <div>
                    <label
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '0.72rem',
                        letterSpacing: '0.16em',
                        textTransform: 'uppercase',
                        color: 'var(--color-mist)',
                        display: 'block',
                        marginBottom: '10px',
                      }}
                    >
                      Telephone
                    </label>
                    <input
                      required
                      type="tel"
                      placeholder="+91 / +44 / +1"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '16px 0',
                        backgroundColor: 'transparent',
                        border: 'none',
                        borderBottom: '1px solid rgba(212, 175, 55, 0.25)',
                        color: 'var(--color-stone)',
                        fontFamily: 'var(--font-sans)',
                        fontSize: '1.05rem',
                        outline: 'none',
                        transition: 'border-color 0.3s ease',
                      }}
                      onFocus={(e) => (e.target.style.borderBottomColor = 'var(--color-champagne)')}
                      onBlur={(e) => (e.target.style.borderBottomColor = 'rgba(212, 175, 55, 0.25)')}
                    />
                  </div>

                  <div>
                    <label
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '0.72rem',
                        letterSpacing: '0.16em',
                        textTransform: 'uppercase',
                        color: 'var(--color-mist)',
                        display: 'block',
                        marginBottom: '10px',
                      }}
                    >
                      Private Email
                    </label>
                    <input
                      required
                      type="email"
                      placeholder="client@estate.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '16px 0',
                        backgroundColor: 'transparent',
                        border: 'none',
                        borderBottom: '1px solid rgba(212, 175, 55, 0.25)',
                        color: 'var(--color-stone)',
                        fontFamily: 'var(--font-sans)',
                        fontSize: '1.05rem',
                        outline: 'none',
                        transition: 'border-color 0.3s ease',
                      }}
                      onFocus={(e) => (e.target.style.borderBottomColor = 'var(--color-champagne)')}
                      onBlur={(e) => (e.target.style.borderBottomColor = 'rgba(212, 175, 55, 0.25)')}
                    />
                  </div>
                </div>

                {/* Estate of Interest Selector */}
                <div>
                  <label
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.72rem',
                      letterSpacing: '0.16em',
                      textTransform: 'uppercase',
                      color: 'var(--color-mist)',
                      display: 'block',
                      marginBottom: '14px',
                    }}
                  >
                    Estate Collection
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px' }}>
                    {['Crown Penthouse', 'Sky Villa', 'Ocean Horizon'].map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setFormData({ ...formData, estate: t })}
                        style={{
                          padding: '14px 10px',
                          backgroundColor: formData.estate === t ? 'rgba(212, 175, 55, 0.15)' : 'rgba(8, 9, 10, 0.6)',
                          color: formData.estate === t ? 'var(--color-champagne)' : 'var(--color-stone)',
                          border: formData.estate === t ? '1px solid var(--color-champagne)' : '1px solid rgba(212, 175, 55, 0.18)',
                          borderRadius: '12px',
                          fontFamily: 'var(--font-sans)',
                          fontSize: '0.74rem',
                          letterSpacing: '0.1em',
                          textTransform: 'uppercase',
                          fontWeight: 600,
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                        }}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Preferred Viewing Atmosphere / Light */}
                <div>
                  <label
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.72rem',
                      letterSpacing: '0.16em',
                      textTransform: 'uppercase',
                      color: 'var(--color-mist)',
                      display: 'block',
                      marginBottom: '14px',
                    }}
                  >
                    Preferred Viewing Atmosphere
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px' }}>
                    {[
                      { id: 'Morning Marine Light', label: 'Morning Marine Light (10:00 AM)' },
                      { id: 'Golden Hour Sunset', label: 'Golden Hour Sunset (05:30 PM)' },
                      { id: 'Twilight Champagne', label: 'Twilight Champagne (07:30 PM)' },
                    ].map((time) => (
                      <button
                        key={time.id}
                        type="button"
                        onClick={() => setFormData({ ...formData, timing: time.id })}
                        style={{
                          padding: '12px 14px',
                          backgroundColor: formData.timing === time.id ? 'rgba(212, 175, 55, 0.15)' : 'rgba(8, 9, 10, 0.6)',
                          color: formData.timing === time.id ? 'var(--color-champagne)' : 'var(--color-stone)',
                          border: formData.timing === time.id ? '1px solid var(--color-champagne)' : '1px solid rgba(212, 175, 55, 0.18)',
                          borderRadius: '12px',
                          fontFamily: 'var(--font-sans)',
                          fontSize: '0.68rem',
                          letterSpacing: '0.08em',
                          fontWeight: 500,
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          textAlign: 'center',
                        }}
                      >
                        {time.label}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn-luxury"
                  style={{
                    width: '100%',
                    padding: '20px',
                    marginTop: '8px',
                    borderRadius: '12px',
                  }}
                >
                  Reserve Private Marine Appointment →
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Viewing;