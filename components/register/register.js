/**
 * register.js — Registration with email/phone uniqueness check
 */
let RegisterComponent = {

    _checkTimer: null,

    async init(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        this.applyLang(container);
        this.buildCountries(container);

        container.querySelector('#reg-country')
            ?.addEventListener('change', () => this.onCountryChange(container));

        // Uniqueness checks with debounce
        container.querySelector('#reg-email')
            ?.addEventListener('blur', () => this.checkUnique(container, 'email'));
        container.querySelector('#reg-phone')
            ?.addEventListener('blur', () => this.checkUnique(container, 'phone'));

        this.wireValidation(container);
        container.querySelector('#register-form')
            ?.addEventListener('submit', (e) => this.onSubmit(e, container));

        console.log("RegisterComponent initialized.");
    },

    applyLang(container) {
        container.querySelectorAll('[data-i]').forEach(el => {
            const key  = el.getAttribute('data-i');
            const dict = LangService.dictionary?.[LangService.currentLang] || {};
            const val  = dict[key] || LangService.get(key);
            if (val) el.textContent = val;
        });
        const langEl = container.querySelector('#reg-lang');
        if (langEl) langEl.value = LangService.currentLang;
    },

    buildCountries(container) {
        const sel = container.querySelector('#reg-country');
        if (!sel) return;
        const countries = (typeof DIASPORA_COUNTRIES !== 'undefined')
            ? DIASPORA_COUNTRIES
            : ['Haïti','États-Unis / USA','Canada','France','République Dominicaine'];
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
    },

    async checkUnique(container, field) {
        const input    = container.querySelector('#reg-' + field);
        const feedback = container.querySelector('#' + field + '-feedback');
        if (!input || !feedback || !input.value.trim()) return;

        feedback.textContent = LangService.get('f_checking');
        feedback.className   = 'field-feedback info';

        try {
            const url = config_const.SCRIPT_URL +
                '?action=check_unique&field=' + field +
                '&value=' + encodeURIComponent(input.value.trim()) +
                '&t=' + Date.now();
            const res  = await fetch(url);
            const data = await res.json();

            if (data.exists) {
                feedback.textContent = LangService.get('f_' + field + '_exists');
                feedback.className   = 'field-feedback error';
                input.classList.add('input-error');
            } else {
                feedback.textContent = LangService.get('f_' + field + '_ok');
                feedback.className   = 'field-feedback ok';
                input.classList.remove('input-error');
            }
        } catch(e) {
            // Network error — allow form to proceed, GAS will validate
            feedback.textContent = '';
        }
        this.wireValidation(container);
    },

    wireValidation(container) {
        const submit = container.querySelector('#reg-submit');
        const terms  = container.querySelector('#reg-terms');
        if (!submit) return;

        const hasError = container.querySelector('#email-feedback.error, #phone-feedback.error');
        const required = ['#reg-prenom','#reg-nom','#reg-email','#reg-phone','#reg-country']
            .every(s => container.querySelector(s)?.value.trim());
        submit.disabled = !(required && terms?.checked && !hasError);
    },

    async onSubmit(e, container) {
        e.preventDefault();
        const submitBtn = container.querySelector('#reg-submit');
        const submitSpan = submitBtn.querySelector('span');
        const errEl  = container.querySelector('#reg-error');
        const succEl = container.querySelector('#reg-success');
        const form   = container.querySelector('#register-form');

        submitBtn.disabled = true;
        if (submitSpan) submitSpan.textContent = LangService.get('f_submitting');

        const country  = container.querySelector('#reg-country')?.value;
        const isHaiti  = country === 'Haïti';
        const rawPhone = container.querySelector('#reg-phone')?.value.trim().replace(/\D/g,'');
        const phone    = (isHaiti ? '+509' : '') + rawPhone;

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
            facebook:       container.querySelector('[name="facebook"]')?.value.trim(),
            instagram:      container.querySelector('[name="instagram"]')?.value.trim(),
            tiktok:         container.querySelector('[name="tiktok"]')?.value.trim(),
            whatsapp:       container.querySelector('[name="whatsapp"]')?.value.trim(),
            source:         'website',
            is_real:        'true'
        };

        if (isHaiti) {
            data.departement = container.querySelector('#reg-dept')?.value;
            data.commune     = container.querySelector('#reg-commune')?.value;
        } else {
            data.city  = container.querySelector('#reg-city')?.value.trim();
            data.state = container.querySelector('#reg-state')?.value.trim();
        }

        try {
            const params = new URLSearchParams();
            Object.entries(data).forEach(([k,v]) => params.append(k, v||''));
            await fetch(config_const.SCRIPT_URL, { method:'POST', body:params, mode:'no-cors' });

            form.style.display = 'none';
            succEl.className   = 'alert alert-success';
            succEl.textContent = LangService.get('f_success');
            succEl.classList.remove('hidden');
            window.Analytics?.track?.('registration', { country, langue: data.langue });

        } catch(err) {
            errEl.className   = 'alert alert-error';
            errEl.textContent = LangService.get('f_error');
            errEl.classList.remove('hidden');
            submitBtn.disabled = false;
            if (submitSpan) submitSpan.textContent = LangService.get('f_submit');
        }
    }
};

RegisterComponent = BaseComponent.wrap('REGISTER_BLOCK', RegisterComponent);
window.RegisterBlockComponent = RegisterComponent;
console.log("RegisterComponent registered to window.");
