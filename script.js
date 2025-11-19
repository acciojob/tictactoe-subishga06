const submitBtn = document.getElementById("submit");
const inputSection = document.getElementById("input-section");
const gameSection = document.getElementById("game-section");
const message = document.querySelector(".message");
const cells = document.querySelectorAll(".cell");

let player1 = "";
let player2 = "";
let currentPlayer = "";
let currentMark = "X";

let board = ["", "", "", "", "", "", "", "", ""];

submitBtn.addEventListener("click", () => {
    player1 = document.getElementById("player-1").value.trim();
    player2 = document.getElementById("player-2").value.trim();

    if (player1 === "" || player2 === "") {
        alert("Please enter both player names");
        return;
    }

    currentPlayer = player1;
    message.textContent = `${currentPlayer}, you're up`;

    inputSection.style.display = "none";
    gameSection.style.display = "block";
});

cells.forEach(cell => {
    cell.addEventListener("click", () => {
        const id = cell.id - 1;

        if (board[id] !== "" || checkWinner()) return;

        board[id] = currentMark;
        cell.textContent = currentMark;

        if (checkWinner()) {
            message.textContent = `${currentPlayer}, congratulations you won!`;
            highlightWinner();
            return;
        }

        switchTurn();
    });
});

function switchTurn() {
    if (currentMark === "X") {
        currentMark = "O";
        currentPlayer = player2;
    } else {
        currentMark = "X";
        currentPlayer = player1;
    }
    message.textContent = `${currentPlayer}, you're up`;
}

function checkWinner() {
    const winPatterns = [
        [0,1,2], [3,4,5], [6,7,8],
        [0,3,6], [1,4,7], [2,5,8],
        [0,4,8], [2,4,6]
    ];

    return winPatterns.some(pattern => {
        let [a, b, c] = pattern;
        return board[a] && board[a] === board[b] && board[a] === board[c];
    });
}

function highlightWinner() {
    const patterns = [
        [0,1,2],[3,4,5],[6,7,8],
        [0,3,6],[1,4,7],[2,5,8],
        [0,4,8],[2,4,6]
    ];

    patterns.forEach(pattern => {
        let [a,b,c] = pattern;

        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            document.getElementById(a+1).classList.add("winner");
            document.getElementById(b+1).classList.add("winner");
            document.getElementById(c+1).classList.add("winner");
        }
    });
}
