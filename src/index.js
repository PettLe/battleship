/* eslint-disable import/no-import-module-exports */

// ONCE GOT RIDOFF TESTS, IMPORT GAMELOGIC AND DOM HERE
import "regenerator-runtime/runtime";
import gameboardGrid from "./dom.js";
import { ship, gameboard, Player } from "./gamelogic.js";
import "./style.css";

/* 1 x Carrier, size 5
2 x Battleship, size 4
3 x Destroyer, size 3
3 x Patrol Boat, size 2  */
gameboardGrid();
const board1 = gameboard();
const board2 = gameboard();
const player1 = Player("Apina", board2);
const playerCom = Player("Nemesis", board1);
board1.placeShip("A", 1, 5);
board1.placeShip("B", 2, 4);
board1.placeShip("C", 3, 4);
board1.placeShip("D", 4, 3);
board1.placeShip("E", 5, 3);
board1.placeShip("F", 5, 3);
board1.placeShip("G", 5, 2);
board1.placeShip("H", 6, 2);
board1.placeShip("I", 6, 2);

board2.placeShip("A", 2, 5);
board2.placeShip("B", 1, 4);
board2.placeShip("C", 4, 4);
board2.placeShip("D", 3, 3);
board2.placeShip("E", 1, 3);
board2.placeShip("F", 1, 3);
board2.placeShip("G", 7, 2);
board2.placeShip("H", 8, 2);
board2.placeShip("I", 6, 2);

console.log(board1.boardOccupied);
console.log(board1.ships);
console.log(board2.boardOccupied);
console.log(board2.ships);

/* function sum(a, b) {
  return a + b;
}
module.exports = sum; */
