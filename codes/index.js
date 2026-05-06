/**
 * index.js — Main Orchestrator
 */
// ============================================================
// index.js — Dynamic Orchestrator (CONFIG-DRIVEN)
// ============================================================

(async function initApp() {
  try {
    console.log("App starting...");

    await new Promise(r => setTimeout(r, 50));

    if (typeof LoaderEngine === 'undefined') {
      throw new Error('LoaderEngine missing');
    }

    const currentPage = getCurrentPage();
    console.log("Current page:", currentPage);

    const page = config_const.PAGES?.[currentPage];

    if (!page) {
      throw new Error(`Page config not found: ${currentPage}`);
    }

    track('page_view', { page: currentPage });

    for (const componentName of page.components) {
      const def = config_const.COMPONENTS[componentName];

      if (!def) {
        console.warn(`Component not defined: ${componentName}`);
        continue;
      }

      console.log("Loading:", componentName);

      const t0 = performance.now();

      await LoaderEngine.loadComponent(def);

      const globalName = toComponentGlobal(componentName);

      if (window[globalName]?.init) {
        await window[globalName].init(def.containerId);
      }

      track('component_loaded', {
        component: componentName,
        page: currentPage,
        loadTime: Math.round(performance.now() - t0)
      });
    }

    LoaderEngine.hide();

    console.log("Page assembly complete.");

  } catch (err) {
    console.error('Assembly Error:', err);
    if (typeof LoaderEngine !== 'undefined') LoaderEngine.hide();
  }

  // ── helpers ─────────────────────────

  function getCurrentPage() {
    const path = window.location.pathname
      .split('/')
      .pop()
      .replace('.html', '');
    return path || 'index';
  }

  function toComponentGlobal(name) {
    return name
      .toLowerCase()
      .split('_')
      .map(s => s.charAt(0).toUpperCase() + s.slice(1))
      .join('') + 'Component';
  }

  function track(event, data = {}) {
    if (window.Analytics?.track) {
      window.Analytics.track(event, data);
    }
  }

})();
