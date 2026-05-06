const LangComponent = {
    async init(containerId) {
        const container = document.getElementById(containerId);
        if (!container) {
            console.warn('Lang container missing:', containerId);
            return;
        }
        const html = await this.loadHTML();
        container.innerHTML = html;
        this.render(container);
        this.bind(container);
    },
    async loadHTML() {
        try {
            const res = await fetch('components/lang/lang.html');
            return await res.text();
        } catch (e) {
            console.error('Lang HTML load failed', e);
            return `<div data-slot="lang-root"></div>`;
        }
    },
    render(container) {
        const root = container.querySelector('[data-slot="lang-root"]');
        if (!root) return;
        const current = LangService.currentLang;
        root.innerHTML = `
            <button class="lang-btn ${current === 'ht' ? 'active' : ''}" data-lang="ht">KR</button>
            <button class="lang-btn ${current === 'fr' ? 'active' : ''}" data-lang="fr">FR</button>
            <button class="lang-btn ${current === 'en' ? 'active' : ''}" data-lang="en">EN</button>
        `;
    },
    bind(container) {
        container.querySelectorAll('.lang-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                LangService.setLang(btn.dataset.lang);
                this.render(container);
                this.refreshPage();
            });
        });
    },
    refreshPage() {
        // Re-apply all data-i translations without full reload
        document.querySelectorAll('[data-i]').forEach(el => {
            const val = LangService.get(el.getAttribute('data-i'));
            if (val) el.textContent = val;
        });
        // Re-init features if present
        if (window.FeaturesComponent) {
            FeaturesComponent.applyLang(document.getElementById(
                config_const.COMPONENTS.FEATURE_BLOCK.containerId
            ));
        }
    }
};
if (window.Analytics) {
  Analytics.track('component_loaded', { component: 'LANG' });
}
window.LangComponent = LangComponent;
