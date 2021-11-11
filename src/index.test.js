/* eslint-disable no-undef */
/* eslint-disable import/extensions */
/* const sum = require("./index.js");

test("adds 1 + 2 to equal 3", () => {
  expect(sum(1, 2)).toBe(3);
}); */

const ship = require("./gamelogic.js");

test("returns ships length", () => {
  const newShip = ship(4);
  expect(newShip.length).toBe(4);
});

/* test("determines if ship is hit", () => {
  const newShip = ship(4);
  expect(newShip.hit()).toBe(false);
}); */

/* test("determines if ship is sunk", () => {
  const newShip = ship(4);
  expect(newShip.isSunk()).toBe(true);
}); */

test("tests if the length array is correct", () => {
  const newShip = ship(4);
  expect(newShip.hitBoxes.length).toBe(4);
});

test("tests if right spot is hit", () => {
  const newShip = ship(4);
  newShip.hit(2);
  newShip.hitBoxesHit = ["x", "x", "x", "x"];
  expect(newShip.hitBoxesHit[2]).toBe("x");
  console.log(newShip.hitBoxesHit);
  console.log(newShip.hitBoxesHit.length);
  console.log(newShip.destroyed);
});

test("tests if the ship is sunk", () => {
  const newShip = ship(4);
  newShip.hitBoxesHit = ["x", "x", "x", "x"];
  expect(newShip.isSunk()).toBeTruthy();
  console.log(newShip.hitBoxesHit);
});
