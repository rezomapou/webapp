/**
 * REZO MAPOU NASYONAL - Centralized Language Manager
 */
/**
 * GLOBAL TRANSLATION ENGINE (L)
 * Updates all [data-s] elements and document title based on language dictionary.
 */
window.L = function(lang, pageKey = 'home') {
    const dict = STRINGS[lang];
    if (!dict) return;

    // 1. Update all elements with data-s attributes
    document.querySelectorAll('[data-s]').forEach(el => {
        const key = el.getAttribute('data-s');
        if (dict[key]) {
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                el.placeholder = dict[key];
            } else {
                el.textContent = dict[key];
            }
        }
    });

    // 2. Dynamic Browser Tab Title
    const titleTag = document.querySelector('title');
    if (titleTag) {
        const titleKey = titleTag.getAttribute('data-s');
        if (titleKey && dict[titleKey]) {
            document.title = dict[titleKey];
        }
    }
    
    // Set the HTML lang attribute for accessibility and SEO
    document.documentElement.lang = lang;
};

const LangManager = {
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

    update: function(lang) {
        localStorage.setItem(RMN_CONFIG.LOCALSTORAGE_LANG_KEY, lang);
        
        // Call the standalone global function
        const pageKey = document.body.dataset.page || 'home';
        window.L(lang, pageKey);
        
        this.setActiveClass();
    },

    setActiveClass: function() {
        const current = localStorage.getItem(RMN_CONFIG.LOCALSTORAGE_LANG_KEY);
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-l') === current);
        });
    },

    init: function() {
        const savedLang = localStorage.getItem(RMN_CONFIG.LOCALSTORAGE_LANG_KEY) 
                         || RMN_CONFIG.DEFAULT_LANG;
        this.injectUI();
        this.update(savedLang);
    }
};

// Start the manager when the DOM is ready
document.addEventListener('DOMContentLoaded', () => LangManager.init());
