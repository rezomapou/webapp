/**
 * footer.js — Footer Component
 */

let FooterComponent = {

  async init(containerId) {

    let container = document.getElementById(containerId);

    if (!container) {
      await new Promise(r => setTimeout(r, 100));
      container = document.getElementById(containerId);
    }

    if (!container) {
      console.error('Footer container missing after retry:', containerId);
      return;
    }

    const html = await this.loadHTML();
    container.innerHTML = html;

    this.populateSlots(container);

  },

  async loadHTML() {
    const path = config_const.COMPONENTS.FOOTER.html;

    try {
      const res = await fetch(path);
      if (!res.ok) throw new Error('fetch failed');
      return await res.text();
    } catch (e) {
      console.error('Footer HTML load failed', e);
      return '<footer class="footer-inner"><div class="footer-copy">© 2026 RMNE</div></footer>';
    }
  },

  populateSlots(container) {

    const linksSlot = container.querySelector('[data-slot="footer-links"]');
    const metaSlot  = container.querySelector('[data-slot="footer-meta"]');

    const actionMap = {
      legal:   'docs/legal.html',
      privacy: 'docs/privacy.html',
      terms:   'docs/terms.html'
    };

    if (linksSlot) {
      const links = config_const.DATA.FOOTER_LINKS
        .map(link => `<a href="${actionMap[link.action] || '#'}">${LangService.get(link.key)}</a>`)
        .join('');

      linksSlot.innerHTML = links;
    }

    if (metaSlot) {
      metaSlot.textContent = LangService.get(config_const.DATA.FOOTER_META.key);
    }

    // Optional: track specific interactions (NOT load)
    this.bindEvents(container);

  },

  bindEvents(container) {

    const links = container.querySelectorAll('a');

    links.forEach(link => {
      link.addEventListener('click', () => {
        if (window.Analytics?.track) {
          window.Analytics.track('footer_link_click', {
            href: link.href
          });
        }
      });
    });

  }

};

// 🔥 Wrap with BaseComponent (THIS is the key line)
FooterComponent = BaseComponent.wrap('FOOTER', FooterComponent);

window.FooterComponent = FooterComponent;

console.log("FooterComponent registered.");
