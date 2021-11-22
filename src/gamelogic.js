/* eslint-disable no-plusplus */

export const ship = (length, vertical) => {
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

  // Function to check ship placement
  function placeFree(x, y, length, shipOrient) {
    function findCommon(array1, array2) {
      for (let i = 0; i < array1.length; i++) {
        for (let j = 0; j < array2.length; j++) {
          if (array1[i] === array2[j]) {
            return true;
          }
        }
      }
      return false;
    }

    for (let i = 0; i < length; i++) {
      if (shipOrient === true) {
        const shipTemp = [];

        for (let j = 0; j < length; j++) {
          const arr = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
          const indexX = arr.indexOf(x);
          shipTemp.push(arr[indexX + j] + y);
        }

        if (shipTemp.includes(NaN) || findCommon(shipTemp, boardOccupied)) {
          shipTemp.splice(0, shipTemp.length);
          return false;
        }
        shipTemp.splice(0, shipTemp.length);
        return true;
      }
      if (shipOrient === false) {
        const shipTemp2 = [];

        const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        const indexY = arr.indexOf(y);
        for (let g = 0; g < length; g++) {
          shipTemp2.push(x + arr[indexY + g]);
        }
        if (
          shipTemp2.includes(`${x}undefined`) ||
          findCommon(shipTemp2, boardOccupied)
        ) {
          shipTemp2.splice(0, shipTemp2.length);
          return false;
        }
        shipTemp2.splice(0, shipTemp2.length);
        return true;
      }
    }
  }

  // Calls ship() function and places ship on board
  function placeShip(x, y, length, vertical) {
    const newShip = ship(length, vertical);
    if (vertical === true) {
      for (let i = 0; i < newShip.length; i++) {
        const arr = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
        const indexX = arr.indexOf(x);
        if (boardOccupied.includes(arr[indexX + i] + y) || !arr[indexX + i]) {
          return false;
        }
        newShip.occupied.push(arr[indexX + i] + y);
        boardOccupied.push(arr[indexX + i] + y);
      }
    } else {
      for (let i = 0; i < newShip.length; i++) {
        if (boardOccupied.includes(x + (y + i)) || y + i > 10) {
          return false;
        }
        newShip.occupied.push(x + (y + i));
        boardOccupied.push(x + (y + i));
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
      return "SHIP HAS BEEN SUNK!";
    }
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
    placeFree,
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
