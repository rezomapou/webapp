/**
 * LoaderEngine — Core Component Loader
 */

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
            s.src = src;
            s.onload = resolve;
            s.onerror = () => reject();
            document.body.appendChild(s);
        });
    },

    hide() {
        const el = document.getElementById('rmn-loader-placeholder');
        if (el) el.style.display = 'none';
    }
};
