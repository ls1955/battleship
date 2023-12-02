export class BoardEventSetter {
    setPreviewShipEvent({ board, ship, shipyard }) {
        // TODO
    }

    setAddShipEvent({ board, shipyard }) {
        board.addEventListener("click", (e) => {
            let tile = e.target;
            let x = +tile.dataset["x"];
            let y = +tile.dataset["y"];

            if (shipyard.isEmpty() || !board.isValidCoor({ x, y })) return;

            let ship = shipyard.shift;
            for (let offset = 0; offset < ship.length; offset++) {
                board.shipCoordinates.push([x + offset, y + offset]);
                board
                    .querySelector(`.tile[data-x="${x}"][data-y="${y}"]`)
                    .classList.add("ship");
            }
        });
    }
}
