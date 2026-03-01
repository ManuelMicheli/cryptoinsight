# 🔗 CryptoInsight — 3 Prompt Progressivi (Adattati al Progetto)

> Prompt calibrati sullo stack e le conventions esatte del repo `ManuelMicheli/cryptoinsight`. Eseguili in ordine 1 → 2 → 3.

---

## PROMPT 1 — Data Intelligence Layer

```
Sto lavorando sul mio progetto CryptoInsight, una piattaforma crypto premium. Devo aggiungere un layer di "Data Intelligence" con 4 nuove funzionalità. Ecco tutto ciò che ti serve per essere allineato al progetto esistente.

═══════════════════════════════════════════════════════════
STACK & CONVENTIONS DEL PROGETTO (SEGUI RIGOROSAMENTE)
═══════════════════════════════════════════════════════════

STACK:
- React 19 con JSX (NON TypeScript — niente .tsx, niente type annotations)
- Vite 7
- Tailwind CSS v4 con @theme tokens in index.css
- Motion (framer-motion v12, importa da "motion/react")
- GSAP per animazioni avanzate
- Lenis per smooth scroll
- Three.js + @react-three/fiber + @paper-design/shaders-react

STRUTTURA FILE:
src/
├── components/{feature}/ — componenti raggruppati per feature
│   ├── ui/ — GlassCard, SectionHeading, SectionWrapper, SkeletonLoader, ScrollProgress
│   ├── layout/ — Navbar, Footer, Layout, PageTransition, SectionWrapper
│   ├── hero/ — HeroSection, ShaderBackground, PriceTicker, GlowTitle, CTAButton
│   ├── market-pulse/ — MarketPulseSection, FearGreedGauge, MarketStatCard, GainersLosers
│   ├── crypto-assets/ — CryptoAssetsSection, CryptoCard, SparklineChart, RiskBadge, CategoryTabs
│   ├── events/ — EventsSection, EventCard, EventTimeline, ImpactBadge
│   └── news/ — NewsSection, NewsCard, LiveIndicator, CategoryTag
├── contexts/ — CryptoDataContext, CurrencyContext, LanguageContext, PaletteCycleContext
├── data/ — mockCryptoData.js, cryptoMeta.js, events.js, news.js
├── hooks/ — useInViewAnimation.js (fadeInUp, fadeIn, staggerContainer, scaleIn, slideInLeft, slideInRight), useLenis.js
├── i18n/ — translations.js con funzione t('key', lang)
├── pages/ — HomePage, CryptoPage, MarketPage, EventsPage, NewsPage, NotFoundPage
├── services/ — coingecko.js, feargreed.js
└── utils/ — constants.js (API_URLS, COIN_IDS, POLLING_INTERVALS, CATEGORIES, COLORS), formatters.js

ROUTES ESISTENTI (App.jsx usa react-router v7):
/ → HomePage | /crypto → CryptoPage | /mercato → MarketPage | /eventi → EventsPage | /news → NewsPage

DESIGN SYSTEM (index.css @theme tokens):
- Colori sfondo: bg-primary (#0a0a0f), bg-secondary (#12121a), bg-card (rgba 255,255,255,0.03)
- Neon: neon-cyan (#00f0ff), neon-purple (#8b5cf6), neon-green (#00ff88), neon-amber (#f59e0b), neon-red (#ef4444)
- Glass: glass-border (rgba 255,255,255,0.10), glass-bg (rgba 255,255,255,0.04)
- Testo: text-primary (#f0f0f0), text-secondary (#8a8a9a)
- Font: Orbitron (heading), Space Grotesk (body)
- Hero palette cycling: variabili CSS --hero-primary, --hero-secondary, --hero-mid animate con PaletteCycleContext
- Classi CSS: .glass, .panel, .panel-purple, .panel-green, .panel-amber, .panel-dark, .glow-*, .text-glow-*, .animate-shimmer, .animate-glow-pulse, .section-divider

PATTERN DEI COMPONENTI — segui ESATTAMENTE questi pattern:

1. Sezioni: wrappa con <SectionWrapper id="..."> e usa <SectionHeading title={...} subtitle={...} glowColor="cyan|purple|green|amber" />
2. Card: usa <GlassCard variant="cyan|purple|green|amber|dark" brandColors={[...]}> con hover={true}
3. Animazioni: usa i variant da useInViewAnimation.js — fadeInUp, fadeIn, staggerContainer, scaleIn. Wrappa con <motion.div variants={fadeInUp}>
4. Pagine: wrappa con <PageTransition> e usa <PageHero theme="..." title={...} highlightedWord={...} subtitle={...} />
5. Loading states: usa <SkeletonLoader /> (esiste già in components/ui/)
6. i18n: TUTTE le stringhe visibili devono passare per t('keyName', lang). Aggiungi le traduzioni it/en in translations.js
7. Dati mock: crea file in src/data/ con oggetti che hanno campi bilingui { it: '...', en: '...' }
8. Contesti: accedi a dati con useCryptoData(), alla lingua con useLanguage(), alla valuta con useCurrency()
9. Formattazione: usa formatCurrency(), formatPercentage(), formatLargeNumber() da utils/formatters.js
10. Max container width: max-w-[1280px] mx-auto px-6 md:px-12 lg:px-16

═══════════════════════════════════════════════════════════
FUNZIONALITÀ DA IMPLEMENTARE
═══════════════════════════════════════════════════════════

## 1. NARRATIVE ENGINE — "Perché si muove"
Per ogni crypto, un modulo che collega variazioni di prezzo significative (>3% in 24h) a eventi concreti.

File da creare:
- src/components/narrative/NarrativeSection.jsx — sezione completa con SectionWrapper + SectionHeading (glowColor="purple")
- src/components/narrative/NarrativeCard.jsx — GlassCard che mostra: variazione %, timeframe, lista eventi correlati
- src/components/narrative/NarrativeEvent.jsx — singolo evento con icona tipo, fonte, timestamp, impact score (alto/medio/basso con colori neon)
- src/components/narrative/NarrativeMiniChart.jsx — mini grafico prezzi con overlay eventi (punti colorati sulla linea)
- src/data/narrativeData.js — mock data per almeno 5 crypto con 3-4 eventi ciascuna, formato bilingue { it, en }

Ogni evento ha: tipo (tweet, regolamentazione, unlock, whale — usa icone emoji o SVG inline), fonte (stringa), timestamp, impactScore ('high'|'medium'|'low')
Stato vuoto elegante quando non ci sono eventi. Commenti // TODO: Replace with API call dove si integreranno dati reali.

## 2. WHALE & SMART MONEY TRACKER
Feed dei movimenti significativi on-chain.

File da creare:
- src/components/whale/WhaleSection.jsx — sezione con SectionWrapper + SectionHeading (glowColor="cyan")
- src/components/whale/WhaleActivityFeed.jsx — lista scrollabile (max-height con overflow-y-auto styled scrollbar)
- src/components/whale/WhaleTransactionCard.jsx — GlassCard variant="dark" per ogni transazione: wallet label, importo formattato con formatCurrency(), asset, destinazione, timestamp relativo
- src/components/whale/WhaleTypeBadge.jsx — badge colorati: "Accumulo" (neon-green), "Distribuzione" (neon-red), "Trasferimento" (neon-amber), "DeFi" (neon-cyan)
- src/components/whale/WhaleAlert.jsx — banner animato con animate-glow-pulse quando un movimento supera soglia
- src/data/whaleData.js — mock data 15-20 transazioni realistiche, bilingue

Filtri per: crypto (usando COIN_IDS da constants.js), dimensione minima, tipo di movimento.
Animazione sottile con motion per nuove entries (fadeInUp).

## 3. SENTIMENT SCORE PER TOKEN
Punteggio fear & greed per singola crypto (non l'indice globale che esiste già in FearGreedGauge).

File da creare:
- src/components/sentiment/SentimentSection.jsx — griglia di token con il loro sentiment
- src/components/sentiment/TokenSentimentGauge.jsx — gauge semicircolare SVG animato (0-100), colori graduali da neon-red → neon-amber → neon-green
- src/components/sentiment/SentimentFactorBar.jsx — mini barra orizzontale per ogni fattore (volume social, funding rate, long/short ratio, flusso exchange, variazione volume)
- src/components/sentiment/SentimentSparkline.jsx — sparkline trend 7/30 giorni (riutilizza logica da SparklineChart.jsx esistente)
- src/data/sentimentData.js — mock data per ogni crypto in COIN_IDS con score e breakdown fattori

Tooltip su hover di ogni fattore che spiega cosa significa (usa t() per le spiegazioni bilingui).

## 4. CORRELATION MATRIX LIVE
Heatmap interattiva delle correlazioni tra asset.

File da creare:
- src/components/correlation/CorrelationSection.jsx — sezione con SectionWrapper + SectionHeading (glowColor="amber")
- src/components/correlation/CorrelationMatrix.jsx — heatmap con canvas o grid CSS: top 15 crypto (da COIN_IDS) + 3 asset tradizionali (S&P500, Oro, DXY)
- src/components/correlation/CorrelationCell.jsx — cella colorata rosso (-1) → trasparente (0) → blu (+1) con valore on hover
- src/components/correlation/CorrelationTooltip.jsx — tooltip con valore correlazione, periodo, mini scatter plot (opzionale, altrimenti solo valore)
- src/components/correlation/TimeframeToggle.jsx — toggle 7d/30d/90d/1y, stile coerente con toggle valuta nella Navbar
- src/data/correlationData.js — matrice mock realistica per ogni timeframe

Highlight celle "anomale" (correlazione che devia >0.3 dalla media storica) con bordo glow.

═══════════════════════════════════════════════════════════
INTEGRAZIONE ROUTING & NAVIGAZIONE
═══════════════════════════════════════════════════════════

Aggiungi una nuova route e pagina:
- src/pages/IntelligencePage.jsx — nuova pagina che contiene tutte e 4 le sezioni (Narrative, Whale, Sentiment, Correlation) in sequenza verticale
- Route: /intelligence
- Aggiungi "Intelligence" alla navbar in Navbar.jsx nell'array navItems
- Aggiungi le traduzioni: navIntelligence: { it: 'Intelligence', en: 'Intelligence' }
- Usa PageHero con theme="intelligence"

═══════════════════════════════════════════════════════════
TRADUZIONI
═══════════════════════════════════════════════════════════

Aggiungi TUTTE le stringhe a src/i18n/translations.js seguendo il pattern esistente.
Raggruppa con commenti: // Intelligence - Narrative, // Intelligence - Whale, etc.

═══════════════════════════════════════════════════════════
REQUISITI TECNICI
═══════════════════════════════════════════════════════════
- NIENTE TypeScript. Solo .jsx e .js
- Tutte le animazioni con motion (da "motion/react"), mai CSS animations custom tranne quelle già in index.css
- Responsive: mobile-first, stessi breakpoint del progetto (md:, lg:)
- Ogni componente deve avere stati: loading (SkeletonLoader), dati presenti, errore, vuoto
- Commenti // TODO: Replace with API call dove servono dati reali
- NON installare nuove dipendenze — usa solo quelle già in package.json
```

---

## PROMPT 2 — Strumenti Analitici & Portfolio

```
Proseguo l'espansione di CryptoInsight. Nel prompt precedente ho aggiunto la pagina /intelligence con: NarrativeSection, WhaleSection, SentimentSection, CorrelationSection.

Ora devo aggiungere strumenti analitici e portfolio. Crea una nuova pagina /strumenti con 4 nuove sezioni.

RICORDA: segui esattamente le conventions del progetto (vedi prompt precedente per il dettaglio completo). In breve:
- React 19 JSX (NO TypeScript)
- Tailwind v4 con @theme tokens (neon-*, glass, panel variants)
- Motion da "motion/react" (fadeInUp, staggerContainer, etc. da useInViewAnimation.js)
- i18n con t('key', lang) — TUTTE le stringhe bilingui it/en
- Componenti UI: GlassCard, SectionWrapper, SectionHeading, SkeletonLoader
- Dati mock bilingui in src/data/
- Formattazione con formatCurrency(), formatPercentage(), formatLargeNumber()
- Container: max-w-[1280px] mx-auto px-6 md:px-12 lg:px-16
- NO nuove dipendenze npm

═══════════════════════════════════════════════════════════
FUNZIONALITÀ DA IMPLEMENTARE
═══════════════════════════════════════════════════════════

## 5. TOKEN UNLOCK CALENDAR & DILUTION IMPACT
Calendario interattivo degli unlock con analisi d'impatto sulla supply.

File da creare:
- src/components/unlock/UnlockSection.jsx — SectionWrapper + SectionHeading glowColor="amber"
- src/components/unlock/UnlockCalendar.jsx — vista mensile con grid CSS (7 colonne), celle con indicatori per giorni con unlock. Toggle vista: mensile/lista
- src/components/unlock/UnlockEventCard.jsx — GlassCard per ogni unlock: token (con brandColors da cryptoMeta.js), data, quantità, % supply circolante, destinatario (team/investor/ecosystem con badge colorati)
- src/components/unlock/DilutionBar.jsx — barra visuale segmentata: "Già sbloccato" (neon-green) | "Questo unlock" (neon-amber pulse) | "Locked" (text-secondary/30%)
- src/components/unlock/HistoricalUnlockChart.jsx — mini grafico che mostra la variazione media del prezzo nelle precedenti unlock: -7d, -1d, giorno, +1d, +7d, +30d (barre verticali colorate rosso/verde)
- src/components/unlock/UnlockAlertBadge.jsx — badge pulsante per unlock nei prossimi 7 giorni, severity con colori: >5% supply = neon-red, 2-5% = neon-amber, <2% = neon-green
- src/data/unlockData.js — mock data per 8-10 unlock futuri con dati storici per 4-5 token, formato bilingue per labels

Filtro per: token specifico (dropdown con crypto da COIN_IDS + cryptoMeta per nomi), dimensione unlock, timeframe.

## 6. PROJECT HEALTH SCORE — "Dietro il Codice"
Due diligence tecnica per ogni progetto con score complessivo.

File da creare:
- src/components/health/HealthSection.jsx — SectionWrapper + SectionHeading glowColor="green"
- src/components/health/ProjectHealthCard.jsx — GlassCard grande con brandColors dal cryptoMeta.js del token. Score A+ → F in grande, con colore (A=neon-green, B=neon-cyan, C=neon-amber, D=neon-red, F=red/50%)
- src/components/health/HealthMetricRow.jsx — riga con label, valore, sparkline mini (trend 90 giorni), e confronto vs media categoria
- src/components/health/HealthBadge.jsx — badge tipo: "Actively Developed" (neon-green), "Audit Verified" (neon-cyan), "Growing TVL" (neon-purple), "Red Flag" (neon-red)
- src/components/health/HealthDetailPanel.jsx — pannello espandibile (motion AnimatePresence per expand/collapse) con dettagli completi
- src/data/healthData.js — mock data per tutte le crypto in COIN_IDS. Per ogni token:
  • github: { commits90d: [...sparkline], contributorsActive: N, issuesRatio: N }
  • security: { audits: [{ name, date, auditor }], vulnerabilities: N }
  • onchain: { tvl: N (se DeFi), dailyTx: N, activeAddresses: N }
  • team: { size: N, lastRoadmapUpdate: 'date', deliveryRate: N% }
  Tutte le label bilingui.

Confronto visuale: barra "questo token vs media della categoria" (usa CATEGORIES da constants.js per raggruppare).

## 7. PORTFOLIO X-RAY
Analisi radiografica del portfolio. L'utente inserisce manualmente i propri holdings.

File da creare:
- src/components/portfolio/PortfolioSection.jsx — SectionWrapper + SectionHeading glowColor="purple"
- src/components/portfolio/PortfolioInput.jsx — form per aggiungere holdings: dropdown token (da COIN_IDS + cryptoMeta), input quantità. Lista editabile con rimuovi. Salva in React state (useState). NO localStorage.
- src/components/portfolio/SectorDonut.jsx — donut chart SVG: settori basati su category da cryptoMeta.js (layer-1, payments, defi, gaming, ai). Colori: layer-1=neon-cyan, payments=neon-green, defi=neon-purple, gaming=neon-amber, ai=neon-red
- src/components/portfolio/RiskScore.jsx — score 1-10 visualizzato come barra segmentata con glow. Calcolato da: concentrazione (Herfindahl index), numero asset, mix categorie
- src/components/portfolio/PerformanceBenchmark.jsx — confronto rendimento portfolio vs BTC, ETH, Top20 come linee su mini grafico. Toggle timeframe 7d/30d/90d
- src/components/portfolio/DiversificationTips.jsx — GlassCard variant="dark" con suggerimenti contestuali basati sulla composizione (es. "Il tuo portfolio è 80% Layer-1 — considera diversificare in DeFi"). Testi bilingui.
- src/contexts/PortfolioContext.jsx — NUOVO context provider per condividere i dati portfolio con altri componenti (servirà allo Scenario Simulator). Wrappa in main.jsx come gli altri context.

## 8. SCENARIO SIMULATOR
Tool "what-if" con slider interattivi. USA i dati dal PortfolioContext se disponibili.

File da creare:
- src/components/scenario/ScenarioSection.jsx — SectionWrapper + SectionHeading glowColor="cyan"
- src/components/scenario/ScenarioSimulator.jsx — container con slider e risultati
- src/components/scenario/ScenarioSlider.jsx — slider custom styled con Tailwind: thumb con glow, track con gradiente. Label + valore attuale. Props: min, max, step, value, onChange, label, formatFn
- src/components/scenario/ScenarioPreset.jsx — bottoni per scenari predefiniti: "Bull Run", "Bear Market", "ETH Flippening", "Alt Season". Click pre-imposta i valori degli slider.
- src/components/scenario/ScenarioResults.jsx — tabella risultati con motion AnimatePresence per aggiornamento fluido: colonne Token | Prezzo Attuale | Prezzo Stimato | Variazione %. Usa formatCurrency() e formatPercentage()
- src/data/scenarioData.js — correlazioni storiche mock e beta per ogni token rispetto a BTC

Scenari (slider):
- Bitcoin target: 50k–500k (step 10k)
- ETH/BTC ratio: 0.01–0.15 (step 0.005)
- Total Market Cap: 1T–15T (step 0.5T)
- BTC Dominance: 30%–80% (step 1%)

Se l'utente ha inserito un portfolio (da PortfolioContext), mostra impatto su quei token. Altrimenti mostra le top 10 da COIN_IDS.
Disclaimer bilingue: "Proiezioni basate su correlazioni storiche, non garanzia di risultati futuri" / "Projections based on historical correlations, not a guarantee of future results"

═══════════════════════════════════════════════════════════
INTEGRAZIONE ROUTING & NAVIGAZIONE
═══════════════════════════════════════════════════════════

Crea la nuova pagina:
- src/pages/StrumentiPage.jsx — contiene UnlockSection, HealthSection, PortfolioSection, ScenarioSection in sequenza
- Route: /strumenti
- Aggiungi "Strumenti" alla navbar: navStrumenti: { it: 'Strumenti', en: 'Tools' }
- PageHero theme="strumenti"
- Aggiungi PortfolioContext.Provider in main.jsx (wrappa come CryptoDataProvider, CurrencyProvider, etc.)

═══════════════════════════════════════════════════════════
TRADUZIONI
═══════════════════════════════════════════════════════════

Aggiungi TUTTE le nuove stringhe a translations.js. Raggruppa con commenti: // Strumenti - Unlock, // Strumenti - Health, etc.
```

---

## PROMPT 3 — Premium Content, Regolamentazione & Polish Finale

```
Fase finale di CryptoInsight. Nelle fasi precedenti ho aggiunto:
- Pagina /intelligence: Narrative Engine, Whale Tracker, Sentiment Score, Correlation Matrix
- Pagina /strumenti: Unlock Calendar, Project Health, Portfolio X-Ray, Scenario Simulator
- PortfolioContext per condividere dati portfolio

Ora devo completare con contenuti premium, regolamentazione, e polish finale dell'intera piattaforma.

RICORDA LE CONVENTIONS: React 19 JSX, Tailwind v4 @theme, Motion da "motion/react", i18n con t(), GlassCard/SectionWrapper/SectionHeading, dati mock bilingui, formatters.js, NO TypeScript, NO nuove dipendenze npm.

═══════════════════════════════════════════════════════════
FUNZIONALITÀ DA IMPLEMENTARE
═══════════════════════════════════════════════════════════

## 9. MAPPA REGOLAMENTAZIONE LIVE
Mappa mondiale interattiva sullo stato regolamentario crypto per paese.

File da creare:
- src/components/regulation/RegulationSection.jsx — SectionWrapper + SectionHeading glowColor="amber"
- src/components/regulation/RegulationMap.jsx — mappa SVG del mondo (usa un SVG world map inline semplificato con i path dei principali paesi). Ogni paese colorato per crypto-friendliness: neon-green (favorevole), neon-amber (neutro), orange-400 (restrittivo), neon-red (ban)
- src/components/regulation/CountryPanel.jsx — panel laterale (motion slideInRight) on click paese con: status generale, tassazione, ETF, stablecoin regulation, mining, exchange licensing, timeline cambiamenti recenti
- src/components/regulation/RegulationFilters.jsx — filtri: tipo regolamentazione, regione (Europa/Asia/Americas/Africa), livello apertura
- src/components/regulation/CountryCompare.jsx — confronto 2-3 paesi side-by-side in GlassCard variant="dark"
- src/components/regulation/RegulationHotBadge.jsx — icona animata (animate-glow-pulse) su paesi con aggiornamenti recenti (<30 giorni)
- src/data/regulationData.js — dati mock per 25 paesi principali: USA, UE (Germania, Francia, Italia, Spagna, Paesi Bassi), UK, Svizzera, Giappone, Corea del Sud, Singapore, Australia, Canada, Brasile, Argentina, India, Cina, Russia, UAE, El Salvador, Nigeria, Turchia, Thailandia, Hong Kong, Portogallo, Malta, Estonia. Tutti i campi bilingui.

## 10. WEEKLY INTELLIGENCE BRIEF
Report settimanale in stile "analista personale".

File da creare:
- src/components/brief/BriefSection.jsx — SectionWrapper + SectionHeading glowColor="purple"
- src/components/brief/WeeklyBrief.jsx — layout editoriale premium con tipografia raffinata: Orbitron per titoli sezione, Space Grotesk per body. Padding generoso, line-height rilassato.
- src/components/brief/BriefHeader.jsx — header con numero settimana, date range, e badge "Latest" con glow
- src/components/brief/BriefExecutiveSummary.jsx — 3-4 highlight con icone
- src/components/brief/BriefNarrative.jsx — testo lungo con pull-quotes styled (bordo sinistro neon-purple, font più grande, italic)
- src/components/brief/BriefMetricsTable.jsx — mini tabella metriche settimanali: BTC dominance, total market cap, DeFi TVL, Fear & Greed (usa dati da CryptoDataContext dove possibile)
- src/components/brief/BriefArchive.jsx — navigazione settimane precedenti (tabs o timeline orizzontale)
- src/data/briefData.js — mock di 3 settimane di report completi, bilingue. Collega dove possibile a dati delle sezioni precedenti (es. cita whale movements, unlock events, regulation updates)

Predisponi struttura per generazione AI futura: commenti // TODO: AI-generated content integration

## 11. ALERT CENTER
Centro notifiche personalizzabile accessibile dalla Navbar.

File da creare:
- src/components/alerts/AlertBell.jsx — icona campanella nella Navbar con badge counter (pallino neon-red con numero). Click apre panel.
- src/components/alerts/AlertPanel.jsx — panel dropdown (motion, AnimatePresence) con:
  • Tab "Attivi" / "Cronologia"
  • Lista alert configurati con toggle on/off
  • Feed cronologico notifiche passate
- src/components/alerts/AlertCreateForm.jsx — form per creare alert: tipo (Prezzo, Whale, Unlock, Sentiment, Regolamentazione) + parametri specifici per tipo. Dropdown token da COIN_IDS + cryptoMeta.
- src/components/alerts/AlertCard.jsx — card singolo alert con: tipo (icona + colore), descrizione, toggle attivo/disattivo, edit, delete
- src/components/alerts/AlertNotification.jsx — toast notification (motion, position fixed bottom-right) per alert triggerati
- src/contexts/AlertContext.jsx — NUOVO context per gestire alert state. Aggiungi provider in main.jsx.
- src/data/alertMockData.js — 5-6 alert di esempio + 10 notifiche passate mock

Tutto client-side in React state. Commenti // TODO: Push notifications integration

Integrazione Navbar: aggiungi <AlertBell /> in Navbar.jsx accanto al LIVE indicator.

## 12. POLISH FINALE & PREMIUM UX
Rifinitura dell'intera piattaforma per qualità produzione.

═══════════════════════════════════════════════════════════
12A. HOMEPAGE UPGRADE (HomePage.jsx)
═══════════════════════════════════════════════════════════

La home attualmente mostra solo HeroSection. Aggiungici sotto:

- src/components/home/MarketOverviewBar.jsx — barra orizzontale sotto l'hero con: Total Market Cap, BTC Dominance, Variazione 24h, Fear & Greed globale. Dati da CryptoDataContext. Stile: sfondo glass, numeri con animazione count-up (usa motion animate={{ }} con transition).
- src/components/home/TrendingBar.jsx — barra scrollabile orizzontale con le crypto che hanno più variazione nelle ultime 24h (top 5 gainers). Dati da useCryptoData().coins ordinati per price_change_percentage_24h_in_currency. Stile marquee con animazione.
- src/components/home/HomePreviewsGrid.jsx — (ESISTE GIA' ma va aggiornato) aggiungi preview card per le nuove pagine /intelligence e /strumenti con mini preview di un dato chiave da ciascuna sezione.
- Aggiungi <Footer /> anche alla home (attualmente escluso con `{!isHome && <Footer />}` in Layout.jsx — rimuovi quella condizione)

═══════════════════════════════════════════════════════════
12B. MICRO-INTERAZIONI PREMIUM
═══════════════════════════════════════════════════════════

Aggiungi a index.css e ai componenti esistenti:
- Numeri animati: componente src/components/ui/AnimatedNumber.jsx che usa motion per count-up. Usalo in MarketStatCard, MarketOverviewBar, e ovunque ci siano numeri che cambiano.
- Hover glow potenziato sulle GlassCard: aggiungi un sottile radial gradient che segue il mouse (usa onMouseMove + state per la posizione)
- Skeleton shimmer migliorato: verifica che TUTTI i componenti che caricano dati mostrino SkeletonLoader
- Toast system: src/components/ui/Toast.jsx — componente toast riutilizzabile (motion, position fixed, auto-dismiss dopo 4s). Usalo per conferme azioni (alert creato, portfolio aggiornato, etc.)
- Confetti leggero: quando una crypto fa >10% in 24h, mostra un sottile effetto particelle verdi sulla sua card in CryptoAssetsSection (usa canvas o div animati con motion)

═══════════════════════════════════════════════════════════
12C. NAVIGAZIONE MIGLIORATA
═══════════════════════════════════════════════════════════

- Quick Search (Cmd+K): src/components/ui/CommandPalette.jsx — modal con input di ricerca che filtra tutte le crypto (da cryptoMeta.js) e le pagine. Motion AnimatePresence per apertura. Registra keyboard listener in Layout.jsx.
- Navbar: ora ha 6 items (Crypto, Mercato, Eventi, News, Intelligence, Strumenti) — verifica che il layout non si rompa su desktop e che il mobile menu funzioni con tutti gli items.

═══════════════════════════════════════════════════════════
12D. RESPONSIVE POLISH
═══════════════════════════════════════════════════════════

Verifica e sistema:
- Correlation Matrix: su mobile diventa scrollabile orizzontalmente con snap
- Regulation Map: su mobile mostra lista paesi invece di mappa SVG
- Weekly Brief: su mobile il layout diventa full-width senza sidebar
- Tutti gli slider dello Scenario Simulator: touch-friendly con area di tocco sufficiente
- Portfolio Input: dropdown e form usabili su mobile

═══════════════════════════════════════════════════════════
12E. FOOTER UPGRADE
═══════════════════════════════════════════════════════════

Aggiorna Footer.jsx con:
- Colonne: "Esplora" (link alle pagine), "Risorse" (link fittizi: API, Docs, GitHub), "Legale" (Terms, Privacy, Cookie)
- Disclaimer: "Le informazioni presenti su CryptoInsight sono a scopo informativo. Non costituiscono consulenza finanziaria." — bilingue
- Social icons (fittizi): Twitter, Discord, GitHub
- Copyright con anno dinamico

═══════════════════════════════════════════════════════════
INTEGRAZIONE ROUTING FINALE
═══════════════════════════════════════════════════════════

Nuova pagina:
- src/pages/RegolamentazionePage.jsx — contiene RegulationSection + BriefSection
- Route: /regolamentazione
- Navbar: navRegolamentazione: { it: 'Regolamentazione', en: 'Regulation' }

Ma attenzione: con 7 items nella navbar (Crypto, Mercato, Eventi, News, Intelligence, Strumenti, Regolamentazione), il menu desktop potrebbe essere troppo largo. Valuta di raggruppare in un dropdown "Altro" o "Esplora" per gli ultimi 2-3 items. Oppure usa icone senza label su desktop e label complete su mobile. Scegli la soluzione migliore per il design.

Aggiungi AlertContext.Provider in main.jsx.

═══════════════════════════════════════════════════════════
TRADUZIONI FINALI
═══════════════════════════════════════════════════════════

Aggiungi TUTTE le nuove stringhe a translations.js. Verifica che non ci siano stringhe hardcoded in nessun componente nuovo o modificato.

═══════════════════════════════════════════════════════════
CHECKLIST FINALE
═══════════════════════════════════════════════════════════

Prima di considerare il lavoro completo, verifica:
□ Tutte le pagine raggiungibili dalla navbar e navigabili
□ PageTransition su ogni pagina
□ Tutti i componenti hanno loading/error/empty states
□ Tutte le stringhe passano per t() con traduzione it/en
□ Design coerente: stessi border-radius (rounded-2xl o rounded-[32px] come i panel), spacing, colori neon su tutto
□ Mobile: tutte le pagine funzionali senza scroll orizzontale involontario
□ Context providers: CryptoData, Currency, Language, PaletteCycle, Portfolio, Alert — tutti wrappati in main.jsx
□ Nessuna nuova dipendenza npm aggiunta
□ Commenti // TODO dove serviranno integrazioni API future
```

---

## Riepilogo Struttura Finale

```
NUOVE ROUTES:
/intelligence → NarrativeSection + WhaleSection + SentimentSection + CorrelationSection
/strumenti    → UnlockSection + HealthSection + PortfolioSection + ScenarioSection
/regolamentazione → RegulationSection + BriefSection

NUOVI CONTEXT:
PortfolioContext (Prompt 2) — condivide dati portfolio tra Portfolio X-Ray e Scenario Simulator
AlertContext (Prompt 3) — gestisce alert e notifiche

NUOVE CARTELLE COMPONENTI:
components/narrative/    (Prompt 1)
components/whale/        (Prompt 1)
components/sentiment/    (Prompt 1)
components/correlation/  (Prompt 1)
components/unlock/       (Prompt 2)
components/health/       (Prompt 2)
components/portfolio/    (Prompt 2)
components/scenario/     (Prompt 2)
components/regulation/   (Prompt 3)
components/brief/        (Prompt 3)
components/alerts/       (Prompt 3)

NUOVI FILE DATI:
data/narrativeData.js, data/whaleData.js, data/sentimentData.js,
data/correlationData.js, data/unlockData.js, data/healthData.js,
data/scenarioData.js, data/regulationData.js, data/briefData.js,
data/alertMockData.js

NAVBAR FINALE: Crypto | Mercato | Eventi | News | Intelligence | Strumenti | Regolamentazione (+ 🔔 Alert)
```
