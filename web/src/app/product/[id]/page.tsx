"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getJSON } from "@/src/lib/api";
import { useCart } from "@/src/store/CartContext";
import { useWishlist } from "@/src/store/WishlistContext";
import Script from "next/script";

type Product = { _id: string; title: string; price?: { amount: number }; images?: string[]; slug?: string; category?: string; modelUrl?: string };

export default function ProductPage({ params }: { params: { id: string }}) {
  const [p, setP] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);
  const { addItem } = useCart();
  const { add } = useWishlist();

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const prod = await getJSON<Product>(`/api/products/detail/${params.id}`);
        setP(prod);
      } finally {
        setLoading(false);
      }
    })();
  }, [params.id]);

  if (loading) return <div className="text-center my-20">Loading...</div>;
  if (!p) return <div className="text-center my-20">Product not found</div>;

  const price = p.price?.amount ?? 0;
  const image = p.images?.[0] || "/file.svg";

  return (
    <div className="max-w-4xl mx-auto mt-6 bg-white dark:bg-neutral-800 rounded shadow p-6">
      <Link href="/catalog" className="text-blue-500 hover:underline">← Back to Catalog</Link>
      <div className="flex flex-col md:flex-row gap-8 mt-3">
        <img src={image} alt={p.title} className="rounded w-full max-w-xs aspect-[4/3] object-cover" />
        <div className="flex-1">
          <h1 className="font-extrabold text-2xl mb-2">{p.title}</h1>
          <div className="text-lg font-bold text-blue-700 mb-3">₹{price}</div>
          <div className="flex gap-3 mb-6">
            <button className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700"
              onClick={() => addItem({ id: p._id, title: p.title, price, image }, 1)}
            >Add to Cart</button>
            <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 rounded px-4 py-2"
              onClick={() => add({ id: p._id, title: p.title, image })}
            >Add to Wishlist</button>
          </div>
          <div className="text-gray-500 mb-2">Category: {p.category || '-'}</div>
          <div className="my-8">
            <h2 className="font-bold mb-2">AR/3D Preview</h2>
            {p.modelUrl ? (
              <>
                <Script type="module" src="https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js" />
                {/* @ts-ignore */}
                <model-viewer src={p.modelUrl} ar ar-modes="webxr scene-viewer quick-look" camera-controls autoplay style={{ width: '100%', height: '400px', background: 'transparent' }} />
              </>
            ) : (
              <div className="aspect-video bg-gray-200 dark:bg-neutral-700 rounded flex items-center justify-center text-gray-400">[Preview will appear here]</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
