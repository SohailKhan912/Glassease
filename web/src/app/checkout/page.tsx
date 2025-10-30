"use client";
import { useCart } from "@/src/store/CartContext";
import { useState } from "react";

export default function CheckoutPage() {
  const { items, total, clear } = useCart();
  const [shipping, setShipping] = useState({ name: '', phone: '', email: '', address: '', city: '', state: '', pin: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  function handleChange(e: any) { setShipping(s => ({ ...s, [e.target.name]: e.target.value })); }

  async function startPayment(e: any) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      // 1. POST Order to backend
      const resp = await fetch(process.env.NEXT_PUBLIC_API_BASE + '/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map(it => ({ title: it.title, quantity: it.qty, price: it.price, product: it.id })),
          subtotal: total,
          total,
          shipping: {
            name: shipping.name,
            phone: shipping.phone,
            email: shipping.email,
            addressLine1: shipping.address,
            city: shipping.city,
            state: shipping.state,
            postalCode: shipping.pin
          }
        })
      });
      if (!resp.ok) throw new Error('Could not create order');
      const orderDb = await resp.json();

      // 2. Create payment order with Razorpay
      const paymentOrder = await fetch(process.env.NEXT_PUBLIC_API_BASE + '/api/payments/razorpay/order', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: total, currency: 'INR', receipt: orderDb._id })
      }).then(r=>r.json());

      // 3. Launch Razorpay Checkout
      const rzpScript = document.createElement('script');
      rzpScript.src = 'https://checkout.razorpay.com/v1/checkout.js';
      document.body.appendChild(rzpScript);
      await new Promise(res => { rzpScript.onload = () => res(undefined); });

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
        amount: paymentOrder.amount,
        currency: paymentOrder.currency,
        order_id: paymentOrder.id,
        name: 'FlipEase',
        description: 'All Glass Product Order',
        handler: async function (response: any) {
          // Verify signature and mark order paid
          const verify = await fetch(process.env.NEXT_PUBLIC_API_BASE + '/api/payments/razorpay/verify', {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              order_db_id: orderDb._id
            })
          });
          if (!verify.ok) throw new Error('Payment verification failed');
          setSuccess('Payment successful! Thank you for your purchase.');
          clear();
        },
        prefill: { name: shipping.name, email: shipping.email || '', contact: shipping.phone },
        notes: { order_db_id: orderDb._id },
        theme: { color: '#0a7fbb' }
      };
      //@ts-ignore
      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (err: any) {
      setError(err.message || 'Payment failed');
    } finally {
      setLoading(false);
    }
  }

  if (success) return <div className="max-w-xl mx-auto mt-16 bg-white shadow rounded px-6 py-8 dark:bg-neutral-800"><h2 className="text-blue-600 font-bold text-xl mb-2">{success}</h2></div>;
  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white rounded shadow p-6 dark:bg-neutral-800">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      {items.length === 0 ? <div>Your cart is empty.</div> : (
        <form onSubmit={startPayment} className="space-y-6">
          <div>
            <h2 className="mb-1 font-semibold">Shipping Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <input name="name" required placeholder="Full Name" className="px-3 py-2 rounded border" onChange={handleChange} />
              <input name="phone" required placeholder="Phone" className="px-3 py-2 rounded border" onChange={handleChange} />
              <input name="email" placeholder="Email (for receipt)" className="px-3 py-2 rounded border md:col-span-2" onChange={handleChange} />
              <input name="address" required placeholder="Address" className="px-3 py-2 rounded border md:col-span-2" onChange={handleChange} />
              <input name="city" required placeholder="City" className="px-3 py-2 rounded border" onChange={handleChange} />
              <input name="state" required placeholder="State" className="px-3 py-2 rounded border" onChange={handleChange} />
              <input name="pin" required placeholder="PIN/Zip" className="px-3 py-2 rounded border" onChange={handleChange} />
            </div>
          </div>
          <div>
            <h2 className="mb-1 font-semibold">Order Summary</h2>
            {items.map(it => (
              <div key={it.id} className="flex justify-between border-b py-1 text-gray-800 dark:text-gray-200"><div>{it.title} x {it.qty}</div><div>₹{it.price * it.qty}</div></div>
            ))}
            <div className="flex justify-between mt-3 font-bold text-xl"><div>Total</div><div>₹{total}</div></div>
          </div>
          {error && <div className="text-red-500">{error}</div>}
          <button disabled={loading} type="submit" className="w-full py-3 rounded bg-blue-600 hover:bg-blue-700 text-white font-semibold mt-4">{loading ? 'Processing...' : 'Place Order & Pay'}</button>
        </form>
      )}
    </div>
  );
}
