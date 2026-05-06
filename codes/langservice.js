/**
 * langservice.js — bridges component system to strings.js dictionary
 * strings.js must be loaded before this file (boot.js handles order)
 */
const LangService = {
    get currentLang() {
        return getCurrentLang(); // from strings.js
    },

    get(key) {
        const lang = getCurrentLang();
        const t = STRINGS[lang] || STRINGS[RMN_CONFIG.DEFAULT_LANG];
        return (t && t[key]) || key;
    },

    setLang(langCode) {
        switchLang(langCode); // from strings.js — persists to localStorage
    },

    async init() {
        console.log("Initializing Language Service...");
        return true;
    }
};
window.LangService = LangService;
