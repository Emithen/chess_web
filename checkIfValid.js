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
        !checkDiagBlock(startRow, startCol, targetRow, targetCol)
      )
        return true;
      break;
    case "rook":
      if (startRow === targetRow || startCol === targetCol)
        if (!checkStraightBlock(startRow, startCol, targetRow, targetCol))
          return true;
      break;
    case "queen":
      if (
        Math.abs(startRow - targetRow) === Math.abs(startCol - targetCol) &&
        !checkDiagBlock(startRow, startCol, targetRow, targetCol)
      ) {
        return true;
      } else if (startRow === targetRow || startCol === targetCol) {
        if (!checkStraightBlock(startRow, startCol, targetRow, targetCol))
          return true;
      }
      break;
    case "king":

  }
}

function checkInBoard(a, b) {
  if (a >= 0 && a < 8 && b >= 0 && b < 8) return true;
}

function checkDiagBlock(startRow, startCol, targetRow, targetCol) {
  let smallRow, smallCol, bigRow, bigCol;

  if (startRow < targetRow && startCol < targetCol) {
    for (
      let i = startRow + 1, j = startCol + 1;
      i < targetRow, j < targetCol;
      i++, j++
    ) {
      if (document.querySelector(`[square-id="${pos_to_id(i, j)}"]`).firstChild) {
        return true;
      }
    }
  } else if (startRow < targetRow && startCol > targetCol) {
    for (
      let i = startRow + 1, j = startCol - 1;
      i < targetRow, j < targetCol;
      i++, j--
    ) {
      if (document.querySelector(`[square-id="${pos_to_id(i, j)}"]`).firstChild) {
        return true;
      }
    }
  } else if (startRow > targetRow && startCol < targetCol) {
    for (
      let i = startRow - 1, j = startCol + 1;
      i < targetRow, j < targetCol;
      i--, j++
    ) {
      if (document.querySelector(`[square-id="${pos_to_id(i, j)}"]`).firstChild) {
        return true;
      }
    }
  } else if (startRow > targetRow && startCol > targetCol) {
    for (
      let i = startRow - 1, j = startCol - 1;
      i < targetRow, j < targetCol;
      i--, j--
    ) {
      if (document.querySelector(`[square-id="${pos_to_id(i, j)}"]`).firstChild) {
        return true;
      }
    }
  }

  for (
    let i = smallRow + 1, j = smallCol + 1;
    i < bigRow, j < bigCol;
    i++, j++
  ) {
    if (document.querySelector(`[square-id="${pos_to_id(i, j)}"]`).firstChild) {
      return true;
    }
  }

  return false;
}

function checkStraightBlock(startRow, startCol, targetRow, targetCol) {
  let start, end, axis;

  if (startRow === targetRow) {
    axis = startRow;

    if (startCol < targetCol) {
      start = startCol;
      end = targetCol;
    } else if (startCol > targetCol) {
      start = targetCol;
      end = startCol;
    }

    for (let i = start + 1; i < end; i++) {
      if (
        document.querySelector(`[square-id="${pos_to_id(axis, i)}"]`).firstChild
      ) {
        return true;
      }
    }
  } else if (startCol === targetCol) {
    axis = startCol;

    if (startRow < targetRow) {
      start = startRow;
      end = targetRow;
    } else if (startRow > targetRow) {
      start = targetRow;
      end = startRow;
    }

    for (let i = start + 1; i < end; i++) {
      if (
        document.querySelector(`[square-id="${pos_to_id(i, axis)}"]`).firstChild
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
