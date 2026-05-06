window.HeaderComponent = {

  async init(containerId) {

    const navItems = config_const.DATA?.NAV_ITEMS || [];

    const nav = document.getElementById('nav');
    const overlay = document.getElementById('navOverlayContent');

    // render nav (desktop + mobile)
    navItems.forEach(item => {
      const el = createNavItem(item);
      nav.appendChild(el);

      const el2 = createNavItem(item);
      overlay.appendChild(el2);
    });

    // hamburger toggle
    const hamburger = document.getElementById('hamburger');
    const navOverlay = document.getElementById('navOverlay');

    hamburger.onclick = () => {
      navOverlay.classList.toggle('open');
    };

  }

};
if (window.Analytics) {
  Analytics.track('component_loaded', { component: 'HEADER' });
}
function createNavItem(item) {
  const a = document.createElement('a');
  a.textContent = item.key;
  a.href = item.tab + '.html';
  return a;
}
