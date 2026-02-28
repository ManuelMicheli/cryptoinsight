import { motion, useScroll, useTransform } from 'motion/react'
import { MeshGradient } from '@paper-design/shaders-react'
import HeroScrollIndicator from './HeroScrollIndicator'

const THEMES = {
  crypto: {
    colors: ['#0e1a2e', '#1a0d2e', '#8b5cf6', '#00f0ff'],
    titleColor: 'text-neon-purple',
    glowClass: 'text-glow-purple',
    accentColor: 'text-glow-cyan text-neon-cyan',
  },
  market: {
    colors: ['#0a1a0a', '#0e2a1a', '#00ff88', '#00f0ff'],
    titleColor: 'text-neon-green',
    glowClass: '',
    accentColor: 'text-glow-cyan text-neon-cyan',
  },
  events: {
    colors: ['#1a0a1e', '#2e0d3a', '#8b5cf6', '#f59e0b'],
    titleColor: 'text-neon-purple',
    glowClass: 'text-glow-purple',
    accentColor: 'text-neon-amber',
  },
  news: {
    colors: ['#0e2a3a', '#1a0d2e', '#00f0ff', '#8b5cf6'],
    titleColor: 'text-neon-cyan',
    glowClass: 'text-glow-cyan',
    accentColor: 'text-glow-purple text-neon-purple',
  },
}

export default function PageHero({ theme, title, highlightedWord, subtitle, children }) {
  const config = THEMES[theme]
  const { scrollY } = useScroll()
  const opacity = useTransform(scrollY, [0, 300], [1, 0])
  const y = useTransform(scrollY, [0, 300], [0, 80])

  return (
    <section className="relative min-h-[75vh] flex flex-col justify-center overflow-hidden">
      <MeshGradient
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
        colors={config.colors}
        speed={0.3}
        distortion={0.5}
        swirl={0.12}
      />

      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-bg-primary/60 via-transparent to-bg-primary" />

      <div className="absolute inset-0 z-[2] pointer-events-none overflow-hidden">
        <div
          className="absolute top-1/4 left-[15%] w-48 h-48 rounded-full blur-3xl animate-pulse"
          style={{ background: `${config.colors[2]}08`, animationDuration: '4s' }}
        />
        <div
          className="absolute bottom-1/3 right-[18%] w-40 h-40 rounded-full blur-3xl animate-pulse"
          style={{ background: `${config.colors[3]}08`, animationDuration: '6s', animationDelay: '1s' }}
        />
      </div>

      <motion.div
        className="relative z-10 flex-1 flex flex-col items-center justify-center pt-24 pb-16 max-w-[1280px] mx-auto w-full px-6 md:px-12 lg:px-16"
        style={{ opacity, y }}
      >
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <motion.h1
            className={`font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black ${config.glowClass} ${config.titleColor} mb-4 tracking-wider`}
          >
            {title}
            {highlightedWord && (
              <>
                <br />
                <span className={config.accentColor}>{highlightedWord}</span>
              </>
            )}
          </motion.h1>

          <motion.p
            className="text-text-secondary text-lg sm:text-xl md:text-2xl max-w-2xl mx-auto font-light leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            {subtitle}
          </motion.p>
        </motion.div>

        {children && (
          <motion.div
            className="mt-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            {children}
          </motion.div>
        )}
      </motion.div>

      <HeroScrollIndicator />
    </section>
  )
}
