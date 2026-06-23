/* ============================================================================
 *  MY JOURNEY — Marlon B. Siqueira
 *  Content architecture. Bilingual (EN / PT). Data-driven: edit a chapter here
 *  and the whole experience updates. No other file needs to change.
 *
 *  Each slide:
 *    id        unique id
 *    layout    "hero" | "story" | "closing" | "thanks"
 *    chapter   small number label ("" to hide)
 *    flag      flagcdn code shown in the header (e.g. "br", "gb-eng")
 *    focus     where the globe goes for this chapter:
 *                { overview:true }                              -> distant rotating Earth
 *                { coordinates:[lng,lat], dist:NNN, match:"X" } -> centre + soft-fill a country
 *                marker:[lng,lat] + markerLabel{en,pt}          -> a star + label (origin point)
 *    side      "left" | "right" — which side the media panel sits on (auto-alternates if unset)
 *    media     { type, items, stat } — see renderers in journey.js
 *    experiences { en:[...], pt:[...] } — chip list under the body
 *    en / pt   localized text: kicker, title, name?, body?, alt?, cta?
 *
 *  MEDIA PATHS (drop files into an "images/" folder next to index.html):
 *    images/mi1.jpg · logo1..6.jpg · edu1..4.jpg
 *    images/BR_video1..4.mp4 · images/US_*.jpg + US_video1.mp4
 *    images/england1..2.jpg, italy1..2.jpg, … (one set per country)
 *    images/sports.jpg · achv1..2.jpg · contact.jpg
 * ========================================================================== */

window.JOURNEY_DATA = {
  brand: {
    name: "MARLON B. SIQUEIRA",
    loading: { en: "Preparing your journey", pt: "Preparando sua jornada" },
  },

  settings: {
    accent: "#5cc8ff",
    highlight: "#7df2a8",   // soft green country fill (alt blue: "#8fd0ff")
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
    /* ---- 1 · OPENING — planet only, no text ---- */
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

    /* ---- 2 · WHO I AM ---- */
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

    /* ---- 3 · PROFESSIONAL JOURNEY ---- */
    {
      id: "career", layout: "story", chapter: "02", side: "right",
      focus: { overview: true },
      media: {
        type: "logos",
        items: [
          { src: "images/logo1.jpg", en: { n: "Sandvik", r: "Swedish multinational — first international corporate environment." }, pt: { n: "Sandvik", r: "Multinacional sueca — primeiro ambiente corporativo internacional." } },
          { src: "images/logo2.jpg", en: { n: "Vale", r: "Águas Claras Mine — after a five-stage selection." }, pt: { n: "Vale", r: "Mina de Águas Claras — após seleção de cinco etapas." } },
          { src: "images/logo3.jpg", en: { n: "ALE Combustíveis", r: "Cost Analyst — fuel pricing & logistics." }, pt: { n: "ALE Combustíveis", r: "Analista de Custos — preços e logística de combustíveis." } },
          { src: "images/logo4.jpg", en: { n: "Meridian Global", r: "Ireland — VAT & international tax." }, pt: { n: "Meridian Global", r: "Irlanda — IVA e tributação internacional." } },
          { src: "images/logo5.svg", en: { n: "Fundação Renova", r: "Organizational structuring & recovery." }, pt: { n: "Fundação Renova", r: "Estruturação organizacional e recuperação." } },
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
        body: "From humble beginnings in retail and sales to multinational organizations and global automation — with recruitment processes at PwC, Deloitte and McKinsey & Company along the way.",
      },
      pt: {
        kicker: "Carreira · Do Brasil para o Mundo",
        title: "Um impacto profissional global",
        body: "De começos humildes no varejo e vendas até organizações multinacionais e automação global — com processos seletivos na PwC, Deloitte e McKinsey & Company pelo caminho.",
      },
    },

    /* ---- 4 · EDUCATION ---- */
    {
      id: "education", layout: "story", chapter: "03", side: "right",
      focus: { overview: true },
      media: {
        type: "gallery", cols: 2,
        items: [
          { src: "images/edu1.jpg", en: { cap: "First School" }, pt: { cap: "Primeira escola" } },
          { src: "images/edu2.jpg", en: { cap: "Primary School" }, pt: { cap: "Escola primária" } },
          { src: "images/edu3.jpg", en: { cap: "Bachelor's — Business Administration" }, pt: { cap: "Bacharelado — Administração" } },
          { src: "images/edu4.jpg", en: { cap: "Postgraduate — Finance & Taxation · London" }, pt: { cap: "Pós-Graduação — Finanças e Tributação · Londres" } },
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

    /* ---- 5 · BRAZIL ADVENTURES ---- */
    {
      id: "brazil", layout: "story", chapter: "04", flag: "br", side: "left",
      focus: { coordinates: [-47, -14], dist: 285, match: "Brazil" },
      media: {
        type: "gallery", cols: 2,
        items: [
          { src: "images/BR_video1.mp4", video: true, en: { cap: "Helicopter · Rio" }, pt: { cap: "Helicóptero · Rio" } },
          { src: "images/BR_video2.mp4", video: true, en: { cap: "Skydiving" }, pt: { cap: "Paraquedismo" } },
          { src: "images/BR_video3.mp4", video: true, en: { cap: "Hang gliding · Rio" }, pt: { cap: "Asa-delta · Rio" } },
          { src: "images/BR_video4.mp4", video: true, en: { cap: "Aerobatic flight" }, pt: { cap: "Voo acrobático" } },
          { src: "images/BR_video5.mp4", video: true, en: { cap: "Scuba diving" }, pt: { cap: "Mergulho" } },
          { src: "images/BR_kart.jpg", en: { cap: "Kart racing" }, pt: { cap: "Kart" } },
        ],
      },
      experiences: {
        en: ["Skydiving · Serra do Curral", "Hang gliding · Rio", "Helicopter flight · Rio", "Aerobatic flight", "Scuba diving · Florianópolis", "Kart racing", "Jiu-Jitsu", "Running events"],
        pt: ["Paraquedismo · Serra do Curral", "Asa-delta · Rio", "Voo de helicóptero · Rio", "Voo acrobático", "Mergulho · Florianópolis", "Kart", "Jiu-Jitsu", "Provas de corrida"],
      },
      en: {
        kicker: "Brazil · Adrenaline & nature",
        title: "Adventures in Brazil",
        body: "Challenging myself has always been part of who I am — from the skies above the Serra do Curral and Rio de Janeiro to the ocean depths of Florianópolis.",
      },
      pt: {
        kicker: "Brasil · Adrenalina e natureza",
        title: "Aventuras no Brasil",
        body: "Desafiar-me sempre fez parte de quem eu sou — dos céus sobre a Serra do Curral e o Rio de Janeiro às profundezas do mar de Florianópolis.",
      },
    },

    /* ---- 6 · UNITED STATES ---- */
    {
      id: "usa", layout: "story", chapter: "05", flag: "us", side: "left",
      focus: { coordinates: [-95, 39], dist: 290, match: "United States" },
      media: {
        type: "gallery", cols: 2,
        items: [
          { src: "images/US_liberty.jpg", en: { cap: "Statue of Liberty" }, pt: { cap: "Estátua da Liberdade" } },
          { src: "images/US_wtc.jpg", en: { cap: "One World Trade Center" }, pt: { cap: "One World Trade Center" } },
          { src: "images/US_brooklyn.jpg", en: { cap: "Brooklyn Bridge" }, pt: { cap: "Ponte do Brooklyn" } },
          { src: "images/US_centralpark.jpg", en: { cap: "Central Park" }, pt: { cap: "Central Park" } },
          { src: "images/US_nba.jpg", en: { cap: "NBA · Knicks vs Bulls" }, pt: { cap: "NBA · Knicks vs Bulls" } },
          { src: "images/US_video1.mp4", video: true, en: { cap: "Ferrari California · Miami" }, pt: { cap: "Ferrari California · Miami" } },
        ],
      },
      experiences: {
        en: ["Statue of Liberty", "One World Trade Center", "Brooklyn Bridge", "Central Park", "9/11 Memorial", "NBA game", "Ferrari California · Miami", "Shooting · AK-47 / MP5 / SCAR 17"],
        pt: ["Estátua da Liberdade", "One World Trade Center", "Ponte do Brooklyn", "Central Park", "Memorial do 11/09", "Jogo da NBA", "Ferrari California · Miami", "Tiro · AK-47 / MP5 / SCAR 17"],
      },
      en: {
        kicker: "United States · New York & Miami",
        title: "The American chapter",
        body: "New York from the Statue of Liberty to One World Trade Center, an NBA night and the 9/11 Memorial — then Miami, driving a Ferrari California and shooting-sport experiences.",
      },
      pt: {
        kicker: "Estados Unidos · Nova York e Miami",
        title: "O capítulo americano",
        body: "Nova York, da Estátua da Liberdade ao One World Trade Center, uma noite de NBA e o Memorial do 11 de Setembro — depois Miami, dirigindo uma Ferrari California e experiências de tiro esportivo.",
      },
    },

    /* ---- 7 · ENGLAND ---- */
    {
      id: "england", layout: "story", chapter: "06", flag: "gb-eng", side: "left",
      focus: { coordinates: [-1.5, 52.6], dist: 235, match: "England" },
      media: { type: "gallery", cols: 2, items: [
        { src: "images/england1.jpg", en: { cap: "Tower of London" }, pt: { cap: "Torre de Londres" } },
        { src: "images/england2.jpg", en: { cap: "Buckingham Palace" }, pt: { cap: "Palácio de Buckingham" } },
        { src: "images/england3.jpg", en: { cap: "Monument to the Great Fire" }, pt: { cap: "Monumento ao Grande Incêndio" } },
        { src: "images/england4.jpg", en: { cap: "St. Paul's Cathedral" }, pt: { cap: "Catedral de St. Paul" } },
      ] },
      experiences: { en: ["Tower of London", "Buckingham Palace", "Monument to the Great Fire", "St. Paul's Cathedral"], pt: ["Torre de Londres", "Palácio de Buckingham", "Monumento ao Grande Incêndio", "Catedral de St. Paul"] },
      en: { kicker: "United Kingdom · England", title: "London & beyond", body: "I explored London extensively — its palaces, parks, cathedrals, world-class museums and historic pubs — experiencing the city's rich history firsthand." },
      pt: { kicker: "Reino Unido · Inglaterra", title: "Londres e além", body: "Explorei Londres a fundo — seus palácios, parques, catedrais, museus de classe mundial e pubs históricos — vivendo de perto a rica história da cidade." },
    },

    /* ---- 8 · ITALY ---- */
    {
      id: "italy", layout: "story", chapter: "07", flag: "it", side: "right",
      focus: { coordinates: [12.5, 42], dist: 245, match: "Italy" },
      media: { type: "gallery", cols: 2, items: [
        { src: "images/italy1.jpg", en: { cap: "The Colosseum, Rome" }, pt: { cap: "Coliseu, Roma" } },
        { src: "images/italy2.jpg", en: { cap: "Vatican & St. Peter's" }, pt: { cap: "Vaticano e São Pedro" } },
        { src: "images/italy3.jpg", en: { cap: "Trevi Fountain" }, pt: { cap: "Fontana di Trevi" } },
        { src: "images/italy4.jpg", en: { cap: "Turin · Shroud of Turin" }, pt: { cap: "Turim · Sudário" } },
        { src: "images/italy5.jpg", en: { cap: "Monument to Victor Emmanuel II" }, pt: { cap: "Monumento a Vítor Emanuel II" } },
        { src: "images/italy_paraglider.mp4", video: true, en: { cap: "Paragliding · Turin" }, pt: { cap: "Parapente · Turim" } },
      ] },
      experiences: { en: ["Italian citizenship", "Rome & the Colosseum", "Vatican Museums", "Trevi Fountain", "Turin · Shroud of Turin", "Monument to Victor Emmanuel II", "Paragliding · Turin"], pt: ["Cidadania italiana", "Roma e o Coliseu", "Museus do Vaticano", "Fontana di Trevi", "Turim · Sudário", "Monumento a Vítor Emanuel II", "Parapente · Turim"] },
      en: { kicker: "Italy · Roots & history", title: "Obtaining my Italian citizenship", body: "Italy is part of who I am — I obtained my Italian citizenship and explored Rome, the Vatican, Castel Sant'Angelo, the Trevi Fountain and Turin, even completing a paragliding flight." },
      pt: { kicker: "Itália · Raízes e história", title: "Obtendo minha cidadania italiana", body: "A Itália faz parte de quem eu sou — obtive a cidadania italiana e explorei Roma, o Vaticano, o Castel Sant'Angelo, a Fontana di Trevi e Turim, incluindo um voo de parapente." },
    },

    /* ---- 9 · IRELAND ---- */
    {
      id: "ireland", layout: "story", chapter: "08", flag: "ie", side: "left",
      focus: { coordinates: [-8, 53.3], dist: 230, match: "Ireland" },
      media: { type: "gallery", cols: 2, items: [
        { src: "images/ireland1.jpg", en: { cap: "Dublin Castle" }, pt: { cap: "Castelo de Dublin" } },
        { src: "images/ireland2.jpg", en: { cap: "Malahide Castle" }, pt: { cap: "Castelo de Malahide" } },
        { src: "images/ireland3.jpg", en: { cap: "Temple Bar, Dublin" }, pt: { cap: "Temple Bar, Dublin" } },
        { src: "images/ireland4.jpg", en: { cap: "Dublin city" }, pt: { cap: "Cidade de Dublin" } },
      ] },
      experiences: { en: ["Dublin Castle", "Temple Bar", "Malahide Castle", "Cultural landmarks"], pt: ["Castelo de Dublin", "Temple Bar", "Castelo de Malahide", "Pontos culturais"] },
      en: { kicker: "Ireland · The Emerald Isle", title: "Discovering Ireland", body: "In Ireland I visited Dublin Castle, the lively Temple Bar, Malahide Castle and many cultural landmarks — and lived here while working in international tax." },
      pt: { kicker: "Irlanda · A Ilha Esmeralda", title: "Descobrindo a Irlanda", body: "Na Irlanda visitei o Castelo de Dublin, o animado Temple Bar, o Castelo de Malahide e diversos pontos culturais — e morei aqui enquanto trabalhava com tributação internacional." },
    },

    /* ---- 10 · NORTHERN IRELAND ---- */
    {
      id: "northern-ireland", layout: "story", chapter: "09", flag: "gb-nir", side: "right",
      focus: { coordinates: [-6.6, 54.7], dist: 225, match: "Northern Ireland" },
      media: { type: "gallery", cols: 2, items: [
        { src: "images/nireland1.jpg", en: { cap: "Giant's Causeway" }, pt: { cap: "Calçada dos Gigantes" } },
        { src: "images/nireland2.jpg", en: { cap: "The Dark Hedges" }, pt: { cap: "Dark Hedges" } },
        { src: "images/nireland3.jpg", en: { cap: "Dunluce Castle" }, pt: { cap: "Castelo de Dunluce" } },
        { src: "images/nireland4.jpg", en: { cap: "Titanic Belfast" }, pt: { cap: "Titanic Belfast" } },
      ] },
      experiences: { en: ["Giant's Causeway", "Dunluce Castle", "The Dark Hedges", "Titanic Belfast", "Game of Thrones locations"], pt: ["Calçada dos Gigantes", "Castelo de Dunluce", "Dark Hedges", "Titanic Belfast", "Locações de Game of Thrones"] },
      en: { kicker: "United Kingdom · Northern Ireland", title: "Legends & landscapes", body: "Northern Ireland enchanted me — the Giant's Causeway, Dunluce Castle, the Dark Hedges, Titanic Belfast and several iconic Game of Thrones locations." },
      pt: { kicker: "Reino Unido · Irlanda do Norte", title: "Lendas e paisagens", body: "A Irlanda do Norte me encantou — a Calçada dos Gigantes, o Castelo de Dunluce, as Dark Hedges, o Titanic Belfast e várias locações icônicas de Game of Thrones." },
    },

    /* ---- 11 · SCOTLAND ---- */
    {
      id: "scotland", layout: "story", chapter: "10", flag: "gb-sct", side: "left",
      focus: { coordinates: [-4.2, 56.8], dist: 230, match: "Scotland" },
      media: { type: "gallery", cols: 2, items: [
        { src: "images/scotland1.jpg", en: { cap: "Edinburgh Castle" }, pt: { cap: "Castelo de Edimburgo" } },
        { src: "images/scotland2.jpg", en: { cap: "Edinburgh Castle" }, pt: { cap: "Castelo de Edimburgo" } },
      ] },
      experiences: { en: ["Edinburgh Castle", "The Royal Mile", "Old & New Town", "Scottish Highlands"], pt: ["Castelo de Edimburgo", "Royal Mile", "Cidade Velha e Nova", "Terras Altas da Escócia"] },
      en: { kicker: "United Kingdom · Scotland", title: "Edinburgh & the Highlands", body: "Scotland captivated me with the majestic Edinburgh Castle overlooking the city, the historic Royal Mile and the dramatic landscapes of the Highlands." },
      pt: { kicker: "Reino Unido · Escócia", title: "Edimburgo e as Highlands", body: "A Escócia me cativou com o majestoso Castelo de Edimburgo dominando a cidade, a histórica Royal Mile e as paisagens dramáticas das Highlands." },
    },

    /* ---- 12 · WALES ---- */
    {
      id: "wales", layout: "story", chapter: "11", flag: "gb-wls", side: "right",
      focus: { coordinates: [-3.8, 52.4], dist: 225, match: "Wales" },
      media: { type: "gallery", cols: 2, items: [
        { src: "images/wales1.jpg", en: { cap: "Holyhead" }, pt: { cap: "Holyhead" } },
        { src: "images/wales2.jpg", en: { cap: "Holyhead" }, pt: { cap: "Holyhead" } },
      ] },
      experiences: { en: ["Holyhead", "Anglesey coast", "Welsh landscapes"], pt: ["Holyhead", "Costa de Anglesey", "Paisagens galesas"] },
      en: { kicker: "United Kingdom · Wales", title: "The Welsh coast", body: "In Wales I discovered Holyhead and the rugged beauty of the Anglesey coast — a land of dramatic shorelines, castles and proud heritage." },
      pt: { kicker: "Reino Unido · País de Gales", title: "A costa galesa", body: "No País de Gales descobri Holyhead e a beleza áspera da costa de Anglesey — uma terra de litorais dramáticos, castelos e orgulhosa herança." },
    },

    /* ---- 13 · FRANCE ---- */
    {
      id: "france", layout: "story", chapter: "12", flag: "fr", side: "left",
      focus: { coordinates: [2.4, 46.8], dist: 250, match: "France" },
      media: { type: "gallery", cols: 2, items: [
        { src: "images/france1.jpg", en: { cap: "Eiffel Tower" }, pt: { cap: "Torre Eiffel" } },
        { src: "images/france2.jpg", en: { cap: "Palace of Versailles" }, pt: { cap: "Palácio de Versalhes" } },
        { src: "images/france3.jpg", en: { cap: "The Louvre" }, pt: { cap: "Louvre" } },
        { src: "images/france4.jpg", en: { cap: "Notre-Dame" }, pt: { cap: "Notre-Dame" } },
      ] },
      experiences: { en: ["Eiffel Tower", "The Louvre", "Notre-Dame", "Arc de Triomphe", "Montmartre & Sacré-Cœur", "Versailles"], pt: ["Torre Eiffel", "Louvre", "Notre-Dame", "Arco do Triunfo", "Montmartre e Sacré-Cœur", "Versalhes"] },
      en: { kicker: "France · Art & grandeur", title: "Paris and Versailles", body: "Paris revealed the Eiffel Tower, the Louvre, Notre-Dame, the Arc de Triomphe and Montmartre — crowned by the magnificent Palace of Versailles." },
      pt: { kicker: "França · Arte e grandeza", title: "Paris e Versalhes", body: "Paris revelou a Torre Eiffel, o Louvre, a Notre-Dame, o Arco do Triunfo e Montmartre — coroados pelo magnífico Palácio de Versalhes." },
    },

    /* ---- 12 · GERMANY ---- */
    {
      id: "germany", layout: "story", chapter: "13", flag: "de", side: "right",
      focus: { coordinates: [10.4, 51.2], dist: 245, match: "Germany" },
      media: { type: "gallery", cols: 2, items: [
        { src: "images/germany1.jpg", en: { cap: "Brandenburg Gate" }, pt: { cap: "Portão de Brandemburgo" } },
        { src: "images/germany2.jpg", en: { cap: "Sanssouci, Potsdam" }, pt: { cap: "Sanssouci, Potsdam" } },
        { src: "images/germany3.jpg", en: { cap: "Berlin Wall" }, pt: { cap: "Muro de Berlim" } },
        { src: "images/germany4.jpg", en: { cap: "Checkpoint Charlie" }, pt: { cap: "Checkpoint Charlie" } },
      ] },
      experiences: { en: ["Berlin Wall", "Brandenburg Gate", "Checkpoint Charlie", "Berlin Cathedral", "Sanssouci & New Palace"], pt: ["Muro de Berlim", "Portão de Brandemburgo", "Checkpoint Charlie", "Catedral de Berlim", "Sanssouci e Novo Palácio"] },
      en: { kicker: "Germany · History & memory", title: "Berlin and Potsdam", body: "In Germany I walked the Berlin Wall, the Brandenburg Gate and Checkpoint Charlie, and explored the grand palaces of Potsdam — history at every turn." },
      pt: { kicker: "Alemanha · História e memória", title: "Berlim e Potsdam", body: "Na Alemanha percorri o Muro de Berlim, o Portão de Brandemburgo e o Checkpoint Charlie, e explorei os grandiosos palácios de Potsdam — história a cada esquina." },
    },

    /* ---- 13 · SPAIN ---- */
    {
      id: "spain", layout: "story", chapter: "14", flag: "es", side: "left",
      focus: { coordinates: [-3.7, 40.2], dist: 250, match: "Spain" },
      media: { type: "gallery", cols: 2, items: [
        { src: "images/spain1.jpg", en: { cap: "Santiago Bernabéu" }, pt: { cap: "Santiago Bernabéu" } },
        { src: "images/spain2.jpg", en: { cap: "Toledo" }, pt: { cap: "Toledo" } },
        { src: "images/spain3.jpg", en: { cap: "Royal Palace of Madrid" }, pt: { cap: "Palácio Real de Madri" } },
        { src: "images/spain4.jpg", en: { cap: "Prado Museum" }, pt: { cap: "Museu do Prado" } },
      ] },
      experiences: { en: ["Santiago Bernabéu", "Royal Palace of Madrid", "Prado Museum", "El Retiro Park", "Toledo · medieval city"], pt: ["Santiago Bernabéu", "Palácio Real de Madri", "Museu do Prado", "Parque do Retiro", "Toledo · cidade medieval"] },
      en: { kicker: "Spain · Passion & heritage", title: "Madrid and Toledo", body: "Spain brought the Santiago Bernabéu, the Royal Palace, the Prado Museum and El Retiro in Madrid — and the medieval magic of Toledo." },
      pt: { kicker: "Espanha · Paixão e patrimônio", title: "Madri e Toledo", body: "A Espanha trouxe o Santiago Bernabéu, o Palácio Real, o Museu do Prado e o Retiro em Madri — e a magia medieval de Toledo." },
    },

    /* ---- 14 · PORTUGAL ---- */
    {
      id: "portugal", layout: "story", chapter: "15", flag: "pt", side: "right",
      focus: { coordinates: [-8.2, 39.6], dist: 235, match: "Portugal" },
      media: { type: "gallery", cols: 2, items: [
        { src: "images/portugal1.jpg", en: { cap: "University of Coimbra" }, pt: { cap: "Universidade de Coimbra" } },
        { src: "images/portugal2.jpg", en: { cap: "Templar Castle, Tomar" }, pt: { cap: "Castelo dos Templários, Tomar" } },
        { src: "images/portugal3.jpg", en: { cap: "Porto" }, pt: { cap: "Porto" } },
        { src: "images/portugal4.jpg", en: { cap: "Lisbon" }, pt: { cap: "Lisboa" } },
        { src: "images/portugal5.jpg", en: { cap: "Braga" }, pt: { cap: "Braga" } },
        { src: "images/portugal6.jpg", en: { cap: "Guimarães" }, pt: { cap: "Guimarães" } },
      ] },
      experiences: { en: ["Porto · Lisbon · Coimbra", "Braga & Guimarães", "Templar Castle · Tomar", "University of Coimbra", "Climbing the Valongo mountains"], pt: ["Porto · Lisboa · Coimbra", "Braga e Guimarães", "Castelo dos Templários · Tomar", "Universidade de Coimbra", "Montanhas de Valongo"] },
      en: { kicker: "Portugal · A second home", title: "A meaningful chapter", body: "Portugal became a particularly meaningful part of my journey — where I studied, built my career and discovered Porto, Lisbon, Coimbra, the Templar Castle in Tomar and the mountains of Valongo." },
      pt: { kicker: "Portugal · Um segundo lar", title: "Um capítulo especial", body: "Portugal tornou-se uma parte muito especial da minha jornada — onde estudei, construí minha carreira e descobri o Porto, Lisboa, Coimbra, o Castelo dos Templários em Tomar e as montanhas de Valongo." },
    },

    /* ---- 15 · GLOBAL ACHIEVEMENTS ---- */
    {
      id: "achievements", layout: "story", chapter: "16", side: "right",
      focus: { overview: true },
      media: {
        type: "gallery", cols: 2,
        stat: { value: "42.195", unit: "KM", en: "Full marathon · Porto", pt: "Maratona completa · Porto" },
        items: [
          { src: "images/sports.jpg", en: { cap: "Marathon · Porto" }, pt: { cap: "Maratona · Porto" } },
          { src: "images/achv1.jpg", en: { cap: "Road races" }, pt: { cap: "Provas de rua" } },
          { src: "images/achv2.jpg", en: { cap: "Climbing · Valongo" }, pt: { cap: "Montanhismo · Valongo" } },
          { src: "images/achv_ak47.mp4", video: true, en: { cap: "Shooting · AK-47" }, pt: { cap: "Tiro · AK-47" } },
          { src: "images/achv_paintball.jpg", en: { cap: "Paintball" }, pt: { cap: "Paintball" } },
          { src: "images/achv_archery.jpg", en: { cap: "Archery" }, pt: { cap: "Arco e Flecha" } },
        ],
      },
      experiences: { en: ["Full marathon · Porto (42.195 km)", "Half marathon", "Road races", "Jiu-Jitsu", "Mountain climbing · Valongo", "Shooting · AK-47", "Paintball", "Archery"], pt: ["Maratona completa · Porto (42,195 km)", "Meia maratona", "Provas de rua", "Jiu-Jitsu", "Montanhismo · Valongo", "Tiro · AK-47", "Paintball", "Arco e Flecha"] },
      en: {
        kicker: "Achievements · Discipline in motion",
        title: "Pushing my limits",
        body: "Beyond travel and career, sport has shaped me. Jiu-Jitsu, countless road races, a half marathon and a full marathon completed in Porto — each one reinforcing discipline, resilience and determination.",
      },
      pt: {
        kicker: "Conquistas · Disciplina em movimento",
        title: "Superando meus limites",
        body: "Além das viagens e da carreira, o esporte me moldou. Jiu-Jitsu, inúmeras provas de rua, uma meia maratona e uma maratona completa concluída no Porto — cada uma reforçando disciplina, resiliência e determinação.",
      },
    },

    /* ---- 16 · REFLECTION ---- */
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

    /* ---- 17 · THANK YOU ---- */
    {
      id: "thanks", layout: "thanks", chapter: "",
      focus: { overview: true },
      contact: [
        { type: "email", label: "Email", value: "your.email@example.com", href: "mailto:your.email@example.com" },
        { type: "linkedin", label: "LinkedIn", value: "linkedin.com/in/your-profile", href: "https://linkedin.com/in/your-profile" },
      ],
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
