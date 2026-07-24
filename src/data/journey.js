/* ============================================================================
 *  MY JOURNEY — Marlon B. Siqueira
 *  Content architecture. Bilingual (EN / PT). Data-driven.
 *
 *  Images → drop files in the "images/" folder next to index.html
 *  Flags  → public/flags/[code].png  (br, us, gb-eng, gb-nir, gb-sct, gb-wls,
 *                                      ie, it, fr, de, es, pt)
 * ========================================================================== */

window.JOURNEY_DATA = {
  brand: {
    name: "MARLON B. SIQUEIRA",
    loading: { en: "Preparing your journey", pt: "Preparando sua jornada" },
  },

  settings: {
    accent: "#5cc8ff",
    highlight: "#7df2a8",
    autoRotate: true,
    rotateSpeed: 0.012,
  },

  ui: {
    next:    { en: "Next",     pt: "Próximo" },
    prev:    { en: "Previous", pt: "Anterior" },
    chapter: { en: "Chapter",  pt: "Capítulo" },
    of:      { en: "of",       pt: "de" },
  },

  slides: [

    /* ════════════════════════════════════════════════════════════════════════
     *  1 · OPENING — globe only
     * ════════════════════════════════════════════════════════════════════════ */
    {
      id: "intro", layout: "splash", chapter: "",
      focus: { overview: true },
      en: {
        kicker: "An Interactive Journey",
        title: "Welcome to My Journey",
        name: "Marlon B. Siqueira",
        body: "It began in Belo Horizonte, Minas Gerais — and grew into a story that spans continents. A journey of persistence, curiosity and continuous growth, told one destination at a time.",
        cta: "Begin the journey",
      },
      pt: {
        kicker: "Uma Jornada Interativa",
        title: "Bem-vindo à Minha Jornada",
        name: "Marlon B. Siqueira",
        body: "Tudo começou em Belo Horizonte, Minas Gerais — e cresceu até se tornar uma história que atravessa continentes. Uma jornada de persistência, curiosidade e crescimento contínuo, contada um destino de cada vez.",
        cta: "Começar a jornada",
      },
    },

    /* ════════════════════════════════════════════════════════════════════════
     *  2 · WHO I AM
     * ════════════════════════════════════════════════════════════════════════ */
    {
      id: "about", layout: "story", chapter: "01", flag: "br", side: "right",
      focus: { coordinates: [-43.94, -19.92], dist: 320, match: "Brazil",
               marker: [-43.94, -19.92], markerLabel: { en: "Belo Horizonte, Minas Gerais", pt: "Belo Horizonte, Minas Gerais" } },
      media: { type: "image", src: "images/mi1.jpg", label: "images/mi1.jpg" },
      en: {
        kicker: "Who I Am · Belo Horizonte, Brazil",
        title: "Where it all began",
        body: "I was born and raised in Belo Horizonte, surrounded by family, friends, school and sport. From an early age I learned the value of hard work, perseverance and continuous self-development — principles that have guided every chapter since.",
      },
      pt: {
        kicker: "Quem Sou · Belo Horizonte, Brasil",
        title: "Onde tudo começou",
        body: "Nasci e cresci em Belo Horizonte, cercado pela família, amigos, escola e esporte. Desde cedo aprendi o valor do trabalho árduo, da perseverança e do autodesenvolvimento contínuo — princípios que guiaram cada capítulo desde então.",
      },
    },

    /* ════════════════════════════════════════════════════════════════════════
     *  3 · EDUCATION
     * ════════════════════════════════════════════════════════════════════════ */
    {
      id: "education", layout: "story", chapter: "02", side: "right",
      focus: { overview: true },
      media: {
        type: "gallery", cols: 2,
        items: [
          { src: "images/edu1.jpg", en: { cap: "First School" }, pt: { cap: "Primeira escola" } },
          { src: "images/edu2.jpg", en: { cap: "Primary School" }, pt: { cap: "Escola primária" } },
          { src: "images/edu3.jpg", en: { cap: "Bachelor's — Business Administration" }, pt: { cap: "Bacharelado — Administração" } },
          { src: "images/edu4.jpg", en: { cap: "Postgraduate — Finance & Taxation · Portugal" }, pt: { cap: "Pós-Graduação — Finanças e Tributação · Portugal" } },
        ],
      },
      en: {
        kicker: "Education · Brazil & Portugal",
        title: "A commitment to lifelong learning",
        body: "A Bachelor's Degree in Business Administration, later expanded with a Postgraduate Degree in Finance and Taxation in Portugal — a continuous desire to broaden my understanding of business, finance and global markets.",
      },
      pt: {
        kicker: "Formação · Brasil e Portugal",
        title: "Um compromisso com o aprendizado contínuo",
        body: "Bacharelado em Administração de Empresas, ampliado com uma Pós-Graduação em Finanças e Tributação em Portugal — o desejo contínuo de ampliar meu conhecimento em negócios, finanças e mercados globais.",
      },
    },

    /* ════════════════════════════════════════════════════════════════════════
     *  4 · CAREER
     * ════════════════════════════════════════════════════════════════════════ */
    {
      id: "career", layout: "story", chapter: "03", side: "right",
      focus: { overview: true },
      media: {
        type: "logos",
        items: [
          { src: "images/logo1.jpg", en: { n: "Sandvik", r: "Swedish multinational — first international corporate environment." }, pt: { n: "Sandvik", r: "Multinacional sueca — primeiro ambiente corporativo internacional." } },
          { src: "images/logo2.jpg", en: { n: "Vale", r: "Águas Claras Mine — after a five-stage selection." }, pt: { n: "Vale", r: "Mina de Águas Claras — após seleção de cinco etapas." } },
          { src: "images/logo3.jpg", en: { n: "ALE Combustíveis", r: "Cost Analyst — fuel pricing & logistics." }, pt: { n: "ALE Combustíveis", r: "Analista de Custos — preços e logística de combustíveis." } },
          { src: "images/logo4.jpg", en: { n: "Meridian Global", r: "Ireland — VAT & international tax." }, pt: { n: "Meridian Global", r: "Irlanda — IVA e tributação internacional." } },
          { src: "images/logo5.jpg", en: { n: "Fundação Renova", r: "Organizational structuring & recovery." }, pt: { n: "Fundação Renova", r: "Estruturação organizacional e recuperação." } },
          { src: "images/logo6.jpg", en: { n: "Stellantis", r: "~7 years — SAP S/4HANA, RPA, AI & automation." }, pt: { n: "Stellantis", r: "~7 anos — SAP S/4HANA, RPA, IA e automação." } },
        ],
        photos: [
          { src: "images/career1.jpg" },
          { src: "images/career2.jpg" },
          { src: "images/career3.jpg" },
          { src: "images/career4.jpg" },
        ],
      },
      en: {
        kicker: "Career · From Brazil to the World",
        title: "A global professional impact",
        body: "A career built across multinational organizations and global automation — with selection processes at multinationals and Big4s along the way.",
      },
      pt: {
        kicker: "Carreira · Do Brasil para o Mundo",
        title: "Um impacto profissional global",
        body: "Uma carreira construída em organizações multinacionais e automação global — com processos seletivos em multinacionais e Big4s pelo caminho.",
      },
    },

    /* ════════════════════════════════════════════════════════════════════════
     *  5 · BRAZIL — Belo Horizonte
     * ════════════════════════════════════════════════════════════════════════ */
    {
      id: "belo-horizonte", layout: "story", chapter: "04", flag: "br", side: "left",
      focus: { coordinates: [-43.94, -19.92], dist: 280, match: "Brazil",
               marker: [-43.94, -19.92], markerLabel: { en: "Belo Horizonte", pt: "Belo Horizonte" } },
      media: {
        type: "gallery", cols: 2,
        items: [
          { src: "images/bh1.jpg", en: { cap: "" }, pt: { cap: "" } },
          { src: "images/bh2.jpg", en: { cap: "" }, pt: { cap: "" } },
          { src: "images/bh3.jpg", en: { cap: "" }, pt: { cap: "" } },
          { src: "images/bh4.jpg", en: { cap: "" }, pt: { cap: "" } },
          { src: "images/bh-jiu-jitsu.jpg", en: { cap: "Brazilian Jiu-Jitsu" }, pt: { cap: "Jiu-Jitsu Brasileiro" } },
          { src: "images/BR_video2.mp4", video: true, en: { cap: "Skydiving · Belo Horizonte" }, pt: { cap: "Paraquedismo · Belo Horizonte" } },
        ],
      },
      experiences: {
        en: ["Serra do Curral", "Pampulha Lake", "Mercado Central", "Cultural gastronomy", "Skydiving"],
        pt: ["Serra do Curral", "Lagoa da Pampulha", "Mercado Central", "Gastronomia cultural", "Paraquedismo"],
      },
      en: {
        kicker: "Brazil · Belo Horizonte",
        title: "Heart of Minas Gerais",
        body: "A city of hills, culture, and world-class gastronomy — and the place where I jumped out of a plane for the first time. The gateway to Brazil's mining heritage and where my story began.",
      },
      pt: {
        kicker: "Brasil · Belo Horizonte",
        title: "Coração de Minas Gerais",
        body: "Uma cidade de colinas, cultura e gastronomia de excelência — e o lugar onde saltei de paraquedas pela primeira vez. A porta de entrada para o patrimônio mineiro e onde a minha história começou.",
      },
    },

    /* ════════════════════════════════════════════════════════════════════════
     *  6 · BRAZIL — Rio de Janeiro
     * ════════════════════════════════════════════════════════════════════════ */
    {
      id: "rio", layout: "story", chapter: "04", flag: "br", side: "right",
      focus: { coordinates: [-43.17, -22.91], dist: 275, match: "Brazil",
               marker: [-43.17, -22.91], markerLabel: { en: "Rio de Janeiro", pt: "Rio de Janeiro" } },
      media: {
        type: "gallery", cols: 2,
        items: [
          { src: "images/rio-cristo.jpg",    en: { cap: "Cristo Redentor" },    pt: { cap: "Cristo Redentor" } },
          { src: "images/rio-acucar.jpg",    en: { cap: "Pão de Açúcar" },      pt: { cap: "Pão de Açúcar" } },
          { src: "images/rio-copacabana.jpg",en: { cap: "Copacabana" },         pt: { cap: "Copacabana" } },
          { src: "images/rio-ipanema.jpg",   en: { cap: "Ipanema" },            pt: { cap: "Ipanema" } },
          { src: "images/BR_video1.mp4", video: true, en: { cap: "Helicopter · Rio" }, pt: { cap: "Helicóptero · Rio" } },
          { src: "images/BR_video3.mp4", video: true, en: { cap: "Hang gliding · Rio" }, pt: { cap: "Asa-delta · Rio" } },
        ],
      },
      experiences: {
        en: ["Cristo Redentor", "Pão de Açúcar", "Copacabana Beach", "Ipanema Beach", "Helicopter tour", "Hang gliding"],
        pt: ["Cristo Redentor", "Pão de Açúcar", "Praia de Copacabana", "Praia de Ipanema", "Tour de helicóptero", "Asa-delta"],
      },
      en: {
        kicker: "Brazil · Rio de Janeiro",
        title: "Cidade Maravilhosa",
        body: "Cristo Redentor above the clouds, the cable car to Pão de Açúcar, the legendary beaches — and the sky seen from a hang glider over the city.",
      },
      pt: {
        kicker: "Brasil · Rio de Janeiro",
        title: "Cidade Maravilhosa",
        body: "Cristo Redentor acima das nuvens, o teleférico do Pão de Açúcar, as praias lendárias — e o céu visto de asa-delta sobre a cidade.",
      },
    },

    /* ════════════════════════════════════════════════════════════════════════
     *  7 · BRAZIL — Florianópolis
     * ════════════════════════════════════════════════════════════════════════ */
    {
      id: "florianopolis", layout: "story", chapter: "04", flag: "br", side: "left",
      focus: { coordinates: [-48.55, -27.60], dist: 275, match: "Brazil",
               marker: [-48.55, -27.60], markerLabel: { en: "Florianópolis", pt: "Florianópolis" } },
      media: {
        type: "gallery", cols: 2,
        items: [
          { src: "images/flori1.jpg", en: { cap: "" }, pt: { cap: "" } },
          { src: "images/flori2.jpg", en: { cap: "" }, pt: { cap: "" } },
          { src: "images/flori_scuba1.mp4", video: true, en: { cap: "Scuba diving" },   pt: { cap: "Mergulho" } },
          { src: "images/flori_scuba2.mp4", video: true, en: { cap: "Scuba diving 2" }, pt: { cap: "Mergulho 2" } },
        ],
      },
      experiences: {
        en: ["Scuba diving · Florianópolis", "Joaquina Beach", "Lagoa da Conceição"],
        pt: ["Mergulho · Florianópolis", "Praia da Joaquina", "Lagoa da Conceição"],
      },
      en: {
        kicker: "Brazil · Florianópolis",
        title: "Island of Magic",
        body: "Stunning beaches, crystal-clear lagoons and the ocean depths of Santa Catarina — including scuba diving in the warm waters of the island.",
      },
      pt: {
        kicker: "Brasil · Florianópolis",
        title: "Ilha da Magia",
        body: "Praias deslumbrantes, lagoas cristalinas e as profundezas do oceano em Santa Catarina — incluindo mergulho nas águas quentes da ilha.",
      },
    },

    /* ════════════════════════════════════════════════════════════════════════
     *  8 · USA — Miami
     * ════════════════════════════════════════════════════════════════════════ */
    {
      id: "miami", layout: "story", chapter: "05", flag: "us", side: "right",
      focus: { coordinates: [-80.19, 25.76], dist: 260, match: "United States",
               marker: [-80.19, 25.76], markerLabel: { en: "Miami", pt: "Miami" } },
      media: {
        type: "gallery", cols: 2,
        items: [
          { src: "images/miami1.jpg", en: { cap: "" }, pt: { cap: "" } },
          { src: "images/miami2.jpg", en: { cap: "" }, pt: { cap: "" } },
          { src: "images/miami3.jpg", en: { cap: "" }, pt: { cap: "" } },
          { src: "images/US_video1.mp4", video: true, en: { cap: "Ferrari California · Miami" }, pt: { cap: "Ferrari California · Miami" } },
          { src: "images/miami-ak47.mp4", video: true, en: { cap: "AK-47" }, pt: { cap: "AK-47" } },
          { src: "images/miami-scar.mp4", video: true, en: { cap: "SCAR 17" }, pt: { cap: "SCAR 17" } },
          { src: "images/miami-mp5.mp4",  video: true, en: { cap: "MP5" },     pt: { cap: "MP5" } },
        ],
      },
      experiences: {
        en: ["Ferrari California", "AK-47", "SCAR 17", "MP5", "South Beach", "Wynwood Walls"],
        pt: ["Ferrari California", "AK-47", "SCAR 17", "MP5", "South Beach", "Wynwood Walls"],
      },
      en: {
        kicker: "United States · Miami",
        title: "Sun, Speed & Steel",
        body: "Ferrari on the road and a collection of firearms on the range — Miami is a city where adrenaline comes in every form.",
      },
      pt: {
        kicker: "Estados Unidos · Miami",
        title: "Sol, Velocidade & Aço",
        body: "Ferrari na estrada e uma coleção de armas no estande — Miami é uma cidade onde a adrenalina vem de todas as formas.",
      },
    },

    /* ════════════════════════════════════════════════════════════════════════
     *  9 · USA — New York
     * ════════════════════════════════════════════════════════════════════════ */
    {
      id: "new-york", layout: "story", chapter: "05", flag: "us", side: "left",
      focus: { coordinates: [-74.01, 40.71], dist: 255, match: "United States",
               marker: [-74.01, 40.71], markerLabel: { en: "New York", pt: "Nova Iorque" } },
      media: {
        type: "gallery", cols: 2,
        items: [
          { src: "images/US_nba.jpg",        en: { cap: "NBA · Knicks vs Bulls" },    pt: { cap: "NBA · Knicks vs Bulls" } },
          { src: "images/US_wtc.jpg",        en: { cap: "One World Trade Center" },   pt: { cap: "One World Trade Center" } },
          { src: "images/US_liberty.jpg",    en: { cap: "Statue of Liberty" },        pt: { cap: "Estátua da Liberdade" } },
          { src: "images/US_brooklyn.jpg",   en: { cap: "Brooklyn Bridge" },          pt: { cap: "Ponte do Brooklyn" } },
          { src: "images/US_bull.jpg",       en: { cap: "Charging Bull" },            pt: { cap: "Touro de Wall Street" } },
          { src: "images/US_centralpark.jpg",en: { cap: "Central Park" },             pt: { cap: "Central Park" } },
          { src: "images/US_911.jpg",        en: { cap: "9/11 Memorial" },            pt: { cap: "Memorial do 11/09" } },
          { src: "images/US_nyc8.jpg",       en: { cap: "" },                         pt: { cap: "" } },
        ],
      },
      experiences: {
        en: ["NBA game · Knicks vs Bulls", "One World Trade Center", "Statue of Liberty", "Brooklyn Bridge", "Charging Bull", "Central Park", "9/11 Memorial", "Empire State Building"],
        pt: ["Jogo NBA · Knicks vs Bulls", "One World Trade Center", "Estátua da Liberdade", "Ponte do Brooklyn", "Touro de Wall Street", "Central Park", "Memorial do 11/09", "Empire State Building"],
      },
      en: {
        kicker: "United States · New York",
        title: "The City That Never Sleeps",
        body: "NBA courtside at Madison Square Garden, the sky deck of One WTC, the Statue of Liberty, Brooklyn Bridge and the 9/11 Memorial — New York in full.",
      },
      pt: {
        kicker: "Estados Unidos · Nova Iorque",
        title: "A Cidade Que Nunca Dorme",
        body: "NBA no Madison Square Garden, o topo do One WTC, a Estátua da Liberdade, a Ponte do Brooklyn e o Memorial do 11 de Setembro — Nova Iorque por inteiro.",
      },
    },

    /* ════════════════════════════════════════════════════════════════════════
     *  10 · ENGLAND — London
     * ════════════════════════════════════════════════════════════════════════ */
    {
      id: "england", layout: "story", chapter: "06", flag: "gb-eng", side: "left",
      focus: { coordinates: [-0.13, 51.51], dist: 235, match: "England",
               marker: [-0.13, 51.51], markerLabel: { en: "London", pt: "Londres" } },
      media: {
        type: "gallery", cols: 2,
        items: [
          { src: "images/england1.jpg", en: { cap: "Tower of London" },              pt: { cap: "Torre de Londres" } },
          { src: "images/england2.jpg", en: { cap: "Buckingham Palace" },            pt: { cap: "Palácio de Buckingham" } },
          { src: "images/england3.jpg", en: { cap: "Monument to the Great Fire" },   pt: { cap: "Monumento ao Grande Incêndio" } },
          { src: "images/england4.jpg", en: { cap: "St. Paul's Cathedral" },         pt: { cap: "Catedral de St. Paul" } },
          { src: "images/england5.jpg", en: { cap: "" },                             pt: { cap: "" } },
          { src: "images/england6.jpg", en: { cap: "" },                             pt: { cap: "" } },
        ],
      },
      experiences: {
        en: ["Tower of London", "Buckingham Palace", "Monument to the Great Fire", "St. Paul's Cathedral", "Tower Bridge", "Westminster"],
        pt: ["Torre de Londres", "Palácio de Buckingham", "Monumento ao Grande Incêndio", "Catedral de St. Paul", "Tower Bridge", "Westminster"],
      },
      en: { kicker: "United Kingdom · England", title: "London & beyond", body: "I explored London extensively — its palaces, parks, cathedrals, world-class museums and historic pubs — experiencing the city's rich history firsthand." },
      pt: { kicker: "Reino Unido · Inglaterra", title: "Londres e além", body: "Explorei Londres a fundo — seus palácios, parques, catedrais, museus de classe mundial e pubs históricos — vivendo de perto a rica história da cidade." },
    },

    /* ════════════════════════════════════════════════════════════════════════
     *  11 · NORTHERN IRELAND
     * ════════════════════════════════════════════════════════════════════════ */
    {
      id: "northern-ireland", layout: "story", chapter: "07", flag: "gb-nir", side: "right",
      focus: { coordinates: [-6.6, 54.7], dist: 225, match: "Northern Ireland",
               marker: [-6.6, 54.7], markerLabel: { en: "Northern Ireland", pt: "Irlanda do Norte" } },
      media: {
        type: "gallery", cols: 2,
        items: [
          { src: "images/nireland1.jpg", en: { cap: "Giant's Causeway" },  pt: { cap: "Calçada dos Gigantes" } },
          { src: "images/nireland2.jpg", en: { cap: "The Dark Hedges" },   pt: { cap: "Dark Hedges" } },
          { src: "images/nireland3.jpg", en: { cap: "Dunluce Castle" },    pt: { cap: "Castelo de Dunluce" } },
          { src: "images/nireland4.jpg", en: { cap: "Titanic Belfast" },   pt: { cap: "Titanic Belfast" } },
        ],
      },
      experiences: {
        en: ["Giant's Causeway", "Dunluce Castle", "The Dark Hedges", "Titanic Belfast", "Game of Thrones locations"],
        pt: ["Calçada dos Gigantes", "Castelo de Dunluce", "Dark Hedges", "Titanic Belfast", "Locações de Game of Thrones"],
      },
      en: { kicker: "United Kingdom · Northern Ireland", title: "Legends & landscapes", body: "Northern Ireland enchanted me — the Giant's Causeway, Dunluce Castle, the Dark Hedges, Titanic Belfast and several iconic Game of Thrones locations." },
      pt: { kicker: "Reino Unido · Irlanda do Norte", title: "Lendas e paisagens", body: "A Irlanda do Norte me encantou — a Calçada dos Gigantes, o Castelo de Dunluce, as Dark Hedges, o Titanic Belfast e várias locações icônicas de Game of Thrones." },
    },

    /* ════════════════════════════════════════════════════════════════════════
     *  12 · SCOTLAND — Edinburgh
     * ════════════════════════════════════════════════════════════════════════ */
    {
      id: "scotland", layout: "story", chapter: "08", flag: "gb-sct", side: "left",
      focus: { coordinates: [-3.19, 55.95], dist: 230, match: "Scotland",
               marker: [-3.19, 55.95], markerLabel: { en: "Edinburgh", pt: "Edimburgo" } },
      media: {
        type: "gallery", cols: 2,
        items: [
          { src: "images/scotland1.jpg", en: { cap: "Edinburgh Castle" }, pt: { cap: "Castelo de Edimburgo" } },
          { src: "images/scotland2.jpg", en: { cap: "" },                 pt: { cap: "" } },
        ],
      },
      experiences: {
        en: ["Edinburgh Castle", "The Royal Mile", "Old & New Town", "Arthur's Seat", "Scottish Highlands"],
        pt: ["Castelo de Edimburgo", "Royal Mile", "Cidade Velha e Nova", "Arthur's Seat", "Terras Altas da Escócia"],
      },
      en: { kicker: "United Kingdom · Scotland", title: "Edinburgh & the Highlands", body: "Scotland captivated me with the majestic Edinburgh Castle overlooking the city, the historic Royal Mile and the dramatic landscapes of the Highlands." },
      pt: { kicker: "Reino Unido · Escócia", title: "Edimburgo e as Highlands", body: "A Escócia me cativou com o majestoso Castelo de Edimburgo dominando a cidade, a histórica Royal Mile e as paisagens dramáticas das Highlands." },
    },

    /* ════════════════════════════════════════════════════════════════════════
     *  13 · WALES — Holyhead
     * ════════════════════════════════════════════════════════════════════════ */
    {
      id: "wales", layout: "story", chapter: "09", flag: "gb-wls", side: "right",
      focus: { coordinates: [-4.63, 53.31], dist: 225, match: "Wales",
               marker: [-4.63, 53.31], markerLabel: { en: "Holyhead", pt: "Holyhead" } },
      media: {
        type: "gallery", cols: 2,
        items: [
          { src: "images/wales1.jpg", en: { cap: "Holyhead" }, pt: { cap: "Holyhead" } },
          { src: "images/wales2.jpg", en: { cap: "Holyhead" }, pt: { cap: "Holyhead" } },
        ],
      },
      experiences: {
        en: ["Holyhead", "Anglesey coast", "Welsh landscapes"],
        pt: ["Holyhead", "Costa de Anglesey", "Paisagens galesas"],
      },
      en: { kicker: "United Kingdom · Wales", title: "The Welsh coast", body: "In Wales I discovered Holyhead and the rugged beauty of the Anglesey coast — a land of dramatic shorelines, castles and proud heritage." },
      pt: { kicker: "Reino Unido · País de Gales", title: "A costa galesa", body: "No País de Gales descobri Holyhead e a beleza áspera da costa de Anglesey — uma terra de litorais dramáticos, castelos e orgulhosa herança." },
    },

    /* ════════════════════════════════════════════════════════════════════════
     *  14 · IRELAND
     * ════════════════════════════════════════════════════════════════════════ */
    {
      id: "ireland", layout: "story", chapter: "10", flag: "ie", side: "left",
      focus: { coordinates: [-6.26, 53.33], dist: 230, match: "Ireland",
               marker: [-6.26, 53.33], markerLabel: { en: "Dublin", pt: "Dublin" } },
      media: {
        type: "gallery", cols: 2,
        items: [
          { src: "images/ireland1.jpg", en: { cap: "Dublin Castle" },    pt: { cap: "Castelo de Dublin" } },
          { src: "images/ireland2.jpg", en: { cap: "Malahide Castle" },  pt: { cap: "Castelo de Malahide" } },
          { src: "images/ireland3.jpg", en: { cap: "Temple Bar, Dublin" },pt: { cap: "Temple Bar, Dublin" } },
          { src: "images/ireland4.jpg", en: { cap: "Dublin city" },      pt: { cap: "Cidade de Dublin" } },
          { src: "images/ireland5.jpg", en: { cap: "" }, pt: { cap: "" } },
        ],
      },
      experiences: {
        en: ["Dublin Castle", "Temple Bar", "Malahide Castle", "Cultural landmarks", "Lived & worked here"],
        pt: ["Castelo de Dublin", "Temple Bar", "Castelo de Malahide", "Pontos culturais", "Vivi e trabalhei aqui"],
      },
      en: { kicker: "Ireland · The Emerald Isle", title: "Discovering Ireland", body: "In Ireland I visited Dublin Castle, the lively Temple Bar, Malahide Castle and many cultural landmarks — and lived here while working in international tax." },
      pt: { kicker: "Irlanda · A Ilha Esmeralda", title: "Descobrindo a Irlanda", body: "Na Irlanda visitei o Castelo de Dublin, o animado Temple Bar, o Castelo de Malahide e diversos pontos culturais — e morei aqui enquanto trabalhava com tributação internacional." },
    },

    /* ════════════════════════════════════════════════════════════════════════
     *  15 · ITALY — Rome
     * ════════════════════════════════════════════════════════════════════════ */
    {
      id: "rome", layout: "story", chapter: "11", flag: "it", side: "right",
      focus: { coordinates: [12.50, 41.90], dist: 240, match: "Italy",
               marker: [12.50, 41.90], markerLabel: { en: "Rome", pt: "Roma" } },
      media: {
        type: "gallery", cols: 2,
        items: [
          { src: "images/italy1.jpg", en: { cap: "The Colosseum" },              pt: { cap: "Coliseu" } },
          { src: "images/italy2.jpg", en: { cap: "Vatican & St. Peter's" },      pt: { cap: "Vaticano e São Pedro" } },
          { src: "images/italy3.jpg", en: { cap: "Trevi Fountain" },             pt: { cap: "Fontana di Trevi" } },
          { src: "images/rome-pantheon.jpg",  en: { cap: "Pantheon" },           pt: { cap: "Panteão" } },
          { src: "images/rome-spanish-steps.jpg", en: { cap: "Spanish Steps" },  pt: { cap: "Escadaria Espanhola" } },
          { src: "images/italy5.jpg", en: { cap: "Monument to Victor Emmanuel II" }, pt: { cap: "Monumento a Vítor Emanuel II" } },
        ],
      },
      experiences: {
        en: ["Italian citizenship", "The Colosseum", "Vatican Museums", "Trevi Fountain", "Pantheon", "Spanish Steps"],
        pt: ["Cidadania italiana", "Coliseu", "Museus do Vaticano", "Fontana di Trevi", "Panteão", "Escadaria Espanhola"],
      },
      en: { kicker: "Italy · Rome", title: "The Eternal City", body: "I obtained my Italian citizenship and explored Rome — the Colosseum, Vatican, Castel Sant'Angelo, the Trevi Fountain and every cobblestone in between." },
      pt: { kicker: "Itália · Roma", title: "A Cidade Eterna", body: "Obtive a cidadania italiana e explorei Roma — o Coliseu, o Vaticano, o Castel Sant'Angelo, a Fontana di Trevi e cada pedra entre eles." },
    },

    /* ════════════════════════════════════════════════════════════════════════
     *  16 · ITALY — Turin
     * ════════════════════════════════════════════════════════════════════════ */
    {
      id: "turin", layout: "story", chapter: "11", flag: "it", side: "left",
      focus: { coordinates: [7.69, 45.07], dist: 240, match: "Italy",
               marker: [7.69, 45.07], markerLabel: { en: "Turin", pt: "Turim" } },
      media: {
        type: "gallery", cols: 2,
        items: [
          { src: "images/italy4.jpg",         en: { cap: "Turin Cathedral" },  pt: { cap: "Catedral de Torino" } },
          { src: "images/turin2.jpg",          en: { cap: "" },                pt: { cap: "" } },
          { src: "images/turin3.jpg",          en: { cap: "" },                pt: { cap: "" } },
          { src: "images/italy_paraglider.mp4", video: true, en: { cap: "Paragliding · Turin" }, pt: { cap: "Parapente · Turim" } },
        ],
      },
      experiences: {
        en: ["Shroud of Turin", "Mole Antonelliana", "Palazzo Reale", "Paragliding over the Alps"],
        pt: ["Sudário de Turim", "Mole Antonelliana", "Palazzo Reale", "Parapente sobre os Alpes"],
      },
      en: { kicker: "Italy · Turin", title: "Alps at the Doorstep", body: "Turin — elegant, cultured, and nestled against the Alps. Home to the Shroud of Turin, royal palaces, and a paragliding flight above the mountains." },
      pt: { kicker: "Itália · Turim", title: "Os Alpes à Porta", body: "Turim — elegante, culta e encostada nos Alpes. Casa do Sudário de Turim, palácios reais e um voo de parapente sobre as montanhas." },
    },

    /* ════════════════════════════════════════════════════════════════════════
     *  17 · FRANCE — Paris
     * ════════════════════════════════════════════════════════════════════════ */
    {
      id: "paris", layout: "story", chapter: "12", flag: "fr", side: "right",
      focus: { coordinates: [2.35, 48.86], dist: 245, match: "France",
               marker: [2.35, 48.86], markerLabel: { en: "Paris", pt: "Paris" } },
      media: {
        type: "gallery", cols: 2,
        items: [
          { src: "images/france1.jpg",         en: { cap: "Eiffel Tower" },      pt: { cap: "Torre Eiffel" } },
          { src: "images/france3.jpg",         en: { cap: "The Louvre" },        pt: { cap: "Louvre" } },
          { src: "images/france4.jpg",         en: { cap: "Notre-Dame" },        pt: { cap: "Notre-Dame" } },
          { src: "images/paris-arc.jpg",       en: { cap: "Arc de Triomphe" },   pt: { cap: "Arco do Triunfo" } },
          { src: "images/paris-winged-victory.jpg", en: { cap: "Winged Victory of Samothrace · Louvre" }, pt: { cap: "Vitória de Samotrácia · Louvre" } },
          { src: "images/paris-montmartre.jpg",en: { cap: "Mona Lisa" },          pt: { cap: "Mona Lisa" } },
        ],
      },
      experiences: {
        en: ["Eiffel Tower", "The Louvre", "Notre-Dame", "Arc de Triomphe", "Champs-Élysées", "Montmartre & Sacré-Cœur"],
        pt: ["Torre Eiffel", "Louvre", "Notre-Dame", "Arco do Triunfo", "Champs-Élysées", "Montmartre e Sacré-Cœur"],
      },
      en: { kicker: "France · Paris", title: "La Ville Lumière", body: "The Eiffel Tower at golden hour, the Louvre's endless corridors, Notre-Dame and the Arc de Triomphe — Paris in full." },
      pt: { kicker: "França · Paris", title: "La Ville Lumière", body: "A Torre Eiffel na hora dourada, os corredores infinitos do Louvre, Notre-Dame e o Arco do Triunfo — Paris por inteiro." },
    },

    /* ════════════════════════════════════════════════════════════════════════
     *  18 · FRANCE — Versailles
     * ════════════════════════════════════════════════════════════════════════ */
    {
      id: "versailles", layout: "story", chapter: "12", flag: "fr", side: "left",
      focus: { coordinates: [2.12, 48.80], dist: 245, match: "France",
               marker: [2.12, 48.80], markerLabel: { en: "Versailles", pt: "Versalhes" } },
      media: {
        type: "gallery", cols: 2,
        items: [
          { src: "images/france2.jpg",           en: { cap: "Palace of Versailles" },  pt: { cap: "Palácio de Versalhes" } },
          { src: "images/versailles-gardens.jpg", en: { cap: "Gardens" },               pt: { cap: "Jardins" } },
        ],
      },
      experiences: {
        en: ["Palace of Versailles", "Hall of Mirrors", "Royal Gardens", "Trianon Palaces"],
        pt: ["Palácio de Versalhes", "Galeria dos Espelhos", "Jardins Reais", "Palácios do Trianon"],
      },
      en: { kicker: "France · Versailles", title: "Palace of the Sun King", body: "Gilded halls, sculpted gardens, the Hall of Mirrors — the Palace of Versailles is a world apart, the ultimate expression of royal grandeur." },
      pt: { kicker: "França · Versalhes", title: "Palácio do Rei Sol", body: "Salões dourados, jardins esculpidos, a Galeria dos Espelhos — o Palácio de Versalhes é um mundo à parte, a expressão máxima da grandeza real." },
    },

    /* ════════════════════════════════════════════════════════════════════════
     *  19 · GERMANY — Berlin
     * ════════════════════════════════════════════════════════════════════════ */
    {
      id: "berlin", layout: "story", chapter: "13", flag: "de", side: "right",
      focus: { coordinates: [13.40, 52.52], dist: 240, match: "Germany",
               marker: [13.40, 52.52], markerLabel: { en: "Berlin", pt: "Berlim" } },
      media: {
        type: "gallery", cols: 2,
        items: [
          { src: "images/germany1.jpg",           en: { cap: "Brandenburg Gate" },   pt: { cap: "Portão de Brandemburgo" } },
          { src: "images/germany3.jpg",           en: { cap: "Berlin Wall" },        pt: { cap: "Muro de Berlim" } },
          { src: "images/berlin-east-gallery.jpg",en: { cap: "East Side Gallery" },  pt: { cap: "East Side Gallery" } },
          { src: "images/berlin-reichstag.jpg",   en: { cap: "Reichstag" },          pt: { cap: "Reichstag" } },
          { src: "images/germany4.jpg",           en: { cap: "Checkpoint Charlie" }, pt: { cap: "Checkpoint Charlie" } },
          { src: "images/berlin-cathedral.jpg",   en: { cap: "Berlin Cathedral" },   pt: { cap: "Catedral de Berlim" } },
        ],
      },
      experiences: {
        en: ["Brandenburg Gate", "Berlin Wall", "East Side Gallery", "Reichstag", "Checkpoint Charlie", "Berlin Cathedral"],
        pt: ["Portão de Brandemburgo", "Muro de Berlim", "East Side Gallery", "Reichstag", "Checkpoint Charlie", "Catedral de Berlim"],
      },
      en: { kicker: "Germany · Berlin", title: "History, Art & Energy", body: "I walked the Berlin Wall, stood at the Brandenburg Gate and Checkpoint Charlie — history at every turn, and a city that never stops reinventing itself." },
      pt: { kicker: "Alemanha · Berlim", title: "História, Arte & Energia", body: "Percorri o Muro de Berlim, o Portão de Brandemburgo e o Checkpoint Charlie — história a cada esquina e uma cidade que nunca para de se reinventar." },
    },

    /* ════════════════════════════════════════════════════════════════════════
     *  20 · GERMANY — Potsdam
     * ════════════════════════════════════════════════════════════════════════ */
    {
      id: "potsdam", layout: "story", chapter: "13", flag: "de", side: "left",
      focus: { coordinates: [13.06, 52.39], dist: 240, match: "Germany",
               marker: [13.06, 52.39], markerLabel: { en: "Potsdam", pt: "Potsdam" } },
      media: {
        type: "gallery", cols: 2,
        items: [
          { src: "images/germany2.jpg",         en: { cap: "Sanssouci, Potsdam" },  pt: { cap: "Sanssouci, Potsdam" } },
          { src: "images/potsdam-dutch.jpg",    en: { cap: "Dutch Quarter" },        pt: { cap: "Bairro Holandês" } },
          { src: "images/potsdam-gardens.jpg",  en: { cap: "Palace Gardens" },       pt: { cap: "Jardins do Palácio" } },
          { src: "images/potsdam4.jpg",         en: { cap: "" },                     pt: { cap: "" } },
        ],
      },
      experiences: {
        en: ["Sanssouci Palace", "New Palace", "Dutch Quarter", "Royal Gardens"],
        pt: ["Palácio Sanssouci", "Novo Palácio", "Bairro Holandês", "Jardins Reais"],
      },
      en: { kicker: "Germany · Potsdam", title: "Prussian Splendour", body: "Just outside Berlin — Sanssouci Palace, baroque gardens and the charming Dutch Quarter. A royal escape frozen in time." },
      pt: { kicker: "Alemanha · Potsdam", title: "Esplendor Prussiano", body: "A poucos quilómetros de Berlim — o Palácio Sanssouci, jardins barrocos e o encantador Bairro Holandês. Uma fuga real congelada no tempo." },
    },

    /* ════════════════════════════════════════════════════════════════════════
     *  21 · SPAIN — Madrid
     * ════════════════════════════════════════════════════════════════════════ */
    {
      id: "madrid", layout: "story", chapter: "14", flag: "es", side: "right",
      focus: { coordinates: [-3.70, 40.42], dist: 250, match: "Spain",
               marker: [-3.70, 40.42], markerLabel: { en: "Madrid", pt: "Madrid" } },
      media: {
        type: "gallery", cols: 2,
        items: [
          { src: "images/spain1.jpg",         en: { cap: "Santiago Bernabéu" },   pt: { cap: "Santiago Bernabéu" } },
          { src: "images/spain3.jpg",         en: { cap: "Royal Palace of Madrid" }, pt: { cap: "Palácio Real de Madri" } },
          { src: "images/spain4.jpg",         en: { cap: "Prado Museum" },        pt: { cap: "Museu do Prado" } },
          { src: "images/madrid-retiro.jpg",  en: { cap: "El Retiro Park" },      pt: { cap: "Parque do Retiro" } },
          { src: "images/madrid-sol.jpg",     en: { cap: "Puerta del Sol" },      pt: { cap: "Puerta del Sol" } },
          { src: "images/madrid6.jpg",        en: { cap: "" },                    pt: { cap: "" } },
        ],
      },
      experiences: {
        en: ["Santiago Bernabéu", "Royal Palace of Madrid", "Prado Museum", "El Retiro Park", "Puerta del Sol", "Gran Vía"],
        pt: ["Santiago Bernabéu", "Palácio Real de Madri", "Museu do Prado", "Parque do Retiro", "Puerta del Sol", "Gran Vía"],
      },
      en: { kicker: "Spain · Madrid", title: "Passion & Culture", body: "The Santiago Bernabéu, the Royal Palace, the Prado Museum and El Retiro — Madrid is a city that pulses with passion, culture and an energy that never slows down." },
      pt: { kicker: "Espanha · Madrid", title: "Paixão & Cultura", body: "O Santiago Bernabéu, o Palácio Real, o Museu do Prado e o Retiro — Madrid é uma cidade que pulsa de paixão, cultura e uma energia que nunca abranda." },
    },

    /* ════════════════════════════════════════════════════════════════════════
     *  22 · SPAIN — Toledo
     * ════════════════════════════════════════════════════════════════════════ */
    {
      id: "toledo", layout: "story", chapter: "14", flag: "es", side: "left",
      focus: { coordinates: [-4.02, 39.86], dist: 245, match: "Spain",
               marker: [-4.02, 39.86], markerLabel: { en: "Toledo", pt: "Toledo" } },
      media: {
        type: "gallery", cols: 2,
        items: [
          { src: "images/spain2.jpg",        en: { cap: "Toledo · medieval city" }, pt: { cap: "Toledo · cidade medieval" } },
          { src: "images/toledo-alcazar.jpg", en: { cap: "Alcázar of Toledo" },      pt: { cap: "Alcázar de Toledo" } },
          { src: "images/toledo-cathedral.jpg",en:{ cap: "Toledo Cathedral" },       pt: { cap: "Catedral de Toledo" } },
          { src: "images/toledo4.jpg",        en: { cap: "" },                       pt: { cap: "" } },
        ],
      },
      experiences: {
        en: ["Alcázar of Toledo", "Toledo Cathedral", "City of Three Cultures", "Medieval old town"],
        pt: ["Alcázar de Toledo", "Catedral de Toledo", "Cidade das Três Culturas", "Centro histórico medieval"],
      },
      en: { kicker: "Spain · Toledo", title: "City of Three Cultures", body: "The medieval walled city where Christians, Muslims, and Jews once lived side by side — history carved into every stone of this hilltop city." },
      pt: { kicker: "Espanha · Toledo", title: "Cidade das Três Culturas", body: "A cidade medieval amuralhada onde cristãos, muçulmanos e judeus coabitaram — história esculpida em cada pedra desta cidade sobre a colina." },
    },

    /* ════════════════════════════════════════════════════════════════════════
     *  23 · PORTUGAL — Norte
     * ════════════════════════════════════════════════════════════════════════ */
    {
      id: "portugal-norte", layout: "story", chapter: "15", flag: "pt", side: "right",
      focus: { coordinates: [-8.61, 41.15], dist: 230, match: "Portugal",
               marker: [-8.61, 41.15], markerLabel: { en: "Porto · North", pt: "Porto · Norte" } },
      media: {
        type: "gallery", cols: 2,
        items: [
          { src: "images/portugal3.jpg",       en: { cap: "Porto" },                        pt: { cap: "Porto" } },
          { src: "images/portugal5.jpg",       en: { cap: "Braga" },                        pt: { cap: "Braga" } },
          { src: "images/portugal6.jpg",       en: { cap: "Guimarães" },                    pt: { cap: "Guimarães" } },
          { src: "images/portugal-maia.jpg",   en: { cap: "Maia" },                         pt: { cap: "Maia" } },
          { src: "images/portugal-aveiro.jpg", en: { cap: "Aveiro" },                       pt: { cap: "Aveiro" } },
          { src: "images/portugal-feira.jpg",  en: { cap: "Medieval Fair · Santa Maria da Feira" }, pt: { cap: "Feira Medieval · Santa Maria da Feira" } },
          { src: "images/portugal-valongo.jpg",en: { cap: "Rock climbing · Valongo" },      pt: { cap: "Escalada · Valongo" } },
        ],
      },
      experiences: {
        en: ["Porto — home base", "Guimarães · birthplace of Portugal", "Braga · city of archbishops", "Maia", "Aveiro · the Portuguese Venice", "Medieval Fair · Santa Maria da Feira", "Rock climbing · Valongo"],
        pt: ["Porto — base de vida", "Guimarães · berço de Portugal", "Braga · cidade dos arcebispos", "Maia", "Aveiro · a Veneza portuguesa", "Feira Medieval · Santa Maria da Feira", "Escalada · Valongo"],
      },
      en: {
        kicker: "Portugal · North",
        title: "Where I built my life",
        body: "The North of Portugal is where I put down roots — Porto, Braga, Guimarães (the birthplace of Portugal), Aveiro's canals, the Medieval Fair in Santa Maria da Feira and the climbing walls of Valongo.",
      },
      pt: {
        kicker: "Portugal · Norte",
        title: "Onde construí minha vida",
        body: "O Norte de Portugal é onde criei raízes — Porto, Braga, Guimarães (o berço de Portugal), os canais de Aveiro, a Feira Medieval de Santa Maria da Feira e as paredes de escalada de Valongo.",
      },
    },

    /* ════════════════════════════════════════════════════════════════════════
     *  24 · PORTUGAL — Centro
     * ════════════════════════════════════════════════════════════════════════ */
    {
      id: "portugal-centro", layout: "story", chapter: "15", flag: "pt", side: "left",
      focus: { coordinates: [-8.43, 40.21], dist: 235, match: "Portugal",
               marker: [-8.43, 40.21], markerLabel: { en: "Coimbra · Centre", pt: "Coimbra · Centro" } },
      media: {
        type: "gallery", cols: 2,
        items: [
          { src: "images/portugal1.jpg",       en: { cap: "University of Coimbra" },        pt: { cap: "Universidade de Coimbra" } },
          { src: "images/portugal2.jpg",       en: { cap: "Templar Castle · Tomar" },       pt: { cap: "Castelo dos Templários · Tomar" } },
          { src: "images/portugal-fatima.jpg", en: { cap: "Fátima · Sanctuary" },           pt: { cap: "Fátima · Santuário" } },
          { src: "images/portugal-nazare.jpg",  en: { cap: "Nazaré · Giant Waves" },   pt: { cap: "Nazaré · Ondas Gigantes" } },
          { src: "images/nazare2.jpg",          en: { cap: "Nazaré · Praia do Norte" }, pt: { cap: "Nazaré · Praia do Norte" } },
          { src: "images/nazare3.jpg",          en: { cap: "Nazaré · Viewpoint" },      pt: { cap: "Nazaré · Miradouro" } },
        ],
      },
      experiences: {
        en: ["University of Coimbra · UNESCO World Heritage", "Templar Castle · Tomar", "Fátima · one of the holiest sites in the world", "Nazaré · world's biggest waves"],
        pt: ["Universidade de Coimbra · Património Mundial UNESCO", "Castelo dos Templários · Tomar", "Fátima · um dos locais mais sagrados do mundo", "Nazaré · as maiores ondas do mundo"],
      },
      en: {
        kicker: "Portugal · Centre",
        title: "Faith, knowledge & wonder",
        body: "Central Portugal surprised me at every turn — the ancient University of Coimbra, the Templar fortress at Tomar, the sacred sanctuary of Fátima and the towering Atlantic waves at Nazaré.",
      },
      pt: {
        kicker: "Portugal · Centro",
        title: "Fé, conhecimento e maravilha",
        body: "O Centro de Portugal surpreendeu-me a cada volta — a antiga Universidade de Coimbra, a fortaleza templária de Tomar, o sagrado santuário de Fátima e as gigantescas ondas atlânticas da Nazaré.",
      },
    },

    /* ════════════════════════════════════════════════════════════════════════
     *  25 · PORTUGAL — Sul · Lisboa
     * ════════════════════════════════════════════════════════════════════════ */
    {
      id: "portugal-sul", layout: "story", chapter: "15", flag: "pt", side: "right",
      focus: { coordinates: [-9.14, 38.72], dist: 235, match: "Portugal",
               marker: [-9.14, 38.72], markerLabel: { en: "Lisbon", pt: "Lisboa" } },
      media: {
        type: "gallery", cols: 2,
        items: [
          { src: "images/portugal4.jpg",              en: { cap: "Lisbon" },                     pt: { cap: "Lisboa" } },
          { src: "images/lisboa-castelo-sao-jorge.jpg", en: { cap: "Castelo de São Jorge" },  pt: { cap: "Castelo de São Jorge" } },
          { src: "images/lisboa-alfama.jpg",          en: { cap: "" }, pt: { cap: "" } },
        ],
      },
      experiences: {
        en: ["Castelo de São Jorge", "Alfama district", "25 de Abril Bridge", "Pastéis de nata at Pastéis de Belém", "Tram 28"],
        pt: ["Castelo de São Jorge", "Bairro da Alfama", "Ponte 25 de Abril", "Pastéis de nata nos Pastéis de Belém", "Eléctrico 28"],
      },
      en: {
        kicker: "Portugal · South · Lisbon",
        title: "Lisboa, a capital",
        body: "Lisbon — sun-drenched, hilly and full of history. The Castelo de São Jorge, the Alfama district with its Fado echoing through the alleys, and the iconic 25 de Abril Bridge over the Tagus.",
      },
      pt: {
        kicker: "Portugal · Sul · Lisboa",
        title: "Lisboa, a capital",
        body: "Lisboa — ensolarada, íngreme e cheia de história. O Castelo de São Jorge, o bairro da Alfama com o Fado a ecoar pelas ruelas, e a icónica Ponte 25 de Abril sobre o Tejo.",
      },
    },

    /* ════════════════════════════════════════════════════════════════════════
     *  24 · ACHIEVEMENTS — Marathon
     * ════════════════════════════════════════════════════════════════════════ */
    {
      id: "marathon", layout: "story", chapter: "16", side: "left",
      focus: { overview: true },
      media: {
        type: "gallery", cols: 2,
        stat: { value: "42.195", unit: "KM", en: "Full marathon · Porto", pt: "Maratona completa · Porto" },
        items: [
          { src: "images/marathon1.jpg", en: { cap: "Porto Marathon" }, pt: { cap: "Maratona do Porto" } },
          { src: "images/marathon2.jpg", en: { cap: "Porto Marathon" }, pt: { cap: "Maratona do Porto" } },
          { src: "images/marathon3.jpg", en: { cap: "Porto Marathon" }, pt: { cap: "Maratona do Porto" } },
          { src: "images/marathon4.jpg", en: { cap: "Porto Marathon" }, pt: { cap: "Maratona do Porto" } },
        ],
      },
      experiences: {
        en: ["Full marathon · Porto (42.195 km)", "4h 52min finish time", "Porto, Portugal"],
        pt: ["Maratona completa · Porto (42,195 km)", "Tempo de chegada: 4h 52min", "Porto, Portugal"],
      },
      en: {
        kicker: "Achievements · Discipline in motion",
        title: "Porto Marathon",
        body: "42.195 km through the streets of Porto — one of the most scenic marathon routes in Europe. Every kilometre earned through months of training, determination and sheer will.",
      },
      pt: {
        kicker: "Conquistas · Disciplina em movimento",
        title: "Maratona do Porto",
        body: "42,195 km pelas ruas do Porto — um dos percursos de maratona mais bonitos da Europa. Cada quilómetro conquistado com meses de treino, determinação e força de vontade.",
      },
    },

    /* ════════════════════════════════════════════════════════════════════════
     *  25 · ACHIEVEMENTS — Half Marathon
     * ════════════════════════════════════════════════════════════════════════ */
    {
      id: "half-marathon", layout: "story", chapter: "16", side: "left",
      focus: { overview: true },
      media: {
        type: "gallery", cols: 2,
        stat: { value: "21.1", unit: "KM", en: "Half marathon · Porto", pt: "Meia maratona · Porto" },
        items: [
          { src: "images/half-marathon1.jpg", en: { cap: "Porto Half Marathon" }, pt: { cap: "Meia Maratona do Porto" } },
          { src: "images/half-marathon2.jpg", en: { cap: "Porto Half Marathon" }, pt: { cap: "Meia Maratona do Porto" } },
        ],
      },
      experiences: {
        en: ["Half marathon · Porto (21.1 km)", "Along the Douro River", "Porto, Portugal"],
        pt: ["Meia maratona · Porto (21,1 km)", "Ao longo do Rio Douro", "Porto, Portugal"],
      },
      en: {
        kicker: "Achievements · Running",
        title: "Porto Half Marathon",
        body: "21.1 km along the Douro River, through the heart of Porto. A race that demands both speed and endurance — and rewards you with one of the best views of the city.",
      },
      pt: {
        kicker: "Conquistas · Corrida",
        title: "Meia Maratona do Porto",
        body: "21,1 km ao longo do Rio Douro, pelo coração do Porto. Uma prova que exige velocidade e resistência — e recompensa com uma das melhores vistas da cidade.",
      },
    },

    /* ════════════════════════════════════════════════════════════════════════
     *  26 · ACHIEVEMENTS — Other races
     * ════════════════════════════════════════════════════════════════════════ */
    {
      id: "other-races", layout: "story", chapter: "16", side: "left",
      focus: { overview: true },
      media: {
        type: "gallery", cols: 2,
        items: [
          { src: "images/sports.jpg",        en: { cap: "Road races" },   pt: { cap: "Provas de rua" } },
          { src: "images/achv1.jpg",         en: { cap: "Road races" },   pt: { cap: "Provas de rua" } },
          { src: "images/running-other.jpg", en: { cap: "Trail run" },     pt: { cap: "Trail run" } },
          { src: "images/other-races4.jpg",  en: { cap: "" },              pt: { cap: "" } },
        ],
      },
      experiences: {
        en: ["Trail runs", "City road races", "5K & 10K events", "Regular training"],
        pt: ["Trail runs", "Provas de rua", "Eventos 5K e 10K", "Treino regular"],
      },
      en: {
        kicker: "Achievements · Running",
        title: "Other races",
        body: "Trail runs through the hills, 5K and 10K city events, and constant training. Running is not just a sport — it's a discipline that shapes the mind as much as the body.",
      },
      pt: {
        kicker: "Conquistas · Corrida",
        title: "Outras corridas",
        body: "Trail runs pelas colinas, eventos 5K e 10K na cidade, e treino constante. Correr não é apenas um desporto — é uma disciplina que molda a mente tanto quanto o corpo.",
      },
    },

    /* ════════════════════════════════════════════════════════════════════════
     *  ACHIEVEMENTS — Aviation
     * ════════════════════════════════════════════════════════════════════════ */
    {
      id: "aviation", layout: "story", chapter: "16", side: "right",
      focus: { overview: true },
      media: {
        type: "gallery", cols: 2,
        items: [
          { src: "images/BR_video4.mp4",       video: true, en: { cap: "Aerobatic flight" },      pt: { cap: "Voo acrobático" } },
          { src: "images/aviation-flyover.mp4", video: true, en: { cap: "Flyover" },               pt: { cap: "Sobrevoo" } },
          { src: "images/aviation-display.mp4", video: true, en: { cap: "Aerobatic display" },     pt: { cap: "Exibição acrobática" } },
          { src: "images/aviation1.jpg",                     en: { cap: "" },                      pt: { cap: "" } },
          { src: "images/aviation2.jpg",                     en: { cap: "" },                      pt: { cap: "" } },
          { src: "images/aviation4.mp4", video: true,        en: { cap: "" },                      pt: { cap: "" } },
        ],
      },
      experiences: {
        en: ["Aerobatic flight", "Helicopter flight · Rio", "Hang gliding · Rio", "Paragliding · Turin", "Flyovers"],
        pt: ["Voo acrobático", "Helicóptero · Rio", "Asa-delta · Rio", "Parapente · Turim", "Sobrevoos"],
      },
      en: {
        kicker: "Achievements · Aviation",
        title: "Freedom above the clouds",
        body: "Flying was never just a dream — it became a discipline. From aerobatic manoeuvres and helicopter tours over Rio to paragliding in the Alps.",
      },
      pt: {
        kicker: "Conquistas · Aviação",
        title: "Liberdade acima das nuvens",
        body: "Voar nunca foi apenas um sonho — tornou-se uma disciplina. De manobras acrobáticas e helicóptero sobre o Rio ao parapente nos Alpes.",
      },
    },

    /* ════════════════════════════════════════════════════════════════════════
     *  26 · ACHIEVEMENTS — Other sports
     * ════════════════════════════════════════════════════════════════════════ */
    {
      id: "achievements", layout: "story", chapter: "16", side: "left",
      focus: { overview: true },
      media: {
        type: "gallery", cols: 2,
        items: [
          { src: "images/achv-boxing.mp4", video: true, en: { cap: "Boxing" },        pt: { cap: "Boxe" } },
          { src: "images/achv-gym.mp4",    video: true, en: { cap: "Gym" },          pt: { cap: "Academia" } },
          { src: "images/achv_paintball.jpg", en: { cap: "Paintball" },             pt: { cap: "Paintball" } },
          { src: "images/achv_archery.jpg",   en: { cap: "Archery" },              pt: { cap: "Arco e Flecha" } },
          { src: "images/achv-golf.mp4", video: true, en: { cap: "Golf" },         pt: { cap: "Golfe" } },
          { src: "images/achv-kart.jpg",                en: { cap: "Kart" },         pt: { cap: "Kart" } },
        ],
      },
      experiences: {
        en: ["Mountain climbing · Valongo", "Shooting · AK-47 / MP5 / SCAR 17", "Paintball", "Archery", "Golf", "Kart racing", "Jiu-Jitsu"],
        pt: ["Escalada · Valongo", "Tiro · AK-47 / MP5 / SCAR 17", "Paintball", "Arco e Flecha", "Golfe", "Kart", "Jiu-Jitsu"],
      },
      en: {
        kicker: "Achievements · Other sports",
        title: "Pushing my limits",
        body: "Life is for trying everything. Jiu-Jitsu, kart racing, archery, paintball, golf, and rock climbing in the mountains of Valongo — always looking for the next challenge.",
      },
      pt: {
        kicker: "Conquistas · Outros desportos",
        title: "Superando meus limites",
        body: "A vida é para experimentar tudo. Jiu-Jitsu, kart, arco e flecha, paintball, golfe e escalada nas montanhas de Valongo — sempre à procura do próximo desafio.",
      },
    },

    /* ════════════════════════════════════════════════════════════════════════
     *  ATLETICO MINEIRO — Representando o Galo pelo Mundo
     * ════════════════════════════════════════════════════════════════════════ */
    {
      id: "galo-pelo-mundo", layout: "story", chapter: "17", side: "right",
      focus: { overview: true },
      media: {
        type: "gallery", cols: 2,
        items: [
          { src: "images/galo1.jpg", en: { cap: "Atletico Mineiro · The Galo" }, pt: { cap: "Atlético Mineiro · O Galo" } },
          { src: "images/galo2.jpg", en: { cap: "Atletico Mineiro · The Galo" }, pt: { cap: "Atlético Mineiro · O Galo" } },
          { src: "images/galo3.jpg", en: { cap: "Atletico Mineiro · The Galo" }, pt: { cap: "Atlético Mineiro · O Galo" } },
          { src: "images/galo4.jpg", en: { cap: "Atletico Mineiro · The Galo" }, pt: { cap: "Atlético Mineiro · O Galo" } },
          { src: "images/galo5.jpg", en: { cap: "Atletico Mineiro · The Galo" }, pt: { cap: "Atlético Mineiro · O Galo" } },
          { src: "images/galo6.jpg", en: { cap: "Atletico Mineiro · The Galo" }, pt: { cap: "Atlético Mineiro · O Galo" } },
          { src: "images/galo7.jpg", en: { cap: "Atletico Mineiro · The Galo" }, pt: { cap: "Atlético Mineiro · O Galo" } },
        ],
      },
      en: {
        kicker: "The Club",
        title: "Representing Galo Around the World",
        body: "Wherever I go, I carry the black and white of Atletico Mineiro. The Galo is not just a football club — it's an identity, a pride rooted in Belo Horizonte that follows me across every continent.",
      },
      pt: {
        kicker: "O Clube",
        title: "Representando o Galo pelo Mundo",
        body: "Onde quer que eu vá, carrego o preto e branco do Atlético Mineiro. O Galo não é apenas um clube de futebol — é uma identidade, um orgulho enraizado em Belo Horizonte que me acompanha por todos os continentes.",
      },
    },

    /* ════════════════════════════════════════════════════════════════════════
     *  REFLECTION
     * ════════════════════════════════════════════════════════════════════════ */
    {
      id: "reflection", layout: "closing", chapter: "17",
      focus: { overview: true },
      en: {
        kicker: "Reflection",
        title: "The journey continues",
        body: "Looking back, I see a path built through persistence, curiosity and a willingness to embrace challenges. Growth comes from learning, adapting and remaining open to new opportunities. My story is still being written — and I look forward to the next chapters with the same enthusiasm that has guided me all along.",
      },
      pt: {
        kicker: "Reflexão",
        title: "A jornada continua",
        body: "Olhando para trás, vejo um caminho construído com persistência, curiosidade e disposição para abraçar desafios. O crescimento vem de aprender, adaptar-se e permanecer aberto a novas oportunidades. Minha história ainda está sendo escrita — e aguardo os próximos capítulos com o mesmo entusiasmo que me guiou até aqui.",
      },
    },

    /* ════════════════════════════════════════════════════════════════════════
     *  28 · THANK YOU
     * ════════════════════════════════════════════════════════════════════════ */
    {
      id: "thanks", layout: "thanks", chapter: "",
      focus: { overview: true },
      en: {
        kicker: "See you at the next destination",
        title: "Thank you",
        alt: "Obrigado · Gracias",
        body: "The journey continues. Thank you for travelling through my story — let's connect.",
      },
      pt: {
        kicker: "Até o próximo destino",
        title: "Obrigado",
        alt: "Thank you · Gracias",
        body: "A jornada continua. Obrigado por percorrer a minha história — vamos nos conectar.",
      },
    },
  ],
};
