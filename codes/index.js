/**
 * index.js — Main Orchestrator
 */
(async function initApp() {
    try {
        if (typeof LoaderEngine !== 'undefined') {
            await LoaderEngine.init();
        }

        // Use the ID directly from your config object
        console.log("Loading Header...");
        await LoaderEngine.loadComponent(config_const.COMPONENTS.HEADER);
        if (window.HeaderComponent) {
            await HeaderComponent.init(config_const.COMPONENTS.HEADER.containerId);
        }

        // Loading the main feature block
        // console.log("Loading Features...");
        //  await LoaderEngine.loadComponent(config_const.COMPONENTS.FEATURE_BLOCK);

        console.log("Loading Footer...");
        await LoaderEngine.loadComponent(config_const.COMPONENTS.FOOTER);
        if (window.FooterComponent) {
            await FooterComponent.init(config_const.COMPONENTS.FOOTER.containerId);
        }

        LoaderEngine.hide();
    } catch (error) {
        console.error('Assembly Error:', error);
        if (typeof LoaderEngine !== 'undefined') LoaderEngine.hide();
    }
})();
