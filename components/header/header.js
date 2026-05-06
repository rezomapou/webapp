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
        const html = await this.loadHTML();
        container.innerHTML = html;
        // Load CSS only — do not re-inject HTML via loadComponent
        await LoaderEngine.loadCSS(config_const.COMPONENTS.HEADER.css);
        await this.populateSlots(container);
        console.log("HeaderComponent initialized.");
    },
    async loadHTML() {
        const path = config_const.COMPONENTS.HEADER.html;
        try {
            const res = await fetch(path);
            if (!res.ok) throw new Error('fetch failed');
            return await res.text();
        } catch (e) {
            console.error('Header HTML load failed', e);
            return `<div class="top-bar"><div class="top-bar-inner"><div class="top-bar-left"></div><div class="lang-bar" id="lang-container"><div data-slot="lang-root"></div></div></div></div><nav class="nav"><div class="nav-inner"><span class="nav-name">Rezo Mapou</span></div></nav>`;
        }
    },
    async populateSlots(container) {
        container.querySelectorAll('[data-i]').forEach(el => {
            const val = LangService.get(el.getAttribute('data-i'));
            if (val) el.textContent = val;
        });
        if (window.LangComponent) {
            await LangComponent.init('lang-container');
        }
    }
};
window.HeaderComponent = HeaderComponent;
console.log("HeaderComponent registered to window.");
