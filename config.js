// ============================================================
// config.js — Rezo Mapou Nasyonal
// Single source of truth for all frontend configuration.
// Edit ONLY this file when redeploying or changing backends.
// All keys referenced by name throughout the codebase —
// never by hard value.
// ============================================================

const RMN_CONFIG = {

  // ── BACKEND ──────────────────────────────────────────────
  SCRIPT_URL: 'https://script.google.com/macros/s/AKfycbyhv9ttPU4iu55UeC4LrjP6K_A-t23Txp5GLjOiLMk7SX9fb5b6a_05jmmU7_AxVZ7Zxg/exec',
  SHEET_ID:   '1-1C3v-hO7r_mACqQffAFUx0amXY1H9oJGbWRruz1JHw',
  ENV:        'production', // 'production' | 'dev'

  // ── TRUST LEVELS ──────────────────────────────────────────
  // Names resolved from STRINGS[lang].levels — never hard-coded in UI
  LEVEL_KEYS: ['RASIN', 'VERIFYE', 'REKONNET'],

  // Individual member Level 2 thresholds (any ONE path qualifies)
  LEVEL2_L1_VOTES:   5,    // validated by this many Level 1 members
  LEVEL2_L2_VOTES:   2,    // validated by this many Level 2 members
  LEVEL2_VWA_COUNT:  10,   // validated Vwa with min Angaje reactions

  // ── VALIDATION ────────────────────────────────────────────
  VALIDATION_DAILY_LIMIT:     10,   // max validations a member can give per day
  VALIDATION_TYPES:           ['TRUSTED', 'ACTIVE', 'RELIABLE'],
  VALIDATION_WEIGHTS:         { TRUSTED: 1, ACTIVE: 2, RELIABLE: 3 },

  // ── 5-LEAF SYSTEM ─────────────────────────────────────────
  // Leaf keys — display names resolved from STRINGS[lang].leaves
  LEAF_KEYS:    ['WE_LI', 'APRESYE', 'KONEKTE', 'ENSPIRE', 'ANGAJE'],
  LEAF_WEIGHTS: { WE_LI: 1, APRESYE: 2, KONEKTE: 3, ENSPIRE: 4, ANGAJE: 5 },
  LEAF_ICONS:   { WE_LI: '🌱', APRESYE: '🌿', KONEKTE: '🍃', ENSPIRE: '🌳', ANGAJE: '🌲' },

  // ── COACHING ──────────────────────────────────────────────
  COACHING_DURATION_DAYS:     90,   // coaching relationship duration
  COACHING_MIN_LEVEL:         1,    // min member level to send coaching request
  COACH_OFFER_ELIGIBLE_LEVEL: 1,    // min member level to receive coaching offer
  ACTIVITY_PERIOD_DAYS:       30,   // rolling window for activity measurement
  ACTIVITY_LEVELS:            5,    // number of activity tiers
  ACTIVITY_MIN_COACHING:      2,    // min activity tier to maintain coaching
  ACTIVITY_HIGH_BONUS_TIER:   4,    // activity tier that triggers coach bonus points
  ACTIVITY_HIGH_COACH_BONUS:  10,   // points awarded to coach per high-activity agent/period
  ACTIVITY_DECAY_DAYS:        45,   // days of inactivity before level decay begins

  // ── COACH (PAID TIER) ─────────────────────────────────────
  COACH_FEE_AMOUNT:           500,  // amount in COACH_FEE_CURRENCY
  COACH_FEE_CURRENCY:         'HTG',
  COACH_FEE_PERIOD:           'monthly', // 'monthly' | 'annual'
  COACH_DURATION_DAYS:        30,   // coach status duration per payment period
  STORE_MIN_LEVEL:            'COACH', // minimum status to have a Store

  // ── ADS ───────────────────────────────────────────────────
  // Ad level keys — display names resolved from STRINGS[lang].ad_levels
  AD_LEVEL_KEYS: ['AD_L1', 'AD_L2', 'AD_L3_INT', 'AD_L3_EXT', 'AD_SHARED', 'AD_DEDICATED'],
  AD_POINTS_PER_VIEW: {
    AD_L1:        1,
    AD_L2:        2,
    AD_L3_INT:    3,
    AD_L3_EXT:    4,
    AD_SHARED:    3,
    AD_DEDICATED: 5,
  },
  AD_POINTS_CLICK_INT:  2,   // extra points deducted per internal link click
  AD_POINTS_CLICK_EXT:  3,   // extra points deducted per external link click
  AD_MAX_LENGTH_CHARS:  80,  // max ad message length (one smartphone line)
  AD_ALGO_FILE:         'algo_ads',   // algorithm module name — swap without code change
  SCROLL_ALGO_FILE:     'algo_scroll', // member scroll algorithm module name

  // ── INVITES ───────────────────────────────────────────────
  INVITE_EXPIRY_DAYS:           30,
  INVITE_VELOCITY_THRESHOLD:    20,   // registrations via one link before flag
  INVITE_VELOCITY_WINDOW_HOURS: 24,
  INVITE_VELOCITY_ACTION:       'PAUSE_AUTOVALIDATE', // FLAG | PAUSE_AUTOVALIDATE | BLOCK
  INVITE_MAX_PENDING_REVIEW:    100,  // max pending in referrer queue

  // ── SESSION & AUTH ────────────────────────────────────────
  TOKEN_EXPIRY_HOURS:     48,   // email verification token expiry
  SESSION_EXPIRY_DAYS:    30,   // magic link session duration
  LOCALSTORAGE_LANG_KEY:  'rmn_lang',
  LOCALSTORAGE_TOKEN_KEY: 'rmn_session',
  LOCALSTORAGE_ID_KEY:    'rmn_member_id',
  DEFAULT_LANG:           'ht',  // fallback language

  // ── PLATFORMS (member links) ──────────────────────────────
  // icon: unicode or class name — resolved to SVG in UI
  PLATFORMS: [
    { key: 'WHATSAPP',  icon: '💬', label_key: 'plt_whatsapp',  prefix: 'https://wa.me/' },
    { key: 'FACEBOOK',  icon: '📘', label_key: 'plt_facebook',  prefix: 'https://facebook.com/' },
    { key: 'TIKTOK',    icon: '🎵', label_key: 'plt_tiktok',    prefix: 'https://tiktok.com/@' },
    { key: 'INSTAGRAM', icon: '📷', label_key: 'plt_instagram', prefix: 'https://instagram.com/' },
    { key: 'YOUTUBE',   icon: '▶️', label_key: 'plt_youtube',   prefix: 'https://youtube.com/' },
    { key: 'LINKEDIN',  icon: '💼', label_key: 'plt_linkedin',  prefix: 'https://linkedin.com/in/' },
    { key: 'MONCASH',   icon: '💳', label_key: 'plt_moncash',   prefix: 'moncash://' },
    { key: 'NATCASH',   icon: '💳', label_key: 'plt_natcash',   prefix: 'natcash://' },
    { key: 'WEBSITE',   icon: '🔗', label_key: 'plt_website',   prefix: '' },
    { key: 'OTHER',     icon: '🔗', label_key: 'plt_other',     prefix: '' },
  ],

  // ── DASHBOARD & SEED ──────────────────────────────────────
  SEED_PROBABILITY:       0.25,  // chance of auto-seed per page load
  SEED_COACH_PROBABILITY: 0.15,  // of seeded entries, chance it's a coach-type
  DASHBOARD_REFRESH_MS:   60000, // dashboard auto-refresh interval

  // ── SEO ───────────────────────────────────────────────────
  // Page-specific SEO keys — resolved from STRINGS[lang].seo
  SEO_PAGES: ['home', 'register', 'dashboard', 'directory', 'profile', 'links'],

  // ── VISIBILITY LEVELS ─────────────────────────────────────
  VISIBILITY_KEYS:    ['PIBLIK', 'REZO_SELMAN', 'SEK_KONFYANS'],
  VISIBILITY_DEFAULT: {
    0: 'PRIVE',       // Level 0 — private, not in directory
    1: 'REZO_SELMAN', // Level 1 — members only
    2: 'REZO_SELMAN', // Level 2 — member's choice, default members only
  },

  // ── PHONE ─────────────────────────────────────────────────
  PHONE_DEFAULT_CODE:  '+509',  // UI suggestion only — not enforced
  PHONE_REGEX:         /^\+[1-9]\d{6,14}$/,  // E.164 validation

  // ── PAGINATION ────────────────────────────────────────────
  DIRECTORY_PAGE_SIZE: 20,
  DASHBOARD_TOP_N:     10,  // top N depts/communes shown in charts
};

// Freeze to prevent accidental mutation
Object.freeze(RMN_CONFIG);
