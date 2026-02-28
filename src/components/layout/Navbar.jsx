import { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router'
import { motion } from 'motion/react'
import { useCurrency } from '../../contexts/CurrencyContext'
import { useLanguage } from '../../contexts/LanguageContext'
import { t } from '../../i18n/translations'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { currency, toggleCurrency } = useCurrency()
  const { lang, toggleLang } = useLanguage()

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
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${scrolled ? 'glass py-3' : 'py-5'}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="w-full max-w-[1280px] mx-auto px-6 md:px-12 lg:px-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-neon-cyan/20 flex items-center justify-center glow-cyan">
            <span className="font-heading text-neon-cyan text-sm font-bold">CI</span>
          </div>
          <span className="font-heading text-sm font-semibold text-neon-cyan hidden sm:block">CRYPTO INSIGHTS</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map(([path, label]) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors ${
                  isActive
                    ? 'text-neon-cyan text-glow-cyan'
                    : 'text-text-secondary hover:text-neon-cyan'
                }`
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
            className="relative flex items-center w-[68px] h-8 rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-sm overflow-hidden transition-colors hover:border-neon-purple/30"
          >
            <motion.div
              className="absolute top-0.5 w-[32px] h-7 rounded-full bg-neon-purple/20 glow-purple"
              animate={{ left: lang === 'it' ? 1 : 33 }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            />
            <span className={`relative z-10 flex-1 text-xs font-bold text-center transition-colors ${lang === 'it' ? 'text-neon-purple' : 'text-text-secondary'}`}>
              IT
            </span>
            <span className={`relative z-10 flex-1 text-xs font-bold text-center transition-colors ${lang === 'en' ? 'text-neon-purple' : 'text-text-secondary'}`}>
              EN
            </span>
          </button>

          {/* Currency toggle */}
          <button
            onClick={toggleCurrency}
            className="relative flex items-center w-[72px] h-8 rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-sm overflow-hidden transition-colors hover:border-neon-cyan/30"
          >
            <motion.div
              className="absolute top-0.5 w-[34px] h-7 rounded-full bg-neon-cyan/20 glow-cyan"
              animate={{ left: currency === 'usd' ? 1 : 35 }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            />
            <span className={`relative z-10 flex-1 text-xs font-bold text-center transition-colors ${currency === 'usd' ? 'text-neon-cyan' : 'text-text-secondary'}`}>
              USD
            </span>
            <span className={`relative z-10 flex-1 text-xs font-bold text-center transition-colors ${currency === 'eur' ? 'text-neon-cyan' : 'text-text-secondary'}`}>
              EUR
            </span>
          </button>

          <div className="hidden sm:flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-neon-green animate-glow-pulse" />
            <span className="text-xs text-neon-green font-medium">LIVE</span>
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
                `block text-base font-medium transition-colors ${
                  isActive ? 'text-neon-cyan' : 'text-text-secondary'
                }`
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
