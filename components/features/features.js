/**
 * features.js — Features Component
 */
const FeaturesComponent = {

    init(containerId) {
        const container = document.getElementById(containerId);
        if (!container) { console.warn('Features container not found:', containerId); return; }
        // Apply lang immediately — fills all empty data-i elements
        this.applyLang(container);
        this.initTabs(container);
        // Activate tab from URL hash
        const hash = window.location.hash.replace('#ftab-', '');
        if (hash && container.querySelector('#ftab-' + hash)) {
            container.querySelectorAll('.ftab').forEach(t => t.classList.remove('active'));
            container.querySelectorAll('.ftab-content').forEach(p => p.classList.remove('active'));
            const tab = container.querySelector('.ftab[data-tab="' + hash + '"]');
            const panel = container.querySelector('#ftab-' + hash);
            if (tab) tab.classList.add('active');
            if (panel) panel.classList.add('active');
        }
        // Fix CTA button — prevent scroll, activate tab instead
        const ctaBtn = container.querySelector('a[href="#ftab-program"]');
        if (ctaBtn) {
            ctaBtn.addEventListener('click', (e) => {
                e.preventDefault();
                container.querySelectorAll('.ftab').forEach(t => t.classList.remove('active'));
                container.querySelectorAll('.ftab-content').forEach(p => p.classList.remove('active'));
                const tab = container.querySelector('.ftab[data-tab="program"]');
                const panel = container.querySelector('#ftab-program');
                if (tab) tab.classList.add('active');
                if (panel) panel.classList.add('active');
            });
        }
        console.log("FeaturesComponent initialized.");
    },

    applyLang(container) {
        container.querySelectorAll('[data-i]').forEach(el => {
            const key = el.getAttribute('data-i');
            const val = LangService.get(key);
            // Always set — even if val equals key (single-word translations are valid)
            if (val) el.textContent = val;
        });
    },

    initTabs(container) {
        container.querySelectorAll('.ftab').forEach(tab => {
            tab.addEventListener('click', () => {
                const target = tab.getAttribute('data-tab');
                container.querySelectorAll('.ftab').forEach(t => t.classList.remove('active'));
                container.querySelectorAll('.ftab-content').forEach(p => p.classList.remove('active'));
                tab.classList.add('active');
                const panel = container.querySelector('#ftab-' + target);
                if (panel) panel.classList.add('active');
            });
        });
    }
};

window.FeaturesComponent = FeaturesComponent;
console.log("FeaturesComponent registered to window.");
