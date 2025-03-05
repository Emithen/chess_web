import createBoard from "./createBoard.js";
import { changePlayer } from "./changePlayer.js";

export const playerDisplay = document.querySelector("#player");
export const width = 8;
export const gameState = {
  playerGo: "black",
}

playerDisplay.textContent = "black";

createBoard();
changePlayer();