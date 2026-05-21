// ============================================================
// config.gs — Rezo Mapou Nasyonal — Apps Script Backend
// Single source of truth for all backend configuration.
// All other .gs files reference CONFIG keys by name only.
// Edit ONLY this file when changing sheet structure or rules.
// ============================================================

var SITE_CONFIG = SITE_CONFIG || {

  // ── SPREADSHEET ───────────────────────────────────────────
  SS_ID: '1-1C3v-hO7r_mACqQffAFUx0amXY1H9oJGbWRruz1JHw',

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

  // No TOP_AD/BOTTOM_AD until ads component is built
  PAGES: {
    index:      { components: ['HEADER', 'FEATURE_BLOCK', 'FOOTER'] },
    register:   { components: ['HEADER', 'REGISTER_BLOCK', 'FOOTER'] },
    contact:    { components: ['HEADER', 'CONTACT_BLOCK',  'FOOTER'] },
    login:      { components: ['HEADER', 'LOGIN_BLOCK',    'FOOTER'] },
    profile:    { components: ['HEADER', 'PROFILE_BLOCK',  'FOOTER'] },
    verify:     { components: ['HEADER', 'VERIFY_BLOCK',   'FOOTER'] },
    dashboard:  { components: ['HEADER', 'DASHBOARD_BLOCK','FOOTER'] },
    sitestats:  { components: ['HEADER', 'SITESTATS',      'FOOTER'] },
    blockstats: { components: ['HEADER', 'BLOCKSTATS',     'FOOTER'] },
    terms:      { components: ['HEADER', 'DOC_BLOCK', 'FOOTER'], content: 'terms'     },
    privacy:    { components: ['HEADER', 'DOC_BLOCK', 'FOOTER'], content: 'privacy'   },
    copyright:  { components: ['HEADER', 'DOC_BLOCK', 'FOOTER'], content: 'copyright' }
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

  ADS: {
    top:    { active: false, type: 'text', content: '' },
    bottom: { active: false, type: 'text', content: '' }
  },

  ANALYTICS: { enabled: true, sheet_tab: 'analytics' },

  COMPONENTS: {

    BASECOMPONENT: { js: 'basecomponent/basecomponent.js' },

    LOADER: {
      js: 'loader/loader.js', css: 'loader/loader.css',
      html: 'loader/loader.html', containerId: 'loader-container'
    },

    LANG: {
      html: 'lang/lang.html', css: 'lang/lang.css',
      js: 'lang/lang.js', containerId: 'lang-container'
    },

    HEADER: {
      html: 'header/header.html', css: 'header/header.css',
      js: 'header/header.js', containerId: 'header-container'
    },

    FEATURE_BLOCK: {
      html: 'features/features.html', css: 'features/features.css',
      js: 'features/features.js', containerId: 'features-container'
    },

    REGISTER_BLOCK: {
      html: 'register/register.html', css: 'register/register.css',
      js: 'register/register.js', containerId: 'register-container'
    },

    CONTACT_BLOCK: {
      html: 'contact/contact.html', css: 'contact/contact.css',
      js: 'contact/contact.js', containerId: 'contact-container'
    },

    LOGIN_BLOCK: {
      html: 'login/login.html', css: 'login/login.css',
      js: 'login/login.js', containerId: 'login-container'
    },

    PROFILE_BLOCK: {
      html: 'profile/profile.html', css: 'profile/profile.css',
      js: 'profile/profile.js', containerId: 'profile-container'
    },

    VERIFY_BLOCK: {
      html: 'verify/verify.html', css: 'verify/verify.css',
      js: 'verify/verify.js', containerId: 'verify-container'
    },

    DASHBOARD_BLOCK: {
      html: 'dashboard/dashboard.html', css: 'dashboard/dashboard.css',
      js: 'dashboard/dashboard.js', containerId: 'dashboard-container'
    },

    BLOCKSTATS: {
      html: 'blockstats/blockstats.html', css: 'blockstats/blockstats.css',
      js: 'blockstats/blockstats.js', containerId: 'blockstats-container'
    },

    SITESTATS: {
      html: 'sitestats/sitestats.html', css: 'sitestats/sitestats.css',
      js: 'sitestats/sitestats.js', containerId: 'sitestats-container'
    },

    DOC_BLOCK: {
      html: 'docblock/docblock.html', css: 'docblock/docblock.css',
      js: 'docblock/docblock.js', containerId: 'doc-container'
    },

    ANALYTICS: {
      js: 'analytics/analytics.js', containerId: 'analytics-container'
    },

    TOP_AD: {
      html: 'ads/ad.html', css: 'ads/ad.css',
      js: 'ads/ad.js', containerId: 'top-ad-container', placement: 'top'
    },

    BOTTOM_AD: {
      html: 'ads/ad.html', css: 'ads/ad.css',
      js: 'ads/ad.js', containerId: 'bottom-ad-container', placement: 'bottom'
    },

    FOOTER: {
      html: 'footer/footer.html', css: 'footer/footer.css',
      js: 'footer/footer.js', containerId: 'footer-container'
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
      { key: 'footer_copyright', action: 'copyright' },
      { key: 'footer_privacy',   action: 'privacy'   },
      { key: 'footer_terms',     action: 'terms'      }
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
  LOCALSTORAGE_TOKEN_KEY: 'rmn_token',
  LOCALSTORAGE_ID_KEY:    'rmn_member_id',
  SEED_COACH_PROBABILITY: 0.15,

  // ── TAB NAMES ─────────────────────────────────────────────
  TABS: {
    RAW:         'GS_Raw',
    MEMBERS:     'GS_Members',
    ASSIGNMENTS: 'GS_Assignments',
    VALIDATIONS: 'GS_Validations',
    ACTIONS:     'GS_Actions',
    LINKS:       'GS_Links',
    FILES:       'GS_Files',
    REQUESTS:    'GS_Requests',
    ADS:         'GS_Ads',
    FAKE:        'Fake_Data',
  },

  // ── COLUMN HEADERS ────────────────────────────────────────
  HEADERS: {

    // UPDATED: Added Genre and Payment_Type after NatCash
    RAW: [
      'Timestamp', 'Phone', 'First_Name', 'Last_Name', 'Email',
      'Country', 'Dept_Code', 'Dept_Nom', 'Commune_Code', 'Commune_Nom',
      'City', 'State_Province', 'Is_In_Haiti',
      'Facebook', 'Instagram', 'TikTok', 'YouTube', 'Website',
      'WhatsApp', 'LinkedIn', 'MonCash', 'NatCash',
      'Genre', 'Payment_Type',
      'Language', 'Source', 'Ref_Code', 'Invite_Type',
      'Honeypot', 'Is_Real', 'Status'
    ],

    MEMBERS: [
      'Member_ID', 'Phone', 'First_Name', 'Last_Name', 'Email',
      'Email_Verified', 'Trust_Level', 'Language_Pref',
      'Country', 'Dept_Code', 'Dept_Nom', 'Commune_Code', 'Commune_Nom',
      'City', 'State_Province', 'Is_In_Haiti',
      'Is_Real', 'Vitrine_Visibility', 'Score_Public',
      'RMN_Score', 'Density', 'Integrity', 'Impact',
      'Verification_Token', 'Token_Expiry',
      'Session_Token', 'Session_Expiry',
      'Coach_ID', 'Coach_Since', 'Coach_Expires',
      'Activity_Level', 'Activity_Period_Start',
      'Created_At', 'Updated_At'
    ],

    ASSIGNMENTS: [
      'Assign_ID', 'From_Member_ID', 'To_Member_ID',
      'Assignment_Type', 'Status', 'Created_At'
    ],

    VALIDATIONS: [
      'Validation_ID', 'From_Member_ID', 'To_Member_ID',
      'Validation_Type', 'Note', 'Created_At', 'Revoked_At', 'Revoke_Note'
    ],

    ACTIONS: [
      'Action_ID', 'Member_ID', 'Target_ID', 'Action_Type',
      'Value', 'Platform', 'URL', 'Timestamp'
    ],

    LINKS: [
      'Link_ID', 'Member_ID', 'Platform', 'URL',
      'Label', 'Sort_Order', 'Is_Active', 'Created_At'
    ],

    FILES: [
      'File_ID', 'Member_ID', 'File_Type',
      'Drive_URL', 'Created_At'
    ],

    REQUESTS: [
      'Request_ID', 'Sender_ID', 'Recipient_ID',
      'Request_Type',
      'Status',
      'Ref_Phone',
      'Note',
      'Created_At', 'Expires_At', 'Resolved_At'
    ],

    ADS: [
      'Ad_ID', 'Coach_ID', 'Ad_Level',
      'Message', 'Link_URL', 'Link_Type',
      'Points_Remaining', 'Points_Total',
      'Is_Active', 'Target_Zone', 'Target_Interest',
      'Views', 'Clicks_Int', 'Clicks_Ext',
      'Created_At', 'Updated_At'
    ],

    FAKE: [
      'Timestamp', 'Type', 'First_Name', 'Last_Name',
      'Dept_Nom', 'Commune_Nom', 'Activity', 'Source'
    ],
  },

  // ── COLUMN INDEX MAPS (0-based) ───────────────────────────
  // UPDATED: Genre=22, Payment_Type=23, all others shifted +2
  COLS_RAW: {
    TIMESTAMP:     0,
    PHONE:         1,
    FIRST_NAME:    2,
    LAST_NAME:     3,
    EMAIL:         4,
    COUNTRY:       5,
    DEPT_CODE:     6,
    DEPT_NOM:      7,
    COMMUNE_CODE:  8,
    COMMUNE_NOM:   9,
    CITY:          10,
    STATE:         11,
    IS_IN_HAITI:   12,
    FACEBOOK:      13,
    INSTAGRAM:     14,
    TIKTOK:        15,
    YOUTUBE:       16,
    WEBSITE:       17,
    WHATSAPP:      18,
    LINKEDIN:      19,
    MONCASH:       20,
    NATCASH:       21,
    GENRE:         22,
    PAYMENT_TYPE:  23,
    LANGUAGE:      24,
    SOURCE:        25,
    REF_CODE:      26,
    INVITE_TYPE:   27,
    HONEYPOT:      28,
    IS_REAL:       29,
    STATUS:        30,
  },

  COLS_MEMBERS: {
    MEMBER_ID:       0,
    PHONE:           1,
    FIRST_NAME:      2,
    LAST_NAME:       3,
    EMAIL:           4,
    EMAIL_VERIFIED:  5,
    TRUST_LEVEL:     6,
    LANGUAGE_PREF:   7,
    COUNTRY:         8,
    DEPT_CODE:       9,
    DEPT_NOM:        10,
    COMMUNE_CODE:    11,
    COMMUNE_NOM:     12,
    CITY:            13,
    STATE:           14,
    IS_IN_HAITI:     15,
    IS_REAL:         16,
    VITRINE_VIS:     17,
    SCORE_PUBLIC:    18,
    RMN_SCORE:       19,
    DENSITY:         20,
    INTEGRITY:       21,
    IMPACT:          22,
    VERIF_TOKEN:     23,
    TOKEN_EXPIRY:    24,
    SESSION_TOKEN:   25,
    SESSION_EXPIRY:  26,
    COACH_ID:        27,
    COACH_SINCE:     28,
    COACH_EXPIRES:   29,
    ACTIVITY_LEVEL:  30,
    ACTIVITY_START:  31,
    CREATED_AT:      32,
    UPDATED_AT:      33,
  },

  // ── BUSINESS RULES ────────────────────────────────────────
  RULES: {
    DEFAULT_COUNTRY_CODE:    '509',
    REQUIRED_PHONE_PREFIX:   '+',
    DRIVE_DOWNLOAD_PREFIX:   'https://drive.google.com/uc?export=download&id=',
    LEVEL2_L1_VOTES:         5,
    LEVEL2_L2_VOTES:         2,
    LEVEL2_VWA_COUNT:        10,
    VALIDATION_DAILY_LIMIT:  10,
    COACHING_DURATION_DAYS:  90,
    COACH_DURATION_DAYS:     30,
    ACTIVITY_PERIOD_DAYS:    30,
    ACTIVITY_MIN_COACHING:   2,
    ACTIVITY_HIGH_TIER:      4,
    ACTIVITY_HIGH_BONUS:     10,
    ACTIVITY_DECAY_DAYS:     45,
    INVITE_EXPIRY_DAYS:              30,
    INVITE_VELOCITY_THRESHOLD:       20,
    INVITE_VELOCITY_WINDOW_HOURS:    24,
    INVITE_VELOCITY_ACTION:          'PAUSE_AUTOVALIDATE',
    INVITE_MAX_PENDING:              100,
    TOKEN_EXPIRY_HOURS:      48,
    SESSION_EXPIRY_DAYS:     30,
    AD_MAX_LENGTH:           80,
    FROM_EMAIL:              'account.rezomapou@gmail.com',
    FROM_NAME:               'Rezo Mapou Nasyonal',
  },

  // ── STATUS VALUES ─────────────────────────────────────────
  STATUS: {
    PENDING:          'PENDING',
    PROCESSED:        'PROCESSED',
    DUPLICATE:        'DUPLICATE_PHONE',
    INVALID_PHONE:    'INVALID_PHONE',
    HONEYPOT:         'HONEYPOT',
    ERROR:            'ERROR',
    REQ_PENDING:      'PENDING',
    REQ_ACCEPTED:     'ACCEPTED',
    REQ_DECLINED:     'DECLINED',
    REQ_EXPIRED:      'EXPIRED',
    REQ_COMPLETED:    'COMPLETED',
    INV_MATCHED:      'AUTO_VALIDATED',
    INV_MISMATCH:     'PENDING_CONFIRM',
    INV_VELOCITY:     'VELOCITY_FLAGGED',
  },

  // ── ACTION TYPES ──────────────────────────────────────────
  ACTION_TYPES: {
    LEAF_WE_LI:         'LEAF_WE_LI',
    LEAF_APRESYE:       'LEAF_APRESYE',
    LEAF_KONEKTE:       'LEAF_KONEKTE',
    LEAF_ENSPIRE:       'LEAF_ENSPIRE',
    LEAF_ANGAJE:        'LEAF_ANGAJE',
    VWA_SUBMIT:         'VWA_SUBMIT',
    VWA_VIEW:           'VWA_VIEW',
    VITRINE_VISIT:      'VITRINE_VISIT',
    CONN_REQUEST:       'CONN_REQUEST',
    CONN_ACCEPT:        'CONN_ACCEPT',
    COACH_START:        'COACH_START',
    COACH_END:          'COACH_END',
    COACH_MILESTONE:    'COACH_MILESTONE',
    AD_VIEW:            'AD_VIEW',
    AD_CLICK_INT:       'AD_CLICK_INT',
    AD_CLICK_EXT:       'AD_CLICK_EXT',
    INVITE_SENT:        'INVITE_SENT',
    INVITE_ACCEPTED:    'INVITE_ACCEPTED',
    VALIDATION_GIVEN:   'VALIDATION_GIVEN',
    VALIDATION_REVOKED: 'VALIDATION_REVOKED',
  },

  // ── HEADER STYLES ─────────────────────────────────────────
  HEADER_BG:     '#1E4D2B',
  HEADER_FG:     '#FFFFFF',
  HEADER_WEIGHT: 'bold',
};
window.SITE_CONFIG  = SITE_CONFIG;
window.config_const = SITE_CONFIG;
