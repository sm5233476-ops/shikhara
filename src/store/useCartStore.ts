// src/store/useCartStore.ts
import { create } from 'zustand';

export interface CartItem {
  id: string; // Composite key: `${productId}-${colorway}-${size}`
  productId: string;
  name: string;
  price: number;
  image: string;
  colorway: string;
  size: string;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  isCartOpen: boolean;
  promoCode: string | null;
  discountRate: number; // e.g. 0.10 for 10%

  // Actions
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addItem: (item: Omit<CartItem, 'id' | 'quantity'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  applyPromo: (code: string) => boolean;
  removePromo: () => void;
  clearCart: () => void;

  // Computed Selectors
  getSubtotal: () => number;
  getShipping: () => number;
  getDiscount: () => number;
  getTotal: () => number;
  getItemCount: () => number;
  getFreeShippingProgress: () => number; // 0 to 100%
}

const FREE_SHIPPING_THRESHOLD = 250;
const STANDARD_SHIPPING_FLAT = 20;

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  isCartOpen: false,
  promoCode: null,
  discountRate: 0,

  openCart: () => set({ isCartOpen: true }),
  closeCart: () => set({ isCartOpen: false }),
  toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),

  addItem: (newItem) => {
    set((state) => {
      const compositeId = `${newItem.productId}-${newItem.colorway}-${newItem.size}`;
      const existingIdx = state.items.findIndex((i) => i.id === compositeId);

      if (existingIdx > -1) {
        const updated = [...state.items];
        updated[existingIdx].quantity += 1;
        return { items: updated, isCartOpen: true };
      }

      return {
        items: [...state.items, { ...newItem, id: compositeId, quantity: 1 }],
        isCartOpen: true,
      };
    });
  },

  removeItem: (id) => {
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    }));
  },

  updateQuantity: (id, delta) => {
    set((state) => {
      const updated = state.items
        .map((item) => {
          if (item.id === id) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null);

      return { items: updated };
    });
  },

  applyPromo: (code: string) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'GRAIL10' || clean === 'VIP10') {
      set({ promoCode: clean, discountRate: 0.1 });
      return true;
    }
    if (clean === 'GRAIL20') {
      set({ promoCode: clean, discountRate: 0.2 });
      return true;
    }
    return false;
  },

  removePromo: () => set({ promoCode: null, discountRate: 0 }),

  clearCart: () => set({ items: [], promoCode: null, discountRate: 0 }),

  // Computations
  getSubtotal: () => {
    return get().items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  },

  getDiscount: () => {
    const subtotal = get().getSubtotal();
    return Math.round(subtotal * get().discountRate);
  },

  getShipping: () => {
    const subtotal = get().getSubtotal();
    if (subtotal === 0) return 0;
    return subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING_FLAT;
  },

  getTotal: () => {
    const subtotal = get().getSubtotal();
    const discount = get().getDiscount();
    const shipping = get().getShipping();
    return Math.max(0, subtotal - discount + shipping);
  },

  getItemCount: () => {
    return get().items.reduce((total, item) => total + item.quantity, 0);
  },

  getFreeShippingProgress: () => {
    const subtotal = get().getSubtotal();
    return Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));
  },
}));

export default useCartStore;
