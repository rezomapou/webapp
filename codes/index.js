/**
 * index.js — Dynamic Page Orchestrator
 * Creates component containers at runtime from config — no hardcoded divs in HTML
 */
(async function initApp() {
    try {
        console.log("Index orchestrator starting...");
        await new Promise(r => setTimeout(r, 50));
        if (typeof LoaderEngine === 'undefined') throw new Error('LoaderEngine missing');

        const currentPage = getCurrentPage();
        const pageConfig  = config_const.PAGES?.[currentPage];
        const components  = pageConfig?.components || ['HEADER', 'FOOTER'];

        console.log("Loading page:", currentPage, components);
        window.Analytics?.track?.('page_view', { page: currentPage });

        // Set page title from STRINGS if available
        const lang = LangService.currentLang;
        const pageTitle = window.SEO?.[lang]?.[currentPage]?.title;
        if (pageTitle) document.title = pageTitle;

        // Get or create the main content area
        const main = document.getElementById('main-content');

        for (const componentName of components) {
            const cfg = config_const.COMPONENTS?.[componentName];
            if (!cfg) { console.warn(`Component not in config: ${componentName} — skipping`); continue; }

            // Ensure container exists — create it if not
            let container = document.getElementById(cfg.containerId);
            if (!container) {
                container = document.createElement('div');
                container.id = cfg.containerId;
                // Header goes before main, footer after, everything else inside main
                if (componentName === 'HEADER') {
                    document.body.insertBefore(container, document.body.firstChild);
                } else if (componentName === 'FOOTER') {
                    document.body.appendChild(container);
                } else if (main) {
                    main.appendChild(container);
                } else {
                    document.body.appendChild(container);
                }
            }

            console.log("Loading component:", componentName);
            try {
                await LoaderEngine.loadComponent(cfg);
                const globalName = toGlobalName(componentName);
                const component  = window[globalName];
                if (component?.init) {
                    if (componentName === 'DOC_BLOCK' && pageConfig?.content) {
                        await component.init(cfg.containerId, pageConfig.content);
                    } else {
                        await component.init(cfg.containerId);
                    }
                }
                window.Analytics?.track?.('component_loaded_manual', { component: componentName, page: currentPage });
            } catch (err) {
                console.warn(`Component failed: ${componentName}`, err.message);
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
        return path === '' ? 'index' : (path || 'index');
    }

    function toGlobalName(name) {
        return name.toLowerCase().split('_')
            .map(s => s.charAt(0).toUpperCase() + s.slice(1))
            .join('') + 'Component';
    }
})();
