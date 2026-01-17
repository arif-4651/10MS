// Quiz Data
const quizData = [
    {
        question: "একটি বস্তু 10 m/s বেগে চলছে। 5 সেকেন্ড পর এর বেগ 20 m/s হলে, বস্তুটির ত্বরণ কত?",
        options: ["2 m/s²", "3 m/s²", "4 m/s²", "5 m/s²"],
        correct: 0,
        explanation: "ত্বরণ = (চূড়ান্ত বেগ - প্রাথমিক বেগ) / সময় = (20 - 10) / 5 = 2 m/s²"
    },
    {
        question: "একটি বস্তু স্থির অবস্থা থেকে শুরু করে 4 m/s² ত্বরণে চলছে। 5 সেকেন্ড পর এর বেগ কত হবে?",
        options: ["10 m/s", "15 m/s", "20 m/s", "25 m/s"],
        correct: 2,
        explanation: "v = u + at = 0 + (4 × 5) = 20 m/s"
    },
    {
        question: "একটি বস্তু 15 m/s বেগে চলছে। যদি এর ত্বরণ 3 m/s² হয়, তাহলে 4 সেকেন্ড পর এর বেগ কত হবে?",
        options: ["23 m/s", "27 m/s", "30 m/s", "33 m/s"],
        correct: 1,
        explanation: "v = u + at = 15 + (3 × 4) = 27 m/s"
    },
    {
        question: "একটি বস্তু 20 m/s বেগে চলছে। যদি এটি 5 m/s² ত্বরণে থামে, তাহলে কত সময়ে থামবে?",
        options: ["2 s", "3 s", "4 s", "5 s"],
        correct: 2,
        explanation: "v = u + at => 0 = 20 + (-5)t => t = 4 s"
    },
    {
        question: "একটি বস্তু 8 m/s² ত্বরণে চলছে। 3 সেকেন্ডে এটি কত দূরত্ব অতিক্রম করবে যদি প্রাথমিক বেগ 5 m/s হয়?",
        options: ["42 m", "51 m", "57 m", "63 m"],
        correct: 2,
        explanation: "s = ut + ½at² = (5×3) + ½(8×9) = 15 + 36 = 51 m"
    },
    {
        question: "একটি বস্তু 12 m/s বেগে চলছে। যদি এর ত্বরণ -2 m/s² হয়, তাহলে কত সময়ে এর বেগ শূন্য হবে?",
        options: ["4 s", "5 s", "6 s", "7 s"],
        correct: 2,
        explanation: "v = u + at => 0 = 12 + (-2)t => t = 6 s"
    },
    {
        question: "একটি বস্তু 6 m/s² ত্বরণে চলছে। 4 সেকেন্ডে এটি 80 m দূরত্ব অতিক্রম করলে, প্রাথমিক বেগ কত ছিল?",
        options: ["8 m/s", "10 m/s", "12 m/s", "14 m/s"],
        correct: 0,
        explanation: "s = ut + ½at² => 80 = u(4) + ½(6×16) => 80 = 4u + 48 => u = 8 m/s"
    },
    {
        question: "একটি বস্তু 10 m/s বেগে চলছে। যদি এটি 2 m/s² ত্বরণে 6 সেকেন্ড চলতে থাকে, তাহলে চূড়ান্ত বেগ কত হবে?",
        options: ["18 m/s", "20 m/s", "22 m/s", "24 m/s"],
        correct: 2,
        explanation: "v = u + at = 10 + (2 × 6) = 22 m/s"
    },
    {
        question: "একটি বস্তু স্থির অবস্থা থেকে শুরু করে 5 m/s² ত্বরণে চলছে। 6 সেকেন্ডে এটি কত দূরত্ব অতিক্রম করবে?",
        options: ["60 m", "75 m", "90 m", "105 m"],
        correct: 2,
        explanation: "s = ut + ½at² = 0 + ½(5×36) = 90 m"
    },
    {
        question: "একটি বস্তু 15 m/s বেগে চলছে। যদি এর ত্বরণ -3 m/s² হয়, তাহলে 5 সেকেন্ড পর এর বেগ কত হবে?",
        options: ["0 m/s", "3 m/s", "5 m/s", "7 m/s"],
        correct: 0,
        explanation: "v = u + at = 15 + (-3 × 5) = 0 m/s"
    }
];

// Quiz State
let currentQuestion = 0;
let answers = {}; // { questionIndex: selectedOption }
let markedForReview = new Set();
let timeRemaining = 30 * 60; // 30 minutes in seconds
let timerInterval = null;

// Initialize Quiz
function initQuiz() {
    renderQuestion();
    renderQuestionDots();
    renderQuestionList();
    updateSummary();
    startTimer();
}

// Render Current Question
function renderQuestion() {
    const question = quizData[currentQuestion];
    const totalQuestions = quizData.length;
    
    // Update question number and text
    document.getElementById('currentQuestionNumber').textContent = currentQuestion + 1;
    document.getElementById('questionText').textContent = question.question;
    document.getElementById('totalQuestions').textContent = totalQuestions;
    document.getElementById('summaryTotal').textContent = totalQuestions;
    
    // Render options
    const optionsContainer = document.getElementById('optionsContainer');
    optionsContainer.innerHTML = '';
    
    question.options.forEach((option, index) => {
        const optionCard = document.createElement('div');
        optionCard.className = `option-card p-4 border-2 border-slate-200 rounded-lg cursor-pointer ${
            answers[currentQuestion] === index ? 'selected' : ''
        }`;
        optionCard.innerHTML = `
            <div class="flex items-center space-x-3">
                <div class="w-8 h-8 rounded-full border-2 border-slate-300 flex items-center justify-center font-semibold ${
                    answers[currentQuestion] === index ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-slate-700'
                }">
                    ${String.fromCharCode(65 + index)}
                </div>
                <span class="text-slate-900 font-medium">${option}</span>
            </div>
        `;
        
        optionCard.addEventListener('click', () => selectOption(index));
        optionsContainer.appendChild(optionCard);
    });
    
    // Update navigation buttons
    document.getElementById('prevBtn').disabled = currentQuestion === 0;
    document.getElementById('nextBtn').style.display = currentQuestion === totalQuestions - 1 ? 'none' : 'flex';
    document.getElementById('submitSection').classList.toggle('hidden', currentQuestion !== totalQuestions - 1);
    
    // Update progress
    updateProgress();
    updateQuestionDots();
    updateQuestionList();
}

// Select Option
function selectOption(optionIndex) {
    answers[currentQuestion] = optionIndex;
    renderQuestion();
    updateSummary();
}

// Clear Answer
function clearAnswer() {
    delete answers[currentQuestion];
    markedForReview.delete(currentQuestion);
    renderQuestion();
    updateSummary();
}

// Mark for Review
function markForReview() {
    if (markedForReview.has(currentQuestion)) {
        markedForReview.delete(currentQuestion);
    } else {
        markedForReview.add(currentQuestion);
    }
    updateSummary();
    updateQuestionDots();
    updateQuestionList();
}

// Navigate Questions
function nextQuestion() {
    if (currentQuestion < quizData.length - 1) {
        currentQuestion++;
        renderQuestion();
    }
}

function prevQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        renderQuestion();
    }
}

function goToQuestion(questionIndex) {
    currentQuestion = questionIndex;
    renderQuestion();
}

// Update Progress
function updateProgress() {
    const progress = ((currentQuestion + 1) / quizData.length) * 100;
    document.getElementById('progressBar').style.width = progress + '%';
    document.getElementById('progressText').textContent = `${currentQuestion + 1}/${quizData.length}`;
}

// Render Question Dots
function renderQuestionDots() {
    const dotsContainer = document.getElementById('questionDots');
    dotsContainer.innerHTML = '';
    
    quizData.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.className = `w-3 h-3 rounded-full cursor-pointer transition-all duration-200 ${
            index === currentQuestion ? 'bg-indigo-600' : 'bg-slate-300'
        }`;
        dot.addEventListener('click', () => goToQuestion(index));
        dotsContainer.appendChild(dot);
    });
}

// Update Question Dots
function updateQuestionDots() {
    const dots = document.querySelectorAll('#questionDots > div');
    dots.forEach((dot, index) => {
        const hasAnswer = answers[index] !== undefined;
        const isMarked = markedForReview.has(index);
        
        if (index === currentQuestion) {
            dot.className = 'w-3 h-3 rounded-full cursor-pointer bg-indigo-600';
        } else if (hasAnswer) {
            dot.className = 'w-3 h-3 rounded-full cursor-pointer bg-green-600';
        } else if (isMarked) {
            dot.className = 'w-3 h-3 rounded-full cursor-pointer bg-amber-600';
        } else {
            dot.className = 'w-3 h-3 rounded-full cursor-pointer bg-slate-300';
        }
    });
}

// Render Question List
function renderQuestionList() {
    const listContainer = document.getElementById('questionList');
    listContainer.innerHTML = '';
    
    quizData.forEach((_, index) => {
        const questionBtn = document.createElement('button');
        const hasAnswer = answers[index] !== undefined;
        const isMarked = markedForReview.has(index);
        
        questionBtn.className = `w-10 h-10 rounded-lg font-semibold text-sm transition-all duration-200 ${
            index === currentQuestion 
                ? 'bg-indigo-600 text-white' 
                : hasAnswer 
                    ? 'bg-green-600 text-white' 
                    : isMarked 
                        ? 'bg-amber-600 text-white' 
                        : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
        }`;
        questionBtn.textContent = index + 1;
        questionBtn.addEventListener('click', () => goToQuestion(index));
        listContainer.appendChild(questionBtn);
    });
}

// Update Question List
function updateQuestionList() {
    const questionBtns = document.querySelectorAll('#questionList > button');
    questionBtns.forEach((btn, index) => {
        const hasAnswer = answers[index] !== undefined;
        const isMarked = markedForReview.has(index);
        
        if (index === currentQuestion) {
            btn.className = 'w-10 h-10 rounded-lg font-semibold text-sm bg-indigo-600 text-white';
        } else if (hasAnswer) {
            btn.className = 'w-10 h-10 rounded-lg font-semibold text-sm bg-green-600 text-white';
        } else if (isMarked) {
            btn.className = 'w-10 h-10 rounded-lg font-semibold text-sm bg-amber-600 text-white';
        } else {
            btn.className = 'w-10 h-10 rounded-lg font-semibold text-sm bg-slate-200 text-slate-700 hover:bg-slate-300';
        }
    });
}

// Update Summary
function updateSummary() {
    const answered = Object.keys(answers).length;
    const marked = markedForReview.size;
    const unanswered = quizData.length - answered;
    
    document.getElementById('summaryAnswered').textContent = answered;
    document.getElementById('summaryMarked').textContent = marked;
    document.getElementById('summaryUnanswered').textContent = unanswered;
}

// Timer
function startTimer() {
    updateTimerDisplay();
    timerInterval = setInterval(() => {
        timeRemaining--;
        updateTimerDisplay();
        
        if (timeRemaining <= 0) {
            clearInterval(timerInterval);
            autoSubmit();
        }
    }, 1000);
}

function updateTimerDisplay() {
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    document.getElementById('timer').textContent = timeString;
    
    // Change color when time is running out
    if (timeRemaining <= 300) { // 5 minutes
        document.getElementById('timer').parentElement.classList.add('bg-red-100');
        document.getElementById('timer').classList.add('text-red-700');
    }
}

// Submit Quiz
function showSubmitModal() {
    const answered = Object.keys(answers).length;
    const unanswered = quizData.length - answered;
    
    document.getElementById('modalAnsweredCount').textContent = answered;
    document.getElementById('modalUnansweredCount').textContent = unanswered;
    document.getElementById('submitModal').classList.remove('hidden');
}

function hideSubmitModal() {
    document.getElementById('submitModal').classList.add('hidden');
}

function submitQuiz() {
    clearInterval(timerInterval);
    
    // Calculate score
    let correct = 0;
    quizData.forEach((question, index) => {
        if (answers[index] === question.correct) {
            correct++;
        }
    });
    
    const score = correct;
    const total = quizData.length;
    const percentage = Math.round((score / total) * 100);
    
    // Store results in sessionStorage
    sessionStorage.setItem('quizResults', JSON.stringify({
        score,
        total,
        percentage,
        answers,
        quizData,
        timeSpent: 30 * 60 - timeRemaining
    }));
    
    // Redirect to results page
    window.location.href = 'quiz-results.html';
}

function autoSubmit() {
    alert('সময় শেষ! কুইজ স্বয়ংক্রিয়ভাবে সাবমিট করা হচ্ছে...');
    submitQuiz();
}

// Event Listeners
document.getElementById('nextBtn').addEventListener('click', nextQuestion);
document.getElementById('prevBtn').addEventListener('click', prevQuestion);
document.getElementById('markBtn').addEventListener('click', markForReview);
document.getElementById('clearBtn').addEventListener('click', clearAnswer);
document.getElementById('submitBtn').addEventListener('click', showSubmitModal);
document.getElementById('confirmSubmit').addEventListener('click', submitQuiz);
document.getElementById('cancelSubmit').addEventListener('click', hideSubmitModal);

// Close modal on outside click
document.getElementById('submitModal').addEventListener('click', (e) => {
    if (e.target.id === 'submitModal') {
        hideSubmitModal();
    }
});

// Initialize on page load
initQuiz();

