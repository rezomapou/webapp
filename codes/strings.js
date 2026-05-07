// ============================================================
// config.js — Rezo Mapou Nasyonal
// ============================================================

const SITE_CONFIG = {

  PATHS: {
    COMPONENTS: 'components',
    CODES:      'codes',
    STYLES:     'styles',
    DOCS:       'docs'
  },

  SETTINGS: {
    DEFAULT_LANG:    'ht',
    SUPPORTED_LANGS: ['ht', 'fr', 'en'],
    LOADER_STYLE:    'ECO_SPINNER',
    LOADER_MESSAGES: { ht: 'Ap chaje...', fr: 'Chargement...', en: 'Loading...' }
  },

  PAGES: {
    index:     { components: ['HEADER', 'FEATURE_BLOCK', 'FOOTER'] },
    contact:   { components: ['HEADER', 'CONTACT_BLOCK', 'FOOTER'] },
    register:  { components: ['HEADER', 'REGISTER_BLOCK', 'FOOTER'] },
    terms:     { components: ['HEADER', 'DOC_BLOCK', 'FOOTER'], content: 'terms'     },
    privacy:   { components: ['HEADER', 'DOC_BLOCK', 'FOOTER'], content: 'privacy'   },
    copyright: { components: ['HEADER', 'DOC_BLOCK', 'FOOTER'], content: 'copyright' },
    sitestats: { components: ['HEADER', 'SITESTATS', 'FOOTER'] },
    blockstats:{ components: ['HEADER', 'BLOCKSTATS', 'FOOTER'] },
    dashboard: { components: ['HEADER', 'FOOTER'] }
  },

  CONTACT: {
    phone:    '+509 4733 4565',
    whatsapp: '+509 4733 4565',
    emails: [
      { key: 'primary',     address: 'info@fatraselo.net',        active: true  },
      { key: 'complaints',  address: 'complaints@fatraselo.net',  active: false },
      { key: 'suggestions', address: 'suggestions@fatraselo.net', active: false }
    ]
  },

  ANALYTICS: { enabled: true, sheet_tab: 'analytics' },

  COMPONENTS: {

    BASECOMPONENT: { js: 'basecomponent/basecomponent.js' },

    LOADER: {
      js:          'loader/loader.js',
      css:         'loader/loader.css',
      html:        'loader/loader.html',
      containerId: 'loader-container'
    },

    LANG: {
      html:        'lang/lang.html',
      css:         'lang/lang.css',
      js:          'lang/lang.js',
      containerId: 'lang-container'
    },

    HEADER: {
      html:        'header/header.html',
      css:         'header/header.css',
      js:          'header/header.js',
      containerId: 'header-container'
    },

    AD_TOP: {
      html:        'ad/ad-top.html',
      css:         'ad/ad.css',
      js:          'ad/ad.js',
      containerId: 'ad-top-container'
    },

    FEATURE_BLOCK: {
      html:        'features/features.html',
      css:         'features/features.css',
      js:          'features/features.js',
      containerId: 'features-container'
    },

    BLOCKSTATS: {
      html:        'blockstats/blockstats.html',
      css:         'blockstats/blockstats.css',
      js:          'blockstats/blockstats.js',
      containerId: 'blockstats-container'
    },

    CONTACT_BLOCK: {
      html:        'contact/contact.html',
      css:         'contact/contact.css',
      js:          'contact/contact.js',
      containerId: 'contact-container'
    },

    REGISTER_BLOCK: {
      html:        'register/register.html',
      css:         'register/register.css',
      js:          'register/register.js',
      containerId: 'register-container'
    },

    DOC_BLOCK: {
      html:        'docblock/docblock.html',
      css:         'docblock/docblock.css',
      js:          'docblock/docblock.js',
      containerId: 'doc-container'
    },

    SITESTATS: {
      html:        'sitestats/sitestats.html',
      css:         'sitestats/sitestats.css',
      js:          'sitestats/sitestats.js',
      containerId: 'sitestats-container'
    },

    ANALYTICS: {
      js:          'analytics/analytics.js',
      containerId: 'analytics-container'
    },

    AD_BOTTOM: {
      html:        'ad/ad-bottom.html',
      css:         'ad/ad.css',
      js:          'ad/ad.js',
      containerId: 'ad-bottom-container'
    },

    FOOTER: {
      html:        'footer/footer.html',
      css:         'footer/footer.css',
      js:          'footer/footer.js',
      containerId: 'footer-container'
    }

  },

  DATA: {

    NAV_ITEMS: [
      { key: 'nav_home',     href: '/'               },
      { key: 'nav_about',    href: '/#ftab-filozofi' },
      { key: 'nav_program',  href: '/#ftab-program'  },
      { key: 'nav_register', href: '/register.html'  },
      { key: 'nav_contact',  href: '/contact.html'   }
    ],

    FOOTER_LINKS: [
      { key: 'footer_legal',   action: 'legal'   },
      { key: 'footer_privacy', action: 'privacy' },
      { key: 'footer_terms',   action: 'terms'   }
    ],

    FOOTER_META: { key: 'footer_meta' },

    PLATFORMS: [
      { key: 'facebook',  url: 'https://facebook.com/rezomapou' },
      { key: 'whatsapp',  url: 'https://wa.me/50947334565'      },
      { key: 'instagram', url: ''                                },
      { key: 'tiktok',    url: ''                                },
      { key: 'youtube',   url: ''                                },
      { key: 'linkedin',  url: ''                                }
    ]

  },

  API:        { STATS: 'https://api.fatraselo.net/v1/global-stats' },
  SCRIPT_URL: 'https://script.google.com/macros/s/AKfycbwiXRt79QnrSbep4pDXfHQ-l9StJt61HVcJQeiNY3FCRXEffTF5mJOnVcO3ghECNqqiKg/exec',
  SHEET_ID:   '1-1C3v-hO7r_mACqQffAFUx0amXY1H9oJGbWRruz1JHw',
  ENV:        'production',

  LEVEL_KEYS:             ['RASIN', 'VERIFYE', 'REKONNET'],
  LEVEL2_L1_VOTES:        5,
  LEVEL2_L2_VOTES:        2,
  LEVEL2_VWA_COUNT:       10,
  VALIDATION_DAILY_LIMIT: 10,
  VALIDATION_TYPES:       ['TRUSTED', 'ACTIVE', 'RELIABLE'],
  VALIDATION_WEIGHTS:     { TRUSTED: 1, ACTIVE: 2, RELIABLE: 3 },
  LOCALSTORAGE_LANG_KEY:  'rmn_lang',
  SEED_COACH_PROBABILITY: 0.15

};


