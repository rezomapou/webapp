/**
 * LoaderEngine — Core Component Loader
 */

if (typeof window.LoaderEngine === 'undefined') {

    const LoaderEngine = {

        async init() {
            await this.loadComponent(config_const.COMPONENTS.LOADER);
        },

        async loadComponent(cfg) {
            if (!cfg) return;

            const { html, css, js, containerId } = cfg;

            try {
                // HTML
                if (html && containerId) {
                    const res = await fetch(html);
                    if (res.ok) {
                        const content = await res.text();
                        const el = document.getElementById(containerId);
                        if (el) el.innerHTML = content;
                    }
                }

                // CSS
                if (css && !document.querySelector(`link[href="${css}"]`)) {
                    const link = document.createElement('link');
                    link.rel = 'stylesheet';
                    link.href = css;
                    document.head.appendChild(link);
                }

                // JS
                if (js && !document.querySelector(`script[src="${js}"]`)) {
                    await this.loadScript(js);
                }

            } catch (err) {
                console.warn('Component failed:', cfg, err);
            }
        },

        loadScript(src) {
            return new Promise((resolve, reject) => {
                const s = document.createElement('script');
                // Use a cache-buster to ensure the latest version is loaded
                s.src = src + '?v=' + new Date().getTime();
                s.onload = resolve;
                s.onerror = () => reject(new Error(`Failed to load ${src}`));
                document.body.appendChild(s);
            });
        },

        hide() {
            const el = document.getElementById('rmn-loader-placeholder');
            if (el) el.style.display = 'none';
        }
    };

    // Explicitly attach to window so it is globally accessible
    window.LoaderEngine = LoaderEngine;
    console.log("LoaderEngine defined successfully.");

} else {
    console.log("LoaderEngine already exists; skipping re-declaration.");
}
