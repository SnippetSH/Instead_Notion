import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { TUserState, TUserActions } from './userStore.d'
import { createSelectors } from '../createSelectors'

const useUserStore = createSelectors(create<TUserState & TUserActions>()(persist((set) => ({
    name: 'Ryu',
    KKEUJEOK: 'ggu ggu',
    session: '1234567890',
    isSignedIn: true,
    setUser: (user: TUserState) => set({ ...user, isSignedIn: true }),
}), {
    name: 'user',
})))

export { useUserStore }