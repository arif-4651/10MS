// Language Translation System
const translations = {
    bn: {
        nav: {
            allCourses: 'All Courses',
            classes: 'Classes 6-12',
            skills: 'Skills',
            admission: 'Admission Test',
            login: 'Login',
            signUp: 'Sign Up',
            more: 'More'
        },
        hero: {
            title: 'শেখা হোক আনন্দে!',
            subtitle: 'এক জায়গায় স্কুল ও কলেজের সম্পূর্ণ প্রস্তুতি!',
            bookClass: 'ফ্রি ক্লাস বুক করুন',
            downloadApp: 'ডাউনলোড করুন অ্যাপ'
        },
        course: {
            hsc26: { short: 'HSC ২৬', title: 'HSC ২০২৬' },
            hsc27: { short: 'HSC ২৭', title: 'HSC ২০২৭' },
            ssc26: { short: 'SSC ২৬', title: 'SSC ২০২৬' },
            class10: { short: 'দশম শ্রেণি', title: 'দশম শ্রেণি' },
            enrollment: '২০২৬ সালে ভর্তি চলছে'
        },
        features: {
            title: 'কেন 10 Min School?',
            subtitle: 'শেখার সেরা সুযোগ অনলাইন ও অফলাইন দু\'জায়গাতেই',
            academic: {
                title: 'একাডেমিক পড়াশোনা',
                desc: 'ইন্টারেক্টিভ লাইভ ক্লাস, আনলিমিটেড কুইজ, MCQ Question Bank, রেকর্ডেড ক্লাস এবং আরও অনেক কিছু'
            },
            doubt: {
                title: '24x7 ডাউটসলভ',
                desc: '৭ দিন ২৪ ঘণ্টা তোমার ডাউট সলভ করতে SuperSolve'
            },
            offline: {
                title: 'পড়া চলবে ইন্টারনেট ছাড়াও',
                desc: 'ইন্টারনেট কানেকশন ছাড়াও ডাউনলোড করে দেখতে পারবে রেকর্ডেট ক্লাস ও ক্লাস নোটস'
            }
        },
        courses: {
            title: 'আমাদের কোর্সসমূহ',
            subtitle: 'বিভিন্ন শ্রেণি ও বিষয়ের জন্য প্রস্তুত কোর্স',
            'class6-12': {
                badge: 'Popular',
                title: 'ক্লাস ৬-১২',
                desc: 'স্কুলের সকল শ্রেণির জন্য সম্পূর্ণ প্রস্তুতি'
            },
            skills: {
                badge: 'New',
                title: 'স্কিলস',
                desc: 'ক্যারিয়ারের জন্য প্রয়োজনীয় দক্ষতা উন্নয়ন'
            },
            admission: {
                badge: 'Hot',
                title: 'ভর্তি পরীক্ষা',
                desc: 'বিভিন্ন বিশ্ববিদ্যালয় ও কলেজের ভর্তি পরীক্ষার প্রস্তুতি'
            },
            viewDetails: 'বিস্তারিত দেখুন'
        },
        footer: {
            copyright: '© ২০১৫ - ২০২৬ টেন মিনিট স্কুল কর্তৃক সর্বস্বত্ব সংরক্ষিত',
            privacy: 'Privacy Policy',
            terms: 'Terms of Service',
            contact: 'Contact'
        }
    },
    en: {
        nav: {
            allCourses: 'All Courses',
            classes: 'Classes 6-12',
            skills: 'Skills',
            admission: 'Admission Test',
            login: 'Login',
            signUp: 'Sign Up',
            more: 'More'
        },
        hero: {
            title: 'Learn with Joy!',
            subtitle: 'Complete preparation for school and college in one place!',
            bookClass: 'Book Free Class',
            downloadApp: 'Download App'
        },
        course: {
            hsc26: { short: 'HSC 26', title: 'HSC 2026' },
            hsc27: { short: 'HSC 27', title: 'HSC 2027' },
            ssc26: { short: 'SSC 26', title: 'SSC 2026' },
            class10: { short: 'Class 10', title: 'Class 10' },
            enrollment: 'Enrollment Open for 2026'
        },
        features: {
            title: 'Why 10 Min School?',
            subtitle: 'Best learning opportunities both online and offline',
            academic: {
                title: 'Academic Studies',
                desc: 'Interactive live classes, unlimited quizzes, MCQ Question Bank, recorded classes and much more'
            },
            doubt: {
                title: '24x7 Doubt Solving',
                desc: 'SuperSolve to solve your doubts 24 hours a day, 7 days a week'
            },
            offline: {
                title: 'Learn Without Internet',
                desc: 'Download and watch recorded classes and class notes without internet connection'
            }
        },
        courses: {
            title: 'Our Courses',
            subtitle: 'Prepared courses for various classes and subjects',
            'class6-12': {
                badge: 'Popular',
                title: 'Classes 6-12',
                desc: 'Complete preparation for all school classes'
            },
            skills: {
                badge: 'New',
                title: 'Skills',
                desc: 'Essential skill development for career'
            },
            admission: {
                badge: 'Hot',
                title: 'Admission Test',
                desc: 'Preparation for various university and college admission tests'
            },
            viewDetails: 'View Details'
        },
        footer: {
            copyright: '© 2015 - 2026 All rights reserved by 10 Min School',
            privacy: 'Privacy Policy',
            terms: 'Terms of Service',
            contact: 'Contact'
        }
    }
};

// Get current language from localStorage or default to Bengali
let currentLang = localStorage.getItem('language') || 'bn';

// Function to get nested translation value
function getTranslation(key, lang) {
    const keys = key.split('.');
    let value = translations[lang];
    for (const k of keys) {
        value = value?.[k];
    }
    return value || key;
}

// Function to update all text elements
function updateLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('language', lang);
    
    // Update all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        const translation = getTranslation(key, lang);
        if (translation) {
            element.textContent = translation;
        }
    });
    
    // Update language button text
    const langBtn = document.getElementById('langToggleBtn');
    if (langBtn) {
        langBtn.textContent = lang === 'bn' ? 'EN' : 'BN';
    }
    
    // Update HTML lang attribute
    document.documentElement.lang = lang;
}

// Language Toggle Button
const langToggleBtn = document.getElementById('langToggleBtn');
if (langToggleBtn) {
    langToggleBtn.addEventListener('click', () => {
        const newLang = currentLang === 'bn' ? 'en' : 'bn';
        updateLanguage(newLang);
    });
}

// Load saved language on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        updateLanguage(currentLang);
    });
} else {
    updateLanguage(currentLang);
}

// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');

if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
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

// Hero CTA Button Click Handler
const heroCtaBtn = document.getElementById('heroCtaBtn');
if (heroCtaBtn) {
    heroCtaBtn.addEventListener('click', () => {
        // You can add your booking logic here
        const message = currentLang === 'bn' 
            ? 'ফ্রি ক্লাস বুক করার জন্য শীঘ্রই যোগাযোগ করুন!'
            : 'Please contact us soon to book a free class!';
        alert(message);
    });
}

// Course Card Click Handlers
const courseCards = document.querySelectorAll('.course-card');
courseCards.forEach(card => {
    card.addEventListener('click', function() {
        const courseId = this.getAttribute('data-course');
        console.log('Selected course:', courseId);
        // Add animation effect
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 150);
        
        // You can add navigation or modal logic here
        showCourseDetails(courseId);
    });
});

// Category Card Click Handlers
const categoryCards = document.querySelectorAll('.category-card');
categoryCards.forEach(card => {
    card.addEventListener('click', function() {
        const categoryId = this.getAttribute('data-category');
        console.log('Selected category:', categoryId);
        
        // Add animation effect
        this.style.transform = 'scale(0.98)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 150);
        
        // You can add navigation or modal logic here
        showCategoryDetails(categoryId);
    });
});

// Feature Card Hover Effects (with GSAP fallback)
const featureCards = document.querySelectorAll('.feature-card');
featureCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        if (window.gsap) {
            gsap.to(this, { y: -4, duration: 0.2, ease: 'power1.out' });
        } else {
            this.style.transform = 'translateY(-4px)';
        }
    });
    
    card.addEventListener('mouseleave', function() {
        if (window.gsap) {
            gsap.to(this, { y: 0, duration: 0.2, ease: 'power1.out' });
        } else {
            this.style.transform = 'translateY(0)';
        }
    });
});

// Show Course Details Function
function showCourseDetails(courseId) {
    const courseNames = {
        'hsc26': 'HSC ২০২৬',
        'hsc27': 'HSC ২০২৭',
        'ssc26': 'SSC ২০২৬',
        'class10': 'দশম শ্রেণি'
    };
    
    const courseName = courseNames[courseId] || 'কোর্স';
    console.log(`Opening details for: ${courseName}`);
    // Navigate to course detail page
    window.location.href = 'course-detail.html';
}

// Show Category Details Function
function showCategoryDetails(categoryId) {
    const categoryNames = {
        'class6-12': 'ক্লাস ৬-১২',
        'skills': 'স্কিলস',
        'admission': 'ভর্তি পরীক্ষা'
    };
    
    const categoryName = categoryNames[categoryId] || 'ক্যাটাগরি';
    console.log(`Opening details for: ${categoryName}`);
    // You can implement a modal or navigation here
}

// Animations (AOS + GSAP)
function initAnimations() {
    if (window.AOS) {
        AOS.init({
            duration: 800,
            once: true,
            offset: 50
        });
    }

    if (window.gsap) {
        const tl = gsap.timeline({ defaults: { ease: 'power2.out', duration: 0.6 } });
        tl.from('nav', { y: -30, opacity: 0 })
          .from('.hero h1, .hero p', { y: 20, opacity: 0, stagger: 0.1 }, '-=0.2')
          .from('.hero button', { y: 10, opacity: 0, stagger: 0.1 }, '-=0.3');

        gsap.from('.course-card', { opacity: 0, y: 20, stagger: 0.08, duration: 0.5, ease: 'power2.out' });
        gsap.from('.feature-card', { opacity: 0, y: 24, stagger: 0.1, duration: 0.5, ease: 'power2.out', delay: 0.1 });
        gsap.from('.category-card', { opacity: 0, y: 24, stagger: 0.1, duration: 0.5, ease: 'power2.out', delay: 0.2 });

        // Hover scale for course cards
        courseCards.forEach(card => {
            card.addEventListener('mouseenter', () => gsap.to(card, { scale: 1.03, duration: 0.2, ease: 'power1.out' }));
            card.addEventListener('mouseleave', () => gsap.to(card, { scale: 1, duration: 0.2, ease: 'power1.out' }));
        });
    }
}

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

    initAnimations();
});

