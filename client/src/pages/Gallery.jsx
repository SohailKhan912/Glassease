export default function Gallery() {
  const products = [
    { name: 'Sliding Glass Door', price: 15000, img: 'https://images.unsplash.com/photo-1616627563165-1b10f8917ac9' },
    { name: 'Frosted Glass Door', price: 12500, img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c' },
    { name: 'Glass Panel Door', price: 18000, img: 'https://images.unsplash.com/photo-1598300187392-cd62e21d5db7' }
  ];

  function addToCart(item) {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    cart.push(item);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${item.name} added to cart!`);
  }

  return (
    <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24, padding: 24 }}>
      {products.map((p) => (
        <div key={p.name} style={{ background: '#fff', padding: 16, borderRadius: 12, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
          <img src={p.img} alt={p.name} style={{ width: '100%', borderRadius: 12 }} />
          <h3 style={{ color: '#0a7fbb' }}>{p.name}</h3>
          <p>₹{p.price}</p>
          <button onClick={() => addToCart(p)}>Add to Cart</button>
        </div>
      ))}
    </section>
  );
}


