// ============================================================
// pipeline.gs — Rezo Mapou Nasyonal — Core Logic
// Handles all HTTP endpoints and data pipeline processing.
// All helpers in utils.gs · All config in config.gs
// All messages in i18n.gs
// ============================================================

// ── HTTP ENDPOINTS ────────────────────────────────────────────────────────

/**
 * doPost — handles all form submissions and API writes.
 * Routes by e.parameter.action:
 *   'register'        — new member registration
 *   'check_phone'     — real-time duplicate check (onblur)
 *   'verify_token'    — email verification + session creation
 *   'login_request'   — send magic login link
 *   'validate_member' — give/revoke a validation
 *   'update_profile'  — edit Vitrine fields
 *   'add_link'        — add a member link
 *   'remove_link'     — remove a member link
 *   'submit_vwa'      — submit a Vwa URL
 *   'leaf_action'     — give a leaf reaction
 *   'send_invite'     — send targeted or open invite
 *   'coach_request'   — send coaching request or offer
 */
function doPost(e) {
  try {
    const p = e.parameter || {};
    const action = p.action || 'register';
    const lang = p.langue || p.lang || 'ht';

    // Honeypot check — applies to all POST requests
    if (p.website_url && p.website_url.trim() !== '') {
      return jsonResponse({ success: false, status: CONFIG.STATUS.HONEYPOT });
    }

    switch (action) {
      case 'register':       return _handleRegister(p, lang);
      case 'check_phone':    return _handleCheckPhone(p, lang);
      case 'verify_token':   return _handleVerifyToken(p, lang);
      case 'login_request':  return _handleLoginRequest(p, lang);
      case 'validate_member':return _handleValidation(p, lang);
      case 'update_profile': return _handleUpdateProfile(p, lang);
      case 'add_link':       return _handleAddLink(p, lang);
      case 'remove_link':    return _handleRemoveLink(p, lang);
      case 'submit_vwa':     return _handleSubmitVwa(p, lang);
      case 'leaf_action':    return _handleLeafAction(p, lang);
      case 'send_invite':    return _handleSendInvite(p, lang);
      case 'coach_request':  return _handleCoachRequest(p, lang);
      default:
        return jsonResponse({ success: false, message: t('ERROR', lang) });
    }
  } catch(err) {
    Logger.log('doPost error: ' + err.message + '\n' + err.stack);
    return jsonResponse({ success: false, message: t('ERROR', 'ht'), error: err.message });
  }
}

/**
 * doGet — handles all read requests and dashboard stats.
 * Routes by e.parameter.action:
 *   'stats'          — dashboard counters + dept/commune breakdown
 *   'check_phone'    — duplicate check (GET fallback for onblur)
 *   'member'         — fetch member profile by ID or session token
 *   'links'          — fetch member links for public links page
 *   'verify_session' — validate session token
 */
function doGet(e) {
  try {
    const p = e.parameter || {};
    const action = p.action || 'stats';
    const lang = p.lang || 'ht';

    switch (action) {
      case 'stats':          return _handleStats();
      
      // NEW CASE: Handles both Phone and Email availability
      case 'check_availability': 
        return _handleCheckAvailability(p, lang);
        
      case 'check_phone':    return _handleCheckPhone(p, lang);
      case 'member':         return _handleGetMember(p, lang);
      case 'links':          return _handleGetLinks(p, lang);
      case 'verify_session': return _handleVerifySession(p, lang);
      default:
        return jsonResponse({ success: false, message: 'Not Found' });
    }
  } catch(err) {
    return jsonResponse({ success: false, error: err.message });
  }
}

/**
 * Logic for the new availability check
 */
function _handleCheckAvailability(p, lang) {
  const type = p.type; // 'phone' or 'email'
  const value = p.value;
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  
  let result = { valid: true, exists: false, normalized: null };

  if (type === 'phone') {
    const cleanPhone = normalizePhone(value);
    if (!cleanPhone) return jsonResponse({ valid: false });
    result.normalized = cleanPhone;
    
    // Check MEMBERS and RAW (using -1 as index because it's not in the sheet yet)
    const rawData = ss.getSheetByName(CONFIG.TABS.RAW).getDataRange().getValues();
    result.exists = isDuplicateEverywhere(cleanPhone, "null@null.com", -1, rawData);
  } 
  
  else if (type === 'email') {
    const cleanEmail = value.toLowerCase().trim();
    if (!cleanEmail.includes('@')) return jsonResponse({ valid: false });
    
    const rawData = ss.getSheetByName(CONFIG.TABS.RAW).getDataRange().getValues();
    result.exists = isDuplicateEverywhere("+00000000", cleanEmail, -1, rawData);
  }

  return jsonResponse(result);
}

// ── REGISTRATION ──────────────────────────────────────────────────────────

function _handleRegister(p, lang) {
  // 1. Normalize and validate phone
  const phone = normalizePhone(p.phone || p.telephone || '');
  if (!phone) {
    return jsonResponse({ success: false, status: CONFIG.STATUS.INVALID_PHONE,
      message: t('REG_INVALID_PHONE', lang) });
  }

  // 2. Duplicate check against GS_Raw
  if (phoneExistsInRaw(phone)) {
    return jsonResponse({ success: false, status: CONFIG.STATUS.DUPLICATE,
      message: t('REG_DUPLICATE', lang) });
  }

  // 3. Sanitize all inputs
  const row = _buildRawRow(p, phone, lang);

  // 4. Append to GS_Raw
  const sheet = getSheet('RAW');
  sheet.appendRow(row);
  const rowNum = sheet.getLastRow();
  writeRawStatus(rowNum, 'PENDING');

  // 5. Send verification email
  const email = sanitize(p.email || '');
  if (email && email.includes('@')) {
    const token = generateToken();
    const expiry = hoursFromNow(CONFIG.RULES.TOKEN_EXPIRY_HOURS);
    // Store token temporarily in the raw row for pipeline to pick up
    // Pipeline will move it to GS_Members during processing
    sheet.getRange(rowNum, CONFIG.COLS_RAW.STATUS + 1)
         .setNote(`VERIFY_TOKEN:${token}:${expiry}`);
    sendMagicLink(email, token, 'verify', lang);
  }

  // 6. Handle invite ref code
  if (p.ref_code) {
    _processInviteRef(p.ref_code, phone, p.invite_type, rowNum);
  }

  return jsonResponse({
    success: true,
    status: CONFIG.STATUS.PENDING,
    message: t('REG_SUCCESS', lang),
    has_email: !!(email && email.includes('@')),
  });
}

function _buildRawRow(p, phone, lang) {
  const isHaiti = (sanitize(p.country || '') === 'Haiti' || sanitize(p.country || '') === 'Haïti');
  return [
    nowISO(),                              // Timestamp
    phone,                                 // Phone
    sanitize(p.prenom || p.first_name || ''),  // First_Name
    sanitize(p.nom    || p.last_name  || ''),  // Last_Name
    sanitize(p.email  || ''),             // Email
    sanitize(p.country || ''),            // Country
    sanitize(p.departement || p.dept_code || ''),  // Dept_Code
    sanitize(p.departement_nom || ''),    // Dept_Nom
    sanitize(p.commune || p.commune_code || ''),   // Commune_Code
    sanitize(p.commune_nom || ''),        // Commune_Nom
    sanitize(p.city || ''),               // City
    sanitize(p.state || p.province || ''), // State_Province
    isHaiti ? 'TRUE' : 'FALSE',           // Is_In_Haiti
    sanitizeUrl(p.facebook  || ''),       // Facebook
    sanitizeUrl(p.instagram || ''),       // Instagram
    sanitizeUrl(p.tiktok    || ''),       // TikTok
    sanitizeUrl(p.youtube   || ''),       // YouTube
    sanitizeUrl(p.website   || ''),       // Website
    sanitize(p.whatsapp  || ''),          // WhatsApp
    sanitizeUrl(p.linkedin  || ''),       // LinkedIn
    sanitize(p.moncash   || ''),          // MonCash
    sanitize(p.natcash   || ''),          // NatCash
    lang,                                 // Language
    sanitize(p.source || 'website'),      // Source
    sanitize(p.ref_code || ''),           // Ref_Code
    sanitize(p.invite_type || ''),        // Invite_Type
    '',                                   // Honeypot (already checked — blank means passed)
    p.is_real === 'false' ? 'FALSE' : 'TRUE', // Is_Real
    CONFIG.STATUS.PENDING,                // Status
  ];
}

// ── PHONE DUPLICATE CHECK ─────────────────────────────────────────────────

function _handleCheckPhone(p, lang) {
  const phone = normalizePhone(p.phone || p.telephone || '');
  if (!phone) {
    return jsonResponse({ valid: false, exists: false,
      message: t('REG_INVALID_PHONE', lang) });
  }
  const exists = phoneExistsInRaw(phone);
  return jsonResponse({
    valid: true,
    exists: exists,
    normalized: phone,
    message: exists ? t('PHONE_EXISTS', lang) : t('PHONE_AVAILABLE', lang),
  });
}

// ── EMAIL VERIFICATION & SESSION ──────────────────────────────────────────

function _handleVerifyToken(p, lang) {
  const token = sanitize(p.token || '');
  const type  = sanitize(p.type  || 'verify');
  if (!token) return jsonResponse({ success: false, message: t('VERIFY_INVALID', lang) });

  const sheet = getSheet('MEMBERS');
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return jsonResponse({ success: false, message: t('VERIFY_INVALID', lang) });

  const rows = sheet.getRange(2, 1, lastRow - 1, CONFIG.HEADERS.MEMBERS.length).getValues();

  const tokenCol = type === 'login'
    ? CONFIG.COLS_MEMBERS.SESSION_TOKEN
    : CONFIG.COLS_MEMBERS.VERIF_TOKEN;
  const expiryCol = type === 'login'
    ? CONFIG.COLS_MEMBERS.SESSION_EXPIRY
    : CONFIG.COLS_MEMBERS.TOKEN_EXPIRY;

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    if (row[tokenCol] !== token) continue;

    // Check expiry
    if (isExpired(row[expiryCol])) {
      return jsonResponse({ success: false, message: t('VERIFY_EXPIRED', lang) });
    }

    const sheetRow = i + 2; // 1-based, +1 for header

    // Generate session token
    const sessionToken  = generateToken();
    const sessionExpiry = daysFromNow(CONFIG.RULES.SESSION_EXPIRY_DAYS);

    // Update member: verified + session
    if (type === 'verify') {
      sheet.getRange(sheetRow, CONFIG.COLS_MEMBERS.EMAIL_VERIFIED + 1).setValue('TRUE');
      const currentLevel = row[CONFIG.COLS_MEMBERS.TRUST_LEVEL];
      if (currentLevel === 0 || currentLevel === '') {
        sheet.getRange(sheetRow, CONFIG.COLS_MEMBERS.TRUST_LEVEL + 1).setValue(1);
      }
      // Clear verification token — single use
      sheet.getRange(sheetRow, CONFIG.COLS_MEMBERS.VERIF_TOKEN + 1).setValue('');
      sheet.getRange(sheetRow, CONFIG.COLS_MEMBERS.TOKEN_EXPIRY + 1).setValue('');
    }

    // Write session token
    sheet.getRange(sheetRow, CONFIG.COLS_MEMBERS.SESSION_TOKEN  + 1).setValue(sessionToken);
    sheet.getRange(sheetRow, CONFIG.COLS_MEMBERS.SESSION_EXPIRY + 1).setValue(sessionExpiry);
    sheet.getRange(sheetRow, CONFIG.COLS_MEMBERS.UPDATED_AT     + 1).setValue(nowISO());

    return jsonResponse({
      success:       true,
      message:       t('VERIFY_SUCCESS', lang),
      session_token: sessionToken,
      member_id:     row[CONFIG.COLS_MEMBERS.MEMBER_ID],
      trust_level:   type === 'verify' ? 1 : row[CONFIG.COLS_MEMBERS.TRUST_LEVEL],
      first_name:    row[CONFIG.COLS_MEMBERS.FIRST_NAME],
    });
  }

  return jsonResponse({ success: false, message: t('VERIFY_INVALID', lang) });
}

function _handleLoginRequest(p, lang) {
  const identifier = sanitize(p.phone || p.email || '');
  if (!identifier) return jsonResponse({ success: false, message: t('MISSING_FIELDS', lang) });

  const sheet = getSheet('MEMBERS');
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return jsonResponse({ success: false, message: t('LOGIN_NOT_FOUND', lang) });

  const rows = sheet.getRange(2, 1, lastRow - 1, CONFIG.HEADERS.MEMBERS.length).getValues();

  // Match by phone (normalized) or email
  const normalizedPhone = normalizePhone(identifier);
  const isEmail = identifier.includes('@');

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    const phoneMatch = normalizedPhone && row[CONFIG.COLS_MEMBERS.PHONE] === normalizedPhone;
    const emailMatch = isEmail && row[CONFIG.COLS_MEMBERS.EMAIL] === identifier;

    if (!phoneMatch && !emailMatch) continue;

    const email = row[CONFIG.COLS_MEMBERS.EMAIL];
    if (!email || !email.includes('@')) {
      return jsonResponse({ success: false,
        message: t('LOGIN_NOT_FOUND', lang) + ' (no email on file)' });
    }

    // Generate login token
    const token  = generateToken();
    const expiry = hoursFromNow(CONFIG.RULES.TOKEN_EXPIRY_HOURS);
    const sheetRow = i + 2;

    sheet.getRange(sheetRow, CONFIG.COLS_MEMBERS.SESSION_TOKEN  + 1).setValue(token);
    sheet.getRange(sheetRow, CONFIG.COLS_MEMBERS.SESSION_EXPIRY + 1).setValue(expiry);

    const memberLang = row[CONFIG.COLS_MEMBERS.LANGUAGE_PREF] || lang;
    sendMagicLink(email, token, 'login', memberLang);

    return jsonResponse({ success: true, message: t('LOGIN_SENT', lang) });
  }

  return jsonResponse({ success: false, message: t('LOGIN_NOT_FOUND', lang) });
}

function _handleVerifySession(p, lang) {
  const token = sanitize(p.token || '');
  if (!token) return jsonResponse({ valid: false, message: t('SESSION_INVALID', lang) });

  const sheet = getSheet('MEMBERS');
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return jsonResponse({ valid: false, message: t('SESSION_INVALID', lang) });

  const rows = sheet.getRange(2, 1, lastRow - 1, CONFIG.HEADERS.MEMBERS.length).getValues();

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    if (row[CONFIG.COLS_MEMBERS.SESSION_TOKEN] !== token) continue;
    if (isExpired(row[CONFIG.COLS_MEMBERS.SESSION_EXPIRY])) {
      return jsonResponse({ valid: false, message: t('SESSION_EXPIRED', lang) });
    }
    return jsonResponse({
      valid:       true,
      member_id:   row[CONFIG.COLS_MEMBERS.MEMBER_ID],
      trust_level: row[CONFIG.COLS_MEMBERS.TRUST_LEVEL],
      first_name:  row[CONFIG.COLS_MEMBERS.FIRST_NAME],
      visibility:  row[CONFIG.COLS_MEMBERS.VITRINE_VIS],
    });
  }

  return jsonResponse({ valid: false, message: t('SESSION_INVALID', lang) });
}

// ── STATS (DASHBOARD) ─────────────────────────────────────────────────────

function _handleStats() {
  const sheet = getSheet('MEMBERS');
  const lastRow = sheet.getLastRow();

  if (lastRow < 2) {
    return jsonResponse({ sentinelles: 0, coaches: 0,
      by_dept: {}, by_commune: {}, real_total: 0 });
  }

  const rows = sheet.getRange(2, 1, lastRow - 1, CONFIG.HEADERS.MEMBERS.length).getValues();

  let total = 0, coaches = 0;
  const byDept = {}, byCommune = {};

  rows.forEach(row => {
    // Count all members — real and seed — for social proof display
    total++;
    const dept    = row[CONFIG.COLS_MEMBERS.DEPT_NOM]    || row[CONFIG.COLS_MEMBERS.CITY] || '';
    const commune = row[CONFIG.COLS_MEMBERS.COMMUNE_NOM] || row[CONFIG.COLS_MEMBERS.STATE] || '';
    if (dept)    byDept[dept]       = (byDept[dept]    || 0) + 1;
    if (commune) byCommune[commune] = (byCommune[commune] || 0) + 1;
  });

  // Real count (Is_Real = TRUE) for internal tracking only
  const realRows = rows.filter(r => String(r[CONFIG.COLS_MEMBERS.IS_REAL]).toUpperCase() === 'TRUE');

  return jsonResponse({
    sentinelles: total,      // displayed publicly (real + seed)
    coaches:     coaches,
    real_total:  realRows.length,
    by_dept:     byDept,
    by_commune:  byCommune,
  });
}

// ── MEMBER PROFILE ────────────────────────────────────────────────────────

function _handleGetMember(p, lang) {
  const memberId    = sanitize(p.id    || '');
  const sessionToken = sanitize(p.token || '');
  if (!memberId && !sessionToken) {
    return jsonResponse({ success: false, message: t('MISSING_FIELDS', lang) });
  }

  const sheet = getSheet('MEMBERS');
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return jsonResponse({ success: false, message: t('NOT_FOUND', lang) });

  const rows = sheet.getRange(2, 1, lastRow - 1, CONFIG.HEADERS.MEMBERS.length).getValues();

  const row = rows.find(r =>
    (memberId    && r[CONFIG.COLS_MEMBERS.MEMBER_ID]     === memberId) ||
    (sessionToken && r[CONFIG.COLS_MEMBERS.SESSION_TOKEN] === sessionToken)
  );

  if (!row) return jsonResponse({ success: false, message: t('NOT_FOUND', lang) });

  // Determine if requester is the owner (has session token)
  const isOwner = sessionToken && row[CONFIG.COLS_MEMBERS.SESSION_TOKEN] === sessionToken
                  && !isExpired(row[CONFIG.COLS_MEMBERS.SESSION_EXPIRY]);

  // Public profile fields — always returned
  const profile = {
    member_id:   row[CONFIG.COLS_MEMBERS.MEMBER_ID],
    first_name:  row[CONFIG.COLS_MEMBERS.FIRST_NAME],
    last_name:   isOwner ? row[CONFIG.COLS_MEMBERS.LAST_NAME] : row[CONFIG.COLS_MEMBERS.LAST_NAME][0] + '.',
    trust_level: row[CONFIG.COLS_MEMBERS.TRUST_LEVEL],
    country:     row[CONFIG.COLS_MEMBERS.COUNTRY],
    dept_nom:    row[CONFIG.COLS_MEMBERS.DEPT_NOM],
    commune_nom: row[CONFIG.COLS_MEMBERS.COMMUNE_NOM],
    city:        row[CONFIG.COLS_MEMBERS.CITY],
    state:       row[CONFIG.COLS_MEMBERS.STATE],
    visibility:  row[CONFIG.COLS_MEMBERS.VITRINE_VIS],
    score_public: row[CONFIG.COLS_MEMBERS.SCORE_PUBLIC],
    rmn_score:   row[CONFIG.COLS_MEMBERS.SCORE_PUBLIC] === 'TRUE' ? row[CONFIG.COLS_MEMBERS.RMN_SCORE] : null,
    created_at:  row[CONFIG.COLS_MEMBERS.CREATED_AT],
  };

  // Owner-only fields
  if (isOwner) {
    profile.email           = row[CONFIG.COLS_MEMBERS.EMAIL];
    profile.phone           = row[CONFIG.COLS_MEMBERS.PHONE];
    profile.email_verified  = row[CONFIG.COLS_MEMBERS.EMAIL_VERIFIED];
    profile.language_pref   = row[CONFIG.COLS_MEMBERS.LANGUAGE_PREF];
    profile.is_real         = row[CONFIG.COLS_MEMBERS.IS_REAL];
    profile.density         = row[CONFIG.COLS_MEMBERS.DENSITY];
    profile.integrity       = row[CONFIG.COLS_MEMBERS.INTEGRITY];
    profile.impact          = row[CONFIG.COLS_MEMBERS.IMPACT];
    profile.rmn_score       = row[CONFIG.COLS_MEMBERS.RMN_SCORE]; // always for owner
    profile.activity_level  = row[CONFIG.COLS_MEMBERS.ACTIVITY_LEVEL];
    profile.coach_id        = row[CONFIG.COLS_MEMBERS.COACH_ID];
    profile.coach_expires   = row[CONFIG.COLS_MEMBERS.COACH_EXPIRES];
  }

  return jsonResponse({ success: true, profile, is_owner: isOwner });
}

function _handleUpdateProfile(p, lang) {
  const sessionToken = sanitize(p.token || '');
  if (!sessionToken) return jsonResponse({ success: false, message: t('UNAUTHORIZED', lang) });

  const sheet = getSheet('MEMBERS');
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return jsonResponse({ success: false, message: t('NOT_FOUND', lang) });

  const rows = sheet.getRange(2, 1, lastRow - 1, CONFIG.HEADERS.MEMBERS.length).getValues();
  const idx  = rows.findIndex(r => r[CONFIG.COLS_MEMBERS.SESSION_TOKEN] === sessionToken
                                && !isExpired(r[CONFIG.COLS_MEMBERS.SESSION_EXPIRY]));

  if (idx === -1) return jsonResponse({ success: false, message: t('SESSION_INVALID', lang) });

  const sheetRow = idx + 2;
  const C = CONFIG.COLS_MEMBERS;

  // Updatable fields — only what the member is allowed to change
  const updates = {
    [C.FIRST_NAME + 1]:    sanitize(p.first_name || ''),
    [C.LAST_NAME  + 1]:    sanitize(p.last_name  || ''),
    [C.LANGUAGE_PREF + 1]: sanitize(p.lang_pref  || ''),
    [C.VITRINE_VIS + 1]:   sanitize(p.visibility || ''),
    [C.SCORE_PUBLIC + 1]:  p.score_public === 'true' ? 'TRUE' : 'FALSE',
    [C.CITY         + 1]:  sanitize(p.city    || ''),
    [C.STATE        + 1]:  sanitize(p.state   || ''),
    [C.UPDATED_AT   + 1]:  nowISO(),
  };

  Object.entries(updates).forEach(([col, val]) => {
    if (val !== '' && val !== undefined) {
      sheet.getRange(sheetRow, parseInt(col)).setValue(val);
    }
  });

  return jsonResponse({ success: true, message: t('SUCCESS', lang) });
}

// ── LINKS ─────────────────────────────────────────────────────────────────

function _handleGetLinks(p, lang) {
  const memberId = sanitize(p.id || '');
  if (!memberId) return jsonResponse({ success: false, message: t('MISSING_FIELDS', lang) });

  const sheet   = getSheet('LINKS');
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return jsonResponse({ success: true, links: [] });

  const rows = sheet.getRange(2, 1, lastRow - 1, CONFIG.HEADERS.LINKS.length).getValues();
  const links = rows
    .filter(r => r[0] === memberId && String(r[6]).toUpperCase() === 'TRUE') // Member_ID + Is_Active
    .sort((a, b) => (a[5] || 0) - (b[5] || 0)) // Sort_Order
    .map(r => ({
      link_id:  r[0],
      platform: r[2],
      url:      r[3],
      label:    r[4],
    }));

  return jsonResponse({ success: true, links });
}

function _handleAddLink(p, lang) {
  const sessionToken = sanitize(p.token || '');
  const memberId = _getMemberIdFromSession(sessionToken);
  if (!memberId) return jsonResponse({ success: false, message: t('UNAUTHORIZED', lang) });

  const url = sanitizeUrl(p.url || '');
  if (!url) return jsonResponse({ success: false, message: t('MISSING_FIELDS', lang) });

  const sheet = getSheet('LINKS');
  const linkId = generateId('LN');
  const sortOrder = _getNextLinkSortOrder(memberId);

  sheet.appendRow([
    memberId,                       // Member_ID (Link_ID col repurposed as Member_ID for filter)
    linkId,                         // Link_ID
    sanitize(p.platform || 'OTHER'), // Platform
    url,                            // URL
    sanitize(p.label || ''),        // Label
    sortOrder,                      // Sort_Order
    'TRUE',                         // Is_Active
    nowISO(),                       // Created_At
  ]);

  return jsonResponse({ success: true, link_id: linkId, message: t('SUCCESS', lang) });
}

function _handleRemoveLink(p, lang) {
  const sessionToken = sanitize(p.token || '');
  const memberId = _getMemberIdFromSession(sessionToken);
  if (!memberId) return jsonResponse({ success: false, message: t('UNAUTHORIZED', lang) });

  const linkId = sanitize(p.link_id || '');
  if (!linkId) return jsonResponse({ success: false, message: t('MISSING_FIELDS', lang) });

  const sheet = getSheet('LINKS');
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return jsonResponse({ success: false, message: t('NOT_FOUND', lang) });

  const rows = sheet.getRange(2, 1, lastRow - 1, CONFIG.HEADERS.LINKS.length).getValues();
  const idx  = rows.findIndex(r => r[0] === memberId && r[1] === linkId);
  if (idx === -1) return jsonResponse({ success: false, message: t('NOT_FOUND', lang) });

  // Deactivate rather than delete — preserves audit trail
  sheet.getRange(idx + 2, 7).setValue('FALSE'); // Is_Active = FALSE
  return jsonResponse({ success: true, message: t('SUCCESS', lang) });
}

// ── VWA & LEAVES ──────────────────────────────────────────────────────────

function _handleSubmitVwa(p, lang) {
  const sessionToken = sanitize(p.token || '');
  const memberId = _getMemberIdFromSession(sessionToken);
  if (!memberId) return jsonResponse({ success: false, message: t('UNAUTHORIZED', lang) });

  const url = sanitizeUrl(p.url || '');
  if (!url) return jsonResponse({ success: false, message: t('MISSING_FIELDS', lang) });

  const sheet = getSheet('ACTIONS');
  sheet.appendRow([
    generateId('AC'),                          // Action_ID
    memberId,                                  // Member_ID
    '',                                        // Target_ID (n/a for Vwa submission)
    CONFIG.ACTION_TYPES.VWA_SUBMIT,            // Action_Type
    1,                                         // Value
    sanitize(p.platform || ''),                // Platform
    url,                                       // URL
    nowISO(),                                  // Timestamp
  ]);

  return jsonResponse({ success: true, message: t('SUCCESS', lang) });
}

function _handleLeafAction(p, lang) {
  const sessionToken = sanitize(p.token || '');
  const memberId = _getMemberIdFromSession(sessionToken);
  if (!memberId) return jsonResponse({ success: false, message: t('UNAUTHORIZED', lang) });

  const targetId  = sanitize(p.target_id  || '');
  const leafKey   = sanitize(p.leaf_key   || '');
  const validLeaves = Object.values(CONFIG.ACTION_TYPES).filter(v => v.startsWith('LEAF_'));

  const actionType = CONFIG.ACTION_TYPES['LEAF_' + leafKey];
  if (!actionType) return jsonResponse({ success: false, message: t('ERROR', lang) });

  const weight = { WE_LI: 1, APRESYE: 2, KONEKTE: 3, ENSPIRE: 4, ANGAJE: 5 }[leafKey] || 1;

  const sheet = getSheet('ACTIONS');
  sheet.appendRow([
    generateId('AC'),
    memberId,
    targetId,
    actionType,
    weight,
    '',
    '',
    nowISO(),
  ]);

  return jsonResponse({ success: true, message: t('SUCCESS', lang) });
}

// ── VALIDATION ────────────────────────────────────────────────────────────

function _handleValidation(p, lang) {
  const sessionToken = sanitize(p.token || '');
  const fromId = _getMemberIdFromSession(sessionToken);
  if (!fromId) return jsonResponse({ success: false, message: t('UNAUTHORIZED', lang) });

  const toId   = sanitize(p.to_id || '');
  const type   = sanitize(p.validation_type || '');
  const revoke = p.revoke === 'true';

  if (!toId) return jsonResponse({ success: false, message: t('MISSING_FIELDS', lang) });
  if (fromId === toId) return jsonResponse({ success: false, message: t('VALIDATION_SELF', lang) });

  if (revoke) {
    return _revokeValidation(fromId, toId, sanitize(p.note || ''), lang);
  }

  if (!CONFIG.VALIDATION_TYPES.includes(type)) {
    return jsonResponse({ success: false, message: t('MISSING_FIELDS', lang) });
  }

  // Check daily limit
  if (_dailyValidationCount(fromId) >= CONFIG.RULES.VALIDATION_DAILY_LIMIT) {
    return jsonResponse({ success: false, message: t('VALIDATION_LIMIT', lang) });
  }

  // Check for duplicate validation of same type
  if (_hasValidation(fromId, toId, type)) {
    return jsonResponse({ success: false, message: t('VALIDATION_DUP', lang) });
  }

  const sheet = getSheet('VALIDATIONS');
  sheet.appendRow([
    generateId('VL'),
    fromId,
    toId,
    type,
    sanitize(p.note || ''),
    nowISO(),
    '',   // Revoked_At
    '',   // Revoke_Note
  ]);

  // Log action
  getSheet('ACTIONS').appendRow([
    generateId('AC'), fromId, toId,
    CONFIG.ACTION_TYPES.VALIDATION_GIVEN, 1, '', '', nowISO()
  ]);

  // Check if toId has reached Level 2 threshold
  _checkLevel2Upgrade(toId);

  return jsonResponse({ success: true, message: t('VALIDATION_SUCCESS', lang) });
}

function _revokeValidation(fromId, toId, note, lang) {
  const sheet   = getSheet('VALIDATIONS');
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return jsonResponse({ success: false, message: t('NOT_FOUND', lang) });

  const rows = sheet.getRange(2, 1, lastRow - 1, CONFIG.HEADERS.VALIDATIONS.length).getValues();
  const idx  = rows.findIndex(r => r[1] === fromId && r[2] === toId && !r[6]); // not already revoked

  if (idx === -1) return jsonResponse({ success: false, message: t('NOT_FOUND', lang) });

  sheet.getRange(idx + 2, 7).setValue(nowISO()); // Revoked_At
  sheet.getRange(idx + 2, 8).setValue(note);     // Revoke_Note

  getSheet('ACTIONS').appendRow([
    generateId('AC'), fromId, toId,
    CONFIG.ACTION_TYPES.VALIDATION_REVOKED, 1, '', '', nowISO()
  ]);

  return jsonResponse({ success: true, message: t('UNVALIDATION_OK', lang) });
}

// ── INVITES ───────────────────────────────────────────────────────────────

function _handleSendInvite(p, lang) {
  const sessionToken = sanitize(p.token || '');
  const senderId = _getMemberIdFromSession(sessionToken);
  if (!senderId) return jsonResponse({ success: false, message: t('UNAUTHORIZED', lang) });

  const inviteType = sanitize(p.invite_type || 'OPEN'); // TARGETED | OPEN
  const refPhone   = inviteType === 'TARGETED' ? normalizePhone(p.ref_phone || '') : null;

  if (inviteType === 'TARGETED' && !refPhone) {
    return jsonResponse({ success: false, message: t('REG_INVALID_PHONE', lang) });
  }

  // Check velocity on open invites
  if (inviteType === 'OPEN' && _inviteVelocityExceeded(senderId)) {
    return jsonResponse({ success: false,
      status: CONFIG.STATUS.INV_VELOCITY,
      message: t('INVITE_VELOCITY', lang) });
  }

  const inviteToken = generateToken();
  const expiry = daysFromNow(CONFIG.RULES.INVITE_EXPIRY_DAYS);

  getSheet('REQUESTS').appendRow([
    generateId('RQ'),
    senderId,
    refPhone || '',                  // Recipient_ID (phone for targeted, empty for open)
    inviteType === 'TARGETED' ? 'INVITE_TARGETED' : 'INVITE_OPEN',
    CONFIG.STATUS.REQ_PENDING,
    refPhone || '',                  // Ref_Phone
    '',                              // Note
    nowISO(),                        // Created_At
    expiry,                          // Expires_At
    '',                              // Resolved_At
  ]);

  // For targeted invites, return the link for the referrer to send manually
  // (Apps Script cannot send SMS/WhatsApp directly without a gateway)
  const inviteLink = `https://rezomapou.github.io/webapp/register.html?ref=${inviteToken}&type=${inviteType}`;

  return jsonResponse({
    success:      true,
    message:      t('INVITE_SENT', lang),
    invite_link:  inviteLink,
    invite_type:  inviteType,
    ref_phone:    refPhone,
    expires_at:   expiry,
  });
}

function _processInviteRef(refCode, newPhone, inviteType, rawRowNum) {
  // Called during registration when ref_code is present
  // Looks up the invite in GS_Requests and attempts auto-validation
  // Full implementation in Stage 4 (validation launch)
  // Placeholder: log the ref for pipeline to process
  Logger.log(`Invite ref: ${refCode} for phone: ${newPhone} type: ${inviteType}`);
}

// ── COACHING ──────────────────────────────────────────────────────────────

function _handleCoachRequest(p, lang) {
  const sessionToken = sanitize(p.token || '');
  const senderId = _getMemberIdFromSession(sessionToken);
  if (!senderId) return jsonResponse({ success: false, message: t('UNAUTHORIZED', lang) });

  const recipientId  = sanitize(p.recipient_id || '');
  const requestType  = sanitize(p.request_type || 'COACHING_REQUEST'); // COACHING_REQUEST | COACHING_OFFER
  const note         = sanitize(p.note || '');

  if (!recipientId) return jsonResponse({ success: false, message: t('MISSING_FIELDS', lang) });

  const expiry = daysFromNow(CONFIG.RULES.COACHING_DURATION_DAYS);

  getSheet('REQUESTS').appendRow([
    generateId('RQ'),
    senderId,
    recipientId,
    requestType,
    CONFIG.STATUS.REQ_PENDING,
    '',       // Ref_Phone (n/a for coaching)
    note,
    nowISO(),
    expiry,
    '',
  ]);

  const msgKey = requestType === 'COACHING_OFFER' ? 'COACH_OFFER_SENT' : 'COACH_REQUEST_SENT';
  return jsonResponse({ success: true, message: t(msgKey, lang) });
}

// ── PIPELINE (time-triggered normalization) ───────────────────────────────

/**
 * runPipeline — called by a time-based trigger (every 5 minutes).
 * Processes unprocessed rows in GS_Raw:
 * 1. Normalizes phone
 * 2. Checks for duplicates
 * 3. Distributes to GS_Members and GS_Links
 * 4. Writes status back to GS_Raw
 */

/**
 * Main Pipeline: Processes 'RAW' registrations into 'MEMBERS' and 'LINKS'.
 */

function runPipeline() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  
  if (typeof CONFIG === 'undefined') {
    Logger.log("Error: CONFIG object not found.");
    return;
  }

  const rawSheet = ss.getSheetByName(CONFIG.TABS.RAW);
  if (!rawSheet) return;

  const data = rawSheet.getDataRange().getValues();
  
  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    const rowIndex = i + 1; 
    const status = row[CONFIG.COLS_RAW.STATUS];

    if (status === 'PENDING') {
      _processRawRow(rawSheet, row, rowIndex, data);
    }
  }
}

function _processRawRow(rawSheet, row, sheetRowNum, allRawData) {
  // 1. Normalize and Sanitize Inputs
  const rawPhone = row[CONFIG.COLS_RAW.PHONE];
  const email = sanitize(row[CONFIG.COLS_RAW.EMAIL]).toLowerCase();
  
  // FIX: Capture user-selected language specifically from its column
  const selectedLang = sanitize(row[CONFIG.COLS_RAW.LANGUAGE]) || 'ht';
  
  // This variable holds the clean E.164 version (+509...)
  const phone = normalizePhone(rawPhone); 

  // 2. Validation Checks
  if (!phone) {
    writeRawStatus(sheetRowNum, 'INVALID_PHONE');
    return;
  }

  // Double-guard: Check Phone AND Email across MEMBERS and current RAW batch
  if (isDuplicateEverywhere(phone, email, sheetRowNum, allRawData)) {
    writeRawStatus(sheetRowNum, 'DUPLICATE');
    return;
  }

  try {
    const memberId = generateId('MB');
    const now = nowISO();
    const verifToken = Utilities.getUuid();
    const isHaiti = (row[CONFIG.COLS_RAW.IS_IN_HAITI] === 'TRUE' || row[CONFIG.COLS_RAW.IS_IN_HAITI] === true);

    // 3. Move to GS_Members
    const memberSheet = getSheet('MEMBERS');
    if (!memberSheet) throw new Error("MEMBERS sheet not found");

    memberSheet.appendRow([
      memberId, 
      "'" + phone, // FIX: Use "'" to force Google Sheets to display the "+" sign
      sanitize(row[CONFIG.COLS_RAW.FIRST_NAME]), 
      sanitize(row[CONFIG.COLS_RAW.LAST_NAME]), 
      email, 
      'FALSE', // Email_Verified
      0,       // Trust_Level
      selectedLang, // FIX: Use user's selected language
      sanitize(row[CONFIG.COLS_RAW.COUNTRY]), 
      sanitize(row[CONFIG.COLS_RAW.DEPT_CODE]), 
      sanitize(row[CONFIG.COLS_RAW.DEPT_NOM]), 
      sanitize(row[CONFIG.COLS_RAW.COMMUNE_CODE]), 
      sanitize(row[CONFIG.COLS_RAW.COMMUNE_NOM]), 
      sanitize(row[CONFIG.COLS_RAW.CITY]), 
      sanitize(row[CONFIG.COLS_RAW.STATE]), 
      isHaiti ? 'TRUE' : 'FALSE', 
      row[CONFIG.COLS_RAW.IS_REAL] || 'TRUE', 
      'REZO_SELMAN', // Vitrine_Visibility
      'FALSE',       // Score_Public
      0, 0, 0, 0,    // Scores
      verifToken,    // Verification_Token
      '',            // Token_Expiry
      '', '',        // Session
      '', '', '',    // Coach
      0, '',         // Activity
      now,           // Created_At
      now            // Updated_At
    ]);

    // 4. Extract Social and Payment Links
    const linkSheet = getSheet('LINKS');
    if (linkSheet) {
      const platformCols = {
        FACEBOOK: CONFIG.COLS_RAW.FACEBOOK,
        INSTAGRAM: CONFIG.COLS_RAW.INSTAGRAM,
        TIKTOK: CONFIG.COLS_RAW.TIKTOK,
        YOUTUBE: CONFIG.COLS_RAW.YOUTUBE,
        WEBSITE: CONFIG.COLS_RAW.WEBSITE,
        WHATSAPP: CONFIG.COLS_RAW.WHATSAPP,
        LINKEDIN: CONFIG.COLS_RAW.LINKEDIN,
        MONCASH: CONFIG.COLS_RAW.MONCASH,
        NATCASH: CONFIG.COLS_RAW.NATCASH,
      };

      let sortOrder = 1;
      Object.entries(platformCols).forEach(([platform, colIdx]) => {
        const url = sanitizeUrl(row[colIdx]);
        if (url) {
          linkSheet.appendRow([
            memberId, 
            generateId('LN'), 
            platform, 
            url, 
            '', 
            sortOrder++, 
            'TRUE', 
            now
          ]);
        }
      });
    }

    // 5. Email Dispatch and Status Update
    if (email && email.includes('@')) {
      // FIX: Capture success/failure of email delivery
      const mailSent = sendMagicLink(email, verifToken, 'verify', selectedLang);
      if (mailSent) {
        writeRawStatus(sheetRowNum, 'PROCESSED_EMAIL_SENT');
      } else {
        writeRawStatus(sheetRowNum, 'ERROR_MAIL_FAILED');
      }
    } else {
      writeRawStatus(sheetRowNum, 'PROCESSED_NO_EMAIL');
    }

  } catch(err) {
    Logger.log(`Row ${sheetRowNum} Error: ${err.message}`);
    writeRawStatus(sheetRowNum, `ERROR: ${err.message}`);
  }
}

// ── PRIVATE HELPERS ───────────────────────────────────────────────────────

function _getMemberIdFromSession(token) {
  if (!token) return null;
  const sheet = getSheet('MEMBERS');
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return null;
  const rows = sheet.getRange(2, 1, lastRow - 1, CONFIG.HEADERS.MEMBERS.length).getValues();
  const row  = rows.find(r => r[CONFIG.COLS_MEMBERS.SESSION_TOKEN] === token
                           && !isExpired(r[CONFIG.COLS_MEMBERS.SESSION_EXPIRY]));
  return row ? row[CONFIG.COLS_MEMBERS.MEMBER_ID] : null;
}

function _dailyValidationCount(memberId) {
  const sheet = getSheet('VALIDATIONS');
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return 0;
  const rows = sheet.getRange(2, 1, lastRow - 1, CONFIG.HEADERS.VALIDATIONS.length).getValues();
  const today = new Date().toISOString().substring(0, 10);
  return rows.filter(r => r[1] === memberId && String(r[5]).startsWith(today)).length;
}

function _hasValidation(fromId, toId, type) {
  const sheet = getSheet('VALIDATIONS');
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return false;
  const rows = sheet.getRange(2, 1, lastRow - 1, CONFIG.HEADERS.VALIDATIONS.length).getValues();
  return rows.some(r => r[1] === fromId && r[2] === toId && r[3] === type && !r[6]);
}

function _checkLevel2Upgrade(memberId) {
  // Count active validations from L1 and L2 members
  const vSheet = getSheet('VALIDATIONS');
  const mSheet = getSheet('MEMBERS');
  const lastVRow = vSheet.getLastRow();
  if (lastVRow < 2) return;

  const vRows = vSheet.getRange(2, 1, lastVRow - 1, CONFIG.HEADERS.VALIDATIONS.length).getValues();
  const validations = vRows.filter(r => r[2] === memberId && !r[6]); // to this member, not revoked

  // Get member's current level
  const lastMRow = mSheet.getLastRow();
  if (lastMRow < 2) return;
  const mRows = mSheet.getRange(2, 1, lastMRow - 1, CONFIG.HEADERS.MEMBERS.length).getValues();
  const memberRow = mRows.find(r => r[CONFIG.COLS_MEMBERS.MEMBER_ID] === memberId);
  if (!memberRow || memberRow[CONFIG.COLS_MEMBERS.TRUST_LEVEL] >= 2) return;

  const l1Count = validations.length; // simplified — full impl checks validator levels
  const l2Count = 0; // full impl in Stage 4

  if (l1Count >= CONFIG.RULES.LEVEL2_L1_VOTES || l2Count >= CONFIG.RULES.LEVEL2_L2_VOTES) {
    const mIdx = mRows.findIndex(r => r[CONFIG.COLS_MEMBERS.MEMBER_ID] === memberId);
    if (mIdx >= 0) {
      mSheet.getRange(mIdx + 2, CONFIG.COLS_MEMBERS.TRUST_LEVEL + 1).setValue(2);
      mSheet.getRange(mIdx + 2, CONFIG.COLS_MEMBERS.UPDATED_AT   + 1).setValue(nowISO());
      Logger.log(`Member ${memberId} upgraded to Level 2`);
    }
  }
}

function _getNextLinkSortOrder(memberId) {
  const sheet = getSheet('LINKS');
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return 1;
  const rows = sheet.getRange(2, 1, lastRow - 1, CONFIG.HEADERS.LINKS.length).getValues();
  const memberLinks = rows.filter(r => r[0] === memberId);
  if (!memberLinks.length) return 1;
  return Math.max(...memberLinks.map(r => r[5] || 0)) + 1;
}

function _inviteVelocityExceeded(senderId) {
  const sheet = getSheet('REQUESTS');
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return false;
  const rows = sheet.getRange(2, 1, lastRow - 1, CONFIG.HEADERS.REQUESTS.length).getValues();
  const windowStart = new Date(Date.now() -
    CONFIG.RULES.INVITE_VELOCITY_WINDOW_HOURS * 3600 * 1000).toISOString();
  const recent = rows.filter(r =>
    r[1] === senderId &&
    (r[3] === 'INVITE_OPEN' || r[3] === 'INVITE_TARGETED') &&
    String(r[7]) >= windowStart
  );
  return recent.length >= CONFIG.RULES.INVITE_VELOCITY_THRESHOLD;
}

// ── TRIGGER SETUP ─────────────────────────────────────────────────────────

/**
 * Creates the pipeline time trigger (every 5 minutes).
 * Run once manually from the Apps Script editor.
 * Safe to run multiple times — checks for existing trigger first.
 */
function setupTriggers() {
  const triggers = ScriptApp.getProjectTriggers();
  const hasPipeline = triggers.some(t => t.getHandlerFunction() === 'runPipeline');

  if (!hasPipeline) {
    ScriptApp.newTrigger('runPipeline')
      .timeBased()
      .everyMinutes(5)
      .create();
    Logger.log('Pipeline trigger created: every 5 minutes');
  } else {
    Logger.log('Pipeline trigger already exists');
  }
}
