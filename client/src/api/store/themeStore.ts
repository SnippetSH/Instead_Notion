import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { ThemeProviderState, Theme } from './themeStore.d'

const ThemeStore = create<ThemeProviderState>()(
    persist(
        set => ({
            theme: 'dark',
            setTheme: (theme: Theme) => set({ theme }),
        }), 
        {
            name: 'theme',
        }
));

export { ThemeStore }