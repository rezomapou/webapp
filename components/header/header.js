/**
 * HeaderComponent Object
 * Encapsulates the entire top section of the site.
 */
const HeaderComponent = {
    async init() {
        const shell = document.getElementById('header-placeholder');
        if (!shell) return;

        try {
            // 1. Load the Header Shell using config constant
            const response = await fetch(`${CONFIG.COMPONENTS_PATH}/header/header.html`);
            shell.innerHTML = await response.text();

            // 2. Load Sub-Fragments into the shell
            await Promise.all([
                this.loadSubComponent(CONFIG.COMPONENTS.NAVSTATS, 'nav-stats-container'),
                this.loadSubComponent(CONFIG.COMPONENTS.NAV, 'nav-bar-container')
            ]);

            // 3. Initialize Sub-Component Objects
            if (typeof NavStatsComponent !== 'undefined') await NavStatsComponent.init();
            if (typeof NavComponent !== 'undefined') NavComponent.init();

            // 4. Finalize Language UI
            if (window.LangManager) window.LangManager.updateUI();

        } catch (err) {
            console.error("Header assembly failed:", err);
        }
    },

    async loadSubComponent(configEntry, targetId) {
        // configEntry would be something like { html: 'path/to/nav.html' }
        const res = await fetch(configEntry.html);
        const html = await res.text();
        const target = document.getElementById(targetId);
        if (target) target.innerHTML = html;
    }
};

// Start the assembly
document.addEventListener('DOMContentLoaded', () => HeaderComponent.init());
