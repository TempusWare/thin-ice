var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var levelRows = 19;
var levelCols = 15;
var tileSize = 24;

canvas.height = tileSize * levelCols;
canvas.width = tileSize * levelRows;

var tiles = {
  space: {id: 0, colour: "white"},
  ice: {id: 1, colour: "aqua"},
  coin: {id: 2, colour: "gold"},
  goal: {id: 9, colour: "crimson"},
  player: {id: 10, colour: "grey"},
  outside: {id: 11, colour: "lightcyan"},
  wall: {id: 12, colour: "navy"},
  water: {id: 13, colour: "royalblue"}
};
for (tile in tiles) {
  tiles[tile].img = new Image();
  tiles[tile].img.src = "sprites/" + tiles[tile].id + ".png"
};

var levels = [
  [ // 01
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
  ],
  [ // 02
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
  ],
  [ // 03
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
  ],
  [ // 04
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
  ],
  [ // 05 (but actually 08)
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
  ],
];
var level = 0;

var menuArt1 = new Image();
menuArt1.src = "sprites/menu-art-1.png";

var gamestate = "menu";

menuArt1.onload = function () {
  console.log("Menu started.")
  context.fillStyle = "#D9F1FF";
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.drawImage(menuArt1, 134, 112.5);
  context.fillStyle = "black";
  context.textAlign = "center";
  context.font = "15px monospace";
  context.fillText("Press SPACE to start!", canvas.width / 2, canvas.height / 4 * 3);
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
    case 32:
      keypress = "space"
  };
  console.log("Key pressed.")
});
document.addEventListener("keyup", function(e) {
  keypress = false;
  console.log("Key released.")
});

run();
function run() {
  switch (gamestate) {
    case "menu":
      if (keypress == "space") {gamestate = "play"; startGame()}
      break;
    case "play":
      if (level >= levels.length) {console.log("Game complete."); return}
      switch (keypress) {
        case "left":
          if (levels[level][playerCol][playerRow - 1] > tiles.player.id) {break};
          if (levels[level][playerCol][playerRow] == tiles.ice.id) {levels[level][playerCol][playerRow]/*Pos*/ = tiles.space.id} else {levels[level][playerCol][playerRow]/*Pos*/ = tiles.water.id};
          playerRow--;
          break;
        case "right":
          if (levels[level][playerCol][playerRow + 1] > tiles.player.id) {break};
          if (levels[level][playerCol][playerRow] == tiles.ice.id) {levels[level][playerCol][playerRow]/*Pos*/ = tiles.space.id} else {levels[level][playerCol][playerRow]/*Pos*/ = tiles.water.id};
          playerRow++
          break;
        case "up":
          if (levels[level][playerCol - 1][playerRow] > tiles.player.id) {break};
          if (levels[level][playerCol][playerRow] == tiles.ice.id) {levels[level][playerCol][playerRow]/*Pos*/ = tiles.space.id} else {levels[level][playerCol][playerRow]/*Pos*/ = tiles.water.id};
          playerCol--;
          break;
        case "down":
          if (levels[level][playerCol + 1][playerRow] > tiles.player.id) {break};
          if (levels[level][playerCol][playerRow] == tiles.ice.id) {levels[level][playerCol][playerRow]/*Pos*/ = tiles.space.id} else {levels[level][playerCol][playerRow]/*Pos*/ = tiles.water.id};
          playerCol++;
          break;
      };
      if (playerCol == goalCol && playerRow == goalRow) {console.log("Game won."); level++; setup()};
      //if (levels[level][playerCol][playerRow - 1] > tiles.player.id && levels[level][playerCol][playerRow + 1] > tiles.player.id && levels[level][playerCol + 1][playerRow] > tiles.player.id && levels[level][playerCol - 1][playerRow] > tiles.player.id) {console.log("Game over."); playerCol = -1; playerRow = -1;};
      render()
  }
  setTimeout(run, 75)
};

function startGame() {
  console.log("Game started.");
  setup();
  render();
/*function updateGame() {
    if (level[playerCol][playerRow] == tileCoin) {
      level[playerCol][playerRow] = tilePlayer;
      console.log("COIN BAG collected")
    };
    if (playerRow == goalRow && playerCol == goalCol) {
      //goalRow = 0;
      //goalCol = 0;
      console.log("You win!");
      var allMelted = true;
      for (var c = 0; c < levelCols; c++) {
        if (level[c].includes(tileTile)) {
          allMelted = false;
        }
      };
      if (allMelted) {console.log("All tiles have been melted!")}
    };
    if (level[playerCol + 1][playerRow] > 10 && level[playerCol - 1][playerRow] > 10 && level[playerCol][playerRow + 1] > 10 && level[playerCol][playerRow - 1] > 10) {
      level[playerCol][playerRow] = tileWater;
      console.log("Game over")
    }
    renderLevel()
  }*/
};

var playerCol;
var playerRow;
var goalCol;
var goalRow;

function setup() {
  console.log("Entering setup.");
  if (level >= levels.length) {console.log("Game complete."); return}
  var playerId = tiles.player.id;
  var goalId = tiles.goal.id;
  for (var c = 0; c < levelCols; c++) {
    if (levels[level][c].includes(playerId)) {
      playerCol = c;
      playerRow = levels[level][c].indexOf(playerId);
      levels[level][c][levels[level][c].indexOf(playerId)] = tiles.space.id;
    };
    if (levels[level][c].includes(goalId)) {
      goalCol = c;
      goalRow = levels[level][c].indexOf(goalId)
    };
  }
}

function render() {
  // Render level
  if (level >= levels.length) {console.log("Game complete."); return}
  for (var c = 0; c < levelCols; c++) {
    for (var r = 0; r < levelRows; r++) {
      var tileType = levels[level][c][r];
      for (tile in tiles) {
        if (tileType == tiles[tile].id) {
          context.fillStyle = tiles[tile].colour
        }
      }
      context.fillRect(r * tileSize, c * tileSize, tileSize, tileSize)
    }
  };
  // Render player
  context.fillStyle = tiles.player.colour;
  context.fillRect(playerRow * tileSize, playerCol * tileSize, tileSize, tileSize);
}
