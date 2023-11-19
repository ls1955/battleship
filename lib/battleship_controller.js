import { Ship } from "./ship.js";

export class BattleShipController {
    constructor({ compPlayer, humanBoard, compBoard }) {
        this.compPlayer = compPlayer;
        this.humanBoard = humanBoard;
        this.compBoard = compBoard;

        this.boards = [humanBoard, compBoard];

        this.atkEvent = (event) => {
            let x = +event.target.dataset.x;
            let y = +event.target.dataset.y;
            let col = document.querySelector(`.comp-board .coor-${x}-${y}`);

            if (this.compBoard.receiveAttack({ x, y })) {
                col.classList.add("hit");
            } else {
                this.computerAttackEvent();
            }

            col.classList.add("pressed");
            col.removeEventListener("click", this.atkEvent);
            // TODO: Do something when all the enemy ship has been sunk
        };

        // Have a flag to know if human start attacking?
    }

    // The sole public API that need to be call to setip everything
    initialize() {
        // this.initializeHeader()
        this.createColsInBoards();
        this.placeShipOnBoards();
        this.setupHumanAttackEvents();
        this.updateColsShipKlass({
            board: this.humanBoard,
            cssKlass: ".human-board",
        });
        this.updateColsShipKlass({
            board: this.compBoard,
            cssKlass: ".comp-board",
        });
    }

    // Create and appends columns into boardDivs
    createColsInBoards() {
        const boardDivs = document.querySelectorAll(".board");

        boardDivs.forEach((div) => {
            for (let y = 0; y < this.humanBoard.grid.length; y++) {
                let lastRow = document.createElement("div");
                lastRow.classList.add("row");
                div.appendChild(lastRow);

                for (let x = 0; x < this.humanBoard.grid[0].length; x++) {
                    let c = document.createElement("div");
                    c.classList.add("column");
                    c.classList.add(`coor-${x}-${y}`);
                    c.dataset.x = x;
                    c.dataset.y = y;
                    lastRow.appendChild(c);
                }
            }
        });
    }

    // Place the ships on hardcoded coordinates
    placeShipOnBoards() {
        this.boards.forEach((board) => {
            let shipLengths = [5, 4, 4, 3, 2];
            let coors = [
                [0, 0],
                [0, 3],
                [2, 5],
                [0, 6],
                [3, 7],
            ];

            shipLengths.forEach((length, i) => {
                board.place({
                    ship: new Ship({ length }),
                    x: coors[i][0],
                    y: coors[i][1],
                });
            });
        });
    }

    // Set the human attack events on each computer board's columns
    setupHumanAttackEvents() {
        const compBoardCols = document.querySelectorAll(".comp-board .column");
        compBoardCols.forEach((c) =>
            c.addEventListener("click", this.atkEvent)
        );
    }

    // An event that allows computer player to attack the human board
    computerAttackEvent() {
        // TODO: Allow the computer to keep on attacking if it hit?

        let [x, y] = this.compPlayer.nextAtkCoordinate();
        let col = document.querySelector(`.human-board .coor-${x}-${y}`);

        if (this.compBoard.receiveAttack({ x, y })) col.classList.add("hit");
        col.classList.add("pressed");

        // TODO: Do something when all human ships are sunk
    }

    updateColsShipKlass({ board, cssKlass }) {
        board.grid.forEach((row, y) => {
            row.forEach((col, x) => {
                let c = document.querySelector(`${cssKlass} .coor-${x}-${y}`);
                if (col != null) {
                    c.classList.add("ship");
                } else {
                    c.classList.remove("ship");
                }
            });
        });
    }
}

/*
    What are some easy way of placing the ship?
    Well, we could show and place all the ships on human board beforehand
    And allow the ship to be drag and move around by the human before
    they actually start attacking. If the mouse movement will be over bound,
    one way of resolving it could be just ensure the ship stay in bound the
    whole time. As for the computer board... I guess we could just let computer
    player handle it internally? Since we will not show their ships on the
    screen anyway. ...in terms of how to implement it though....
*/
