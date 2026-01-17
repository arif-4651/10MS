// Cart Data (stored in localStorage)
let cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');

// Available Coupons
const coupons = {
    'WELCOME10': { discount: 10, minAmount: 1000 },
    'SAVE20': { discount: 20, minAmount: 2000 },
    'STUDENT50': { discount: 50, minAmount: 5000 }
};

// Applied Coupon
let appliedCoupon = null;

// Course Data (sample - in real app, this would come from backend)
const courseData = {
    1: {
        id: 1,
        title: "HSC ২০২৬ - সম্পূর্ণ প্রস্তুতি",
        instructor: "আরিফুল ইসলাম",
        price: 2990,
        originalPrice: 5990,
        image: "HSC"
    },
    2: {
        id: 2,
        title: "SSC ২০২৬ - সম্পূর্ণ প্রস্তুতি",
        instructor: "সায়মা রহমান",
        price: 2490,
        originalPrice: 4990,
        image: "SSC"
    },
    3: {
        id: 3,
        title: "Web Development - Full Stack",
        instructor: "কামরুল হাসান",
        price: 4990,
        originalPrice: 9990,
        image: "WEB"
    },
    4: {
        id: 4,
        title: "Graphic Design Masterclass",
        instructor: "তাসনিমা আক্তার",
        price: 3490,
        originalPrice: 6990,
        image: "GD"
    },
    5: {
        id: 5,
        title: "DU Admission Test Preparation",
        instructor: "রাফি আহমেদ",
        price: 3990,
        originalPrice: 7990,
        image: "DU"
    }
};

// Initialize
function init() {
    renderCart();
    setupEventListeners();
    loadRecommendedCourses();
}

// Setup Event Listeners
function setupEventListeners() {
    // Apply Coupon
    const applyCouponBtn = document.getElementById('applyCouponBtn');
    if (applyCouponBtn) {
        applyCouponBtn.addEventListener('click', applyCoupon);
    }

    // Checkout
    const checkoutBtn = document.getElementById('checkoutBtn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', proceedToCheckout);
    }

    // Enter key for coupon
    const couponInput = document.getElementById('couponInput');
    if (couponInput) {
        couponInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                applyCoupon();
            }
        });
    }
}

// Render Cart
function renderCart() {
    const cartItemsContainer = document.getElementById('cartItems');
    const emptyCart = document.getElementById('emptyCart');
    const cartContent = document.getElementById('cartContent');

    if (cartItems.length === 0) {
        cartItemsContainer.innerHTML = '';
        emptyCart.classList.remove('hidden');
        document.getElementById('checkoutBtn').disabled = true;
        updateOrderSummary();
        return;
    }

    emptyCart.classList.add('hidden');
    document.getElementById('checkoutBtn').disabled = false;

    cartItemsContainer.innerHTML = cartItems.map((item, index) => {
        const course = courseData[item.id];
        if (!course) return '';

        const discount = course.originalPrice > 0 
            ? Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100) 
            : 0;

        return `
            <div class="bg-white rounded-xl shadow-sm p-6 border border-slate-100">
                <div class="flex flex-col md:flex-row gap-4">
                    <!-- Course Image -->
                    <img src="${getCourseImage(course.image)}" alt="${course.title}" class="w-full md:w-32 h-32 rounded-lg flex-shrink-0 object-cover">

                    <!-- Course Info -->
                    <div class="flex-1">
                        <div class="flex items-start justify-between mb-2">
                            <div>
                                <h3 class="text-lg font-semibold text-slate-900 mb-1">${course.title}</h3>
                                <p class="text-sm text-slate-600">${course.instructor}</p>
                            </div>
                            <button 
                                onclick="removeFromCart(${index})" 
                                class="p-2 text-slate-400 hover:text-red-600 transition-colors duration-200"
                            >
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                                </svg>
                            </button>
                        </div>

                        <!-- Price -->
                        <div class="flex items-center space-x-3 mb-4">
                            ${course.price === 0 ? `
                                <span class="text-xl font-bold text-green-600">ফ্রি</span>
                            ` : `
                                <div class="flex items-baseline space-x-2">
                                    <span class="text-xl font-bold text-indigo-600">৳${course.price.toLocaleString()}</span>
                                    ${course.originalPrice > 0 ? `
                                        <span class="text-sm text-slate-500 line-through">৳${course.originalPrice.toLocaleString()}</span>
                                        <span class="text-sm text-red-600 font-medium">${discount}% OFF</span>
                                    ` : ''}
                                </div>
                            `}
                        </div>

                        <!-- Actions -->
                        <div class="flex items-center space-x-4">
                            <a href="course-detail.html" class="text-sm text-indigo-600 hover:text-indigo-700 font-medium">
                                বিস্তারিত দেখুন
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }).join('');

    updateOrderSummary();
}

// Remove from Cart
function removeFromCart(index) {
    if (confirm('আপনি কি এই কোর্সটি কার্ট থেকে সরাতে চান?')) {
        cartItems.splice(index, 1);
        saveCart();
        renderCart();
    }
}

// Apply Coupon
function applyCoupon() {
    const couponInput = document.getElementById('couponInput');
    const couponMessage = document.getElementById('couponMessage');
    const couponCode = couponInput.value.trim().toUpperCase();

    if (!couponCode) {
        showCouponMessage('কুপন কোড দিন', 'error');
        return;
    }

    const coupon = coupons[couponCode];
    if (!coupon) {
        showCouponMessage('অবৈধ কুপন কোড', 'error');
        return;
    }

    const subtotal = calculateSubtotal();
    if (subtotal < coupon.minAmount) {
        showCouponMessage(`এই কুপন ${coupon.minAmount} টাকার বেশি অর্ডারে প্রযোজ্য`, 'error');
        return;
    }

    appliedCoupon = { code: couponCode, discount: coupon.discount };
    showCouponMessage(`কুপন প্রয়োগ করা হয়েছে! ${coupon.discount}% ছাড়`, 'success');
    couponInput.value = '';
    updateOrderSummary();
}

// Show Coupon Message
function showCouponMessage(message, type) {
    const couponMessage = document.getElementById('couponMessage');
    couponMessage.textContent = message;
    couponMessage.classList.remove('hidden');
    couponMessage.className = `mt-2 text-sm ${
        type === 'success' ? 'text-green-600' : 'text-red-600'
    }`;
    
    setTimeout(() => {
        couponMessage.classList.add('hidden');
    }, 5000);
}

// Calculate Subtotal
function calculateSubtotal() {
    return cartItems.reduce((total, item) => {
        const course = courseData[item.id];
        return total + (course ? course.price : 0);
    }, 0);
}

// Calculate Discount
function calculateDiscount() {
    return cartItems.reduce((total, item) => {
        const course = courseData[item.id];
        if (course && course.originalPrice > 0) {
            return total + (course.originalPrice - course.price);
        }
        return total;
    }, 0);
}

// Calculate Coupon Discount
function calculateCouponDiscount() {
    if (!appliedCoupon) return 0;
    const subtotal = calculateSubtotal();
    return Math.round((subtotal * appliedCoupon.discount) / 100);
}

// Update Order Summary
function updateOrderSummary() {
    const subtotal = calculateSubtotal();
    const discount = calculateDiscount();
    const couponDiscount = calculateCouponDiscount();
    const total = subtotal - couponDiscount;

    document.getElementById('subtotal').textContent = `৳${subtotal.toLocaleString()}`;
    document.getElementById('discount').textContent = `-৳${discount.toLocaleString()}`;
    document.getElementById('couponDiscount').textContent = `-৳${couponDiscount.toLocaleString()}`;
    document.getElementById('total').textContent = `৳${total.toLocaleString()}`;
}

// Proceed to Checkout
function proceedToCheckout() {
    if (cartItems.length === 0) {
        alert('কার্ট খালি!');
        return;
    }

    // Store checkout data
    const checkoutData = {
        items: cartItems,
        subtotal: calculateSubtotal(),
        discount: calculateDiscount(),
        couponDiscount: calculateCouponDiscount(),
        total: calculateSubtotal() - calculateCouponDiscount(),
        coupon: appliedCoupon
    };

    sessionStorage.setItem('checkoutData', JSON.stringify(checkoutData));
    window.location.href = 'checkout.html';
}

// Save Cart to LocalStorage
function saveCart() {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

// Load Recommended Courses
function loadRecommendedCourses() {
    const recommendedContainer = document.getElementById('recommendedCourses');
    const recommendedIds = [3, 4, 5]; // Sample recommended courses
    
    recommendedContainer.innerHTML = recommendedIds.map(id => {
        const course = courseData[id];
        if (!course) return '';

        return `
                    <div class="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors duration-200 cursor-pointer" onclick="addToCart(${id})">
                        <img src="${getCourseImage(course.image)}" alt="${course.title}" class="w-16 h-16 rounded-lg flex-shrink-0 object-cover">
                <div class="flex-1 min-w-0">
                    <h4 class="text-sm font-semibold text-slate-900 truncate">${course.title}</h4>
                    <p class="text-xs text-slate-600">${course.instructor}</p>
                    <p class="text-sm font-bold text-indigo-600 mt-1">৳${course.price.toLocaleString()}</p>
                </div>
            </div>
        `;
    }).join('');
}

// Add to Cart (for recommended courses)
function addToCart(courseId) {
    if (cartItems.find(item => item.id === courseId)) {
        alert('এই কোর্সটি ইতিমধ্যে কার্টে আছে!');
        return;
    }

    cartItems.push({ id: courseId });
    saveCart();
    renderCart();
    alert('কোর্স কার্টে যোগ করা হয়েছে!');
}

// Get Course Image Helper
function getCourseImage(courseCode) {
    const imageMap = {
        'HSC': 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=400&fit=crop',
        'SSC': 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=400&fit=crop',
        'WEB': 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=400&fit=crop',
        'GD': 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=400&fit=crop',
        'DU': 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=400&fit=crop',
        'default': 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=400&fit=crop'
    };
    return imageMap[courseCode] || imageMap.default;
}

// Make functions global
window.removeFromCart = removeFromCart;
window.addToCart = addToCart;

// Initialize on page load
init();

