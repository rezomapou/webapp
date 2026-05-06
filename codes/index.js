/**
 * index.js — Dynamic Page Orchestrator (CONFIG DRIVEN)
 */

(async function initApp() {

    try {

        console.log("Index orchestrator starting...");

        await new Promise(r => setTimeout(r, 50));

        if (typeof LoaderEngine === 'undefined') {
            throw new Error('LoaderEngine missing');
        }

        const currentPage = getCurrentPage();

        const pageConfig = config_const.PAGES?.[currentPage];

        if (!pageConfig) {
            throw new Error(`Page not found in config: ${currentPage}`);
        }

        console.log("Loading page:", currentPage);

        // lifecycle tracking (page level only)
        window.Analytics?.track?.('page_view', {
            page: currentPage
        });

        // ── MAIN LOOP: CONFIG DRIVEN COMPONENT LOADING ──
        for (const componentName of pageConfig.components) {

            const componentDef = config_const.COMPONENTS?.[componentName];

            if (!componentDef) {
                console.warn(`Component missing in config: ${componentName}`);
                continue;
            }

            console.log("Loading component:", componentName);

            const t0 = performance.now();

            await LoaderEngine.loadComponent(componentDef);

            // dynamic global name resolution
            const globalName = toGlobalComponentName(componentName);

            const component = window[globalName];

            if (component?.init) {
                await component.init(componentDef.containerId);
            }

            // lifecycle handled ONLY here (via BaseComponent wrapper if used)
            window.Analytics?.track?.('component_loaded_manual', {
                component: componentName,
                page: currentPage,
                loadTime: Math.round(performance.now() - t0)
            });
        }

        LoaderEngine.hide();

        console.log("Page fully assembled.");

    } catch (error) {
        console.error("INDEX ERROR:", error);

        if (typeof LoaderEngine !== 'undefined') {
            LoaderEngine.hide();
        }
    }

    // ── HELPERS ─────────────────────────────────────────────

    function getCurrentPage() {
        const path = window.location.pathname
            .split('/')
            .pop()
            .replace('.html', '');

        return path || 'index';
    }

    function toGlobalComponentName(name) {
        return name
            .toLowerCase()
            .split('_')
            .map(s => s.charAt(0).toUpperCase() + s.slice(1))
            .join('') + 'Component';
    }

})();
