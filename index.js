import { BoardEvent } from "./src/board_event.js";
import { ComputerController } from "./src/computer_controller.js";
import { ComputerPlayer } from "./src/computer_player.js";
import { Gameboard } from "./src/gameboard.js";
import { Ship } from "./src/ship.js";
import { Shipyard } from "./src/shipyard.js";
import { Util } from "./src/dom_util.js";

// Hardcode the ship lengths for both player, modify this to your desired lengths.
const shipLengths = [5, 4, 4, 3, 2, 2];

let humanBrd = new Gameboard();
let compBrd = new Gameboard();

// Setup the dom representations for both board, they will be use when setting up DOM events.
humanBrd.dom = document.querySelector(".human-board");
compBrd.dom = document.querySelector(".computer-board");

// Setup the name for both board, they will be use when announcing winner name.
// Override them to your desire name.
humanBrd.name = "Human";
compBrd.name = "Computer";

let ships = shipLengths.map((length) => new Ship({ length }));
humanBrd.shipyard = new Shipyard({ ships });
// Even though Shipyard will create a shallow copy of ships, lets be cautious
// by creating ships again because unexpected mutation is a giant potato.
ships = shipLengths.map((length) => new Ship({ length }));
compBrd.shipyard = new Shipyard({ ships });

// Populate the boards with rows and columns in DOM...
[humanBrd, compBrd].forEach((board) => Util.populate({ board }));

// Let computer player place their ships...
let comp = new ComputerPlayer({
    boardWidth: Gameboard.Width,
    boardHeight: Gameboard.Height,
});
let compController = new ComputerController({ computerPlayer: comp });
compController.placeShips({ board: compBrd });

// Setup various board events (human side)...
BoardEvent.addPreviewShipEvent({ board: humanBrd });
BoardEvent.addPlaceShipEvent({ board: humanBrd });
BoardEvent.addReceiveAttackEvent({
    board: compBrd,
    opponentBoard: humanBrd,
    compController,
});

// TODO: Revive the shuffle button
// Have another BoardEvent or another thing that shows the winner?
