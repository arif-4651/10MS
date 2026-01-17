// Get order data from sessionStorage
const orderData = JSON.parse(sessionStorage.getItem('orderData') || '{}');

// Course Data
const courseData = {
    1: {
        id: 1,
        title: "HSC ২০২৬ - সম্পূর্ণ প্রস্তুতি",
        instructor: "আরিফুল ইসলাম",
        price: 2990,
        image: "HSC"
    },
    2: {
        id: 2,
        title: "SSC ২০২৬ - সম্পূর্ণ প্রস্তুতি",
        instructor: "সায়মা রহমান",
        price: 2490,
        image: "SSC"
    },
    3: {
        id: 3,
        title: "Web Development - Full Stack",
        instructor: "কামরুল হাসান",
        price: 4990,
        image: "WEB"
    },
    4: {
        id: 4,
        title: "Graphic Design Masterclass",
        instructor: "তাসনিমা আক্তার",
        price: 3490,
        image: "GD"
    },
    5: {
        id: 5,
        title: "DU Admission Test Preparation",
        instructor: "রাফি আহমেদ",
        price: 3990,
        image: "DU"
    }
};

// Initialize
function init() {
    if (!orderData.order) {
        // Redirect if no order data
        window.location.href = 'cart.html';
        return;
    }

    displayOrderDetails();
}

// Display Order Details
function displayOrderDetails() {
    const order = orderData.order;
    
    // Generate order number
    const orderNumber = 'ORD-' + Date.now().toString().slice(-6);
    document.getElementById('orderNumber').textContent = '#' + orderNumber;

    // Payment method
    const paymentMethodNames = {
        'bkash': 'bKash',
        'nagad': 'Nagad',
        'rocket': 'Rocket',
        'card': 'ডেবিট/ক্রেডিট কার্ড'
    };
    document.getElementById('paymentMethod').textContent = paymentMethodNames[orderData.payment?.method] || 'N/A';

    // Total amount
    document.getElementById('totalAmount').textContent = `৳${order.total.toLocaleString()}`;

    // Order date
    const orderDate = new Date().toLocaleDateString('bn-BD', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    document.getElementById('orderDate').textContent = orderDate;

    // Display ordered courses
    displayOrderedCourses();
}

// Display Ordered Courses
function displayOrderedCourses() {
    const orderedCoursesContainer = document.getElementById('orderedCourses');
    const items = orderData.order.items || [];

    if (items.length === 0) {
        orderedCoursesContainer.innerHTML = '<p class="text-slate-600">কোনো কোর্স নেই</p>';
        return;
    }

    orderedCoursesContainer.innerHTML = items.map(item => {
        const course = courseData[item.id];
        if (!course) return '';

        const courseImage = getCourseImage(course.image);
        
        return `
            <div class="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg">
                <img src="${courseImage}" alt="${course.title}" class="w-16 h-16 rounded-lg flex-shrink-0 object-cover">
                <div class="flex-1">
                    <h4 class="text-sm font-semibold text-slate-900">${course.title}</h4>
                    <p class="text-xs text-slate-600">${course.instructor}</p>
                </div>
                <div class="text-sm font-semibold text-indigo-600">৳${course.price.toLocaleString()}</div>
            </div>
        `;
    }).join('');
}

// Download Invoice
function downloadInvoice() {
    // In a real app, this would generate and download a PDF invoice
    alert('Invoice ডাউনলোড শুরু হয়েছে! (Demo - Backend integration needed)');
    
    // You can implement actual PDF generation here
    // For now, just show a message
    console.log('Invoice data:', orderData);
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

