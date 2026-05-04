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

        // 2. Render
        this.render(container);

        // 3. Bind
        this.bind(container);
    },

    async loadHTML() {
        const path = config_const.COMPONENTS.FOOTER.html;

        try {
            const res = await fetch(path);
            if (!res.ok) throw new Error('fetch failed');
            return await res.text();
        } catch (e) {
            console.error('Footer HTML load failed', e);
            return `<div data-slot="footer-root"></div>`;
        }
    },

    render(container) {
        const linksRoot = container.querySelector('[data-slot="footer-links"]');
        const metaRoot = container.querySelector('[data-slot="footer-meta"]');

        if (linksRoot) {
            const links = config_const.FOOTER_LINKS || [];

            linksRoot.innerHTML = links.map(link => `
                <div class="footer-link" data-action="${link.action}">
                    ${Lang.get(link.key)}
                </div>
            `).join('');
        }

        if (metaRoot && config_const.FOOTER_META) {
            metaRoot.innerHTML = Lang.get(config_const.FOOTER_META.key);
        }
    },

    bind(container) {
        container.querySelectorAll('.footer-link').forEach(el => {
            el.addEventListener('click', () => {
                const action = el.dataset.action;

                // Placeholder behavior (can evolve later)
                console.log('Footer action:', action);
            });
        });
    }

};
