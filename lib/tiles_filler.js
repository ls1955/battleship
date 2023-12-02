export class TilesFiller {
    // Fill the boards (div) with tiles according to width and height
    fill({ boards, width, height }) {
        boards.forEach((board) => {
            for (let y = 0; y < height; y++) {
                for (let x = 0; x < width; x++) {
                    let tile = document.createElement("div");
                    tile.dataset["x"] = x;
                    tile.dataset["y"] = y;
                    tile.classList.add("tile");

                    board.appendChild(tile);
                }
            }
        });
    }
}
