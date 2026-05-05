/**
 * boot.js — System Bootstrapper
 */

(async function () {

    try {
        if (typeof config_const === 'undefined') {
            throw new Error('config_const missing');
        }

        // 1. Load Lang service (from /codes/)
        await loadScript('codes/lang.js');

        // Check for LangService (matching the object name in lang.js)
        if (typeof LangService === 'undefined') {
            throw new Error('Lang service failed to load');
        }

        // Initialize the service (use await in case init is async)
        await LangService.init();

        // 2. Load LoaderEngine
        await loadScript(config_const.COMPONENTS.LOADER.js);

        if (typeof LoaderEngine === 'undefined') {
            throw new Error('LoaderEngine failed');
        }

        // 3. Load main orchestrator (from /codes/)
        await loadScript('codes/index.js');

    } catch (err) {
        console.error('BOOT ERROR:', err);
    }

    function loadScript(src) {
        return new Promise((resolve, reject) => {
            const s = document.createElement('script');
            // Adding a cache-buster or ensuring pathing is correct
            s.src = src;
            s.onload = resolve;
            s.onerror = () => reject(new Error(`Failed to load ${src}`));
            document.head.appendChild(s);
        });
    }

})();
