import { Player } from "../lib/player";

const playerBoard = jest.createMockFromModule("../lib/gameboard");
const enemyBoard = jest.createMockFromModule("../lib/gameboard");
playerBoard.place = jest.fn();
enemyBoard.receiveAttack = jest.fn();

test("send a message to own board when placing ship", () => {
    let ship = "mock ship";
    let player = new Player({ ownBoard: playerBoard });
    player.place({ ship, x: -1, y: -1 });

    expect(playerBoard.place).toHaveBeenCalled();
});

test("send a message to enemy board when attacking", () => {
    let player = new Player({ enemyBoard });
    player.attack({ x: -1, y: -1 });

    expect(enemyBoard.receiveAttack).toHaveBeenCalled();
});
