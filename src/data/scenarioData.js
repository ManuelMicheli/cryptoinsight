// Beta coefficients (correlation to BTC) — model parameters, not live data
export const scenarioBetas = {
  ethereum: 1.15,
  solana: 1.45,
  cardano: 1.25,
  'avalanche-2': 1.35,
  sui: 1.55,
  ripple: 0.85,
  chainlink: 1.20,
  aave: 1.30,
  uniswap: 1.40,
  'immutable-x': 1.50,
  'the-sandbox': 1.60,
  'render-token': 1.35,
  'fetch-ai': 1.45,
}

// Fallback baseline (used only when live data is not yet loaded)
export const fallbackBaseline = {
  btcPrice: 65000,
  ethBtcRatio: 0.046,
  totalMarketCap: 2.5, // Trillion
  btcDominance: 52, // %
}

// Preset scenarios
export const scenarioPresets = {
  bullRun: {
    label: { it: 'Bull Run', en: 'Bull Run' },
    btcTarget: 150000,
    ethBtcRatio: 0.065,
    totalMarketCap: 8,
    btcDominance: 45,
  },
  bearMarket: {
    label: { it: 'Bear Market', en: 'Bear Market' },
    btcTarget: 35000,
    ethBtcRatio: 0.035,
    totalMarketCap: 1.2,
    btcDominance: 60,
  },
  ethFlippening: {
    label: { it: 'ETH Flippening', en: 'ETH Flippening' },
    btcTarget: 100000,
    ethBtcRatio: 0.12,
    totalMarketCap: 6,
    btcDominance: 35,
  },
  altSeason: {
    label: { it: 'Alt Season', en: 'Alt Season' },
    btcTarget: 80000,
    ethBtcRatio: 0.08,
    totalMarketCap: 5,
    btcDominance: 35,
  },
}
