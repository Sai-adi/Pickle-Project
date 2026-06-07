import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingCart, Menu, X, LogOut, LayoutDashboard, User } from 'lucide-react'
import { useCartStore } from '../store/cartStore'
import { useAuthStore } from '../store/authStore'
import { auth } from '../firebase/config'
import { signOut } from 'firebase/auth'
import LoginModal from './LoginModal'
import toast from 'react-hot-toast'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [loginOpen, setLoginOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { count, toggleCart } = useCartStore()
  const { user, isAdmin, logout } = useAuthStore()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMenuOpen(false) }, [location.pathname])

  const handleLogout = async () => {
    try {
      await signOut(auth)
      logout()
      toast.success('Logged out successfully')
      navigate('/')
    } catch {
      toast.error('Failed to logout')
    }
  }

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/shop', label: 'Shop' },
    { to: '/orders', label: 'My Orders' },
  ]

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'glass-dark shadow-2xl py-3' : 'bg-transparent py-5'
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <motion.div
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.6 }}
              className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center text-xl shadow-lg"
            >

            </motion.div>
            <span className="font-display font-bold text-xl text-gradient-amber">

            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={`relative font-medium transition-colors duration-200 ${location.pathname === to ? 'text-amber-400' : 'text-gray-300 hover:text-amber-300'
                  }`}
              >
                {label}
                {location.pathname === to && (
                  <motion.div
                    layoutId="nav-underline"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full"
                  />
                )}
              </Link>
            ))}
            {isAdmin && (
              <Link to="/admin" className="text-purple-400 hover:text-purple-300 font-medium flex items-center gap-1.5">
                <LayoutDashboard size={16} /> Admin
              </Link>
            )}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* Cart */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleCart}
              id="cart-btn"
              className="relative p-2.5 glass rounded-xl text-gray-300 hover:text-amber-400 transition-colors"
            >
              <ShoppingCart size={22} />
              <AnimatePresence>
                {count > 0 && (
                  <motion.span
                    key={count}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-1 -right-1 w-5 h-5 bg-amber-500 text-black text-xs font-bold rounded-full flex items-center justify-center"
                  >
                    {count > 9 ? '9+' : count}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>

            {/* Auth */}
            {user ? (
              <div className="hidden md:flex items-center gap-2">
                <div className="flex items-center gap-2 px-3 py-2 glass rounded-xl text-sm text-gray-300">
                  <User size={15} className="text-amber-400" />
                  <span className="max-w-[100px] truncate">{user.phoneNumber || user.displayName || 'User'}</span>
                </div>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={handleLogout}
                  className="p-2.5 glass rounded-xl text-gray-400 hover:text-red-400 transition-colors"
                >
                  <LogOut size={18} />
                </motion.button>
              </div>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setLoginOpen(true)}
                id="login-btn"
                className="hidden md:block btn-primary !py-2.5 !px-5 !text-sm"
              >
                Sign In
              </motion.button>
            )}

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 glass rounded-xl text-gray-300"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden glass-dark mt-2 mx-4 rounded-2xl overflow-hidden"
            >
              <div className="p-4 flex flex-col gap-3">
                {navLinks.map(({ to, label }) => (
                  <Link
                    key={to}
                    to={to}
                    className={`py-2 px-4 rounded-xl font-medium transition-colors ${location.pathname === to
                        ? 'bg-amber-500/20 text-amber-400'
                        : 'text-gray-300 hover:bg-white/5'
                      }`}
                  >
                    {label}
                  </Link>
                ))}
                {isAdmin && (
                  <Link to="/admin" className="py-2 px-4 rounded-xl text-purple-400 hover:bg-purple-500/10 font-medium">
                    Admin Dashboard
                  </Link>
                )}
                {user ? (
                  <button
                    onClick={handleLogout}
                    className="py-2 px-4 rounded-xl text-red-400 hover:bg-red-500/10 text-left font-medium"
                  >
                    Logout
                  </button>
                ) : (
                  <button
                    onClick={() => { setLoginOpen(true); setMenuOpen(false) }}
                    className="btn-primary !py-2.5 text-center"
                  >
                    Sign In with Mobile
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      <LoginModal isOpen={loginOpen} onClose={() => setLoginOpen(false)} />
    </>
  )
}
