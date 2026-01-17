// Toggle Password Visibility
const togglePassword = document.getElementById('togglePassword');
const loginPassword = document.getElementById('loginPassword');
const eyeIcon = document.getElementById('eyeIcon');
const eyeOffIcon = document.getElementById('eyeOffIcon');

if (togglePassword && loginPassword) {
    togglePassword.addEventListener('click', () => {
        const type = loginPassword.getAttribute('type') === 'password' ? 'text' : 'password';
        loginPassword.setAttribute('type', type);
        
        if (type === 'password') {
            eyeIcon.classList.remove('hidden');
            eyeOffIcon.classList.add('hidden');
        } else {
            eyeIcon.classList.add('hidden');
            eyeOffIcon.classList.remove('hidden');
        }
    });
}

// Form Validation
const loginForm = document.getElementById('loginForm');
const loginEmail = document.getElementById('loginEmail');
const loginPasswordField = document.getElementById('loginPassword');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');

// Email/Phone Validation
function validateEmailOrPhone(value) {
    // Email regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // Phone regex (Bangladesh format)
    const phoneRegex = /^(?:\+88|88|0)?1[3-9]\d{8}$/;
    
    return emailRegex.test(value) || phoneRegex.test(value.replace(/\s/g, ''));
}

// Real-time validation (less strict - only on blur, not while typing)
if (loginEmail) {
    loginEmail.addEventListener('blur', () => {
        const value = loginEmail.value.trim();
        if (value && !validateEmailOrPhone(value)) {
            emailError.classList.remove('hidden');
            emailError.textContent = 'বৈধ ইমেইল বা ফোন নম্বর দিন';
            loginEmail.classList.add('border-red-500');
        } else if (value) {
            // Only clear error if value is valid
            emailError.classList.add('hidden');
            loginEmail.classList.remove('border-red-500');
        }
    });

    // Clear error while typing
    loginEmail.addEventListener('input', () => {
        if (loginEmail.classList.contains('border-red-500')) {
            emailError.classList.add('hidden');
            loginEmail.classList.remove('border-red-500');
        }
    });
}

if (loginPasswordField) {
    loginPasswordField.addEventListener('blur', () => {
        const value = loginPasswordField.value;
        if (value && value.length < 6) {
            passwordError.classList.remove('hidden');
            passwordError.textContent = 'পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে';
            loginPasswordField.classList.add('border-red-500');
        } else if (value) {
            // Only clear error if value is valid
            passwordError.classList.add('hidden');
            loginPasswordField.classList.remove('border-red-500');
        }
    });

    // Clear error while typing
    loginPasswordField.addEventListener('input', () => {
        if (loginPasswordField.classList.contains('border-red-500')) {
            passwordError.classList.add('hidden');
            loginPasswordField.classList.remove('border-red-500');
        }
    });
}

// Form Submission
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = loginEmail.value.trim();
        const password = loginPasswordField.value;
        const rememberMe = document.getElementById('rememberMe').checked;
        
        // Clear previous errors
        if (emailError) emailError.classList.add('hidden');
        if (passwordError) passwordError.classList.add('hidden');
        if (loginEmail) loginEmail.classList.remove('border-red-500');
        if (loginPasswordField) loginPasswordField.classList.remove('border-red-500');
        
        // Validation
        let isValid = true;
        
        if (!email || !validateEmailOrPhone(email)) {
            if (emailError) {
                emailError.classList.remove('hidden');
                emailError.textContent = 'বৈধ ইমেইল বা ফোন নম্বর দিন';
            }
            if (loginEmail) loginEmail.classList.add('border-red-500');
            isValid = false;
        }
        
        if (!password || password.length < 6) {
            if (passwordError) {
                passwordError.classList.remove('hidden');
                passwordError.textContent = 'পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে';
            }
            if (loginPasswordField) loginPasswordField.classList.add('border-red-500');
            isValid = false;
        }
        
        if (!isValid) {
            // Scroll to first error
            if (!email || !validateEmailOrPhone(email)) {
                loginEmail?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            } else if (!password || password.length < 6) {
                loginPasswordField?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            return;
        }
        
        // Disable button and show loading
        const loginBtn = document.getElementById('loginBtn');
        const originalBtnText = loginBtn.textContent;
        loginBtn.disabled = true;
        loginBtn.textContent = 'লগইন করা হচ্ছে...';
        
        // Call login API
        login(email, password)
            .then(result => {
                if (result.success) {
                    // Show success message
                    if (typeof Swal !== 'undefined') {
                        Swal.fire({
                            icon: 'success',
                            title: 'লগইন সফল!',
                            text: 'Dashboard-এ redirect করা হচ্ছে...',
                            timer: 1500,
                            showConfirmButton: false
                        }).then(() => {
                            window.location.href = 'dashboard.html';
                        });
                    } else {
                        alert('লগইন সফল! Dashboard-এ redirect করা হচ্ছে...');
                        setTimeout(() => {
                            window.location.href = 'dashboard.html';
                        }, 1000);
                    }
                } else {
                    // Show error message
                    if (typeof Swal !== 'undefined') {
                        Swal.fire({
                            icon: 'error',
                            title: 'লগইন ব্যর্থ',
                            text: result.message || 'ইমেইল বা পাসওয়ার্ড ভুল'
                        });
                    } else {
                        alert(result.message || 'ইমেইল বা পাসওয়ার্ড ভুল');
                    }
                    
                    // Reset button
                    loginBtn.disabled = false;
                    loginBtn.textContent = originalBtnText;
                }
            })
            .catch(error => {
                console.error('Login error:', error);
                if (typeof Swal !== 'undefined') {
                    Swal.fire({
                        icon: 'error',
                        title: 'ত্রুটি',
                        text: 'লগইন করার সময় সমস্যা হয়েছে। আবার চেষ্টা করুন।'
                    });
                } else {
                    alert('লগইন করার সময় সমস্যা হয়েছে। আবার চেষ্টা করুন।');
                }
                
                // Reset button
                loginBtn.disabled = false;
                loginBtn.textContent = originalBtnText;
            });
    });
}

// OTP Login Button
const otpLoginBtn = document.getElementById('otpLoginBtn');
if (otpLoginBtn) {
    otpLoginBtn.addEventListener('click', () => {
        // Redirect to OTP login page (you can create this later)
        alert('OTP লগইন শীঘ্রই আসছে!');
        // window.location.href = 'otp-login.html';
    });
}

// Social Login Buttons (only target social login buttons specifically)
const socialLoginSection = document.querySelector('.bg-white.rounded-xl.shadow-lg');
if (socialLoginSection) {
    const googleBtn = socialLoginSection.querySelector('button:has(svg)');
    const facebookBtn = socialLoginSection.querySelectorAll('button:has(svg)')[1];
    
    if (googleBtn && googleBtn.textContent.includes('Google')) {
        googleBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            if (typeof Swal !== 'undefined') {
                Swal.fire({
                    icon: 'info',
                    title: 'শীঘ্রই আসছে',
                    text: 'Google লগইন শীঘ্রই আসছে!'
                });
            } else {
                alert('Google লগইন শীঘ্রই আসছে!');
            }
        });
    }
    
    if (facebookBtn && facebookBtn.textContent.includes('Facebook')) {
        facebookBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            if (typeof Swal !== 'undefined') {
                Swal.fire({
                    icon: 'info',
                    title: 'শীঘ্রই আসছে',
                    text: 'Facebook লগইন শীঘ্রই আসছে!'
                });
            } else {
                alert('Facebook লগইন শীঘ্রই আসছে!');
            }
        });
    }
}

