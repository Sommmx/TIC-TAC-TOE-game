let boxes = document.querySelectorAll(".box");
let reset = document.querySelector(".reset");
let newGame = document.querySelector(".newGame");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector(".msg");

let turnO = true;
let count = 0;

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

const resetGame = () => {
  count = 0;
  turnO = true;
  enabledBoxes();
  msgContainer.classList.add("hide");
};

const enabledBoxes = () => {
  for (box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    count++;
    if (turnO) {
      box.innerText = "O";
      turnO = false;
    } else {
      box.innerText = "X";
      turnO = true;
    }
    box.disabled = true;

    checkWinner();
  });
});

const disabledBoxes = () => {
  for (box of boxes) {
    box.disabled = true;
  }
};

const showWinner = (winner) => {
  msg.innerText = `Winner is ${winner}`;
  msgContainer.classList.remove("hide");
  disabledBoxes();
};

const draw = () => {
  msg.innerText = "The match is draw. Start a new Game !";
  msgContainer.classList.remove("hide");
};

const checkWinner = () => {
  let winnerFound = false;
  for (let patterns of winPatterns) {
    let pos1 = boxes[patterns[0]].innerText;
    let pos2 = boxes[patterns[1]].innerText;
    let pos3 = boxes[patterns[2]].innerText;

    if (pos1 != "" && pos2 != "" && pos3 != "") {
      if (pos1 === pos2 && pos2 === pos3) {
        console.log("Winner");
        showWinner(pos1);
        winnerFound = true;
        return;
      }
    }
  }
  if (count === 9 && !winnerFound) {
    draw();
  }
};

reset.addEventListener("click", resetGame);
newGame.addEventListener("click", resetGame);
