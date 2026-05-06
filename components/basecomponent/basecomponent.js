/**
 * base.js — Component Wrapper System
 */

window.BaseComponent = {

  wrap(name, component) {

    const originalInit = component.init;

    component.init = async function (containerId, ...args) {

      const t0 = performance.now();

      try {
        const result = await originalInit.call(this, containerId, ...args);

        // lifecycle tracking (automatic)
        window.Analytics?.track?.('component_loaded', {
          component: name,
          page: window.location.pathname,
          loadTime: Math.round(performance.now() - t0)
        });

        return result;

      } catch (err) {

        window.Analytics?.track?.('component_error', {
          component: name,
          error: err.message
        });

        throw err;
      }
    };

    return component;
  }

};
