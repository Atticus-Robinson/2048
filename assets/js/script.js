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

startGame();
