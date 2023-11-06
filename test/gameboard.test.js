import { Gameboard } from "../lib/gameboard";
import { Ship } from "../lib/ship";

test("it has 10 rows, each row has 10 columns", () => {
    let gameboard = new Gameboard();
    expect(gameboard.board.length).toEqual(10);
});

test("it has 0 missed shots at the beginning", () => {
    let gameboard = new Gameboard();
    expect(gameboard.missedShots).toEqual(0);
});

test("it could place a ship on the board", () => {
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

test("it could place a ship horizontally on board according to it length", () => {
    let gameboard = new Gameboard();
    let ship = new Ship({ length: 10 });
    gameboard.place({ ship, x: 0, y: 0 });

    gameboard.board[0].forEach(slot => expect(slot).toBe(ship))
});

test("it return false if a ship is place on invalid coordinate", () => {
    let gameboard = new Gameboard();
    let ship = new Ship({ length: 1 });

    expect(gameboard.place({ ship, x: 0, y: 11 })).toBeFalsy();
    expect(gameboard.place({ ship, x: 0, y: -1 })).toBeFalsy();
    expect(gameboard.place({ ship, x: -1, y: 0 })).toBeFalsy();
    expect(gameboard.place({ ship, x: 11, y: 0 })).toBeFalsy();
});

test("it did not place ship if it is place on invalid coordinate", () => {
    let gameboard = new Gameboard()
    let ship = new Ship({ length: 1 })
    gameboard.place({ ship, x: 0, y: 11 })

    gameboard.board.forEach(row => {
        row.forEach(slot => expect(slot).not.toBe(ship))
    })
})

test("it return false if a ship could not fit into the row", () => {
    let gameboard = new Gameboard()
    let ship = new Ship({length : 10})

    expect(gameboard.place({ ship, x: 1, y: 0 })).toBeFalsy()
})

test("it did not place the ship if it could not fit into the row", () => {
    let gameboard = new Gameboard()
    let ship = new Ship({length: 10})
    gameboard.place({ship, x:1, y:0})

    gameboard.board[0].forEach(slot => expect(slot).not.toBe(ship))
})

test("it could receive attack and transfer the hit to the ship when there is ship", () => {
    let gameboard = new Gameboard();
    let ship = new Ship({ length: 1 });
    gameboard.place({ ship, x: 0, y: 0 });
    gameboard.receiveAttack({ x: 0, y: 0 });

    expect(gameboard.board[0][0].receivedHitAmount).toEqual(1);
    expect(gameboard.missedShots).toEqual(0);
});

test("it increment missedShots if receive attack on an empty coordinate", () => {
    let gameboard = new Gameboard();
    gameboard.receiveAttack({ x: 0, y: 0 });

    expect(gameboard.missedShots).toEqual(1);
});

test("it return true if receive attack could transfer the hit to the ship", () => {
    let gameboard = new Gameboard();
    let ship = new Ship({ length: 1 });
    gameboard.place({ ship, x: 0, y: 0 });
    let result = gameboard.receiveAttack({ x: 0, y: 0 });

    expect(result).toBeTruthy();
});

test("it return false if receive attack on an empty coordinate", () => {
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
