// ============================================================
// config.js — System Configuration (CLEAN ARCHITECTURE)
// ============================================================

const SITE_CONFIG = {
  console.log("CONFIG LOADED");
  window.SITE_CONFIG = SITE_CONFIG;
  window.config_const = SITE_CONFIG;
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

  // ── COMPONENTS ────────────────────────────────────────────
  COMPONENTS: {

    BASECOMPONENT: {
      js: 'basecomponent/basecomponent.js'
    },

    LOADER: {
      js: 'loader/loader.js',
      css: 'loader/loader.css',
      html: 'loader/loader.html',
      containerId: 'loader-container'
    },

    HEADER: {
      js: 'header/header.js',
      css: 'header/header.css',
      html: 'header/header.html',
      containerId: 'header-container'
    },

    FOOTER: {
      js: 'footer/footer.js',
      css: 'footer/footer.css',
      html: 'footer/footer.html',
      containerId: 'footer-container'
    },

    FEATURE_BLOCK: {
      js: 'features/features.js',
      css: 'features/features.css',
      html: 'features/features.html',
      containerId: 'features-container'
    },

    ANALYTICS: {
      js: 'analytics/analytics.js',
      css: 'analytics/analytics.css',
      html: 'analytics/analytics.html',
      containerId: 'analytics-container'
    }

  },

  // ── DATA (non-component logic only) ───────────────────────
  DATA: {

    NAV_ITEMS: [
      { key: 'nav_home', tab: 'index' },
      { key: 'nav_contact', tab: 'contact' }
    ],

    FOOTER_LINKS: [
      { key: 'footer_legal', action: 'legal' },
      { key: 'footer_privacy', action: 'privacy' },
      { key: 'footer_terms', action: 'terms' }
    ],

    FOOTER_META: {
      key: 'footer_meta'
    },

    PLATFORMS: [
      { key: 'facebook', url: 'https://facebook.com/rezomapou' },
      { key: 'whatsapp', url: 'https://wa.me/50947334565' },
      { key: 'instagram', url: '' },
      { key: 'tiktok', url: '' },
      { key: 'youtube', url: '' }
    ]

  },

  // ── API ───────────────────────────────────────────────────
  API: {
    STATS: 'https://api.fatraselo.net/v1/global-stats'
  },

  // ── BACKEND ───────────────────────────────────────────────
  SCRIPT_URL: 'https://script.google.com/macros/s/AKfycbwiXRt79QnrSbep4pDXfHQ-l9StJt61HVcJQeiNY3FCRXEffTF5mJOnVcO3ghECNqqiKg/exec',

  SHEET_ID: '1-1C3v-hO7r_mACqQffAFUx0amXY1H9oJGbWRruz1JHw',

  ENV: 'production'

};

const config_const = SITE_CONFIG;
