import { useAuth } from '../context/AuthContext'

const Dashboard = () => {
  const { user } = useAuth()

  return (
    <div>
      <h1>Dashboard</h1>
      
      <div style={{ background: 'white', padding: '2rem', borderRadius: '8px' }}>
        <h2>Welcome, {user?.name}!</h2>
        <div style={{ marginTop: '1.5rem' }}>
          <p><strong>Email:</strong> {user?.email}</p>
          <p><strong>Role:</strong> {user?.role}</p>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
