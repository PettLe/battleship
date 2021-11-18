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
      // box.classList.add("box");
      box.textContent = "";
      box.dataset.id = row.dataset.id + j;
      row.appendChild(box);
      /* box.addEventListener("click", () => {
        if (gameboard.boardOccupied.includes(box.dataset.id)) {
          box.style.backgroundColor = "red";
        } else {
          box.style.backgroundColor = "blue";
        }
      }); */
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
      //    console.log(Player.name);
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

        // DETERMINING COMPUTERS ACTION - NEEDS FIXING - THE FIRST BOX NEEDS IT'S OWN NAME/VARIABLE
        // OR MAYBE: grid1.childNode and then childNode.id = move.result etc?
        // Aiempi bugi querySelectorin ja getId kanssa saattoi johtua draw functionin bugista?
        // setTimeout(() => {
        console.log(Player.enemyBoard.boardOccupied);
        //    console.log(grid1.childNodes);
        const move = Player.makeMove();
        const a = move.x;
        const b = move.y;
        let shipIndex2 = "";
        for (let h = 0; h < gameboard.ships.length; h++) {
          if (Player.enemyBoard.ships[h].occupied.includes(move.result)) {
            shipIndex2 = h;
          }
          console.log(Player.enemyBoard.ships[h].occupied);
        }
        // console.log(`ShipIndex1 is ${shipIndex}`);
        console.log(move.result);
        Player.enemyBoard.receiveAttack(a, b, shipIndex2);
        console.log(Player.enemyBoard.ships);
        /* const box1 = document.getElementById(move.result);
          console.log(
            document
              .querySelector(`[dataset.id]="${move.result}"`)
              .dataset("dataset.id")
          ); */
        const box1 = document.getElementsByClassName("box1");
        // const boxIndex = box1.indexOf(c);
        if (Player.enemyBoard.boardOccupied.includes(move.result)) {
          /* console.log(
              typeof document
                .querySelector(`[dataset.id]="${move.result}"`)
                .dataset("dataset.id")
            ); */
          // console.log(box1[1].dataset.id);
          // console.log(boxIndex);
          box1[7].style.backgroundColor = "red";
        } else {
          /* console.log(
              typeof document
                .querySelector(`[dataset.id]="${move.result}"`)
                .dataset("dataset.id")
            ); */
          // console.log(box1[1].dataset.id);
          // console.log(boxIndex);
          box1[28].style.backgroundColor = "blue";
        }
        // }, 2000);
        gameboard.loose();
        Player.enemyBoard.loose();
      });
    }
  }
}
// NYT MAALAA DATASETIN TAKIA MYÖS VIHOLLISEN LAIVAT PELAAJALLE
export function drawShips(array) {
  const boxes = document.getElementsByClassName("box1");
  for (let i = 0; i < boxes.length; i++) {
    if (array.includes(boxes[i].dataset.id)) {
      boxes[i].classList.add("shipBox");
      // boxes[i].style.backgroundColor = "black";
    }
  }
  // console.log(boxes);
}
