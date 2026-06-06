import { useState } from 'react'
import { motion } from 'framer-motion'
import { ShoppingBag, CheckCircle2, Clock, Package, Truck } from 'lucide-react'

const MOCK_ORDERS = [
  { id: 'ORD-142', customer: '+91 98765****', phone: '9876543210', items: 'Aam Ka Achaar × 2', amount: 498, status: 'Delivered',  date: '2026-06-05' },
  { id: 'ORD-141', customer: '+91 87654****', phone: '8765432109', items: 'Hari Mirch Achaar × 1', amount: 199, status: 'Processing', date: '2026-06-05' },
  { id: 'ORD-140', customer: '+91 76543****', phone: '7654321098', items: 'Nimbu Ka Achaar × 3', amount: 537, status: 'Shipped',    date: '2026-06-04' },
  { id: 'ORD-139', customer: '+91 65432****', phone: '6543210987', items: 'Mixed Veg Achaar × 1', amount: 219, status: 'Delivered', date: '2026-06-04' },
  { id: 'ORD-138', customer: '+91 54321****', phone: '5432109876', items: 'Lehsun Achaar × 2',    amount: 458, status: 'Shipped',   date: '2026-06-03' },
  { id: 'ORD-137', customer: '+91 43210****', phone: '4321098765', items: 'Aam Ka Achaar × 1',    amount: 249, status: 'Delivered', date: '2026-06-03' },
]

const STATUS_OPTIONS = ['Processing', 'Shipped', 'Delivered']

const statusConfig = {
  Delivered:  { icon: <CheckCircle2 size={14} />, color: 'text-green-400 bg-green-500/15',  dot: 'bg-green-400' },
  Processing: { icon: <Clock        size={14} />, color: 'text-amber-400 bg-amber-500/15',  dot: 'bg-amber-400' },
  Shipped:    { icon: <Truck        size={14} />, color: 'text-blue-400  bg-blue-500/15',   dot: 'bg-blue-400'  },
}

export default function AdminOrders() {
  const [orders, setOrders]     = useState(MOCK_ORDERS)
  const [filter, setFilter]     = useState('All')

  const updateStatus = (id, status) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o))
  }

  const filtered = filter === 'All' ? orders : orders.filter(o => o.status === filter)

  return (
    <main className="min-h-screen pt-28 pb-20 px-6">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <div className="flex items-center gap-2 text-amber-400 text-sm font-medium uppercase tracking-widest mb-2">
            <ShoppingBag size={16} /> Orders
          </div>
          <h1 className="font-display text-4xl font-bold text-white">All Orders</h1>
          <p className="text-gray-400 mt-1">{orders.length} total orders</p>
        </motion.div>

        {/* Filter tabs */}
        <div className="flex gap-2 mb-8 flex-wrap">
          {['All', ...STATUS_OPTIONS].map(s => {
            const count = s === 'All' ? orders.length : orders.filter(o => o.status === s).length
            return (
              <button
                key={s}
                onClick={() => setFilter(s)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${
                  filter === s ? 'bg-amber-500 text-black shadow-lg' : 'glass text-gray-400 hover:text-white'
                }`}
              >
                {s}
                <span className={`text-xs px-1.5 py-0.5 rounded-md ${filter === s ? 'bg-black/20' : 'bg-white/10'}`}>{count}</span>
              </button>
            )
          })}
        </div>

        {/* Orders table */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}
          className="glass rounded-3xl overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  {['Order ID', 'Customer', 'Items', 'Amount', 'Date', 'Status', 'Update'].map(h => (
                    <th key={h} className="text-left text-xs font-semibold text-gray-500 uppercase tracking-widest px-5 py-4">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((o, i) => {
                  const cfg = statusConfig[o.status]
                  return (
                    <motion.tr
                      key={o.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="border-b border-white/5 hover:bg-white/3 transition-colors"
                    >
                      <td className="px-5 py-4">
                        <span className="font-bold text-white text-sm">{o.id}</span>
                      </td>
                      <td className="px-5 py-4">
                        <p className="text-gray-300 text-sm">{o.customer}</p>
                      </td>
                      <td className="px-5 py-4">
                        <p className="text-gray-400 text-sm max-w-[180px] truncate">{o.items}</p>
                      </td>
                      <td className="px-5 py-4">
                        <span className="font-bold text-amber-400">₹{o.amount}</span>
                      </td>
                      <td className="px-5 py-4">
                        <span className="text-gray-500 text-sm">{new Date(o.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</span>
                      </td>
                      <td className="px-5 py-4">
                        <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold ${cfg.color}`}>
                          {cfg.icon} {o.status}
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <select
                          value={o.status}
                          onChange={e => updateStatus(o.id, e.target.value)}
                          className="glass rounded-xl px-3 py-1.5 text-xs text-white bg-transparent outline-none cursor-pointer border border-white/10 hover:border-amber-500/30 transition-colors"
                        >
                          {STATUS_OPTIONS.map(s => <option key={s} value={s} className="bg-dark-700">{s}</option>)}
                        </select>
                      </td>
                    </motion.tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Summary cards */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {STATUS_OPTIONS.map((s, i) => {
            const cfg = statusConfig[s]
            const count = orders.filter(o => o.status === s).length
            const revenue = orders.filter(o => o.status === s).reduce((sum, o) => sum + o.amount, 0)
            return (
              <motion.div key={s}
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.1 }}
                className={`glass rounded-2xl p-5 flex items-center gap-4`}
              >
                <div className={`w-2 h-12 rounded-full ${cfg.dot}`} />
                <div>
                  <div className="text-2xl font-bold text-white">{count}</div>
                  <div className="text-sm text-gray-400">{s}</div>
                  <div className="text-xs text-gray-600 mt-0.5">₹{revenue} total</div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </main>
  )
}
