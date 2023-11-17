export class Gameboard {
    RowSize = 10;
    ColSize = 10;

    constructor() {
        this.board = []

        for (let y = 0; y < this.RowSize; y++) {
            this.board.push([])
            for (let x = 0; x < this.ColSize; x++) {
                this.board.at(-1).push(null)
            }
        }
        this.missedShots = 0;
    }

    place({ ship, x, y }) {
        if (
            !(0 <= x && x + ship.length - 1 < this.ColSize) ||
            !(0 <= y && y < this.RowSize)
        ) {
            return false;
        }

        for (let offset = 0; offset < ship.length; offset++) {
            this.board[y][x + offset] = ship;
        }
        return true;
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
