/**
 * CONFIG.GS — Rezo Mapou Single Source of Truth
 * Edit ONLY this file to change tab names, headers, or rules.
 * SS_ID: paste your new Google Sheet ID here after creating it.
 */
const CONFIG = {
// ============================================================
// config.js — Rezo Mapou environment settings
// Edit ONLY this file when redeploying or changing backends
// DO NOT commit this file with sensitive data to a public repo
// ============================================================

const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyEbpXOPhMAyRQVnTBRnMFZb2k5ZG4E0Gq2_-UnJuXnRh2VuuTmFo8Q5A_FynrzBW7n/exec';
const SHEET_ID   = '1JIsrzuxMn5al6f4ph9TossMtHZufBFxnDylNfL00_w4';
const ENV        = 'production'; // 'production' or 'dev'
 
  
  TABS: {
    RAW:         "RAW_Registrations",
    MEMBERS:     "GS_Members",
    ASSIGNMENTS: "GS_Assignments",
    VALIDATIONS: "GS_Validations",
    ACTIONS:     "GS_Actions",
    LINKS:       "GS_Links",
    FILES:       "GS_Files"
  },

  HEADERS: {
    RAW: [
      "Timestamp","Status","Phone_Raw","Phone_E164",
      "First_Name","Last_Name","Email",
      "Role_Type","Dept_Code","Dept_Nom","Commune_Code","Commune_Nom",
      "Zone","Is_In_Haiti","Activite","Paiement",
      "Video","Facebook","Instagram","TikTok","YouTube",
      "Organisation","Logo_URL","Website","Location_Type",
      "Message","Langue","Source","Is_Real"
    ],
    MEMBERS: [
      "Member_ID","Phone_E164","First_Name","Last_Name","Email",
      "Role_Type","Dept_Code","Dept_Nom","Commune_Code","Commune_Nom",
      "Zone","Is_In_Haiti","Activite","Paiement","Location_Type",
      "Trust_Level","Created_At","Langue","Source","Is_Real"
    ],
    ASSIGNMENTS: [
      "Assign_ID","Coach_Member_ID","Sentinelle_Member_ID",
      "Assignment_Type","Status","Created_At"
    ],
    VALIDATIONS: [
      "Validation_ID","From_Member_ID","To_Member_ID",
      "Validation_Type","Created_At"
    ],
    ACTIONS: [
      "Action_ID","Member_ID","Action_Type","Notes","Created_At"
    ],
    LINKS: [
      "Link_ID","Member_ID","Net_Type","URL","Label","Created_At"
    ],
    FILES: [
      "File_ID","Member_ID","File_Type","Drive_URL","Created_At"
    ]
  },

  RULES: {
    DEFAULT_COUNTRY_CODE: "509",
    REQUIRED_PHONE_PREFIX: "+",
    DRIVE_DOWNLOAD_PREFIX: "https://drive.google.com/uc?export=download&id=",
    MIN_PHONE_LOCAL_LENGTH: 8,
    MAX_PHONE_LENGTH: 15,
    DEFAULT_TRUST_LEVEL: 0
  },

  RAW_COL: {
    STATUS:0,PHONE_RAW:1,PHONE_E164:2,FIRST_NAME:3,LAST_NAME:4,EMAIL:5,
    ROLE:6,DEPT_CODE:7,DEPT_NOM:8,COMMUNE_CODE:9,COMMUNE_NOM:10,
    ZONE:11,IS_HAITI:12,ACTIVITE:13,PAIEMENT:14,VIDEO:15,
    FACEBOOK:16,INSTAGRAM:17,TIKTOK:18,YOUTUBE:19,
    ORGANISATION:20,LOGO_URL:21,WEBSITE:22,LOCATION:23,
    MESSAGE:24,LANGUE:25,SOURCE:26,IS_REAL:27
  }
};
