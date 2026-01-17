// Load Settings
function loadSettings() {
    const settings = JSON.parse(localStorage.getItem('userSettings') || '{}');
    
    // Load notification settings
    if (settings.emailNotifications !== undefined) {
        document.getElementById('emailNotifications').checked = settings.emailNotifications;
    }
    if (settings.pushNotifications !== undefined) {
        document.getElementById('pushNotifications').checked = settings.pushNotifications;
    }
    if (settings.courseUpdates !== undefined) {
        document.getElementById('courseUpdates').checked = settings.courseUpdates;
    }
    if (settings.quizResults !== undefined) {
        document.getElementById('quizResults').checked = settings.quizResults;
    }
    if (settings.marketingEmails !== undefined) {
        document.getElementById('marketingEmails').checked = settings.marketingEmails;
    }
    
    // Load privacy settings
    if (settings.profileVisibility !== undefined) {
        document.getElementById('profileVisibility').checked = settings.profileVisibility;
    }
    if (settings.showProgress !== undefined) {
        document.getElementById('showProgress').checked = settings.showProgress;
    }
    if (settings.dataCollection !== undefined) {
        document.getElementById('dataCollection').checked = settings.dataCollection;
    }
    
    // Load language
    if (settings.language) {
        document.getElementById('languageSelect').value = settings.language;
    }
    
    // Load timezone
    if (settings.timezone) {
        document.getElementById('timezoneSelect').value = settings.timezone;
    }
}

// Save Settings
function saveSettings() {
    const settings = {
        // Notifications
        emailNotifications: document.getElementById('emailNotifications').checked,
        pushNotifications: document.getElementById('pushNotifications').checked,
        courseUpdates: document.getElementById('courseUpdates').checked,
        quizResults: document.getElementById('quizResults').checked,
        marketingEmails: document.getElementById('marketingEmails').checked,
        
        // Privacy
        profileVisibility: document.getElementById('profileVisibility').checked,
        showProgress: document.getElementById('showProgress').checked,
        dataCollection: document.getElementById('dataCollection').checked,
        
        // Account
        language: document.getElementById('languageSelect').value,
        timezone: document.getElementById('timezoneSelect').value
    };
    
    localStorage.setItem('userSettings', JSON.stringify(settings));
    showNotification('সেটিংস সফলভাবে সংরক্ষণ করা হয়েছে!', 'success');
}

// Delete Account
function deleteAccount() {
    if (confirm('আপনি কি নিশ্চিত যে আপনি আপনার অ্যাকাউন্ট মুছতে চান? এই কাজটি অপরিবর্তনীয়।')) {
        if (confirm('এটি স্থায়ীভাবে আপনার অ্যাকাউন্ট মুছে ফেলবে। আপনি কি নিশ্চিত?')) {
            // In a real app, this would call an API to delete the account
            showNotification('অ্যাকাউন্ট মুছে ফেলা হয়েছে। (Demo)', 'success');
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 2000);
        }
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
window.saveSettings = saveSettings;
window.deleteAccount = deleteAccount;

// Initialize on page load
loadSettings();

