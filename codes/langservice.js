/**
 * langservice.js - Localization Service
 */

const LangService = {
    currentLang: 'ht', 
    
    dictionary: {
        'en': {
            'welcome': 'Welcome to Fatra se Lò',
            'loading': 'Loading resources...',
            'error': 'An error occurred.'
        },
        'ht': {
            'welcome': 'Byenvini nan Fatra se Lò',
            'loading': 'Ap chaje resous yo...',
            'error': 'Gen yon erè ki rive.'
        }
    },

    async init() {
        console.log("Initializing Language Service...");
        return true; 
    },

    get(key) {
        return this.dictionary[this.currentLang][key] || key;
    },

    setLang(langCode) {
        if (this.dictionary[langCode]) {
            this.currentLang = langCode;
        }
    }
};

window.LangService = LangService;
