// Get results from sessionStorage
const resultsData = JSON.parse(sessionStorage.getItem('quizResults') || '{}');

if (!resultsData.quizData) {
    // Redirect to quiz if no results
    window.location.href = 'quiz.html';
}

// Display Results
function displayResults() {
    const { score, total, percentage, answers, quizData, timeSpent } = resultsData;
    
    // Update score displays
    document.getElementById('scoreDisplay').textContent = score;
    document.getElementById('totalQuestionsDisplay').textContent = `/ ${total}`;
    document.getElementById('percentageDisplay').textContent = percentage + '%';
    
    // Calculate time
    const minutes = Math.floor(timeSpent / 60);
    const seconds = timeSpent % 60;
    document.getElementById('timeDisplay').textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    
    // Calculate correct and incorrect
    let correct = 0;
    let incorrect = 0;
    
    quizData.forEach((question, index) => {
        if (answers[index] === question.correct) {
            correct++;
        } else if (answers[index] !== undefined) {
            incorrect++;
        }
    });
    
    document.getElementById('correctCount').textContent = correct;
    document.getElementById('incorrectCount').textContent = incorrect;
    
    // Display detailed results
    displayDetailedResults();
}

// Display Detailed Results
function displayDetailedResults() {
    const { answers, quizData } = resultsData;
    const container = document.getElementById('detailedResults');
    container.innerHTML = '';
    
    quizData.forEach((question, index) => {
        const userAnswer = answers[index];
        const isCorrect = userAnswer === question.correct;
        const hasAnswer = userAnswer !== undefined;
        
        const resultCard = document.createElement('div');
        resultCard.className = `border-2 rounded-lg p-6 ${
            isCorrect ? 'border-green-200 bg-green-50' : 
            hasAnswer ? 'border-red-200 bg-red-50' : 
            'border-slate-200 bg-slate-50'
        }`;
        
        resultCard.innerHTML = `
            <div class="flex items-start justify-between mb-4">
                <div class="flex items-center space-x-3">
                    <div class="w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                        isCorrect ? 'bg-green-600 text-white' : 
                        hasAnswer ? 'bg-red-600 text-white' : 
                        'bg-slate-300 text-slate-700'
                    }">
                        ${index + 1}
                    </div>
                    <div>
                        <h3 class="font-semibold text-slate-900">প্রশ্ন ${index + 1}</h3>
                        <div class="flex items-center space-x-2 mt-1">
                            ${isCorrect ? 
                                '<span class="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">সঠিক</span>' : 
                                hasAnswer ? 
                                    '<span class="px-2 py-1 bg-red-100 text-red-700 rounded text-xs font-medium">ভুল</span>' : 
                                    '<span class="px-2 py-1 bg-slate-100 text-slate-700 rounded text-xs font-medium">অনুত্তরিত</span>'
                            }
                            <span class="text-xs text-slate-500">মান: ১</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <p class="text-slate-900 font-medium mb-4">${question.question}</p>
            
            <div class="space-y-2 mb-4">
                ${question.options.map((option, optIndex) => {
                    let optionClass = 'p-3 rounded-lg border-2 ';
                    let icon = '';
                    
                    if (optIndex === question.correct) {
                        optionClass += 'border-green-500 bg-green-100';
                        icon = '<svg class="w-5 h-5 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>';
                    } else if (userAnswer === optIndex && !isCorrect) {
                        optionClass += 'border-red-500 bg-red-100';
                        icon = '<svg class="w-5 h-5 text-red-600 mr-2" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path></svg>';
                    } else if (userAnswer === optIndex) {
                        optionClass += 'border-indigo-500 bg-indigo-100';
                    } else {
                        optionClass += 'border-slate-200 bg-white';
                    }
                    
                    return `
                        <div class="${optionClass}">
                            <div class="flex items-center">
                                ${icon}
                                <span class="font-medium text-slate-900">${String.fromCharCode(65 + optIndex)}. ${option}</span>
                                ${optIndex === question.correct ? '<span class="ml-auto text-xs text-green-700 font-medium">সঠিক উত্তর</span>' : ''}
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
            
            ${question.explanation ? `
                <div class="mt-4 p-4 bg-blue-50 border-l-4 border-blue-500 rounded">
                    <div class="flex items-start">
                        <svg class="w-5 h-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path>
                        </svg>
                        <div>
                            <p class="text-sm font-semibold text-blue-900 mb-1">ব্যাখ্যা:</p>
                            <p class="text-sm text-blue-800">${question.explanation}</p>
                        </div>
                    </div>
                </div>
            ` : ''}
        `;
        
        container.appendChild(resultCard);
    });
}

// Initialize on page load
displayResults();

