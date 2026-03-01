// Monthly Featured Crypto Rotation
// Each month highlights the most significant coins based on market narratives,
// upcoming catalysts, and market relevance for that period.

export const monthlyFeatured = {
  // Gennaio — Inizio anno, focus su blue-chip e narrativa AI
  1: [
    'ethereum', 'solana', 'ripple', 'chainlink', 'render-token', 'fetch-ai',
    'arbitrum', 'dogecoin', 'ondo-finance', 'bittensor',
  ],
  // Febbraio — Momentum DeFi e L2
  2: [
    'ethereum', 'solana', 'aave', 'uniswap', 'pendle', 'arbitrum',
    'optimism', 'lido-dao', 'sui', 'ondo-finance',
  ],
  // Marzo — AI e RWA narrative forti, meme season
  3: [
    'ethereum', 'solana', 'bittensor', 'render-token', 'fetch-ai', 'akash-network',
    'ondo-finance', 'mantra-dao', 'pepe', 'toncoin', 'pendle', 'sui',
  ],
  // Aprile — Alt season, L1 emergenti e gaming
  4: [
    'solana', 'sui', 'near', 'aptos', 'toncoin', 'immutable-x',
    'gala', 'bonk', 'arbitrum', 'render-token',
  ],
  // Maggio — Sell in May? Focus su qualita' e DeFi blue-chip
  5: [
    'ethereum', 'chainlink', 'aave', 'maker', 'lido-dao', 'polkadot',
    'cardano', 'ripple', 'uniswap', 'ondo-finance',
  ],
  // Giugno — Infrastructure e scalabilita'
  6: [
    'ethereum', 'matic-network', 'arbitrum', 'optimism', 'starknet',
    'chainlink', 'near', 'cosmos', 'polkadot', 'avalanche-2',
  ],
  // Luglio — Meme e community, TON ecosystem
  7: [
    'dogecoin', 'pepe', 'bonk', 'shiba-inu', 'toncoin',
    'solana', 'sui', 'gala', 'immutable-x', 'fetch-ai',
  ],
  // Agosto — AI narrative ripresa, DePIN
  8: [
    'bittensor', 'render-token', 'fetch-ai', 'akash-network',
    'solana', 'near', 'chainlink', 'pendle', 'ondo-finance', 'toncoin',
  ],
  // Settembre — Back to building, L2 e DeFi
  9: [
    'ethereum', 'arbitrum', 'optimism', 'aave', 'uniswap', 'maker',
    'lido-dao', 'starknet', 'matic-network', 'pendle',
  ],
  // Ottobre — Uptober, momentum generale
  10: [
    'ethereum', 'solana', 'sui', 'ripple', 'dogecoin',
    'render-token', 'bittensor', 'ondo-finance', 'mantra-dao', 'arbitrum',
  ],
  // Novembre — Bull run, alt season
  11: [
    'solana', 'sui', 'avalanche-2', 'near', 'aptos', 'pepe',
    'bonk', 'immutable-x', 'fetch-ai', 'toncoin', 'pendle', 'mantra-dao',
  ],
  // Dicembre — Year-end, blue-chip e RWA
  12: [
    'ethereum', 'solana', 'ripple', 'chainlink', 'aave',
    'ondo-finance', 'mantra-dao', 'maker', 'polkadot', 'cardano',
  ],
}

/**
 * Returns the featured coin IDs for the current month.
 */
export function getCurrentFeatured() {
  const month = new Date().getMonth() + 1
  return monthlyFeatured[month] || monthlyFeatured[1]
}
