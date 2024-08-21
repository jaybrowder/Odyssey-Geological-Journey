const quizData = [
    {
        question: "What did Jayden find in the rocks that surprised him?",
        answers: {
            a: "Dinosaur bones",
            b: "Gold nuggets",
            c: "Seashell fossils",
            d: "Ancient tools"
        },
        correctAnswer: "c",
        feedback: {
            correct: "That's right! Jayden found seashell fossils in the rocks, which was surprising because they were high up in the mountains.",
            incorrect: "Not quite. Jayden found seashell fossils in the rocks, which was surprising because they were high up in the mountains."
        }
    },
    {
        question: "What caused the seafloor to become the Appalachian Mountains?",
        answers: {
            a: "Volcanic eruptions",
            b: "Earthquakes",
            c: "Tectonic plates colliding",
            d: "Strong winds"
        },
        correctAnswer: "c",
        feedback: {
            correct: "Excellent! Tectonic plates colliding over millions of years pushed the seafloor up to form the Appalachian Mountains.",
            incorrect: "The correct answer is tectonic plates colliding. Over millions of years, this process pushed the seafloor up to form the Appalachian Mountains."
        }
    },
    {
        question: "What was the name of the supercontinent that Ms. Rodriguez mentioned?",
        answers: {
            a: "Atlantis",
            b: "Pangea",
            c: "Gondwana",
            d: "Eurasia"
        },
        correctAnswer: "b",
        feedback: {
            correct: "Great job! Pangea was the supercontinent where all of Earth's landmasses were once connected.",
            incorrect: "Actually, the supercontinent Ms. Rodriguez mentioned was Pangea. This was when all of Earth's landmasses were connected."
        }
    },
    {
        question: "What two things drive the water cycle?",
        answers: {
            a: "Wind and rain",
            b: "Sun's energy and gravity",
            c: "Mountains and oceans",
            d: "Plants and animals"
        },
        correctAnswer: "b",
        feedback: {
            correct: "Correct! The sun's energy causes evaporation, and gravity pulls the water back down as rain.",
            incorrect: "The correct answer is the sun's energy and gravity. The sun causes evaporation, and gravity brings the water back down as rain."
        }
    },
    {
        question: "What can cause rockfalls and landslides in the mountains?",
        answers: {
            a: "Animals digging",
            b: "Trees growing",
            c: "Water freezing in rock cracks",
            d: "Wind blowing"
        },
        correctAnswer: "c",
        feedback: {
            correct: "Well done! Water can seep into cracks in the rocks, and when it freezes, it expands and can cause rockfalls and landslides.",
            incorrect: "The correct answer is water freezing in rock cracks. This process can expand the cracks over time and lead to rockfalls and landslides."
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
