/**
 * index.js — Main Orchestrator
 */
// ============================================================
// index.js — Dynamic Orchestrator (CONFIG-DRIVEN)
// ============================================================
(async function initApp() {
  try {
    await new Promise(r => setTimeout(r, 50));

    const currentPage = getCurrentPage();
    const page = config_const.PAGES?.[currentPage];

    if (!page) throw new Error('Page not found: ' + currentPage);

    for (const name of page.components) {

      const def = config_const.COMPONENTS[name];
      if (!def) continue;

      await LoaderEngine.loadComponent(def);

      const globalName = toGlobal(name);

      if (window[globalName]?.init) {
        await window[globalName].init(def.containerId);
      }
    }

    LoaderEngine.hide();

  } catch (e) {
    console.error(e);
  }

  function getCurrentPage() {
    const p = window.location.pathname.split('/').pop().replace('.html','');
    return p || 'index';
  }

  function toGlobal(name) {
    return name.toLowerCase().split('_')
      .map(s => s.charAt(0).toUpperCase() + s.slice(1))
      .join('') + 'Component';
  }

})();
