import { Gameboard } from "./src/gameboard.js";
import { BoardDOMFiller } from "./src/board_dom_filler.js";

let humanBrd = new Gameboard();
let compBrd = new Gameboard();
humanBrd.dom = document.querySelector(".human-board");
compBrd.dom = document.querySelector(".computer-board");

[humanBrd, compBrd].forEach((board) => {
    new BoardDOMFiller().fill({
        board,
        width: Gameboard.Width,
        height: Gameboard.Height,
    });
});
