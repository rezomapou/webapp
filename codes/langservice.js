/**
 * langservice.js - Localization Service for Fatra se Lò
 */
console.log("lang.js file has been physically loaded by the browser");
const LangService = {
    currentLang: 'ht', // Defaulting to Kreyòl for local relevance
    
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

    /**
     * Initialization method called by boot.js
     */
    async init() {
        console.log("Initializing Language Service...");
        // Logic for browser language detection can be added here if needed
        return true; 
    },

    /**
     * Retrieves a translated string by key
     */
    get(key) {
        return this.dictionary[this.currentLang][key] || key;
    },

    /**
     * Switches the active language
     */
    setLang(langCode) {
        if (this.dictionary[langCode]) {
            this.currentLang = langCode;
        }
    }
};

// Export to window so boot.js can see it globally
window.LangService = LangService;
