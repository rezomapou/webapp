// ============================================================
// RMN / Fatra Se Lò — Google Apps Script
// Paste this entire script into:
// script.google.com → New Project → paste → Save → Deploy
//
// SETUP STEPS:
// 1. Go to script.google.com
// 2. Create new project, name it "RMN Registration"
// 3. Paste this entire file, replacing the default content
// 4. Replace SHEET_ID below with your Google Sheet ID
// 5. Click Deploy → New Deployment → Web App
//    - Execute as: Me (account.rezomapou@gmail.com)
//    - Who has access: Anyone
// 6. Copy the Web App URL
// 7. Paste that URL into index.html where it says APPS_SCRIPT_URL
// ============================================================

const SHEET_ID = '1JIsrzuxMn5al6f4ph9TossMtHZufBFxnDylNfL00_w4'; // Replace this
const SHEET_NAME = 'Registrations';
const FAKE_SHEET = 'Fake_Data';

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const ss = SpreadsheetApp.openById(SHEET_ID);

    // Route to correct sheet
    const sheetName = data._fake ? FAKE_SHEET : SHEET_NAME;
    let sheet = ss.getSheetByName(sheetName);

    // Create sheet + headers if first time
    if (!sheet) {
      sheet = ss.insertSheet(sheetName);
      sheet.appendRow([
        'Timestamp', 'Prenom', 'Nom', 'Email', 'Telephone',
        'WhatsApp', 'Departement', 'Commune', 'Zone',
        'Paiement_Prefere', 'Message', 'Langue', 'Source', 'IS_FAKE'
      ]);
      sheet.getRange(1, 1, 1, 14).setFontWeight('bold').setBackground('#1E4D2B').setFontColor('#FFFFFF');
    }

    sheet.appendRow([
      new Date().toISOString(),
      data.prenom || '',
      data.nom || '',
      data.email || '',
      data.telephone || '',
      data.whatsapp || '',
      data.departement || '',
      data.commune || '',
      data.zone || '',
      data.paiement || '',
      data.message || '',
      data.langue || 'ht',
      data.source || 'website',
      data._fake ? 'YES — TEST DATA' : 'NO'
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch(err) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// GET endpoint — returns aggregated stats for dashboard
function doGet(e) {
  try {
    const ss = SpreadsheetApp.openById(SHEET_ID);
    const sheet = ss.getSheetByName(SHEET_NAME);

    if (!sheet || sheet.getLastRow() < 2) {
      return ContentService
        .createTextOutput(JSON.stringify({ total: 0, by_dept: {}, by_commune: {}, recent: [] }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    const data = sheet.getRange(2, 1, sheet.getLastRow() - 1, 14).getValues();
    const byDept = {}, byCommune = {}, recent = [];

    data.forEach(row => {
      const dept = row[6], commune = row[7];
      if (dept) byDept[dept] = (byDept[dept] || 0) + 1;
      if (commune) byCommune[commune] = (byCommune[commune] || 0) + 1;
      if (recent.length < 10) {
        recent.push({
          name: row[1] + ' ' + row[2].charAt(0) + '.',
          dept: dept,
          commune: commune,
          time: row[0]
        });
      }
    });

    return ContentService
      .createTextOutput(JSON.stringify({
        total: data.length,
        by_dept: byDept,
        by_commune: byCommune,
        recent: recent
      }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch(err) {
    return ContentService
      .createTextOutput(JSON.stringify({ error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
