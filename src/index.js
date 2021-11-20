/* eslint-disable import/no-import-module-exports */

// ONCE GOT RIDOFF TESTS, IMPORT GAMELOGIC AND DOM HERE
import "regenerator-runtime/runtime";
import gameboardGrid, { drawShips } from "./dom.js";
import { ship, gameboard, Player } from "./gamelogic.js";
import "./style.css";

const board1 = gameboard();
const board2 = gameboard();
const player1 = Player("Apina", board2);
const playerCom = Player("Nemesis", board1);
gameboardGrid(board2, playerCom);

board2.placeShip("A", 2, 5, false);
board2.placeShip("B", 1, 4, false);
board2.placeShip("C", 4, 4, false);
board2.placeShip("D", 3, 3, false);
board2.placeShip("E", 1, 3, false);
board2.placeShip("F", 1, 3, false);
board2.placeShip("G", 7, 2, false);
board2.placeShip("H", 8, 2, false);
board2.placeShip("I", 6, 2, false);
