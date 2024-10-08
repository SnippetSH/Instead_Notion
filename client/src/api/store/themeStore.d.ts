type Theme = 'light' | 'dark'
type ThemeProviderProps = {
    children: React.ReactNode,
    defaultTheme?: Theme,
    storageKey?: string,
}

type ThemeProviderState = {
    theme: Theme,
    setTheme: (theme: Theme) => void,
}

export type { ThemeProviderState, ThemeProviderProps, Theme }