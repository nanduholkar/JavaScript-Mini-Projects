document.addEventListener("DOMContentLoaded",() => {

  const startBtn = document.getElementById("start-btn")
  const nextBtn = document.getElementById("next-btn")
  const restartBtn = document.getElementById("restart-btn")
  const questionContainer = document.getElementById("question-container")
  const questionText = document.getElementById("question-text")
  const choicesList = document.getElementById("choices-list")
  const resultContainer = document.getElementById("result-container")
  const scoreDisplay = document.getElementById('score')

  const questions = [
    {
      question: "what is the capital of France ?",
      choices: ["paris", "london", "Berlin", "Madrid" ],
      answer : "paris",
    },
    {
    question: "Which planet is known as the Red Planet ?",
    choices: ["Mars", "Venus", "Jupiter", "Saturn"],
    answer: "Mars",
  },
  {
    question: "Who wrote 'Hamlet' ?",
    choices: [
      "Charles Dickens",
      "Jane Austen",
      "William Shakespeare",
      "Mark Twain",
    ],
    answer: "William Shakespeare",
  },
  ]

  let currentQuestionIndex = 0; 

  startBtn.addEventListener("click",startQuiz)
  
  function startQuiz(){
    startBtn.classList.add('hidden')
    questionContainer.classList.remove('hidden')
    showQuestion()
  }


  let score = 0;


  function showQuestion(){
    const currentQuestion = questions[currentQuestionIndex]
    questionText.textContent =currentQuestion.question;
    choicesList.innerHTML="";
    nextBtn.classList.add('hidden')
    currentQuestion.choices.forEach((choice) => {
      const li = document.createElement('li')
      li.textContent = choice
      choicesList.appendChild(li)
      li.addEventListener('click',() =>{
        const correctAnswer = currentQuestion.answer
        if(choice === correctAnswer){
          score++;
          li.style.backgroundColor = 'green';
        }
        else{ li.style.backgroundColor = "red"}
        nextBtn.classList.remove("hidden")
        // disable all options after one click
        Array.from(choicesList.children).forEach(li => {
        li.style.pointerEvents = "none";
        })
      })
    })
  }

  nextBtn.addEventListener('click',() => {
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
      showQuestion()
    }
    else{
      showScore()
    }
  })
  
  
  function showScore(){
    questionContainer.classList.add("hidden")
    resultContainer.classList.remove('hidden')
    scoreDisplay.textContent = `${score} out of ${questions.length}`
  }
  restartBtn.addEventListener('click',() => {
    resultContainer.classList.add("hidden")
    questionContainer.classList.add("hidden")
    score =0
    currentQuestionIndex =0
    startBtn.classList.remove("hidden")
    
    

  })


})