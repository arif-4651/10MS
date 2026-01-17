// Certificates Data
let certificates = [
    {
        id: 1,
        courseTitle: "Web Development - Full Stack",
        category: "skills",
        issueDate: "2024-02-28",
        certificateId: "CERT-WEB-2024-001",
        grade: "A+",
        completionDate: "2024-02-28",
        instructor: "কামরুল হাসান",
        image: "WEB"
    },
    {
        id: 2,
        courseTitle: "Graphic Design Masterclass",
        category: "skills",
        issueDate: "2024-02-15",
        certificateId: "CERT-GD-2024-002",
        grade: "A",
        completionDate: "2024-02-15",
        instructor: "তাসনিমা আক্তার",
        image: "GD"
    },
    {
        id: 3,
        courseTitle: "HSC ২০২৬ - সম্পূর্ণ প্রস্তুতি",
        category: "academic",
        issueDate: "2024-01-30",
        certificateId: "CERT-HSC-2024-003",
        grade: "A+",
        completionDate: "2024-01-30",
        instructor: "আরিফুল ইসলাম",
        image: "HSC"
    },
    {
        id: 4,
        courseTitle: "DU Admission Test Preparation",
        category: "admission",
        issueDate: "2024-01-20",
        certificateId: "CERT-DU-2024-004",
        grade: "A",
        completionDate: "2024-01-20",
        instructor: "রাফি আহমেদ",
        image: "DU"
    },
    {
        id: 5,
        courseTitle: "English Speaking Course",
        category: "skills",
        issueDate: "2024-01-10",
        certificateId: "CERT-ENG-2024-005",
        grade: "A",
        completionDate: "2024-01-10",
        instructor: "সারা জাহান",
        image: "ENG"
    }
];

// State
let filteredCertificates = [...certificates];
let selectedCertificate = null;

// Initialize
function init() {
    renderCertificates();
    updateStats();
    setupEventListeners();
}

// Setup Event Listeners
function setupEventListeners() {
    // Search
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', handleSearch);
    }

    // Filter
    const filterSelect = document.getElementById('filterSelect');
    if (filterSelect) {
        filterSelect.addEventListener('change', handleFilter);
    }

    // Close modal on outside click
    const modal = document.getElementById('certificateModal');
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target.id === 'certificateModal') {
                closeModal();
            }
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
    const filterValue = document.getElementById('filterSelect').value;

    filteredCertificates = certificates.filter(cert => {
        // Search filter
        if (searchTerm) {
            const matchesSearch = 
                cert.courseTitle.toLowerCase().includes(searchTerm) ||
                cert.certificateId.toLowerCase().includes(searchTerm) ||
                cert.instructor.toLowerCase().includes(searchTerm);
            if (!matchesSearch) return false;
        }

        // Category filter
        if (filterValue !== 'all' && cert.category !== filterValue) {
            return false;
        }

        return true;
    });

    renderCertificates();
}

// Render Certificates
function renderCertificates() {
    const container = document.getElementById('certificatesContainer');
    const emptyState = document.getElementById('emptyState');

    if (filteredCertificates.length === 0) {
        container.innerHTML = '';
        container.classList.add('hidden');
        emptyState.classList.remove('hidden');
        return;
    }

    container.classList.remove('hidden');
    emptyState.classList.add('hidden');

    container.innerHTML = filteredCertificates.map(cert => createCertificateCard(cert)).join('');
}

// Create Certificate Card
function createCertificateCard(cert) {
    const categoryNames = {
        'academic': 'একাডেমিক',
        'skills': 'স্কিলস',
        'admission': 'ভর্তি পরীক্ষা'
    };

    return `
        <div class="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-lg transition-shadow duration-200">
            <!-- Certificate Preview -->
            <div class="relative overflow-hidden cursor-pointer" onclick="viewCertificate(${cert.id})">
                <img src="https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=600&fit=crop" alt="Certificate" class="w-full h-48 object-cover">
                <div class="absolute inset-0 bg-indigo-900 bg-opacity-60 flex items-center justify-center">
                    <div class="text-center text-white p-8">
                    <div class="mb-4">
                        <svg class="w-16 h-16 mx-auto text-white opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path>
                        </svg>
                    </div>
                        <h3 class="text-xl font-bold mb-2">Certificate of Completion</h3>
                        <p class="text-sm opacity-90">${cert.courseTitle}</p>
                    </div>
                </div>
            </div>

            <!-- Certificate Info -->
            <div class="p-6">
                <div class="mb-4">
                    <span class="text-xs font-medium text-indigo-600 bg-indigo-50 px-2 py-1 rounded">
                        ${categoryNames[cert.category]}
                    </span>
                </div>
                
                <h3 class="text-lg font-semibold text-slate-900 mb-2 line-clamp-2">
                    ${cert.courseTitle}
                </h3>
                
                <div class="space-y-2 text-sm text-slate-600 mb-4">
                    <div class="flex items-center justify-between">
                        <span>গ্রেড:</span>
                        <span class="font-semibold text-indigo-600">${cert.grade}</span>
                    </div>
                    <div class="flex items-center justify-between">
                        <span>ইস্যু তারিখ:</span>
                        <span>${formatDate(cert.issueDate)}</span>
                    </div>
                    <div class="flex items-center justify-between">
                        <span>সার্টিফিকেট ID:</span>
                        <span class="font-mono text-xs">${cert.certificateId}</span>
                    </div>
                </div>

                <!-- Action Buttons -->
                <div class="flex space-x-2">
                    <button onclick="viewCertificate(${cert.id})" class="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 text-sm font-semibold">
                        দেখুন
                    </button>
                    <button onclick="downloadCertificateById(${cert.id})" class="px-4 py-2 bg-white text-indigo-600 border-2 border-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors duration-200">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                        </svg>
                    </button>
                    <button onclick="shareCertificate(${cert.id})" class="px-4 py-2 bg-white text-slate-600 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors duration-200">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    `;
}

// View Certificate
function viewCertificate(certId) {
    selectedCertificate = certificates.find(c => c.id === certId);
    if (!selectedCertificate) return;

    const modal = document.getElementById('certificateModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalContent = document.getElementById('modalContent');

    modalTitle.textContent = selectedCertificate.courseTitle;
    
    modalContent.innerHTML = `
        <div class="text-center">
            <div class="mb-6">
                <h1 class="text-4xl font-bold text-indigo-900 mb-2">Certificate of Completion</h1>
                <p class="text-lg text-indigo-700">This is to certify that</p>
            </div>
            
            <div class="mb-6">
                <h2 class="text-3xl font-bold text-slate-900 mb-2">রাফি আহমেদ</h2>
                <p class="text-lg text-slate-700">has successfully completed the course</p>
            </div>
            
            <div class="mb-6">
                <h3 class="text-2xl font-semibold text-indigo-800 mb-4">${selectedCertificate.courseTitle}</h3>
                <p class="text-slate-600">Instructor: ${selectedCertificate.instructor}</p>
                <p class="text-slate-600">Grade: <span class="font-bold text-indigo-600">${selectedCertificate.grade}</span></p>
            </div>
            
            <div class="mb-6 pt-6 border-t-2 border-indigo-300">
                <p class="text-sm text-slate-600 mb-2">Issued on: ${formatDate(selectedCertificate.issueDate)}</p>
                <p class="text-xs text-slate-500 font-mono">Certificate ID: ${selectedCertificate.certificateId}</p>
            </div>
            
            <div class="flex justify-center space-x-8 mt-8">
                <div class="text-center">
                    <div class="w-24 h-24 border-2 border-indigo-300 rounded-lg flex items-center justify-center mb-2">
                        <span class="text-2xl font-bold text-indigo-600">10ms</span>
                    </div>
                    <p class="text-xs text-slate-600">10 Min School</p>
                </div>
            </div>
        </div>
    `;

    modal.classList.remove('hidden');
}

// Close Modal
function closeModal() {
    const modal = document.getElementById('certificateModal');
    modal.classList.add('hidden');
    selectedCertificate = null;
}

// Download Certificate
function downloadCertificate() {
    if (!selectedCertificate) return;
    downloadCertificateById(selectedCertificate.id);
}

// Download Certificate by ID
function downloadCertificateById(certId) {
    const cert = certificates.find(c => c.id === certId);
    if (!cert) return;

    // In a real app, this would generate and download a PDF
    showNotification(`${cert.courseTitle} সার্টিফিকেট ডাউনলোড শুরু হয়েছে!`, 'success');
    
    // Simulate download
    setTimeout(() => {
        showNotification('সার্টিফিকেট সফলভাবে ডাউনলোড করা হয়েছে!', 'success');
    }, 1500);
}

// Share Certificate
function shareCertificate(certId) {
    const cert = certificates.find(c => c.id === certId);
    if (!cert) return;

    if (navigator.share) {
        navigator.share({
            title: `${cert.courseTitle} - Certificate`,
            text: `আমি ${cert.courseTitle} কোর্স সম্পন্ন করেছি!`,
            url: window.location.href
        }).catch(() => {
            copyToClipboard();
        });
    } else {
        copyToClipboard();
    }
}

// Copy to Clipboard
function copyToClipboard() {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
        showNotification('লিঙ্ক কপি করা হয়েছে!', 'success');
    });
}

// Update Stats
function updateStats() {
    const total = certificates.length;
    const thisMonth = certificates.filter(c => {
        const certDate = new Date(c.issueDate);
        const now = new Date();
        return certDate.getMonth() === now.getMonth() && certDate.getFullYear() === now.getFullYear();
    }).length;
    const latest = certificates.length > 0 ? certificates[0].courseTitle : 'N/A';

    document.getElementById('totalCertificates').textContent = total;
    document.getElementById('monthlyCertificates').textContent = thisMonth;
    document.getElementById('latestCertificate').textContent = latest;
}

// Format Date
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('bn-BD', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
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
window.viewCertificate = viewCertificate;
window.closeModal = closeModal;
window.downloadCertificate = downloadCertificate;
window.downloadCertificateById = downloadCertificateById;
window.shareCertificate = shareCertificate;

// Initialize on page load
init();

