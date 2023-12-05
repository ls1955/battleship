import { DOMUtil } from "./dom_util.js";

// The person in charge between the computer player and the DOM.
export class ComputerController {
    constructor({ computerPlayer, computerBoard }) {
        this.computerPlayer = computerPlayer;
        this.computerBoard = computerBoard;
    }

    // Lets computer player placed its ships, then update the board's CSS.
    placeShips({ board }) {
        this.computerPlayer.placeShips({ board });
        DOMUtil.updateShipCSS({ board });
    }

    // Attack the *board* by getting coordinate from computer player.
    // Update column's CSS after the attack.
    attack({ board }) {
        let [x, y] = this.computerPlayer.nextAtkCoordinate();

        let column = DOMUtil.getColumn({ board, x, y });
        if (board.receiveAttack({ x, y })) {
            DOMUtil.setCSSKlasses({ column, adds: ["hit"], removes: [] });

            if (board.isAllShipSunk()) {
                DOMUtil.disableBoardEvents();
                DOMUtil.showWinner({ board: this.computerBoard });
            }
        } else {
            DOMUtil.setCSSKlasses({ column, adds: ["miss"], removes: [] });
            DOMUtil.incrementMissedCount({ board });
        }
    }
}
