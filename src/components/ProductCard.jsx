import { motion } from 'framer-motion'
import { ShoppingCart, Star, Zap } from 'lucide-react'
import { useCartStore } from '../store/cartStore'
import toast from 'react-hot-toast'
import { useState } from 'react'

export default function ProductCard({ product, index = 0 }) {
  const { addItem, openCart } = useCartStore()
  const [hovered, setHovered] = useState(false)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const cx = (e.clientX - rect.left) / rect.width  - 0.5
    const cy = (e.clientY - rect.top)  / rect.height - 0.5
    setTilt({ x: cy * -15, y: cx * 15 })
  }

  const handleAddToCart = () => {
    addItem(product)
    toast.success(`${product.name} added to cart! 🥒`, {
      duration: 2000,
    })
  }

  const spicyDots = Array.from({ length: product.spicy || 0 })

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.5, ease: 'easeOut' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setTilt({ x: 0, y: 0 }) }}
      onMouseMove={handleMouseMove}
      style={{
        transform: hovered
          ? `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(1.03)`
          : 'perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)',
        transition: 'transform 0.15s ease',
      }}
      className="relative group glass rounded-3xl overflow-hidden cursor-pointer"
    >
      {/* Glow effect on hover */}
      {hovered && (
        <div className="absolute inset-0 rounded-3xl pointer-events-none"
          style={{ boxShadow: 'inset 0 0 40px rgba(255,193,7,0.1)' }} />
      )}

      {/* Badges */}
      <div className="absolute top-3 left-3 z-10 flex gap-2">
        {product.badge && (
          <span className="px-2 py-1 bg-amber-500 text-black text-xs font-bold rounded-lg">
            {product.badge}
          </span>
        )}
        {product.isNew && (
          <span className="px-2 py-1 bg-green-500 text-white text-xs font-bold rounded-lg flex items-center gap-1">
            <Zap size={10} /> New
          </span>
        )}
      </div>

      {/* Image */}
      <div className="relative h-52 overflow-hidden bg-gradient-to-br from-dark-700 to-dark-800">
        <motion.img
          src={product.image}
          alt={product.name}
          animate={{ scale: hovered ? 1.08 : 1 }}
          transition={{ duration: 0.4 }}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-900/60 to-transparent" />

        {/* Category chip */}
        <span className="absolute bottom-3 right-3 px-2.5 py-1 glass text-xs text-gray-300 rounded-lg">
          {product.category}
        </span>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-display font-bold text-white text-lg leading-tight">{product.name}</h3>
          <div className="flex items-center gap-1 text-amber-400 shrink-0">
            <Star size={14} fill="currentColor" />
            <span className="text-sm font-semibold">{product.rating || '4.8'}</span>
          </div>
        </div>

        <p className="text-gray-400 text-sm leading-relaxed mb-3 line-clamp-2">{product.description}</p>

        {/* Spicy indicator */}
        {product.spicy > 0 && (
          <div className="flex items-center gap-1.5 mb-3">
            <span className="text-xs text-gray-500">Spice:</span>
            {spicyDots.map((_, i) => (
              <span key={i} className="text-red-500 text-xs">🌶️</span>
            ))}
          </div>
        )}

        {/* Weight & price */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs text-gray-500 glass px-2 py-1 rounded-lg">{product.weight || '400g'}</span>
          <div className="text-right">
            {product.originalPrice && (
              <div className="text-xs text-gray-500 line-through">₹{product.originalPrice}</div>
            )}
            <div className="text-xl font-bold text-gradient-amber">₹{product.price}</div>
          </div>
        </div>

        {/* Stock */}
        {product.stock <= 10 && product.stock > 0 && (
          <p className="text-xs text-orange-400 mb-3">⚡ Only {product.stock} left!</p>
        )}
        {product.stock === 0 && (
          <p className="text-xs text-red-400 mb-3">❌ Out of stock</p>
        )}

        {/* Add to cart */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleAddToCart}
          disabled={product.stock === 0}
          id={`add-cart-${product.id}`}
          className={`w-full flex items-center justify-center gap-2 py-3 rounded-2xl font-semibold text-sm transition-all duration-300 ${
            product.stock === 0
              ? 'bg-white/5 text-gray-500 cursor-not-allowed'
              : 'btn-primary'
          }`}
        >
          <ShoppingCart size={17} />
          {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
        </motion.button>
      </div>
    </motion.div>
  )
}
