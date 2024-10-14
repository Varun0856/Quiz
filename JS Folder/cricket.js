const questions = [
    {
        question: "Who is the first cricketer to score 10,000 runs in Test cricket?",
        answers: [
            {text: "Ricky Pointing", correct: false},
            {text: "Brian Lara", correct: false},
            {text: "Sachin Tendulkar", correct: false},
            {text: "Sunil Gavaskar", correct: true},
        ]
    },
    {
        question: "Which bowler holds the record for the most Test wickets in a calendar year?",
        answers: [
            {text: "Muttiah Muralitharan", correct: true},
            {text: "Shane Warne", correct: false},
            {text: "James Anderson", correct: false},
            {text: "Dennis Lillee", correct: false},
        ]
    },
    {
        question: "Who was the first batsman to score 4 centuries in a single ICC World Cup Tournament?",
        answers: [
            {text: "Rohit Sharma", correct: false},
            {text: "Kumar Sangakkara", correct: true},
            {text: "Mahela Jayawardene", correct: false},
            {text: "AB de Villiers", correct: false},
        ]
    },
    {
        question: "Which team holds the record for the highest total in a Test innings?",
        answers: [
            {text: "Australia", correct: false},
            {text: "Sri Lanka", correct: true},
            {text: "England", correct: false},
            {text: "India", correct: false},
        ]
    },
    {
        question: "Who was the first bowler to take a hat-trick in a Cricket World Cup?",
        answers: [
            {text: "Chetan Sharma", correct: true},
            {text: "Lasith Malinga", correct: false},
            {text: "Trent Boult", correct: false},
            {text: "Brett Lee", correct: false},
        ]
    },
    {
        question: "In which year did South Africa return to international cricket after the apartheid ban?",
        answers: [
            {text: "1990", correct: false},
            {text: "1991", correct: false},
            {text: "1992", correct: true},
            {text: "1994", correct: false},
        ]
    },
    {
        question: "Who was the first player to score centuries in both innings of a Test match on debut?",
        answers: [
            {text: "Yasir Hameed", correct: false},
            {text: "Alvin Kallicharran", correct: false},
            {text: "Greg Chappell", correct: false},
            {text: "Lawrence Rowe", correct: true},
        ]
    },
    {
        question: "Who holds the record for the fastest Test triple century(in terms of balls faced)?",
        answers: [
            {text: "Virender Sehwag", correct: true},
            {text: "Brain Lara", correct: false},
            {text: "Chris Gayle", correct: false},
            {text: "Don Bradman", correct: false},
        ]
    },
    {
        question: "In which match did Virat Kohli become the fastest player to score 11,000 runs in ODI cricket?",
        answers: [
            {text: "2019 World Cup match vs Australia", correct: false},
            {text: "2019 World Cup match vs South Africa", correct: false},
            {text: "2019 World Cup match vs Pakistan", correct: true},
            {text: "2019 World Cup match vs West Indies", correct: false},
        ]
    },
    {
        question: "MS Dhoni is the only captain to win all ICC trophies. In which year did he achieve this feat after winning the ICC Champions Trophy?",
        answers: [
            {text: "2011", correct: false},
            {text: "2013", correct: true},
            {text: "2015", correct: false},
            {text: "2017", correct: false},
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
