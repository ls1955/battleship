import { Ship } from "../src/lib/ship";
import { Shipyard } from "../src/lib/shipyard";

describe("Shipyard", () => {
    const ShipLengths = [5, 4, 4, 3, 3, 2, 2];
    let ships = null;
    let shipyard = null;
    beforeEach(() => {
        ships = ShipLengths.map((length) => new Ship({ length }));
        shipyard = new Shipyard({ ships });
    });

    describe("#isEmpty", () => {
        it("is not empty if have ships", () => {
            expect(shipyard.isEmpty()).toBeFalsy();
        });

        it("is empty when not holding ship", () => {
            for (let i = 0; i < ships.length; i++) {
                shipyard.shift();
            }
            expect(shipyard.isEmpty()).toBeTruthy();
        });
    });

    describe("#shift", () => {
        it("could shift the first given ship", () => {
            ships.forEach((s) => expect(shipyard.shift()).toEqual(s));
        });
    });
});
