/**
 * index.js — Dynamic Page Orchestrator
 */
(async function initApp() {
    try {
        console.log("Index orchestrator starting...");
        await new Promise(r => setTimeout(r, 50));

        if (typeof LoaderEngine === 'undefined') throw new Error('LoaderEngine missing');

        const currentPage = getCurrentPage();
        const pageConfig  = config_const.PAGES?.[currentPage];

        if (!pageConfig) {
            console.warn(`Page not in config: ${currentPage}, falling back to index`);
        }

        const components = pageConfig?.components || ['HEADER', 'FEATURE_BLOCK', 'FOOTER'];
        console.log("Loading page:", currentPage, components);
        window.Analytics?.track?.('page_view', { page: currentPage });

        for (const componentName of components) {
            const componentDef = config_const.COMPONENTS?.[componentName];
            if (!componentDef) {
                console.warn(`Component not in config: ${componentName} — skipping`);
                continue;
            }

            console.log("Loading component:", componentName);
            const t0 = performance.now();

            try {
                await LoaderEngine.loadComponent(componentDef);

                const globalName = toGlobalComponentName(componentName);
                const component  = window[globalName];

                if (component?.init) {
                    // Pass page content config for DOC_BLOCK
                    if (componentName === 'DOC_BLOCK' && pageConfig?.content) {
                        await component.init(componentDef.containerId, pageConfig.content);
                    } else {
                        await component.init(componentDef.containerId);
                    }
                }

                window.Analytics?.track?.('component_loaded_manual', {
                    component: componentName,
                    page:      currentPage,
                    loadTime:  Math.round(performance.now() - t0)
                });

            } catch (err) {
                console.warn(`Component failed: ${componentName}`, err);
                window.Analytics?.track?.('component_error', {
                    component: componentName,
                    error:     err.message
                });
            }
        }

    } catch (err) {
        console.error("INDEX ERROR:", err);
    } finally {
        if (typeof LoaderEngine !== 'undefined') LoaderEngine.hide();
        console.log("Page assembly complete.");
    }

    function getCurrentPage() {
        const path = window.location.pathname.split('/').pop().replace('.html', '');
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
