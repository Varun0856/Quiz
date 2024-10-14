const questions = [
    {
        question: "Which Indian ruler was known as the “Napoleon of India” due to his military campaigns?",
        answers: [
            {text: "Chandragupta Maurya", correct: false},
            {text: "Samudragupta", correct: true},
            {text: "Harshavardhana", correct: false},
            {text: "Pulakeshin ||", correct: false},
        ]
    },
    {
        question: "Who was the founder of the Satavahana dynasty?",
        answers: [
            {text: "Simuka", correct: true},
            {text: "Hala", correct: false},
            {text: "Vashishthiputra Pulumavi", correct: false},
            {text: "Gautamiputra Satakarni", correct: false},
        ]
    },
    {
        question: "The Sangam age refers to the period of ancient Tamil literature compiled during which centuries?",
        answers: [
            {text: "3rd century BCE to 3rd century CE", correct: false},
            {text: "4th century CE to 7th century CE", correct: false},
            {text: "2nd century BCE to 4th century CE", correct: false},
            {text: "1st century CE to 4th century CE", correct: true},
        ]
    },
    {
        question: "The famous rock-cut Kailasa Temple at Ellora was commissioned by which ruler?",
        answers: [
            {text: "Krishna I", correct: true},
            {text: "Narasimhavarman II", correct: false},
            {text: "Rajaraja Chola I", correct: false},
            {text: "Vikramaditya II", correct: false},
        ]
    },
    {
        question: "Which ancient Indian text deals with the performing arts, particularly drama, dance, and music?",
        answers: [
            {text: "Arthashastra", correct: false},
            {text: "Manusmriti", correct: false},
            {text: "Natyashastra", correct: true},
            {text: "Abhinaya Darpana", correct: false},
        ]
    },
    {
        question: "Who was the founder of the Kadamba dynasty, one of the earliest indigenous kingdoms in South India",
        answers: [
            {text: "Kadamba Mayurasharma", correct: true},
            {text: "Pulakeshin I", correct: false},
            {text: "Narasimhavarman", correct: false},
            {text: "Kirtivarman", correct: false},
        ]
    },
    {
        question: "The Vikramashila University, a center of Buddhist learning, was founded by which Pala ruler?",
        answers: [
            {text: "Dharmapala", correct: false},
            {text: "Gopala", correct: true},
            {text: "Devapal", correct: false},
            {text: "Mahipala", correct: false},
        ]
    },
    {
        question: 'The concept of the "Trimurti" in Hinduism refers to which of the following deities?',
        answers: [
            {text: "Brahma, Vishnu, Shiva", correct: true},
            {text: "Indra, Agni, Soma", correct: false},
            {text: "Rama, Krishna, Arjuna", correct: false},
            {text: "Durga, Lakshmi, Saraswati", correct: false},
        ]
    },
    {
        question: "Which Chola ruler is credited with building the Brihadeeswarar Temple in Thanjavur?",
        answers: [
            {text: "Rajendra Chola I", correct: false},
            {text: "Rajaraja Chola I", correct: true},
            {text: "Parantaka Chola I", correct: false},
            {text: " Kulothunga Chola I", correct: false},
        ]
    },
    {
        question: "The Ajanta Caves are primarily associated with which religious tradition?",
        answers: [
            {text: "Hinduism", correct: false},
            {text: "Jainism", correct: false},
            {text: "Buddhism", correct: true},
            {text: "Sikhism", correct: false},
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
