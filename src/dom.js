export default function gameboardGrid(gameboard) {
  const grid1 = document.getElementById("gameboard1");
  const indexLetters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
  for (let i = 0; i < 10; i++) {
    const row = document.createElement("div");
    row.classList.add("row");
    grid1.appendChild(row);
    row.dataset.id = indexLetters[i];
    for (let j = 1; j < 11; j++) {
      const box = document.createElement("div");
      box.classList.add("box");
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
      box.addEventListener("click", () => {
        console.log(box.dataset.id);
        // console.log(gameboard.boardOccupied);
        if (gameboard.boardOccupied.includes(box.dataset.id)) {
          box.style.backgroundColor = "red";
        } else {
          box.style.backgroundColor = "blue";
        }
      });
    }
  }
}

export function drawShips(array) {
  const boxes = document.getElementsByClassName("box");
  for (let i = 0; i < boxes.length; i++) {
    if (array.includes(boxes[i].dataset.id)) {
      boxes[i].classList.add("shipBox");
      // boxes[i].style.backgroundColor = "black";
    }
  }
  // console.log(boxes);
}
