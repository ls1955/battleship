export class ComputerPlayer {
    ownBoard = null;
    enemyBoard = null;

    constructor({ ownBoard, enemyBoard }) {
        this.ownBoard = ownBoard;
        this.enemyBoard = enemyBoard;
        this.atkCoordinates = [];

        for (let y = 0; y < this.ownBoard.grid.length; y++) {
            for (let x = 0; x < this.ownBoard.grid[0].length; x++) {
                this.atkCoordinates.push([x, y]);
            }
        }
    }

    // TODO: Place ship randomly on the grid?

    // Return a random coordinate in [x, y] form, will never repeat chosen coordinate
    nextAtkCoordinate() {
        let randomIndex = this.randomIndex(this.atkCoordinates);
        return this.atkCoordinates.splice(randomIndex, 1)[0];
    }

    randomIndex(array) {
        return Math.floor(Math.random() * array.length);
    }
}
