var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var levelRows = 19;
var levelCols = 15;
var tileSize = 24;

canvas.height = tileSize * levelCols;
canvas.width = tileSize * levelRows;

var idTile = 0;
var idTileImg = new Image();
idTileImg.src = "sprites/" + idTile + ".png";
var idIce = 1;
var idIceImg = new Image();
idIceImg.src = "sprites/" + idIce + ".png";
var idCoin = 2;
var idCoinImg = new Image();
idCoinImg.src = "sprites/" + idCoin + ".png";
var idGoal = 9;
var idGoalImg = new Image();
idGoalImg.src = "sprites/" + idGoal + ".png";
var idGoalImg = new Image();
idGoalImg.src = "sprites/" + idGoal + ".png";
var idPlayer = 10;
var idPlayerImg = new Image();
idPlayerImg.src = "sprites/" + idPlayer + ".png";
var idOutside = 11;
var idOutsideImg = new Image();
idOutsideImg.src = "sprites/" + idOutside + ".png";
var idWall = 12;
var idWallImg = new Image();
idWallImg.src = "sprites/" + idWall + ".png";
var idWater = 13;
var idWaterImg = new Image();
idWaterImg.src = "sprites/" + idWater + ".png";

var level1 = [
  [11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11],
  [11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11],
  [11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11],
  [11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11],
  [11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11],
  [11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11],
  [11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11],
  [11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11],
  [11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11],
  [11,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,11,11,11],
  [11,12,9,0,0,0,0,0,0,0,0,0,0,0,10,12,11,11,11],
  [11,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,11,11,11],
  [11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11],
  [11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11],
  [11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11],
];
var level2 = [
  [11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11],
  [11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11],
  [11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11],
  [11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11],
  [11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11],
  [11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11],
  [11,11,11,11,11,11,11,11,11,11,11,11,11,12,12,12,11,11,11],
  [11,11,11,11,11,12,12,12,12,12,12,12,11,12,9,12,11,11,11],
  [11,11,11,11,11,12,0,0,0,0,0,12,11,12,0,12,11,11,11],
  [11,12,12,12,12,12,0,12,12,12,0,12,12,12,0,12,11,11,11],
  [11,12,10,0,0,0,0,12,11,12,0,0,0,0,0,12,11,11,11],
  [11,12,12,12,12,12,12,12,11,12,12,12,12,12,12,12,11,11,11],
  [11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11],
  [11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11],
  [11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11],
];
var level3 = [
  [11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11],
  [11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11],
  [11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11],
  [11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11],
  [11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11],
  [11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11],
  [11,11,12,12,12,11,11,11,11,11,11,11,11,12,12,12,11,11,11],
  [11,11,12,9,12,11,11,11,11,11,11,11,11,12,10,12,11,11,11],
  [11,11,12,0,12,12,12,12,12,11,11,11,11,12,0,12,11,11,11],
  [11,11,12,0,12,12,0,0,12,12,12,12,12,12,0,12,11,11,11],
  [11,11,12,0,0,0,0,0,0,0,0,0,0,0,0,12,11,11,11],
  [11,11,12,0,0,12,12,12,12,0,0,12,12,0,0,12,11,11,11],
  [11,11,12,12,12,12,11,11,12,12,12,12,12,12,12,12,11,11,11],
  [11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11],
  [11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11],
];
var level4 = [
  [11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11],
  [11,12,12,12,12,12,11,11,11,11,11,11,12,12,12,12,12,11,11],
  [11,12,0,0,0,12,12,12,12,12,12,12,12,0,0,0,12,11,11],
  [11,12,0,0,0,12,12,0,0,0,0,12,12,0,0,0,12,11,11],
  [11,12,12,0,0,0,0,0,0,0,0,0,0,0,0,12,12,11,11],
  [11,11,12,0,12,12,12,12,0,0,12,12,12,12,0,12,11,11,11],
  [11,11,12,0,12,11,12,0,0,0,0,12,11,12,0,12,11,11,11],
  [11,11,12,10,12,11,12,2,0,0,0,12,11,12,9,12,11,11,11],
  [11,11,12,12,12,11,12,12,12,12,12,12,11,12,12,12,11,11,11],
  [11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11],
  [11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11],
  [11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11],
  [11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11],
  [11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11],
  [11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11],
];
var level8 = [
  [11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11],
  [11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11],
  [11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11],
  [12,12,12,12,12,11,11,11,12,12,12,12,12,11,11,11,11,11,11],
  [12,0,0,0,12,12,12,12,12,0,0,0,12,11,11,11,11,11,11],
  [12,0,12,0,12,12,10,12,12,0,12,0,12,11,11,11,11,11,11],
  [12,0,0,1,0,0,1,0,0,1,0,0,12,12,12,12,11,11,11],
  [12,12,12,0,12,12,0,12,12,0,12,12,12,12,9,12,11,11,11],
  [11,12,12,0,12,12,0,12,12,0,12,12,12,12,0,12,11,11,11],
  [11,12,0,0,0,0,1,0,0,1,0,0,12,0,0,12,12,11,11],
  [11,12,2,0,0,12,0,12,12,0,12,0,12,0,0,0,12,11,11],
  [11,12,0,0,0,0,0,12,12,0,0,0,12,12,0,0,12,11,11],
  [11,12,0,0,12,12,12,12,12,12,12,12,12,12,0,0,12,11,11],
  [11,12,12,0,0,0,0,0,0,0,0,0,0,0,0,0,12,11,11],
  [11,11,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,11,11],
];
var level = [];
// Level selector
function selectLevel(number) {
  switch (number) {
    case "1":
      level = level1;
      break;
    case "2":
      level = level2;
      break;
    case "3":
      level = level3;
      break;
    case "4":
      level = level4;
      break;
    case "8":
      level = level8;
      break;
  };
  startGame()
};

var graphicsImg;

function startGame() {
// Find player and goal positions in level
for (var c = 0; c < levelCols; c++) {
  console.log(c + " " + level[c])
  if (level[c].includes(idPlayer)) {
    var playerCol = c;
    var playerRow = level[c].indexOf(idPlayer)
  };
  if (level[c].includes(idGoal)) {
    var goalCol = c;
    var goalRow = level[c].indexOf(idGoal)
  }
};
console.log("Player Row: " + playerRow + " | Player Column: " + playerCol + "\nGoal Row: " + goalRow + " | Goal Column: " + goalCol)
renderLevel();
function gameLoop() {
  switch (keypress) {
    case "left":
      if (level[playerCol][playerRow - 1] > idPlayer) {break};
      if (level[playerCol][playerRow] == idIce) {level[playerCol][playerRow] = idTile}
      else {level[playerCol][playerRow] = idWater};
      playerRow--;
      break
    case "right":
      if (level[playerCol][playerRow + 1] > idPlayer) {break};
      if (level[playerCol][playerRow] == idIce) {level[playerCol][playerRow] = idTile}
      else {level[playerCol][playerRow] = idWater};
      playerRow++
      break
    case "up":
      if (level[playerCol - 1][playerRow] > idPlayer) {break};
      if (level[playerCol][playerRow] == idIce) {level[playerCol][playerRow] = idTile}
      else {level[playerCol][playerRow] = idWater};
      playerCol--;
      break
    case "down":
      if (level[playerCol + 1][playerRow] > idPlayer) {break};
      if (level[playerCol][playerRow] == idIce) {level[playerCol][playerRow] = idTile}
      else {level[playerCol][playerRow] = idWater};
      playerCol++;
      break
  };

  /*if (level[playerCol][playerRow + 1] != 0 && level[playerCol][playerRow - 1] != 0 && level[playerCol + 1][playerRow] != 0 && level[playerCol - 1][playerRow] != 0) {
    level[playerCol][playerRow] = 3;
    playerCol = 0;
    playerRow = 0;
    renderLevel();
    return;
  };*/

  updateGame();

  setTimeout(gameLoop, 100)
};
gameLoop();
function updateGame() {
  if (level[playerCol][playerRow] == idCoin) {
    level[playerCol][playerRow] = idPlayer;
    console.log("COIN BAG collected")
  };
  if (playerRow == goalRow && playerCol == goalCol) {
    //goalRow = 0;
    //goalCol = 0;
    console.log("You win!");
    var allMelted = true;
    for (var c = 0; c < levelCols; c++) {
      if (level[c].includes(idTile)) {
        allMelted = false;
      }
    };
    if (allMelted) {console.log("All tiles have been melted!")}
  };
  if (level[playerCol + 1][playerRow] > 10 && level[playerCol - 1][playerRow] > 10 && level[playerCol][playerRow + 1] > 10 && level[playerCol][playerRow - 1] > 10) {
    level[playerCol][playerRow] = idWater;
    console.log("Game over")
  }
  renderLevel()
}
function renderLevel() {

  context.clearRect(0, 0, canvas.width, canvas.height);
  for (var c = 0; c < levelCols; c++) {
    for (var r = 0; r < levelRows; r++) {
      switch (level[c][r]) {
        case idTile: case idPlayer:
          context.fillStyle = "white";
          context.fillRect(r * tileSize, c * tileSize, tileSize, tileSize);
          if (graphicsImg) {context.drawImage(idTileImg, r * tileSize, c * tileSize)};
          break;
        case idCoin:
          context.fillStyle = "orange";
          context.fillRect(r * tileSize, c * tileSize, tileSize, tileSize)
          if (graphicsImg) {context.drawImage(idCoinImg, r * tileSize, c * tileSize)};
          break;
        case idOutside:
          context.fillStyle = "#9BCDFF";
          context.fillRect(r * tileSize, c * tileSize, tileSize, tileSize)
          if (graphicsImg) {context.drawImage(idOutsideImg, r * tileSize, c * tileSize)};
          break;
        case idIce:
          context.fillStyle = "aqua";
          context.fillRect(r * tileSize, c * tileSize, tileSize, tileSize)
          if (graphicsImg) {context.drawImage(idIceImg, r * tileSize, c * tileSize)};
          break;
        case idWall:
          context.fillStyle = "#0066CC";
          context.fillRect(r * tileSize, c * tileSize, tileSize, tileSize)
          if (graphicsImg) {context.drawImage(idWallImg, r * tileSize, c * tileSize)};
          break;
        case idWater:
          context.fillStyle = "darkblue";
          context.fillRect(r * tileSize, c * tileSize, tileSize, tileSize)
          if (graphicsImg) {context.drawImage(idWaterImg, r * tileSize, c * tileSize)};
          break;
      }
    }
  };
  context.fillStyle = "red";
  context.fillRect(goalRow * tileSize, goalCol * tileSize, tileSize, tileSize);
  if (graphicsImg) {context.drawImage(idGoalImg, goalRow * tileSize, goalCol * tileSize)};
  //if (playerRow == 0) {console.log("Game over!"); return};
  if (level[playerCol][playerRow] <= idPlayer) {
    context.fillStyle = "grey";
    context.fillRect(playerRow * tileSize, playerCol * tileSize, tileSize, tileSize);
    if (graphicsImg) {context.drawImage(idPlayerImg, playerRow * tileSize, playerCol * tileSize)}
  }
  //if (playerRow == goalRow && playerCol == goalCol) {console.log("You win!")}
};
var keypress;
document.addEventListener("keydown", function(e) {
  switch (e.keyCode) {
    case 65:
      keypress = "left";
      break;
		case 68:
      keypress = "right";
			break;
		case 87:
      keypress = "up";
			break;
		case 83:
      keypress = "down";
			break;
  };
});
document.addEventListener("keyup", function(e) {
  keypress = false;
});
}
