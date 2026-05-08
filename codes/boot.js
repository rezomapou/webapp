(async function () {
    try {
        if (typeof config_const === 'undefined') throw new Error('config_const missing');

        function loadScript(src) {
            return new Promise((resolve, reject) => {
                const s = document.createElement('script');
                s.src = src + '?v=' + Date.now();
                s.onload = resolve;
                s.onerror = () => reject(new Error(`Failed: ${src}`));
                document.head.appendChild(s);
            });
        }

        // Always absolute from root
        const C = '/codes/';
        const P = '/components/';

        // 1. LangService
        await loadScript(C + 'langservice.js');
        if (typeof window.LangService === 'undefined') throw new Error('LangService failed');
        await window.LangService.init();
        console.log("Lang Service initialized successfully.");

        // 2. Analytics (non-blocking)
        try {
            await loadScript(P + config_const.COMPONENTS.ANALYTICS.js);
        } catch(e) {
            console.warn('Analytics failed (non-fatal):', e.message);
            window.Analytics = { track() {} };
        }

        // 3. BaseComponent
        await loadScript(P + config_const.COMPONENTS.BASECOMPONENT.js);

        // 4. LoaderEngine
        await loadScript(P + config_const.COMPONENTS.LOADER.js);
        if (typeof LoaderEngine === 'undefined') throw new Error('LoaderEngine failed');
        await LoaderEngine.init();

        // 5. Orchestrator
        await loadScript(C + 'index.js');

    } catch (err) {
        console.error('BOOT ERROR:', err);
        const el = document.getElementById('loader-container');
        if (el) el.style.display = 'none';
    }
})();
