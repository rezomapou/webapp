/**
 * boot.js — System Bootstrapper
 */

(async function () {

    try {
        // Ensure configuration is loaded first
        if (typeof config_const === 'undefined') {
            throw new Error('config_const missing');
        }

        // 1. Load Lang service (from /codes/)
        // Renamed from lang.js to langservice.js to avoid component confusion
        await loadScript('codes/langservice.js');

        // Verify the object exists on the window after script load
        if (typeof window.LangService === 'undefined') {
            throw new Error('LangService object failed to register');
        }

        // Await the initialization of the language service
        await window.LangService.init();
        console.log("Lang Service initialized successfully.");

        // 2. Load LoaderEngine
        await loadScript(config_const.COMPONENTS.LOADER.js);

        if (typeof LoaderEngine === 'undefined') {
            throw new Error('LoaderEngine failed to load');
        }

        // 3. Load main orchestrator (from /codes/)
        await loadScript('codes/index.js');

    } catch (err) {
        // Log any failure in the boot sequence
        console.error('BOOT ERROR:', err);
    }

    /**
     * Helper to inject script tags into the document
     */
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
