const quizData = [
    {
        question: "What is the main type of rock found around Lake Jocassee?",
        answers: {
            a: "Sandstone",
            b: "Limestone",
            c: "Henderson Gneiss",
            d: "Granite"
        },
        correctAnswer: "c",
        feedback: {
            correct: "That's right! Henderson Gneiss is the major rock type found around Lake Jocassee.",
            incorrect: "Not quite. The main rock type found around Lake Jocassee is Henderson Gneiss."
        }
    },
    {
        question: "What process transformed the original igneous rock into gneiss?",
        answers: {
            a: "Erosion",
            b: "Metamorphism",
            c: "Sedimentation",
            d: "Weathering"
        },
        correctAnswer: "b",
        feedback: {
            correct: "Correct! Metamorphism, which involves intense heat and pressure, transformed the original igneous rock into gneiss.",
            incorrect: "The correct answer is metamorphism. This process, involving intense heat and pressure, transformed the original igneous rock into gneiss."
        }
    },
    {
        question: "What are the straight lines cutting across the rock called?",
        answers: {
            a: "Planar fractures or joints",
            b: "Quartz veins",
            c: "Fossils",
            d: "Crystals"
        },
        correctAnswer: "a",
        feedback: {
            correct: "Great job! The straight lines cutting across the rock are called planar fractures or joints.",
            incorrect: "Actually, those straight lines are called planar fractures or joints. They're weak points in the rock where water can seep in."
        }
    },
    {
        question: "How does water in rock cracks contribute to weathering?",
        answers: {
            a: "It dissolves the rock",
            b: "It freezes and expands, making cracks bigger",
            c: "It attracts plants that break the rock",
            d: "It creates fossils"
        },
        correctAnswer: "b",
        feedback: {
            correct: "Excellent! When water freezes in rock cracks, it expands and makes the cracks bigger over time. This is called the freeze-thaw process.",
            incorrect: "The correct answer is that water freezes and expands, making cracks bigger. This freeze-thaw process is a way that rocks weather and break down over time."
        }
    },
    {
        question: "What are the white streaks in the rock called?",
        answers: {
            a: "Fossils",
            b: "Quartz veins",
            c: "Chalk lines",
            d: "Ice streaks"
        },
        correctAnswer: "b",
        feedback: {
            correct: "Well done! The white streaks in the rock are called quartz veins. They formed when hot, mineral-rich fluids cooled in cracks in the rock.",
            incorrect: "Actually, those white streaks are called quartz veins. They formed when hot, mineral-rich fluids cooled in cracks in the rock."
        }
    }
];

function buildQuiz() {
    const output = [];

    quizData.forEach((questionData, questionNumber) => {
        const answers = [];

        for (letter in questionData.answers) {
            answers.push(
                `<label>
                    <input type="radio" name="question${questionNumber}" value="${letter}">
                    ${letter} : ${questionData.answers[letter]}
                </label>`
            );
        }

        output.push(
            `<div class="question-container">
                <div class="question">
                    <h2>Question ${questionNumber + 1}</h2>
                    <p>${questionData.question}</p>
                </div>
                <div class="answers">${answers.join('')}</div>
                <div class="feedback" id="feedback${questionNumber}"></div>
            </div>`
        );
    });

    quizElement.innerHTML = output.join('');

    document.querySelectorAll('input[type="radio"]').forEach(radio => {
        radio.addEventListener('change', handleAnswerSelection);
    });
}

function handleAnswerSelection(e) {
    const selectedAnswer = e.target;
    const questionNumber = parseInt(selectedAnswer.name.replace('question', ''));
    const isCorrect = selectedAnswer.value === quizData[questionNumber].correctAnswer;

    const feedbackElement = document.getElementById(`feedback${questionNumber}`);
    feedbackElement.textContent = isCorrect ? quizData[questionNumber].feedback.correct : quizData[questionNumber].feedback.incorrect;
    feedbackElement.className = `feedback ${isCorrect ? 'correct' : 'incorrect'}`;

    document.querySelectorAll(`input[name="question${questionNumber}"]`).forEach(radio => {
        radio.disabled = true;
    });

    updateResults();
}

function updateResults() {
    let numCorrect = 0;
    quizData.forEach((_, questionNumber) => {
        const selectedAnswer = document.querySelector(`input[name="question${questionNumber}"]:checked`);
        if (selectedAnswer && selectedAnswer.value === quizData[questionNumber].correctAnswer) {
            numCorrect++;
        }
    });

    resultsElement.textContent = `You've answered ${numCorrect} out of ${quizData.length} questions correctly!`;
}

const quizElement = document.getElementById('quiz');
const resultsElement = document.getElementById('results');

buildQuiz();
