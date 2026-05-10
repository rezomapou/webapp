let ContactComponent = {

    init(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        this.applyLang(container);
        this.fillChannels(container);
        this.buildSubjectDropdown(container);
        this.bindForm(container);

        console.log("ContactComponent initialized.");
    },

    applyLang(container) {
        container.querySelectorAll('[data-i]').forEach(el => {
            const val = LangService.get(el.getAttribute('data-i'));
            if (val) el.textContent = val;
        });
    },

    fillChannels(container) {
        const { phone, whatsapp } = config_const.CONTACT;

        const phoneEl = container.querySelector('#contact-phone');
        const phoneVal = container.querySelector('#phone-val');
        if (phoneEl && phoneVal) {
            phoneEl.href = 'tel:' + phone.replace(/\s/g,'');
            phoneVal.textContent = phone;
        }

        const waEl  = container.querySelector('#contact-whatsapp');
        const waVal = container.querySelector('#wa-val');
        if (waEl && waVal) {
            waEl.href = 'https://wa.me/' + whatsapp.replace(/[^0-9]/g,'');
            waVal.textContent = whatsapp;
        }
    },

    buildSubjectDropdown(container) {
        const sel = container.querySelector('#ct-subject');
        if (!sel) return;

        // Active emails from config become subject options
        const emails = (config_const.CONTACT.emails || []).filter(e => e.active);
        const subjects = [
            { value: 'general',     label: LangService.get('contact_subj_general')     },
            { value: 'complaints',  label: LangService.get('contact_subj_complaints')  },
            { value: 'suggestions', label: LangService.get('contact_subj_suggestions') },
            { value: 'partnership', label: LangService.get('contact_subj_partnership') }
        ];

        sel.innerHTML = `<option value="">${LangService.get('contact_subject_ph') || '—'}</option>` +
            subjects.map(s => `<option value="${s.value}">${s.label}</option>`).join('');
    },

    bindForm(container) {
        container.querySelector('#contact-form')
            ?.addEventListener('submit', async (e) => {
                e.preventDefault();
                const btn    = container.querySelector('#ct-submit');
                const errEl  = container.querySelector('#ct-error');
                const succEl = container.querySelector('#ct-success');

                btn.disabled = true;
                errEl.classList.add('hidden');

                // Map subject to correct email address
                const subjectMap = {
                    complaints:  config_const.CONTACT.emails.find(e => e.key === 'complaints')?.address,
                    suggestions: config_const.CONTACT.emails.find(e => e.key === 'suggestions')?.address
                };
                const subject  = container.querySelector('#ct-subject')?.value;
                const toEmail  = subjectMap[subject] || config_const.CONTACT.emails.find(e => e.key === 'primary')?.address;

                const data = {
                    action:  'contact',
                    name:    container.querySelector('#ct-name')?.value.trim(),
                    email:   container.querySelector('#ct-email')?.value.trim(),
                    subject,
                    to:      toEmail,
                    message: container.querySelector('#ct-message')?.value.trim(),
                    langue:  LangService.currentLang
                };

                try {
                    const params = new URLSearchParams();
                    Object.entries(data).forEach(([k,v]) => params.append(k, v||''));
                    await fetch(config_const.SCRIPT_URL, { method:'POST', body:params, mode:'no-cors' });

                    container.querySelector('#contact-form').style.display = 'none';
                    succEl.className   = 'alert alert-success';
                    succEl.textContent = LangService.get('f_success');
                    succEl.classList.remove('hidden');
                } catch(err) {
                    errEl.className   = 'alert alert-error';
                    errEl.textContent = LangService.get('f_error');
                    errEl.classList.remove('hidden');
                    btn.disabled = false;
                }
            });
    }
};

ContactComponent = BaseComponent.wrap('CONTACT_BLOCK', ContactComponent);
window.ContactBlockComponent = ContactComponent;
console.log("ContactComponent initialized.");
