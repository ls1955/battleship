import { Player } from "./player";

export class ComputerPlayer extends Player {
    constructor({ ownBoard, enemyBoard }) {
        super({ ownBoard, enemyBoard });
        this.atkCoorCandidates = [];

        for (let y = 0; y < this.ownBoard.board.length; y++) {
            for (let x = 0; x < this.ownBoard.board[0].length; x++) {
                this.atkCoorCandidates.push([x, y]);
            }
        }
    }

    nextAtkCoordinate() {
        let randomIndex = this.randAtkIndex();

        return this.atkCoorCandidates.splice(randomIndex, 1)[0];
    }

    // Returns a random index from this.atkCoorCandidates
    randAtkIndex() {
        return Math.floor(Math.random() * this.atkCoorCandidates.length);
    }
}
