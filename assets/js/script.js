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
    tiles[randomNumber].addClass("number-tile _2-tile");
    tiles[randomNumber].removeClass("empty-tile");
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

const leftMovHandler = () => {
  console.log("Left");
};

const rightMovHandler = () => {
  console.log("Right");
};

const upMovHandler = () => {
  console.log("Up");
};

const downMovHandler = () => {
  console.log("Down");
};

/* Captures keydown events */
$(window).on("keydown", keyPressed);

/* Launches the game on load */
startGame();
