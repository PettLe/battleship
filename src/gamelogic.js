const ship = (length) => {
  const hitBoxes = [];
  const hitBoxesHit = [];
  const destroyed = [];
  const position = "";
  const occupied = [];
  const sunk = false;
  for (let i = 0; i < length; i++) {
    hitBoxes.push(i);
    destroyed.push("x");
  }

  // const hit = (x, y) => (ship.occupied.find[x + y] = "x");
  // const hit = (n) => (hitBoxes[n] = "x");
  function hit(x, y) {
    const hitPoint = occupied.indexOf(x + y);
    hitBoxes[hitPoint] = "x";
    // return "It's a hit!";
  }
  function isSunk() {
    let count = 0;
    for (let i = 0; i < length; i++) {
      if (hitBoxes[i] == "x") {
        count++;
      }
    }
    if (count === length) {
      return true;
    }
    return false;
  }

  return {
    length,
    sunk,
    hitBoxes,
    hitBoxesHit,
    destroyed,
    position,
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
  function placeShip(x, y) {
    const newShip = ship(4);
    newShip.position = x + y;
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
      return "SHIP HAS BEEN SUNK!";
    }
    return "It's a hit!";
  };
  return {
    shots,
    ships,
    boardOccupied,
    placeShip,
    receiveAttack,
  };
};
module.exports = gameboard;

const newGame = gameboard();
newGame.placeShip("B", 4);

console.log(newGame.receiveAttack("B", 5));
// console.log(newGame.ships);
console.log(newGame.receiveAttack("B", 4));
console.log(newGame.receiveAttack("B", 6));
// console.log(newGame.ships);

console.log(newGame.receiveAttack("A", 1));
console.log(newGame.receiveAttack("B", 7));
// console.log(newGame.ships);
