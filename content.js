// content.js — i18n strings for Lorient demo.
// Two languages: fr (default) + en.
// All copy used by the prototype lives here so users can switch language live.

const CONTENT = {
  fr: {
    brand: "Lorient — Embarquement",
    captain: { name: "Capitaine Yann", title: "Votre guide à travers les siècles" },
    nav: { next: "Suivant", prev: "Précédent", embark: "Embarquer", restart: "Recommencer" },
    ui: { ambient: "Ambiance sonore", tweaks: "Réglages", askyann: "Parler au Capitaine",
          read: "Lire le récit", view360: "Vue à 360°", close: "Fermer", drop: "Glissez une image ici" },

    intro: {
      eyebrow: "Démo immersive — Office de Tourisme",
      titleA: "L",
      titleB: "Orient",
      sub: "Une rade. Trois siècles. Mille histoires.",
      tagline: "Embarquez pour un voyage au cœur de la ville qui a regardé l'Orient — et reconstruit son visage trois fois.",
      cta: "Embarquer",
      hint: "Faites défiler pour commencer",
      meta1: "Bretagne Sud",
      meta2: "47°44'N · 3°22'O",
    },

    fondation: {
      year: "1666",
      eyebrow: "Chapitre I · La fondation",
      title: "Le rêve d'épices d'un Roi Soleil",
      lead: "Quand Louis XIV signe l'édit de création de la Compagnie des Indes Orientales, il faut un port. Pas n'importe lequel : un port tourné vers l'Orient. À l'embouchure du Blavet, dans une lande quasi déserte, naîtra L'Orient.",
      mapTitle: "Rade du Blavet · 1666",
      mapSubtitle: "Cliquez sur les points pour explorer",
      emptyHint: "Choisissez un point sur la carte pour découvrir le récit",
      tally: "exploré",
      pois: [
        {
          label: "Enclos du Faouëdic",
          coord: { x: 44, y: 38 }, latlng: [47.742, -3.368],
          date: "27 août 1666",
          title: "La première palissade",
          slot: { id: "fond-faouedic", hint: "Archive · plan de l'enclos, gravure XVIIe" },
          body: "Sur ces marais vides, Denis Langlois trace au cordeau l'enclos qui abritera les magasins de la Compagnie. Ni église, ni mairie : d'abord, des entrepôts. La ville sera bâtie autour de la marchandise.",
          quote: "« On y bâtira un nouvel Orient, qui sera la rivale d'Amsterdam. »",
          cite: "— Jean-Baptiste Colbert, Mémoire au Roi, 1664",
        },
        {
          label: "Chantiers du Scorff",
          coord: { x: 37, y: 13 }, latlng: [47.763, -3.378],
          date: "1668",
          title: "Le berceau des trois-mâts",
          slot: { id: "fond-scorff", hint: "Archive · plan de chantier naval ou gravure d'époque" },
          body: "Sur la rive opposée, les charpentiers de marine établissent les premières cales. C'est ici que naîtront les navires qui porteront le pavillon blanc jusqu'à Pondichéry et Canton.",
          quote: "« Du chêne breton aux mers de Chine, il faut deux ans, mille hommes et la patience d'un roi. »",
          cite: "— Journal du maître charpentier Le Bihan",
        },
        {
          label: "Soleil d'Orient",
          coord: { x: 63, y: 27 }, latlng: [47.750, -3.342],
          date: "1670",
          title: "Le navire baptismal",
          slot: { id: "fond-soleil", hint: "Archive · gravure du Soleil d'Orient" },
          body: "Premier vaisseau lancé depuis L'Orient. Mille tonneaux, soixante canons, équipage de trois cents âmes. Il donnera son nom à la ville naissante : on dira bientôt « le port du Soleil d'Orient », puis simplement Lorient.",
          quote: "« Le navire fit son lit dans l'eau comme un cygne las. »",
          cite: "— Chronique de Port-Louis, 1670",
        },
        {
          label: "Citadelle de Port-Louis",
          coord: { x: 45, y: 83 }, latlng: [47.71004, -3.36596],
          date: "1591 — gardée par les Indes",
          title: "La sentinelle d'en face",
          slot: { id: "fond-portlouis", hint: "Archive · plan de la citadelle ou photo aérienne" },
          body: "Forteresse antérieure à la ville, elle garde l'entrée de la rade. La Compagnie y entreposera ses cargaisons les plus précieuses. Elle abrite aujourd'hui le Musée national de la Marine.",
          quote: "« Sans Port-Louis, Lorient n'eût été qu'une promesse. »",
          cite: "— Vauban, lettre à Colbert, 1683",
        },
        {
          label: "Comptoir de la Compagnie",
          coord: { x: 53, y: 30 }, latlng: [47.748, -3.356],
          date: "1675",
          title: "Le quai des merveilles",
          slot: { id: "fond-comptoir", hint: "Archive · vue du quai des Indes" },
          body: "Sur ces quais s'entassent porcelaines de Jingdezhen, soieries du Bengale, poivre de Malabar, café de Moka. Les enchères du printemps attirent toute l'Europe marchande.",
          quote: "« Une journée à Lorient vaut un mois de voyage. »",
          cite: "— Marchand hollandais, 1721",
        },
      ],
    },

    ageor: {
      year: "1720 — 1789",
      eyebrow: "Chapitre II · L'âge d'or",
      title: "Soixante-dix années à parfumer le monde",
      lead: "Au XVIIIe siècle, Lorient devient le seul port français autorisé à commercer avec l'Asie. La Bretagne s'enrichit de thé, de tissus et d'idées venues d'ailleurs.",
      sliderLabel: "Glissez pour faire avancer le siècle",
      stats: [
        { name: "Population", unit: "habitants" },
        { name: "Navires partis", unit: "/ an" },
        { name: "Thé importé", unit: "tonnes" },
        { name: "Porcelaine", unit: "pièces / an" },
      ],
      branches: [
        {
          step: "Branche A",
          title: "Suivre Anne, marchande de soieries",
          body: "Vous traversez les magasins, du Bengale au quai. Les rouleaux pèsent ce que pèse une année de récolte.",
          reveal: "Anne achète douze rouleaux pour la cour de Versailles. La vente lui rapporte ce qu'un paysan gagne en quarante ans.",
          popup: {
            kicker: "Récit · Branche A",
            title: "Anne Le Bouhellec, négociante en soieries",
            slotId: "branche-anne",
            slotHint: "Image d'archive · marchande de soieries XVIIIe",
            paragraphs: [
              "Anne Le Bouhellec est l'une des rares femmes à tenir comptoir au quai des Indes. Veuve d'un capitaine mort au large de Madagascar, elle reprend la maison Le Bouhellec en 1738 et fait fortune sur la soie chinée du Bengale.",
              "Ses pièces préférées : les damas peints à la main, vingt-quatre pas de long, qui voyageront jusqu'à la chambre de Madame de Pompadour. Une seule commande peut faire vivre dix familles pendant un an.",
              "À sa mort en 1771, elle laisse à sa fille un atelier, deux navires en commandite et une bibliothèque de douze cents livres. Son nom revient encore aujourd'hui dans les archives municipales."
            ]
          }
        },
        {
          step: "Branche B",
          title: "Embarquer sur le Duc de Choiseul",
          body: "Trois-mâts de 1200 tonneaux. Direction Pondichéry, neuf mois en mer, un homme sur cinq ne reviendra pas.",
          reveal: "Vous revenez avec du salpêtre, du poivre et la moitié de l'équipage. Le bénéfice : 400 % en argent du Roi.",
          popup: {
            kicker: "Récit · Branche B",
            title: "Le voyage du Duc de Choiseul, 1762",
            slotId: "branche-choiseul",
            slotHint: "Image d'archive · trois-mâts ou plan de navire",
            paragraphs: [
              "Départ de Lorient le 14 mars 1762, deux cent quatre-vingts hommes à bord, trente-six canons. Cap au sud-ouest pour contourner les corsaires anglais, puis route directe sur le Cap.",
              "L'eau croupit dès la troisième semaine. À l'île de France, on enterre dix-sept marins. À Pondichéry, la cargaison de salpêtre et de mousseline charge en six jours — la Compagnie est pressée, la guerre menace.",
              "Retour au quai du Faouëdic le 8 août 1763, après dix-sept mois en mer. Sur les deux cent quatre-vingts hommes du départ, cent quarante-trois remontent à terre. Le bénéfice net : quatre cent mille livres tournois."
            ]
          }
        },
      ],
    },

    guerre: {
      year: "1941 — 1944",
      eyebrow: "Chapitre III · L'occupation",
      title: "Le béton, le silence, la peur",
      lead: "Le 21 juin 1940, la Wehrmacht entre à Lorient. La rade qui regardait l'Orient deviendra, pour quatre ans, la base sous-marine la plus redoutée de l'Atlantique.",
      bunkerTitle: "Base de Keroman",
      bunkerSubtitle: "Bougez la souris pour observer",
      stats: [
        { num: "1 000 000 m³", desc: "de béton coulé en 18 mois pour bâtir Keroman I, II et III.", src: "Org. Todt, archives 1941-43" },
        { num: "U-boote de la 2e flotte", desc: "27 sous-marins basés à Lorient, dont les meutes d'Atlantique Nord.", src: "Kriegsmarine, registres" },
        { num: "5 m d'épaisseur", desc: "Le toit de béton de Keroman III, jamais percé par les bombes.", src: "Étude après-guerre, 1947" },
      ],
      pois: [
        { x: 22, y: 60, label: "Keroman I" },
        { x: 44, y: 56, label: "Keroman II" },
        { x: 70, y: 58, label: "Keroman III" },
        { x: 58, y: 26, label: "Dôme de Pen Mané" },
      ],
    },

    bombing: {
      year: "Janvier — février 1943",
      eyebrow: "Chapitre IV · Les bombardements",
      title: "Détruire la ville, épargner le bunker",
      lead: "Faute de pouvoir percer cinq mètres de béton, les Alliés visent la ville. En quatre semaines, soixante-quinze tonnes de bombes incendiaires tombent sur Lorient. Les bunkers tiennent. La ville, elle, n'existe plus.",
      before: { stamp: "Avant", date: "Janvier 1943" },
      after: { stamp: "Après", date: "14 février 1943" },
      figure: "85 %",
      figureLbl: "de la ville détruite",
      quote: "« Nous étions partis pour la nuit dans les caves du Faouëdic. Au matin, il n'y avait plus de rues pour rentrer chez nous. »",
      cite: "— Témoignage anonyme, Centre de la mémoire de Lorient",
    },

    recon: {
      year: "1948 — 1960",
      eyebrow: "Chapitre V · La reconstruction",
      title: "Bâtir vite, bâtir clair",
      lead: "Confiée à l'architecte Georges Tourry, la reconstruction privilégie la lumière, les façades blanches et les rues larges. Lorient renaît, mais elle ne ressemble plus à ce qu'elle était.",
      scrubLabel: "Glissez pour reconstruire",
      events: [
        { year: "1948", txt: "Tourry présente son plan d'urbanisme : axes droits, gabarits uniformes, ouverture sur le port." },
        { year: "1952", txt: "L'hôtel de ville sort de terre, premier édifice public reconstruit." },
        { year: "1955", txt: "Reprise des liaisons régulières avec Groix. Le port de pêche redevient le premier de France." },
        { year: "1960", txt: "La ville compte à nouveau 50 000 habitants. Le mot d'ordre : « ville de la mer ». " },
      ],
    },

    keroman: {
      year: "2003 +",
      eyebrow: "Chapitre VI · La renaissance de Keroman",
      title: "Du bunker à la voile",
      lead: "Les voûtes qui abritaient les U-boote abritent aujourd'hui les trimarans du Vendée Globe. Sous le béton, la Cité de la Voile Éric Tabarly raconte la course au large. Plus grand pôle nautique d'Europe, Lorient La Base est devenue le port d'attache des navigateurs solitaires.",
      slots: [
        { id: "keroman-cite-voile", hint: "Photo · Cité de la Voile Éric Tabarly", caption: "La Cité de la Voile" },
        { id: "keroman-trimaran", hint: "Photo · trimaran de course (Banque Pop, Macif…)", caption: "Lorient La Base" },
        { id: "keroman-bunker-inside", hint: "Photo · intérieur des alvéoles", caption: "Sous les alvéoles" },
      ],
      stats: [
        { num: "26 ha", desc: "de site reconverti depuis 2003" },
        { num: "200+", desc: "skippers en préparation à l'année" },
        { num: "8", desc: "trimarans Ultim et Imoca à quai" },
      ],
      quote: "« La mer ne te rend rien. Elle te rend toi-même, en plus grand. »",
      cite: "— Éric Tabarly",
    },

    today: {
      year: "Aujourd'hui",
      eyebrow: "Chapitre VII · La rade vivante",
      title: "Sept escales pour comprendre la Bretagne Sud",
      lead: "Cliquez sur la carte pour explorer la rade, ses îles et ses échappées. Chaque point raconte une autre couleur de Lorient.",
      pois: [
        {
          x: 14, y: 70, kind: "Île · 14 km au large",
          name: "Île de Groix",
          body: "Quarante-cinq minutes de bateau et l'on change de monde. Plage convexe de sable blanc à Locmaria, falaises de schiste, anciens thoniers reconvertis. Un caillou de 15 km² qui se traverse à vélo en une journée.",
          facts: [{ k: "Surface", v: "15 km²" }, { k: "Habitants", v: "2 270" }],
          placeholder: "Photo · plage des Grands Sables",
          panorama: "Vue 360° depuis la plage des Grands Sables, île de Groix",
          slotId: "today-groix",
        },
        {
          x: 64, y: 38, kind: "Estuaire sauvage",
          name: "Ria d'Étel",
          body: "Bras de mer en dentelle, sans phare ni jetée, où les huîtres affinent leur goût d'algue. Le banc de Magouër bouge à chaque marée — il faut le pilote d'Étel pour passer.",
          facts: [{ k: "Long.", v: "22 km" }, { k: "Affluents", v: "16" }],
          placeholder: "Photo · barre d'Étel au lever",
          panorama: "Vue 360° depuis la barre d'Étel",
          slotId: "today-etel",
        },
        {
          x: 78, y: 64, kind: "Forteresse · musée",
          name: "Port-Louis & la Citadelle",
          body: "Construite par les Espagnols en 1591, embrassée par Vauban, gardée par la Compagnie. Aujourd'hui, deux musées sous les remparts : Marine nationale et Compagnie des Indes — la mémoire vive du commerce avec l'Asie.",
          facts: [{ k: "Bâtie", v: "1591" }, { k: "Musées", v: "2" }],
          placeholder: "Photo · vue aérienne de la citadelle",
          panorama: "Vue 360° depuis les remparts de la Citadelle",
          slotId: "today-portlouis",
        },
        {
          x: 22, y: 24, kind: "Côte sauvage",
          name: "De Guidel à Plouharnel",
          body: "Trente kilomètres de plage de sable fin balayée par l'Atlantique. Spots de surf, dunes blanches, marais salants vers la baie de Quiberon. Un littoral préservé que la Bretagne garde sans le crier.",
          facts: [{ k: "Plages", v: "12" }, { k: "Sentier", v: "GR 34" }],
          placeholder: "Photo · grande plage de Gâvres",
          panorama: "Vue 360° depuis la grande plage de Gâvres",
          slotId: "today-cote",
        },
        {
          x: 50, y: 78, kind: "Patrimoine · XXe",
          name: "Base sous-marine de Keroman",
          body: "Hier symbole d'occupation, aujourd'hui pôle culturel. Sous les voûtes de béton : la Cité de la Voile Éric Tabarly, des galeries, des concerts, et les marinas où s'entraînent les navigateurs du Vendée Globe.",
          facts: [{ k: "Reconvertie", v: "2003" }, { k: "Surface", v: "26 ha" }],
          placeholder: "Photo · halle des sous-marins",
          panorama: "Vue 360° à l'intérieur de la halle Keroman III",
          slotId: "today-keroman",
        },
        {
          x: 42, y: 30, kind: "Voile · sport",
          name: "Lorient La Base",
          body: "Plus grand pôle de course au large d'Europe. Banque Populaire, Macif, Maxi Edmond de Rothschild s'y préparent. Visites de pontons, ateliers pour les enfants, marina ouverte au public.",
          facts: [{ k: "Skippers", v: "200+" }, { k: "Trimarans", v: "8" }],
          placeholder: "Photo · pontons de course au large",
          panorama: "Vue 360° depuis les pontons de Lorient La Base",
          slotId: "today-labase",
        },
      ],
    },

    festival: {
      year: "Août",
      eyebrow: "Chapitre VIII · Festival Interceltique",
      title: "Dix jours, sept nations celtes, une rade",
      lead: "Depuis 1971, le Festival Interceltique de Lorient réunit chaque mois d'août les sept nations celtes : Irlande, Écosse, Pays de Galles, Cornouailles, Île de Man, Galice, Bretagne. Cornemuses, bagads, fest-noz à ciel ouvert, grande parade de 3 500 musiciens. C'est la plus grande fête musicale de Bretagne.",
      slots: [
        { id: "festival-parade", hint: "Photo · grande parade dans les rues", caption: "La Grande Parade" },
        { id: "festival-stage", hint: "Photo · scène principale de nuit", caption: "Stade du Moustoir" },
        { id: "festival-fest-noz", hint: "Photo · fest-noz dans le port", caption: "Fest-noz sur les quais" },
      ],
      stats: [
        { num: "800 000", desc: "visiteurs sur dix jours" },
        { num: "4 500", desc: "artistes invités" },
        { num: "7", desc: "nations celtes représentées" },
        { num: "1971", desc: "première édition" },
      ],
      vibe: "Pavillon irlandais, bagad de Lann-Bihoué, gaita galicienne, harpe galloise, danse écossaise. Les pubs ouvrent jusqu'à l'aube et la rade ne dort pas.",
    },

    flavors: {
      eyebrow: "Chapitre IX · Saveurs & adresses",
      title: "Une marmite, deux maisons",
      lead: "Avant de repartir, on s'attable. La cotriade — bouillon de pommes de terre, oignons, lard et poissons du port — est aux marins lorientais ce que la bouillabaisse est aux Marseillais : une équation simple, défendue depuis trois siècles.",
      dishName: "Cotriade",
      dishOrigin: "Bretagne Sud · XVIIIe siècle",
      dishSlot: { id: "flavors-cotriade", hint: "Photo de cotriade (déposez ici une vraie image)" },
      ingredients: ["Maquereau", "Congre", "Lieu jaune", "Pommes de terre", "Oignons", "Lard fumé", "Beurre demi-sel", "Thym sauvage"],
      addresses: [
        {
          tag: "Restaurant",
          name: "Le Quai des Indes",
          sub: "Cotriade et inspirations d'épices",
          stars: "★★",
          slot: { id: "addr-restaurant", hint: "Photo · salle ou plat du restaurant" },
          desc: "Sur un quai d'anciens entrepôts de la Compagnie, le chef Marin Le Goff revisite la cotriade en y glissant cardamome de Pondichéry et poivre long de Malabar. Cuisine ouverte, ardoise qui change avec la marée. Réservation conseillée.",
          row1: "12 quai des Indes",
          row2: "Tous les soirs · 19h – 23h",
        },
        {
          tag: "Hôtel · 4★",
          name: "Hôtel de la Compagnie",
          sub: "Anciens magasins du Faouëdic, 1740",
          stars: "★★★★",
          slot: { id: "addr-hotel", hint: "Photo · façade ou chambre" },
          desc: "Vingt-quatre chambres dans les volumes d'origine des entrepôts : poutres apparentes, pierres taillées, vues sur la rade. Bibliothèque ouverte, bain nordique sur les toits, vélos prêtés gratuitement. Petit-déjeuner servi face au port.",
          row1: "4 enclos du Faouëdic",
          row2: "À partir de 180 € · 24 chambres",
        },
      ],
    },

    outro: {
      bigA: "Et maintenant,",
      bigB: "à votre tour.",
      lead: "Préparez votre escale à Lorient : trois jours suffisent pour boucler la rade, sept pour rejoindre Groix, Étel et la presqu'île. L'Office de Tourisme vous accompagne, et le Capitaine Yann reste à bord.",
      cta1: "Préparer ma visite",
      cta2: "Reprendre depuis le début",
      signature: "Un récit signé Lorient Bretagne Sud Tourisme.",
    },

    sceneLabels: [
      "Embarquement", "Fondation 1666", "Âge d'or", "Occupation", "Bombardements", "Reconstruction", "Renaissance", "Aujourd'hui", "Festival", "Saveurs", "Escale",
    ],

    yannGreeting: "Bonjour. Je suis le Capitaine Yann Le Goff, négociant pour la Compagnie des Indes — du moins le fus-je en 1742. Désormais, je vous accompagne d'un siècle à l'autre. Que voulez-vous savoir ?",
    yannSuggestions: [
      "Qui était Colbert ?",
      "Pourquoi a-t-on bombardé Lorient ?",
      "Que voir en deux jours ?",
      "Comment se rendre à Groix ?",
    ],

    sceneIntros: {
      0: "Bienvenue à bord. Quand vous serez prêt, faites défiler — la rade nous attend.",
      1: "Nous voici en 1666. Le Roi vient de signer. Touchez les points lumineux, je vous raconte.",
      2: "Glissez le siècle d'un côté à l'autre, vous verrez la ville pousser comme un champ de blé.",
      3: "Le ton change. Nous entrons dans le silence du béton. Soyez attentif.",
      4: "Quatre semaines, soixante-quinze tonnes de bombes. Vous voyez ce qui reste.",
      5: "Glissez le curseur. Tourry trace, la pierre suit.",
      6: "Hier les U-boote, aujourd'hui les trimarans. Bienvenue à Lorient La Base.",
      7: "La rade aujourd'hui. Cliquez où vous voulez, je vous y emmène.",
      8: "Tous les mois d'août, sept nations celtes s'invitent. Le vent porte les cornemuses jusqu'à Groix.",
      9: "Asseyez-vous. La cotriade est prête.",
      10: "Voilà. Vous avez la rade dans les yeux. Préparez votre venue.",
    },
  },

  en: {
    brand: "Lorient — Embarkation",
    captain: { name: "Captain Yann", title: "Your guide across centuries" },
    nav: { next: "Next", prev: "Back", embark: "Set sail", restart: "Restart" },
    ui: { ambient: "Ambient sound", tweaks: "Tweaks", askyann: "Talk to the Captain",
          read: "Read the story", view360: "360° view", close: "Close", drop: "Drop an image here" },

    intro: {
      eyebrow: "Immersive demo — Tourism Office",
      titleA: "L",
      titleB: "Orient",
      sub: "One harbour. Three centuries. A thousand stories.",
      tagline: "Step aboard for a journey through the city that looked east — and rebuilt its face three times over.",
      cta: "Set sail",
      hint: "Scroll to begin",
      meta1: "South Brittany, France",
      meta2: "47°44'N · 3°22'W",
    },

    fondation: {
      year: "1666",
      eyebrow: "Chapter I · Foundation",
      title: "A Sun King's dream of spice",
      lead: "When Louis XIV signed the charter creating the French East India Company, France needed a port — one that looked east. On a near-empty shore at the mouth of the Blavet, a city was born: L'Orient.",
      mapTitle: "Blavet Estuary · 1666",
      mapSubtitle: "Click points to explore",
      emptyHint: "Pick a point on the map to begin the story",
      tally: "explored",
      pois: [
        { label: "Faouëdic enclosure", coord: { x: 44, y: 38 }, latlng: [47.742, -3.368], date: "27 August 1666", title: "The first palisade",
          slot: { id: "fond-faouedic", hint: "Archive · enclosure plan, 17th c. engraving" },
          body: "On these empty marshes, Denis Langlois marks out the enclosure that will hold the Company's warehouses. No church, no town hall: first, the goods. The town will be built around the cargo.",
          quote: "« We shall build here a new Orient, a rival to Amsterdam. »", cite: "— Jean-Baptiste Colbert, Memo to the King, 1664" },
        { label: "Scorff shipyards", coord: { x: 37, y: 13 }, latlng: [47.763, -3.378], date: "1668", title: "Cradle of the three-masters",
          slot: { id: "fond-scorff", hint: "Archive · shipyard plan or period engraving" },
          body: "On the opposite shore, ship carpenters lay the first slipways. Here are born the vessels that will fly the white flag to Pondicherry and Canton.",
          quote: "« From Breton oak to the China seas: two years, a thousand men, a king's patience. »", cite: "— Journal of master carpenter Le Bihan" },
        { label: "Soleil d'Orient", coord: { x: 63, y: 27 }, latlng: [47.750, -3.342], date: "1670", title: "The naming ship",
          slot: { id: "fond-soleil", hint: "Archive · engraving of the Soleil d'Orient" },
          body: "The first vessel launched from L'Orient. A thousand tons, sixty cannon, three hundred souls. She will lend her name to the rising town: « port of the Soleil d'Orient », soon shortened to Lorient.",
          quote: "« The ship made her bed in the water like a tired swan. »", cite: "— Port-Louis Chronicle, 1670" },
        { label: "Port-Louis Citadel", coord: { x: 45, y: 83 }, latlng: [47.71004, -3.36596], date: "1591 — kept by the Indies",
          title: "The sentinel across the water",
          slot: { id: "fond-portlouis", hint: "Archive · citadel plan or aerial photo" },
          body: "Built before the town, it guards the harbour mouth. The Company will store its most precious cargoes here. It now houses the National Maritime Museum.",
          quote: "« Without Port-Louis, Lorient would have been but a promise. »", cite: "— Vauban, letter to Colbert, 1683" },
        { label: "Company counter", coord: { x: 53, y: 30 }, latlng: [47.748, -3.356], date: "1675",
          title: "The quay of wonders",
          slot: { id: "fond-comptoir", hint: "Archive · view of quai des Indes" },
          body: "On these quays pile up porcelain from Jingdezhen, silks from Bengal, pepper from Malabar, coffee from Mocha. The spring auctions draw all of mercantile Europe.",
          quote: "« A day in Lorient is worth a month's voyage. »", cite: "— Dutch merchant, 1721" },
      ],
    },

    ageor: {
      year: "1720 — 1789", eyebrow: "Chapter II · Golden Age",
      title: "Seventy years scenting the world",
      lead: "In the 18th century, Lorient becomes France's sole port permitted to trade with Asia. Brittany grows rich on tea, fabrics and ideas from elsewhere.",
      sliderLabel: "Drag to move through the century",
      stats: [
        { name: "Population", unit: "inhabitants" },
        { name: "Ships departed", unit: "/ year" },
        { name: "Tea imported", unit: "tonnes" },
        { name: "Porcelain", unit: "pieces / year" },
      ],
      branches: [
        { step: "Branch A", title: "Follow Anne, silk merchant",
          body: "You cross the warehouses, from Bengal to the quay. Each roll weighs a year's harvest.",
          reveal: "Anne buys twelve rolls for the court at Versailles. The sale earns her what a peasant makes in forty years.",
          popup: {
            kicker: "Story · Branch A", title: "Anne Le Bouhellec, silk trader",
            slotId: "branche-anne", slotHint: "Archive image · silk merchant 18th c.",
            paragraphs: [
              "Anne Le Bouhellec was one of the few women to hold a counter on the quai des Indes. Widow of a captain lost off Madagascar, she took over the Le Bouhellec house in 1738 and made her fortune on figured Bengal silk.",
              "Her favourite pieces: hand-painted damask, twenty-four paces long, that would travel as far as Madame de Pompadour's chamber. A single order could feed ten families for a year.",
              "At her death in 1771, she left her daughter a workshop, two partnerships in ships, and a library of twelve hundred books. Her name still shows up in the municipal archives."
            ]
          }
        },
        { step: "Branch B", title: "Board the Duc de Choiseul",
          body: "1200-ton three-master. Course set for Pondicherry: nine months at sea, one in five men will not return.",
          reveal: "You return with saltpetre, pepper, and half your crew. The profit: 400% in royal silver.",
          popup: {
            kicker: "Story · Branch B", title: "The Duc de Choiseul voyage, 1762",
            slotId: "branche-choiseul", slotHint: "Archive image · three-master or ship plan",
            paragraphs: [
              "Departure from Lorient on 14 March 1762, two hundred and eighty men on board, thirty-six cannon. South-west to avoid English privateers, then direct to the Cape.",
              "Water spoiled by week three. At Île de France, seventeen sailors were buried. At Pondicherry, saltpetre and muslin loaded in six days — the Company was in a hurry, war was looming.",
              "Return to the Faouëdic quay on 8 August 1763, after seventeen months at sea. Of the two hundred and eighty men who departed, one hundred and forty-three came back to land. Net profit: four hundred thousand livres."
            ]
          }
        },
      ],
    },

    guerre: {
      year: "1941 — 1944", eyebrow: "Chapter III · Occupation",
      title: "Concrete, silence, fear",
      lead: "On 21 June 1940, the Wehrmacht enters Lorient. The harbour that looked east becomes, for four years, the most feared submarine base on the Atlantic.",
      bunkerTitle: "Keroman base", bunkerSubtitle: "Move the mouse to look around",
      stats: [
        { num: "1,000,000 m³", desc: "of concrete poured in 18 months to build Keroman I, II and III.", src: "Org. Todt archives, 1941-43" },
        { num: "2nd U-boat flotilla", desc: "27 submarines based at Lorient, the North Atlantic wolfpacks.", src: "Kriegsmarine registers" },
        { num: "5 m thick", desc: "The concrete roof of Keroman III — never pierced by bombing.", src: "Post-war survey, 1947" },
      ],
      pois: [
        { x: 22, y: 60, label: "Keroman I" }, { x: 44, y: 56, label: "Keroman II" },
        { x: 70, y: 58, label: "Keroman III" }, { x: 58, y: 26, label: "Pen Mané dome" },
      ],
    },

    bombing: {
      year: "January — February 1943", eyebrow: "Chapter IV · Bombardment",
      title: "Destroy the town, spare the bunker",
      lead: "Unable to pierce five metres of concrete, the Allies target the city. In four weeks, seventy-five tons of incendiaries fall on Lorient. The bunkers hold. The city no longer exists.",
      before: { stamp: "Before", date: "January 1943" },
      after:  { stamp: "After",  date: "14 February 1943" },
      figure: "85%", figureLbl: "of the city destroyed",
      quote: "« We had gone down to the Faouëdic cellars for the night. By morning, there were no more streets to walk home through. »",
      cite: "— Anonymous testimony, Lorient Memory Centre",
    },

    recon: {
      year: "1948 — 1960", eyebrow: "Chapter V · Reconstruction",
      title: "Build fast, build bright",
      lead: "Entrusted to architect Georges Tourry, the reconstruction favours light, white façades and wide streets. Lorient is reborn — though no longer in its old shape.",
      scrubLabel: "Slide to rebuild",
      events: [
        { year: "1948", txt: "Tourry unveils his urban plan: straight axes, uniform heights, openings to the port." },
        { year: "1952", txt: "The new city hall rises — the first public building rebuilt." },
        { year: "1955", txt: "Regular boat links to Groix resume. The fishing port becomes France's largest." },
        { year: "1960", txt: "Population back to 50,000. The watchword: « city of the sea ». " },
      ],
    },

    keroman: {
      year: "2003 +", eyebrow: "Chapter VI · Keroman Reborn",
      title: "From bunker to sail",
      lead: "The vaults that sheltered the U-boats now shelter Vendée Globe trimarans. Under the concrete, the Cité de la Voile Éric Tabarly tells the story of offshore racing. Europe's largest sailing hub, Lorient La Base has become the home port of solo navigators.",
      slots: [
        { id: "keroman-cite-voile", hint: "Photo · Cité de la Voile Éric Tabarly", caption: "Cité de la Voile" },
        { id: "keroman-trimaran", hint: "Photo · offshore trimaran", caption: "Lorient La Base" },
        { id: "keroman-bunker-inside", hint: "Photo · inside the vaults", caption: "Inside the vaults" },
      ],
      stats: [
        { num: "26 ha", desc: "reconverted since 2003" },
        { num: "200+", desc: "skippers training year-round" },
        { num: "8", desc: "Ultim and Imoca trimarans docked" },
      ],
      quote: "« The sea gives nothing back. It gives you back yourself, only bigger. »",
      cite: "— Éric Tabarly",
    },

    today: {
      year: "Today", eyebrow: "Chapter VII · The living harbour",
      title: "Seven stops to understand southern Brittany",
      lead: "Click the map to explore the harbour, its islands and its escapes. Each point tells a different colour of Lorient.",
      pois: [
        { x: 14, y: 70, kind: "Island · 14 km offshore", name: "Île de Groix",
          body: "Forty-five minutes by boat, another world. Convex white-sand beach at Locmaria, schist cliffs, retired tuna boats. A 15 km² stone you can cross by bike in a day.",
          facts: [{k:"Area", v:"15 km²"},{k:"Locals", v:"2,270"}], placeholder: "Photo · Grands Sables beach",
          panorama: "360° view from Grands Sables beach, Groix", slotId: "today-groix" },
        { x: 64, y: 38, kind: "Wild estuary", name: "Ria d'Étel",
          body: "A lace-edged sea arm, no lighthouse, no jetty, where oysters refine their iodine taste. The Magouër sandbank shifts every tide — only the Étel pilot can take you in.",
          facts: [{k:"Length", v:"22 km"},{k:"Streams", v:"16"}], placeholder: "Photo · Étel bar at sunrise",
          panorama: "360° view from the Étel bar", slotId: "today-etel" },
        { x: 78, y: 64, kind: "Fort · museum", name: "Port-Louis & the Citadel",
          body: "Built by the Spanish in 1591, embraced by Vauban, kept by the East India Company. Today, two museums under the ramparts: French Navy, and East India — the living memory of trade with Asia.",
          facts: [{k:"Built", v:"1591"},{k:"Museums", v:"2"}], placeholder: "Photo · aerial citadel",
          panorama: "360° view from the citadel ramparts", slotId: "today-portlouis" },
        { x: 22, y: 24, kind: "Wild coast", name: "From Guidel to Plouharnel",
          body: "Thirty kilometres of fine sand swept by the Atlantic. Surf spots, white dunes, salt marshes toward Quiberon bay. A preserved coast that Brittany keeps quietly.",
          facts: [{k:"Beaches", v:"12"},{k:"Path", v:"GR 34"}], placeholder: "Photo · Gâvres beach",
          panorama: "360° view from Gâvres beach", slotId: "today-cote" },
        { x: 50, y: 78, kind: "Heritage · 20th c.", name: "Keroman submarine base",
          body: "Yesterday a symbol of occupation, today a cultural hub. Under the concrete vaults: the Cité de la Voile Éric Tabarly, galleries, concerts, and the marinas where Vendée Globe skippers train.",
          facts: [{k:"Reconverted", v:"2003"},{k:"Area", v:"26 ha"}], placeholder: "Photo · submarine hall",
          panorama: "360° view inside Keroman III hall", slotId: "today-keroman" },
        { x: 42, y: 30, kind: "Sailing · sport", name: "Lorient La Base",
          body: "Europe's biggest offshore racing hub. Banque Populaire, Macif, Maxi Edmond de Rothschild train here. Pontoon visits, kids' workshops, marina open to the public.",
          facts: [{k:"Skippers", v:"200+"},{k:"Trimarans", v:"8"}], placeholder: "Photo · racing pontoons",
          panorama: "360° view from Lorient La Base pontoons", slotId: "today-labase" },
      ],
    },

    festival: {
      year: "August", eyebrow: "Chapter VIII · Interceltic Festival",
      title: "Ten days, seven Celtic nations, one harbour",
      lead: "Since 1971, Lorient's Interceltic Festival has gathered every August the seven Celtic nations: Ireland, Scotland, Wales, Cornwall, Isle of Man, Galicia, Brittany. Bagpipes, bagads, open-air fest-noz, a grand parade of 3,500 musicians. The largest music festival in Brittany.",
      slots: [
        { id: "festival-parade", hint: "Photo · grand parade in the streets", caption: "The Grand Parade" },
        { id: "festival-stage", hint: "Photo · main stage at night", caption: "Stade du Moustoir" },
        { id: "festival-fest-noz", hint: "Photo · fest-noz on the quays", caption: "Fest-noz on the quays" },
      ],
      stats: [
        { num: "800,000", desc: "visitors over ten days" },
        { num: "4,500", desc: "artists invited" },
        { num: "7", desc: "Celtic nations represented" },
        { num: "1971", desc: "first edition" },
      ],
      vibe: "Irish pavilion, Bagad de Lann-Bihoué, Galician gaita, Welsh harp, Scottish dance. Pubs open until dawn and the harbour does not sleep.",
    },

    flavors: {
      eyebrow: "Chapter IX · Tastes & places", title: "One pot, two houses",
      lead: "Before you leave, you sit. Cotriade — a broth of potatoes, onions, smoked bacon and harbour fish — is to Lorient sailors what bouillabaisse is to Marseille: a simple equation, defended for three centuries.",
      dishName: "Cotriade", dishOrigin: "South Brittany · 18th c.",
      dishSlot: { id: "flavors-cotriade", hint: "Photo of cotriade (drop a real image here)" },
      ingredients: ["Mackerel", "Conger", "Pollack", "Potatoes", "Onions", "Smoked bacon", "Salted butter", "Wild thyme"],
      addresses: [
        { tag: "Restaurant", name: "Le Quai des Indes", sub: "Cotriade with spice inspirations",
          stars: "★★",
          slot: { id: "addr-restaurant", hint: "Photo · dining room or dish" },
          desc: "On a quay of former Company warehouses, chef Marin Le Goff reinvents cotriade with Pondicherry cardamom and long Malabar pepper. Open kitchen, slate menu changing with the tide.",
          row1: "12 quai des Indes", row2: "Every evening · 7-11 pm" },
        { tag: "Hotel · 4★", name: "Hôtel de la Compagnie", sub: "Old Faouëdic warehouses, 1740",
          stars: "★★★★",
          slot: { id: "addr-hotel", hint: "Photo · façade or room" },
          desc: "Twenty-four rooms in the original warehouse volumes: exposed beams, cut stone, harbour views. Open library, Nordic bath on the roof, free bikes. Breakfast served facing the port.",
          row1: "4 enclos du Faouëdic", row2: "From €180 · 24 rooms" },
      ],
    },

    outro: {
      bigA: "And now —", bigB: "your turn.",
      lead: "Plan your stop in Lorient: three days for the harbour, seven to reach Groix, Étel and the peninsula. The Tourism Office is here, and Captain Yann stays aboard.",
      cta1: "Plan my visit", cta2: "Start over",
      signature: "A story by Lorient Brittany South Tourism.",
    },

    sceneLabels: ["Embark", "Foundation 1666", "Golden Age", "Occupation", "Bombing", "Rebuild", "Reborn", "Today", "Festival", "Tastes", "Stopover"],

    yannGreeting: "Welcome. I am Captain Yann Le Goff, trader for the East India Company — at least I was, in 1742. Now I'll take you from one century to the next. What would you like to know?",
    yannSuggestions: ["Who was Colbert?", "Why was Lorient bombed?", "What can I see in two days?", "How do I get to Groix?"],

    sceneIntros: {
      0: "Welcome aboard. When you're ready, scroll on — the harbour awaits.",
      1: "1666. The King has just signed. Touch the glowing points, I'll tell you the rest.",
      2: "Slide the century from one end to the other. You'll see the town grow like a wheat field.",
      3: "The tone shifts. We enter the silence of concrete. Pay attention.",
      4: "Four weeks, seventy-five tons of bombs. You see what remains.",
      5: "Slide the cursor. Tourry draws, stone follows.",
      6: "Yesterday's U-boats, today's trimarans. Welcome to Lorient La Base.",
      7: "Today's harbour. Click anywhere — I'll take you there.",
      8: "Every August, seven Celtic nations come to call. The wind carries the pipes all the way to Groix.",
      9: "Sit down. The cotriade is ready.",
      10: "There. The harbour is in your eyes. Plan your visit.",
    },
  },
};

window.CONTENT = CONTENT;
