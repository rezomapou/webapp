/**
 * index.js — Main Orchestrator
 */

(async function initApp() {
    try {
        console.log("Index.js orchestrator starting...");

        // Safety check for HTML containers
        const containers = ['header-container', 'footer-container'];
        containers.forEach(id => {
            if (!document.getElementById(id)) {
                console.error(`CRITICAL: Container #${id} is missing from index.html`);
            }
        });

        if (typeof LoaderEngine !== 'undefined') {
            await LoaderEngine.init();
        }

        console.log("Loading Header...");
        await LoaderEngine.loadComponent(config_const.COMPONENTS.HEADER);
        if (window.HeaderComponent) {
            await HeaderComponent.init('header-container');
        }

        console.log("Loading Footer...");
        await LoaderEngine.loadComponent(config_const.COMPONENTS.FOOTER);
        if (window.FooterComponent) {
            await FooterComponent.init('footer-container');
        }

        console.log("Assembly complete. Hiding loader.");
        LoaderEngine.hide();

    } catch (error) {
        console.error('Assembly Error:', error);
        if (typeof LoaderEngine !== 'undefined') {
            LoaderEngine.hide();
        }
    }
})();
