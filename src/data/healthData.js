// Project Health Score — "Dietro il Codice" mock data
// TODO: Replace with API call

const commits = (base, growth) =>
  Array.from({ length: 12 }, (_, i) => Math.round(base + growth * i + (Math.random() - 0.5) * 5))

export const healthData = {
  // ─── LAYER 1 ──────────────────────────────────────────────
  bitcoin: {
    grade: 'A+',
    score: 98,
    github: { commits90d: commits(50, 2), contributorsActive: 350, issuesRatio: 0.94 },
    security: {
      audits: [
        { name: 'Bitcoin Core 27.0', date: '2026-01', auditor: 'Chaincode Labs' },
        { name: 'Taproot Assets', date: '2025-10', auditor: 'Trail of Bits' },
        { name: 'Lightning Network', date: '2025-07', auditor: 'Block Inc' },
      ],
      vulnerabilities: 0,
    },
    onchain: { tvl: null, dailyTx: 450000, activeAddresses: 950000 },
    team: { size: 500, lastRoadmapUpdate: '2026-02-20', deliveryRate: 92 },
    badges: ['activelyDeveloped', 'auditVerified'],
  },
  ethereum: {
    grade: 'A+',
    score: 97,
    github: { commits90d: commits(45, 2.5), contributorsActive: 285, issuesRatio: 0.92 },
    security: {
      audits: [
        { name: 'Pectra Upgrade', date: '2026-01', auditor: 'Trail of Bits' },
        { name: 'EIP-7702', date: '2025-11', auditor: 'OpenZeppelin' },
        { name: 'Beacon Chain', date: '2025-08', auditor: 'Sigma Prime' },
      ],
      vulnerabilities: 0,
    },
    onchain: { tvl: null, dailyTx: 1200000, activeAddresses: 580000 },
    team: { size: 400, lastRoadmapUpdate: '2026-02-15', deliveryRate: 95 },
    badges: ['activelyDeveloped', 'auditVerified'],
  },
  solana: {
    grade: 'A',
    score: 90,
    github: { commits90d: commits(38, 2.5), contributorsActive: 180, issuesRatio: 0.85 },
    security: {
      audits: [
        { name: 'Firedancer', date: '2026-02', auditor: 'Halborn' },
        { name: 'Token Extensions', date: '2025-10', auditor: 'Neodyme' },
      ],
      vulnerabilities: 1,
    },
    onchain: { tvl: null, dailyTx: 45000000, activeAddresses: 1200000 },
    team: { size: 150, lastRoadmapUpdate: '2026-02-20', deliveryRate: 88 },
    badges: ['activelyDeveloped', 'auditVerified'],
  },
  cardano: {
    grade: 'B+',
    score: 82,
    github: { commits90d: commits(20, 2), contributorsActive: 95, issuesRatio: 0.78 },
    security: {
      audits: [
        { name: 'Plutus V3', date: '2025-12', auditor: 'Certik' },
        { name: 'Hydra Head', date: '2025-09', auditor: 'Runtime Verification' },
      ],
      vulnerabilities: 0,
    },
    onchain: { tvl: null, dailyTx: 85000, activeAddresses: 65000 },
    team: { size: 120, lastRoadmapUpdate: '2026-01-30', deliveryRate: 75 },
    badges: ['activelyDeveloped', 'auditVerified'],
  },
  'avalanche-2': {
    grade: 'B+',
    score: 80,
    github: { commits90d: commits(18, 2), contributorsActive: 72, issuesRatio: 0.80 },
    security: {
      audits: [{ name: 'Subnet EVM', date: '2025-11', auditor: 'Quantstamp' }],
      vulnerabilities: 0,
    },
    onchain: { tvl: null, dailyTx: 320000, activeAddresses: 95000 },
    team: { size: 85, lastRoadmapUpdate: '2026-02-10', deliveryRate: 82 },
    badges: ['activelyDeveloped', 'auditVerified'],
  },
  sui: {
    grade: 'B',
    score: 75,
    github: { commits90d: commits(30, 2.5), contributorsActive: 65, issuesRatio: 0.72 },
    security: {
      audits: [{ name: 'Move VM', date: '2025-10', auditor: 'Zellic' }],
      vulnerabilities: 2,
    },
    onchain: { tvl: null, dailyTx: 8500000, activeAddresses: 450000 },
    team: { size: 95, lastRoadmapUpdate: '2026-02-25', deliveryRate: 80 },
    badges: ['activelyDeveloped'],
  },
  polkadot: {
    grade: 'A-',
    score: 87,
    github: { commits90d: commits(35, 2), contributorsActive: 120, issuesRatio: 0.85 },
    security: {
      audits: [
        { name: 'Polkadot SDK', date: '2026-01', auditor: 'SRLabs' },
        { name: 'XCM v4', date: '2025-09', auditor: 'Quarkslab' },
      ],
      vulnerabilities: 0,
    },
    onchain: { tvl: null, dailyTx: 180000, activeAddresses: 42000 },
    team: { size: 180, lastRoadmapUpdate: '2026-02-18', deliveryRate: 85 },
    badges: ['activelyDeveloped', 'auditVerified'],
  },
  near: {
    grade: 'B+',
    score: 81,
    github: { commits90d: commits(28, 2.5), contributorsActive: 78, issuesRatio: 0.78 },
    security: {
      audits: [{ name: 'NEAR DA', date: '2025-12', auditor: 'Trail of Bits' }],
      vulnerabilities: 1,
    },
    onchain: { tvl: null, dailyTx: 2500000, activeAddresses: 320000 },
    team: { size: 110, lastRoadmapUpdate: '2026-02-12', deliveryRate: 80 },
    badges: ['activelyDeveloped'],
  },
  aptos: {
    grade: 'B',
    score: 74,
    github: { commits90d: commits(32, 2), contributorsActive: 55, issuesRatio: 0.70 },
    security: {
      audits: [{ name: 'Aptos Framework', date: '2025-10', auditor: 'Zellic' }],
      vulnerabilities: 1,
    },
    onchain: { tvl: null, dailyTx: 1800000, activeAddresses: 280000 },
    team: { size: 90, lastRoadmapUpdate: '2026-01-20', deliveryRate: 72 },
    badges: ['activelyDeveloped'],
  },
  cosmos: {
    grade: 'B+',
    score: 83,
    github: { commits90d: commits(25, 1.5), contributorsActive: 95, issuesRatio: 0.82 },
    security: {
      audits: [
        { name: 'Cosmos SDK v0.50', date: '2025-11', auditor: 'Informal Systems' },
      ],
      vulnerabilities: 0,
    },
    onchain: { tvl: null, dailyTx: 150000, activeAddresses: 38000 },
    team: { size: 85, lastRoadmapUpdate: '2026-02-05', deliveryRate: 78 },
    badges: ['activelyDeveloped', 'auditVerified'],
  },
  toncoin: {
    grade: 'B',
    score: 76,
    github: { commits90d: commits(22, 3), contributorsActive: 60, issuesRatio: 0.72 },
    security: {
      audits: [{ name: 'TON Blockchain', date: '2025-12', auditor: 'Certik' }],
      vulnerabilities: 1,
    },
    onchain: { tvl: null, dailyTx: 5200000, activeAddresses: 890000 },
    team: { size: 75, lastRoadmapUpdate: '2026-02-22', deliveryRate: 78 },
    badges: ['activelyDeveloped'],
  },

  // ─── PAYMENTS ─────────────────────────────────────────────
  ripple: {
    grade: 'B',
    score: 73,
    github: { commits90d: commits(10, 1.3), contributorsActive: 45, issuesRatio: 0.75 },
    security: {
      audits: [{ name: 'XRPL AMM', date: '2025-08', auditor: 'Halborn' }],
      vulnerabilities: 0,
    },
    onchain: { tvl: null, dailyTx: 1500000, activeAddresses: 180000 },
    team: { size: 200, lastRoadmapUpdate: '2026-01-15', deliveryRate: 70 },
    badges: ['auditVerified'],
  },
  stellar: {
    grade: 'B',
    score: 72,
    github: { commits90d: commits(12, 1), contributorsActive: 40, issuesRatio: 0.74 },
    security: {
      audits: [{ name: 'Soroban Smart Contracts', date: '2025-10', auditor: 'Halborn' }],
      vulnerabilities: 0,
    },
    onchain: { tvl: null, dailyTx: 800000, activeAddresses: 120000 },
    team: { size: 80, lastRoadmapUpdate: '2026-01-28', deliveryRate: 72 },
    badges: ['auditVerified'],
  },
  litecoin: {
    grade: 'C+',
    score: 60,
    github: { commits90d: commits(5, 0.8), contributorsActive: 15, issuesRatio: 0.60 },
    security: {
      audits: [{ name: 'MWEB', date: '2024-08', auditor: 'Coinspect' }],
      vulnerabilities: 0,
    },
    onchain: { tvl: null, dailyTx: 350000, activeAddresses: 95000 },
    team: { size: 20, lastRoadmapUpdate: '2025-09-10', deliveryRate: 55 },
    badges: [],
  },

  // ─── DEFI ─────────────────────────────────────────────────
  chainlink: {
    grade: 'A',
    score: 92,
    github: { commits90d: commits(35, 2.5), contributorsActive: 110, issuesRatio: 0.88 },
    security: {
      audits: [
        { name: 'CCIP v2', date: '2026-01', auditor: 'Trail of Bits' },
        { name: 'Data Feeds v2', date: '2025-09', auditor: 'Sigma Prime' },
      ],
      vulnerabilities: 0,
    },
    onchain: { tvl: null, dailyTx: 250000, activeAddresses: 42000 },
    team: { size: 250, lastRoadmapUpdate: '2026-02-28', deliveryRate: 92 },
    badges: ['activelyDeveloped', 'auditVerified'],
  },
  aave: {
    grade: 'A-',
    score: 88,
    github: { commits90d: commits(22, 2.5), contributorsActive: 55, issuesRatio: 0.85 },
    security: {
      audits: [
        { name: 'Aave v4', date: '2026-02', auditor: 'Spearbit' },
        { name: 'GHO Stablecoin', date: '2025-07', auditor: 'OpenZeppelin' },
      ],
      vulnerabilities: 0,
    },
    onchain: { tvl: 12500000000, dailyTx: 18000, activeAddresses: 8500 },
    team: { size: 45, lastRoadmapUpdate: '2026-02-20', deliveryRate: 90 },
    badges: ['activelyDeveloped', 'auditVerified', 'growingTvl'],
  },
  uniswap: {
    grade: 'A-',
    score: 86,
    github: { commits90d: commits(20, 2), contributorsActive: 48, issuesRatio: 0.82 },
    security: {
      audits: [{ name: 'Uniswap v4 Hooks', date: '2025-12', auditor: 'Trail of Bits' }],
      vulnerabilities: 0,
    },
    onchain: { tvl: 8200000000, dailyTx: 95000, activeAddresses: 35000 },
    team: { size: 80, lastRoadmapUpdate: '2026-01-25', deliveryRate: 85 },
    badges: ['activelyDeveloped', 'auditVerified', 'growingTvl'],
  },
  maker: {
    grade: 'A-',
    score: 89,
    github: { commits90d: commits(18, 2), contributorsActive: 42, issuesRatio: 0.86 },
    security: {
      audits: [
        { name: 'Endgame', date: '2026-01', auditor: 'ChainSecurity' },
        { name: 'Spark Protocol', date: '2025-10', auditor: 'Spearbit' },
      ],
      vulnerabilities: 0,
    },
    onchain: { tvl: 9800000000, dailyTx: 12000, activeAddresses: 5500 },
    team: { size: 65, lastRoadmapUpdate: '2026-02-15', deliveryRate: 88 },
    badges: ['activelyDeveloped', 'auditVerified', 'growingTvl'],
  },
  'lido-dao': {
    grade: 'A-',
    score: 87,
    github: { commits90d: commits(25, 2), contributorsActive: 52, issuesRatio: 0.84 },
    security: {
      audits: [
        { name: 'Lido V2', date: '2025-12', auditor: 'Statemind' },
        { name: 'CSM Module', date: '2025-09', auditor: 'MixBytes' },
      ],
      vulnerabilities: 0,
    },
    onchain: { tvl: 15200000000, dailyTx: 8500, activeAddresses: 4200 },
    team: { size: 55, lastRoadmapUpdate: '2026-02-10', deliveryRate: 86 },
    badges: ['activelyDeveloped', 'auditVerified', 'growingTvl'],
  },
  pendle: {
    grade: 'B+',
    score: 79,
    github: { commits90d: commits(20, 2.5), contributorsActive: 28, issuesRatio: 0.76 },
    security: {
      audits: [{ name: 'Pendle V3', date: '2025-11', auditor: 'Dedaub' }],
      vulnerabilities: 0,
    },
    onchain: { tvl: 3200000000, dailyTx: 15000, activeAddresses: 6800 },
    team: { size: 25, lastRoadmapUpdate: '2026-02-18', deliveryRate: 82 },
    badges: ['activelyDeveloped', 'growingTvl'],
  },

  // ─── LAYER 2 / INFRASTRUCTURE ─────────────────────────────
  'matic-network': {
    grade: 'B+',
    score: 80,
    github: { commits90d: commits(22, 1.5), contributorsActive: 85, issuesRatio: 0.78 },
    security: {
      audits: [{ name: 'AggLayer', date: '2025-12', auditor: 'Spearbit' }],
      vulnerabilities: 0,
    },
    onchain: { tvl: null, dailyTx: 3200000, activeAddresses: 420000 },
    team: { size: 200, lastRoadmapUpdate: '2026-02-05', deliveryRate: 78 },
    badges: ['activelyDeveloped', 'auditVerified'],
  },
  arbitrum: {
    grade: 'A-',
    score: 85,
    github: { commits90d: commits(28, 2.5), contributorsActive: 68, issuesRatio: 0.82 },
    security: {
      audits: [
        { name: 'Arbitrum Orbit', date: '2026-01', auditor: 'Trail of Bits' },
        { name: 'Stylus', date: '2025-10', auditor: 'OpenZeppelin' },
      ],
      vulnerabilities: 0,
    },
    onchain: { tvl: 3500000000, dailyTx: 1800000, activeAddresses: 350000 },
    team: { size: 120, lastRoadmapUpdate: '2026-02-22', deliveryRate: 85 },
    badges: ['activelyDeveloped', 'auditVerified', 'growingTvl'],
  },
  optimism: {
    grade: 'B+',
    score: 83,
    github: { commits90d: commits(25, 2), contributorsActive: 62, issuesRatio: 0.80 },
    security: {
      audits: [{ name: 'OP Stack Fault Proofs', date: '2025-11', auditor: 'Sherlock' }],
      vulnerabilities: 0,
    },
    onchain: { tvl: 2800000000, dailyTx: 1200000, activeAddresses: 280000 },
    team: { size: 95, lastRoadmapUpdate: '2026-02-15', deliveryRate: 82 },
    badges: ['activelyDeveloped', 'auditVerified'],
  },
  starknet: {
    grade: 'B',
    score: 72,
    github: { commits90d: commits(30, 2.5), contributorsActive: 55, issuesRatio: 0.70 },
    security: {
      audits: [{ name: 'StarkNet OS', date: '2025-09', auditor: 'Nethermind' }],
      vulnerabilities: 2,
    },
    onchain: { tvl: 450000000, dailyTx: 250000, activeAddresses: 65000 },
    team: { size: 85, lastRoadmapUpdate: '2026-01-30', deliveryRate: 70 },
    badges: ['activelyDeveloped'],
  },

  // ─── GAMING / METAVERSE ───────────────────────────────────
  'immutable-x': {
    grade: 'B-',
    score: 68,
    github: { commits90d: commits(12, 1.5), contributorsActive: 32, issuesRatio: 0.68 },
    security: {
      audits: [{ name: 'zkEVM Migration', date: '2025-10', auditor: 'Quantstamp' }],
      vulnerabilities: 1,
    },
    onchain: { tvl: null, dailyTx: 45000, activeAddresses: 18000 },
    team: { size: 120, lastRoadmapUpdate: '2025-12-15', deliveryRate: 65 },
    badges: ['auditVerified'],
  },
  'the-sandbox': {
    grade: 'C+',
    score: 58,
    github: { commits90d: commits(5, 1), contributorsActive: 18, issuesRatio: 0.55 },
    security: {
      audits: [{ name: 'SAND Token', date: '2024-06', auditor: 'Certik' }],
      vulnerabilities: 0,
    },
    onchain: { tvl: null, dailyTx: 5000, activeAddresses: 3200 },
    team: { size: 200, lastRoadmapUpdate: '2025-10-01', deliveryRate: 50 },
    badges: ['redFlag'],
  },
  'axie-infinity': {
    grade: 'C',
    score: 52,
    github: { commits90d: commits(4, 0.8), contributorsActive: 15, issuesRatio: 0.50 },
    security: {
      audits: [{ name: 'Ronin Bridge', date: '2025-06', auditor: 'Verichains' }],
      vulnerabilities: 1,
    },
    onchain: { tvl: null, dailyTx: 35000, activeAddresses: 12000 },
    team: { size: 150, lastRoadmapUpdate: '2025-08-15', deliveryRate: 45 },
    badges: ['redFlag'],
  },
  gala: {
    grade: 'C+',
    score: 56,
    github: { commits90d: commits(8, 1), contributorsActive: 22, issuesRatio: 0.58 },
    security: {
      audits: [{ name: 'GalaChain', date: '2025-09', auditor: 'Halborn' }],
      vulnerabilities: 0,
    },
    onchain: { tvl: null, dailyTx: 18000, activeAddresses: 8500 },
    team: { size: 85, lastRoadmapUpdate: '2025-12-01', deliveryRate: 55 },
    badges: [],
  },

  // ─── AI ───────────────────────────────────────────────────
  'render-token': {
    grade: 'B',
    score: 74,
    github: { commits90d: commits(15, 2.5), contributorsActive: 28, issuesRatio: 0.75 },
    security: {
      audits: [{ name: 'Render Network', date: '2025-09', auditor: 'Halborn' }],
      vulnerabilities: 0,
    },
    onchain: { tvl: null, dailyTx: 12000, activeAddresses: 5500 },
    team: { size: 35, lastRoadmapUpdate: '2026-02-01', deliveryRate: 78 },
    badges: ['activelyDeveloped'],
  },
  'fetch-ai': {
    grade: 'B+',
    score: 79,
    github: { commits90d: commits(25, 3), contributorsActive: 42, issuesRatio: 0.80 },
    security: {
      audits: [{ name: 'ASI Alliance Merge', date: '2025-11', auditor: 'Certik' }],
      vulnerabilities: 1,
    },
    onchain: { tvl: null, dailyTx: 35000, activeAddresses: 15000 },
    team: { size: 65, lastRoadmapUpdate: '2026-02-22', deliveryRate: 82 },
    badges: ['activelyDeveloped'],
  },
  bittensor: {
    grade: 'B',
    score: 73,
    github: { commits90d: commits(22, 3), contributorsActive: 38, issuesRatio: 0.72 },
    security: {
      audits: [{ name: 'Subnet Architecture', date: '2025-10', auditor: 'Zellic' }],
      vulnerabilities: 2,
    },
    onchain: { tvl: null, dailyTx: 8000, activeAddresses: 3200 },
    team: { size: 30, lastRoadmapUpdate: '2026-02-15', deliveryRate: 75 },
    badges: ['activelyDeveloped'],
  },
  'akash-network': {
    grade: 'B',
    score: 75,
    github: { commits90d: commits(18, 2.5), contributorsActive: 32, issuesRatio: 0.76 },
    security: {
      audits: [{ name: 'Akash GPU Marketplace', date: '2025-12', auditor: 'Halborn' }],
      vulnerabilities: 0,
    },
    onchain: { tvl: null, dailyTx: 5500, activeAddresses: 2800 },
    team: { size: 28, lastRoadmapUpdate: '2026-02-10', deliveryRate: 80 },
    badges: ['activelyDeveloped', 'auditVerified'],
  },

  // ─── MEME ─────────────────────────────────────────────────
  dogecoin: {
    grade: 'C+',
    score: 58,
    github: { commits90d: commits(3, 0.5), contributorsActive: 12, issuesRatio: 0.55 },
    security: {
      audits: [],
      vulnerabilities: 0,
    },
    onchain: { tvl: null, dailyTx: 120000, activeAddresses: 85000 },
    team: { size: 8, lastRoadmapUpdate: '2025-06-01', deliveryRate: 40 },
    badges: [],
  },
  'shiba-inu': {
    grade: 'C',
    score: 50,
    github: { commits90d: commits(5, 0.8), contributorsActive: 18, issuesRatio: 0.48 },
    security: {
      audits: [{ name: 'Shibarium', date: '2025-05', auditor: 'Certik' }],
      vulnerabilities: 1,
    },
    onchain: { tvl: null, dailyTx: 45000, activeAddresses: 35000 },
    team: { size: 25, lastRoadmapUpdate: '2025-10-15', deliveryRate: 45 },
    badges: ['redFlag'],
  },
  pepe: {
    grade: 'D',
    score: 35,
    github: { commits90d: commits(1, 0.2), contributorsActive: 3, issuesRatio: 0.30 },
    security: {
      audits: [],
      vulnerabilities: 0,
    },
    onchain: { tvl: null, dailyTx: 95000, activeAddresses: 62000 },
    team: { size: 0, lastRoadmapUpdate: null, deliveryRate: 0 },
    badges: ['redFlag'],
  },
  bonk: {
    grade: 'C',
    score: 48,
    github: { commits90d: commits(3, 0.5), contributorsActive: 8, issuesRatio: 0.42 },
    security: {
      audits: [{ name: 'BONK Token', date: '2025-03', auditor: 'OtterSec' }],
      vulnerabilities: 0,
    },
    onchain: { tvl: null, dailyTx: 65000, activeAddresses: 42000 },
    team: { size: 10, lastRoadmapUpdate: '2025-08-20', deliveryRate: 38 },
    badges: [],
  },

  // ─── RWA ──────────────────────────────────────────────────
  'ondo-finance': {
    grade: 'B+',
    score: 81,
    github: { commits90d: commits(15, 2), contributorsActive: 25, issuesRatio: 0.78 },
    security: {
      audits: [
        { name: 'USDY', date: '2025-12', auditor: 'Code4rena' },
        { name: 'OUSG', date: '2025-08', auditor: 'OpenZeppelin' },
      ],
      vulnerabilities: 0,
    },
    onchain: { tvl: 850000000, dailyTx: 4500, activeAddresses: 2200 },
    team: { size: 45, lastRoadmapUpdate: '2026-02-20', deliveryRate: 85 },
    badges: ['activelyDeveloped', 'auditVerified', 'growingTvl'],
  },
  'mantra-dao': {
    grade: 'B',
    score: 72,
    github: { commits90d: commits(12, 2), contributorsActive: 20, issuesRatio: 0.70 },
    security: {
      audits: [{ name: 'MANTRA Chain', date: '2025-11', auditor: 'Certik' }],
      vulnerabilities: 1,
    },
    onchain: { tvl: 320000000, dailyTx: 3200, activeAddresses: 1500 },
    team: { size: 35, lastRoadmapUpdate: '2026-02-10', deliveryRate: 72 },
    badges: ['activelyDeveloped'],
  },
}

export const badgeConfig = {
  activelyDeveloped: { color: 'text-neon-green', bg: 'bg-neon-green/10', border: 'border-neon-green/20', label: { it: 'Sviluppo Attivo', en: 'Actively Developed' } },
  auditVerified: { color: 'text-neon-cyan', bg: 'bg-neon-cyan/10', border: 'border-neon-cyan/20', label: { it: 'Audit Verificato', en: 'Audit Verified' } },
  growingTvl: { color: 'text-neon-purple', bg: 'bg-neon-purple/10', border: 'border-neon-purple/20', label: { it: 'TVL in Crescita', en: 'Growing TVL' } },
  redFlag: { color: 'text-neon-red', bg: 'bg-neon-red/10', border: 'border-neon-red/20', label: { it: 'Red Flag', en: 'Red Flag' } },
}

export const gradeColors = {
  'A+': 'text-neon-green',
  'A': 'text-neon-green',
  'A-': 'text-neon-green',
  'B+': 'text-neon-cyan',
  'B': 'text-neon-cyan',
  'B-': 'text-neon-amber',
  'C+': 'text-neon-amber',
  'C': 'text-neon-amber',
  'D': 'text-neon-red',
  'F': 'text-red-500/50',
}
