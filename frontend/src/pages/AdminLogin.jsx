import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const AdminLogin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    try {
      const user = await login(email, password)
      
      // Check if user is admin
      if (user.role !== 'admin') {
        setError('Access denied. Admin credentials required.')
        return
      }
      
      navigate('/admin/products')
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed')
    }
  }

  return (
    <div className="form-container">
      <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Admin Login</h2>
      
      <div style={{ 
        background: '#fff3cd', 
        border: '1px solid #ffc107', 
        padding: '1rem', 
        borderRadius: '4px', 
        marginBottom: '1rem',
        fontSize: '0.9rem'
      }}>
        <strong>Default Admin Credentials:</strong><br />
        Email: admin@ecommerce.com<br />
        Password: admin123
      </div>
      
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Admin Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Password</label>
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        
        <div className="form-group" style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', fontWeight: 'normal' }}>
            <input
              type="checkbox"
              checked={showPassword}
              onChange={(e) => setShowPassword(e.target.checked)}
              style={{ marginRight: '0.5rem', cursor: 'pointer' }}
            />
            Show Password
          </label>
        </div>
        
        <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
          Login as Admin
        </button>
      </form>
      
      <p style={{ textAlign: 'center', marginTop: '1rem' }}>
        <Link to="/login">Customer Login</Link>
      </p>
    </div>
  )
}

export default AdminLogin
