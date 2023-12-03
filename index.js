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

let ships = shipLengths.map((length) => new Ship({ length }));
humanBrd.shipyard = new Shipyard({ ships });
// Even though Shipyard will create a shallow copy of ships, lets be cautious
// by creating ships again because unexpected mutation is a giant potato.
ships = shipLengths.map((length) => new Ship({ length }));
compBrd.shipyard = new Shipyard({ ships });

// Fills up the board with rows and columns in DOM...
[humanBrd, compBrd].forEach((board) => {
    new BoardDOMFiller().fill({
        board,
        width: Gameboard.Width,
        height: Gameboard.Height,
    });
});

// Setup various board events (human side)...
let setter = new BoardEventSetter();
setter.addPreviewShipEvent({ board: humanBrd });
setter.addPlaceShipEvent({ board: humanBrd });

// Computer player placing their ships...
let comp = new ComputerPlayer({
    boardWidth: Gameboard.Width,
    boardHeight: Gameboard.Height,
});
let compController = new ComputerController({ computerPlayer: comp });
compController.placeShips({ board: compBrd });

// TODO: Add human attack event
// TODO: Perhaps have a BattleShip class that keep track of various game status?
