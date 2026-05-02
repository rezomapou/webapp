/** 
 * register.js - Streamlined Logic
 */

let _validity = { phone: false, email: false, pay: true };
const PREFIX_MAP = { 
    'Haïti': '+509', 
    'USA': '+1', 
    'Canada': '+1', 
    'France': '+33', 
    'Dominican Republic': '+1' 
};

document.addEventListener('DOMContentLoaded', () => {
    // 1. Setup UI
    populateCountries();
    populatePlatforms();
    
    // 2. Initialize All Event Listeners
    initValidationListeners();

    // 3. Bind the main form submission
    const form = document.getElementById('register-form');
    if (form) form.addEventListener('submit', handleRegistration);
});

/**
 * Binds ALL input events to validation logic in one place
 */
function initValidationListeners() {
    const countrySel = document.getElementById('country');
    const emailField = document.getElementById('email');
    const phoneField = document.getElementById('phone');
    const payField   = document.getElementById('payment_value');
    const deptField  = document.getElementById('departement');

    // Country Toggle
    if (countrySel) {
        countrySel.addEventListener('change', (e) => onCountryChange(e.target.value));
    }

    // Email Logic: Check for double dots or bad formatting
    if (emailField) {
        emailField.addEventListener('input', function() {
            const val = this.value.trim();
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/; 
            if (re.test(val) && !val.includes('..')) {
                checkAvailability('email', val);
            } else {
                _validity.email = false;
                validateFormState();
            }
        });
    }

    // Phone Logic: 8-digit Haiti limit or International length
    if (phoneField) {
        phoneField.addEventListener('input', function() {
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
    }

    // Payment Logic: Show/Hide MonCash/NatCash
    if (payField) {
        payField.addEventListener('input', function() {
            this.value = this.value.replace(/\D/g, '').slice(0, 8);
            const radioArea = document.getElementById('pay-selection');
            if (this.value.length > 0) {
                radioArea.classList.add('visible');
                const checked = document.querySelector('input[name="payment_type"]:checked');
                _validity.pay = checked !== null;
            } else {
                radioArea.classList.remove('visible');
                _validity.pay = true; 
            }
            validateFormState();
        });
    }

    // Haiti Location Logic: Trigger Commune when Department changes
    if (deptField) {
        deptField.addEventListener('change', (e) => onDeptChange(e.target.value));
    }
}

/**
 * UI Support Functions
 */

function onCountryChange(v) {
    const isHaiti = (v === 'Haïti');
    
    // Show/Hide Location Div
    const locGroup = document.getElementById('location-haiti');
    if (locGroup) locGroup.style.display = isHaiti ? 'block' : 'none';

    // Update Prefix
    document.getElementById('prefix-display').textContent = PREFIX_MAP[v] || '+?';

    // Populate Depts if Haiti
    if (isHaiti) populateDepts();
    
    validateFormState();
}

function onDeptChange(dept) {
    const sel = document.getElementById('commune');
    if (!sel) return;
    sel.innerHTML = `<option value="">— Komin —</option>`;
    if (typeof HAITI !== 'undefined' && HAITI[dept]) {
        HAITI[dept].sort().forEach(c => {
            const o = document.createElement('option');
            o.value = c; o.textContent = c; sel.appendChild(o);
        });
    }
}

function populateDepts() {
    const sel = document.getElementById('departement');
    if (!sel) return;
    sel.innerHTML = '<option value="">— Depatman —</option>';
    if (typeof HAITI !== 'undefined') {
        Object.keys(HAITI).sort().forEach(d => {
            const o = document.createElement('option');
            o.value = d; o.textContent = d; sel.appendChild(o);
        });
    }
}

function populateCountries() {
    const sel = document.getElementById('country');
    if (!sel) return;
    sel.innerHTML = '<option value="">— Peyi —</option>';
    DIASPORA_COUNTRIES.forEach(c => {
        const o = document.createElement('option');
        o.value = c; o.textContent = c; sel.appendChild(o);
    });
}

function populatePlatforms() {
    const grid = document.getElementById('platform-grid');
    if (!grid) return;
    RMN_CONFIG.PLATFORMS.forEach(p => {
        const div = document.createElement('div');
        div.className = 'field-wrapper';
        div.innerHTML = `<input type="text" name="${p.key.toLowerCase()}" placeholder="${p.icon} ${p.key}">`;
        grid.appendChild(div);
    });
}

/**
 * Backend Communication
 */

async function handleRegistration(e) {
    e.preventDefault();
    const btn = document.getElementById('submit-btn');
    btn.disabled = true;
    btn.textContent = "Ap voye...";

    const formData = new FormData(e.target);
    const params = new URLSearchParams();
    
    // Core Identity
    params.append('prenom', formData.get('prenom'));
    params.append('nom', formData.get('nom'));
    params.append('email', formData.get('email').toLowerCase().trim());
    params.append('country', formData.get('country'));
    params.append('departement', formData.get('departement') || '');
    params.append('commune', formData.get('commune') || '');
    
    const rawPhone = formData.get('phone').replace(/\D/g, '');
    params.append('phone', rawPhone); 
    
    params.append('action', 'register');
    params.append('lang', document.documentElement.lang || 'ht');

    // Payment Logic
    const payType = formData.get('payment_type'); 
    const payVal = formData.get('payment_value');
    if (payVal && payType) {
        params.append(payType, payVal); 
    }

    // Platforms
    const platforms = ['facebook', 'instagram', 'twitter', 'tiktok', 'whatsapp'];
    platforms.forEach(p => {
        const val = formData.get(p);
        if (val) params.append(p, val);
    });

    const finalUrl = `${RMN_CONFIG.SCRIPT_URL}?${params.toString()}`;

    try {
        await fetch(finalUrl, { method: 'POST', mode: 'no-cors' });
        setTimeout(() => {
            window.location.href = "dashboard.html";
        }, 800);
    } catch(err) {
        console.error("Submission failed:", err);
        btn.disabled = false;
        btn.textContent = "Eseye ankò";
    }
}

function validateFormState() {
    const f = document.getElementById('register-form');
    const btn = document.getElementById('submit-btn');
    if (!f || !btn) return;
    
    const hasReq = f.prenom.value && f.nom.value && _validity.email && _validity.phone && _validity.pay;
    btn.disabled = !hasReq;
}
