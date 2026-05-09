const FeaturesComponent = {

    init(containerId) {
        const container = document.getElementById(containerId);
        if (!container) { console.warn('Features container not found:', containerId); return; }

        // Apply lang FIRST — fills all empty data-i elements before anything renders
        this.applyLang(container);

        // Wire tabs
        this.initTabs(container);

        // Fix CTA "How it works" button — activates program tab
        const cta = container.querySelector('a[href="#ftab-program"], .feat-btn-outline');
        if (cta) {
            cta.addEventListener('click', (e) => {
                e.preventDefault();
                container.querySelectorAll('.ftab').forEach(t => t.classList.remove('active'));
                container.querySelectorAll('.ftab-content').forEach(p => p.classList.remove('active'));
                const tab   = container.querySelector('.ftab[data-tab="program"]');
                const panel = container.querySelector('#ftab-program');
                if (tab)   tab.classList.add('active');
                if (panel) panel.classList.add('active');
                panel?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            });
        }

        console.log("FeaturesComponent initialized.");
    },

    applyLang(container) {
        container.querySelectorAll('[data-i]').forEach(el => {
            const key = el.getAttribute('data-i');
            const val = LangService.get(key);
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
    }
};

window.FeaturesComponent = FeaturesComponent;
console.log("FeaturesComponent registered to window.");
