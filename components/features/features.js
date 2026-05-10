const FeaturesComponent = {

    init(containerId) {
        const container = document.getElementById(containerId);
        if (!container) { console.warn('Features container not found'); return; }

        // Apply lang immediately — synchronous
        this.applyLang(container);

        // Also apply after a tick in case any HTML was lazy-inserted
        setTimeout(() => this.applyLang(container), 0);

        this.initTabs(container);
        this.bindCTA(container);
        console.log("FeaturesComponent initialized.");
    },

    applyLang(container) {
        const lang = LangService.currentLang;
        container.querySelectorAll('[data-i]').forEach(el => {
            const key = el.getAttribute('data-i');
            // Get from dictionary directly to avoid any caching issues
            const dict = LangService.dictionary?.[lang] || LangService.dictionary?.ht;
            const val  = (dict && dict[key]) ? dict[key] : LangService.get(key);
            if (val) el.textContent = val;
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
