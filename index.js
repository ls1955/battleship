import { BattleShipController } from "./lib/battleship_controller.js";
import { Gameboard } from "./lib/gameboard.js";
import { Player } from "./lib/player.js";
import { ComputerPlayer } from "./lib/computer_player.js";

let humanBoard = new Gameboard();
let compBoard = new Gameboard();
let humanPlayer = new Player({ ownBoard: humanBoard, enemyBoard: compBoard });
let compPlayer = new ComputerPlayer({
    ownBoard: compBoard,
    enemyBoard: humanBoard,
});
let controller = new BattleShipController({
    humanPlayer,
    compPlayer,
    humanBoard,
    compBoard,
});

controller.initialize();
