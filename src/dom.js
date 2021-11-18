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
}

export function drawShips(array) {
  const boxes = document.getElementsByClassName("box1");
  for (let i = 0; i < boxes.length; i++) {
    if (array.includes(boxes[i].dataset.id)) {
      boxes[i].classList.add("shipBox");
    }
  }
}
