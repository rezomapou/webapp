// ============================================================
// config.js — Rezo Mapou Nasyonal (CLEAN BASELINE)
// ============================================================

const SITE_CONFIG = {

  // ── CORE PATHS ────────────────────────────────────────────
  PATHS: {
    COMPONENTS: 'components',
    CODES: 'codes',
    STYLES: 'styles'
  },

  // ── SETTINGS ──────────────────────────────────────────────
  SETTINGS: {
    LOADER_STYLE: 'ECO_SPINNER'
  },

  // ── COMPONENT DEFINITIONS (STRICT: components only) ───────
  COMPONENTS: {

    LOADER: {
      js: 'components/loader/loader.js',
      css: 'components/loader/loader.css',
      html: 'components/loader/loader.html',
      containerId: 'loader-container'
    },

    HEADER: {
      html: 'components/header/header.html',
      css: 'components/header/header.css',
      js: 'components/header/header.js',
      containerId: 'header-container'
    },

    FEATURE_BLOCK: {
      html: 'components/features/features.html',
      css: 'components/features/features.css',
      js: 'components/features/features.js',
      containerId: 'features-container'
    },

    FOOTER: {
      html: 'components/footer/footer.html',
      css: 'components/footer/footer.css',
      js: 'components/footer/footer.js',
      containerId: 'footer-container'
    }

  },

  // ── DATA (kept separate to avoid loader conflicts) ────────
  DATA: {
PLATFORMS: [
  { key: 'facebook', url: 'https://facebook.com/rezomapou' },
  { key: 'whatsapp', url: 'https://wa.me/50947334565' },
  { key: 'instagram', url: '' },
  { key: 'tiktok', url: '' },
  { key: 'youtube', url: '' }
],
    LANG_OPTIONS: [
      { code: 'ht', labelKey: 'lang_ht' },
      { code: 'fr', labelKey: 'lang_fr' },
      { code: 'en', labelKey: 'lang_en' }
    ],

    NAV_ITEMS: [
      { key: 'nav_home', tab: 'home' },
      { key: 'nav_about', tab: 'about' },
      { key: 'nav_contact', tab: 'contact' }
    ],

    NAVSTATS_DATA: [
      { key: 'stat_members', value: 128 },
      { key: 'stat_actions', value: 54 },
      { key: 'stat_points', value: 876 }
    ],

    FOOTER_LINKS: [
      { key: 'footer_legal', action: 'legal' },
      { key: 'footer_privacy', action: 'privacy' },
      { key: 'footer_terms', action: 'terms' }
    ],

    FOOTER_META: {
      key: 'footer_meta'
    }

  },

  // ── API ──────────────────────────────────────────────────
  API: {
    STATS: 'https://api.fatraselo.net/v1/global-stats'
  },

  // ── BACKEND ──────────────────────────────────────────────
  SCRIPT_URL: 'https://script.google.com/macros/s/AKfycbwiXRt79QnrSbep4pDXfHQ-l9StJt61HVcJQeiNY3FCRXEffTF5mJOnVcO3ghECNqqiKg/exec',
  SHEET_ID: '1-1C3v-hO7r_mACqQffAFUx0amXY1H9oJGbWRruz1JHw',
  ENV: 'production'

};

// ── GLOBAL ALIAS (required by boot.js) ──────────────────────
const config_const = SITE_CONFIG;

// ── ANALYTICS (clean separation) ───────────────────────────
const ANALYTICS = {
  enabled: true,
  endpoint: config_const.SCRIPT_URL
};
