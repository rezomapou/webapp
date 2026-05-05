/**
 * index.js — Main Orchestrator
 */

(async function initApp() {
    try {
        console.log("Index.js orchestrator starting...");

        // 1. Init loader
        if (typeof LoaderEngine !== 'undefined') {
            await LoaderEngine.init();
        }

        // 2. Load HEADER
        console.log("Loading Header...");
        await LoaderEngine.loadComponent(config_const.COMPONENTS.HEADER);
        if (window.HeaderComponent) {
            await HeaderComponent.init(config_const.COMPONENTS.HEADER.containerId);
        }

        // 3. NEW: Load MAIN CONTENT (e.g., Home Page)
        // Ensure COMPONENTS.HOME is defined in your config_const
        if (config_const.COMPONENTS.HOME) {
            console.log("Loading Main Content...");
            await LoaderEngine.loadComponent(config_const.COMPONENTS.HOME);
        }

        // 4. Load FOOTER
        console.log("Loading Footer...");
        await LoaderEngine.loadComponent(config_const.COMPONENTS.FOOTER);
        if (window.FooterComponent) {
            await FooterComponent.init(config_const.COMPONENTS.FOOTER.containerId);
        }

        // 5. Assembly complete
        console.log("Assembly complete. Hiding loader.");
        LoaderEngine.hide();

    } catch (error) {
        console.error('Assembly Error:', error);
        if (typeof LoaderEngine !== 'undefined') {
            LoaderEngine.hide();
        }
    }
})();
