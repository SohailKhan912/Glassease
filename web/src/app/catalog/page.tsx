"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getJSON } from "@/lib/api";
import { useCart } from "@/store/CartContext";
import { useWishlist } from "@/store/WishlistContext";

type Product = { _id: string; title: string; price?: { amount: number }; images?: string[]; slug?: string };

type ProductsResp = { items: Product[]; total: number; page: number; pages: number };

const DEMO_CATEGORIES = ["All", "Doors", "Windows", "Accessories"];

export default function CatalogPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("createdAt:desc");
  const [data, setData] = useState<ProductsResp | null>(null);
  const [loading, setLoading] = useState(false);
  const { addItem } = useCart();
  const { add } = useWishlist();

  async function load() {
    setLoading(true);
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    if (category !== "All") params.set("category", category.toLowerCase());
    params.set("sort", sort);
    params.set("limit", "24");
    const resp = await getJSON<ProductsResp>(`/api/products?${params.toString()}`);
    setData(resp);
    setLoading(false);
  }

  useEffect(() => { load(); /* eslint-disable-next-line react-hooks/exhaustive-deps */ }, [sort]);

  return (
    <div className="flex gap-8 mt-6">
      <aside className="hidden md:block w-64">
        <div className="bg-white rounded shadow p-4">
          <div className="font-bold mb-2">Categories</div>
          {DEMO_CATEGORIES.map(c => (
            <div key={c}
              className={`cursor-pointer p-2 rounded hover:bg-blue-50 ${category===c ? "bg-blue-100 font-semibold" : ""}`}
              onClick={()=> setCategory(c)}>{c}</div>
          ))}
          <button className="mt-3 w-full bg-blue-600 text-white rounded py-2" onClick={load}>Apply</button>
        </div>
      </aside>
      <main className="flex-1">
        <div className="flex flex-col md:flex-row md:items-center gap-3 mb-4">
          <input
            className="border rounded px-3 py-2 w-full md:w-96"
            placeholder="Search products..."
            value={query}
            onChange={e=>setQuery(e.target.value)}
          />
          <select
            className="border rounded px-3 py-2 md:ml-4"
            value={sort}
            onChange={e=>setSort(e.target.value)}
          >
            <option value="createdAt:desc">Newest</option>
            <option value="price.amount:asc">Price: Low to High</option>
            <option value="price.amount:desc">Price: High to Low</option>
          </select>
          <button className="bg-blue-600 text-white rounded px-4 py-2" onClick={load}>Search</button>
        </div>
        {loading && <div>Loading...</div>}
        <div className="grid md:grid-cols-3 gap-5">
          {data?.items.map(p => {
            const img = p.images?.[0] || "/file.svg";
            const price = p.price?.amount ?? 0;
            return (
              <div key={p._id} className="bg-white rounded shadow p-4 flex flex-col">
                <Link href={`/product/${p.slug || p._id}`}>
                  <img src={img} alt={p.title} className="rounded mb-2 aspect-video object-cover" />
                  <div className="font-semibold text-lg mb-1">{p.title}</div>
                </Link>
                <div className="font-bold text-blue-700 mb-2">₹{price}</div>
                <div className="flex gap-2 mt-auto">
                  <button className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                    onClick={() => addItem({ id: p._id, title: p.title, price, image: img }, 1)}
                  >Add to cart</button>
                  <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 rounded px-2"
                    onClick={() => add({ id: p._id, title: p.title, image: img })}
                  >♡</button>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
