/**
 * register.js — Registration Component
 * Uses HAITI data from strings.js, CONTACT from config
 */
let RegisterComponent = {

    async init(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        // Apply translations
        this.applyLang(container);

        // Populate country list
        this.buildCountries(container);

        // Wire country change
        const countryEl = container.querySelector('#reg-country');
        countryEl?.addEventListener('change', () => this.onCountryChange(container));

        // Wire form validation
        this.wireValidation(container);

        // Wire submit
        container.querySelector('#register-form')?.addEventListener('submit', (e) => this.onSubmit(e, container));

        console.log("RegisterComponent initialized.");
    },

    applyLang(container) {
        container.querySelectorAll('[data-i]').forEach(el => {
            const val = LangService.get(el.getAttribute('data-i'));
            if (val) el.textContent = val;
        });
        // Set lang select to current lang
        const langEl = container.querySelector('#reg-lang');
        if (langEl) langEl.value = LangService.currentLang;
    },

    buildCountries(container) {
        const sel = container.querySelector('#reg-country');
        if (!sel) return;
        const countries = window.DIASPORA_COUNTRIES || ['Haïti', 'États-Unis / USA', 'Canada', 'France'];
        sel.innerHTML = `<option value="">— ${LangService.get('f_country')} —</option>` +
            countries.map(c => `<option value="${c}">${c}</option>`).join('');
    },

    onCountryChange(container) {
        const val = container.querySelector('#reg-country')?.value;
        const isHaiti = val === 'Haïti';
        container.querySelector('#haiti-fields').style.display    = isHaiti ? 'block' : 'none';
        container.querySelector('#diaspora-fields').style.display = isHaiti ? 'none'  : 'block';

        // Update phone prefix
        const prefix = container.querySelector('#phone-prefix');
        if (prefix) prefix.textContent = isHaiti ? '+509' : '+1';

        // Populate departments if Haiti
        if (isHaiti && window.HAITI) {
            const deptSel = container.querySelector('#reg-dept');
            deptSel.innerHTML = `<option value="">— ${LangService.get('f_dept')} —</option>` +
                Object.keys(HAITI).sort().map(d => `<option value="${d}">${d}</option>`).join('');
            deptSel.addEventListener('change', () => {
                const communes = HAITI[deptSel.value] || [];
                const commSel = container.querySelector('#reg-commune');
                commSel.innerHTML = `<option value="">— ${LangService.get('f_commune')} —</option>` +
                    communes.sort().map(c => `<option value="${c}">${c}</option>`).join('');
            });
        }
    },

    wireValidation(container) {
        const form   = container.querySelector('#register-form');
        const submit = container.querySelector('#reg-submit');
        const terms  = container.querySelector('#reg-terms');
        if (!form || !submit) return;

        const check = () => {
            const prenom = container.querySelector('#reg-prenom')?.value.trim();
            const nom    = container.querySelector('#reg-nom')?.value.trim();
            const email  = container.querySelector('#reg-email')?.value.trim();
            const phone  = container.querySelector('#reg-phone')?.value.trim();
            const ok = prenom && nom && email && phone && terms?.checked;
            submit.disabled = !ok;
        };

        form.querySelectorAll('input, select').forEach(el => el.addEventListener('input', check));
        terms?.addEventListener('change', check);
    },

    async onSubmit(e, container) {
        e.preventDefault();
        const submit  = container.querySelector('#reg-submit');
        const errEl   = container.querySelector('#reg-error');
        const succEl  = container.querySelector('#reg-success');
        const form    = container.querySelector('#register-form');

        submit.disabled = true;
        submit.querySelector('span').textContent = LangService.get('f_submitting');
        errEl.classList.add('hidden');

        const country = container.querySelector('#reg-country')?.value;
        const isHaiti = country === 'Haïti';

        const data = {
            action:      'register',
            prenom:      container.querySelector('#reg-prenom')?.value.trim(),
            nom:         container.querySelector('#reg-nom')?.value.trim(),
            genre:       container.querySelector('#reg-genre')?.value,
            email:       container.querySelector('#reg-email')?.value.trim(),
            phone:       (isHaiti ? '+509' : '+1') + container.querySelector('#reg-phone')?.value.trim(),
            country,
            langue:      container.querySelector('#reg-lang')?.value || LangService.currentLang,
            source:      'website',
            is_real:     'true'
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
            Object.entries(data).forEach(([k,v]) => params.append(k, v));
            await fetch(config_const.SCRIPT_URL, { method: 'POST', body: params, mode: 'no-cors' });

            form.style.display = 'none';
            succEl.className   = 'alert alert-success mt-1';
            succEl.textContent = LangService.get('f_success');
            succEl.classList.remove('hidden');

        } catch(err) {
            errEl.className   = 'alert alert-error mt-1';
            errEl.textContent = LangService.get('f_error');
            errEl.classList.remove('hidden');
            submit.disabled   = false;
            submit.querySelector('span').textContent = LangService.get('f_submit');
        }
    }
};

RegisterComponent = BaseComponent.wrap('REGISTER_BLOCK', RegisterComponent);
window.RegisterBlockComponent = RegisterComponent;
console.log("RegisterComponent registered to window.");
