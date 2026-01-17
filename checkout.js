// Course Data (same as cart.js)
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

// Get checkout data from sessionStorage
let checkoutData = JSON.parse(sessionStorage.getItem('checkoutData') || '{}');

// Initialize
function init() {
    // Check if cart has items
    if (!checkoutData.items || checkoutData.items.length === 0) {
        alert('আপনার কার্ট খালি!');
        window.location.href = 'cart.html';
        return;
    }

    renderOrderSummary();
    setupEventListeners();
}

// Setup Event Listeners
function setupEventListeners() {
    // Payment method selection
    const paymentMethods = document.querySelectorAll('input[name="paymentMethod"]');
    paymentMethods.forEach(method => {
        method.addEventListener('change', handlePaymentMethodChange);
    });

    // Place order button
    const placeOrderBtn = document.getElementById('placeOrderBtn');
    if (placeOrderBtn) {
        placeOrderBtn.addEventListener('click', handlePlaceOrder);
    }

    // Form validation
    const billingForm = document.getElementById('billingForm');
    if (billingForm) {
        billingForm.addEventListener('input', validateForm);
    }

    // Card number formatting
    const cardNumber = document.getElementById('cardNumber');
    if (cardNumber) {
        cardNumber.addEventListener('input', formatCardNumber);
    }

    // Expiry date formatting
    const expiryDate = document.getElementById('expiryDate');
    if (expiryDate) {
        expiryDate.addEventListener('input', formatExpiryDate);
    }

    // CVV validation
    const cvv = document.getElementById('cvv');
    if (cvv) {
        cvv.addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/\D/g, '');
        });
    }
}

// Render Order Summary
function renderOrderSummary() {
    const orderItemsContainer = document.getElementById('orderItems');
    
    if (!checkoutData.items || checkoutData.items.length === 0) {
        orderItemsContainer.innerHTML = '<p class="text-slate-600">কোনো আইটেম নেই</p>';
        return;
    }

    orderItemsContainer.innerHTML = checkoutData.items.map(item => {
        const course = courseData[item.id];
        if (!course) return '';

        const courseImage = getCourseImage(course.image);
        
        return `
            <div class="flex items-center space-x-3">
                <img src="${courseImage}" alt="${course.title}" class="w-16 h-16 rounded-lg flex-shrink-0 object-cover">
                <div class="flex-1 min-w-0">
                    <h4 class="text-sm font-semibold text-slate-900 truncate">${course.title}</h4>
                    <p class="text-xs text-slate-600">${course.instructor}</p>
                    <p class="text-sm font-bold text-indigo-600 mt-1">৳${course.price.toLocaleString()}</p>
                </div>
            </div>
        `;
    }).join('');

    // Update price breakdown
    document.getElementById('orderSubtotal').textContent = `৳${checkoutData.subtotal.toLocaleString()}`;
    document.getElementById('orderDiscount').textContent = `-৳${checkoutData.discount.toLocaleString()}`;
    document.getElementById('orderCouponDiscount').textContent = `-৳${checkoutData.couponDiscount.toLocaleString()}`;
    document.getElementById('orderTotal').textContent = `৳${checkoutData.total.toLocaleString()}`;
}

// Handle Payment Method Change
function handlePaymentMethodChange(e) {
    const method = e.target.value;
    const mobilePaymentDetails = document.getElementById('mobilePaymentDetails');
    const cardPaymentDetails = document.getElementById('cardPaymentDetails');
    const paymentProvider = document.getElementById('paymentProvider');

    if (method === 'bkash' || method === 'nagad' || method === 'rocket') {
        mobilePaymentDetails.classList.remove('hidden');
        cardPaymentDetails.classList.add('hidden');
        
        const providerNames = {
            'bkash': 'bKash',
            'nagad': 'Nagad',
            'rocket': 'Rocket'
        };
        paymentProvider.textContent = providerNames[method];
    } else if (method === 'card') {
        mobilePaymentDetails.classList.add('hidden');
        cardPaymentDetails.classList.remove('hidden');
    }
}

// Format Card Number
function formatCardNumber(e) {
    let value = e.target.value.replace(/\s/g, '').replace(/\D/g, '');
    let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
    e.target.value = formattedValue;
}

// Format Expiry Date
function formatExpiryDate(e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length >= 2) {
        value = value.substring(0, 2) + '/' + value.substring(2, 4);
    }
    e.target.value = value;
}

// Validate Form
function validateForm() {
    const fullName = document.getElementById('fullName').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const address = document.getElementById('address').value.trim();
    const city = document.getElementById('city').value.trim();
    const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked').value;
    
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

    // Validate address
    if (!address) {
        showError('addressError', 'ঠিকানা দিন');
        isValid = false;
    } else {
        hideError('addressError');
    }

    // Validate payment details
    if (paymentMethod === 'bkash' || paymentMethod === 'nagad' || paymentMethod === 'rocket') {
        const mobileNumber = document.getElementById('mobileNumber').value.trim();
        if (!mobileNumber || !phoneRegex.test(mobileNumber.replace(/\s/g, ''))) {
            isValid = false;
        }
    } else if (paymentMethod === 'card') {
        const cardNumber = document.getElementById('cardNumber').value.replace(/\s/g, '');
        const expiryDate = document.getElementById('expiryDate').value;
        const cvv = document.getElementById('cvv').value;
        const cardName = document.getElementById('cardName').value.trim();

        if (cardNumber.length < 16) isValid = false;
        if (expiryDate.length !== 5) isValid = false;
        if (cvv.length !== 3) isValid = false;
        if (!cardName) isValid = false;
    }

    return isValid;
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

// Handle Place Order
function handlePlaceOrder(e) {
    e.preventDefault();

    // Validate terms checkbox
    const termsCheckbox = document.getElementById('termsCheckbox');
    if (!termsCheckbox.checked) {
        alert('শর্তাবলীতে সম্মত হতে হবে');
        return;
    }

    // Validate form
    if (!validateForm()) {
        alert('দয়া করে সব তথ্য সঠিকভাবে পূরণ করুন');
        return;
    }

    // Get form data
    const formData = {
        billing: {
            fullName: document.getElementById('fullName').value.trim(),
            email: document.getElementById('email').value.trim(),
            phone: document.getElementById('phone').value.trim(),
            address: document.getElementById('address').value.trim(),
            city: document.getElementById('city').value.trim(),
            postalCode: document.getElementById('postalCode').value.trim()
        },
        payment: {
            method: document.querySelector('input[name="paymentMethod"]:checked').value,
            mobileNumber: document.getElementById('mobileNumber')?.value.trim() || '',
            cardNumber: document.getElementById('cardNumber')?.value.replace(/\s/g, '') || '',
            expiryDate: document.getElementById('expiryDate')?.value || '',
            cvv: document.getElementById('cvv')?.value || '',
            cardName: document.getElementById('cardName')?.value.trim() || ''
        },
        order: checkoutData
    };

    // Disable button and show loading
    const placeOrderBtn = document.getElementById('placeOrderBtn');
    placeOrderBtn.disabled = true;
    placeOrderBtn.textContent = 'প্রক্রিয়াকরণ হচ্ছে...';

    // Simulate API call
    setTimeout(() => {
        // Store order data
        sessionStorage.setItem('orderData', JSON.stringify(formData));
        
        // Clear cart
        localStorage.removeItem('cartItems');
        
        // Redirect to success page
        window.location.href = 'payment-success.html';
    }, 2000);
}

// Get Course Image Helper
function getCourseImage(courseCode) {
    const imageMap = {
        'HSC': 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=200&h=200&fit=crop',
        'SSC': 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=200&h=200&fit=crop',
        'WEB': 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=200&h=200&fit=crop',
        'GD': 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=200&h=200&fit=crop',
        'DU': 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=200&h=200&fit=crop',
        'default': 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop'
    };
    return imageMap[courseCode] || imageMap.default;
}

// Initialize on page load
init();

