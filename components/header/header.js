/**
 * header.js — Header Component
 */

const HeaderComponent = {

    async init(containerId) {
        // Safety retry logic for fast-loading scripts
        let container = document.getElementById(containerId);
        if (!container) {
            await new Promise(r => setTimeout(r, 100)); // Wait 100ms
            container = document.getElementById(containerId);
        }

        if (!container) {
            console.error('Header container missing after retry:', containerId);
            return;
        }

        // 1. Load HTML via config
        const html = await this.loadHTML();
        container.innerHTML = html;

        // 2. Load subcomponents (CSS + JS)
        await this.loadDependencies();

        // 3. Initialize subcomponents
        await this.initChildren(container);
    },

    async loadHTML() {
        const path = config_const.COMPONENTS.HEADER.html;
        try {
            const res = await fetch(path);
            if (!res.ok) throw new Error('fetch failed');
            return await res.text();
        } catch (e) {
            console.error('Header HTML load failed', e);
            return `<div data-slot="header-root"></div>`;
        }
    },

    async loadDependencies() {
        const deps = [
            config_const.COMPONENTS.LANG,
            config_const.COMPONENTS.NAV,
            config_const.COMPONENTS.NAVSTATS
        ];

        for (const dep of deps) {
            if (dep.css) await this.loadCSS(dep.css);
            if (dep.js) await this.loadJS(dep.js);
        }
    },

    async initChildren(container) {
        // Mapping slots to our new -container naming convention
        const langSlot = container.querySelector('[data-slot="header-lang"]');
        const navSlot = container.querySelector('[data-slot="header-nav"]');
        const statsSlot = container.querySelector('[data-slot="header-navstats"]');

        if (langSlot) langSlot.id = 'lang-container';
        if (navSlot) navSlot.id = 'nav-container';
        if (statsSlot) statsSlot.id = 'navstats-container';

        // Init components only if they registered to the window
        if (window.LangComponent && langSlot) {
            await window.LangComponent.init('lang-container');
        }

        if (window.NavComponent && navSlot) {
            await window.NavComponent.init('nav-container');
        }

        if (window.NavStatsComponent && statsSlot) {
            await window.NavStatsComponent.init('navstats-container');
        }
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
            script.onerror = () => reject(new Error(`Header dependency failed: ${src}`));
            document.body.appendChild(script);
        });
    }
};

window.HeaderComponent = HeaderComponent;
console.log("HeaderComponent registered to window.");
