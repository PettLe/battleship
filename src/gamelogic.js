/* eslint-disable no-plusplus */
/* Ships needed:
1 x Carrier, size 5
2 x Battleship, size 4
3 x Destroyer, size 3
3 x Patrol Boat, size 2  */

const ship = (length) => {
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
module.exports = ship;

const gameboard = () => {
  const shots = [];
  const boardOccupied = [];
  const ships = [];

  // Calls ship() function and places ship on board
  function placeShip(x, y) {
    const newShip = ship(4);
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
      return "SHIP HAS BEEN SUNK!";
    }
    return "It's a hit!";
  };

  // Function to inform if every ship has been sunk
  function loose() {
    const sunkenShips = ships.filter(({ sunk }) => sunk === true).length;
    if (sunkenShips === ships.length) {
      return "All ships destroyed!";
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
module.exports = gameboard;

const Player = (name, enemy) => {
  const turn = false;
  const enemyBoard = enemy;

  function makeMove() {
    const alphabet = "ABCDEFGHIJ";
    const x = alphabet[Math.floor(Math.random() * alphabet.length)];
    const y = Math.floor(Math.random() * (10 - 1 + 1) + 1);
    // const move = x + y;
    return { x, y };
  }
  return {
    name,
    turn,
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
board1.placeShip("B", 4);
board1.placeShip("C", 4);
board1.placeShip("D", 4);
board1.placeShip("E", 4);
// board2.placeShip("A", 2);

console.log(player1.enemyBoard.receiveAttack("C", 3));
console.log(player1.enemyBoard.receiveAttack("A", 3));
// console.log(board2.shots);
// console.log(enemyBoard.boardOccupied);
// console.log(enemyBoard.ships[0].hitBoxes);

const x = enemyPlayer.makeMove();
const y = enemyPlayer.makeMove();
console.log(x.x);
console.log(y.y);
console.log(enemyPlayer.enemyBoard.receiveAttack(x.x, y.y));

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
