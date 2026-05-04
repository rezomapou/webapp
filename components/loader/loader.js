/**
 * Universal Component Loader
 * Uses the config object to determine target and path.
 */
async function loadComponent(comp) {
    if (!comp || !comp.containerId) return;

    const target = document.getElementById(comp.containerId);
    if (!target) {
        console.warn(`Target #${comp.containerId} not found for component.`);
        return;
    }

    try {
        const response = await fetch(comp.html);
        if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
        
        target.innerHTML = await response.text();

        // After HTML is in place, we trigger the object's logic
        // We look for the Component Object name in the global window scope
        // (e.g., HeaderComponent, LangComponent, NavStatsComponent)
    } catch (err) {
        console.error(`Failed to load ${comp.html}:`, err);
    }
}
