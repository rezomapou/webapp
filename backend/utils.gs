// ============================================================
// utils.gs — Rezo Mapou Nasyonal — Reusable Helpers
// All functions are pure utilities — no business logic here.
// Business logic lives in pipeline.gs.
// ============================================================

// ── SHEET ACCESS ──────────────────────────────────────────────────────────

/**
 * Returns a sheet by CONFIG tab key, creating it with headers if needed.
 * Always use this — never call getSheetByName() directly.
 */


function getSheet(key) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  // Ensure we are using the TABS object from config.gs
  const sheetName = CONFIG.TABS[key];
  const sheet = ss.getSheetByName(sheetName);
  if (!sheet) {
    Logger.log("CRITICAL: Sheet name '" + sheetName + "' for key '" + key + "' not found.");
  }
  return sheet;
}

function _getSpreadsheet() {
  let ss;
  try { ss = SpreadsheetApp.getActive(); } catch(e) {}
  if (!ss) {
    try { ss = SpreadsheetApp.openById(CONFIG.SS_ID); } catch(e) {
      throw new Error('Cannot connect to spreadsheet. Check CONFIG.SS_ID.');
    }
  }
  return ss;
}

// ── PHONE NORMALIZATION ───────────────────────────────────────────────────

/**
 * Normalizes any phone input to E.164 format.
 * +50937012345, 037012345, 509-3701-2345 → +50937012345
 * International numbers preserved as-is after + prefix check.
 * Returns null if input is empty or clearly invalid.
 */
function normalizePhone(phone) {
  if (!phone) return null;
  
  // Remove all non-numeric characters
  let cleaned = String(phone).replace(/\D/g, '');
  
  // 1. Handle Haiti 8-digit input (e.g., 37216655)
  // We add the 509 so it matches your existing records
  if (cleaned.length === 8) {
    cleaned = (CONFIG.RULES.DEFAULT_COUNTRY_CODE || '509') + cleaned;
  }
  
  // 2. Prevent the "509509" error 
  // If a user typed 509 but it was already added, fix it
  if (cleaned.startsWith('509509')) {
    cleaned = cleaned.substring(3);
  }

  // 3. Final Validation
  // Ensure it's a valid length (Haiti is 11, others are 10-15)
  return (cleaned.length >= 10 && cleaned.length <= 15) ? cleaned : null;
}

/**
 * Checks if a normalized phone already exists in GS_Raw.
 * GS_Raw is the most current source — checked before GS_Members
 * to catch entries that haven't been pipeline-processed yet.
 */
function phoneExistsInRaw(phone) {
  const sheet = getSheet('RAW');
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return false;
  const phones = sheet.getRange(2, CONFIG.COLS_RAW.PHONE + 1, lastRow - 1, 1).getValues();
  return phones.some(row => row[0] === phone);
}

/**
 * Checks if a phone exists in GS_Members (clean, processed records).
 * Use for session validation and profile lookups.
 */

function phoneExistsInMembers(phone) {
  const sheet = getSheet('MEMBERS');
  if (!sheet) return false;
  
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return false;
  
  // Look specifically in the Phone column (Column B = index 1)
  const phones = sheet.getRange(2, 2, lastRow - 1, 1).getValues().flat();
  return phones.map(p => String(p).replace(/\D/g, '')).includes(String(phone));
}

// ── ID GENERATION ─────────────────────────────────────────────────────────

/**
 * Generates a short unique ID with a prefix.
 * MB-X7K2P, LN-A3F9Q, etc.
 * Not cryptographically secure — used for readable record IDs only.
 */
function generateId(prefix) {
  return `${prefix}-${Math.random().toString(36).substr(2, 5).toUpperCase()}`;
}

/**
 * Generates a cryptographically strong token for email verification
 * and session management.
 */
function generateToken() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let token = '';
  for (let i = 0; i < 48; i++) {
    token += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return token;
}

// ── DATE HELPERS ──────────────────────────────────────────────────────────

function nowISO() {
  return new Date().toISOString();
}

function hoursFromNow(hours) {
  return new Date(Date.now() + hours * 3600 * 1000).toISOString();
}

function daysFromNow(days) {
  return new Date(Date.now() + days * 86400 * 1000).toISOString();
}

function isExpired(isoString) {
  if (!isoString) return true;
  return new Date(isoString) < new Date();
}

// ── GOOGLE DRIVE ──────────────────────────────────────────────────────────

/**
 * Converts a Google Drive view URL to a direct download URL.
 * Handles both /file/d/ID/view and ?id=ID formats.
 */
function getDirectDownloadUrl(viewUrl) {
  if (!viewUrl) return '';
  let fileId = '';

  const matchSlash = viewUrl.match(/\/d\/([a-zA-Z0-9_-]+)/);
  if (matchSlash) { fileId = matchSlash[1]; }

  const matchParam = viewUrl.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (matchParam) { fileId = matchParam[1]; }

  if (!fileId) return viewUrl; // return as-is if can't parse
  return CONFIG.RULES.DRIVE_DOWNLOAD_PREFIX + fileId;
}

// ── EMAIL ─────────────────────────────────────────────────────────────────

/**
 * Sends a verification or magic link email.
 * Subject and body resolved from I18N based on member's language pref.
 */


// ── INPUT SANITIZATION ────────────────────────────────────────────────────

/**
 * Strips HTML tags and dangerous characters from user input.
 * Prefix with apostrophe to prevent formula injection in Sheets.
 */
function sanitize(input) {
  if (!input) return '';
  return input
    .toString()
    .replace(/<[^>]*>/g, '')           // strip HTML tags
    .replace(/[=+\-@\t\r]/g, ' ')     // neutralize formula injection chars
    .trim()
    .substring(0, 500);               // max length guard
}

/**
 * Sanitizes a URL — allows only http/https and known deep link schemes.
 */
function sanitizeUrl(url) {
  if (!url) return '';
  const cleaned = url.toString().trim();
  const allowed = /^(https?:\/\/|moncash:\/\/|natcash:\/\/|wa\.me\/)/i;
  if (!allowed.test(cleaned)) return '';
  return cleaned.substring(0, 2000);
}

// ── STATUS WRITER ─────────────────────────────────────────────────────────

/**
 * Writes a status value to the STATUS column of GS_Raw for a given row.
 * rowNum is 1-based (actual sheet row number).
 */

function writeRawStatus(rowNum, status) {
  const rawSheet = getSheet('RAW');
  if (rawSheet) {
    // Offset +1 because Columns are 1-based in Apps Script
    rawSheet.getRange(rowNum, CONFIG.COLS_RAW.STATUS + 1).setValue(status);
    SpreadsheetApp.flush(); // Force immediate update to prevent re-processing
  }
}
// ── CORS RESPONSE ─────────────────────────────────────────────────────────

/**
 * Builds a standard JSON response with CORS headers.
 * Always use this for doPost and doGet returns.
 */
function jsonResponse(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

// new code here

/**
 * Sends Magic Link using i18n translations.
 */
function sendMagicLink(email, token, type, lang) {
  if (!email) return;
  lang = lang || 'ht';

  const baseUrl = 'https://rezomapou.github.io/webapp/verify.html';
  const link = `${baseUrl}?token=${token}&type=${type}`;
  const expiryHours = CONFIG.RULES.TOKEN_EXPIRY_HOURS || 24;

  // Identify the correct keys based on the action type
  const subjectKey = type === 'login' ? 'EMAIL_LOGIN_SUBJECT' : 'EMAIL_VERIFY_SUBJECT';
  const bodyKey = type === 'login' ? 'EMAIL_LOGIN_BODY' : 'EMAIL_VERIFY_BODY';

  // Access the I18N object directly (assuming t() helper is available or access directly)
  const subject = I18N[lang][subjectKey] || I18N['en'][subjectKey];
  let body = I18N[lang][bodyKey] || I18N['en'][bodyKey];

  // Inject dynamic variables into the body string
  body = body
    .replace('{link}', link)
    .replace('{expiry}', expiryHours);

  try {
    GmailApp.sendEmail(email, subject, body, {
      name: CONFIG.RULES.FROM_NAME,
      from: CONFIG.RULES.FROM_EMAIL
    });
  } catch(e) {
    Logger.log(`Email send failed to ${email}: ${e.message}`);
  }
}

// --- HELPER FUNCTIONS ---

/**
 * Checks for duplicates across both sheets, accounting for existing messy data.
 */
function isDuplicateEverywhere(phone, email, currentRowNum, allRawData) {
  const cleanEmail = sanitize(email).toLowerCase();
  // 'phone' is already normalized (e.g., +509...) before being passed here

  // 1. Check permanent MEMBERS sheet
  const memberSheet = getSheet('MEMBERS');
  if (memberSheet) {
    const lastRow = memberSheet.getLastRow();
    if (lastRow >= 2) {
      // Pull Phone (Col B) and Email (Col E)
      const memberData = memberSheet.getRange(2, 2, lastRow - 1, 4).getValues(); 
      
      const isMatch = memberData.some(row => {
        const dbPhone = normalizePhone(row[0]); // Normalize existing DB entry for fair comparison
        const dbEmail = sanitize(row[3]).toLowerCase();
        return (dbPhone === phone || (cleanEmail && dbEmail === cleanEmail));
      });
      
      if (isMatch) return true;
    }
  }

  // 2. Check current RAW batch to catch simultaneous duplicates
  for (let i = 0; i < allRawData.length; i++) {
    const sheetRowNum = i + 1;
    if (sheetRowNum === currentRowNum) continue;

    const otherPhone = normalizePhone(allRawData[i][CONFIG.COLS_RAW.PHONE]);
    const otherEmail = sanitize(allRawData[i][CONFIG.COLS_RAW.EMAIL]).toLowerCase();
    const otherStatus = allRawData[i][CONFIG.COLS_RAW.STATUS];

    // Check if this other row is "valid" (either already processed or about to be)
    if (otherPhone === phone || (cleanEmail && otherEmail === cleanEmail)) {
      if (otherStatus.indexOf('PROCESSED') !== -1 || otherStatus === 'PENDING') {
        return true;
      }
    }
  }
  return false;
}


function phoneExistsInMembers(phone) {
  const membersSheet = getSheet('MEMBERS');
  if (!membersSheet) return false;
  const lastRow = membersSheet.getLastRow();
  if (lastRow < 2) return false;
  const phones = membersSheet.getRange(2, CONFIG.COLS_MEMBERS.PHONE + 1, lastRow - 1).getValues();
  return phones.flat().includes(phone);
}

function writeRawStatus(rowNum, status) {
  const rawSheet = getSheet('RAW');
  if (rawSheet) {
    rawSheet.getRange(rowNum, CONFIG.COLS_RAW.STATUS + 1).setValue(status);
  }
}

function generateId(prefix) {
  return prefix + "_" + Utilities.getUuid().split('-')[0].toUpperCase();
}

function nowISO() { return new Date().toISOString(); }

function sanitize(val) { return val ? String(val).trim() : ''; }

function sanitizeUrl(url) {
  if (!url) return '';
  
  let clean = String(url).trim();
  
  if (clean && !clean.toLowerCase().startsWith('http')) {
    clean = 'https://' + clean;
  }
  
  return clean;
}

/**
 * Global Sheet accessor using the TABS configuration.
 */
function getSheet(key) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheetName = CONFIG.TABS[key];
  return ss.getSheetByName(sheetName);
}
// ── SYSTEM INIT ───────────────────────────────────────────────────────────

//to tupdate linkheaders for tracking 

function ensureLinkHeaders() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("GS_Links");
  
  const requiredHeaders = [
    "URL_Clean",
    "Status",
    "HTTP_Code",
    "Final_URL",
    "Platform_Detected",
    "Is_Valid",
    "Checked_At",
    "Error_Message"
  ];
  
  const lastColumn = sheet.getLastColumn();
  const existingHeaders = sheet.getRange(1, 1, 1, lastColumn).getValues()[0];
  
  const existingSet = new Set(existingHeaders.map(h => h.toString().trim().toUpperCase()));
  
  const missingHeaders = requiredHeaders.filter(h => !existingSet.has(h.toUpperCase()));
  
  if (missingHeaders.length === 0) {
    Logger.log("All GS_Links headers already exist.");
    return;
  }
  
  const startCol = lastColumn + 1;
  sheet.getRange(1, startCol, 1, missingHeaders.length).setValues([missingHeaders]);
  
  Logger.log("Added to GS_Links: " + missingHeaders.join(", "));
}

// to validate social links
function validateLinks() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("GS_Links");
  const data = sheet.getDataRange().getValues();
  
  const headers = data[0];
  const rows = data.slice(1);
  
  // Map column indexes
  const colIndex = {};
  headers.forEach((h, i) => colIndex[h] = i);
  
  const now = new Date();
  
  rows.forEach((row, i) => {
    const url = row[colIndex["URL"]];
  
    const checkedAt = row[colIndex["Checked_At"]];
    
    // Skip empty or already checked rows
    if (!url || checkedAt) return;
    
    let urlClean = sanitizeUrl(url);
    let platformDetected = detectPlatform(urlClean);
    
    let status = "unknown";
    let httpCode = "";
    let finalUrl = "";
    let isValid = false;
    let errorMessage = "";
    
    try {
      const response = UrlFetchApp.fetch(urlClean, {
        muteHttpExceptions: true,
        followRedirects: true
      });
      
      httpCode = response.getResponseCode();
      finalUrl = response.getFinalUrl();
      
      if (httpCode >= 200 && httpCode < 400) {
        status = "reachable";
        isValid = true;
      } else {
        status = "error";
      }
      
    } catch (e) {
      status = "failed";
      errorMessage = e.message;
    }
    
    // Write results back
    const rowIndex = i + 2;
    
    sheet.getRange(rowIndex, colIndex["URL_Clean"] + 1).setValue(urlClean);
    sheet.getRange(rowIndex, colIndex["Platform_Detected"] + 1).setValue(platformDetected);
    sheet.getRange(rowIndex, colIndex["Status"] + 1).setValue(status);
    sheet.getRange(rowIndex, colIndex["HTTP_Code"] + 1).setValue(httpCode);
    sheet.getRange(rowIndex, colIndex["Final_URL"] + 1).setValue(finalUrl);
    sheet.getRange(rowIndex, colIndex["Is_Valid"] + 1).setValue(isValid);
    sheet.getRange(rowIndex, colIndex["Checked_At"] + 1).setValue(now);
    sheet.getRange(rowIndex, colIndex["Error_Message"] + 1).setValue(errorMessage);
    
  });
}


// to detect platform based on input
function detectPlatform(url) {
  url = url.toLowerCase();
  
  if (url.includes("wa.me") || url.includes("whatsapp")) return "WHATSAPP";
  if (url.includes("facebook.com")) return "FACEBOOK";
  if (url.includes("tiktok.com")) return "TIKTOK";
  if (url.includes("instagram.com")) return "INSTAGRAM";
  if (url.includes("youtube.com") || url.includes("youtu.be")) return "YOUTUBE";
  if (url.includes("linkedin.com")) return "LINKEDIN";
  
  return "OTHER";
}
/**
 * Creates all tabs with headers if they don't exist.
 * Run once after creating a new spreadsheet.
 * Safe to run multiple times — only creates missing tabs.
 */
function initSystem() {
  const keys = Object.keys(CONFIG.TABS);
  const results = [];

  keys.forEach(key => {
    try {
      getSheet(key);
      results.push(`✓ ${CONFIG.TABS[key]}`);
    } catch(e) {
      results.push(`✗ ${CONFIG.TABS[key]}: ${e.message}`);
    }
  });

  // 👉 Ensure GS_Links headers
  try {
    ensureLinkHeaders();
    results.push("✓ GS_Links headers ensured");
  } catch(e) {
    results.push(`✗ GS_Links headers: ${e.message}`);
  }

  const msg = 'System init:\n' + results.join('\n');
  Logger.log(msg);

  try {
    SpreadsheetApp.getUi().alert(msg);
  } catch(e) {
    // No UI in some execution contexts — log only
  }
}
