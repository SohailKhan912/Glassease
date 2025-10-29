export default function Home() {
  return (
    <div>
      <section style={{ padding: 40, textAlign: 'center', background: 'linear-gradient(to right, #0072ff, #7b2ff7)', color: '#fff' }}>
        <h1>Custom Glass Doors Made Easy</h1>
        <p>Browse designs, customize options, and order your perfect glass door online. Track your order from production to delivery.</p>
      </section>
      <section style={{ padding: 40, textAlign: 'center' }}>
        <h2>Why Choose GlassEase?</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 20, maxWidth: 1000, margin: '24px auto' }}>
          <div style={{ background: '#fff', padding: 20, borderRadius: 12, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
            <h3>Quality Assured</h3>
            <p>Premium quality glass doors with warranty.</p>
          </div>
          <div style={{ background: '#fff', padding: 20, borderRadius: 12, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
            <h3>Fast Delivery</h3>
            <p>Quick installation within 7-10 business days.</p>
          </div>
          <div style={{ background: '#fff', padding: 20, borderRadius: 12, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
            <h3>24/7 Support</h3>
            <p>Round-the-clock customer support.</p>
          </div>
        </div>
      </section>
    </div>
  );
}


