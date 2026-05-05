/**
 * footer.js — Footer Component
 */
const FooterComponent = {
    async init(containerId) {
     const html = await this.loadHTML();
        container.innerHTML = html;
        await LoaderEngine.loadComponent(config_const.COMPONENTS.FOOTER);
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
            return `<footer class="footer-error">${LangService.get('footer_meta')}</footer>`;
        }
    },
    async loadDependencies() {
        const deps = config_const.COMPONENTS.FOOTER.dependencies || [];
        for (const dep of deps) {
            if (dep.css) await this.loadCSS(dep.css);
            if (dep.js) await this.loadJS(dep.js);
        }
    },
    populateSlots(container) {
        const linksSlot = container.querySelector('[data-slot="footer-links"]');
        const metaSlot  = container.querySelector('[data-slot="footer-meta"]');

        if (linksSlot) {
            const links = config_const.COMPONENTS.FOOTER_LINKS
                .map(link => `<a href="#" data-action="${link.action}">${LangService.get(link.key)}</a>`)
                .join('');
            linksSlot.innerHTML = `<nav>${links}</nav>`;
        }

        if (metaSlot) {
            const metaKey = config_const.COMPONENTS.FOOTER_META.key;
            metaSlot.innerHTML = `<p>${LangService.get(metaKey)}</p>`;
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
