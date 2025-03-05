import { width } from "./app.js";

function checkIfValid(start, target) {
  const targetId =
    Number(target.getAttribute("square-id")) ||
    Number(target.parentNode.getAttribute("square-id"));
  const startId = Number(start);
  const startRow = Math.floor(startId / 8);
  const startCol = startId % 8;
  const targetRow = Math.floor(targetId / 8);
  const targetCol = targetId % 8;

  console.log(`(${startRow}, ${startCol}) -> (${targetRow}, ${targetCol})`);

  const piece = document.querySelector(`[square-id="${startId}"]`).firstChild
    ?.id;
  console.log("startId: ", startId);
  console.log("targetId: ", targetId);
  console.log("piece: ", piece);

  switch (piece) {
    case "pawn":
      const starterRow = [8, 9, 10, 11, 12, 13, 14, 15];
      if (starterRow.includes(startId) && startId + width * 2 === targetId)
        return true;
      else if (startId + width === targetId) return true;
      else if (
        startId + width - 1 === targetId &&
        document.querySelector(`[square-id="${startId + width - 1}"]`)
          .firstChild
      )
        return true;
      else if (
        startId + width + 1 === targetId &&
        document.querySelector(`[square-id="${startId + width + 1}"]`)
          .firstChild
      )
        return true;
      // 앙파상
      break;
    case "knight":
      if (startRow + 2 === targetRow) {
        if (startCol + 1 === targetCol) return true;
        else if (startCol - 1 === targetCol) return true;
      } else if (startRow + 1 === targetRow) {
        if (startCol + 2 === targetCol) return true;
        else if (startCol - 2 === targetCol) return true;
      } else if (startRow - 2 === targetRow) {
        if (startCol + 1 === targetCol) return true;
        else if (startCol - 1 === targetCol) return true;
      } else if (startRow - 1 === targetRow) {
        if (startCol + 2 === targetCol) return true;
        else if (startCol - 2 === targetCol) return true;
      }
      break;
    case "bishop":
      if (
        Math.abs(startRow - targetRow) === Math.abs(startCol - targetCol) &&
        checkBlocking(startRow, startCol, targetRow, targetCol)
      )
        return true;
      break;
    case "rook":
  }
}

function checkInBoard(a, b) {
  if (a >= 0 && a < 8 && b >= 0 && b < 8) return true;
}

function checkBlocking(startRow, startCol, targetRow, targetCol) {
  let smallRow, smallCol, bigRow, bigCol;

  if (startRow < targetRow && startCol < targetCol) {
    smallRow = startRow;
    bigRow = targetRow;
    smallCol = startCol;
    bigCol = targetCol;
  } else if (startRow < targetRow && startCol > targetCol) {
    smallRow = startRow;
    bigRow = targetRow;
    smallCol = targetCol;
    bigCol = startCol;
  } else if (startRow > targetRow && startCol < targetCol) {
    smallRow = targetRow;
    bigRow = startRow;
    smallCol = startCol;
    bigCol = targetCol;
  } else if (startRow > targetRow && startCol > targetCol) {
    smallRow = targetRow;
    bigRow = startRow;
    smallCol = targetCol;
    bigCol = startCol;
  }

  for (let i = smallRow + 1; i <= bigRow; i++) {
    for (let j = smallCol + 1; i <= bigCol; i++) {
      if (
        document.querySelector(`[square-id="${pos_to_id(i, j)}"]`).firstChild
      ) {
        return true;
      }
    }
  }

  return false;
}

function pos_to_id(row, col) {
  return row * 8 + col;
}

export default checkIfValid;
