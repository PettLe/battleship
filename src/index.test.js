/* eslint-disable no-undef */
/* eslint-disable import/extensions */

const ship = require("./gamelogic.js");

test("returns ships length", () => {
  const newShip = ship(4);
  expect(newShip.length).toBe(4);
});

test("tests if the length array is correct", () => {
  const newShip = ship(4);
  expect(newShip.hitBoxes.length).toBe(4);
});

test("tests if right spot is hit", () => {
  const newShip = ship(4);
  newShip.hit(2);
  newShip.hitBoxesHit = ["x", "x", "x", "x"];
  expect(newShip.hitBoxesHit[2]).toBe("x");
});

test("tests if the ship is sunk, should return true", () => {
  const newShip = ship(4);
  newShip.hit(0);
  newShip.hit(1);
  newShip.hit(2);
  newShip.hit(3);
  expect(newShip.isSunk()).toBeTruthy();
});

test("tests if the ship is sunk, should return false", () => {
  const newShip = ship(4);
  newShip.hit(0);
  newShip.hit(1);
  newShip.hit(3);
  expect(newShip.isSunk()).toBeFalsy();
});
