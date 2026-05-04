/**
 * Header Manager: Loads sub-components and initializes language/stats
 */
async function initHeader() {
  try {
    // 1. Load Nav Stats
    const navStatsRes = await fetch('components/navstats.html');
    document.getElementById('nav-stats-container').innerHTML = await navStatsRes.text();

    // 2. Load Navigation Bar
    const navRes = await fetch('components/nav.html');
    document.getElementById('nav-bar-container').innerHTML = await navRes.text();

    // 3. Trigger Stats Update (Defined in stats.js)
    if (typeof updateNavStats === 'function') {
      updateNavStats();
    }

    // 4. Trigger Language Manager (Defined in lang.js)
    // This ensures data-s attributes in the newly loaded HTML are translated
    if (window.LangManager) {
      window.LangManager.updateUI();
    }
    
  } catch (error) {
    console.error("Header component failed to load:", error);
  }
}

document.addEventListener('DOMContentLoaded', initHeader);
