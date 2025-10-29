import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Dashboard() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');

  async function load() {
    try {
      const token = localStorage.getItem('token');
      const resp = await axios.get('/api/orders', { headers: { Authorization: `Bearer ${token}` } });
      setOrders(resp.data);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  }

  useEffect(() => { load(); }, []);

  async function updateStatus(id, status) {
    const token = localStorage.getItem('token');
    await axios.patch(`/api/orders/${id}/status`, { status }, { headers: { Authorization: `Bearer ${token}` } });
    load();
  }

  return (
    <div style={{ maxWidth: 900, margin: '24px auto', padding: 16 }}>
      <h2>All Orders</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {orders.map((o) => (
        <div key={o._id} style={{ background: '#fff', padding: 12, borderRadius: 8, marginBottom: 12 }}>
          <div><strong>Customer:</strong> {o.customerName}</div>
          <div><strong>Status:</strong> {o.status}</div>
          <div style={{ marginTop: 8 }}>
            <button onClick={() => updateStatus(o._id, 'Accepted')}>Accept</button>{' '}
            <button onClick={() => updateStatus(o._id, 'Dispatched')}>Dispatch</button>{' '}
            <button onClick={() => updateStatus(o._id, 'Delivered')}>Deliver</button>
          </div>
        </div>
      ))}
    </div>
  );
}


