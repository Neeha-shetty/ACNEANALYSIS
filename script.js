// Main JavaScript functionality

function startQuiz() {
    // Redirect to quiz page
    window.location.href = 'pages/quiz.html';
}

// Quiz functionality
let currentQuestion = 0;
let userAnswers = [];

const quizQuestions = [
    {
        question: "What's your MAIN skin concern?",
        options: [
            "Blackheads/whiteheads (small bumps, not inflamed)",
            "Red bumps (inflamed, painful)",
            "Pus-filled pimples (white or yellow heads)",
            "Painful lumps under the skin (deep, cystic)"
        ],
        type: "primary"
    },
    {
        question: "Where is your acne primarily located?",
        options: [
            "Forehead only",
            "Cheeks only", 
            "Chin and jawline",
            "All over face",
            "Back and chest"
        ],
        type: "location"
    },
    {
        question: "How would you describe your skin?",
        options: [
            "Very oily and shiny",
            "Combination (oily T-zone, dry cheeks)",
            "Normal (not too oily, not too dry)",
            "Dry and flaky"
        ],
        type: "skinType"
    }
];

function loadQuestion() {
    if (currentQuestion >= quizQuestions.length) {
        showResults();
        return;
    }

    const question = quizQuestions[currentQuestion];
    const quizContainer = document.getElementById('quiz-container');
    
    quizContainer.innerHTML = `
        <div class="question">
            <h2>Question ${currentQuestion + 1}/${quizQuestions.length}</h2>
            <p>${question.question}</p>
            <div class="options">
                ${question.options.map((option, index) => `
                    <button class="option-btn" onclick="selectOption(${index})">
                        ${option}
                    </button>
                `).join('')}
            </div>
        </div>
        <div class="progress">
            <div class="progress-bar" style="width: ${((currentQuestion + 1) / quizQuestions.length) * 100}%"></div>
        </div>
    `;
}

function selectOption(optionIndex) {
    userAnswers.push(optionIndex);
    currentQuestion++;
    loadQuestion();
}

function showResults() {
    // Simple result logic - you can expand this
    const primaryConcern = userAnswers[0];
    let result = "";
    
    if (primaryConcern === 0) {
        result = "COMEDONAL ACNE - Focus on salicylic acid and retinoids";
    } else if (primaryConcern === 1 || primaryConcern === 2) {
        result = "INFLAMMATORY ACNE - Benzoyl peroxide and anti-inflammatory ingredients may help";
    } else {
        result = "SEVERE/CYSTIC ACNE - We strongly recommend consulting a dermatologist";
    }
    
    const quizContainer = document.getElementById('quiz-container');
    quizContainer.innerHTML = `
        <div class="results">
            <h2>Your Assessment Results</h2>
            <div class="result-card">
                <h3>${result}</h3>
                <p>Based on your answers, here's our recommendation:</p>
                <ul>
                    <li>Start with gentle, consistent routine</li>
                    <li>Introduce one new product at a time</li>
                    <li>Always use sunscreen during daytime</li>
                    <li>Be patient - results take 6-8 weeks</li>
                </ul>
                <div class="disclaimer">
                    <strong>Remember:</strong> This is general educational guidance. For personalized treatment, please consult a dermatologist.
                </div>
            </div>
            <button class="cta-button" onclick="window.location.href='../treatments.html'">
                View Detailed Treatment Guide
            </button>
        </div>
    `;
}

// Initialize quiz if on quiz page
if (window.location.pathname.includes('quiz.html')) {
    document.addEventListener('DOMContentLoaded', loadQuestion);
}