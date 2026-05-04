/**
 * Header Component Object
 * Encapsulates Nav, NavStats, and Language selection.
 */
const HeaderComponent = {
    // Component private configuration
    config: {
        targetId: 'header-placeholder',
        subFiles: {
            stats: 'components/navstats.html',
            nav: 'components/nav.html'
        }
    },

    async init() {
        try {
            // 1. Create the internal "Black Box" structure
            const shell = document.getElementById(this.config.targetId);
            if (!shell) return;

            shell.innerHTML = `
                <header id="main-header">
                    <div id="nav-stats-container"></div>
                    <div id="nav-bar-container"></div>
                    <div id="lang-bar" class="lang-switcher"></div>
                </header>
            `;

            // 2. Load internal sub-modules in parallel
            await Promise.all([
                this.loadFragment(this.config.subFiles.stats, 'nav-stats-container'),
                this.loadFragment(this.config.subFiles.nav, 'nav-bar-container')
            ]);

            // 3. Initialize internal logic
            this.syncInternalLogic();

        } catch (err) {
            console.error("Header Component Error:", err);
        }
    },

    async loadFragment(url, id) {
        const response = await fetch(url);
        const html = await response.text();
        document.getElementById(id).innerHTML = html;
    },

    syncInternalLogic() {
        // Trigger local stats refresh
        if (typeof updateNavStats === 'function') updateNavStats();
        
        // Trigger language UI refresh for the newly injected HTML
        if (window.LangManager) window.LangManager.updateUI();
    }
};

// Component Self-Initialization
document.addEventListener('DOMContentLoaded', () => HeaderComponent.init());
