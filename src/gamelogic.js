const ship = (length) => {
  const hitBoxes = [];
  const hitBoxesHit = [];
  const destroyed = [];
  const position = "";
  const occupied = [];
  for (let i = 0; i < length; i++) {
    hitBoxes.push(i);
    destroyed.push("x");
  }

  // const hit = (x, y) => (ship.occupied.find[x + y] = "x");
  const hit = (n) => (hitBoxes[n] = "x");

  function isSunk() {
    let count = 0;
    for (let i = 0; i < length; i++) {
      if (hitBoxes[i] == "x") {
        count++;
      }
    }
    if (count === length) {
      console.log(count);
      return true;
    }
    return false;
  }

  return {
    length,
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
  function placeShip(x, y) {
    const newShip = ship(4);
    newShip.position = x + y;
    for (let i = 0; i < newShip.length; i++) {
      newShip.occupied.push(x + (y + i));
      boardOccupied.push(x + (y + i));
    }
    return newShip.occupied;
  }
  const receiveAttack = (x, y) => {
    shots.push(x + y);
    if (!boardOccupied.includes(x + y)) {
      return "missed!";
    }
    // newShip.hit(x, y);
    return "it's a hit!";
  };
  return {
    shots,
    boardOccupied,
    placeShip,
    receiveAttack,
  };
};
module.exports = gameboard;

//  const newShip = ship(4);
//  newShip.hitBoxesHit = ["x", "x", "x", "x"];
//  newShip.hit(1);
//  newShip.hit(0);
//  newShip.hit(2);
//  newShip.isSunk();
//  console.log(newShip.hitBoxesHit);
//  console.log(newShip.destroyed);
const newGame = gameboard();
newGame.placeShip("B", 4);
console.log(newGame.boardOccupied);
