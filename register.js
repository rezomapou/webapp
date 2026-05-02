/** 
 * register.js - Cleaned & Modular
 */

let _validity = { phone: false, email: false, pay: true };
const PREFIX_MAP = { 'Haïti': '+509', 'USA': '+1', 'Canada': '+1', 'France': '+33', 'Dominican Republic': '+1' };

document.addEventListener('DOMContentLoaded', () => {
    // 1. Setup UI
    populateCountries();
    populatePlatforms();
    
    // 2. Initialize All Event Listeners (Only call this once!)
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

    // Email Logic
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

    // Phone Logic
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

    // Payment Logic
    if (payField) {
        payField.addEventListener('input', function() {
            this.value = this.value.replace(/\D/g, '').slice(0, 8);
            const radioArea = document.getElementById('pay-selection');
            if (this.value.length > 0) {
                radioArea.classList.add('visible');
                // Check if a radio is actually selected
                const checked = document.querySelector('input[name="payment_type"]:checked');
                _validity.pay = checked !== null;
            } else {
                radioArea.classList.remove('visible');
                _validity.pay = true; 
            }
            validateFormState();
        });
    }

    // Haiti Location Logic
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

    // Reset and Populate Depts
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

// ... (Keep your handleRegistration, populateCountries, etc. as they are) ...
