import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router'
import { AnimatePresence } from 'motion/react'
import { useLenis } from '../../hooks/useLenis'
import ScrollProgress from '../ui/ScrollProgress'
import Navbar from './Navbar'
import Footer from './Footer'

export default function Layout() {
  const location = useLocation()
  const lenisRef = useLenis()

  useEffect(() => {
    window.scrollTo(0, 0)
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true })
    }
  }, [location.pathname, lenisRef])

  return (
    <div className="min-h-screen bg-bg-primary">
      <ScrollProgress />
      <Navbar />
      <AnimatePresence mode="wait">
        <Outlet key={location.pathname} />
      </AnimatePresence>
      <Footer />
    </div>
  )
}
