/**
 * boot.js — System Bootstrapper
 */

(async function () {

    try {
        if (typeof config_const === 'undefined') {
            throw new Error('config_const missing');
        }

        // 1. Load LoaderEngine first
        await loadScript(config_const.COMPONENTS.LOADER.js);

        if (typeof LoaderEngine === 'undefined') {
            throw new Error('LoaderEngine failed to load');
        }

        // 2. Load main orchestrator
        await loadScript('codes/index.js');

    } catch (err) {
        console.error('BOOT ERROR:', err);
    }

    function loadScript(src) {
        return new Promise((resolve, reject) => {
            const s = document.createElement('script');
            s.src = src;
            s.onload = resolve;
            s.onerror = () => reject(new Error(`Failed to load ${src}`));
            document.head.appendChild(s);
        });
    }

})();
