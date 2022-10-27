let grid = [];
let score = 0;
let highScore = 0;

let movements = {};

//generates a 2d array filled with 0
function generateGrid() {
  for (let i = 0; i < 4; i++) {
    //array.fill fills the array with 0s
    grid.push(new Array(4).fill(0));
  }
}

function resetGrid() {
  spawnRandomTiles();
  spawnRandomTiles();
}

generateGrid();
resetGrid();

function spawnRandomTiles() {
  let availableTiles = [];
  for (let row in grid) {
    for (let col in grid[row]) {
      if (grid[row][col] == 0) {
        availableTiles.push([row, col]);
      }
    }
  }
  //console.log(availableTiles);
  let spawnTile = Math.floor(availableTiles.length * Math.random());
  let die = Math.floor(6 * Math.random());
  //console.log(availableTiles[spawnTile], die);
  if (die == 5) {
    createTile(availableTiles[spawnTile][0], availableTiles[spawnTile][1], 6);
    grid[availableTiles[spawnTile][0]][availableTiles[spawnTile][1]] = 6;
  } else {
    createTile(availableTiles[spawnTile][0], availableTiles[spawnTile][1], 3);
    grid[availableTiles[spawnTile][0]][availableTiles[spawnTile][1]] = 3;
  }
}

//let cutAnimation = false;

function turn(direction) {
  for (let timer in movements) {
    clearIntervalAndChangeTiles([timer, ...movements[timer]]);
    delete movements[timer];
  }
  let realMove = false;
  switch (direction) {
    case "right":
      for (let row = 0; row < grid.length; row++) {
        for (let col = grid[row].length - 1; col >= 0; col--) {
          //iterates through every space, right to left and top to bottom
          //any call to move() is followed by this for loop breaking so you dont move the same block twice
          //console.log([row, col]);

          if (grid[row][col] != 0) {
            for (
              let colRight = col + 1;
              colRight <= grid[0].length;
              colRight++
            ) {
              //console.log(colRight);
              //iterates through all the spaces right of selected space, left to right
              if (colRight == grid[row].length) {
                if (grid[row][colRight - 1] == 0) {
                  //accounts for the possibility of the space alr being on the right and also for the possibility of there being a normal block already there
                  move(
                    [row, col],
                    direction,
                    colRight - col - 1,
                    [row, colRight - 1],
                    grid[row][col]
                  );
                  realMove = true;
                  //grid[row][colRight - 1] = grid[row][col];
                  //grid[row][col] = 0;
                }
                break;
              }
              if (grid[row][colRight] == grid[row][col]) {
                //if there next value to the right is the same as the current space
                move(
                  [row, col],
                  direction,
                  colRight - col,
                  [row, colRight],
                  grid[row][colRight] * 2
                );
                realMove = true;

                //grid[row][colRight] *= 2;
                //grid[row][col] = 0;
                break;
              } else if (grid[row][colRight] != 0) {
                //the values must be different and nonzero
                if (colRight != col + 1) {
                  //check if theyre neighbors cause then you dont need to move
                  move(
                    [row, col],
                    direction,
                    colRight - col - 1,
                    [row, colRight - 1],
                    grid[row][col]
                  );
                  realMove = true;

                  //grid[row][colRight - 1] = grid[row][col];
                  //grid[row][col] = 0;
                }
                break;
              }
            }
          }
        }
      }
      break;
    case "left":
      for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[row].length; col++) {
          //iterates through every space, left to right and top to bottom
          //console.log([row, col]);

          if (grid[row][col] != 0) {
            for (let colLeft = col - 1; colLeft >= -1; colLeft--) {
              //console.log(colLeft);
              //iterates through all the spaces right of selected space, right to left
              if (colLeft == -1) {
                if (grid[row][colLeft + 1] == 0) {
                  move(
                    [row, col],
                    direction,
                    col - colLeft - 1,
                    [row, colLeft + 1],
                    grid[row][col]
                  );
                  realMove = true;

                  //grid[row][colLeft + 1] = grid[row][col];
                  //grid[row][col] = 0;
                }
                break;
              } else if (grid[row][colLeft] == grid[row][col]) {
                //if there next value to the left is the same as the current space
                move(
                  [row, col],
                  direction,
                  col - colLeft,
                  [row, colLeft],
                  grid[row][colLeft] * 2
                );
                realMove = true;

                //grid[row][colLeft] *= 2;
                //grid[row][col] = 0;
                break;
              } else if (grid[row][colLeft] != 0) {
                //the values must be different and nonzero
                if (colLeft != col - 1) {
                  //check if theyre neighbors cause then you dont need to move
                  move(
                    [row, col],
                    direction,
                    col - colLeft - 1,
                    [row, colLeft + 1],
                    grid[row][col]
                  );
                  realMove = true;

                  //grid[row][colLeft + 1] = grid[row][col];
                  //grid[row][col] = 0;
                }
                break;
              }
            }
          }
        }
      }
      break;
    case "up":
      for (let col = 0; col < grid[0].length; col++) {
        for (let row = 0; row < grid.length; row++) {
          //iterates through every space, top to bottom and left to right
          //any call to move() is followed by this for loop breaking so you dont move the same block twice
          //console.log([row, col]);

          if (grid[row][col] != 0) {
            for (let rowAbove = row - 1; rowAbove >= -1; rowAbove--) {
              //iterates through all the spaces above of selected space, bottop to top
              if (rowAbove == -1) {
                if (grid[rowAbove + 1][col] == 0) {
                  //accounts for the possibility of the space alr being on the right and also for the possibility of there being a normal block already there
                  move(
                    [row, col],
                    direction,
                    row - rowAbove - 1,
                    [rowAbove + 1, col],
                    grid[row][col]
                  );
                  realMove = true;

                  //grid[rowAbove + 1][col] = grid[row][col];
                  //grid[row][col] = 0;
                }
                break;
              }
              if (grid[rowAbove][col] == grid[row][col]) {
                //if there next value to the right is the same as the current space
                move(
                  [row, col],
                  direction,
                  row - rowAbove,
                  [rowAbove, col],
                  grid[rowAbove][col] * 2
                );
                realMove = true;

                //grid[rowAbove][col] *= 2;
                //grid[row][col] = 0;
                break;
              } else if (grid[rowAbove][col] != 0) {
                //the values must be different and nonzero
                if (rowAbove != row - 1) {
                  //check if theyre neighbors cause then you dont need to move
                  move(
                    [row, col],
                    direction,
                    row - rowAbove - 1,
                    [rowAbove + 1, col],
                    grid[row][col]
                  );
                  realMove = true;

                  //grid[rowAbove + 1][col] = grid[row][col];
                  //grid[row][col] = 0;
                }
                break;
              }
            }
          }
        }
      }
      break;
    case "down":
      for (let col = 0; col < grid[0].length; col++) {
        for (let row = grid.length - 1; row >= 0; row--) {
          //iterates through every space, bottom to top and left to right
          //any call to move() is followed by this for loop breaking so you dont move the same block twice
          //console.log([row, col]);

          if (grid[row][col] != 0) {
            for (let rowBelow = row + 1; rowBelow <= grid.length; rowBelow++) {
              //iterates through all the spaces above of selected space, top to bottom
              if (rowBelow == grid.length) {
                if (grid[rowBelow - 1][col] == 0) {
                  //accounts for the possibility of the space alr being on the right and also for the possibility of there being a normal block already there
                  move(
                    [row, col],
                    direction,
                    rowBelow - row - 1,
                    [rowBelow - 1, col],
                    grid[row][col]
                  );
                  realMove = true;

                  //grid[rowBelow - 1][col] = grid[row][col];
                  //grid[row][col] = 0;
                }
                break;
              }
              if (grid[rowBelow][col] == grid[row][col]) {
                //if there next value to the right is the same as the current space
                move(
                  [row, col],
                  direction,
                  rowBelow - row,
                  [rowBelow, col],
                  grid[rowBelow][col] * 2
                );
                realMove = true;

                //grid[rowBelow][col] *= 2;
                //grid[row][col] = 0;
                break;
              } else if (grid[rowBelow][col] != 0) {
                //the values must be different and nonzero
                if (rowBelow != row + 1) {
                  //check if theyre neighbors cause then you dont need to move
                  move(
                    [row, col],
                    direction,
                    rowBelow - row - 1,
                    [rowBelow - 1, col],
                    grid[row][col]
                  );
                  realMove = true;

                  //grid[rowBelow - 1][col] = grid[row][col];
                  //grid[row][col] = 0;
                }
                break;
              }
            }
          }
        }
      }
      break;
  }
  if (realMove) {
    spawnRandomTiles();
    if (testForDeath()) {
      checkOutOfMoves();
    }
  }
}

function checkOutOfMoves() {
  if (Object.keys(movements).length > 0) {
    window.setTimeout(checkOutOfMoves, 20);
  } else {
    console.log(movements);
    console.log();
    alert("death");
  }
}

function move([row, col], direction, spaces, [newRow, newCol], newValue) {
  //console.log("moved");
  //console.log("moved", row, col, direction, spaces, "new value:", newValue);
  //console.trace();
  //changeTile(newRow, newCol, newValue);

  grid[row][col] = 0;
  grid[newRow][newCol] = newValue;

  //console.log(grid);

  let ogTile = document.getElementById(row.toString() + col.toString());
  ogTile.id = row.toString() + col.toString() + "moving";
  //console.log(ogTile);

  if (direction == "up") {
    let startTime = Date.now();
    let timer = setInterval(() => {
      let timePassed = Date.now() - startTime;
      if (timePassed > 60) {
        clearIntervalAndChangeTiles([
          timer,
          row,
          col,
          newRow,
          newCol,
          newValue,
        ]);
        delete movements[timer];
      } else {
        ogTile.style.top = row * 150 - (spaces * timePassed * 150) / 60 + "px";
      }
    }, 5);
    movements[timer] = [row, col, newRow, newCol, newValue];
  } else if (direction == "down") {
    let startTime = Date.now();
    let timer = setInterval(() => {
      let timePassed = Date.now() - startTime;
      if (timePassed > 60) {
        clearIntervalAndChangeTiles([
          timer,
          row,
          col,
          newRow,
          newCol,
          newValue,
        ]);
        delete movements[timer];
      } else {
        ogTile.style.top = row * 150 + (spaces * timePassed * 150) / 60 + "px";
      }
    }, 5);
    movements[timer] = [row, col, newRow, newCol, newValue];
  } else if (direction == "right") {
    let startTime = Date.now();
    let timer = setInterval(() => {
      let timePassed = Date.now() - startTime;
      if (timePassed > 60) {
        clearIntervalAndChangeTiles([
          timer,
          row,
          col,
          newRow,
          newCol,
          newValue,
        ]);
        delete movements[timer];
      } else {
        ogTile.style.left = col * 150 + (spaces * timePassed * 150) / 60 + "px";
      }
    }, 5);
    movements[timer] = [row, col, newRow, newCol, newValue];
  } else if (direction == "left") {
    let startTime = Date.now();
    let timer = setInterval(() => {
      let timePassed = Date.now() - startTime;
      if (timePassed > 60) {
        clearIntervalAndChangeTiles([
          timer,
          row,
          col,
          newRow,
          newCol,
          newValue,
        ]);
        delete movements[timer];
      } else {
        ogTile.style.left = col * 150 - (spaces * timePassed * 150) / 60 + "px";
      }
    }, 5);
    movements[timer] = [row, col, newRow, newCol, newValue];
  }
  //changeTile(row, col, 0);
  //changeTile(newRow, newCol, newValue);
}
// clearIntervalAndChangeTiles([timer, ...movements[timer]]);
// delete movements[timer];

function clearIntervalAndChangeTiles([
  timer,
  row,
  col,
  newRow,
  newCol,
  newValue,
]) {
  clearInterval(timer);
  changeTile(row, col, 0, true);
  changeTile(newRow, newCol, newValue, false);
}

function createTile(row, col, newValue) {
  //console.log("createeeeeee row: " + row + " col: " + col);
  let tileImage = document.createElement("div");
  tileImage.className = "tile";
  tileImage.id = row.toString() + col.toString();
  tileImage.style.left = col * 150 + "px";
  tileImage.style.top = row * 150 + "px";
  tileImage.style.filter = "opacity(0%)";

  tileImage.innerHTML = newValue;
  document.getElementById("gameContainer").appendChild(tileImage);

  let startTime = Date.now();
  let timer = setInterval(() => {
    let timePassed = Date.now() - startTime;
    if (timePassed > 100) {
      clearInterval(timer);
      //tileImage.style.backgroundColor = "#03fcff";
      tileImage.style.filter = `opacity(100%)`;
    } else {
      // let newBG =
      //   "0" +
      //   Math.floor(
      //     normalColor - (normalColor - flashColor) * (1 - timePassed / 100)
      //   ).toString(16);
      // tileImage.style.backgroundColor = "#" + newBG;
      // console.log(newBG);
      tileImage.style.filter = `opacity(${timePassed / 1}%)`;
    }
  }, 5);
}

function changeTile(row, col, newValue, moving) {
  //console.log(row.toString() + col.toString() + moving + " changed to " + newValue);
  if (newValue == 0) {
    if (moving) {
      tileToBeDeleted = document.getElementById(
        row.toString() + col.toString() + "moving"
      );
    } else {
      tileToBeDeleted = document.getElementById(
        row.toString() + col.toString()
      );
    }
    document.getElementById("gameContainer").removeChild(tileToBeDeleted);
  } else if (
    document.getElementById(row.toString() + col.toString()) == undefined
  ) {
    let tileImage = document.createElement("div");
    tileImage.className = "tile";
    tileImage.id = row.toString() + col.toString();
    document.getElementById("gameContainer").appendChild(tileImage);
    tileImage.style.left = col * 150 + "px";
    tileImage.style.top = row * 150 + "px";
    tileImage.innerHTML = newValue;
  } else {
    document.getElementById(row.toString() + col.toString()).innerHTML =
      newValue;
    score = score + newValue;
    document.getElementById("score").innerHTML = "Score: " + score;
    //console.log(score, highScore);
    if (score > highScore) {
      highScore = score;
      document.getElementById("highScore").innerHTML =
        "High Score: " + highScore;
    }
    if (newValue == 3072) {
      alert("you win gg\nkeep going");
    }
  }

  //document.getElementById(row.toString() + col.toString()).textContent = newValue;
}

// while (score > highScore) {
//   highScore = score;
//   document.getElementById("highScore").innerHTML = "High Score: " + highScore;
// }

//detects when a key is pressed and calls turn()
document.addEventListener("keydown", (event) => {
  switch (event.code) {
    case "ArrowUp":
      turn("up");
      break;
    case "ArrowDown":
      turn("down");
      break;
    case "ArrowLeft":
      turn("left");
      break;
    case "ArrowRight":
      turn("right");
      break;
    // case "Space":
    //   resetGame();
    //   break;
  }
  //console.log(grid);
});

function resetGame() {
  score = 0;
  document.getElementById("score").innerHTML = "Score: " + score;
  grid = [];
  generateGrid();
  let gameContainer = document.getElementById("gameContainer");
  while (gameContainer.firstChild != undefined) {
    gameContainer.removeChild(gameContainer.firstChild);
  }
  resetGrid();
}

//disable arrow key scroll
window.addEventListener(
  "keydown",
  function (e) {
    if (
      ["Space", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].indexOf(
        e.code
      ) > -1
    ) {
      e.preventDefault();
    }
  },
  false
);

function testForDeath() {
  for (let row in grid) {
    for (let col in grid[row]) {
      if (grid[+row][+col] == 0) {
        return false;
      }
      if (+row < 3) {
        if (grid[+row][+col] == grid[+row + 1][+col]) {
          return false;
        }
        if (+col < 3) {
          if (grid[+row][+col] == grid[+row][+col + 1]) {
            return false;
          }
        }
      }
    }
  }
  return true;
}
