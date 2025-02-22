import { GameQuestion } from '@/types/types';

export const categories = {
  KINGS_CUP: "👑 King's Cup",
  PYRAMID: "🔺 Pyramide",
  WEREWOLF: "🐺 Loup Garou",
  PRESIDENT: "🎩 Président",
  RIDE_BUS: "🚌 Le Bus",
  VIRTUAL_DICE: "🎲 Dés Virtuels",
  VIRTUAL_CARDS: "🎴 Cartes Virtuelles"
} as const;

export const cardGamesQuestions: GameQuestion[] = [
  // 👑 King's Cup
  {
    text: `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                King's Cup 👑
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📌 MATÉRIEL NÉCESSAIRE
• 1 jeu de 52 cartes
• 1 grand verre au centre (le King's Cup)
• Des boissons pour tous les joueurs

🎲 RÈGLES DES CARTES
┌─────────────────────────────────────────┐
│ As ➤ CASCADE                            │
│   Tout le monde boit en cascade,        │
│   en commençant par le joueur actif     │
├─────────────────────────────────────────┤
│ 2 ➤ C'EST POUR TOI                      │
│   Désigne quelqu'un qui doit boire      │
├─────────────────────────────────────────┤
│ 3 ➤ C'EST POUR MOI                      │
│   Le joueur qui tire la carte boit      │
├─────────────────────────────────────────┤
│ 4 ➤ AU SOL                              │
│   Le dernier à mettre un genou au sol   │
│   doit boire                            │
├─────────────────────────────────────────┤
│ 5 ➤ LES GARS                            │
│   Tous les hommes boivent               │
├─────────────────────────────────────────┤
│ 6 ➤ LES FILLES                          │
│   Toutes les femmes boivent             │
├─────────────────────────────────────────┤
│ 7 ➤ VERS LE CIEL                        │
│   Le dernier à lever la main boit       │
├─────────────────────────────────────────┤
│ 8 ➤ PARTENAIRE                          │
│   Choisis un partenaire de boisson      │
├─────────────────────────────────────────┤
│ 9 ➤ RIME                                │
│   Lance une rime, le premier qui        │
│   ne trouve pas boit                    │
├─────────────────────────────────────────┤
│ 10 ➤ CATÉGORIE                          │
│   Choisis un thème, le premier qui      │
│   ne trouve pas de mot boit             │
├─────────────────────────────────────────┤
│ Valet ➤ RÈGLE                           │
│   Crée une nouvelle règle               │
├─────────────────────────────────────────┤
│ Dame ➤ QUESTIONS                        │
│   Lance une chaîne de questions         │
├─────────────────────────────────────────┤
│ Roi ➤ KING'S CUP                        │
│   Verse de ta boisson dans le verre     │
│   central. Le dernier roi boit tout !   │
└─────────────────────────────────────────┘

⚠️ RÈGLES SPÉCIALES
• Si quelqu'un ne respecte une règle ➤ Il boit
• Les règles des valets s'accumulent
• Le jeu se termine au dernier roi`,
    category: categories.KINGS_CUP,
    isChecked: false
  },

  // 🔺 Pyramide
  {
    text: `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                Pyramide 🔺
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📌 MISE EN PLACE
• Créez une pyramide (5-4-3-2-1 cartes)
• 4 cartes par joueur
• Cartes face cachée

🎲 DÉROULEMENT
┌─────────────────────────────────────────┐
│ 1. Retournez les cartes ligne par ligne │
│    en commençant par la base            │
│                                         │
│ 2. Les joueurs annoncent s'ils ont      │
│    la même carte                        │
└─────────────────────────────────────────┘

💫 SYSTÈME DE POINTS
┌─────────────────────────────────────────┐
│ • 1 carte identique ➤ 2 gorgées         │
│ • 2 cartes identiques ➤ 4 gorgées       │
│ • 3 cartes identiques ➤ 6 gorgées       │
│ • 4 cartes identiques ➤ 8 gorgées       │
│ • Carte du sommet ➤ Gorgées x2          │
└─────────────────────────────────────────┘

🎭 BLUFF
┌─────────────────────────────────────────┐
│ • Bluff autorisé sur vos cartes         │
│ • Contestation erronée ➤ Boit double    │
│ • Bluff découvert ➤ Bluffeur boit x2    │
└─────────────────────────────────────────┘

💡 CONSEILS
• Gardez vos cartes secrètes
• Observez les cartes jouées
• Bluffez stratégiquement

🎯 VARIANTES
• Pyramide à 6 étages
• Mode "Confiance" (cartes visibles)
• Mode "Chaos" (plusieurs lignes à la fois)`,
    category: categories.PYRAMID,
    isChecked: false
  },

  // 🐺 Loup Garou
  {
    text: `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
               Loup Garou 🐺
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎭 RÔLES PRINCIPAUX
┌─────────────────────────────────────────┐
│ 🐺 LOUPS-GAROUS                         │
│ • Se réveillent la nuit                 │
│ • Éliminent un villageois               │
│ • Doivent éliminer tout le village      │
├─────────────────────────────────────────┤
│ 👁️ VOYANTE                              │
│ • Regarde une carte chaque nuit         │
│ • Aide les villageois discrètement      │
├─────────────────────────────────────────┤
│ 🧪 SORCIÈRE                             │
│ • 1 potion de vie                       │
│ • 1 potion de mort                      │
│ • Usage unique pour chaque potion       │
├─────────────────────────────────────────┤
│ 🏹 CHASSEUR                             │
│ • En mourant, élimine un autre joueur   │
└─────────────────────────────────────────┘

✨ RÔLES SPÉCIAUX
┌─────────────────────────────────────────┐
│ 💘 CUPIDON                              │
│ • Désigne deux amoureux                 │
│ • Les amoureux meurent ensemble         │
├─────────────────────────────────────────┤
│ 👧 PETITE FILLE                         │
│ • Peut espionner les loups              │
├─────────────────────────────────────────┤
│ 🎭 VOLEUR                               │
│ • Échange sa carte avec une autre       │
├─────────────────────────────────────────┤
│ 👴 ANCIEN                               │
│ • Survit à une attaque des loups        │
└─────────────────────────────────────────┘

🌟 RÔLES ADDITIONNELS
┌─────────────────────────────────────────┐
│ 🛡️ SALVATEUR                            │
│ • Protège un joueur par nuit            │
├─────────────────────────────────────────┤
│ 🃏 IDIOT DU VILLAGE                     │
│ • Immunisé aux votes du village         │
├─────────────────────────────────────────┤
│ 🐐 BOUC ÉMISSAIRE                       │
│ • Vote compte double                    │
├─────────────────────────────────────────┤
│ 🎵 JOUEUR DE FLÛTE                      │
│ • Enchante deux joueurs par nuit        │
├─────────────────────────────────────────┤
│ 🌱 ENFANT SAUVAGE                       │
│ • Choisit un modèle                     │
│ • Devient loup si son modèle meurt      │
└─────────────────────────────────────────┘

⏳ DÉROULEMENT
┌─────────────────────────────────────────┐
│ 🌞 JOUR                                 │
│ • Discussion et débat                   │
│ • Vote pour éliminer un suspect         │
├─────────────────────────────────────────┤
│ 🌙 NUIT                                 │
│ • Tous ferment les yeux                 │
│ • Les rôles agissent tour à tour        │
└─────────────────────────────────────────┘

💡 CONSEILS
• Observez les comportements
• Ne révélez pas votre rôle trop tôt
• Formez des alliances stratégiques`,
    category: categories.WEREWOLF,
    isChecked: false
  },

  // 🎩 Président
  {
    text: `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
               Président 🎩
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎯 OBJECTIF
Se débarrasser de toutes ses cartes en premier

📌 PRÉPARATION
┌─────────────────────────────────────────┐
│ • Distribution de toutes les cartes     │
│ • Ordre : 2 > As > Roi > Dame > ... > 3 │
│ • Le 3 de trèfle commence               │
└─────────────────────────────────────────┘

🎲 TYPES DE COUPS
┌─────────────────────────────────────────┐
│ • SIMPLE ➤ Une carte                    │
│ • PAIRE ➤ Deux cartes identiques       │
│ • BRELAN ➤ Trois cartes identiques     │
│ • CARRÉ ➤ Quatre cartes identiques     │
└─────────────────────────────────────────┘

👑 HIÉRARCHIE
┌─────────────────────────────────────────┐
│ 1️⃣ PRÉSIDENT ➤ Premier à finir         │
│ 2️⃣ VICE-PRÉSIDENT ➤ Deuxième           │
│ 3️⃣ VICE-TROU ➤ Avant-dernier           │
│ 4️⃣ TROU ➤ Dernier                      │
└─────────────────────────────────────────┘

🔄 ÉCHANGE DE CARTES
┌─────────────────────────────────────────┐
│ TROU ➤ Donne ses 2 meilleures cartes    │
│        au Président                      │
│                                         │
│ VICE-TROU ➤ Donne sa meilleure carte    │
│             au Vice-Président           │
│                                         │
│ PRÉSIDENT ➤ Donne 2 cartes au choix     │
│             au Trou                      │
│                                         │
│ VICE-PRÉSIDENT ➤ Donne 1 carte au choix │
│                  au Vice-Trou           │
└─────────────────────────────────────────┘

⚡ RÈGLES SPÉCIALES
• Le 2 est la carte la plus forte
• Les carrés peuvent être joués à tout moment
• "Révolution" possible avec 4 cartes identiques

💡 STRATÉGIES
• Gardez vos cartes fortes
• Constituez des combinaisons
• Observez les cartes jouées`,
    category: categories.PRESIDENT,
    isChecked: false
  },

  // 🚌 Le Bus
  {
    text: `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                 Le Bus 🚌
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📌 MISE EN PLACE
• 6 cartes en ligne face cachée
• Reste du paquet pour piocher

🎲 DÉROULEMENT
┌─────────────────────────────────────────┐
│ 1️⃣ CARTE 1 : ROUGE OU NOIR ?           │
│ ✓ Continue                              │
│ ✗ 1 gorgée + recommence                 │
├─────────────────────────────────────────┤
│ 2️⃣ CARTE 2 : PLUS HAUTE OU BASSE ?     │
│ ✓ Continue                              │
│ ✗ 2 gorgées + retour carte 1            │
├─────────────────────────────────────────┤
│ 3️⃣ CARTE 3 : ENTRE OU HORS ?           │
│ ✓ Continue                              │
│ ✗ 3 gorgées + retour carte 1            │
├─────────────────────────────────────────┤
│ 4️⃣ CARTE 4 : COULEUR DÉJÀ VUE ?        │
│ ✓ Continue                              │
│ ✗ 4 gorgées + retour carte 1            │
├─────────────────────────────────────────┤
│ 5️⃣ CARTE 5 : PLUS HAUTE/BASSE QUE 3 ?  │
│ ✓ Continue                              │
│ ✗ 5 gorgées + retour carte 1            │
├─────────────────────────────────────────┤
│ 🚌 CARTE 6 : DEVINE LA CARTE !          │
│ ✓ Distribue toutes les gorgées          │
│ ✗ Bois tout + recommence                │
└─────────────────────────────────────────┘

⚠️ RÈGLES SPÉCIALES
• Pas de contestation possible
• As = haut ou bas (choix du joueur)
• Égalité = le joueur a raison

🎯 VARIANTES
• Bus plus long
• Mode difficile (sans égalité)
• Mode équipe

💡 CONSEILS
• Comptez les cartes
• Observez les cartes sorties
• La difficulté augmente progressivement`,
    category: categories.RIDE_BUS,
    isChecked: false
  },
  {
    category: categories.VIRTUAL_DICE,
    text: `━━━ Dés Virtuels ━━━

Lancez les dés !
• Choisissez le nombre de dés à lancer (1-6)
• Cliquez sur le bouton pour lancer
• Les résultats s'affichent avec une belle animation
• Parfait pour tous les jeux nécessitant des dés

Fonctionnalités
• Animation de lancer de dés en 3D
• Sons réalistes
• Historique des lancers
• Mode triche pour les MJ 😈

Utilisation
• Idéal pour le Yams
• Parfait pour le 421
• Pratique pour tout jeu de dés
• Plus besoin de chercher des dés physiques !`,
    isChecked: false
  },
  {
    category: categories.VIRTUAL_CARDS,
    text: `━━━ Cartes Virtuelles ━━━

Un jeu de cartes virtuel complet !
• 52 cartes classiques
• Jokers inclus
• Mélange automatique
• Distribution virtuelle

Fonctionnalités
• Mélange aléatoire
• Distribution personnalisée
• Affichage des cartes en HD
• Mode plein écran
• Animations fluides

Modes de jeu
• Mode libre : tirez les cartes une par une
• Mode distribution : distribuez X cartes à Y joueurs
• Mode paquet : créez des paquets personnalisés
• Mode défausse : gérez une pile de défausse

Parfait pour
• Tous les jeux de cartes classiques
• Apprendre de nouveaux jeux
• Jouer sans cartes physiques
• Pratiquer le comptage de cartes 🤫`,
    isChecked: false
  }
];

export const cardGamesConfig = {
  winningCount: 5,
  displayMode: 'single' as const,
  shuffleOnLoad: false,
  categories: Object.values(categories)
}; 