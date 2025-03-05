const gameBoard = document.querySelector("#gameboard");
const playerDisplay = document.querySelector("#player");
const infoDisplay = document.querySelector("#info-display");
const width = 8;
let playerGo = 'black';
playerDisplay.textContent = 'black';

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

function createBoard() {
  console.log("보드 초기화");
  startPieces.forEach((startPiece, i) => {
    const square = document.createElement("div");
    square.classList.add("square");
    square.innerHTML = startPiece;
    square.firstChild && square.firstChild.setAttribute("draggable", true);
    square.setAttribute("square-id", i);

    // 보드 색칠
    const row = Math.floor((63 - i) / 8) + 1;
    if (row % 2 === 0) {
      square.classList.add(i % 2 === 0 ? "beige" : "brown");
    } else {
      square.classList.add(i % 2 === 0 ? "brown" : "beige");
    }

    // 기물 색상을 위해 svg 태그에 클래스 추가
    if (i <= 15) {
      square.firstChild.firstChild.classList.add("black");
    }

    if (i >= 48) {
      square.firstChild.firstChild.classList.add("white");
    }

    gameBoard.append(square);
  });
}

createBoard();

const allSquares = document.querySelectorAll(".square");

allSquares.forEach((square) => {
  square.addEventListener("dragstart", dragStart);
  square.addEventListener("dragover", dragOver);
  square.addEventListener("drop", dragDrop);
});

let startPositionId;
let draggedElement;

function dragStart(e) {
  startPositionId = e.target.parentNode.getAttribute("square-id");
  draggedElement = e.target;
}

function dragOver(e) {
  e.preventDefault();
}

function dragDrop(e) {
  e.stopPropagation();

  const correctGo = draggedElement.firstChild.classList.contains(playerGo);
  const taken = e.target.classList.contains('piece');
  const valid = checkIfValid(e.target);
  const opponentGo = playerGo === "white" ? "black" : "white";
  const takenByOpponent = e.target.firstChild?.classList.contains(opponentGo);

  // 내 차례가 맞는 지 확인
  if(correctGo) {
    // 기물이 기물 공격 && 유효성 판정
    if(takenByOpponent && valid) {
      e.target.parentNode.append(draggedElement);
      e.target.remove();
      changePlayer();
      return;
    }

    // 기물이 기물 공격 && 자기 기물 대상 공격
    if(taken && !takenByOpponent) {
      infoDisplay.textContent = "illegal move!!";
      setTimeout(() => infoDisplay.textContent = "", 2000);
      return;
    }

    // 나머지 모든 조건에 대한 유효성 판정
    if(valid) {
      e.target.append(draggedElement);
      changePlayer();
      return;
    }
  }

  // e.target.parentNode.append(draggedElement);
  // e.target.remove();
}

function checkIfValid(target) {
  const targetId = Number(target.getAttribute('square-id')) || Number(target.parentNode.getAttribute('square-id'));
  const startId = Number(startPositionId);
  const startRow = Math.floor(startId / 8);
  const startCol = startId % 8;
  const targetRow = Math.floor(targetId / 8);
  const targetCol = targetId % 8;

  console.log(`(${startRow}, ${startCol}) -> (${targetRow}, ${targetCol})`);

  const piece = draggedElement.id;
  console.log('startId: ', startId);
  console.log('targetId: ',targetId);
  console.log('piece: ', piece);

  switch(piece){
    case 'pawn':
      const starterRow = [8, 9, 10, 11, 12, 13, 14, 15];
      if (starterRow.includes(startId) && startId + width * 2 === targetId) return true;
      else if (startId + width === targetId) return true;
      else if (startId + width - 1 === targetId && document.querySelector(`[square-id="${startId + width - 1}"]`).firstChild) return true;
      else if (startId + width + 1 === targetId && document.querySelector(`[square-id="${startId + width + 1}"]`).firstChild) return true;
      // 앙파상
      break;
    case 'knight':
      if (startRow + 2 === targetRow){
        if (startCol + 1 === targetCol) return true;
        else if (startCol - 1 === targetCol) return true;
      }
      else if (startRow + 1 === targetRow) {
        if (startCol + 2 === targetCol) return true;
        else if (startCol -2 === targetCol) return true;
      }
      else if (startRow - 2 === targetRow) {
        if (startCol + 1 === targetCol) return true;
        else if (startCol - 1 === targetCol) return true;
      }
      else if (startRow - 1 === targetRow) {
        if (startCol + 2 === targetCol) return true;
        else if (startCol - 2 === targetCol) return true;
      }
    break;
    case 'bishop':
      if(Math.abs(startRow - targetRow) === Math.abs(startCol - targetCol) && checkBlocking(startRow, startCol, targetRow, targetCol))
        return true;
    break;
    case 'rook':

  }
}

function checkInBoard(a, b) {
  if (a >= 0 && a < 8 && b >= 0 && b < 8) return true;
}

function checkBlocking(startRow, startCol, targetRow, targetCol) {
  let smallRow, smallCol, bigRow, bigCol;

  if(startRow < targetRow && startCol < targetCol){
    smallRow = startRow;
    bigRow = targetRow;
    smallCol = startCol;
    bigCol = targetCol;
  } else if (startRow < targetRow && startCol > targetCol){
    smallRow = startRow;
    bigRow = targetRow;
    smallCol = targetCol;
    bigCol = startCol;
  } else if (startRow > targetRow && startCol < targetCol){
    smallRow = targetRow;
    bigRow = startRow;
    smallCol = startCol;
    bigCol = targetCol;
  } else if (startRow > targetRow && startCol > targetCol){
    smallRow = targetRow;
    bigRow = startRow;
    smallCol = targetCol;
    bigCol = startCol;
  }

  for (let i = smallRow + 1; i <= bigRow; i++) {
    for (let j = smallCol + 1; i <= bigCol; i++) {
      if (document.querySelector(`[square-id="${pos_to_id(i, j)}"]`).firstChild) {
        return true;
      }
    }
  }

  return false;
}

function pos_to_id(row, col){
  return row * 8 + col;
}

function changePlayer() {
  if (playerGo === "black"){
    reverseIds();
    playerGo = "white";
    playerDisplay.textContent = "white";
  } else {
    revertIds();
    playerGo = "black";
    playerDisplay.textContent = "black";
  }
}

function reverseIds() {
  const allSquares = document.querySelectorAll(".square");
  allSquares.forEach((square, i) => 
    square.setAttribute('square-id', (width * width - 1) -i));
}

function revertIds() {
  const allSquares = document.querySelectorAll(".square");
  allSquares.forEach((square, i) =>
    square.setAttribute('square-id', i));
}
