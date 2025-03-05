import { gameState, playerDisplay, width } from "./app.js";
import checkIfValid from "./checkIfValid.js";


// drag 이벤트 시작 칸, 끝 칸
let startPositionId = null;
let draggedPiece = null;

const infoDisplay = document.querySelector("#info-display");

function dragStart(e) {
  startPositionId = e.target.parentNode.getAttribute("square-id");
  draggedPiece = e.target;
}

function dragOver(e) {
  e.preventDefault();
}

function dragDrop(e) {
  e.stopPropagation();

  const correctGo = draggedPiece.firstChild.classList.contains(gameState.playerGo);
  const taken = e.target.classList.contains("piece");
  const valid = checkIfValid(startPositionId, e.target);
  const opponentGo = gameState.playerGo === "white" ? "black" : "white";
  const takenByOpponent = e.target.firstChild?.classList.contains(opponentGo);

  // 내 차례가 맞는 지 확인
  if (correctGo) {
    // 기물이 기물 공격 && 유효성 판정
    if (takenByOpponent && valid) {
      e.target.parentNode.append(draggedPiece);
      e.target.remove();
      changePlayer();
      return;
    }

    // 기물이 기물 공격 && 자기 기물 대상 공격
    if (taken && !takenByOpponent) {
      infoDisplay.textContent = "illegal move!!";
      setTimeout(() => (infoDisplay.textContent = ""), 2000);
      return;
    }

    // 나머지 모든 조건에 대한 유효성 판정
    if (valid) {
      e.target.append(draggedPiece);
      changePlayer();
      return;
    }
  }
}

function changePlayer() {
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

export { dragStart, dragOver, dragDrop };
