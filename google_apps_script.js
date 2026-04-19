// Rezo Mapou — Google Apps Script v3
// Accepts URLSearchParams (form-encoded) POST — fixes CORS preflight issue
// Deploy: Execute as Me, Anyone can access, NEW VERSION each time you edit
 
const SHEET_ID = '15gOrMlb7tPEaOVjCNSk1Co625OXYMo9QS9OnYVbSLc0';

const S_HEADERS = ['Timestamp','Prenom','Nom','Email','Telephone','WhatsApp',
  'Departement','Commune','Zone','Activite','Video',
  'Facebook','Instagram','TikTok','YouTube','Paiement','Message','Langue','Source'];
 
const C_HEADERS = ['Timestamp','Prenom','Nom','Email','Telephone','WhatsApp',
  'Location_Type','Organisation','Logo_URL','Website',
  'Facebook','Instagram','TikTok','YouTube','Message','Langue','Source'];
 
function getOrCreate(ss, name, headers) {
  let sheet = ss.getSheetByName(name);
  if (!sheet) {
    sheet = ss.insertSheet(name);
    sheet.appendRow(headers);
    sheet.getRange(1,1,1,headers.length)
      .setFontWeight('bold').setBackground('#1E4D2B').setFontColor('#FFFFFF');
  }
  return sheet;
}
 
function doPost(e) {
  try {
    // Parse URLSearchParams (form-encoded) instead of JSON
    const params = e.parameter;
    const ss = SpreadsheetApp.openById(SHEET_ID);
    const ts = new Date().toISOString();
 
    if (params._fake === 'true') {
      const sheet = getOrCreate(ss, 'Fake_Data',
        ['Timestamp','Type','Prenom','Nom','Departement','Commune','Activite']);
      sheet.appendRow([ts, params.type||'sentinelle', params.prenom||'',
        params.nom||'', params.departement||'', params.commune||'', params.activite||'']);
 
    } else if (params.type === 'coach') {
      const sheet = getOrCreate(ss, 'Coaches', C_HEADERS);
      sheet.appendRow([ts, params.prenom||'', params.nom||'', params.email||'',
        params.telephone||'', params.whatsapp||'', params.location_type||'',
        params.organisation||'', params.logo_url||'', params.website||'',
        params.facebook||'', params.instagram||'', params.tiktok||'',
        params.youtube||'', params.message||'', params.langue||'ht', params.source||'website']);
 
    } else {
      const sheet = getOrCreate(ss, 'Sentinelles', S_HEADERS);
      sheet.appendRow([ts, params.prenom||'', params.nom||'', params.email||'',
        params.telephone||'', params.whatsapp||'', params.departement||'',
        params.commune||'', params.zone||'', params.activite||'', params.video||'',
        params.facebook||'', params.instagram||'', params.tiktok||'',
        params.youtube||'', params.paiement||'', params.message||'',
        params.langue||'ht', params.source||'website']);
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
    const sentinelles = sSheet && sSheet.getLastRow()>1 ? sSheet.getLastRow()-1 : 0;
    const coaches = cSheet && cSheet.getLastRow()>1 ? cSheet.getLastRow()-1 : 0;
    const byDept={}, byCommune={};
    if (sSheet && sSheet.getLastRow()>1) {
      const rows = sSheet.getRange(2,1,sSheet.getLastRow()-1,S_HEADERS.length).getValues();
      rows.forEach(row => {
        const dept=row[6], commune=row[7];
        if(dept) byDept[dept]=(byDept[dept]||0)+1;
        if(commune) byCommune[commune]=(byCommune[commune]||0)+1;
      });
    }
    return ContentService
      .createTextOutput(JSON.stringify({sentinelles,coaches,real_total:sentinelles,by_dept:byDept,by_commune:byCommune}))
      .setMimeType(ContentService.MimeType.JSON);
  } catch(err) {
    return ContentService
      .createTextOutput(JSON.stringify({error:err.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
