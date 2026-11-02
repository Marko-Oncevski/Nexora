import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { HashRouter } from 'react-router-dom'
import { CartProvider } from './context/CartContext.jsx'
import { SearchProvider } from './context/SearchContext.jsx'
import { FavoritesProvider } from './context/FavoritesContext.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'
import { AuthProvider } from './context/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <AuthProvider>
        <CartProvider>
          <SearchProvider>
            <FavoritesProvider>
              <ThemeProvider>
                <App />
              </ThemeProvider>
            </FavoritesProvider>
          </SearchProvider>
        </CartProvider>
      </AuthProvider>
    </HashRouter>
  </StrictMode>,
)
