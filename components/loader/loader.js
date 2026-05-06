/**
 * loader.js — LoaderEngine
 */
if (typeof window.LoaderEngine === 'undefined') {

    const LoaderEngine = {

        _pre() {
            return (config_const?.PATHS?.COMPONENTS || 'components') + '/';
        },

        async init() {
            await this.loadComponent(config_const.COMPONENTS.LOADER);
        },

        async loadComponent(cfg) {
            if (!cfg) return;
            const pre = this._pre();
            const html = cfg.html ? pre + cfg.html : null;
            const css  = cfg.css  ? pre + cfg.css  : null;
            const js   = cfg.js   ? pre + cfg.js   : null;
            const { containerId } = cfg;

            try {
                if (html && containerId) {
                    const res = await fetch(html);
                    if (res.ok) {
                        const el = document.getElementById(containerId);
                        if (el) el.innerHTML = await res.text();
                    }
                }
                if (css) await this.loadCSS(css);
                if (js)  await this.loadScript(js);
            } catch (err) {
                console.warn('Component failed:', cfg, err);
            }
        },

        loadCSS(href) {
            return new Promise(resolve => {
                if (!href || document.querySelector(`link[href^="${href}"]`)) return resolve();
                const link = document.createElement('link');
                link.rel  = 'stylesheet';
                link.href = href + '?v=' + Date.now();
                link.onload = resolve;
                document.head.appendChild(link);
            });
        },

        loadScript(src) {
            return new Promise((resolve, reject) => {
                if (!src || document.querySelector(`script[src^="${src}"]`)) return resolve();
                const s = document.createElement('script');
                s.src = src + '?v=' + Date.now();
                s.onload = resolve;
                s.onerror = () => reject(new Error(`Failed: ${src}`));
                document.body.appendChild(s);
            });
        },

        hide() {
            const el = document.getElementById(
                config_const?.COMPONENTS?.LOADER?.containerId || 'loader-container'
            );
            if (el) {
                el.style.display = 'none';
                console.log('Loader hidden.');
            }
        }
    };

    window.LoaderEngine = LoaderEngine;
    console.log("LoaderEngine defined successfully.");

} else {
    console.log("LoaderEngine already exists.");
}
