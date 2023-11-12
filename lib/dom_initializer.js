export class DOMInitializer {
    initializeElements() {
        // this.initializeHeader()
        this.initializeBoards()
        // this.setupColumnsClickEvents()
        // Might wanna add pointer event to the columns,
        // then disable them after being clicked by user
        // Might wanna use a Promise when waiting for user to click the board
    }

    initializeBoards() {
        const body = document.querySelector("body")
        const boardsContainer = document.createElement("div")
        boardsContainer.classList.add("boards-container")

        for (let i = 0; i < 2; i++) {
            let board = document.createElement("div")
            board.classList.add("board")

            for (let y = 0; y < 10; y++) {
                let lastRow = document.createElement("div")
                lastRow.classList.add("row")
                board.appendChild(lastRow)

                for (let x = 0; x < 10; x++) {
                    let column = document.createElement("div")
                    column.classList.add("column")
                    column.dataset.coordinate = `${x}-${y}`
                    lastRow.appendChild(column)
                }
            }
            boardsContainer.appendChild(board)
            body.appendChild(boardsContainer)
        }
    }
}
