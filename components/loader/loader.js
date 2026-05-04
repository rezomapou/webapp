/**
 * LoaderEngine Object
 * A self-contained utility for assembling Black Box components.
 */
/**
 * LoaderEngine: The Master Assembler
 * Encapsulates all loading logic into a single Black Box.
 */
const LoaderEngine = {
    
    /**
     * Self-injects CSS to maintain component encapsulation.
     * Prevents index.html from needing <link> tags for every component.
     */
    injectStyle(path) {
        if (!path || document.querySelector(`link[href="${path}"]`)) return;
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = path;
        document.head.appendChild(link);
    },

    /**
     * The Master Load Method
     * @param {Object} comp - The component object from config_const
     */
    async loadComponent(comp) {
        // Validation: Every component MUST have a containerId in config_const
        if (!comp || !comp.containerId) return;

        const target = document.getElementById(comp.containerId);
        if (!target) {
            console.warn(`[Loader] Target #${comp.containerId} not found.`);
            return;
        }

        try {
            // 1. Fetch HTML Fragment using parameterized path
            const response = await fetch(comp.html);
            if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
            target.innerHTML = await response.text();

            // 2. Self-inject Component-Specific Styles
            if (comp.css) this.injectStyle(comp.css);

            console.log(`[Loader] ${comp.containerId} assembled.`);

        } catch (err) {
            console.error(`[Loader] Failed to load ${comp.html}:`, err);
        }
    },

    /**
     * Hides the loader overlay once initialization is complete.
     */
    hide() {
        const overlay = document.getElementById(config_const.COMPONENTS.LOADER.containerId);
        if (overlay) overlay.style.display = 'none';
    }
};
