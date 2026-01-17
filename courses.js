// Course Data
const coursesData = [
    {
        id: 1,
        title: "HSC ২০২৬ - সম্পূর্ণ প্রস্তুতি",
        category: "academic",
        instructor: "আরিফুল ইসলাম",
        price: 2990,
        originalPrice: 5990,
        rating: 4.8,
        reviews: 250,
        duration: "12 months",
        level: "intermediate",
        image: "HSC",
        description: "এইচএসসি পরীক্ষার জন্য সম্পূর্ণ প্রস্তুতি",
        students: 5000,
        classes: 500
    },
    {
        id: 2,
        title: "SSC ২০২৬ - সম্পূর্ণ প্রস্তুতি",
        category: "academic",
        instructor: "সায়মা রহমান",
        price: 2490,
        originalPrice: 4990,
        rating: 4.7,
        reviews: 180,
        duration: "10 months",
        level: "beginner",
        image: "SSC",
        description: "এসএসসি পরীক্ষার জন্য সম্পূর্ণ প্রস্তুতি",
        students: 3500,
        classes: 400
    },
    {
        id: 3,
        title: "Web Development - Full Stack",
        category: "skills",
        instructor: "কামরুল হাসান",
        price: 4990,
        originalPrice: 9990,
        rating: 4.9,
        reviews: 320,
        duration: "6 months",
        level: "intermediate",
        image: "WEB",
        description: "HTML, CSS, JavaScript, React, Node.js",
        students: 2800,
        classes: 200
    },
    {
        id: 4,
        title: "Graphic Design Masterclass",
        category: "skills",
        instructor: "তাসনিমা আক্তার",
        price: 3490,
        originalPrice: 6990,
        rating: 4.6,
        reviews: 150,
        duration: "4 months",
        level: "beginner",
        image: "GD",
        description: "Photoshop, Illustrator, Figma",
        students: 1200,
        classes: 120
    },
    {
        id: 5,
        title: "DU Admission Test Preparation",
        category: "admission",
        instructor: "রাফি আহমেদ",
        price: 3990,
        originalPrice: 7990,
        rating: 4.8,
        reviews: 200,
        duration: "3 months",
        level: "advanced",
        image: "DU",
        description: "ঢাকা বিশ্ববিদ্যালয় ভর্তি পরীক্ষার প্রস্তুতি",
        students: 1800,
        classes: 150
    },
    {
        id: 6,
        title: "Medical Admission Test",
        category: "admission",
        instructor: "ড. সুমন আহমেদ",
        price: 5990,
        originalPrice: 11990,
        rating: 4.9,
        reviews: 280,
        duration: "6 months",
        level: "advanced",
        image: "MED",
        description: "মেডিকেল কলেজ ভর্তি পরীক্ষার প্রস্তুতি",
        students: 2200,
        classes: 300
    },
    {
        id: 7,
        title: "English Speaking Course",
        category: "language",
        instructor: "সারা জাহান",
        price: 1990,
        originalPrice: 3990,
        rating: 4.5,
        reviews: 120,
        duration: "3 months",
        level: "beginner",
        image: "ENG",
        description: "ইংরেজি বলার দক্ষতা উন্নয়ন",
        students: 800,
        classes: 80
    },
    {
        id: 8,
        title: "Class 10 - Complete Preparation",
        category: "academic",
        instructor: "আহমেদ হাসান",
        price: 1990,
        originalPrice: 3990,
        rating: 4.6,
        reviews: 140,
        duration: "8 months",
        level: "beginner",
        image: "C10",
        description: "দশম শ্রেণির সম্পূর্ণ প্রস্তুতি",
        students: 2500,
        classes: 350
    },
    {
        id: 9,
        title: "Digital Marketing",
        category: "skills",
        instructor: "ফারহান আহমেদ",
        price: 2990,
        originalPrice: 5990,
        rating: 4.7,
        reviews: 190,
        duration: "4 months",
        level: "intermediate",
        image: "DM",
        description: "SEO, Social Media, Google Ads",
        students: 1500,
        classes: 100
    },
    {
        id: 10,
        title: "Data Science & Python",
        category: "skills",
        instructor: "ইমরান হোসেন",
        price: 4490,
        originalPrice: 8990,
        rating: 4.8,
        reviews: 210,
        duration: "5 months",
        level: "intermediate",
        image: "DS",
        description: "Python, Machine Learning, Data Analysis",
        students: 1100,
        classes: 150
    },
    {
        id: 11,
        title: "Free: Basic Mathematics",
        category: "academic",
        instructor: "রাশেদুল ইসলাম",
        price: 0,
        originalPrice: 0,
        rating: 4.4,
        reviews: 95,
        duration: "2 months",
        level: "beginner",
        image: "MATH",
        description: "মৌলিক গণিতের ধারণা",
        students: 5000,
        classes: 50
    },
    {
        id: 12,
        title: "Engineering Admission Test",
        category: "admission",
        instructor: "প্রফেসর আলম",
        price: 4990,
        originalPrice: 9990,
        rating: 4.7,
        reviews: 170,
        duration: "5 months",
        level: "advanced",
        image: "ENG",
        description: "ইঞ্জিনিয়ারিং ভর্তি পরীক্ষার প্রস্তুতি",
        students: 1600,
        classes: 200
    }
];

// State
let filteredCourses = [...coursesData];
let currentPage = 1;
const coursesPerPage = 9;

// Initialize
function init() {
    renderCourses();
    setupEventListeners();
    if (window.AOS) {
        AOS.init({ duration: 800, once: true, offset: 50 });
    }
}

// Setup Event Listeners
function setupEventListeners() {
    // Search
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', handleSearch);
    }

    // Filters
    const filterCheckboxes = document.querySelectorAll('.filter-checkbox, .filter-radio');
    filterCheckboxes.forEach(filter => {
        filter.addEventListener('change', handleFilter);
    });

    // Sort
    const sortSelect = document.getElementById('sortSelect');
    if (sortSelect) {
        sortSelect.addEventListener('change', handleSort);
    }

    // Clear Filters
    const clearFilters = document.getElementById('clearFilters');
    if (clearFilters) {
        clearFilters.addEventListener('click', clearAllFilters);
    }

    const resetFiltersBtn = document.getElementById('resetFiltersBtn');
    if (resetFiltersBtn) {
        resetFiltersBtn.addEventListener('click', clearAllFilters);
    }

    // Filter Toggle (Mobile)
    const filterToggle = document.getElementById('filterToggle');
    if (filterToggle) {
        filterToggle.addEventListener('click', () => {
            const sidebar = document.getElementById('filterSidebar');
            sidebar.classList.toggle('hidden');
        });
    }
}

// Handle Search
function handleSearch(e) {
    const searchTerm = e.target.value.toLowerCase();
    applyFilters(searchTerm);
}

// Handle Filter
function handleFilter() {
    applyFilters();
}

// Apply Filters
function applyFilters(searchTerm = '') {
    const categoryFilters = Array.from(document.querySelectorAll('.filter-checkbox[data-filter="category"]:checked')).map(cb => cb.value);
    const priceFilter = document.querySelector('.filter-radio[data-filter="price"]:checked')?.value;
    const ratingFilters = Array.from(document.querySelectorAll('.filter-checkbox[data-filter="rating"]:checked')).map(cb => cb.value);
    const durationFilters = Array.from(document.querySelectorAll('.filter-checkbox[data-filter="duration"]:checked')).map(cb => cb.value);
    const levelFilters = Array.from(document.querySelectorAll('.filter-checkbox[data-filter="level"]:checked')).map(cb => cb.value);

    filteredCourses = coursesData.filter(course => {
        // Search filter
        if (searchTerm) {
            const matchesSearch = 
                course.title.toLowerCase().includes(searchTerm) ||
                course.instructor.toLowerCase().includes(searchTerm) ||
                course.description.toLowerCase().includes(searchTerm);
            if (!matchesSearch) return false;
        }

        // Category filter
        if (categoryFilters.length > 0 && !categoryFilters.includes(course.category)) {
            return false;
        }

        // Price filter
        if (priceFilter) {
            if (priceFilter === 'free' && course.price !== 0) return false;
            if (priceFilter === '0-1000' && (course.price === 0 || course.price > 1000)) return false;
            if (priceFilter === '1000-3000' && (course.price < 1000 || course.price > 3000)) return false;
            if (priceFilter === '3000+' && course.price < 3000) return false;
        }

        // Rating filter
        if (ratingFilters.length > 0) {
            const matchesRating = ratingFilters.some(rating => {
                const minRating = parseFloat(rating);
                return course.rating >= minRating;
            });
            if (!matchesRating) return false;
        }

        // Duration filter
        if (durationFilters.length > 0) {
            const courseMonths = parseInt(course.duration.split(' ')[0]);
            const matchesDuration = durationFilters.some(duration => {
                if (duration === '0-3') return courseMonths >= 0 && courseMonths < 3;
                if (duration === '3-6') return courseMonths >= 3 && courseMonths < 6;
                if (duration === '6-12') return courseMonths >= 6 && courseMonths < 12;
                if (duration === '12+') return courseMonths >= 12;
                return false;
            });
            if (!matchesDuration) return false;
        }

        // Level filter
        if (levelFilters.length > 0 && !levelFilters.includes(course.level)) {
            return false;
        }

        return true;
    });

    currentPage = 1;
    renderCourses();
}

// Handle Sort
function handleSort(e) {
    const sortValue = e.target.value;

    switch(sortValue) {
        case 'popular':
            filteredCourses.sort((a, b) => b.students - a.students);
            break;
        case 'newest':
            filteredCourses.sort((a, b) => b.id - a.id);
            break;
        case 'price-low':
            filteredCourses.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            filteredCourses.sort((a, b) => b.price - a.price);
            break;
        case 'rating':
            filteredCourses.sort((a, b) => b.rating - a.rating);
            break;
        case 'duration':
            filteredCourses.sort((a, b) => {
                const aMonths = parseInt(a.duration.split(' ')[0]);
                const bMonths = parseInt(b.duration.split(' ')[0]);
                return aMonths - bMonths;
            });
            break;
    }

    renderCourses();
}

// Clear All Filters
function clearAllFilters() {
    // Clear search
    document.getElementById('searchInput').value = '';
    
    // Clear all checkboxes and radios
    document.querySelectorAll('.filter-checkbox, .filter-radio').forEach(filter => {
        filter.checked = false;
    });

    // Reset sort
    document.getElementById('sortSelect').value = 'popular';

    // Reset filtered courses
    filteredCourses = [...coursesData];
    currentPage = 1;
    renderCourses();
}

// Render Courses
function renderCourses() {
    const courseGrid = document.getElementById('courseGrid');
    const noResults = document.getElementById('noResults');
    const resultCount = document.getElementById('resultCount');

    if (filteredCourses.length === 0) {
        courseGrid.innerHTML = '';
        courseGrid.classList.add('hidden');
        noResults.classList.remove('hidden');
        resultCount.textContent = '০';
        return;
    }

    courseGrid.classList.remove('hidden');
    noResults.classList.add('hidden');
    resultCount.textContent = filteredCourses.length;

    // Pagination
    const startIndex = (currentPage - 1) * coursesPerPage;
    const endIndex = startIndex + coursesPerPage;
    const coursesToShow = filteredCourses.slice(startIndex, endIndex);

    courseGrid.innerHTML = coursesToShow.map(course => createCourseCard(course)).join('');

    animateCourseCards();

    if (window.AOS) {
        AOS.refresh();
    }

    // Render pagination
    renderPagination();
}

// Animate rendered cards
function animateCourseCards() {
    const cards = document.querySelectorAll('.course-card');
    if (window.gsap && cards.length) {
        gsap.from(cards, { opacity: 0, y: 16, duration: 0.4, stagger: 0.05, ease: 'power1.out' });
    }
}

// Create Course Card
function createCourseCard(course) {
    const discount = course.originalPrice > 0 ? Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100) : 0;
    const categoryNames = {
        'academic': 'একাডেমিক',
        'skills': 'স্কিলস',
        'admission': 'ভর্তি পরীক্ষা',
        'language': 'ভাষা'
    };

    const courseImage = getCourseImage(course.image);
    
    return `
        <div class="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-lg transition-shadow duration-200">
            <div class="relative">
                <img src="${courseImage}" alt="${course.title}" class="w-full h-48 object-cover">
                ${discount > 0 ? `
                    <div class="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        ${discount}% OFF
                    </div>
                ` : ''}
                ${course.price === 0 ? `
                    <div class="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        FREE
                    </div>
                ` : ''}
            </div>
            
            <div class="p-6">
                <div class="mb-2">
                    <span class="text-xs font-medium text-indigo-600 bg-indigo-50 px-2 py-1 rounded">
                        ${categoryNames[course.category]}
                    </span>
                </div>
                
                <h3 class="text-lg font-semibold text-slate-900 mb-2 line-clamp-2">
                    ${course.title}
                </h3>
                
                <p class="text-sm text-slate-600 mb-4 line-clamp-2">
                    ${course.description}
                </p>
                
                <div class="flex items-center space-x-2 mb-4">
                    <div class="flex items-center">
                        <svg class="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                        <span class="text-sm font-medium text-slate-700 ml-1">${course.rating}</span>
                    </div>
                    <span class="text-sm text-slate-500">(${course.reviews})</span>
                    <span class="text-slate-300">•</span>
                    <span class="text-sm text-slate-500">${course.students.toLocaleString()} ছাত্র</span>
                </div>
                
                <div class="flex items-center justify-between mb-4">
                    <div class="text-sm text-slate-600">
                        <span class="font-medium">${course.instructor}</span>
                    </div>
                    <div class="text-sm text-slate-600">
                        ${course.duration}
                    </div>
                </div>
                
                <div class="pt-4 border-t border-slate-200">
                    <div class="flex items-center justify-between mb-3">
                        <div>
                            ${course.price === 0 ? `
                                <span class="text-xl font-bold text-green-600">ফ্রি</span>
                            ` : `
                                <div class="flex items-baseline space-x-2">
                                    <span class="text-xl font-bold text-indigo-600">৳${course.price.toLocaleString()}</span>
                                    ${course.originalPrice > 0 ? `
                                        <span class="text-sm text-slate-500 line-through">৳${course.originalPrice.toLocaleString()}</span>
                                    ` : ''}
                                </div>
                            `}
                        </div>
                    </div>
                    <div class="flex items-center gap-2">
                        <button onclick="addToCartFromList(${course.id})" class="flex-1 px-4 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-200 text-sm font-semibold shadow-sm hover:shadow-md">
                            কার্টে যোগ করুন
                        </button>
                        <a href="course-detail.html" class="flex-1 px-4 py-2.5 bg-white text-indigo-600 border-2 border-indigo-600 rounded-lg hover:bg-indigo-50 transition-all duration-200 text-sm font-semibold text-center shadow-sm hover:shadow-md">
                            বিস্তারিত
                        </a>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Render Pagination
function renderPagination() {
    const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);
    const pagination = document.getElementById('pagination');

    if (totalPages <= 1) {
        pagination.innerHTML = '';
        return;
    }

    let paginationHTML = '<div class="flex items-center space-x-2">';
    
    // Previous button
    paginationHTML += `
        <button 
            onclick="changePage(${currentPage - 1})" 
            ${currentPage === 1 ? 'disabled' : ''}
            class="px-4 py-2 border border-slate-300 rounded-lg hover:bg-indigo-50 hover:border-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
        >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
            </svg>
        </button>
    `;

    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
        if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
            paginationHTML += `
                <button 
                    onclick="changePage(${i})" 
                    class="px-4 py-2 border rounded-lg transition-colors duration-200 ${
                        i === currentPage 
                            ? 'bg-indigo-600 text-white border-indigo-600' 
                            : 'border-slate-300 hover:bg-indigo-50 hover:border-indigo-600'
                    }"
                >
                    ${i}
                </button>
            `;
        } else if (i === currentPage - 2 || i === currentPage + 2) {
            paginationHTML += '<span class="px-2">...</span>';
        }
    }

    // Next button
    paginationHTML += `
        <button 
            onclick="changePage(${currentPage + 1})" 
            ${currentPage === totalPages ? 'disabled' : ''}
            class="px-4 py-2 border border-slate-300 rounded-lg hover:bg-indigo-50 hover:border-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
        >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
        </button>
    `;

    paginationHTML += '</div>';
    pagination.innerHTML = paginationHTML;
}

// Change Page
function changePage(page) {
    const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);
    if (page >= 1 && page <= totalPages) {
        currentPage = page;
        renderCourses();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// Add to Cart from Course List
function addToCartFromList(courseId) {
    let cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
    
    if (cartItems.find(item => item.id === courseId)) {
        // Show a better notification
        showNotification('এই কোর্সটি ইতিমধ্যে কার্টে আছে!', 'warning');
        return;
    }

    cartItems.push({ id: courseId });
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    
    // Show success notification
    showNotification('কোর্স কার্টে যোগ করা হয়েছে!', 'success');
    updateCartCount();
}

// Show Notification
function showNotification(message, type = 'success') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `fixed top-20 right-4 z-50 px-6 py-4 rounded-lg shadow-lg transform transition-all duration-300 ${
        type === 'success' ? 'bg-green-500 text-white' : 'bg-amber-500 text-white'
    }`;
    notification.textContent = message;
    notification.style.transform = 'translateX(400px)';
    notification.style.opacity = '0';
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
        notification.style.opacity = '1';
    }, 10);
    
    // Remove after 3 seconds
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

// Update Cart Count in Navigation
function updateCartCount() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
    const cartCount = document.getElementById('cartCount');
    if (cartCount) {
        const count = cartItems.length;
        cartCount.textContent = count;
        if (count > 0) {
            cartCount.classList.remove('hidden');
        } else {
            cartCount.classList.add('hidden');
        }
    }
}

// Get Course Image Helper
function getCourseImage(courseCode) {
    const imageMap = {
        'HSC': 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=600&fit=crop',
        'SSC': 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop',
        'WEB': 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop',
        'GD': 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop',
        'DU': 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=600&fit=crop',
        'MED': 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop',
        'ENG': 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=600&fit=crop',
        'C10': 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=600&fit=crop',
        'DM': 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
        'DS': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
        'MATH': 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&h=600&fit=crop',
        'default': 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=600&fit=crop'
    };
    return imageMap[courseCode] || imageMap.default;
}

// Make functions global
window.changePage = changePage;
window.addToCartFromList = addToCartFromList;

// Initialize on page load
init();
// Update cart count on page load
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
});
// Also update immediately
updateCartCount();

