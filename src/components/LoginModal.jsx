import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { auth } from '../firebase/config'
import {
  RecaptchaVerifier,
  signInWithPhoneNumber
} from 'firebase/auth'
import { useAuthStore, ADMIN_PHONES } from '../store/authStore'
import { X, Phone, Shield, Loader2 } from 'lucide-react'
import toast from 'react-hot-toast'

export default function LoginModal({ isOpen, onClose }) {
  const [phone, setPhone]           = useState('')
  const [otp, setOtp]               = useState('')
  const [step, setStep]             = useState('phone') // 'phone' | 'otp'
  const [loading, setLoading]       = useState(false)
  const [confirmObj, setConfirmObj] = useState(null)
  const { setUser, setAdmin }       = useAuthStore()

  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'invisible',
        callback: () => {},
      })
    }
  }

  const sendOTP = async () => {
    const fullPhone = phone.startsWith('+') ? phone : `+91${phone}`
    if (fullPhone.replace(/\D/g, '').length < 10) {
      return toast.error('Enter a valid mobile number')
    }
    setLoading(true)
    try {
      setupRecaptcha()
      const confirmation = await signInWithPhoneNumber(auth, fullPhone, window.recaptchaVerifier)
      setConfirmObj(confirmation)
      setStep('otp')
      toast.success(`OTP sent to ${fullPhone}`)
    } catch (err) {
      console.error(err)
      toast.error(err.message || 'Failed to send OTP')
      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.clear()
        window.recaptchaVerifier = null
      }
    } finally {
      setLoading(false)
    }
  }

  const verifyOTP = async () => {
    if (otp.length !== 6) return toast.error('Enter the 6-digit OTP')
    setLoading(true)
    try {
      const result = await confirmObj.confirm(otp)
      const user = result.user
      const isAdmin = ADMIN_PHONES.includes(user.phoneNumber)
      setUser({ uid: user.uid, phoneNumber: user.phoneNumber })
      setAdmin(isAdmin)
      toast.success(isAdmin ? '👑 Welcome, Admin!' : '🎉 Welcome to PickleKing!')
      handleClose()
    } catch {
      toast.error('Invalid OTP. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleClose = () => {
    setPhone('')
    setOtp('')
    setStep('phone')
    setConfirmObj(null)
    setLoading(false)
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          onClick={(e) => e.target === e.currentTarget && handleClose()}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

          {/* Modal */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-md glass-dark rounded-3xl p-8 shadow-2xl"
            style={{ boxShadow: '0 0 60px rgba(255,193,7,0.15), 0 25px 50px rgba(0,0,0,0.6)' }}
          >
            {/* Close */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X size={20} />
            </button>

            {/* Icon */}
            <div className="flex flex-col items-center mb-8">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center text-3xl mb-4 shadow-lg glow-amber">
                {step === 'phone' ? '📱' : '🔐'}
              </div>
              <h2 className="font-display text-2xl font-bold text-white mb-1">
                {step === 'phone' ? 'Sign In' : 'Enter OTP'}
              </h2>
              <p className="text-sm text-gray-400 text-center">
                {step === 'phone'
                  ? 'Enter your mobile number to receive an OTP'
                  : `OTP sent to +91 ${phone}. Check your messages.`}
              </p>
            </div>

            {/* Step: Phone */}
            <AnimatePresence mode="wait">
              {step === 'phone' ? (
                <motion.div
                  key="phone-step"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-4"
                >
                  <div className="flex items-center gap-2 glass rounded-2xl px-4 py-3.5 focus-within:ring-2 focus-within:ring-amber-500/50 transition-all">
                    <span className="text-gray-400 text-sm font-medium whitespace-nowrap">+91</span>
                    <div className="w-px h-5 bg-white/20" />
                    <Phone size={18} className="text-amber-400 shrink-0" />
                    <input
                      id="phone-input"
                      type="tel"
                      value={phone}
                      onChange={e => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                      placeholder="10-digit mobile number"
                      className="flex-1 bg-transparent text-white placeholder-gray-500 outline-none text-sm font-medium tracking-wide"
                      onKeyDown={e => e.key === 'Enter' && sendOTP()}
                    />
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={sendOTP}
                    disabled={loading}
                    id="send-otp-btn"
                    className="btn-primary w-full flex items-center justify-center gap-2 !py-4"
                  >
                    {loading ? <Loader2 size={20} className="animate-spin" /> : <Phone size={20} />}
                    {loading ? 'Sending OTP…' : 'Send OTP'}
                  </motion.button>
                </motion.div>
              ) : (
                <motion.div
                  key="otp-step"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4"
                >
                  <div className="flex items-center gap-3 glass rounded-2xl px-4 py-3.5 focus-within:ring-2 focus-within:ring-amber-500/50 transition-all">
                    <Shield size={18} className="text-amber-400 shrink-0" />
                    <input
                      id="otp-input"
                      type="number"
                      value={otp}
                      onChange={e => setOtp(e.target.value.slice(0, 6))}
                      placeholder="6-digit OTP"
                      className="flex-1 bg-transparent text-white placeholder-gray-500 outline-none text-lg font-mono tracking-[0.5em]"
                      onKeyDown={e => e.key === 'Enter' && verifyOTP()}
                      autoFocus
                    />
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={verifyOTP}
                    disabled={loading}
                    id="verify-otp-btn"
                    className="btn-primary w-full flex items-center justify-center gap-2 !py-4"
                  >
                    {loading ? <Loader2 size={20} className="animate-spin" /> : <Shield size={20} />}
                    {loading ? 'Verifying…' : 'Verify OTP'}
                  </motion.button>

                  <button
                    onClick={() => setStep('phone')}
                    className="w-full text-sm text-gray-400 hover:text-amber-400 transition-colors py-2"
                  >
                    ← Change number
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Invisible recaptcha anchor */}
            <div id="recaptcha-container" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
