/**
 * langservice.js - Localization Service
 */
const LangService = {
    currentLang: 'ht',

    dictionary: {
        'ht': {
            'welcome': 'Byenvini nan Fatra se Lò',
            'loading': 'Ap chaje resous yo...',
            'error': 'Gen yon erè ki rive.',
            // Nav
            'nav_home': 'Akèy',
            'nav_about': 'Sou nou',
            'nav_contact': 'Kontakte nou',
            // Lang bar
            'lang_ht': 'Kreyòl',
            'lang_fr': 'Français',
            'lang_en': 'English',
            // Footer links
            'footer_legal': 'Mentions légales',
            'footer_privacy': 'Konfidansyalite',
            'footer_terms': 'Kondisyon itilizasyon',
            'footer_meta': '© 2026 RMNE | Inisyativ Fatra se Lò',
            // Navstats
            'stat_members': 'Manm',
            'stat_actions': 'Aksyon',
            'stat_points': 'Pwen'
        },
        'fr': {
            'welcome': 'Bienvenue sur Fatra se Lò',
            'loading': 'Chargement des ressources...',
            'error': 'Une erreur est survenue.',
            // Nav
            'nav_home': 'Accueil',
            'nav_about': 'À propos',
            'nav_contact': 'Contact',
            // Lang bar
            'lang_ht': 'Kreyòl',
            'lang_fr': 'Français',
            'lang_en': 'English',
            // Footer links
            'footer_legal': 'Mentions légales',
            'footer_privacy': 'Confidentialité',
            'footer_terms': 'Conditions d\'utilisation',
            'footer_meta': '© 2026 RMNE | Initiative Fatra se Lò',
            // Navstats
            'stat_members': 'Membres',
            'stat_actions': 'Actions',
            'stat_points': 'Points'
        },
        'en': {
            'welcome': 'Welcome to Fatra se Lò',
            'loading': 'Loading resources...',
            'error': 'An error occurred.',
            // Nav
            'nav_home': 'Home',
            'nav_about': 'About',
            'nav_contact': 'Contact',
            // Lang bar
            'lang_ht': 'Kreyòl',
            'lang_fr': 'Français',
            'lang_en': 'English',
            // Footer links
            'footer_legal': 'Legal Notice',
            'footer_privacy': 'Privacy Policy',
            'footer_terms': 'Terms of Use',
            'footer_meta': '© 2026 RMNE | Fatra se Lò Initiative',
            // Navstats
            'stat_members': 'Members',
            'stat_actions': 'Actions',
            'stat_points': 'Points'
        }
    },

    async init() {
        console.log("Initializing Language Service...");
        return true;
    },

    get(key) {
        const lang = this.dictionary[this.currentLang];
        return (lang && lang[key]) || key;
    },

    setLang(langCode) {
        if (this.dictionary[langCode]) {
            this.currentLang = langCode;
        }
    }
};
window.LangService = LangService;
