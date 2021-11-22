/* eslint-disable import/no-import-module-exports */

import "regenerator-runtime/runtime";
import gameboardGrid from "./dom.js";
import { gameboard, Player } from "./gamelogic.js";
import "./style.css";

const board1 = gameboard();
const board2 = gameboard();
const player1 = Player("Apina", board2);
const playerCom = Player("Nemesis", board1);
gameboardGrid(board2, playerCom);
