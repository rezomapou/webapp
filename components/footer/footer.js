/**
 * footer.js — Footer Component
 */

const FooterComponent = {

    async init(containerId) {
        const container = document.getElementById(containerId);
        if (!container) {
            console.warn('Footer container missing:', containerId);
            return;
        }

        // 1. Load HTML via config
        const html = await this.loadHTML();
        container.innerHTML = html;

        // 2. Load subcomponents (CSS + JS)
        // If your footer has specific deps (like social icons or newsletters), 
        // they should be defined in your config_const.
        await this.loadDependencies();
    },

    async loadHTML() {
        const path = config_const.COMPONENTS.FOOTER.html;

        try {
            const res = await fetch(path);
            if (!res.ok) throw new Error('fetch failed');
            return await res.text();
        } catch (e) {
            console.error('Footer HTML load failed', e);
            return `<footer class="footer-error">© 2026 Fatra se Lò</footer>`;
        }
    },

    async loadDependencies() {
        // Example: if the footer needs specific styles or scripts
        const deps = config_const.COMPONENTS.FOOTER.dependencies || [];

        for (const dep of deps) {
            if (dep.css) await this.loadCSS(dep.css);
            if (dep.js) await this.loadJS(dep.js);
        }
    },

    loadCSS(href) {
        return new Promise(resolve => {
            if (!href || document.querySelector(`link[href="${href}"]`)) {
                return resolve();
            }

            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = href + '?v=' + new Date().getTime();
            link.onload = resolve;
            document.head.appendChild(link);
        });
    },

    loadJS(src) {
        return new Promise((resolve, reject) => {
            if (!src || document.querySelector(`script[src^="${src}"]`)) {
                return resolve();
            }

            const script = document.createElement('script');
            script.src = src + '?v=' + new Date().getTime();
            script.onload = resolve;
            script.onerror = () => reject(new Error(`Footer dependency failed: ${src}`));
            document.body.appendChild(script);
        });
    }

};

// EXPLICIT GLOBAL REGISTRATION
window.FooterComponent = FooterComponent;
console.log("FooterComponent registered to window.");
