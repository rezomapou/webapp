/**
 * boot.js — Dynamic bootstrap loader (config-driven)
 */

(async function () {
    try {
        if (typeof config_const === 'undefined') {
            throw new Error('config_const missing in boot');
        }

        const loaderPath = config_const.COMPONENTS?.LOADER?.js;

        if (!loaderPath) {
            throw new Error('Loader path missing in config');
        }

        await loadScript(loaderPath);

        if (typeof LoaderEngine === 'undefined') {
            throw new Error('LoaderEngine failed to initialize');
        }

        // Now load index.js dynamically
        await loadScript('index.js');

    } catch (err) {
        console.error('Boot failure:', err);
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
