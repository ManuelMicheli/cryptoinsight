/**
 * Crypto Glossary — bilingual definitions for TechTerm component.
 * Each entry: { it: string, en: string }
 */
export const glossary = {
  market_cap: {
    it: 'La capitalizzazione di mercato: il valore totale di tutte le monete in circolazione. Si calcola moltiplicando il prezzo attuale per il numero di monete esistenti.',
    en: 'Market capitalization: the total value of all coins in circulation. Calculated by multiplying the current price by the number of existing coins.',
  },
  tvl: {
    it: 'Total Value Locked: il valore totale dei fondi depositati in un protocollo DeFi. Piu\' alto e\' il TVL, piu\' il protocollo e\' utilizzato e considerato affidabile.',
    en: 'Total Value Locked: the total value of funds deposited in a DeFi protocol. The higher the TVL, the more the protocol is used and considered reliable.',
  },
  layer_2: {
    it: 'Soluzioni costruite sopra una blockchain principale (Layer 1) per rendere le transazioni piu\' veloci e meno costose, senza sacrificare la sicurezza.',
    en: 'Solutions built on top of a main blockchain (Layer 1) to make transactions faster and cheaper, without sacrificing security.',
  },
  layer_1: {
    it: 'La blockchain di base (es. Ethereum, Solana, Bitcoin) su cui vengono costruite applicazioni e soluzioni Layer 2. E\' il fondamento dell\'ecosistema.',
    en: 'The base blockchain (e.g. Ethereum, Solana, Bitcoin) on which applications and Layer 2 solutions are built. It is the foundation of the ecosystem.',
  },
  defi: {
    it: 'Finanza Decentralizzata: servizi finanziari (prestiti, scambi, risparmi) che funzionano senza banche o intermediari, usando smart contract su blockchain.',
    en: 'Decentralized Finance: financial services (lending, trading, savings) that work without banks or intermediaries, using smart contracts on blockchain.',
  },
  dex: {
    it: 'Exchange Decentralizzato: una piattaforma per scambiare crypto senza intermediari. Gli utenti mantengono il controllo dei propri fondi durante lo scambio.',
    en: 'Decentralized Exchange: a platform to trade crypto without intermediaries. Users maintain control of their funds during the swap.',
  },
  etf: {
    it: 'Exchange-Traded Fund: un fondo di investimento quotato in borsa che replica il prezzo di un asset (es. Bitcoin). Permette di investire in crypto senza possederle direttamente.',
    en: 'Exchange-Traded Fund: an investment fund listed on stock exchanges that tracks the price of an asset (e.g. Bitcoin). Allows investing in crypto without directly owning them.',
  },
  cbdc: {
    it: 'Central Bank Digital Currency: una valuta digitale emessa da una banca centrale. A differenza delle crypto, e\' centralizzata e controllata dallo stato.',
    en: 'Central Bank Digital Currency: a digital currency issued by a central bank. Unlike crypto, it is centralized and state-controlled.',
  },
  fear_greed: {
    it: 'Un indicatore da 0 a 100 che misura le emozioni del mercato. 0 = paura estrema (possibile occasione di acquisto), 100 = avidita\' estrema (possibile bolla).',
    en: 'An indicator from 0 to 100 that measures market emotions. 0 = extreme fear (possible buying opportunity), 100 = extreme greed (possible bubble).',
  },
  btc_dominance: {
    it: 'La percentuale del valore totale del mercato crypto che appartiene a Bitcoin. Quando scende, gli investitori stanno spostando fondi verso le altcoin.',
    en: 'The percentage of the total crypto market value that belongs to Bitcoin. When it drops, investors are moving funds to altcoins.',
  },
  trading_volume: {
    it: 'Il valore totale delle transazioni effettuate in un periodo (solitamente 24h). Un volume alto indica forte interesse e liquidita\' nel mercato.',
    en: 'The total value of transactions made in a period (usually 24h). High volume indicates strong interest and liquidity in the market.',
  },
  whale: {
    it: 'Un investitore che possiede enormi quantita\' di una criptovaluta. I loro movimenti possono influenzare significativamente il prezzo di mercato.',
    en: 'An investor who holds huge amounts of a cryptocurrency. Their movements can significantly influence the market price.',
  },
  bullish: {
    it: 'Indica un trend rialzista o un\'aspettativa positiva sul prezzo. Il termine viene dal toro che colpisce dal basso verso l\'alto.',
    en: 'Indicates an upward trend or positive price expectation. The term comes from a bull striking upward.',
  },
  bearish: {
    it: 'Indica un trend ribassista o un\'aspettativa negativa sul prezzo. Il termine viene dall\'orso che colpisce dall\'alto verso il basso.',
    en: 'Indicates a downward trend or negative price expectation. The term comes from a bear striking downward.',
  },
  sentiment: {
    it: 'L\'umore generale degli investitori verso un asset. Si misura analizzando social media, volumi di scambio e indicatori on-chain.',
    en: 'The general mood of investors toward an asset. Measured by analyzing social media, trading volumes and on-chain indicators.',
  },
  health_score: {
    it: 'Un punteggio che valuta la solidita\' di un progetto crypto analizzando: attivita\' del codice, sicurezza, metriche on-chain e trasparenza del team.',
    en: 'A score that evaluates a crypto project\'s soundness by analyzing: code activity, security, on-chain metrics and team transparency.',
  },
  smart_contract: {
    it: 'Un programma che si esegue automaticamente sulla blockchain quando determinate condizioni sono soddisfatte. Elimina la necessita\' di intermediari.',
    en: 'A program that automatically executes on the blockchain when certain conditions are met. Eliminates the need for intermediaries.',
  },
  on_chain: {
    it: 'Dati e transazioni registrati direttamente sulla blockchain, verificabili da chiunque. Sono la fonte di verita\' piu\' affidabile nel mondo crypto.',
    en: 'Data and transactions recorded directly on the blockchain, verifiable by anyone. They are the most reliable source of truth in the crypto world.',
  },
  funding_rate: {
    it: 'Una commissione periodica scambiata tra trader long e short nei mercati perpetui. Indica se il mercato e\' sbilanciato verso posizioni rialziste o ribassiste.',
    en: 'A periodic fee exchanged between long and short traders in perpetual markets. Indicates if the market is skewed toward bullish or bearish positions.',
  },
  token_unlock: {
    it: 'Quando token precedentemente bloccati (per team, investitori o ecosistema) vengono rilasciati sul mercato. Puo\' causare pressione di vendita sul prezzo.',
    en: 'When previously locked tokens (for team, investors or ecosystem) are released to the market. Can cause selling pressure on the price.',
  },
  correlation: {
    it: 'Quanto due asset si muovono insieme. Correlazione alta (+1) = si muovono nella stessa direzione. Bassa (-1) = si muovono in direzioni opposte.',
    en: 'How much two assets move together. High correlation (+1) = move in the same direction. Low (-1) = move in opposite directions.',
  },
  dyor: {
    it: 'Do Your Own Research: fai le tue ricerche prima di investire. Mai fidarsi ciecamente di consigli altrui nel mondo crypto.',
    en: 'Do Your Own Research: do your own research before investing. Never blindly trust others\' advice in the crypto world.',
  },
  halving: {
    it: 'Un evento programmato (circa ogni 4 anni per Bitcoin) che dimezza la ricompensa dei miner. Riduce l\'offerta di nuove monete, storicamente seguito da rialzi.',
    en: 'A scheduled event (roughly every 4 years for Bitcoin) that halves miner rewards. Reduces new coin supply, historically followed by price increases.',
  },
  staking: {
    it: 'Bloccare le proprie crypto in un protocollo per supportare la rete e guadagnare ricompense. Simile a un deposito bancario, ma decentralizzato.',
    en: 'Locking your crypto in a protocol to support the network and earn rewards. Similar to a bank deposit, but decentralized.',
  },
  fork: {
    it: 'Una modifica al codice di una blockchain. Puo\' essere "soft" (retrocompatibile) o "hard" (crea una nuova chain separata, es. Bitcoin Cash da Bitcoin).',
    en: 'A change to a blockchain\'s code. Can be "soft" (backward compatible) or "hard" (creates a new separate chain, e.g. Bitcoin Cash from Bitcoin).',
  },
  governance: {
    it: 'Il sistema con cui i possessori di token votano le decisioni sul futuro del progetto. Piu\' token possiedi, piu\' peso ha il tuo voto.',
    en: 'The system by which token holders vote on decisions about the project\'s future. The more tokens you hold, the more weight your vote carries.',
  },
  flash_loan: {
    it: 'Un prestito istantaneo senza garanzie che deve essere restituito nella stessa transazione. Usato per arbitraggio e strategie DeFi avanzate.',
    en: 'An instant loan without collateral that must be repaid in the same transaction. Used for arbitrage and advanced DeFi strategies.',
  },
  amm: {
    it: 'Automated Market Maker: un algoritmo che permette scambi automatici di token usando pool di liquidita\', senza bisogno di un order book tradizionale.',
    en: 'Automated Market Maker: an algorithm that enables automatic token swaps using liquidity pools, without needing a traditional order book.',
  },
  market_cap_rank: {
    it: 'La posizione di una crypto nella classifica per capitalizzazione di mercato. #1 e\' Bitcoin, la crypto con il valore totale piu\' alto.',
    en: 'A crypto\'s position in the market capitalization ranking. #1 is Bitcoin, the crypto with the highest total value.',
  },
  risk: {
    it: 'Il livello di rischio di una crypto basato su volatilita\', liquidita\', storico e fondamentali del progetto. Piu\' e\' alto, piu\' il prezzo puo\' oscillare.',
    en: 'A crypto\'s risk level based on volatility, liquidity, track record and project fundamentals. The higher it is, the more the price can swing.',
  },
  portfolio: {
    it: 'L\'insieme delle crypto che possiedi. Una buona diversificazione del portfolio riduce il rischio complessivo del tuo investimento.',
    en: 'The set of crypto you own. Good portfolio diversification reduces the overall risk of your investment.',
  },
  scenario_simulator: {
    it: 'Uno strumento che simula come il tuo portfolio reagirebbe a diversi scenari di mercato (es. crash del 50%, bull run, regolamentazione). Muovi gli slider per esplorare gli scenari "what-if".',
    en: 'A tool that simulates how your portfolio would react to different market scenarios (e.g. 50% crash, bull run, regulation). Move the sliders to explore "what-if" scenarios.',
  },
  bull_run: {
    it: 'Un periodo di forte rialzo dei prezzi crypto, spesso guidato da ottimismo, adozione crescente o eventi positivi (es. approvazione ETF). I prezzi possono salire del 100-1000%.',
    en: 'A period of strong crypto price increases, often driven by optimism, growing adoption or positive events (e.g. ETF approval). Prices can rise 100-1000%.',
  },
  bear_market: {
    it: 'Un periodo prolungato di calo dei prezzi (solitamente -50% o piu\' dai massimi). Puo\' durare mesi o anni. E\' il momento in cui molti investitori esperti accumulano.',
    en: 'A prolonged period of falling prices (usually -50% or more from highs). Can last months or years. It\'s when many experienced investors accumulate.',
  },
  eth_flippening: {
    it: 'Lo scenario ipotetico in cui Ethereum supera Bitcoin per capitalizzazione di mercato, diventando la crypto numero 1. Non e\' mai accaduto ma e\' un tema ricorrente.',
    en: 'The hypothetical scenario where Ethereum surpasses Bitcoin in market capitalization, becoming the #1 crypto. Has never happened but is a recurring theme.',
  },
  alt_season: {
    it: 'Un periodo in cui le altcoin (tutte le crypto tranne Bitcoin) sovraperformano BTC. Solitamente la dominanza di Bitcoin scende sotto il 40% durante queste fasi.',
    en: 'A period when altcoins (all crypto except Bitcoin) outperform BTC. Usually Bitcoin dominance drops below 40% during these phases.',
  },
  btc_target: {
    it: 'Il prezzo obiettivo di Bitcoin nello scenario simulato. Bitcoin e\' il "re" del mercato crypto: quando BTC sale, spesso trascina tutte le altcoin.',
    en: 'The target Bitcoin price in the simulated scenario. Bitcoin is the "king" of the crypto market: when BTC rises, it often pulls all altcoins up.',
  },
  eth_btc_ratio: {
    it: 'Il rapporto di prezzo tra Ethereum e Bitcoin. Un ratio in aumento significa che ETH sta guadagnando terreno rispetto a BTC. Storicamente varia tra 0.02 e 0.08.',
    en: 'The price ratio between Ethereum and Bitcoin. A rising ratio means ETH is gaining ground against BTC. Historically ranges between 0.02 and 0.08.',
  },
  narrative: {
    it: 'Il "racconto" o tema dominante che guida i movimenti di prezzo. Es: "AI crypto", "Real World Assets", "Bitcoin ETF".',
    en: 'The dominant "story" or theme driving price movements. E.g.: "AI crypto", "Real World Assets", "Bitcoin ETF".',
  },
  social_volume: {
    it: 'Il numero di menzioni di una crypto sui social media nelle ultime 24h. Picchi improvvisi possono anticipare movimenti di prezzo.',
    en: 'The number of mentions of a crypto on social media in the last 24h. Sudden spikes can anticipate price movements.',
  },
  exchange_flow: {
    it: 'Il flusso netto di crypto dentro/fuori dagli exchange. Depositi massicci sugli exchange possono indicare vendite imminenti.',
    en: 'The net flow of crypto into/out of exchanges. Massive deposits into exchanges can indicate imminent selling.',
  },
  long_short_ratio: {
    it: 'Il rapporto tra trader che scommettono al rialzo (long) e al ribasso (short). Un ratio sbilanciato puo\' portare a liquidazioni a catena.',
    en: 'The ratio between traders betting on price going up (long) and down (short). An imbalanced ratio can lead to cascading liquidations.',
  },
}
