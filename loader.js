/**
 * Dynamic Component Loader
 * @param {string} elementId - The ID of the placeholder div
 * @param {string} componentKey - The key from RMN_CONFIG.COMPONENTS
 */
async function loadComponent(elementId, componentKey) {
    const target = document.getElementById(elementId);
    if (!target) return;

    // Construct path: e.g., "components/header.html"
    const filePath = `${RMN_CONFIG.PATHS.COMPONENTS}/${RMN_CONFIG.COMPONENTS[componentKey]}`;

    try {
        const response = await fetch(filePath);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const html = await response.text();
        target.innerHTML = html;
        
        // Trigger translation
        L(getCurrentLang()); 
    } catch (err) {
        console.error(`Failed to load component from ${filePath}:`, err);
    }
}
