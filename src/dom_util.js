// Returns columns (DOMs) inside the board (DOM) that are occupy by ship, if they exist.
function getColumns({ board, ship, x, y }) {
    const result = [];

    for (let offset = 0; offset < ship.length; offset++) {
        let c = getColumn({board, x: x + offset, y})
        if (c != null) result.push(c);
    }

    return result;
}

// Returns column (DOM) at (x, y) coordinate inside the board (DOM), or undefined if
// it does not exist.
function getColumn({ board, x, y }) {
    return board.dom.querySelector(`.column[data-x="${x}"][data-y="${y}"]`);
}

export { getColumns, getColumn }
