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
        // this.setupHumanAttackEvents()
    }

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
                    let column = document.createElement("div");
                    column.classList.add("column");
                    column.dataset.x = x;
                    column.dataset.y = y;
                    lastRow.appendChild(column);
                }
            }
            boardsContainer.appendChild(boardDiv);
            this.pageBody.appendChild(boardsContainer);
        });
    }

    setupHumanAttackEvents() {
        const attackEvent = (event) => {
            // Early return if the event.target already marked as pressed?
            // Case for those neighbouring grids that have been disabled
            // but not yet clicked.

            let x = event.target.dataset.x
            let y = event.target.dataset.y

            if (this.humanPlayer.attack({x, y})) {
                // select the grid in dom and style it accordingly
                // add a class like "hit"
            } else {
                // add a class like "miss"
                // computerAttackEvent()
            }

            // TODO: disable neighbouring grid?

            event.target.removeEventListener("click", attackEvent)
            event.target.classList.add("pressed")
        }
    }

    computerAttackEvent() {
        // let computer attack first
        // style the grid acoordingly
    }
}
