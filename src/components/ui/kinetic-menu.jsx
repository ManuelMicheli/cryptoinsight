import { useEffect, useRef, useState, useCallback } from 'react'
import { Link, useLocation } from 'react-router'
import gsap from 'gsap'
import { CustomEase } from 'gsap/CustomEase'
import { useLanguage } from '../../contexts/LanguageContext'
import { t } from '../../i18n/translations'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(CustomEase)
}

const SECTION_COLORS = {
  '/crypto': {
    primary: '#00f0ff',
    secondary: '#00c8ff',
    panelGradient: 'linear-gradient(135deg, #071a25 0%, #0a1a2a 50%, #0d2233 100%)',
  },
  '/mercato': {
    primary: '#00ff88',
    secondary: '#00d870',
    panelGradient: 'linear-gradient(135deg, #071a0d 0%, #0a1a0a 50%, #0d2215 100%)',
  },
  '/eventi': {
    primary: '#f59e0b',
    secondary: '#e8890a',
    panelGradient: 'linear-gradient(135deg, #1a1505 0%, #1a1400 50%, #22190a 100%)',
  },
  '/news': {
    primary: '#8b5cf6',
    secondary: '#a78bfa',
    panelGradient: 'linear-gradient(135deg, #150a28 0%, #1a0a2e 50%, #1f0d38 100%)',
  },
}

const NAV_ITEMS = [
  {
    path: '/crypto',
    labelKey: 'navCrypto',
    descKey: 'previewCryptoDesc',
    icon: (color) => (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M9 12h6M9 9h6M10 15h4" />
        <path d="M12 6v2M12 16v2" />
      </svg>
    ),
  },
  {
    path: '/mercato',
    labelKey: 'navMarket',
    descKey: 'previewMarketDesc',
    icon: (color) => (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
  },
  {
    path: '/eventi',
    labelKey: 'navEvents',
    descKey: 'previewEventsDesc',
    icon: (color) => (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
  },
  {
    path: '/news',
    labelKey: 'navNews',
    descKey: 'previewNewsDesc',
    icon: (color) => (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 22h16a2 2 0 002-2V4a2 2 0 00-2-2H8a2 2 0 00-2 2v16a2 2 0 01-2 2zm0 0a2 2 0 01-2-2v-9c0-1.1.9-2 2-2h2" />
        <line x1="10" y1="6" x2="18" y2="6" />
        <line x1="10" y1="10" x2="18" y2="10" />
        <line x1="10" y1="14" x2="14" y2="14" />
      </svg>
    ),
  },
]

export default function KineticMenu({ isOpen, onClose }) {
  const containerRef = useRef(null)
  const bgRef = useRef(null)
  const previewRef = useRef(null)
  const [hoveredPath, setHoveredPath] = useState(null)
  const { lang } = useLanguage()
  const location = useLocation()
  const hasAnimatedRef = useRef(false)

  // GSAP custom ease
  useEffect(() => {
    try {
      if (!gsap.parseEase('main')) {
        CustomEase.create('main', '0.65, 0.01, 0.05, 0.99')
      }
    } catch {
      // fallback
    }
    gsap.defaults({ ease: 'main', duration: 0.7 })
  }, [])

  // Open/close animation
  useEffect(() => {
    if (!containerRef.current) return

    const ctx = gsap.context(() => {
      const navWrap = containerRef.current.querySelector('.kinetic-nav-overlay')
      const menu = containerRef.current.querySelector('.kinetic-menu-content')
      const overlay = containerRef.current.querySelector('.kinetic-overlay')
      const bgPanels = containerRef.current.querySelectorAll('.kinetic-backdrop')
      const menuLinks = containerRef.current.querySelectorAll('.kinetic-nav-link')
      const fadeTargets = containerRef.current.querySelectorAll('[data-menu-fade]')
      const footerEl = containerRef.current.querySelector('.kinetic-menu-footer')

      const tl = gsap.timeline()

      if (isOpen) {
        hasAnimatedRef.current = true
        document.body.style.overflow = 'hidden'

        tl.set(navWrap, { display: 'block', pointerEvents: 'auto' })
          .set(menu, { xPercent: 0 })
          .fromTo(overlay, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.5 })
          .fromTo(bgPanels, { xPercent: 101 }, { xPercent: 0, stagger: 0.12, duration: 0.575 }, '<')
          .fromTo(menuLinks, { yPercent: 140, rotate: 10 }, { yPercent: 0, rotate: 0, stagger: 0.05 }, '<+=0.35')

        if (fadeTargets.length) {
          tl.fromTo(fadeTargets, { autoAlpha: 0, yPercent: 50 }, { autoAlpha: 1, yPercent: 0, stagger: 0.04, clearProps: 'all' }, '<+=0.2')
        }
        if (footerEl) {
          tl.fromTo(footerEl, { autoAlpha: 0, yPercent: 30 }, { autoAlpha: 1, yPercent: 0, duration: 0.4 }, '<+=0.1')
        }
      } else {
        if (!hasAnimatedRef.current) {
          gsap.set(navWrap, { display: 'none', pointerEvents: 'none' })
          return
        }
        document.body.style.overflow = ''
        setHoveredPath(null)

        tl.to(overlay, { autoAlpha: 0, duration: 0.3 })
          .to(menu, { xPercent: 120, duration: 0.5 }, '<')
          .set(navWrap, { display: 'none', pointerEvents: 'none' })
      }
    }, containerRef)

    return () => ctx.revert()
  }, [isOpen])

  // Escape
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape' && isOpen) onClose()
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [isOpen, onClose])

  // Close on route change
  useEffect(() => {
    if (isOpen) onClose()
  }, [location.pathname])

  // Hover handlers
  const handleItemEnter = useCallback((path) => {
    setHoveredPath(path)
    if (!bgRef.current) return
    const colors = SECTION_COLORS[path]
    if (!colors) return

    gsap.to(bgRef.current, {
      background: colors.panelGradient,
      duration: 0.6,
      ease: 'power2.out',
    })

    // Animate the preview card in
    if (previewRef.current) {
      gsap.fromTo(previewRef.current,
        { autoAlpha: 0, y: 12, scale: 0.96 },
        { autoAlpha: 1, y: 0, scale: 1, duration: 0.35, ease: 'power2.out', overwrite: true }
      )
    }
  }, [])

  const handleItemLeave = useCallback(() => {
    setHoveredPath(null)
    if (bgRef.current) {
      gsap.to(bgRef.current, {
        background: 'linear-gradient(135deg, #0a0a12 0%, #0d0d18 50%, #10101f 100%)',
        duration: 0.6,
        ease: 'power2.out',
      })
    }
    if (previewRef.current) {
      gsap.to(previewRef.current, { autoAlpha: 0, y: 8, duration: 0.2, ease: 'power2.in', overwrite: true })
    }
  }, [])

  const hoveredItem = NAV_ITEMS.find(i => i.path === hoveredPath)
  const hoveredColors = hoveredPath ? SECTION_COLORS[hoveredPath] : null

  return (
    <div ref={containerRef} className="kinetic-menu-root">
      <div className="kinetic-nav-overlay" style={{ display: 'none', pointerEvents: 'none' }}>
        <div className="kinetic-overlay" onClick={onClose} />
        <nav className="kinetic-menu-content">
          <div className="kinetic-menu-bg" ref={bgRef}>
            <div className="kinetic-backdrop kinetic-backdrop-first" />
            <div className="kinetic-backdrop kinetic-backdrop-second" />
            <div className="kinetic-backdrop" />
          </div>

          <div className="kinetic-menu-wrapper">
            <button className="kinetic-close-btn" onClick={onClose} aria-label="Close menu">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            <ul className="kinetic-menu-list">
              {NAV_ITEMS.map(({ path, labelKey }) => {
                const colors = SECTION_COLORS[path]
                const isActive = location.pathname === path
                return (
                  <li
                    key={path}
                    className="kinetic-menu-item"
                    onMouseEnter={() => handleItemEnter(path)}
                    onMouseLeave={handleItemLeave}
                  >
                    <Link
                      to={path}
                      className="kinetic-nav-link"
                      onClick={onClose}
                      style={{
                        '--item-primary': colors.primary,
                        '--item-secondary': colors.secondary,
                      }}
                    >
                      <span className={`kinetic-link-text ${isActive ? 'is-active' : ''}`}>
                        {t(labelKey, lang)}
                      </span>
                      <div
                        className="kinetic-link-hover-bg"
                        style={{
                          background: `linear-gradient(90deg, ${colors.primary}10 0%, ${colors.primary}05 100%)`,
                          borderLeft: `3px solid ${colors.primary}`,
                        }}
                      />
                      {isActive && (
                        <div
                          className="kinetic-active-dot"
                          style={{ backgroundColor: colors.primary, boxShadow: `0 0 12px ${colors.primary}80` }}
                        />
                      )}
                    </Link>
                  </li>
                )
              })}
            </ul>

            {/* Preview card — appears on hover */}
            <div
              ref={previewRef}
              className="kinetic-preview-card"
              style={{
                opacity: 0,
                visibility: 'hidden',
                '--preview-color': hoveredColors?.primary || '#8b5cf6',
              }}
            >
              {hoveredItem && hoveredColors && (
                <>
                  <div className="kinetic-preview-icon">
                    {hoveredItem.icon(hoveredColors.primary)}
                  </div>
                  <div className="kinetic-preview-body">
                    <p className="kinetic-preview-desc">
                      {t(hoveredItem.descKey, lang)}
                    </p>
                    <span className="kinetic-preview-cta" style={{ color: hoveredColors.primary }}>
                      {lang === 'it' ? 'Vai alla sezione' : 'Go to section'} &rarr;
                    </span>
                  </div>
                </>
              )}
            </div>

            <div className="kinetic-menu-footer" data-menu-fade>
              <p className="kinetic-footer-text">{lang === 'it' ? 'Il tuo radar sulla finanza digitale' : 'Your radar on digital finance'}</p>
            </div>
          </div>
        </nav>
      </div>
    </div>
  )
}
