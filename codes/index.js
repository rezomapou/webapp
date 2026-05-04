/**
 * index.js: The Main Orchestrator
 */

document.addEventListener('DOMContentLoaded', async () => {
    try {

        // 0. Validate config
        if (typeof config_const === 'undefined') {
            throw new Error('config_const missing');
        }

        // 1. Init Loader
        await LoaderEngine.init();

        // 2. Load HEADER (example core component)
        await LoaderEngine.loadComponent(config_const.COMPONENTS.HEADER);

        // 3. Init component logic
        if (window.HeaderComponent) {
            await HeaderComponent.init();
        }

        // 4. Render page
        const lang = localStorage.getItem('rmn_lang') || 'ht';
        PageRenderer.init(lang);

        // 5. Hide loader
        LoaderEngine.hide();

    } catch (error) {
        console.error("Assembly Error:", error);
        LoaderEngine.hide();
    }
});


/**
 * Tab system
 */
window.openTab = function(evt, tabId) {
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.tab-link').forEach(link => link.classList.remove('active'));

    const targetTab = document.getElementById(tabId);
    if (targetTab) targetTab.classList.add('active');
    if (evt) evt.currentTarget.classList.add('active');
};


/**
 * PageRenderer
 */
const PageRenderer = {

    init(lang) {
        this.renderFeatures(lang);
        this.renderLeaves(lang);
    },

    renderFeatures(lang) {
        const grid = document.getElementById('features-grid');
        if (!grid || !window.FEATURES_DATA) return;

        const data = FEATURES_DATA[lang] || FEATURES_DATA.ht;

        grid.innerHTML = data.map(f => `
            <div class="feature-card">
                <span>${f.icon}</span>
                <h3>${f.title}</h3>
                <p>${f.desc}</p>
            </div>
        `).join('');
    },

    renderLeaves(lang) {
        const showcase = document.getElementById('leaf-showcase');
        if (!showcase || !config_const.LEAF_KEYS) return;

        const strings = window.STRINGS ? window.STRINGS[lang] : {};

        const leaves = config_const.LEAF_KEYS.map(key => {
            const low = key.toLowerCase();
            return {
                icon: config_const.LEAF_ICONS?.[key] || '❓',
                name: strings['leaf_' + low] || key,
                tip: strings['leaf_' + low + '_tip'] || ""
            };
        });

        showcase.innerHTML = leaves.map(l => `
            <div class="leaf-item" title="${l.tip}">
                <span>${l.icon}</span>
                <div>${l.name}</div>
            </div>
        `).join('');
    }
};
