import { Gameboard } from "./src/gameboard.js";
import { BoardDOMFiller } from "./src/board_dom_filler.js";
import { BoardEventSetter } from "./src/board_event_setter.js";
import { Shipyard } from "./src/shipyard.js";
import { Ship } from "./src/ship.js";

// Hardcode the ship lengths for both player.
const shipLengths = [5, 4, 4, 3, 2, 2];

let humanBrd = new Gameboard();
let compBrd = new Gameboard();
humanBrd.dom = document.querySelector(".human-board");
compBrd.dom = document.querySelector(".computer-board");

let ships = shipLengths.map((length) => new Ship({ length }));
let humanShipyard = new Shipyard({ ships });

// Fills up the board with rows and columns in DOM...
[humanBrd, compBrd].forEach((board) => {
    new BoardDOMFiller().fill({
        board,
        width: Gameboard.Width,
        height: Gameboard.Height,
    });
});

// Setup various board events...
let setter = new BoardEventSetter();
setter.addPreviewShipEvent({ board: humanBrd, shipyard: humanShipyard });
setter.addPlaceShipEvent({ board: humanBrd, shipyard: humanShipyard });
// TODO: Setup computerPlaceShipEvent...
// TODO: Perhaps have a BattleShip class that keep track of various game status?
