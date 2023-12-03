import { getColumns } from "./dom_util.js";

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
        let cols = getColumns({ board, ship, x, y });

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

    addPlaceShipEvent({ board, shipyard }) {
        board.dom.addEventListener("click", (e) => {
            this.placeShip({ board, shipyard, e });
        });
    }

    // Places the ship on the board (div) and update tiles classes. Do nothing if the
    // ship could not be place.
    placeShip({ board, shipyard, e }) {
        if (shipyard.isEmpty()) return;

        let col = e.target;
        let x = +col.dataset["x"];
        let y = +col.dataset["y"];
        let ship = shipyard.ships[0];

        if (!board.canPlace({ ship, x, y })) return;

        shipyard.shift();
        board.place({ ship, x, y });
        let cols = getColumns({ board, ship, x, y });
        cols.forEach((c) => c.classList.add("ship"));
    }

    // TODO: addHumanAttackEvent;
    // TODO: addComputerAttackEvent
}
