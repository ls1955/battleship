import { Ship } from "./ship.js";

export class BattleShipController {
    constructor({ compPlayer, humanBoard, compBoard, shuffleBtn }) {
        this.compPlayer = compPlayer;
        this.humanBoard = humanBoard;
        this.compBoard = compBoard;
        this.shuffleBtn = shuffleBtn;

        this.boards = [humanBoard, compBoard];
    }

    // The sole public API that need to be call to setup everything
    initialize() {
        this.createColsInBoards();
        this.setupHumanShuffleEvent();
        this.setupHumanAttackEvents();
        this.computerPlaceShips();

        // Click the shuffle button to place ships on human board
        this.shuffleBtn.click();
        this.updateColsShipKlass({
            board: this.humanBoard,
            boardKlass: ".human-board",
        });
        this.updateColsShipKlass({
            board: this.compBoard,
            boardKlass: ".comp-board",
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

    setupHumanShuffleEvent() {
        this.shuffleBtn.addEventListener("click", () => {
            this.humanBoard.clear();
            const ships = [5, 4, 4, 3, 2].map((length) => new Ship({ length }));
            this.compPlayer.place({ ships, board: this.humanBoard });

            this.updateColsShipKlass({
                board: this.humanBoard,
                boardKlass: ".human-board",
            });
        });
    }

    // Set the human attack events on each computer board's columns
    setupHumanAttackEvents() {
        const compBoardCols = document.querySelectorAll(".comp-board .column");
        compBoardCols.forEach((c) =>
            c.addEventListener("click", this.humanAtkEvent.bind(this))
        );
    }

    humanAtkEvent(event) {
        let x = +event.target.dataset.x;
        let y = +event.target.dataset.y;
        let col = document.querySelector(`.comp-board .coor-${x}-${y}`);

        if (this.compBoard.receiveAttack({ x, y })) {
            col.classList.add("hit");
        } else {
            this.updateMissedCount({
                board: this.compBoard,
                boardKlass: "comp-board",
            });
            this.computerAttackEvent();
        }

        col.classList.add("pressed");
        col.removeEventListener("click", this.humanAtkEvent);
        this.shuffleBtn.style.display = "none";

        if (this.compBoard.isAllShipSunk()) {
            this.wrapUp({ winner: "Human player" });
        }
    }

    computerPlaceShips() {
        const ships = [5, 4, 4, 3, 2].map((length) => new Ship({ length }));
        this.compPlayer.place({ ships, board: this.compBoard });
    }

    computerAttackEvent() {
        let hadHitBoat = false;

        do {
            hadHitBoat = false;

            let [x, y] = this.compPlayer.nextAtkCoordinate();
            let col = document.querySelector(`.human-board .coor-${x}-${y}`);

            if ((hadHitBoat = this.humanBoard.receiveAttack({ x, y }))) {
                col.classList.add("hit");
            } else {
                this.updateMissedCount({
                    board: this.humanBoard,
                    boardKlass: "human-board",
                });
            }
            col.classList.add("pressed");
        } while (hadHitBoat);

        if (this.humanBoard.isAllShipSunk()) {
            this.wrapUp({ winner: "computer" });
        }
    }

    // updates the class for columns
    updateColsShipKlass({ board, boardKlass }) {
        board.grid.forEach((row, y) => {
            row.forEach((col, x) => {
                let c = document.querySelector(`${boardKlass} .coor-${x}-${y}`);
                col != null
                    ? c.classList.add("ship")
                    : c.classList.remove("ship");
            });
        });
    }

    // Update missed counter in page
    updateMissedCount({ board, boardKlass }) {
        const counter = document.querySelector(`.${boardKlass}.missed-counter`);
        counter.textContent = `Missed: ${board.missedShots}`;
    }

    // Update the DOM for the ending screen and remove attack events
    wrapUp({ winner }) {
        const h1 = document.querySelector("h1");
        h1.textContent = `The winner: ${winner}`;

        const columns = document.querySelectorAll(".comp-board .column");
        columns.forEach((c) =>
            c.removeEventListener("click", this.humanAtkEvent)
        );
    }
}

// TODOs:
// Improve shuffle button style?
