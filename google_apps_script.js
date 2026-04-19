// Rezo Mapou — Google Apps Script v5
// - All data (real + fake) goes into Sentinelles/Coaches tabs
// - Is_Real column distinguishes them
// - doGet counts ALL rows for public display
// Deploy: Execute as Me, Anyone — NEW VERSION each time you edit.

const SHEET_ID = '1JIsrzuxMn5al6f4ph9TossMtHZufBFxnDylNfL00_w4';

const S_HEADERS = [
  'Timestamp','Is_Real','Prenom','Nom','Email','Telephone','WhatsApp',
  'Dept_Code','Dept_Nom','Commune_Code','Commune_Nom','Zone',
  'Activite','Video','Facebook','Instagram','TikTok','YouTube',
  'Paiement','Message','Langue','Source'
];

const C_HEADERS = [
  'Timestamp','Is_Real','Prenom','Nom','Email','Telephone','WhatsApp',
  'Location_Code','Organisation','Logo_URL','Website',
  'Facebook','Instagram','TikTok','YouTube','Message','Langue','Source'
];

function getOrCreate(ss, name, headers) {
  let sheet = ss.getSheetByName(name);
  if (!sheet) {
    sheet = ss.insertSheet(name);
    sheet.appendRow(headers);
    sheet.getRange(1,1,1,headers.length)
      .setFontWeight('bold').setBackground('#1E4D2B').setFontColor('#FFFFFF');
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function doPost(e) {
  try {
    const p = e.parameter;
    const ss = SpreadsheetApp.openById(SHEET_ID);
    const ts = new Date().toISOString();
    // is_real=true for real registrations, false for seed/fake
    const isReal = (p.is_real === 'true') ? 'TRUE' : 'FALSE';

    if (p.type === 'coach') {
      const sheet = getOrCreate(ss, 'Coaches', C_HEADERS);
      sheet.appendRow([
        ts, isReal,
        p.prenom||'', p.nom||'', p.email||'',
        p.telephone||'', p.whatsapp||'',
        p.location_type||'', p.organisation||'',
        p.logo_url||'', p.website||'',
        p.facebook||'', p.instagram||'', p.tiktok||'', p.youtube||'',
        p.message||'', p.langue||'ht', p.source||'website'
      ]);
    } else {
      // sentinelle (real or fake)
      const sheet = getOrCreate(ss, 'Sentinelles', S_HEADERS);
      sheet.appendRow([
        ts, isReal,
        p.prenom||'', p.nom||'', p.email||'',
        p.telephone||'', p.whatsapp||'',
        p.departement||'', p.departement_nom||'',
        p.commune||'', p.commune_nom||'',
        p.zone||'', p.activite||'', p.video||'',
        p.facebook||'', p.instagram||'', p.tiktok||'', p.youtube||'',
        p.paiement||'', p.message||'',
        p.langue||'ht', p.source||'website'
      ]);
    }

    return ContentService
      .createTextOutput(JSON.stringify({success:true}))
      .setMimeType(ContentService.MimeType.JSON);

  } catch(err) {
    return ContentService
      .createTextOutput(JSON.stringify({success:false,error:err.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  try {
    const ss = SpreadsheetApp.openById(SHEET_ID);
    const sSheet = ss.getSheetByName('Sentinelles');
    const cSheet = ss.getSheetByName('Coaches');

    // Count ALL rows (real + fake) for public display
    const sentinelles = (sSheet && sSheet.getLastRow() > 1) ? sSheet.getLastRow() - 1 : 0;
    const coaches = (cSheet && cSheet.getLastRow() > 1) ? cSheet.getLastRow() - 1 : 0;

    // Aggregates by dept/commune from Sentinelles (col 9 = Dept_Nom, col 11 = Commune_Nom)
    const byDept = {}, byCommune = {};
    if (sSheet && sSheet.getLastRow() > 1) {
      const rows = sSheet.getRange(2, 1, sSheet.getLastRow()-1, S_HEADERS.length).getValues();
      rows.forEach(row => {
        const dept = row[8];    // Dept_Nom (0-indexed col 8)
        const commune = row[10]; // Commune_Nom (0-indexed col 10)
        if (dept) byDept[dept] = (byDept[dept]||0) + 1;
        if (commune) byCommune[commune] = (byCommune[commune]||0) + 1;
      });
    }

    return ContentService
      .createTextOutput(JSON.stringify({
        sentinelles, coaches,
        by_dept: byDept,
        by_commune: byCommune
      }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch(err) {
    return ContentService
      .createTextOutput(JSON.stringify({error:err.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
