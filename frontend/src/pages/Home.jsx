import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Home = () => {
  const { user } = useAuth()

  return (
    <div>
      <div style={{ textAlign: 'center', padding: '4rem 2rem', minHeight: '70vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem', color: '#2c3e50' }}>
          Welcome to Our Online Ecom Store
        </h1>
        <p style={{ fontSize: '1.3rem', color: '#7f8c8d', marginBottom: '3rem', maxWidth: '600px', margin: '0 auto 3rem' }}>
          {user 
            ? `Welcome back, ${user.name}! Start shopping now.`
            : 'Please login or register to start shopping and discover amazing products'
          }
        </p>
        
        {user ? (
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <Link to="/products" className="btn btn-primary" style={{ textDecoration: 'none', fontSize: '1.1rem', padding: '0.75rem 2rem' }}>
              Browse Products
            </Link>
            <Link to="/orders" className="btn btn-secondary" style={{ textDecoration: 'none', fontSize: '1.1rem', padding: '0.75rem 2rem' }}>
              My Orders
            </Link>
          </div>
        ) : (
          <div>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '2rem' }}>
              <Link to="/login" className="btn btn-primary" style={{ textDecoration: 'none', fontSize: '1.1rem', padding: '0.75rem 2rem' }}>
                Customer Login
              </Link>
              <Link to="/register" className="btn btn-success" style={{ textDecoration: 'none', fontSize: '1.1rem', padding: '0.75rem 2rem' }}>
                Register Now
              </Link>
            </div>
            <div style={{ marginTop: '2rem' }}>
              <Link to="/admin/login" className="btn btn-secondary" style={{ textDecoration: 'none', fontSize: '1rem', padding: '0.5rem 1.5rem' }}>
                Admin Login
              </Link>
            </div>
          </div>
        )}
      </div>

      <div style={{ background: '#ecf0f1', padding: '3rem 2rem', marginTop: '2rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🛍️</div>
            <h3>Wide Selection</h3>
            <p style={{ color: '#7f8c8d' }}>Browse thousands of products across multiple categories</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🚚</div>
            <h3>Fast Delivery</h3>
            <p style={{ color: '#7f8c8d' }}>Quick and reliable shipping to your doorstep</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔒</div>
            <h3>Secure Payment</h3>
            <p style={{ color: '#7f8c8d' }}>Safe and secure checkout process</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
