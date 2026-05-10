
         /**
 * register.js — Registration Component
 * HAITI and DIASPORA_COUNTRIES come from strings.js (already loaded)
 */
let RegisterComponent = {

    async init(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        this.applyLang(container);
        this.buildCountries(container);

        const countryEl = container.querySelector('#reg-country');
        countryEl?.addEventListener('change', () => this.onCountryChange(container));

        this.wireValidation(container);
        container.querySelector('#register-form')
            ?.addEventListener('submit', (e) => this.onSubmit(e, container));

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

        // DIASPORA_COUNTRIES is defined in strings.js — always available
        const countries = (typeof DIASPORA_COUNTRIES !== 'undefined')
            ? DIASPORA_COUNTRIES
            : ['Haïti', 'États-Unis / USA', 'Canada', 'France', 'République Dominicaine'];

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

    wireValidation(container) {
        const submit = container.querySelector('#reg-submit');
        const terms  = container.querySelector('#reg-terms');
        if (!submit) return;

        const check = () => {
            const ok = ['#reg-prenom','#reg-nom','#reg-email','#reg-phone','#reg-country']
                .every(sel => container.querySelector(sel)?.value.trim()) && terms?.checked;
            submit.disabled = !ok;
        };

        container.querySelector('#register-form')
            ?.querySelectorAll('input, select')
            .forEach(el => el.addEventListener('input', check));
        terms?.addEventListener('change', check);
    },

    async onSubmit(e, container) {
        e.preventDefault();
        const submit = container.querySelector('#reg-submit span');
        const errEl  = container.querySelector('#reg-error');
        const succEl = container.querySelector('#reg-success');
        const form   = container.querySelector('#register-form');

        if (submit) submit.textContent = LangService.get('f_submitting');
        container.querySelector('#reg-submit').disabled = true;
        errEl.classList.add('hidden');

        const country = container.querySelector('#reg-country')?.value;
        const isHaiti = country === 'Haïti';
        const phone   = (isHaiti ? '+509' : '') +
            container.querySelector('#reg-phone')?.value.trim().replace(/\D/g,'');

        const data = {
            action:  'register',
            prenom:  container.querySelector('#reg-prenom')?.value.trim(),
            nom:     container.querySelector('#reg-nom')?.value.trim(),
            genre:   container.querySelector('#reg-genre')?.value,
            email:   container.querySelector('#reg-email')?.value.trim(),
            phone,
            country,
            langue:  container.querySelector('#reg-lang')?.value || LangService.currentLang,
            source:  'website',
            is_real: 'true'
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
            Object.entries(data).forEach(([k,v]) => params.append(k, v || ''));
            await fetch(config_const.SCRIPT_URL, { method:'POST', body:params, mode:'no-cors' });

            form.style.display = 'none';
            succEl.className   = 'alert alert-success mt-1';
            succEl.textContent = LangService.get('f_success');
            succEl.classList.remove('hidden');

        } catch(err) {
            errEl.className   = 'alert alert-error mt-1';
            errEl.textContent = LangService.get('f_error');
            errEl.classList.remove('hidden');
            container.querySelector('#reg-submit').disabled = false;
            if (submit) submit.textContent = LangService.get('f_submit');
        }
    }
};

RegisterComponent = BaseComponent.wrap('REGISTER_BLOCK', RegisterComponent);
window.RegisterBlockComponent = RegisterComponent;
console.log("RegisterComponent registered to window.");
