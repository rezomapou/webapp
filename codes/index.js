/**
 * index.js: The Main Orchestrator
 * Manages the assembly sequence and localized rendering.
 */
document.addEventListener('DOMContentLoaded', async () => {
    try {
        // 1. Initialize Loader & Splash Screen
        if (typeof LoaderEngine !== 'undefined') {
            await LoaderEngine.init();
        }

        // 2. Load Core Components
        await LoaderEngine.loadComponent(config_const.COMPONENTS.HEADER);

        // 3. Initialize Component Logic
        if (window.HeaderComponent) {
            await HeaderComponent.init();
        }

        // 4. Render Page Content (Features, Leaves, etc.)
        const currentLang = localStorage.getItem('rmn_lang') || 'ht';
        PageRenderer.init(currentLang);

        // 5. Mission Complete: Hide Loader
        LoaderEngine.hide();

    } catch (error) {
        console.error("Assembly Error:", error);
        if (typeof LoaderEngine !== 'undefined') LoaderEngine.hide();
    }
});

/**
 * Tab Switching System
 * Parameterized to avoid hard-coded logic inside the HTML.
 */
window.openTab = function(evt, tabId) {
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.tab-link').forEach(link => link.classList.remove('active'));
    
    const targetTab = document.getElementById(tabId);
    if (targetTab) targetTab.classList.add('active');
    if (evt) evt.currentTarget.classList.add('active');
};

/**
 * PageRenderer Object
 * Handles dynamic content injection using the strings and config registries.
 */
const PageRenderer = {
    init: function(lang) {
        this.renderFeatures(lang);
        this.renderLeaves(lang);
        // Add other dynamic sections here
    },

    renderFeatures: function(lang) {
        const grid = document.getElementById('features-grid');
        if (!grid || !window.FEATURES_DATA) return;

        const data = FEATURES_DATA[lang] || FEATURES_DATA.ht;
        grid.innerHTML = data.map(f => `
            <div class="feature-card">
                <span class="feature-icon">${f.icon}</span>
                <h3>${f.title}</h3>
                <p>${f.desc}</p>
            </div>
        `).join('');
    },

    renderLeaves: function(lang) {
        const showcase = document.getElementById('leaf-showcase');
        if (!showcase || !config_const.LEAF_KEYS) return;

        // Use the global STRINGS object instead of a hard-coded s() function
        const strings = window.STRINGS ? window.STRINGS[lang] : {};

        const leaves = config_const.LEAF_KEYS.map(key => {
            const lowKey = key.toLowerCase();
            return {
                icon: config_const.LEAF_ICONS[key],
                name: strings['leaf_' + lowKey] || key,
                tip:  strings['leaf_' + lowKey + '_tip'] || ""
            };
        });

        showcase.innerHTML = leaves.map(l => `
            <div class="leaf-item" title="${l.tip}">
                <span class="icon">${l.icon}</span>
                <div class="name">${l.name}</div>
            </div>
        `).join('');
    }
};
