// script.js
const gameContainer = document.getElementById("game");
const startButton = document.getElementById("startButton");
const restartButton = document.getElementById("restartButton");
const scoreDisplay = document.getElementById("score");

let COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

let shuffledColors = [];
let flippedCards = [];
let score = 0;

function shuffle(array) {
  let counter = array.length;
  while (counter > 0) {
    let index = Math.floor(Math.random() * counter);
    counter--;
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }
  return array;
}

function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    const newDiv = document.createElement("div");
    newDiv.classList.add(color);
    newDiv.addEventListener("click", handleCardClick);
    gameContainer.append(newDiv);
  }
}

function handleCardClick(event) {
  const card = event.target;

  // Check if the card is already flipped or matched
  if (card.classList.contains("flipped") || card.classList.contains("matched")) {
    return;
  }

  card.style.backgroundColor = card.classList[0]; // reveal color

  flippedCards.push(card);

  if (flippedCards.length === 2) {
    setTimeout(checkForMatch, 1000);
  }

  // Increment score for each click
  score++;
  scoreDisplay.textContent = `Score: ${score}`;
}

function checkForMatch() {
  const [card1, card2] = flippedCards;
  const isMatch = card1.classList[0] === card2.classList[0];

  if (isMatch) {
    card1.classList.add("matched");
    card2.classList.add("matched");
  } else {
    card1.style.backgroundColor = "";
    card2.style.backgroundColor = "";
  }

  flippedCards = [];

  // Check if all cards are matched
  const allMatched = document.querySelectorAll('.matched').length === COLORS.length;
  if (allMatched) {
    alert(`Congratulations! You completed the game with a score of ${score}`);
    restartGame();
  }
}

function restartGame() {
  score = 0;
  scoreDisplay.textContent = `Score: ${score}`;
  shuffledColors = shuffle(COLORS);
  flippedCards = [];
  gameContainer.innerHTML = "";
  createDivsForColors(shuffledColors);
}

startButton.addEventListener("click", function () {
  startButton.style.display = "none";
  restartButton.style.display = "inline-block";
  shuffledColors = shuffle(COLORS);
  createDivsForColors(shuffledColors);
});

restartButton.addEventListener("click", function () {
  restartGame();
});
