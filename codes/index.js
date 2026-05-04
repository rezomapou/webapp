/**
 * Tab Switching System
 */
window.openTab = function(evt, tabId) {
  document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
  document.querySelectorAll('.tab-link').forEach(link => link.classList.remove('active'));
  
  document.getElementById(tabId).classList.add('active');
  evt.currentTarget.classList.add('active');
};

/**
 * Data Rendering for Complex Sections
 */
const PageRenderer = {
  renderGrids: function(lang) {
    // Render Features Grid
    const features = FEATURES_DATA[lang] || FEATURES_DATA.ht;
    document.getElementById('features-grid').innerHTML = features.map(f => `
      <div class="feature-card">
        <span class="feature-icon">${f.icon}</span>
        <h3>${f.title}</h3>
        <p>${f.desc}</p>
      </div>
    `).join('');

    // Render Leaves Showcase (System Leaves)
    const leaves = RMN_CONFIG.LEAF_KEYS.map(key => ({
      icon: RMN_CONFIG.LEAF_ICONS[key],
      name: s('leaf_' + key.toLowerCase()),
      tip:  s('leaf_' + key.toLowerCase() + '_tip')
    }));
    document.getElementById('leaf-showcase').innerHTML = leaves.map(l => `
      <div class="leaf-item">
        <span class="icon">${l.icon}</span>
        <div class="name">${l.name}</div>
      </div>
    `).join('');
  }
};

document.addEventListener('DOMContentLoaded', () => {
  const lang = getCurrentLang();
  PageRenderer.renderGrids(lang);
  fetchStats(); // From the original stats logic
});
