import { Ship } from "../lib/ship";

test("a ship could be given a length", () => {
    let ship = new Ship({ length: 5 });

    expect(ship.length).toEqual(5);
});

test("a new ship is not sunk", () => {
    let ship = new Ship({ length: 5 });

    expect(ship.isSunk()).toBeFalsy();
});

test("a ship is not sunk if received hit amount is smaller than its length", () => {
    let ship = new Ship({ length: 5 });

    for (let i = 0; i < ship.length - 1; i++) {
        ship.receiveHit();
    }

    expect(ship.isSunk()).toBeFalsy();
});

test("a ship is sunk if received hit amount is larger or equal its length", () => {
    let ship = new Ship({ length: 5 });

    for (let i = 0; i < ship.length; i++) {
        ship.receiveHit();
    }

    expect(ship.isSunk()).toBeTruthy();
});
