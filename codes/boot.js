/**
 * boot.js — System Bootstrapper
 */

(async function () {

    try {
        if (typeof config_const === 'undefined') {
            throw new Error('config_const missing');
        }

        // 1. Load Lang service
        await loadScript('codes/langservice.js');

        if (typeof window.LangService === 'undefined') {
            throw new Error('LangService object failed to register');
        }

        await window.LangService.init();
        console.log("Lang Service initialized successfully.");

        // 2. Load LoaderEngine (The ONLY time this should be loaded)
        await loadScript(config_const.COMPONENTS.LOADER.js);

        if (typeof LoaderEngine === 'undefined') {
            throw new Error('LoaderEngine failed to load');
        }

        // 3. Load main orchestrator
        await loadScript('codes/index.js');

    } catch (err) {
        console.error('BOOT ERROR:', err);
    }

    function loadScript(src) {
        return new Promise((resolve, reject) => {
            const s = document.createElement('script');
            s.src = src + '?v=' + new Date().getTime();
            s.onload = resolve;
            s.onerror = () => reject(new Error(`Failed to load ${src}`));
            document.head.appendChild(s);
        });
    }

})();
