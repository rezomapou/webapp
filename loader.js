/**
 * Dynamic Component Loader
 * @param {string} elementId - The ID of the placeholder div
 * @param {string} componentKey - The key from STRINGS.COMPONENTS
 */
async function loadComponent(elementId, componentKey) {
    const target = document.getElementById(elementId);
    if (!target) return;

    // Construct path: e.g., "components/header.html"
    const filePath = `${STRINGS.PATHS.COMPONENTS}/${STRINGS.COMPONENTS[componentKey]}`;

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

function L(lang) {
    const s = STRINGS[lang];
    if (!s) return;
    
    document.querySelectorAll('[data-s]').forEach(el => {
        const key = el.getAttribute('data-s');
        if (s[key]) {
            // Fix: Check if it's an input or a standard element
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                el.placeholder = s[key];
            } else {
                el.textContent = s[key];
            }
        }
    });
}
