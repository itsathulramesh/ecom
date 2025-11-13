import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  const API_URL = window.RUNTIME_CONFIG.API_URL;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/login')
      return
    }
    addToCart(product, quantity)
    navigate('/cart')
  }

  if (loading) return <div className="loading">Loading...</div>
  if (!product) return <div>Product not found</div>

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <button onClick={() => navigate(-1)} className="btn btn-secondary" style={{ marginBottom: '1rem' }}>
        ← Back
      </button>
      
      <div style={{ background: 'white', borderRadius: '8px', padding: '2rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        <div>
          <img 
            src={product.image || 'https://via.placeholder.com/400'} 
            alt={product.name}
            style={{ width: '100%', borderRadius: '8px' }}
          />
        </div>
        
        <div>
          <h1>{product.name}</h1>
          <p style={{ fontSize: '0.9rem', color: '#7f8c8d', marginBottom: '1rem' }}>{product.category}</p>
          <p style={{ fontSize: '2rem', color: '#27ae60', fontWeight: 'bold', marginBottom: '1rem' }}>
            ${product.price.toFixed(2)}
          </p>
          <p style={{ marginBottom: '1rem' }}>{product.description}</p>
          <p style={{ marginBottom: '1rem', color: product.stock > 0 ? '#27ae60' : '#e74c3c' }}>
            {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
          </p>
          
          {product.stock > 0 && (
            <div>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ marginRight: '1rem' }}>Quantity:</label>
                <input
                  type="number"
                  min="1"
                  max={product.stock}
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value))}
                  style={{ width: '80px', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ddd' }}
                />
              </div>
              <button onClick={handleAddToCart} className="btn btn-primary">
                Add to Cart
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
