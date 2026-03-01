import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import './index.css'
import App from './App.jsx'
import ErrorBoundary from './components/ErrorBoundary.jsx'
import { CurrencyProvider } from './contexts/CurrencyContext.jsx'
import { LanguageProvider } from './contexts/LanguageContext.jsx'
import { CryptoDataProvider } from './contexts/CryptoDataContext.jsx'
import { PaletteCycleProvider } from './contexts/PaletteCycleContext.jsx'
import { PortfolioProvider } from './contexts/PortfolioContext.jsx'
import { AlertProvider } from './contexts/AlertContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <PaletteCycleProvider>
          <LanguageProvider>
            <CurrencyProvider>
              <CryptoDataProvider>
                <PortfolioProvider>
                  <AlertProvider>
                    <App />
                  </AlertProvider>
                </PortfolioProvider>
              </CryptoDataProvider>
            </CurrencyProvider>
          </LanguageProvider>
        </PaletteCycleProvider>
      </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>,
)
