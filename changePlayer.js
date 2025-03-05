import { gameState, playerDisplay, width } from "./app.js";

export function changePlayer() {
  if (gameState.playerGo === "black") {
    reverseIds();
    gameState.playerGo = "white";
    playerDisplay.textContent = "white";
  } else {
    revertIds();
    gameState.playerGo = "black";
    playerDisplay.textContent = "black";
  }
}

function reverseIds() {
  const allSquares = document.querySelectorAll(".square");
  allSquares.forEach((square, i) =>
    square.setAttribute("square-id", width * width - 1 - i)
  );
}

function revertIds() {
  const allSquares = document.querySelectorAll(".square");
  allSquares.forEach((square, i) => square.setAttribute("square-id", i));
}
