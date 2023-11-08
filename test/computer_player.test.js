import { ComputerPlayer } from "../lib/computer_player";
import { Gameboard } from "../lib/gameboard";

describe("ComputerPlayer", () => {
    describe("#nextAtkCoordinate", () => {
        it("does not repeat chosen attack coordinate", () => {
            let colSize = 10;
            let rowSize = 10;

            let board = new Gameboard();
            let comp = new ComputerPlayer({
                ownBoard: board,
                otherBoard: board,
            });
            let coordinates = new Set();

            for (let i = 0; i < colSize; i++) {
                for (let j = 0; j < rowSize; j++) {
                    coordinates.add(comp.nextAtkCoordinate());
                }
            }

            expect(coordinates.size).toEqual(colSize * rowSize);
        });
    });
});
