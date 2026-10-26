// src/data/products.ts
export interface Colorway {
  name: string;
  hex: string;
  image: string;
}

export interface SizeOption {
  size: string;
  inStock: boolean;
  lowStock?: boolean;
}

export interface Product {
  id: string;
  name: string;
  code: string;
  tagline: string;
  category: 'footwear' | 'apparel' | 'objects';
  price: number;
  originalPrice?: number;
  stockLeft: number;
  rating: number;
  reviewsCount: number;
  description: string;
  specs: string[];
  colorways: Colorway[];
  sizes: SizeOption[];
}

export const PRODUCTS: Product[] = [
  {
    id: 'apex-01',
    name: 'MONOLITH // 01 RUNNER',
    code: 'VAL-FTW-001',
    tagline: 'Brushed Italian Suede & Vibram Sphere Lug',
    category: 'footwear',
    price: 460,
    originalPrice: 540,
    stockLeft: 12,
    rating: 5.0,
    reviewsCount: 78,
    description:
      'Hand-finished in Civitanova Marche, Italy. Sculpted from brushed Tuscan calf suede, breathable technical ripstop, and a custom architectural Vibram® Sphere lug outsole for silent kinetic rebound.',
    specs: [
      'Hand-Brushed Tuscan Calf Suede',
      'Sculpted Vibram® Sphere Outsole',
      'Anodized Titanium Hardware',
      'Full-Grain Glove Leather Lining',
    ],
    colorways: [
      {
        name: 'Onyx Black',
        hex: '#111111',
        // High-end seamless dark studio sneaker (NO square white box!)
        image: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=1200&q=95',
      },
      {
        name: 'Alabaster Bone',
        hex: '#E8E4DC',
        image: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=1200&q=95',
      },
      {
        name: 'Raw Sand',
        hex: '#C5B39A',
        image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1200&q=95',
      },
    ],
    sizes: [
      { size: 'EU 40', inStock: true },
      { size: 'EU 41', inStock: true },
      { size: 'EU 42', inStock: true, lowStock: true },
      { size: 'EU 43', inStock: true },
      { size: 'EU 44', inStock: true, lowStock: true },
      { size: 'EU 45', inStock: false },
    ],
  },
  {
    id: 'apex-02',
    name: 'KINETIX LOW // SLATE',
    code: 'VAL-FTW-002',
    tagline: 'Architectural Minimalist Low-Top',
    category: 'footwear',
    price: 390,
    stockLeft: 18,
    rating: 4.9,
    reviewsCount: 54,
    description:
      'A study in quiet reduction. Features continuous leather welt stitching, blind-embossed studio serial numbers, and a tapered natural rubber cupsole engineered for ergonomic weight distribution.',
    specs: [
      'Matte Full-Grain Nappa Leather',
      'Blind-Embossed Technical Studio Code',
      'Natural Rubber Cushioning Midsole',
      'Waxed Organic Cotton Laces',
    ],
    colorways: [
      {
        name: 'Slate Grey',
        hex: '#2B2E34',
        image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=1200&q=95',
      },
      {
        name: 'Chalk White',
        hex: '#F3F0E8',
        image: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=1200&q=95',
      },
    ],
    sizes: [
      { size: 'EU 40', inStock: true },
      { size: 'EU 41', inStock: true },
      { size: 'EU 42', inStock: true },
      { size: 'EU 43', inStock: true },
      { size: 'EU 44', inStock: false },
    ],
  },
  {
    id: 'apex-03',
    name: 'AETHER MARATHON RACER',
    code: 'VAL-FTW-003',
    tagline: 'Exposed Carbon-Spring Silhouette',
    category: 'footwear',
    price: 480,
    stockLeft: 7,
    rating: 5.0,
    reviewsCount: 39,
    description:
      'Ultra-lightweight aerodynamic road racer. Incorporates a 3K woven carbon fiber spring plate suspended between nitrogen-injected bio-foam for exponential kinetic rebound.',
    specs: [
      'Full-Length 3K Carbon Fiber Plate',
      'Supercritical Nitrogen Bio-Foam',
      'Seamless Monofilament Mesh Upper',
      'Total Weight: 172 Grams',
    ],
    colorways: [
      {
        name: 'Titanium Sand',
        hex: '#B5AFA6',
        image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=1200&q=95',
      },
    ],
    sizes: [
      { size: 'EU 41', inStock: true },
      { size: 'EU 42', inStock: true, lowStock: true },
      { size: 'EU 43', inStock: true },
      { size: 'EU 44', inStock: false },
    ],
  },
  {
    id: 'apex-04',
    name: 'TERRA RECOVERY MULE',
    code: 'VAL-FTW-004',
    tagline: 'Seamless Molded High-Density Foam',
    category: 'footwear',
    price: 190,
    stockLeft: 26,
    rating: 4.8,
    reviewsCount: 92,
    description:
      'Ergonomic post-movement footwear. Pressure-molded from closed-cell mineral EVA with integrated arch-contouring and sculpted ventilation vents for breathability.',
    specs: [
      'Molded Closed-Cell Mineral Foam',
      'Deep-Groove Kinetic Tread',
      'Anatomical Footbed Architecture',
      'Waterproof & Antimicrobial',
    ],
    colorways: [
      {
        name: 'Mineral Stone',
        hex: '#8C857B',
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=95',
      },
    ],
    sizes: [
      { size: 'EU 40', inStock: true },
      { size: 'EU 41', inStock: true },
      { size: 'EU 42', inStock: true },
      { size: 'EU 43', inStock: true },
    ],
  },
  {
    id: 'apparel-01',
    name: 'STRUCTURED SHEARLING COAT',
    code: 'VAL-APP-001',
    tagline: 'Spanish Merino Lambswool Outerwear',
    category: 'apparel',
    price: 1450,
    stockLeft: 5,
    rating: 5.0,
    reviewsCount: 19,
    description:
      'Spanish Merino double-face shearling. Designed with dropped raglan shoulders, deep horn buttons, and raw hand-cut edges that develop a rich patina with wear.',
    specs: [
      '100% Spanish Merino Lambswool Shearling',
      'Natural Buffalo Horn Button Closures',
      'Concealed Microfiber Lined Pockets',
      'Tailored in Porto, Portugal',
    ],
    colorways: [
      {
        name: 'Espresso Chocolate',
        hex: '#2E221D',
        image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=1200&q=95',
      },
    ],
    sizes: [
      { size: 'S', inStock: true },
      { size: 'M', inStock: true, lowStock: true },
      { size: 'L', inStock: true },
    ],
  },
  {
    id: 'apparel-02',
    name: 'CASHMERE HEAVY HOODIE',
    code: 'VAL-APP-002',
    tagline: '480 GSM Brushed Mongolian Cashmere-Cotton',
    category: 'apparel',
    price: 360,
    stockLeft: 20,
    rating: 4.9,
    reviewsCount: 64,
    description:
      'Heavily structured luxury knitwear. Milled from 480 GSM organic cotton blended with Mongolian cashmere for extreme thermal comfort and architectural drape.',
    specs: [
      '480 GSM Cotton-Cashmere Fleece',
      'Seamless Double-Layer Sculpted Hood',
      'Preshrunk with Natural Botanical Enzymes',
      'Tonal Studio Blind Stitch Embroidery',
    ],
    colorways: [
      {
        name: 'Vintage Cream',
        hex: '#EBE5D8',
        image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1200&q=95',
      },
    ],
    sizes: [
      { size: 'S', inStock: true },
      { size: 'M', inStock: true },
      { size: 'L', inStock: true },
      { size: 'XL', inStock: true },
    ],
  },
];
