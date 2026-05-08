if (typeof window.LoaderEngine === 'undefined') {
    const LoaderEngine = {

        // Always absolute from root
        _p() { return '/components/'; },

        async init() {
            await this.loadComponent(config_const.COMPONENTS.LOADER);
        },

        async loadComponent(cfg) {
            if (!cfg) return;
            const pre = this._p();
            try {
                if (cfg.html && cfg.containerId) {
                    const res = await fetch(pre + cfg.html);
                    if (res.ok) {
                        const el = document.getElementById(cfg.containerId);
                        if (el) el.innerHTML = await res.text();
                    }
                }
                if (cfg.css) await this.loadCSS(pre + cfg.css);
                if (cfg.js)  await this.loadScript(pre + cfg.js);
            } catch (err) {
                console.warn('Component failed:', cfg.containerId, err.message);
            }
        },

        loadCSS(href) {
            return new Promise(resolve => {
                if (!href || document.querySelector(`link[href^="${href}"]`)) return resolve();
                const link = document.createElement('link');
                link.rel = 'stylesheet';
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
            if (el) { el.style.display = 'none'; console.log('Loader hidden.'); }
        }
    };
    window.LoaderEngine = LoaderEngine;
    console.log("LoaderEngine defined successfully.");
} else {
    console.log("LoaderEngine already exists.");
}
