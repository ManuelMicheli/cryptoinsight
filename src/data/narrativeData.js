// Narrative Engine — "Perché si muove" mock data
// TODO: Replace with API call

export const narrativeData = [
  {
    coinId: 'ethereum',
    priceChange: +5.2,
    timeframe: '24h',
    events: [
      {
        type: 'regolamentazione',
        title: { it: 'SEC approva ETF Ethereum spot', en: 'SEC approves spot Ethereum ETF' },
        source: 'Bloomberg',
        timestamp: '2026-02-28T14:30:00Z',
        impactScore: 'high',
      },
      {
        type: 'whale',
        title: { it: 'Whale accumula 45.000 ETH da Coinbase', en: 'Whale accumulates 45,000 ETH from Coinbase' },
        source: 'Whale Alert',
        timestamp: '2026-02-28T12:15:00Z',
        impactScore: 'medium',
      },
      {
        type: 'unlock',
        title: { it: 'Staking rewards distribuiti su Beacon Chain', en: 'Staking rewards distributed on Beacon Chain' },
        source: 'Etherscan',
        timestamp: '2026-02-28T08:00:00Z',
        impactScore: 'low',
      },
    ],
    sparkline: [2620, 2635, 2650, 2680, 2710, 2740, 2720, 2755, 2790, 2810, 2835, 2860, 2845, 2880, 2910, 2930, 2955, 2940, 2970, 2990, 3010, 3025, 3040, 3060],
  },
  {
    coinId: 'solana',
    priceChange: -4.8,
    timeframe: '24h',
    events: [
      {
        type: 'tweet',
        title: { it: 'Vitalik critica la centralizzazione dei validatori Solana', en: 'Vitalik criticizes Solana validator centralization' },
        source: 'X / Twitter',
        timestamp: '2026-02-28T16:00:00Z',
        impactScore: 'medium',
      },
      {
        type: 'regolamentazione',
        title: { it: 'SEC avvia indagine sui token Solana DeFi', en: 'SEC launches investigation into Solana DeFi tokens' },
        source: 'Reuters',
        timestamp: '2026-02-28T10:30:00Z',
        impactScore: 'high',
      },
      {
        type: 'whale',
        title: { it: 'Whale sposta 500K SOL verso exchange', en: 'Whale moves 500K SOL to exchanges' },
        source: 'Whale Alert',
        timestamp: '2026-02-28T09:00:00Z',
        impactScore: 'high',
      },
    ],
    sparkline: [145, 143, 141, 139, 137, 140, 138, 136, 134, 132, 135, 133, 131, 129, 130, 128, 131, 129, 127, 128, 130, 129, 131, 133],
  },
  {
    coinId: 'cardano',
    priceChange: +3.4,
    timeframe: '24h',
    events: [
      {
        type: 'regolamentazione',
        title: { it: 'Partnership Cardano con governo etiope rinnovata', en: 'Cardano partnership with Ethiopian government renewed' },
        source: 'CoinDesk',
        timestamp: '2026-02-28T11:00:00Z',
        impactScore: 'medium',
      },
      {
        type: 'tweet',
        title: { it: 'Charles Hoskinson annuncia roadmap Voltaire', en: 'Charles Hoskinson announces Voltaire roadmap' },
        source: 'X / Twitter',
        timestamp: '2026-02-27T20:00:00Z',
        impactScore: 'medium',
      },
      {
        type: 'unlock',
        title: { it: 'Rilascio fondi treasury per sviluppo ecosistema', en: 'Treasury funds released for ecosystem development' },
        source: 'Cardano Forum',
        timestamp: '2026-02-27T15:00:00Z',
        impactScore: 'low',
      },
    ],
    sparkline: [0.42, 0.43, 0.44, 0.43, 0.45, 0.46, 0.45, 0.47, 0.48, 0.47, 0.49, 0.48, 0.50, 0.49, 0.51, 0.50, 0.52, 0.51, 0.53, 0.52, 0.54, 0.53, 0.55, 0.54],
  },
  {
    coinId: 'chainlink',
    priceChange: +7.1,
    timeframe: '24h',
    events: [
      {
        type: 'regolamentazione',
        title: { it: 'SWIFT conferma integrazione CCIP per pagamenti cross-border', en: 'SWIFT confirms CCIP integration for cross-border payments' },
        source: 'The Block',
        timestamp: '2026-02-28T13:00:00Z',
        impactScore: 'high',
      },
      {
        type: 'whale',
        title: { it: 'Wallet istituzionale accumula 2M LINK', en: 'Institutional wallet accumulates 2M LINK' },
        source: 'Lookonchain',
        timestamp: '2026-02-28T11:30:00Z',
        impactScore: 'medium',
      },
      {
        type: 'tweet',
        title: { it: 'Sergey Nazarov presenta CCIP v2 a ETHDenver', en: 'Sergey Nazarov presents CCIP v2 at ETHDenver' },
        source: 'X / Twitter',
        timestamp: '2026-02-28T09:45:00Z',
        impactScore: 'medium',
      },
      {
        type: 'regolamentazione',
        title: { it: 'Banca d\'Italia testa oracoli Chainlink per CBDC', en: 'Bank of Italy tests Chainlink oracles for CBDC' },
        source: 'CoinTelegraph',
        timestamp: '2026-02-27T18:00:00Z',
        impactScore: 'high',
      },
    ],
    sparkline: [14.2, 14.5, 14.8, 15.0, 15.3, 15.1, 15.5, 15.8, 16.0, 15.7, 16.2, 16.5, 16.3, 16.7, 17.0, 16.8, 17.2, 17.5, 17.3, 17.6, 17.9, 18.1, 18.0, 18.3],
  },
  {
    coinId: 'fetch-ai',
    priceChange: +12.6,
    timeframe: '24h',
    events: [
      {
        type: 'tweet',
        title: { it: 'NVIDIA menziona Fetch.ai nella keynote GTC', en: 'NVIDIA mentions Fetch.ai in GTC keynote' },
        source: 'X / Twitter',
        timestamp: '2026-02-28T17:00:00Z',
        impactScore: 'high',
      },
      {
        type: 'regolamentazione',
        title: { it: 'UE include AI decentralizzata nel framework regolatorio', en: 'EU includes decentralized AI in regulatory framework' },
        source: 'Financial Times',
        timestamp: '2026-02-28T14:00:00Z',
        impactScore: 'medium',
      },
      {
        type: 'whale',
        title: { it: 'Smart money accumula FET pre-annuncio partnership', en: 'Smart money accumulates FET pre-partnership announcement' },
        source: 'Nansen',
        timestamp: '2026-02-28T06:00:00Z',
        impactScore: 'high',
      },
    ],
    sparkline: [1.10, 1.12, 1.15, 1.18, 1.22, 1.20, 1.25, 1.28, 1.32, 1.35, 1.30, 1.38, 1.42, 1.45, 1.40, 1.48, 1.52, 1.55, 1.50, 1.58, 1.62, 1.65, 1.60, 1.68],
  },
]
