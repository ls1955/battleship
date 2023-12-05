import { Ship } from "../src/lib/ship";

describe("Ship", () => {
    let ship = null;
    beforeEach(() => (ship = new Ship({ length: 5 })));

    describe("#length", () => {
        it("knows its own length", () => {
            expect(ship.length).toEqual(5);
        });
    });

    describe("#isSunk", () => {
        it("by default is not sunk", () => {
            expect(ship.isSunk()).toBeFalsy();
        });

        it("is not sunk when received hit amount is smaller than its length", () => {
            for (let i = 0; i < ship.length - 1; i++) {
                ship.receiveHit();
            }
            expect(ship.isSunk()).toBeFalsy();
        });

        it("is sunk when received hit amount is equal or large than its length", () => {
            for (let i = 0; i < ship.length; i++) {
                ship.receiveHit();
            }
            expect(ship.isSunk()).toBeTruthy();
        });
    });
});
