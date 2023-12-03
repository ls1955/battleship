export class BoardEventSetter {
    addPreviewShipEvent({ board, shipyard }) {
        board.addEventListener("mouseover", (e) => {
            this.clearPreview({ board });
            this.addPreview({ board, shipyard, e });
        });

        board.addEventListener("mouseleave", () => {
            this.clearPreview({ board });
        });
    }

    // Add preview-related class to the affected tile inside the board.
    addPreview({ board, shipyard, e }) {
        if (shipyard.isEmpty()) return;

        let tile = e.target;
        let x = +tile.dataset["x"];
        let y = +tile.dataset["y"];
        let ship = shipyard.ships[0];
        let tiles = getShipTiles({ ship, x, y });

        if (board.isValidCoor({ x, y, ship })) {
            tiles.forEach((tile) => {
                tile.classList.add("preview-valid");
                tile.classList.remove("preview-invalid");
            });
        } else {
            tiles.forEach((tile) => {
                tile.classList.add("preview-invalid");
                tile.classList.remove("preview-valid");
            });
        }
    }

    // Remove all the preview-related class from tiles inside the board.
    clearPreview({ board }) {
        board.querySelectorAll(".tiles").forEach((t) => {
            t.classList.remove("preview-valid", "preview-invalid");
        });
    }

    addPutShipEvent({ board, shipyard }) {
        board.addEventListener("click", (e) => {
            this.putShip({ board, shipyard, e });
        });
    }

    // Puts the ship on the board (div) and update tiles classes.
    // Do nothing if invalid coordinate or there is no ship to place.
    putShip({ board, shipyard, e }) {
        if (shipyard.isEmpty()) return;

        let tile = e.target;
        let x = +tile.dataset["x"];
        let y = +tile.dataset["y"];
        let ship = shipyard[0];

        if (!board.isValidCoor({ x, y, ship })) return;

        shipyard.shift();
        for (let offset = 0; offset < ship.length; offset++) {
            let currX = x + offset;
            // NOTE: Should call the board public api...
            board.shipCoordinates.push([currX, y + offset]);
            this.getTile({ board, x: currX, y }).classList.add("ship");
        }
    }

    // A helper method that returns the tile at (x, y) from board.
    // TODO: Perhaps move it to another module?
    getTile({ board, x, y }) {
        return board.querySelector(`.tile[data-x="${x}"][data-y="${y}"]`);
    }

    // TODO: addHumanAttackEvent;
    // TODO: addComputerAttackEvent
}
