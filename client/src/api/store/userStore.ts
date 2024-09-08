import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { TUserState, TUserActions } from './userStore.d'
import { createSelectors } from '../createSelectors'

const useUserStore = createSelectors(create<TUserState & TUserActions>()(persist((set) => ({
    name: '',
    KKEUJEOK: '',
    session: '',
    isSignedIn: false,
    setUser: (user: TUserState) => set({ ...user }),
}), {
    name: 'userStore',
})))

export { useUserStore }