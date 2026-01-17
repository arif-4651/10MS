// Image URLs - Unsplash Placeholder Images
const imageUrls = {
    // Course Images
    courses: {
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
    },
    
    // Instructor Images
    instructors: {
        'ariful': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
        'sayma': 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
        'kamrul': 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
        'tasnima': 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
        'rafi': 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
        'sara': 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop',
        'default': 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop'
    },
    
    // User Avatar
    avatar: {
        'default': 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop'
    },
    
    // Certificate Background
    certificate: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=1200&h=800&fit=crop',
    
    // Logo
    logo: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=200&h=200&fit=crop'
};

// Get Course Image
function getCourseImage(courseCode) {
    return imageUrls.courses[courseCode] || imageUrls.courses.default;
}

// Get Instructor Image
function getInstructorImage(instructorCode) {
    return imageUrls.instructors[instructorCode] || imageUrls.instructors.default;
}

// Get Avatar Image
function getAvatarImage() {
    return imageUrls.avatar.default;
}

// Get Certificate Image
function getCertificateImage() {
    return imageUrls.certificate;
}

// Get Logo Image
function getLogoImage() {
    return imageUrls.logo;
}

