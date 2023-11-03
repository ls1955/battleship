import { Gameboard } from "../lib/gameboard";
import { Ship } from "../lib/ship";

test("has 10 rows, each row has 10 columns", () => {
    let gameboard = new Gameboard();
    expect(gameboard.board.length).toEqual(10);
});

test("has 0 missed shots at the beginning", () => {
    let gameboard = new Gameboard();
    expect(gameboard.missedShots).toEqual(0);
});

test("could place a ship on the board", () => {
    let gameboard = new Gameboard();
    let ship = new Ship({ length: 1 });
    gameboard.place({ ship, x: 0, y: 0 });

    expect(gameboard.board[0][0]).toBe(ship);
    for (let i = 0; i < gameboard.length; i++) {
        for (let j = 0; j < GamepadButton[0].length; j++)
            if (i === 0 && j === 0) continue;

        expect(gameboard.board[i][j]).not.toBe(ship);
    }
});

test("could receive attack and transfer the hit to the ship when there is ship", () => {
    let gameboard = new Gameboard();
    let ship = new Ship({ length: 1 });
    gameboard.place({ ship, x: 0, y: 0 });
    gameboard.receiveAttack({ x: 0, y: 0 });

    expect(gameboard.board[0][0].receivedHitAmount).toEqual(1);
    expect(gameboard.missedShots).toEqual(0);
});

test("increment missedShots if receive attack on an empty coordinate", () => {
    let gameboard = new Gameboard();
    gameboard.receiveAttack({ x: 0, y: 0 });

    expect(gameboard.missedShots).toEqual(1);
});

test("return true if receive attack could transfer the hit to the ship", () => {
    let gameboard = new Gameboard();
    let ship = new Ship({ length: 1 });
    gameboard.place({ ship, x: 0, y: 0 });
    let result = gameboard.receiveAttack({ x: 0, y: 0 });

    expect(result).toBeTruthy();
});

test("return false if receive attack on an empty coordinate", () => {
    let gameboard = new Gameboard();
    let result = gameboard.receiveAttack({ x: 0, y: 0 });

    expect(result).toBeFalsy();
});

test("all ships is sunk when there is no ship", () => {
    let gameboard = new Gameboard();

    expect(gameboard.isAllShipSunk()).toBeTruthy();
});

test("all ships is not sunk when there is ship alive", () => {
    let gameboard = new Gameboard();
    let ship = new Ship({ length: 1 });
    gameboard.place({ ship, x: 0, y: 0 });

    expect(gameboard.isAllShipSunk()).toBeFalsy();
});

test("all ships is sunk when no ship alive", () => {
    let gameboard = new Gameboard();
    let ship = new Ship({ length: 1 });
    gameboard.place({ ship, x: 0, y: 0 });
    gameboard.receiveAttack({ x: 0, y: 0 });

    expect(gameboard.isAllShipSunk()).toBeTruthy();
});
