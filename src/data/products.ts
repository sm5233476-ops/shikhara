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
  category: 'footwear' | 'apparel' | 'limited';
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
    id: 'grail-01',
    name: 'GRAIL // 01 CYBER VOLT',
    code: 'GL-FTW-001',
    tagline: 'Technical High-Top Monolith',
    category: 'limited',
    price: 340,
    originalPrice: 420,
    stockLeft: 14,
    rating: 4.9,
    reviewsCount: 84,
    description:
      'Engineered for extreme urban terrain. Features a dual-density Vibram® sculpted lug outsole, translucent ripstop weatherproofing, and a custom anodized aluminum heel clamp.',
    specs: [
      'Vibram® Megagrip Sculpted Lug Outsole',
      'Waterproof Cordura® Ballistic Ripstop',
      'Anodized Aerospace Aluminum Heel Cage',
      'Ergonomic Dual-Density OrthoLite® Insole',
    ],
    colorways: [
      {
        name: 'Cyber Volt',
        hex: '#CCFF00',
        image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=1400&q=95',
      },
      {
        name: 'Stealth Obsidian',
        hex: '#1A1A1A',
        image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1400&q=95',
      },
      {
        name: 'Chalk Bone',
        hex: '#E5E2DC',
        image: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=1400&q=95',
      },
    ],
    sizes: [
      { size: 'US 7', inStock: true },
      { size: 'US 8', inStock: true },
      { size: 'US 8.5', inStock: true, lowStock: true },
      { size: 'US 9', inStock: true },
      { size: 'US 9.5', inStock: true },
      { size: 'US 10', inStock: true, lowStock: true },
      { size: 'US 10.5', inStock: false },
      { size: 'US 11', inStock: true },
      { size: 'US 12', inStock: false },
    ],
  },
  {
    id: 'grail-02',
    name: 'PHANTOM LOW // BLK',
    code: 'GL-FTW-002',
    tagline: 'Architectural Luxury Low-Top',
    category: 'footwear',
    price: 280,
    stockLeft: 22,
    rating: 4.8,
    reviewsCount: 62,
    description:
      'Minimalist brutalism captured in footwear. Crafted in Italy from full-grain matte calfskin with raw hand-stitched edges and a debossed technical serial number on the lateral flank.',
    specs: [
      'Italian Matte Full-Grain Calfskin',
      'Debossed Military Serial ID Tag',
      'Laser-Etched Natural Rubber Cupsole',
      'Waxed Cotton Tubular Laces',
    ],
    colorways: [
      {
        name: 'Pitch Black',
        hex: '#0F0F0F',
        image: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=1400&q=95',
      },
      {
        name: 'Alabaster White',
        hex: '#F0ECE1',
        image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=1400&q=95',
      },
    ],
    sizes: [
      { size: 'US 8', inStock: true },
      { size: 'US 9', inStock: true },
      { size: 'US 10', inStock: true },
      { size: 'US 11', inStock: true, lowStock: true },
      { size: 'US 12', inStock: true },
    ],
  },
  {
    id: 'grail-03',
    name: 'VORTEX SPEED RUNNER',
    code: 'GL-FTW-003',
    tagline: 'Exposed Carbon-Plated Racer',
    category: 'footwear',
    price: 310,
    stockLeft: 9,
    rating: 5.0,
    reviewsCount: 41,
    description:
      'Engineered for forward propulsion. Integrates a full-length curved carbon fiber launch plate suspended within ultra-responsive nitrogen-infused supercritical foam.',
    specs: [
      '3K Woven Carbon Fiber Spring Plate',
      'Nitrogen-Infused Rebound Midsole',
      'Engineered Monofilament Breathable Upper',
      'Total Weight: 184g per shoe',
    ],
    colorways: [
      {
        name: 'Acid Neon',
        hex: '#D4FF00',
        image: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=1400&q=95',
      },
      {
        name: 'Titanium Grey',
        hex: '#8C9099',
        image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=1400&q=95',
      },
    ],
    sizes: [
      { size: 'US 8.5', inStock: true },
      { size: 'US 9', inStock: true, lowStock: true },
      { size: 'US 9.5', inStock: false },
      { size: 'US 10', inStock: true },
      { size: 'US 10.5', inStock: true },
      { size: 'US 11', inStock: false },
    ],
  },
  {
    id: 'grail-04',
    name: 'TERRA FORGE GORE-TEX',
    code: 'GL-FTW-004',
    tagline: 'All-Weather Tactical Boot-Sneaker',
    category: 'footwear',
    price: 360,
    stockLeft: 18,
    rating: 4.9,
    reviewsCount: 53,
    description:
      'The convergence of tactical combat durability and athletic agility. Gore-Tex® membrane construction paired with German-engineered Fidlock® magnetic quick-release buckle.',
    specs: [
      'Gore-Tex® Waterproof Breathable Bootie',
      'German Fidlock® V-Buckle Magnetic Lacing',
      'Deep Kevlar-Reinforced Toe Bumper',
      'Vibram® Arctic Grip Compound',
    ],
    colorways: [
      {
        name: 'Desert Earth',
        hex: '#B8977E',
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1400&q=95',
      },
      {
        name: 'Blackout Tactical',
        hex: '#121212',
        image: 'https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?auto=format&fit=crop&w=1400&q=95',
      },
    ],
    sizes: [
      { size: 'US 8', inStock: true },
      { size: 'US 9', inStock: true },
      { size: 'US 10', inStock: true },
      { size: 'US 11', inStock: true },
      { size: 'US 12', inStock: true, lowStock: true },
    ],
  },
  {
    id: 'grail-apparel-01',
    name: 'BALLISTIC MA-1 BOMBER',
    code: 'GL-APP-001',
    tagline: 'Oversized Tactical Flight Jacket',
    category: 'apparel',
    price: 420,
    stockLeft: 7,
    rating: 5.0,
    reviewsCount: 29,
    description:
      'Heavyweight tactical outerwear. Constructed from water-repellent Japanese Cordura® nylon with Primaloft® Gold insulation and reversible high-visibility volt interior lining.',
    specs: [
      'Heavyweight Japanese Cordura® 500D Nylon',
      'Primaloft® Gold Thermal Insulation',
      'Reversible Emergency Volt Interior',
      'Gunmetal YKK® Two-Way Dual Pull Zippers',
    ],
    colorways: [
      {
        name: 'Washed Charcoal',
        hex: '#2B2B2B',
        image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=1400&q=95',
      },
    ],
    sizes: [
      { size: 'S', inStock: true },
      { size: 'M', inStock: true, lowStock: true },
      { size: 'L', inStock: true },
      { size: 'XL', inStock: false },
    ],
  },
  {
    id: 'grail-apparel-02',
    name: 'HEAVYWEIGHT 500GSM HOODIE',
    code: 'GL-APP-002',
    tagline: 'Boxy French Terry Essential',
    category: 'apparel',
    price: 180,
    stockLeft: 31,
    rating: 4.8,
    reviewsCount: 112,
    description:
      'Custom milled 500 GSM organic cotton loopback French terry. Dropped shoulders, double-layered architectural hood with zero drawstrings, and kangaroo pocket hidden seam.',
    specs: [
      '500 GSM 100% Organic Cotton French Terry',
      'Oversized Boxy Silhouette with Raw Hem Ribbing',
      'Preshrunk with Vintage Enzyme Garment Wash',
      'Tonal High-Density Rubberized Logo Print',
    ],
    colorways: [
      {
        name: 'Vintage Washed Black',
        hex: '#1E1E1E',
        image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1400&q=95',
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
