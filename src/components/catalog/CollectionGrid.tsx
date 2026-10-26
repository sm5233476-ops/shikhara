// src/components/catalog/CollectionGrid.tsx
import React, { useState, useMemo } from 'react';
import { PRODUCTS, type Product } from '../../data/products';
import { useCartStore } from '../../store/useCartStore';

type CategoryFilter = 'all' | 'footwear' | 'apparel';

interface CollectionGridProps {
  onSelectProduct: (p: Product) => void;
}

export const CollectionGrid: React.FC<CollectionGridProps> = ({ onSelectProduct }) => {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('all');
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const addItem = useCartStore((s) => s.addItem);

  const filteredProducts = useMemo(() => {
    if (activeCategory === 'all') return PRODUCTS;
    return PRODUCTS.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  const handleQuickAdd = (e: React.MouseEvent, product: Product, size: string) => {
    e.stopPropagation();
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.colorways[0].image,
      colorway: product.colorways[0].name,
      size,
    });
  };

  return (
    <section id="collection" style={{ padding: '80px 0 120px', maxWidth: '1380px', margin: '0 auto', width: '100%' }}>
      {/* Almada Label Style Minimalist Filter Rail */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          borderBottom: '1px solid var(--border-subtle)',
          paddingBottom: '20px',
          marginBottom: '48px',
          flexWrap: 'wrap',
          gap: '20px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '24px' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.4rem', fontWeight: 300 }}>
            Archive Editions
          </h2>
          <span className="mono-tag">[{filteredProducts.length} DESIGNS]</span>
        </div>

        {/* Category Pills */}
        <div style={{ display: 'flex', gap: '8px' }}>
          {[
            { id: 'all', label: 'All Silhouettes' },
            { id: 'footwear', label: 'Footwear' },
            { id: 'apparel', label: 'Ready to Wear' },
          ].map((cat) => {
            const isSelected = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as CategoryFilter)}
                style={{
                  padding: '8px 18px',
                  backgroundColor: isSelected ? 'var(--color-bone)' : 'transparent',
                  color: isSelected ? '#080808' : 'var(--color-bone)',
                  border: isSelected ? '1px solid var(--color-bone)' : '1px solid var(--border-subtle)',
                  borderRadius: '100px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                }}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Uniform 4:5 Luxury Portrait Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '36px',
        }}
      >
        {filteredProducts.map((p) => {
          const isHovered = hoveredCard === p.id;
          return (
            <div
              key={p.id}
              onClick={() => {
                onSelectProduct(p);
                window.scrollTo({ top: 80, behavior: 'smooth' });
              }}
              onMouseEnter={() => setHoveredCard(p.id)}
              onMouseLeave={() => setHoveredCard(null)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
                transition: 'transform 0.4s var(--ease-luxury)',
              }}
            >
              {/* Uniform 4:5 Portrait Card Visual Stage */}
              <div
                style={{
                  width: '100%',
                  aspectRatio: '4 / 5', // 100% Uniform across all products
                  backgroundColor: 'var(--bg-surface)',
                  borderRadius: '16px',
                  border: isHovered ? '1px solid var(--color-accent)' : '1px solid var(--border-subtle)',
                  overflow: 'hidden',
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '32px',
                  transition: 'border-color 0.3s ease',
                }}
              >
                <img
                  src={p.colorways[0].image}
                  alt={p.name}
                  style={{
                    maxHeight: '75%',
                    maxWidth: '85%',
                    objectFit: 'contain',
                    transform: isHovered ? 'scale(1.08) translateY(-4px)' : 'scale(1)',
                    transition: 'transform 0.6s var(--ease-luxury)',
                    filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.8))',
                  }}
                />

                {/* Micro Stock Tag */}
                <div style={{ position: 'absolute', top: '16px', left: '16px' }}>
                  <span className="mono-tag" style={{ fontSize: '9px', color: p.stockLeft < 10 ? '#E74C3C' : 'var(--color-bone-muted)' }}>
                    {p.stockLeft < 10 ? `[ LOW: ${p.stockLeft} LEFT ]` : `[ ${p.code} ]`}
                  </span>
                </div>

                {/* Quick Add Pill Drawer on Hover */}
                {isHovered && (
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '16px',
                      left: '16px',
                      right: '16px',
                      backgroundColor: 'rgba(8, 8, 8, 0.92)',
                      backdropFilter: 'blur(12px)',
                      borderRadius: '100px',
                      padding: '8px 12px',
                      border: '1px solid var(--border-subtle)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      animation: 'fadeIn 0.2s ease forwards',
                    }}
                  >
                    <span className="mono-tag" style={{ fontSize: '9px' }}>QUICK ADD:</span>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      {p.sizes.slice(0, 4).map((sz) => (
                        <button
                          key={sz.size}
                          disabled={!sz.inStock}
                          onClick={(e) => handleQuickAdd(e, p, sz.size)}
                          style={{
                            padding: '4px 8px',
                            backgroundColor: 'transparent',
                            color: sz.inStock ? 'var(--color-bone)' : 'rgba(244,241,234,0.2)',
                            border: '1px solid var(--border-subtle)',
                            borderRadius: '100px',
                            fontFamily: 'var(--font-mono)',
                            fontSize: '9px',
                            cursor: sz.inStock ? 'pointer' : 'not-allowed',
                          }}
                          onMouseEnter={(ev) => {
                            if (sz.inStock) {
                              ev.currentTarget.style.backgroundColor = 'var(--color-bone)';
                              ev.currentTarget.style.color = '#080808';
                            }
                          }}
                          onMouseLeave={(ev) => {
                            if (sz.inStock) {
                              ev.currentTarget.style.backgroundColor = 'transparent';
                              ev.currentTarget.style.color = 'var(--color-bone)';
                            }
                          }}
                        >
                          {sz.size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Editorial Caption Under Card (Almada Label Style) */}
              <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <div>
                  <h3 style={{ fontSize: '1rem', fontWeight: 600, letterSpacing: '0.02em', color: 'var(--color-bone)' }}>
                    {p.name}
                  </h3>
                  <span style={{ fontSize: '0.84rem', color: 'var(--color-bone-muted)', marginTop: '2px', display: 'block' }}>
                    {p.tagline}
                  </span>
                </div>

                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1.05rem', fontWeight: 700, color: 'var(--color-bone)' }}>
                  ${p.price}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default CollectionGrid;
