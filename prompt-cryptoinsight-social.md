# Prompt — CryptoInsight: Sezione "Social"

## Obiettivo

Aggiungi una nuova sezione **"Social"** al progetto CryptoInsight. Questa sezione aggrega e mostra video social (YouTube, X/Twitter, TikTok) dei principali crypto influencer e broker **reali, indipendenti e con comprovata credibilità** nel settore crypto/blockchain.

---

## Requisiti Generali

### Filosofia della sezione
- **Solo persone reali** — Nessun canale corporate, nessun brand, nessun progetto che promuove il proprio token.
- **Zero Ads / Zero Shill** — Escludi chiunque sia noto per promuovere progetti a pagamento senza disclosure, pump & dump schemes, o contenuti sponsorizzati mascherati da analisi.
- **Etica e trasparenza** — Includi solo creator che dichiarano conflitti di interesse, non promettono guadagni certi, e hanno un track record verificabile di analisi oneste (anche quando sbagliano).
- **Diversità di opinione** — Non solo bull, non solo bear. La sezione deve rappresentare prospettive diverse per dare all'utente una visione equilibrata.

---

## Categorie / Tab di navigazione

### 1. 📅 Tutti (Cronologico)
- Feed unificato di tutti i video in ordine di pubblicazione (più recente prima)
- Infinite scroll o paginazione
- Ogni card mostra: thumbnail, titolo, creator, piattaforma (YT/X/TikTok), data, durata, views
- Filtri laterali: piattaforma, creator, periodo temporale, lingua

### 2. 🔥 Più Visti
- Classifica dei video con più visualizzazioni negli ultimi 7 / 30 / 90 giorni
- Ordinamento per views totali o velocity (views/ora nelle prime 24h)
- Badge "Trending" per video con crescita anomala

### 3. 👑 Più Influenti
- Classifica basata su un **Influence Score** composito:
  - Follower count cross-platform (peso 15%)
  - Engagement rate medio (peso 25%)
  - Frequenza di citazione da altri creator (peso 20%)
  - Accuratezza storica delle previsioni — sentiment vs prezzo reale a 7/30 giorni (peso 30%)
  - Longevità nel settore — anni di attività (peso 10%)
- Mostra il profilo del creator con i suoi ultimi video
- Aggiornamento settimanale dello score

### 4. 🎯 Più Probabili (Prediction Accuracy)
- **Questa è la sezione killer.** Classifica i creator in base all'accuratezza delle loro previsioni.
- Sistema di tracking:
  - Analizza i video con NLP/AI per estrarre **claim predittivi** (es. "BTC raggiungerà 100k entro fine mese")
  - Registra il claim con: data, asset, target price, timeframe, direzione (bull/bear)
  - Al termine del timeframe, confronta con il prezzo reale
  - Calcola un **Prediction Score** (% di previsioni corrette con margine di tolleranza ±5%)
- Mostra per ogni creator:
  - Prediction Score totale e per asset
  - Ultime 10 previsioni con esito (✅ corretta / ❌ errata / ⏳ in corso)
  - Trend dell'accuratezza nel tempo (grafico)
- I creator con Prediction Score < 30% vengono segnalati con un avviso

---

## Whitelist Iniziale di Creator (Seed List)

Questi sono creator noti per la loro indipendenza, trasparenza e competenza. La lista deve essere espandibile e verificata periodicamente.

### Tier 1 — Analisti Tecnici & On-Chain
| Creator | Piattaforma Principale | Focus |
|---|---|---|
| Benjamin Cowen | YouTube | Analisi ciclica, macro, on-chain |
| Willy Woo | X/Twitter | Analisi on-chain, metriche Bitcoin |
| Will Clemente | X/Twitter, YouTube | On-chain analytics, Bitcoin |
| James Check (Checkmate) | YouTube, X | Glassnode lead analyst, on-chain |
| InvestAnswers | YouTube | Analisi quantitativa, modelli matematici |
| DataDash (Nicholas Merten) | YouTube | Analisi tecnica, macro |

### Tier 2 — Educatori & Commentatori Indipendenti
| Creator | Piattaforma Principale | Focus |
|---|---|---|
| Coin Bureau (Guy Turner) | YouTube | Educazione, review progetti |
| Anthony Pompliano | YouTube, X | Macro Bitcoin, economia |
| Lyn Alden | X/Twitter, YouTube | Macro economia, Bitcoin |
| Raoul Pal | YouTube (Real Vision) | Macro, cicli di liquidità |
| Alessio Rastani | YouTube | Analisi tecnica, psicologia di mercato |

### Tier 3 — Trader & Analisti di Mercato
| Creator | Piattaforma Principale | Focus |
|---|---|---|
| Crypto Banter (Ran Neuner) | YouTube | Live trading, market commentary |
| Altcoin Daily | YouTube | Analisi altcoin, news |
| Ivan on Tech | YouTube | Tech analysis, sviluppo blockchain |
| Lark Davis | YouTube | Altcoin, DeFi |
| Michaël van de Poppe | YouTube, X | Trading, analisi tecnica |

### Criteri di Esclusione (Blacklist automatica)
- ❌ Canali che promuovono meme coin senza disclaimer
- ❌ Creator coinvolti in rug pull o scam verificati
- ❌ Chi promette rendimenti garantiti
- ❌ Chi non dichiara partnership/sponsorship
- ❌ Bot account o canali AI-generated senza persona reale
- ❌ Chiunque con cause legali pendenti per frode finanziaria

---

## Architettura Tecnica Suggerita

### Data Pipeline
```
[YouTube API / X API / TikTok API]
        │
        ▼
[Ingestion Service] ── cron ogni 15-30 min
        │
        ▼
[NLP Processing] ── estrazione claim, sentiment, topic tagging
        │
        ▼
[Database] ── video metadata, creator profiles, predictions
        │
        ▼
[Scoring Engine] ── calcolo Influence Score + Prediction Score (cron giornaliero)
        │
        ▼
[API Layer] ── REST/GraphQL endpoints per il frontend
        │
        ▼
[Frontend] ── React components con tabs, filtri, grafici
```

### Schema Database (tabelle principali)

```sql
-- Creator verificati
creators (
  id, name, slug, avatar_url, bio,
  youtube_channel_id, x_handle, tiktok_handle,
  influence_score, prediction_score,
  is_verified, tier, created_at, updated_at
)

-- Video importati
videos (
  id, creator_id, platform, platform_video_id,
  title, description, thumbnail_url, video_url,
  published_at, duration_seconds,
  view_count, like_count, comment_count,
  trending_velocity, language,
  created_at, updated_at
)

-- Previsioni estratte via NLP
predictions (
  id, video_id, creator_id,
  asset, direction (bull/bear/neutral),
  target_price, timeframe_days,
  claim_text, confidence_level,
  actual_price_at_deadline, outcome (correct/incorrect/pending),
  created_at, resolved_at
)

-- Score storici per grafici
creator_scores_history (
  id, creator_id, date,
  influence_score, prediction_score,
  follower_count, avg_engagement_rate
)
```

### Componenti Frontend

```
/social
├── SocialPage.tsx                    # Layout principale con tabs
├── components/
│   ├── VideoFeed.tsx                 # Feed cronologico con infinite scroll
│   ├── VideoCard.tsx                 # Card singolo video
│   ├── CreatorProfile.tsx            # Profilo creator con stats
│   ├── TrendingVideos.tsx            # Classifica più visti
│   ├── InfluencerRanking.tsx         # Classifica per influence score
│   ├── PredictionLeaderboard.tsx     # Classifica accuratezza previsioni
│   ├── PredictionCard.tsx            # Singola previsione con esito
│   ├── PredictionAccuracyChart.tsx   # Grafico trend accuratezza
│   ├── FilterSidebar.tsx             # Filtri (piattaforma, periodo, lingua)
│   └── CreatorBadge.tsx              # Badge (trending, top predictor, ecc.)
```

---

## UX / Design Guidelines

- **Dark theme** coerente con il resto di CryptoInsight
- Card video con hover effect che mostra preview/stats aggiuntive
- Color coding per le previsioni: verde (corretta), rosso (errata), giallo (in corso)
- Skeleton loading per i feed
- Responsive: su mobile le tab diventano swipeable
- Micro-animazioni sui badge e sugli score che cambiano
- Empty states informativi se non ci sono dati per un filtro

---

## Note Importanti

1. **Compliance**: Aggiungi sempre un disclaimer: "Le opinioni espresse nei video sono dei rispettivi creator e non costituiscono consulenza finanziaria."
2. **GDPR**: I dati dei creator sono pubblici (profili social pubblici), ma prevedi un meccanismo di opt-out se un creator richiede la rimozione.
3. **Rate Limiting API**: YouTube API ha limiti stretti (10.000 unità/giorno). Implementa caching aggressivo e aggiornamenti incrementali.
4. **Scalabilità**: Inizia con YouTube come piattaforma principale, poi espandi a X e TikTok.
5. **Community Curation**: In futuro, permetti agli utenti di segnalare nuovi creator da aggiungere (con review manuale).
