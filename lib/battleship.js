import { ComputerPlayer } from "./computer_player";
import { Gameboard } from "./gameboard";
import { Player } from "./player";

export class BattleShip {
    constructor() {
        this.playerBoard = new Gameboard();
        this.compBoard = new Gameboard();
        this.player = new Player({
            ownBoard: this.playerBoard,
            enemyBoard: this.compBoard,
        });
        this.comp = new ComputerPlayer({
            ownBoard: this.compBoard,
            enemyBoard: this.playerBoard,
        });
        this.isPlayerOneTurn = true;
        // TODO: Include a role to setup the DOM that get user input and display boards
    }

    main() {
        while (
            !(
                this.playerBoard.isAllShipSunk() ||
                this.compBoard.isAllShipSunk()
            )
        ) {
            if (this.isPlayerOneTurn) {
                // now user could choose to attack a coordinate
                // attack the board
                // enable pointer event for board
            } else {
                // let computer attack the board
                // disable pointer event for board
            }
            this.isPlayerOneTurn = !this.isPlayerOneTurn;
        }
        this.outputResult();
    }

    outputResult() {
        // pass
    }
}
