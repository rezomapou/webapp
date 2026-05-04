/**
 * REZO MAPOU NASYONAL - Centralized Language Manager
 */

const LangManager = {
    // Inject the buttons into the DOM
    injectUI: function() {
        const container = document.getElementById('lang-bar');
        if (!container) return;

        container.innerHTML = `
            <button class="lang-btn" data-l="ht" onclick="LangManager.update('ht')">🇭🇹 KR</button>
            <button class="lang-btn" data-l="fr" onclick="LangManager.update('fr')">🇫🇷 FR</button>
            <button class="lang-btn" data-l="en" onclick="LangManager.update('en')">🇺🇸 EN</button>
        `;
        this.setActiveClass();
    },

    // Save and Apply the language
    update: function(lang) {
        localStorage.setItem(RMN_CONFIG.LOCALSTORAGE_LANG_KEY, lang);
        document.documentElement.lang = lang;
        
        // Trigger the universal translation engine (L function)
        if (typeof L === 'function') {
            const pageKey = document.body.dataset.page || 'home';
            L(lang, pageKey);
        }
        this.setActiveClass();
    },

    // Highlight the current language button
    setActiveClass: function() {
        const current = localStorage.getItem(RMN_CONFIG.LOCALSTORAGE_LANG_KEY);
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-l') === current);
        });
    },

    // Initialize on page load
    init: function() {
        const savedLang = localStorage.getItem(RMN_CONFIG.LOCALSTORAGE_LANG_KEY) 
                         || RMN_CONFIG.DEFAULT_LANG;
        this.injectUI();
        this.update(savedLang);
    }
};

// Start the manager when the DOM is ready
document.addEventListener('DOMContentLoaded', () => LangManager.init());
