export class Gameboard {
    static Height = 10;
    static Width = 10;

    constructor() {
        this.grid = [];
        this.missedShots = 0;
        // The dom element that represent the board, should be set from outside
        this.dom = null;
        this.placedShipCoordinates = new Set();

        for (let y = 0; y < Gameboard.Height; y++) {
            this.grid.push(Array.from({ length: Gameboard.Width }, () => null));
        }
    }

    place({ ship, x, y }) {
        if (!this.canPlace({ ship, x, y })) return false;

        for (let offset = 0; offset < ship.length; offset++) {
            this.grid[y][x + offset] = ship;
            // Store as string since Array equality in JavaScript is surprising
            this.placedShipCoordinates.add([x + offset, y].join());
        }
        return true;
    }

    // Returns true if the *ship* could be place into the grid, else false.
    canPlace({ ship, x, y }) {
        return (
            x >= 0 &&
            x + ship.length - 1 < this.grid[0].length &&
            y >= 0 &&
            y < this.grid.length &&
            !this.hasOverlap({ ship, x, y })
        );
    }

    // Returns true if this ship has overlap with other placed ships, else false.
    hasOverlap({ ship, x, y }) {
        for (let offset = 0; offset < ship.length; offset++) {
            // Turn coordinate into string, since array equality in JS is surprising
            let coor = [x + offset, y].join();
            if (this.placedShipCoordinates.has(coor)) return true;
        }
        return false;
    }

    // Returns false and increment missed shots if the attack missed, else delegate the attack
    // and return true.
    receiveAttack({ x, y }) {
        if (this.grid[y][x] == null) {
            this.missedShots++;
            return false;
        }

        this.grid[y][x].receiveHit();
        return true;
    }

    // Return true if there is no ship or all the ship is sunk.
    isAllShipSunk() {
        return this.grid.flat().every((slot) => slot == null || slot.isSunk());
    }

    // Clear the grid, effectively setting every slot to null.
    clear() {
        this.grid.forEach((row, y) => {
            row.forEach((_, x) => {
                this.grid[y][x] = null;
            });
        });
    }
}
