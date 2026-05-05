/**
 * index.js — Main Orchestrator
 */

(async function initApp() {

    try {
        console.log("Index.js orchestrator starting...");

        // We assume boot.js already verified these. 
        // We do NOT re-load them here to avoid "Already Declared" errors.

        // 1. Init loader (visuals)
        if (typeof LoaderEngine !== 'undefined') {
            await LoaderEngine.init();
        }

        // 2. Load HEADER
        console.log("Loading Header...");
        await LoaderEngine.loadComponent(config_const.COMPONENTS.HEADER);

        // 3. Init HEADER
        if (window.HeaderComponent) {
            await HeaderComponent.init(config_const.COMPONENTS.HEADER.containerId);
        } else {
            console.error("HeaderComponent failed to register in window.");
        }

        // 4. Load FOOTER
        console.log("Loading Footer...");
        await LoaderEngine.loadComponent(config_const.COMPONENTS.FOOTER);

        // 5. Init FOOTER
        if (window.FooterComponent) {
            await FooterComponent.init(config_const.COMPONENTS.FOOTER.containerId);
        } else {
            console.error("FooterComponent failed to register in window.");
        }

        // 6. Hide loader
        console.log("Assembly complete. Hiding loader.");
        LoaderEngine.hide();

    } catch (error) {
        console.error('Assembly Error:', error);
        if (typeof LoaderEngine !== 'undefined') {
            LoaderEngine.hide();
        }
    }

})();
