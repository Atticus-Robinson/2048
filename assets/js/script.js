/* Selectors */
const containerDisplay = $(".container");
const scoreDisplay = $(".score");
const tileEl = $(".tile");

/* An array to hold the tiles */
const tiles = [];

/* Keeps track of whether a move happened */
let moved = 0;

/* Starts the game and generates two starting numbers */
const startGame = () => {
  createTilesArray();
  /* generateNumber();
  generateNumber(); */
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
  /* Removes the locked status from the tiles */
  tiles.forEach(function (tile) {
    tile.removeClass("locked");
  });

  /* Switch statement that handles which key was pressed */
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

  for (row = 0; row < 4; row++) {
    for (let count = 1; count <= 4; count++) {
      for (let i = 3 + row * 4; i > 0 + row * 4; i += dirNum) {
        let tile = tiles[i].text();
        let secondaryTile = tiles[i + dirNum].text();

        /* Handles the inner workings of the tiles */
        if (!tile) {
          /* If there is no number in the primary tile */
          tile = secondaryTile;
          secondaryTile = "";
          if (tile) {
            emptyTile(tile, i, dirNum);
          }
        } else if (
          tile === secondaryTile &&
          !tiles[i].hasClass("locked") &&
          !tiles[i + dirNum].hasClass("locked")
        ) {
          /* When there are matching numbers in primary and secondary tiles */
          tile = parseInt(tile) + parseInt(secondaryTile);
          secondaryTile = "";
          combineTiles(tile, i, dirNum);
        }
      }
    }
  }

  if (moved) {
    generateNumber();
    moved = 0;
  }
};

const leftMovHandler = () => {
  console.log("Left");
  const dirNum = 1;

  for (row = 0; row < 4; row++) {
    for (let count = 1; count <= 4; count++) {
      for (let i = 0 + row * 4; i < 3 + row * 4; i += dirNum) {
        let tile = tiles[i].text();
        let secondaryTile = tiles[i + dirNum].text();

        if (!tile) {
          tile = secondaryTile;
          secondaryTile = "";
          if (tile) {
            emptyTile(tile, i, dirNum);
          }
        } else if (
          tile === secondaryTile &&
          !tiles[i].hasClass("locked") &&
          !tiles[i + dirNum].hasClass("locked")
        ) {
          /* When there are matching numbers in primary and secondary tiles */
          tile = parseInt(tile) + parseInt(secondaryTile);
          secondaryTile = "";
          combineTiles(tile, i, dirNum);
        }
      }
    }
  }

  if (moved) {
    generateNumber();
    moved = 0;
  }
};

const upMovHandler = () => {
  console.log("Up");
  const dirNum = 4;

  for (column = 0; column < 4; column++) {
    for (let count = 1; count <= 4; count++) {
      for (let i = 0 + column; i < 12; i += dirNum) {
        let tile = tiles[i].text();
        let secondaryTile = tiles[i + dirNum].text();

        if (!tile) {
          tile = secondaryTile;
          secondaryTile = "";
          if (tile) {
            emptyTile(tile, i, dirNum);
          }
        } else if (
          tile === secondaryTile &&
          !tiles[i].hasClass("locked") &&
          !tiles[i + dirNum].hasClass("locked")
        ) {
          /* When there are matching numbers in primary and secondary tiles */
          tile = parseInt(tile) + parseInt(secondaryTile);
          secondaryTile = "";
          combineTiles(tile, i, dirNum);
        }
      }
    }
  }

  if (moved) {
    generateNumber();
    moved = 0;
  }
};

const downMovHandler = () => {
  console.log("Down");
  const dirNum = -4;

  for (column = 0; column < 4; column++) {
    for (let count = 1; count <= 4; count++) {
      for (let i = 12 + column; i > 3; i += dirNum) {
        let tile = tiles[i].text();
        let secondaryTile = tiles[i + dirNum].text();

        if (!tile) {
          tile = secondaryTile;
          secondaryTile = "";
          if (tile) {
            emptyTile(tile, i, dirNum);
          }
        } else if (
          tile === secondaryTile &&
          !tiles[i].hasClass("locked") &&
          !tiles[i + dirNum].hasClass("locked")
        ) {
          /* When there are matching numbers in primary and secondary tiles */
          tile = parseInt(tile) + parseInt(secondaryTile);
          secondaryTile = "";
          combineTiles(tile, i, dirNum);
        }
      }
    }
  }

  if (moved) {
    generateNumber();
    moved = 0;
  }
};

const emptyTile = (tileContents, index, dirNum) => {
  /* Assigns primary tile the number from the secondary tile and adds a class */
  tiles[index].text(tileContents).addClass(`_${tileContents}-tile`);

  /* Empties the secondary tile and removes class */
  tiles[index + dirNum].empty().removeClass(`_${tileContents}-tile`);

  moved++;
};

const combineTiles = (tileContents, index, dirNum) => {
  /* Combines the primary tile and the secondary tile and manages classes */
  tiles[index]
    .text(tileContents)
    .addClass(`_${tileContents}-tile locked`)
    .removeClass(`_${tileContents / 2}-tile`);

  /* Empties the secondary tile and removes the class*/
  tiles[index + dirNum].empty().removeClass(`_${tileContents / 2}-tile`);

  moved++;
};

/* Captures keydown events */
$(window).on("keydown", keyPressed);

/* Launches the game on load */
startGame();
