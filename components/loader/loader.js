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
                if (css) await this.loadCSS(css);

                // JS
                if (js) await this.loadScript(js);

            } catch (err) {
                console.warn('Component failed:', cfg, err);
            }
        },

        loadCSS(href) {
            return new Promise(resolve => {

                if (!href || document.querySelector(`link[href^="${href}"]`)) {
                    return resolve();
                }

                const link = document.createElement('link');
                link.rel = 'stylesheet';
                link.href = href + '?v=' + Date.now();
                link.onload = resolve;
                document.head.appendChild(link);
            });
        },

        loadScript(src) {
            return new Promise((resolve, reject) => {

                if (!src || document.querySelector(`script[src^="${src}"]`)) {
                    return resolve();
                }

                const s = document.createElement('script');
                s.src = src + '?v=' + Date.now();
                s.onload = resolve;
                s.onerror = () => reject(new Error(`Failed to load ${src}`));
                document.body.appendChild(s);
            });
        },

        hide() {
            const containerId = config_const.COMPONENTS.LOADER.containerId;
            const el = document.getElementById(containerId);

            if (el) {
                el.style.display = 'none';
                console.log(`Loader (${containerId}) hidden.`);
            }
        }
    };

    window.LoaderEngine = LoaderEngine;
    console.log("LoaderEngine defined successfully.");

} else {
    console.log("LoaderEngine already exists; skipping re-declaration.");
}
