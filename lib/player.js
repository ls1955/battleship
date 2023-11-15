export class Player {
    ownBoard = null;
    enemyBoard = null;

    constructor({ ownBoard, enemyBoard }) {
        this.ownBoard = ownBoard;
        this.enemyBoard = enemyBoard;
    }

    attack({ x, y }) {
        return this.enemyBoard.receiveAttack({ x, y });
    }

    place({ ship, x, y }) {
        this.ownBoard.place({ ship, x, y });
    }
}
