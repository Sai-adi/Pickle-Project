import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Pencil, Trash2, X, Save, Package, Image } from 'lucide-react'
import { SAMPLE_PRODUCTS } from '../../data/products'
import toast from 'react-hot-toast'

const EMPTY_FORM = {
  name: '', description: '', price: '', originalPrice: '',
  category: 'Mango', image: '', weight: '400g', spicy: 1, stock: 50, badge: '', isNew: false,
}

const CATS = ['Mango', 'Chili', 'Lemon', 'Mixed', 'Garlic', 'Vegetables']

export default function AdminProducts() {
  const [products, setProducts] = useState(SAMPLE_PRODUCTS)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing]   = useState(null)
  const [form, setForm]         = useState(EMPTY_FORM)
  const [deleteId, setDeleteId] = useState(null)

  const openNew = () => {
    setEditing(null)
    setForm(EMPTY_FORM)
    setShowForm(true)
  }

  const openEdit = (p) => {
    setEditing(p.id)
    setForm({ ...p })
    setShowForm(true)
  }

  const handleSave = () => {
    if (!form.name || !form.price) return toast.error('Name and price are required')
    if (editing) {
      setProducts(prev => prev.map(p => p.id === editing ? { ...p, ...form, price: Number(form.price) } : p))
      toast.success('Product updated!')
    } else {
      const newProduct = { ...form, id: `prod-${Date.now()}`, price: Number(form.price), rating: '4.5' }
      setProducts(prev => [newProduct, ...prev])
      toast.success('Product added! 🥒')
    }
    setShowForm(false)
    setEditing(null)
    setForm(EMPTY_FORM)
  }

  const handleDelete = (id) => {
    setProducts(prev => prev.filter(p => p.id !== id))
    setDeleteId(null)
    toast.success('Product removed')
  }

  const field = (key, label, type = 'text', extras = {}) => (
    <div>
      <label className="block text-xs font-medium text-gray-400 mb-1.5 uppercase tracking-wide">{label}</label>
      <input
        type={type}
        value={form[key] ?? ''}
        onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
        className="w-full glass rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-amber-500/40 transition-all"
        {...extras}
      />
    </div>
  )

  return (
    <main className="min-h-screen pt-28 pb-20 px-6">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between mb-10">
          <div>
            <div className="flex items-center gap-2 text-amber-400 text-sm font-medium uppercase tracking-widest mb-2">
              <Package size={16} /> Products
            </div>
            <h1 className="font-display text-4xl font-bold text-white">Manage Pickles</h1>
            <p className="text-gray-400 mt-1">{products.length} products in your store</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={openNew}
            id="add-product-btn"
            className="btn-primary flex items-center gap-2"
          >
            <Plus size={18} /> Add Pickle
          </motion.button>
        </motion.div>

        {/* Products table */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
          className="glass rounded-3xl overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  {['Product', 'Category', 'Price', 'Stock', 'Spicy', 'Status', 'Actions'].map(h => (
                    <th key={h} className="text-left text-xs font-semibold text-gray-500 uppercase tracking-widest px-5 py-4">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {products.map((p, i) => (
                  <motion.tr
                    key={p.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                    className="border-b border-white/5 hover:bg-white/3 transition-colors group"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <img src={p.image} alt={p.name} className="w-12 h-12 rounded-xl object-cover" />
                        <div>
                          <p className="font-semibold text-white text-sm">{p.name}</p>
                          <p className="text-xs text-gray-500 max-w-[180px] truncate">{p.description}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className="px-2.5 py-1 glass text-xs text-gray-300 rounded-lg">{p.category}</span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="font-bold text-amber-400">₹{p.price}</div>
                      {p.originalPrice && <div className="text-xs text-gray-500 line-through">₹{p.originalPrice}</div>}
                    </td>
                    <td className="px-5 py-4">
                      <span className={`font-semibold text-sm ${p.stock === 0 ? 'text-red-400' : p.stock <= 10 ? 'text-orange-400' : 'text-green-400'}`}>
                        {p.stock === 0 ? 'Out' : `${p.stock} units`}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-sm">{'🌶️'.repeat(p.spicy || 0) || '—'}</td>
                    <td className="px-5 py-4">
                      {p.badge && <span className="px-2 py-1 bg-amber-500/20 text-amber-400 text-xs font-bold rounded-lg">{p.badge}</span>}
                      {p.isNew  && <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs font-bold rounded-lg ml-1">New</span>}
                      {!p.badge && !p.isNew && <span className="text-gray-600 text-xs">—</span>}
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => openEdit(p)}
                          className="p-2 rounded-xl text-blue-400 hover:bg-blue-500/15 transition-colors">
                          <Pencil size={15} />
                        </button>
                        <button onClick={() => setDeleteId(p.id)}
                          className="p-2 rounded-xl text-red-400 hover:bg-red-500/15 transition-colors">
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>

      {/* ─── Add/Edit Form Modal ─── */}
      <AnimatePresence>
        {showForm && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            onClick={e => e.target === e.currentTarget && setShowForm(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="glass-dark rounded-3xl p-7 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
              style={{ boxShadow: '0 0 60px rgba(255,193,7,0.12)' }}
            >
              <div className="flex items-center justify-between mb-7">
                <h2 className="font-display text-2xl font-bold text-white">
                  {editing ? 'Edit Product' : 'Add New Pickle'}
                </h2>
                <button onClick={() => setShowForm(false)} className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/10">
                  <X size={20} />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {field('name',          'Product Name',    'text', { placeholder: 'e.g. Aam Ka Achaar' })}
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1.5 uppercase tracking-wide">Category</label>
                  <select
                    value={form.category}
                    onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                    className="w-full glass rounded-xl px-4 py-3 text-sm text-white bg-transparent outline-none"
                  >
                    {CATS.map(c => <option key={c} value={c} className="bg-dark-700">{c}</option>)}
                  </select>
                </div>
                {field('price',         'Price (₹)',       'number', { placeholder: '249' })}
                {field('originalPrice', 'Original Price',  'number', { placeholder: '299 (optional)' })}
                {field('weight',        'Weight',          'text',   { placeholder: '400g' })}
                {field('stock',         'Stock Units',     'number', { placeholder: '50' })}
                <div className="sm:col-span-2">{field('description', 'Description', 'text', { placeholder: 'Describe the pickle...' })}</div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-gray-400 mb-1.5 uppercase tracking-wide flex items-center gap-1.5">
                    <Image size={13} /> Image URL
                  </label>
                  <input
                    type="text"
                    value={form.image ?? ''}
                    onChange={e => setForm(f => ({ ...f, image: e.target.value }))}
                    placeholder="/images/mango.png or https://..."
                    className="w-full glass rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-amber-500/40"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1.5 uppercase tracking-wide">Spice Level (0–3)</label>
                  <input
                    type="range" min={0} max={3} value={form.spicy || 0}
                    onChange={e => setForm(f => ({ ...f, spicy: Number(e.target.value) }))}
                    className="w-full accent-amber-500"
                  />
                  <p className="text-xs text-amber-400 mt-1">{'🌶️'.repeat(form.spicy || 0) || 'No spice'}</p>
                </div>
                <div>
                  {field('badge', 'Badge Label', 'text', { placeholder: 'Best Seller / Popular' })}
                </div>
                <div className="flex items-center gap-3">
                  <input type="checkbox" id="is-new-check" checked={!!form.isNew}
                    onChange={e => setForm(f => ({ ...f, isNew: e.target.checked }))}
                    className="w-4 h-4 accent-amber-500 rounded"
                  />
                  <label htmlFor="is-new-check" className="text-sm text-gray-300">Mark as New Arrival</label>
                </div>
              </div>

              <div className="flex gap-3 mt-7">
                <motion.button whileTap={{ scale: 0.97 }} onClick={handleSave}
                  id="save-product-btn"
                  className="btn-primary flex-1 flex items-center justify-center gap-2">
                  <Save size={17} /> {editing ? 'Update Product' : 'Add Product'}
                </motion.button>
                <button onClick={() => setShowForm(false)} className="btn-secondary px-6">
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Delete Confirm ─── */}
      <AnimatePresence>
        {deleteId && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          >
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
              className="glass-dark rounded-3xl p-8 w-full max-w-sm text-center"
              style={{ boxShadow: '0 0 40px rgba(239,68,68,0.15)' }}
            >
              <div className="text-5xl mb-4">🗑️</div>
              <h3 className="font-display text-xl font-bold text-white mb-2">Delete Product?</h3>
              <p className="text-gray-400 text-sm mb-7">This action cannot be undone. The product will be permanently removed.</p>
              <div className="flex gap-3">
                <button onClick={() => handleDelete(deleteId)}
                  className="flex-1 py-3 rounded-2xl bg-red-500 hover:bg-red-600 text-white font-bold transition-colors">
                  Delete
                </button>
                <button onClick={() => setDeleteId(null)}
                  className="flex-1 btn-secondary !py-3">
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
