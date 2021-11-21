/* eslint-disable import/no-import-module-exports */

import "regenerator-runtime/runtime";
import gameboardGrid, { drawShips } from "./dom.js";
import { ship, gameboard, Player } from "./gamelogic.js";
import "./style.css";

const board1 = gameboard();
const board2 = gameboard();
const player1 = Player("Apina", board2);
const playerCom = Player("Nemesis", board1);
gameboardGrid(board2, playerCom);

/* board1.placeShip("A", 1, 6, false);
board1.placeShip("B", 2, 5, false);
board1.placeShip("F", 7, 3, false);
board1.placeShip("G", 3, 2, true);
board1.placeShip("J", 6, 2, false); */

/* board2.placeShip("A", 2, 5, false);
board2.placeShip("B", 1, 4, false);
board2.placeShip("D", 3, 3, false);
board2.placeShip("H", 8, 2, false);
board2.placeShip("I", 3, 6, false); */

// drawShips(board1.boardOccupied);
// console.log(board1.ships);
// console.log(board1.boardOccupied);
