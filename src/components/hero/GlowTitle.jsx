import { useRef, useEffect } from 'react'
import { useLanguage } from '../../contexts/LanguageContext'
import { usePaletteCycle } from '../../contexts/PaletteCycleContext'
import { t } from '../../i18n/translations'
import gsap from 'gsap'

export default function GlowTitle() {
  const { lang } = useLanguage()
  const { palette } = usePaletteCycle()
  const containerRef = useRef()

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.gsap-reveal',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.08,
          ease: 'power3.out',
        }
      )
    }, containerRef)

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    if (!palette) return
    const { primary, secondary } = palette.css
    const tween = gsap.to('.gsap-glow-title', {
      textShadow: `0 0 20px ${primary}99, 0 0 60px ${secondary}4D, 0 0 100px ${primary}26`,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    })
    return () => tween.kill()
  }, [palette])

  return (
    <div ref={containerRef} className="text-center relative z-10">
      <h1 className="gsap-reveal gsap-glow-title font-heading typo-display-hero font-black mb-4 tracking-wider">
        <span
          className="inline-block bg-clip-text text-transparent"
          style={{ backgroundImage: 'linear-gradient(to bottom, var(--hero-primary) 0%, var(--hero-mid) 40%, var(--hero-secondary) 100%)' }}
        >
          CRYPTO
          <br />
          INSIGHTS
        </span>
      </h1>
      <p className="gsap-reveal text-text-secondary typo-body-lg max-w-xl mx-auto font-light">
        {t('heroSubtitle', lang)}
      </p>
    </div>
  )
}
