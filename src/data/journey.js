/* =============================================================================
 *  journey-data.js  —  window.JOURNEY_DATA
 *  All slides for "My Journey" site.
 *
 *  Photo placeholders use paths like:
 *    assets/img/journey/[city]/photo-N.jpg
 *  Video placeholders:
 *    assets/img/journey/[city]/video-N.mp4
 *  Flag images:
 *    public/flags/[code].png   (e.g. public/flags/BRA.png)
 *
 *  Upload your own images to those exact paths on GitHub and they will appear.
 * ============================================================================= */

window.JOURNEY_DATA = {

  settings: {
    accent:      "#5cc8ff",
    highlight:   "#7df2a8",
    autoRotate:  true,
    rotateSpeed: 0.6,
  },

  brand: {
    name: "Marlon B. Siqueira",
    tagline: { en: "My Personal Journey", pt: "A Minha Jornada" },
  },

  ui: {
    prev:    { en: "Prev",    pt: "Anterior" },
    next:    { en: "Next",    pt: "Próximo"  },
    of:      { en: "of",      pt: "de"       },
    loading: { en: "Loading journey…", pt: "A carregar…" },
  },

  slides: [

    /* ──────────────────────────────────────────────────────────────────────────
     *  CHAPTER 04 — BRAZIL · ADRENALINE & NATURE
     * ────────────────────────────────────────────────────────────────────────── */
    {
      layout: "chapter",
      flag:   "BRA",
      chapter: { en: "Chapter 04", pt: "Capítulo 04" },
      focus: { overview: true },
      en: {
        title:    "Brazil",
        subtitle: "Adrenaline & Nature",
        body:     "From the mountains of Minas Gerais to the beaches of Florianópolis — Brazil in full colour.",
      },
      pt: {
        title:    "Brasil",
        subtitle: "Adrenalina & Natureza",
        body:     "Das montanhas de Minas Gerais às praias de Florianópolis — o Brasil em plena cor.",
      },
    },

    /* ── Belo Horizonte ── */
    {
      layout: "media-text",
      flag:   "BRA",
      chapter: { en: "Chapter 04 · Brazil", pt: "Capítulo 04 · Brasil" },
      focus: {
        coordinates: [-43.9378, -19.9208],
        camDistance: 2.0,
        marker:      [-43.9378, -19.9208],
        markerLabel: { en: "Belo Horizonte", pt: "Belo Horizonte" },
        match:       "Brazil",
      },
      en: {
        title:    "Belo Horizonte",
        subtitle: "Heart of Minas Gerais",
        body:     "A city of hills, culture, and world-class gastronomy. The gateway to Brazil's mining heritage.",
      },
      pt: {
        title:    "Belo Horizonte",
        subtitle: "Coração de Minas Gerais",
        body:     "Uma cidade de colinas, cultura e gastronomia de excelência. Porta de entrada para o património mineiro.",
      },
      media: {
        type: "gallery",
        cols: 2,
        items: [
          { src: "assets/img/journey/belo-horizonte/photo-1.jpg", en: { cap: "" }, pt: { cap: "" } },
          { src: "assets/img/journey/belo-horizonte/photo-2.jpg", en: { cap: "" }, pt: { cap: "" } },
          { src: "assets/img/journey/belo-horizonte/photo-3.jpg", en: { cap: "" }, pt: { cap: "" } },
          { src: "assets/img/journey/belo-horizonte/photo-4.jpg", en: { cap: "" }, pt: { cap: "" } },
        ],
      },
    },

    /* ── Rio de Janeiro ── */
    {
      layout: "media-text",
      flag:   "BRA",
      chapter: { en: "Chapter 04 · Brazil", pt: "Capítulo 04 · Brasil" },
      focus: {
        coordinates: [-43.1729, -22.9068],
        camDistance: 2.0,
        marker:      [-43.1729, -22.9068],
        markerLabel: { en: "Rio de Janeiro", pt: "Rio de Janeiro" },
        match:       "Brazil",
      },
      en: {
        title:    "Rio de Janeiro",
        subtitle: "Cidade Maravilhosa",
        body:     "Cristo Redentor, Pão de Açúcar, Copacabana, Ipanema — and the sky from a paraglider above the city.",
      },
      pt: {
        title:    "Rio de Janeiro",
        subtitle: "Cidade Maravilhosa",
        body:     "Cristo Redentor, Pão de Açúcar, Copacabana, Ipanema — e o céu visto de asa delta sobre a cidade.",
      },
      media: {
        type: "gallery",
        cols: 2,
        items: [
          { src: "assets/img/journey/rio/cristo-redentor.jpg",  en: { cap: "Cristo Redentor" },  pt: { cap: "Cristo Redentor" } },
          { src: "assets/img/journey/rio/pao-de-acucar.jpg",    en: { cap: "Pão de Açúcar" },    pt: { cap: "Pão de Açúcar" } },
          { src: "assets/img/journey/rio/copacabana.jpg",       en: { cap: "Copacabana" },        pt: { cap: "Copacabana" } },
          { src: "assets/img/journey/rio/ipanema.jpg",          en: { cap: "Ipanema" },           pt: { cap: "Ipanema" } },
          { src: "assets/img/journey/rio/helicopter-video.mp4", en: { cap: "Helicopter tour" },   pt: { cap: "Tour de helicóptero" }, video: true },
          { src: "assets/img/journey/rio/hang-gliding-video.mp4", en: { cap: "Hang gliding" },   pt: { cap: "Asa delta" },           video: true },
        ],
      },
    },

    /* ── Florianópolis ── */
    {
      layout: "media-text",
      flag:   "BRA",
      chapter: { en: "Chapter 04 · Brazil", pt: "Capítulo 04 · Brasil" },
      focus: {
        coordinates: [-48.5480, -27.5954],
        camDistance: 2.0,
        marker:      [-48.5480, -27.5954],
        markerLabel: { en: "Florianópolis", pt: "Florianópolis" },
        match:       "Brazil",
      },
      en: {
        title:    "Florianópolis",
        subtitle: "Island of Magic",
        body:     "Stunning beaches, lagoons, and the crystal-clear waters of Santa Catarina — including an underwater dive.",
      },
      pt: {
        title:    "Florianópolis",
        subtitle: "Ilha da Magia",
        body:     "Praias deslumbrantes, lagoas e as águas cristalinas de Santa Catarina — incluindo um mergulho.",
      },
      media: {
        type: "gallery",
        cols: 2,
        items: [
          { src: "assets/img/journey/florianopolis/photo-1.jpg",     en: { cap: "" }, pt: { cap: "" } },
          { src: "assets/img/journey/florianopolis/photo-2.jpg",     en: { cap: "" }, pt: { cap: "" } },
          { src: "assets/img/journey/florianopolis/diving-video.mp4",en: { cap: "Diving" }, pt: { cap: "Mergulho" }, video: true },
        ],
      },
    },

    /* ──────────────────────────────────────────────────────────────────────────
     *  CHAPTER 05 — UNITED STATES · NEW YORK & MIAMI
     * ────────────────────────────────────────────────────────────────────────── */
    {
      layout: "chapter",
      flag:   "USA",
      chapter: { en: "Chapter 05", pt: "Capítulo 05" },
      focus: { overview: true },
      en: {
        title:    "United States",
        subtitle: "New York & Miami",
        body:     "The neon energy of Miami Beach and the relentless pulse of New York City.",
      },
      pt: {
        title:    "Estados Unidos",
        subtitle: "Nova Iorque & Miami",
        body:     "A energia neon de Miami Beach e o ritmo imparável de Nova Iorque.",
      },
    },

    /* ── Miami ── */
    {
      layout: "media-text",
      flag:   "USA",
      chapter: { en: "Chapter 05 · USA", pt: "Capítulo 05 · EUA" },
      focus: {
        coordinates: [-80.1918, 25.7617],
        camDistance: 1.8,
        marker:      [-80.1918, 25.7617],
        markerLabel: { en: "Miami", pt: "Miami" },
        match:       "United States of America",
      },
      en: {
        title:    "Miami",
        subtitle: "Sun, Speed & Steel",
        body:     "Ferrari on the road, a Ferrari on the range — and a collection of firearms that would impress any action hero.",
      },
      pt: {
        title:    "Miami",
        subtitle: "Sol, Velocidade & Aço",
        body:     "Ferrari na estrada, Ferrari no stand — e uma coleção de armas que impressionaria qualquer herói de ação.",
      },
      media: {
        type: "gallery",
        cols: 2,
        items: [
          { src: "assets/img/journey/miami/photo-1.jpg",      en: { cap: "" }, pt: { cap: "" } },
          { src: "assets/img/journey/miami/photo-2.jpg",      en: { cap: "" }, pt: { cap: "" } },
          { src: "assets/img/journey/miami/photo-3.jpg",      en: { cap: "" }, pt: { cap: "" } },
          { src: "assets/img/journey/miami/ferrari-video.mp4",en: { cap: "Ferrari" },    pt: { cap: "Ferrari" },    video: true },
          { src: "assets/img/journey/miami/ak47-video.mp4",   en: { cap: "AK-47" },     pt: { cap: "AK-47" },     video: true },
          { src: "assets/img/journey/miami/scar-video.mp4",   en: { cap: "SCAR" },      pt: { cap: "SCAR" },      video: true },
          { src: "assets/img/journey/miami/mp5-video.mp4",    en: { cap: "MP5" },       pt: { cap: "MP5" },       video: true },
        ],
      },
    },

    /* ── New York ── */
    {
      layout: "media-text",
      flag:   "USA",
      chapter: { en: "Chapter 05 · USA", pt: "Capítulo 05 · EUA" },
      focus: {
        coordinates: [-74.0060, 40.7128],
        camDistance: 1.8,
        marker:      [-74.0060, 40.7128],
        markerLabel: { en: "New York", pt: "Nova Iorque" },
        match:       "United States of America",
      },
      en: {
        title:    "New York City",
        subtitle: "The City That Never Sleeps",
        body:     "NBA courtside at the Garden, the top of the world at One WTC, and icons that define a skyline.",
      },
      pt: {
        title:    "Nova Iorque",
        subtitle: "A Cidade Que Nunca Dorme",
        body:     "NBA no Garden, o topo do mundo no One WTC e ícones que definem uma silhueta única.",
      },
      media: {
        type: "gallery",
        cols: 2,
        items: [
          { src: "assets/img/journey/new-york/nba-knicks-bulls.jpg",      en: { cap: "NBA — Knicks vs Bulls" },    pt: { cap: "NBA — Knicks vs Bulls" } },
          { src: "assets/img/journey/new-york/one-world-trade-center.jpg",en: { cap: "One World Trade Center" },   pt: { cap: "One World Trade Center" } },
          { src: "assets/img/journey/new-york/empire-state.jpg",          en: { cap: "Empire State Building" },    pt: { cap: "Empire State Building" } },
          { src: "assets/img/journey/new-york/brooklyn-bridge.jpg",       en: { cap: "Brooklyn Bridge" },          pt: { cap: "Brooklyn Bridge" } },
          { src: "assets/img/journey/new-york/bull-statue.jpg",           en: { cap: "Charging Bull" },            pt: { cap: "Touro de Wall Street" } },
          { src: "assets/img/journey/new-york/statue-of-liberty.jpg",     en: { cap: "Statue of Liberty" },        pt: { cap: "Estátua da Liberdade" } },
          { src: "assets/img/journey/new-york/911-museum.jpg",            en: { cap: "9/11 Museum" },              pt: { cap: "Museu do 11 de Setembro" } },
          { src: "assets/img/journey/new-york/photo-8.jpg",               en: { cap: "" },                         pt: { cap: "" } },
        ],
      },
    },

    /* ──────────────────────────────────────────────────────────────────────────
     *  UNITED KINGDOM
     * ────────────────────────────────────────────────────────────────────────── */

    /* ── London ── */
    {
      layout: "media-text",
      flag:   "GBR",
      chapter: { en: "United Kingdom", pt: "Reino Unido" },
      focus: {
        coordinates: [-0.1278, 51.5074],
        camDistance: 1.8,
        marker:      [-0.1278, 51.5074],
        markerLabel: { en: "London", pt: "Londres" },
        match:       "England",
      },
      en: {
        title:    "London",
        subtitle: "Capital of Everything",
        body:     "Big Ben, Tower Bridge, Buckingham Palace — and the endless energy of one of the world's greatest cities.",
      },
      pt: {
        title:    "Londres",
        subtitle: "Capital de Tudo",
        body:     "Big Ben, Tower Bridge, Buckingham Palace — e a energia interminável de uma das maiores cidades do mundo.",
      },
      media: {
        type: "gallery",
        cols: 2,
        items: [
          { src: "assets/img/journey/london/photo-1.jpg", en: { cap: "" }, pt: { cap: "" } },
          { src: "assets/img/journey/london/photo-2.jpg", en: { cap: "" }, pt: { cap: "" } },
          { src: "assets/img/journey/london/photo-3.jpg", en: { cap: "" }, pt: { cap: "" } },
        ],
      },
    },

    /* ── Northern Ireland (name on map only) ── */
    {
      layout: "text-only",
      flag:   "GBR",
      chapter: { en: "United Kingdom", pt: "Reino Unido" },
      focus: {
        coordinates: [-6.4923, 54.5973],
        camDistance: 2.0,
        marker:      [-6.4923, 54.5973],
        markerLabel: { en: "Northern Ireland", pt: "Irlanda do Norte" },
        match:       "Northern Ireland",
      },
      en: {
        title:    "Northern Ireland",
        subtitle: "Giant's Causeway & Beyond",
        body:     "The rugged coast, basalt columns of the Giant's Causeway, and the wild landscape of the north.",
      },
      pt: {
        title:    "Irlanda do Norte",
        subtitle: "Giant's Causeway e Além",
        body:     "A costa acidentada, as colunas de basalto da Calçada do Gigante e a paisagem selvagem do norte.",
      },
    },

    /* ── Edinburgh ── */
    {
      layout: "media-text",
      flag:   "GBR",
      chapter: { en: "United Kingdom", pt: "Reino Unido" },
      focus: {
        coordinates: [-3.1883, 55.9533],
        camDistance: 1.9,
        marker:      [-3.1883, 55.9533],
        markerLabel: { en: "Edinburgh", pt: "Edimburgo" },
        match:       "Scotland",
      },
      en: {
        title:    "Edinburgh",
        subtitle: "Scotland's Crown",
        body:     "The castle on the volcanic rock, the Royal Mile, and the wild Highlands visible from Arthur's Seat.",
      },
      pt: {
        title:    "Edimburgo",
        subtitle: "A Coroa da Escócia",
        body:     "O castelo sobre a rocha vulcânica, a Royal Mile e as Highlands visíveis do Arthur's Seat.",
      },
      media: {
        type: "gallery",
        cols: 2,
        items: [
          { src: "assets/img/journey/edinburgh/photo-1.jpg", en: { cap: "" }, pt: { cap: "" } },
          { src: "assets/img/journey/edinburgh/photo-2.jpg", en: { cap: "" }, pt: { cap: "" } },
          { src: "assets/img/journey/edinburgh/photo-3.jpg", en: { cap: "" }, pt: { cap: "" } },
        ],
      },
    },

    /* ── Holyhead ── */
    {
      layout: "media-text",
      flag:   "GBR",
      chapter: { en: "United Kingdom", pt: "Reino Unido" },
      focus: {
        coordinates: [-4.6330, 53.3099],
        camDistance: 2.0,
        marker:      [-4.6330, 53.3099],
        markerLabel: { en: "Holyhead", pt: "Holyhead" },
        match:       "Wales",
      },
      en: {
        title:    "Holyhead",
        subtitle: "Wales & the Irish Sea",
        body:     "The ferry port connecting Wales to Ireland, with dramatic coastal views and the wild Welsh landscape.",
      },
      pt: {
        title:    "Holyhead",
        subtitle: "País de Gales & Mar da Irlanda",
        body:     "O porto de ferry que liga o País de Gales à Irlanda, com vistas costeiras dramáticas.",
      },
      media: {
        type: "gallery",
        cols: 2,
        items: [
          { src: "assets/img/journey/holyhead/photo-1.jpg", en: { cap: "" }, pt: { cap: "" } },
          { src: "assets/img/journey/holyhead/photo-2.jpg", en: { cap: "" }, pt: { cap: "" } },
        ],
      },
    },

    /* ──────────────────────────────────────────────────────────────────────────
     *  IRELAND
     * ────────────────────────────────────────────────────────────────────────── */
    {
      layout: "media-text",
      flag:   "IRL",
      chapter: { en: "Ireland", pt: "Irlanda" },
      focus: {
        coordinates: [-8.2439, 53.4129],
        camDistance: 2.0,
        marker:      [-8.2439, 53.4129],
        markerLabel: { en: "Ireland", pt: "Irlanda" },
        match:       "Ireland",
      },
      en: {
        title:    "Ireland",
        subtitle: "The Emerald Isle",
        body:     "Green cliffs, cosy pubs, and the warmth of Irish hospitality. A country that feels like home.",
      },
      pt: {
        title:    "Irlanda",
        subtitle: "A Ilha Esmeralda",
        body:     "Falésias verdes, pubs acolhedores e a hospitalidade irlandesa. Um país que parece lar.",
      },
      media: {
        type: "gallery",
        cols: 2,
        items: [
          { src: "assets/img/journey/ireland/photo-1.jpg", en: { cap: "" }, pt: { cap: "" } },
          { src: "assets/img/journey/ireland/photo-2.jpg", en: { cap: "" }, pt: { cap: "" } },
          { src: "assets/img/journey/ireland/photo-3.jpg", en: { cap: "" }, pt: { cap: "" } },
        ],
      },
    },

    /* ──────────────────────────────────────────────────────────────────────────
     *  ITALY
     * ────────────────────────────────────────────────────────────────────────── */

    /* ── Rome ── */
    {
      layout: "media-text",
      flag:   "ITA",
      chapter: { en: "Italy", pt: "Itália" },
      focus: {
        coordinates: [12.4964, 41.9028],
        camDistance: 1.8,
        marker:      [12.4964, 41.9028],
        markerLabel: { en: "Rome", pt: "Roma" },
        match:       "Italy",
      },
      en: {
        title:    "Rome",
        subtitle: "The Eternal City",
        body:     "The Colosseum, the Vatican, the Trevi Fountain — two thousand years of history in every cobblestone.",
      },
      pt: {
        title:    "Roma",
        subtitle: "A Cidade Eterna",
        body:     "O Coliseu, o Vaticano, a Fontana di Trevi — dois mil anos de história em cada pedra.",
      },
      media: {
        type: "gallery",
        cols: 3,
        items: [
          { src: "assets/img/journey/rome/colosseum.jpg",     en: { cap: "Colosseum" },       pt: { cap: "Coliseu" } },
          { src: "assets/img/journey/rome/vatican.jpg",       en: { cap: "Vatican" },          pt: { cap: "Vaticano" } },
          { src: "assets/img/journey/rome/trevi-fountain.jpg",en: { cap: "Trevi Fountain" },   pt: { cap: "Fontana di Trevi" } },
          { src: "assets/img/journey/rome/pantheon.jpg",      en: { cap: "Pantheon" },         pt: { cap: "Panteão" } },
          { src: "assets/img/journey/rome/spanish-steps.jpg", en: { cap: "Spanish Steps" },    pt: { cap: "Escadaria Espanhola" } },
          { src: "assets/img/journey/rome/photo-6.jpg",       en: { cap: "" },                 pt: { cap: "" } },
        ],
      },
    },

    /* ── Turin / Torino ── */
    {
      layout: "media-text",
      flag:   "ITA",
      chapter: { en: "Italy", pt: "Itália" },
      focus: {
        coordinates: [7.6869, 45.0703],
        camDistance: 1.9,
        marker:      [7.6869, 45.0703],
        markerLabel: { en: "Turin", pt: "Turim" },
        match:       "Italy",
      },
      en: {
        title:    "Turin",
        subtitle: "Alps at the Doorstep",
        body:     "The elegant Savoy city beneath the Alps — culture, chocolate, and paragliding over the mountains.",
      },
      pt: {
        title:    "Turim",
        subtitle: "Os Alpes à Porta",
        body:     "A elegante cidade dos Sabóia sob os Alpes — cultura, chocolate e parapente sobre as montanhas.",
      },
      media: {
        type: "gallery",
        cols: 2,
        items: [
          { src: "assets/img/journey/turin/photo-1.jpg",         en: { cap: "" }, pt: { cap: "" } },
          { src: "assets/img/journey/turin/photo-2.jpg",         en: { cap: "" }, pt: { cap: "" } },
          { src: "assets/img/journey/turin/photo-3.jpg",         en: { cap: "" }, pt: { cap: "" } },
          { src: "assets/img/journey/turin/paraglider-video.mp4",en: { cap: "Paragliding" }, pt: { cap: "Parapente" }, video: true },
        ],
      },
    },

    /* ──────────────────────────────────────────────────────────────────────────
     *  FRANCE
     * ────────────────────────────────────────────────────────────────────────── */

    /* ── Paris ── */
    {
      layout: "media-text",
      flag:   "FRA",
      chapter: { en: "France", pt: "França" },
      focus: {
        coordinates: [2.3522, 48.8566],
        camDistance: 1.8,
        marker:      [2.3522, 48.8566],
        markerLabel: { en: "Paris", pt: "Paris" },
        match:       "France",
      },
      en: {
        title:    "Paris",
        subtitle: "La Ville Lumière",
        body:     "The Eiffel Tower at golden hour, the Louvre's endless corridors, and the romance of the Seine.",
      },
      pt: {
        title:    "Paris",
        subtitle: "La Ville Lumière",
        body:     "A Torre Eiffel na hora dourada, os corredores infinitos do Louvre e o romance do Sena.",
      },
      media: {
        type: "gallery",
        cols: 3,
        items: [
          { src: "assets/img/journey/paris/eiffel-tower.jpg",  en: { cap: "Eiffel Tower" },    pt: { cap: "Torre Eiffel" } },
          { src: "assets/img/journey/paris/louvre.jpg",        en: { cap: "The Louvre" },       pt: { cap: "O Louvre" } },
          { src: "assets/img/journey/paris/notre-dame.jpg",    en: { cap: "Notre-Dame" },       pt: { cap: "Notre-Dame" } },
          { src: "assets/img/journey/paris/champs-elysees.jpg",en: { cap: "Champs-Élysées" },  pt: { cap: "Champs-Élysées" } },
          { src: "assets/img/journey/paris/arc-triomphe.jpg",  en: { cap: "Arc de Triomphe" },  pt: { cap: "Arco do Triunfo" } },
          { src: "assets/img/journey/paris/photo-6.jpg",       en: { cap: "" },                 pt: { cap: "" } },
        ],
      },
    },

    /* ── Versailles ── */
    {
      layout: "media-text",
      flag:   "FRA",
      chapter: { en: "France", pt: "França" },
      focus: {
        coordinates: [2.1204, 48.8049],
        camDistance: 1.9,
        marker:      [2.1204, 48.8049],
        markerLabel: { en: "Versailles", pt: "Versalhes" },
        match:       "France",
      },
      en: {
        title:    "Versailles",
        subtitle: "Palace of the Sun King",
        body:     "Gilded halls, sculpted gardens, and the Hall of Mirrors — Versailles is a world apart.",
      },
      pt: {
        title:    "Versalhes",
        subtitle: "Palácio do Rei Sol",
        body:     "Salões dourados, jardins esculpidos e a Galeria dos Espelhos — Versalhes é um mundo à parte.",
      },
      media: {
        type: "gallery",
        cols: 2,
        items: [
          { src: "assets/img/journey/versailles/palace.jpg",       en: { cap: "Palace" },             pt: { cap: "Palácio" } },
          { src: "assets/img/journey/versailles/hall-of-mirrors.jpg",en:{ cap: "Hall of Mirrors" },   pt: { cap: "Galeria dos Espelhos" } },
          { src: "assets/img/journey/versailles/gardens.jpg",      en: { cap: "Gardens" },            pt: { cap: "Jardins" } },
          { src: "assets/img/journey/versailles/photo-4.jpg",      en: { cap: "" },                   pt: { cap: "" } },
        ],
      },
    },

    /* ──────────────────────────────────────────────────────────────────────────
     *  GERMANY
     * ────────────────────────────────────────────────────────────────────────── */

    /* ── Berlin ── */
    {
      layout: "media-text",
      flag:   "DEU",
      chapter: { en: "Germany", pt: "Alemanha" },
      focus: {
        coordinates: [13.4050, 52.5200],
        camDistance: 1.8,
        marker:      [13.4050, 52.5200],
        markerLabel: { en: "Berlin", pt: "Berlim" },
        match:       "Germany",
      },
      en: {
        title:    "Berlin",
        subtitle: "History, Art & Energy",
        body:     "The Brandenburg Gate, the remnants of the Wall, East Side Gallery — and a nightlife without equal.",
      },
      pt: {
        title:    "Berlim",
        subtitle: "História, Arte & Energia",
        body:     "O Portão de Brandemburgo, os restos do Muro, a East Side Gallery — e uma vida noturna sem igual.",
      },
      media: {
        type: "gallery",
        cols: 3,
        items: [
          { src: "assets/img/journey/berlin/brandenburger-tor.jpg", en: { cap: "Brandenburg Gate" },   pt: { cap: "Portão de Brandemburgo" } },
          { src: "assets/img/journey/berlin/berlin-wall.jpg",       en: { cap: "Berlin Wall" },        pt: { cap: "Muro de Berlim" } },
          { src: "assets/img/journey/berlin/east-side-gallery.jpg", en: { cap: "East Side Gallery" },  pt: { cap: "East Side Gallery" } },
          { src: "assets/img/journey/berlin/reichstag.jpg",         en: { cap: "Reichstag" },          pt: { cap: "Reichstag" } },
          { src: "assets/img/journey/berlin/checkpoint-charlie.jpg",en: { cap: "Checkpoint Charlie" }, pt: { cap: "Checkpoint Charlie" } },
          { src: "assets/img/journey/berlin/photo-6.jpg",           en: { cap: "" },                   pt: { cap: "" } },
        ],
      },
    },

    /* ── Potsdam ── */
    {
      layout: "media-text",
      flag:   "DEU",
      chapter: { en: "Germany", pt: "Alemanha" },
      focus: {
        coordinates: [13.0636, 52.3906],
        camDistance: 1.9,
        marker:      [13.0636, 52.3906],
        markerLabel: { en: "Potsdam", pt: "Potsdam" },
        match:       "Germany",
      },
      en: {
        title:    "Potsdam",
        subtitle: "Prussian Splendour",
        body:     "Sanssouci Palace, baroque gardens, and the Dutch Quarter — a royal escape just outside Berlin.",
      },
      pt: {
        title:    "Potsdam",
        subtitle: "Esplendor Prussiano",
        body:     "O Palácio Sanssouci, jardins barrocos e o Bairro Holandês — uma fuga real perto de Berlim.",
      },
      media: {
        type: "gallery",
        cols: 2,
        items: [
          { src: "assets/img/journey/potsdam/sanssouci.jpg",     en: { cap: "Sanssouci Palace" },  pt: { cap: "Palácio Sanssouci" } },
          { src: "assets/img/journey/potsdam/dutch-quarter.jpg", en: { cap: "Dutch Quarter" },     pt: { cap: "Bairro Holandês" } },
          { src: "assets/img/journey/potsdam/gardens.jpg",       en: { cap: "Gardens" },           pt: { cap: "Jardins" } },
          { src: "assets/img/journey/potsdam/photo-4.jpg",       en: { cap: "" },                  pt: { cap: "" } },
        ],
      },
    },

    /* ──────────────────────────────────────────────────────────────────────────
     *  SPAIN
     * ────────────────────────────────────────────────────────────────────────── */

    /* ── Madrid ── */
    {
      layout: "media-text",
      flag:   "ESP",
      chapter: { en: "Spain", pt: "Espanha" },
      focus: {
        coordinates: [-3.7038, 40.4168],
        camDistance: 1.8,
        marker:      [-3.7038, 40.4168],
        markerLabel: { en: "Madrid", pt: "Madrid" },
        match:       "Spain",
      },
      en: {
        title:    "Madrid",
        subtitle: "Passion & Culture",
        body:     "The Prado, Retiro Park, the Royal Palace — and the electric atmosphere of a city that never slows down.",
      },
      pt: {
        title:    "Madrid",
        subtitle: "Paixão & Cultura",
        body:     "O Prado, o Parque del Retiro, o Palácio Real — e a atmosfera elétrica de uma cidade que nunca abranda.",
      },
      media: {
        type: "gallery",
        cols: 3,
        items: [
          { src: "assets/img/journey/madrid/prado.jpg",         en: { cap: "Prado Museum" },   pt: { cap: "Museu do Prado" } },
          { src: "assets/img/journey/madrid/retiro-park.jpg",   en: { cap: "Retiro Park" },    pt: { cap: "Parque del Retiro" } },
          { src: "assets/img/journey/madrid/royal-palace.jpg",  en: { cap: "Royal Palace" },   pt: { cap: "Palácio Real" } },
          { src: "assets/img/journey/madrid/puerta-del-sol.jpg",en: { cap: "Puerta del Sol" }, pt: { cap: "Puerta del Sol" } },
          { src: "assets/img/journey/madrid/gran-via.jpg",      en: { cap: "Gran Vía" },       pt: { cap: "Gran Vía" } },
          { src: "assets/img/journey/madrid/photo-6.jpg",       en: { cap: "" },               pt: { cap: "" } },
        ],
      },
    },

    /* ── Toledo ── */
    {
      layout: "media-text",
      flag:   "ESP",
      chapter: { en: "Spain", pt: "Espanha" },
      focus: {
        coordinates: [-4.0244, 39.8628],
        camDistance: 1.9,
        marker:      [-4.0244, 39.8628],
        markerLabel: { en: "Toledo", pt: "Toledo" },
        match:       "Spain",
      },
      en: {
        title:    "Toledo",
        subtitle: "City of Three Cultures",
        body:     "The medieval walled city where Christians, Muslims, and Jews once lived side by side on a granite hill.",
      },
      pt: {
        title:    "Toledo",
        subtitle: "Cidade das Três Culturas",
        body:     "A cidade medieval amuralhada onde cristãos, muçulmanos e judeus coabitaram sobre um planalto granítico.",
      },
      media: {
        type: "gallery",
        cols: 2,
        items: [
          { src: "assets/img/journey/toledo/alcazar.jpg",    en: { cap: "Alcázar" },       pt: { cap: "Alcázar" } },
          { src: "assets/img/journey/toledo/cathedral.jpg",  en: { cap: "Cathedral" },      pt: { cap: "Catedral" } },
          { src: "assets/img/journey/toledo/old-town.jpg",   en: { cap: "Old Town" },       pt: { cap: "Cidade Velha" } },
          { src: "assets/img/journey/toledo/photo-4.jpg",    en: { cap: "" },               pt: { cap: "" } },
        ],
      },
    },

    /* ──────────────────────────────────────────────────────────────────────────
     *  PORTUGAL
     * ────────────────────────────────────────────────────────────────────────── */

    /* ── Porto ── */
    {
      layout: "media-text",
      flag:   "PRT",
      chapter: { en: "Portugal", pt: "Portugal" },
      focus: {
        coordinates: [-8.6291, 41.1496],
        camDistance: 1.8,
        marker:      [-8.6291, 41.1496],
        markerLabel: { en: "Porto", pt: "Porto" },
        match:       "Portugal",
      },
      en: {
        title:    "Porto",
        subtitle: "Home Base",
        body:     "The city of bridges, port wine, and azulejos — the place that made me the person I am today.",
      },
      pt: {
        title:    "Porto",
        subtitle: "A Minha Base",
        body:     "A cidade das pontes, do vinho do Porto e dos azulejos — o lugar que me fez a pessoa que sou hoje.",
      },
      media: {
        type: "gallery",
        cols: 2,
        items: [
          { src: "assets/img/journey/porto/photo-1.jpg", en: { cap: "" }, pt: { cap: "" } },
          { src: "assets/img/journey/porto/photo-2.jpg", en: { cap: "" }, pt: { cap: "" } },
          { src: "assets/img/journey/porto/photo-3.jpg", en: { cap: "" }, pt: { cap: "" } },
          { src: "assets/img/journey/porto/photo-4.jpg", en: { cap: "" }, pt: { cap: "" } },
        ],
      },
    },

    /* ── Braga / Guimarães / Santa Maria da Feira ── */
    {
      layout: "media-text",
      flag:   "PRT",
      chapter: { en: "Portugal", pt: "Portugal" },
      focus: {
        coordinates: [-8.4265, 41.5454],
        camDistance: 1.9,
        marker:      [-8.4265, 41.5454],
        markerLabel: { en: "Braga & North", pt: "Braga & Norte" },
        match:       "Portugal",
      },
      en: {
        title:    "Braga · Guimarães · Feira",
        subtitle: "The Cradle of Portugal",
        body:     "Bom Jesus, the castle of Guimarães where Portugal was born, and the medieval fair of Santa Maria da Feira.",
      },
      pt: {
        title:    "Braga · Guimarães · Feira",
        subtitle: "O Berço de Portugal",
        body:     "Bom Jesus, o castelo de Guimarães onde Portugal nasceu, e a feira medieval de Santa Maria da Feira.",
      },
      media: {
        type: "gallery",
        cols: 3,
        items: [
          { src: "assets/img/journey/north-portugal/braga-bom-jesus.jpg",     en: { cap: "Bom Jesus, Braga" },          pt: { cap: "Bom Jesus, Braga" } },
          { src: "assets/img/journey/north-portugal/braga-photo-2.jpg",       en: { cap: "" },                          pt: { cap: "" } },
          { src: "assets/img/journey/north-portugal/guimaraes-castle.jpg",    en: { cap: "Castle of Guimarães" },       pt: { cap: "Castelo de Guimarães" } },
          { src: "assets/img/journey/north-portugal/guimaraes-photo-2.jpg",   en: { cap: "" },                          pt: { cap: "" } },
          { src: "assets/img/journey/north-portugal/feira-medieval.jpg",      en: { cap: "Medieval Fair — Feira" },     pt: { cap: "Feira Medieval — Feira" } },
          { src: "assets/img/journey/north-portugal/feira-photo-2.jpg",       en: { cap: "" },                          pt: { cap: "" } },
        ],
      },
    },

    /* ── Tomar ── */
    {
      layout: "media-text",
      flag:   "PRT",
      chapter: { en: "Portugal", pt: "Portugal" },
      focus: {
        coordinates: [-8.4105, 39.6023],
        camDistance: 1.9,
        marker:      [-8.4105, 39.6023],
        markerLabel: { en: "Tomar", pt: "Tomar" },
        match:       "Portugal",
      },
      en: {
        title:    "Tomar",
        subtitle: "Knights Templar Capital",
        body:     "The Convent of Christ, the Templar castle, and the mystical heritage of the Knights Templar in Portugal.",
      },
      pt: {
        title:    "Tomar",
        subtitle: "Capital Templária",
        body:     "O Convento de Cristo, o castelo templário e o legado místico dos Cavaleiros Templários em Portugal.",
      },
      media: {
        type: "gallery",
        cols: 2,
        items: [
          { src: "assets/img/journey/tomar/convento-cristo.jpg", en: { cap: "Convent of Christ" }, pt: { cap: "Convento de Cristo" } },
          { src: "assets/img/journey/tomar/castle.jpg",          en: { cap: "Templar Castle" },    pt: { cap: "Castelo Templário" } },
          { src: "assets/img/journey/tomar/photo-3.jpg",         en: { cap: "" },                  pt: { cap: "" } },
          { src: "assets/img/journey/tomar/photo-4.jpg",         en: { cap: "" },                  pt: { cap: "" } },
        ],
      },
    },

    /* ── Coimbra ── */
    {
      layout: "media-text",
      flag:   "PRT",
      chapter: { en: "Portugal", pt: "Portugal" },
      focus: {
        coordinates: [-8.4291, 40.2033],
        camDistance: 1.9,
        marker:      [-8.4291, 40.2033],
        markerLabel: { en: "Coimbra", pt: "Coimbra" },
        match:       "Portugal",
      },
      en: {
        title:    "Coimbra",
        subtitle: "City of Knowledge",
        body:     "The oldest university in Portugal, the Joanina Library, and the melancholy sound of Coimbra fado.",
      },
      pt: {
        title:    "Coimbra",
        subtitle: "Cidade do Conhecimento",
        body:     "A mais antiga universidade de Portugal, a Biblioteca Joanina e o som melancólico do fado de Coimbra.",
      },
      media: {
        type: "gallery",
        cols: 2,
        items: [
          { src: "assets/img/journey/coimbra/university.jpg",       en: { cap: "University of Coimbra" }, pt: { cap: "Universidade de Coimbra" } },
          { src: "assets/img/journey/coimbra/joanina-library.jpg",  en: { cap: "Joanina Library" },      pt: { cap: "Biblioteca Joanina" } },
          { src: "assets/img/journey/coimbra/photo-3.jpg",          en: { cap: "" },                     pt: { cap: "" } },
          { src: "assets/img/journey/coimbra/photo-4.jpg",          en: { cap: "" },                     pt: { cap: "" } },
        ],
      },
    },

    /* ── Nazaré ── */
    {
      layout: "media-text",
      flag:   "PRT",
      chapter: { en: "Portugal", pt: "Portugal" },
      focus: {
        coordinates: [-8.8957, 39.6009],
        camDistance: 1.9,
        marker:      [-8.8957, 39.6009],
        markerLabel: { en: "Nazaré", pt: "Nazaré" },
        match:       "Portugal",
      },
      en: {
        title:    "Nazaré",
        subtitle: "World's Biggest Waves",
        body:     "The legendary surf mecca where the world's biggest waves break — and where fishermen still dry their catch on the shore.",
      },
      pt: {
        title:    "Nazaré",
        subtitle: "As Maiores Ondas do Mundo",
        body:     "A lendária meca do surf onde quebram as maiores ondas do mundo — e onde os pescadores ainda secam o peixe na praia.",
      },
      media: {
        type: "gallery",
        cols: 2,
        items: [
          { src: "assets/img/journey/nazare/big-waves.jpg",  en: { cap: "Giant waves" },   pt: { cap: "Ondas gigantes" } },
          { src: "assets/img/journey/nazare/lighthouse.jpg", en: { cap: "Lighthouse" },    pt: { cap: "Farol" } },
          { src: "assets/img/journey/nazare/photo-3.jpg",    en: { cap: "" },              pt: { cap: "" } },
          { src: "assets/img/journey/nazare/photo-4.jpg",    en: { cap: "" },              pt: { cap: "" } },
        ],
      },
    },

    /* ── Valongo (Rock Climbing) ── */
    {
      layout: "media-text",
      flag:   "PRT",
      chapter: { en: "Portugal", pt: "Portugal" },
      focus: {
        coordinates: [-8.4980, 41.1800],
        camDistance: 1.9,
        marker:      [-8.4980, 41.1800],
        markerLabel: { en: "Valongo", pt: "Valongo" },
        match:       "Portugal",
      },
      en: {
        title:    "Valongo",
        subtitle: "Vertical Limits",
        body:     "Rock climbing on the granite faces of Valongo — pushing limits, finding balance, and trusting the rope.",
      },
      pt: {
        title:    "Valongo",
        subtitle: "Limites Verticais",
        body:     "Escalada nas faces de granito de Valongo — ultrapassar limites, encontrar equilíbrio e confiar na corda.",
      },
      media: {
        type: "gallery",
        cols: 2,
        items: [
          { src: "assets/img/journey/valongo/climbing-1.jpg", en: { cap: "" }, pt: { cap: "" } },
          { src: "assets/img/journey/valongo/climbing-2.jpg", en: { cap: "" }, pt: { cap: "" } },
          { src: "assets/img/journey/valongo/climbing-3.jpg", en: { cap: "" }, pt: { cap: "" } },
          { src: "assets/img/journey/valongo/climbing-4.jpg", en: { cap: "" }, pt: { cap: "" } },
        ],
      },
    },

    /* ── Lisbon ── */
    {
      layout: "media-text",
      flag:   "PRT",
      chapter: { en: "Portugal", pt: "Portugal" },
      focus: {
        coordinates: [-9.1393, 38.7223],
        camDistance: 1.8,
        marker:      [-9.1393, 38.7223],
        markerLabel: { en: "Lisbon", pt: "Lisboa" },
        match:       "Portugal",
      },
      en: {
        title:    "Lisbon",
        subtitle: "City of Seven Hills",
        body:     "Alfama, Belém, the 25 de Abril Bridge — Lisbon is poetry, light, and the sound of the tram on cobblestones.",
      },
      pt: {
        title:    "Lisboa",
        subtitle: "Cidade das Sete Colinas",
        body:     "Alfama, Belém, a Ponte 25 de Abril — Lisboa é poesia, luz e o som do eléctrico sobre as calçadas.",
      },
      media: {
        type: "gallery",
        cols: 2,
        items: [
          { src: "assets/img/journey/lisbon/alfama.jpg",           en: { cap: "Alfama" },                pt: { cap: "Alfama" } },
          { src: "assets/img/journey/lisbon/belem-tower.jpg",      en: { cap: "Tower of Belém" },        pt: { cap: "Torre de Belém" } },
          { src: "assets/img/journey/lisbon/25-abril-bridge.jpg",  en: { cap: "25 de Abril Bridge" },    pt: { cap: "Ponte 25 de Abril" } },
          { src: "assets/img/journey/lisbon/photo-4.jpg",          en: { cap: "" },                      pt: { cap: "" } },
        ],
      },
    },

    /* ──────────────────────────────────────────────────────────────────────────
     *  ACHIEVEMENTS — DISCIPLINE IN MOTION (RUNNING)
     * ────────────────────────────────────────────────────────────────────────── */
    {
      layout: "chapter",
      flag:   "PRT",
      chapter: { en: "Achievements", pt: "Conquistas" },
      focus: { overview: true },
      en: {
        title:    "Discipline in Motion",
        subtitle: "Running Achievements",
        body:     "Miles trained, finish lines crossed, medals earned. Every race is a lesson in pushing further.",
      },
      pt: {
        title:    "Disciplina em Movimento",
        subtitle: "Conquistas de Corrida",
        body:     "Quilómetros treinados, linhas de chegada cruzadas, medalhas conquistadas. Cada corrida é uma lição de superação.",
      },
    },

    /* ── Porto Marathon ── */
    {
      layout: "media-text",
      flag:   "PRT",
      chapter: { en: "Achievements · Running", pt: "Conquistas · Corrida" },
      focus: {
        coordinates: [-8.6291, 41.1496],
        camDistance: 1.9,
        marker:      [-8.6291, 41.1496],
        markerLabel: { en: "Porto Marathon", pt: "Maratona do Porto" },
        match:       "Portugal",
      },
      en: {
        title:    "Porto Marathon",
        subtitle: "42.195 km",
        body:     "The full marathon — 42.195 km through the streets of Porto. The hardest and most rewarding 4 hours of running.",
      },
      pt: {
        title:    "Maratona do Porto",
        subtitle: "42.195 km",
        body:     "A maratona completa — 42.195 km pelas ruas do Porto. As 4 horas de corrida mais difíceis e gratificantes.",
      },
      media: {
        type: "gallery",
        cols: 2,
        items: [
          { src: "assets/img/journey/running/porto-marathon-1.jpg", en: { cap: "Porto Marathon" }, pt: { cap: "Maratona do Porto" } },
          { src: "assets/img/journey/running/porto-marathon-2.jpg", en: { cap: "" },               pt: { cap: "" } },
          { src: "assets/img/journey/running/porto-marathon-3.jpg", en: { cap: "" },               pt: { cap: "" } },
        ],
      },
    },

    /* ── Porto Half Marathon ── */
    {
      layout: "media-text",
      flag:   "PRT",
      chapter: { en: "Achievements · Running", pt: "Conquistas · Corrida" },
      focus: {
        coordinates: [-8.6291, 41.1496],
        camDistance: 1.9,
        marker:      [-8.6291, 41.1496],
        markerLabel: { en: "Porto Half Marathon", pt: "Meia Maratona do Porto" },
        match:       "Portugal",
      },
      en: {
        title:    "Porto Half Marathon",
        subtitle: "21.1 km",
        body:     "The iconic half marathon along the Douro riverfront — a race that unites the city every year.",
      },
      pt: {
        title:    "Meia Maratona do Porto",
        subtitle: "21.1 km",
        body:     "A icónica meia maratona ao longo da margem do Douro — uma corrida que une a cidade todos os anos.",
      },
      media: {
        type: "gallery",
        cols: 2,
        items: [
          { src: "assets/img/journey/running/porto-half-1.jpg", en: { cap: "Half Marathon" }, pt: { cap: "Meia Maratona" } },
          { src: "assets/img/journey/running/porto-half-2.jpg", en: { cap: "" },              pt: { cap: "" } },
        ],
      },
    },

    /* ── Other Races ── */
    {
      layout: "media-text",
      flag:   "PRT",
      chapter: { en: "Achievements · Running", pt: "Conquistas · Corrida" },
      focus: { overview: true },
      en: {
        title:    "Other Races",
        subtitle: "Always on the Move",
        body:     "Trail runs, city races, and community events — every finish line counts, whatever the distance.",
      },
      pt: {
        title:    "Outras Corridas",
        subtitle: "Sempre em Movimento",
        body:     "Trail runs, provas de cidade e eventos comunitários — cada linha de chegada conta, seja qual for a distância.",
      },
      media: {
        type: "gallery",
        cols: 2,
        items: [
          { src: "assets/img/journey/running/other-race-1.jpg", en: { cap: "" }, pt: { cap: "" } },
          { src: "assets/img/journey/running/other-race-2.jpg", en: { cap: "" }, pt: { cap: "" } },
          { src: "assets/img/journey/running/other-race-3.jpg", en: { cap: "" }, pt: { cap: "" } },
          { src: "assets/img/journey/running/other-race-4.jpg", en: { cap: "" }, pt: { cap: "" } },
        ],
      },
    },

    /* ──────────────────────────────────────────────────────────────────────────
     *  AVIATION
     * ────────────────────────────────────────────────────────────────────────── */
    {
      layout: "media-text",
      flag:   "PRT",
      chapter: { en: "Achievements", pt: "Conquistas" },
      focus: { overview: true },
      en: {
        title:    "Aviation",
        subtitle: "Freedom Above the Clouds",
        body:     "Flying was never just a dream — it became a discipline. From aerobatic manoeuvres to low-level flybys.",
      },
      pt: {
        title:    "Aviação",
        subtitle: "Liberdade Acima das Nuvens",
        body:     "Voar nunca foi apenas um sonho — tornou-se uma disciplina. De manobras acrobáticas a passagens rasantes.",
      },
      media: {
        type: "gallery",
        cols: 3,
        items: [
          { src: "assets/img/journey/aviation/maneuvers-video.mp4",       en: { cap: "Manoeuvres" },      pt: { cap: "Manobras" },         video: true },
          { src: "assets/img/journey/aviation/flyover-video.mp4",         en: { cap: "Flyover" },          pt: { cap: "Sobrevoo" },          video: true },
          { src: "assets/img/journey/aviation/aerobatic-display-video.mp4",en: { cap: "Aerobatic display" },pt: { cap: "Exibição acrobática" },video: true },
          { src: "assets/img/journey/aviation/photo-1.jpg",               en: { cap: "" },                 pt: { cap: "" } },
          { src: "assets/img/journey/aviation/photo-2.jpg",               en: { cap: "" },                 pt: { cap: "" } },
          { src: "assets/img/journey/aviation/photo-3.jpg",               en: { cap: "" },                 pt: { cap: "" } },
        ],
      },
    },

    /* ──────────────────────────────────────────────────────────────────────────
     *  OTHER ACHIEVEMENTS
     * ────────────────────────────────────────────────────────────────────────── */
    {
      layout: "media-text",
      flag:   "PRT",
      chapter: { en: "Achievements", pt: "Conquistas" },
      focus: { overview: true },
      en: {
        title:    "Other Achievements",
        subtitle: "Golf · Archery · Kart · Paintball",
        body:     "Life is for trying everything — on the green, on the track, on the range, and in the field.",
      },
      pt: {
        title:    "Outras Conquistas",
        subtitle: "Golfe · Tiro com Arco · Kart · Paintball",
        body:     "A vida é para experimentar tudo — no green, na pista, no estande e no campo.",
      },
      media: {
        type: "gallery",
        cols: 3,
        items: [
          { src: "assets/img/journey/other/golf-video.mp4",     en: { cap: "Golf" },     pt: { cap: "Golfe" },      video: true },
          { src: "assets/img/journey/other/archery-video.mp4",  en: { cap: "Archery" },  pt: { cap: "Tiro com arco" },video: true },
          { src: "assets/img/journey/other/kart-video.mp4",     en: { cap: "Kart" },     pt: { cap: "Kart" },       video: true },
          { src: "assets/img/journey/other/paintball-video.mp4",en: { cap: "Paintball" },pt: { cap: "Paintball" },  video: true },
          { src: "assets/img/journey/other/photo-1.jpg",        en: { cap: "" },         pt: { cap: "" } },
          { src: "assets/img/journey/other/photo-2.jpg",        en: { cap: "" },         pt: { cap: "" } },
        ],
      },
    },

    /* ──────────────────────────────────────────────────────────────────────────
     *  CLOSING SLIDES — globe rotating for all three
     * ────────────────────────────────────────────────────────────────────────── */

    /* ── The Journey Continues ── */
    {
      layout: "closing",
      chapter: { en: "What's Next", pt: "O Que Vem A Seguir" },
      focus: { overview: true },
      en: {
        title:    "The Journey Continues",
        subtitle: "New destinations. New chapters.",
        body:     "Every map has unexplored territory. Every horizon hides the next adventure.",
      },
      pt: {
        title:    "A Jornada Continua",
        subtitle: "Novos destinos. Novos capítulos.",
        body:     "Cada mapa tem território por explorar. Cada horizonte esconde a próxima aventura.",
      },
    },

    /* ── See You At The Next Destination ── */
    {
      layout: "closing",
      chapter: { en: "Until Next Time", pt: "Até à Próxima" },
      focus: { overview: true },
      en: {
        title:    "See You at the Next Destination",
        subtitle: "The world is waiting.",
        body:     "Until then — keep moving, keep exploring, keep living.",
      },
      pt: {
        title:    "Até ao Próximo Destino",
        subtitle: "O mundo está à espera.",
        body:     "Até lá — continua a mover-te, a explorar, a viver.",
      },
    },

    /* ── Thank You ── */
    {
      layout: "closing",
      chapter: { en: "Thank You", pt: "Obrigado" },
      focus: { overview: true },
      en: {
        title:    "Thank You",
        subtitle: "For being part of this journey.",
        body:     "Every person I've met along the way has shaped this story. Thank you for sharing it with me.",
      },
      pt: {
        title:    "Obrigado",
        subtitle: "Por fazeres parte desta jornada.",
        body:     "Cada pessoa que encontrei no caminho moldou esta história. Obrigado por a partilhares comigo.",
      },
    },

  ], // end slides
}; // end JOURNEY_DATA
