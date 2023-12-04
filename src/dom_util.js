import { Ship } from "./ship.js";

// A collections of static methods that deal with DOM element and CSS.
export class Util {
    // Returns columns (DOMs) inside the board (DOM) that are occupy by ship, if they exist.
    static getColumns({ board, ship, x, y }) {
        const result = [];

        for (let offset = 0; offset < ship.length; offset++) {
            let c = this.getColumn({ board, x: x + offset, y });
            if (c != null) result.push(c);
        }

        return result;
    }

    // Returns column (DOM) at (x, y) coordinate inside the board (DOM), or undefined if
    // it does not exist.
    static getColumn({ board, x, y }) {
        return board.dom.querySelector(`.column[data-x="${x}"][data-y="${y}"]`);
    }

    // Removes all the preview-related class from columns inside the board.
    static clearPreviewCSS({ board }) {
        board.dom.querySelectorAll(".column").forEach((c) => {
            c.classList.remove("preview-valid", "preview-invalid");
        });
    }

    // Sets column (DOM)'s CSS as valid preview.
    static setPreviewValidCSS({ column }) {
        column.classList.add("preview-valid");
        column.classList.remove("preview-invalid");
    }

    // Sets column (DOM)'s CSS as invalid preview.
    static setPreviewInvalidCSS({ column }) {
        column.classList.add("preview-invalid");
        column.classList.remove("preview-valid");
    }

    // Sets columns' CSS (DOMs) in board as ship if occupy by ship.
    static updateShipCSS({ board }) {
        board.grid.forEach((row, y) => {
            row.forEach((col, x) => {
                let c = this.getColumn({ board, x, y });

                col instanceof Ship
                    ? c.classList.add("ship")
                    : c.classList.remove("ship");
            });
        });
    }
}
