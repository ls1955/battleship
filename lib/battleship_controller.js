export class BattleShipController {
    constructor({ humanPlayer, compPlayer, humanBoard, compBoard }) {
        this.humanPlayer = humanPlayer;
        this.compPlayer = compPlayer;
        this.humanBoard = humanBoard;
        this.compBoard = compBoard;

        this.boards = [humanBoard, compBoard];
    }

    initialize() {
        // this.initializeHeader()
        this.initializeBoards();
        // this.placeShips();
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
            document.querySelector("body").appendChild(boardsContainer);
        });

        const boards = document.querySelectorAll(".board");
        boards[0].classList.add("human-board");
        boards[1].classList.add("computer-board");
    }

    setupHumanAttackEvents() {
        const atkEvent = (event) => {
            // TODO: Early return if the event.target is disabled

            let x = event.target.dataset.x;
            let y = event.target.dataset.y;
            let col = document.querySelector(`.computer-board .coor-${x}-${y}`);

            if (this.humanPlayer.attack({ x, y })) {
                col.classList.add("hit");
            } else {
                col.classList.add("missed");
                console.log("comp atk...");
                this.computerAttackEvent();
            }

            // TODO: disable neighbouring grid?
            col.removeEventListener("click", atkEvent);
            col.classList.add("pressed");
        };

        const compBoardCols = document.querySelectorAll(
            ".computer-board .column"
        );
        compBoardCols.forEach((col) => col.addEventListener("click", atkEvent));
    }

    computerAttackEvent() {
        // TODO: Allow the computer to keep on attacking if it hit?

        let [x, y] = this.compPlayer.nextAtkCoordinate();
        let col = document.querySelector(`.human-board .coor-${x}-${y}`);

        if (this.compPlayer.attack({ x, y })) {
            col.classList.add("hit");
        } else {
            col.classList.add("missed");
        }
        col.classList.add("pressed");
    }
}
