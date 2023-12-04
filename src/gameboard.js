export class Gameboard {
    static Height = 10;
    static Width = 10;

    constructor() {
        this.grid = [];
        this.missedShots = 0;
        this.placedShipCoordinates = new Set();
        this.attackedCoors = new Set();

        for (let y = 0; y < Gameboard.Height; y++) {
            this.grid.push(Array.from({ length: Gameboard.Width }, () => null));
        }

        // These instance variables will be set from outside, since it seems like JS does not
        // support keyword arguments with default value, and author does not feel like using
        // usual parameter mode.
        this.dom = null;
        // The shipyard that holds the ships
        this.shipyard = null;
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

    // Returns false and increment missed shots if the attack failed, else delegate the attack
    // to ship and return true.
    receiveAttack({ x, y }) {
        if (this.hadAttack({ x, y })) return false;

        this.attackedCoors.add([x, y].join());
        if (this.grid[y][x] == null) {
            this.missedShots++;
            return false;
        }

        this.grid[y][x].receiveHit();
        return true;
    }

    // Return true if this coordinate had been attacked before, else false.
    hadAttack({ x, y }) {
        return this.attackedCoors.has([x, y].join());
    }

    // Return true if there is no ship or all the ship is sunk.
    isAllShipSunk() {
        return this.grid.every((r) => r.every((c) => c == null || c.isSunk()));
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
