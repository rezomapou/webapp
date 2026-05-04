// ============================================================
// config.js — Rezo Mapou Nasyonal
// ============================================================

const RMN_CONFIG = {

  // ── SETTINGS ──────────────────────────────────────────────
  SETTINGS: {
    LOADER_STYLE: 'ECO_SPINNER'
  },

  // ── PATHS ────────────────────────────────────────────────
  PATHS: {
    COMPONENTS: 'components',
    STYLES: 'styles',
    CODES: 'codes'
  },

  // ── COMPONENTS ───────────────────────────────────────────
  COMPONENTS: {

    LOADER: {
      js: 'components/loader/loader.js',
      css: 'components/loader/loader.css',
      html: 'components/loader/loader.html',
      containerId: 'rmn-loader-placeholder'
    },

    LANG: {
      html: 'components/lang/lang.html',
      css: 'components/lang/lang.css',
      js: 'components/lang/lang.js',
      containerId: 'lang-bar'
    },

    HEADER: {
      html: 'components/header/header.html',
      css: 'components/header/header.css',
      js: 'components/header/header.js',
      containerId: 'header-placeholder'
    },

    NAV: {
      html: 'components/nav/nav.html',
      css: 'components/nav/nav.css',
      js: 'components/nav/nav.js',
      containerId: 'nav-bar-container'
    },

    NAVSTATS: {
      html: 'components/navstats/navstats.html',
      css: 'components/navstats/navstats.css',
      js: 'components/navstats/navstats.js',
      containerId: 'nav-stats-container'
    },
    
NAVSTATS_DATA: [
  { key: 'stat_members', value: 128 },
  { key: 'stat_actions', value: 54 },
  { key: 'stat_points', value: 876 }
],
    FEATURE_BLOCK: {
      html: 'components/features/features.html',
      css: 'components/features/features.css',
      js: 'components/features/features.js',
      containerId: 'features-placeholder'
    },

    BLOCKSTATS: {
      html: 'components/blockstats/blockstats.html',
      css: 'components/blockstats/blockstats.css',
      js: 'components/blockstats/blockstats.js'
    }

  },

  // ── API ──────────────────────────────────────────────────
  API: {
    STATS: 'https://api.fatraselo.net/v1/global-stats'
  },

  // ── BACKEND ──────────────────────────────────────────────
  SCRIPT_URL: 'https://script.google.com/macros/s/AKfycbwiXRt79QnrSbep4pDXfHQ-l9StJt61HVcJQeiNY3FCRXEffTF5mJOnVcO3ghECNqqiKg/exec',
  SHEET_ID: '1-1C3v-hO7r_mACqQffAFUx0amXY1H9oJGbWRruz1JHw',
  ENV: 'production',

  // ── TRUST LEVELS ─────────────────────────────────────────
  LEVEL_KEYS: ['RASIN', 'VERIFYE', 'REKONNET'],

  LEVEL2_L1_VOTES: 5,
  LEVEL2_L2_VOTES: 2,
  LEVEL2_VWA_COUNT: 10,

  // ── VALIDATION ───────────────────────────────────────────
  VALIDATION_DAILY_LIMIT: 10,
  VALIDATION_TYPES: ['TRUSTED', 'ACTIVE', 'RELIABLE'],
  VALIDATION_WEIGHTS: {
    TRUSTED: 1,
    ACTIVE: 2,
    RELIABLE: 3
  }

};

// 🔑 CRITICAL FIX: alias expected by your app
const config_const = RMN_CONFIG;
