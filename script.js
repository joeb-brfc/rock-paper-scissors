const choices = ["rock", "paper", "scissors"];
const emojis = { rock: "✊", paper: "✋", scissors: "✌️" };

let userWins = 0;
let computerWins = 0;
let rounds = 0;

const choiceButtons = document.querySelectorAll(".choice-btn");
const userPickEl = document.getElementById("user-pick");
const computerPickEl = document.getElementById("computer-pick");
const userScoreEl = document.getElementById("user-score");
const computerScoreEl = document.getElementById("computer-score");
const resultTextEl = document.getElementById("result-text");
const roundsTextEl = document.getElementById("rounds-text");
const userPanel = document.getElementById("user-panel");
const computerPanel = document.getElementById("computer-panel");
const resetBtn = document.getElementById("reset-btn");

function getComputerChoice() {
  const index = Math.floor(Math.random() * choices.length);
  return choices[index];
}

function clearWinnerGlow() {
  userPanel.classList.remove("winner");
  computerPanel.classList.remove("winner");
}

function animatePick(el) {
  el.classList.remove("pop-in");
  void el.offsetWidth; // restart animation
  el.classList.add("pop-in");
}

function handleRound(userChoice) {
  const computerChoice = getComputerChoice();
  rounds++;

  userPickEl.textContent = emojis[userChoice];
  computerPickEl.textContent = emojis[computerChoice];

  animatePick(userPickEl);
  animatePick(computerPickEl);

  clearWinnerGlow();
  resultTextEl.classList.remove("win", "lose", "draw");

  if (userChoice === computerChoice) {
    resultTextEl.textContent = "It's a draw! 😐";
    resultTextEl.classList.add("draw");
    userPanel.classList.add("shake");
    computerPanel.classList.add("shake");
    setTimeout(() => {
      userPanel.classList.remove("shake");
      computerPanel.classList.remove("shake");
    }, 260);
  } else {
    const userWinsRound =
      (userChoice === "rock" && computerChoice === "scissors") ||
      (userChoice === "paper" && computerChoice === "rock") ||
      (userChoice === "scissors" && computerChoice === "paper");

    if (userWinsRound) {
      userWins++;
      userScoreEl.textContent = userWins;
      resultTextEl.textContent = "You win this round! 🎉";
      resultTextEl.classList.add("win");
      userPanel.classList.add("winner");
    } else {
      computerWins++;
      computerScoreEl.textContent = computerWins;
      resultTextEl.textContent = "You lost this round! 🤖";
      resultTextEl.classList.add("lose");
      computerPanel.classList.add("winner");
    }
  }

  roundsTextEl.textContent = `Rounds played: ${rounds}`;
}

choiceButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const choice = btn.getAttribute("data-choice");
    handleRound(choice);
  });
});

resetBtn.addEventListener("click", () => {
  userWins = 0;
  computerWins = 0;
  rounds = 0;

  userScoreEl.textContent = "0";
  computerScoreEl.textContent = "0";
  userPickEl.textContent = "❔";
  computerPickEl.textContent = "❔";
  resultTextEl.textContent = "Make your move!";
  resultTextEl.classList.remove("win", "lose", "draw");
  roundsTextEl.textContent = "Rounds played: 0";
  clearWinnerGlow();
});
