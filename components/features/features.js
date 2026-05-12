const FeaturesComponent = {

    init(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        // Apply immediately
        this.applyLang(container);

        this.initTabs(container);
        this.bindCTA(container);
        console.log("FeaturesComponent initialized.");
    },

    applyLang(container) {
        const lang = LangService.currentLang;
        const dict = LangService.dictionary?.[lang]
                  || LangService.dictionary?.ht
                  || {};
        container.querySelectorAll('[data-i]').forEach(el => {
            const key = el.getAttribute('data-i');
            const val = dict[key];
            // Only set if we have an actual value (not undefined/null/empty)
            if (val != null && val !== '') el.textContent = val;
        });
    },

    initTabs(container) {
        container.querySelectorAll('.ftab').forEach(tab => {
            tab.addEventListener('click', () => {
                container.querySelectorAll('.ftab').forEach(t => t.classList.remove('active'));
                container.querySelectorAll('.ftab-content').forEach(p => p.classList.remove('active'));
                tab.classList.add('active');
                const panel = container.querySelector('#ftab-' + tab.getAttribute('data-tab'));
                if (panel) panel.classList.add('active');
            });
        });
    },

    bindCTA(container) {
        container.querySelectorAll('.feat-btn-outline').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                container.querySelectorAll('.ftab').forEach(t => t.classList.remove('active'));
                container.querySelectorAll('.ftab-content').forEach(p => p.classList.remove('active'));
                const tab   = container.querySelector('.ftab[data-tab="program"]');
                const panel = container.querySelector('#ftab-program');
                if (tab)   tab.classList.add('active');
                if (panel) { panel.classList.add('active'); panel.scrollIntoView({behavior:'smooth'}); }
            });
        });
    }
};

window.FeaturesComponent = FeaturesComponent;
console.log("FeaturesComponent registered to window.");
