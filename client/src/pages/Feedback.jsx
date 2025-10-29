import { useState } from 'react';
import axios from 'axios';

export default function Feedback() {
  const [form, setForm] = useState({ order_id: '', rating: 5, comment: '' });
  const [message, setMessage] = useState('');

  function onChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function onSubmit(e) {
    e.preventDefault();
    try {
      await axios.post('/api/feedback', form);
      setMessage('Thanks for your feedback!');
    } catch (err) {
      setMessage(err.response?.data?.message || err.message);
    }
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: 24 }}>
      <form onSubmit={onSubmit} style={{ background: '#fff', padding: 20, borderRadius: 12, boxShadow: '0 8px 16px rgba(0,0,0,0.1)', width: 420 }}>
        <h2>Feedback</h2>
        <label>Order ID</label>
        <input name="order_id" value={form.order_id} onChange={onChange} required />
        <label>Rating (1-5)</label>
        <input type="number" name="rating" min="1" max="5" value={form.rating} onChange={onChange} required />
        <label>Comment</label>
        <textarea name="comment" rows="4" value={form.comment} onChange={onChange} required />
        <input type="submit" value="Submit Feedback" />
        {message && <p>{message}</p>}
      </form>
    </div>
  );
}


