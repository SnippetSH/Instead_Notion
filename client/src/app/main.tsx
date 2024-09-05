import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { router } from './router'
import { RouterProvider } from 'react-router-dom'
import { ThemeProvider } from './theme'
import '../assets/styles/index.css'
import { ThemeStore } from '@/api/store/themeStore'

const App = () => {
  const theme = ThemeStore(state => state.theme);

  useEffect(() => {
    document.body.className = theme === 'dark' ? 'text-white-500' : 'text-dark-500';
  }, [theme])

  return (
    <RouterProvider router={router} />
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>,
)
