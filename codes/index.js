/**
 * index.js — Main Orchestrator (TEST VERSION)
 */

document.addEventListener('DOMContentLoaded', async () => {

    try {
        // 0. Safety checks
        if (typeof config_const === 'undefined') {
            throw new Error('config_const missing');
        }

        if (typeof LoaderEngine === 'undefined') {
            throw new Error('LoaderEngine missing');
        }

        // 1. Init loader (visual only)
        await LoaderEngine.init();

        // 2. Load HEADER (encapsulates nav, lang, navstats)
        await LoaderEngine.loadComponent(config_const.COMPONENTS.HEADER);

        // 3. Init HEADER
        if (window.HeaderComponent) {
            await HeaderComponent.init(config_const.COMPONENTS.HEADER.containerId);
        }

        // 4. Load FOOTER
        await LoaderEngine.loadComponent(config_const.COMPONENTS.FOOTER);

        // 5. Init FOOTER
        if (window.FooterComponent) {
            await FooterComponent.init(config_const.COMPONENTS.FOOTER.containerId);
        }

        // 6. Hide loader
        LoaderEngine.hide();

    } catch (error) {
        console.error('Assembly Error:', error);

        if (typeof LoaderEngine !== 'undefined') {
            LoaderEngine.hide();
        }
    }

});
