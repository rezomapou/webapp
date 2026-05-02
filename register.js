/** 
 * register.js - Separated Logic with Enhanced Validation
 */

let _validity = { phone: false, email: false, pay: true };
const PREFIX_MAP = { 'Haïti': '+509', 'USA': '+1', 'Canada': '+1', 'France': '+33', 'Dominican Republic': '+1' };

document.addEventListener('DOMContentLoaded', () => {
    populateCountries();
    populatePlatforms();
    
    const countrySel = document.getElementById('country');
    countrySel.addEventListener('change', (e) => onCountryChange(e.target.value));

    // Email validation fix for double dots
    document.getElementById('email').addEventListener('input', function() {
        const val = this.value.trim();
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/; 
        if (re.test(val) && !val.includes('..')) {
            checkAvailability('email', val);
        } else {
            _validity.email = false;
            validateFormState();
        }
    });

    // 3. Dynamic length and prefix for international
    document.getElementById('phone').addEventListener('input', function() {
        const isHaiti = document.getElementById('country').value === 'Haïti';
        this.value = this.value.replace(/\D/g, '');
        if (isHaiti) this.value = this.value.slice(0, 8);
        
        if (this.value.length >= (isHaiti ? 8 : 10)) {
            checkAvailability('phone', this.value);
        } else {
            _validity.phone = false;
            validateFormState();
        }
    });

    document.getElementById('payment_value').addEventListener('input', function() {
        this.value = this.value.replace(/\D/g, '').slice(0, 8);
        const radioArea = document.getElementById('pay-selection');
        if (this.value.length > 0) {
            radioArea.classList.add('visible');
            _validity.pay = document.querySelector('input[name="payment_type"]:checked') !== null;
        } else {
            radioArea.classList.remove('visible');
            _validity.pay = true;
        }
        validateFormState();
    });

    // 4. Data Row fix
    document.getElementById('register-form').addEventListener('submit', handleRegistration);
});

function onCountryChange(v) {
    document.getElementById('prefix-display').textContent = PREFIX_MAP[v] || '+?';
    // Clear phone validation on country change to force re-check
    document.getElementById('phone').value = '';
    _validity.phone = false;
    validateFormState();
}

async function handleRegistration(e) {
    e.preventDefault();
    const btn = document.getElementById('submit-btn');
    btn.disabled = true;
    
    const formData = new FormData(e.target);
    const params = new URLSearchParams();
    
    // Explicitly mapping all fields for the Google Script
    formData.forEach((value, key) => {
        if (key !== 'payment_type' && key !== 'payment_value') params.append(key, value);
    });

    const payType = formData.get('payment_type');
    const payVal = formData.get('payment_value');
    if (payVal && payType) params.append(payType, payVal);
    
    params.append('action', 'register');

    try {
        await fetch(RMN_CONFIG.SCRIPT_URL, { 
            method: 'POST', 
            body: params, 
            mode: 'no-cors' 
        });
        window.location.href = "dashboard.html";
    } catch(err) {
        btn.disabled = false;
    }
}

function validateFormState() {
    const f = document.getElementById('register-form');
    const btn = document.getElementById('submit-btn');
    const hasReq = f.prenom.value && f.nom.value && _validity.email && _validity.phone && _validity.pay;
    btn.disabled = !hasReq;
}

function populateCountries() {
    const sel = document.getElementById('country');
    sel.innerHTML = '<option value="">— Peyi —</option>';
    DIASPORA_COUNTRIES.forEach(c => {
        const o = document.createElement('option');
        o.value = c; o.textContent = c; sel.appendChild(o);
    });
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
