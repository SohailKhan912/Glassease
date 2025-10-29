import { useState } from 'react';
import axios from 'axios';

export default function Track() {
  const [name, setName] = useState('');
  const [orders, setOrders] = useState([]);

  async function fetchOrders(e) {
    e?.preventDefault();
    const resp = await axios.get('/api/orders/track', { params: { name } });
    setOrders(resp.data);
  }

  return (
    <div style={{ maxWidth: 600, margin: '24px auto', padding: 16 }}>
      <form onSubmit={fetchOrders}>
        <label>Enter Your Name:</label>
        <input value={name} onChange={(e) => setName(e.target.value)} required />
        <input type="submit" value="Check Status" />
      </form>
      {orders.length > 0 && (
        <div style={{ marginTop: 16 }}>
          <h3>Order Status for: {name}</h3>
          {orders.map((o) => (
            <div key={o._id} style={{ background: '#fff', padding: 12, borderRadius: 8, marginBottom: 8 }}>
              <div>Order ID: {o._id}</div>
              <div>Door Type: {o.doorType}</div>
              <div>Status: <strong>{o.status}</strong></div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}


