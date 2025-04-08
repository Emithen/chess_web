export function pos_to_id(row, col) {
  return row * 8 + col;
}

export function pieceTypeParser(elementString) {
  let counter = 0;
  let buffer = [];

  for(const char of elementString){
    if(char === '\"') {
      counter++;
      continue;
    }
    if(counter === 3) buffer.push(char);
  }

  return buffer.join('');
}