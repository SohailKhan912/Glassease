"use client";
import { useCart } from "@/src/store/CartContext";

export default function CartPage() {
  const { items, removeItem, clear, total } = useCart();
  return (
    <div className="max-w-3xl mx-auto mt-6 bg-white rounded shadow p-6 dark:bg-neutral-800">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      {items.length === 0 && <div>Your cart is empty.</div>}
      {items.map(it => (
        <div key={it.id} className="flex items-center gap-4 py-3 border-b border-gray-200 dark:border-neutral-700">
          <img src={it.image || "/file.svg"} alt={it.title} className="w-20 h-16 object-cover rounded" />
          <div className="flex-1">
            <div className="font-semibold">{it.title}</div>
            <div className="text-sm text-gray-500">Qty: {it.qty}</div>
          </div>
          <div className="font-bold">₹{it.price * it.qty}</div>
          <button className="ml-2 text-red-600 hover:underline" onClick={()=>removeItem(it.id)}>Remove</button>
        </div>
      ))}
      {items.length > 0 && (
        <div className="flex justify-between items-center mt-4">
          <button className="text-gray-700 hover:underline" onClick={clear}>Clear Cart</button>
          <div className="text-xl font-bold">Total: ₹{total}</div>
        </div>
      )}
    </div>
  );
}
