/* Selectors */
const containerDisplay = $(".container");
const scoreDisplay = $(".score");
const tileEl = $(".tile");

/* An array to hold the tiles */
const tiles = [];

/* Starts the game and generates two starting numbers */
const startGame = () => {
  createTilesArray();
  generateNumber();
  generateNumber();
};

/* Creates an array containing each of the tiles */
const createTilesArray = () => {
  tileEl.each(function () {
    tiles.push($(this));
  });
};

/* Logic for generating a random number */
const generateNumber = () => {
  randomNumber = Math.floor(Math.random() * tiles.length);
  if (!tiles[randomNumber].text()) {
    tiles[randomNumber].text(2);
    tiles[randomNumber].addClass("_2-tile");
  } else {
    generateNumber();
  }
};

/* Handles the captured keydown events and only uses arrow keys */
/* 37 = ArrowLeft, 38 = ArrowUp, 39 = ArrowRight, 40 = ArrowDown */
const keyPressed = (e) => {
  if (e.keyCode > 36 && e.keyCode < 41) {
    const pressedKey = e.keyCode;
    switch (pressedKey) {
      case 37:
        leftMovHandler();
        break;
      case 38:
        upMovHandler();
        break;
      case 39:
        rightMovHandler();
        break;
      case 40:
        downMovHandler();
        break;
    }
  }
};

const rightMovHandler = () => {
  console.log("Right");
  /* Directional number: how the numbers need to be shifted */
  const dirNum = -1;

  for (let i = 3; i > 0; i--) {
    let tile = tiles[i].text();
    let sideTile = tiles[i - 1].text();

    if (!tile) {
      tile = sideTile;
      sideTile = "";
      if (tile) {
        emptyTileHandler(tile, i, dirNum);
      }
    }
  }
};

const leftMovHandler = () => {
  console.log("Left");
  const dirNum = 1;

  for (let i = 0; i < 3; i++) {
    let tile = tiles[i].text();
    let sideTile = tiles[i + 1].text();

    if (!tile) {
      tile = sideTile;
      sideTile = "";
      if (tile) {
        emptyTileHandler(tile, i, dirNum);
      }
    }
  }
};

const upMovHandler = () => {
  console.log("Up");
};

const downMovHandler = () => {
  console.log("Down");
};

const emptyTileHandler = (tileContents, index, dirNum) => {
  /* Assigns primary tile the number from the secondary tile and adds classes */
  tiles[index].text(tileContents).addClass(`_${parseInt(tileContents)}-tile`);

  /* Empties the secondary tile and removes classes */
  tiles[index + dirNum].empty().removeClass(`_${parseInt(tileContents)}-tile`);
};

/* Captures keydown events */
$(window).on("keydown", keyPressed);

/* Launches the game on load */
startGame();
