export const cryptoMeta = {
  ethereum: {
    name: 'Ethereum',
    ticker: 'ETH',
    category: 'layer-1',
    risk: 'medium',
    description: {
      it: "La principale piattaforma per smart contract che alimenta DeFi, NFT e applicazioni decentralizzate. Ethereum e' passato al Proof of Stake con \"The Merge\", riducendo drasticamente il consumo energetico e abilitando futuri aggiornamenti di scalabilita'.",
      en: 'The leading smart contract platform powering DeFi, NFTs, and decentralized applications. Ethereum transitioned to Proof of Stake with "The Merge," dramatically reducing energy consumption and enabling future scalability upgrades.',
    },
  },
  solana: {
    name: 'Solana',
    ticker: 'SOL',
    category: 'layer-1',
    risk: 'medium-high',
    description: {
      it: "Una blockchain ad alte prestazioni capace di elaborare migliaia di transazioni al secondo a costi minimi. Il consenso unico Proof of History di Solana sta attirando ecosistemi DeFi e gaming.",
      en: "A high-performance blockchain capable of processing thousands of transactions per second at minimal cost. Solana's unique Proof of History consensus is attracting DeFi and gaming ecosystems.",
    },
  },
  cardano: {
    name: 'Cardano',
    ticker: 'ADA',
    category: 'layer-1',
    risk: 'medium',
    description: {
      it: "Una piattaforma blockchain guidata dalla ricerca, sviluppata attraverso articoli accademici peer-reviewed. Cardano si concentra su sostenibilita', scalabilita' e conformita' normativa per l'adozione nel mondo reale.",
      en: 'A research-driven blockchain platform developed through peer-reviewed academic papers. Cardano focuses on sustainability, scalability, and regulatory compliance for real-world adoption.',
    },
  },
  'avalanche-2': {
    name: 'Avalanche',
    ticker: 'AVAX',
    category: 'layer-1',
    risk: 'medium-high',
    description: {
      it: "Una piattaforma blockchain velocissima con finalita' in meno di un secondo. L'architettura a subnet di Avalanche permette a chiunque di lanciare blockchain personalizzate e specifiche per applicazione.",
      en: "A blazing-fast blockchain platform with sub-second finality. Avalanche's subnet architecture allows anyone to launch customized, application-specific blockchains.",
    },
  },
  sui: {
    name: 'Sui',
    ticker: 'SUI',
    category: 'layer-1',
    risk: 'high',
    description: {
      it: "Una blockchain Layer 1 di nuova generazione costruita da ex ingegneri Meta usando il linguaggio di programmazione Move. Sui offre l'esecuzione parallela delle transazioni per un throughput senza precedenti.",
      en: 'A next-generation Layer 1 blockchain built by former Meta engineers using the Move programming language. Sui features parallel transaction execution for unprecedented throughput.',
    },
  },
  ripple: {
    name: 'XRP',
    ticker: 'XRP',
    category: 'payments',
    risk: 'medium',
    description: {
      it: "Progettato per pagamenti transfrontalieri veloci ed efficienti, XRP regola le transazioni in 3-5 secondi. L'XRP Ledger e' sempre piu' utilizzato dalle istituzioni finanziarie per soluzioni di liquidita'.",
      en: 'Designed for fast and efficient cross-border payments, XRP settles transactions in 3-5 seconds. The XRP Ledger is increasingly used by financial institutions for liquidity solutions.',
    },
  },
  chainlink: {
    name: 'Chainlink',
    ticker: 'LINK',
    category: 'defi',
    risk: 'medium',
    description: {
      it: "La principale rete oracolo decentralizzata che collega gli smart contract ai dati del mondo reale. Chainlink e' un'infrastruttura essenziale che alimenta i feed di prezzo DeFi, la casualita' e la comunicazione cross-chain.",
      en: 'The leading decentralized oracle network connecting smart contracts to real-world data. Chainlink is essential infrastructure powering DeFi price feeds, randomness, and cross-chain communication.',
    },
  },
  aave: {
    name: 'Aave',
    ticker: 'AAVE',
    category: 'defi',
    risk: 'medium-high',
    description: {
      it: "Un protocollo pionieristico di prestito e indebitamento decentralizzato. Aave ha introdotto i flash loan e il deployment multi-chain, gestendo miliardi in valore totale bloccato su piu' blockchain.",
      en: 'A pioneering decentralized lending and borrowing protocol. Aave introduced flash loans and multi-chain deployment, managing billions in total value locked across multiple blockchains.',
    },
  },
  uniswap: {
    name: 'Uniswap',
    ticker: 'UNI',
    category: 'defi',
    risk: 'medium-high',
    description: {
      it: "Il piu' grande exchange decentralizzato per volume, pioniere del modello Automated Market Maker. Uniswap consente lo scambio permissionless di token senza intermediari su piu' chain.",
      en: 'The largest decentralized exchange by volume, pioneering the Automated Market Maker model. Uniswap enables permissionless token trading without intermediaries across multiple chains.',
    },
  },
  'immutable-x': {
    name: 'Immutable X',
    ticker: 'IMX',
    category: 'gaming',
    risk: 'high',
    description: {
      it: "Una soluzione di scaling Layer 2 costruita appositamente per NFT e gaming blockchain. Immutable X offre minting e trading senza gas mantenendo la sicurezza a livello di Ethereum.",
      en: 'A Layer 2 scaling solution purpose-built for NFTs and blockchain gaming. Immutable X offers gas-free minting and trading while maintaining Ethereum-level security.',
    },
  },
  'the-sandbox': {
    name: 'The Sandbox',
    ticker: 'SAND',
    category: 'gaming',
    risk: 'high',
    description: {
      it: "Un mondo virtuale dove i giocatori possono costruire, possedere e monetizzare le proprie esperienze di gioco. The Sandbox combina NFT e DeFi in una piattaforma metaverso guidata dalla comunita'.",
      en: 'A virtual world where players can build, own, and monetize their gaming experiences. The Sandbox combines NFTs and DeFi in a community-driven metaverse platform.',
    },
  },
  'render-token': {
    name: 'Render',
    ticker: 'RNDR',
    category: 'ai',
    risk: 'high',
    description: {
      it: "Una rete decentralizzata di rendering GPU che collega artisti con potenza di calcolo inutilizzata. Render si posiziona all'intersezione tra AI, metaverso e computing decentralizzato.",
      en: 'A decentralized GPU rendering network connecting artists with idle computing power. Render is positioning itself at the intersection of AI, metaverse, and decentralized computing.',
    },
  },
  'fetch-ai': {
    name: 'Fetch.ai',
    ticker: 'FET',
    category: 'ai',
    risk: 'high',
    description: {
      it: "Una piattaforma blockchain alimentata dall'AI che abilita agenti economici autonomi. Fetch.ai combina machine learning con la tecnologia a registro distribuito per servizi automatizzati e intelligenti.",
      en: 'An AI-powered blockchain platform enabling autonomous economic agents. Fetch.ai combines machine learning with decentralized ledger technology for automated, intelligent services.',
    },
  },
}

export const riskColors = {
  low: { bg: 'bg-neon-green/10', text: 'text-neon-green', labelKey: 'riskLow' },
  medium: { bg: 'bg-neon-amber/10', text: 'text-neon-amber', labelKey: 'riskMedium' },
  'medium-high': { bg: 'bg-orange-500/10', text: 'text-orange-400', labelKey: 'riskMedHigh' },
  high: { bg: 'bg-neon-red/10', text: 'text-neon-red', labelKey: 'riskHigh' },
}
