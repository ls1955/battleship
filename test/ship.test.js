import { Ship } from "../src/ship";

let ship = null;
beforeEach(() => {
    ship = new Ship({ length: 5 });
});

test("a ship know its length", () => {
    expect(ship.length).toEqual(5);
});

test("a new ship is not sunk", () => {
    expect(ship.isSunk()).toBeFalsy();
});

test("a ship is not sunk if received hit amount is smaller than its length", () => {
    for (let i = 0; i < ship.length - 1; i++) {
        ship.receiveHit();
    }
    expect(ship.isSunk()).toBeFalsy();
});

test("a ship is sunk if received hit amount is larger or equal its length", () => {
    for (let i = 0; i < ship.length; i++) {
        ship.receiveHit();
    }
    expect(ship.isSunk()).toBeTruthy();
});
