const questions = [
    {
        question: "Which Indian state is the largest producer of coffee?",
        answers: [
            {text: "Kerala", correct: false},
            {text: "Tamil Nadu", correct: false},
            {text: "Karnataka", correct: true},
            {text: "Andhra Pradesh", correct: false},
        ]
    },
    {
        question: "What is the largest desert in the world outside of the polar regions?",
        answers: [
            {text: "Kalahari Desert", correct: false},
            {text: "Gobi Desert", correct: false},
            {text: "Arabian Desert", correct: false},
            {text: "Sahara Desert", correct: true},
        ]
    },
    {
        question: "Which of the following animals can sleep standing up but only dream when lying down?",
        answers: [
            {text: "Elephant", correct: false},
            {text: "Cow", correct: false},
            {text: "Horse", correct: true},
            {text: "Giraffe", correct: false},
        ]
    },
    {
        question: "Which ocean trench is the deepest point on Earth?",
        answers: [
            {text: "Tonga Trench", correct: false},
            {text: "Mariana Trench", correct: true},
            {text: "Java Trench", correct: false},
            {text: "Kurli-Kamchatka Trench", correct: false},
        ]
    },
    {
        question: "Which is the oldest known inhabited city in the world?",
        answers: [
            {text: "Athens", correct: false},
            {text: "Damascus", correct: true},
            {text: "Cairo", correct: false},
            {text: "Jerusalemn", correct: false},
        ]
    },
    {
        question: "What is the only sea in the world with no coastline?",
        answers: [
            {text: "Baltic Sea", correct: false},
            {text: "Sargasso Sea", correct: false},
            {text: "Arabian Sea", correct: true},
            {text: "Andaman Sea", correct: false},
        ]
    },
    {
        question: "Which of these is the largest species of shark?",
        answers: [
            {text: "Great White Shark", correct: false},
            {text: "Tiger Shark", correct: false},
            {text: "Whale Shark", correct: true},
            {text: "Hammerhead Shark", correct: false},
        ]
    },
    {
        question: "Which ancient civilization built the city of Machu Picchu?",
        answers: [
            {text: "Inca", correct: true},
            {text: "Aztec", correct: false},
            {text: "Olmec", correct: false},
            {text: "Mayan", correct: false},
        ]
    },
    {
        question: "Which mountain is the tallest in the world from base to peak (including underwater)?",
        answers: [
            {text: "Mount Everest", correct: false},
            {text: "Mauna Kea", correct: true},
            {text: "K2", correct: false},
            {text: "Kilimanjaro", correct: false},
        ]
    },
    {
        question: "The Kaziranga National Park is famous for the conservation of which animal species?",
        answers: [
            {text: "Bengal Tiger", correct: false},
            {text: "Asiatic Lion", correct: false},
            {text: "Indian Elephant", correct: false},
            {text: "One-horned Rhinoceros", correct: true},
        ]
    }
]

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer)
    })

}

function resetState(){
    nextButton.style.display = "none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}
nextButton.addEventListener("click", () => {
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})
startQuiz();