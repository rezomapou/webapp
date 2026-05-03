/**
 * loader.js - Loads HTML components and applies translations
 */
async function loadComponent(elementId, filePath) {
    const target = document.getElementById(elementId);
    if (!target) return;

    try {
        const response = await fetch(filePath);
        const html = await response.text();
        target.innerHTML = html;
        
        // After loading, trigger translation for the new content
        if (typeof L === 'function') {
            L(getCurrentLang()); 
        }
    } catch (err) {
        console.error(`Failed to load ${filePath}:`, err);
    }
}
