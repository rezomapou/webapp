document.addEventListener('DOMContentLoaded', () => {
  // Use the existing config and localization engine
  const lang = localStorage.getItem(RMN_CONFIG.LOCALSTORAGE_LANG_KEY) || RMN_CONFIG.DEFAULT_LANG;
  
  // pageKey 'home' works here because the 404 uses general strings
  if (typeof L === 'function') {
    L(lang, 'home'); 
  }
});
