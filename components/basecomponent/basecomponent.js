/**
 * baseComponent.js — Shared lifecycle wrapper
 */

window.BaseComponent = {

  wrap(componentName, componentObject) {

    const originalInit = componentObject.init;

    componentObject.init = async function (containerId, ...args) {

      const t0 = performance.now();

      try {
        const result = await originalInit.call(this, containerId, ...args);

        // automatic analytics hook
        if (window.Analytics?.track) {
          window.Analytics.track('component_loaded', {
            component: componentName,
            loadTime: Math.round(performance.now() - t0),
            page: window.location.pathname
          });
        }

        return result;

      } catch (err) {

        if (window.Analytics?.track) {
          window.Analytics.track('component_error', {
            component: componentName,
            error: err.message
          });
        }

        throw err;
      }
    };

    return componentObject;
  }

};
