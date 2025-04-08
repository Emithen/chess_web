class VirtualPiece {
    constructor(type){
        this.pieceType = type;
        this.possibleSquares = [];
    }

    addPossibleSquare(pos){
        this.possibleSquares.push(pos);
    }
}

export default VirtualPiece;