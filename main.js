const boxes = document.querySelectorAll(".box");
const statusText = document.querySelector(".status");
const winnerText = document.querySelector(".winner");
const reset = document.querySelector(".reset");
const newStart = document.querySelector(".new-game");

let board = ["", "", "", "", "", "", "", "", ""];
let currentX = true;

const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

statusText.innerHTML = `<p class="x-text">X</p> PLAYER 1's turn`;

boxes.forEach((box, i) => {
    box.addEventListener("click", () => {
        if (currentX) {
            box.innerText = "X";
                        box.classList.add("x-color");
            box.classList.remove("o-color");
            currentX = false;
            statusText.innerHTML = `<p class="x-text">O</p> PLAYER 2's turn`;
        } else {
            box.innerText = "O";
                        box.classList.add("o-color");
            box.classList.remove("x-color");
            currentX = true;
            statusText.innerHTML = `<p class="x-text">X</p> PLAYER 1's turn`;
        };
        box.disabled = true;
        board[i] = box.innerText;
        newStart.classList.add("hide");
        reset.classList.remove("hide");
        checkWinner();

        if (computerMode && !currentX) {
            setTimeout(() => {
                computerMove();
                currentX = true;
                statusText.innerHTML = `<p class="x-text">X</p> PLAYER 1's turn`;
            }, 300);
        };
    });
});

function checkWinner() {
    for (let winner of winPatterns) {
        let value1 = boxes[winner[0]].innerText;
        let value2 = boxes[winner[1]].innerText;
        let value3 = boxes[winner[2]].innerText;
        if (value1 !== "" && value1 === value2 && value2 === value3) {
            winnerText.innerHTML = value1 === "X" ? `<p class="x-text">X</p> Winner` : `<p class="x-text">O</p> Winner`

            statusText.classList.add("hide");
            boxes.forEach(box => box.disabled = true);

            newStart.classList.remove("hide");
            reset.classList.add("hide");
            return;
        };
    };

    if (!board.includes("")) {
        winnerText.innerHTML = "Match Draw";
        statusText.classList.add("hide");
        boxes.forEach(box => box.disabled = true);
        newStart.classList.remove("hide");
        reset.classList.add("hide");
    };
};

function updateGame() {
    currentX = true;
    board = ["", "", "", "", "", "", "", "", ""];
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    };
    statusText.classList.remove("hide");
    statusText.innerHTML = `<p class="x-text">X</p> PLAYER 1's turn`;
    winnerText.innerHTML = "";
    newStart.classList.add("hide");
    reset.classList.remove("hide");
};

newStart.addEventListener("click", updateGame);
reset.addEventListener("click", updateGame);


const computerBtn = document.querySelector(".computer-btn");

let computerMode = false;

computerBtn.addEventListener("click", () => {
    computerMode = !computerMode;
    if (computerMode) {
        computerBtn.innerText = "Computer Mode: ON";
        computerBtn.classList.remove("off");
        computerBtn.classList.add("on");
    } else {
        computerBtn.innerText = "Computer Mode: OFF";
        computerBtn.classList.add("off");
        computerBtn.classList.remove("on");
    };
});


function computerMove() {
    let emptyIndexes = [];
    for (let i = 0; i < board.length; i++) {
        if (board[i] === "") emptyIndexes.push(i);
    }

    if (emptyIndexes.length === 0) return;

    let randomIndex = emptyIndexes[Math.floor(Math.random() * emptyIndexes.length)];

    boxes[randomIndex].innerText = "O";
    boxes[randomIndex].disabled = true;
    board[randomIndex] = "O";

    checkWinner();
};