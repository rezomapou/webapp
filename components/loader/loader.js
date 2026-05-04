/**
 * LoaderEngine Object
 * A self-contained utility for assembling Black Box components.
 */
/**
 * LoaderEngine: The Master Assembler
 * Encapsulates all loading logic into a single Black Box.
 */
/**
 * LoaderEngine: The Master Assembler with Theming
 */
/* components/loader/loader.js */

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
                target.innerHTML = await response.text();
                
                // CRITICAL: Inject your site_name, site_abbr, etc.
                this.localize(); 
            } catch (e) {
                console.error("Loader theme not found:", style);
            }
        }
    },

    localize() {
        // Get language from storage or default to Kreyòl
        const currentLang = localStorage.getItem('rmn_lang') || 'ht';
        const strings = window.STRINGS ? window.STRINGS[currentLang] : {};
        
        const container = document.getElementById(config_const.COMPONENTS.LOADER.containerId);
        if (!container) return;

        // Map data-s to your specific constants
        container.querySelectorAll('[data-s]').forEach(el => {
            const key = el.getAttribute('data-s');
            if (strings[key]) {
                el.textContent = strings[key];
            }
        });
    }
    // ... loadComponent and hide methods
};
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
            target.innerHTML = await response.text();
            if (comp.css) this.injectStyle(comp.css);
        } catch (err) {
            console.error(`Failed to load ${comp.html}:`, err);
        }
    },

    hide() {
        const overlay = document.getElementById(config_const.COMPONENTS.LOADER.containerId);
        if (overlay) {
            overlay.style.transition = "opacity 0.6s ease-out";
            overlay.style.opacity = "0";
            setTimeout(() => overlay.style.display = 'none', 600);
        }
    }
};
