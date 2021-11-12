/* eslint-disable no-undef */
/* eslint-disable import/extensions */

const ship = require("./gamelogic.js");

/* test("returns ships length", () => {
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
}); */

const gameboard = require("./gamelogic.js");

test("places ship on given coordinates", () => {
  const newGame = gameboard();
  expect(newGame.placeShip("B", 4)).toEqual(["B4", "B5", "B6", "B7"]);
});

/* test("testes if shot is received and recorded", () => {
  const newGame = gameboard();
  newGame.receiveAttack("B", 6);
  expect(newGame.receiveAttack("A", 5)).toEqual(["B6", "A5"]);
}); */

test("determines if a shit have been hit (missed this time)", () => {
  const newGame = gameboard();
  newGame.placeShip("B", 4);
  console.log(newGame.boardOccupied);
  expect(newGame.receiveAttack("A", 5)).toEqual("missed!");
});

test("determines if a shit have been hit (this time it does!)", () => {
  const newGame = gameboard();
  newGame.placeShip("B", 4);
  expect(newGame.receiveAttack("B", 5)).toEqual("It's a hit!");
});

test("notes when ship has been sunk", () => {
  const newGame = gameboard();
  newGame.placeShip("B", 4);
  newGame.receiveAttack("B", 4);
  newGame.receiveAttack("A", 6);
  newGame.receiveAttack("B", 6);
  newGame.receiveAttack("B", 7);
  expect(newGame.receiveAttack("B", 5)).toEqual("SHIP HAS BEEN SUNK!");
});

test("let's you know if all ships have been sunk", () => {
  const newGame = gameboard();
  newGame.placeShip("B", 4);
  newGame.receiveAttack("B", 4);
  newGame.receiveAttack("A", 6);
  newGame.receiveAttack("B", 6);
  newGame.receiveAttack("B", 7);
  newGame.receiveAttack("B", 5);
  expect(newGame.loose()).toBe("All ships destroyed!");
});
