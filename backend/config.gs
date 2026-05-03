// ============================================================
// config.gs — Rezo Mapou Nasyonal — Apps Script Backend
// Single source of truth for all backend configuration.
// All other .gs files reference CONFIG keys by name only.
// Edit ONLY this file when changing sheet structure or rules.
// ============================================================

const CONFIG = {

  // ── SPREADSHEET ───────────────────────────────────────────
  SS_ID: '1-1C3v-hO7r_mACqQffAFUx0amXY1H9oJGbWRruz1JHw',

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

    RAW: [
      'Timestamp', 'Phone', 'First_Name', 'Last_Name', 'Email',
      'Country', 'Dept_Code', 'Dept_Nom', 'Commune_Code', 'Commune_Nom',
      'City', 'State_Province', 'Is_In_Haiti',
      'Facebook', 'Instagram', 'TikTok', 'YouTube', 'Website',
      'WhatsApp', 'LinkedIn', 'MonCash', 'NatCash',
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
      'Request_Type',   // COACHING_REQUEST | COACHING_OFFER | CONNECTION | INVITE_TARGETED | INVITE_OPEN
      'Status',         // PENDING | ACCEPTED | DECLINED | EXPIRED | COMPLETED
      'Ref_Phone',      // for INVITE_TARGETED — referenced phone number
      'Note',
      'Created_At', 'Expires_At', 'Resolved_At'
    ],

    ADS: [
      'Ad_ID', 'Coach_ID', 'Ad_Level',
      'Message', 'Link_URL', 'Link_Type', // NONE | INTERNAL | EXTERNAL
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

  // ── COLUMN INDEX MAPS (0-based, for getValues() arrays) ───
  // RAW sheet column positions
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
    LANGUAGE:      22,
    SOURCE:        23,
    REF_CODE:      24,
    INVITE_TYPE:   25,
    HONEYPOT:      26,
    IS_REAL:       27,
    STATUS:        28,
  },

  // MEMBERS sheet column positions
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
    // Phone
    DEFAULT_COUNTRY_CODE:    '509',
    REQUIRED_PHONE_PREFIX:   '+',
    DRIVE_DOWNLOAD_PREFIX:   'https://drive.google.com/uc?export=download&id=',

    // Trust levels
    LEVEL2_L1_VOTES:         5,
    LEVEL2_L2_VOTES:         2,
    LEVEL2_VWA_COUNT:        10,
    VALIDATION_DAILY_LIMIT:  10,

    // Coaching
    COACHING_DURATION_DAYS:  90,
    COACH_DURATION_DAYS:     30,
    ACTIVITY_PERIOD_DAYS:    30,
    ACTIVITY_MIN_COACHING:   2,
    ACTIVITY_HIGH_TIER:      4,
    ACTIVITY_HIGH_BONUS:     10,
    ACTIVITY_DECAY_DAYS:     45,

    // Invites
    INVITE_EXPIRY_DAYS:              30,
    INVITE_VELOCITY_THRESHOLD:       20,
    INVITE_VELOCITY_WINDOW_HOURS:    24,
    INVITE_VELOCITY_ACTION:          'PAUSE_AUTOVALIDATE',
    INVITE_MAX_PENDING:              100,

    // Session & tokens
    TOKEN_EXPIRY_HOURS:      48,
    SESSION_EXPIRY_DAYS:     30,

    // Ads
    AD_MAX_LENGTH:           80,

    // Email
    FROM_EMAIL:              'account.rezomapou@gmail.com',
    FROM_NAME:               'Rezo Mapou Nasyonal',
  },

  // ── STATUS VALUES ─────────────────────────────────────────
  STATUS: {
    // Pipeline statuses written to GS_Raw
    PENDING:          'PENDING',
    PROCESSED:        'PROCESSED',
    DUPLICATE:        'DUPLICATE_PHONE',
    INVALID_PHONE:    'INVALID_PHONE',
    HONEYPOT:         'HONEYPOT',
    ERROR:            'ERROR',

    // Request statuses
    REQ_PENDING:      'PENDING',
    REQ_ACCEPTED:     'ACCEPTED',
    REQ_DECLINED:     'DECLINED',
    REQ_EXPIRED:      'EXPIRED',
    REQ_COMPLETED:    'COMPLETED',

    // Invite statuses
    INV_MATCHED:      'AUTO_VALIDATED',
    INV_MISMATCH:     'PENDING_CONFIRM',
    INV_VELOCITY:     'VELOCITY_FLAGGED',
  },

  // ── ACTION TYPES (logged in GS_Actions) ───────────────────
  ACTION_TYPES: {
    // Leaf reactions
    LEAF_WE_LI:       'LEAF_WE_LI',
    LEAF_APRESYE:     'LEAF_APRESYE',
    LEAF_KONEKTE:     'LEAF_KONEKTE',
    LEAF_ENSPIRE:     'LEAF_ENSPIRE',
    LEAF_ANGAJE:      'LEAF_ANGAJE',
    // Vwa
    VWA_SUBMIT:       'VWA_SUBMIT',
    VWA_VIEW:         'VWA_VIEW',
    // Vitrine
    VITRINE_VISIT:    'VITRINE_VISIT',
    // Connections
    CONN_REQUEST:     'CONN_REQUEST',
    CONN_ACCEPT:      'CONN_ACCEPT',
    // Coaching
    COACH_START:      'COACH_START',
    COACH_END:        'COACH_END',
    COACH_MILESTONE:  'COACH_MILESTONE',
    // Ads
    AD_VIEW:          'AD_VIEW',
    AD_CLICK_INT:     'AD_CLICK_INT',
    AD_CLICK_EXT:     'AD_CLICK_EXT',
    // Invites
    INVITE_SENT:      'INVITE_SENT',
    INVITE_ACCEPTED:  'INVITE_ACCEPTED',
    // Validation
    VALIDATION_GIVEN: 'VALIDATION_GIVEN',
    VALIDATION_REVOKED: 'VALIDATION_REVOKED',
  },

  // ── HEADER STYLES ─────────────────────────────────────────
  HEADER_BG:     '#1E4D2B',
  HEADER_FG:     '#FFFFFF',
  HEADER_WEIGHT: 'bold',
};
