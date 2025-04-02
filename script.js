let hasFlipped = false;
let lockboard = false;
let firstCard, secondCard;
let isGameStarted = false;
const button = document.querySelector("button");
const memoryGame = document.querySelector(".memory-game");
const cards = document.querySelectorAll(".memory-card");

// Apply blur effect to the grid initially
memoryGame.classList.add("blurred");

let matchedCards = 0; // To count the number of matched cards

function flipCard() {
  if (!isGameStarted) return;
  if (this.classList.contains("flip") || this.classList.contains("matched")) return; // Prevent flipping if already flipped or matched
  if (lockboard) return;

  this.classList.add("flip"); // Add "flip" class to flip the card

  if (!hasFlipped) {
    hasFlipped = true;
    firstCard = this;
  } else {
    hasFlipped = false;
    secondCard = this;
    checkForMatch();
  }
}

function checkForMatch() {
  if (firstCard.dataset.framework === secondCard.dataset.framework) {
    firstCard.classList.add("matched");
    secondCard.classList.add("matched");
    matchedCards += 2; // Increase matched count by 2 since both cards matched
    checkGameOver(); // Check if the game is over after a match
  } else {
    unflipCards();
  }
}

function unflipCards() {
  lockboard = true;
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
    lockboard = false;
  }, 500);
}

function resetBoard() {
  hasFlipped = false;
  lockboard = false;
  firstCard = null;
  secondCard = null;
}

function startGame() {
  isGameStarted = true;
  memoryGame.classList.remove("blurred"); // Remove blur when game starts
  shuffleCards();
  button.textContent = "Reset"; // Change button to "Reset"
  matchedCards = 0; // Reset the matched cards counter
}

function resetGame() {
  isGameStarted = false;
  memoryGame.classList.add("blurred"); // Reapply blur on reset
  cards.forEach(card => {
    card.classList.remove("flip");
    card.classList.remove("matched");
  });
  resetBoard();
  button.textContent = "Start Game"; // Change button back to "Start Game"
  matchedCards = 0; // Reset matched cards counter when the game is reset
}

function shuffleCards() {
  cards.forEach((card) => {
    let randomPos = Math.floor(Math.random() * 11);
    card.style.order = randomPos;
  });
}

function checkGameOver() {
  if (matchedCards === cards.length) { // If all cards are matched
    setTimeout(() => {
      alert("Congratulations! You won! 🎉"); // Show a winning message
      resetGame(); // Reset the game when all cards are matched
    }, 500); // A small delay to let the user see the last matched cards
  }
}

button.addEventListener("click", () => {
  if (button.textContent === "Start Game") {
    startGame();
  } else {
    resetGame();
  }
});

cards.forEach((card) => card.addEventListener("click", flipCard));
