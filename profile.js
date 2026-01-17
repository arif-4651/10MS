// Tab Switching
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const targetTab = button.getAttribute('data-tab');
        
        // Remove active class from all buttons
        tabButtons.forEach(btn => {
            btn.classList.remove('active', 'text-indigo-600', 'border-indigo-600');
            btn.classList.add('text-slate-500', 'border-transparent');
        });
        
        // Hide all tab contents
        tabContents.forEach(content => {
            content.classList.add('hidden');
        });
        
        // Add active class to clicked button
        button.classList.add('active', 'text-indigo-600', 'border-indigo-600');
        button.classList.remove('text-slate-500', 'border-transparent');
        
        // Show target tab content
        const targetContent = document.getElementById(targetTab);
        if (targetContent) {
            targetContent.classList.remove('hidden');
        }
    });
});

// Avatar Upload
const avatarUpload = document.getElementById('avatarUpload');
if (avatarUpload) {
    avatarUpload.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                // In a real app, you would upload this to server
                // For now, just show a preview
                const avatarImage = document.getElementById('avatarImage');
                if (avatarImage) {
                    avatarImage.src = e.target.result;
                    document.getElementById('avatarInitials').classList.add('hidden');
                }
                showNotification('প্রোফাইল ছবি আপলোড করা হয়েছে!', 'success');
            };
            reader.readAsDataURL(file);
        }
    });
}

// Profile Form Validation
const profileForm = document.getElementById('profileForm');
if (profileForm) {
    profileForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const fullName = document.getElementById('fullName').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        
        let isValid = true;
        
        // Validate name
        if (!fullName) {
            showError('nameError', 'নাম দিন');
            isValid = false;
        } else {
            hideError('nameError');
        }
        
        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) {
            showError('emailError', 'বৈধ ইমেইল দিন');
            isValid = false;
        } else {
            hideError('emailError');
        }
        
        // Validate phone
        const phoneRegex = /^(?:\+88|88|0)?1[3-9]\d{8}$/;
        if (!phone || !phoneRegex.test(phone.replace(/\s/g, ''))) {
            showError('phoneError', 'বৈধ ফোন নম্বর দিন');
            isValid = false;
        } else {
            hideError('phoneError');
        }
        
        if (!isValid) return;
        
        // Update profile name and email in header
        document.getElementById('profileName').textContent = fullName;
        document.getElementById('profileEmail').textContent = email;
        
        // Update avatar initials
        const initials = fullName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
        document.getElementById('avatarInitials').textContent = initials;
        
        // Simulate API call
        showNotification('প্রোফাইল সফলভাবে আপডেট করা হয়েছে!', 'success');
    });
}

// Password Form Validation
const passwordForm = document.getElementById('passwordForm');
if (passwordForm) {
    passwordForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const currentPassword = document.getElementById('currentPassword').value;
        const newPassword = document.getElementById('newPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        
        let isValid = true;
        
        // Validate current password
        if (!currentPassword) {
            showError('currentPasswordError', 'বর্তমান পাসওয়ার্ড দিন');
            isValid = false;
        } else {
            hideError('currentPasswordError');
        }
        
        // Validate new password
        if (!newPassword || newPassword.length < 6) {
            showError('newPasswordError', 'পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে');
            isValid = false;
        } else {
            hideError('newPasswordError');
        }
        
        // Validate confirm password
        if (newPassword !== confirmPassword) {
            showError('confirmPasswordError', 'পাসওয়ার্ড মিলছে না');
            isValid = false;
        } else {
            hideError('confirmPasswordError');
        }
        
        if (!isValid) return;
        
        // Simulate API call
        showNotification('পাসওয়ার্ড সফলভাবে পরিবর্তন করা হয়েছে!', 'success');
        passwordForm.reset();
    });
}

// Toggle Password Visibility
function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
    input.setAttribute('type', type);
}

// Reset Form
function resetForm() {
    if (confirm('আপনি কি ফর্ম রিসেট করতে চান?')) {
        document.getElementById('profileForm').reset();
        document.getElementById('fullName').value = 'রাফি আহমেদ';
        document.getElementById('email').value = 'rafi@example.com';
        document.getElementById('phone').value = '০১৭১২৩৪৫৬৭৮';
    }
}

// Reset Password Form
function resetPasswordForm() {
    if (confirm('আপনি কি ফর্ম রিসেট করতে চান?')) {
        document.getElementById('passwordForm').reset();
    }
}

// Show Error
function showError(errorId, message) {
    const errorElement = document.getElementById(errorId);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.classList.remove('hidden');
    }
}

// Hide Error
function hideError(errorId) {
    const errorElement = document.getElementById(errorId);
    if (errorElement) {
        errorElement.classList.add('hidden');
    }
}

// Show Notification
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `fixed top-20 right-4 z-50 px-6 py-4 rounded-lg shadow-lg transform transition-all duration-300 ${
        type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
    }`;
    notification.textContent = message;
    notification.style.transform = 'translateX(400px)';
    notification.style.opacity = '0';
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
        notification.style.opacity = '1';
    }, 10);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        notification.style.opacity = '0';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Make functions global
window.togglePassword = togglePassword;
window.resetForm = resetForm;
window.resetPasswordForm = resetPasswordForm;

