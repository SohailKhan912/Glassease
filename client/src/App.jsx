import { Routes, Route, Link, Navigate } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Gallery from './pages/Gallery.jsx';
import Book from './pages/Book.jsx';
import Cart from './pages/Cart.jsx';
import Track from './pages/Track.jsx';
import Feedback from './pages/Feedback.jsx';
import Login from './pages/Login.jsx';
import Dashboard from './pages/Dashboard.jsx';

function Nav() {
  return (
    <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 24px', background: '#fff', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
      <div style={{ color: '#0a7fbb', fontWeight: 'bold' }}>GlassEase</div>
      <ul style={{ display: 'flex', listStyle: 'none', gap: 16, margin: 0 }}>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/gallery">Gallery</Link></li>
        <li><Link to="/book">Book Now</Link></li>
        <li><Link to="/track">Track Order</Link></li>
        <li><Link to="/feedback">Feedback</Link></li>
      </ul>
      <div style={{ display: 'flex', gap: 8 }}>
        <Link to="/cart"><button>Cart</button></Link>
        <Link to="/login"><button>Login</button></Link>
        <Link to="/dashboard"><button>Admin</button></Link>
      </div>
    </nav>
  );
}

export default function App() {
  return (
    <div>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/book" element={<Book />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/track" element={<Track />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}


