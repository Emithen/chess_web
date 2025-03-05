import createBoard from "./createBoard.js";
import { dragStart, dragOver, dragDrop } from "./dragEvent.js";

export const playerDisplay = document.querySelector("#player");
export const width = 8;
export const gameState = {
  playerGo: "black",
}

playerDisplay.textContent = "black";

createBoard();

const allSquares = document.querySelectorAll(".square");

allSquares.forEach((square) => {
  square.addEventListener("dragstart", dragStart);
  square.addEventListener("dragover", dragOver);
  square.addEventListener("drop", dragDrop);
});
