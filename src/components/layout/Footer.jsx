import { Link } from 'react-router'
import { useLanguage } from '../../contexts/LanguageContext'
import { t } from '../../i18n/translations'

const socialLinks = [
  { name: 'Twitter', icon: '𝕏', href: '#' },
  { name: 'Discord', icon: '💬', href: '#' },
  { name: 'GitHub', icon: '⌨', href: '#' },
]

export default function Footer() {
  const { lang } = useLanguage()

  const exploreLinks = [
    { path: '/crypto', label: lang === 'it' ? 'Crypto Assets' : 'Crypto Assets' },
    { path: '/mercato', label: lang === 'it' ? 'Mercato' : 'Market' },
    { path: '/intelligence', label: 'Intelligence' },
    { path: '/strumenti', label: lang === 'it' ? 'Strumenti' : 'Tools' },
    { path: '/regolamentazione', label: lang === 'it' ? 'Regolamentazione' : 'Regulation' },
  ]

  const resourceLinks = [
    { href: '#', label: 'API' },
    { href: '#', label: 'Docs' },
    { href: '#', label: 'GitHub' },
  ]

  const legalLinks = [
    { href: '#', label: lang === 'it' ? 'Termini' : 'Terms' },
    { href: '#', label: 'Privacy' },
    { href: '#', label: 'Cookie' },
  ]

  return (
    <footer className="border-t border-white/5 bg-bg-secondary/50">
      <div className="w-full px-6 md:px-12 lg:px-16 xl:px-20 2xl:px-24 py-12 md:py-16 lg:py-20">
        {/* Disclaimer */}
        <div className="panel panel-amber mb-10">
          <div className="flex items-start gap-4">
            <span className="text-neon-amber text-2xl flex-shrink-0">&#9888;</span>
            <div>
              <h4 className="font-heading text-neon-amber typo-ui font-semibold mb-2">{t('footerDisclaimer', lang)}</h4>
              <p className="text-text-secondary typo-body">
                {t('footerDisclaimerText', lang)}
              </p>
            </div>
          </div>
        </div>

        {/* Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          {/* Explore */}
          <div>
            <h5 className="font-heading typo-ui-sm text-text-primary font-semibold uppercase tracking-wider mb-4">
              {lang === 'it' ? 'Esplora' : 'Explore'}
            </h5>
            <ul className="space-y-2">
              {exploreLinks.map(link => (
                <li key={link.path}>
                  <Link to={link.path} className="text-text-secondary typo-body-sm hover:text-text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h5 className="font-heading typo-ui-sm text-text-primary font-semibold uppercase tracking-wider mb-4">
              {lang === 'it' ? 'Risorse' : 'Resources'}
            </h5>
            <ul className="space-y-2">
              {resourceLinks.map(link => (
                <li key={link.label}>
                  <a href={link.href} className="text-text-secondary typo-body-sm hover:text-text-primary transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h5 className="font-heading typo-ui-sm text-text-primary font-semibold uppercase tracking-wider mb-4">
              {lang === 'it' ? 'Legale' : 'Legal'}
            </h5>
            <ul className="space-y-2">
              {legalLinks.map(link => (
                <li key={link.label}>
                  <a href={link.href} className="text-text-secondary typo-body-sm hover:text-text-primary transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h5 className="font-heading typo-ui-sm text-text-primary font-semibold uppercase tracking-wider mb-4">
              Social
            </h5>
            <div className="flex gap-3">
              {socialLinks.map(s => (
                <a
                  key={s.name}
                  href={s.href}
                  className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-text-secondary hover:text-text-primary hover:border-white/20 transition-colors"
                  title={s.name}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Info disclaimer */}
        <p className="text-text-secondary typo-ui-sm text-center mb-8 max-w-2xl mx-auto">
          {lang === 'it'
            ? 'Le informazioni presenti su CryptoInsight sono a scopo informativo. Non costituiscono consulenza finanziaria.'
            : 'The information on CryptoInsight is for informational purposes only. It does not constitute financial advice.'}
        </p>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-text-secondary typo-body-sm">
          <div className="flex items-center gap-2">
            <span className="font-heading text-neon-cyan typo-ui-sm">CRYPTO INSIGHTS</span>
            <span>&copy; {new Date().getFullYear()}</span>
          </div>
          <p className="typo-ui-sm">{t('footerDataBy', lang)}</p>
        </div>
      </div>
    </footer>
  )
}
