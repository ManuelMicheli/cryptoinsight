// Crypto Regulation Data — 27 countries
// TODO: Replace with API / CMS feed

export const regulationCountries = [
  {
    id: 'us',
    name: { it: 'Stati Uniti', en: 'United States' },
    region: 'americas',
    status: 'neutral',
    taxation: {
      it: 'Capital gain tassato come proprieta\'. Aliquote 0-20% a seconda del reddito e della durata del possesso. Reporting obbligatorio IRS.',
      en: 'Capital gains taxed as property. Rates 0-20% depending on income and holding period. Mandatory IRS reporting.',
    },
    etf: {
      it: 'ETF Bitcoin spot approvati a gennaio 2024. ETF Ethereum spot approvati a maggio 2024. Diversi ETF in attesa di approvazione.',
      en: 'Bitcoin spot ETFs approved January 2024. Ethereum spot ETFs approved May 2024. Several ETFs awaiting approval.',
    },
    stablecoinReg: {
      it: 'Regolamentazione in fase avanzata. Proposta di legge STABLE Act e GENIUS Act in discussione al Congresso.',
      en: 'Regulation in advanced stage. STABLE Act and GENIUS Act proposals under discussion in Congress.',
    },
    mining: {
      it: 'Legale in tutti gli stati. Alcuni stati (Texas, Wyoming) offrono incentivi. New York ha restrizioni su mining proof-of-work.',
      en: 'Legal in all states. Some states (Texas, Wyoming) offer incentives. New York has restrictions on proof-of-work mining.',
    },
    exchangeLicensing: {
      it: 'Money transmitter license statale richiesta. SEC e CFTC competenti. Crescente pressione normativa sugli exchange.',
      en: 'State money transmitter license required. SEC and CFTC have jurisdiction. Increasing regulatory pressure on exchanges.',
    },
    recentChanges: [
      {
        date: '2026-02',
        description: {
          it: 'Executive order per la creazione di una riserva strategica di Bitcoin',
          en: 'Executive order for creating a strategic Bitcoin reserve',
        },
      },
      {
        date: '2025-11',
        description: {
          it: 'Nuove linee guida SEC su crypto come securities',
          en: 'New SEC guidelines on crypto as securities',
        },
      },
    ],
    lastUpdated: '2026-02-20',
  },
  {
    id: 'de',
    name: { it: 'Germania', en: 'Germany' },
    region: 'europe',
    status: 'favorable',
    taxation: {
      it: 'Esenzione fiscale dopo 1 anno di possesso. Sotto i 600 EUR di profitto annuo: esente. Sopra: tassato al reddito personale.',
      en: 'Tax-free after 1 year of holding. Under 600 EUR annual profit: exempt. Above: taxed at personal income rate.',
    },
    etf: {
      it: 'ETF e ETP crypto disponibili tramite mercati regolamentati europei. MiCA in vigore dal 2025.',
      en: 'Crypto ETFs and ETPs available through regulated European markets. MiCA in effect since 2025.',
    },
    stablecoinReg: {
      it: 'Regolamentazione MiCA per stablecoin. Emittenti devono ottenere autorizzazione EMT o ART.',
      en: 'MiCA regulation for stablecoins. Issuers must obtain EMT or ART authorization.',
    },
    mining: {
      it: 'Legale. Elevati costi energetici rendono il mining meno competitivo. Focus su energie rinnovabili.',
      en: 'Legal. High energy costs make mining less competitive. Focus on renewable energy.',
    },
    exchangeLicensing: {
      it: 'Licenza BaFin richiesta. MiCA CASP licensing dal 2025. KYC/AML obbligatori.',
      en: 'BaFin license required. MiCA CASP licensing since 2025. KYC/AML mandatory.',
    },
    recentChanges: [
      {
        date: '2026-01',
        description: {
          it: 'Piena implementazione del framework MiCA per tutti i CASP',
          en: 'Full implementation of MiCA framework for all CASPs',
        },
      },
    ],
    lastUpdated: '2026-01-15',
  },
  {
    id: 'fr',
    name: { it: 'Francia', en: 'France' },
    region: 'europe',
    status: 'favorable',
    taxation: {
      it: 'Flat tax del 30% sui capital gain crypto (12.8% imposta + 17.2% contributi sociali). Regime professionale per trader abituali.',
      en: 'Flat tax of 30% on crypto capital gains (12.8% tax + 17.2% social contributions). Professional regime for habitual traders.',
    },
    etf: {
      it: 'ETF crypto accessibili tramite mercati regolamentati UE sotto MiCA.',
      en: 'Crypto ETFs accessible through EU regulated markets under MiCA.',
    },
    stablecoinReg: {
      it: 'MiCA attivo. AMF supervisiona gli emittenti di stablecoin. Circle (USDC) ha ottenuto licenza EMI.',
      en: 'MiCA active. AMF supervises stablecoin issuers. Circle (USDC) obtained EMI license.',
    },
    mining: {
      it: 'Legale. Incentivi per mining con energia nucleare a basso costo.',
      en: 'Legal. Incentives for mining with cheap nuclear energy.',
    },
    exchangeLicensing: {
      it: 'Registrazione PSAN (ora CASP MiCA) obbligatoria presso AMF. Requisiti patrimoniali rafforzati.',
      en: 'PSAN registration (now MiCA CASP) mandatory with AMF. Enhanced capital requirements.',
    },
    recentChanges: [
      {
        date: '2025-12',
        description: {
          it: 'Transizione completa da PSAN a licensing MiCA CASP',
          en: 'Complete transition from PSAN to MiCA CASP licensing',
        },
      },
    ],
    lastUpdated: '2025-12-10',
  },
  {
    id: 'it',
    name: { it: 'Italia', en: 'Italy' },
    region: 'europe',
    status: 'neutral',
    taxation: {
      it: 'Imposta sostitutiva del 26% sui capital gain sopra i 2.000 EUR. Obbligo di dichiarazione nel quadro RW. Rivalutazione possibile.',
      en: '26% substitute tax on capital gains above 2,000 EUR. RW form declaration mandatory. Revaluation possible.',
    },
    etf: {
      it: 'ETF e ETP crypto quotati su Borsa Italiana. Regime MiCA pienamente operativo.',
      en: 'Crypto ETFs and ETPs listed on Borsa Italiana. MiCA regime fully operational.',
    },
    stablecoinReg: {
      it: 'Regolamentazione MiCA per stablecoin. Consob e Banca d\'Italia supervisionano congiuntamente.',
      en: 'MiCA regulation for stablecoins. Consob and Bank of Italy jointly supervise.',
    },
    mining: {
      it: 'Legale ma non incentivato. Costi energetici elevati. Nessun framework specifico per il mining.',
      en: 'Legal but not incentivized. High energy costs. No specific mining framework.',
    },
    exchangeLicensing: {
      it: 'Registrazione OAM obbligatoria. Transizione a licenza MiCA CASP in corso. Consob supervisore.',
      en: 'OAM registration mandatory. Transition to MiCA CASP license ongoing. Consob supervisor.',
    },
    recentChanges: [
      {
        date: '2026-01',
        description: {
          it: 'Aumento della tassazione dal 26% previsto poi rinviato al 2027',
          en: 'Tax increase from 26% planned then postponed to 2027',
        },
      },
      {
        date: '2025-10',
        description: {
          it: 'Nuove linee guida Consob per pubblicita\' di cripto-attivita\'',
          en: 'New Consob guidelines for crypto-asset advertising',
        },
      },
    ],
    lastUpdated: '2026-01-20',
  },
  {
    id: 'es',
    name: { it: 'Spagna', en: 'Spain' },
    region: 'europe',
    status: 'neutral',
    taxation: {
      it: 'Tassazione progressiva 19-28% sui capital gain. Modello 721 per dichiarazione crypto detenute all\'estero > 50.000 EUR.',
      en: 'Progressive taxation 19-28% on capital gains. Model 721 for declaring crypto held abroad > 50,000 EUR.',
    },
    etf: {
      it: 'ETF crypto accessibili tramite mercati UE regolamentati.',
      en: 'Crypto ETFs accessible through regulated EU markets.',
    },
    stablecoinReg: {
      it: 'MiCA in vigore. CNMV regolatore competente per stablecoin.',
      en: 'MiCA in effect. CNMV competent regulator for stablecoins.',
    },
    mining: {
      it: 'Legale. Alcune regioni offrono energia rinnovabile a basso costo per operazioni mining.',
      en: 'Legal. Some regions offer cheap renewable energy for mining operations.',
    },
    exchangeLicensing: {
      it: 'Registrazione presso Banca de Espana. CNMV supervisiona mercati crypto. MiCA CASP in transizione.',
      en: 'Registration with Banca de Espana. CNMV oversees crypto markets. MiCA CASP in transition.',
    },
    recentChanges: [
      {
        date: '2025-11',
        description: {
          it: 'Implementazione Modello 721 per crypto estere obbligatorio',
          en: 'Implementation of Model 721 for foreign crypto mandatory',
        },
      },
    ],
    lastUpdated: '2025-11-05',
  },
  {
    id: 'nl',
    name: { it: 'Paesi Bassi', en: 'Netherlands' },
    region: 'europe',
    status: 'favorable',
    taxation: {
      it: 'Tassazione patrimoniale: 36% su rendimento presunto del patrimonio (Box 3). Nessuna tassa su capital gain realizzato direttamente.',
      en: 'Wealth tax: 36% on deemed return on assets (Box 3). No direct capital gains tax on realized gains.',
    },
    etf: {
      it: 'ETF e ETP crypto disponibili su Euronext Amsterdam sotto MiCA.',
      en: 'Crypto ETFs and ETPs available on Euronext Amsterdam under MiCA.',
    },
    stablecoinReg: {
      it: 'DNB supervisiona emittenti stablecoin sotto MiCA. Requisiti rigorosi per riserve.',
      en: 'DNB supervises stablecoin issuers under MiCA. Strict reserve requirements.',
    },
    mining: {
      it: 'Legale. Incentivi per operazioni basate su energia eolica e solare.',
      en: 'Legal. Incentives for operations based on wind and solar energy.',
    },
    exchangeLicensing: {
      it: 'DNB e AFM supervisionano exchange crypto. Licenza MiCA CASP richiesta dal 2025.',
      en: 'DNB and AFM supervise crypto exchanges. MiCA CASP license required since 2025.',
    },
    recentChanges: [
      {
        date: '2025-12',
        description: {
          it: 'Riforma Box 3: tassazione su rendimenti effettivi dal 2027',
          en: 'Box 3 reform: taxation on actual returns from 2027',
        },
      },
    ],
    lastUpdated: '2025-12-01',
  },
  {
    id: 'gb',
    name: { it: 'Regno Unito', en: 'United Kingdom' },
    region: 'europe',
    status: 'favorable',
    taxation: {
      it: 'Capital Gains Tax: esenzione annua di 3.000 GBP, poi 10% (base) o 20% (alta). Regime chiaro per DeFi e staking.',
      en: 'Capital Gains Tax: annual exemption of 3,000 GBP, then 10% (basic) or 20% (higher). Clear regime for DeFi and staking.',
    },
    etf: {
      it: 'ETN crypto ammessi per investitori professionali. FCA sta valutando ETF retail per 2026-2027.',
      en: 'Crypto ETNs allowed for professional investors. FCA evaluating retail ETFs for 2026-2027.',
    },
    stablecoinReg: {
      it: 'Framework regolamentare stablecoin in fase di finalizzazione. FCA e HM Treasury co-regolatori.',
      en: 'Stablecoin regulatory framework being finalized. FCA and HM Treasury co-regulators.',
    },
    mining: {
      it: 'Legale. Tassato come attivita\' commerciale se svolto professionalmente.',
      en: 'Legal. Taxed as business activity if conducted professionally.',
    },
    exchangeLicensing: {
      it: 'Registrazione FCA obbligatoria. Framework FSMA esteso alle crypto dal 2025. Regime anti-promozione finanziaria attivo.',
      en: 'FCA registration mandatory. FSMA framework extended to crypto since 2025. Financial promotion regime active.',
    },
    recentChanges: [
      {
        date: '2026-02',
        description: {
          it: 'FCA pubblica roadmap per regolamentazione completa entro 2027',
          en: 'FCA publishes roadmap for complete regulation by 2027',
        },
      },
    ],
    lastUpdated: '2026-02-10',
  },
  {
    id: 'ch',
    name: { it: 'Svizzera', en: 'Switzerland' },
    region: 'europe',
    status: 'favorable',
    taxation: {
      it: 'Nessuna imposta sui capital gain per investitori privati. Imposta patrimoniale sul valore delle crypto possedute. Paradiso crypto in Europa.',
      en: 'No capital gains tax for private investors. Wealth tax on value of crypto held. Crypto haven in Europe.',
    },
    etf: {
      it: 'ETP crypto quotati su SIX Swiss Exchange. Ampia offerta di prodotti strutturati.',
      en: 'Crypto ETPs listed on SIX Swiss Exchange. Wide range of structured products.',
    },
    stablecoinReg: {
      it: 'FINMA regola le stablecoin come depositi bancari o titoli a seconda della struttura.',
      en: 'FINMA regulates stablecoins as bank deposits or securities depending on structure.',
    },
    mining: {
      it: 'Legale e incentivato. "Crypto Valley" a Zugo. Energia idroelettrica abbondante e a basso costo.',
      en: 'Legal and incentivized. "Crypto Valley" in Zug. Abundant and cheap hydroelectric energy.',
    },
    exchangeLicensing: {
      it: 'Licenza FINMA richiesta. Framework DLT Act molto avanzato. Banking license per exchange-custody.',
      en: 'FINMA license required. Very advanced DLT Act framework. Banking license for exchange-custody.',
    },
    recentChanges: [
      {
        date: '2026-01',
        description: {
          it: 'FINMA approva nuove linee guida per tokenizzazione di asset reali (RWA)',
          en: 'FINMA approves new guidelines for real-world asset tokenization (RWA)',
        },
      },
    ],
    lastUpdated: '2026-01-25',
  },
  {
    id: 'jp',
    name: { it: 'Giappone', en: 'Japan' },
    region: 'asia',
    status: 'neutral',
    taxation: {
      it: 'Tassazione come "reddito vario": aliquote progressive fino al 55%. Proposta di riduzione al 20% in discussione.',
      en: 'Taxed as "miscellaneous income": progressive rates up to 55%. Proposal to reduce to 20% under discussion.',
    },
    etf: {
      it: 'ETF crypto non ancora approvati per investitori retail. FSA sta studiando il quadro normativo.',
      en: 'Crypto ETFs not yet approved for retail investors. FSA studying regulatory framework.',
    },
    stablecoinReg: {
      it: 'Payment Services Act aggiornato per stablecoin. Solo banche e trust company possono emettere.',
      en: 'Payment Services Act updated for stablecoins. Only banks and trust companies can issue.',
    },
    mining: {
      it: 'Legale ma costoso per elevati costi energetici. Tassato come reddito d\'impresa.',
      en: 'Legal but expensive due to high energy costs. Taxed as business income.',
    },
    exchangeLicensing: {
      it: 'Licenza JFSA obbligatoria. Tra i sistemi piu\' rigorosi al mondo. Cold wallet obbligatorio per fondi clienti.',
      en: 'JFSA license mandatory. Among the strictest systems in the world. Cold wallet mandatory for client funds.',
    },
    recentChanges: [
      {
        date: '2026-02',
        description: {
          it: 'Proposta di riduzione tassazione crypto al 20% raggiunge fase di consultazione',
          en: 'Proposal to reduce crypto taxation to 20% reaches consultation phase',
        },
      },
    ],
    lastUpdated: '2026-02-15',
  },
  {
    id: 'kr',
    name: { it: 'Corea del Sud', en: 'South Korea' },
    region: 'asia',
    status: 'neutral',
    taxation: {
      it: 'Tassa del 20% sui capital gain > 2.5M KRW (circa 1.800 USD). Implementazione ritardata piu\' volte, ora in vigore dal 2025.',
      en: '20% tax on capital gains > 2.5M KRW (about 1,800 USD). Implementation delayed multiple times, now in effect since 2025.',
    },
    etf: {
      it: 'ETF crypto non consentiti per investitori locali. Discussioni in corso per apertura graduale.',
      en: 'Crypto ETFs not allowed for local investors. Ongoing discussions for gradual opening.',
    },
    stablecoinReg: {
      it: 'Virtual Asset User Protection Act copre stablecoin. Requisiti di riserva obbligatori.',
      en: 'Virtual Asset User Protection Act covers stablecoins. Mandatory reserve requirements.',
    },
    mining: {
      it: 'Legale ma non incentivato. Elevati costi energetici e regolamentazione ambientale stringente.',
      en: 'Legal but not incentivized. High energy costs and strict environmental regulation.',
    },
    exchangeLicensing: {
      it: 'Registrazione FSC obbligatoria. VASP licensing con requisiti ISMS e partnership bancarie. Travel Rule attiva.',
      en: 'FSC registration mandatory. VASP licensing with ISMS requirements and banking partnerships. Travel Rule active.',
    },
    recentChanges: [
      {
        date: '2025-12',
        description: {
          it: 'Entrata in vigore della tassa del 20% sui profitti crypto',
          en: 'Enforcement of 20% tax on crypto profits',
        },
      },
    ],
    lastUpdated: '2025-12-20',
  },
  {
    id: 'sg',
    name: { it: 'Singapore', en: 'Singapore' },
    region: 'asia',
    status: 'favorable',
    taxation: {
      it: 'Nessuna capital gains tax per individui. Reddito da trading professionale tassato come reddito d\'impresa.',
      en: 'No capital gains tax for individuals. Professional trading income taxed as business income.',
    },
    etf: {
      it: 'Prodotti crypto negoziabili su SGX per investitori accreditati. MAS sta valutando ampliamento retail.',
      en: 'Crypto products tradable on SGX for accredited investors. MAS evaluating retail expansion.',
    },
    stablecoinReg: {
      it: 'MAS Stablecoin Framework dal 2023. Solo stablecoin regolamentate possono essere pubblicizzate come "stabili".',
      en: 'MAS Stablecoin Framework since 2023. Only regulated stablecoins can be advertised as "stable".',
    },
    mining: {
      it: 'Legale ma non comune per limiti spaziali e costi energetici. Focus su servizi finanziari crypto.',
      en: 'Legal but uncommon due to space limits and energy costs. Focus on crypto financial services.',
    },
    exchangeLicensing: {
      it: 'Licenza MAS (Major Payment Institution) obbligatoria. Framework tra i piu\' strutturati in Asia.',
      en: 'MAS license (Major Payment Institution) mandatory. One of the most structured frameworks in Asia.',
    },
    recentChanges: [
      {
        date: '2026-01',
        description: {
          it: 'MAS pubblica linee guida aggiornate per DeFi istituzionale',
          en: 'MAS publishes updated guidelines for institutional DeFi',
        },
      },
    ],
    lastUpdated: '2026-01-30',
  },
  {
    id: 'au',
    name: { it: 'Australia', en: 'Australia' },
    region: 'oceania',
    status: 'favorable',
    taxation: {
      it: 'Capital gains tax con sconto del 50% se possesso > 12 mesi. Tassato come proprieta\' digitale.',
      en: 'Capital gains tax with 50% discount if held > 12 months. Taxed as digital property.',
    },
    etf: {
      it: 'ETF Bitcoin ed Ethereum spot approvati su ASX. Mercato in rapida crescita.',
      en: 'Bitcoin and Ethereum spot ETFs approved on ASX. Rapidly growing market.',
    },
    stablecoinReg: {
      it: 'Proposta di legge per regolamentazione stablecoin sotto framework bancario. Consultazione pubblica in corso.',
      en: 'Proposed stablecoin regulation under banking framework. Public consultation ongoing.',
    },
    mining: {
      it: 'Legale e attivo. Ampio uso di energie rinnovabili. Diverse mining farm nelle zone rurali.',
      en: 'Legal and active. Extensive use of renewable energy. Several mining farms in rural areas.',
    },
    exchangeLicensing: {
      it: 'AUSTRAC registrazione obbligatoria. ASIC supervisiona prodotti finanziari crypto. Nuovo framework licensing dal 2026.',
      en: 'AUSTRAC registration mandatory. ASIC oversees crypto financial products. New licensing framework from 2026.',
    },
    recentChanges: [
      {
        date: '2026-02',
        description: {
          it: 'Nuovo framework di licenze per exchange crypto proposto da Treasury',
          en: 'New licensing framework for crypto exchanges proposed by Treasury',
        },
      },
    ],
    lastUpdated: '2026-02-05',
  },
  {
    id: 'ca',
    name: { it: 'Canada', en: 'Canada' },
    region: 'americas',
    status: 'favorable',
    taxation: {
      it: 'Capital gains: 50% del guadagno incluso nel reddito (67% sopra 250K CAD dal 2024). Regime chiaro e ben definito.',
      en: 'Capital gains: 50% of gain included in income (67% above 250K CAD from 2024). Clear and well-defined regime.',
    },
    etf: {
      it: 'Primo paese al mondo ad approvare ETF Bitcoin (2021). Ampia offerta di ETF crypto su TSX.',
      en: 'First country to approve Bitcoin ETF (2021). Wide range of crypto ETFs on TSX.',
    },
    stablecoinReg: {
      it: 'CSA richiede conformita\' per stablecoin. Framework in evoluzione con focus su protezione consumatori.',
      en: 'CSA requires compliance for stablecoins. Evolving framework with focus on consumer protection.',
    },
    mining: {
      it: 'Legale e molto attivo. Quebec e Alberta hub principali. Energia idroelettrica economica.',
      en: 'Legal and very active. Quebec and Alberta main hubs. Cheap hydroelectric energy.',
    },
    exchangeLicensing: {
      it: 'Registrazione come Restricted Dealer o marketplace presso CSA/OSC. KYC/AML stringenti.',
      en: 'Registration as Restricted Dealer or marketplace with CSA/OSC. Strict KYC/AML.',
    },
    recentChanges: [
      {
        date: '2025-11',
        description: {
          it: 'Nuove regole CSA per crypto derivati e margin trading',
          en: 'New CSA rules for crypto derivatives and margin trading',
        },
      },
    ],
    lastUpdated: '2025-11-15',
  },
  {
    id: 'br',
    name: { it: 'Brasile', en: 'Brazil' },
    region: 'americas',
    status: 'favorable',
    taxation: {
      it: 'Capital gains progressivi: 15-22.5%. Esenzione per operazioni mensili < 35.000 BRL. Dichiarazione Receita Federal obbligatoria.',
      en: 'Progressive capital gains: 15-22.5%. Exemption for monthly operations < 35,000 BRL. Federal Revenue declaration mandatory.',
    },
    etf: {
      it: 'ETF crypto quotati su B3. Brasile tra i primi paesi al mondo per ETF cripto.',
      en: 'Crypto ETFs listed on B3. Brazil among the first countries in the world for crypto ETFs.',
    },
    stablecoinReg: {
      it: 'Banco Central regola le stablecoin sotto il Marco Legal das Criptomoedas. DREX (CBDC) in sviluppo.',
      en: 'Banco Central regulates stablecoins under the Marco Legal das Criptomoedas. DREX (CBDC) in development.',
    },
    mining: {
      it: 'Legale. Energia idroelettrica abbondante ma infrastruttura IT limitata in alcune regioni.',
      en: 'Legal. Abundant hydroelectric energy but limited IT infrastructure in some regions.',
    },
    exchangeLicensing: {
      it: 'Marco Legal das Criptomoedas (2023). Banco Central supervisore. Licenza obbligatoria per VASP.',
      en: 'Marco Legal das Criptomoedas (2023). Banco Central supervisor. Mandatory license for VASPs.',
    },
    recentChanges: [
      {
        date: '2026-01',
        description: {
          it: 'Banco Central pubblica regole finali per licensing VASP',
          en: 'Banco Central publishes final rules for VASP licensing',
        },
      },
    ],
    lastUpdated: '2026-01-18',
  },
  {
    id: 'ar',
    name: { it: 'Argentina', en: 'Argentina' },
    region: 'americas',
    status: 'neutral',
    taxation: {
      it: 'Imposta sul reddito 5-35% sui profitti crypto. Alta inflazione spinge adozione come riserva di valore.',
      en: 'Income tax 5-35% on crypto profits. High inflation drives adoption as store of value.',
    },
    etf: {
      it: 'Nessun ETF crypto locale. Investitori accedono tramite broker internazionali.',
      en: 'No local crypto ETFs. Investors access through international brokers.',
    },
    stablecoinReg: {
      it: 'Regolamentazione stablecoin limitata. USDT e USDC ampiamente utilizzate come hedge contro inflazione.',
      en: 'Limited stablecoin regulation. USDT and USDC widely used as hedge against inflation.',
    },
    mining: {
      it: 'Legale. Crescente interesse per mining con energia eolica patagonica. Subsidies energetici aiutano.',
      en: 'Legal. Growing interest in mining with Patagonian wind energy. Energy subsidies help.',
    },
    exchangeLicensing: {
      it: 'CNV registrazione richiesta. Framework in evoluzione sotto amministrazione Milei pro-crypto.',
      en: 'CNV registration required. Framework evolving under pro-crypto Milei administration.',
    },
    recentChanges: [
      {
        date: '2026-02',
        description: {
          it: 'Governo Milei propone legge per rendere Bitcoin legal tender secondario',
          en: 'Milei government proposes law to make Bitcoin secondary legal tender',
        },
      },
    ],
    lastUpdated: '2026-02-18',
  },
  {
    id: 'in',
    name: { it: 'India', en: 'India' },
    region: 'asia',
    status: 'restrictive',
    taxation: {
      it: 'Tassa fissa del 30% su tutti i profitti crypto. 1% TDS su ogni transazione. Nessuna deduzione di perdite consentita.',
      en: 'Flat 30% tax on all crypto profits. 1% TDS on every transaction. No loss deduction allowed.',
    },
    etf: {
      it: 'ETF crypto non consentiti. SEBI non ha approvato alcun prodotto crypto.',
      en: 'Crypto ETFs not allowed. SEBI has not approved any crypto product.',
    },
    stablecoinReg: {
      it: 'Nessun framework specifico. RBI diffidente verso stablecoin private. Digital Rupee (CBDC) in fase pilota.',
      en: 'No specific framework. RBI wary of private stablecoins. Digital Rupee (CBDC) in pilot phase.',
    },
    mining: {
      it: 'Legale ma tassato pesantemente. 30% sui proventi del mining piu\' GST.',
      en: 'Legal but heavily taxed. 30% on mining proceeds plus GST.',
    },
    exchangeLicensing: {
      it: 'FIU registrazione obbligatoria. Diversi exchange internazionali bloccati nel 2024. KYC rigoroso.',
      en: 'FIU registration mandatory. Several international exchanges blocked in 2024. Strict KYC.',
    },
    recentChanges: [
      {
        date: '2025-12',
        description: {
          it: 'Governo rifiuta riduzione della tassa crypto nel budget 2026',
          en: 'Government refuses crypto tax reduction in 2026 budget',
        },
      },
    ],
    lastUpdated: '2025-12-15',
  },
  {
    id: 'cn',
    name: { it: 'Cina', en: 'China' },
    region: 'asia',
    status: 'ban',
    taxation: {
      it: 'Non applicabile: trading e mining crypto completamente vietati dal 2021.',
      en: 'Not applicable: crypto trading and mining completely banned since 2021.',
    },
    etf: {
      it: 'Vietati. Nessun prodotto di investimento crypto consentito nella Cina continentale.',
      en: 'Banned. No crypto investment products allowed in mainland China.',
    },
    stablecoinReg: {
      it: 'Stablecoin private vietate. Focus esclusivo su Digital Yuan (e-CNY) come CBDC.',
      en: 'Private stablecoins banned. Exclusive focus on Digital Yuan (e-CNY) as CBDC.',
    },
    mining: {
      it: 'Completamente vietato dal 2021. Migrazioni massive verso Kazakhstan, USA e Canada.',
      en: 'Completely banned since 2021. Massive migrations to Kazakhstan, USA and Canada.',
    },
    exchangeLicensing: {
      it: 'Tutti gli exchange crypto vietati. Accesso a exchange esteri tramite VPN perseguibile penalmente.',
      en: 'All crypto exchanges banned. Accessing foreign exchanges via VPN criminally prosecutable.',
    },
    recentChanges: [
      {
        date: '2025-09',
        description: {
          it: 'Nuove sanzioni penali per trading crypto P2P via WeChat e Alipay',
          en: 'New criminal penalties for P2P crypto trading via WeChat and Alipay',
        },
      },
    ],
    lastUpdated: '2025-09-20',
  },
  {
    id: 'ru',
    name: { it: 'Russia', en: 'Russia' },
    region: 'europe',
    status: 'restrictive',
    taxation: {
      it: 'Tassazione come proprieta\' digitale: 13-15% NDFL. Obbligo di dichiarazione per possesso > 600.000 RUB.',
      en: 'Taxed as digital property: 13-15% NDFL. Declaration obligation for holdings > 600,000 RUB.',
    },
    etf: {
      it: 'ETF crypto non disponibili. Mercato dei capitali crypto fortemente limitato.',
      en: 'Crypto ETFs not available. Crypto capital market severely limited.',
    },
    stablecoinReg: {
      it: 'Stablecoin straniere limitate. Digital Ruble (CBDC) lanciato in fase pilota. Uso crypto per eludere sanzioni monitorato.',
      en: 'Foreign stablecoins limited. Digital Ruble (CBDC) launched in pilot. Crypto use to evade sanctions monitored.',
    },
    mining: {
      it: 'Legalizzato nel 2024 con restrizioni regionali. Russia secondo paese al mondo per hashrate BTC.',
      en: 'Legalized in 2024 with regional restrictions. Russia second country in the world for BTC hashrate.',
    },
    exchangeLicensing: {
      it: 'Exchange domestici in area grigia. Pagamenti crypto vietati. Mining e holding consentiti come "attivita\' digitale".',
      en: 'Domestic exchanges in gray area. Crypto payments banned. Mining and holding allowed as "digital activity".',
    },
    recentChanges: [
      {
        date: '2025-11',
        description: {
          it: 'Legge sul mining firmata: tassazione e registrazione per miner professionisti',
          en: 'Mining law signed: taxation and registration for professional miners',
        },
      },
    ],
    lastUpdated: '2025-11-10',
  },
  {
    id: 'ae',
    name: { it: 'Emirati Arabi Uniti', en: 'United Arab Emirates' },
    region: 'asia',
    status: 'favorable',
    taxation: {
      it: 'Nessuna imposta sul reddito personale o capital gains. Dubai e Abu Dhabi free zone per crypto.',
      en: 'No personal income tax or capital gains tax. Dubai and Abu Dhabi free zones for crypto.',
    },
    etf: {
      it: 'Prodotti crypto ETF/ETP in fase di approvazione. DFSA e ADGM stanno creando il framework.',
      en: 'Crypto ETF/ETP products in approval phase. DFSA and ADGM creating the framework.',
    },
    stablecoinReg: {
      it: 'VARA (Dubai) ha framework dedicato per stablecoin. AED Stablecoin regolamentata dal Banco Centrale UAE.',
      en: 'VARA (Dubai) has dedicated stablecoin framework. AED Stablecoin regulated by UAE Central Bank.',
    },
    mining: {
      it: 'Legale nelle free zone. Crescenti investimenti in mining farms con energia solare.',
      en: 'Legal in free zones. Growing investments in mining farms with solar energy.',
    },
    exchangeLicensing: {
      it: 'VARA (Dubai), ADGM e DFSA licenziano exchange. Framework tra i piu\' avanzati al mondo. Binance HQ a Dubai.',
      en: 'VARA (Dubai), ADGM and DFSA license exchanges. Framework among the most advanced globally. Binance HQ in Dubai.',
    },
    recentChanges: [
      {
        date: '2026-02',
        description: {
          it: 'VARA approva framework per tokenizzazione immobiliare a Dubai',
          en: 'VARA approves framework for real estate tokenization in Dubai',
        },
      },
    ],
    lastUpdated: '2026-02-12',
  },
  {
    id: 'sv',
    name: { it: 'El Salvador', en: 'El Salvador' },
    region: 'americas',
    status: 'favorable',
    taxation: {
      it: 'Nessuna tassa su capital gain da Bitcoin. Regime fiscale speciale per investitori crypto stranieri.',
      en: 'No tax on Bitcoin capital gains. Special tax regime for foreign crypto investors.',
    },
    etf: {
      it: 'Non applicabile: Bitcoin e\' corso legale. Accesso diretto tramite Chivo Wallet e exchange.',
      en: 'Not applicable: Bitcoin is legal tender. Direct access via Chivo Wallet and exchanges.',
    },
    stablecoinReg: {
      it: 'Regolamentazione minima. Focus su adozione Bitcoin come valuta nazionale.',
      en: 'Minimal regulation. Focus on Bitcoin adoption as national currency.',
    },
    mining: {
      it: 'Incentivato con energia geotermica vulcanica. Progetto "Volcano Mining" operativo.',
      en: 'Incentivized with volcanic geothermal energy. "Volcano Mining" project operational.',
    },
    exchangeLicensing: {
      it: 'Licenza CNAD richiesta. Bitcoin legale dal 2021. Regime agevolato per fintech crypto.',
      en: 'CNAD license required. Bitcoin legal since 2021. Favorable regime for crypto fintech.',
    },
    recentChanges: [
      {
        date: '2026-01',
        description: {
          it: 'Lancio di Bitcoin Bond ("Volcano Bond") su Bitfinex Securities',
          en: 'Launch of Bitcoin Bond ("Volcano Bond") on Bitfinex Securities',
        },
      },
    ],
    lastUpdated: '2026-01-22',
  },
  {
    id: 'ng',
    name: { it: 'Nigeria', en: 'Nigeria' },
    region: 'africa',
    status: 'neutral',
    taxation: {
      it: 'Tassazione 10% sui capital gain crypto. Regime in fase di definizione. Ampia economia crypto informale.',
      en: '10% tax on crypto capital gains. Regime being defined. Large informal crypto economy.',
    },
    etf: {
      it: 'Nessun ETF crypto disponibile. SEC Nigeria sta valutando il framework.',
      en: 'No crypto ETFs available. SEC Nigeria evaluating the framework.',
    },
    stablecoinReg: {
      it: 'CBN ha ammorbidito posizione nel 2023. cNGN stablecoin locale in fase pilota.',
      en: 'CBN softened stance in 2023. cNGN local stablecoin in pilot phase.',
    },
    mining: {
      it: 'Legale ma limitato da infrastruttura energetica instabile. P2P trading piu\' diffuso.',
      en: 'Legal but limited by unstable energy infrastructure. P2P trading more widespread.',
    },
    exchangeLicensing: {
      it: 'SEC Nigeria ha iniziato a registrare exchange nel 2024. Framework VASP in sviluppo.',
      en: 'SEC Nigeria started registering exchanges in 2024. VASP framework in development.',
    },
    recentChanges: [
      {
        date: '2026-01',
        description: {
          it: 'SEC Nigeria rilascia prime licenze VASP a exchange locali',
          en: 'SEC Nigeria issues first VASP licenses to local exchanges',
        },
      },
    ],
    lastUpdated: '2026-01-28',
  },
  {
    id: 'tr',
    name: { it: 'Turchia', en: 'Turkey' },
    region: 'europe',
    status: 'neutral',
    taxation: {
      it: 'Nessuna imposta specifica sui capital gain crypto al momento. Proposta di tassazione in discussione.',
      en: 'No specific tax on crypto capital gains at the moment. Taxation proposal under discussion.',
    },
    etf: {
      it: 'Nessun ETF crypto disponibile. CMB sta valutando opzioni regolamentari.',
      en: 'No crypto ETFs available. CMB evaluating regulatory options.',
    },
    stablecoinReg: {
      it: 'Regolamentazione stablecoin sotto nuova legge crypto del 2024. Lira turca digitale (CBDC) in sviluppo.',
      en: 'Stablecoin regulation under new 2024 crypto law. Digital Turkish Lira (CBDC) in development.',
    },
    mining: {
      it: 'Legale. Turchia tra i primi 10 paesi per adozione crypto a causa di svalutazione lira.',
      en: 'Legal. Turkey among top 10 countries for crypto adoption due to lira devaluation.',
    },
    exchangeLicensing: {
      it: 'SPK (CMB) supervisore principale dal 2024. Licensing obbligatorio per exchange. KYC/AML richiesti.',
      en: 'SPK (CMB) main supervisor since 2024. Mandatory licensing for exchanges. KYC/AML required.',
    },
    recentChanges: [
      {
        date: '2025-12',
        description: {
          it: 'Prima legge organica sulle crypto-attivita\' approvata dal parlamento',
          en: 'First comprehensive crypto-asset law approved by parliament',
        },
      },
    ],
    lastUpdated: '2025-12-08',
  },
  {
    id: 'th',
    name: { it: 'Thailandia', en: 'Thailand' },
    region: 'asia',
    status: 'neutral',
    taxation: {
      it: 'Tassa del 15% sui capital gain crypto. Esenzione per transazioni su exchange regolamentati sotto certe soglie.',
      en: '15% tax on crypto capital gains. Exemption for transactions on regulated exchanges under certain thresholds.',
    },
    etf: {
      it: 'ETF crypto non approvati per investitori retail. SEC Thailand permette fondi crypto per istituzionali.',
      en: 'Crypto ETFs not approved for retail investors. SEC Thailand allows crypto funds for institutionals.',
    },
    stablecoinReg: {
      it: 'BOT regola stablecoin. THB-pegged stablecoin vietate per uso pubblico. Focus su Digital Baht.',
      en: 'BOT regulates stablecoins. THB-pegged stablecoins banned for public use. Focus on Digital Baht.',
    },
    mining: {
      it: 'Legale ma non incentivato. Regolamentazione ambientale in evoluzione.',
      en: 'Legal but not incentivized. Environmental regulation evolving.',
    },
    exchangeLicensing: {
      it: 'Licenza SEC Thailand obbligatoria. Solo exchange autorizzati possono operare. Regime anti-frode attivo.',
      en: 'SEC Thailand license mandatory. Only authorized exchanges can operate. Anti-fraud regime active.',
    },
    recentChanges: [
      {
        date: '2025-10',
        description: {
          it: 'SEC Thailand approva pilota per tokenizzazione di titoli di stato',
          en: 'SEC Thailand approves pilot for government bond tokenization',
        },
      },
    ],
    lastUpdated: '2025-10-15',
  },
  {
    id: 'hk',
    name: { it: 'Hong Kong', en: 'Hong Kong' },
    region: 'asia',
    status: 'favorable',
    taxation: {
      it: 'Nessuna capital gains tax. Nessuna imposta su redditi da investimento crypto per individui.',
      en: 'No capital gains tax. No tax on crypto investment income for individuals.',
    },
    etf: {
      it: 'ETF Bitcoin ed Ethereum spot approvati nell\'aprile 2024. Quotati su HKEX. Mercato in espansione.',
      en: 'Bitcoin and Ethereum spot ETFs approved in April 2024. Listed on HKEX. Expanding market.',
    },
    stablecoinReg: {
      it: 'HKMA framework per stablecoin licenziate. Sandbox regolamentare per emittenti in fase di test.',
      en: 'HKMA framework for licensed stablecoins. Regulatory sandbox for issuers in testing phase.',
    },
    mining: {
      it: 'Legale ma raro per costi energetici. Focus su hub finanziario e trading.',
      en: 'Legal but rare due to energy costs. Focus on financial hub and trading.',
    },
    exchangeLicensing: {
      it: 'SFC licenza VATP obbligatoria. Framework completo dal 2023. Sia retail che istituzionali possono tradare.',
      en: 'SFC VATP license mandatory. Complete framework since 2023. Both retail and institutional can trade.',
    },
    recentChanges: [
      {
        date: '2026-02',
        description: {
          it: 'SFC approva staking per ETF crypto regolamentati',
          en: 'SFC approves staking for regulated crypto ETFs',
        },
      },
    ],
    lastUpdated: '2026-02-08',
  },
  {
    id: 'pt',
    name: { it: 'Portogallo', en: 'Portugal' },
    region: 'europe',
    status: 'neutral',
    taxation: {
      it: 'Dal 2023: 28% sui capital gain per crypto detenute < 365 giorni. Esenzione per possesso > 1 anno. Fine del paradiso fiscale.',
      en: 'Since 2023: 28% on capital gains for crypto held < 365 days. Exemption for holding > 1 year. End of tax haven.',
    },
    etf: {
      it: 'ETF crypto accessibili tramite mercati UE regolamentati sotto MiCA.',
      en: 'Crypto ETFs accessible through regulated EU markets under MiCA.',
    },
    stablecoinReg: {
      it: 'MiCA in vigore. Banco de Portugal supervisore principale.',
      en: 'MiCA in effect. Banco de Portugal main supervisor.',
    },
    mining: {
      it: 'Legale. Clima favorevole e accesso a energia rinnovabile.',
      en: 'Legal. Favorable climate and access to renewable energy.',
    },
    exchangeLicensing: {
      it: 'Registrazione Banco de Portugal. MiCA CASP licensing in transizione.',
      en: 'Banco de Portugal registration. MiCA CASP licensing in transition.',
    },
    recentChanges: [
      {
        date: '2025-10',
        description: {
          it: 'Piena transizione al regime MiCA per tutti i CASP portoghesi',
          en: 'Full transition to MiCA regime for all Portuguese CASPs',
        },
      },
    ],
    lastUpdated: '2025-10-20',
  },
  {
    id: 'mt',
    name: { it: 'Malta', en: 'Malta' },
    region: 'europe',
    status: 'favorable',
    taxation: {
      it: 'Nessuna capital gains tax a lungo termine per individui. Trading professionale tassato al 35% (riducibile al 5% con strutture).',
      en: 'No long-term capital gains tax for individuals. Professional trading taxed at 35% (reducible to 5% with structures).',
    },
    etf: {
      it: 'Prodotti crypto disponibili tramite fondi regolamentati MFSA.',
      en: 'Crypto products available through MFSA regulated funds.',
    },
    stablecoinReg: {
      it: 'MFSA regola stablecoin sotto MiCA e Virtual Financial Assets Act.',
      en: 'MFSA regulates stablecoins under MiCA and Virtual Financial Assets Act.',
    },
    mining: {
      it: 'Legale ma limitato da risorse energetiche. Focus su servizi finanziari e licensing.',
      en: 'Legal but limited by energy resources. Focus on financial services and licensing.',
    },
    exchangeLicensing: {
      it: 'MFSA VFA license dal 2018. Malta pioniera nella regolamentazione crypto. MiCA ora sovrapposto.',
      en: 'MFSA VFA license since 2018. Malta pioneer in crypto regulation. MiCA now overlaid.',
    },
    recentChanges: [
      {
        date: '2025-11',
        description: {
          it: 'Armonizzazione VFA Act con MiCA completata',
          en: 'VFA Act harmonization with MiCA completed',
        },
      },
    ],
    lastUpdated: '2025-11-20',
  },
  {
    id: 'ee',
    name: { it: 'Estonia', en: 'Estonia' },
    region: 'europe',
    status: 'neutral',
    taxation: {
      it: 'Tassazione al 20% sui capital gain al momento della distribuzione. Regime CIT innovativo (tassazione solo alla distribuzione degli utili).',
      en: 'Tax at 20% on capital gains at distribution. Innovative CIT regime (taxation only on profit distribution).',
    },
    etf: {
      it: 'ETF crypto accessibili tramite mercati UE regolamentati.',
      en: 'Crypto ETFs accessible through regulated EU markets.',
    },
    stablecoinReg: {
      it: 'MiCA in vigore. FIU Estonia supervisore per AML. Requisiti rafforzati dal 2022.',
      en: 'MiCA in effect. FIU Estonia AML supervisor. Enhanced requirements since 2022.',
    },
    mining: {
      it: 'Legale. E-Residency program attrae aziende crypto. Infrastruttura digitale avanzata.',
      en: 'Legal. E-Residency program attracts crypto companies. Advanced digital infrastructure.',
    },
    exchangeLicensing: {
      it: 'FIU Estonia licensing rigoroso dal 2022 (da 400+ licenze a ~50). MiCA CASP sovrapposto. Requisiti patrimoniali elevati.',
      en: 'FIU Estonia strict licensing since 2022 (from 400+ licenses to ~50). MiCA CASP overlaid. High capital requirements.',
    },
    recentChanges: [
      {
        date: '2025-12',
        description: {
          it: 'FIU Estonia completa revisione licenze VASP sotto MiCA',
          en: 'FIU Estonia completes VASP license review under MiCA',
        },
      },
    ],
    lastUpdated: '2025-12-05',
  },
]

// Helper — index by id for O(1) lookup
export const regulationById = Object.fromEntries(
  regulationCountries.map(c => [c.id, c])
)

// All unique regions
export const REGIONS = ['all', 'europe', 'asia', 'americas', 'africa', 'oceania']

// All unique statuses
export const STATUSES = ['all', 'favorable', 'neutral', 'restrictive', 'ban']
