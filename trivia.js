// CLI Trivia Game with Per‑Question Timer
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const questions = [
  { question: "In which continent is the country Kenya?", options: ["A) Asia", "B) Africa", "C) Europe"], answer: "B" },
  { question: "Name the capital city of Kenya", options: ["A) Nairobi", "B) Kisumu", "C) Mombasa"], answer: "A" },
  { question: "The sun rises from?", options: ["A) West", "B) North", "C) East"], answer: "C" }
];

let score = 0;
let currentQuestion = 0;
const questionTimeLimit = 10000; // 10 seconds per question

function askQuestion() {
  if (currentQuestion < questions.length) {
    const q = questions[currentQuestion];
    console.log(`\n${q.question}`);
    q.options.forEach(opt => console.log(opt));

    // Start timer for this question
    const timer = setTimeout(() => {
      console.log("\n Time's up for this question!");
      currentQuestion++;
      askQuestion();
    }, questionTimeLimit);

    rl.question("Your answer: ", (userAnswer) => {
      clearTimeout(timer); // Stop timer if user answers
      if (userAnswer.toUpperCase() === q.answer) {
        console.log("✅ Correct!");
        score++;
      } else {
        console.log("❌ Incorrect!");
      }
      currentQuestion++;
      askQuestion();
    });
  } else {
    endGame();
  }
}

function endGame() {
  console.log(`\nGame Over! Your final score: ${score}/${questions.length}`);
  rl.close();
}

function startGame() {
  console.log("Welcome to the Trivia Game!");
  console.log("You have 10 seconds per question.\n");
  askQuestion();
}

startGame();
