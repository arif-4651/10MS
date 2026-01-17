// Toggle Password Visibility
const togglePassword = document.getElementById('togglePassword');
const password = document.getElementById('password');
const eyeIcon = document.getElementById('eyeIcon');
const eyeOffIcon = document.getElementById('eyeOffIcon');

if (togglePassword && password) {
    togglePassword.addEventListener('click', () => {
        const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
        password.setAttribute('type', type);
        
        if (type === 'password') {
            eyeIcon.classList.remove('hidden');
            eyeOffIcon.classList.add('hidden');
        } else {
            eyeIcon.classList.add('hidden');
            eyeOffIcon.classList.remove('hidden');
        }
    });
}

// Toggle Confirm Password Visibility
const toggleConfirmPassword = document.getElementById('toggleConfirmPassword');
const confirmPassword = document.getElementById('confirmPassword');
const eyeIcon2 = document.getElementById('eyeIcon2');
const eyeOffIcon2 = document.getElementById('eyeOffIcon2');

if (toggleConfirmPassword && confirmPassword) {
    toggleConfirmPassword.addEventListener('click', () => {
        const type = confirmPassword.getAttribute('type') === 'password' ? 'text' : 'password';
        confirmPassword.setAttribute('type', type);
        
        if (type === 'password') {
            eyeIcon2.classList.remove('hidden');
            eyeOffIcon2.classList.add('hidden');
        } else {
            eyeIcon2.classList.add('hidden');
            eyeOffIcon2.classList.remove('hidden');
        }
    });
}

// Form Validation
const registerForm = document.getElementById('registerForm');
const fullName = document.getElementById('fullName');
const email = document.getElementById('email');
const phone = document.getElementById('phone');
const passwordField = document.getElementById('password');
const confirmPasswordField = document.getElementById('confirmPassword');

// Validation Functions
function validateEmail(value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
}

function validatePhone(value) {
    // Bangladesh phone number format
    const phoneRegex = /^(?:\+88|88|0)?1[3-9]\d{8}$/;
    return phoneRegex.test(value.replace(/\s/g, ''));
}

function validatePassword(value) {
    return value.length >= 6;
}

// Real-time Validation
if (fullName) {
    fullName.addEventListener('blur', () => {
        const nameError = document.getElementById('nameError');
        if (!fullName.value.trim()) {
            nameError.classList.remove('hidden');
            nameError.textContent = 'নাম দিন';
            fullName.classList.add('border-red-500');
        } else {
            nameError.classList.add('hidden');
            fullName.classList.remove('border-red-500');
        }
    });

    fullName.addEventListener('input', () => {
        if (fullName.classList.contains('border-red-500')) {
            document.getElementById('nameError').classList.add('hidden');
            fullName.classList.remove('border-red-500');
        }
    });
}

if (email) {
    email.addEventListener('blur', () => {
        const emailError = document.getElementById('emailError');
        const value = email.value.trim();
        if (!value || !validateEmail(value)) {
            emailError.classList.remove('hidden');
            emailError.textContent = 'বৈধ ইমেইল দিন';
            email.classList.add('border-red-500');
        } else {
            emailError.classList.add('hidden');
            email.classList.remove('border-red-500');
        }
    });

    email.addEventListener('input', () => {
        if (email.classList.contains('border-red-500')) {
            document.getElementById('emailError').classList.add('hidden');
            email.classList.remove('border-red-500');
        }
    });
}

if (phone) {
    phone.addEventListener('blur', () => {
        const phoneError = document.getElementById('phoneError');
        const value = phone.value.trim();
        if (!value || !validatePhone(value)) {
            phoneError.classList.remove('hidden');
            phoneError.textContent = 'বৈধ ফোন নম্বর দিন (০১৭১২৩৪৫৬৭৮)';
            phone.classList.add('border-red-500');
        } else {
            phoneError.classList.add('hidden');
            phone.classList.remove('border-red-500');
        }
    });

    phone.addEventListener('input', () => {
        if (phone.classList.contains('border-red-500')) {
            document.getElementById('phoneError').classList.add('hidden');
            phone.classList.remove('border-red-500');
        }
    });
}

if (passwordField) {
    passwordField.addEventListener('blur', () => {
        const passwordError = document.getElementById('passwordError');
        if (!validatePassword(passwordField.value)) {
            passwordError.classList.remove('hidden');
            passwordError.textContent = 'পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে';
            passwordField.classList.add('border-red-500');
        } else {
            passwordError.classList.add('hidden');
            passwordField.classList.remove('border-red-500');
        }
    });

    passwordField.addEventListener('input', () => {
        if (passwordField.classList.contains('border-red-500')) {
            document.getElementById('passwordError').classList.add('hidden');
            passwordField.classList.remove('border-red-500');
        }
        
        // Check if confirm password matches
        if (confirmPasswordField.value) {
            validateConfirmPassword();
        }
    });
}

function validateConfirmPassword() {
    const confirmPasswordError = document.getElementById('confirmPasswordError');
    if (confirmPasswordField.value !== passwordField.value) {
        confirmPasswordError.classList.remove('hidden');
        confirmPasswordError.textContent = 'পাসওয়ার্ড মিলছে না';
        confirmPasswordField.classList.add('border-red-500');
        return false;
    } else {
        confirmPasswordError.classList.add('hidden');
        confirmPasswordField.classList.remove('border-red-500');
        return true;
    }
}

if (confirmPasswordField) {
    confirmPasswordField.addEventListener('blur', validateConfirmPassword);
    
    confirmPasswordField.addEventListener('input', () => {
        if (confirmPasswordField.classList.contains('border-red-500')) {
            validateConfirmPassword();
        }
    });
}

// Form Submission
if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = fullName.value.trim();
        const emailValue = email.value.trim();
        const phoneValue = phone.value.trim();
        const passwordValue = passwordField.value;
        const confirmPasswordValue = confirmPasswordField.value;
        const terms = document.getElementById('terms').checked;
        
        // Validation
        let isValid = true;
        
        if (!name) {
            document.getElementById('nameError').classList.remove('hidden');
            fullName.classList.add('border-red-500');
            isValid = false;
        }
        
        if (!emailValue || !validateEmail(emailValue)) {
            document.getElementById('emailError').classList.remove('hidden');
            email.classList.add('border-red-500');
            isValid = false;
        }
        
        if (!phoneValue || !validatePhone(phoneValue)) {
            document.getElementById('phoneError').classList.remove('hidden');
            phone.classList.add('border-red-500');
            isValid = false;
        }
        
        if (!validatePassword(passwordValue)) {
            document.getElementById('passwordError').classList.remove('hidden');
            passwordField.classList.add('border-red-500');
            isValid = false;
        }
        
        if (!validateConfirmPassword()) {
            isValid = false;
        }
        
        if (!terms) {
            alert('শর্তাবলী এবং গোপনীয়তা নীতিতে সম্মত হতে হবে');
            isValid = false;
        }
        
        if (!isValid) {
            return;
        }
        
        // Disable button and show loading
        const registerBtn = document.getElementById('registerBtn');
        const originalBtnText = registerBtn.textContent;
        registerBtn.disabled = true;
        registerBtn.textContent = 'রেজিস্টার করা হচ্ছে...';
        
        // Call register API
        register(name, emailValue, phoneValue, passwordValue)
            .then(result => {
                if (result.success) {
                    // Show success message
                    if (typeof Swal !== 'undefined') {
                        Swal.fire({
                            icon: 'success',
                            title: 'রেজিস্টার সফল!',
                            text: 'লগইন পেজ-এ redirect করা হচ্ছে...',
                            timer: 2000,
                            showConfirmButton: false
                        }).then(() => {
                            window.location.href = 'login.html';
                        });
                    } else {
                        alert('রেজিস্টার সফল! লগইন পেজ-এ redirect করা হচ্ছে...');
                        setTimeout(() => {
                            window.location.href = 'login.html';
                        }, 1500);
                    }
                } else {
                    // Show error message
                    if (typeof Swal !== 'undefined') {
                        Swal.fire({
                            icon: 'error',
                            title: 'রেজিস্টার ব্যর্থ',
                            text: result.message || 'রেজিস্টার করার সময় সমস্যা হয়েছে'
                        });
                    } else {
                        alert(result.message || 'রেজিস্টার করার সময় সমস্যা হয়েছে');
                    }
                    
                    // Reset button
                    registerBtn.disabled = false;
                    registerBtn.textContent = originalBtnText;
                }
            })
            .catch(error => {
                console.error('Registration error:', error);
                if (typeof Swal !== 'undefined') {
                    Swal.fire({
                        icon: 'error',
                        title: 'ত্রুটি',
                        text: 'রেজিস্টার করার সময় সমস্যা হয়েছে। আবার চেষ্টা করুন।'
                    });
                } else {
                    alert('রেজিস্টার করার সময় সমস্যা হয়েছে। আবার চেষ্টা করুন।');
                }
                
                // Reset button
                registerBtn.disabled = false;
                registerBtn.textContent = originalBtnText;
            });
    });
}

// OTP Registration Button
const otpRegisterBtn = document.getElementById('otpRegisterBtn');
if (otpRegisterBtn) {
    otpRegisterBtn.addEventListener('click', () => {
        // Redirect to OTP registration page (you can create this later)
        alert('OTP রেজিস্টার শীঘ্রই আসছে!');
        // window.location.href = 'otp-register.html';
    });
}

