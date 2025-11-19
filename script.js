const submitBtn = document.getElementById("submit");
const player1Input = document.getElementById("player-1");
const player2Input = document.getElementById("player-2");
const game = document.getElementById("game");
const form = document.getElementById("player-form");
const message = document.querySelector(".message");
const cells = document.querySelectorAll(".cell");

let player1 = "";
let player2 = "";
let currentPlayer = "";
let board = ["", "", "", "", "", "", "", "", ""];
let gameOver = false;

const winPatterns = [
  [1,2,3],[4,5,6],[7,8,9],
  [1,4,7],[2,5,8],[3,6,9],
  [1,5,9],[3,5,7]
];

submitBtn.addEventListener("click", () => {
  player1 = player1Input.value.trim();
  player2 = player2Input.value.trim();

  if (!player1 || !player2) return;

  form.style.display = "none";
  game.style.display = "block";

  currentPlayer = player1; // Player 1 starts
  updateMessage();
});

function updateMessage() {
  message.textContent = `${currentPlayer}, you're up`;
}

cells.forEach(cell => {
  cell.addEventListener("click", () => {
    const id = parseInt(cell.id) - 1;

    if (gameOver || board[id] !== "") return;

    // Mark the move
    if (currentPlayer === player1) {
      board[id] = "x";
      cell.textContent = "x";
    } else {
      board[id] = "o";
      cell.textContent = "o";
    }

    // Check for win
    if (checkWin(board[id])) {
      message.textContent = `${currentPlayer}, congratulations you won!`;
      gameOver = true;
      return;
    }

    // Switch turns
    currentPlayer = currentPlayer === player1 ? player2 : player1;
    updateMessage();
  });
});

function checkWin(symbol) {
  return winPatterns.some(pattern =>
    pattern.every(index => board[index - 1] === symbol)
  );
}
