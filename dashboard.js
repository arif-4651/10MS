// User Menu Toggle
const userMenuBtn = document.getElementById('userMenuBtn');
const userMenu = document.getElementById('userMenu');
const userMenuContainer = document.getElementById('userMenuContainer');

if (userMenuBtn && userMenu) {
    userMenuBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        userMenu.classList.toggle('hidden');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!userMenuContainer.contains(e.target)) {
            userMenu.classList.add('hidden');
        }
    });
}

// Notification Button
const notificationBtn = document.getElementById('notificationBtn');
if (notificationBtn) {
    notificationBtn.addEventListener('click', () => {
        // You can implement notification dropdown or modal here
        alert('Notifications feature coming soon!');
    });
}

// Progress Bar Animation on Load
window.addEventListener('load', () => {
    const progressBars = document.querySelectorAll('.bg-indigo-600, .bg-green-600, .bg-amber-600');
    progressBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0%';
        setTimeout(() => {
            bar.style.transition = 'width 1s ease-in-out';
            bar.style.width = width;
        }, 100);
    });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

