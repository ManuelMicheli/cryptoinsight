export const cryptoMeta = {
  // ─── BITCOIN ──────────────────────────────────────────────
  bitcoin: {
    name: 'Bitcoin',
    ticker: 'BTC',
    category: 'layer-1',
    risk: 'low',
    brandColors: ['#F7931A', '#E28B1A'],
    description: {
      it: "La prima e piu' grande criptovaluta per capitalizzazione di mercato, creata nel 2009 da Satoshi Nakamoto. Bitcoin funziona come riserva di valore digitale decentralizzata con un'offerta massima fissata a 21 milioni di unita'. Il meccanismo Proof of Work garantisce la sicurezza della rete, elaborando circa 7 transazioni al secondo sul layer base. L'adozione istituzionale e' accelerata con l'approvazione degli ETF spot nel 2024, mentre Lightning Network abilita pagamenti istantanei a basso costo.",
      en: "The first and largest cryptocurrency by market capitalization, created in 2009 by Satoshi Nakamoto. Bitcoin functions as a decentralized digital store of value with a maximum supply fixed at 21 million units. The Proof of Work mechanism ensures network security, processing approximately 7 transactions per second on the base layer. Institutional adoption has accelerated with the approval of spot ETFs in 2024, while the Lightning Network enables instant low-cost payments.",
    },
  },
  // ─── LAYER 1 ──────────────────────────────────────────────
  ethereum: {
    name: 'Ethereum',
    ticker: 'ETH',
    category: 'layer-1',
    risk: 'medium',
    brandColors: ['#3C3CFF', '#242424'],
    description: {
      it: "La principale piattaforma per smart contract che alimenta DeFi, NFT e applicazioni decentralizzate. Ethereum e' passato al Proof of Stake con \"The Merge\" nel 2022, riducendo il consumo energetico del 99,95%. La rete elabora circa 1,2 milioni di transazioni al giorno con oltre 285 sviluppatori attivi. L'aggiornamento Pectra (2026) introduce l'account abstraction nativa e migliora la scalabilita' dei Layer 2, consolidando Ethereum come settlement layer di riferimento per l'intero ecosistema crypto.",
      en: 'The leading smart contract platform powering DeFi, NFTs, and decentralized applications. Ethereum transitioned to Proof of Stake with "The Merge" in 2022, reducing energy consumption by 99.95%. The network processes around 1.2 million transactions daily with over 285 active developers. The Pectra upgrade (2026) introduces native account abstraction and improves Layer 2 scalability, consolidating Ethereum as the reference settlement layer for the entire crypto ecosystem.',
    },
  },
  solana: {
    name: 'Solana',
    ticker: 'SOL',
    category: 'layer-1',
    risk: 'medium-high',
    brandColors: ['#14F195', '#9945FF'],
    description: {
      it: "Una blockchain ad alte prestazioni capace di elaborare oltre 65.000 transazioni al secondo con costi medi inferiori a $0,01. Il meccanismo di consenso Proof of History, combinato con Tower BFT, consente una latenza di circa 400 millisecondi. L'ecosistema conta oltre 180 sviluppatori attivi e 45 milioni di transazioni giornaliere, con una crescita esplosiva nella DeFi, nei pagamenti mobili e nelle meme coin. Il client validatore Firedancer di Jump Trading promette di raddoppiare il throughput e migliorare la resilienza della rete.",
      en: "A high-performance blockchain capable of processing over 65,000 transactions per second with average costs below $0.01. The Proof of History consensus mechanism, combined with Tower BFT, enables approximately 400-millisecond latency. The ecosystem boasts over 180 active developers and 45 million daily transactions, with explosive growth in DeFi, mobile payments, and meme coins. Jump Trading's Firedancer validator client promises to double throughput and improve network resilience.",
    },
  },
  cardano: {
    name: 'Cardano',
    ticker: 'ADA',
    category: 'layer-1',
    risk: 'medium',
    brandColors: ['#0033AD', '#2A6EFF'],
    description: {
      it: "Una piattaforma blockchain guidata dalla ricerca accademica, sviluppata attraverso articoli peer-reviewed da IOHK (Input Output). Cardano utilizza il protocollo Ouroboros, il primo algoritmo Proof of Stake dimostrato matematicamente sicuro. La rete si concentra su sostenibilita', scalabilita' e conformita' normativa, con applicazioni concrete in Africa per l'identita' digitale e la tracciabilita' della supply chain. Lo smart contract layer Plutus V3 e la soluzione di scaling Hydra Head mirano a competere con Ethereum nel settore DeFi e delle applicazioni enterprise.",
      en: 'A research-driven blockchain platform developed through peer-reviewed academic papers by IOHK (Input Output). Cardano uses the Ouroboros protocol, the first Proof of Stake algorithm mathematically proven to be secure. The network focuses on sustainability, scalability, and regulatory compliance, with real-world applications in Africa for digital identity and supply chain traceability. The Plutus V3 smart contract layer and Hydra Head scaling solution aim to compete with Ethereum in the DeFi and enterprise application sectors.',
    },
  },
  'avalanche-2': {
    name: 'Avalanche',
    ticker: 'AVAX',
    category: 'layer-1',
    risk: 'medium-high',
    brandColors: ['#E84142', '#FFFFFF'],
    description: {
      it: "Una piattaforma blockchain con finalita' delle transazioni in meno di un secondo, tra le piu' veloci del settore. L'architettura unica a tre chain (X-Chain, C-Chain, P-Chain) separa lo scambio di asset, l'esecuzione di smart contract e il coordinamento dei validatori. Le Subnet (ora Avalanche L1) permettono a chiunque di lanciare blockchain personalizzate con regole di consenso e set di validatori propri, attirando istituzioni finanziarie come JP Morgan e Citibank per la tokenizzazione di asset. La rete elabora oltre 320.000 transazioni giornaliere con 72 sviluppatori attivi.",
      en: "A blockchain platform with sub-second transaction finality, among the fastest in the industry. The unique three-chain architecture (X-Chain, C-Chain, P-Chain) separates asset exchange, smart contract execution, and validator coordination. Subnets (now Avalanche L1s) allow anyone to launch custom blockchains with their own consensus rules and validator sets, attracting financial institutions like JP Morgan and Citibank for asset tokenization. The network processes over 320,000 daily transactions with 72 active developers.",
    },
  },
  sui: {
    name: 'Sui',
    ticker: 'SUI',
    category: 'layer-1',
    risk: 'high',
    brandColors: ['#53B9FF', '#0057FF'],
    description: {
      it: "Una blockchain Layer 1 di nuova generazione costruita da Mysten Labs, fondata da ex ingegneri del progetto Diem di Meta. Sui utilizza il linguaggio di programmazione Move, progettato per la sicurezza degli asset digitali, e un modello di esecuzione parallela basato sugli oggetti che consente throughput fino a 297.000 TPS in condizioni ottimali. La rete ha raggiunto 8,5 milioni di transazioni giornaliere e 450.000 indirizzi attivi, con un ecosistema in rapida crescita nella DeFi, nel gaming (partnership con Mysten per giochi AAA) e nei pagamenti. La piattaforma zkLogin semplifica l'onboarding permettendo l'accesso con Google o Apple ID.",
      en: "A next-generation Layer 1 blockchain built by Mysten Labs, founded by former engineers from Meta's Diem project. Sui uses the Move programming language, designed for digital asset security, and an object-based parallel execution model enabling throughput up to 297,000 TPS under optimal conditions. The network has reached 8.5 million daily transactions and 450,000 active addresses, with a rapidly growing ecosystem in DeFi, gaming (partnership with Mysten for AAA games), and payments. The zkLogin platform simplifies onboarding by allowing access with Google or Apple ID.",
    },
  },
  polkadot: {
    name: 'Polkadot',
    ticker: 'DOT',
    category: 'layer-1',
    risk: 'medium',
    brandColors: ['#E6007A', '#552BBF'],
    description: {
      it: "Un protocollo multi-chain ideato da Gavin Wood, co-fondatore di Ethereum, che connette blockchain specializzate (parachain) in un unico ecosistema interoperabile. La Relay Chain garantisce sicurezza condivisa a tutte le parachain collegate, mentre il protocollo XCM consente il trasferimento di dati e asset tra chain diverse senza bridge centralizzati. L'ecosistema conta oltre 120 sviluppatori attivi e include progetti come Moonbeam (compatibilita' EVM), Acala (DeFi hub) e Phala Network (cloud computing confidenziale). Il sistema di governance on-chain OpenGov permette ai possessori di DOT di proporre e votare aggiornamenti della rete senza hard fork.",
      en: "A multi-chain protocol created by Gavin Wood, Ethereum co-founder, connecting specialized blockchains (parachains) into a unified interoperable ecosystem. The Relay Chain provides shared security to all connected parachains, while the XCM protocol enables data and asset transfers between different chains without centralized bridges. The ecosystem has over 120 active developers and includes projects like Moonbeam (EVM compatibility), Acala (DeFi hub), and Phala Network (confidential cloud computing). The OpenGov on-chain governance system allows DOT holders to propose and vote on network upgrades without hard forks.",
    },
  },
  near: {
    name: 'NEAR Protocol',
    ticker: 'NEAR',
    category: 'layer-1',
    risk: 'medium-high',
    brandColors: ['#00EC97', '#000000'],
    description: {
      it: "Una blockchain scalabile fondata da Illia Polosukhin, co-autore del paper \"Attention Is All You Need\" che ha dato origine ai modelli Transformer e a ChatGPT. NEAR utilizza lo sharding dinamico Nightshade per scalare in modo lineare con il numero di nodi, raggiungendo 2,5 milioni di transazioni giornaliere. La piattaforma si distingue per la chain abstraction, che permette agli utenti di interagire con piu' blockchain da un unico account NEAR senza dover gestire wallet multipli. L'ecosistema si sta posizionando come hub per l'AI decentralizzata, con progetti come NEAR AI che integrano agenti autonomi on-chain, e conta 78 sviluppatori attivi con partnership strategiche nel settore AI.",
      en: 'A scalable blockchain founded by Illia Polosukhin, co-author of the "Attention Is All You Need" paper that gave rise to Transformer models and ChatGPT. NEAR uses Nightshade dynamic sharding to scale linearly with the number of nodes, reaching 2.5 million daily transactions. The platform stands out for chain abstraction, allowing users to interact with multiple blockchains from a single NEAR account without managing multiple wallets. The ecosystem is positioning itself as a hub for decentralized AI, with projects like NEAR AI integrating on-chain autonomous agents, and has 78 active developers with strategic partnerships in the AI sector.',
    },
  },
  aptos: {
    name: 'Aptos',
    ticker: 'APT',
    category: 'layer-1',
    risk: 'high',
    brandColors: ['#2DD8A3', '#000000'],
    description: {
      it: "Una blockchain Layer 1 costruita da Aptos Labs, fondata da Mo Shaikh e Avery Ching, ex ingegneri del progetto Diem di Meta. Come Sui, utilizza il linguaggio Move per garantire la sicurezza delle risorse digitali, ma adotta un modello di esecuzione parallela ottimistica (Block-STM) che raggiunge fino a 160.000 TPS. La rete ha attirato 1,8 milioni di transazioni giornaliere e 280.000 indirizzi attivi, con un focus particolare sull'adozione enterprise e il mercato asiatico grazie a partnership con Microsoft, Google Cloud e operatori telecom coreani. La roadmap punta su upgradabilita' modulare senza downtime e interoperabilita' cross-chain.",
      en: "A Layer 1 blockchain built by Aptos Labs, founded by Mo Shaikh and Avery Ching, former engineers from Meta's Diem project. Like Sui, it uses the Move language to ensure digital resource security, but adopts an optimistic parallel execution model (Block-STM) reaching up to 160,000 TPS. The network has attracted 1.8 million daily transactions and 280,000 active addresses, with a particular focus on enterprise adoption and the Asian market through partnerships with Microsoft, Google Cloud, and Korean telecom operators. The roadmap targets modular upgradability without downtime and cross-chain interoperability.",
    },
  },
  cosmos: {
    name: 'Cosmos',
    ticker: 'ATOM',
    category: 'layer-1',
    risk: 'medium',
    brandColors: ['#2E3148', '#6F7390'],
    description: {
      it: "Definito \"l'Internet delle Blockchain\", Cosmos e' un ecosistema di chain sovrane interconnesse tramite il protocollo IBC (Inter-Blockchain Communication), lo standard piu' utilizzato per la comunicazione cross-chain. Il Cosmos SDK, il framework open-source per costruire blockchain application-specific, e' alla base di progetti di primo piano come Celestia (data availability layer), dYdX (exchange perpetui decentralizzato), Osmosis (DEX cross-chain) e la BNB Chain di Binance. La rete conta 95 sviluppatori attivi e oltre 150.000 transazioni giornaliere. Il token ATOM governa il Cosmos Hub e fornisce sicurezza economica tramite interchain security alle chain connesse.",
      en: 'Known as "the Internet of Blockchains," Cosmos is an ecosystem of sovereign chains interconnected via the IBC (Inter-Blockchain Communication) protocol, the most widely used standard for cross-chain communication. The Cosmos SDK, the open-source framework for building application-specific blockchains, powers leading projects like Celestia (data availability layer), dYdX (decentralized perpetual exchange), Osmosis (cross-chain DEX), and Binance\'s BNB Chain. The network has 95 active developers and over 150,000 daily transactions. The ATOM token governs the Cosmos Hub and provides economic security through interchain security to connected chains.',
    },
  },
  toncoin: {
    name: 'Toncoin',
    ticker: 'TON',
    category: 'layer-1',
    risk: 'medium-high',
    brandColors: ['#0098EA', '#232328'],
    description: {
      it: "La blockchain originariamente progettata da Telegram e ora sviluppata dalla community open-source TON Foundation. Integrata nativamente nell'app Telegram con oltre 900 milioni di utenti, TON rappresenta il piu' grande esperimento di adozione crypto di massa attraverso mini-app, wallet integrati e pagamenti in-chat. La rete elabora 5,2 milioni di transazioni giornaliere con 890.000 indirizzi attivi, grazie a un'architettura multi-chain con sharding infinito che garantisce scalabilita' teoricamente illimitata. L'ecosistema e' esploso nel 2024-2025 con giochi tap-to-earn come Hamster Kombat e Notcoin, portando milioni di nuovi utenti nel mondo crypto per la prima volta.",
      en: "The blockchain originally designed by Telegram and now developed by the open-source TON Foundation. Natively integrated into the Telegram app with over 900 million users, TON represents the largest crypto mass adoption experiment through mini-apps, built-in wallets, and in-chat payments. The network processes 5.2 million daily transactions with 890,000 active addresses, thanks to a multi-chain architecture with infinite sharding that guarantees theoretically unlimited scalability. The ecosystem exploded in 2024-2025 with tap-to-earn games like Hamster Kombat and Notcoin, bringing millions of new users into the crypto world for the first time.",
    },
  },

  // ─── PAYMENTS ─────────────────────────────────────────────
  ripple: {
    name: 'XRP',
    ticker: 'XRP',
    category: 'payments',
    risk: 'medium',
    brandColors: ['#000000', '#FFFFFF'],
    description: {
      it: "Progettato per pagamenti transfrontalieri veloci ed efficienti, XRP regola le transazioni in 3-5 secondi con costi inferiori a $0,01. L'XRP Ledger (XRPL) utilizza un protocollo di consenso federato (non PoW ne' PoS) che lo rende estremamente efficiente dal punto di vista energetico. Dopo la vittoria parziale nella causa SEC nel 2023, XRP ha visto un rinnovato interesse istituzionale e la crescita dell'ecosistema AMM nativo e delle sidechain EVM. Ripple, l'azienda dietro la rete, gestisce RippleNet con oltre 300 istituzioni finanziarie partner in 40+ paesi, e ha lanciato la stablecoin RLUSD per competere nel mercato dei pagamenti regolamentati.",
      en: "Designed for fast and efficient cross-border payments, XRP settles transactions in 3-5 seconds with costs below $0.01. The XRP Ledger (XRPL) uses a federated consensus protocol (neither PoW nor PoS) making it extremely energy efficient. After the partial SEC lawsuit victory in 2023, XRP has seen renewed institutional interest and growth of the native AMM and EVM sidechains ecosystem. Ripple, the company behind the network, operates RippleNet with over 300 financial institution partners in 40+ countries, and has launched the RLUSD stablecoin to compete in the regulated payments market.",
    },
  },
  stellar: {
    name: 'Stellar',
    ticker: 'XLM',
    category: 'payments',
    risk: 'medium',
    brandColors: ['#7C49E8', '#000000'],
    description: {
      it: "Una rete di pagamenti open-source fondata nel 2014 da Jed McCaleb (co-fondatore di Ripple) per rendere i servizi finanziari accessibili a chi non ha accesso bancario. Stellar elabora transazioni in 3-5 secondi con commissioni di 0,00001 XLM (frazioni di centesimo) ed e' progettata per i micropagamenti e le rimesse internazionali. La piattaforma Soroban per smart contract, lanciata nel 2024, ha ampliato le capacita' della rete verso la DeFi e la tokenizzazione. Stellar collabora con MoneyGram per pagamenti fiat-crypto e ha gestito il progetto pilota CBDC dell'Ucraina, con oltre 800.000 indirizzi attivi e partnership con governi e ONG in paesi in via di sviluppo.",
      en: "An open-source payment network founded in 2014 by Jed McCaleb (Ripple co-founder) to make financial services accessible to the unbanked. Stellar processes transactions in 3-5 seconds with fees of 0.00001 XLM (fractions of a cent) and is designed for micropayments and international remittances. The Soroban smart contract platform, launched in 2024, expanded the network's capabilities toward DeFi and tokenization. Stellar partners with MoneyGram for fiat-crypto payments and managed Ukraine's CBDC pilot project, with over 800,000 active addresses and partnerships with governments and NGOs in developing countries.",
    },
  },
  litecoin: {
    name: 'Litecoin',
    ticker: 'LTC',
    category: 'payments',
    risk: 'medium',
    brandColors: ['#345D9D', '#BFBBBB'],
    description: {
      it: "Creata nel 2011 da Charlie Lee, ex ingegnere di Google, come versione piu' leggera e veloce di Bitcoin. Litecoin genera blocchi ogni 2,5 minuti (vs. 10 di Bitcoin) e utilizza l'algoritmo Scrypt invece di SHA-256, rendendo il mining piu' accessibile. Con l'implementazione di MimbleWimble Extension Blocks (MWEB) nel 2022, Litecoin offre transazioni opzionalmente confidenziali per una maggiore privacy. E' una delle criptovalute piu' longeve e ampiamente accettata come metodo di pagamento in oltre 100.000 esercizi commerciali tramite integrazioni con BitPay e altri processori. La sua supply massima di 84 milioni di LTC (4x Bitcoin) e il meccanismo di halving ogni 840.000 blocchi ne mantengono la scarsita' programmata.",
      en: "Created in 2011 by Charlie Lee, a former Google engineer, as a lighter and faster version of Bitcoin. Litecoin generates blocks every 2.5 minutes (vs. Bitcoin's 10) and uses the Scrypt algorithm instead of SHA-256, making mining more accessible. With the implementation of MimbleWimble Extension Blocks (MWEB) in 2022, Litecoin offers optionally confidential transactions for enhanced privacy. It is one of the longest-running cryptocurrencies and widely accepted as a payment method in over 100,000 merchants through integrations with BitPay and other processors. Its maximum supply of 84 million LTC (4x Bitcoin) and halving mechanism every 840,000 blocks maintain its programmed scarcity.",
    },
  },

  // ─── DEFI ─────────────────────────────────────────────────
  chainlink: {
    name: 'Chainlink',
    ticker: 'LINK',
    category: 'defi',
    risk: 'medium',
    brandColors: ['#2A5ADA', '#FFFFFF'],
    description: {
      it: "La principale rete oracolo decentralizzata che collega gli smart contract ai dati del mondo reale, alimentando oltre il 60% di tutti i protocolli DeFi. Chainlink fornisce feed di prezzo, numeri casuali verificabili (VRF), automazione on-chain (Keepers) e il protocollo CCIP per la comunicazione cross-chain sicura. Con 250 sviluppatori attivi e partnership con SWIFT, Google Cloud e oltre 2.000 progetti, Chainlink e' l'infrastruttura piu' critica dell'ecosistema crypto dopo Ethereum stesso. Il meccanismo di staking LINK, lanciato nel 2023, allinea gli incentivi economici dei node operator alla qualita' dei dati forniti, con oltre $700 milioni in stake.",
      en: "The leading decentralized oracle network connecting smart contracts to real-world data, powering over 60% of all DeFi protocols. Chainlink provides price feeds, verifiable random numbers (VRF), on-chain automation (Keepers), and the CCIP protocol for secure cross-chain communication. With 250 active developers and partnerships with SWIFT, Google Cloud, and over 2,000 projects, Chainlink is the most critical infrastructure in the crypto ecosystem after Ethereum itself. The LINK staking mechanism, launched in 2023, aligns node operators' economic incentives with data quality, with over $700 million staked.",
    },
  },
  aave: {
    name: 'Aave',
    ticker: 'AAVE',
    category: 'defi',
    risk: 'medium-high',
    brandColors: ['#4B0082', '#FFFFFF'],
    description: {
      it: "Il protocollo di prestito e indebitamento decentralizzato piu' grande per TVL, con oltre $12,5 miliardi di valore bloccato su 8 blockchain diverse. Aave ha rivoluzionato la DeFi introducendo i flash loan (prestiti istantanei senza collaterale, rimborsati nella stessa transazione) e tassi di interesse variabili algoritmici. Il protocollo e' gestito dall'Aave DAO con oltre 55 sviluppatori attivi e ha un track record impeccabile di sicurezza con audit di Spearbit e OpenZeppelin. Aave v4, in fase di sviluppo, introduce un unified liquidity layer e la stablecoin nativa GHO, posizionando il protocollo come una vera e propria banca decentralizzata con ambizioni nel settore dei pagamenti istituzionali.",
      en: "The largest decentralized lending and borrowing protocol by TVL, with over $12.5 billion in value locked across 8 different blockchains. Aave revolutionized DeFi by introducing flash loans (instant uncollateralized loans repaid within the same transaction) and algorithmic variable interest rates. The protocol is governed by the Aave DAO with over 55 active developers and has an impeccable security track record with audits from Spearbit and OpenZeppelin. Aave v4, under development, introduces a unified liquidity layer and the native GHO stablecoin, positioning the protocol as a true decentralized bank with ambitions in institutional payments.",
    },
  },
  uniswap: {
    name: 'Uniswap',
    ticker: 'UNI',
    category: 'defi',
    risk: 'medium-high',
    brandColors: ['#FF007A', '#AA0469'],
    description: {
      it: "Il piu' grande exchange decentralizzato (DEX) per volume di trading, con oltre $8,2 miliardi di TVL e 95.000 transazioni giornaliere su 10+ chain. Uniswap ha rivoluzionato il trading crypto inventando il modello Automated Market Maker (AMM) nel 2018, eliminando la necessita' di order book centralizzati. La versione V3 ha introdotto la liquidita' concentrata, permettendo ai liquidity provider di allocare capitale in range di prezzo specifici per massimizzare i rendimenti. Uniswap v4, attualmente in deployment, introduce gli Hooks — plugin personalizzabili che permettono a sviluppatori terzi di aggiungere logica custom ai pool di liquidita', aprendo possibilita' come limit order on-chain, fee dinamiche e strategie di market making automatizzate.",
      en: "The largest decentralized exchange (DEX) by trading volume, with over $8.2 billion in TVL and 95,000 daily transactions across 10+ chains. Uniswap revolutionized crypto trading by inventing the Automated Market Maker (AMM) model in 2018, eliminating the need for centralized order books. V3 introduced concentrated liquidity, allowing liquidity providers to allocate capital within specific price ranges to maximize returns. Uniswap v4, currently being deployed, introduces Hooks — customizable plugins that allow third-party developers to add custom logic to liquidity pools, enabling possibilities like on-chain limit orders, dynamic fees, and automated market-making strategies.",
    },
  },
  maker: {
    name: 'Maker',
    ticker: 'MKR',
    category: 'defi',
    risk: 'medium',
    brandColors: ['#1AAB9B', '#222222'],
    description: {
      it: "Il protocollo fondatore della DeFi su Ethereum, creato nel 2015, che governa DAI — la stablecoin decentralizzata piu' utilizzata con una capitalizzazione di oltre $5 miliardi. MakerDAO permette agli utenti di generare DAI depositando collaterale (ETH, WBTC, stETH e altri asset) nei Maker Vault, con un sistema di liquidazione autonomo che mantiene il peg al dollaro. Con il programma \"Endgame\" lanciato nel 2024, Maker ha espanso il proprio portafoglio includendo titoli del Tesoro USA tokenizzati e obbligazioni corporate per oltre $2 miliardi, diventando di fatto il piu' grande fondo di RWA on-chain. Il protocollo Spark (ex-Spark Protocol) offre tassi competitivi di prestito DAI, rivaleggiando con la finanza tradizionale.",
      en: 'The founding DeFi protocol on Ethereum, created in 2015, governing DAI — the most widely used decentralized stablecoin with a market cap exceeding $5 billion. MakerDAO allows users to generate DAI by depositing collateral (ETH, WBTC, stETH, and other assets) into Maker Vaults, with an autonomous liquidation system that maintains the dollar peg. With the "Endgame" program launched in 2024, Maker expanded its portfolio to include tokenized US Treasury securities and corporate bonds worth over $2 billion, effectively becoming the largest on-chain RWA fund. The Spark protocol (formerly Spark Protocol) offers competitive DAI lending rates, rivaling traditional finance.',
    },
  },
  'lido-dao': {
    name: 'Lido DAO',
    ticker: 'LDO',
    category: 'defi',
    risk: 'medium-high',
    brandColors: ['#00A3FF', '#F69988'],
    description: {
      it: "Il piu' grande protocollo di liquid staking al mondo, con oltre $15,2 miliardi in TVL e una quota dominante del mercato dello staking di Ethereum. Lido consente agli utenti di fare staking di ETH ricevendo in cambio stETH, un token liquido che rappresenta l'ETH in staking e che puo' essere utilizzato come collaterale in altri protocolli DeFi, moltiplicando i rendimenti. Il protocollo gestisce circa il 28% di tutto l'ETH in staking, con oltre 4.200 indirizzi attivi e 52 sviluppatori. Lido v2 ha introdotto il meccanismo di unstaking diretto e il Community Staking Module (CSM) che permette a chiunque con 1,5 ETH di diventare node operator, decentralizzando progressivamente la validazione. Il token LDO governa il DAO che decide sugli aggiornamenti del protocollo, le fee e i parametri di rischio.",
      en: "The world's largest liquid staking protocol, with over $15.2 billion in TVL and a dominant share of the Ethereum staking market. Lido allows users to stake ETH and receive stETH in return, a liquid token representing staked ETH that can be used as collateral in other DeFi protocols, multiplying yields. The protocol manages approximately 28% of all staked ETH, with over 4,200 active addresses and 52 developers. Lido v2 introduced the direct unstaking mechanism and the Community Staking Module (CSM) allowing anyone with 1.5 ETH to become a node operator, progressively decentralizing validation. The LDO token governs the DAO that decides on protocol upgrades, fees, and risk parameters.",
    },
  },
  pendle: {
    name: 'Pendle',
    ticker: 'PENDLE',
    category: 'defi',
    risk: 'high',
    brandColors: ['#26D9FE', '#5041F4'],
    description: {
      it: "Un protocollo DeFi innovativo che ha introdotto il concetto di yield tokenization su blockchain, raggiungendo $3,2 miliardi di TVL. Pendle separa qualsiasi asset che genera rendimento in due componenti: il Principal Token (PT, che rappresenta il capitale) e lo Yield Token (YT, che rappresenta i rendimenti futuri), consentendo il trading speculativo sui tassi di interesse. Questa meccanica ha trovato enorme adozione durante la stagione dei punti e degli airdrop, dove gli utenti potevano amplificare la propria esposizione ai programmi di incentivi. Con 28 sviluppatori attivi e un AMM specializzato basato sulla curva di Notional, Pendle si e' affermato come il protocollo di riferimento per le strategie di yield avanzate, con integrazioni su Ethereum, Arbitrum e BNB Chain.",
      en: "An innovative DeFi protocol that introduced the concept of yield tokenization on blockchain, reaching $3.2 billion in TVL. Pendle separates any yield-bearing asset into two components: the Principal Token (PT, representing capital) and the Yield Token (YT, representing future yields), enabling speculative trading on interest rates. This mechanism found enormous adoption during the points and airdrop season, where users could amplify their exposure to incentive programs. With 28 active developers and a specialized AMM based on Notional's curve, Pendle has established itself as the go-to protocol for advanced yield strategies, with integrations on Ethereum, Arbitrum, and BNB Chain.",
    },
  },

  // ─── LAYER 2 / INFRASTRUCTURE ─────────────────────────────
  'matic-network': {
    name: 'Polygon',
    ticker: 'POL',
    category: 'layer-2',
    risk: 'medium',
    brandColors: ['#8247E5', '#FFFFFF'],
    description: {
      it: "La principale soluzione di scaling per Ethereum, con un ecosistema che include PoS chain, zkEVM rollup e la visione AggLayer per l'interoperabilita' tra chain. Polygon elabora 3,2 milioni di transazioni giornaliere con 420.000 indirizzi attivi e ospita migliaia di dApp tra cui Aavegotchi, QuickSwap e partnership enterprise con Starbucks, Nike e Reddit. Nel 2024 il token MATIC e' stato migrato a POL, un token iper-produttivo che alimenta staking, governance e il pagamento delle fee su tutte le chain dell'ecosistema. La tecnologia zkEVM di Polygon, sviluppata in collaborazione con Ethereum Foundation, mira a offrire scalabilita' con piena compatibilita' EVM e la sicurezza delle prove a conoscenza zero.",
      en: "The leading scaling solution for Ethereum, with an ecosystem including PoS chain, zkEVM rollup, and the AggLayer vision for cross-chain interoperability. Polygon processes 3.2 million daily transactions with 420,000 active addresses and hosts thousands of dApps including Aavegotchi, QuickSwap, and enterprise partnerships with Starbucks, Nike, and Reddit. In 2024, the MATIC token was migrated to POL, a hyper-productive token powering staking, governance, and fee payments across all ecosystem chains. Polygon's zkEVM technology, developed in collaboration with the Ethereum Foundation, aims to offer scalability with full EVM compatibility and zero-knowledge proof security.",
    },
  },
  arbitrum: {
    name: 'Arbitrum',
    ticker: 'ARB',
    category: 'layer-2',
    risk: 'medium-high',
    brandColors: ['#28A0F0', '#1B4ADD'],
    description: {
      it: "Il Layer 2 di Ethereum con il TVL piu' alto ($3,5 miliardi), basato su tecnologia Optimistic Rollup sviluppata da Offchain Labs. Arbitrum elabora 1,8 milioni di transazioni giornaliere con fee 10-50x inferiori a Ethereum mainnet, mantenendo la piena compatibilita' EVM. L'ecosistema DeFi e' tra i piu' vivaci del settore con GMX (exchange perpetui), Camelot (DEX nativo), Radiant Capital e centinaia di protocolli. La piattaforma Orbit permette a chiunque di lanciare la propria chain Layer 3 basata su Arbitrum, mentre Stylus abilita la scrittura di smart contract in Rust, C e C++ oltre a Solidity, ampliando enormemente la base di sviluppatori. Con 68 sviluppatori attivi e una governance DAO con oltre 600.000 delegati, Arbitrum e' il rollup di riferimento per l'ecosistema Ethereum.",
      en: "Ethereum's Layer 2 with the highest TVL ($3.5 billion), based on Optimistic Rollup technology developed by Offchain Labs. Arbitrum processes 1.8 million daily transactions with fees 10-50x lower than Ethereum mainnet, maintaining full EVM compatibility. The DeFi ecosystem is among the most vibrant in the industry with GMX (perpetual exchange), Camelot (native DEX), Radiant Capital, and hundreds of protocols. The Orbit platform allows anyone to launch their own Layer 3 chain based on Arbitrum, while Stylus enables writing smart contracts in Rust, C, and C++ in addition to Solidity, vastly expanding the developer base. With 68 active developers and a governance DAO with over 600,000 delegates, Arbitrum is the reference rollup for the Ethereum ecosystem.",
    },
  },
  optimism: {
    name: 'Optimism',
    ticker: 'OP',
    category: 'layer-2',
    risk: 'medium-high',
    brandColors: ['#FF0420', '#FFFFFF'],
    description: {
      it: "Un Layer 2 Optimistic Rollup di Ethereum con la visione ambiziosa del Superchain: una rete di rollup interoperabili che condividono sicurezza, bridge e governance. L'OP Stack, il framework open-source di Optimism, alimenta Base (la chain di Coinbase con 2+ milioni di utenti), Zora, Mode e decine di altre chain, creando un effetto rete senza precedenti. La rete elabora 1,2 milioni di transazioni giornaliere con $2,8 miliardi di TVL e 62 sviluppatori attivi. Il modello di governance innovativo RetroPGF (Retroactive Public Goods Funding) ha distribuito oltre $200 milioni per finanziare beni pubblici dell'ecosistema Ethereum, attirando sviluppatori e progetti che contribuiscono all'infrastruttura open-source.",
      en: "An Ethereum Optimistic Rollup Layer 2 with the ambitious Superchain vision: a network of interoperable rollups sharing security, bridges, and governance. The OP Stack, Optimism's open-source framework, powers Base (Coinbase's chain with 2+ million users), Zora, Mode, and dozens of other chains, creating an unprecedented network effect. The network processes 1.2 million daily transactions with $2.8 billion in TVL and 62 active developers. The innovative RetroPGF (Retroactive Public Goods Funding) governance model has distributed over $200 million to fund Ethereum ecosystem public goods, attracting developers and projects contributing to open-source infrastructure.",
    },
  },
  starknet: {
    name: 'StarkNet',
    ticker: 'STRK',
    category: 'layer-2',
    risk: 'high',
    brandColors: ['#EC796B', '#1B1B5E'],
    description: {
      it: "Un Layer 2 di Ethereum basato su prove a conoscenza zero ZK-STARK, sviluppato da StarkWare, l'azienda che ha inventato la tecnologia STARK. A differenza dei rollup ottimistici, StarkNet verifica ogni transazione matematicamente prima di pubblicarla su Ethereum, offrendo finalita' immediata senza periodo di challenge. La rete utilizza Cairo, un linguaggio di programmazione specializzato per prove computazionali, ed elabora 250.000 transazioni giornaliere con $450 milioni di TVL. Con 55 sviluppatori attivi, StarkNet punta su scalabilita' teoricamente illimitata attraverso prove ricorsive (proving su proving) e la generazione di prove su GPU per ridurre drasticamente i costi. L'ecosistema include protocolli nativi come Ekubo (DEX), zkLend e Nostra Finance, con un focus crescente su privacy e gaming on-chain.",
      en: "An Ethereum Layer 2 based on ZK-STARK zero-knowledge proofs, developed by StarkWare, the company that invented STARK technology. Unlike optimistic rollups, StarkNet mathematically verifies every transaction before publishing it to Ethereum, offering immediate finality without a challenge period. The network uses Cairo, a specialized programming language for computational proofs, and processes 250,000 daily transactions with $450 million in TVL. With 55 active developers, StarkNet targets theoretically unlimited scalability through recursive proofs (proving on proving) and GPU proof generation to drastically reduce costs. The ecosystem includes native protocols like Ekubo (DEX), zkLend, and Nostra Finance, with a growing focus on privacy and on-chain gaming.",
    },
  },

  // ─── GAMING / METAVERSE ───────────────────────────────────
  'immutable-x': {
    name: 'Immutable X',
    ticker: 'IMX',
    category: 'gaming',
    risk: 'high',
    brandColors: ['#00D1FF', '#001C40'],
    description: {
      it: "La piattaforma leader per il gaming Web3, con una soluzione Layer 2 costruita appositamente per NFT e giochi blockchain su Ethereum. Immutable X offre minting e trading di NFT senza gas fee (zero gas per gli utenti finali) mantenendo la sicurezza a livello di Ethereum tramite la tecnologia StarkEx. La piattaforma ospita oltre 200 giochi in sviluppo, tra cui Illuvium, Gods Unchained e Guild of Guardians, con 32 sviluppatori attivi. La migrazione verso zkEVM (in partnership con Polygon) e il lancio di Immutable Passport (sistema di login Web3 semplificato) puntano a ridurre drasticamente le barriere d'ingresso per i gamer tradizionali, con l'obiettivo di portare i prossimi 100 milioni di giocatori nel Web3.",
      en: "The leading platform for Web3 gaming, with a Layer 2 solution purpose-built for NFTs and blockchain games on Ethereum. Immutable X offers gas-free NFT minting and trading (zero gas for end users) while maintaining Ethereum-level security through StarkEx technology. The platform hosts over 200 games in development, including Illuvium, Gods Unchained, and Guild of Guardians, with 32 active developers. The migration to zkEVM (in partnership with Polygon) and the launch of Immutable Passport (simplified Web3 login system) aim to drastically reduce entry barriers for traditional gamers, with the goal of bringing the next 100 million players into Web3.",
    },
  },
  'the-sandbox': {
    name: 'The Sandbox',
    ticker: 'SAND',
    category: 'gaming',
    risk: 'high',
    brandColors: ['#00ADEF', '#FFFFFF'],
    description: {
      it: "Un mondo virtuale decentralizzato dove i giocatori possono costruire, possedere e monetizzare le proprie esperienze di gioco utilizzando NFT e il token SAND. The Sandbox ha attirato partnership di alto profilo con brand come Gucci, Adidas, Warner Music e The Walking Dead, vendendo terreni virtuali (LAND) per milioni di dollari durante il boom del metaverso 2021-2022. Tuttavia, il progetto ha visto un calo significativo dell'attivita' con soli 3.200 indirizzi attivi e 5.000 transazioni giornaliere, sollevando preoccupazioni sulla sostenibilita' a lungo termine del modello metaverso. Il team di 200 persone continua lo sviluppo con l'aggiornamento alla stagione 4 e nuove esperienze interattive, ma la competizione con piattaforme centralizzate come Roblox e Fortnite rimane una sfida critica.",
      en: "A decentralized virtual world where players can build, own, and monetize their gaming experiences using NFTs and the SAND token. The Sandbox attracted high-profile partnerships with brands like Gucci, Adidas, Warner Music, and The Walking Dead, selling virtual land (LAND) for millions of dollars during the 2021-2022 metaverse boom. However, the project has seen a significant decline in activity with only 3,200 active addresses and 5,000 daily transactions, raising concerns about the long-term sustainability of the metaverse model. The 200-person team continues development with the Season 4 update and new interactive experiences, but competition with centralized platforms like Roblox and Fortnite remains a critical challenge.",
    },
  },
  'axie-infinity': {
    name: 'Axie Infinity',
    ticker: 'AXS',
    category: 'gaming',
    risk: 'high',
    brandColors: ['#0055D5', '#54CDF0'],
    description: {
      it: "Il gioco play-to-earn che ha dato il via alla rivoluzione del gaming blockchain nel 2021, raggiungendo 2,7 milioni di giocatori attivi giornalieri al picco. Sviluppato da Sky Mavis, Axie Infinity permette ai giocatori di collezionare, allevare e combattere creature digitali (Axie) rappresentate come NFT. Il progetto ha avuto un impatto sociale enorme nelle Filippine, dove migliaia di persone hanno guadagnato un reddito durante la pandemia giocando. Dopo l'hack del Ronin Bridge nel 2022 ($625 milioni rubati, il piu' grande hack DeFi della storia) e il crollo del modello economico play-to-earn, l'attivita' e' calata drasticamente a 12.000 indirizzi attivi. Il team sta ricostruendo con Axie Origins (free-to-play) e la blockchain Ronin riprogettata, ma il recupero della fiducia e dell'utenza resta una sfida aperta.",
      en: "The play-to-earn game that launched the blockchain gaming revolution in 2021, reaching 2.7 million daily active players at its peak. Developed by Sky Mavis, Axie Infinity allows players to collect, breed, and battle digital creatures (Axies) represented as NFTs. The project had an enormous social impact in the Philippines, where thousands of people earned income during the pandemic by playing. After the Ronin Bridge hack in 2022 ($625 million stolen, the largest DeFi hack in history) and the collapse of the play-to-earn economic model, activity dropped drastically to 12,000 active addresses. The team is rebuilding with Axie Origins (free-to-play) and a redesigned Ronin blockchain, but recovering trust and user base remains an open challenge.",
    },
  },
  gala: {
    name: 'Gala Games',
    ticker: 'GALA',
    category: 'gaming',
    risk: 'high',
    brandColors: ['#FFFFFF', '#000000'],
    description: {
      it: "Una piattaforma di gaming e intrattenimento blockchain fondata da Eric Schiermeyer, co-fondatore di Zynga (FarmVille). Gala Games punta a ridare il controllo ai giocatori con un ecosistema di giochi che include Spider Tanks, Town Star e il MMORPG Mirandus, tutti con vera proprieta' degli asset digitali tramite NFT. La piattaforma si e' espansa in Gala Music e Gala Film per coprire l'intero spettro dell'intrattenimento Web3. Con il lancio di GalaChain, una blockchain proprietaria costruita su Hyperledger Fabric, il progetto mira a risolvere i problemi di scalabilita' e costi che affliggono il gaming blockchain. L'ecosistema conta 22 sviluppatori attivi e 8.500 indirizzi attivi, con un focus sulla qualita' dei giochi per attrarre gamer tradizionali oltre ai crypto-nativi.",
      en: "A blockchain gaming and entertainment platform founded by Eric Schiermeyer, co-founder of Zynga (FarmVille). Gala Games aims to give control back to players with a gaming ecosystem including Spider Tanks, Town Star, and the MMORPG Mirandus, all with true digital asset ownership through NFTs. The platform expanded into Gala Music and Gala Film to cover the entire Web3 entertainment spectrum. With the launch of GalaChain, a proprietary blockchain built on Hyperledger Fabric, the project aims to solve the scalability and cost issues plaguing blockchain gaming. The ecosystem has 22 active developers and 8,500 active addresses, with a focus on game quality to attract traditional gamers beyond crypto-natives.",
    },
  },

  // ─── AI ───────────────────────────────────────────────────
  'render-token': {
    name: 'Render',
    ticker: 'RNDR',
    category: 'ai',
    risk: 'high',
    brandColors: ['#FF6B00', '#CC3300'],
    description: {
      it: "Una rete decentralizzata di rendering GPU che collega artisti, studi di produzione e sviluppatori AI con potenza di calcolo inutilizzata in tutto il mondo. Render tokenizza il tempo GPU, permettendo a chiunque di noleggiare la propria scheda grafica o di accedere a rendering cinematografico a costi fino al 90% inferiori rispetto ai servizi cloud tradizionali. La migrazione su Solana nel 2023 ha migliorato velocita' e costi delle transazioni. Con partnership strategiche con Apple (integrazione con la piattaforma Vision Pro), OTOY (rendering di Hollywood) e Stability AI, Render si posiziona all'intersezione tra AI generativa, rendering 3D, metaverso e computing decentralizzato (DePIN). La rete conta 28 sviluppatori attivi e oltre 5.500 node operator che forniscono potenza di calcolo.",
      en: "A decentralized GPU rendering network connecting artists, production studios, and AI developers with idle computing power worldwide. Render tokenizes GPU time, allowing anyone to rent out their graphics card or access cinematic rendering at costs up to 90% lower than traditional cloud services. The migration to Solana in 2023 improved transaction speed and costs. With strategic partnerships with Apple (Vision Pro platform integration), OTOY (Hollywood rendering), and Stability AI, Render positions itself at the intersection of generative AI, 3D rendering, metaverse, and decentralized computing (DePIN). The network has 28 active developers and over 5,500 node operators providing computing power.",
    },
  },
  'fetch-ai': {
    name: 'Fetch.ai',
    ticker: 'FET',
    category: 'ai',
    risk: 'high',
    brandColors: ['#02021E', '#00E0FF'],
    description: {
      it: "Una piattaforma blockchain dedicata agli agenti economici autonomi — programmi AI che possono negoziare, scambiare dati ed eseguire operazioni per conto degli utenti senza intervento umano. Fetch.ai e' confluita nell'Artificial Superintelligence Alliance (ASI) insieme a SingularityNET e Ocean Protocol, creando il piu' grande progetto di AI decentralizzata con una capitalizzazione combinata di oltre $6 miliardi. La rete fornisce infrastruttura per agenti AI che operano in ambiti come supply chain optimization, DeFi trading automatizzato, gestione energetica e mobilita' urbana. Con 42 sviluppatori attivi, 15.000 indirizzi attivi e partnership con Bosch, Deutsche Telekom e il governo di Abu Dhabi, Fetch.ai punta a diventare il layer fondamentale per l'economia degli agenti autonomi nel Web3.",
      en: "A blockchain platform dedicated to autonomous economic agents — AI programs that can negotiate, exchange data, and execute operations on behalf of users without human intervention. Fetch.ai merged into the Artificial Superintelligence Alliance (ASI) alongside SingularityNET and Ocean Protocol, creating the largest decentralized AI project with a combined market cap exceeding $6 billion. The network provides infrastructure for AI agents operating in areas such as supply chain optimization, automated DeFi trading, energy management, and urban mobility. With 42 active developers, 15,000 active addresses, and partnerships with Bosch, Deutsche Telekom, and the Abu Dhabi government, Fetch.ai aims to become the foundational layer for the autonomous agent economy in Web3.",
    },
  },
  bittensor: {
    name: 'Bittensor',
    ticker: 'TAO',
    category: 'ai',
    risk: 'high',
    brandColors: ['#000000', '#FFFFFF'],
    description: {
      it: "Un protocollo decentralizzato per l'addestramento e l'inferenza di modelli di intelligenza artificiale, spesso definito il 'Bitcoin dell'AI'. Bittensor crea un mercato aperto dove chiunque puo' contribuire con modelli AI (da text generation a image recognition) e guadagnare token TAO in base alla qualita' dell'output valutata da una rete di validatori. L'architettura a subnet permette la creazione di reti specializzate: esistono subnet per text-to-image, trading signals, data scraping, traduzione e molto altro, con oltre 30 subnet attive. Con una capitalizzazione di $3,8 miliardi e 38 sviluppatori attivi, Bittensor e' il progetto AI-crypto con la crescita piu' esplosiva, ma la complessita' tecnica e la concentrazione del mining tra pochi operatori sollevano questioni sulla reale decentralizzazione.",
      en: 'A decentralized protocol for training and inference of artificial intelligence models, often called the \'Bitcoin of AI.\' Bittensor creates an open market where anyone can contribute AI models (from text generation to image recognition) and earn TAO tokens based on output quality evaluated by a validator network. The subnet architecture enables the creation of specialized networks: subnets exist for text-to-image, trading signals, data scraping, translation, and more, with over 30 active subnets. With a $3.8 billion market cap and 38 active developers, Bittensor is the AI-crypto project with the most explosive growth, but technical complexity and mining concentration among few operators raise questions about true decentralization.',
    },
  },
  'akash-network': {
    name: 'Akash',
    ticker: 'AKT',
    category: 'ai',
    risk: 'high',
    brandColors: ['#FF414C', '#232323'],
    description: {
      it: "Un marketplace decentralizzato di cloud computing costruito su Cosmos SDK che offre risorse GPU e CPU a costi fino all'85% inferiori rispetto ai provider centralizzati come AWS, Google Cloud e Azure. Akash funziona come un 'Airbnb del cloud computing': i provider con capacita' inutilizzata (data center, miner, aziende) possono affittare le proprie risorse, mentre gli sviluppatori AI e machine learning accedono a GPU NVIDIA A100 e H100 a prezzi competitivi. Con la crescente domanda di GPU per l'addestramento di modelli AI generativi, Akash ha visto una crescita del 300% nell'utilizzo della rete nel 2025. Il protocollo conta 32 sviluppatori attivi, 2.800 indirizzi attivi e ha elaborato oltre $10 milioni in pagamenti per servizi cloud, posizionandosi come l'alternativa decentralizzata piu' credibile nel settore DePIN (Decentralized Physical Infrastructure Network).",
      en: "A decentralized cloud computing marketplace built on Cosmos SDK offering GPU and CPU resources at costs up to 85% lower than centralized providers like AWS, Google Cloud, and Azure. Akash works as an 'Airbnb for cloud computing': providers with unused capacity (data centers, miners, companies) can rent out their resources, while AI and machine learning developers access NVIDIA A100 and H100 GPUs at competitive prices. With growing GPU demand for training generative AI models, Akash saw a 300% increase in network utilization in 2025. The protocol has 32 active developers, 2,800 active addresses, and has processed over $10 million in cloud service payments, positioning itself as the most credible decentralized alternative in the DePIN (Decentralized Physical Infrastructure Network) sector.",
    },
  },

  // ─── MEME ─────────────────────────────────────────────────
  dogecoin: {
    name: 'Dogecoin',
    ticker: 'DOGE',
    category: 'meme',
    risk: 'high',
    brandColors: ['#C2A633', '#65502B'],
    description: {
      it: "La meme coin originale, creata nel 2013 da Billy Markus e Jackson Palmer come parodia di Bitcoin con il meme del cane Shiba Inu 'Doge'. Quella che doveva essere una battuta e' diventata una delle criptovalute piu' riconosciute al mondo con una market cap di $23,8 miliardi, spinta dalla community e dal supporto pubblico di Elon Musk. Dogecoin e' una blockchain Proof of Work basata su Litecoin (algoritmo Scrypt) con blocchi ogni minuto e nessun limite di supply (inflazione annua di ~5 miliardi di DOGE). Nonostante lo sviluppo minimo (solo 12 sviluppatori attivi), DOGE e' accettata come pagamento da Tesla Merchandise, AMC Theatres, Dallas Mavericks e oltre 2.000 esercizi commerciali. La proposta di Dogecoin Foundation per integrare utilita' DeFi e staking rimane in fase preliminare.",
      en: "The original meme coin, created in 2013 by Billy Markus and Jackson Palmer as a Bitcoin parody featuring the Shiba Inu 'Doge' meme. What was meant as a joke became one of the world's most recognized cryptocurrencies with a $23.8 billion market cap, driven by community and Elon Musk's public support. Dogecoin is a Proof of Work blockchain based on Litecoin (Scrypt algorithm) with blocks every minute and no supply cap (annual inflation of ~5 billion DOGE). Despite minimal development (only 12 active developers), DOGE is accepted as payment by Tesla Merchandise, AMC Theatres, Dallas Mavericks, and over 2,000 merchants. The Dogecoin Foundation's proposal to integrate DeFi utility and staking remains in preliminary stages.",
    },
  },
  'shiba-inu': {
    name: 'Shiba Inu',
    ticker: 'SHIB',
    category: 'meme',
    risk: 'high',
    brandColors: ['#F5A623', '#E2471B'],
    description: {
      it: "Nata nell'agosto 2020 come 'Dogecoin Killer', Shiba Inu si e' evoluta da semplice meme coin a un ecosistema multi-prodotto con una delle community piu' appassionate del settore crypto, la 'ShibArmy'. Il progetto include ShibaSwap (exchange decentralizzato), Shibarium (blockchain Layer 2 basata su Polygon con oltre 45.000 transazioni giornaliere), BONE (token di governance), LEASH (token a supply limitata) e un metaverso in sviluppo chiamato SHIB: The Metaverse. Nonostante l'ambizione, il progetto presenta red flag con soli 18 sviluppatori attivi, un calo significativo dell'engagement rispetto ai picchi del 2021-2022, e una tokenomics con supply di 589 trilioni di token (di cui 410 trilioni in circolazione dopo vari burn). Il rischio rimane elevato data la forte dipendenza dal sentiment di mercato e dalla narrativa meme.",
      en: 'Born in August 2020 as the \'Dogecoin Killer,\' Shiba Inu evolved from a simple meme coin to a multi-product ecosystem with one of the most passionate communities in crypto, the \'ShibArmy.\' The project includes ShibaSwap (decentralized exchange), Shibarium (Layer 2 blockchain based on Polygon with over 45,000 daily transactions), BONE (governance token), LEASH (limited supply token), and a metaverse in development called SHIB: The Metaverse. Despite its ambition, the project has red flags with only 18 active developers, a significant drop in engagement from 2021-2022 peaks, and tokenomics with a supply of 589 trillion tokens (410 trillion circulating after various burns). Risk remains high given strong dependence on market sentiment and meme narrative.',
    },
  },
  pepe: {
    name: 'Pepe',
    ticker: 'PEPE',
    category: 'meme',
    risk: 'high',
    brandColors: ['#4A8C3F', '#FFFFFF'],
    description: {
      it: "La meme coin ispirata al celebre meme internet Pepe the Frog, lanciata ad aprile 2023 e diventata virale raggiungendo una capitalizzazione di quasi $5 miliardi in pochi mesi. PEPE e' un token ERC-20 su Ethereum con una supply totale di 420,69 trilioni di token (un riferimento alla cultura meme), senza alcuna utility funzionale ne' roadmap di sviluppo dichiarata. Il progetto non ha un team identificabile, nessun developer attivo e zero audit di sicurezza, rendendolo puramente speculativo. Nonostante cio', PEPE ha generato volumi di trading superiori a $1,2 miliardi giornalieri nei picchi e mantiene una community attivissima su X (Twitter) e Telegram. Il token e' stato listato su tutti i principali exchange centralizzati (Binance, Coinbase, OKX) ed e' diventato il simbolo della 'meme coin season' del 2023-2024, dimostrando il potere della viralita' e della cultura meme nei mercati crypto.",
      en: "The meme coin inspired by the famous Pepe the Frog internet meme, launched in April 2023 and going viral, reaching nearly $5 billion market cap within months. PEPE is an ERC-20 token on Ethereum with a total supply of 420.69 trillion tokens (a meme culture reference), with no functional utility or declared development roadmap. The project has no identifiable team, no active developers, and zero security audits, making it purely speculative. Despite this, PEPE generated daily trading volumes exceeding $1.2 billion at peaks and maintains a highly active community on X (Twitter) and Telegram. The token has been listed on all major centralized exchanges (Binance, Coinbase, OKX) and became the symbol of the 2023-2024 'meme coin season,' demonstrating the power of virality and meme culture in crypto markets.",
    },
  },
  bonk: {
    name: 'Bonk',
    ticker: 'BONK',
    category: 'meme',
    risk: 'high',
    brandColors: ['#F5A623', '#FF6B35'],
    description: {
      it: "La prima meme coin dell'ecosistema Solana, lanciata a Natale 2022 come airdrop gratuito per la community Solana in un momento in cui l'ecosistema era in crisi dopo il crollo di FTX. Bonk ha giocato un ruolo fondamentale nel rivitalizzare l'interesse per Solana, stimolando l'adozione e l'integrazione in decine di dApp dell'ecosistema tra cui Jupiter (il piu' grande DEX aggregator su Solana), Orca e Raydium. Con il tema del Shiba Inu con un cappello da baseball, Bonk ha creato una cultura meme unica nell'ecosistema Solana. Il token ha raggiunto una market cap di $1,9 miliardi e 42.000 indirizzi attivi, con integrazioni in wallet, piattaforme di pagamento e persino terminali POS per pagamenti in negozio. Il programma di burn ha eliminato oltre 100 trilioni di token dalla supply. Nonostante gli 8 sviluppatori e la natura meme, Bonk e' diventato un simbolo della resilienza della community Solana.",
      en: "The first meme coin of the Solana ecosystem, launched on Christmas 2022 as a free airdrop for the Solana community at a time when the ecosystem was in crisis following the FTX collapse. Bonk played a fundamental role in revitalizing interest in Solana, stimulating adoption and integration across dozens of ecosystem dApps including Jupiter (Solana's largest DEX aggregator), Orca, and Raydium. With the theme of a Shiba Inu wearing a baseball cap, Bonk created a unique meme culture within the Solana ecosystem. The token reached a $1.9 billion market cap and 42,000 active addresses, with integrations in wallets, payment platforms, and even POS terminals for in-store payments. The burn program has eliminated over 100 trillion tokens from supply. Despite 8 developers and its meme nature, Bonk has become a symbol of the Solana community's resilience.",
    },
  },

  // ─── RWA (Real World Assets) ──────────────────────────────
  'ondo-finance': {
    name: 'Ondo Finance',
    ticker: 'ONDO',
    category: 'rwa',
    risk: 'medium-high',
    brandColors: ['#1A3C6E', '#4DA3FF'],
    description: {
      it: "Il protocollo leader nella tokenizzazione di asset del mondo reale (RWA), che porta titoli del Tesoro USA, obbligazioni e fondi monetari direttamente on-chain con piena conformita' normativa. I prodotti principali includono USDY (un token che genera rendimento dal 5,2% APY, garantito da US Treasuries a breve termine) e OUSG (esposizione tokenizzata a fondi obbligazionari BlackRock). Ondo ha raggiunto $850 milioni di TVL con 2.200 indirizzi attivi e 25 sviluppatori, posizionandosi come ponte tra la finanza tradizionale da $120 trilioni e la DeFi. Il protocollo e' supportato da investitori istituzionali come Founders Fund (Peter Thiel), Pantera Capital e Coinbase Ventures. La narrativa RWA e' considerata da BlackRock e altri gestori come la prossima grande frontiera del settore crypto, con potenziale di tokenizzare $16 trilioni in asset entro il 2030.",
      en: "The leading protocol in real-world asset (RWA) tokenization, bringing US Treasury securities, bonds, and money market funds directly on-chain with full regulatory compliance. Main products include USDY (a yield-bearing token at 5.2% APY, backed by short-term US Treasuries) and OUSG (tokenized exposure to BlackRock bond funds). Ondo has reached $850 million in TVL with 2,200 active addresses and 25 developers, positioning itself as a bridge between $120 trillion traditional finance and DeFi. The protocol is backed by institutional investors including Founders Fund (Peter Thiel), Pantera Capital, and Coinbase Ventures. The RWA narrative is considered by BlackRock and other managers as the next major frontier in crypto, with potential to tokenize $16 trillion in assets by 2030.",
    },
  },
  'mantra-dao': {
    name: 'MANTRA',
    ticker: 'OM',
    category: 'rwa',
    risk: 'high',
    brandColors: ['#FF6D22', '#1A1A2E'],
    description: {
      it: "Una blockchain Layer 1 costruita specificamente per la tokenizzazione di asset del mondo reale con conformita' normativa integrata a livello di protocollo. MANTRA Chain e' la prima blockchain RWA-ready ad aver ottenuto una licenza DeFi dall'autorita' di regolamentazione VARA di Dubai, posizionandosi come hub per la finanza tokenizzata nel Medio Oriente. La piattaforma permette l'emissione, il trading e la gestione di asset tokenizzati come immobili, materie prime e strumenti finanziari con KYC/AML on-chain integrato. Con $320 milioni di TVL, 20 sviluppatori attivi e partnership con Google Cloud e UAE real estate developers, MANTRA ha visto una crescita esplosiva del token OM (+45,8% nell'ultimo mese). Il rischio resta elevato per la relativa novita' del progetto e la concentrazione geografica nel mercato degli Emirati, ma il focus sulla compliance normativa rappresenta un vantaggio competitivo significativo nel settore RWA.",
      en: "A Layer 1 blockchain built specifically for real-world asset tokenization with regulatory compliance integrated at the protocol level. MANTRA Chain is the first RWA-ready blockchain to have obtained a DeFi license from Dubai's VARA regulatory authority, positioning itself as a hub for tokenized finance in the Middle East. The platform enables the issuance, trading, and management of tokenized assets such as real estate, commodities, and financial instruments with on-chain KYC/AML integration. With $320 million in TVL, 20 active developers, and partnerships with Google Cloud and UAE real estate developers, MANTRA has seen explosive OM token growth (+45.8% in the last month). Risk remains high due to the project's relative newness and geographic concentration in the UAE market, but the focus on regulatory compliance represents a significant competitive advantage in the RWA sector.",
    },
  },
}

export const riskColors = {
  low: { bg: 'bg-neon-green/10', text: 'text-neon-green', labelKey: 'riskLow' },
  medium: { bg: 'bg-neon-amber/10', text: 'text-neon-amber', labelKey: 'riskMedium' },
  'medium-high': { bg: 'bg-orange-500/10', text: 'text-orange-400', labelKey: 'riskMedHigh' },
  high: { bg: 'bg-neon-red/10', text: 'text-neon-red', labelKey: 'riskHigh' },
}
