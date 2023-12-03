export class ComputerPlayer {
    constructor({ boardWidth, boardHeight }) {
        this.atkCoordinates = [];

        for (let y = 0; y < boardHeight; y++) {
            for (let x = 0; x < boardWidth; x++) {
                this.atkCoordinates.push([x, y]);
            }
        }
    }

    // Places the ships randomly on the board.
    // Regarding current implementation, it choose a row and a valid column randomly.
    // Since it currently will no repeat the row (even it there is enough space to fit
    // another ship), probably need to change the implementation later on...
    placeShips({ board }) {
        const rowIndexes = [0, 1, 2, 3, 4, 5, 7, 8, 9];

        while (!board.shipyard.isEmpty()) {
            // TODO: Remove adjacent y to avoid putting next to each other?
            let ship = board.shipyard.shift();
            let i = this.randomIndex(rowIndexes);
            let y = rowIndexes.splice(i, 1);
            let x = Math.round(Math.random() * (10 - ship.length));

            board.place({ ship, x, y });
        }
    }

    // Returns a random coordinate in [x, y] form, will never repeat chosen coordinate.
    nextAtkCoordinate() {
        let randomIndex = this.randomIndex(this.atkCoordinates);
        return this.atkCoordinates.splice(randomIndex, 1)[0];
    }

    // Returns a random index from *ary*, should be use internally.
    randomIndex(ary) {
        return Math.floor(Math.random() * ary.length);
    }
}
