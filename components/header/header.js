const HeaderComponent = {
    async init() {
        // Use the global alias to find its own HTML path
        const headerInfo = config_const.COMPONENTS.HEADER;
        const shell = document.getElementById('header-placeholder');
        
        if (!shell) return;

        try {
            // Load the shell
            const response = await fetch(headerInfo.html);
            shell.innerHTML = await response.text();

            // Load sub-components using the alias registry
            await Promise.all([
                this.loadPart(config_const.COMPONENTS.NAVSTATS, 'nav-stats-container'),
                this.loadPart(config_const.COMPONENTS.NAV, 'nav-bar-container')
            ]);

            // Signal internal objects to wake up
            if (typeof NavStatsComponent !== 'undefined') NavStatsComponent.init();
            if (typeof NavComponent !== 'undefined') NavComponent.init();
            
            // Finalize with global language manager
            if (window.LangManager) window.LangManager.updateUI();

        } catch (err) {
            console.error("Header Object failed to build:", err);
        }
    },

    async loadPart(compData, targetId) {
        const res = await fetch(compData.html);
        const html = await res.text();
        const target = document.getElementById(targetId);
        if (target) target.innerHTML = html;
    }
};

document.addEventListener('DOMContentLoaded', () => HeaderComponent.init());
