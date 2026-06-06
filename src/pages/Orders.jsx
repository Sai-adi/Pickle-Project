import { motion } from 'framer-motion'
import { Package, Clock, CheckCircle2, ShoppingBag } from 'lucide-react'
import { useAuthStore } from '../store/authStore'
import { Link } from 'react-router-dom'

const MOCK_ORDERS = [
  {
    id: 'ORD-001',
    date: '2026-06-01',
    items: [{ name: 'Aam Ka Achaar', qty: 2, price: 249 }, { name: 'Nimbu Ka Achaar', qty: 1, price: 179 }],
    status: 'Delivered',
    total: 677,
  },
  {
    id: 'ORD-002',
    date: '2026-06-05',
    items: [{ name: 'Hari Mirch Achaar', qty: 1, price: 199 }],
    status: 'Processing',
    total: 249,
  },
]

const statusConfig = {
  Delivered:  { icon: <CheckCircle2 size={16} />, color: 'text-green-400',  bg: 'bg-green-500/15' },
  Processing: { icon: <Clock        size={16} />, color: 'text-amber-400',  bg: 'bg-amber-500/15' },
  Shipped:    { icon: <Package      size={16} />, color: 'text-blue-400',   bg: 'bg-blue-500/15'  },
}

export default function Orders() {
  const { user } = useAuthStore()

  if (!user) {
    return (
      <main className="min-h-screen flex items-center justify-center pt-20 px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-sm"
        >
          <div className="text-7xl mb-6">🔐</div>
          <h2 className="font-display text-3xl font-bold text-white mb-3">Sign In Required</h2>
          <p className="text-gray-400 mb-8">Please sign in with your mobile number to view your orders.</p>
          <Link to="/">
            <button className="btn-primary">Go to Home</button>
          </Link>
        </motion.div>
      </main>
    )
  }

  return (
    <main className="min-h-screen pt-28 pb-20 px-6">
      <div className="max-w-3xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <p className="text-amber-400 font-medium text-sm uppercase tracking-widest mb-2">Account</p>
          <h1 className="font-display text-4xl font-bold text-white">My Orders</h1>
          <p className="text-gray-400 mt-2">Track and manage your pickle deliveries</p>
        </motion.div>

        {MOCK_ORDERS.length === 0 ? (
          <div className="text-center py-20">
            <ShoppingBag size={56} className="text-gray-600 mx-auto mb-4" />
            <h3 className="font-display text-2xl text-white mb-2">No orders yet</h3>
            <p className="text-gray-400 mb-6">Your pickle journey starts now!</p>
            <Link to="/shop"><button className="btn-primary">Shop Now</button></Link>
          </div>
        ) : (
          <div className="space-y-4">
            {MOCK_ORDERS.map((order, i) => {
              const cfg = statusConfig[order.status] || statusConfig.Processing
              return (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="glass rounded-3xl p-6"
                >
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                    <div>
                      <p className="font-bold text-white text-lg">{order.id}</p>
                      <p className="text-gray-400 text-sm mt-0.5">
                        Placed on {new Date(order.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                      </p>
                    </div>
                    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl ${cfg.bg} ${cfg.color} text-sm font-semibold`}>
                      {cfg.icon} {order.status}
                    </div>
                  </div>

                  <div className="border-t border-white/10 pt-4 mb-4 space-y-2">
                    {order.items.map((item, j) => (
                      <div key={j} className="flex items-center justify-between text-sm">
                        <span className="text-gray-300">{item.name} × {item.qty}</span>
                        <span className="text-white font-medium">₹{item.price * item.qty}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between border-t border-white/10 pt-4">
                    <span className="text-gray-400 text-sm">Total</span>
                    <span className="text-xl font-bold text-gradient-amber">₹{order.total}</span>
                  </div>
                </motion.div>
              )
            })}
          </div>
        )}
      </div>
    </main>
  )
}
