/**
 * features.js — Features Component
 */
const FeaturesComponent = {
    init(containerId) {
        const container = document.getElementById(containerId);
        if (!container) {
            console.warn('Features container not found:', containerId);
            return;
        }
        // Render all data-i text via LangService
        this.applyLang(container);
        // Wire up tab switching
        this.initTabs(container);
        console.log("FeaturesComponent initialized.");
    },

    applyLang(container) {
        container.querySelectorAll('[data-i]').forEach(el => {
            const key = el.getAttribute('data-i');
            const val = LangService.get(key);
            if (val && val !== key) el.textContent = val;
        });
    },

    initTabs(container) {
        const tabs = container.querySelectorAll('.ftab');
        const panels = container.querySelectorAll('.ftab-content');
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const target = tab.getAttribute('data-tab');
                tabs.forEach(t => t.classList.remove('active'));
                panels.forEach(p => p.classList.remove('active'));
                tab.classList.add('active');
                const panel = container.querySelector(`#ftab-${target}`);
                if (panel) panel.classList.add('active');
            });
        });
    }
};
window.FeaturesComponent = FeaturesComponent;
console.log("FeaturesComponent registered to window.");
