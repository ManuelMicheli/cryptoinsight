// Alert System mock data
// TODO: Push notifications integration

export const defaultAlerts = [
  {
    id: 'alert-1',
    type: 'price',
    coinId: 'ethereum',
    params: { direction: 'above', threshold: 3500 },
    active: true,
    createdAt: '2026-02-25T10:00:00Z',
  },
  {
    id: 'alert-2',
    type: 'whale',
    coinId: 'solana',
    params: { minValueUsd: 20000000 },
    active: true,
    createdAt: '2026-02-24T14:30:00Z',
  },
  {
    id: 'alert-3',
    type: 'unlock',
    coinId: 'sui',
    params: { daysBeforeUnlock: 7 },
    active: true,
    createdAt: '2026-02-20T09:00:00Z',
  },
  {
    id: 'alert-4',
    type: 'sentiment',
    coinId: 'solana',
    params: { direction: 'below', threshold: 40 },
    active: false,
    createdAt: '2026-02-18T16:45:00Z',
  },
  {
    id: 'alert-5',
    type: 'regulation',
    coinId: null,
    params: { regions: ['US', 'EU'] },
    active: true,
    createdAt: '2026-02-15T11:20:00Z',
  },
  {
    id: 'alert-6',
    type: 'price',
    coinId: 'cardano',
    params: { direction: 'below', threshold: 0.45 },
    active: true,
    createdAt: '2026-02-14T08:00:00Z',
  },
]

export const pastNotifications = [
  {
    id: 'notif-1',
    alertId: 'alert-1',
    type: 'price',
    message: {
      it: 'ETH ha superato la soglia di $3,500 — attualmente a $3,512.40',
      en: 'ETH crossed the $3,500 threshold — currently at $3,512.40',
    },
    timestamp: '2026-02-28T18:45:00Z',
    read: false,
  },
  {
    id: 'notif-2',
    alertId: 'alert-2',
    type: 'whale',
    message: {
      it: 'Movimento whale rilevato: Jump Trading ha spostato 250K SOL ($33.7M) su Binance',
      en: 'Whale movement detected: Jump Trading moved 250K SOL ($33.7M) to Binance',
    },
    timestamp: '2026-02-28T17:50:00Z',
    read: false,
  },
  {
    id: 'notif-3',
    alertId: 'alert-5',
    type: 'regulation',
    message: {
      it: 'Aggiornamento normativo: la SEC ha approvato il framework per la regolamentazione dei DEX',
      en: 'Regulatory update: the SEC approved the framework for DEX regulation',
    },
    timestamp: '2026-02-27T15:30:00Z',
    read: true,
  },
  {
    id: 'notif-4',
    alertId: 'alert-3',
    type: 'unlock',
    message: {
      it: 'Unlock SUI tra 7 giorni: 65M token (6.2% supply) il 15 marzo 2026',
      en: 'SUI unlock in 7 days: 65M tokens (6.2% supply) on March 15, 2026',
    },
    timestamp: '2026-02-27T09:00:00Z',
    read: true,
  },
  {
    id: 'notif-5',
    alertId: 'alert-2',
    type: 'whale',
    message: {
      it: 'Movimento whale rilevato: Wintermute ha trasferito 150K SOL ($20.2M) per Market Making',
      en: 'Whale movement detected: Wintermute transferred 150K SOL ($20.2M) for Market Making',
    },
    timestamp: '2026-02-26T14:55:00Z',
    read: true,
  },
  {
    id: 'notif-6',
    alertId: 'alert-6',
    type: 'price',
    message: {
      it: 'ADA è sceso sotto la soglia di $0.45 — attualmente a $0.438',
      en: 'ADA dropped below the $0.45 threshold — currently at $0.438',
    },
    timestamp: '2026-02-25T22:10:00Z',
    read: true,
  },
  {
    id: 'notif-7',
    alertId: 'alert-4',
    type: 'sentiment',
    message: {
      it: 'Il sentiment di SOL è sceso sotto 40: attualmente a 38. Zona di paura.',
      en: 'SOL sentiment dropped below 40: currently at 38. Fear zone.',
    },
    timestamp: '2026-02-24T11:30:00Z',
    read: true,
  },
  {
    id: 'notif-8',
    alertId: 'alert-5',
    type: 'regulation',
    message: {
      it: 'Aggiornamento normativo UE: pubblicata la bozza finale del MiCA fase 2',
      en: 'EU regulatory update: MiCA phase 2 final draft published',
    },
    timestamp: '2026-02-23T10:00:00Z',
    read: true,
  },
  {
    id: 'notif-9',
    alertId: 'alert-1',
    type: 'price',
    message: {
      it: 'ETH ha superato la soglia di $3,500 — attualmente a $3,508.15',
      en: 'ETH crossed the $3,500 threshold — currently at $3,508.15',
    },
    timestamp: '2026-02-22T16:20:00Z',
    read: true,
  },
  {
    id: 'notif-10',
    alertId: 'alert-2',
    type: 'whale',
    message: {
      it: 'Movimento whale rilevato: Galaxy Digital ha accumulato 500K LINK ($9.1M) in cold wallet',
      en: 'Whale movement detected: Galaxy Digital accumulated 500K LINK ($9.1M) in cold wallet',
    },
    timestamp: '2026-02-21T13:45:00Z',
    read: true,
  },
]

export const alertTypeConfig = {
  price: {
    icon: '💰',
    color: 'neon-cyan',
    label: { it: 'Prezzo', en: 'Price' },
  },
  whale: {
    icon: '🐋',
    color: 'neon-purple',
    label: { it: 'Whale', en: 'Whale' },
  },
  unlock: {
    icon: '🔓',
    color: 'neon-amber',
    label: { it: 'Unlock', en: 'Unlock' },
  },
  sentiment: {
    icon: '📊',
    color: 'neon-green',
    label: { it: 'Sentiment', en: 'Sentiment' },
  },
  regulation: {
    icon: '⚖️',
    color: 'neon-red',
    label: { it: 'Regolamentazione', en: 'Regulation' },
  },
}
