const NavStatsComponent = {

    async init(containerId) {
        const container = document.getElementById(containerId);
        if (!container) {
            console.warn('NavStats container missing:', containerId);
            return;
        }

        // 1. Load HTML (from config)
        const html = await this.loadHTML();
        container.innerHTML = html;

        // 2. Render
        this.render(container);
    },

    async loadHTML() {
        const path = config_const.COMPONENTS.NAVSTATS.html;

        try {
            const res = await fetch(path);
            if (!res.ok) throw new Error('fetch failed');
            return await res.text();
        } catch (e) {
            console.error('NavStats HTML load failed', e);

            // No hardcoded fallback → return empty safe structure
            return `<div data-slot="navstats-root"></div>`;
        }
    },

    render(container) {
        const root = container.querySelector('[data-slot="navstats-root"]');
        if (!root) return;

        const stats = config_const.NAVSTATS_DATA || [];

        root.innerHTML = stats.map(s => `
            <div class="navstat-item">
                <span>${s.value}</span>
                <span>${Lang.get(s.key)}</span>
            </div>
        `).join('');
    }

},
    if (window.Analytics) {
  Analytics.track('component_loaded', { component: 'NAVSTATS' });
  }
