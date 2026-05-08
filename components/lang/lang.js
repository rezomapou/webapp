const LangComponent = {

    async init(containerId) {
        const container = document.getElementById(containerId);
        if (!container) { console.warn('Lang container missing:', containerId); return; }

        // Render buttons directly — no separate HTML file fetch needed
        this.render(container);

        // Event delegation on container — survives re-renders
        container.addEventListener('click', (e) => {
            const btn = e.target.closest('.lang-btn');
            if (!btn) return;
            LangService.setLang(btn.dataset.lang);
            this.render(container);
            this.refreshPage();
        });
    },

    render(container) {
        const cur = LangService.currentLang;
        container.innerHTML = `<div class="lang-bar">
            <button class="lang-btn${cur==='ht'?' active':''}" data-lang="ht">KR</button>
            <button class="lang-btn${cur==='fr'?' active':''}" data-lang="fr">FR</button>
            <button class="lang-btn${cur==='en'?' active':''}" data-lang="en">EN</button>
        </div>`;
    },

    refreshPage() {
        document.querySelectorAll('[data-i]').forEach(el => {
            const val = LangService.get(el.getAttribute('data-i'));
            if (val) el.textContent = val;
        });
        if (window.s) {
            document.querySelectorAll('[data-s]').forEach(el => {
                const val = s(el.getAttribute('data-s'));
                if (val) el.textContent = val;
            });
        }
        if (window.FeaturesComponent) {
            const fc = document.getElementById(config_const.COMPONENTS.FEATURE_BLOCK?.containerId);
            if (fc) FeaturesComponent.applyLang(fc);
        }
        if (window.FooterComponent) {
            const fc = document.getElementById(config_const.COMPONENTS.FOOTER?.containerId);
            if (fc) { FooterComponent.renderLegal(fc); FooterComponent.renderMeta(fc); }
        }
    }
};

window.LangComponent = LangComponent;
