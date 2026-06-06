import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Package, ShoppingBag, Users, TrendingUp, Plus, ArrowRight, LayoutDashboard } from 'lucide-react'
import { SAMPLE_PRODUCTS } from '../../data/products'

const stats = [
  { label: 'Total Products',  value: SAMPLE_PRODUCTS.length,  icon: <Package size={22} />,     color: 'amber',  delta: '+2 this week' },
  { label: 'Total Orders',    value: 142,                       icon: <ShoppingBag size={22} />, color: 'green',  delta: '+18 today'    },
  { label: 'Revenue (₹)',     value: '₹38,490',                icon: <TrendingUp size={22} />,  color: 'orange', delta: '+12% this mo'  },
  { label: 'Customers',       value: 89,                        icon: <Users size={22} />,       color: 'blue',   delta: '+5 new today'  },
]

const colorMap = {
  amber:  { ring: 'ring-amber-500/30',  bg: 'bg-amber-500/15',  text: 'text-amber-400'  },
  green:  { ring: 'ring-green-500/30',  bg: 'bg-green-500/15',  text: 'text-green-400'  },
  orange: { ring: 'ring-orange-500/30', bg: 'bg-orange-500/15', text: 'text-orange-400' },
  blue:   { ring: 'ring-blue-500/30',   bg: 'bg-blue-500/15',   text: 'text-blue-400'   },
}

const recentOrders = [
  { id: 'ORD-142', customer: '+91 98765****', item: 'Aam Ka Achaar × 2', amount: 498, status: 'Delivered'  },
  { id: 'ORD-141', customer: '+91 87654****', item: 'Hari Mirch Achaar × 1', amount: 199, status: 'Processing' },
  { id: 'ORD-140', customer: '+91 76543****', item: 'Nimbu Ka Achaar × 3', amount: 537, status: 'Shipped'   },
  { id: 'ORD-139', customer: '+91 65432****', item: 'Mixed Veg Achaar × 1', amount: 219, status: 'Delivered'  },
]

const statusColors = {
  Delivered:  'text-green-400 bg-green-500/15',
  Processing: 'text-amber-400 bg-amber-500/15',
  Shipped:    'text-blue-400  bg-blue-500/15',
}

export default function AdminDashboard() {
  return (
    <main className="min-h-screen pt-28 pb-20 px-6">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-purple-400 font-medium text-sm uppercase tracking-widest mb-2">
              <LayoutDashboard size={16} /> Admin Panel
            </div>
            <h1 className="font-display text-4xl font-bold text-white">Dashboard</h1>
            <p className="text-gray-400 mt-1">Welcome back, Admin! Here's what's happening.</p>
          </div>
          <Link to="/admin/products">
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="btn-primary flex items-center gap-2">
              <Plus size={18} /> Add Product
            </motion.button>
          </Link>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {stats.map((s, i) => {
            const c = colorMap[s.color]
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -4 }}
                className={`glass rounded-2xl p-5 ring-1 ${c.ring}`}
              >
                <div className={`w-11 h-11 rounded-xl ${c.bg} ${c.text} flex items-center justify-center mb-4`}>
                  {s.icon}
                </div>
                <div className={`text-3xl font-bold ${c.text} mb-1`}>{s.value}</div>
                <div className="text-gray-400 text-sm mb-1">{s.label}</div>
                <div className="text-xs text-green-400">{s.delta}</div>
              </motion.div>
            )
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Orders */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2 glass rounded-3xl p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-xl font-bold text-white">Recent Orders</h2>
              <Link to="/admin/orders" className="text-sm text-amber-400 hover:text-amber-300 flex items-center gap-1">
                View all <ArrowRight size={14} />
              </Link>
            </div>
            <div className="space-y-3">
              {recentOrders.map((o, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + i * 0.07 }}
                  className="flex items-center gap-4 p-3 rounded-2xl hover:bg-white/5 transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="font-semibold text-white text-sm">{o.id}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-lg font-medium ${statusColors[o.status]}`}>{o.status}</span>
                    </div>
                    <p className="text-xs text-gray-500 truncate">{o.customer} · {o.item}</p>
                  </div>
                  <span className="font-bold text-amber-400 shrink-0">₹{o.amount}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.35 }}
            className="glass rounded-3xl p-6"
          >
            <h2 className="font-display text-xl font-bold text-white mb-6">Quick Actions</h2>
            <div className="space-y-3">
              {[
                { label: 'Manage Products',  to: '/admin/products', icon: '🥒', desc: `${SAMPLE_PRODUCTS.length} products` },
                { label: 'View All Orders',  to: '/admin/orders',   icon: '📦', desc: '142 total orders' },
                { label: 'View Store',       to: '/shop',           icon: '🛒', desc: 'Customer view'   },
              ].map((q, i) => (
                <Link key={i} to={q.to}>
                  <motion.div
                    whileHover={{ x: 4 }}
                    className="flex items-center gap-3 p-3 rounded-2xl hover:bg-white/5 cursor-pointer transition-colors"
                  >
                    <div className="w-10 h-10 rounded-xl bg-amber-500/15 flex items-center justify-center text-xl">
                      {q.icon}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-white text-sm">{q.label}</div>
                      <div className="text-xs text-gray-500">{q.desc}</div>
                    </div>
                    <ArrowRight size={16} className="text-gray-500" />
                  </motion.div>
                </Link>
              ))}
            </div>

            {/* Low stock warning */}
            <div className="mt-6 p-4 rounded-2xl bg-orange-500/10 border border-orange-500/20">
              <p className="text-orange-400 font-semibold text-sm mb-1">⚠️ Low Stock Alert</p>
              <p className="text-gray-400 text-xs">Lehsun Achaar — only 8 units left</p>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  )
}
