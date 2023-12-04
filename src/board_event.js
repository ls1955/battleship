import { Util } from "./dom_util.js";

export class BoardEvent {
    // Adds the preview ship event to the board.
    static addPreviewShipEvent({ board }) {
        board.dom.addEventListener("mouseover", (e) => {
            Util.clearPreviewCSS({ board });
            this.addPreview({ board, e });
        });

        board.dom.addEventListener("mouseleave", () => {
            Util.clearPreviewCSS({ board });
        });
    }

    // Adds preview-related class to the affected columns inside the board.
    static addPreview({ board, e }) {
        if (board.shipyard.isEmpty()) return;

        let { x, y } = Util.extractParams({ event: e });
        let ship = board.shipyard.ships[0];
        let cols = Util.getColumns({ board, ship, x, y });

        if (board.canPlace({ ship, x, y })) {
            cols.forEach((column) => {
                Util.setCSSKlasses({
                    column,
                    adds: ["preview-valid"],
                    removes: ["preview-invalid"],
                });
            });
        } else {
            cols.forEach((column) => {
                Util.setCSSKlasses({
                    column,
                    adds: ["preview-invalid"],
                    removes: ["preview-valid"],
                });
            });
        }
    }

    // Adds the place ship event to the board.
    static addPlaceShipEvent({ board }) {
        board.dom.addEventListener("click", (e) => {
            this.placeShip({ board, e });
        });
    }

    // Places the ship on the board (div) and update tiles classes. Do nothing if the
    // ship could not be place.
    static placeShip({ board, e }) {
        if (board.shipyard.isEmpty()) return;

        let { x, y } = Util.extractParams({ event: e });
        let ship = board.shipyard.ships[0];

        if (!board.canPlace({ ship, x, y })) return;

        board.shipyard.shift();
        board.place({ ship, x, y });
        Util.updateShipCSS({ board });
    }

    // Adds a receive attack event to the board. For current implementation,
    // it accepts a compController for computer player to attack the opponentBoard
    // (note that the board param in this context is computer player's board)
    static addReceiveAttackEvent({ board, opponentBoard, compController }) {
        board.dom.addEventListener("click", (e) => {
            // Opponent hasn't place all their ships, game hasn't begin
            if (!opponentBoard.shipyard.isEmpty()) return;

            let { column, x, y } = Util.extractParams({ event: e });

            if (board.hadAttack({ x, y })) return;

            if (board.receiveAttack({ x, y })) {
                Util.setCSSKlasses({ column, adds: ["hit"], removes: [] });
            } else {
                Util.setCSSKlasses({ column, adds: ["miss"], removes: [] });
                Util.incrementMissedCount({ board });
                compController.attack({ board: opponentBoard });
            }
        });
    }
}
