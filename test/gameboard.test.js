import { Gameboard } from "../src/gameboard";
import { Ship } from "../src/ship";

let board = null;
beforeEach(() => (board = new Gameboard()));

test("it has 10 rows and each row has 10 columns", () => {
    expect(board.grid.length).toEqual(10);
    expect(board.grid[0].length).toEqual(10);
});

test("it has 0 missed shots at the beginning", () => {
    expect(board.missedShots).toEqual(0);
});

test("it could place a ship on the grid", () => {
    let ship = new Ship({ length: 1 });
    let x = 0;
    let y = 0;
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

test("it could place a ship horizontally on grid according to it length", () => {
    let ship = new Ship({ length: 10 });
    board.place({ ship, x: 0, y: 0 });

    board.grid[0].forEach((col) => expect(col).toBe(ship));
});

test("it return false if a ship could not fit into the row", () => {
    let ship = new Ship({ length: 10 });

    expect(board.place({ ship, x: 1, y: 0 })).toBeFalsy();
});

test("it could receive attack and transfer the hit to the ship when there is ship", () => {
    let ship = new Ship({ length: 1 });
    board.place({ ship, x: 0, y: 0 });
    board.receiveAttack({ x: 0, y: 0 });

    expect(board.grid[0][0].receivedHitAmount).toEqual(1);
    expect(board.missedShots).toEqual(0);
});

test("it increment missedShots if receive attack on an empty coordinate", () => {
    board.receiveAttack({ x: 0, y: 0 });
    expect(board.missedShots).toEqual(1);
});

test("it return true if receive attack could transfer the hit to the ship", () => {
    let ship = new Ship({ length: 1 });
    let x = 0;
    let y = 0;
    board.place({ ship, x, y });

    expect(board.receiveAttack({ x, y })).toBeTruthy();
});

test("it return false if receive attack on an empty coordinate", () => {
    expect(board.receiveAttack({ x: 0, y: 0 })).toBeFalsy();
});

test("all ships is sunk when there is no ship", () => {
    expect(board.isAllShipSunk()).toBeTruthy();
});

test("all ships is not sunk when there is ship alive", () => {
    let ship = new Ship({ length: 1 });
    board.place({ ship, x: 0, y: 0 });

    expect(board.isAllShipSunk()).toBeFalsy();
});

test("all ships is sunk when no ship alive", () => {
    let ship = new Ship({ length: 1 });
    board.place({ ship, x: 0, y: 0 });
    board.receiveAttack({ x: 0, y: 0 });

    expect(board.isAllShipSunk()).toBeTruthy();
});

test("it could clear the grid", () => {
    let board = new Gameboard();
    let ship = new Ship({ length: 1 });

    board.place({ ship, x: 0, y: 0 });
    expect(board.isAllShipSunk()).toBeFalsy();

    board.clear();
    expect(board.isAllShipSunk()).toBeTruthy();
});
