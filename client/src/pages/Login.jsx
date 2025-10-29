import { useState } from 'react';
import axios from 'axios';

export default function Login() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [message, setMessage] = useState('');

  function onChange(e) { setForm({ ...form, [e.target.name]: e.target.value }); }

  async function onSubmit(e) {
    e.preventDefault();
    try {
      const resp = await axios.post('/api/auth/login', form);
      localStorage.setItem('token', resp.data.token);
      setMessage(`Logged in as ${resp.data.user.username}`);
    } catch (err) {
      setMessage(err.response?.data?.message || err.message);
    }
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: 24 }}>
      <form onSubmit={onSubmit} style={{ background: '#fff', padding: 20, borderRadius: 12, boxShadow: '0 8px 16px rgba(0,0,0,0.1)', width: 360 }}>
        <h2>Login</h2>
        <label>Username</label>
        <input name="username" value={form.username} onChange={onChange} required />
        <label>Password</label>
        <input type="password" name="password" value={form.password} onChange={onChange} required />
        <input type="submit" value="Login" />
        {message && <p>{message}</p>}
      </form>
    </div>
  );
}


