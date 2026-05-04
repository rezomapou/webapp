/**
 * HeaderComponent Object
 * Encapsulates the top of the page.
 */
const HeaderComponent = {
    async init() {
        const shell = document.getElementById('header-placeholder');
        if (!shell) return;

        try {
            // 1. Load the Header Shell
            const response = await fetch('components/header.html');
            shell.innerHTML = await response.text();

            // 2. Load Sub-Fragments into the shell
            await Promise.all([
                this.injectFragment('components/navstats.html', 'nav-stats-container'),
                this.injectFragment('components/nav.html', 'nav-bar-container')
            ]);

            // 3. Finalize Internal logic
            this.runInternalLogic();
            
        } catch (err) {
            console.error("Header Component failed to assemble:", err);
        }
    },

    async injectFragment(url, targetId) {
        const res = await fetch(url);
        const html = await res.text();
        const target = document.getElementById(targetId);
        if (target) target.innerHTML = html;
    },

    runInternalLogic() {
        // Stats Logic: Update the numbers in the Nav Stats
        if (typeof updateNavStats === 'function') {
            updateNavStats();
        }

        // Language Logic: Translate the newly injected HTML
        if (window.LangManager && typeof window.LangManager.updateUI === 'function') {
            window.LangManager.updateUI();
        }
    }
};

// Self-initialize when the DOM is ready
document.addEventListener('DOMContentLoaded', () => HeaderComponent.init());
