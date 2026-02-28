import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import './index.css'
import App from './App.jsx'
import { CurrencyProvider } from './contexts/CurrencyContext.jsx'
import { LanguageProvider } from './contexts/LanguageContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <LanguageProvider>
        <CurrencyProvider>
          <App />
        </CurrencyProvider>
      </LanguageProvider>
    </BrowserRouter>
  </StrictMode>,
)
