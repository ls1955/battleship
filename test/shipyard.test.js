import { Ship } from "../src/ship";
import { Shipyard } from "../src/shipyard";

const shipLengths = [5, 4, 4, 3, 3, 2, 2];
let ships = null;
let shipyard = null;
beforeEach(() => {
    ships = shipLengths.map((length) => new Ship({ length }));
    shipyard = new Shipyard({ ships });
});

test("a shipyard is not empty when it has ships", () => {
    expect(shipyard.isEmpty()).toBeFalsy();
});

test("a shipyard is empty when it has no ship", () => {
    ships.forEach(() => shipyard.shift());
    expect(shipyard.isEmpty()).toBeTruthy();
});

test("a shipyard could shift the first ship it hold", () => {
    ships.forEach((ship) => {
        expect(shipyard.shift()).toEqual(ship)
    })
})