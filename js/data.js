// Quiz content: the 13 provinces and territories, and the 20 questions.
// Each answer adds points to provinces (keys are province ids).
window.QUIZ_DATA = {
  provinces: {
    qc: {
      slug: "quebec", name: "Québec", art: "le Québec", img: "qc-frontenac",
      tag: "Le cœur francophone de l'Amérique",
      desc: "Vivre entièrement en français, entre la vie trépidante de Montréal, le charme historique de Québec et les grands espaces de la Gaspésie. Les hivers sont enneigés, les étés chauds et festifs.",
      facts: ["Villes : Montréal, Québec, Gatineau", "Le français est la seule langue officielle", "Des centaines de festivals chaque année"],
      immig: "Le Québec sélectionne lui-même ses travailleurs qualifiés (programme PSTQ, et le PEQ rouvert en 2026). Le français y est un atout majeur, souvent exigé."
    },
    on: {
      slug: "ontario", name: "Ontario", art: "l'Ontario", img: "on-toronto",
      tag: "Les grandes ambitions",
      desc: "La province la plus peuplée du Canada : Toronto pour la carrière, Ottawa la capitale bilingue, et les chutes du Niagara pour le week-end. Un marché de l'emploi immense et très diversifié.",
      facts: ["Villes : Toronto, Ottawa, Sudbury", "La plus grande communauté francophone hors Québec", "Capitale fédérale : Ottawa"],
      immig: "Sudbury, Timmins et la région de Superior East participent au projet pilote d'immigration dans les communautés francophones."
    },
    bc: {
      slug: "colombie-britannique", name: "Colombie-Britannique", art: "la Colombie-Britannique", img: "bc-vancouver",
      tag: "Entre océan et montagnes",
      desc: "Le climat le plus doux du pays, avec des montagnes qui plongent dans le Pacifique. Vancouver est cosmopolite et ouverte sur l'Asie, mais le logement y coûte cher.",
      facts: ["Villes : Vancouver, Victoria, Kelowna", "Les hivers les plus doux du Canada sur la côte", "Ski et surf le même jour, c'est possible"],
      immig: "Kelowna participe au projet pilote d'immigration dans les communautés francophones."
    },
    ab: {
      slug: "alberta", name: "Alberta", art: "l'Alberta", img: "ab-moraine",
      tag: "Rocheuses et opportunités",
      desc: "Les lacs turquoise des Rocheuses à une heure de Calgary, une économie portée par l'énergie et la construction, et des salaires parmi les plus élevés du pays.",
      facts: ["Villes : Calgary, Edmonton", "Pas de taxe de vente provinciale", "Parcs nationaux de Banff et Jasper"],
      immig: "Le programme provincial cible surtout les métiers en demande. Edmonton a une communauté francophone active."
    },
    mb: {
      slug: "manitoba", name: "Manitoba", art: "le Manitoba", img: "mb-forks",
      tag: "Le cœur des Prairies",
      desc: "Une vie abordable et chaleureuse au centre du pays. Winnipeg abrite Saint-Boniface, le grand quartier francophone de l'Ouest canadien. Les hivers sont froids, mais ensoleillés.",
      facts: ["Villes : Winnipeg, Brandon", "Saint-Boniface, quartier francophone historique", "Logement parmi les plus abordables"],
      immig: "Saint-Pierre-Jolys participe au projet pilote des communautés francophones, et le Manitoba recrute activement des francophones."
    },
    sk: {
      slug: "saskatchewan", name: "Saskatchewan", art: "la Saskatchewan", img: "sk-prairie",
      tag: "La terre des ciels infinis",
      desc: "Des champs à perte de vue, un ciel immense et un coût de la vie très bas. L'agriculture, les mines et l'énergie recrutent. Idéal pour qui veut s'installer vite et acheter une maison.",
      facts: ["Villes : Saskatoon, Regina", "L'une des provinces les plus ensoleillées", "Agriculture, potasse et énergie"],
      immig: "Le programme provincial vise les métiers en demande, souvent avec une offre d'emploi."
    },
    nb: {
      slug: "nouveau-brunswick", name: "Nouveau-Brunswick", art: "le Nouveau-Brunswick", img: "nb-hopewell",
      tag: "La seule province officiellement bilingue",
      desc: "L'Acadie vivante : environ un tiers de la population parle français. Moncton est une ville bilingue en plein essor, à deux pas de la mer et des plus hautes marées du monde.",
      facts: ["Villes : Moncton, Fredericton, Saint-Jean", "Officiellement bilingue (français/anglais)", "Baie de Fundy et ses marées géantes"],
      immig: "Le programme provincial a un volet réservé aux francophones, et la Péninsule acadienne participe au projet pilote des communautés francophones."
    },
    ns: {
      slug: "nouvelle-ecosse", name: "Nouvelle-Écosse", art: "la Nouvelle-Écosse", img: "ns-cabot",
      tag: "La mer à chaque coin de rue",
      desc: "Des phares, des villages de pêcheurs et Halifax, une ville universitaire jeune et animée. Le rythme est détendu et l'océan n'est jamais loin.",
      facts: ["Villes : Halifax, Sydney", "Communautés acadiennes (Clare, Chéticamp)", "Fruits de mer et homard réputés"],
      immig: "Le Programme d'immigration au Canada atlantique aide les employeurs de la région à recruter à l'étranger."
    },
    pe: {
      slug: "ile-du-prince-edouard", name: "Île-du-Prince-Édouard", art: "l'Île-du-Prince-Édouard", img: "pe-cavendish",
      tag: "La douceur de vivre insulaire",
      desc: "La plus petite province : des plages de sable rouge, des fermes et une vie paisible où tout le monde se connaît. Parfait pour une vie de famille au calme.",
      facts: ["Ville : Charlottetown", "La plus petite province du Canada", "Communauté acadienne de la région Évangéline"],
      immig: "Le Programme d'immigration au Canada atlantique y est ouvert aux employeurs de l'île."
    },
    nl: {
      slug: "terre-neuve-et-labrador", name: "Terre-Neuve-et-Labrador", art: "Terre-Neuve-et-Labrador", img: "nl-jellybean",
      tag: "Le Canada le plus proche de l'Europe",
      desc: "Des maisons colorées, des icebergs au printemps et des habitants réputés pour leur chaleur humaine. Le point le plus à l'est de l'Amérique du Nord.",
      facts: ["Ville : St. John's", "Cap Spear, point le plus à l'est du continent", "Petite communauté francophone à Port-au-Port"],
      immig: "Le Programme d'immigration au Canada atlantique et un programme provincial facilitent la venue de travailleurs."
    },
    yt: {
      slug: "yukon", name: "Yukon", art: "le Yukon", img: "yt-kathleen",
      tag: "L'aventure du Grand Nord",
      desc: "Montagnes sauvages, soleil de minuit l'été et aurores boréales l'hiver. Whitehorse est petite mais dynamique, avec une communauté francophone accueillante.",
      facts: ["Ville : Whitehorse", "Parc national Kluane", "Communauté franco-yukonnaise active"],
      immig: "Le territoire a son propre programme de candidats, généralement lié à une offre d'emploi."
    },
    nt: {
      slug: "territoires-du-nord-ouest", name: "Territoires du Nord-Ouest", art: "les Territoires du Nord-Ouest", img: "nt-aurora",
      tag: "La capitale des aurores boréales",
      desc: "Yellowknife est l'un des meilleurs endroits au monde pour voir les aurores. Mines de diamants, salaires élevés et nature immense pour ceux qui aiment le froid.",
      facts: ["Ville : Yellowknife", "11 langues officielles, dont le français", "Mines de diamants"],
      immig: "Le territoire a son propre programme de candidats, généralement lié à une offre d'emploi."
    },
    nu: {
      slug: "nunavut", name: "Nunavut", art: "le Nunavut", img: "nu-pangnirtung",
      tag: "Le grand dépaysement arctique",
      desc: "Le territoire inuit : banquise, fjords et culture unique. La vie y est chère et isolée, mais les salaires sont élevés et l'expérience inoubliable.",
      facts: ["Ville : Iqaluit", "Le français y est langue officielle", "Accessible surtout en avion"],
      immig: "Pas de programme de candidats : on y arrive surtout avec une offre d'emploi."
    }
  },

  // img = photo file in img/, place = caption shown on the photo
  questions: [
    { img: "qc-frontenac", place: "Québec, Québec", q: "L'hiver, pour vous, c'est…", a: [
      ["Ski et chocolat chaud", { qc: 3, ab: 2, yt: 1, bc: 1 }],
      ["Supportable, sans plus", { on: 2, nb: 1, ns: 1, pe: 1, mb: 1 }],
      ["Le plus doux possible", { bc: 3, ns: 1, pe: 1, nl: 1 }],
      ["-40 °C ? Même pas peur", { nu: 3, nt: 3, yt: 2, mb: 1, sk: 1 }]
    ]},
    { img: "on-toronto", place: "Toronto, Ontario", q: "Votre ville idéale ?", a: [
      ["Une grande métropole", { on: 3, qc: 2, bc: 2 }],
      ["Une ville moyenne", { mb: 2, sk: 2, ab: 2, ns: 2, nb: 1 }],
      ["Une petite ville tranquille", { pe: 3, nb: 2, nl: 1 }],
      ["Un village au bout du monde", { nu: 3, nt: 2, yt: 2, nl: 1 }]
    ]},
    { img: "nb-moncton", place: "Moncton, Nouveau-Brunswick", q: "Au travail, vous voulez parler…", a: [
      ["Français uniquement", { qc: 4, nb: 1 }],
      ["Français et anglais", { nb: 3, on: 2, mb: 2 }],
      ["Anglais, pas de souci", { bc: 1, ab: 1, sk: 1, ns: 1, pe: 1, nl: 1, yt: 1, nt: 1, nu: 1 }],
      ["Je vais apprendre l'anglais", { on: 1, mb: 1, ab: 1, ns: 1, yt: 1 }]
    ]},
    { img: "ab-calgary", place: "Calgary, Alberta", q: "Votre domaine ?", a: [
      ["Tech et bureau", { on: 3, bc: 2, qc: 2 }],
      ["Santé et social", { nb: 2, ns: 2, pe: 1, nl: 1, nu: 2, nt: 1 }],
      ["Métiers et construction", { ab: 3, sk: 2, mb: 2, bc: 1 }],
      ["Mines, énergie, nature", { nt: 3, ab: 2, yt: 2, sk: 1, nl: 1 }]
    ]},
    { img: "ab-moraine", place: "Lac Moraine, Alberta", q: "Votre paysage de rêve ?", a: [
      ["L'océan", { ns: 2, pe: 2, nl: 2, bc: 2 }],
      ["Les montagnes", { ab: 3, bc: 2, yt: 2 }],
      ["Les grandes plaines", { sk: 3, mb: 3 }],
      ["La toundra arctique", { nu: 3, nt: 2 }]
    ]},
    { img: "sk-prairie", place: "Prairies, Saskatchewan", q: "Votre budget logement ?", a: [
      ["Serré", { sk: 3, mb: 2, nb: 2, nl: 2 }],
      ["Moyen", { qc: 2, ab: 2, ns: 1, pe: 1 }],
      ["Confortable", { on: 2, bc: 2, nt: 1, yt: 1, nu: 1 }]
    ]},
    { img: "ns-peggys", place: "Peggy's Cove, Nouvelle-Écosse", q: "Votre rythme de vie ?", a: [
      ["Zen, sans stress", { pe: 3, ns: 2, nl: 2, yt: 1 }],
      ["Équilibré", { qc: 2, mb: 2, nb: 2, sk: 1 }],
      ["Intense et ambitieux", { on: 3, ab: 2, bc: 1 }]
    ]},
    { img: "nl-jellybean", place: "St. John's, Terre-Neuve", q: "Revenir au pays, ce sera…", a: [
      ["Très souvent", { qc: 3, on: 2, nl: 1 }],
      ["Une fois par an", { nb: 1, ns: 1, pe: 1, mb: 1, ab: 1 }],
      ["Rarement", { bc: 1, yt: 1, nt: 1, nu: 2, sk: 1 }]
    ]},
    { img: "mb-forks", place: "Winnipeg, Manitoba", q: "Une communauté francophone ?", a: [
      ["Indispensable", { qc: 3, nb: 2 }],
      ["Importante", { mb: 3, on: 2, nb: 1 }],
      ["Un petit bonus", { ab: 1, yt: 2, ns: 1, pe: 1, nt: 1 }],
      ["Pas nécessaire", { bc: 1, sk: 1, nl: 1, nu: 1 }]
    ]},
    { img: "pe-cavendish", place: "Cavendish, Île-du-Prince-Édouard", q: "Côté famille ?", a: [
      ["Enfants déjà là", { pe: 3, nb: 1, mb: 1, sk: 1 }],
      ["Enfants bientôt", { qc: 2, ab: 1, mb: 1, pe: 1 }],
      ["Pas pour l'instant", { on: 1, bc: 1, yt: 1, nt: 2, nu: 2 }]
    ]},
    { img: "bc-tofino", place: "Tofino, Colombie-Britannique", q: "Le week-end idéal ?", a: [
      ["Plage et surf", { bc: 3, pe: 2, ns: 1 }],
      ["Randonnée en montagne", { ab: 3, yt: 2, bc: 1 }],
      ["Festival en ville", { qc: 3, on: 2 }],
      ["Pêche sur un lac", { mb: 2, sk: 2, nt: 2 }]
    ]},
    { img: "qc-perce", place: "Percé, Québec", q: "Votre assiette préférée ?", a: [
      ["Fruits de mer", { ns: 3, pe: 2, nl: 2, nb: 1 }],
      ["Une bonne poutine", { qc: 3, nb: 1 }],
      ["Steak grillé", { ab: 3, sk: 2, mb: 1 }],
      ["Cuisine du monde", { on: 3, bc: 2 }]
    ]},
    { img: "nt-aurora", place: "Yellowknife, T.N.-O.", q: "Les aurores boréales ?", a: [
      ["C'est mon rêve !", { nt: 3, yt: 3, nu: 2 }],
      ["Pourquoi pas", { mb: 2, sk: 2, ab: 1 }],
      ["Je préfère le soleil", { bc: 1, on: 1, ns: 1, pe: 1 }]
    ]},
    { img: "on-ottawa", place: "Ottawa, Ontario", q: "Vous vous voyez…", a: [
      ["Fonctionnaire", { on: 2, nb: 2, nu: 2, nt: 2, yt: 1 }],
      ["Salarié(e) du privé", { ab: 2, on: 1, bc: 1, qc: 1, sk: 1 }],
      ["Entrepreneur", { qc: 2, bc: 1, mb: 1, pe: 1, ns: 1 }]
    ]},
    { img: "nb-hopewell", place: "Hopewell Rocks, Nouveau-Brunswick", q: "Vivre près de la mer ?", a: [
      ["Indispensable", { ns: 3, pe: 3, nl: 2, nb: 2 }],
      ["Agréable", { bc: 2, qc: 1, nb: 1 }],
      ["Un lac suffit", { mb: 2, sk: 2, on: 1, nt: 1, yt: 1 }]
    ]},
    { img: "yt-kathleen", place: "Parc Kluane, Yukon", q: "L'isolement vous fait peur ?", a: [
      ["Pas du tout, j'adore", { yt: 3, nu: 3, nt: 2, nl: 1 }],
      ["Un peu, ça dépend", { pe: 1, nl: 1, sk: 1, nb: 1, ns: 1 }],
      ["Oui, il me faut du monde", { on: 2, qc: 2, bc: 1, ab: 1 }]
    ]},
    { img: "bc-vancouver", place: "Vancouver, Colombie-Britannique", q: "Salaire ou qualité de vie ?", a: [
      ["Gros salaire avant tout", { ab: 3, nt: 2, nu: 2, on: 1 }],
      ["Qualité de vie", { pe: 2, ns: 2, nb: 1, bc: 1, qc: 1 }],
      ["Les deux, s'il vous plaît", { bc: 1, qc: 1, mb: 1, sk: 1, yt: 1 }]
    ]},
    { img: "qc-montreal", place: "Vieux-Montréal, Québec", q: "L'ambiance qui vous ressemble ?", a: [
      ["Joie de vivre et terrasses", { qc: 3, nb: 1 }],
      ["Cosmopolite", { on: 3, bc: 2 }],
      ["Chaleur humaine", { nl: 3, mb: 1, sk: 1, ns: 1, pe: 1 }],
      ["Calme et nature", { yt: 2, nt: 1, nu: 1, pe: 1 }]
    ]},
    { img: "on-niagara", place: "Chutes du Niagara, Ontario", q: "Vous êtes plutôt…", a: [
      ["Aventurier", { yt: 2, nt: 2, nu: 2, bc: 1 }],
      ["Citadin", { on: 2, qc: 2, bc: 1 }],
      ["Bon vivant", { qc: 1, nb: 1, ns: 2, pe: 1, nl: 1 }],
      ["Bosseur", { ab: 2, sk: 2, mb: 1, on: 1 }]
    ]},
    { img: "nu-pangnirtung", place: "Pangnirtung, Nunavut", q: "Votre priorité n° 1 ?", a: [
      ["Trouver vite un emploi", { ab: 2, sk: 2, mb: 1, on: 1 }],
      ["Vivre en français", { qc: 3, nb: 2 }],
      ["Le grand dépaysement", { nu: 3, nt: 2, yt: 2, nl: 1 }],
      ["L'avenir de mes enfants", { pe: 1, ns: 1, mb: 1, nb: 1, on: 1, bc: 1 }]
    ]}
  ]
};
