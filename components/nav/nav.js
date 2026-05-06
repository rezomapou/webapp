const NavComponent = {

    async init(containerId) {
        const container = document.getElementById(containerId);
        if (!container) {
            console.warn('Nav container missing:', containerId);
            return;
        }

        const html = await this.loadHTML();
        container.innerHTML = html;

        this.render(container);
        this.bind(container);
    },

    async loadHTML() {
        const path = config_const.COMPONENTS.NAV.html;

        try {
            const res = await fetch(path);
            if (!res.ok) throw new Error('fetch failed');
            return await res.text();
        } catch (e) {
            console.error('Nav HTML load failed', e);
            return `<div data-slot="nav-root"></div>`;
        }
    },

    render(container) {
        const root = container.querySelector('[data-slot="nav-root"]');
        if (!root) return;

        const items = config_const.NAV_ITEMS || [];

        root.innerHTML = items.map(item => `
            <div class="nav-item" data-tab="${item.tab}">
                ${Lang.get(item.key)}
            </div>
        `).join('');
    },

    bind(container) {
        container.querySelectorAll('.nav-item').forEach(el => {
            el.addEventListener('click', () => {
                const tab = el.dataset.tab;

                // future: routing system can replace this
                if (window.openTab) {
                    window.openTab(null, tab);
                }
            });
        });
    }

};
if (window.Analytics) {
  Analytics.track('component_loaded', { component: 'NAV' });
}
