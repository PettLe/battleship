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

  function hit(x, y) {
    const hitPoint = occupied.indexOf(x + y);
    hitBoxes[hitPoint] = "x";
  }
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
  // const sunken = 0;
  function placeShip(x, y) {
    const newShip = ship(4);
    for (let i = 0; i < newShip.length; i++) {
      newShip.occupied.push(x + (y + i));
      boardOccupied.push(x + (y + i));
    }
    ships.push(newShip);
    return newShip.occupied;
  }
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

  function loose() {
    const sunkenShips = ships.filter(({ sunk }) => sunk === true).length;
    if (sunkenShips === ships.length) {
      return "All ships destroyed!";
    }
    return false;
  }

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

const Player = (name) => ({ name });

//  const newGame = gameboard();
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
