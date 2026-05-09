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

        const C = '/codes/';
        const P = '/components/';

        // 1. LangService
        await loadScript(C + 'langservice.js');
        if (typeof window.LangService === 'undefined') throw new Error('LangService failed');
        await window.LangService.init();
        console.log("Lang Service initialized successfully.");

        // 2. Update <title> from STRINGS — no hardcoded titles needed in HTML
        try {
            const lang    = LangService.currentLang;
            const page    = window.location.pathname.split('/').pop().replace('.html','') || 'index';
            const seoLang = window.SEO?.[lang] || window.SEO?.ht;
            const title   = seoLang?.[page]?.title || seoLang?.home?.title;
            if (title) document.title = title;
        } catch(e) {}

        // 3. Analytics (non-blocking)
        try {
            await loadScript(P + config_const.COMPONENTS.ANALYTICS.js);
        } catch(e) {
            console.warn('Analytics failed (non-fatal):', e.message);
            window.Analytics = { track() {} };
        }

        // 4. BaseComponent
        await loadScript(P + config_const.COMPONENTS.BASECOMPONENT.js);

        // 5. LoaderEngine
        await loadScript(P + config_const.COMPONENTS.LOADER.js);
        if (typeof LoaderEngine === 'undefined') throw new Error('LoaderEngine failed');
        await LoaderEngine.init();

        // 6. Orchestrator
        await loadScript(C + 'index.js');

    } catch (err) {
        console.error('BOOT ERROR:', err);
        const el = document.getElementById('loader-container');
        if (el) el.style.display = 'none';
    }
})();
