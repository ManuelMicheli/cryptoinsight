export const API_URLS = {
  COINGECKO_BASE: 'https://api.coingecko.com/api/v3',
  FEAR_GREED: 'https://api.alternative.me/fng/?limit=1',
}

export const COIN_IDS = [
  'ethereum', 'solana', 'cardano', 'avalanche-2', 'sui',
  'ripple', 'chainlink', 'aave', 'uniswap', 'immutable-x',
  'the-sandbox', 'render-token', 'fetch-ai',
]

export const POLLING_INTERVALS = {
  CRYPTO_MARKETS: 120_000,
  GLOBAL_DATA: 120_000,
  FEAR_GREED: 300_000,
}

export const CATEGORIES = {
  all: 'catAll',
  'layer-1': 'catLayer1',
  payments: 'catPayments',
  defi: 'catDefi',
  gaming: 'catGaming',
  ai: 'catAi',
}

export const COLORS = {
  cyan: '#00f0ff',
  purple: '#8b5cf6',
  green: '#00ff88',
  amber: '#f59e0b',
  red: '#ef4444',
}
