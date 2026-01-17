// Form Validation
const forgotPasswordForm = document.getElementById('forgotPasswordForm');
const resetEmail = document.getElementById('resetEmail');
const emailError = document.getElementById('emailError');

// Email/Phone Validation
function validateEmailOrPhone(value) {
    // Email regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // Phone regex (Bangladesh format)
    const phoneRegex = /^(?:\+88|88|0)?1[3-9]\d{8}$/;
    
    return emailRegex.test(value) || phoneRegex.test(value.replace(/\s/g, ''));
}

// Real-time validation
if (resetEmail) {
    resetEmail.addEventListener('blur', () => {
        const value = resetEmail.value.trim();
        if (value && !validateEmailOrPhone(value)) {
            emailError.classList.remove('hidden');
            emailError.textContent = 'বৈধ ইমেইল বা ফোন নম্বর দিন';
            resetEmail.classList.add('border-red-500');
        } else {
            emailError.classList.add('hidden');
            resetEmail.classList.remove('border-red-500');
        }
    });

    resetEmail.addEventListener('input', () => {
        if (resetEmail.classList.contains('border-red-500')) {
            emailError.classList.add('hidden');
            resetEmail.classList.remove('border-red-500');
        }
    });
}

// Form Submission
if (forgotPasswordForm) {
    forgotPasswordForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = resetEmail.value.trim();
        
        // Validation
        if (!email || !validateEmailOrPhone(email)) {
            emailError.classList.remove('hidden');
            emailError.textContent = 'বৈধ ইমেইল বা ফোন নম্বর দিন';
            resetEmail.classList.add('border-red-500');
            return;
        }
        
        // Disable button and show loading
        const resetBtn = document.getElementById('resetBtn');
        resetBtn.disabled = true;
        resetBtn.textContent = 'লিঙ্ক পাঠানো হচ্ছে...';
        
        // Simulate API call
        setTimeout(() => {
            // Here you would make an actual API call
            console.log('Password reset request:', { email });
            
            // For demo purposes, show success
            alert('রিসেট লিঙ্ক আপনার ইমেইলে পাঠানো হয়েছে! (Demo - Backend integration needed)');
            
            // Reset button
            resetBtn.disabled = false;
            resetBtn.textContent = 'রিসেট লিঙ্ক পাঠান';
            
            // Redirect to login after 2 seconds
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 2000);
        }, 1500);
    });
}

