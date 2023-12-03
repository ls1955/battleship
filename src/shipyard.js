export class Shipyard {
    constructor({ ships }) {
        this.ships = [...ships];
    }

    shift() {
        return this.ships.shift();
    }

    isEmpty() {
        return this.ships.length === 0;
    }
}
