import { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router'
import { motion } from 'motion/react'
import { useCurrency } from '../../contexts/CurrencyContext'
import { useLanguage } from '../../contexts/LanguageContext'
import { usePaletteCycle } from '../../contexts/PaletteCycleContext'
import { t } from '../../i18n/translations'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { currency, toggleCurrency } = useCurrency()
  const { lang, toggleLang } = useLanguage()
  const { cssVars } = usePaletteCycle()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navItems = [
    ['/crypto', t('navCrypto', lang)],
    ['/mercato', t('navMarket', lang)],
    ['/eventi', t('navEvents', lang)],
    ['/news', t('navNews', lang)],
  ]

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 hero-transition ${scrolled ? 'glass py-3 mx-4 mt-4 rounded-[3rem]' : 'py-5'}`}
      style={cssVars}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="w-full max-w-[1280px] mx-auto px-6 md:px-12 lg:px-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{
              backgroundColor: 'color-mix(in srgb, var(--hero-primary) 20%, transparent)',
              boxShadow: '0 0 10px color-mix(in srgb, var(--hero-primary) 30%, transparent), 0 0 40px color-mix(in srgb, var(--hero-primary) 10%, transparent)',
            }}
          >
            <span className="font-heading text-sm font-bold" style={{ color: 'var(--hero-secondary)' }}>CI</span>
          </div>
          <span className="font-heading text-sm font-semibold hidden sm:block" style={{ color: 'var(--hero-primary)' }}>CRYPTO INSIGHTS</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map(([path, label]) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors ${isActive ? '' : 'text-text-secondary hover:text-text-primary'}`
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
        </div>

        <div className="flex items-center gap-3">
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
              className="relative z-10 flex-1 text-xs font-bold text-center transition-colors"
              style={{ color: lang === 'it' ? 'var(--hero-primary)' : undefined }}
            >
              IT
            </span>
            <span
              className={`relative z-10 flex-1 text-xs font-bold text-center transition-colors ${lang === 'en' ? '' : 'text-text-secondary'}`}
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
              className={`relative z-10 flex-1 text-xs font-bold text-center transition-colors ${currency === 'usd' ? '' : 'text-text-secondary'}`}
              style={{ color: currency === 'usd' ? 'var(--hero-secondary)' : undefined }}
            >
              USD
            </span>
            <span
              className={`relative z-10 flex-1 text-xs font-bold text-center transition-colors ${currency === 'eur' ? '' : 'text-text-secondary'}`}
              style={{ color: currency === 'eur' ? 'var(--hero-secondary)' : undefined }}
            >
              EUR
            </span>
          </button>

          <div className="hidden sm:flex items-center gap-2">
            <div className="w-2 h-2 rounded-full animate-glow-pulse" style={{ backgroundColor: 'var(--hero-secondary)' }} />
            <span className="text-xs font-medium" style={{ color: 'var(--hero-secondary)' }}>LIVE</span>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden flex flex-col gap-1.5 p-1"
          >
            <span className={`w-5 h-0.5 bg-text-primary transition-transform ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`w-5 h-0.5 bg-text-primary transition-opacity ${mobileOpen ? 'opacity-0' : ''}`} />
            <span className={`w-5 h-0.5 bg-text-primary transition-transform ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <motion.div
          className="md:hidden glass mt-2 mx-5 rounded-xl p-6 space-y-4"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {navItems.map(([path, label]) => (
            <NavLink
              key={path}
              to={path}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `block text-base font-medium transition-colors ${isActive ? '' : 'text-text-secondary'}`
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
    </motion.nav>
  )
}
