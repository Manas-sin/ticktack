// in this we gonna create a file of the game
const cells = document.querySelectorAll(".board__cell");
const statusText = document.querySelector("#message");

const restartbtn = document.querySelector(".game-restart-btn");

//now we have to wrtie the wining condition of the player
//matrics for the tick tak toe player

const winconditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
// in this option we have to make the element start with the one
let option = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = false;
initializegame();
//function of initialize the game from the starting onwards
function initializegame() {
  cells.forEach((cell) => cell.addEventListener("click", cellclicked));
  restartbtn.addEventListener("click", restartGame);
  statusText.textContent = `${currentPlayer}'s turn`;
  running = true;
}

function cellclicked() {
  const cellindex = this.getAttribute("data-cell-index");
  //check if the game is still runing or not and make some other stuffs to get the value
  if (option[cellindex] != "" || !running) {
    return;
  }
  //now update the value
  updatecells(this, cellindex);
  checkwinner();
}
function updatecells(cell, index) {
  option[index] = currentPlayer;
  cell.textContent = currentPlayer;
}
function changePlayer() {
  currentPlayer = currentPlayer == "X" ? "O" : "X";
  statusText.textContent = `${currentPlayer}'s turn`;
}
//check winner at the same point of level
function checkwinner() {
  let roundwon = false;
  for (let i = 0; i < winconditions.length; i++) {
    const condition = winconditions[i];
    const cellA = option[condition[0]];
    const cellB = option[condition[1]];
    const cellC = option[condition[2]];
    //this check the each cells to see the condition is gonna spare or not
    //if this condition is fale then it going to continue otherwise it should be the flas things ;
    if (cellA == "" || cellB == "" || cellC == "") {
      continue;
    }
    if (cellA == cellB && cellB == cellC) {
      roundwon = true;
      break;
    }
  }
  if (roundwon) {
    statusText.textContent = `${currentPlayer} wins!`;
    running = false;
  } else if (!option.includes("")) {
    statusText.textContent = `Draw!`;
    running = false;
  } else {
    changePlayer();
  }
}
//now this function show that how the these gonna restart the function all  on the button
function restartGame() {
  currentPlayer = "X";
  option = ["", "", "", "", "", "", "", "", ""];
  statusText.textContent = `${currentPlayer}'s turn`;
  cells.forEach((cell) => (cell.textContent = ""));
  running = true;
  //after the restart the game it still working for the running of the game
}
