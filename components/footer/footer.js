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
};
window.FooterComponent = FooterComponent;
console.log("FooterComponent registered to window.");
