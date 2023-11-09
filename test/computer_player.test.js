import { ComputerPlayer } from "../lib/computer_player";
import { Gameboard } from "../lib/gameboard";

const ownBoard = new Gameboard();
const enemyBoard = jest.createMockFromModule("../lib/gameboard");
enemyBoard.receiveAttack = jest.fn();

describe("ComputerPlayer", () => {
    describe("#nextAtkCoordinate", () => {
        it("does not repeat chosen attack coordinate", () => {
            let colSize = 10;
            let rowSize = 10;

            let comp = new ComputerPlayer({
                ownBoard,
                enemyBoard,
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

    describe("#attack", () => {
        it("should send the message to attack enemy board", () => {
            let comp = new ComputerPlayer({
                ownBoard,
                enemyBoard,
            });
            comp.attack();

            expect(enemyBoard.receiveAttack).toHaveBeenCalled();
        });
    });
});
