"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AdminOrdersPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [orders, setOrders] = useState<any[]>([]);
  const [error, setError] = useState('');

  const isAuthorized = () => {
    const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL || '';
    const email = session?.user?.email || '';
    return !!email && (!!adminEmail ? email === adminEmail : true);
  };

  async function load() {
    try {
      if (!isAuthorized()) return;
      const token = localStorage.getItem('token') || '';
      const res = await fetch(process.env.NEXT_PUBLIC_API_BASE + '/api/orders', { headers: { Authorization: `Bearer ${token}` } });
      if (!res.ok) throw new Error('Failed to load orders');
      setOrders(await res.json());
    } catch (e: any) {
      setError(e.message);
    }
  }

  async function updateStatus(id: string, statusV: string) {
    const token = localStorage.getItem('token') || '';
    await fetch(process.env.NEXT_PUBLIC_API_BASE + `/api/orders/${id}/status`, {
      method: 'PATCH', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ status: statusV })
    });
    load();
  }

  useEffect(() => {
    if (status === 'loading') return;
    if (!session || !isAuthorized()) router.push('/login');
    else load();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, session?.user?.email]);

  return (
    <div className="max-w-5xl mx-auto mt-6">
      <h1 className="text-2xl font-bold mb-4">Admin - Orders</h1>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      {orders.map(o => (
        <div key={o._id} className="bg-white rounded shadow p-4 mb-3 dark:bg-neutral-800">
          <div><b>Customer:</b> {o?.shipping?.name || o.customerName}</div>
          <div><b>Total:</b> ₹{o.total || o.subtotal}</div>
          <div><b>Status:</b> {o.status}</div>
          <div className="mt-2 flex gap-2">
            <button className="px-3 py-1 bg-blue-600 text-white rounded" onClick={()=>updateStatus(o._id, 'Accepted')}>Accept</button>
            <button className="px-3 py-1 bg-orange-500 text-white rounded" onClick={()=>updateStatus(o._id, 'Dispatched')}>Dispatch</button>
            <button className="px-3 py-1 bg-green-600 text-white rounded" onClick={()=>updateStatus(o._id, 'Delivered')}>Deliver</button>
          </div>
        </div>
      ))}
    </div>
  );
}
