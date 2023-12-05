export class Ship {
    constructor({ length }) {
        this.length = length;
        this.receivedHitAmount = 0;
    }

    isSunk() {
        return this.receivedHitAmount >= this.length;
    }

    receiveHit() {
        this.receivedHitAmount++;
    }
}
