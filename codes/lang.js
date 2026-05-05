// lang.js - Localization Service
const LangService = {
    currentLang: 'ht', // Default to Kreyòl
    
    // Dictionary of strings
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

    // Initialization method called by boot.js
    async init() {
        console.log("Initializing Language Service...");
        // You can add logic here to detect browser language if preferred
        return true; 
    },

    // Method to get a string
    get(key) {
        return this.dictionary[this.currentLang][key] || key;
    },

    // Method to switch language
    setLang(langCode) {
        if (this.dictionary[langCode]) {
            this.currentLang = langCode;
        }
    }
};

// Export to window so boot.js can see it
window.LangService = LangService;
