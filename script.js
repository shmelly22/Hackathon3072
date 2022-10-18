let grid = [];
let score = 0;
let highScroe = 0;
//generates a 2d array filled with 0
function generateGrid() {
  for (let i = 0; i < 4; i++) {
    //array.fill fills the array with 0s
    grid.push(new Array(4).fill(0));
  }
}
generateGrid();

function spawnRandomTiles() {
  let availableTiles = [];
  for (let row in grid) {
    for (let col in grid[row]) {
      if (grid[row][col] == 0) {
        availableTiles.push([row, col]);
      }
    }
  }
  console.log(availableTiles);
  let spawnTile = Math.floor(availableTiles.length * Math.random());
  let die = Math.floor(6 * Math.random());
  console.log(availableTiles[spawnTile], die);
  if (die == 5) {
    changeTile(availableTiles[spawnTile][0], availableTiles[spawnTile][1], 6);
  } else {
    changeTile(availableTiles[spawnTile][0], availableTiles[spawnTile][1], 3);
  }
}

function resetGrid() {
  changeTile(3, 0, 3);
  changeTile(3, 1, 3);
}

resetGrid();

function turn(direction) {
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
                  colRight - col - 1,
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
                  col - colLeft + 1,
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
  }
}

function move([row, col], direction, spaces, [newRow, newCol], newValue) {
  //console.log("moved");
  //console.log("moved", row, col, direction, spaces);

  changeTile(newRow, newCol, newValue);
  changeTile(row, col, 0);
}

function changeTile(row, col, newValue) {
  //console.log(row.toString() + col.toString());
  if (newValue == 0) {
    tileToBeDeleted = document.getElementById(row.toString() + col.toString());
    document.getElementById("gameContainer").removeChild(tileToBeDeleted);
  } else if (grid[row][col] == 0) {
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
    console.log(score);
  }
  grid[row][col] = newValue;
  //document.getElementById(row.toString() + col.toString()).textContent = newValue;
}

//turn("right");
//turn("left");
//turn("up");
//turn("down");
//console.log(grid);

//test

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
  console.log(grid);
});

function resetGame() {
  grid = [];
  generateGrid();
  let gameContainer = document.getElementById("gameContainer");
  while (gameContainer.firstChild != undefined) {
    gameContainer.removeChild(gameContainer.firstChild);
  }
  resetGrid();
}
