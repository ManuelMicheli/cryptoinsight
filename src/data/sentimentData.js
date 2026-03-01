// Sentiment Score per Token mock data
// TODO: Replace with API call

const trend = (start, end, days) =>
  Array.from({ length: days }, (_, i) => Math.round(start + ((end - start) * i) / (days - 1) + (Math.random() - 0.5) * 4))

export const sentimentData = {
  // ─── LAYER 1 ──────────────────────────────────────────────
  ethereum: {
    score: 72,
    trend7d: [65, 67, 68, 70, 69, 71, 72],
    trend30d: trend(55, 72, 30),
    factors: { socialVolume: 78, fundingRate: 65, longShortRatio: 70, exchangeFlow: 68, volumeChange: 80 },
  },
  solana: {
    score: 45,
    trend7d: [58, 55, 52, 50, 48, 46, 45],
    trend30d: trend(70, 45, 30),
    factors: { socialVolume: 55, fundingRate: 35, longShortRatio: 42, exchangeFlow: 38, volumeChange: 52 },
  },
  cardano: {
    score: 61,
    trend7d: [55, 57, 58, 59, 60, 60, 61],
    trend30d: trend(48, 61, 30),
    factors: { socialVolume: 58, fundingRate: 60, longShortRatio: 63, exchangeFlow: 62, volumeChange: 55 },
  },
  'avalanche-2': {
    score: 54,
    trend7d: [50, 51, 52, 53, 52, 53, 54],
    trend30d: trend(45, 54, 30),
    factors: { socialVolume: 50, fundingRate: 55, longShortRatio: 52, exchangeFlow: 56, volumeChange: 48 },
  },
  sui: {
    score: 68,
    trend7d: [60, 62, 63, 65, 66, 67, 68],
    trend30d: trend(42, 68, 30),
    factors: { socialVolume: 75, fundingRate: 62, longShortRatio: 68, exchangeFlow: 65, volumeChange: 72 },
  },
  polkadot: {
    score: 52,
    trend7d: [48, 49, 50, 51, 51, 52, 52],
    trend30d: trend(45, 52, 30),
    factors: { socialVolume: 48, fundingRate: 52, longShortRatio: 54, exchangeFlow: 50, volumeChange: 46 },
  },
  near: {
    score: 65,
    trend7d: [58, 60, 61, 63, 64, 64, 65],
    trend30d: trend(48, 65, 30),
    factors: { socialVolume: 68, fundingRate: 62, longShortRatio: 65, exchangeFlow: 60, volumeChange: 70 },
  },
  aptos: {
    score: 48,
    trend7d: [52, 51, 50, 49, 48, 48, 48],
    trend30d: trend(58, 48, 30),
    factors: { socialVolume: 45, fundingRate: 48, longShortRatio: 50, exchangeFlow: 46, volumeChange: 42 },
  },
  cosmos: {
    score: 55,
    trend7d: [50, 51, 52, 53, 54, 54, 55],
    trend30d: trend(48, 55, 30),
    factors: { socialVolume: 52, fundingRate: 55, longShortRatio: 56, exchangeFlow: 54, volumeChange: 50 },
  },
  toncoin: {
    score: 71,
    trend7d: [62, 64, 66, 68, 69, 70, 71],
    trend30d: trend(50, 71, 30),
    factors: { socialVolume: 80, fundingRate: 65, longShortRatio: 70, exchangeFlow: 68, volumeChange: 72 },
  },

  // ─── PAYMENTS ─────────────────────────────────────────────
  ripple: {
    score: 58,
    trend7d: [54, 55, 56, 57, 57, 58, 58],
    trend30d: trend(50, 58, 30),
    factors: { socialVolume: 60, fundingRate: 55, longShortRatio: 58, exchangeFlow: 56, volumeChange: 52 },
  },
  stellar: {
    score: 56,
    trend7d: [50, 52, 53, 54, 55, 55, 56],
    trend30d: trend(45, 56, 30),
    factors: { socialVolume: 52, fundingRate: 55, longShortRatio: 58, exchangeFlow: 56, volumeChange: 50 },
  },
  litecoin: {
    score: 50,
    trend7d: [48, 49, 49, 50, 50, 50, 50],
    trend30d: trend(48, 50, 30),
    factors: { socialVolume: 42, fundingRate: 52, longShortRatio: 50, exchangeFlow: 54, volumeChange: 45 },
  },

  // ─── DEFI ─────────────────────────────────────────────────
  chainlink: {
    score: 76,
    trend7d: [68, 70, 72, 73, 74, 75, 76],
    trend30d: trend(55, 76, 30),
    factors: { socialVolume: 80, fundingRate: 72, longShortRatio: 75, exchangeFlow: 74, volumeChange: 82 },
  },
  aave: {
    score: 63,
    trend7d: [58, 59, 60, 61, 62, 62, 63],
    trend30d: trend(50, 63, 30),
    factors: { socialVolume: 60, fundingRate: 65, longShortRatio: 62, exchangeFlow: 64, volumeChange: 58 },
  },
  uniswap: {
    score: 59,
    trend7d: [55, 56, 57, 58, 58, 59, 59],
    trend30d: trend(48, 59, 30),
    factors: { socialVolume: 55, fundingRate: 58, longShortRatio: 60, exchangeFlow: 62, volumeChange: 56 },
  },
  maker: {
    score: 62,
    trend7d: [58, 59, 60, 61, 61, 62, 62],
    trend30d: trend(52, 62, 30),
    factors: { socialVolume: 55, fundingRate: 65, longShortRatio: 62, exchangeFlow: 66, volumeChange: 58 },
  },
  'lido-dao': {
    score: 66,
    trend7d: [60, 61, 63, 64, 65, 65, 66],
    trend30d: trend(50, 66, 30),
    factors: { socialVolume: 62, fundingRate: 68, longShortRatio: 65, exchangeFlow: 70, volumeChange: 64 },
  },
  pendle: {
    score: 73,
    trend7d: [64, 66, 68, 70, 71, 72, 73],
    trend30d: trend(48, 73, 30),
    factors: { socialVolume: 78, fundingRate: 70, longShortRatio: 72, exchangeFlow: 68, volumeChange: 76 },
  },

  // ─── LAYER 2 / INFRASTRUCTURE ─────────────────────────────
  'matic-network': {
    score: 53,
    trend7d: [50, 51, 51, 52, 52, 53, 53],
    trend30d: trend(48, 53, 30),
    factors: { socialVolume: 50, fundingRate: 52, longShortRatio: 55, exchangeFlow: 52, volumeChange: 48 },
  },
  arbitrum: {
    score: 64,
    trend7d: [58, 59, 60, 62, 63, 63, 64],
    trend30d: trend(48, 64, 30),
    factors: { socialVolume: 65, fundingRate: 62, longShortRatio: 64, exchangeFlow: 60, volumeChange: 68 },
  },
  optimism: {
    score: 62,
    trend7d: [56, 58, 59, 60, 61, 61, 62],
    trend30d: trend(48, 62, 30),
    factors: { socialVolume: 60, fundingRate: 62, longShortRatio: 63, exchangeFlow: 58, volumeChange: 65 },
  },
  starknet: {
    score: 42,
    trend7d: [48, 46, 45, 44, 43, 42, 42],
    trend30d: trend(55, 42, 30),
    factors: { socialVolume: 45, fundingRate: 38, longShortRatio: 40, exchangeFlow: 42, volumeChange: 35 },
  },

  // ─── GAMING / METAVERSE ───────────────────────────────────
  'immutable-x': {
    score: 52,
    trend7d: [48, 49, 50, 51, 51, 52, 52],
    trend30d: trend(40, 52, 30),
    factors: { socialVolume: 48, fundingRate: 50, longShortRatio: 55, exchangeFlow: 52, volumeChange: 45 },
  },
  'the-sandbox': {
    score: 38,
    trend7d: [42, 41, 40, 39, 39, 38, 38],
    trend30d: trend(55, 38, 30),
    factors: { socialVolume: 35, fundingRate: 38, longShortRatio: 40, exchangeFlow: 42, volumeChange: 30 },
  },
  'axie-infinity': {
    score: 40,
    trend7d: [44, 43, 42, 41, 40, 40, 40],
    trend30d: trend(52, 40, 30),
    factors: { socialVolume: 38, fundingRate: 40, longShortRatio: 42, exchangeFlow: 38, volumeChange: 35 },
  },
  gala: {
    score: 46,
    trend7d: [42, 43, 44, 45, 45, 46, 46],
    trend30d: trend(38, 46, 30),
    factors: { socialVolume: 48, fundingRate: 44, longShortRatio: 46, exchangeFlow: 42, volumeChange: 50 },
  },

  // ─── AI ───────────────────────────────────────────────────
  'render-token': {
    score: 70,
    trend7d: [62, 64, 65, 67, 68, 69, 70],
    trend30d: trend(50, 70, 30),
    factors: { socialVolume: 72, fundingRate: 68, longShortRatio: 70, exchangeFlow: 66, volumeChange: 75 },
  },
  'fetch-ai': {
    score: 74,
    trend7d: [66, 68, 69, 71, 72, 73, 74],
    trend30d: trend(48, 74, 30),
    factors: { socialVolume: 82, fundingRate: 70, longShortRatio: 72, exchangeFlow: 68, volumeChange: 78 },
  },
  bittensor: {
    score: 78,
    trend7d: [68, 70, 72, 74, 76, 77, 78],
    trend30d: trend(52, 78, 30),
    factors: { socialVolume: 85, fundingRate: 74, longShortRatio: 78, exchangeFlow: 72, volumeChange: 82 },
  },
  'akash-network': {
    score: 69,
    trend7d: [62, 64, 65, 66, 67, 68, 69],
    trend30d: trend(48, 69, 30),
    factors: { socialVolume: 72, fundingRate: 66, longShortRatio: 68, exchangeFlow: 64, volumeChange: 70 },
  },

  // ─── MEME ─────────────────────────────────────────────────
  dogecoin: {
    score: 60,
    trend7d: [55, 56, 57, 58, 59, 59, 60],
    trend30d: trend(50, 60, 30),
    factors: { socialVolume: 75, fundingRate: 52, longShortRatio: 58, exchangeFlow: 50, volumeChange: 65 },
  },
  'shiba-inu': {
    score: 48,
    trend7d: [52, 51, 50, 49, 48, 48, 48],
    trend30d: trend(58, 48, 30),
    factors: { socialVolume: 62, fundingRate: 40, longShortRatio: 45, exchangeFlow: 38, volumeChange: 55 },
  },
  pepe: {
    score: 72,
    trend7d: [60, 63, 65, 68, 70, 71, 72],
    trend30d: trend(42, 72, 30),
    factors: { socialVolume: 88, fundingRate: 65, longShortRatio: 70, exchangeFlow: 62, volumeChange: 80 },
  },
  bonk: {
    score: 64,
    trend7d: [56, 58, 60, 61, 62, 63, 64],
    trend30d: trend(40, 64, 30),
    factors: { socialVolume: 72, fundingRate: 58, longShortRatio: 62, exchangeFlow: 55, volumeChange: 68 },
  },

  // ─── RWA ──────────────────────────────────────────────────
  'ondo-finance': {
    score: 75,
    trend7d: [66, 68, 70, 72, 73, 74, 75],
    trend30d: trend(50, 75, 30),
    factors: { socialVolume: 78, fundingRate: 72, longShortRatio: 74, exchangeFlow: 70, volumeChange: 80 },
  },
  'mantra-dao': {
    score: 80,
    trend7d: [68, 71, 74, 76, 78, 79, 80],
    trend30d: trend(45, 80, 30),
    factors: { socialVolume: 85, fundingRate: 76, longShortRatio: 80, exchangeFlow: 74, volumeChange: 82 },
  },
}

export const factorDescriptions = {
  socialVolume: {
    it: 'Volume di menzioni sui social media nelle ultime 24h. Un valore alto indica forte interesse della comunita\'.',
    en: 'Volume of social media mentions in the last 24h. A high value indicates strong community interest.',
  },
  fundingRate: {
    it: 'Tasso di finanziamento nei mercati perpetui. Sopra 50 indica prevalenza di posizioni long (ottimismo).',
    en: 'Funding rate in perpetual markets. Above 50 indicates prevalence of long positions (optimism).',
  },
  longShortRatio: {
    it: 'Rapporto tra posizioni long e short. Sopra 50 indica piu\' trader rialzisti che ribassisti.',
    en: 'Ratio between long and short positions. Above 50 indicates more bullish than bearish traders.',
  },
  exchangeFlow: {
    it: 'Flusso netto di token dagli exchange. Sopra 50 indica piu\' prelievi che depositi (segnale bullish).',
    en: 'Net flow of tokens from exchanges. Above 50 indicates more withdrawals than deposits (bullish signal).',
  },
  volumeChange: {
    it: 'Variazione del volume di trading rispetto alla media 7 giorni. Sopra 50 indica volume in aumento.',
    en: 'Trading volume change compared to 7-day average. Above 50 indicates increasing volume.',
  },
}

export const factorLabels = {
  socialVolume: { it: 'Volume Social', en: 'Social Volume' },
  fundingRate: { it: 'Funding Rate', en: 'Funding Rate' },
  longShortRatio: { it: 'Long/Short Ratio', en: 'Long/Short Ratio' },
  exchangeFlow: { it: 'Flusso Exchange', en: 'Exchange Flow' },
  volumeChange: { it: 'Variazione Volume', en: 'Volume Change' },
}
