import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, getCartTotal } = useCart()
  const { user } = useAuth()
  const navigate = useNavigate()

  const handleCheckout = () => {
    if (!user) {
      navigate('/login')
    } else {
      navigate('/checkout')
    }
  }

  if (cart.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '3rem' }}>
        <h2>Your cart is empty</h2>
        <Link to="/products" className="btn btn-primary" style={{ marginTop: '1rem', textDecoration: 'none' }}>
          Continue Shopping
        </Link>
      </div>
    )
  }

  return (
    <div>
      <h1>Shopping Cart</h1>
      
      <div>
        {cart.map(item => (
          <div key={item._id} className="cart-item">
            <img 
              src={item.image || 'https://via.placeholder.com/100'} 
              alt={item.name}
            />
            <div style={{ flex: 1 }}>
              <h3>{item.name}</h3>
              <p className="product-price">${item.price.toFixed(2)}</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <input
                type="number"
                min="1"
                max={item.stock}
                value={item.quantity}
                onChange={(e) => updateQuantity(item._id, parseInt(e.target.value))}
                style={{ width: '80px', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ddd' }}
              />
              <p style={{ fontWeight: 'bold' }}>
                ${(item.price * item.quantity).toFixed(2)}
              </p>
              <button 
                onClick={() => removeFromCart(item._id)}
                className="btn btn-danger"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <h2>Order Summary</h2>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <span>Subtotal:</span>
          <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
            ${getCartTotal().toFixed(2)}
          </span>
        </div>
        <button onClick={handleCheckout} className="btn btn-success" style={{ width: '100%' }}>
          Proceed to Checkout
        </button>
      </div>
    </div>
  )
}

export default Cart
