import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, SlidersHorizontal, X } from 'lucide-react'
import ProductCard from '../components/ProductCard'
import { SAMPLE_PRODUCTS, CATEGORIES } from '../data/products'

export default function Shop() {
  const [search, setSearch]     = useState('')
  const [category, setCategory] = useState('All')
  const [sort, setSort]         = useState('default')
  const [showFilters, setShowFilters] = useState(false)

  const filtered = useMemo(() => {
    let list = [...SAMPLE_PRODUCTS]
    if (search) list = list.filter(p =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase())
    )
    if (category !== 'All') list = list.filter(p => p.category === category)
    if (sort === 'price-asc')  list.sort((a, b) => a.price - b.price)
    if (sort === 'price-desc') list.sort((a, b) => b.price - a.price)
    if (sort === 'rating')     list.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating))
    return list
  }, [search, category, sort])

  return (
    <main className="relative min-h-screen pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <p className="text-amber-400 font-medium text-sm uppercase tracking-widest mb-3">Our Collection</p>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-white mb-4">
            Shop All Pickles
          </h1>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            {SAMPLE_PRODUCTS.length} artisanal varieties, handcrafted with love. Find your perfect achaar.
          </p>
        </motion.div>

        {/* Search + Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex gap-3 flex-wrap">
            {/* Search */}
            <div className="flex-1 min-w-[240px] flex items-center gap-3 glass rounded-2xl px-4 py-3 focus-within:ring-2 focus-within:ring-amber-500/40 transition-all">
              <Search size={18} className="text-gray-400 shrink-0" />
              <input
                id="search-input"
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search pickles…"
                className="flex-1 bg-transparent text-white placeholder-gray-500 outline-none text-sm"
              />
              {search && (
                <button onClick={() => setSearch('')} className="text-gray-500 hover:text-white">
                  <X size={16} />
                </button>
              )}
            </div>

            {/* Sort */}
            <select
              value={sort}
              onChange={e => setSort(e.target.value)}
              className="glass rounded-2xl px-4 py-3 text-sm text-gray-300 bg-transparent outline-none cursor-pointer"
            >
              <option value="default" className="bg-dark-700">Default</option>
              <option value="price-asc" className="bg-dark-700">Price: Low → High</option>
              <option value="price-desc" className="bg-dark-700">Price: High → Low</option>
              <option value="rating" className="bg-dark-700">Top Rated</option>
            </select>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-3 rounded-2xl text-sm font-medium transition-all ${showFilters ? 'bg-amber-500 text-black' : 'glass text-gray-300'}`}
            >
              <SlidersHorizontal size={17} />
              Filters
            </button>
          </div>

          {/* Category chips */}
          <div className="flex gap-2 flex-wrap">
            {CATEGORIES.map(cat => (
              <motion.button
                key={cat}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCategory(cat)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  category === cat
                    ? 'bg-amber-500 text-black shadow-lg'
                    : 'glass text-gray-400 hover:text-white hover:border-amber-500/30'
                }`}
              >
                {cat}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Results count */}
        <div className="mb-6 flex items-center justify-between">
          <p className="text-gray-400 text-sm">
            {filtered.length === 0 ? 'No pickles found' : `Showing ${filtered.length} pickle${filtered.length !== 1 ? 's' : ''}`}
          </p>
          {(search || category !== 'All') && (
            <button
              onClick={() => { setSearch(''); setCategory('All') }}
              className="text-sm text-amber-400 hover:text-amber-300 flex items-center gap-1"
            >
              <X size={14} /> Clear filters
            </button>
          )}
        </div>

        {/* Product Grid */}
        <AnimatePresence mode="wait">
          {filtered.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-24"
            >
              <div className="text-7xl mb-4">🔍</div>
              <h3 className="font-display text-2xl text-white mb-2">No pickles found</h3>
              <p className="text-gray-400">Try a different search or category</p>
            </motion.div>
          ) : (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filtered.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  )
}
