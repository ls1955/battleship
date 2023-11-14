export class ComputerPlayer {
    ownBoard = null;
    enemyBoard = null;

    constructor({ ownBoard, enemyBoard }) {
        this.ownBoard = ownBoard;
        this.enemyBoard = enemyBoard;
        this.atkCoordinates = [];

        for (let y = 0; y < this.ownBoard.board.length; y++) {
            for (let x = 0; x < this.ownBoard.board[0].length; x++) {
                this.atkCoordinates.push([x, y]);
            }
        }
    }

    attack() {
        const { x, y } = this.nextAtkCoordinate();
        return this.enemyBoard.receiveAttack({ x, y });
    }

    nextAtkCoordinate() {
        let randomIndex = this.randomIndex(this.atkCoordinates);
        return this.atkCoordinates.splice(randomIndex, 1)[0];
    }

    randomIndex(array) {
        return Math.floor(Math.random() * array.length);
    }
}
