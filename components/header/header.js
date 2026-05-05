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

        // 3. NEW: Fill the empty slots so the header has height and content
        this.populateSlots(container);
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

    /**
     * Bridges the gap between the loaded HTML and the dynamic content
     */
    populateSlots(container) {
    const logoSlot = container.querySelector('[data-slot="header-logo"]');
    const navSlot = container.querySelector('[data-slot="header-nav"]');
    const langSlot = container.querySelector('[data-slot="header-lang"]'); // Add this line

    if (logoSlot) logoSlot.innerHTML = `<div class="logo">RMNE</div>`;
    
    // Ensure the langSlot has the ID the LangComponent expects
    if (langSlot) {
        langSlot.id = 'lang-container'; 
        // Trigger the LangComponent if it exists
        if (window.LangComponent) {
            window.LangComponent.init('lang-container');
        }
    }

    if (navSlot) {
        // ... your nav HTML ...
    }
}
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
