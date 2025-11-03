"use client";
import { useWishlist } from "@/store/WishlistContext";

export default function WishlistPage() {
  const { items, remove } = useWishlist();
  return (
    <div className="max-w-3xl mx-auto mt-6 bg-white rounded shadow p-6 dark:bg-neutral-800">
      <h1 className="text-2xl font-bold mb-4">Your Wishlist</h1>
      {items.length === 0 && <div>No items in wishlist.</div>}
      {items.map(it => (
        <div key={it.id} className="flex items-center gap-4 py-3 border-b border-gray-200 dark:border-neutral-700">
          <img src={it.image || "/file.svg"} alt={it.title} className="w-20 h-16 object-cover rounded" />
          <div className="flex-1">
            <div className="font-semibold">{it.title}</div>
          </div>
          <button className="ml-2 text-red-600 hover:underline" onClick={()=>remove(it.id)}>Remove</button>
        </div>
      ))}
    </div>
  );
}
