/**
 * index.js — Main Orchestrator
 */
(async function initApp() {
    try {
        console.log("Index.js orchestrator starting...");
        // Tiny delay to ensure index.html containers are fully rendered
        await new Promise(resolve => setTimeout(resolve, 50));
        if (typeof LoaderEngine !== 'undefined') {
            await LoaderEngine.init();
        }
        // 1. Load Header
        console.log("Loading Header...");
        await LoaderEngine.loadComponent(config_const.COMPONENTS.HEADER);
        if (window.HeaderComponent) {
            await HeaderComponent.init(config_const.COMPONENTS.HEADER.containerId);
        }
        // 2. Load Footer
        console.log("Loading Footer...");
        await LoaderEngine.loadComponent(config_const.COMPONENTS.FOOTER);
        if (window.FooterComponent) {
            await FooterComponent.init(config_const.COMPONENTS.FOOTER.containerId);
        }
        // 3. Load Features block (marketing campaign content)
        console.log("Loading Features...");
        await LoaderEngine.loadComponent(config_const.COMPONENTS.FEATURE_BLOCK);

        console.log("Assembly complete. Hiding loader.");
        LoaderEngine.hide();
    } catch (error) {
        console.error('Assembly Error:', error);
        if (typeof LoaderEngine !== 'undefined') LoaderEngine.hide();
    }
})();
