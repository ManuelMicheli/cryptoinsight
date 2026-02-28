import { Routes, Route } from 'react-router'
import Layout from './components/layout/Layout'
import HomePage from './pages/HomePage'
import CryptoPage from './pages/CryptoPage'
import MarketPage from './pages/MarketPage'
import EventsPage from './pages/EventsPage'
import NewsPage from './pages/NewsPage'
import NotFoundPage from './pages/NotFoundPage'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="crypto" element={<CryptoPage />} />
        <Route path="mercato" element={<MarketPage />} />
        <Route path="eventi" element={<EventsPage />} />
        <Route path="news" element={<NewsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
