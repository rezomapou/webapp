const LangComponent = {

    async init(containerId) {
        const container = document.getElementById(containerId);
        if (!container) { console.warn('Lang container missing:', containerId); return; }
        this.render(container);
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
        const lang = LangService.currentLang;
        const dict = LangService.dictionary?.[lang] || {};

        // Re-apply all data-i elements anywhere on page
        document.querySelectorAll('[data-i]').forEach(el => {
            const key = el.getAttribute('data-i');
            const val = dict[key] || LangService.get(key);
            if (val) el.textContent = val;
        });

        // Re-apply data-s elements (old system pages)
        if (window.s) {
            document.querySelectorAll('[data-s]').forEach(el => {
                const val = s(el.getAttribute('data-s'));
                if (val) el.textContent = val;
            });
        }

        // Re-render DocBlock if present
        if (window.DocBlockComponent) {
            const page    = window.location.pathname.split('/').pop().replace('.html','');
            const pageCfg = config_const.PAGES?.[page];
            if (pageCfg?.content) {
                const containerId = config_const.COMPONENTS.DOC_BLOCK?.containerId;
                DocBlockComponent.init(containerId, pageCfg.content);
            }
        }

        // Re-render Features if present
        if (window.FeaturesComponent) {
            const fc = document.getElementById(config_const.COMPONENTS.FEATURE_BLOCK?.containerId);
            if (fc) FeaturesComponent.applyLang(fc);
        }

        // Re-render Register if present
        if (window.RegisterBlockComponent) {
            const rc = document.getElementById(config_const.COMPONENTS.REGISTER_BLOCK?.containerId);
            if (rc) RegisterBlockComponent.applyLang(rc);
        }

        // Re-render Contact if present
        if (window.ContactBlockComponent) {
            const cc = document.getElementById(config_const.COMPONENTS.CONTACT_BLOCK?.containerId);
            if (cc) ContactBlockComponent.applyLang(cc);
        }

        // Re-render footer
        if (window.FooterComponent) {
            const fc = document.getElementById(config_const.COMPONENTS.FOOTER?.containerId);
            if (fc) { FooterComponent.renderLegal(fc); FooterComponent.renderMeta(fc); }
        }

        // Update page title
        const seo = window.SEO?.[lang];
        const pageKey = window.location.pathname.split('/').pop().replace('.html','') || 'index';
        const title = seo?.[pageKey]?.title || seo?.home?.title;
        if (title) document.title = title;
    }
};

window.LangComponent = LangComponent;
