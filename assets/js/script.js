/* Selectors */
const scoreDisplay = $(".score");
const tileEl = $(".tile");

/* An array to hold the tiles */
const tiles = [];
/* Keeps track of whether a move happened */
let moved = 0;
/* Keeps track of game state */
let gameOver = false;



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
  randomNumber = Math.floor(Math.random() * 16);

  /* Checks if the tile is empty */
  if (!tiles[randomNumber].text()) {
    /* There is a 10% chance to get a four */
    const numbers = [2, 2, 2, 2, 2, 2, 2, 2, 2, 4];
    /* Grabs a random number */
    let number = numbers[Math.floor(Math.random() * 10)];
    /* Adds the number to the tile */
    tiles[randomNumber].text(number);
    tiles[randomNumber].addClass(`_${number}-tile number-tile`);
  } else {
    generateNumber();
  }
};

/* Handles the captured keydown events and only uses arrow keys */
/* 37 = ArrowLeft, 38 = ArrowUp, 39 = ArrowRight, 40 = ArrowDown */
const keyPressed = (e) => {
  /* Checks and handles the game being over */
  event.preventDefault();
  if (gameOver) {
    let score = 0;

    /* Finds the highest number on the board */
    tiles.forEach(function (tile) {
      if (parseInt(tile.text()) > score) {
        score = tile.text();
      }
    });

    /* Puts the score on the screen */
    scoreDisplay.text(score);
    return;
  }

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
  /* Directional number: how the numbers need to be shifted */
  const dirNum = -1;

  for (row = 0; row < 4; row++) {
    for (let count = 1; count <= 4; count++) {
      for (let i = 3 + row * 4; i > 0 + row * 4; i += dirNum) {
        let tile = tiles[i].text();
        let secondaryTile = tiles[i + dirNum].text();

        //Secondary tile is source tile. Tile is destination
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

  checkEndGame();
  checkIfWon();
};

const leftMovHandler = () => {
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

  checkEndGame();
  checkIfWon();
};

const upMovHandler = () => {
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

  checkEndGame();
  checkIfWon();
};

const downMovHandler = () => {
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

  checkEndGame();
  checkIfWon();
};

const emptyTile = (tileContents, index, dirNum) => {
  /* Assigns primary tile the number from the secondary tile and adds a class */
  tiles[index]
    .attr("id", index)
    .text(tileContents)
    .addClass(`_${tileContents}-tile number-tile`);

  /* Empties the secondary tile and removes class */
  tiles[index + dirNum].empty().removeClass(`_${tileContents}-tile number-tile`);

  moved++;
};

const combineTiles = (tileContents, index, dirNum) => {
  /* Combines the primary tile and the secondary tile and manages classes */
  tiles[index]
    .text(tileContents)
    .addClass(`_${tileContents}-tile number-tile locked`)
    .removeClass(`_${tileContents / 2}-tile`);

  /* Empties the secondary tile and removes the class*/
  tiles[index + dirNum].empty().removeClass(`_${tileContents / 2}-tile`);

  moved++;
};

const checkEndGame = () => {
  let emptySpaces = 0;
  let movesLeft = 0;

  tiles.forEach(function (tile) {
    if (tile.text() === "") {
      emptySpaces++;
    }
  });

  if (!emptySpaces) {
    for (line = 0; line < 4; line++) {
      for (let count = 1; count <= 4; count++) {
        let dirNum = -1;
        for (let i = 3 + line * 4; i > 0 + line * 4; i += dirNum) {
          let tile = tiles[i].text();
          let secondaryTile = tiles[i + dirNum].text();

          if (tile === secondaryTile) {
            movesLeft++;
          }
        }

        dirNum = 1;
        for (let i = 0 + line * 4; i < 3 + line * 4; i += dirNum) {
          let tile = tiles[i].text();
          let secondaryTile = tiles[i + dirNum].text();

          if (tile === secondaryTile) {
            movesLeft++;
          }
        }

        dirNum = 4;
        for (let i = 0 + line; i < 12; i += dirNum) {
          let tile = tiles[i].text();
          let secondaryTile = tiles[i + dirNum].text();

          if (tile === secondaryTile) {
            movesLeft++;
          }
        }

        dirNum = -4;
        for (let i = 12 + line; i > 3; i += dirNum) {
          let tile = tiles[i].text();
          let secondaryTile = tiles[i + dirNum].text();

          if (tile === secondaryTile) {
            movesLeft++;
          }
        }
      }
    }

    if (!movesLeft) {
      console.log("Game Over");
      gameOver = true;
    }
  }
};

const checkIfWon = () => {
  tiles.forEach(function (tile) {
    if (tile.text() === "2048") {
      console.log("You Win!");
      gameOver = true;
    }
  });
};

/* Captures keydown events */
$(window).on("keydown", keyPressed);

$("#test-animation").on("click", function () {
  $('.number-tile').animate({

  })
})


/* Launches the game on load */
startGame();
