import { motion, AnimatePresence } from 'framer-motion'
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight } from 'lucide-react'
import { useCartStore } from '../store/cartStore'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import { useState } from 'react'
import LoginModal from './LoginModal'
import toast from 'react-hot-toast'

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQty, clearCart } = useCartStore()
  const { user } = useAuthStore()
  const navigate = useNavigate()
  const [loginOpen, setLoginOpen] = useState(false)

  const total = items.reduce((s, i) => s + i.price * i.qty, 0)

  const handleCheckout = () => {
    if (!user) {
      toast('Please sign in to place an order', { icon: '🔐' })
      setLoginOpen(true)
      return
    }
    closeCart()
    navigate('/orders')
    toast.success('Order placed successfully! 🎉')
    clearCart()
  }

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeCart}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 h-full w-full max-w-md z-50 glass-dark flex flex-col shadow-2xl"
              style={{ boxShadow: '-20px 0 60px rgba(0,0,0,0.6)' }}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <ShoppingBag size={22} className="text-amber-400" />
                  <h2 className="font-display text-xl font-bold text-white">Your Cart</h2>
                  <span className="px-2 py-0.5 bg-amber-500/20 text-amber-400 text-xs font-bold rounded-full">
                    {items.length} items
                  </span>
                </div>
                <button
                  onClick={closeCart}
                  className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Items */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                <AnimatePresence>
                  {items.length === 0 ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex flex-col items-center justify-center h-full gap-4 text-gray-500"
                    >
                      <div className="text-7xl">🥒</div>
                      <p className="text-lg font-medium">Your cart is empty</p>
                      <p className="text-sm">Add some delicious pickles!</p>
                      <button
                        onClick={() => { closeCart(); navigate('/shop') }}
                        className="btn-secondary mt-2"
                      >
                        Browse Shop
                      </button>
                    </motion.div>
                  ) : (
                    items.map(item => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -30 }}
                        className="flex items-center gap-3 glass rounded-2xl p-3"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 rounded-xl object-cover shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-white text-sm truncate">{item.name}</p>
                          <p className="text-amber-400 font-bold text-sm mt-0.5">
                            ₹{(item.price * item.qty).toFixed(0)}
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <button
                              onClick={() => updateQty(item.id, item.qty - 1)}
                              className="w-6 h-6 rounded-lg bg-white/10 hover:bg-amber-500/20 text-white flex items-center justify-center transition-colors"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="text-white font-semibold w-5 text-center text-sm">{item.qty}</span>
                            <button
                              onClick={() => updateQty(item.id, item.qty + 1)}
                              className="w-6 h-6 rounded-lg bg-white/10 hover:bg-amber-500/20 text-white flex items-center justify-center transition-colors"
                            >
                              <Plus size={12} />
                            </button>
                          </div>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="p-2 text-gray-500 hover:text-red-400 transition-colors rounded-lg hover:bg-red-500/10"
                        >
                          <Trash2 size={16} />
                        </button>
                      </motion.div>
                    ))
                  )}
                </AnimatePresence>
              </div>

              {/* Footer */}
              {items.length > 0 && (
                <div className="p-6 border-t border-white/10 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 font-medium">Subtotal</span>
                    <span className="text-2xl font-bold text-gradient-amber">₹{total.toFixed(0)}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>Delivery</span>
                    <span className="text-green-400 font-medium">{total >= 500 ? 'FREE' : '₹50'}</span>
                  </div>
                  {total < 500 && (
                    <div className="glass rounded-xl p-3 text-xs text-amber-400/80 text-center">
                      Add ₹{(500 - total).toFixed(0)} more for free delivery!
                    </div>
                  )}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleCheckout}
                    id="checkout-btn"
                    className="btn-primary w-full flex items-center justify-center gap-2"
                  >
                    Place Order <ArrowRight size={18} />
                  </motion.button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <LoginModal isOpen={loginOpen} onClose={() => setLoginOpen(false)} />
    </>
  )
}
