"use client";
import Link from "next/link";
import { useCart } from "../store/CartContext";
import { useWishlist } from "../store/WishlistContext";

export default function CartWishlistIcons() {
  const { count: cartCount } = useCart();
  const { count: wishlistCount } = useWishlist();
  return (
    <div className="flex items-center gap-6">
      <Link href="/wishlist" className="relative">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="#888"/></svg>
        {wishlistCount > 0 && <span className="absolute -top-2 -right-2 text-xs bg-blue-600 text-white rounded-full px-1 min-w-5 h-5 flex items-center justify-center">{wishlistCount}</span>}
      </Link>
      <Link href="/cart" className="relative">
        <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path d="M7 18c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM7.16 15l.84-2h8.29c.76 0 1.44-.43 1.76-1.09l3.02-6.03a1 1 0 0 0-.9-1.45H5.21L4.27 2.59A1.003 1.003 0 0 0 3.3 2H1v2h1l3.6 7.59-1.35 2.44A1 1 0 0 0 5 15h2.16zm12.24-9l-2.76 5.5H8.53L6.16 6h13.24z" fill="#888"/></svg>
        {cartCount > 0 && <span className="absolute -top-2 -right-2 text-xs bg-orange-500 text-white rounded-full px-1 min-w-5 h-5 flex items-center justify-center">{cartCount}</span>}
      </Link>
    </div>
  );
}
