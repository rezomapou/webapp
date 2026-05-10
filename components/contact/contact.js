let ContactComponent = {
    init(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        // Apply translations
        container.querySelectorAll('[data-i]').forEach(el => {
            const val = LangService.get(el.getAttribute('data-i'));
            if (val) el.textContent = val;
        });

        // Fill contact values from config
        const { phone, whatsapp, emails } = config_const.CONTACT;

        const phoneEl = container.querySelector('#contact-phone');
        if (phoneEl) { phoneEl.href = 'tel:' + phone.replace(/\s/g,''); phoneEl.textContent = phone; }

        const waEl = container.querySelector('#contact-whatsapp');
        if (waEl) {
            waEl.href = 'https://wa.me/' + whatsapp.replace(/[^0-9]/g,'');
            waEl.textContent = whatsapp;
        }

        const emailsEl = container.querySelector('#contact-emails');
        if (emailsEl) {
            const active = (emails || []).filter(e => e.active);
            emailsEl.innerHTML = active.map(e =>
                `<a href="mailto:${e.address}">${e.address}</a>`
            ).join('');
        }

        console.log("ContactComponent initialized.");
    }
};

ContactComponent = BaseComponent.wrap('CONTACT_BLOCK', ContactComponent);
window.ContactBlockComponent = ContactComponent;
