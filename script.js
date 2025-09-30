const gridDisplay = document.querySelector("#grid");
const scoreDisplay = document.getElementById("score");
const resultDisplay = document.getElementById("result");
const squares = [];
let score = 0;

/* ==== Tạo bảng ==== */
function createBoard() {
  for (let i = 0; i < 16; i++) {
    const square = document.createElement("div");
    square.classList.add("tile");
    square.innerText = 0;
    gridDisplay.appendChild(square);
    squares.push(square);
  }
  generate();
  generate();
  updateColors();
}
createBoard();

/* ==== Sinh số mới ==== */
function generate() {
  let randomIndex;
  do {
    randomIndex = Math.floor(Math.random() * squares.length);
  } while (squares[randomIndex].innerText != 0);

  squares[randomIndex].innerText = Math.random() > 0.1 ? 2 : 4;
  squares[randomIndex].classList.add("new");
  updateColors();

  setTimeout(() => squares[randomIndex].classList.remove("new"), 300);
}

/* ==== Hàm cập nhật màu sắc ==== */
function updateColors() {
  squares.forEach(square => {
    let value = parseInt(square.innerText);
    square.style.background = "#cdc1b4";
    square.style.color = "#776e65";
    square.classList.remove("big");

    if (value === 0) {
      square.style.background = "#cdc1b4";
      square.innerText = "";
    } else if (value === 2) {
      square.style.background = "#eee4da";
    } else if (value === 4) {
      square.style.background = "#ede0c8";
    } else if (value === 8) {
      square.style.background = "#f2b179"; square.style.color = "white";
    } else if (value === 16) {
      square.style.background = "#f59563"; square.style.color = "white";
    } else if (value === 32) {
      square.style.background = "#f67c5f"; square.style.color = "white";
    } else if (value === 64) {
      square.style.background = "#f65e3b"; square.style.color = "white";
    } else if (value === 128) {
      square.style.background = "#edcf72"; square.style.color = "white"; square.classList.add("big");
    } else if (value === 256) {
      square.style.background = "#edcc61"; square.style.color = "white"; square.classList.add("big");
    } else if (value === 512) {
      square.style.background = "#edc850"; square.style.color = "white"; square.classList.add("big");
    } else if (value === 1024) {
      square.style.background = "#edc53f"; square.style.color = "white"; square.classList.add("big");
    } else if (value >= 2048) {
      square.style.background = "#edc22e"; square.style.color = "white"; square.classList.add("big");
    }
  });
}

/* ==== Hàm di chuyển ==== */
function moveRight() {
  for (let i = 0; i < 16; i++) {
    if (i % 4 === 0) {
      let row = [
        parseInt(squares[i].innerText) || 0,
        parseInt(squares[i+1].innerText) || 0,
        parseInt(squares[i+2].innerText) || 0,
        parseInt(squares[i+3].innerText) || 0,
      ];
      let filtered = row.filter(num => num);
      let missing = 4 - filtered.length;
      let newRow = Array(missing).fill(0).concat(filtered);

      for (let j = 0; j < 4; j++) {
        squares[i+j].innerText = newRow[j] || "";
      }
    }
  }
}

function moveLeft() {
  for (let i = 0; i < 16; i++) {
    if (i % 4 === 0) {
      let row = [
        parseInt(squares[i].innerText) || 0,
        parseInt(squares[i+1].innerText) || 0,
        parseInt(squares[i+2].innerText) || 0,
        parseInt(squares[i+3].innerText) || 0,
      ];
      let filtered = row.filter(num => num);
      let missing = 4 - filtered.length;
      let newRow = filtered.concat(Array(missing).fill(0));

      for (let j = 0; j < 4; j++) {
        squares[i+j].innerText = newRow[j] || "";
      }
    }
  }
}

function moveDown() {
  for (let i = 0; i < 4; i++) {
    let col = [
      parseInt(squares[i].innerText) || 0,
      parseInt(squares[i+4].innerText) || 0,
      parseInt(squares[i+8].innerText) || 0,
      parseInt(squares[i+12].innerText) || 0,
    ];
    let filtered = col.filter(num => num);
    let missing = 4 - filtered.length;
    let newCol = Array(missing).fill(0).concat(filtered);

    for (let j = 0; j < 4; j++) {
      squares[i+4*j].innerText = newCol[j] || "";
    }
  }
}

function moveUp() {
  for (let i = 0; i < 4; i++) {
    let col = [
      parseInt(squares[i].innerText) || 0,
      parseInt(squares[i+4].innerText) || 0,
      parseInt(squares[i+8].innerText) || 0,
      parseInt(squares[i+12].innerText) || 0,
    ];
    let filtered = col.filter(num => num);
    let missing = 4 - filtered.length;
    let newCol = filtered.concat(Array(missing).fill(0));

    for (let j = 0; j < 4; j++) {
      squares[i+4*j].innerText = newCol[j] || "";
    }
  }
}

/* ==== Kết hợp ô ==== */
function combineRow() {
  for (let i = 0; i < 15; i++) {
    if (squares[i].innerText && squares[i].innerText === squares[i+1].innerText) {
      let combined = parseInt(squares[i].innerText) * 2;
      squares[i].innerText = combined;
      squares[i+1].innerText = 0;
      score += combined;
      scoreDisplay.innerText = score;
      squares[i].classList.add("merge");
      setTimeout(() => squares[i].classList.remove("merge"), 200);
    }
  }
}

function combineColumn() {
  for (let i = 0; i < 12; i++) {
    if (squares[i].innerText && squares[i].innerText === squares[i+4].innerText) {
      let combined = parseInt(squares[i].innerText) * 2;
      squares[i].innerText = combined;
      squares[i+4].innerText = 0;
      score += combined;
      scoreDisplay.innerText = score;
      squares[i].classList.add("merge");
      setTimeout(() => squares[i].classList.remove("merge"), 200);
    }
  }
}

/* ==== Điều khiển bàn phím ==== */
function control(e) {
  if (e.keyCode === 39) keyRight();
  else if (e.keyCode === 37) keyLeft();
  else if (e.keyCode === 38) keyUp();
  else if (e.keyCode === 40) keyDown();
}
document.addEventListener("keyup", control);

function keyRight() {
  moveRight();
  combineRow();
  moveRight();
  generate();
  updateColors();
}

function keyLeft() {
  moveLeft();
  combineRow();
  moveLeft();
  generate();
  updateColors();
}

function keyUp() {
  moveUp();
  combineColumn();
  moveUp();
  generate();
  updateColors();
}

function keyDown() {
  moveDown();
  combineColumn();
  moveDown();
  generate();
  updateColors();
}
