const NavComponent = {

    async init(containerId) {
        const container = document.getElementById(containerId);
        if (!container) {
            console.warn('Nav container missing:', containerId);
            return;
        }

        // 1. Load HTML
        const html = await this.loadHTML();
        container.innerHTML = html;

        // 2. Inject content
        this.render(container);

        // 3. Bind events
        this.bind(container);
    },

    async loadHTML() {
        try {
            const res = await fetch('components/nav/nav.html');
            return await res.text();
        } catch (e) {
            console.error('Nav HTML load failed', e);
            return `<div>Nav failed</div>`;
        }
    },

    render(container) {
        const root = container.querySelector('[data-slot="nav-root"]');
        if (!root) return;

        root.innerHTML = `
            <div class="nav-item" data-tab="home">${this.t('nav_home')}</div>
            <div class="nav-item" data-tab="about">${this.t('nav_about')}</div>
            <div class="nav-item" data-tab="contact">${this.t('nav_contact')}</div>
        `;
    },

    bind(container) {
        container.querySelectorAll('.nav-item').forEach(el => {
            el.addEventListener('click', () => {
                const tab = el.dataset.tab;
                if (window.openTab) {
                    window.openTab(null, tab);
                }
            });
        });
    },

    t(key) {
        const lang = localStorage.getItem('rmn_lang') || 'ht';
        return window.STRINGS?.[lang]?.[key] || key;
    }

};
