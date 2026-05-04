const Loader = {

  async loadComponent(name, config) {
    try {
      if (!config) {
        throw new Error(`Missing config for component: ${name}`);
      }

      const { html, css, js, containerId } = config;

      // ── LOAD HTML ─────────────────────────────
      if (html && containerId) {
        const res = await fetch(html);
        if (!res.ok) throw new Error(`HTML not found: ${html}`);

        const content = await res.text();
        const container = document.getElementById(containerId);

        if (!container) {
          console.warn(`Container not found: ${containerId}`);
        } else {
          container.innerHTML = content;
        }
      }

      // ── LOAD CSS ─────────────────────────────
      if (css) {
        if (!document.querySelector(`link[href="${css}"]`)) {
          const link = document.createElement('link');
          link.rel = 'stylesheet';
          link.href = css;
          document.head.appendChild(link);
        }
      }

      // ── LOAD JS ──────────────────────────────
      if (js) {
        await this.loadScript(js);
      }

      console.log(`✅ Loaded component: ${name}`);

    } catch (err) {
      console.error(`❌ Failed to load component: ${name}`, err);
      this.renderFallback(name);
    }
  },

  loadScript(src) {
    return new Promise((resolve, reject) => {
      if (document.querySelector(`script[src="${src}"]`)) {
        return resolve();
      }

      const script = document.createElement('script');
      script.src = src;
      script.onload = resolve;
      script.onerror = () => reject(new Error(`Script failed: ${src}`));
      document.body.appendChild(script);
    });
  },

  renderFallback(name) {
    console.warn(`⚠️ Rendering fallback for: ${name}`);

    const fallback = document.createElement('div');
    fallback.style.padding = '10px';
    fallback.style.background = '#ffe6e6';
    fallback.style.color = '#900';
    fallback.innerText = `Component "${name}" unavailable`;

    document.body.appendChild(fallback);
  }
};
