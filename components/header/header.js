/**
 * header.js — Header Component
 */
const HeaderComponent = {
    async init(containerId) {
        let container = document.getElementById(containerId);
        if (!container) {
            await new Promise(r => setTimeout(r, 100));
            container = document.getElementById(containerId);
        }
        if (!container) {
            console.error('Header container missing after retry:', containerId);
            return;
        }
        // 1. Load HTML from config
        const html = await this.loadHTML();
        container.innerHTML = html;
        // 2. Load subcomponents (CSS + JS)
        await this.loadDependencies();
        // 3. Fill the empty slots so the header has height and content
        await this.populateSlots(container);
    },
    async loadHTML() {
        const path = config_const.COMPONENTS.HEADER.html;
        try {
            const res = await fetch(path);
            if (!res.ok) throw new Error('fetch failed');
            return await res.text();
        } catch (e) {
            console.error('Header HTML load failed', e);
            return `<header class="header-error"><h1>RMNE - Fatra se Lò</h1></header>`;
        }
    },
    async loadDependencies() {
        const deps = config_const.COMPONENTS.HEADER.dependencies || [];
        for (const dep of deps) {
            if (dep.css) await this.loadCSS(dep.css);
            if (dep.js) await this.loadJS(dep.js);
        }
    },
    async populateSlots(container) {
        // Logo
        const logoSlot = container.querySelector('[data-slot="header-logo"]');
        if (logoSlot) logoSlot.innerHTML = `<div class="logo">RMNE</div>`;
        // Language bar — LangComponent already loaded by boot.js
        if (window.LangComponent) {
            await LangComponent.init('lang-container');
        }
    },
    loadCSS(href) {
        return new Promise(resolve => {
            if (!href || document.querySelector(`link[href^="${href}"]`)) return resolve();
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
            script.onerror = () => reject(new Error(`Header dependency failed: ${src}`));
            document.body.appendChild(script);
        });
    }
};
window.HeaderComponent = HeaderComponent;
console.log("HeaderComponent registered to window.");
