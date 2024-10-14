const questions = [
    {
        question: "Which gas makes up the majority of the Earth's atmosphere?",
        answers: [
            {text: "Oxygen", correct: false},
            {text: "Nitrogen", correct: true},
            {text: "Carbon Dioxide", correct: false},
            {text: "Argon", correct: false},
        ]
    },
    {
        question: "What is the chemical symbol for Gold?",
        answers: [
            {text: "Ag", correct: false},
            {text: "Ga", correct: false},
            {text: "Gd", correct: false},
            {text: "Au", correct: true},
        ]
    },
    {
        question: "What type of bond is formed between water molecules?",
        answers: [
            {text: "Covalent bond", correct: false},
            {text: "Ionic bond", correct: false},
            {text: "Hydrogen bond", correct: true},
            {text: "Metallic bond", correct: false},
        ]
    },
    {
        question: "Which part of the cell is responsible for generating energy?",
        answers: [
            {text: "Mitochondria", correct: true},
            {text: "Nucleus", correct: false},
            {text: "Endoplasmic Reticulum", correct: false},
            {text: "Golgi Apparatus", correct: false},
        ]
    },
    {
        question: "What is the pH level of pure water?",
        answers: [
            {text: "5", correct: false},
            {text: "7", correct: true},
            {text: "9", correct: false},
            {text: "4", correct: false},
        ]
    },
    {
        question: "Which planet is known as the 'Red Planet'?",
        answers: [
            {text: "Venus", correct: false},
            {text: "Mercury", correct: false},
            {text: "Jupiter", correct: false},
            {text: "Mars", correct: true},
        ]
    },
    {
        question: "Which scientist is known for developing the theory of evolution by natural selection?",
        answers: [
            {text: "Isaac Newton", correct: false},
            {text: "Charles Darwin", correct: true},
            {text: "Albert Einstein", correct: false},
            {text: "Galileo Galilei", correct: false},
        ]
    },
    {
        question: "What type of reaction occurs when an acid reacts with a base to produce a salt and water?",
        answers: [
            {text: "Redox reaction", correct: false},
            {text: "Neutralization reaction", correct: true},
            {text: "Decomposition reaction", correct: false},
            {text: "Synthesis reaction", correct: false},
        ]
    },
    {
        question: "What is the most abundant element in the universe?",
        answers: [
            {text: "Oxygen", correct: false},
            {text: "Carbon", correct: false},
            {text: "Helium", correct: false},
            {text: "Hydrogen", correct: true},
        ]
    },
    {
        question: "Which organ in the human body is primarily responsible for filtering blood?",
        answers: [
            {text: "Heart", correct: false},
            {text: "Liver", correct: false},
            {text: "Kidneys", correct: true},
            {text: "Lungs", correct: false},
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

          // Create the emoji element
          const emoji = document.createElement("span");
          emoji.innerHTML = "🎉"; // You can use any emoji you like
          emoji.classList.add("emoji-pop");
  
          // Append the emoji to the button
          selectedBtn.appendChild(emoji);
  
          // Automatically remove the emoji after the animation
          setTimeout(() => {
              emoji.remove();
          }, 800); // Match the duration of the animation in the CS
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