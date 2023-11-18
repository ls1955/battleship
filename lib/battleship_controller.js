import { Ship } from "./ship.js";

export class BattleShipController {
    constructor({ compPlayer, humanBoard, compBoard }) {
        this.compPlayer = compPlayer;
        this.humanBoard = humanBoard;
        this.compBoard = compBoard;

        this.boards = [humanBoard, compBoard];

        // Have a flag to know if human start attacking?
    }

    // The sole public API that need to be call to setip everything
    initialize() {
        // this.initializeHeader()
        this.createColsInBoards();
        this.placeShipOnBoards();
        this.setupHumanAttackEvents();
        this.showHumanBoardShips();
    }

    // Create and appends two boards into the webpage
    createColsInBoards() {
        const boardDivs = document.querySelectorAll(".board")

        console.log({boardDivs})
        boardDivs.forEach((div) => {
            for (let y = 0; y < this.humanBoard.board.length; y++) {
                let lastRow = document.createElement("div");
                lastRow.classList.add("row");
                div.appendChild(lastRow);

                for (let x = 0; x < this.humanBoard.board[0].length; x++) {
                    let col = document.createElement("div");
                    col.classList.add("column");
                    col.classList.add(`coor-${x}-${y}`);
                    col.dataset.x = x;
                    col.dataset.y = y;
                    lastRow.appendChild(col);
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
        const atkEvent = (event) => {
            let x = +event.target.dataset.x;
            let y = +event.target.dataset.y;
            let col = document.querySelector(`.computer-board .coor-${x}-${y}`);

            if (this.compBoard.receiveAttack({ x, y })) {
                col.classList.add("hit");
                this.pressNeighbor({ originX: x, originY: y });
            } else {
                col.classList.add("missed");
                this.computerAttackEvent();
            }

            col.removeEventListener("click", atkEvent);
            col.classList.add("pressed");

            // TODO: Do something when all the enemy ship has been sunk
        };

        const compBoardCols = document.querySelectorAll(
            ".computer-board .column"
        );
        compBoardCols.forEach((col) => col.addEventListener("click", atkEvent));
    }

    // An event that allows computer player to attack the human board
    computerAttackEvent() {
        // TODO: Allow the computer to keep on attacking if it hit?

        let [x, y] = this.compPlayer.nextAtkCoordinate();
        let col = document.querySelector(`.human-board .coor-${x}-${y}`);

        if (this.compBoard.receiveAttack({ x, y })) {
            col.classList.add("hit");
        } else {
            col.classList.add("missed");
        }
        col.classList.add("pressed");

        // TODO: Do something when all human ships are sunk
    }

    pressNeighbor({ originX, originY }) {
        [
            [0, -1],
            [0, 1],
            [-1, 0],
            [1, 0],
        ].forEach((offset) => {
            let x = originX + offset[0];
            let y = originY + offset[1];
            let col = document.querySelector(
                `.computer-board .coor-${x}-${y}:not(.ship)`
            );

            col?.classList.add("pressed");
        });
    }

    // TODO: Add .ship class for computer board

    // Display the ships on human's board via CSS
    showHumanBoardShips() {
        this.humanBoard.board.forEach((row, y) => {
            row.forEach((col, x) => {
                let colDiv = document.querySelector(
                    `.human-board .coor-${x}-${y}`
                );
                if (col != null) {
                    colDiv.classList.add("ship");
                } else {
                    colDiv.classList.remove("ship");
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
