"use client";
import { createContext, useContext, useEffect, useMemo, useState, ReactNode } from "react";

type WishItem = { id: string; title: string; image?: string };

type WishlistContextType = {
  items: WishItem[];
  add: (item: WishItem) => void;
  remove: (id: string) => void;
  count: number;
};

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<WishItem[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('wishlist');
      if (raw) setItems(JSON.parse(raw));
    } catch {}
  }, []);

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(items));
  }, [items]);

  const api = useMemo(() => ({
    items,
    add: (item: WishItem) => setItems(prev => prev.some(x => x.id === item.id) ? prev : [...prev, item]),
    remove: (id: string) => setItems(prev => prev.filter(x => x.id !== id)),
    count: items.length
  }), [items]);

  return <WishlistContext.Provider value={api}>{children}</WishlistContext.Provider>;
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error('useWishlist must be used within WishlistProvider');
  return ctx;
}
