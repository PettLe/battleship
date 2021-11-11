const ship = (length /* , position */) => {
  const hitBoxes = [];
  const hitBoxesHit = [];
  const destroyed = [];
  for (let i = 0; i < length; i++) {
    hitBoxes.push(i);
    destroyed.push("x");
  }

  /*  const hit = (n) => {
    for (const obj in hitBoxes) {
      if (hitBoxes.indexOf(obj) == n) {
        hitBoxes[n] = "x";
      }
    }
  }; */
  // const hit = (n) => hitBoxesHit.push("x");
  const hit = (n) => (hitBoxesHit[n] = "x");

  // const isSunk = () => true;
  const isSunk = () => {
    if (JSON.stringify(ship.hitBoxesHit) === JSON.stringify(ship.destroyed)) {
      return true;
    }
    return false;
  };
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

const newShip = ship(4);
newShip.hitBoxesHit = ["x", "x", "x", "x"];
console.log(newShip.isSunk());
console.log(newShip.hitBoxesHit);
console.log(newShip.destroyed);
