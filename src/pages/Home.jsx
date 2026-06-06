import { Suspense, useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Truck, Shield, Star, Award } from 'lucide-react'
import HeroScene from '../components/HeroScene'
import ProductCard from '../components/ProductCard'
import { SAMPLE_PRODUCTS } from '../data/products'

const features = [
  { icon: <Truck size={24} />, title: 'Free Delivery', desc: 'On orders above ₹500', color: 'amber' },
  { icon: <Shield size={24} />, title: '100% Authentic', desc: 'Traditional recipes only', color: 'green' },
  { icon: <Star size={24} />, title: 'Premium Quality', desc: 'Hand-selected ingredients', color: 'orange' },
  { icon: <Award size={24} />, title: 'Award Winning', desc: 'Best pickle brand 2024', color: 'red' },
]

const stats = [
  { value: '50,000+', label: 'Happy Customers' },
  { value: '25+',     label: 'Pickle Varieties' },
  { value: '15',      label: 'Years of Craft' },
  { value: '4.9★',    label: 'Average Rating' },
]

export default function Home() {
  const featured = SAMPLE_PRODUCTS.filter(p => p.badge || p.isNew).slice(0, 3)

  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* ─── HERO ─── */}
      <section className="relative min-h-screen flex items-center">
        {/* 3D Background Scene */}
        <div className="absolute inset-0 z-0">
          <Suspense fallback={null}>
            <HeroScene />
          </Suspense>
        </div>

        {/* Gradient overlays */}
        <div className="absolute inset-0 hero-gradient z-[1] pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-dark-900/80 via-dark-900/40 to-transparent z-[1] pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-dark-900 to-transparent z-[1] pointer-events-none" />

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-28 pb-20">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full text-sm text-amber-400 font-medium mb-6"
            >
              <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
              India's #1 Artisanal Pickle Brand
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-display text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.05] mb-6"
            >
              <span className="text-white">Taste the</span>
              <br />
              <span className="text-gradient-amber">Tradition</span>
              <br />
              <span className="text-white">in Every</span>
              <br />
              <span className="text-gradient-green">Jar.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="text-gray-300 text-lg leading-relaxed mb-10 max-w-xl"
            >
              Handcrafted with ancient recipes passed down through generations.
              Pure ingredients, authentic spices, zero preservatives — delivered fresh to your doorstep.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap gap-4"
            >
              <Link to="/shop">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  id="hero-shop-btn"
                  className="btn-primary flex items-center gap-2 text-base"
                >
                  Shop Now <ArrowRight size={20} />
                </motion.button>
              </Link>
              <Link to="/shop">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-secondary flex items-center gap-2 text-base"
                >
                  View Collection
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        >
          <span className="text-xs text-gray-500 uppercase tracking-widest">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-5 h-8 border-2 border-white/20 rounded-full flex items-start justify-center pt-1.5"
          >
            <div className="w-1 h-2 bg-amber-400 rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* ─── STATS ─── */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 -mt-4 mb-24">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-dark rounded-3xl p-8 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl font-bold text-gradient-amber mb-1">{s.value}</div>
              <div className="text-sm text-gray-400">{s.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ─── FEATURES ─── */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 mb-28">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5 }}
              className="glass rounded-2xl p-6 flex gap-4 items-start"
            >
              <div className={`p-3 rounded-xl ${
                f.color === 'amber'  ? 'bg-amber-500/20 text-amber-400' :
                f.color === 'green'  ? 'bg-green-500/20 text-green-400' :
                f.color === 'orange' ? 'bg-orange-500/20 text-orange-400' :
                                       'bg-red-500/20 text-red-400'
              }`}>
                {f.icon}
              </div>
              <div>
                <div className="font-semibold text-white mb-0.5">{f.title}</div>
                <div className="text-sm text-gray-400">{f.desc}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── FEATURED PRODUCTS ─── */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 mb-28">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-end justify-between mb-12"
        >
          <div>
            <p className="text-amber-400 font-medium text-sm uppercase tracking-widest mb-2">Our Bestsellers</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white">
              Handpicked for You
            </h2>
          </div>
          <Link to="/shop">
            <motion.button
              whileHover={{ scale: 1.05, x: 4 }}
              className="hidden md:flex items-center gap-2 text-amber-400 hover:text-amber-300 font-semibold transition-colors"
            >
              View all <ArrowRight size={18} />
            </motion.button>
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>

        <div className="mt-10 text-center md:hidden">
          <Link to="/shop">
            <button className="btn-secondary flex items-center gap-2 mx-auto">
              View All Pickles <ArrowRight size={18} />
            </button>
          </Link>
        </div>
      </section>

      {/* ─── BANNER ─── */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 mb-28">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl"
          style={{
            background: 'linear-gradient(135deg, rgba(255,140,0,0.2) 0%, rgba(139,195,74,0.15) 50%, rgba(220,48,39,0.2) 100%)',
            border: '1px solid rgba(255,193,7,0.2)',
          }}
        >
          <div className="noise-overlay absolute inset-0 opacity-50" />
          <div className="relative p-12 md:p-16 flex flex-col md:flex-row items-center gap-8">
            <div className="text-6xl">🥒</div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="font-display text-3xl md:text-4xl font-bold text-white mb-3">
                Free Delivery on First Order!
              </h3>
              <p className="text-gray-300 text-lg mb-6">
                Use code <span className="text-amber-400 font-bold">PICKLEKING</span> at checkout for free delivery on your first order, no minimum required.
              </p>
              <Link to="/shop">
                <button className="btn-primary inline-flex items-center gap-2">
                  Order Now <ArrowRight size={18} />
                </button>
              </Link>
            </div>
            <div className="hidden md:block">
              <img src="/images/hero.png" alt="Pickle jar" className="w-40 h-40 object-cover rounded-2xl opacity-80" />
            </div>
          </div>
        </motion.div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 mb-28">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-amber-400 font-medium text-sm uppercase tracking-widest mb-2">Testimonials</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white">What Our Customers Say</h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { name: 'Priya S.', city: 'Delhi', text: 'The mango pickle reminded me of my grandmother\'s recipe! Absolutely authentic and delicious.', rating: 5 },
            { name: 'Rahul M.', city: 'Mumbai', text: 'Best pickle I\'ve ever tasted. The quality is outstanding and delivery was super fast!', rating: 5 },
            { name: 'Anita K.', city: 'Bangalore', text: 'Love the variety! The green chili pickle is fiery and perfect. Will order again and again.', rating: 5 },
          ].map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              whileHover={{ y: -5 }}
              className="glass rounded-2xl p-6"
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} size={16} className="text-amber-400 fill-amber-400" />
                ))}
              </div>
              <p className="text-gray-300 text-sm leading-relaxed mb-4 italic">"{t.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center text-black font-bold text-sm">
                  {t.name[0]}
                </div>
                <div>
                  <div className="text-white font-semibold text-sm">{t.name}</div>
                  <div className="text-gray-500 text-xs">{t.city}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 py-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🥒</span>
            <span className="font-display font-bold text-lg text-gradient-amber">PickleKing</span>
          </div>
          <p className="text-gray-500 text-sm text-center">
            © 2026 PickleKing. Crafted with love & spice. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-gray-500">
            <a href="#" className="hover:text-amber-400 transition-colors">Privacy</a>
            <a href="#" className="hover:text-amber-400 transition-colors">Terms</a>
            <a href="#" className="hover:text-amber-400 transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </main>
  )
}
