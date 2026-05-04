const LangComponent = {

    async init(containerId) {
        const container = document.getElementById(containerId);
        if (!container) {
            console.warn('Lang container missing:', containerId);
            return;
        }

        // 1. Load HTML
        const html = await this.loadHTML();
        container.innerHTML = html;

        // 2. Render UI
        this.render(container);

        // 3. Bind events
        this.bind(container);
    },

    async loadHTML() {
        try {
            const res = await fetch('components/lang/lang.html');
            return await res.text();
        } catch (e) {
            console.error('Lang HTML load failed', e);
            return `<div>Lang failed</div>`;
        }
    },

    render(container) {
        const root = container.querySelector('[data-slot="lang-root"]');
        if (!root) return;

        const current = Lang.current;

        root.innerHTML = `
            <div class="lang-btn ${current === 'ht' ? 'active' : ''}" data-lang="ht">KREYÒL</div>
            <div class="lang-btn ${current === 'fr' ? 'active' : ''}" data-lang="fr">FR</div>
            <div class="lang-btn ${current === 'en' ? 'active' : ''}" data-lang="en">EN</div>
        `;
    },

    bind(container) {
        container.querySelectorAll('.lang-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const lang = btn.dataset.lang;

                // 1. Update global language
                Lang.set(lang);

                // 2. Re-render entire page (simple & robust strategy)
                this.refreshApp();
            });
        });
    },

    refreshApp() {
        // Minimal safe refresh strategy
        // avoids partial inconsistencies across components
        location.reload();
    }

};
