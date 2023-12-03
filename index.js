import { ComputerPlayer } from "./src/computer_player.js";
import { ComputerController } from "./src/computer_controller.js";
import { Gameboard } from "./src/gameboard.js";
import { BoardDOMFiller } from "./src/board_dom_filler.js";
import { BoardEventSetter } from "./src/board_event_setter.js";
import { Shipyard } from "./src/shipyard.js";
import { Ship } from "./src/ship.js";

// Hardcode the ship lengths for both player, modify this to your desired lengths.
const shipLengths = [5, 4, 4, 3, 2, 2];

let humanBrd = new Gameboard();
let compBrd = new Gameboard();
humanBrd.dom = document.querySelector(".human-board");
compBrd.dom = document.querySelector(".computer-board");

// Fills up the board with rows and columns in DOM...
[humanBrd, compBrd].forEach((board) => {
    new BoardDOMFiller().fill({
        board,
        width: Gameboard.Width,
        height: Gameboard.Height,
    });
});

let ships = shipLengths.map((length) => new Ship({ length }));
let humanShipyard = new Shipyard({ ships });

// Setup various board events (human side)...
let setter = new BoardEventSetter();
setter.addPreviewShipEvent({ board: humanBrd, shipyard: humanShipyard });
setter.addPlaceShipEvent({ board: humanBrd, shipyard: humanShipyard });

// Computer player placing their ships...
let comp = new ComputerPlayer({
    boardWidth: Gameboard.Width,
    boardHeight: Gameboard.Height,
});
let compShipyard = new Shipyard({ ships });
let compController = new ComputerController({ computerPlayer: comp });
compController.placeShips({ board: compBrd, shipyard: compShipyard });

// TODO: Add human attack event
// TODO: Perhaps have a BattleShip class that keep track of various game status?
