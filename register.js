/**
 * register.js - Logic for RMN Registration
 */

// 1. GLOBAL INITIALIZATION (Wait for the DOM)
document.addEventListener('DOMContentLoaded', () => {
    console.log("RMN Register Script Initialized");
    
    // Initialize components via loader.js
    loadComponent('header-placeholder', 'HEADER');
    loadComponent('footer-placeholder', 'FOOTER');

    // Initialize country/location listeners
    initLocationLogic();
    initSocialGrid();
    initPrefixLogic();
    
    // Set default prefix if Haiti is pre-selected
    document.getElementById('prefix-display').textContent = '+509';
    // Initialize validation listeners for real-time checks
    initValidationListeners();

    // Translate everything current on page
    L(getCurrentLang()); 

    //  Init custom logic
    initPaymentLogic();
});

// 2. LOCATION LOGIC (Country -> Dept -> Commune)
function initLocationLogic() {
    const countrySel = document.getElementById('country');
    const haitiSection = document.getElementById('location-haiti');

    countrySel.addEventListener('change', (e) => {
        const isHaiti = e.target.value === 'HT' || e.target.value === 'Haiti';
        
        // Show/Hide Haiti-specific fields
        haitiSection.style.display = isHaiti ? 'block' : 'none';
        
        if (isHaiti) {
            // Logic to populate Department dropdown would go here
            console.log("Haiti selected - loading departments...");
        }
    });
}

// 3. VALIDATION LISTENERS (Real-time Email/Phone Check)
function initValidationListeners() {
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');

    // Email check on blur (when user leaves the field)
    emailInput.addEventListener('blur', () => {
        if (emailInput.value.includes('@')) {
            performCheck('email', emailInput.value);
        }
    });

    // Phone check on blur
    phoneInput.addEventListener('blur', () => {
        if (phoneInput.value.length >= 8) {
            performCheck('phone', phoneInput.value);
        }
    });
}

// 4. API CALL FOR CHECKS (Uses Spinners & Strings)
async function performCheck(type, value) {
    const spinner = document.getElementById(`${type}-checking`);
    const msgEl = document.getElementById(`${type}-msg`);
    const lang = getCurrentLang();

    spinner.classList.remove('hidden'); // Show spinner inside field
    
    try {
        const response = await fetch(`${RMN_CONFIG.SCRIPT_URL}?action=check&type=${type}&value=${value}`);
        const data = await response.json();
        
        spinner.classList.add('hidden'); // Hide spinner

        if (data.exists) {
            msgEl.textContent = STRINGS[lang][`f_${type}_exists`];
            msgEl.className = "msg error";
        } else {
            msgEl.textContent = STRINGS[lang][`f_${type}_ok` || 'f_success'];
            msgEl.className = "msg success";
            checkFormValidity(); // Re-check if we can enable the submit button
        }
    } catch (err) {
        spinner.classList.add('hidden');
        console.error("Check failed:", err);
    }
}

// 5. FORM SUBMISSION (The Main Event)
const registerForm = document.getElementById('register-form');

registerForm.addEventListener('submit', async (e) => {
    e.preventDefault(); // Stop page refresh

    // A. Honeypot Security Check
    const hp = document.getElementById('full_name_hp').value;
    if (hp !== "") return; // Bot detected, silent exit

    // B. Payment Validation (8-digit check)
    const paymentVal = document.getElementById('payment_value').value;
    const lang = getCurrentLang();
    
    if (paymentVal.length !== 8) {
        alert(STRINGS[lang].f_phone_invalid);
        return;
    }

    // C. Preparation of Data
    const submitBtn = document.getElementById('submit-btn');
    submitBtn.disabled = true;
    submitBtn.textContent = STRINGS[lang].f_submitting;

    const formData = new FormData(registerForm);
    const dataObj = Object.fromEntries(formData.entries());

    // D. Final Submission to Google Sheets[cite: 1]
    try {
        const response = await fetch(RMN_CONFIG.SCRIPT_URL, {
            method: 'POST',
            body: JSON.stringify({ action: 'register', data: dataObj })
        });
        
        const result = await response.json();
        if (result.success) {
            window.location.href = `success.html?lang=${lang}`;
        } else {
            throw new Error(result.error);
        }
    } catch (err) {
        alert(STRINGS[lang].f_error);
        submitBtn.disabled = false;
        submitBtn.textContent = STRINGS[lang].f_submit;
    }
});

// 1. Function to build Social Media fields dynamically
function initSocialGrid() {
    const grid = document.getElementById('platform-grid');
    const platforms = ['facebook', 'instagram', 'tiktok', 'x', 'youtube'];
    const lang = getCurrentLang();

    grid.innerHTML = platforms.map(p => `
        <div class="platform-item">
            <label for="soc_${p}">${p.charAt(0).toUpperCase() + p.slice(1)}</label>
            <input type="text" id="soc_${p}" name="soc_${p}" placeholder="@handle">
        </div>
    `).join('');
}

// 2. Logic to update the Phone Prefix based on Country
function initPrefixLogic() {
    const countrySel = document.getElementById('country');
    const prefixDisplay = document.getElementById('prefix-display');

    countrySel.addEventListener('change', () => {
        // Logic: if Haiti (+509), else show (+) and let user type or fetch code
        if (countrySel.value === 'HT') {
            prefixDisplay.textContent = '+509';
        } else {
            prefixDisplay.textContent = '+'; 
        }
    });
}

function initPaymentLogic() {
    const payInput = document.getElementById('payment_value');
    const methodWrapper = document.getElementById('payment-method-wrapper');
    const radios = document.getElementsByName('payment_type');

    payInput.addEventListener('input', () => {
        const val = payInput.value.trim();
        
        if (val.length === 8) {
            // Show section and make radios required
            methodWrapper.style.display = 'block';
            radios.forEach(r => r.required = true);
        } else {
            // Hide section and remove requirement/selection
            methodWrapper.style.display = 'none';
            radios.forEach(r => {
                r.required = false;
                r.checked = false;
            });
        }
    });
}

// Helper: Enable submit button only if all required fields are filled
function checkFormValidity() {
    const submitBtn = document.getElementById('submit-btn');
    const isValid = registerForm.checkValidity();
    submitBtn.disabled = !isValid;
}
