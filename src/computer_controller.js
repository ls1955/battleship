import { Util } from "./dom_util.js";

// The person in charge between the computer player and the DOM.
export class ComputerController {
    constructor({ computerPlayer }) {
        this.computerPlayer = computerPlayer;
    }

    // Updates the CSS class of board after computer player placed its ships.
    placeShips({ board }) {
        this.computerPlayer.placeShips({ board });
        Util.updateShipCSS({ board });
    }

    // Attack the *board* by getting coordinate from computer player.
    // Update column's CSS after the attack.
    attack({ board }) {
        let [x, y] = this.computerPlayer.nextAtkCoordinate();

        let column = Util.getColumn({ board, x, y });
        if (board.receiveAttack({ x, y })) {
            Util.setCSSKlasses({ column, adds: ["hit"], removes: [] });
        } else {
            Util.setCSSKlasses({ column, adds: ["miss"], removes: [] });
            Util.incrementMissedCount({ board });
        }
    }
}
