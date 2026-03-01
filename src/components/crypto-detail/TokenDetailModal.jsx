import { useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { useLanguage } from '../../contexts/LanguageContext'
import { cryptoMeta } from '../../data/cryptoMeta'
import TokenHeader from './TokenHeader'
import NarrativePanel from './NarrativePanel'
import SentimentPanel from './SentimentPanel'
import HealthPanel from './HealthPanel'
import WhalePanel from './WhalePanel'
import UnlockPanel from './UnlockPanel'
import ActionBox from './ActionBox'

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.25 } },
}

const panelVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    y: 30,
    scale: 0.97,
    transition: { duration: 0.25 },
  },
}

export default function TokenDetailModal({ coin, isOpen, onClose }) {
  const { lang } = useLanguage()

  // Lock body scroll & pause Lenis when modal is open
  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY
      document.body.style.position = 'fixed'
      document.body.style.top = `-${scrollY}px`
      document.body.style.width = '100%'
      document.body.style.overflow = 'hidden'
      window.__lenis?.stop()

      return () => {
        document.body.style.position = ''
        document.body.style.top = ''
        document.body.style.width = ''
        document.body.style.overflow = ''
        window.scrollTo(0, scrollY)
        window.__lenis?.start()
      }
    }
  }, [isOpen])

  // Close on Escape key
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Escape') onClose()
    },
    [onClose]
  )

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
      return () => document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, handleKeyDown])

  const coinMeta = coin ? cryptoMeta[coin.id] : null

  return (
    <AnimatePresence>
      {isOpen && coin && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-6"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/70 backdrop-blur-md"
            onClick={onClose}
            aria-label="Close modal"
          />

          {/* Panel */}
          <motion.div
            className="relative w-full max-w-[92vw] 2xl:max-w-[88vw] max-h-[90vh] overflow-y-auto rounded-3xl glass border border-white/10"
            data-lenis-prevent
            style={{
              background: 'linear-gradient(145deg, rgba(10,10,15,0.97), rgba(18,18,26,0.95))',
              boxShadow:
                '0 0 80px rgba(0,240,255,0.06), 0 0 160px rgba(139,92,246,0.04), 0 32px 64px rgba(0,0,0,0.5)',
            }}
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            role="dialog"
            aria-modal="true"
            aria-label={`${coin.name} detail`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-sm text-text-secondary hover:text-text-primary hover:border-white/20 hover:bg-white/[0.08] transition-all duration-200"
              aria-label="Close"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {/* Content */}
            <div className="p-5 md:p-8">
              {/* Token Header */}
              <div className="mb-6">
                <TokenHeader coin={coin} coinMeta={coinMeta} />
              </div>

              {/* Two-column layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Left column */}
                <div className="flex flex-col gap-5">
                  <NarrativePanel coinId={coin.id} />
                  <SentimentPanel coinId={coin.id} />
                </div>

                {/* Right column */}
                <div className="flex flex-col gap-5">
                  <HealthPanel coinId={coin.id} />
                  <WhalePanel coinId={coin.id} />
                  <UnlockPanel coinId={coin.id} />
                  <ActionBox coinId={coin.id} coin={coin} />
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
