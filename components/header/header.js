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
        const html = await this.loadHTML();
        container.innerHTML = html;
        await LoaderEngine.loadComponent(config_const.COMPONENTS.HEADER);
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
    async populateSlots(container) {
        const logoSlot = container.querySelector('[data-slot="header-logo"]');
        if (logoSlot) logoSlot.innerHTML = `<div class="logo">RMNE</div>`;
        if (window.LangComponent) {
            await LangComponent.init('lang-container');
        }
    }
};
window.HeaderComponent = HeaderComponent;
console.log("HeaderComponent registered to window.");
