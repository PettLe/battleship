const ship = (length) => {
  const hitBoxes = [];
  const hitBoxesHit = [];
  const destroyed = [];
  const position = "";
  for (let i = 0; i < length; i++) {
    hitBoxes.push(i);
    destroyed.push("x");
  }

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
    hit,
    isSunk,
  };
};
module.exports = ship;

const gameboard = (x, y) => {
  // Should make position array, and add all coordinates, as in B2, B3, B4 etc
  function placeShip() {
    // Maybe use something like x + (y+i), i++
    const newShip = ship(4);
    newShip.position = x + y;
    return newShip.position;
  }
  const receiveAttack = () => {
    console.log("To be dsafds");
  };
  return { placeShip, receiveAttack };
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
//  const newGame = gameboard("B", 4);
//  console.log(newGame.placeShip());
