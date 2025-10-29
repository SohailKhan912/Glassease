import { useEffect, useState } from 'react';

export default function Cart() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    setItems(cart);
  }, []);

  function removeItem(index) {
    const next = items.slice();
    next.splice(index, 1);
    setItems(next);
    localStorage.setItem('cart', JSON.stringify(next));
  }

  const total = items.reduce((sum, it) => sum + (it.price || 0), 0);

  return (
    <div style={{ maxWidth: 900, margin: '24px auto', padding: 16 }}>
      <h2>Your Cart</h2>
      {items.map((it, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', background: '#fff', borderRadius: 12, marginBottom: 12, padding: 12, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
          <img src={it.img} alt={it.name} style={{ width: 120, borderRadius: 8, marginRight: 16 }} />
          <div style={{ flex: 1 }}>
            <h3 style={{ margin: 0, color: '#0a7fbb' }}>{it.name}</h3>
            <p>₹{it.price}</p>
          </div>
          <button onClick={() => removeItem(i)} style={{ background: 'red' }}>Remove</button>
        </div>
      ))}
      <div style={{ textAlign: 'right', fontSize: 18, marginTop: 12 }}>Total: ₹{total}</div>
    </div>
  );
}


