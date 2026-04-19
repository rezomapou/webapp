// Rezo Mapou — Google Apps Script v4
// Is_Real column in all sheets. Dept + commune codes stored.
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

const F_HEADERS = [
  'Timestamp','Is_Real','Type','Prenom','Nom','Dept_Code','Dept_Nom','Commune_Code','Commune_Nom','Activite'
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
    const isReal = p.is_real === 'true' ? 'TRUE' : 'FALSE';

    if (p._fake === 'true' || p.is_real === 'false') {
      // Fake data goes to Sentinelles or Coaches with Is_Real=FALSE
      if (p.type === 'coach') {
        const sheet = getOrCreate(ss,'Coaches',C_HEADERS);
        sheet.appendRow([ts,'FALSE',p.prenom||'',p.nom||'',p.email||'',
          p.telephone||'',p.whatsapp||'',p.location_type||'',
          p.organisation||'',p.logo_url||'',p.website||'',
          p.facebook||'',p.instagram||'',p.tiktok||'',p.youtube||'',
          p.message||'',p.langue||'ht',p.source||'seed']);
      } else {
        const sheet = getOrCreate(ss,'Sentinelles',S_HEADERS);
        sheet.appendRow([ts,'FALSE',p.prenom||'',p.nom||'',p.email||'',
          p.telephone||'',p.whatsapp||'',
          p.departement||'',p.departement_nom||p.departement||'',
          p.commune||'',p.commune_nom||p.commune||'',
          p.zone||'',p.activite||'',p.video||'',
          p.facebook||'',p.instagram||'',p.tiktok||'',p.youtube||'',
          p.paiement||'',p.message||'',p.langue||'ht',p.source||'seed']);
      }
    } else if (p.type === 'coach') {
      const sheet = getOrCreate(ss,'Coaches',C_HEADERS);
      sheet.appendRow([ts,'TRUE',p.prenom||'',p.nom||'',p.email||'',
        p.telephone||'',p.whatsapp||'',p.location_type||'',
        p.organisation||'',p.logo_url||'',p.website||'',
        p.facebook||'',p.instagram||'',p.tiktok||'',p.youtube||'',
        p.message||'',p.langue||'ht',p.source||'website']);
    } else {
      const sheet = getOrCreate(ss,'Sentinelles',S_HEADERS);
      sheet.appendRow([ts,'TRUE',p.prenom||'',p.nom||'',p.email||'',
        p.telephone||'',p.whatsapp||'',
        p.departement||'',p.departement_nom||p.departement||'',
        p.commune||'',p.commune_nom||p.commune||'',
        p.zone||'',p.activite||'',p.video||'',
        p.facebook||'',p.instagram||'',p.tiktok||'',p.youtube||'',
        p.paiement||'',p.message||'',p.langue||'ht',p.source||'website']);
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

    // Count only real registrations
    let sentinelles = 0, coaches = 0;
    const byDept = {}, byCommune = {};

    if (sSheet && sSheet.getLastRow() > 1) {
      const rows = sSheet.getRange(2,1,sSheet.getLastRow()-1,S_HEADERS.length).getValues();
      rows.forEach(row => {
        sentinelles++;
        const dept = row[8]; // Dept_Nom
        const commune = row[10]; // Commune_Nom
        if(dept) byDept[dept] = (byDept[dept]||0) + 1;
        if(commune) byCommune[commune] = (byCommune[commune]||0) + 1;
      });
    }

    if (cSheet && cSheet.getLastRow() > 1) {
      coaches = cSheet.getLastRow() - 1;
    }

    return ContentService
      .createTextOutput(JSON.stringify({
        sentinelles, coaches,
        real_total: sentinelles,
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
