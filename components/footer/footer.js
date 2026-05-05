/**
 * footer.js — Footer Component
 */

const FooterComponent = {

    async init(containerId) {
        let container = document.getElementById(containerId);
        if (!container) {
            await new Promise(r => setTimeout(r, 100));
            container = document.getElementById(containerId);
        }

        if (!container) {
            console.error('Footer container missing after retry:', containerId);
            return;
        }

        // 1. Load HTML via config
        const html = await this.loadHTML();
        container.innerHTML = html;

        // 2. Load subcomponents (CSS + JS)
        await this.loadDependencies();

        // 3. Populate the empty slots with content
        this.populateSlots(container);
    },

    async loadHTML() {
        const path = config_const.COMPONENTS.FOOTER.html;
        try {
            const res = await fetch(path);
            if (!res.ok) throw new Error('fetch failed');
            return await res.text();
        } catch (e) {
            console.error('Footer HTML load failed', e);
            // Fallback content if the file is missing
            return `<footer class="footer-error">© 2026 RMNE - Fatra se Lò</footer>`;
        }
    },

    async loadDependencies() {
        const deps = config_const.COMPONENTS.FOOTER.dependencies || [];
        for (const dep of deps) {
            if (dep.css) await this.loadCSS(dep.css);
            if (dep.js) await this.loadJS(dep.js);
        }
    },

    /**
     * Fills the data-slots found in the footer HTML
     */
    populateSlots(container) {
        const linksSlot = container.querySelector('[data-slot="footer-links"]');
        const metaSlot = container.querySelector('[data-slot="footer-meta"]');

        if (linksSlot) {
            // Adding content to give the div height
            linksSlot.innerHTML = `
                <nav>
                    <a href="https://rezomapouglobal.net" target="_blank">Rezo Mapou Global</a>
                </nav>`;
        }

        if (metaSlot) {
            metaSlot.innerHTML = `<p>© 2026 RMNE | Fatra se Lò Initiative</p>`;
        }
        
        console.log("Footer content populated into slots.");
    },

    loadCSS(href) {
        return new Promise(resolve => {
            if (!href || document.querySelector(`link[href="${href}"]`)) return resolve();
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = href + '?v=' + new Date().getTime();
            link.onload = resolve;
            document.head.appendChild(link);
        });
    },

    loadJS(src) {
        return new Promise((resolve, reject) => {
            if (!src || document.querySelector(`script[src^="${src}"]`)) return resolve();
            const script = document.createElement('script');
            script.src = src + '?v=' + new Date().getTime();
            script.onload = resolve;
            script.onerror = () => reject(new Error(`Footer dependency failed: ${src}`));
            document.body.appendChild(script);
        });
    }
};

window.FooterComponent = FooterComponent;
console.log("FooterComponent registered to window.");
