/**
 * blockstats.js — Stats Block Component
 * Fetches live data from backend, renders top countries/depts/communes in tabs
 */

let BlockstatsComponent = {

    async init(containerId) {
        const container = document.getElementById(containerId);
        if (!container) {
            console.warn('Blockstats container missing:', containerId);
            return;
        }

        // Apply translations to data-s elements
        this.applyLang(container);

        // Wire tab switching
        this.initTabs(container);

        // Fetch and render stats
        await this.fetchAndRender();
    },

    applyLang(container) {
        container.querySelectorAll('[data-s]').forEach(el => {
            const key = el.getAttribute('data-s');
            // Try LangService first, fall back to strings.js s()
            const val = (window.LangService?.get(key)) || (window.s?.(key)) || key;
            if (val && val !== key) el.textContent = val;
        });
    },

    initTabs(container) {
        container.querySelectorAll('.tab-link').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const tabId = btn.getAttribute('onclick')?.match(/'([^']+)'/g)?.[1]?.replace(/'/g, '');
                if (!tabId) return;
                // Deactivate all
                container.querySelectorAll('.tab-link').forEach(b => b.classList.remove('active'));
                container.querySelectorAll('.tab-content').forEach(p => p.classList.remove('active'));
                // Activate selected
                btn.classList.add('active');
                const panel = container.querySelector(`#${tabId}`);
                if (panel) panel.classList.add('active');

                window.Analytics?.track?.('blockstats_tab', { tab: tabId });
            });
        });
    },

    async fetchAndRender() {
        try {
            const url = config_const.SCRIPT_URL + '?action=stats&t=' + Date.now();
            const res = await fetch(url);
            if (!res.ok) throw new Error('Stats fetch failed');
            const data = await res.json();

            this.renderList('list-countries', data.countries || []);
            this.renderList('list-depts',     data.depts     || []);
            this.renderList('list-communes',  data.communes  || []);

        } catch (e) {
            console.warn('Blockstats fetch failed (non-fatal):', e.message);
            // Show placeholder rows so the UI is not empty
            ['list-countries', 'list-depts', 'list-communes'].forEach(id => {
                const el = document.getElementById(id);
                if (el) el.innerHTML = `<div class="stats-placeholder">—</div>`;
            });
        }
    },

    renderList(elementId, items) {
        const el = document.getElementById(elementId);
        if (!el) return;

        if (!items.length) {
            el.innerHTML = `<div class="stats-placeholder">—</div>`;
            return;
        }

        const max = items[0].count || 1;

        el.innerHTML = items.slice(0, 10).map((item, i) => {
            const pct = Math.round((item.count / max) * 100);
            return `
                <div class="stats-row">
                    <span class="stats-rank">${i + 1}</span>
                    <span class="stats-label">${item.name}</span>
                    <div class="stats-bar-track">
                        <div class="stats-bar-fill" style="width:${pct}%"></div>
                    </div>
                    <span class="stats-count">${item.count}</span>
                </div>`;
        }).join('');
    }
};

// Global tab switcher for onclick handlers in HTML
window.openStatTab = function(event, tabId) {
    const container = event?.target?.closest('.stats-block') || document;
    container.querySelectorAll('.tab-link').forEach(b => b.classList.remove('active'));
    container.querySelectorAll('.tab-content').forEach(p => p.classList.remove('active'));
    if (event?.target) event.target.classList.add('active');
    const panel = document.getElementById(tabId);
    if (panel) panel.classList.add('active');
    window.Analytics?.track?.('blockstats_tab', { tab: tabId });
};

BlockstatsComponent = BaseComponent.wrap('BLOCKSTATS', BlockstatsComponent);
window.BlockstatsComponent = BlockstatsComponent;
console.log("BlockstatsComponent registered to window.");
