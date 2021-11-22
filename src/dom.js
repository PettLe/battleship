/* eslint-disable no-loop-func */
export default function gameboardGrid(gameboard, Player) {
  const grid1 = document.getElementById("gameboard1");
  const indexLetters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
  for (let i = 0; i < 10; i++) {
    const row = document.createElement("div");
    row.classList.add("row");
    grid1.appendChild(row);
    row.dataset.id = indexLetters[i];
    for (let j = 1; j < 11; j++) {
      const box = document.createElement("div");
      box.classList.add("box1");
      box.textContent = "";
      box.dataset.id = row.dataset.id + j;
      row.appendChild(box);
    }
  }

  const grid2 = document.getElementById("gameboard2");
  grid2.style.visibility = "hidden";
  for (let i = 0; i < 10; i++) {
    const row = document.createElement("div");
    row.classList.add("row");
    grid2.appendChild(row);
    row.dataset.id = indexLetters[i];
    for (let j = 1; j < 11; j++) {
      const box = document.createElement("div");
      box.classList.add("box");
      box.textContent = "";
      box.dataset.id = row.dataset.id + j;
      row.appendChild(box);
      box.addEventListener("click", () => {
        let shipIndex = "";
        for (let x = 0; x < gameboard.ships.length; x++) {
          if (gameboard.ships[x].occupied.includes(box.dataset.id)) {
            shipIndex = x;
          }
        }
        gameboard.receiveAttack(indexLetters[i], j, shipIndex);
        if (gameboard.boardOccupied.includes(box.dataset.id)) {
          box.style.backgroundColor = "red";
        } else {
          box.style.backgroundColor = "blue";
        }

        // DETERMINING COMPUTERS ACTION
        setTimeout(() => {
          const move = Player.makeMove();
          const a = move.x;
          const b = move.y;
          let shipIndex2 = "";
          for (let h = 0; h < gameboard.ships.length; h++) {
            if (Player.enemyBoard.ships[h].occupied.includes(move.result)) {
              shipIndex2 = h;
            }
          }
          Player.enemyBoard.receiveAttack(a, b, shipIndex2);
          const box1 = document.getElementsByClassName("box1");
          for (let i = 0; i < box1.length; i++) {
            if (box1[i].dataset.id === move.result) {
              if (Player.enemyBoard.boardOccupied.includes(move.result)) {
                box1[i].style.backgroundColor = "red";
              } else {
                box1[i].style.backgroundColor = "blue";
              }
            }
          }
        }, 850);
        gameboard.loose();
        Player.enemyBoard.loose();
      });
    }
  }
  // REPLAY BUTTON
  const replay = document.getElementById("replay");
  replay.addEventListener("click", () => {
    window.location.reload(true);
  });

  // RENDER FUNCTION FOR SHIPS
  function drawShips() {
    const boxes = document.getElementsByClassName("box1");
    for (let i = 0; i < boxes.length; i++) {
      if (Player.enemyBoard.boardOccupied.includes(boxes[i].dataset.id)) {
        boxes[i].classList.add("shipBox");
      }
    }
  }

  // PLACING THE SHIPS AND TURN BUTTON
  const box1 = document.getElementsByClassName("box1");
  const turn = document.getElementById("turn");
  let vertical = false;
  turn.textContent = "Horizontal";
  turn.addEventListener("click", () => {
    vertical = !vertical;
    if (vertical === false) {
      turn.textContent = "Horizontal";
    } else {
      turn.textContent = "Vertical";
    }
  });
  let shipCounter = 0;
  let shipCounter2 = 0;
  const shipLength = [6, 5, 4, 3, 2];
  for (let i = 0; i < box1.length; i++) {
    box1[i].addEventListener("click", () => {
      const splitAt = (index) => (x) => [x.slice(0, index), x.slice(index)];
      const x = splitAt(1)(box1[i].dataset.id)[0];
      const y = parseInt(splitAt(1)(box1[i].dataset.id)[1], 10);

      if (shipCounter < shipLength.length) {
        if (
          Player.enemyBoard.placeFree(x, y, shipLength[shipCounter], vertical)
        ) {
          Player.enemyBoard.placeShip(x, y, shipLength[shipCounter], vertical);
          drawShips();
          shipCounter++;
          if (shipCounter === 5) {
            grid2.style.visibility = "visible";
            alert("TIME TO PLAY!");
          }
        } else {
          alert("Invalid ship placement, try again");
        }
      }

      // PLACING ENEMY SHIPS
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
      const alphabet = "ABCDEFGHIJ";
      const shipOrient = Math.random() < 0.5;
      if (shipCounter2 < shipLength.length) {
        if (shipOrient === true) {
          const shipTemp = [];
          while (true) {
            const shipx = alphabet[Math.floor(Math.random() * alphabet.length)];
            const shipy = Math.floor(Math.random() * (10 - 1 + 1) + 1);
            for (let i = 0; i < shipLength[shipCounter2]; i++) {
              const arr = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
              const indexX = arr.indexOf(shipx);
              shipTemp.push(arr[indexX + i] + shipy);
            }

            if (
              shipTemp.includes(NaN) ||
              findCommon(shipTemp, gameboard.boardOccupied)
            ) {
              shipTemp.splice(0, shipTemp.length);
            } else {
              gameboard.placeShip(
                shipx,
                shipy,
                shipLength[shipCounter2],
                shipOrient
              );
              shipCounter2 += 1;
              break;
            }
          }
        } else {
          const shipTemp2 = [];
          while (true) {
            const shipx = alphabet[Math.floor(Math.random() * alphabet.length)];
            const shipy = Math.floor(Math.random() * (10 - 1 + 1) + 1);
            const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
            const indexY = arr.indexOf(shipy);
            for (let i = 0; i < shipLength[shipCounter2]; i++) {
              shipTemp2.push(shipx + arr[indexY + i]);
            }
            if (
              shipTemp2.includes(`${shipx}undefined`) ||
              findCommon(shipTemp2, gameboard.boardOccupied)
            ) {
              shipTemp2.splice(0, shipTemp2.length);
            } else {
              gameboard.placeShip(
                shipx,
                shipy,
                shipLength[shipCounter2],
                shipOrient
              );
              shipCounter2 += 1;
              break;
            }
          }
        }
      }
    });
  }
}

export function drawShips(array) {
  const boxes = document.getElementsByClassName("box1");
  for (let i = 0; i < boxes.length; i++) {
    if (array.includes(boxes[i].dataset.id)) {
      boxes[i].classList.add("shipBox");
    }
  }
}
