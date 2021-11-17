/* eslint-disable no-plusplus */
/* Ships needed:
1 x Carrier, size 5
2 x Battleship, size 4
3 x Destroyer, size 3
3 x Patrol Boat, size 2  */

export const ship = (length) => {
  const hitBoxes = [];
  const destroyed = [];
  const occupied = [];
  const sunk = false;
  for (let i = 0; i < length; i++) {
    hitBoxes.push(i);
    destroyed.push("x");
  }

  // Determines if ship has been hit
  function hit(x, y) {
    const hitPoint = occupied.indexOf(x + y);
    hitBoxes[hitPoint] = "x";
  }

  // Determines if the ship has been sunk
  function isSunk() {
    let count = 0;
    for (let i = 0; i < length; i++) {
      if (hitBoxes[i] === "x") {
        count++;
      }
    }
    if (count === length) {
      this.sunk = true;
      return true;
    }
    return false;
  }

  // NOTE: Clean up useless returns
  return {
    length,
    sunk,
    hitBoxes,
    destroyed,
    occupied,
    hit,
    isSunk,
  };
};
//  module.exports = ship;

export const gameboard = () => {
  const shots = [];
  const boardOccupied = [];
  const ships = [];

  // Calls ship() function and places ship on board
  function placeShip(x, y, length) {
    const newShip = ship(length);
    for (let i = 0; i < newShip.length; i++) {
      newShip.occupied.push(x + (y + i));
      boardOccupied.push(x + (y + i));
    }
    ships.push(newShip);
    return newShip.occupied;
  }

  // Receive enemy shot and determine if it's amiss or hit
  const receiveAttack = (x, y) => {
    shots.push(x + y);
    if (!boardOccupied.includes(x + y)) {
      return "missed!";
    }
    ships[0].hit(x, y);
    if (ships[0].isSunk() === true) {
      console.log(
        `${ships.filter(({ sunk }) => sunk === true).length} AAAAAAA`
      );
      return alert("SHIP HAS BEEN SUNK!");
    }
    return "It's a hit!";
  };

  // Function to inform if every ship has been sunk
  function loose() {
    const sunkenShips = ships.filter(({ sunk }) => sunk === true).length;
    if (sunkenShips === ships.length) {
      return prompt("All ships destroyed!");
    }
    return false;
  }

  // NOTE: Clear useless returns
  return {
    shots,
    // sunken,
    ships,
    boardOccupied,
    placeShip,
    receiveAttack,
    loose,
  };
};
//  module.exports = gameboard;

export const Player = (name, enemy) => {
  const turn = false;
  const enemyBoard = enemy;

  function makeMove() {
    const alphabet = "ABCDEFGHIJ";
    const x = alphabet[Math.floor(Math.random() * alphabet.length)];
    const y = Math.floor(Math.random() * (10 - 1 + 1) + 1);
    const result = x + y;
    if (!enemyBoard.shots.includes(result)) {
      return { x, y, result };
    }
    if (enemyBoard.shots.includes(result)) {
      return makeMove();
    }
    // return { x, y, result };
  }
  //  const move = this.makeMove();
  //  const a = move.x;
  //  const b = move.y;

  /* let move = makeMove();
  while (enemyBoard.shots.includes(move.result)) {
    move = makeMove();
  } */
  return {
    name,
    turn,
    //  a,
    //  b,
    //  move,
    enemyBoard,
    makeMove,
  };
};

/* const comPlayer = () => {
  const name = "com";
  const turn = false;

  function makeMove() {
    const alphabet = "ABCDEFGHIJ";
    const x = alphabet[Math.floor(Math.random() * alphabet.length)];
    const y = Math.floor(Math.random() * (10 - 1 + 1) + 1);
    const move = x + y;
    return { move };
  }
  return {
    name,
    turn,
    makeMove,
  };
}; */

const board1 = gameboard();
const board2 = gameboard();
const player1 = Player("Apina", board2);
const enemyPlayer = Player("Nemesis", board1);
// board1.placeShip("B", 4);
// board1.placeShip("C", 4);
// board1.placeShip("D", 4);
board1.placeShip("E", 4);
board1.receiveAttack("A", 1);
board1.receiveAttack("A", 2);
board1.receiveAttack("A", 3);
board1.receiveAttack("A", 4);
board1.receiveAttack("A", 5);
board1.receiveAttack("A", 6);
board1.receiveAttack("A", 7);
board1.receiveAttack("A", 8);
board1.receiveAttack("A", 9);
board1.receiveAttack("A", 10);
board1.receiveAttack("B", 1);
board1.receiveAttack("B", 2);
board1.receiveAttack("B", 9);
board1.receiveAttack("B", 10);
board1.receiveAttack("C", 1);
board1.receiveAttack("C", 2);
board1.receiveAttack("C", 3);
board1.receiveAttack("C", 4);
board1.receiveAttack("C", 5);
board1.receiveAttack("C", 6);
board1.receiveAttack("C", 7);
board1.receiveAttack("C", 8);
board1.receiveAttack("C", 9);
board1.receiveAttack("C", 10);
board1.receiveAttack("D", 1);
board1.receiveAttack("D", 2);
board1.receiveAttack("D", 3);
board1.receiveAttack("D", 4);
board1.receiveAttack("D", 5);
board1.receiveAttack("D", 6);
board1.receiveAttack("D", 7);
board1.receiveAttack("D", 8);
board1.receiveAttack("D", 9);
board1.receiveAttack("D", 10);
board1.receiveAttack("E", 1);
board1.receiveAttack("E", 2);
board1.receiveAttack("E", 3);
board1.receiveAttack("E", 8);
board1.receiveAttack("E", 9);
board1.receiveAttack("E", 10);
board1.receiveAttack("F", 1);
board1.receiveAttack("F", 2);
board1.receiveAttack("F", 3);
board1.receiveAttack("F", 4);
board1.receiveAttack("F", 5);
board1.receiveAttack("F", 6);
board1.receiveAttack("F", 7);
board1.receiveAttack("F", 8);
board1.receiveAttack("F", 9);
board1.receiveAttack("F", 10);
board1.receiveAttack("G", 1);
board1.receiveAttack("G", 2);
board1.receiveAttack("G", 3);
board1.receiveAttack("G", 4);
board1.receiveAttack("G", 5);
board1.receiveAttack("G", 6);
board1.receiveAttack("G", 7);
board1.receiveAttack("G", 8);
board1.receiveAttack("G", 9);
board1.receiveAttack("G", 10);
board1.receiveAttack("H", 1);
board1.receiveAttack("H", 2);
board1.receiveAttack("H", 3);
board1.receiveAttack("H", 4);
board1.receiveAttack("H", 5);
board1.receiveAttack("H", 6);
board1.receiveAttack("H", 7);
board1.receiveAttack("H", 8);
board1.receiveAttack("H", 9);
board1.receiveAttack("H", 10);
board1.receiveAttack("I", 1);
board1.receiveAttack("I", 2);
board1.receiveAttack("I", 3);
board1.receiveAttack("I", 4);
board1.receiveAttack("I", 5);
board1.receiveAttack("I", 6);
board1.receiveAttack("I", 7);
board1.receiveAttack("I", 8);
board1.receiveAttack("I", 9);
board1.receiveAttack("I", 10);
board1.receiveAttack("J", 1);
board1.receiveAttack("J", 2);
board1.receiveAttack("J", 3);
board1.receiveAttack("J", 4);
board1.receiveAttack("J", 5);
board1.receiveAttack("J", 6);

//  console.log(enemyPlayer.enemyBoard.shots);
// board2.placeShip("A", 2);

// console.log(player1.enemyBoard.receiveAttack("C", 3));
// console.log(player1.enemyBoard.receiveAttack("A", 3));
// console.log(board2.shots);
// console.log(enemyBoard.boardOccupied);
// console.log(enemyBoard.ships[0].hitBoxes);

//  const a = siirto.slice;
//  const b = siirto(1);

const siirto = enemyPlayer.makeMove();
const a = siirto.x;
const b = siirto.y;
// console.log(a);
// console.log(b);
// console.log(siirto.result);
// console.log(enemyPlayer.enemyBoard.receiveAttack(x.x, y.y));
// console.log(enemyPlayer.move.result);

// console.log(enemyPlayer.enemyBoard.receiveAttack(a, b));
// console.log(enemyPlayer.enemyBoard.shots);

//  const newGame = gameboard();
//  const comp = comPlayer(newGame.boardOccupied);
//  console.log(comp.makeMove(newGame.boardOccupied));
//  newGame.placeShip("B", 4);
//  newGame.placeShip("A", 1);
//  console.log(newGame.receiveAttack("B", 5));
// console.log(newGame.ships);
//  console.log(newGame.receiveAttack("B", 4));
//  console.log(newGame.receiveAttack("B", 6));
//  console.log(newGame.ships);
// console.log(newGame.sunken);
//   console.log(newGame.loose());
//  console.log(newGame.receiveAttack("A", 1));
//  console.log(newGame.receiveAttack("B", 7));
//  console.log(newGame.ships);
//   console.log(newGame.sunken);
//  console.log(newGame.loose());
