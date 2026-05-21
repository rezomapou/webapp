/**
 * register.js — Registration with uniqueness check, all fields
 * Fixes: phone double-prefix, submit btn race condition, all fields sent
 */
let RegisterComponent = {

    _state: { emailOk: null, phoneOk: null, waOk: null },
    _submitting: false,

    async init(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        this._state = { emailOk: null, phoneOk: null, waOk: null };
        this._submitting = false;
        this.applyLang(container);
        this.buildCountries(container);

        container.querySelector('#reg-country')
            ?.addEventListener('change', () => this.onCountryChange(container));

        ['email','phone','whatsapp'].forEach(field => {
            container.querySelector('#reg-' + field)
                ?.addEventListener('blur', () => this.checkUnique(container, field));
            container.querySelector('#reg-' + field)
                ?.addEventListener('focus', () => this.clearFeedback(container, field));
        });

        // Wire validation on all input changes
        container.querySelector('#register-form')
            ?.querySelectorAll('input, select')
            .forEach(el => el.addEventListener('input', () => this.wireValidation(container)));

        // Terms checkbox — synchronous, no debounce
        container.querySelector('#reg-terms')
            ?.addEventListener('change', () => this.wireValidation(container));

        container.querySelector('#register-form')
            ?.addEventListener('submit', (e) => this.onSubmit(e, container));

        console.log("RegisterComponent initialized.");
    },

    applyLang(container) {
        const lang = LangService.currentLang;
        const dict = LangService.dictionary?.[lang] || {};
        container.querySelectorAll('[data-i]').forEach(el => {
            const key = el.getAttribute('data-i');
            const val = dict[key] || LangService.get(key);
            if (val) el.textContent = val;
        });
        // Update feedback messages to current lang without re-checking
        ['email','phone','whatsapp'].forEach(field => {
            const fb    = container.querySelector('#' + field + '-feedback');
            const state = this._state[field + 'Ok'];
            if (!fb || state === null) return;
            if (state === true)  { fb.textContent = LangService.get('f_' + field + '_ok');     fb.className = 'field-feedback ok'; }
            if (state === false) { fb.textContent = LangService.get('f_' + field + '_exists'); fb.className = 'field-feedback error'; }
        });
        const langEl = container.querySelector('#reg-lang');
        if (langEl) langEl.value = lang;
    },

    buildCountries(container) {
        const sel = container.querySelector('#reg-country');
        if (!sel) return;
        const countries = typeof DIASPORA_COUNTRIES !== 'undefined'
            ? DIASPORA_COUNTRIES
            : ['Haïti','États-Unis / USA','Canada','France'];
        sel.innerHTML = `<option value="">— ${LangService.get('f_country')} —</option>` +
            countries.map(c => `<option value="${c}">${c}</option>`).join('');
    },

    onCountryChange(container) {
        const val     = container.querySelector('#reg-country')?.value;
        const isHaiti = val === 'Haïti';
        container.querySelector('#haiti-fields').style.display    = isHaiti ? 'block' : 'none';
        container.querySelector('#diaspora-fields').style.display = isHaiti ? 'none'  : 'block';
        const prefix = container.querySelector('#phone-prefix');
        if (prefix) prefix.textContent = isHaiti ? '+509' : '';
        const waPrefix = container.querySelector('#wa-prefix');
        if (waPrefix) waPrefix.textContent = isHaiti ? '+509' : '';

        if (isHaiti && typeof HAITI !== 'undefined') {
            const deptSel = container.querySelector('#reg-dept');
            deptSel.innerHTML = `<option value="">— ${LangService.get('f_dept')} —</option>` +
                Object.keys(HAITI).sort().map(d => `<option value="${d}">${d}</option>`).join('');
            deptSel.addEventListener('change', () => {
                const communes = HAITI[deptSel.value] || [];
                const commSel  = container.querySelector('#reg-commune');
                commSel.innerHTML = `<option value="">— ${LangService.get('f_commune')} —</option>` +
                    communes.sort().map(c => `<option value="${c}">${c}</option>`).join('');
            });
        }
        this.wireValidation(container);
    },

    clearFeedback(container, field) {
        const fb = container.querySelector('#' + field + '-feedback');
        if (fb) { fb.textContent = ''; fb.className = 'field-feedback'; }
        container.querySelector('#reg-' + field)?.classList.remove('input-error','input-ok');
    },

    // Strip any existing 509 prefix so we never double-add it
    _stripPrefix(val) {
        const digits = val.replace(/\D/g, '');
        // If starts with 509 and is 11 digits → already has prefix → strip it
        if (digits.startsWith('509') && digits.length === 11) return digits.slice(3);
        // If starts with 00509 → strip
        if (digits.startsWith('00509')) return digits.slice(5);
        return digits;
    },

    async checkUnique(container, field) {
        const input   = container.querySelector('#reg-' + field);
        const fb      = container.querySelector('#' + field + '-feedback');
        const spinner = container.querySelector('#' + field + '-spinner');
        if (!input || !fb) return;

        const val = input.value.trim();
        if (!val) {
            fb.textContent = ''; fb.className = 'field-feedback';
            this._state[field + 'Ok'] = null;
            this.wireValidation(container);
            return;
        }

        spinner?.classList.remove('hidden');
        fb.textContent = LangService.get('f_checking');
        fb.className   = 'field-feedback';

        try {
            const isHaiti  = container.querySelector('#reg-country')?.value === 'Haïti';
            const checkType = field === 'whatsapp' ? 'phone' : field;
            let checkValue  = val;

            if ((field === 'phone' || field === 'whatsapp') && isHaiti) {
                const digits = this._stripPrefix(val);
                checkValue   = '+509' + digits;
            }

            const url = config_const.SCRIPT_URL +
                '?action=check_availability&type=' + checkType +
                '&value=' + encodeURIComponent(checkValue) + '&t=' + Date.now();

            const res  = await fetch(url);
            const data = await res.json();

            if (!data.valid) {
                fb.textContent = ''; fb.className = 'field-feedback';
                this._state[field + 'Ok'] = null;
            } else if (data.exists) {
                fb.textContent = LangService.get('f_' + field + '_exists');
                fb.className   = 'field-feedback error';
                input.classList.add('input-error'); input.classList.remove('input-ok');
                this._state[field + 'Ok'] = false;
            } else {
                fb.textContent = LangService.get('f_' + field + '_ok');
                fb.className   = 'field-feedback ok';
                input.classList.remove('input-error'); input.classList.add('input-ok');
                this._state[field + 'Ok'] = true;
            }
        } catch(e) {
            fb.textContent = ''; fb.className = 'field-feedback';
            this._state[field + 'Ok'] = null;
        } finally {
            spinner?.classList.add('hidden');
        }
        this.wireValidation(container);
    },

    wireValidation(container) {
        const submit = container.querySelector('#reg-submit');
        const terms  = container.querySelector('#reg-terms');
        if (!submit) return;

        // Never enable while submitting
        if (this._submitting) { submit.disabled = true; return; }

        const required = ['#reg-prenom','#reg-nom','#reg-email','#reg-phone','#reg-country']
            .every(s => container.querySelector(s)?.value.trim());
        const noErrors = this._state.emailOk !== false && this._state.phoneOk !== false;
        const termsChecked = terms?.checked === true;

        // Synchronous — no setTimeout, no debounce
        submit.disabled = !(required && termsChecked && noErrors);
    },

    async onSubmit(e, container) {
        e.preventDefault();

        // Guard against double-submit
        if (this._submitting) return;
        this._submitting = true;

        const submitBtn  = container.querySelector('#reg-submit');
        const submitSpan = submitBtn?.querySelector('span');
        const errEl      = container.querySelector('#reg-error');
        const form       = container.querySelector('#register-form');
        const successBlk = container.querySelector('#reg-success-block');

        if (submitBtn) submitBtn.disabled = true;
        if (submitSpan) submitSpan.textContent = LangService.get('f_submitting');
        errEl?.classList.add('hidden');

        const country  = container.querySelector('#reg-country')?.value;
        const isHaiti  = country === 'Haïti';

        // Phone — strip any existing 509 prefix before adding
        const rawPhone = this._stripPrefix(container.querySelector('#reg-phone')?.value.trim() || '');
        const phone    = (isHaiti ? '+509' : '') + rawPhone;

        // WhatsApp — same treatment
        const rawWa    = this._stripPrefix(container.querySelector('#reg-whatsapp')?.value.trim() || '');
        const whatsapp = rawWa ? (isHaiti ? '+509' : '') + rawWa : '';

        // Payment
        const payType = container.querySelector('[name="payment_type"]:checked')?.value || '';
        const payNum  = container.querySelector('#reg-payment')?.value.trim() || '';

        const data = {
            action:         'register',
            prenom:         container.querySelector('#reg-prenom')?.value.trim(),
            nom:            container.querySelector('#reg-nom')?.value.trim(),
            genre:          container.querySelector('#reg-genre')?.value,
            email:          container.querySelector('#reg-email')?.value.trim(),
            phone,
            country,
            langue:         container.querySelector('#reg-lang')?.value || LangService.currentLang,
            payment_type:   payType,
            payment_number: payNum,
            moncash:        payType === 'moncash' ? payNum : '',
            natcash:        payType === 'natcash'  ? payNum : '',
            whatsapp,
            facebook:       container.querySelector('[name="facebook"]')?.value.trim(),
            instagram:      container.querySelector('[name="instagram"]')?.value.trim(),
            tiktok:         container.querySelector('[name="tiktok"]')?.value.trim(),
            youtube:        container.querySelector('[name="youtube"]')?.value.trim(),
            website:        container.querySelector('[name="website"]')?.value.trim(),
            source:         'website',
            is_real:        'true'
        };

        if (isHaiti) {
            data.departement     = container.querySelector('#reg-dept')?.value;
            data.departement_nom = container.querySelector('#reg-dept option:checked')?.text || '';
            data.commune         = container.querySelector('#reg-commune')?.value;
            data.commune_nom     = container.querySelector('#reg-commune option:checked')?.text || '';
        } else {
            data.city  = container.querySelector('#reg-city')?.value.trim();
            data.state = container.querySelector('#reg-state')?.value.trim();
        }

        try {
            const params = new URLSearchParams();
            Object.entries(data).forEach(([k,v]) => params.append(k, v || ''));
            await fetch(config_const.SCRIPT_URL, { method:'POST', body:params, mode:'no-cors' });

            form.style.display = 'none';
            if (successBlk) {
                successBlk.classList.remove('hidden');
                successBlk.querySelectorAll('[data-i]').forEach(el => {
                    const val = LangService.get(el.getAttribute('data-i'));
                    if (val) el.textContent = val;
                });
            }
            window.Analytics?.track?.('registration', { country, langue: data.langue });

        } catch(err) {
            this._submitting = false;
            if (errEl) {
                errEl.className   = 'alert alert-error';
                errEl.textContent = LangService.get('f_error');
                errEl.classList.remove('hidden');
            }
            if (submitBtn) submitBtn.disabled = false;
            if (submitSpan) submitSpan.textContent = LangService.get('f_submit');
        }
    }
};

RegisterComponent = BaseComponent.wrap('REGISTER_BLOCK', RegisterComponent);
window.RegisterBlockComponent = RegisterComponent;
console.log("RegisterComponent registered to window.");
