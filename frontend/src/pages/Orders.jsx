import { useState, useEffect } from 'react'
import axios from 'axios'

const Orders = () => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      const response = await axios.get('/api/orders/my-orders')
      setOrders(response.data)
    } catch (error) {
      console.error('Error fetching orders:', error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status) => {
    const colors = {
      pending: '#f39c12',
      processing: '#3498db',
      shipped: '#9b59b6',
      delivered: '#27ae60',
      cancelled: '#e74c3c'
    }
    return colors[status] || '#95a5a6'
  }

  if (loading) return <div className="loading">Loading...</div>

  return (
    <div>
      <h1>My Orders</h1>
      
      {orders.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#7f8c8d', marginTop: '2rem' }}>
          No orders yet
        </p>
      ) : (
        <div>
          {orders.map(order => (
            <div key={order._id} style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <div>
                  <p style={{ fontSize: '0.9rem', color: '#7f8c8d' }}>
                    Order #{order._id.slice(-8)}
                  </p>
                  <p style={{ fontSize: '0.9rem', color: '#7f8c8d' }}>
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <span style={{ 
                    padding: '0.25rem 0.75rem', 
                    borderRadius: '4px', 
                    background: getStatusColor(order.status),
                    color: 'white',
                    fontSize: '0.9rem'
                  }}>
                    {order.status.toUpperCase()}
                  </span>
                </div>
              </div>
              
              <div style={{ marginBottom: '1rem' }}>
                {order.items.map((item, index) => (
                  <div key={index} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0' }}>
                    <span>{item.product?.name || 'Product'} x {item.quantity}</span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              
              <div style={{ borderTop: '1px solid #ddd', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
                <span>Total:</span>
                <span>${order.totalAmount.toFixed(2)}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Orders
