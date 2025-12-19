// ===== CONFIGURATION =====
const MOCK_API_DELAY = 1500; // 1.5 secondes de simulation
const SUCCESS_RATE = 0.9; // 90% de succès

// ===== ÉLÉMENTS DOM =====
const contactForm = document.getElementById('contact-form');
const submitBtn = contactForm.querySelector('button[type="submit"]');
const successMessage = document.getElementById('success-message');

// ===== ÉVÉNEMENT FORMULAIRE =====
contactForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Validation
    if (!validateForm()) {
        return;
    }
    
    // Mode chargement
    setLoading(true);
    
    try {
        // Données du formulaire
        const formData = {
            name: contactForm.querySelector('input[type="text"]').value.trim(),
            email: contactForm.querySelector('input[type="email"]').value.trim(),
            message: contactForm.querySelector('textarea').value.trim(),
            submittedAt: new Date().toISOString(),
            userAgent: navigator.userAgent
        };
        
        // Appel API mockée
        const response = await mockApiCall(formData);
        
        if (response.success) {
            // Succès
            showSuccess(response);
            
            // Reset du formulaire
            contactForm.reset();
            
            // Log pour débogage
            console.log('✅ Formulaire envoyé:', {
                data: formData,
                response: response
            });
            
        } else {
            throw new Error(response.message || 'Erreur inconnue');
        }
        
    } catch (error) {
        // Erreur
        showError(error.message);
        console.error('❌ Erreur:', error);
        
    } finally {
        // Fin du chargement
        setLoading(false);
    }
});

// ===== FONCTION API MOCKÉE =====
async function mockApiCall(formData) {
    // Simulation délai réseau
    await delay(MOCK_API_DELAY);
    
    // Simulation succès/erreur aléatoire
    const isSuccess = Math.random() < SUCCESS_RATE;
    
    if (isSuccess) {
        return {
            success: true,
            message: "Message reçu avec succès",
            reference: generateReference(),
            timestamp: new Date().toISOString(),
            mock: true
        };
    } else {
        return {
            success: false,
            message: "Service temporairement indisponible",
            error: "API_MOCK_ERROR"
        };
    }
}

// ===== FONCTIONS UTILITAIRES =====
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function generateReference() {
    const date = new Date();
    const random = Math.random().toString(36).substr(2, 6).toUpperCase();
    return `MKV-${date.getFullYear()}${date.getMonth()+1}${date.getDate()}-${random}`;
}

function validateForm() {
    const name = contactForm.querySelector('input[type="text"]');
    const email = contactForm.querySelector('input[type="email"]');
    const message = contactForm.querySelector('textarea');
    
    // Réinitialiser les erreurs
    clearErrors();
    
    let isValid = true;
    
    // Validation nom
    if (!name.value.trim()) {
        showFieldError(name, 'Le nom est requis');
        isValid = false;
    }
    
    // Validation email
    if (!email.value.trim()) {
        showFieldError(email, 'L\'email est requis');
        isValid = false;
    } else if (!isValidEmail(email.value)) {
        showFieldError(email, 'Email invalide');
        isValid = false;
    }
    
    // Validation message
    if (!message.value.trim()) {
        showFieldError(message, 'Le message est requis');
        isValid = false;
    } else if (message.value.trim().length < 10) {
        showFieldError(message, 'Minimum 10 caractères');
        isValid = false;
    }
    
    return isValid;
}

function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function showFieldError(element, message) {
    // Style d'erreur
    element.style.border = '2px solid #ff6b6b';
    
    // Message d'erreur
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.style.color = '#ff6b6b';
    errorDiv.style.fontSize = '14px';
    errorDiv.style.marginTop = '5px';
    errorDiv.textContent = message;
    
    element.parentNode.appendChild(errorDiv);
}

function clearErrors() {
    // Réinitialiser les bordures
    document.querySelectorAll('input, textarea').forEach(el => {
        el.style.border = '';
    });
    
    // Supprimer les messages d'erreur
    document.querySelectorAll('.error-message').forEach(el => {
        el.remove();
    });
    
    // Cacher le message de succès/erreur
    successMessage.style.display = 'none';
    successMessage.innerHTML = '';
}

function setLoading(isLoading) {
    if (isLoading) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
            <span class="loader"></span> Envoi en cours...
        `;
    } else {
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Envoyer';
    }
}

function showSuccess(response) {
    successMessage.innerHTML = `
        <div style="text-align: center;">
            <div style="font-size: 40px; color: gold;">✔</div>
            <h3 style="color: gold; margin: 10px 0;">Message envoyé !</h3>
            <p>Nous vous contacterons dans les 24h.</p>
            <p style="font-size: 12px; opacity: 0.7;">
                Référence: ${response.reference}
            </p>
        </div>
    `;
    successMessage.style.display = 'block';
    successMessage.style.color = 'white';
    successMessage.style.backgroundColor = '#1a472a';
    successMessage.style.border = '1px solid gold';
}

function showError(message) {
    successMessage.innerHTML = `
        <div style="text-align: center;">
            <div style="font-size: 40px; color: #ff6b6b;">✘</div>
            <h3 style="color: #ff6b6b; margin: 10px 0;">Erreur</h3>
            <p>${message}</p>
            <p style="font-size: 14px;">Veuillez réessayer.</p>
        </div>
    `;
    successMessage.style.display = 'block';
    successMessage.style.color = 'white';
    successMessage.style.backgroundColor = '#472a1a';
    successMessage.style.border = '1px solid #ff6b6b';
}

// ===== STYLE DU LOADER =====
const style = document.createElement('style');
style.textContent = `
    .loader {
        display: inline-block;
        width: 16px;
        height: 16px;
        border: 2px solid #fff;
        border-bottom-color: transparent;
        border-radius: 50%;
        animation: rotation 1s linear infinite;
        margin-right: 8px;
        vertical-align: middle;
    }
    
    @keyframes rotation {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    
    .error-message {
        animation: fadeIn 0.3s ease;
    }
    
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(-10px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;
document.head.appendChild(style);

// ===== INITIALISATION =====
console.log('🚀 MKV Luxury Landing Page chargée');
console.log('📡 Mode: API Mockée (simulation)');