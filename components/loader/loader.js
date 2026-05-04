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
const LoaderEngine = {
    
    async init() {
        const style = config_const.SETTINGS.LOADER_STYLE.toLowerCase();
        const folder = config_const.COMPONENTS.LOADER.folder;
        
        // Construct paths dynamically based on the constant
        const themeHTML = `${folder}/${style}.html`;
        const themeCSS = `${folder}/${style}.css`;

        // 1. Inject the specific CSS
        this.injectStyle(themeCSS);

        // 2. Load the specific HTML into the placeholder
        const target = document.getElementById(config_const.COMPONENTS.LOADER.containerId);
        if (target) {
            try {
                const response = await fetch(themeHTML);
                target.innerHTML = await response.text();
            } catch (e) {
                console.error("Theme files missing for:", style);
            }
        }
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
