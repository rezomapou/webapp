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

        const CODES = config_const.PATHS.CODES;
        const COMPONENTS = config_const.PATHS.COMPONENTS;

        // 1. Lang service
        await loadScript(CODES + '/langservice.js');

        // 2. Analytics component
        await loadScript(COMPONENTS + '/' + config_const.COMPONENTS.ANALYTICS.js);

        // 3. BaseComponent wrapper
        await loadScript(COMPONENTS + '/' + config_const.COMPONENTS.BASECOMPONENT.js);

        // 4. Loader engine
        await loadScript(COMPONENTS + '/' + config_const.COMPONENTS.LOADER.js);

        // 5. App
        await loadScript(CODES + '/index.js');

    } catch (err) {
        console.error('BOOT ERROR:', err);
    }

})();
