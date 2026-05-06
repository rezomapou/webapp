/**
 * header.js — Header Component
 */

let HeaderComponent = {

  async init(containerId) {

    let container = document.getElementById(containerId);

    if (!container) {
      await new Promise(r => setTimeout(r, 100));
      container = document.getElementById(containerId);
    }

    if (!container) {
      console.error('Header container missing:', containerId);
      return;
    }

    const html = await this.loadHTML();
    container.innerHTML = html;

    this.renderNav(container);
    this.bindEvents(container);

  },

  async loadHTML() {
    const path = config_const.COMPONENTS.HEADER.html;

    try {
      const res = await fetch(path);
      if (!res.ok) throw new Error('fetch failed');
      return await res.text();
    } catch (e) {
      console.error('Header HTML load failed', e);
      return '<div class="header">RMN</div>';
    }
  },

  renderNav(container) {

    const navItems = config_const.DATA.NAV_ITEMS || [];

    const nav = container.querySelector('#nav');
    const overlay = container.querySelector('#navOverlayContent');

    navItems.forEach(item => {

      const el = this.createNavItem(item);
      nav?.appendChild(el);

      const el2 = this.createNavItem(item);
      overlay?.appendChild(el2);

    });

  },

  createNavItem(item) {

    const a = document.createElement('a');

    a.textContent = LangService.get(item.key);
    a.href = item.tab + '.html';

    // meaningful tracking (allowed)
    a.addEventListener('click', () => {
      window.Analytics?.track?.('nav_click', {
        tab: item.tab
      });
    });

    return a;
  },

  bindEvents(container) {

    const hamburger = container.querySelector('#hamburger');
    const overlay = container.querySelector('#navOverlay');

    if (hamburger && overlay) {
      hamburger.onclick = () => {
        overlay.classList.toggle('open');
      };
    }

  }

};

// ✅ wrap (automatic analytics)
HeaderComponent = BaseComponent.wrap('HEADER', HeaderComponent);

window.HeaderComponent = HeaderComponent;

console.log("HeaderComponent registered.");
