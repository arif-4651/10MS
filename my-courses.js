// My Courses Data
let myCourses = [
    {
        id: 1,
        title: "HSC ২০২৬ - সম্পূর্ণ প্রস্তুতি",
        instructor: "আরিফুল ইসলাম",
        category: "একাডেমিক",
        image: "HSC",
        progress: 65,
        totalClasses: 230,
        completedClasses: 150,
        enrolledDate: "2024-01-15",
        status: "in-progress",
        lastAccessed: "2024-03-20",
        rating: 4.8
    },
    {
        id: 2,
        title: "SSC ২০২৬ - সম্পূর্ণ প্রস্তুতি",
        instructor: "সায়মা রহমান",
        category: "একাডেমিক",
        image: "SSC",
        progress: 40,
        totalClasses: 200,
        completedClasses: 80,
        enrolledDate: "2024-02-10",
        status: "in-progress",
        lastAccessed: "2024-03-18",
        rating: 4.7
    },
    {
        id: 3,
        title: "Web Development - Full Stack",
        instructor: "কামরুল হাসান",
        category: "স্কিলস",
        image: "WEB",
        progress: 85,
        totalClasses: 200,
        completedClasses: 170,
        enrolledDate: "2023-12-05",
        status: "in-progress",
        lastAccessed: "2024-03-22",
        rating: 4.9
    },
    {
        id: 4,
        title: "Graphic Design Masterclass",
        instructor: "তাসনিমা আক্তার",
        category: "স্কিলস",
        image: "GD",
        progress: 100,
        totalClasses: 120,
        completedClasses: 120,
        enrolledDate: "2023-11-20",
        status: "completed",
        lastAccessed: "2024-02-28",
        rating: 4.6,
        completedDate: "2024-02-28"
    },
    {
        id: 5,
        title: "DU Admission Test Preparation",
        instructor: "রাফি আহমেদ",
        category: "ভর্তি পরীক্ষা",
        image: "DU",
        progress: 0,
        totalClasses: 150,
        completedClasses: 0,
        enrolledDate: "2024-03-15",
        status: "not-started",
        lastAccessed: null,
        rating: 4.8
    },
    {
        id: 6,
        title: "English Speaking Course",
        instructor: "সারা জাহান",
        category: "ভাষা",
        image: "ENG",
        progress: 30,
        totalClasses: 80,
        completedClasses: 24,
        enrolledDate: "2024-03-01",
        status: "in-progress",
        lastAccessed: "2024-03-19",
        rating: 4.5
    }
];

// State
let filteredCourses = [...myCourses];
let currentView = 'grid'; // 'grid' or 'list'

// Initialize
function init() {
    renderCourses();
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

    // Sort
    const sortSelect = document.getElementById('sortSelect');
    if (sortSelect) {
        sortSelect.addEventListener('change', handleSort);
    }

    // View Toggle
    const gridViewBtn = document.getElementById('gridViewBtn');
    const listViewBtn = document.getElementById('listViewBtn');
    
    if (gridViewBtn) {
        gridViewBtn.addEventListener('click', () => switchView('grid'));
    }
    if (listViewBtn) {
        listViewBtn.addEventListener('click', () => switchView('list'));
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

    filteredCourses = myCourses.filter(course => {
        // Search filter
        if (searchTerm) {
            const matchesSearch = 
                course.title.toLowerCase().includes(searchTerm) ||
                course.instructor.toLowerCase().includes(searchTerm) ||
                course.category.toLowerCase().includes(searchTerm);
            if (!matchesSearch) return false;
        }

        // Status filter
        if (filterValue !== 'all' && course.status !== filterValue) {
            return false;
        }

        return true;
    });

    renderCourses();
    updateStats();
}

// Handle Sort
function handleSort() {
    const sortValue = document.getElementById('sortSelect').value;

    switch(sortValue) {
        case 'recent':
            filteredCourses.sort((a, b) => new Date(b.lastAccessed || b.enrolledDate) - new Date(a.lastAccessed || a.enrolledDate));
            break;
        case 'progress':
            filteredCourses.sort((a, b) => b.progress - a.progress);
            break;
        case 'name':
            filteredCourses.sort((a, b) => a.title.localeCompare(b.title));
            break;
    }

    renderCourses();
}

// Switch View
function switchView(view) {
    currentView = view;
    const gridViewBtn = document.getElementById('gridViewBtn');
    const listViewBtn = document.getElementById('listViewBtn');

    if (view === 'grid') {
        gridViewBtn.classList.add('bg-indigo-600', 'text-white');
        gridViewBtn.classList.remove('bg-slate-100', 'text-slate-600');
        listViewBtn.classList.add('bg-slate-100', 'text-slate-600');
        listViewBtn.classList.remove('bg-indigo-600', 'text-white');
    } else {
        listViewBtn.classList.add('bg-indigo-600', 'text-white');
        listViewBtn.classList.remove('bg-slate-100', 'text-slate-600');
        gridViewBtn.classList.add('bg-slate-100', 'text-slate-600');
        gridViewBtn.classList.remove('bg-indigo-600', 'text-white');
    }

    renderCourses();
}

// Render Courses
function renderCourses() {
    const container = document.getElementById('coursesContainer');
    const emptyState = document.getElementById('emptyState');
    const resultCount = document.getElementById('resultCount');

    if (filteredCourses.length === 0) {
        container.innerHTML = '';
        container.classList.add('hidden');
        emptyState.classList.remove('hidden');
        resultCount.textContent = '০';
        return;
    }

    container.classList.remove('hidden');
    emptyState.classList.add('hidden');
    resultCount.textContent = filteredCourses.length;

    if (currentView === 'grid') {
        container.className = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6';
        container.innerHTML = filteredCourses.map(course => createCourseCard(course)).join('');
    } else {
        container.className = 'space-y-4';
        container.innerHTML = filteredCourses.map(course => createCourseListItem(course)).join('');
    }
}

// Create Course Card (Grid View)
function createCourseCard(course) {
    const statusColors = {
        'completed': 'bg-green-100 text-green-700',
        'in-progress': 'bg-indigo-100 text-indigo-700',
        'not-started': 'bg-slate-100 text-slate-700'
    };

    const statusText = {
        'completed': 'সম্পন্ন',
        'in-progress': 'চলমান',
        'not-started': 'শুরু হয়নি'
    };

    const courseImage = getCourseImage(course.image);
    
    return `
        <div class="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-lg transition-shadow duration-200">
            <div class="relative">
                <img src="${courseImage}" alt="${course.title}" class="w-full h-48 object-cover">
                <div class="absolute top-4 right-4">
                    <span class="px-3 py-1 rounded-full text-xs font-semibold ${statusColors[course.status]}">
                        ${statusText[course.status]}
                    </span>
                </div>
            </div>
            
            <div class="p-6">
                <div class="mb-2">
                    <span class="text-xs font-medium text-indigo-600 bg-indigo-50 px-2 py-1 rounded">
                        ${course.category}
                    </span>
                </div>
                
                <h3 class="text-lg font-semibold text-slate-900 mb-2 line-clamp-2">
                    ${course.title}
                </h3>
                
                <p class="text-sm text-slate-600 mb-4">${course.instructor}</p>
                
                <!-- Progress Bar -->
                <div class="mb-4">
                    <div class="flex items-center justify-between text-xs text-slate-600 mb-2">
                        <span>প্রগ্রেস</span>
                        <span>${course.progress}%</span>
                    </div>
                    <div class="w-full bg-slate-200 rounded-full h-2">
                        <div class="bg-indigo-600 h-2 rounded-full transition-all duration-300" style="width: ${course.progress}%"></div>
                    </div>
                    <div class="text-xs text-slate-500 mt-1">
                        ${course.completedClasses}/${course.totalClasses} ক্লাস সম্পন্ন
                    </div>
                </div>
                
                <!-- Rating -->
                <div class="flex items-center space-x-2 mb-4">
                    <div class="flex items-center">
                        <svg class="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                        <span class="text-sm font-medium text-slate-700 ml-1">${course.rating}</span>
                    </div>
                </div>
                
                <!-- Action Buttons -->
                <div class="flex space-x-2">
                    <a href="course-player.html" class="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 text-sm font-semibold text-center">
                        ${course.status === 'completed' ? 'পুনরায় দেখুন' : 'চালিয়ে যান'}
                    </a>
                    <button onclick="viewCourseDetails(${course.id})" class="px-4 py-2 bg-white text-indigo-600 border-2 border-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors duration-200">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    `;
}

// Create Course List Item (List View)
function createCourseListItem(course) {
    const statusColors = {
        'completed': 'bg-green-100 text-green-700',
        'in-progress': 'bg-indigo-100 text-indigo-700',
        'not-started': 'bg-slate-100 text-slate-700'
    };

    const statusText = {
        'completed': 'সম্পন্ন',
        'in-progress': 'চলমান',
        'not-started': 'শুরু হয়নি'
    };

    return `
        <div class="bg-white rounded-xl shadow-sm border border-slate-100 p-6 hover:shadow-md transition-shadow duration-200">
            <div class="flex flex-col md:flex-row gap-6">
                <!-- Image -->
                <img src="${getCourseImage(course.image)}" alt="${course.title}" class="w-full md:w-48 h-32 object-cover rounded-lg flex-shrink-0">
                
                <!-- Content -->
                <div class="flex-1">
                    <div class="flex items-start justify-between mb-3">
                        <div>
                            <div class="flex items-center space-x-2 mb-2">
                                <span class="text-xs font-medium text-indigo-600 bg-indigo-50 px-2 py-1 rounded">
                                    ${course.category}
                                </span>
                                <span class="px-3 py-1 rounded-full text-xs font-semibold ${statusColors[course.status]}">
                                    ${statusText[course.status]}
                                </span>
                            </div>
                            <h3 class="text-xl font-semibold text-slate-900 mb-1">${course.title}</h3>
                            <p class="text-sm text-slate-600">${course.instructor}</p>
                        </div>
                    </div>
                    
                    <!-- Progress -->
                    <div class="mb-4">
                        <div class="flex items-center justify-between text-sm text-slate-600 mb-2">
                            <span>প্রগ্রেস: ${course.progress}%</span>
                            <span>${course.completedClasses}/${course.totalClasses} ক্লাস</span>
                        </div>
                        <div class="w-full bg-slate-200 rounded-full h-2">
                            <div class="bg-indigo-600 h-2 rounded-full transition-all duration-300" style="width: ${course.progress}%"></div>
                        </div>
                    </div>
                    
                    <!-- Info & Actions -->
                    <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                        <div class="flex items-center space-x-4 text-sm text-slate-600">
                            <div class="flex items-center">
                                <svg class="w-4 h-4 text-amber-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                </svg>
                                <span>${course.rating}</span>
                            </div>
                            <span>•</span>
                            <span>এনরোল: ${formatDate(course.enrolledDate)}</span>
                            ${course.lastAccessed ? `<span>•</span><span>সর্বশেষ: ${formatDate(course.lastAccessed)}</span>` : ''}
                        </div>
                        <div class="flex space-x-2">
                            <a href="course-player.html" class="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 text-sm font-semibold">
                                ${course.status === 'completed' ? 'পুনরায় দেখুন' : 'চালিয়ে যান'}
                            </a>
                            <button onclick="viewCourseDetails(${course.id})" class="px-4 py-2 bg-white text-indigo-600 border-2 border-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors duration-200">
                                বিস্তারিত
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Update Stats
function updateStats() {
    const total = myCourses.length;
    const completed = myCourses.filter(c => c.status === 'completed').length;
    const inProgress = myCourses.filter(c => c.status === 'in-progress').length;
    const averageProgress = Math.round(myCourses.reduce((sum, c) => sum + c.progress, 0) / total);

    document.getElementById('totalCourses').textContent = total;
    document.getElementById('completedCourses').textContent = completed;
    document.getElementById('inProgressCourses').textContent = inProgress;
    document.getElementById('averageProgress').textContent = averageProgress + '%';
}

// Format Date
function formatDate(dateString) {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('bn-BD', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

// View Course Details
function viewCourseDetails(courseId) {
    window.location.href = 'course-detail.html';
}

// Get Course Image Helper
function getCourseImage(courseCode) {
    const imageMap = {
        'HSC': 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=600&fit=crop',
        'SSC': 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop',
        'WEB': 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop',
        'GD': 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop',
        'DU': 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=600&fit=crop',
        'ENG': 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=600&fit=crop',
        'default': 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=600&fit=crop'
    };
    return imageMap[courseCode] || imageMap.default;
}

// Make function global
window.viewCourseDetails = viewCourseDetails;

// Initialize on page load
init();

