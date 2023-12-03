export class BoardDOMFiller {
    // Fill the board (DOM) with rows and columns according to width and height
    fill({ board, width, height }) {
        for (let y = 0; y < height; y++) {
            let row = document.createElement("div");
            row.classList.add("row");
            board.dom.appendChild(row);

            for (let x = 0; x < width; x++) {
                let col = document.createElement("div");
                col.dataset["x"] = x;
                col.dataset["y"] = y;
                col.classList.add("column");
                row.appendChild(col);
            }
        }
    }
}
