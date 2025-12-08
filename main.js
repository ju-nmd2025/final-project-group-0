import GameHandler from "./gameHandler.js";
let gameHandler = new GameHandler();

// This file serves as the main engine for the game, but relies on gameHandler for true logic. Closer to being UI (due to button / keypress).


function setup() {
    createCanvas(gameHandler.canvasWidth, gameHandler.canvasHeight);
}

// Could be a lot prettier with even more taken apart and put in the right places.
function draw() {
    background(100, 100, 100);
    line(0, 350, gameHandler.canvasWidth, 350);

    switch (gameHandler.currentGameState) {
        case gameHandler.gameStates.start:
            gameHandler.startMenu();
            break;

        case gameHandler.gameStates.play:
            gameHandler.playGame();
            break;

        case gameHandler.gameStates.death:
            gameHandler.endGame();
            break;

        default:
            console.error("Error: draw() main");
    }
}

// Button logic here as it cannot be taken into classes.
function mousePressed() {
    switch (gameHandler.currentGameState) {
        case gameHandler.gameStates.start:
            if (gameHandler.gameButtons.startButton.isHovered()) {
                gameHandler.changeGameState(gameHandler.gameStates.play);
            }
            break;

        case gameHandler.gameStates.death:
            if (gameHandler.gameButtons.startButton.isHovered()) {
                gameHandler.changeGameState(gameHandler.gameStates.start);
            }
            break;

        default:
            console.error("Error: mousePressed()");
    }
}

// Keypress logic here as it cannot be taken into classes.
function keyPressed() {
    if (gameHandler.currentGameState === gameHandler.gameStates.play) {
        gameHandler.characterJump();
    }
}
