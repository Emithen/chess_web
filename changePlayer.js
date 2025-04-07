import { playerDisplay, width } from "./app.js";
import g from "./globalState.js";

export function changePlayer() {
  if (g.playerGo === "black") {
    reverseIds();
    g.playerGo = "white";
    playerDisplay.textContent = "white";
  } else {
    revertIds();
    g.playerGo = "black";
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
