let grid = [];

//generates a 2d array filled with 0
const generateGrid = () => {
  for (let i = 0; i < 4; i++) {
    //array.fill fills the array with 0s
    grid.push(new Array(4).fill(0));
  }
};
generateGrid();

const turn = (direction) => {
  console.log("br");
  switch (direction) {
    case "right":
      for (let row = 0; row < grid.length; row++) {
        for (let col = grid[row].length - 1; col >= 0; col--) {
          //iterates through every space, right to left and top to bottom
          //any call to moveAnimation()) is followed by this for loop breaking so you dont move the same block twice
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
                  moveAnimation([row, col], direction, colRight - col - 1);
                  grid[row][colRight - 1] = grid[row][col];
                  grid[row][col] = 0;
                }
                break;
              }
              if (grid[row][colRight] == grid[row][col]) {
                //if there next value to the right is the same as the current space
                moveAnimation([row, col], direction, colRight - col - 1);
                grid[row][colRight] *= 2;
                grid[row][col] = 0;
                break;
              } else if (grid[row][colRight] != 0) {
                //the values must be different and nonzero
                if (colRight != col + 1) {
                  //check if theyre neighbors cause then you dont need to move
                  moveAnimation([row, col], direction, colRight - col - 1);
                  grid[row][colRight - 1] = grid[row][col];
                  grid[row][col] = 0;
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
                  moveAnimation([row, col], direction, col - colLeft - 1);
                  grid[row][colLeft + 1] = grid[row][col];
                  grid[row][col] = 0;
                }
                break;
              } else if (grid[row][colLeft] == grid[row][col]) {
                //if there next value to the left is the same as the current space
                moveAnimation([row, col], direction, col - colLeft + 1);
                grid[row][colLeft] *= 2;
                grid[row][col] = 0;
                break;
              } else if (grid[row][colLeft] != 0) {
                //the values must be different and nonzero
                if (colLeft != col + 1) {
                  //check if theyre neighbors cause then you dont need to move
                  moveAnimation([row, col], direction, col - colLeft - 1);
                  grid[row][colLeft + 1] = grid[row][col];
                  grid[row][col] = 0;
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
          //any call to moveAnimation() is followed by this for loop breaking so you dont move the same block twice
          //console.log([row, col]);

          if (grid[row][col] != 0) {
            for (let rowAbove = row - 1; rowAbove >= -1; rowAbove--) {
              //iterates through all the spaces above of selected space, bottop to top
              if (rowAbove == -1) {
                if (grid[rowAbove + 1][col] == 0) {
                  //accounts for the possibility of the space alr being on the right and also for the possibility of there being a normal block already there
                  moveAnimation([row, col], direction, row - rowAbove - 1);
                  grid[rowAbove + 1][col] = grid[row][col];
                  grid[row][col] = 0;
                }
                break;
              }
              if (grid[rowAbove][col] == grid[row][col]) {
                //if there next value to the right is the same as the current space
                moveAnimation([row, col], direction, row - rowAbove);
                grid[rowAbove][col] *= 2;
                grid[row][col] = 0;
                break;
              } else if (grid[rowAbove][col] != 0) {
                //the values must be different and nonzero
                if (rowAbove != row - 1) {
                  //check if theyre neighbors cause then you dont need to move
                  moveAnimation([row, col], direction, row - rowAbove - 1);
                  grid[rowAbove + 1][col] = grid[row][col];
                  grid[row][col] = 0;
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
          //any call to moveAnimation() is followed by this for loop breaking so you dont move the same block twice
          //console.log([row, col]);

          if (grid[row][col] != 0) {
            for (let rowBelow = row + 1; rowBelow <= grid.length; rowBelow++) {
              //iterates through all the spaces above of selected space, top to bottom
              if (rowBelow == grid.length) {
                if (grid[rowBelow - 1][col] == 0) {
                  //accounts for the possibility of the space alr being on the right and also for the possibility of there being a normal block already there
                  moveAnimation([row, col], direction, rowBelow - row - 1);
                  grid[rowBelow - 1][col] = grid[row][col];
                  grid[row][col] = 0;
                }
                break;
              }
              if (grid[rowBelow][col] == grid[row][col]) {
                //if there next value to the right is the same as the current space
                moveAnimation([row, col], direction, rowBelow - row);
                grid[rowBelow][col] *= 2;
                grid[row][col] = 0;
                break;
              } else if (grid[rowBelow][col] != 0) {
                //the values must be different and nonzero
                if (rowBelow != row + 1) {
                  //check if theyre neighbors cause then you dont need to move
                  moveAnimation([row, col], direction, rowBelow - row - 1);
                  grid[rowBelow - 1][col] = grid[row][col];
                  grid[row][col] = 0;
                }
                break;
              }
            }
          }
        }
      }
      break;
  }
};

const moveAnimation = ([row, col], direction, spaces) => {
  /* //not sure why i made this section of code this shit is probably redundant
  let newTile = [];
  switch (direction) {
    case "right":
      newTile = [row, col + spaces];
      break;
    case "left":
      newTile = [row, col - spaces];
      break;
    case "up":
      newTile = [row + spaces, col];
      break;
    case "down":
      newTile = [row - spaces, col];
      break;
  }
  */
  //console.log("moved");
  //console.log("moved", row, col, direction, spaces);
  //purely aesthetic
};

const changeTile = (row, col, newValue) => {
  //console.log(row.toString() + col.toString());
  document.getElementById(row.toString() + col.toString()).textContent =
    newValue;
};

grid[1][2] = 1;
grid[2][3] = 1;
grid[1][3] = 1;
grid[0][3] = 1;

//turn("right");
//turn("left");
//turn("up");
//turn("down");
console.log(grid);

//test

function testFunctionMakeAllZeros() {
  for (let x = 0; x < 4; x++) {
    for (let y = 0; y < 4; y++) {
      changeTile(x, y, 0);
    }
  }
}

testFunctionMakeAllZeros();

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
  }
});
