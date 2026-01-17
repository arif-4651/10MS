// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');

if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
}

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

// Curriculum Accordion
const curriculumItems = document.querySelectorAll('.curriculum-item');

curriculumItems.forEach(item => {
    const button = item.querySelector('button');
    const content = item.querySelector('.subject-content');
    const icon = button.querySelector('svg:last-child');
    
    button.addEventListener('click', () => {
        const isOpen = !content.classList.contains('hidden');
        
        // Close all other items
        curriculumItems.forEach(otherItem => {
            if (otherItem !== item) {
                const otherContent = otherItem.querySelector('.subject-content');
                const otherIcon = otherItem.querySelector('button svg:last-child');
                otherContent.classList.add('hidden');
                otherIcon.classList.remove('rotate-180');
            }
        });
        
        // Toggle current item
        if (isOpen) {
            content.classList.add('hidden');
            icon.classList.remove('rotate-180');
        } else {
            content.classList.remove('hidden');
            icon.classList.add('rotate-180');
        }
    });
});

// Enroll Button Click Handler
const enrollBtn = document.getElementById('enrollBtn');
if (enrollBtn) {
    enrollBtn.addEventListener('click', () => {
        // You can add enrollment logic here
        alert('এনরোল করার জন্য শীঘ্রই যোগাযোগ করুন!');
    });
}

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
            }
        }
    });
});

// Navbar Background on Scroll
let lastScroll = 0;
const navbar = document.querySelector('nav');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('shadow-md');
    } else {
        navbar.classList.remove('shadow-md');
    }
    
    lastScroll = currentScroll;
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.3s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

