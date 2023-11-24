export class ComputerPlayer {
    ownBoard = null;
    enemyBoard = null;

    constructor({ ownBoard, enemyBoard }) {
        this.ownBoard = ownBoard;
        // CHECK: Looks like we don't need the enemyBoard at all
        this.enemyBoard = enemyBoard;
        this.atkCoordinates = [];

        for (let y = 0; y < this.ownBoard.grid.length; y++) {
            for (let x = 0; x < this.ownBoard.grid[0].length; x++) {
                this.atkCoordinates.push([x, y]);
            }
        }
    }

    // Place the ships randomly on the board
    place({ ships, board }) {
        const yCands = [0, 1, 2, 3, 4, 5, 7, 8, 9];

        ships.forEach((ship) => {
            // TODO: Remove adjacent y to avoid putting next to each other?
            let randomI = this.randomIndex(yCands);
            let y = yCands.splice(randomI, 1);
            let x = Math.round(Math.random() * (10 - ship.length + 1));

            board.place({ ship, x, y });
        });
    }

    // Return a random coordinate in [x, y] form, will never repeat chosen coordinate
    nextAtkCoordinate() {
        let randomIndex = this.randomIndex(this.atkCoordinates);
        return this.atkCoordinates.splice(randomIndex, 1)[0];
    }

    randomIndex(array) {
        return Math.floor(Math.random() * array.length);
    }
}
