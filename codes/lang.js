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
        // 1. Persist the choice
        localStorage.setItem(RMN_CONFIG.LOCALSTORAGE_LANG_KEY, lang);
        document.documentElement.lang = lang;
        
        const dict = STRINGS[lang];
        if (!dict) return;

        // 2. Update all elements with data-s attributes
        document.querySelectorAll('[data-s]').forEach(el => {
            const key = el.getAttribute('data-s');
            if (dict[key]) {
                // If it's an input/textarea, update the placeholder
                if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                    el.placeholder = dict[key];
                } else {
                    // Update the visible text
                    el.textContent = dict[key];
                }
            }
        });

        // 3. DYNAMIC TITLE: Update the browser tab
        // It looks for the data-s attribute on the <title> tag in your <head>
        const titleTag = document.querySelector('title');
        if (titleTag) {
            const titleKey = titleTag.getAttribute('data-s');
            if (titleKey && dict[titleKey]) {
                document.title = dict[titleKey];
            }
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
