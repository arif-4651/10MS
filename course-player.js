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

// Chapter Accordion
const chapterButtons = document.querySelectorAll('[data-chapter]');

chapterButtons.forEach(button => {
    button.addEventListener('click', () => {
        const chapter = button.getAttribute('data-chapter');
        const content = button.nextElementSibling;
        const icon = button.querySelector('svg');
        
        if (content) {
            const isOpen = !content.classList.contains('hidden');
            
            // Close all other chapters
            chapterButtons.forEach(otherBtn => {
                if (otherBtn !== button) {
                    const otherContent = otherBtn.nextElementSibling;
                    const otherIcon = otherBtn.querySelector('svg');
                    if (otherContent) {
                        otherContent.classList.add('hidden');
                        otherIcon.classList.remove('rotate-180');
                        otherBtn.parentElement.classList.remove('bg-indigo-50');
                    }
                }
            });
            
            // Toggle current chapter
            if (isOpen) {
                content.classList.add('hidden');
                icon.classList.remove('rotate-180');
                button.parentElement.classList.remove('bg-indigo-50');
            } else {
                content.classList.remove('hidden');
                icon.classList.add('rotate-180');
                button.parentElement.classList.add('bg-indigo-50');
            }
        }
    });
});

// Bookmark Button
const bookmarkBtn = document.getElementById('bookmarkBtn');
if (bookmarkBtn) {
    let isBookmarked = false;
    bookmarkBtn.addEventListener('click', () => {
        isBookmarked = !isBookmarked;
        if (isBookmarked) {
            bookmarkBtn.classList.add('text-indigo-600', 'bg-indigo-50');
            bookmarkBtn.querySelector('svg').classList.add('fill-current');
        } else {
            bookmarkBtn.classList.remove('text-indigo-600', 'bg-indigo-50');
            bookmarkBtn.querySelector('svg').classList.remove('fill-current');
        }
    });
}

// Download Notes Button
const downloadNotesBtn = document.getElementById('downloadNotesBtn');
if (downloadNotesBtn) {
    downloadNotesBtn.addEventListener('click', () => {
        // Simulate download
        alert('ক্লাস নোটস ডাউনলোড শুরু হয়েছে! (Demo - Backend integration needed)');
    });
}

// ============================================
// CHAT/COMMENTS SYSTEM - Backend Integration
// ============================================

// API Configuration
const API_BASE_URL = 'http://localhost:3000/api';
const SOCKET_URL = 'http://localhost:3000';

// Get current video ID (you can get this from URL or data attribute)
const currentVideoId = 1; // Change this to get from actual video data

// Socket.io connection
let socket = null;
if (typeof io !== 'undefined') {
    socket = io(SOCKET_URL);
    
    // Join video room for real-time updates
    socket.emit('join-video', currentVideoId);
    
    // Listen for new comments
    socket.on('new-comment', (comment) => {
        addCommentToUI(comment, true);
        updateCommentCount();
    });
    
    // Listen for new replies
    socket.on('new-reply', ({ parentCommentId, reply }) => {
        addReplyToUI(parentCommentId, reply);
    });
    
    // Listen for like updates
    socket.on('comment-like-updated', ({ commentId, likesCount }) => {
        updateLikeCount(commentId, likesCount);
    });
    
    // Listen for comment updates
    socket.on('comment-updated', (comment) => {
        updateCommentInUI(comment);
    });
    
    // Listen for deleted comments
    socket.on('comment-deleted', ({ commentId }) => {
        removeCommentFromUI(commentId);
        updateCommentCount();
    });
}

// Use auth helper functions (loaded from js/auth.js)
// getAuthToken is already defined in auth.js

// Format time ago
function getTimeAgo(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
    
    if (diffInSeconds < 60) return 'এখনই';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} মিনিট আগে`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} ঘণ্টা আগে`;
    if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)} দিন আগে`;
    return `${Math.floor(diffInSeconds / 2592000)} মাস আগে`;
}

// Get user initials for avatar
function getUserInitials(name) {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
}

// Get avatar color based on name
function getAvatarColor(name) {
    const colors = [
        'bg-indigo-100 text-indigo-600',
        'bg-green-100 text-green-600',
        'bg-blue-100 text-blue-600',
        'bg-purple-100 text-purple-600',
        'bg-pink-100 text-pink-600',
        'bg-yellow-100 text-yellow-600'
    ];
    const index = name.length % colors.length;
    return colors[index];
}

// Load comments from API
async function loadComments() {
    const commentsList = document.getElementById('commentsList');
    const commentsLoading = document.getElementById('commentsLoading');
    const commentsEmpty = document.getElementById('commentsEmpty');
    
    try {
        commentsLoading.classList.remove('hidden');
        commentsList.innerHTML = '';
        
        const token = getAuthToken();
        const headers = {
            'Content-Type': 'application/json'
        };
        
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }
        
        const response = await fetch(`${API_BASE_URL}/comments/video/${currentVideoId}`, {
            method: 'GET',
            headers: headers
        });
        
        const data = await response.json();
        
        commentsLoading.classList.add('hidden');
        
        if (data.success && data.data.length > 0) {
            commentsEmpty.classList.add('hidden');
            data.data.forEach(comment => {
                addCommentToUI(comment, false);
            });
            updateCommentCount();
        } else {
            commentsEmpty.classList.remove('hidden');
            updateCommentCount(0);
        }
    } catch (error) {
        console.error('Error loading comments:', error);
        commentsLoading.classList.add('hidden');
        commentsList.innerHTML = '<div class="text-center py-8 text-red-500">মন্তব্য লোড করতে সমস্যা হয়েছে।</div>';
    }
}

// Add comment to UI
function addCommentToUI(comment, prepend = false) {
    const commentsList = document.getElementById('commentsList');
    const commentsEmpty = document.getElementById('commentsEmpty');
    
    if (commentsEmpty) {
        commentsEmpty.classList.add('hidden');
    }
    
    const commentElement = createCommentElement(comment);
    
    if (prepend) {
        commentsList.insertBefore(commentElement, commentsList.firstChild);
    } else {
        commentsList.appendChild(commentElement);
    }
}

// Create comment element
function createCommentElement(comment) {
    const div = document.createElement('div');
    div.className = 'border-b border-slate-200 pb-4 comment-item';
    div.setAttribute('data-comment-id', comment.id);
    
    const initials = getUserInitials(comment.user_name);
    const avatarColor = getAvatarColor(comment.user_name);
    const isLiked = comment.is_liked === 1;
    
    div.innerHTML = `
        <div class="flex items-start space-x-3">
            <div class="w-10 h-10 ${avatarColor} rounded-full flex items-center justify-center flex-shrink-0">
                ${comment.user_avatar ? 
                    `<img src="${comment.user_avatar}" alt="${comment.user_name}" class="w-full h-full rounded-full object-cover">` :
                    `<span class="font-semibold text-sm">${initials}</span>`
                }
            </div>
            <div class="flex-1">
                <div class="flex items-center space-x-2 mb-1">
                    <span class="font-semibold text-slate-900">${comment.user_name}</span>
                    <span class="text-xs text-slate-500">${getTimeAgo(comment.created_at)}</span>
                </div>
                <p class="text-slate-700 mb-2">${escapeHtml(comment.comment_text)}</p>
                <div class="flex items-center space-x-4">
                    <button class="like-btn text-sm ${isLiked ? 'text-indigo-600' : 'text-slate-600'} hover:text-indigo-600 flex items-center space-x-1" data-comment-id="${comment.id}" data-liked="${isLiked ? '1' : '0'}">
                        <svg class="w-4 h-4 ${isLiked ? 'fill-current' : ''}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"></path>
                        </svg>
                        <span class="like-count">${comment.likes_count || 0}</span>
                    </button>
                    <button class="reply-btn text-sm text-slate-600 hover:text-indigo-600" data-comment-id="${comment.id}">Reply</button>
                </div>
                ${comment.replies && comment.replies.length > 0 ? `
                    <div class="mt-4 ml-4 space-y-3 replies-container" data-parent-id="${comment.id}">
                        ${comment.replies.map(reply => createReplyElement(reply)).join('')}
                    </div>
                ` : `
                    <div class="mt-4 ml-4 hidden replies-container" data-parent-id="${comment.id}"></div>
                `}
            </div>
        </div>
    `;
    
    // Add event listeners
    const likeBtn = div.querySelector('.like-btn');
    if (likeBtn) {
        likeBtn.addEventListener('click', () => handleLike(comment.id));
    }
    
    const replyBtn = div.querySelector('.reply-btn');
    if (replyBtn) {
        replyBtn.addEventListener('click', () => handleReply(comment.id));
    }
    
    return div;
}

// Create reply element
function createReplyElement(reply) {
    const initials = getUserInitials(reply.user_name);
    const avatarColor = getAvatarColor(reply.user_name);
    const isLiked = reply.is_liked === 1;
    
    return `
        <div class="border-l-2 border-slate-200 pl-3 reply-item" data-reply-id="${reply.id}">
            <div class="flex items-start space-x-2">
                <div class="w-8 h-8 ${avatarColor} rounded-full flex items-center justify-center flex-shrink-0">
                    ${reply.user_avatar ? 
                        `<img src="${reply.user_avatar}" alt="${reply.user_name}" class="w-full h-full rounded-full object-cover">` :
                        `<span class="font-semibold text-xs">${initials}</span>`
                    }
                </div>
                <div class="flex-1">
                    <div class="flex items-center space-x-2 mb-1">
                        <span class="font-semibold text-sm text-slate-900">${reply.user_name}</span>
                        <span class="text-xs text-slate-500">${getTimeAgo(reply.created_at)}</span>
                    </div>
                    <p class="text-slate-700 text-sm mb-2">${escapeHtml(reply.comment_text)}</p>
                    <button class="like-btn text-xs ${isLiked ? 'text-indigo-600' : 'text-slate-600'} hover:text-indigo-600 flex items-center space-x-1" data-comment-id="${reply.id}" data-liked="${isLiked ? '1' : '0'}">
                        <svg class="w-3 h-3 ${isLiked ? 'fill-current' : ''}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"></path>
                        </svg>
                        <span class="like-count">${reply.likes_count || 0}</span>
                    </button>
                </div>
            </div>
        </div>
    `;
}

// Add reply to UI
function addReplyToUI(parentCommentId, reply) {
    const parentComment = document.querySelector(`[data-comment-id="${parentCommentId}"]`);
    if (!parentComment) return;
    
    const repliesContainer = parentComment.querySelector('.replies-container');
    if (!repliesContainer) return;
    
    repliesContainer.classList.remove('hidden');
    
    const replyDiv = document.createElement('div');
    replyDiv.className = 'border-l-2 border-slate-200 pl-3 reply-item';
    replyDiv.setAttribute('data-reply-id', reply.id);
    replyDiv.innerHTML = createReplyElement(reply);
    
    // Add like event listener
    const likeBtn = replyDiv.querySelector('.like-btn');
    if (likeBtn) {
        likeBtn.addEventListener('click', () => handleLike(reply.id));
    }
    
    repliesContainer.appendChild(replyDiv);
}

// Update like count
function updateLikeCount(commentId, likesCount) {
    const likeBtn = document.querySelector(`.like-btn[data-comment-id="${commentId}"]`);
    if (likeBtn) {
        const likeCountSpan = likeBtn.querySelector('.like-count');
        if (likeCountSpan) {
            likeCountSpan.textContent = likesCount;
        }
    }
}

// Update comment in UI
function updateCommentInUI(comment) {
    const commentElement = document.querySelector(`[data-comment-id="${comment.id}"]`);
    if (commentElement) {
        const textElement = commentElement.querySelector('p.text-slate-700');
        if (textElement) {
            textElement.textContent = comment.comment_text;
        }
    }
}

// Remove comment from UI
function removeCommentFromUI(commentId) {
    const commentElement = document.querySelector(`[data-comment-id="${commentId}"]`);
    if (commentElement) {
        commentElement.remove();
    }
}

// Update comment count
function updateCommentCount(count = null) {
    const commentCountEl = document.getElementById('commentCount');
    if (!commentCountEl) return;
    
    if (count === null) {
        const comments = document.querySelectorAll('.comment-item');
        count = comments.length;
    }
    
    commentCountEl.textContent = count;
}

// Handle like/unlike
async function handleLike(commentId) {
    const token = getAuthToken();
    if (!token) {
        alert('লাইক করতে লগইন করুন');
        return;
    }
    
    try {
        const response = await fetch(`${API_BASE_URL}/comments/${commentId}/like`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        
        const data = await response.json();
        
        if (data.success) {
            const likeBtn = document.querySelector(`.like-btn[data-comment-id="${commentId}"]`);
            if (likeBtn) {
                const isLiked = likeBtn.getAttribute('data-liked') === '1';
                likeBtn.setAttribute('data-liked', isLiked ? '0' : '1');
                likeBtn.classList.toggle('text-indigo-600', !isLiked);
                likeBtn.classList.toggle('text-slate-600', isLiked);
                const svg = likeBtn.querySelector('svg');
                if (svg) {
                    svg.classList.toggle('fill-current', !isLiked);
                }
            }
        }
    } catch (error) {
        console.error('Error toggling like:', error);
    }
}

// Handle reply
function handleReply(commentId) {
    const replyText = prompt('আপনার উত্তর লিখুন:');
    if (replyText && replyText.trim()) {
        submitReply(commentId, replyText.trim());
    }
}

// Submit reply
async function submitReply(commentId, replyText) {
    const token = getAuthToken();
    if (!token) {
        alert('উত্তর করতে লগইন করুন');
        return;
    }
    
    try {
        const response = await fetch(`${API_BASE_URL}/comments/${commentId}/reply`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                videoId: currentVideoId,
                commentText: replyText
            })
        });
        
        const data = await response.json();
        
        if (data.success) {
            // Reply will be added via Socket.io
        } else {
            alert(data.message || 'উত্তর দেওয়ার সময় সমস্যা হয়েছে');
        }
    } catch (error) {
        console.error('Error submitting reply:', error);
        alert('উত্তর দেওয়ার সময় সমস্যা হয়েছে');
    }
}

// Escape HTML
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Comment Submission
const commentInput = document.getElementById('commentInput');
const submitComment = document.getElementById('submitComment');
const submitCommentText = document.getElementById('submitCommentText');

if (submitComment && commentInput) {
    submitComment.addEventListener('click', async () => {
        const comment = commentInput.value.trim();
        if (!comment) {
            alert('দয়া করে মন্তব্য লিখুন');
            return;
        }
        
        const token = getAuthToken();
        if (!token) {
            alert('মন্তব্য করতে লগইন করুন');
            return;
        }
        
        // Disable button
        submitComment.disabled = true;
        submitCommentText.textContent = 'পাঠানো হচ্ছে...';
        
        try {
            const response = await fetch(`${API_BASE_URL}/comments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    videoId: currentVideoId,
                    commentText: comment,
                    parentCommentId: null
                })
            });
            
            const data = await response.json();
            
            if (data.success) {
                commentInput.value = '';
                // Comment will be added via Socket.io
            } else {
                alert(data.message || 'মন্তব্য করার সময় সমস্যা হয়েছে');
            }
        } catch (error) {
            console.error('Error submitting comment:', error);
            alert('মন্তব্য করার সময় সমস্যা হয়েছে');
        } finally {
            submitComment.disabled = false;
            submitCommentText.textContent = 'মন্তব্য করুন';
        }
    });
}

// Load comments when comments tab is opened
const commentsTabBtn = document.querySelector('[data-tab="comments"]');
if (commentsTabBtn) {
    commentsTabBtn.addEventListener('click', () => {
        const commentsList = document.getElementById('commentsList');
        if (commentsList && commentsList.children.length === 0) {
            loadComments();
        }
    });
}

// Also load on page load if comments tab is active
document.addEventListener('DOMContentLoaded', () => {
    const commentsTab = document.getElementById('comments');
    if (commentsTab && !commentsTab.classList.contains('hidden')) {
        loadComments();
    }
});

// Video Player Progress Tracking
const videoPlayer = document.getElementById('videoPlayer');
const videoThumbnail = document.getElementById('videoThumbnail');

if (videoPlayer) {
    // Hide thumbnail when video plays
    videoPlayer.addEventListener('play', () => {
        if (videoThumbnail) {
            videoThumbnail.style.display = 'none';
        }
    });
    
    // Track video progress
    let progressInterval;
    
    videoPlayer.addEventListener('play', () => {
        progressInterval = setInterval(() => {
            const progress = (videoPlayer.currentTime / videoPlayer.duration) * 100;
            // Here you would send progress to backend
            console.log('Video progress:', progress.toFixed(2) + '%');
        }, 5000); // Update every 5 seconds
    });
    
    videoPlayer.addEventListener('pause', () => {
        if (progressInterval) {
            clearInterval(progressInterval);
        }
    });
    
    videoPlayer.addEventListener('ended', () => {
        if (progressInterval) {
            clearInterval(progressInterval);
        }
        // Mark video as completed
        alert('ক্লাস সম্পন্ন হয়েছে! (Demo - Backend integration needed)');
    });
}

// Playlist Video Click
document.querySelectorAll('.chapter-content a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        // Here you would load the new video
        alert('নতুন ভিডিও লোড করা হচ্ছে... (Demo - Backend integration needed)');
    });
});

// Smooth scroll for playlist
const playlistContainer = document.querySelector('.max-h-\\[600px\\]');
if (playlistContainer) {
    // Auto-scroll to current video
    const currentVideo = playlistContainer.querySelector('.bg-indigo-100');
    if (currentVideo) {
        currentVideo.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

