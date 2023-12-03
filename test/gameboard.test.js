import { Gameboard } from "../src/gameboard";
import { Ship } from "../src/ship";

describe("Gameboard", () => {
    let board = null;
    beforeEach(() => (board = new Gameboard()));

    describe("#constructor", () => {
        it("has 10 rows and each row has 10 columns", () => {
            expect(board.grid.length).toEqual(10);
            expect(board.grid[0].length).toEqual(10);
        });

        it("has 0 missed shots", () => {
            expect(board.missedShots).toEqual(0);
        });
    });

    describe("#place", () => {
        it("could place a ship on grid", () => {
            let [x, y, ship] = [0, 0, new Ship({ length: 1 })];
            board.place({ ship, x, y });

            board.grid.forEach((row, _y) => {
                row.forEach((col, _x) => {
                    if (_x === x && _y === y) {
                        expect(col).toBe(ship);
                    } else {
                        expect(col).not.toBe(ship);
                    }
                });
            });
        });

        it("could fit a ship on a row", () => {
            let [x, y, ship] = [0, 0, new Ship({ length: 10 })];
            board.place({ ship, x, y });
            board.grid[0].forEach((c) => expect(c).toBe(ship));
        });
    });

    describe("#receiveAttack", () => {
        it("could receive and transfer the attack to ship", () => {
            let [x, y, ship] = [0, 0, new Ship({ length: 1 })];
            board.place({ ship, x, y });
            board.receiveAttack({ x, y });

            expect(ship.receivedHitAmount).toEqual(1);
        });

        it("increment missedShots if the attack missed", () => {
            board.receiveAttack({ x: 0, y: 0 });
            expect(board.missedShots).toEqual(1);
        });
    });

    describe("#isAllShipSunk", () => {
        it("is when there is no ship", () => {
            expect(board.isAllShipSunk()).toBeTruthy();
        });

        it("is not when there is ship alive", () => {
            let ship = new Ship({ length: 1 });
            board.place({ ship, x: 0, y: 0 });

            expect(board.isAllShipSunk()).toBeFalsy();
        });

        it("is when no ship alive", () => {
            let ship = new Ship({ length: 1 });
            board.place({ ship, x: 0, y: 0 });
            board.receiveAttack({ x: 0, y: 0 });

            expect(board.isAllShipSunk()).toBeTruthy();
        });
    });

    describe("#clear", () => {
        it("could clear the grid", () => {
            let ship = new Ship({ length: 1 });

            board.place({ ship, x: 0, y: 0 });
            expect(board.isAllShipSunk()).toBeFalsy();

            board.clear();
            expect(board.isAllShipSunk()).toBeTruthy();
        });
    });

    describe("#canPlace", () => {
        it("can place a ship at unoccupied space", () => {
            let ship = new Ship({ length: 1 });
            expect(board.canPlace({ ship, x: 0, y: 0 })).toBeTruthy();
        });

        it("cannot place a ship that could not fit into the row", () => {
            let ship = new Ship({ length: 11 });
            expect(board.canPlace({ ship, x: 0, y: 0 })).toBeFalsy();
        });

        it("cannot place a ship that is overlapping with other ship", () => {
            let [x, y, ship] = [0, 0, new Ship({ length: 1 })];
            board.place({ ship, x, y });
            expect(board.canPlace({ ship, x, y })).toBeFalsy();
        });
    });
});
