# 🔤 CryptoInsight — Typography System Responsive

> Sistema tipografico fluido basato su `clamp()` con formula lineare precisa. Sostituisce i breakpoint manuali (`text-sm md:text-lg lg:text-xl`) con scaling continuo tra 320px e 1920px.

---

## Formula usata

```
clamp(MIN, PREFERRED, MAX)

dove PREFERRED = intercept + slope × 100vw
  slope     = (MAX − MIN) / (1920 − 320) = (MAX − MIN) / 1600
  intercept = MIN − slope × 320
```

**Line-height:** calcolata inversamente al font-size — più grande il testo, più stretto il leading.

---

## Prompt per integrare

```
Devo sostituire l'intero sistema tipografico di CryptoInsight con un approccio fluid responsive basato su clamp(). Niente più breakpoint manuali per i font (niente text-sm md:text-lg lg:text-xl). Ogni dimensione scala fluidamente tra 320px (mobile) e 1920px (desktop).

═══════════════════════════════════════════════════════════
CONTESTO DEL PROGETTO
═══════════════════════════════════════════════════════════

- Tailwind CSS v4 con @theme tokens in src/index.css
- Font: Orbitron (--font-heading) per heading, Space Grotesk (--font-body) per body
- Dark mode su sfondo #0a0a0f — il testo deve restare leggibile anche nelle dimensioni più piccole
- Attualmente i componenti usano classi Tailwind (text-xs, text-sm, text-base, text-lg, text-xl, text-2xl, text-3xl, text-4xl, text-5xl, text-6xl, text-7xl, text-8xl) con breakpoint manuali (md:text-xl, lg:text-2xl)
- Ci sono 3 clamp() inline nel codice attuale: `style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}` in SectionHeading.jsx, NewsSection.jsx, ExploreNewsSection.jsx — ma la formula è imprecisa (5vw non è interpolazione lineare)

═══════════════════════════════════════════════════════════
STEP 1: AGGIUNGI LE CUSTOM PROPERTIES IN index.css
═══════════════════════════════════════════════════════════

Aggiungi dentro il blocco @theme di index.css queste variabili tipografiche. Ogni variabile usa clamp() con la formula lineare precisa:

slope = (max - min) / 1600
intercept = min - slope × 320 (espresso in rem, dove 1rem = 16px)

```css
@theme {
  /* ═══ Existing tokens (keep all) ═══ */
  /* ... tutti i --color-*, --font-*, --space-* esistenti ... */

  /* ═══ FLUID TYPOGRAPHY SCALE ═══
   * Formula: clamp(min, intercept + slope * 100vw, max)
   * Range: 320px → 1920px (1600px span)
   * Tutte le misure in rem (1rem = 16px)
   */

  /* ── Display: hero titles, numeri d'impatto ── */
  /* Hero main: 48px → 128px | line-height: 1.05 */
  --text-display-hero: clamp(3rem, 1.8rem + 5vw, 8rem);
  --leading-display-hero: 1.05;

  /* Display: page hero titles, section titles grandi: 40px → 80px | lh: 1.1 */
  --text-display: clamp(2.5rem, 1.5rem + 2.5vw, 5rem);
  --leading-display: 1.1;

  /* ── Headings ── */
  /* H1: section headings grandi: 32px → 64px | lh: 1.15 */
  --text-h1: clamp(2rem, 1.2rem + 2vw, 4rem);
  --leading-h1: 1.15;

  /* H2: section headings: 24px → 40px | lh: 1.2 */
  --text-h2: clamp(1.5rem, 1.1rem + 1vw, 2.5rem);
  --leading-h2: 1.2;

  /* H3: card titles, subsection headings: 20px → 32px | lh: 1.25 */
  --text-h3: clamp(1.25rem, 0.95rem + 0.75vw, 2rem);
  --leading-h3: 1.25;

  /* H4: small headings, stat labels: 16px → 24px | lh: 1.3 */
  --text-h4: clamp(1rem, 0.8rem + 0.5vw, 1.5rem);
  --leading-h4: 1.3;

  /* ── Body text ── */
  /* Body large: descriptions, hero subtitles: 16px → 22px | lh: 1.6 */
  --text-body-lg: clamp(1rem, 0.85rem + 0.375vw, 1.375rem);
  --leading-body-lg: 1.6;

  /* Body: paragraph text, card descriptions: 14px → 18px | lh: 1.6 */
  --text-body: clamp(0.875rem, 0.775rem + 0.25vw, 1.125rem);
  --leading-body: 1.6;

  /* Body small: secondary text, timestamps: 13px → 16px | lh: 1.55 */
  --text-body-sm: clamp(0.8125rem, 0.7375rem + 0.1875vw, 1rem);
  --leading-body-sm: 1.55;

  /* ── UI text ── */
  /* UI: buttons, nav links, badges, tabs: 13px → 15px | lh: 1.4 */
  --text-ui: clamp(0.8125rem, 0.7625rem + 0.125vw, 0.9375rem);
  --leading-ui: 1.4;

  /* UI small: labels, tags, metadata, RiskBadge: 11px → 13px | lh: 1.4 */
  --text-ui-sm: clamp(0.6875rem, 0.6375rem + 0.125vw, 0.8125rem);
  --leading-ui-sm: 1.4;

  /* Micro: rank numbers, ticker symbols, 10px → 12px | lh: 1.3 */
  --text-micro: clamp(0.625rem, 0.575rem + 0.125vw, 0.75rem);
  --leading-micro: 1.3;

  /* ── Special: numeri e metriche ── */
  /* Stat number: prezzi grandi, valori portfolio: 28px → 48px | lh: 1.1 */
  --text-stat: clamp(1.75rem, 1.25rem + 1.25vw, 3rem);
  --leading-stat: 1.1;

  /* Stat small: prezzi nelle card, percentuali: 18px → 24px | lh: 1.2 */
  --text-stat-sm: clamp(1.125rem, 0.975rem + 0.375vw, 1.5rem);
  --leading-stat-sm: 1.2;

  /* Stat micro: inline prices, ticker bar: 14px → 16px | lh: 1.2 */
  --text-stat-micro: clamp(0.875rem, 0.825rem + 0.125vw, 1rem);
  --leading-stat-micro: 1.2;
}
```

═══════════════════════════════════════════════════════════
STEP 2: CREA UTILITY CLASSES IN index.css
═══════════════════════════════════════════════════════════

Aggiungi dentro @layer components le classi di utilità tipografiche. Queste combinano font-size E line-height per garantire coerenza:

```css
@layer components {
  /* ═══ Existing component styles (keep all .glow-*, .glass, .panel-*, etc.) ═══ */

  /* ── Fluid Typography Utilities ── */

  /* Display */
  .typo-display-hero {
    font-size: var(--text-display-hero);
    line-height: var(--leading-display-hero);
  }
  .typo-display {
    font-size: var(--text-display);
    line-height: var(--leading-display);
  }

  /* Headings */
  .typo-h1 {
    font-size: var(--text-h1);
    line-height: var(--leading-h1);
  }
  .typo-h2 {
    font-size: var(--text-h2);
    line-height: var(--leading-h2);
  }
  .typo-h3 {
    font-size: var(--text-h3);
    line-height: var(--leading-h3);
  }
  .typo-h4 {
    font-size: var(--text-h4);
    line-height: var(--leading-h4);
  }

  /* Body */
  .typo-body-lg {
    font-size: var(--text-body-lg);
    line-height: var(--leading-body-lg);
  }
  .typo-body {
    font-size: var(--text-body);
    line-height: var(--leading-body);
  }
  .typo-body-sm {
    font-size: var(--text-body-sm);
    line-height: var(--leading-body-sm);
  }

  /* UI */
  .typo-ui {
    font-size: var(--text-ui);
    line-height: var(--leading-ui);
  }
  .typo-ui-sm {
    font-size: var(--text-ui-sm);
    line-height: var(--leading-ui-sm);
  }
  .typo-micro {
    font-size: var(--text-micro);
    line-height: var(--leading-micro);
  }

  /* Stats / Numbers */
  .typo-stat {
    font-size: var(--text-stat);
    line-height: var(--leading-stat);
  }
  .typo-stat-sm {
    font-size: var(--text-stat-sm);
    line-height: var(--leading-stat-sm);
  }
  .typo-stat-micro {
    font-size: var(--text-stat-micro);
    line-height: var(--leading-stat-micro);
  }
}
```

═══════════════════════════════════════════════════════════
STEP 3: MAPPA DI SOSTITUZIONE PER OGNI COMPONENTE
═══════════════════════════════════════════════════════════

Segui questa mappa per sostituire le classi Tailwind attuali con le nuove classi fluid. La colonna sinistra è ciò che trovi nel codice, la colonna destra è la sostituzione.

REGOLA FONDAMENTALE: rimuovi TUTTI i breakpoint manuali di font-size (md:text-*, lg:text-*). La classe fluid gestisce tutto da sola. Mantieni i breakpoint per layout (md:grid-cols-*, lg:px-*) e per altri stili (md:mb-*, lg:gap-*).

### GlowTitle.jsx (Hero principale — /)
```
PRIMA: className="... text-5xl sm:text-6xl md:text-7xl lg:text-8xl ..."
DOPO:  className="... typo-display-hero ..."

PRIMA: className="... text-lg sm:text-xl md:text-2xl ..."
DOPO:  className="... typo-body-lg ..."
```

### PageHero.jsx (Hero delle pagine interne)
```
PRIMA: className="... text-3xl sm:text-4xl md:text-5xl lg:text-6xl ..."
DOPO:  className="... typo-display ..."

PRIMA: className="... text-base sm:text-lg md:text-xl ..."
DOPO:  className="... typo-body-lg ..."
```

### SectionHeading.jsx
```
PRIMA: style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}
DOPO:  RIMUOVI lo style={{ }} e aggiungi className="... typo-h1 ..."
       (la classe typo-h1 già fa clamp(2rem, 1.2rem + 2vw, 4rem) con line-height 1.15)

PRIMA: className="... text-base md:text-lg ..."  (subtitle)
DOPO:  className="... typo-body-lg ..."
```

### NewsSection.jsx
```
PRIMA: style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}
DOPO:  className="... typo-h1 ..."  (rimuovi lo style inline)
```

### ExploreNewsSection.jsx
```
PRIMA: style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}
DOPO:  className="... typo-h1 ..."

PRIMA: className="... text-base md:text-lg ..."
DOPO:  className="... typo-body-lg ..."
```

### Navbar.jsx
```
PRIMA: className="font-heading text-sm font-semibold"  (logo)
DOPO:  className="font-heading typo-ui font-semibold"

PRIMA: className="... text-sm font-medium ..."  (nav links)
DOPO:  className="... typo-ui font-medium ..."

PRIMA: className="... text-xs font-bold ..."  (toggle labels IT/EN, USD/EUR)
DOPO:  className="... typo-ui-sm font-bold ..."

PRIMA: className="text-xs font-medium"  (LIVE label)
DOPO:  className="typo-ui-sm font-medium"

PRIMA: className="... text-base font-medium ..."  (mobile menu items)
DOPO:  className="... typo-body font-medium ..."
```

### CryptoCard.jsx
```
PRIMA: className="font-heading text-sm font-semibold ..."  (coin name)
DOPO:  className="font-heading typo-ui font-semibold ..."

PRIMA: className="text-text-secondary/80 text-xs ..."  (symbol)
DOPO:  className="text-text-secondary/80 typo-ui-sm ..."

PRIMA: className="text-text-secondary text-[10px]"  (rank)
DOPO:  className="text-text-secondary typo-micro"

PRIMA: className="font-heading text-lg md:text-xl font-bold ..."  (price)
DOPO:  className="font-heading typo-stat-sm font-bold ..."

PRIMA: className="text-text-secondary text-xs leading-relaxed ..."  (description)
DOPO:  className="text-text-secondary typo-ui-sm ..."
       (rimuovi leading-relaxed — il line-height è già gestito dalla classe)
```

### PriceChange.jsx
```
PRIMA: className="... text-sm md:text-base font-semibold ..."
DOPO:  className="... typo-body-sm font-semibold ..."

PRIMA: className="text-xs"  (arrow ▲▼)
DOPO:  className="typo-micro"

PRIMA: className="text-xs text-text-secondary ..."  (label)
DOPO:  className="typo-micro text-text-secondary ..."
```

### RiskBadge.jsx
```
PRIMA: className="... text-xs font-semibold ..."
DOPO:  className="... typo-ui-sm font-semibold ..."
```

### CategoryTabs.jsx
```
PRIMA: className="... text-sm md:text-base font-medium ..."
DOPO:  className="... typo-ui font-medium ..."
```

### DisclaimerBanner.jsx
```
PRIMA: className="... text-sm ..."
DOPO:  className="... typo-body-sm ..."
```

### EventCard.jsx
```
PRIMA: className="font-heading text-3xl md:text-4xl font-bold ..."  (day number)
DOPO:  className="font-heading typo-stat font-bold ..."

PRIMA: className="text-xs md:text-sm ..."  (month)
DOPO:  className="typo-ui-sm ..."

PRIMA: className="text-lg md:text-xl font-semibold ..."  (event title)
DOPO:  className="typo-h3 font-semibold ..."

PRIMA: className="... text-sm text-text-secondary"  (meta info)
DOPO:  className="... typo-body-sm text-text-secondary"

PRIMA: className="... text-xs md:text-sm"  (crypto badge)
DOPO:  className="... typo-ui-sm"

PRIMA: className="... text-sm md:text-base leading-relaxed"  (description)
DOPO:  className="... typo-body"
       (rimuovi leading-relaxed — gestito dalla classe)
```

### ImpactBadge.jsx
```
PRIMA: className="... text-xs font-medium ..."
DOPO:  className="... typo-ui-sm font-medium ..."
```

### MarketStatCard.jsx
```
Qualsiasi text-2xl o text-3xl per valori numerici:
DOPO:  typo-stat

Label/subtitle text-sm:
DOPO:  typo-body-sm
```

### FearGreedGauge.jsx
```
PRIMA: className="font-heading text-3xl font-bold"  (value number)
DOPO:  className="font-heading typo-stat font-bold"

PRIMA: className="text-text-secondary text-sm ..."  (classification label)
DOPO:  className="text-text-secondary typo-body-sm ..."

PRIMA: className="text-text-secondary text-xs ..."  (index label)
DOPO:  className="text-text-secondary typo-ui-sm ..."
```

### GainersLosers.jsx
```
PRIMA: className="text-sm font-semibold ..."  (symbol)
DOPO:  className="typo-body-sm font-semibold ..."

PRIMA: className="text-sm text-text-secondary"  (price)
DOPO:  className="typo-body-sm text-text-secondary"

PRIMA: className="text-sm font-bold ..."  (percentage)
DOPO:  className="typo-body-sm font-bold ..."

PRIMA: className="font-heading text-base ..."  (section title)
DOPO:  className="font-heading typo-h4 ..."
```

### HomePreviewsGrid.jsx
```
PRIMA: className="font-heading text-lg md:text-xl font-bold ..."
DOPO:  className="font-heading typo-h3 font-bold ..."

PRIMA: className="... text-sm md:text-base leading-relaxed"
DOPO:  className="... typo-body"
```

### Footer.jsx
```
PRIMA: className="font-heading text-neon-amber text-sm md:text-base ..."
DOPO:  className="font-heading text-neon-amber typo-ui ..."

PRIMA: className="text-text-secondary text-sm md:text-base leading-relaxed"
DOPO:  className="text-text-secondary typo-body"

PRIMA: className="font-heading text-neon-cyan text-xs"
DOPO:  className="font-heading text-neon-cyan typo-ui-sm"

PRIMA: className="... text-text-secondary text-sm"
DOPO:  className="... text-text-secondary typo-body-sm"
```

### PriceTicker.jsx (hero marquee)
```
PRIMA: className="text-sm font-medium ..."  (symbol, price)
DOPO:  className="typo-stat-micro font-medium ..."

PRIMA: className="text-xs font-medium ..."  (percentage)
DOPO:  className="typo-micro font-medium ..."
```

### CTAButton.jsx
```
PRIMA: className="... text-sm font-semibold ..."
DOPO:  className="... typo-ui font-semibold ..."
```

### BybitSection.jsx / BybitDashboard.jsx
```
text-2xl per valori → typo-stat-sm
text-lg per titoli → typo-h4
text-sm per body → typo-body-sm
text-xs per labels → typo-ui-sm
```

### ExploreNewsSection.jsx
```
PRIMA: className="font-heading text-2xl font-bold ..."  (circle card number)
DOPO:  className="font-heading typo-stat-sm font-bold ..."

PRIMA: className="font-heading text-[9px] ..."  (category label)
DOPO:  className="font-heading typo-micro ..."

PRIMA: className="text-xs font-bold ..."  (card title)
DOPO:  className="typo-ui-sm font-bold ..."

PRIMA: className="font-heading text-[10px] ..."  (section label)
DOPO:  className="font-heading typo-micro ..."

PRIMA: className="... text-xs font-semibold ..."  (CTA button)
DOPO:  className="... typo-ui-sm font-semibold ..."
```

═══════════════════════════════════════════════════════════
STEP 4: RIMUOVI TUTTI I BREAKPOINT DI FONT-SIZE RESIDUI
═══════════════════════════════════════════════════════════

Dopo le sostituzioni, fai un check globale: in NESSUN file .jsx ci devono essere pattern come:
- `text-sm md:text-base`
- `text-lg md:text-xl lg:text-2xl`
- `text-base sm:text-lg`
- `style={{ fontSize: 'clamp(...)' }}`

Ogni font-size deve essere gestito SOLO dalle classi typo-* o direttamente dalle variabili CSS --text-*.

Eccezioni ammesse:
- Nessuna. Anche i testi più piccoli come [10px] vanno sostituiti con typo-micro.

═══════════════════════════════════════════════════════════
STEP 5: VERIFICA LINE-HEIGHT
═══════════════════════════════════════════════════════════

Rimuovi tutti i `leading-relaxed`, `leading-snug`, `leading-tight`, `leading-normal` dai componenti dove hai applicato classi typo-*. Il line-height è già incluso nella classe e ottimizzato per quel range di dimensioni:

| Classe            | Line-height | Ragione                                     |
|-------------------|-------------|---------------------------------------------|
| typo-display-hero | 1.05        | Testo enorme: massima compattezza            |
| typo-display      | 1.1         | Grande: quasi compact                        |
| typo-h1           | 1.15        | Heading grosso: leggero respiro              |
| typo-h2           | 1.2         | Heading medio: bilanciato                    |
| typo-h3           | 1.25        | Heading piccolo: più aria                    |
| typo-h4           | 1.3         | Heading tiny: transizione verso body         |
| typo-body-lg      | 1.6         | Paragrafo grande: massima leggibilità        |
| typo-body         | 1.6         | Paragrafo standard: comfort di lettura       |
| typo-body-sm      | 1.55        | Paragrafo piccolo: leggermente più stretto   |
| typo-ui           | 1.4         | Bottoni/nav: compatto ma leggibile           |
| typo-ui-sm        | 1.4         | Labels/badge: compatto                       |
| typo-micro        | 1.3         | Metadata: minimo necessario                  |
| typo-stat         | 1.1         | Numeri grossi: impatto visivo, no aria extra |
| typo-stat-sm      | 1.2         | Numeri medi: leggero respiro                 |
| typo-stat-micro   | 1.2         | Numeri piccoli inline                        |

Eccezione: se un testo specifico ha bisogno di un line-height diverso per ragioni di layout (es. testo in uno spazio molto ristretto), puoi sovrascrivere con la classe Tailwind leading-* DOPO la classe typo-*.

═══════════════════════════════════════════════════════════
STEP 6: FLUID SPACING (BONUS)
═══════════════════════════════════════════════════════════

Per coerenza con la typography fluida, aggiorna anche i --space-* token in @theme per usare clamp:

```css
  --space-xs: clamp(6px, 4px + 0.25vw, 10px);
  --space-sm: clamp(12px, 8px + 0.5vw, 20px);
  --space-md: clamp(18px, 12px + 0.75vw, 30px);
  --space-lg: clamp(24px, 16px + 1vw, 40px);
  --space-xl: clamp(36px, 24px + 1.5vw, 60px);
  --space-2xl: clamp(48px, 32px + 2vw, 80px);
  --space-3xl: clamp(60px, 40px + 2.5vw, 100px);
  --space-4xl: clamp(72px, 48px + 3vw, 120px);
  --container-padding: clamp(16px, 8px + 2vw, 48px);
```

Questo è opzionale — applica solo se non rompe layout esistenti. Se preferisci, lascia gli spacing fissi e cambia solo la typography.

═══════════════════════════════════════════════════════════
CHECKLIST FINALE
═══════════════════════════════════════════════════════════

□ Variabili --text-* e --leading-* aggiunte in @theme
□ Classi .typo-* aggiunte in @layer components
□ TUTTI i componenti migrati (vedi mappa Step 3)
□ ZERO breakpoint di font-size residui (niente text-sm md:text-lg)
□ ZERO style={{ fontSize: 'clamp(...)' }} inline residui
□ ZERO leading-relaxed/snug/tight su elementi con classe typo-*
□ Verifica visiva: hero a 320px → testo leggibile, a 1920px → testo d'impatto
□ Verifica che Orbitron (font-heading) e Space Grotesk (font-body) funzionino correttamente con le nuove dimensioni
□ Testa la pagina /crypto con le card: il prezzo, il nome e la description devono scalare fluidamente
□ Testa la pagina /mercato: i numeri grandi nel FearGreedGauge e MarketStatCard devono avere impatto visivo su desktop e restare leggibili su mobile
```
