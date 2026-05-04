/**
 * index.js: The Main Orchestrator
 * Manages the assembly sequence and localized rendering.
 */
document.addEventListener('DOMContentLoaded', async () => {
    try {
        // ─────────────────────────────────────────────
        // 0. Validate Config Early (CRITICAL)
        // ─────────────────────────────────────────────
        if (typeof config_const === 'undefined') {
            throw new Error('config_const is not defined — config.js not loaded');
        }

        // ─────────────────────────────────────────────
        // 1. Initialize Loader & Splash Screen
        // ─────────────────────────────────────────────
        if (typeof LoaderEngine !== 'undefined') {
            await LoaderEngine.init();
        } else {
            throw new Error('LoaderEngine is not defined — loader.js not loaded');
        }

        // ─────────────────────────────────────────────
        // 2. Load Core Components (Config-driven)
        // ─────────────────────────────────────────────
        if (config_const.COMPONENTS?.HEADER) {
            await LoaderEngine.loadComponent(config_const.COMPONENTS.HEADER);
        } else {
            console.warn('HEADER component missing in config');
        }

        // ─────────────────────────────────────────────
        // 3. Initialize Component Logic
        // ─────────────────────────────────────────────
        if (window.HeaderComponent) {
            await HeaderComponent.init();
        } else {
            console.warn('HeaderComponent not found after load');
        }

        // ─────────────────────────────────────────────
        // 4. Render Page Content
        // ─────────────────────────────────────────────
        const lang = localStorage.getItem('rmn_lang') || 'ht';
        PageRenderer.init(lang);

        // ─────────────────────────────────────────────
        // 5. Mission Complete: Hide Loader
        // ─────────────────────────────────────────────
        if (typeof LoaderEngine !== 'undefined') {
            LoaderEngine.hide();
        }

    } catch (error) {
        console.error("Assembly Error:", error);

        if (typeof LoaderEngine !== 'undefined') {
            LoaderEngine.hide();
        }
    }
});


/**
 * Tab Switching System
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
 */
const PageRenderer = {

    init: function(lang) {
        this.renderFeatures(lang);
        this.renderLeaves(lang);
    },

    renderFeatures: function(lang) {
        const grid = document.getElementById('features-grid');

        // Defensive checks
        if (!grid) {
            console.warn('features-grid container missing');
            return;
        }

        if (!window.FEATURES_DATA) {
            console.warn('FEATURES_DATA not defined');
            return;
        }

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

        if (!showcase) {
            console.warn('leaf-showcase container missing');
            return;
        }

        if (typeof config_const === 'undefined') {
            console.warn('config_const not available in renderLeaves');
            return;
        }

        if (!config_const.LEAF_KEYS) {
            console.warn('LEAF_KEYS missing in config');
            return;
        }

        const strings = window.STRINGS ? window.STRINGS[lang] : {};

        const leaves = config_const.LEAF_KEYS.map(key => {
            const lowKey = key.toLowerCase();

            return {
                icon: config_const.LEAF_ICONS?.[key] || '❓',
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
