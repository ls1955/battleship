import { ComputerPlayer } from "../src/computer_player";

describe("ComputerPlayer", () => {
    describe("#nextAtkCoordinate", () => {
        it("does not repeat chosen attack coordinate", () => {
            let boardWidth = 10;
            let boardHeight = 10;
            let player = new ComputerPlayer({ boardWidth, boardHeight });
            let coordinates = new Set();

            for (let y = 0; y < boardHeight; y++) {
                for (let x = 0; x < boardWidth; x++) {
                    coordinates.add(player.nextAtkCoordinate());
                }
            }
            expect(coordinates.size).toEqual(boardWidth * boardHeight);
        });
    });
});
