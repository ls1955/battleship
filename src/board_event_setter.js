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

        if (board.canPlace({ ship, x, y })) {
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

    addPlaceShipEvent({ board, shipyard }) {
        board.addEventListener("click", (e) => {
            this.placeShip({ board, shipyard, e });
        });
    }

    // Puts the ship on the board (div) and update tiles classes.
    // Do nothing if invalid coordinate or there is no ship to place.
    placeShip({ board, shipyard, e }) {
        if (shipyard.isEmpty()) return;

        let tile = e.target;
        let x = +tile.dataset["x"];
        let y = +tile.dataset["y"];
        let ship = shipyard[0];

        if (!board.canPlace({ ship, x, y })) return;

        shipyard.shift();
        board.place({ship, x, y})
        for (let offset = 0; offset < ship.length; offset++) {
            this.getTile({ board, x: x + offset, y }).classList.add("ship");
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
