export class BoardEventSetter {
    // Adds the preview ship event to the board. Should only call this function for each
    // board once.
    addPreviewShipEvent({ board, shipyard }) {
        board.dom.addEventListener("mouseover", (e) => {
            this.clearPreview({ board });
            this.addPreview({ board, shipyard, e });
        });

        board.dom.addEventListener("mouseleave", () => {
            this.clearPreview({ board });
        });
    }

    // Removes all the preview-related class from columns inside the board.
    clearPreview({ board }) {
        board.dom.querySelectorAll(".column").forEach((t) => {
            t.classList.remove("preview-valid", "preview-invalid");
        });
    }

    // Adds preview-related class to the affected columns inside the board.
    addPreview({ board, shipyard, e }) {
        if (shipyard.isEmpty()) return;

        let col = e.target;
        let x = +col.dataset["x"];
        let y = +col.dataset["y"];
        let ship = shipyard.ships[0];
        let cols = this.getColumns({ board, ship, x, y });

        if (board.canPlace({ ship, x, y })) {
            cols.forEach((c) => {
                c.classList.add("preview-valid");
                c.classList.remove("preview-invalid");
            });
        } else {
            cols.forEach((c) => {
                c.classList.add("preview-invalid");
                c.classList.remove("preview-valid");
            });
        }
    }

    // Returns columns (DOM) from the board, if they exist.
    getColumns({ board, ship, x, y }) {
        const result = [];

        for (let offset = 0; offset < ship.length; offset++) {
            let currX = x + offset;
            let column = board.dom.querySelector(
                `.column[data-x="${currX}"][data-y="${y}"]`
            );

            if (column != null) result.push(column);
        }

        return result;
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
        board.place({ ship, x, y });
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
