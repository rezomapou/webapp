/**
 * footer.js — Config Driven Footer
 */

const FooterComponent = {

  async init(containerId) {

    let container = document.getElementById(containerId);

    if (!container) {
      await new Promise(r => setTimeout(r, 100));
      container = document.getElementById(containerId);
    }

    if (!container) return;

    container.innerHTML = await this.loadHTML();

    this.renderPlatforms(container);

  },

  async loadHTML() {

    try {
      const res = await fetch(
        config_const.PATHS.COMPONENTS + '/' + config_const.COMPONENTS.FOOTER.html
      );

      if (!res.ok) throw new Error();

      return await res.text();

    } catch (e) {
      return `<footer>RMN</footer>`;
    }
  },

  renderPlatforms(container) {

    const slot = container.querySelector('[data-slot="footer-links"]');

    if (!slot) return;

    const platforms = config_const.DATA?.PLATFORMS || [];

    slot.innerHTML = '';

    platforms
      .filter(p => p.url)
      .forEach(p => {

        const a = document.createElement('a');
        a.href = p.url;
        a.textContent = p.key;
        a.target = '_blank';

        slot.appendChild(a);
      });
  }

};

FooterComponent = BaseComponent.wrap('FOOTER', FooterComponent);

window.FooterComponent = FooterComponent;
