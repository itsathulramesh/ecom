import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useCart } from '../context/CartContext'

const Checkout = () => {
  const { cart, getCartTotal, clearCart } = useCart()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  
  const [address, setAddress] = useState({
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: ''
  })

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const orderData = {
        items: cart.map(item => ({
          productId: item._id,
          quantity: item.quantity
        })),
        shippingAddress: address
      }

      await axios.post('/api/orders', orderData)
      clearCart()
      navigate('/orders')
    } catch (err) {
      setError(err.response?.data?.message || 'Order failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h1>Checkout</h1>
      
      {error && <div className="error-message">{error}</div>}
      
      <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', marginBottom: '1.5rem' }}>
        <h3>Order Summary</h3>
        {cart.map(item => (
          <div key={item._id} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0' }}>
            <span>{item.name} x {item.quantity}</span>
            <span>${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
        <div style={{ borderTop: '2px solid #ddd', marginTop: '1rem', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '1.2rem' }}>
          <span>Total:</span>
          <span>${getCartTotal().toFixed(2)}</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} style={{ background: 'white', padding: '1.5rem', borderRadius: '8px' }}>
        <h3 style={{ marginBottom: '1rem' }}>Shipping Address</h3>
        
        <div className="form-group">
          <label>Street Address</label>
          <input type="text" name="street" value={address.street} onChange={handleChange} required />
        </div>
        
        <div className="form-group">
          <label>City</label>
          <input type="text" name="city" value={address.city} onChange={handleChange} required />
        </div>
        
        <div className="form-group">
          <label>State</label>
          <input type="text" name="state" value={address.state} onChange={handleChange} required />
        </div>
        
        <div className="form-group">
          <label>Zip Code</label>
          <input type="text" name="zipCode" value={address.zipCode} onChange={handleChange} required />
        </div>
        
        <div className="form-group">
          <label>Country</label>
          <input type="text" name="country" value={address.country} onChange={handleChange} required />
        </div>
        
        <button type="submit" className="btn btn-success" style={{ width: '100%' }} disabled={loading}>
          {loading ? 'Processing...' : 'Place Order'}
        </button>
      </form>
    </div>
  )
}

export default Checkout
