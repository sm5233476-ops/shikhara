// src/components/catalog/CollectionGrid.tsx
import React, { useState, useMemo } from 'react';
import { PRODUCTS, type Product } from '../../data/products';
import { useCartStore } from '../../store/useCartStore';

type CategoryFilter = 'all' | 'limited' | 'footwear' | 'apparel';
type SortOption = 'newest' | 'price-asc' | 'price-desc' | 'stock';

interface CollectionGridProps {
  onSelectProduct: (p: Product) => void;
}

export const CollectionGrid: React.FC<CollectionGridProps> = ({ onSelectProduct }) => {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('all');
  const [activeSort, setActiveSort] = useState<SortOption>('newest');
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const addItem = useCartStore((s) => s.addItem);

  // Instant Multi-Filter & Search Engine
  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];

    // Category Filter
    if (activeCategory !== 'all') {
      result = result.filter((p) => p.category === activeCategory);
    }

    // Keyword Search
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.tagline.toLowerCase().includes(q) ||
          p.code.toLowerCase().includes(q)
      );
    }

    // Sorting
    if (activeSort === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (activeSort === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (activeSort === 'stock') {
      result.sort((a, b) => a.stockLeft - b.stockLeft);
    }

    return result;
  }, [activeCategory, activeSort, searchQuery]);

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
    <section id="collection" style={{ marginTop: '100px', marginBottom: '80px' }}>
      {/* Search & Filter Header Bar */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          borderBottom: '1px solid var(--border-subtle)',
          paddingBottom: '24px',
          marginBottom: '40px',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          {/* Live Search Input */}
          <div style={{ position: 'relative', width: '100%', maxWidth: '380px' }}>
            <input
              type="text"
              placeholder="SEARCH DROPS // (e.g. VOLT, GORE-TEX, BOMBER)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 16px',
                backgroundColor: 'var(--bg-surface)',
                border: searchQuery ? '1px solid var(--color-volt)' : '1px solid var(--border-subtle)',
                borderRadius: '8px',
                color: '#fff',
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                outline: 'none',
                textTransform: 'uppercase',
              }}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: 'var(--color-muted)',
                  cursor: 'pointer',
                  fontSize: '12px',
                }}
              >
                ✕
              </button>
            )}
          </div>

          {/* Sort Selector */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span className="mono-label" style={{ fontSize: '10px' }}>
              SORT //
            </span>
            <select
              value={activeSort}
              onChange={(e) => setActiveSort(e.target.value as SortOption)}
              style={{
                backgroundColor: 'var(--bg-surface)',
                color: 'var(--color-white)',
                border: '1px solid var(--border-subtle)',
                padding: '8px 14px',
                borderRadius: '6px',
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                outline: 'none',
                cursor: 'pointer',
              }}
            >
              <option value="newest">NEWEST DROPS</option>
              <option value="price-asc">PRICE: LOW → HIGH</option>
              <option value="price-desc">PRICE: HIGH → LOW</option>
              <option value="stock">LOWEST STOCK FIRST</option>
            </select>
          </div>
        </div>

        {/* Category Tabs */}
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {[
            { id: 'all', label: `ALL ARCHIVES [${PRODUCTS.length}]` },
            { id: 'limited', label: 'LIMITED EDITIONS' },
            { id: 'footwear', label: 'FOOTWEAR' },
            { id: 'apparel', label: 'APPAREL' },
          ].map((cat) => {
            const isSelected = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as CategoryFilter)}
                style={{
                  padding: '10px 18px',
                  backgroundColor: isSelected ? 'var(--color-volt)' : 'var(--bg-surface)',
                  color: isSelected ? '#000000' : 'var(--color-white)',
                  border: isSelected ? '1px solid var(--color-volt)' : '1px solid var(--border-subtle)',
                  borderRadius: '6px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  letterSpacing: '0.1em',
                  transition: 'all 0.2s ease',
                }}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Responsive Product Grid */}
      {filteredProducts.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 0' }}>
          <div className="mono-label" style={{ color: 'var(--color-crimson)', fontSize: '13px' }}>
            NO ARCHIVES MATCHED YOUR SEARCH //
          </div>
          <button
            onClick={() => {
              setSearchQuery('');
              setActiveCategory('all');
            }}
            className="btn-ghost-dark"
            style={{ marginTop: '16px' }}
          >
            RESET ALL FILTERS
          </button>
        </div>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '24px',
          }}
        >
          {filteredProducts.map((p) => {
            const isHovered = hoveredCard === p.id;
            return (
              <div
                key={p.id}
                onClick={() => {
                  onSelectProduct(p);
                  window.scrollTo({ top: 120, behavior: 'smooth' });
                }}
                onMouseEnter={() => setHoveredCard(p.id)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{
                  backgroundColor: 'var(--bg-surface)',
                  border: isHovered ? '1px solid var(--color-volt)' : '1px solid var(--border-subtle)',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  padding: '24px',
                  cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  transform: isHovered ? 'translateY(-6px)' : 'none',
                  boxShadow: isHovered ? '0 20px 40px rgba(0,0,0,0.8)' : 'none',
                  position: 'relative',
                }}
              >
                {/* Card Header Tags */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 2 }}>
                  <span className="mono-label" style={{ color: p.stockLeft < 10 ? 'var(--color-crimson)' : 'var(--color-volt)' }}>
                    {p.stockLeft < 10 ? `ONLY ${p.stockLeft} LEFT` : `IN STOCK [${p.stockLeft}]`}
                  </span>
                  <span className="mono-label">{p.code}</span>
                </div>

                {/* Product Visual */}
                <div
                  style={{
                    height: '240px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    margin: '20px 0',
                  }}
                >
                  <img
                    src={p.colorways[0].image}
                    alt={p.name}
                    style={{
                      maxHeight: '210px',
                      maxWidth: '100%',
                      objectFit: 'contain',
                      transform: isHovered ? 'scale(1.08) rotate(-3deg)' : 'scale(1)',
                      transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                      filter: 'drop-shadow(0 15px 25px rgba(0,0,0,0.7))',
                    }}
                  />

                  {/* Quick-Add Size Overlay on Hover */}
                  {isHovered && (
                    <div
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        backgroundColor: 'rgba(10, 10, 10, 0.94)',
                        backdropFilter: 'blur(8px)',
                        padding: '12px',
                        borderRadius: '8px',
                        border: '1px solid var(--border-volt)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '8px',
                      }}
                    >
                      <span className="mono-label" style={{ fontSize: '9px', textAlign: 'center', color: 'var(--color-volt)' }}>
                        QUICK ADD SIZE //
                      </span>
                      <div style={{ display: 'flex', gap: '6px', justifyContent: 'center', flexWrap: 'wrap' }}>
                        {p.sizes.slice(0, 5).map((sz) => (
                          <button
                            key={sz.size}
                            disabled={!sz.inStock}
                            onClick={(e) => handleQuickAdd(e, p, sz.size)}
                            style={{
                              padding: '4px 8px',
                              backgroundColor: sz.inStock ? 'var(--bg-surface)' : 'transparent',
                              color: sz.inStock ? '#ffffff' : 'rgba(255,255,255,0.2)',
                              border: '1px solid var(--border-subtle)',
                              borderRadius: '4px',
                              fontFamily: 'var(--font-mono)',
                              fontSize: '10px',
                              cursor: sz.inStock ? 'pointer' : 'not-allowed',
                              fontWeight: 700,
                            }}
                            onMouseEnter={(ev) => {
                              if (sz.inStock) {
                                ev.currentTarget.style.backgroundColor = 'var(--color-volt)';
                                ev.currentTarget.style.color = '#000';
                              }
                            }}
                            onMouseLeave={(ev) => {
                              if (sz.inStock) {
                                ev.currentTarget.style.backgroundColor = 'var(--bg-surface)';
                                ev.currentTarget.style.color = '#fff';
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

                {/* Card Footer Info */}
                <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: 800, letterSpacing: '0.02em' }}>{p.name}</h3>
                    <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 800, fontSize: '1.1rem', color: 'var(--color-volt)' }}>
                      ${p.price}
                    </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '6px' }}>
                    <span className="mono-label" style={{ fontSize: '10px' }}>
                      {p.colorways.length} COLORWAYS
                    </span>
                    <span className="mono-label" style={{ fontSize: '10px', color: 'var(--color-muted)' }}>
                      ★ {p.rating} ({p.reviewsCount})
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default CollectionGrid;
