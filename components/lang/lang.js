/**
 * lang.js — Language Switcher
 * Uses event delegation so buttons work after every render()
 */
const LangComponent = {

    async init(containerId) {
        const container = document.getElementById(containerId);
        if (!container) { console.warn('Lang container missing:', containerId); return; }

        // Render buttons
        this.render(container);

        // Event delegation — survives innerHTML re-renders
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
        // data-i elements
        document.querySelectorAll('[data-i]').forEach(el => {
            const val = LangService.get(el.getAttribute('data-i'));
            if (val) el.textContent = val;
        });
        // data-s elements (old system pages)
        if (window.s) {
            document.querySelectorAll('[data-s]').forEach(el => {
                const val = s(el.getAttribute('data-s'));
                if (val) el.textContent = val;
            });
        }
        // Nav links in header and overlay
        document.querySelectorAll('#nav a[data-i], #navOverlayContent a[data-i]').forEach(a => {
            const val = LangService.get(a.getAttribute('data-i'));
            if (val) a.textContent = val;
        });
        // Features
        if (window.FeaturesComponent) {
            const fc = document.getElementById(
                config_const.COMPONENTS.FEATURE_BLOCK.containerId
            );
            if (fc) FeaturesComponent.applyLang(fc);
        }
        // Footer
        if (window.FooterComponent) {
            const fc = document.getElementById(
                config_const.COMPONENTS.FOOTER.containerId
            );
            if (fc) {
                FooterComponent.renderLegal(fc);
                FooterComponent.renderMeta(fc);
            }
        }
    }
};

window.LangComponent = LangComponent;
