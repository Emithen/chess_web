import { startPosition } from "../constants.js";
import Piece from "./VirtualPiece.js";
import { pieceTypeParser } from "../util.js";

class VirtualBoard {
    constructor() {
        this.position = startPosition;
        this.pieces = [];

        this.position.forEach(square => {
            if(square !== '') {
                this.pieces.push(new Piece(pieceTypeParser(square)));
            }
        })
        // 뭐가 필요할까?
    }

    setPosition(position) {
        this.position = position;
    }
    
    getPosition() {
        return this.position;
    }

    showPieces() {
        console.log(this.pieces);
    }

    getSketch() {
        // 반환값을 render 파라미터로 사용
        return null;
    }
}

export default VirtualBoard;