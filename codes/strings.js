// ============================================================
// strings.js — Rezo Mapou Nasyonal — Frontend Strings
// ALL UI text, SEO metadata, data references live here.
// NO hard values in any HTML file — reference by key only.
// Loaded after config.js on every page.
// ============================================================

// ── HAITI DEPARTMENTS & COMMUNES ─────────────────────────────────────────

const HAITI = {
  "Artibonite": [
    "Dessalines","Desdunes","Ennery","Gros-Morne","La Chapelle",
    "Marchand Dessalines","Marmelade","Petite-Rivière-de-l'Artibonite",
    "Saint-Marc","Saint-Michel-de-l'Atalaye","Saint-Raphaël","Verrettes"
  ],
  "Centre": [
    "Belladère","Boucan Carré","Hinche","Lascahobas","Mirebalais",
    "Savanette","Thomassique","Thomonde"
  ],
  "Grand'Anse": [
    "Abricots","Anse-d'Hainault","Beaumont","Chambellan","Corail",
    "Dame-Marie","Jérémie","Les Irois","Moron","Roseaux","Pestel","Tiburon"
  ],
  "Nippes": [
    "Arnaud","Anse-à-Veau","Baradères","Fond des Nègres","Grande Caille",
    "L'Asile","Miragoane","Paillant","Petit-Trou-de-Nippes","Plaisance-du-Sud"
  ],
  "Nord": [
    "Acul-du-Nord","Bahon","Borgne","Cap-Haïtien","Dondon","Grande Rivière du Nord",
    "Limonade","Milot","Pignon","Pilate","Plaine-du-Nord","Plaisance",
    "Ranquitte","Saint-Raphaël","Trou-du-Nord"
  ],
  "Nord-Est": [
    "Capotille","Carice","Ferrier","Fort-Liberté","Mombin-Crochu",
    "Mont-Organisé","Ouanaminthe","Sainte-Suzanne","Terrier Rouge","Vallières"
  ],
  "Nord-Ouest": [
    "Anse-à-Foleur","Baie-de-Henne","Bassin Bleu","Bombardopolis",
    "Jean Rabel","La Tortue","Môle Saint-Nicolas","Port-de-Paix","Saint-Louis-du-Nord"
  ],
  "Ouest": [
    "Anse-à-Galets","Arcahaie","Cabaret","Carrefour","Cornillon/Grand-Bois",
    "Côte-de-Fer","Croix-des-Bouquets","Delmas","Fonds Verrettes","Ganthier",
    "Grand-Goâve","Kenscoff","Léogâne","Pétion-Ville","Port-au-Prince",
    "Gressier","Thomazeau","Cité Soleil"
  ],
  "Sud": [
    "Aquin","Arniquet","Camp-Perrin","Cavaillon","Chantal","Chardonnieres",
    "Côteaux","Les Cayes","Les Anglais","Les Côteaux","Maniche","Port-à-Piment",
    "Port-Salut","Roche-à-Bateau","Saint-Jean-du-Sud","Saint-Louis-du-Sud",
    "Torbeck","Tiburon"
  ],
  "Sud-Est": [
    "Anse-à-Pitres","Bainet","Belle Anse","Cayes-Jacmel","Grand-Gosier",
    "Jacmel","La Vallée","Marigot","Thiotte"
  ],
};

// ── COMMUNE POPULATION WEIGHTS ────────────────────────────────────────────
// Used by seed data and member scroll algorithm.
// Higher = more likely to appear in generated data.

const COMMUNE_WEIGHTS = {
  // Ouest — highest density
  "Port-au-Prince":       22,
  "Delmas":               16,
  "Carrefour":            12,
  "Cité Soleil":           8,
  "Pétion-Ville":          9,
  "Croix-des-Bouquets":    6,
  "Léogâne":               5,
  "Arcahaie":              3,
  "Cabaret":               3,
  "Gressier":              2,
  "Grand-Goâve":           3,
  "Kenscoff":              2,
  "Thomazeau":             1,
  "Cornillon/Grand-Bois":  1,
  "Anse-à-Galets":         1,
  "Ganthier":              1,
  "Fonds Verrettes":       1,
  "Côte-de-Fer":           1,

  // Nord
  "Cap-Haïtien":          11,
  "Limonade":              3,
  "Milot":                 2,
  "Pilate":                2,
  "Trou-du-Nord":          3,
  "Plaisance":             2,
  "Acul-du-Nord":          2,
  "Borgne":                1,
  "Dondon":                1,
  "Grande Rivière du Nord":2,
  "Plaine-du-Nord":        1,
  "Ranquitte":             1,
  "Pignon":                2,
  "Bahon":                 1,
  "Saint-Raphaël":         2,

  // Artibonite
  "Saint-Marc":            6,
  "Gonaïves":              7,
  "Verrettes":             3,
  "Marchand Dessalines":   2,
  "Dessalines":            2,
  "Gros-Morne":            2,
  "Marmelade":             1,
  "Ennery":                1,
  "Desdunes":              1,
  "La Chapelle":           1,
  "Petite-Rivière-de-l'Artibonite": 2,
  "Saint-Michel-de-l'Atalaye":      1,

  // Sud
  "Les Cayes":             6,
  "Aquin":                 3,
  "Camp-Perrin":           2,
  "Cavaillon":             2,
  "Port-Salut":            2,
  "Torbeck":               1,
  "Chantal":               1,
  "Maniche":               1,

  // Sud-Est
  "Jacmel":                5,
  "Belle Anse":            2,
  "Cayes-Jacmel":          2,
  "Marigot":               2,
  "Bainet":                1,
  "Grand-Gosier":          1,
  "La Vallée":             1,
  "Thiotte":               1,
  "Anse-à-Pitres":         1,

  // Centre
  "Hinche":                4,
  "Mirebalais":            3,
  "Lascahobas":            2,
  "Boucan Carré":          1,
  "Belladère":             1,
  "Thomonde":              1,
  "Thomassique":           1,
  "Savanette":             1,

  // Nord-Est
  "Ouanaminthe":           4,
  "Fort-Liberté":          2,
  "Terrier Rouge":         2,
  "Mont-Organisé":         1,
  "Capotille":             1,
  "Carice":                1,
  "Ferrier":               1,
  "Mombin-Crochu":         1,
  "Sainte-Suzanne":        1,
  "Vallières":             1,

  // Nord-Ouest
  "Port-de-Paix":          4,
  "Jean Rabel":            2,
  "Bassin Bleu":           1,
  "Môle Saint-Nicolas":    1,
  "Anse-à-Foleur":         1,
  "Baie-de-Henne":         1,
  "Bombardopolis":         1,
  "La Tortue":             1,
  "Saint-Louis-du-Nord":   1,

  // Grand'Anse
  "Jérémie":               4,
  "Dame-Marie":            2,
  "Corail":                2,
  "Roseaux":               1,
  "Moron":                 1,
  "Les Irois":             1,
  "Abricots":              1,
  "Anse-d'Hainault":       1,
  "Beaumont":              1,
  "Chambellan":            1,
  "Pestel":                1,
  "Tiburon":               1,

  // Nippes
  "Miragoane":             4,
  "Anse-à-Veau":           3,
  "Fond des Nègres":       2,
  "Paillant":              1,
  "Arnaud":                1,
  "Baradères":             1,
  "Grande Caille":         1,
  "L'Asile":               1,
  "Petit-Trou-de-Nippes":  1,
  "Plaisance-du-Sud":      1,
};

// ── DIASPORA COUNTRIES ────────────────────────────────────────────────────
// Ordered by Haitian diaspora population size.

const DIASPORA_COUNTRIES = [
  "Haïti",
  "États-Unis / USA",
  "Canada",
  "France",
  "République Dominicaine",
  "Brésil",
  "Chili",
  "Bahamas",
  "Guadeloupe",
  "Martinique",
  "Guyane française",
  "Belgique",
  "Suisse",
  "Royaume-Uni",
  "Mexique",
  "Cuba",
  "Jamaïque",
  "Autre / Other",
];

// ── DEPT CODES ────────────────────────────────────────────────────────────

const DEPT_CODES = {
  "Artibonite": "ART",
  "Centre":     "CTR",
  "Grand'Anse": "GDA",
  "Nippes":     "NIP",
  "Nord":       "NOR",
  "Nord-Est":   "NRE",
  "Nord-Ouest": "NRO",
  "Ouest":      "OUE",
  "Sud":        "SUD",
  "Sud-Est":    "SDE",
};

// ── SEO METADATA ──────────────────────────────────────────────────────────
// Applied dynamically on every page load.
// Static fallbacks with same values must exist in each HTML <head>.

const SEO = {
  ht: {
    home: {
      title:       "Rezo Mapou Nasyonal — Rasin Ayiti",
      description: "Rezo sivil ayisyen ki konekte machann, pwofesè, anplwaye ak dyaspora nan yon sèl enfrastrikti konfyans.",
      og_title:    "Rezo Mapou Nasyonal",
      og_desc:     "Jwenn rezo a. Vin yon Rasin Mapou.",
      og_image:    "https://rezomapou.github.io/webapp/og_image.png",
    },
    register: {
      title:       "Enskri — Rezo Mapou Nasyonal",
      description: "Vin yon Rasin Mapou. Enskri gratis nan rezo sivil ayisyen an.",
      og_title:    "Enskri nan Rezo Mapou",
      og_desc:     "Konekte ak rezo a. Gratis pou tout moun.",
      og_image:    "https://rezomapou.github.io/webapp/og_image.png",
    },
    dashboard: {
      title:       "Tablodbò — Rezo Mapou Nasyonal",
      description: "Wè kwasans rezo a an tan reyèl — manm, depatman, komin.",
      og_title:    "Tablodbò Rezo Mapou",
      og_desc:     "Rezo a ap grandi chak jou.",
      og_image:    "https://rezomapou.github.io/webapp/og_image.png",
    },
    profile: {
      title:       "Vitrine — Rezo Mapou Nasyonal",
      description: "Vitrine pèsonèl ou nan Rezo Mapou Nasyonal.",
      og_title:    "Vitrine Rezo Mapou",
      og_desc:     "Wè pwofil manm nan rezo a.",
      og_image:    "https://rezomapou.github.io/webapp/og_image.png",
    },
    links: {
      title:       "Lyen — Rezo Mapou Nasyonal",
      description: "Jwenn lyen yon manm Rezo Mapou.",
      og_title:    "Lyen Manm Rezo Mapou",
      og_desc:     "Konekte ak manm sa a.",
      og_image:    "https://rezomapou.github.io/webapp/og_image.png",
    },
    directory: {
      title:       "Anyè — Rezo Mapou Nasyonal",
      description: "Chèche manm Rezo Mapou pa komin, aktivite oswa nivo konfyans.",
      og_title:    "Anyè Rezo Mapou",
      og_desc:     "Jwenn Rasin Mapou nan zòn ou.",
      og_image:    "https://rezomapou.github.io/webapp/og_image.png",
    },
    login: {
      title:       "Konekte — Rezo Mapou Nasyonal",
      description: "Konekte nan kont Rezo Mapou ou.",
      og_title:    "Konekte — Rezo Mapou",
      og_desc:     "Antre nan kont ou.",
      og_image:    "https://rezomapou.github.io/webapp/og_image.png",
    },
  },

  fr: {
    home: {
      title:       "Rezo Mapou Nasyonal — Les Racines d'Haïti",
      description: "Réseau civique haïtien connectant marchands, enseignants, employés et diaspora en une seule infrastructure de confiance.",
      og_title:    "Rezo Mapou Nasyonal",
      og_desc:     "Rejoignez le réseau. Devenez une Racine Mapou.",
      og_image:    "https://rezomapou.github.io/webapp/og_image.png",
    },
    register: {
      title:       "S'inscrire — Rezo Mapou Nasyonal",
      description: "Devenez une Racine Mapou. Inscription gratuite au réseau civique haïtien.",
      og_title:    "Rejoindre Rezo Mapou",
      og_desc:     "Gratuit pour tous.",
      og_image:    "https://rezomapou.github.io/webapp/og_image.png",
    },
    dashboard: {
      title:       "Tableau de bord — Rezo Mapou Nasyonal",
      description: "Suivez la croissance du réseau en temps réel — membres, départements, communes.",
      og_title:    "Tableau de bord Rezo Mapou",
      og_desc:     "Le réseau grandit chaque jour.",
      og_image:    "https://rezomapou.github.io/webapp/og_image.png",
    },
    profile: {
      title:       "Vitrine — Rezo Mapou Nasyonal",
      description: "Votre vitrine personnelle sur Rezo Mapou Nasyonal.",
      og_title:    "Vitrine Rezo Mapou",
      og_desc:     "Consultez le profil d'un membre du réseau.",
      og_image:    "https://rezomapou.github.io/webapp/og_image.png",
    },
    links: {
      title:       "Liens — Rezo Mapou Nasyonal",
      description: "Accédez aux liens d'un membre Rezo Mapou.",
      og_title:    "Liens Membre Rezo Mapou",
      og_desc:     "Connectez-vous avec ce membre.",
      og_image:    "https://rezomapou.github.io/webapp/og_image.png",
    },
    directory: {
      title:       "Annuaire — Rezo Mapou Nasyonal",
      description: "Recherchez des membres Rezo Mapou par commune, activité ou niveau de confiance.",
      og_title:    "Annuaire Rezo Mapou",
      og_desc:     "Trouvez une Racine Mapou près de chez vous.",
      og_image:    "https://rezomapou.github.io/webapp/og_image.png",
    },
    login: {
      title:       "Connexion — Rezo Mapou Nasyonal",
      description: "Connectez-vous à votre compte Rezo Mapou.",
      og_title:    "Connexion — Rezo Mapou",
      og_desc:     "Accédez à votre compte.",
      og_image:    "https://rezomapou.github.io/webapp/og_image.png",
    },
  },

  en: {
    home: {
      title:       "Rezo Mapou Nasyonal — The Roots of Haiti",
      description: "Haitian civic network connecting merchants, teachers, employees and diaspora into one trust infrastructure.",
      og_title:    "Rezo Mapou Nasyonal",
      og_desc:     "Join the network. Become a Mapou Root.",
      og_image:    "https://rezomapou.github.io/webapp/og_image.png",
    },
    register: {
      title:       "Register — Rezo Mapou Nasyonal",
      description: "Become a Rasin Mapou. Free registration in the Haitian civic network.",
      og_title:    "Join Rezo Mapou",
      og_desc:     "Free for everyone.",
      og_image:    "https://rezomapou.github.io/webapp/og_image.png",
    },
    dashboard: {
      title:       "Dashboard — Rezo Mapou Nasyonal",
      description: "Watch the network grow in real time — members, departments, communes.",
      og_title:    "Rezo Mapou Dashboard",
      og_desc:     "The network grows every day.",
      og_image:    "https://rezomapou.github.io/webapp/og_image.png",
    },
    profile: {
      title:       "Vitrine — Rezo Mapou Nasyonal",
      description: "Your personal Vitrine on Rezo Mapou Nasyonal.",
      og_title:    "Rezo Mapou Vitrine",
      og_desc:     "View a network member's profile.",
      og_image:    "https://rezomapou.github.io/webapp/og_image.png",
    },
    links: {
      title:       "Links — Rezo Mapou Nasyonal",
      description: "Access a Rezo Mapou member's links.",
      og_title:    "Rezo Mapou Member Links",
      og_desc:     "Connect with this member.",
      og_image:    "https://rezomapou.github.io/webapp/og_image.png",
    },
    directory: {
      title:       "Directory — Rezo Mapou Nasyonal",
      description: "Search Rezo Mapou members by commune, activity, or trust level.",
      og_title:    "Rezo Mapou Directory",
      og_desc:     "Find a Rasin Mapou near you.",
      og_image:    "https://rezomapou.github.io/webapp/og_image.png",
    },
    login: {
      title:       "Login — Rezo Mapou Nasyonal",
      description: "Log in to your Rezo Mapou account.",
      og_title:    "Login — Rezo Mapou",
      og_desc:     "Access your account.",
      og_image:    "https://rezomapou.github.io/webapp/og_image.png",
    },
  },
};

// ── UI STRINGS ────────────────────────────────────────────────────────────
// All labels, buttons, placeholders, and messages.
// Reference by STRINGS[lang].key — never hard-code in HTML.

const STRINGS = {

  ht: {
    // 404 msg
   err_404_page_title: "404 — Paj pa disponib",
   err_404_title: "Paj sa a pa egziste",
   err_404_msg: "Nou pa ka jwenn paj w ap chèche a. Li ka deplase oswa li pa egziste ankò.",
   err_back_home: "Retounen nan Akèy",
   
    // payment field
    pay_section_title: "Peman",
    pay_hint:          "Pou lè nou gen pou nou peye ou",
    f_payment_ph:      "8 chif",
    f_sect_identity:   "👤 Idantite",
    f_sect_social:     "🔗 Rezo Sosyal",
    pay_section_title: "💰 Peman",
    pay_method_title:  "Chwazi",
    plt_moncash:       "MonCash",
    plt_natcash:       "NatCash",
  
    // Site identity
    site_name:        "Rezo Mapou Nasyonal",
    site_tagline:     "Rasin Ayiti",
    site_abbr:        "RMN",
    loading_msg: "Pasyans, n ap prepare...",

    // Navigation
    nav_home:         "Akèy",
    nav_register:     "Enskri",
    nav_login:        "Konekte",
    nav_dashboard:    "Tablodbò",
    nav_directory:    "Anyè",
    nav_profile:      "Vitrine mwen",
    nav_logout:       "Dekonekte",

    // Trust levels
    level_0:          "Rasin",
    level_1:          "Verifye",
    level_2:          "Rekonèt",
    level_coach:      "Coach",

    // Visibility labels
    vis_public:       "Piblik",
    vis_members:      "Rezo sèlman",
    vis_trust:        "Sèk Konfyans",
    vis_private:      "Prive",

    // Registration form
    reg_title:        "Vin yon Rasin Mapou",
    reg_subtitle:     "Enskri gratis. Pa gen pèmisyon espesyal.",
    f_firstname:      "Prenon",
    f_lastname:       "Siyati",
    f_phone:          "Nimewo telefòn",
    f_phone_ph:       "+509 3701 2345",
    f_phone_hint:     "Nimewo entènasyonal — pa gen doub",
    f_phone_exists:   "Nimewo sa a deja enskri.",
    f_phone_ok:       "✓ Nimewo disponib",
    f_phone_invalid:  "Nimewo pa valid. Itilize fòma entènasyonal.",
    f_email:          "Imèl",
    f_email_ph:       "ou@ekzanp.com",
    f_email_hint:     "Pou verifye kont ou",
    f_country:        "Peyi",
    f_country_ph:     "— Chwazi peyi ou —",
    f_dept:           "Depatman",
    f_dept_ph:        "— Chwazi depatman —",
    f_commune:        "Komin",
    f_commune_ph:     "— Chwazi komin —",
    f_city:           "Vil",
    f_city_ph:        "Miami, New York, Montréal...",
    f_state:          "Eta / Pwovens",
    f_state_ph:       "Florida, Quebec...",
    f_lang:           "Lang prefere",
    f_submit:         "Enskri kounye a",
    f_submitting:     "Ap voye...",
    f_success:        "Enskripsyon fèt! Verifye imèl ou.",
    f_error:          "Yon erè te fèt. Eseye ankò.",
    f_required:       "Chan obligatwa",

    // Login
    login_title:      "Konekte nan kont ou",
    login_subtitle:   "Nou pral voye yon lyen nan imèl ou.",
    login_ph:         "Telefòn oswa imèl",
    login_btn:        "Voye lyen koneksyon",
    login_sent:       "Lyen voye! Verifye imèl ou.",
    login_not_found:  "Kont pa jwenn.",

    // Verify
    verify_title:     "Ap verifye kont ou...",
    verify_success:   "Kont verifye! Ou ka konekte kounye a.",
    verify_expired:   "Lyen ekspire. Mande yon nouvo lyen.",
    verify_invalid:   "Lyen pa valid.",
    verify_redirecting: "Redireksyon nan Vitrine ou...",

    // Dashboard
    dash_title:       "Tablodbò Rezo Mapou",
    dash_subtitle:    "Enskripsyon an tan reyèl",
    dash_members:     "Rasin Enskri",
    dash_coaches:     "Coach Aktif",
    dash_depts:       "Depatman",
    dash_communes:    "Komin",
    dash_by_dept:     "Pa Depatman",
    dash_by_commune:  "Pa Komin — Top 10",
    dash_refresh:     "⟳ Aktyalize",
    dash_updated:     "Dènye aktyalizasyon",
    dash_loading:     "Ap chaje done...",
    dash_error:       "Erè koneksyon. Tanpri rafrechi.",
    dash_no_data:     "Pa gen done pou kounye a.",

    // Vitrine / profile
    vitrine_title:    "Vitrine mwen",
    vitrine_edit:     "Modifye",
    vitrine_save:     "Sove",
    vitrine_cancel:   "Anile",
    vitrine_links:    "Lyen mwen",
    vitrine_vwa:      "Vwa mwen",
    vitrine_score:    "Skor RMN",
    vitrine_reach:    "Pòte rezo",
    vitrine_level:    "Nivo",
    vitrine_since:    "Manm depi",
    vitrine_coach:    "Coach",
    vitrine_add_link: "+ Ajoute yon lyen",
    vitrine_add_vwa:  "+ Ajoute yon Vwa",
    vitrine_visibility: "Visibilite Vitrine",
    vitrine_score_public: "Montre skor piblikman",

    // Links page
    links_contact:    "Kontakte mwen",
    links_pending:    "Annatant...",
    links_message:    "Voye mesaj",
    links_connect:    "Konekte pou kontakte manm sa a.",
    links_register:   "Enskri nan Rezo Mapou",
    links_login_cta:  "Konekte",

    // 5-Leaf system
    leaf_we_li:       "Wè li",
    leaf_apresye:     "Apresye",
    leaf_konekte:     "Konekte",
    leaf_enspire:     "Enspire",
    leaf_angaje:      "Angaje",
    leaf_we_li_tip:   "Mwen te wè sa",
    leaf_apresye_tip: "Sa gen valè pou mwen",
    leaf_konekte_tip: "Sa pale ak eksperyans mwen",
    leaf_enspire_tip: "Sa chanje fason mwen panse",
    leaf_angaje_tip:  "Mwen pral aji akòz sa",

    // Validation
    val_trusted:      "Mwen fè li konfyans",
    val_active:       "Mwen wè li aktif",
    val_reliable:     "Li fiab — li livre",
    val_give:         "Valide manm sa a",
    val_revoke:       "Retire validasyon",
    val_count:        "Validasyon resevwa",

    // Coaching
    coach_request:    "Mande coaching",
    coach_offer:      "Ofri coaching",
    coach_accept:     "Aksepte",
    coach_decline:    "Refize",
    coach_pending:    "Annatant",
    coach_active:     "Coaching aktif",
    coach_expires:    "Ekspire",

    // Invites
    invite_targeted:  "Envite yon moun",
    invite_open:      "Jenere lyen envitasyon",
    invite_phone_ph:  "Nimewo moun ou vle envite",
    invite_send:      "Voye envitasyon",
    invite_copy:      "Kopye lyen",
    invite_copied:    "Kopye!",

    // Ad tiers — names in strings, not config
    ad_l1_name:       "Koulè",
    ad_l2_name:       "Ajan",
    ad_l3_int_name:   "Lò",
    ad_l3_ext_name:   "Platèn",
    ad_shared_name:   "Pataje",
    ad_dedicated_name:"Dedye",
    ad_message_ph:    "Mesaj ou (maks 80 karaktè)",
    ad_points:        "Pwen",
    ad_activate:      "Aktive",
    ad_deactivate:    "Dezaktive",
    ad_add_points:    "Ajoute pwen",

    // Platforms
    plt_whatsapp:     "WhatsApp",
    plt_facebook:     "Facebook",
    plt_tiktok:       "TikTok",
    plt_instagram:    "Instagram",
    plt_youtube:      "YouTube",
    plt_linkedin:     "LinkedIn",
    plt_moncash:      "MonCash",
    plt_natcash:      "NatCash",
    plt_website:      "Sit entènèt",
    plt_other:        "Lòt lyen",

    // General UI
    btn_back:         "← Retounen",
    btn_close:        "Fèmen",
    btn_confirm:      "Konfime",
    btn_loading:      "Ap chaje...",
    lbl_or:           "oswa",
    lbl_optional:     "opsyonèl",
    lbl_required:     "*",
    lbl_new:          "Nouvo",
    lbl_verified:     "✓ Verifye",
    lbl_unverified:   "Pa verifye",

    // Legal footer
    legal_terms:      "Tèm Itilizasyon",
    legal_privacy:    "Konfidansyalite",
    legal_copyright:  "Dwa Otè",
    legal_rights:     "© 2026 Rezo Mapou Nasyonal. Tout dwa rezève.",
  },

  fr: {
    err_404_page_title: "404 — Page introuvable",
    err_404_title:    "Page non trouvée",
    err_404_msg:      "Désolé, la page que vous recherchez n'existe pas ou a été déplacée.",
    err_back_home:    "Retour à l'accueil",
    
    pay_section_title: "Paiement",
    pay_hint:          "Pour quand nous devrons vous payer",
    f_payment_ph:      "8 chif",
    f_sect_identity:   "👤 Identité",
    f_sect_social:     "🔗 Reseaux Sociaux",
    pay_section_title: "💰 Paiement",
    pay_method_title:  "Votre choix",
    plt_moncash:       "MonCash",
    plt_natcash:       "NatCash",
    
    site_name:        "Rezo Mapou Nasyonal",
    site_tagline:     "Les Racines d'Haïti",
    site_abbr:        "RMN",
    loading_msg:   "Patientez svp  ...",

    nav_home:         "Accueil",
    nav_register:     "S'inscrire",
    nav_login:        "Connexion",
    nav_dashboard:    "Tableau de bord",
    nav_directory:    "Annuaire",
    nav_profile:      "Ma Vitrine",
    nav_logout:       "Déconnexion",

    level_0:          "Rasin",
    level_1:          "Vérifié(e)",
    level_2:          "Reconnu(e)",
    level_coach:      "Coach",

    vis_public:       "Public",
    vis_members:      "Membres seulement",
    vis_trust:        "Cercle de confiance",
    vis_private:      "Privé",

    reg_title:        "Devenez une Racine Mapou",
    reg_subtitle:     "Inscription gratuite. Ouverte à tous.",
    f_firstname:      "Prénom",
    f_lastname:       "Nom de famille",
    f_phone:          "Numéro de téléphone",
    f_phone_ph:       "+509 3701 2345",
    f_phone_hint:     "Format international — unique par membre",
    f_phone_exists:   "Ce numéro est déjà enregistré.",
    f_phone_ok:       "✓ Numéro disponible",
    f_phone_invalid:  "Numéro invalide. Utilisez le format international.",
    f_email:          "Adresse email",
    f_email_ph:       "vous@exemple.com",
    f_email_hint:     "Pour vérifier votre compte",
    f_country:        "Pays",
    f_country_ph:     "— Choisissez votre pays —",
    f_dept:           "Département",
    f_dept_ph:        "— Choisissez un département —",
    f_commune:        "Commune",
    f_commune_ph:     "— Choisissez une commune —",
    f_city:           "Ville",
    f_city_ph:        "Miami, New York, Montréal...",
    f_state:          "État / Province",
    f_state_ph:       "Florida, Québec...",
    f_lang:           "Langue préférée",
    f_submit:         "S'inscrire maintenant",
    f_submitting:     "Envoi en cours...",
    f_success:        "Inscription réussie ! Vérifiez votre email.",
    f_error:          "Une erreur est survenue. Réessayez.",
    f_required:       "Champ obligatoire",

    login_title:      "Connexion à votre compte",
    login_subtitle:   "Nous enverrons un lien à votre email.",
    login_ph:         "Téléphone ou email",
    login_btn:        "Envoyer le lien de connexion",
    login_sent:       "Lien envoyé ! Vérifiez votre email.",
    login_not_found:  "Compte introuvable.",

    verify_title:     "Vérification de votre compte...",
    verify_success:   "Compte vérifié ! Vous pouvez vous connecter.",
    verify_expired:   "Lien expiré. Demandez un nouveau lien.",
    verify_invalid:   "Lien invalide.",
    verify_redirecting: "Redirection vers votre Vitrine...",

    dash_title:       "Tableau de bord Rezo Mapou",
    dash_subtitle:    "Inscriptions en temps réel",
    dash_members:     "Racines inscrites",
    dash_coaches:     "Coaches actifs",
    dash_depts:       "Départements",
    dash_communes:    "Communes",
    dash_by_dept:     "Par Département",
    dash_by_commune:  "Par Commune — Top 10",
    dash_refresh:     "⟳ Actualiser",
    dash_updated:     "Dernière mise à jour",
    dash_loading:     "Chargement des données...",
    dash_error:       "Erreur de connexion. Veuillez rafraîchir.",
    dash_no_data:     "Aucune donnée pour le moment.",

    vitrine_title:    "Ma Vitrine",
    vitrine_edit:     "Modifier",
    vitrine_save:     "Enregistrer",
    vitrine_cancel:   "Annuler",
    vitrine_links:    "Mes liens",
    vitrine_vwa:      "Mes Vwa",
    vitrine_score:    "Score RMN",
    vitrine_reach:    "Portée réseau",
    vitrine_level:    "Niveau",
    vitrine_since:    "Membre depuis",
    vitrine_coach:    "Coach",
    vitrine_add_link: "+ Ajouter un lien",
    vitrine_add_vwa:  "+ Ajouter un Vwa",
    vitrine_visibility: "Visibilité de la Vitrine",
    vitrine_score_public: "Afficher le score publiquement",

    links_contact:    "Me contacter",
    links_pending:    "En attente...",
    links_message:    "Envoyer un message",
    links_connect:    "Connectez-vous pour contacter ce membre.",
    links_register:   "Rejoindre Rezo Mapou",
    links_login_cta:  "Se connecter",

    leaf_we_li:       "Vu",
    leaf_apresye:     "Apprécié",
    leaf_konekte:     "Connecté",
    leaf_enspire:     "Inspiré",
    leaf_angaje:      "Engagé",
    leaf_we_li_tip:   "J'ai remarqué ceci",
    leaf_apresye_tip: "Cela a de la valeur pour moi",
    leaf_konekte_tip: "Cela parle à mon expérience",
    leaf_enspire_tip: "Cela change ma façon de penser",
    leaf_angaje_tip:  "Je vais agir grâce à ceci",

    val_trusted:      "Je lui fais confiance",
    val_active:       "Je l'ai vu(e) actif/active",
    val_reliable:     "Fiable — a livré",
    val_give:         "Valider ce membre",
    val_revoke:       "Retirer la validation",
    val_count:        "Validations reçues",

    coach_request:    "Demander un coaching",
    coach_offer:      "Proposer un coaching",
    coach_accept:     "Accepter",
    coach_decline:    "Refuser",
    coach_pending:    "En attente",
    coach_active:     "Coaching actif",
    coach_expires:    "Expire le",

    invite_targeted:  "Inviter quelqu'un",
    invite_open:      "Générer un lien d'invitation",
    invite_phone_ph:  "Numéro de la personne à inviter",
    invite_send:      "Envoyer l'invitation",
    invite_copy:      "Copier le lien",
    invite_copied:    "Copié !",

    ad_l1_name:       "Clair",
    ad_l2_name:       "Argent",
    ad_l3_int_name:   "Or",
    ad_l3_ext_name:   "Platine",
    ad_shared_name:   "Partagé",
    ad_dedicated_name:"Dédié",
    ad_message_ph:    "Votre message (max 80 caractères)",
    ad_points:        "Points",
    ad_activate:      "Activer",
    ad_deactivate:    "Désactiver",
    ad_add_points:    "Ajouter des points",

    plt_whatsapp:     "WhatsApp",
    plt_facebook:     "Facebook",
    plt_tiktok:       "TikTok",
    plt_instagram:    "Instagram",
    plt_youtube:      "YouTube",
    plt_linkedin:     "LinkedIn",
    plt_moncash:      "MonCash",
    plt_natcash:      "NatCash",
    plt_website:      "Site web",
    plt_other:        "Autre lien",

    btn_back:         "← Retour",
    btn_close:        "Fermer",
    btn_confirm:      "Confirmer",
    btn_loading:      "Chargement...",
    lbl_or:           "ou",
    lbl_optional:     "optionnel",
    lbl_required:     "*",
    lbl_new:          "Nouveau",
    lbl_verified:     "✓ Vérifié(e)",
    lbl_unverified:   "Non vérifié(e)",

    legal_terms:      "Conditions d'utilisation",
    legal_privacy:    "Confidentialité",
    legal_copyright:  "Droits d'auteur",
    legal_rights:     "© 2026 Rezo Mapou Nasyonal. Tous droits réservés.",
  },

  en: {
    err_404_page_title: "404 — Pgae not Found",
    err_404_title: "Page Not Found",
    err_404_msg: "Sorry, the page you are looking for does not exist or has been moved.",
    err_back_home: "Back to Home",
  
    pay_section_title: "Payment",
    pay_hint:          "For when we have to pay you",
    f_payment_ph:      "8 digits",
    f_sect_identity:   "👤 Identity",
    f_sect_social:     "🔗 Social networks",
    pay_section_title: "💰 Payment",
    pay_method_title:  "Your choice",
    plt_moncash:       "MonCash",
    plt_natcash:       "NatCash",
    
    site_name:        "Rezo Mapou Nasyonal",
    site_tagline:     "The Roots of Haiti",
    site_abbr:        "RMN",
    loading_msg:   "Loading ...",
    
    nav_home:         "Home",
    nav_register:     "Register",
    nav_login:        "Login",
    nav_dashboard:    "Dashboard",
    nav_directory:    "Directory",
    nav_profile:      "My Vitrine",
    nav_logout:       "Log out",

    level_0:          "Rasin",
    level_1:          "Verified",
    level_2:          "Recognized",
    level_coach:      "Coach",

    vis_public:       "Public",
    vis_members:      "Members only",
    vis_trust:        "Trust Circle",
    vis_private:      "Private",

    reg_title:        "Become a Rasin Mapou",
    reg_subtitle:     "Free registration. Open to everyone.",
    f_firstname:      "First name",
    f_lastname:       "Last name",
    f_phone:          "Phone number",
    f_phone_ph:       "+509 3701 2345",
    f_phone_hint:     "International format — unique per member",
    f_phone_exists:   "This number is already registered.",
    f_phone_ok:       "✓ Number available",
    f_phone_invalid:  "Invalid number. Use international format.",
    f_email:          "Email address",
    f_email_ph:       "you@example.com",
    f_email_hint:     "To verify your account",
    f_country:        "Country",
    f_country_ph:     "— Choose your country —",
    f_dept:           "Department",
    f_dept_ph:        "— Choose a department —",
    f_commune:        "Commune",
    f_commune_ph:     "— Choose a commune —",
    f_city:           "City",
    f_city_ph:        "Miami, New York, Montreal...",
    f_state:          "State / Province",
    f_state_ph:       "Florida, Quebec...",
    f_lang:           "Preferred language",
    f_submit:         "Register now",
    f_submitting:     "Submitting...",
    f_success:        "Registration successful! Check your email.",
    f_error:          "An error occurred. Please try again.",
    f_required:       "Required field",

    login_title:      "Log in to your account",
    login_subtitle:   "We will send a link to your email.",
    login_ph:         "Phone or email",
    login_btn:        "Send login link",
    login_sent:       "Link sent! Check your email.",
    login_not_found:  "Account not found.",

    verify_title:     "Verifying your account...",
    verify_success:   "Account verified! You can now log in.",
    verify_expired:   "Link expired. Request a new one.",
    verify_invalid:   "Invalid link.",
    verify_redirecting: "Redirecting to your Vitrine...",

    dash_title:       "Rezo Mapou Dashboard",
    dash_subtitle:    "Live registrations",
    dash_members:     "Roots Registered",
    dash_coaches:     "Active Coaches",
    dash_depts:       "Departments",
    dash_communes:    "Communes",
    dash_by_dept:     "By Department",
    dash_by_commune:  "By Commune — Top 10",
    dash_refresh:     "⟳ Refresh",
    dash_updated:     "Last updated",
    dash_loading:     "Loading data...",
    dash_error:       "Connection error. Please refresh.",
    dash_no_data:     "No data yet.",

    vitrine_title:    "My Vitrine",
    vitrine_edit:     "Edit",
    vitrine_save:     "Save",
    vitrine_cancel:   "Cancel",
    vitrine_links:    "My links",
    vitrine_vwa:      "My Vwa",
    vitrine_score:    "RMN Score",
    vitrine_reach:    "Network reach",
    vitrine_level:    "Level",
    vitrine_since:    "Member since",
    vitrine_coach:    "Coach",
    vitrine_add_link: "+ Add a link",
    vitrine_add_vwa:  "+ Add a Vwa",
    vitrine_visibility: "Vitrine visibility",
    vitrine_score_public: "Show score publicly",

    links_contact:    "Contact me",
    links_pending:    "Pending...",
    links_message:    "Send message",
    links_connect:    "Log in to contact this member.",
    links_register:   "Join Rezo Mapou",
    links_login_cta:  "Log in",

    leaf_we_li:       "Seen",
    leaf_apresye:     "Appreciated",
    leaf_konekte:     "Connected",
    leaf_enspire:     "Inspired",
    leaf_angaje:      "Engaged",
    leaf_we_li_tip:   "I noticed this",
    leaf_apresye_tip: "This has value to me",
    leaf_konekte_tip: "This speaks to my experience",
    leaf_enspire_tip: "This changed how I think",
    leaf_angaje_tip:  "I am taking action because of this",

    val_trusted:      "I trust this person",
    val_active:       "I have seen them active",
    val_reliable:     "Reliable — delivered",
    val_give:         "Validate this member",
    val_revoke:       "Remove validation",
    val_count:        "Validations received",

    coach_request:    "Request coaching",
    coach_offer:      "Offer coaching",
    coach_accept:     "Accept",
    coach_decline:    "Decline",
    coach_pending:    "Pending",
    coach_active:     "Coaching active",
    coach_expires:    "Expires",

    invite_targeted:  "Invite someone",
    invite_open:      "Generate invite link",
    invite_phone_ph:  "Phone number of person to invite",
    invite_send:      "Send invitation",
    invite_copy:      "Copy link",
    invite_copied:    "Copied!",

    ad_l1_name:       "Clear",
    ad_l2_name:       "Silver",
    ad_l3_int_name:   "Gold",
    ad_l3_ext_name:   "Platinum",
    ad_shared_name:   "Shared",
    ad_dedicated_name:"Dedicated",
    ad_message_ph:    "Your message (max 80 characters)",
    ad_points:        "Points",
    ad_activate:      "Activate",
    ad_deactivate:    "Deactivate",
    ad_add_points:    "Add points",

    plt_whatsapp:     "WhatsApp",
    plt_facebook:     "Facebook",
    plt_tiktok:       "TikTok",
    plt_instagram:    "Instagram",
    plt_youtube:      "YouTube",
    plt_linkedin:     "LinkedIn",
    plt_moncash:      "MonCash",
    plt_natcash:      "NatCash",
    plt_website:      "Website",
    plt_other:        "Other link",

    btn_back:         "← Back",
    btn_close:        "Close",
    btn_confirm:      "Confirm",
    btn_loading:      "Loading...",
    lbl_or:           "or",
    lbl_optional:     "optional",
    lbl_required:     "*",
    lbl_new:          "New",
    lbl_verified:     "✓ Verified",
    lbl_unverified:   "Unverified",

    legal_terms:      "Terms of Use",
    legal_privacy:    "Privacy Policy",
    legal_copyright:  "Copyright",
    legal_rights:     "© 2026 Rezo Mapou Nasyonal. All rights reserved.",
  },
};

// ── LANGUAGE UTILITIES ────────────────────────────────────────────────────

/**
 * Returns the current language from localStorage, defaulting to config default.
 */
function getCurrentLang() {
  return localStorage.getItem(RMN_CONFIG.LOCALSTORAGE_LANG_KEY)
    || RMN_CONFIG.DEFAULT_LANG;
}

/**
 * Applies language to all [data-s] elements, updates SEO tags,
 * updates <html lang> attribute, and marks active language button.
 * Call on every page load and on language switch.
 */
function L(lang, pageKey) {
  lang = lang || getCurrentLang();
  pageKey = pageKey || 'home';

  // Persist to localStorage
  localStorage.setItem(RMN_CONFIG.LOCALSTORAGE_LANG_KEY, lang);

  const t  = STRINGS[lang]  || STRINGS[RMN_CONFIG.DEFAULT_LANG];
  const s  = SEO[lang]      || SEO[RMN_CONFIG.DEFAULT_LANG];
  const pg = s[pageKey]     || s.home;

  // Update all [data-s] elements
  document.querySelectorAll('[data-s]').forEach(el => {
    const key = el.getAttribute('data-s');
    if (t[key] !== undefined) {
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.placeholder = t[key];
      } else {
        el.textContent = t[key];
      }
    }
  });

  // Update [data-ph] placeholders separately
  document.querySelectorAll('[data-ph]').forEach(el => {
    const key = el.getAttribute('data-ph');
    if (t[key] !== undefined) el.placeholder = t[key];
  });

  // Update SEO tags
  document.title = pg.title;
  _setMeta('description', pg.description);
  _setMeta('og:title',    pg.og_title,    true);
  _setMeta('og:description', pg.og_desc,  true);
  _setMeta('og:image',    pg.og_image,    true);
  _setMeta('og:url',      window.location.href, true);
  _setMeta('twitter:card', 'summary_large_image', true);

  // Update html lang attribute
  document.documentElement.lang = lang;

  // Update language switcher buttons
  document.querySelectorAll('[data-lang-btn]').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-lang-btn') === lang);
  });
}

function _setMeta(name, content, isProperty = false) {
  if (!content) return;
  const attr = isProperty ? 'property' : 'name';
  let el = document.querySelector(`meta[${attr}="${name}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

/**
 * Shortcut: get a string in the current language.
 */
function s(key) {
  const lang = getCurrentLang();
  const t = STRINGS[lang] || STRINGS[RMN_CONFIG.DEFAULT_LANG];
  return t[key] || key;
}

// ── HAITIAN NAME POOLS ────────────────────────────────────────────────────
// Used by randomHaitianName() for seed data generation.
// 70 female + 70 male first names, 100 surnames.
// All authentic Haitian names — religiously neutral.

const FAKE_FIRSTNAMES_F = [
  "Marie","Roseline","Nadège","Sophia","Kettely","Farah","Mireille","Edwige","Guerda",
  "Junie","Marlène","Yvelise","Carline","Gisèle","Lunise","Claudine","Danièle","Micheline",
  "Lourdes","Carmelle","Solange","Géraldine","Nathalie","Josiane","Magalie","Yanick","Manoucheka",
  "Dieulita","Rosemide","Maudeline","Wideline","Gesline","Kensia","Djoudeline","Mirlène",
  "Jocelyne","Franciose","Guerdine","Ruthnie","Edeline","Nerlande","Rosemitha","Dieusine",
  "Myrlène","Lucianne","Yolanda","Ketline","Marilène","Lovely","Célanie","Nadine","Fleurette",
  "Berline","Gina","Adeline","Christelle","Wisline","Rosaline","Emmanuella","Luce","Joëlle",
  "Daphney","Gaëlle","Fabiola","Priscilla","Angeline","Venise","Florette","Marceline","Ange"
];

const FAKE_FIRSTNAMES_M = [
  "Jean","Claude","Frantz","Patrick","Dieuseul","Luckson","Roberson","Widler","Kervens",
  "Samson","Joël","Renald","Hervé","Dieudonne","Lionel","Guerlain","Wesly","Kenson",
  "Djimy","Nerlson","Wadson","Gérald","Wilner","Fednard","Edens","Reginald","Jocelyn",
  "Roosvelt","Mackenson","Ricot","Stevenson","Guèdson","Franckly","Wilfrid","Dieumaitre",
  "Nesly","Roodmy","Andremane","Wisly","Garry","Jhony","Enock","Danrold","Phito",
  "Chesnel","Cliford","Ansy","Guerby","Mercius","Roobenson","Juslain","Précius",
  "Wilderson","Elphège","Oriol","Manès","Antenor","Dumé","Occident","Théophile",
  "Valcin","Wenders","Kerby","Walky","Guichard","Stéphano","Yvon","Elie","Rigaud"
];

const FAKE_LASTNAMES = [
  "Desroches","Baptiste","Pierre","Mentor","Joseph","Celestin","Duval","Lamarre","François",
  "Blanc","Charles","Estimé","Dorismond","Augustin","Prophète","Casimir","Sainvil","Thermidor",
  "Beaubrun","Toussaint","Lubin","Dorsainvil","Noël","Hyppolite","Lafortune","Morisseau",
  "Belizaire","Volcy","Cadet","Dorcé","Alexis","Étienne","Janvier","Philogène","Présumé",
  "Duvivier","Napoléon","Bazile","Désir","Lindor","Moïse","Jeanty","Bertrand","Métellus",
  "Chéry","Vernet","Lafleur","Compas","Solage","Dérivois","Décossard","Jeannot","Lapierre",
  "Dorival","Fonrose","Vilnord","Belony","Dossous","Renéus","Labranche","Bijou","Dieugrand",
  "Valcourt","Altidor","Désulmé","Bonhomme","Décimus","Mervilus","Sainristil","Gédéon",
  "Lafrance","Léger","Romelus","Compère","Délice","Osias","Cajuste","Démosthène","Délicieux",
  "Chatelain","Brutus","Vilfranco","Mesidor","Dautruche","Philidor","Prévilmé","Cantave",
  "Mondésir","Guerrier","Aristide","Debrosse","Bordes","Caséus","Dalexis","Gaspard",
  "Laguerre","Monpoint","Cyprien","Fleurant","Sainvilus","Cenatus","Rouzier"
];

const FAKE_ACTIVITIES = [
  "Machann dlo","Machann manje","Machann legim","Boutik","Machann frèt","Kwafè",
  "Mekanisyen","Machann rad","Epicerie","Machann poul","Machann chabon","Boulanje",
  "Machann fritay","Machann ji","Tèlkominikasyon","Machann pwason","Koutirye",
  "Machann soulye","Fòjon","Chapantye","Machann fig","Machann pen","Estetisyen",
  "Machann dous","Plonbye","Elektrisyen","Machann kokoye","Machann kann",
  "Pwofesè","Etidyan","Enfimyè","Doktè","Jounalis","Ajan kominotè",
  "Chauffè","Agrikilti","Pechè","Direktè lekòl","Travayè sante","Manm dyaspora",
  "Sekretè","Kontab","Enjenyè","Avoka","Pastè","Kominikasyon"
];

// ── SESSION-LEVEL DEDUPLICATION ───────────────────────────────────────────
// Prevents repeated names within a single browser session.

const _usedNames = new Set();

/**
 * Returns a unique {prenom, nom} pair from the Haitian name pools.
 * Deduplicates within the session. Clears and retries if pool exhausted.
 */
function randomHaitianName() {
  const isFemale  = Math.random() < 0.52;
  const firstPool = isFemale ? FAKE_FIRSTNAMES_F : FAKE_FIRSTNAMES_M;
  let attempts = 0;

  while (attempts < 50) {
    const prenom = firstPool[Math.floor(Math.random() * firstPool.length)];
    const nom    = FAKE_LASTNAMES[Math.floor(Math.random() * FAKE_LASTNAMES.length)];
    const key    = prenom + '|' + nom;

    if (!_usedNames.has(key)) {
      _usedNames.add(key);
      return { prenom, nom };
    }
    attempts++;
  }

  // Pool exhausted for this session — reset and continue
  _usedNames.clear();
  const prenom = firstPool[Math.floor(Math.random() * firstPool.length)];
  const nom    = FAKE_LASTNAMES[Math.floor(Math.random() * FAKE_LASTNAMES.length)];
  return { prenom, nom };
}

// ── SEED DATA HELPERS ─────────────────────────────────────────────────────

/**
 * Returns a weighted random location {dept, commune} from HAITI data.
 * Higher COMMUNE_WEIGHTS values appear more frequently.
 */
function weightedLocation() {
  const pool = [];
  Object.entries(HAITI).forEach(([dept, communes]) => {
    communes.forEach(commune => {
      const weight = COMMUNE_WEIGHTS[commune] || 1;
      for (let i = 0; i < weight; i++) {
        pool.push({ dept, commune });
      }
    });
  });
  return pool[Math.floor(Math.random() * pool.length)];
}

/**
 * Builds a fake sentinelle registration payload.
 * Used by dashboard auto-seed and seeddata.html.
 */
function makeFakeMember(isCoachType) {
  const { prenom, nom } = randomHaitianName();
  const loc  = weightedLocation();
  const acts = FAKE_ACTIVITIES;
  const pays = ['MCH', 'MCH', 'NCH', 'CSH', 'MCH'];
  const ts   = Date.now();

  if (isCoachType) {
    return {
      action:       'register',
      type:         'coach',
      prenom,
      nom,
      email:        `c${ts}@rmn-seed.net`,
      phone:        `+509${Math.floor(30000000 + Math.random() * 9999999)}`,
      country:      'Haïti',
      departement:  loc.dept,
      departement_nom: loc.dept,
      commune:      loc.commune,
      commune_nom:  loc.commune,
      langue:       'ht',
      source:       'seed_auto',
      is_real:      'false',
    };
  }

  return {
    action:       'register',
    prenom,
    nom,
    email:        `s${ts}@rmn-seed.net`,
    phone:        `+509${Math.floor(30000000 + Math.random() * 9999999)}`,
    country:      'Haïti',
    departement:  loc.dept,
    departement_nom: loc.dept,
    commune:      loc.commune,
    commune_nom:  loc.commune,
    activite:     acts[Math.floor(Math.random() * acts.length)],
    paiement:     pays[Math.floor(Math.random() * pays.length)],
    langue:       'ht',
    source:       'seed_auto',
    is_real:      'false',
  };
}

/**
 * Sends a fake registration to the backend.
 * mode:'no-cors' — cannot read response, but submission goes through.
 */
async function sendFakeMember(isCoachType) {
  const data = makeFakeMember(isCoachType);
  const params = new URLSearchParams();
  Object.entries(data).forEach(([k, v]) => params.append(k, String(v)));
  try {
    await fetch(RMN_CONFIG.SCRIPT_URL, {
      method: 'POST',
      body:   params,
      mode:   'no-cors',
    });
  } catch(e) {
    // Silent fail — seed data is non-critical
  }
}

/**
 * Auto-seed trigger: called on dashboard page load.
 * 25% chance of adding 1 fake member.
 * 15% of those are coach-type.
 * Waits 1.5s after seeding for sheet to update before fetching stats.
 */
async function autoSeed() {
  if (Math.random() >= STRINGS.SEED_PROBABILITY) return;
  const isCoach = Math.random() < RMN_CONFIG.SEED_COACH_PROBABILITY;
  await sendFakeMember(isCoach);
  await new Promise(r => setTimeout(r, 1500));
}

// ── LEGAL ROUTER ──────────────────────────────────────────────────────────
// Each legal page calls its router on load.
// Router reads localStorage lang and redirects to the monolingual file.

function legalRouter(page) {
  const lang = getCurrentLang();
  const validPages = ['terms', 'privacy', 'copyright'];
  const validLangs = ['ht', 'fr', 'en'];
  const p = validPages.includes(page)  ? page : 'terms';
  const l = validLangs.includes(lang)  ? lang  : 'ht';
  window.location.replace(`${p}-${l}.html`);
}

// ── PLATFORM HELPERS ──────────────────────────────────────────────────────

/**
 * Returns the display label for a platform key in the current language.
 */
function platformLabel(key) {
  const lang = getCurrentLang();
  const t = STRINGS[lang] || STRINGS[RMN_CONFIG.DEFAULT_LANG];
  const labelKey = 'plt_' + key.toLowerCase();
  return t[labelKey] || key;
}

/**
 * Returns the icon for a platform key from RMN_CONFIG.PLATFORMS.
 */
function platformIcon(key) {
  const p = STRINGS.PLATFORMS.find(pl => pl.key === key);
  return p ? p.icon : '🔗';
}

/**
 * Builds a full URL from a platform key and user-entered value.
 * Handles prefix logic (e.g. wa.me/ for WhatsApp).
 */
function buildPlatformUrl(key, value) {
  if (!value) return '';
  const p = STRINGS.PLATFORMS.find(pl => pl.key === key);
  if (!p || !p.prefix) return value;
  // Don't double-prefix if user already entered the full URL
  if (value.startsWith('http') || value.startsWith(p.prefix)) return value;
  return p.prefix + value;
}

function switchLang(lang) {
  // 1. Set the 'lang' attribute on the HTML tag for accessibility
  document.documentElement.lang = lang;
  
  // 2. Identify the page (e.g., 'register')
  const pageKey = document.body.id || 'home';

  // 3. Run your existing L function to update the UI and SEO
  if (typeof L === "function") {
    L(lang, pageKey);
  }

  // 4. Save preference using your existing config key
  localStorage.setItem(RMN_CONFIG.LOCALSTORAGE_LANG_KEY, lang);

  console.log("Language switched to: " + lang);
}

// THE CRITICAL LINE:
// This makes ONLY this one function public so your HTML buttons work.
window.switchLang = switchLang;
