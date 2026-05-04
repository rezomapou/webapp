/**
 * LoaderEngine: The Master Assembler with Theming
 * Encapsulates all loading logic into a single Black Box.
 */
const LoaderEngine = {
    async init() {
        // Read theme from SETTINGS
        const style = config_const.SETTINGS.LOADER_STYLE.toLowerCase();
        const folder = config_const.COMPONENTS.LOADER.folder;
        
        // Dynamic path construction
        const themeHTML = `${folder}/${style}.html`;
        const themeCSS = `${folder}/${style}.css`;

        this.injectStyle(themeCSS);

        const target = document.getElementById(config_const.COMPONENTS.LOADER.containerId);
        if (target) {
            try {
                const response = await fetch(themeHTML);
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                target.innerHTML = await response.text();
                
                // Inject localized strings (site_name, etc.)
                this.localize(); 
            } catch (e) {
                console.error("Loader theme not found or failed to load:", themeHTML, e);
            }
        }
    },

    localize() {
        const currentLang = localStorage.getItem('rmn_lang') || 'ht';
        const strings = window.STRINGS ? window.STRINGS[currentLang] : {};
        
        const container = document.getElementById(config_const.COMPONENTS.LOADER.containerId);
        if (!container) return;

        container.querySelectorAll('[data-s]').forEach(el => {
            const key = el.getAttribute('data-s');
            if (strings[key]) {
                el.textContent = strings[key];
            }
        });
    },

    injectStyle(path) {
        if (!path || document.querySelector(`link[href="${path}"]`)) return;
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = path;
        document.head.appendChild(link);
    },

    async loadComponent(comp) {
        if (!comp || !comp.containerId) return;
        const target = document.getElementById(comp.containerId);
        if (!target) return;

        try {
            const response = await fetch(comp.html);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            target.innerHTML = await response.text();
            if (comp.css) this.injectStyle(comp.css);
        } catch (err) {
            console.error(`Failed to load component: ${comp.html}`, err);
        }
    },

    hide() {
        // Look for the specific overlay ID inside the injected HTML
        const overlay = document.getElementById('rmn-loader-overlay');
        if (overlay) {
            overlay.style.transition = "opacity 0.6s ease-out";
            overlay.style.opacity = "0";
            setTimeout(() => {
                overlay.style.display = 'none';
            }, 600);
        }
    }
}; // The object now closes correctly here.
