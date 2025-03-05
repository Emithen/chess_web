import { king, queen, rook, bishop, knight, pawn } from "./pieces.js";
import { dragStart, dragOver, dragDrop } from "./dragEvent.js";

const gameBoard = document.querySelector("#gameboard");

// prettier-ignore
const startPieces = [
    rook, knight, bishop, queen, king, bishop, knight, rook,
    pawn, pawn, pawn, pawn, pawn, pawn, pawn, pawn,
    '','','','','','','','',
    '','','','','','','','',
    '','','','','','','','',
    '','','','','','','','',
    pawn, pawn, pawn, pawn, pawn, pawn, pawn, pawn,
    rook, knight, bishop, queen, king, bishop, knight, rook,
];

// 보드에 들어갈 칸 하나씩 배치 및 설정
function createBoard() {
  startPieces.forEach((startPiece, i) => {
    // 칸 생성
    const square = document.createElement("div");

    // square 클래스 추가
    square.classList.add("square");

    // 기물 배치
    square.innerHTML = startPiece;

    // 기물 요소에 draggable 속성 true 로 설정
    square.firstChild && square.firstChild.setAttribute("draggable", true);

    // 칸 번호 달기
    square.setAttribute("square-id", i);

    // 밝은 칸 어두운 칸 설정
    const row = Math.floor((63 - i) / 8) + 1;
    if (row % 2 === 0) {
      square.classList.add(i % 2 === 0 ? "beige" : "brown");
    } else {
      square.classList.add(i % 2 === 0 ? "brown" : "beige");
    }

    // 기물 색상 (흑백) 설정을 위해 svg 태그에 클래스 추가
    if (i <= 15) {
      square.firstChild.firstChild.classList.add("black");
    }

    if (i >= 48) {
      square.firstChild.firstChild.classList.add("white");
    }

    // drag 이벤트 설계 및 추가

    // 완성된 칸 보드에 배치
    gameBoard.append(square);
  });

  // 드래그 이벤트 추가
  const allSquares = document.querySelectorAll(".square");

  allSquares.forEach((square) => {
    square.addEventListener("dragstart", dragStart);
    square.addEventListener("dragover", dragOver);
    square.addEventListener("drop", dragDrop);
  });
}

export default createBoard;
