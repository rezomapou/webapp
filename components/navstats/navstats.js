const NavStatsComponent = {

    async init(containerId) {
        const container = document.getElementById(containerId);
        if (!container) {
            console.warn('NavStats container missing:', containerId);
            return;
        }

        // 1. Load HTML
        const html = await this.loadHTML();
        container.innerHTML = html;

        // 2. Render simple stats
        this.render(container);
    },

    async loadHTML() {
        try {
            const res = await fetch('components/navstats/navstats.html');
            return await res.text();
        } catch (e) {
            console.error('NavStats HTML load failed', e);
            return `<div>Stats unavailable</div>`;
        }
    },

    render(container) {
        const root = container.querySelector('[data-slot="navstats-root"]');
        if (!root) return;

        // 🔹 STATIC / MOCK DATA (intentionally simple)
        const stats = [
            { key: 'stat_members', value: 128 },
            { key: 'stat_actions', value: 54 },
            { key: 'stat_points', value: 876 }
        ];

        root.innerHTML = stats.map(s => `
            <div class="navstat-item">
                <span>${s.value}</span>
                <span>${Lang.get(s.key)}</span>
            </div>
        `).join('');
    }

};
