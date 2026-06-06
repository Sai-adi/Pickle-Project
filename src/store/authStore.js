import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      isAdmin: false,
      loading: false,

      setUser: (user) => set({ user }),
      setAdmin: (isAdmin) => set({ isAdmin }),
      setLoading: (loading) => set({ loading }),
      logout: () => set({ user: null, isAdmin: false }),
    }),
    {
      name: 'pickle-auth',
      partialize: (state) => ({ user: state.user, isAdmin: state.isAdmin }),
    }
  )
);

// Admin phone numbers (in production, use Firestore roles)
export const ADMIN_PHONES = ['+919999999999'];
