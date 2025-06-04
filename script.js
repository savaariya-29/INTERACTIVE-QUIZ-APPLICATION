const questions = [
    {
      question: "What is the capital of France?",
      answers: [
        { text: "Paris", correct: true },
        { text: "Rome", correct: false },
        { text: "Madrid", correct: false },
        { text: "Berlin", correct: false }
      ]
    },
    {
      question: "Which language runs in a web browser?",
      answers: [
        { text: "Java", correct: false },
        { text: "C", correct: false },
        { text: "Python", correct: false },
        { text: "JavaScript", correct: true }
      ]
    },
    {
      question: "Who is the CEO of Tesla?",
      answers: [
        { text: "Jeff Bezos", correct: false },
        { text: "Elon Musk", correct: true },
        { text: "Bill Gates", correct: false },
        { text: "Tony Stark", correct: false }
      ]
    }
  ];
  
  const questionEl = document.getElementById("question");
  const answerButtons = document.getElementById("answer-buttons");
  const nextBtn = document.getElementById("next-btn");
  const feedback = document.getElementById("feedback");
  
  let currentQuestionIndex = 0;
  
  function startQuiz() {
    currentQuestionIndex = 0;
    nextBtn.innerText = "Next";
    showQuestion();
  }
  
  function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    questionEl.innerText = currentQuestion.question;
  
    currentQuestion.answers.forEach(answer => {
      const btn = document.createElement("button");
      btn.innerText = answer.text;
      btn.classList.add("btn");
      btn.addEventListener("click", () => selectAnswer(btn, answer.correct));
      answerButtons.appendChild(btn);
    });
  }
  
  function resetState() {
    nextBtn.style.display = "none";
    feedback.innerText = "";
    while (answerButtons.firstChild) {
      answerButtons.removeChild(answerButtons.firstChild);
    }
  }
  
  function selectAnswer(button, isCorrect) {
    const buttons = answerButtons.children;
    for (let btn of buttons) {
      btn.disabled = true;
      if (btn.innerText === button.innerText) {
        btn.classList.add(isCorrect ? "correct" : "wrong");
      }
    }
  
    feedback.innerText = isCorrect ? "✅ Correct!" : "❌ Wrong!";
    nextBtn.style.display = "inline-block";
  }
  
  nextBtn.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      showQuestion();
    } else {
      showResult();
    }
  });
  
  function showResult() {
    resetState();
    questionEl.innerText = "🎉 Quiz Completed!";
    feedback.innerText = "Thanks for playing!";
    nextBtn.innerText = "Restart";
    nextBtn.style.display = "inline-block";
    nextBtn.onclick = startQuiz;
  }
  
  startQuiz();
  