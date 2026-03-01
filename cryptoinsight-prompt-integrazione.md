# 🔄 CryptoInsight — Prompt Unico di Integrazione Completa

> Questo prompt integra tutte le nuove funzionalità premium DENTRO le 4 pagine esistenti (Crypto, Mercato, Eventi, News) + potenzia la Home. Niente pagine nuove: la piattaforma diventa un ciclo continuo dove ogni sezione alimenta le altre con dati, insight e consigli per l'utente.

```
Devo trasformare CryptoInsight da piattaforma informativa a piattaforma di intelligence crypto premium. La filosofia è: ogni pagina deve alimentare le altre creando un ciclo continuo di dati → contesto → analisi → azione per l'utente. L'utente non deve mai sentire di dover cercare altrove.

NON creare nuove pagine o nuove route. Integra TUTTO nelle 4 pagine esistenti (/crypto, /mercato, /eventi, /news) + arricchisci la Home (/).

═══════════════════════════════════════════════════════════
STACK & CONVENTIONS (SEGUI RIGOROSAMENTE)
═══════════════════════════════════════════════════════════

STACK:
- React 19 con JSX (NO TypeScript, niente .tsx)
- Vite 7, Tailwind CSS v4 con @theme tokens in index.css
- Motion (importa da "motion/react") — animazioni con variants da useInViewAnimation.js (fadeInUp, fadeIn, staggerContainer, scaleIn, slideInLeft, slideInRight)
- GSAP, Lenis, Three.js + @react-three/fiber + @paper-design/shaders-react già installati
- NO nuove dipendenze npm

STRUTTURA ESISTENTE:
src/
├── components/
│   ├── ui/ — GlassCard, SectionHeading, SectionWrapper, SkeletonLoader, ScrollProgress
│   ├── layout/ — Navbar, Footer, Layout, PageTransition, SectionWrapper
│   ├── hero/ — HeroSection, ShaderBackground, PriceTicker, GlowTitle, CTAButton
│   ├── heroes/ — PageHero, HeroScrollIndicator
│   ├── market-pulse/ — MarketPulseSection, FearGreedGauge, MarketStatCard, GainersLosers
│   ├── crypto-assets/ — CryptoAssetsSection, CryptoCard, SparklineChart, RiskBadge, CategoryTabs, DisclaimerBanner, PriceChange
│   ├── events/ — EventsSection, EventCard, EventTimeline, ImpactBadge
│   ├── news/ — NewsSection, NewsCard, LiveIndicator, CategoryTag
│   ├── bybit/ — BybitSection, BybitDashboard
│   ├── home/ — HomePreviewsGrid
│   └── why-crypto/ — WhyCryptoSection, FeatureCard
├── contexts/ — CryptoDataContext, CurrencyContext, LanguageContext, PaletteCycleContext
├── data/ — mockCryptoData.js, cryptoMeta.js, events.js, news.js
├── hooks/ — useInViewAnimation.js, useLenis.js
├── i18n/ — translations.js con t('key', lang) e l(obj, lang) per oggetti bilingui { it, en }
├── pages/ — HomePage, CryptoPage, MarketPage, EventsPage, NewsPage, NotFoundPage
├── services/ — coingecko.js, feargreed.js
└── utils/ — constants.js (API_URLS, COIN_IDS, POLLING_INTERVALS, CATEGORIES, COLORS), formatters.js (formatCurrency, formatPercentage, formatLargeNumber, formatMarketCapRank)

ROUTES (App.jsx — react-router v7):
/ → HomePage | /crypto → CryptoPage | /mercato → MarketPage | /eventi → EventsPage | /news → NewsPage

DESIGN TOKENS (index.css @theme):
- bg-primary (#0a0a0f), bg-secondary (#12121a), bg-card (rgba 255,255,255,0.03)
- neon-cyan (#00f0ff), neon-purple (#8b5cf6), neon-green (#00ff88), neon-amber (#f59e0b), neon-red (#ef4444)
- glass-border (rgba 255,255,255,0.10), glass-bg (rgba 255,255,255,0.04)
- text-primary (#f0f0f0), text-secondary (#8a8a9a)
- Font: Orbitron (heading), Space Grotesk (body)
- Classi: .glass, .panel, .panel-purple/green/amber/dark, .glow-*, .text-glow-*, .animate-shimmer, .animate-glow-pulse, .section-divider

PATTERN DA SEGUIRE:
- Sezioni con SectionWrapper + SectionHeading
- Card con GlassCard (variant, brandColors, hover)
- Animazioni con motion variants (fadeInUp, staggerContainer)
- TUTTE le stringhe visibili con t('key', lang) — aggiungi in translations.js
- Dati mock in src/data/ con campi bilingui { it: '...', en: '...' }
- Loading = SkeletonLoader, formattazione con formatters.js
- Container: max-w-[1280px] mx-auto px-6 md:px-12 lg:px-16
- Componenti esistenti: cryptoMeta.js ha brandColors per ogni coin, CryptoDataContext espone coins/globalData/fearGreed

COMPONENTI ESISTENTI CHIAVE (non ricrearli, estendili):
- CryptoCard: GlassCard con header (img+name+rank+RiskBadge), prezzo, SparklineChart, PriceChange grid 24h/7d/30d, description
- MarketPulseSection: FearGreedGauge + 3 MarketStatCard (market cap, BTC dominance, volume) + GainersLosers
- EventsSection: SectionHeading amber + EventTimeline con EventCard
- NewsSection: heading + LiveIndicator + grid NewsCard
- HomePage: solo HeroSection

═══════════════════════════════════════════════════════════════════════
PAGINA /crypto — DA "LISTA PREZZI" A "INTELLIGENCE HUB PER TOKEN"
═══════════════════════════════════════════════════════════════════════

Attualmente: CryptoAssetsSection (griglia di CryptoCard) + BybitSection.
Obiettivo: ogni crypto diventa un mini-dossier interattivo. L'utente clicca una card e accede a TUTTO ciò che serve per decidere se investire.

### A) ARRICCHISCI CryptoCard (modifica src/components/crypto-assets/CryptoCard.jsx)

Aggiungi alla card esistente (SENZA stravolgere il layout, aggiungi sotto la description):
- Mini sentiment gauge: cerchio SVG piccolo (40x40px) con score 0-100 e colore (rosso→verde). Sotto: label "Sentiment" in testo tiny. Dati da sentimentData.js
- Health badge compatto: lettera grade (A+→F) in un piccolo cerchio colorato accanto al RiskBadge nell'header. Dati da healthData.js
- Indicator "🐋" emoji piccolo se ci sono whale movements recenti (<24h) per quel token. Dati da whaleData.js
- Se il token ha variazione >5% 24h, aggiungi un sottile bordo pulsante (animate-glow-pulse) con colore verde (positivo) o rosso (negativo)

### B) CREA TOKEN DETAIL MODAL (nuovo componente)

Quando l'utente clicca su una CryptoCard, si apre un modal/panel a tutto schermo (non una nuova route — usa motion AnimatePresence + un state in CryptoAssetsSection).

File da creare:
- src/components/crypto-detail/TokenDetailModal.jsx — overlay full-screen con sfondo blur, pannello centrato scrollabile
- src/components/crypto-detail/TokenHeader.jsx — nome, logo, prezzo grande, variazioni, rank, risk badge, health grade
- src/components/crypto-detail/NarrativePanel.jsx — "PERCHÉ SI MUOVE": lista eventi che hanno causato i movimenti recenti. Ogni evento: tipo (icona), fonte, timestamp, impact score. Mini chart con overlay punti evento. Se il prezzo è salito del 5% oggi mostra "📈 +5.2% — probabilmente causato da: [evento1], [evento2]"
- src/components/crypto-detail/SentimentPanel.jsx — gauge grande semicircolare animato + breakdown fattori (volume social, funding rate, long/short, flusso exchange) con barre orizzontali + sparkline trend 7/30d
- src/components/crypto-detail/HealthPanel.jsx — Project Health completo: score A+→F, metriche GitHub (commits sparkline, contributors, issues ratio), audit, on-chain (TVL, daily tx, active addresses), confronto vs media categoria
- src/components/crypto-detail/WhalePanel.jsx — ultimi 5 movimenti whale per quel token specifico con WhaleTypeBadge (Accumulo verde, Distribuzione rosso, Trasferimento amber, DeFi cyan)
- src/components/crypto-detail/UnlockPanel.jsx — prossimi unlock per quel token (se presenti): data, quantità, % supply, barra dilution, storico impatto prezzi nelle unlock passate
- src/components/crypto-detail/ActionBox.jsx — box in fondo con "COSA CONSIDERARE": 3-4 bullet contestuali generati dalla combinazione dei dati (sentiment alto + whale accumulating = "Smart money sta accumulando in un momento di sentiment positivo" / sentiment basso + unlock imminente = "Attenzione: unlock significativo in arrivo con sentiment già negativo"). Testi bilingui, 3-4 scenari predefiniti per combinazione. Disclaimer: "Non è consulenza finanziaria"

Layout del modal: 2 colonne su desktop (sinistra: header + narrative + chart, destra: sentiment + health + whale + unlock + action box). Su mobile: colonna singola scrollabile.

### C) DATI MOCK PER LA PAGINA CRYPTO

File da creare:
- src/data/sentimentData.js — per ogni coin in COIN_IDS: { score: 0-100, factors: { socialVolume, fundingRate, longShortRatio, exchangeFlow, volumeChange }, trend7d: [...], trend30d: [...] }
- src/data/healthData.js — per ogni coin: { grade: 'A+'→'F', github: { commits90d: [...sparkline], contributors, issuesRatio }, security: { audits: [...], vulnerabilities }, onchain: { tvl, dailyTx, activeAddresses }, team: { size, lastRoadmapUpdate, deliveryRate } }
- src/data/whaleData.js — 20+ transazioni: { id, coinId, walletLabel, amount, asset, destination, type: 'accumulation'|'distribution'|'transfer'|'defi', timestamp }
- src/data/unlockData.js — 10+ unlock futuri: { id, coinId, date, amount, percentSupply, recipient: 'team'|'investor'|'ecosystem', historicalImpact: { minus7d, minus1d, day, plus1d, plus7d, plus30d } }
- src/data/narrativeData.js — per ogni coin: array eventi { type: 'tweet'|'regulation'|'unlock'|'whale'|'partnership'|'technical', source, timestamp, impactScore: 'high'|'medium'|'low', title: { it, en }, description: { it, en } }

═══════════════════════════════════════════════════════════════
PAGINA /mercato — DA "STATISTICHE" A "COMMAND CENTER"
═══════════════════════════════════════════════════════════════

Attualmente: MarketPulseSection (FearGreedGauge + stats + GainersLosers).
Obiettivo: il centro di comando per capire lo stato del mercato globale e il proprio portfolio.

### A) POTENZIA MarketPulseSection (modifica il file esistente)

- Aggiungi contatore animato sui numeri: i valori di MarketStatCard devono animarsi con count-up quando appaiono e quando cambiano (usa motion animate={{ }} con transition). Crea un componente src/components/ui/AnimatedNumber.jsx riutilizzabile.
- Aggiungi un 4° stat card: "Active Whales 24h" — conteggio movimenti whale nelle ultime 24h con importo totale. Dati da whaleData.js.

### B) NUOVA SEZIONE: Whale Activity Feed (SOTTO GainersLosers)

File: src/components/market-pulse/WhaleActivityFeed.jsx
- Feed globale ultimi 10 movimenti whale (non filtrato per token come nella detail, qui è tutto il mercato)
- Ogni entry in GlassCard variant="dark" compatta: wallet label, importo, asset (con logo da coins data), tipo badge, timestamp relativo ("3 min fa", "1 ora fa")
- Animazione fadeInUp per nuove entries
- Link implicito: cliccando sull'asset del whale movement, apri il TokenDetailModal di quel token nella pagina /crypto (usa un <Link> o salva in un context e redirect)

Aggiungi in MarketPage.jsx dopo MarketPulseSection.

### C) NUOVA SEZIONE: Correlation Matrix (SOTTO Whale Feed)

File:
- src/components/market-pulse/CorrelationSection.jsx — SectionWrapper + SectionHeading glowColor="cyan"
- src/components/market-pulse/CorrelationMatrix.jsx — heatmap grid CSS delle correlazioni tra le crypto in COIN_IDS + S&P500, Oro, DXY. Celle colorate: rosso (-1) → trasparente (0) → blu (+1). Hover mostra valore.
- src/components/market-pulse/CorrelationTimeframeToggle.jsx — toggle 7d/30d/90d styled come i toggle valuta/lingua nella Navbar
- src/data/correlationData.js — matrice mock per ogni timeframe

Highlight celle anomale (deviazione >0.3 dalla norma) con bordo glow neon-amber.
Su mobile: scroll orizzontale con indicatore scroll.

### D) NUOVA SEZIONE: Portfolio X-Ray & Scenario Simulator (SOTTO Correlation)

Queste due sezioni lavorano insieme — il portfolio alimenta il simulatore.

File:
- src/components/portfolio/PortfolioSection.jsx — SectionWrapper + SectionHeading glowColor="purple", contiene sia input che analisi
- src/components/portfolio/PortfolioInput.jsx — form inline: dropdown token (COIN_IDS + nomi da cryptoMeta) + input quantità + bottone "Aggiungi". Lista holdings editabile sotto. Salva tutto in PortfolioContext.
- src/components/portfolio/PortfolioAnalysis.jsx — appare solo quando ci sono holdings. Contiene:
  • Donut SVG per esposizione settoriale (categorie da cryptoMeta: layer-1=neon-cyan, payments=neon-green, defi=neon-purple, gaming=neon-amber, ai=neon-red)
  • Risk Score 1-10 (barra segmentata con glow)
  • DiversificationTips: suggerimenti contestuali in GlassCard variant="dark"
- src/components/portfolio/ScenarioSimulator.jsx — slider interattivi: Bitcoin target (50k-500k), ETH/BTC ratio (0.01-0.15), Total Market Cap (1T-15T), BTC Dominance (30-80%). Bottoni preset: "Bull Run", "Bear Market", "Alt Season". Tabella risultati con impatto su ogni holding. Se nessun portfolio → mostra impatto su top 10 COIN_IDS.
- src/components/portfolio/ScenarioSlider.jsx — slider custom: thumb con glow, track gradiente, label + valore formattato
- src/contexts/PortfolioContext.jsx — NUOVO context (aggiungi provider in main.jsx). State: holdings array [{ coinId, quantity }], addHolding, removeHolding, clearPortfolio.
- src/data/scenarioData.js — beta e correlazioni storiche mock per ogni token vs BTC

Disclaimer bilingue: "Proiezioni basate su correlazioni storiche, non garanzia di risultati futuri"

Ordine sezioni finale in MarketPage.jsx:
1. PageHero
2. MarketPulseSection (potenziata con AnimatedNumber + whale stat)
3. WhaleActivityFeed
4. CorrelationSection
5. PortfolioSection (con ScenarioSimulator integrato)

═══════════════════════════════════════════════════════════════
PAGINA /eventi — DA "CALENDARIO" A "RADAR DEL FUTURO"
═══════════════════════════════════════════════════════════════

Attualmente: EventsSection con EventTimeline.
Obiettivo: tutto ciò che sta per succedere — eventi, unlock, cambiamenti regolamentari — in una timeline unificata con analisi d'impatto.

### A) POTENZIA EventsSection

Modifica src/components/events/EventsSection.jsx per aggiungere tabs/toggle sopra la timeline:
- "Tutti" | "Eventi" | "Unlock" | "Regolamentazione" — filtrano la timeline unificata
- Usa CategoryTabs come pattern di riferimento (già esiste in crypto-assets)

### B) INTEGRA UNLOCK nella Timeline

File:
- src/components/events/UnlockEventCard.jsx — card per unlock nella timeline, stesso stile di EventCard ma con: quantità, % supply, barra dilution (sbloccato/questo unlock/locked), badge severity (>5%=rosso, 2-5%=amber, <2%=verde), mini chart impatto storico
- Modifica EventTimeline.jsx per accettare sia events che unlocks, ordinati per data
- Unisci i dati di events.js e unlockData.js in un array unificato con campo source: 'event'|'unlock'|'regulation'

### C) INTEGRA REGOLAMENTAZIONE nella Timeline + Mappa

File:
- src/components/events/RegulationEventCard.jsx — card per update regolamentari nella timeline: paese (con bandiera emoji), tipo update, impatto stimato, link a dettagli
- src/components/regulation/RegulationMapSection.jsx — NUOVA sezione SOTTO la timeline. Mappa SVG mondo semplificata con paesi colorati per crypto-friendliness (neon-green/neon-amber/orange/neon-red). Click apre panel dettagli paese.
- src/components/regulation/CountryDetailPanel.jsx — panel motion slideInRight: status, tassazione, ETF, stablecoin, mining, exchange licensing
- src/components/regulation/CountryCompare.jsx — confronto 2 paesi side-by-side
- src/data/regulationData.js — dati per 25 paesi con campi bilingui: status, taxRate, etfApproved, stablecoinRegulated, miningAllowed, exchangeLicense, recentChanges: [{ date, title: {it,en} }]

### D) ANALISI IMPATTO su ogni evento/unlock/regulation

Aggiungi a ogni card nella timeline:
- "Impatto atteso": sentiment della community (icona thumbs up/down con percentuale)
- "Token interessati": lista badge con i token impattati (cliccabili → redirect a /crypto e apri TokenDetailModal)
- Per gli unlock: grafico storico "cosa è successo le altre volte"

Ordine sezioni finale in EventsPage.jsx:
1. PageHero
2. EventsSection (potenziata con tabs + timeline unificata events/unlock/regulation)
3. RegulationMapSection

═══════════════════════════════════════════════════════════════
PAGINA /news — DA "ARTICOLI" A "SALA STAMPA INTELLIGENTE"
═══════════════════════════════════════════════════════════════

Attualmente: NewsSection con grid di NewsCard.
Obiettivo: le news diventano il punto dove tutto si ricollega — ogni notizia è contestualizzata con dati dalle altre sezioni.

### A) NUOVA SEZIONE TOP: Weekly Intelligence Brief

File:
- src/components/news/WeeklyBriefBanner.jsx — banner in cima alla pagina (PRIMA della NewsSection), layout editoriale premium. Contiene:
  • Header: "Report Settimanale #N" + data range + badge "Latest" con glow neon-purple
  • Executive Summary: 3-4 highlight della settimana in formato compatto (icona + testo breve)
  • "Market Narrative": paragrafo che spiega la narrativa dominante della settimana
  • Mini metrics table: BTC dominance, market cap, DeFi TVL, Fear & Greed (dati da CryptoDataContext)
  • "Top Whale Moves": i 3 movimenti whale più significativi della settimana
  • "Prossima settimana": 2-3 eventi/unlock chiave in arrivo
  • Navigazione archivio: frecce per settimane precedenti
- src/data/briefData.js — mock di 3 settimane di report, bilingue. Collega dati da whaleData, events, unlockData, regulationData
- Commenti // TODO: AI-generated content integration

### B) ARRICCHISCI NewsCard (modifica componente esistente)

Aggiungi a ogni NewsCard:
- "Token correlati": badge piccoli dei token menzionati/impattati dalla news (con logo e variazione prezzo)
- "Impatto": icona piccola colorata (🟢 bullish, 🟡 neutro, 🔴 bearish)
- Collegamento: cliccando un token badge → redirect a /crypto e apri TokenDetailModal di quel token

Modifica src/data/news.js per aggiungere a ogni news: relatedCoins: ['ethereum', 'solana'], impact: 'bullish'|'bearish'|'neutral'

### C) NUOVA SEZIONE: "Azioni da Considerare" (SOTTO la grid news)

File:
- src/components/news/ActionInsights.jsx — GlassCard variant="purple" grande con titolo "Cosa tenere d'occhio" / "What to Watch"
- Genera 4-5 insight contestuali dalla combinazione di dati recenti, per esempio:
  • "🐋 Le whale stanno accumulando ETH (3 transazioni >$10M in 48h) mentre il sentiment è a 72 (Avidità)" → collegamento a /crypto ETH detail
  • "🔓 Unlock SOL del 3.2% supply tra 5 giorni — storicamente il prezzo è sceso del -4.8% nei 7 giorni successivi" → collegamento a /eventi
  • "📜 L'UE ha finalizzato MiCA — possibile impatto positivo su token regolamentati come LINK e AAVE" → collegamento a token
  • "📊 Correlazione BTC-ETH ai minimi di 90 giorni (0.61) — possibile opportunità di diversificazione" → collegamento a /mercato
- Ogni insight: icona, testo bilingue, tag token coinvolti, link alla sezione rilevante
- Disclaimer: "Questi insight sono generati automaticamente da dati pubblici. Non costituiscono consulenza finanziaria."
- src/data/actionInsightsData.js — 5-6 insight mock predefiniti

Ordine sezioni finale in NewsPage.jsx:
1. PageHero
2. WeeklyBriefBanner
3. NewsSection (arricchita con token correlati e impatto)
4. ActionInsights

═══════════════════════════════════════════════════════════════
HOME (/) — DA "SOLO HERO" A "DASHBOARD DI BENVENUTO"
═══════════════════════════════════════════════════════════════

Attualmente: solo HeroSection.
Obiettivo: la home dà un assaggio di tutto, invitando l'utente a esplorare ogni pagina.

### Aggiungi SOTTO HeroSection in HomePage.jsx:

File:
- src/components/home/MarketOverviewBar.jsx — barra glass orizzontale: Total Market Cap, BTC Dominance, 24h Change, Fear & Greed (tutti da CryptoDataContext con AnimatedNumber). Stile compatto, font piccolo, sfondo glass.
- src/components/home/TrendingBar.jsx — barra scrollabile: top 5 crypto per variazione 24h (da coins ordinati per price_change_percentage_24h). Mini card con logo + nome + variazione colorata. Animazione marquee.
- Aggiorna src/components/home/HomePreviewsGrid.jsx (esiste già) — card preview per ogni sezione del sito:
  • "Crypto" → mostra top 3 crypto con mini prezzo + variazione. CTA "Esplora tutte →"
  • "Mercato" → Fear & Greed gauge mini + market cap. CTA "Analizza il mercato →"
  • "Eventi" → prossimi 2 eventi in arrivo con countdown giorni. CTA "Vedi tutti gli eventi →"
  • "News" → titolo dell'ultima news + impact badge. CTA "Leggi le news →"
  Ogni card è GlassCard con brandColors appropriati.
- Mostra Footer anche nella home: in Layout.jsx rimuovi la condizione `{!isHome && <Footer />}` e metti semplicemente `<Footer />`

═══════════════════════════════════════════════════════════════
CROSS-CUTTING: ALERT CENTER + NAVBAR + MICRO-INTERAZIONI
═══════════════════════════════════════════════════════════════

### ALERT CENTER (campanella nella Navbar)

File:
- src/components/alerts/AlertBell.jsx — icona 🔔 nella Navbar (accanto al LIVE indicator) con badge counter (pallino neon-red). Click apre dropdown panel.
- src/components/alerts/AlertPanel.jsx — panel dropdown motion AnimatePresence: tab "Attivi"/"Cronologia", lista alert con toggle on/off
- src/components/alerts/AlertCreateForm.jsx — form per creare alert: tipo (Prezzo/Whale/Unlock/Sentiment) + parametri. Dropdown token da COIN_IDS + cryptoMeta.
- src/components/alerts/AlertNotification.jsx — toast notification (fixed bottom-right, auto-dismiss 4s) per alert triggerati
- src/contexts/AlertContext.jsx — NUOVO context. State: alerts[], notifications[], addAlert, removeAlert, toggleAlert. Provider in main.jsx.
- src/data/alertMockData.js — 5 alert esempio + 10 notifiche passate

Integra in Navbar.jsx: aggiungi <AlertBell /> nel div delle actions, prima del LIVE indicator.

### COMMAND PALETTE (Cmd+K)

File:
- src/components/ui/CommandPalette.jsx — modal con input di ricerca (motion AnimatePresence). Filtra: tutte le crypto da cryptoMeta.js (con logo, nome, ticker) + pagine del sito. Selezionando una crypto → naviga a /crypto e apri TokenDetailModal. Selezionando una pagina → naviga.
- Registra listener keyboard in Layout.jsx: Cmd+K (Mac) / Ctrl+K (Win) apre il modal.

### ANIMATED NUMBER

File:
- src/components/ui/AnimatedNumber.jsx — componente che anima il conteggio da valore precedente a nuovo valore. Props: value, formatFn, duration. Usa motion con animate.
- Usalo in: MarketStatCard, MarketOverviewBar, FearGreedGauge value, e ovunque ci siano numeri che cambiano.

### TOAST SYSTEM

File:
- src/components/ui/Toast.jsx — toast riutilizzabile: icona + messaggio + auto-dismiss. Position fixed bottom-right. Varianti: success (neon-green), info (neon-cyan), warning (neon-amber), error (neon-red).
- Usalo per: "Alert creato", "Holding aggiunto al portfolio", etc.

### FOOTER UPGRADE

Modifica src/components/layout/Footer.jsx:
- 3 colonne: "Esplora" (link a /crypto, /mercato, /eventi, /news), "Risorse" (API, Docs, GitHub — link fittizi), "Legale" (Terms, Privacy)
- Disclaimer bilingue: "Le informazioni su CryptoInsight sono a scopo informativo. Non costituiscono consulenza finanziaria."
- Copyright con anno dinamico: `© ${new Date().getFullYear()} CryptoInsight`

═══════════════════════════════════════════════════════════════
FLUSSO UTENTE — IL CICLO CONTINUO
═══════════════════════════════════════════════════════════════

Ogni elemento deve collegare alle altre sezioni. Ecco il flusso:

HOME → overview rapido → CTA verso ogni pagina
  ↓
CRYPTO → esplora token → clicca per detail con narrative + sentiment + health + whale + unlock
  ↓ (il detail mostra "Prossimo unlock tra 5 giorni" → link a /eventi)
  ↓ (il detail mostra "Whale accumulating" → link a /mercato whale feed)
MERCATO → stato globale → whale feed → correlazioni → il tuo portfolio → scenario simulator
  ↓ (whale feed: "click su ETH per dettagli" → link a /crypto ETH detail)
  ↓ (portfolio tips: "diversifica in DeFi" → link a /crypto con filtro DeFi)
EVENTI → timeline unificata → unlock con impatto storico → mappa regolamentazione
  ↓ (click su token impattato → link a /crypto detail)
  ↓ (regulation update → "impatta LINK e AAVE" → link a /crypto)
NEWS → weekly brief → news arricchite con token → "Azioni da considerare"
  ↓ (action insight: "whale accumulano ETH" → link a /mercato whale feed)
  ↓ (action insight: "unlock SOL" → link a /eventi)
  ↓ (token badge in news → link a /crypto detail)
  → torna a HOME

OGNI collegamento usa <Link to="/path"> di react-router. Per aprire TokenDetailModal da un'altra pagina, salva il coinId target in un piccolo context (o URL search param ?detail=ethereum) e CryptoPage lo legge per aprire automaticamente il modal.

═══════════════════════════════════════════════════════════════
CONTEXT PROVIDERS FINALI (main.jsx)
═══════════════════════════════════════════════════════════════

Aggiungi i nuovi provider in main.jsx wrappando come gli esistenti:
- PortfolioContext.Provider (per portfolio data condiviso tra mercato e scenario)
- AlertContext.Provider (per alert e notifiche)

Ordine nesting:
BrowserRouter > PaletteCycleProvider > LanguageProvider > CurrencyProvider > CryptoDataProvider > PortfolioProvider > AlertProvider > App

═══════════════════════════════════════════════════════════════
TRADUZIONI
═══════════════════════════════════════════════════════════════

Aggiungi TUTTE le nuove stringhe a translations.js raggruppate con commenti:
// Token Detail Modal
// Sentiment
// Health Score
// Whale Tracker
// Unlock Calendar
// Regulation Map
// Portfolio X-Ray
// Scenario Simulator
// Weekly Brief
// Action Insights
// Alert Center
// Command Palette
// Home enhancements
// Footer

═══════════════════════════════════════════════════════════════
CHECKLIST PRIMA DI FINIRE
═══════════════════════════════════════════════════════════════

□ Nessuna nuova route — tutto integrato in /, /crypto, /mercato, /eventi, /news
□ TokenDetailModal funzionante con click su CryptoCard E con deep link da altre pagine
□ Tutti i cross-link tra pagine funzionano (token badge → crypto detail, whale → mercato, unlock → eventi)
□ AnimatedNumber usato su tutti i numeri dinamici
□ Tutti i componenti: loading (SkeletonLoader), errore, vuoto
□ Tutte le stringhe con t() e traduzione it/en
□ Mobile: modal scrollabile, correlation matrix scrollabile, form touch-friendly
□ Context providers: CryptoData, Currency, Language, PaletteCycle, Portfolio, Alert
□ AlertBell nella Navbar, CommandPalette con Cmd+K in Layout
□ Footer visibile su TUTTE le pagine (inclusa home)
□ Design coerente: stessi border-radius, colori neon, glassmorphism, animazioni
□ Nessuna nuova dipendenza npm
□ Commenti // TODO: Replace with API call dove servono dati reali
□ Disclaimer "Non consulenza finanziaria" nel Footer e in ActionInsights e ScenarioSimulator
```
