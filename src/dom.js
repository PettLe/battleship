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
          console.log(move.result);
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

  // PLACING THE SHIPS
  const box1 = document.getElementsByClassName("box1");
  const turn = document.getElementById("turn");
  let vertical = false;
  turn.addEventListener("click", () => {
    vertical = !vertical;
    console.log(vertical);
  });
  let shipCounter = 0;
  const shipLength = [6, 5, 4, 3, 2];
  for (let i = 0; i < box1.length; i++) {
    box1[i].addEventListener("click", () => {
      const splitAt = (index) => (x) => [x.slice(0, index), x.slice(index)];
      const x = splitAt(1)(box1[i].dataset.id)[0];
      const y = parseInt(splitAt(1)(box1[i].dataset.id)[1], 10);
      if (shipCounter < shipLength.length) {
        Player.enemyBoard.placeShip(x, y, shipLength[shipCounter], vertical);
        shipCounter++;
        console.log(box1[i].dataset.id);
        console.log(Player.enemyBoard.ships);
      } else {
        alert("Time to play!");
      }
    });
  }

  //  Rendering chosen location for ship
  /* const shipBtn = document.getElementsByClassName("shipBtn");
  const box1 = document.getElementsByClassName("box1");
  for (let g = 0; g < shipBtn.length; g++) {
    let shipLength = 0;
    shipBtn[g].addEventListener("click", () => {
      shipBtn[g].disabled = "disabled";
      shipLength = shipBtn[g].value;
      for (let i = 0; i < box1.length; i++) {
        box1[i].addEventListener("mouseover", () => {
          for (let a = 0; a < shipBtn[g].value; a++) {
            //            console.log(`i is ${i}`);
            //            console.log(`a is ${a}`);
            //            console.log(`ShipBtn value is ${shipBtn[g].value}`);
            if (
              !Player.enemyBoard.boardOccupied.includes(box1[i + a].dataset.id)
            ) {
              box1[i + a].style.backgroundColor = "orange";
            }
          }
        });
        box1[i].addEventListener("mouseout", () => {
          for (let a = 0; a < shipBtn[g].value; a++) {
            if (
              !Player.enemyBoard.boardOccupied.includes(box1[i + a].dataset.id)
            ) {
              box1[i + a].style.backgroundColor = "rgb(89, 132, 182)";
            }
          }
        });

        /* Jotenkin tuntuu että iteroi sitä useammin mitä useamman laivan yrittää laittaa,
        ja sen takia menee entisten päälle ja heittää erroria */
  /*      box1[i].addEventListener("click", () => {
          // Little function to separate box.id into x and y
          const splitAt = (index) => (x) => [x.slice(0, index), x.slice(index)];
          const x = splitAt(1)(box1[i].dataset.id)[0];
          const y = parseInt(splitAt(1)(box1[i].dataset.id)[1], 10);
          // console.log(x);
          // console.log(box1[i].dataset.id);
          console.log(y);
          Player.enemyBoard.placeShip(x, y, shipLength, false);
          console.log(Player.enemyBoard);
          // console.log(Player.enemyBoard.ships.length);
        });
      }
    });
  } */
}

export function drawShips(array) {
  const boxes = document.getElementsByClassName("box1");
  for (let i = 0; i < boxes.length; i++) {
    if (array.includes(boxes[i].dataset.id)) {
      boxes[i].classList.add("shipBox");
    }
  }
}
