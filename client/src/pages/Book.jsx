import { useState } from 'react';
import axios from 'axios';

export default function Book() {
  const [form, setForm] = useState({
    name: '', contact: '', address: '', door_type: 'Sliding', size: '', glass_type: ''
  });
  const [imageFile, setImageFile] = useState(null);
  const [message, setMessage] = useState('');

  function onChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function onSubmit(e) {
    e.preventDefault();
    try {
      let imagePath;
      if (imageFile) {
        const fd = new FormData();
        fd.append('image', imageFile);
        const up = await axios.post('/api/upload', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
        imagePath = up.data.path;
      }
      const resp = await axios.post('/api/orders', { ...form, imagePath });
      setMessage(`Booking submitted! ID: ${resp.data._id}`);
    } catch (err) {
      setMessage(err.response?.data?.message || err.message);
    }
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: 24 }}>
      <form onSubmit={onSubmit} style={{ background: '#fff', padding: 20, borderRadius: 12, boxShadow: '0 8px 16px rgba(0,0,0,0.1)', width: 420 }}>
        <h2>Book Your Custom Glass Door</h2>
        <label>Name</label>
        <input name="name" value={form.name} onChange={onChange} required />
        <label>Contact</label>
        <input name="contact" value={form.contact} onChange={onChange} required />
        <label>Address</label>
        <input name="address" value={form.address} onChange={onChange} required />
        <label>Type</label>
        <select name="door_type" value={form.door_type} onChange={onChange}>
          <option>Sliding</option>
          <option>Hinged</option>
        </select>
        <label>Size</label>
        <input name="size" value={form.size} onChange={onChange} required />
        <label>Glass Type</label>
        <input name="glass_type" value={form.glass_type} onChange={onChange} required />
        <label>Upload Reference Image</label>
        <input type="file" onChange={(e) => setImageFile(e.target.files?.[0] || null)} />
        <input type="submit" value="Submit" />
        {message && <p>{message}</p>}
      </form>
    </div>
  );
}


