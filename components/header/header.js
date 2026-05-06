/**
 * header.js — Responsive Config-Driven Header
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

    container.innerHTML = await this.loadHTML();

    this.renderNav(container);
    this.bindHamburger(container);

  },

  async loadHTML() {

    try {
      const res = await fetch(
        config_const.PATHS.COMPONENTS + '/' + config_const.COMPONENTS.HEADER.html
      );

      if (!res.ok) throw new Error('header fetch failed');

      return await res.text();

    } catch (e) {
      console.error(e);
      return `<header class="header">RMN</header>`;
    }
  },

  renderNav(container) {

    const navItems = config_const.DATA?.NAV_ITEMS || [];

    const nav = container.querySelector('#nav');
    const overlay = container.querySelector('#navOverlayContent');

    if (!nav || !overlay) return;

    nav.innerHTML = '';
    overlay.innerHTML = '';

    navItems.forEach(item => {

      const link1 = this.createLink(item);
      const link2 = this.createLink(item);

      nav.appendChild(link1);
      overlay.appendChild(link2);

    });

  },

  createLink(item) {

    const a = document.createElement('a');

    a.textContent = item.key;
    a.href = item.tab + '.html';

    return a;
  },

  bindHamburger(container) {

    const burger = container.querySelector('#hamburger');
    const overlay = container.querySelector('#navOverlay');

    if (!burger || !overlay) return;

    burger.addEventListener('click', () => {
      overlay.classList.toggle('open');
    });

    // close on link click
    overlay.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        overlay.classList.remove('open');
      });
    });

  }

};

// IMPORTANT: wrapper (if active)
HeaderComponent = BaseComponent.wrap('HEADER', HeaderComponent);

window.HeaderComponent = HeaderComponent;
