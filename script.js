//your JS code here. If required.
let player1 = "";
let player2 = "";
let currentPlayer = "";
let board = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

function startGame() {
    player1 = document.getElementById("player1").value.trim();
    player2 = document.getElementById("player2").value.trim();

    if (player1 === "" || player2 === "") {
        alert("Please enter both player names!");
        return;
    }

    currentPlayer = player1;
    document.getElementById("player-input").classList.add("hidden");
    document.getElementById("game").classList.remove("hidden");
    document.getElementById("message").innerText = `${currentPlayer}, you're up`;

    createBoard();
}

function createBoard() {
    const boardContainer = document.getElementById("board");
    boardContainer.innerHTML = "";

    board.forEach((cell, index) => {
        const cellElement = document.createElement("div");
        cellElement.classList.add("cell");
        cellElement.setAttribute("id", (index + 1).toString());
        cellElement.addEventListener("click", () => handleCellClick(index));
        cellElement.innerText = cell;
        boardContainer.appendChild(cellElement);
    });
}

function handleCellClick(index) {
    if (board[index] !== "" || !gameActive) return;

    board[index] = currentPlayer === player1 ? "X" : "O";
    setTimeout(createBoard, 50); 

    if (checkWin()) {
        setTimeout(() => {
            document.getElementById("message").innerText = `${currentPlayer} congratulations you won!`;
        }, 100);
        gameActive = false;
        return;
    }

    if (board.every(cell => cell !== "")) {
        setTimeout(() => {
            document.getElementById("message").innerText = "It's a draw!";
        }, 100);
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === player1 ? player2 : player1;
    setTimeout(() => {
        document.getElementById("message").innerText = `${currentPlayer}, you're up`;
    }, 100);
}

function checkWin() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], 
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]   
    ];

    return winPatterns.some(pattern => {
        const [a, b, c] = pattern;
        return board[a] !== "" && board[a] === board[b] && board[a] === board[c];
    });
}

function resetGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;
    currentPlayer = player1;
    document.getElementById("message").innerText = `${currentPlayer}, you're up`;
    createBoard();
}