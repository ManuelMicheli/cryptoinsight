import { useEffect, useState } from 'react'
import { useLocation, useOutlet } from 'react-router'
import { AnimatePresence } from 'motion/react'
import { useLenis } from '../../hooks/useLenis'
import ScrollProgress from '../ui/ScrollProgress'
import Navbar from './Navbar'
import Footer from './Footer'

function FrozenOutlet() {
  const o = useOutlet()
  const [outlet] = useState(o)
  return outlet
}

export default function Layout() {
  const location = useLocation()
  const lenisRef = useLenis()

  useEffect(() => {
    window.scrollTo(0, 0)
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true })
    }
  }, [location.pathname, lenisRef])

  const isHome = location.pathname === '/'

  return (
    <div className="min-h-screen bg-bg-primary">
      {!isHome && <ScrollProgress />}
      <Navbar />
      <AnimatePresence mode="wait">
        <FrozenOutlet key={location.pathname} />
      </AnimatePresence>
      {!isHome && <Footer />}
    </div>
  )
}
