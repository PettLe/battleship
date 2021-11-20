/* eslint-disable no-plusplus */

/* Ships needed:
1 x Carrier, size 5
2 x Battleship, size 4
3 x Destroyer, size 3
3 x Patrol Boat, size 2  */

export const ship = (length, vertical) => {
  const hitBoxes = [];
  const destroyed = [];
  const occupied = [];
  const sunk = false;
  // const vertical = false;
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
    vertical,
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
  function placeShip(x, y, length, vertical) {
    const newShip = ship(length, vertical);
    if (vertical === true) {
      for (let i = 0; i < newShip.length; i++) {
        const arr = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
        const indexX = arr.indexOf(x);
        if (boardOccupied.includes(x + (y + i)) || !arr[indexX + i]) {
          alert("Illegal placement");
          // window.location.reload();
        } else {
          newShip.occupied.push(arr[indexX + i] + y);
          boardOccupied.push(arr[indexX + i] + y);
        }
      }
    } else {
      for (let i = 0; i < newShip.length; i++) {
        if (boardOccupied.includes(x + (y + i)) || y + i > 10) {
          alert("Illegal placement HORIZONTAL");
          console.log(x);
          console.log(y + i);
          // window.location.reload();
        } else {
          newShip.occupied.push(x + (y + i));
          boardOccupied.push(x + (y + i));
        }
      }
    }
    ships.push(newShip);
    return newShip.occupied;
  }

  // Receive enemy shot and determine if it's amiss or hit
  const receiveAttack = (x, y, shipIndex) => {
    shots.push(x + y);
    if (!boardOccupied.includes(x + y)) {
      return "missed!";
    }
    ships[shipIndex].hit(x, y);
    if (ships[shipIndex].isSunk() === true) {
      console.log(`${ships.filter(({ sunk }) => sunk === true).length}`);
      return console.log("SHIP HAS BEEN SUNK!");
    }

    return console.log("It's a hit!");
  };

  // Function to inform if every ship has been sunk
  function loose() {
    const sunkenShips = ships.filter(({ sunk }) => sunk === true).length;
    if (sunkenShips === ships.length) {
      return alert("All ships destroyed!");
    }
    return false;
  }

  // NOTE: Clear useless returns
  return {
    shots,
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

  // Enemy AI
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
  }
  return {
    name,
    turn,
    enemyBoard,
    makeMove,
  };
};
