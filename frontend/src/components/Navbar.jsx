import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'

      const Navbar = () => {
    const { user, logout } = useAuth()
  const { getCartCount } = useCart()

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <Link to="/" className="navbar-brand">eCommerce</Link>
        <div className="navbar-links">
          {user ? (
            <>
              <Link to="/products">Products</Link>
              <Link to="/cart">
                Cart {getCartCount() > 0 && <span className="cart-badge">{getCartCount()}</span>}
              </Link>
              <Link to="/orders">Orders</Link>
              <Link to="/dashboard">Dashboard</Link>
              {user.role === 'admin' && (
                <>
                  <Link to="/admin/products">Manage Products</Link>
                  <Link to="/admin/orders">Manage Orders</Link>
                </>
              )}
              <button onClick={logout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
