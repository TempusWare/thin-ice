var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var levelRows = 19;
var levelCols = 15;
var tileSize = 24;

canvas.height = tileSize * levelCols;
canvas.width = tileSize * levelRows;

var simpleDesign = false;

var stats = document.getElementById("stats");
var spaceTilesIndivLevel = 0;
var waterTilesIndivLevel = 0;
var spaceTilesAllLevels = 0;
var waterTilesAllLevels = 0;

var tiles = {
  space: {id: 0, colour: "white"},
  ice: {id: 1, colour: "aqua"},
  coin: {id: 2, colour: "gold"},
  key: {id: 3, colour: "orange"},
  goal: {id: 9, colour: "crimson"},
  player: {id: 10, colour: "grey"},
  outside: {id: 11, colour: "lightcyan"},
  wall: {id: 12, colour: "navy"},
  water: {id: 13, colour: "royalblue"},
  lock: {id: 14, colour: "peru"}
};
for (tile in tiles) {
  tiles[tile].img = new Image();
  tiles[tile].img.src = "sprites/" + tiles[tile].id + ".png"
};

var sounds = {
  coin: new Audio("sounds/coin.mp3"),
  goal: new Audio("sounds/goal.mp3"),
  ice: new Audio("sounds/ice.mp3"),
  key: new Audio("sounds/key.mp3"),
  move: new Audio("sounds/move.mp3"),
  start: new Audio("sounds/start.mp3"),
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
  [ // 05
    [11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11],
    [11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11],
    [11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11],
    [11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11],
    [11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11],
    [11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11],
    [11,11,11,11,11,11,11,11,11,11,11,11,11,12,12,12,11,11,11],
    [11,11,11,11,11,11,11,11,11,11,11,11,11,12,10,12,11,11,11],
    [11,11,11,12,12,12,12,12,12,12,12,12,12,12,0,12,12,12,11],
    [11,12,12,12,0,0,0,0,0,0,0,0,0,0,0,0,0,12,11],
    [11,12,9,0,0,0,0,0,0,2,0,0,0,0,0,0,0,12,11],
    [11,12,12,12,12,0,0,0,0,0,0,0,0,0,0,0,0,12,11],
    [11,11,11,11,12,12,12,12,12,12,12,12,12,12,12,12,12,12,11],
    [11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11],
    [11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11],
  ],
  [ // 06
    [11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11],
    [11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11],
    [11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11],
    [11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11],
    [11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11],
    [11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11],
    [11,11,11,11,11,11,11,11,11,11,11,11,11,12,12,12,11,11,11],
    [11,11,11,11,11,11,11,11,11,11,11,11,11,12,9,12,11,11,11],
    [11,11,11,11,12,12,12,12,12,12,12,12,12,12,0,12,12,12,11],
    [11,12,12,12,12,0,0,0,12,0,0,0,0,12,0,0,0,12,11],
    [11,12,10,0,0,0,0,0,0,0,0,0,0,12,0,0,0,12,11],
    [11,12,12,12,0,0,0,0,0,0,2,0,0,0,0,0,0,12,11],
    [11,11,11,12,12,12,12,0,0,0,12,12,12,12,12,12,12,12,11],
    [11,11,11,11,11,11,12,12,12,12,12,11,11,11,11,11,11,11,11],
    [11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11],
  ],
  [ // 07
    [11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11],
    [11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11],
    [11,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,11,11,11],
    [11,12,0,0,0,0,0,0,0,0,0,0,0,0,0,12,11,11,11],
    [11,12,0,12,12,12,12,12,12,12,12,12,12,12,0,12,12,12,12],
    [11,12,0,12,12,12,9,0,0,0,0,0,0,0,1,0,0,0,12],
    [11,12,0,12,12,12,12,12,12,12,12,12,12,12,0,12,12,0,12],
    [11,12,0,12,12,12,12,12,12,12,12,12,12,12,10,12,12,0,12],
    [11,12,0,12,12,12,12,12,12,12,12,12,12,12,12,12,12,0,12],
    [11,12,0,12,12,12,12,0,0,12,12,2,0,0,0,12,12,0,12],
    [11,12,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,12],
    [11,12,12,12,12,12,0,0,0,0,0,0,12,12,12,12,12,12,12],
    [11,11,11,11,11,12,12,12,12,12,12,12,12,11,11,11,11,11,11],
    [11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11],
    [11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11],
  ],
  [ // 08
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
  [ // 09
    [11,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,11,11],
    [11,12,0,0,0,0,0,0,0,0,0,0,0,0,0,0,12,12,11],
    [11,12,0,12,12,12,12,0,1,0,0,0,0,0,0,1,0,12,11],
    [11,12,0,1,0,0,2,0,0,0,0,0,0,0,0,0,0,12,11],
    [11,12,0,1,12,12,12,12,12,0,12,12,12,12,0,12,12,12,11],
    [11,12,0,1,12,12,12,12,12,9,12,0,0,12,0,12,11,11,11],
    [11,12,0,1,12,12,12,12,12,12,12,0,0,12,0,12,11,11,11],
    [11,12,0,0,12,12,12,12,0,0,0,0,0,12,10,12,11,11,11],
    [11,12,0,0,0,1,1,0,0,12,12,12,0,12,12,12,11,11,11],
    [11,12,0,12,0,0,0,0,0,12,12,12,0,12,11,11,11,11,11],
    [11,12,0,0,0,12,12,12,0,0,0,0,0,12,11,11,11,11,11],
    [11,12,12,12,12,12,11,12,12,12,12,12,12,12,11,11,11,11,11],
    [11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11],
    [11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11],
    [11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11],
  ],
  [ // 10
    [12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12],
    [12,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,12],
    [12,0,0,0,1,1,1,1,1,1,1,1,0,0,0,0,1,0,12],
    [12,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,12],
    [12,0,0,0,0,0,0,12,12,12,12,12,12,0,0,0,1,0,12],
    [12,0,0,0,0,0,0,12,12,10,12,12,1,1,2,0,1,0,12],
    [12,0,0,0,0,0,0,12,12,0,12,12,1,1,0,0,0,0,12],
    [12,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,12],
    [12,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,12],
    [12,0,0,0,0,0,0,12,12,12,0,0,0,0,12,12,12,0,12],
    [12,0,0,0,0,0,0,0,0,0,1,1,1,1,14,0,12,0,12],
    [12,0,12,12,12,0,0,12,12,12,0,0,0,0,12,9,12,0,12],
    [12,0,12,12,0,1,1,0,0,0,0,0,0,0,12,12,12,0,12],
    [12,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,12],
    [12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12],
  ],
  [ // 11
    [11,11,11,11,11,11,11,11,11,11,11,11,11,11,12,12,12,11,11],
    [11,11,11,11,11,11,11,11,11,11,11,11,11,11,12,9,12,11,11],
    [11,11,11,11,11,11,11,11,11,11,11,11,12,12,12,0,12,12,12],
    [11,11,12,12,12,12,12,12,12,12,12,12,12,1,0,1,0,1,12],
    [11,11,12,0,0,0,0,0,0,0,0,12,12,1,12,0,12,1,12],
    [11,11,12,0,0,0,12,12,12,12,0,0,12,0,0,1,0,0,12],
    [11,11,12,0,0,0,0,1,0,12,0,0,12,12,12,0,12,12,12],
    [11,12,12,12,1,0,12,0,0,12,0,0,1,0,12,0,12,12,12],
    [11,12,0,0,1,12,12,12,0,12,12,12,0,12,12,14,12,12,12],
    [11,12,0,12,0,0,3,12,1,0,0,0,0,12,0,1,1,1,12],
    [11,12,0,12,0,12,0,12,1,12,0,0,0,12,0,12,12,1,12],
    [11,12,0,0,1,12,0,12,0,12,0,0,0,12,0,10,12,1,12],
    [11,12,12,12,0,0,1,1,0,12,0,0,0,12,12,12,12,1,12],
    [11,11,11,12,0,0,12,0,2,12,0,0,1,1,1,1,1,1,12],
    [11,11,11,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12],
  ],
  [ // 12
    [11,11,11,11,11,11,12,12,12,12,11,12,12,12,12,12,12,11,11],
    [11,11,11,11,11,11,12,0,0,12,12,12,0,0,12,10,12,11,11],
    [11,11,11,11,11,11,12,0,1,0,0,0,1,0,12,0,12,11,11],
    [11,11,11,11,11,12,12,12,0,12,12,12,0,12,12,0,12,11,11],
    [12,12,12,12,12,12,0,0,1,12,12,12,0,0,0,1,12,11,11],
    [12,0,0,12,12,12,0,12,0,12,0,12,0,12,12,0,12,12,11],
    [12,0,1,0,0,0,1,0,1,0,1,12,1,0,0,1,0,12,11],
    [12,0,1,0,0,0,0,12,0,12,2,12,0,12,12,0,12,12,11],
    [12,0,1,1,12,1,1,0,1,0,1,0,1,0,12,0,12,12,12],
    [12,0,1,1,12,0,0,12,0,12,0,12,0,12,12,0,0,0,12],
    [12,0,1,1,12,12,0,0,1,0,1,0,1,0,12,12,12,14,12],
    [12,0,1,1,12,12,0,0,12,12,0,12,0,0,12,9,0,0,12],
    [12,0,1,1,0,12,12,12,12,12,12,12,12,12,12,12,12,12,12],
    [12,0,0,0,3,12,11,11,11,11,11,11,11,11,11,11,11,11,11],
    [12,12,12,12,12,12,11,11,11,11,11,11,11,11,11,11,11,11,11],
  ]
];

for (indivLevel in levels) {
  for (var c = 0; c < levelCols; c++) {
    for (var r = 0; r < levelRows; r++) {
      var tileType = levels[indivLevel][c][r];
      if (tileType < tiles.goal.id) {
        if (tileType == tiles.ice.id) {spaceTilesAllLevels += 2}
        else {spaceTilesAllLevels++}
      }
    }
  }
};


var level = 0;
var coinsCollected = 0;
var hasKey = false;

var menuArt1 = new Image();
menuArt1.src = "sprites/menu-art-1.png";


var gamestate = "menu";

menuArt1.onload = function () {
  console.log("Menu displayed.")
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
    case 65: case 37:
      keypress = "left";
      break;
		case 68: case 39:
      keypress = "right";
			break;
		case 87: case 38:
      keypress = "up";
			break;
		case 83: case 40: case 12:
      keypress = "down";
			break;
    case 32:
      keypress = "space"
      break;
    case 48:
      simpleDesign = true;
      break;
    case 49:
      simpleDesign = false;
      break;
    case 82:
      setup();
      break;
  };
  //console.log("Key pressed.")
});
document.addEventListener("keyup", function(e) {
  keypress = false;
  //console.log("Key released.")
});

run();
function run() {
  switch (gamestate) {
    case "menu":
      if (keypress == "space") {gamestate = "play"; startGame()}
      break;
    case "play":
      if (level >= levels.length) {console.log("Game complete."); return};
      switch (keypress) {
        case "left":
          if (gameLevel[playerCol][playerRow - 1] > tiles.player.id) {break};
          if (gameLevel[playerCol][playerRow] == tiles.ice.id) {gameLevel[playerCol][playerRow]/*Pos*/ = tiles.space.id; sounds.ice.play()} else {gameLevel[playerCol][playerRow]/*Pos*/ = tiles.water.id};
          playerRow--;
          waterTilesIndivLevel++;
          //sounds.move.play();
          break;
        case "right":
          if (gameLevel[playerCol][playerRow + 1] > tiles.player.id) {break};
          if (gameLevel[playerCol][playerRow] == tiles.ice.id) {gameLevel[playerCol][playerRow]/*Pos*/ = tiles.space.id; sounds.ice.play()} else {gameLevel[playerCol][playerRow]/*Pos*/ = tiles.water.id};
          playerRow++;
          waterTilesIndivLevel++;
          //sounds.move.play();
          break;
        case "up":
          if (gameLevel[playerCol - 1][playerRow] > tiles.player.id) {break};
          if (gameLevel[playerCol][playerRow] == tiles.ice.id) {gameLevel[playerCol][playerRow]/*Pos*/ = tiles.space.id; sounds.ice.play()} else {gameLevel[playerCol][playerRow]/*Pos*/ = tiles.water.id};
          playerCol--;
          waterTilesIndivLevel++;
          //sounds.move.play();
          break;
        case "down":
          if (gameLevel[playerCol + 1][playerRow] > tiles.player.id) {break};
          if (gameLevel[playerCol][playerRow] == tiles.ice.id) {gameLevel[playerCol][playerRow]/*Pos*/ = tiles.space.id; sounds.ice.play()} else {gameLevel[playerCol][playerRow]/*Pos*/ = tiles.water.id};
          playerCol++;
          waterTilesIndivLevel++;
          //sounds.move.play();
          break;
      };
      //if (keypress != "false") {screenKeys(keypress, "false")};
      if (gameLevel[playerCol][playerRow] == tiles.coin.id) {
        coinsCollected++;
        console.log("Level " + (level + 1) + " Coin bag collected.");
        gameLevel[playerCol][playerRow] = tiles.space.id;
        sounds.coin.play();
      };
      if (gameLevel[playerCol][playerRow] == tiles.key.id) {
        hasKey = true;
        console.log("Level " + (level + 1) + "Key obtained.");
        gameLevel[playerCol][playerRow] = tiles.space.id;
        sounds.key.play();
      };
      if (gameLevel[playerCol - 1][playerRow] == tiles.lock.id && hasKey) {gameLevel[playerCol - 1][playerRow] = tiles.space.id; sounds.key.play()};
      if (gameLevel[playerCol][playerRow - 1] == tiles.lock.id && hasKey) {gameLevel[playerCol][playerRow - 1] = tiles.space.id; sounds.key.play()};
      if (gameLevel[playerCol + 1][playerRow] == tiles.lock.id && hasKey) {gameLevel[playerCol + 1][playerRow] = tiles.space.id; sounds.key.play()};
      if (gameLevel[playerCol][playerRow + 1] == tiles.lock.id && hasKey) {gameLevel[playerCol][playerRow + 1] = tiles.space.id; sounds.key.play()};
      if (playerCol == goalCol && playerRow == goalRow) {
        console.log("Level " + (level + 1) + " passed.");
        waterTilesAllLevels += waterTilesIndivLevel;
        level++;
        sounds.goal.play();
        if (level >= levels.length) {
          console.log("Game complete.");
          gamestate = "end"
        } else {
          setup()
        }
      };
      if (gameLevel[playerCol][playerRow - 1] > tiles.player.id &&
        gameLevel[playerCol][playerRow + 1] > tiles.player.id &&
        gameLevel[playerCol + 1][playerRow] > tiles.player.id &&
        gameLevel[playerCol - 1][playerRow] > tiles.player.id) {
          console.log("Game over.");
        };
      if (gamestate == "play") {render()};

      // Print statistics
      stats.innerHTML = "LEVEL: " + (level + 1) + " | " + waterTilesIndivLevel + "/" + spaceTilesIndivLevel + " TILES MELTED"

      break;
    case "end":
      displayEndscreen();
      break;
  }
  setTimeout(run, 75)
};

//var menuArt3 = new Image();
//menuArt3.src = "sprites/menu-art-3.png";

function displayEndscreen() {
  console.log("Displaying end screen.")
  context.fillStyle = "#D9F1FF";
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.drawImage(menuArt1, 134, 112.5);
  context.fillStyle = "black";
  context.textAlign = "center";
  context.font = "15px monospace";
  context.fillText("Game complete!", canvas.width / 2, canvas.height / 4 * 3);

  stats.style.display = "none";

  //var totalTiles = spaceTiles + waterTiles - levels.length;
  context.fillText(waterTilesAllLevels + " tiles melted out of " + spaceTilesAllLevels, canvas.width / 2, canvas.height / 4 * 3 + 25);
  context.fillText(coinsCollected + " coin bags collected", canvas.width / 2, canvas.height / 4 * 3 + 50);
};

function startGame() {
  console.log("Game started.");
  sounds.start.play();
  setup();
  render();
};

var playerCol;
var playerRow;
var goalCol;
var goalRow;

var gameLevel;

function setup() {
  console.log("Entering setup.");
  var playerId = tiles.player.id;
  var goalId = tiles.goal.id;

  // Reset counted tiles
  spaceTilesIndivLevel = 0;
  waterTilesIndivLevel = 0;

  // Clone level from levels
  gameLevel = arrayClone(levels[level]);

  for (var c = 0; c < levelCols; c++) {
    if (gameLevel[c].includes(playerId)) {
      playerCol = c;
      playerRow = gameLevel[c].indexOf(playerId);
      gameLevel[c][gameLevel[c].indexOf(playerId)] = tiles.space.id;
    };
    if (gameLevel[c].includes(goalId)) {
      goalCol = c;
      goalRow = gameLevel[c].indexOf(goalId)
    };
    for (var r = 0; r < levelRows; r++) {
      var tileType = gameLevel[c][r];
      if (tileType < tiles.goal.id) {
        if (tileType == tiles.ice.id) {spaceTilesIndivLevel += 2}
        else {spaceTilesIndivLevel++}
      };
    }
  };
  //spaceTilesAllLevels += spaceTilesIndivLevel;
}

function render() {
  // Render level
  if (simpleDesign == true) {
    context.fillStyle = tiles.space.colour;
    context.fillRect(0, 0, canvas.width, canvas.height);
  };
  for (var c = 0; c < levelCols; c++) {
    for (var r = 0; r < levelRows; r++) {
      var tileType = gameLevel[c][r];
      if (simpleDesign == false) {context.drawImage(tiles.space.img, r * tileSize, c * tileSize)}
      for (tile in tiles) {
        if (tileType == tiles[tile].id && tileType != tiles.space.id) {
          if (simpleDesign == false) {context.drawImage(tiles[tile].img, r * tileSize, c * tileSize)}
          else {
            context.fillStyle = tiles[tile].colour;
            context.fillRect(r * tileSize, c * tileSize, tileSize, tileSize);
          }
        }
      }
    }
  };

  // Render player
  context.fillStyle = tiles.player.colour;
  if (simpleDesign == false) {context.drawImage(tiles.player.img, playerRow * tileSize, playerCol * tileSize)} else {
    context.fillRect(playerRow * tileSize, playerCol * tileSize, tileSize, tileSize);
  }
}

// The following function was taken from https://blog.andrewray.me/how-to-clone-a-nested-array-in-javascript/
function arrayClone(arr) {
  var i, copy;
    if(Array.isArray(arr)) {
        copy = arr.slice(0);
        for(i = 0; i < copy.length; i++) {
            copy[i] = arrayClone(copy[i]);
        }
        return copy;
    } else {
        return arr;
    }
}
