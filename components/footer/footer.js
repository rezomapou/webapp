populateSlots(container) {
    const linksSlot = container.querySelector('[data-slot="footer-links"]');
    const metaSlot  = container.querySelector('[data-slot="footer-meta"]');

    const actionMap = {
        legal:   'docs/legal.html',
        privacy: 'docs/privacy.html',
        terms:   'docs/terms.html'
    };

    if (linksSlot) {
        const links = config_const.COMPONENTS.FOOTER_LINKS
            .map(link => `<a href="${actionMap[link.action] || '#'}">${LangService.get(link.key)}</a>`)
            .join('');
        linksSlot.innerHTML = links;
    }
    if (metaSlot) {
        metaSlot.textContent = LangService.get(config_const.COMPONENTS.FOOTER_META.key);
    }
    console.log("Footer content populated into slots.");
},
