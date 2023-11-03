export class Gameboard {
    RowSize = 10;
    ColSize = 10;

    constructor() {
        this.board = [...new Array(this.RowSize)].fill([
            ...new Array(this.ColSize),
        ]);
        this.missedShots = 0;
    }

    place({ ship, x, y }) {
        this.board[y][x] = ship;
    }

    receiveAttack({ x, y }) {
        if (this.board[y][x] == null) {
            this.missedShots++;
            return false;
        }

        this.board[y][x].receiveHit();
        return true;
    }

    isAllShipSunk() {
        return this.board.flat().every((slot) => slot == null || slot.isSunk());
    }
}
