import { createContext, useContext, useState, useEffect, useRef, useMemo } from 'react'
import { useLocation } from 'react-router'

const PALETTES = [
  {
    css: { primary: '#8b5cf6', secondary: '#f59e0b', mid: '#c084fc' },
    shader: {
      tintTop: [0.55, 0.2, 0.95],
      tintBottom: [0.96, 0.55, 0.05],
      fogColor: [0.14, 0.06, 0.12],
      oscFreq: [2.2, 1.2, 3.0],
    },
  },
  {
    css: { primary: '#00f0ff', secondary: '#8b5cf6', mid: '#7cb8ff' },
    shader: {
      tintTop: [0.0, 0.94, 1.0],
      tintBottom: [0.55, 0.2, 0.95],
      fogColor: [0.05, 0.15, 0.25],
      oscFreq: [4.0, 1.5, 1.0],
    },
  },
  {
    css: { primary: '#00ff88', secondary: '#00f0ff', mid: '#00f8c0' },
    shader: {
      tintTop: [0.0, 1.0, 0.53],
      tintBottom: [0.0, 0.94, 1.0],
      fogColor: [0.04, 0.10, 0.04],
      oscFreq: [1.5, 3.5, 2.0],
    },
  },
  {
    css: { primary: '#ff6a00', secondary: '#ff9e44', mid: '#e85d04' },
    shader: {
      tintTop: [1.0, 0.42, 0.0],
      tintBottom: [0.91, 0.36, 0.02],
      fogColor: [0.06, 0.03, 0.01],
      oscFreq: [3.0, 2.0, 1.5],
    },
  },
]

const PaletteCycleContext = createContext()

export function PaletteCycleProvider({ children }) {
  const { pathname } = useLocation()
  const [paletteIndex, setPaletteIndex] = useState(0)
  const shaderColorsRef = useRef(PALETTES[0].shader)
  const isHome = pathname === '/'

  const ROUTE_COLORS = {
    '/crypto':  { primary: '#00f0ff', secondary: '#00f0ff', mid: '#7cb8ff' },
    '/mercato': { primary: '#00ff88', secondary: '#00ff88', mid: '#00f8c0' },
    '/eventi':  { primary: '#f59e0b', secondary: '#f59e0b', mid: '#fbbf24' },
    '/news':    { primary: '#8b5cf6', secondary: '#8b5cf6', mid: '#a78bfa' },
  }

  const ROUTE_SHADER = {
    '/crypto':  PALETTES[1].shader,
    '/mercato': PALETTES[2].shader,
    '/eventi':  PALETTES[0].shader,
    '/news':    PALETTES[3].shader,
  }

  useEffect(() => {
    if (!isHome) {
      const shader = ROUTE_SHADER[pathname] ?? PALETTES[0].shader
      shaderColorsRef.current = shader
      setPaletteIndex(-1)
      return
    }

    setPaletteIndex(0)
    shaderColorsRef.current = PALETTES[0].shader

    const id = setInterval(() => {
      setPaletteIndex(prev => {
        const next = (prev + 1) % PALETTES.length
        shaderColorsRef.current = PALETTES[next].shader
        return next
      })
    }, 4000)

    return () => clearInterval(id)
  }, [isHome, pathname])

  const palette = paletteIndex >= 0 ? PALETTES[paletteIndex] : null
  const routeColors = ROUTE_COLORS[pathname]

  const cssVars = useMemo(() => ({
    '--hero-primary': routeColors?.primary ?? palette?.css.primary ?? '#8b5cf6',
    '--hero-secondary': routeColors?.secondary ?? palette?.css.secondary ?? '#f59e0b',
    '--hero-mid': routeColors?.mid ?? palette?.css.mid ?? '#c084fc',
  }), [routeColors, palette])

  const value = useMemo(() => ({
    palette, cssVars, shaderColorsRef,
  }), [palette, cssVars])

  return (
    <PaletteCycleContext.Provider value={value}>
      {children}
    </PaletteCycleContext.Provider>
  )
}

export function usePaletteCycle() {
  return useContext(PaletteCycleContext)
}
