const ship = (length /* , position */) => {
  const hitBoxes = [];
  const hitBoxesHit = [];
  const destroyed = [];
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
    hit,
    isSunk,
  };
};
module.exports = ship;

//  const newShip = ship(4);
//  newShip.hitBoxesHit = ["x", "x", "x", "x"];
//  newShip.hit(1);
//  newShip.hit(0);
//  newShip.hit(2);
//  newShip.isSunk();
//  console.log(newShip.hitBoxesHit);
//  console.log(newShip.destroyed);
