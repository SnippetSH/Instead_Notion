import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { router } from './router'
import { RouterProvider } from 'react-router-dom'
import { ThemeProvider } from './theme'
import '../assets/styles/index.css'
import { ThemeStore } from '@/api/store/themeStore'
import { Header } from '@/components/Header'

const App = () => {
  const theme = ThemeStore(state => state.theme);

  useEffect(() => {
    document.body.className = theme === 'dark' ? 'text-white-500' : 'text-dark-500';
  }, [theme])

  return (
    <div className='w-full h-full'>
      <Header />
      <RouterProvider router={router} />
    </div>
    
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>,
)
