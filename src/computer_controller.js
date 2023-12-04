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
}
