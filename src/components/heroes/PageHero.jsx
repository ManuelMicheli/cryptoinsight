import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { MeshGradient } from '@paper-design/shaders-react'
import ShaderBackground from '../hero/ShaderBackground'
import HeroScrollIndicator from './HeroScrollIndicator'

const THEMES = {
  crypto: {
    colors: ['#0a1a2a', '#0e2a3a', '#00f0ff', '#00c8ff'],
    meshColors: ['#0a1a2a', '#0e2a3a', '#00f0ff', '#00c8ff'],
    backgroundColor: '#0a1a2a',
    shader: {
      tintTop: [0.0, 0.94, 1.0],
      tintBottom: [0.0, 0.78, 1.0],
      fogColor: [0.04, 0.10, 0.16],
      oscFreq: [4.0, 1.5, 1.0],
    },
    titleColor: 'text-neon-cyan',
    glowClass: 'text-glow-cyan',
    accentColor: 'text-glow-cyan text-neon-cyan',
    useMeshGradient: false,
  },
  market: {
    colors: ['#0a1a0a', '#0e2a1a', '#00ff88', '#00d870'],
    meshColors: ['#0a1a0a', '#0e2a1a', '#00ff88', '#00d870'],
    backgroundColor: '#0a1a0a',
    shader: {
      tintTop: [0.0, 1.0, 0.53],
      tintBottom: [0.0, 0.85, 0.44],
      fogColor: [0.04, 0.10, 0.04],
      oscFreq: [1.5, 3.5, 2.0],
    },
    titleColor: 'text-neon-green',
    glowClass: 'text-glow-green',
    accentColor: 'text-glow-green text-neon-green',
    useMeshGradient: true,
  },
  events: {
    colors: ['#1a1400', '#2e2000', '#f59e0b', '#e8890a'],
    meshColors: ['#1a1400', '#2e2000', '#f59e0b', '#e8890a'],
    backgroundColor: '#1a1400',
    shader: {
      tintTop: [0.96, 0.62, 0.04],
      tintBottom: [0.91, 0.54, 0.04],
      fogColor: [0.10, 0.08, 0.0],
      oscFreq: [2.2, 1.2, 3.0],
    },
    titleColor: 'text-neon-amber',
    glowClass: 'text-glow-amber',
    accentColor: 'text-glow-amber text-neon-amber',
    useMeshGradient: true,
  },
  news: {
    colors: ['#1a0a2e', '#2e0d3a', '#8b5cf6', '#a78bfa'],
    meshColors: ['#1a0a2e', '#2e0d3a', '#8b5cf6', '#a78bfa'],
    backgroundColor: '#1a0a2e',
    shader: {
      tintTop: [0.55, 0.36, 0.96],
      tintBottom: [0.65, 0.55, 0.98],
      fogColor: [0.10, 0.04, 0.18],
      oscFreq: [3.0, 2.0, 1.5],
    },
    titleColor: 'text-neon-purple',
    glowClass: 'text-glow-purple',
    accentColor: 'text-glow-purple text-neon-purple',
    useMeshGradient: true,
  },
  intelligence: {
    colors: ['#0a0f1a', '#121a2e', '#00f0ff', '#8b5cf6'],
    meshColors: ['#0a0f1a', '#121a2e', '#00f0ff', '#8b5cf6'],
    backgroundColor: '#0a0f1a',
    shader: {
      tintTop: [0.0, 0.94, 1.0],
      tintBottom: [0.55, 0.36, 0.96],
      fogColor: [0.04, 0.06, 0.10],
      oscFreq: [2.5, 1.8, 2.2],
    },
    titleColor: 'text-neon-cyan',
    glowClass: 'text-glow-cyan',
    accentColor: 'text-glow-purple text-neon-purple',
    useMeshGradient: true,
  },
  strumenti: {
    colors: ['#0a1a14', '#0e2a20', '#f59e0b', '#00ff88'],
    meshColors: ['#0a1a14', '#0e2a20', '#f59e0b', '#00ff88'],
    backgroundColor: '#0a1a14',
    shader: {
      tintTop: [0.96, 0.62, 0.04],
      tintBottom: [0.0, 1.0, 0.53],
      fogColor: [0.04, 0.10, 0.08],
      oscFreq: [1.8, 2.5, 1.5],
    },
    titleColor: 'text-neon-amber',
    glowClass: 'text-glow-amber',
    accentColor: 'text-glow-green text-neon-green',
    useMeshGradient: true,
  },
  social: {
    colors: ['#2e0a1e', '#3a0d28', '#ec4899', '#f472b6'],
    meshColors: ['#2e0a1e', '#3a0d28', '#ec4899', '#f472b6'],
    backgroundColor: '#2e0a1e',
    shader: {
      tintTop: [0.93, 0.28, 0.60],
      tintBottom: [0.96, 0.45, 0.71],
      fogColor: [0.18, 0.04, 0.12],
      oscFreq: [2.8, 1.6, 2.2],
    },
    titleColor: 'text-neon-rose',
    glowClass: 'text-glow-rose',
    accentColor: 'text-glow-rose text-neon-rose',
    useMeshGradient: true,
  },
  regolamentazione: {
    colors: ['#1a1000', '#2e1c00', '#f59e0b', '#ef4444'],
    meshColors: ['#1a1000', '#2e1c00', '#f59e0b', '#ef4444'],
    backgroundColor: '#1a1000',
    shader: {
      tintTop: [0.96, 0.62, 0.04],
      tintBottom: [0.94, 0.27, 0.27],
      fogColor: [0.10, 0.06, 0.0],
      oscFreq: [2.0, 1.5, 2.8],
    },
    titleColor: 'text-neon-amber',
    glowClass: 'text-glow-amber',
    accentColor: 'text-glow-amber text-neon-amber',
    useMeshGradient: true,
  },
}

export default function PageHero({ theme, title, highlightedWord, subtitle, children }) {
  const config = THEMES[theme]
  const shaderColorsRef = useRef(config.shader)
  const { scrollY } = useScroll()
  const opacity = useTransform(scrollY, [0, 300], [1, 0])
  const y = useTransform(scrollY, [0, 300], [0, 80])

  return (
    <section className="relative min-h-[40vh] flex flex-col justify-center overflow-hidden">
      {config.useMeshGradient ? (
        <MeshGradient
          className="absolute inset-0 w-full h-full z-0"
          colors={config.meshColors}
          speed={0.8}
          backgroundColor={config.backgroundColor}
        />
      ) : (
        <ShaderBackground shaderColorsRef={shaderColorsRef} />
      )}

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
        className="relative z-10 flex-1 flex flex-col items-center justify-center pt-20 pb-10 w-full px-6 md:px-12 lg:px-16 xl:px-20 2xl:px-24"
        style={{ opacity, y }}
      >
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <motion.h1
            className={`font-heading typo-display font-black ${config.glowClass} ${config.titleColor} mb-3 tracking-wider`}
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
            className="text-text-secondary typo-body-lg max-w-2xl mx-auto font-light"
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
