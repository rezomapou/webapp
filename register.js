/** 
 * register.js - Logic for Rezo Mapou Registration[cite: 1]
 */

let _validity = { phone: false, email: false, pay: true };
let _debounceTimers = {};
const PREFIX_MAP = { 'Haïti': '+509', 'USA': '+1', 'Canada': '+1', 'France': '+33', 'Dominican Republic': '+1' };

document.addEventListener('DOMContentLoaded', () => {
    populateCountries();
    populatePlatforms();
    initValidationListeners();
});

function initValidationListeners() {
    // 2. Fix Email: Reject double dots or trailing dots[cite: 1]
    document.getElementById('email').addEventListener('input', function() {
        const val = this.value.trim();
        const feedback = document.getElementById('email-feedback');
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/; 
        
        clearTimeout(_debounceTimers.email);
        if (re.test(val) && !val.includes('..')) {
            _debounceTimers.email = setTimeout(() => checkAvailability('email', val), 600);
        } else {
            feedback.textContent = val ? "Imèl pa valid" : "";
            feedback.className = "field-feedback error";
            _validity.email = false;
            validateFormState();
        }
    });

    // 3. Phone & 509 Check[cite: 1]
    document.getElementById('phone').addEventListener('input', function() {
        // Remove 509 if user typed it in the field[cite: 1]
        if (this.value.startsWith('509')) this.value = this.value.replace('509', '');
        this.value = this.value.replace(/\D/g, '').slice(0, 8);

        clearTimeout(_debounceTimers.phone);
        if (this.value.length === 8) {
            _debounceTimers.phone = setTimeout(() => checkAvailability('phone', this.value), 600);
        } else {
            _validity.phone = false;
            validateFormState();
        }
    });

    // 3. Payment conditional UI[cite: 1]
    document.getElementById('payment_value').addEventListener('input', function() {
        this.value = this.value.replace(/\D/g, '').slice(0, 8);
        const radioArea = document.getElementById('pay-selection');
        
        if (this.value.length > 0) {
            radioArea.classList.add('visible');
            _validity.pay = document.querySelector('input[name="payment_type"]:checked') !== null;
        } else {
            radioArea.classList.remove('visible');
            _validity.pay = true; // Valid if empty
        }
        validateFormState();
    });
}

async function checkAvailability(type, val) {
    const feedback = document.getElementById(`${type}-feedback`);
    const checking = document.getElementById(`${type}-checking`);
    checking?.classList.remove('hidden');

    try {
        const res = await fetch(`${RMN_CONFIG.SCRIPT_URL}?action=check_availability&type=${type}&value=${val}`);
        const d = await res.json();
        checking?.classList.add('hidden');
        
        if (d.exists) {
            feedback.textContent = "Deja itilize";
            feedback.className = "field-feedback error";
            _validity[type] = false;
        } else {
            feedback.textContent = "✓ Disponib";
            feedback.className = "field-feedback ok";
            _validity[type] = true;
        }
    } catch(e) {
        checking?.classList.add('hidden');
        _validity[type] = true; 
    }
    validateFormState();
}

function validateFormState() {
    const f = document.getElementById('register-form');
    const btn = document.getElementById('submit-btn');
    const payRadioChecked = document.getElementById('payment_value').value.length > 0 
        ? document.querySelector('input[name="payment_type"]:checked') 
        : true;

    const hasReq = f.prenom.value && f.nom.value && _validity.email && _validity.phone && payRadioChecked;
    btn.disabled = !hasReq;
}

function onCountryChange(v) {
    document.getElementById('prefix-display').textContent = PREFIX_MAP[v] || '+?';
    validateFormState();
}

function populatePlatforms() {
    const grid = document.getElementById('platform-grid');
    RMN_CONFIG.PLATFORMS.forEach(p => {
        const div = document.createElement('div');
        div.className = 'field-wrapper';
        div.innerHTML = `<input type="text" name="${p.key.toLowerCase()}" placeholder="${p.icon} ${p.key}">`;
        grid.appendChild(div);
    });
}

function populateCountries() {
    const sel = document.getElementById('country');
    DIASPORA_COUNTRIES.forEach(c => {
        const o = document.createElement('option');
        o.value = c; o.textContent = c; sel.appendChild(o);
    });
}

function populateDepts() {
    const sel = document.getElementById('departement');
    sel.innerHTML = '<option value="">— Depatman —</option>';
    Object.keys(HAITI).sort().forEach(d => {
        const o = document.createElement('option');
        o.value = d; o.textContent = d; sel.appendChild(o);
    });
}

function onDeptChange(dept) {
    const sel = document.getElementById('commune');
    sel.innerHTML = `<option value="">— Komin —</option>`;
    if (HAITI[dept]) HAITI[dept].sort().forEach(c => {
        const o = document.createElement('option');
        o.value = c; o.textContent = c; sel.appendChild(o);
    });
}
