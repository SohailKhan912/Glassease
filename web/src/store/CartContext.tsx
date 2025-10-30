"use client";
import { createContext, useContext, useEffect, useMemo, useState, ReactNode } from "react";

export type CartItem = { id: string; title: string; price: number; image?: string; qty: number };

type CartContextType = {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'qty'>, qty?: number) => void;
  removeItem: (id: string) => void;
  clear: () => void;
  count: number;
  total: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('cart');
      if (raw) setItems(JSON.parse(raw));
    } catch {}
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  const api: CartContextType = useMemo(() => ({
    items,
    addItem: (item, qty = 1) => {
      setItems(prev => {
        const existing = prev.find(x => x.id === item.id);
        if (existing) return prev.map(x => x.id === item.id ? { ...x, qty: x.qty + qty } : x);
        return [...prev, { ...item, qty }];
      });
    },
    removeItem: (id) => setItems(prev => prev.filter(x => x.id !== id)),
    clear: () => setItems([]),
    count: items.reduce((s, it) => s + it.qty, 0),
    total: items.reduce((s, it) => s + it.qty * it.price, 0)
  }), [items]);

  return <CartContext.Provider value={api}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
