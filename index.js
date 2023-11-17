import { BattleShipController } from "./lib/battleship_controller.js";
import { Gameboard } from "./lib/gameboard.js";
import { ComputerPlayer } from "./lib/computer_player.js";

let humanBoard = new Gameboard();
let compBoard = new Gameboard();
let compPlayer = new ComputerPlayer({
    ownBoard: compBoard,
    enemyBoard: humanBoard,
});
let controller = new BattleShipController({
    compPlayer,
    humanBoard,
    compBoard,
});

controller.initialize();
