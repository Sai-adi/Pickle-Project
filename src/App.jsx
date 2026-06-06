import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { useAuthStore } from './store/authStore'
import Navbar from './components/Navbar'
import CartDrawer from './components/CartDrawer'
import Home from './pages/Home'
import Shop from './pages/Shop'
import Orders from './pages/Orders'
import AdminDashboard from './pages/admin/Dashboard'
import AdminProducts from './pages/admin/Products'
import AdminOrders from './pages/admin/AdminOrders'
import ParticleBackground from './components/ParticleBackground'

function AdminGuard({ children }) {
  const { user, isAdmin } = useAuthStore()
  if (!user || !isAdmin) return <Navigate to="/" replace />
  return children
}

export default function App() {
  return (
    <BrowserRouter>
      <ParticleBackground />
      <Navbar />
      <CartDrawer />
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: 'rgba(17,17,24,0.95)',
            color: '#f5f5f0',
            border: '1px solid rgba(255,193,7,0.3)',
            backdropFilter: 'blur(20px)',
            borderRadius: '12px',
          },
          success: { iconTheme: { primary: '#ffc107', secondary: '#0a0a0f' } },
          error:   { iconTheme: { primary: '#ef4444', secondary: '#0a0a0f' } },
        }}
      />
      <Routes>
        <Route path="/"            element={<Home />} />
        <Route path="/shop"        element={<Shop />} />
        <Route path="/orders"      element={<Orders />} />
        <Route path="/admin"       element={<AdminGuard><AdminDashboard /></AdminGuard>} />
        <Route path="/admin/products" element={<AdminGuard><AdminProducts /></AdminGuard>} />
        <Route path="/admin/orders"   element={<AdminGuard><AdminOrders /></AdminGuard>} />
      </Routes>
    </BrowserRouter>
  )
}
