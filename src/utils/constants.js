export const API_URLS = {
  COINGECKO_BASE: 'https://api.coingecko.com/api/v3',
  FEAR_GREED: 'https://api.alternative.me/fng/?limit=1',
}

export const COIN_IDS = [
  // Layer 1
  'ethereum', 'solana', 'cardano', 'avalanche-2', 'sui', 'polkadot', 'near', 'aptos', 'cosmos', 'toncoin',
  // Payments
  'ripple', 'stellar', 'litecoin',
  // DeFi
  'chainlink', 'aave', 'uniswap', 'maker', 'lido-dao', 'pendle',
  // Layer 2 / Infrastructure
  'matic-network', 'arbitrum', 'optimism', 'starknet',
  // Gaming / Metaverse
  'immutable-x', 'the-sandbox', 'axie-infinity', 'gala',
  // AI
  'render-token', 'fetch-ai', 'bittensor', 'akash-network',
  // Meme
  'dogecoin', 'shiba-inu', 'pepe', 'bonk',
  // RWA
  'ondo-finance', 'mantra-dao',
]

export const POLLING_INTERVALS = {
  CRYPTO_MARKETS: 120_000,
  GLOBAL_DATA: 120_000,
  FEAR_GREED: 300_000,
}

export const CATEGORIES = {
  all: 'catAll',
  featured: 'catFeatured',
  'layer-1': 'catLayer1',
  payments: 'catPayments',
  defi: 'catDefi',
  'layer-2': 'catLayer2',
  gaming: 'catGaming',
  ai: 'catAi',
  meme: 'catMeme',
  rwa: 'catRwa',
}

export const COLORS = {
  cyan: '#00f0ff',
  purple: '#8b5cf6',
  green: '#00ff88',
  amber: '#f59e0b',
  red: '#ef4444',
}
