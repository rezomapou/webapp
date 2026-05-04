const HeaderComponent = {

    async init(containerId) {
        const container = document.getElementById(containerId);
        if (!container) {
            console.warn('Header container missing:', containerId);
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
            await this.loadCSS(dep.css);
            await this.loadJS(dep.js);
        }
    },

    async initChildren(container) {
        const langSlot = container.querySelector('[data-slot="header-lang"]');
        const navSlot = container.querySelector('[data-slot="header-nav"]');
        const statsSlot = container.querySelector('[data-slot="header-navstats"]');

        // assign IDs dynamically (keeps HTML clean)
        if (langSlot) langSlot.id = 'header-lang-container';
        if (navSlot) navSlot.id = 'header-nav-container';
        if (statsSlot) statsSlot.id = 'header-navstats-container';

        // init components (only if available)
        if (window.LangComponent && langSlot) {
            await LangComponent.init('header-lang-container');
        }

        if (window.NavComponent && navSlot) {
            await NavComponent.init('header-nav-container');
        }

        if (window.NavStatsComponent && statsSlot) {
            await NavStatsComponent.init('header-navstats-container');
        }
    },

    loadCSS(href) {
        return new Promise(resolve => {
            if (!href || document.querySelector(`link[href="${href}"]`)) {
                return resolve();
            }

            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = href;
            link.onload = resolve;
            document.head.appendChild(link);
        });
    },

    loadJS(src) {
        return new Promise((resolve, reject) => {
            if (!src || document.querySelector(`script[src="${src}"]`)) {
                return resolve();
            }

            const script = document.createElement('script');
            script.src = src;
            script.onload = resolve;
            script.onerror = () => reject();
            document.body.appendChild(script);
        });
    }

};
