import { useState, useEffect, useRef, useCallback } from 'react'
import { Link, NavLink, useLocation } from 'react-router'
import { motion, AnimatePresence } from 'motion/react'
import { useCurrency } from '../../contexts/CurrencyContext'
import { useLanguage } from '../../contexts/LanguageContext'
import { usePaletteCycle } from '../../contexts/PaletteCycleContext'
import { t } from '../../i18n/translations'
import AlertBell from '../alerts/AlertBell'
import KineticMenu from '../ui/kinetic-menu'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)
  const { currency, toggleCurrency } = useCurrency()
  const { lang, toggleLang } = useLanguage()
  const { cssVars } = usePaletteCycle()
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  // Close menu & dropdown on route change
  useEffect(() => {
    setMenuOpen(false)
    setDropdownOpen(false)
  }, [location.pathname])

  const closeMenu = useCallback(() => setMenuOpen(false), [])
  const toggleMenu = useCallback(() => setMenuOpen(prev => !prev), [])

  const mainNavItems = [
    ['/crypto', t('navCrypto', lang)],
    ['/mercato', t('navMarket', lang)],
    ['/eventi', t('navEvents', lang)],
    ['/news', t('navNews', lang)],
  ]

  const moreNavItems = [
    ['/intelligence', t('navIntelligence', lang)],
    ['/strumenti', t('navStrumenti', lang)],
    ['/regolamentazione', t('navRegolamentazione', lang)],
  ]

  const allNavItems = [...mainNavItems, ...moreNavItems]

  const isMoreActive = moreNavItems.some(([path]) => location.pathname === path)

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 hero-transition ${scrolled ? 'glass py-3 mx-4 mt-4 rounded-[3rem]' : 'py-5'}`}
        style={cssVars}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="w-full px-6 md:px-12 lg:px-16 xl:px-20 2xl:px-24 flex items-center justify-between">
          <Link to="/" className="flex items-center group">
            <span className="font-heading typo-ui font-semibold" style={{ color: 'var(--hero-primary)' }}>CRYPTO INSIGHTS</span>
          </Link>

          {/* Desktop inline nav */}
          <div className="hidden md:flex items-center gap-6">
            {mainNavItems.map(([path, label]) => (
              <NavLink
                key={path}
                to={path}
                className={({ isActive }) =>
                  `typo-ui font-medium transition-colors ${isActive ? '' : 'text-text-secondary hover:text-text-primary'}`
                }
                style={({ isActive }) =>
                  isActive
                    ? { color: 'var(--hero-secondary)', textShadow: '0 0 10px color-mix(in srgb, var(--hero-primary) 50%, transparent), 0 0 40px color-mix(in srgb, var(--hero-primary) 20%, transparent)' }
                    : undefined
                }
              >
                {label}
              </NavLink>
            ))}

            {/* "Esplora" dropdown for Intelligence, Strumenti, Regolamentazione */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className={`typo-ui font-medium transition-colors flex items-center gap-1 ${
                  isMoreActive ? '' : 'text-text-secondary hover:text-text-primary'
                }`}
                style={
                  isMoreActive
                    ? { color: 'var(--hero-secondary)', textShadow: '0 0 10px color-mix(in srgb, var(--hero-primary) 50%, transparent), 0 0 40px color-mix(in srgb, var(--hero-primary) 20%, transparent)' }
                    : undefined
                }
              >
                {lang === 'it' ? 'Esplora' : 'Explore'}
                <svg width="10" height="6" viewBox="0 0 10 6" fill="currentColor" className={`transition-transform ${dropdownOpen ? 'rotate-180' : ''}`}>
                  <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>

              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    className="absolute top-full mt-2 right-0 glass rounded-xl p-3 min-w-[180px] space-y-1"
                    initial={{ opacity: 0, y: -8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    {moreNavItems.map(([path, label]) => (
                      <NavLink
                        key={path}
                        to={path}
                        onClick={() => setDropdownOpen(false)}
                        className={({ isActive }) =>
                          `block px-3 py-2 typo-ui font-medium rounded-lg transition-colors ${isActive ? 'bg-white/10' : 'text-text-secondary hover:text-text-primary hover:bg-white/5'}`
                        }
                        style={({ isActive }) =>
                          isActive ? { color: 'var(--hero-secondary)' } : undefined
                        }
                      >
                        {label}
                      </NavLink>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <AlertBell />

            {/* Language toggle */}
            <button
              onClick={toggleLang}
              className="relative flex items-center w-[68px] h-8 rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-sm overflow-hidden transition-colors"
            >
              <motion.div
                className="absolute top-0.5 w-[32px] h-7 rounded-full"
                style={{
                  backgroundColor: 'color-mix(in srgb, var(--hero-primary) 20%, transparent)',
                  boxShadow: '0 0 10px color-mix(in srgb, var(--hero-primary) 30%, transparent), 0 0 40px color-mix(in srgb, var(--hero-primary) 10%, transparent)',
                }}
                animate={{ left: lang === 'it' ? 1 : 33 }}
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
              <span
                className="relative z-10 flex-1 typo-ui-sm font-bold text-center transition-colors"
                style={{ color: lang === 'it' ? 'var(--hero-primary)' : undefined }}
              >
                IT
              </span>
              <span
                className={`relative z-10 flex-1 typo-ui-sm font-bold text-center transition-colors ${lang === 'en' ? '' : 'text-text-secondary'}`}
                style={{ color: lang === 'en' ? 'var(--hero-primary)' : undefined }}
              >
                EN
              </span>
            </button>

            {/* Currency toggle */}
            <button
              onClick={toggleCurrency}
              className="relative flex items-center w-[72px] h-8 rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-sm overflow-hidden transition-colors"
            >
              <motion.div
                className="absolute top-0.5 w-[34px] h-7 rounded-full"
                style={{
                  backgroundColor: 'color-mix(in srgb, var(--hero-secondary) 20%, transparent)',
                  boxShadow: '0 0 10px color-mix(in srgb, var(--hero-secondary) 30%, transparent), 0 0 40px color-mix(in srgb, var(--hero-secondary) 10%, transparent)',
                }}
                animate={{ left: currency === 'usd' ? 1 : 35 }}
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
              <span
                className={`relative z-10 flex-1 typo-ui-sm font-bold text-center transition-colors ${currency === 'usd' ? '' : 'text-text-secondary'}`}
                style={{ color: currency === 'usd' ? 'var(--hero-secondary)' : undefined }}
              >
                USD
              </span>
              <span
                className={`relative z-10 flex-1 typo-ui-sm font-bold text-center transition-colors ${currency === 'eur' ? '' : 'text-text-secondary'}`}
                style={{ color: currency === 'eur' ? 'var(--hero-secondary)' : undefined }}
              >
                EUR
              </span>
            </button>

            <div className="hidden sm:flex items-center gap-2">
              <div className="w-2 h-2 rounded-full animate-glow-pulse" style={{ backgroundColor: 'var(--hero-secondary)' }} />
              <span className="typo-ui-sm font-medium" style={{ color: 'var(--hero-secondary)' }}>LIVE</span>
            </div>

            {/* Menu toggle — kinetic menu trigger */}
            <button
              onClick={toggleMenu}
              className="kinetic-menu-trigger"
              aria-label="Toggle menu"
              style={{ '--trigger-color': 'var(--hero-primary)' }}
            >
              <div className={`kinetic-burger ${menuOpen ? 'is-open' : ''}`}>
                <span />
                <span />
                <span />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile menu — all items for small screens */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              className="md:hidden glass mt-2 mx-5 rounded-xl p-6 space-y-4"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              {allNavItems.map(([path, label]) => (
                <NavLink
                  key={path}
                  to={path}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `block typo-body font-medium transition-colors ${isActive ? '' : 'text-text-secondary'}`
                  }
                  style={({ isActive }) =>
                    isActive ? { color: 'var(--hero-secondary)' } : undefined
                  }
                >
                  {label}
                </NavLink>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Fullscreen kinetic menu — desktop only, 4 main sections */}
      <div className="hidden md:block">
        <KineticMenu isOpen={menuOpen} onClose={closeMenu} />
      </div>
    </>
  )
}
