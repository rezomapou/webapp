/**
 * boot.js — System Bootstrapper
 */
(async function () {
    try {
        if (typeof config_const === 'undefined') {
            throw new Error('config_const missing');
        }

        function loadScript(src) {
            return new Promise((resolve, reject) => {
                const s = document.createElement('script');
                s.src = src + '?v=' + Date.now();
                s.onload = resolve;
                s.onerror = () => reject(new Error(`Failed: ${src}`));
                document.head.appendChild(s);
            });
        }

        const CODES      = config_const.PATHS.CODES;
        const COMPONENTS = config_const.PATHS.COMPONENTS;

        // 1. Analytics (non-blocking — log only, no throw)
        try {
            await loadScript(COMPONENTS + '/' + config_const.COMPONENTS.ANALYTICS.js);
        } catch(e) {
            console.warn('Analytics failed to load (non-fatal):', e.message);
            window.Analytics = { track() {} }; // silent stub
        }

        // 2. BaseComponent wrapper
        await loadScript(COMPONENTS + '/' + config_const.COMPONENTS.BASECOMPONENT.js);

        // 3. LangService
        await loadScript(CODES + '/langservice.js');
        if (typeof window.LangService === 'undefined') throw new Error('LangService failed');
        await window.LangService.init();
        console.log("Lang Service initialized successfully.");

        // 4. LoaderEngine
        await loadScript(COMPONENTS + '/' + config_const.COMPONENTS.LOADER.js);
        if (typeof LoaderEngine === 'undefined') throw new Error('LoaderEngine failed');
        await LoaderEngine.init();

        // 5. App orchestrator
        await loadScript(CODES + '/index.js');

    } catch (err) {
        console.error('BOOT ERROR:', err);
    }
})();
