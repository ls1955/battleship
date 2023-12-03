import {
    clearPreviewCSSKlass,
    getColumns,
    setPreviewInvalidCSSKlass,
    setPreviewValidCSSKlass,
    updateShipCSSKlass,
} from "./dom_util.js";

export class BoardEventSetter {
    // Adds the preview ship event to the board. Should only call this function for each
    // board once.
    addPreviewShipEvent({ board }) {
        board.dom.addEventListener("mouseover", (e) => {
            clearPreviewCSSKlass({ board });
            this.addPreview({ board, e });
        });

        board.dom.addEventListener("mouseleave", () => {
            clearPreviewCSSKlass({ board });
        });
    }

    // Adds preview-related class to the affected columns inside the board.
    addPreview({ board, e }) {
        if (board.shipyard.isEmpty()) return;

        let col = e.target;
        let x = +col.dataset["x"];
        let y = +col.dataset["y"];
        let ship = board.shipyard.ships[0];
        let cols = getColumns({ board, ship, x, y });

        if (board.canPlace({ ship, x, y })) {
            cols.forEach((c) => {
                setPreviewValidCSSKlass({ column: c });
            });
        } else {
            cols.forEach((c) => {
                setPreviewInvalidCSSKlass({ column: c });
            });
        }
    }

    addPlaceShipEvent({ board }) {
        board.dom.addEventListener("click", (e) => {
            this.placeShip({ board, e });
        });
    }

    // Places the ship on the board (div) and update tiles classes. Do nothing if the
    // ship could not be place.
    placeShip({ board, e }) {
        if (board.shipyard.isEmpty()) return;

        let col = e.target;
        let x = +col.dataset["x"];
        let y = +col.dataset["y"];
        let ship = board.shipyard.ships[0];

        if (!board.canPlace({ ship, x, y })) return;

        board.shipyard.shift();
        board.place({ ship, x, y });
        updateShipCSSKlass({ board });
    }

    // TODO: addHumanAttackEvent;
    // TODO: addComputerAttackEvent
}
