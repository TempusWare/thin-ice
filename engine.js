var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var levelRows = 19;
var levelCols = 15;
var tileSize = 24;

var level1 = [
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,1,1],
  [1,2,0,0,0,0,0,0,0,0,0,0,0,0,0,2,1,1,1],
  [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,1,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [15,11,3,11]
];

var level2 = [
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,2,1,1,1],
  [1,1,1,1,1,2,2,2,2,2,2,2,1,2,0,2,1,1,1],
  [1,1,1,1,1,2,0,0,0,0,0,2,1,2,0,2,1,1,1],
  [1,2,2,2,2,2,0,2,2,2,0,2,2,2,0,2,1,1,1],
  [1,2,0,0,0,0,0,2,1,2,0,0,0,0,0,2,1,1,1],
  [1,2,2,2,2,2,2,2,1,2,2,2,2,2,2,2,1,1,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [3,11,15,8]
];

var level = level2;
var playerRow = level[15][0] - 1;
var playerCol = level[15][1] - 1;
var goalRow = level[15][2] - 1;
var goalCol = level[15][3] - 1;

canvas.height = tileSize * levelCols;
canvas.width = tileSize * levelRows;

renderLevel();

var leftPressed;
var rightPressed;
var upPressed;
var downPressed;

x = 100;

function gameLoop() {
  if (leftPressed) {
    if (level[playerCol][playerRow - 1] != 1 && level[playerCol][playerRow - 1] != 2 && level[playerCol][playerRow - 1] != 3) {
      level[playerCol][playerRow] = 3;
      playerRow--;
    };
  };
  if (rightPressed) {
    if (level[playerCol][playerRow + 1] != 1 && level[playerCol][playerRow + 1] != 2 && level[playerCol][playerRow + 1] != 3) {
      level[playerCol][playerRow] = 3;
      playerRow++
    };
  };
  if (upPressed) {
    if (level[playerCol - 1][playerRow] != 1 && level[playerCol - 1][playerRow] != 2 && level[playerCol - 1][playerRow] != 3) {
      level[playerCol][playerRow] = 3;
      playerCol--
    };
  };
  if (downPressed) {
    if (level[playerCol + 1][playerRow] != 1 && level[playerCol + 1][playerRow] != 2 && level[playerCol + 1][playerRow] != 3) {
      level[playerCol][playerRow] = 3;
      playerCol++
    };
  };

  renderLevel();

  setTimeout(gameLoop, 100)
};
gameLoop();

function renderLevel() {

  context.clearRect(0, 0, canvas.width, canvas.height);
  for (var c = 0; c < levelCols; c++) {
    for (var r = 0; r < levelRows; r++) {
      switch (level[c][r]) {
        case 0:
          context.fillStyle = "white";
          context.fillRect(r * tileSize, c * tileSize, tileSize, tileSize)
          break;
        case 1:
          context.fillStyle = "#9BCDFF";
          context.fillRect(r * tileSize, c * tileSize, tileSize, tileSize)
          break;
        case 2:
          context.fillStyle = "#0066CC";
          context.fillRect(r * tileSize, c * tileSize, tileSize, tileSize)
          break;
        case 3:
          context.fillStyle = "darkblue";
          context.fillRect(r * tileSize, c * tileSize, tileSize, tileSize)
          break;
      }
    }
  };
  context.fillStyle = "red";
  context.fillRect((goalRow) * tileSize, (goalCol) * tileSize, tileSize, tileSize);
  context.fillStyle = "grey";
  context.fillRect((playerRow) * tileSize, (playerCol) * tileSize, tileSize, tileSize);
  if (playerRow == goalRow && playerCol == goalCol) {console.log("You win!")}
};

document.addEventListener("keydown", function(e) {
  //console.log(e.keyCode);
  switch (e.keyCode) {
    case 65:
      leftPressed = true;
      break;
		case 68:
      rightPressed = true;
			break;
		case 87:
      upPressed = true;
			break;
		case 83:
      downPressed = true;
			break;
  };
  //console.log("pr: " + playerRow + " pc: " + playerCol)
});

document.addEventListener("keyup", function(e) {
  //console.log(e.keyCode);
  switch (e.keyCode) {
    case 65:
      leftPressed = false;
      break;
		case 68:
      rightPressed = false;
			break;
		case 87:
      upPressed = false;
			break;
		case 83:
      downPressed = false;
			break;
  };
  //console.log("pr: " + playerRow + " pc: " + playerCol)
});
