export class BattleShipController {
    constructor({ humanPlayer, compPlayer, humanBoard, compBoard }) {
        this.humanPlayer = humanPlayer;
        this.compPlayer = compPlayer;
        this.humanBoard = humanBoard;
        this.compBoard = compBoard;

        this.boards = [humanBoard, compBoard];
        this.pageBody = document.querySelector("body");
    }

    initialize() {
        // this.initializeHeader()
        this.initializeBoards();
        this.setupHumanAttackEvents();
    }

    // Create and appends two boards into the webpage
    initializeBoards() {
        const boardsContainer = document.createElement("div");
        boardsContainer.classList.add("boards-container");

        this.boards.forEach((board) => {
            let boardDiv = document.createElement("div");
            boardDiv.classList.add("board");

            for (let y = 0; y < board.board.length; y++) {
                let lastRow = document.createElement("div");
                lastRow.classList.add("row");
                boardDiv.appendChild(lastRow);

                for (let x = 0; x < board.board[0].length; x++) {
                    let col = document.createElement("div");
                    col.classList.add("column");
                    col.classList.add(`coor-${x}-${y}`);
                    col.dataset.x = x;
                    col.dataset.y = y;
                    lastRow.appendChild(col);
                }
            }
            boardsContainer.appendChild(boardDiv);
            this.pageBody.appendChild(boardsContainer);
        });

        const boards = document.querySelectorAll(".board");
        boards[0].classList.add("human-board");
        boards[1].classList.add("computer-board");
    }

    setupHumanAttackEvents() {
        const attackEvent = (event) => {
            // TODO: Early return if the event.target is disabled

            let x = event.target.dataset.x;
            let y = event.target.dataset.y;
            let col = document.querySelector(`.computer-board .coor-${x}-${y}`);

            if (this.humanPlayer.attack({ x, y })) {
                col.classList.add("hit");
            } else {
                col.classList.add("missed");
            }

            // TODO: disable neighbouring grid?
            col.removeEventListener("click", attackEvent);
            col.classList.add("pressed");
        };

        const compBoardCols = document.querySelectorAll(
            ".computer-board .column"
        );
        compBoardCols.forEach((col) =>
            col.addEventListener("click", attackEvent)
        );
    }

    computerAttackEvent() {
        // let computer attack first
        // style the grid acoordingly
    }
}
